import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

const Background3DCanvas = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    // 3. Particles (Data / Star constellation)
    const particleCount = window.innerWidth < 768 ? 200 : 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = isDark ? new THREE.Color('#00f0ff') : new THREE.Color('#3b82f6');
    const color2 = isDark ? new THREE.Color('#7000ff') : new THREE.Color('#6366f1');
    const color3 = isDark ? new THREE.Color('#3b82f6') : new THREE.Color('#06b6d4');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle texture for soft glowing particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 1.4 : 1.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 4. Floating 3D Geometric Meshes (Wireframe Octahedrons & Icosahedrons)
    const shapesGroup = new THREE.Group();
    const shapes = [];
    const shapeColors = isDark ? [0x00f0ff, 0x7000ff, 0x3b82f6, 0x10b981] : [0x2563eb, 0x7c3aed, 0x0284c7, 0x059669];

    for (let i = 0; i < 6; i++) {
      const geo = i % 2 === 0
        ? new THREE.OctahedronGeometry(Math.random() * 2.5 + 1.5)
        : new THREE.IcosahedronGeometry(Math.random() * 2 + 1.2);

      const mat = new THREE.MeshBasicMaterial({
        color: shapeColors[i % shapeColors.length],
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.28 : 0.18,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 50
      );
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.015,
        rotY: (Math.random() - 0.5) * 0.015,
        rotZ: (Math.random() - 0.5) * 0.015,
      };

      shapes.push(mesh);
      shapesGroup.add(mesh);
    }
    scene.add(shapesGroup);

    // 5. Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 16;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 16;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Scroll Parallax
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop with RAF
    let animationFrameId;
    let isVisible = true;

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = -mouseY - (scrollY * 0.015);
      camera.lookAt(scene.position);

      // Rotate particle cloud gently
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      // Animate floating shapes
      shapes.forEach((s) => {
        s.rotation.x += s.userData.rotX;
        s.rotation.y += s.userData.rotY;
        s.rotation.z += s.userData.rotZ;
      });
      shapesGroup.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      particleTexture.dispose();
      shapes.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
      });
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.95 }}
    />
  );
};

export default Background3DCanvas;
