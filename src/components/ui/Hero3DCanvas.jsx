import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';
import { Sparkles, Rotate3d } from 'lucide-react';

const Hero3DCanvas = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const [activeNode, setActiveNode] = useState('Python');
  const [isInteracting, setIsInteracting] = useState(false);

  const techNodes = [
    { name: 'Python', color: '#00f0ff', desc: 'Core Data & ML' },
    { name: 'SQL', color: '#7000ff', desc: 'Queries & Database' },
    { name: 'Power BI', color: '#f59e0b', desc: 'BI Dashboards' },
    { name: 'Pandas', color: '#10b981', desc: 'Data Wrangling' },
    { name: 'Scikit-Learn', color: '#ec4899', desc: 'Predictive Models' },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    // 3. Main Central Holographic Core (Wireframe Icosahedron + Inner Pulsing Polyhedron)
    const coreGroup = new THREE.Group();

    // Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Mid Inner Octahedron
    const midGeo = new THREE.OctahedronGeometry(2.8, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x7000ff : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midMesh);

    // Inner Glowing Core (Point cloud)
    const coreParticlesCount = 120;
    const coreParticlesGeo = new THREE.BufferGeometry();
    const corePositions = new Float32Array(coreParticlesCount * 3);
    for (let i = 0; i < coreParticlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.6;
      const sinPhi = Math.sin(phi);
      corePositions[i * 3] = r * sinPhi * Math.cos(theta);
      corePositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      corePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    coreParticlesGeo.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));

    const coreParticlesMat = new THREE.PointsMaterial({
      color: isDark ? 0x00f0ff : 0x2563eb,
      size: 0.22,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const corePoints = new THREE.Points(coreParticlesGeo, coreParticlesMat);
    coreGroup.add(corePoints);

    // 4. Gyroscopic Orbital Rings
    const createRing = (radius, color, rotX, rotY) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: isDark ? 0.5 : 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(5.5, isDark ? 0x00f0ff : 0x0284c7, Math.PI / 3, 0);
    const ring2 = createRing(6.2, isDark ? 0x7000ff : 0x7c3aed, -Math.PI / 4, Math.PI / 6);
    const ring3 = createRing(6.8, isDark ? 0x3b82f6 : 0x2563eb, Math.PI / 6, Math.PI / 3);

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 5. Orbiting Tech Satellites / Nodes
    const satelliteCount = 5;
    const satellites = [];
    const nodeColors = [0x00f0ff, 0x7000ff, 0xf59e0b, 0x10b981, 0xec4899];

    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        wireframe: false,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);

      // Glow halo for each satellite
      const haloGeo = new THREE.SphereGeometry(0.55, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      satMesh.add(haloMesh);

      coreGroup.add(satMesh);
      satellites.push({
        mesh: satMesh,
        angle: (i / satelliteCount) * Math.PI * 2,
        speed: 0.45 + i * 0.1,
        radius: 6.0 + (i % 2) * 0.8,
        inclination: (i - 2) * 0.35,
      });
    }

    scene.add(coreGroup);

    // 6. Interactive Drag & Mouse Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotVelocityX = 0;
    let rotVelocityY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) {
        // Parallax hover
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        coreGroup.rotation.y = normX * 0.5;
        coreGroup.rotation.x = -normY * 0.5;
        return;
      }

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotVelocityY = deltaX * 0.005;
      rotVelocityX = deltaY * 0.005;

      coreGroup.rotation.y += rotVelocityY;
      coreGroup.rotation.x += rotVelocityX;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    // Touch support for mobile 3D interaction
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      rotVelocityY = deltaX * 0.006;
      rotVelocityX = deltaY * 0.006;

      coreGroup.rotation.y += rotVelocityY;
      coreGroup.rotation.x += rotVelocityX;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Inertia damping after drag
      if (!isDragging) {
        rotVelocityX *= 0.95;
        rotVelocityY *= 0.95;
        coreGroup.rotation.x += rotVelocityX;
        coreGroup.rotation.y += rotVelocityY;

        // Auto base rotation
        coreGroup.rotation.y += 0.008;
      }

      // Internal sub-geometry rotations
      outerMesh.rotation.x = elapsed * 0.15;
      outerMesh.rotation.z = elapsed * 0.12;

      midMesh.rotation.y = -elapsed * 0.25;
      midMesh.rotation.z = elapsed * 0.2;

      ring1.rotation.z = elapsed * 0.3;
      ring2.rotation.z = -elapsed * 0.25;
      ring3.rotation.z = elapsed * 0.2;

      // Pulse inner points
      const scale = 1 + Math.sin(elapsed * 3) * 0.08;
      corePoints.scale.set(scale, scale, scale);

      // Orbit satellites
      satellites.forEach((sat, i) => {
        const curAngle = sat.angle + elapsed * sat.speed * 0.5;
        const x = Math.cos(curAngle) * sat.radius;
        const z = Math.sin(curAngle) * sat.radius;
        const y = Math.sin(curAngle * 2 + sat.inclination) * 2.2;
        sat.mesh.position.set(x, y, z);
      });

      // Periodically cycle active node for UI badge
      const activeIdx = Math.floor((elapsed * 0.5) % techNodes.length);
      setActiveNode(techNodes[activeIdx].name);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      coreParticlesGeo.dispose();
      coreParticlesMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none group">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating 3D Interaction Badge & Current Node */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 dark:bg-black/80 backdrop-blur-xl border border-white/20 text-white text-[11px] font-mono shadow-xl pointer-events-none transition-all duration-300">
        <Rotate3d className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>3D Core: <strong className="text-cyan-400">{activeNode}</strong></span>
        <span className="hidden sm:inline text-neutral-400 text-[10px]">· Drag to Rotate</span>
      </div>

      {/* Futuristic 3D Corner Tech Brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-500/40 pointer-events-none" />
    </div>
  );
};

export default Hero3DCanvas;
