import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';
import { MapPin, Globe, Radio } from 'lucide-react';

const Contact3DCanvas = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const [hoveredLocation, setHoveredLocation] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    // 3. Planet Group
    const globeGroup = new THREE.Group();
    // Tilt the globe like Earth (~23.5 degrees)
    globeGroup.rotation.z = (23.5 * Math.PI) / 180;

    // Inner Wireframe Sphere
    const globeRadius = 4.2;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
    const globeMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Inner Solid Sphere with subtle shading
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.98, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x050510 : 0xf1f5f9,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // Lat/Long Accent Rings
    const equatorGeo = new THREE.RingGeometry(globeRadius * 1.01, globeRadius * 1.03, 64);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x7000ff : 0x7c3aed,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const equatorMesh = new THREE.Mesh(equatorGeo, equatorMat);
    equatorMesh.rotation.x = Math.PI / 2;
    globeGroup.add(equatorMesh);

    // Orbital Outer Ring
    const orbitGeo = new THREE.TorusGeometry(globeRadius * 1.45, 0.04, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x3b82f6,
      transparent: true,
      opacity: 0.45,
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 3;
    globeGroup.add(orbitMesh);

    // 4. Convert Lat/Long (Gurugram: 28.4595° N, 77.0266° E) to 3D Cartesian vector
    const lat = 28.4595;
    const lon = 77.0266;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const pinX = -(globeRadius * Math.sin(phi) * Math.cos(theta));
    const pinZ = globeRadius * Math.sin(phi) * Math.sin(theta);
    const pinY = globeRadius * Math.cos(phi);

    // Pin Anchor Beacon
    const pinGroup = new THREE.Group();
    pinGroup.position.set(pinX, pinY, pinZ);

    // Pin Point
    const pinSphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const pinSphereMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const pinSphere = new THREE.Mesh(pinSphereGeo, pinSphereMat);
    pinGroup.add(pinSphere);

    // Pulsing Radar Ring on Pin
    const radarGeo = new THREE.RingGeometry(0.15, 0.35, 32);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const radarMesh = new THREE.Mesh(radarGeo, radarMat);
    radarMesh.lookAt(pinGroup.position);
    pinGroup.add(radarMesh);

    // Beacon Vertical Beam
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.7,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.y = 0.7;
    pinGroup.add(beamMesh);

    globeGroup.add(pinGroup);

    // 5. Orbiting Satellites on Globe
    const sats = [];
    for (let i = 0; i < 3; i++) {
      const sGeo = new THREE.SphereGeometry(0.14, 8, 8);
      const sMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      globeGroup.add(sMesh);
      sats.push({ mesh: sMesh, speed: 0.8 + i * 0.4, offset: i * 2 });
    }

    scene.add(globeGroup);

    // 6. Interactive Drag Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let velX = 0;
    let velY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;

      velY = dx * 0.005;
      velX = dy * 0.005;

      globeGroup.rotation.y += velY;
      globeGroup.rotation.x += velX;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMousePos.x;
      const dy = e.touches[0].clientY - prevMousePos.y;

      velY = dx * 0.006;
      velX = dy * 0.006;

      globeGroup.rotation.y += velY;
      globeGroup.rotation.x += velX;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
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
      camera.updateProjectionMatrix;
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        velX *= 0.95;
        velY *= 0.95;
        globeGroup.rotation.x += velX;
        globeGroup.rotation.y += velY;

        // Auto spin
        globeGroup.rotation.y += 0.006;
      }

      // Radar pulse wave animation
      const radarScale = 1 + (elapsed * 2) % 3;
      radarMesh.scale.set(radarScale, radarScale, 1);
      radarMat.opacity = Math.max(0, 0.8 - (radarScale / 3) * 0.8);

      // Orbit satellites
      sats.forEach((s) => {
        const a = elapsed * s.speed + s.offset;
        s.mesh.position.set(
          Math.cos(a) * (globeRadius * 1.45),
          Math.sin(a * 1.5) * 1.2,
          Math.sin(a) * (globeRadius * 1.45)
        );
      });

      orbitMesh.rotation.z = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
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
      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl glass-panel-ultra glass-shimmer border border-neutral-200/80 dark:border-white/[0.08] overflow-hidden flex items-center justify-center select-none group">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Pulsing Location Tag */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-black/60 dark:bg-neutral-950/80 backdrop-blur-xl border border-white/20 text-white text-xs font-mono shadow-xl pointer-events-none">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
          <span className="font-semibold text-neutral-200 truncate">Gurugram, HR, India</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Top Header Tag */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono flex items-center gap-1.5 pointer-events-none">
        <Globe className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
        <span>3D Global Coordinates</span>
      </div>
    </div>
  );
};

export default Contact3DCanvas;
