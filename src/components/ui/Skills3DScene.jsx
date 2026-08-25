import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCw, Layers, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SKILLS_LIST = [
  { name: 'Python', category: 'core', color: '#38bdf8', size: 1.25, desc: 'Data wrangling & ML modeling' },
  { name: 'SQL', category: 'core', color: '#a855f7', size: 1.2, desc: 'Complex multi-table queries' },
  { name: 'Pandas', category: 'lib', color: '#34d399', size: 1.15, desc: 'DataFrames, Pivot tables' },
  { name: 'NumPy', category: 'lib', color: '#60a5fa', size: 1.1, desc: 'Numerical array calculations' },
  { name: 'Power BI', category: 'bi', color: '#fbbf24', size: 1.2, desc: 'Interactive DAX dashboards' },
  { name: 'Matplotlib', category: 'lib', color: '#f43f5e', size: 1.05, desc: 'Visual analytics & charts' },
  { name: 'Scikit-Learn', category: 'ml', color: '#ec4899', size: 1.15, desc: 'Classification & Regression' },
  { name: 'EDA', category: 'ml', color: '#06b6d4', size: 1.1, desc: 'Exploratory data analysis' },
  { name: 'Jupyter', category: 'tools', color: '#fb923c', size: 1.05, desc: 'Interactive notebook workflows' },
  { name: 'PostgreSQL', category: 'core', color: '#818cf8', size: 1.1, desc: 'Relational data management' },
  { name: 'Excel', category: 'bi', color: '#22c55e', size: 1.05, desc: 'VLOOKUP, Pivots, Formulas' },
  { name: 'Statistics', category: 'ml', color: '#c084fc', size: 1.15, desc: 'Hypothesis testing, distributions' },
  { name: 'Git & GitHub', category: 'tools', color: '#94a3b8', size: 1.05, desc: 'Version control & collaboration' },
  { name: 'Streamlit', category: 'tools', color: '#f87171', size: 1.0, desc: 'Data app prototyping' },
  { name: 'Machine Learning', category: 'ml', color: '#2dd4bf', size: 1.2, desc: 'Predictive algorithms' },
  { name: 'Data Visualization', category: 'bi', color: '#e879f9', size: 1.1, desc: 'Storytelling with data' },
];

const Skills3DScene = ({ onSelectSkill }) => {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAutoSpin, setIsAutoSpin] = useState(true);

  const radius = 220; // 3D Sphere radius

  // Calculate Fibonacci Sphere 3D coordinates for even distribution
  const sphereNodes = useMemo(() => {
    const total = SKILLS_LIST.length;
    return SKILLS_LIST.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      return {
        ...skill,
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
      };
    });
  }, []);

  const [nodes, setNodes] = useState(sphereNodes);
  const rotRef = useRef({ x: 0, y: 0, vx: 0.003, vy: 0.005 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // 3D Matrix Rotation & Projection
  useEffect(() => {
    let animId;

    const update3DPositions = () => {
      if (!isDraggingRef.current && isAutoSpin) {
        rotRef.current.x += rotRef.current.vx;
        rotRef.current.y += rotRef.current.vy;
      }

      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      const projected = sphereNodes.map((n) => {
        // Rotate around Y
        const x1 = n.baseX * cosY - n.baseZ * sinY;
        const z1 = n.baseZ * cosY + n.baseX * sinY;

        // Rotate around X
        const y2 = n.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.baseY * sinX;

        // Perspective scale based on Z depth
        const perspective = 480;
        const scale = perspective / (perspective - z2);
        const alpha = Math.max(0.2, Math.min(1, (z2 + radius) / (2 * radius) + 0.15));

        return {
          ...n,
          screenX: x1 * scale,
          screenY: y2 * scale,
          scale: Math.max(0.65, scale * n.size),
          zIndex: Math.round(z2 + 300),
          opacity: alpha,
          zDepth: z2,
        };
      });

      // Sort by zIndex so foreground nodes render over background nodes
      projected.sort((a, b) => a.zIndex - b.zIndex);
      setNodes(projected);

      animId = requestAnimationFrame(update3DPositions);
    };

    animId = requestAnimationFrame(update3DPositions);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, sphereNodes]);

  // Drag controls
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    rotRef.current.y += dx * 0.007;
    rotRef.current.x -= dy * 0.007;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;

    rotRef.current.y += dx * 0.008;
    rotRef.current.x -= dy * 0.008;

    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleNodeClick = (node, e) => {
    e.stopPropagation();
    setSelectedSkill(node);
    if (onSelectSkill) onSelectSkill(node);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[460px] sm:h-[540px] rounded-3xl glass-panel-ultra glass-shimmer border border-neutral-200/80 dark:border-white/[0.08] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* 3D Wireframe Orbit Rings in CSS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border-2 border-dashed border-cyan-500 animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full border border-purple-500 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
        <div className="absolute w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full border border-blue-500 animate-pulse" />
      </div>

      {/* Central Pulsing 3D Energy Core */}
      <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-2xl pointer-events-none animate-pulse-glow" />

      {/* 3D Floating Skill Nodes */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {nodes.map((node) => {
          const isSelected = selectedSkill?.name === node.name;
          const isForeground = node.zDepth > 0;

          return (
            <div
              key={node.name}
              onClick={(e) => handleNodeClick(node, e)}
              style={{
                transform: `translate3d(${node.screenX}px, ${node.screenY}px, 0) scale(${node.scale})`,
                zIndex: node.zIndex,
                opacity: node.opacity,
              }}
              className={`absolute pointer-events-auto cursor-pointer transition-shadow duration-300 group ${
                isForeground ? 'hover:scale-125' : ''
              }`}
            >
              <div
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl flex items-center gap-2 backdrop-blur-xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-white dark:bg-neutral-900 shadow-2xl scale-110'
                    : 'bg-white/70 dark:bg-neutral-950/70 hover:bg-white dark:hover:bg-neutral-900'
                }`}
                style={{
                  borderColor: isSelected ? node.color : `${node.color}55`,
                  boxShadow: isSelected
                    ? `0 0 25px ${node.color}66, 0 8px 24px rgba(0,0,0,0.3)`
                    : `0 4px 16px rgba(0,0,0,0.1), 0 0 10px ${node.color}22`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 animate-ping"
                  style={{ backgroundColor: node.color, animationDuration: '3s' }}
                />
                <span
                  className="text-xs sm:text-sm font-mono font-bold tracking-tight text-neutral-900 dark:text-white truncate"
                  style={{ color: isSelected ? node.color : undefined }}
                >
                  {node.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Hologram Info Modal / Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xs p-4 rounded-2xl bg-neutral-950/90 backdrop-blur-2xl border border-white/20 text-white shadow-2xl z-50 space-y-2 pointer-events-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedSkill.color }} />
                <h4 className="text-sm font-bold font-mono text-white">{selectedSkill.name}</h4>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-0.5 rounded bg-white/10"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-neutral-300 leading-normal">{selectedSkill.desc}</p>
            <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 pt-1 border-t border-white/10">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Verified Skill & Repository Stack</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive 3D Skill Galaxy</span>
        </div>

        <button
          onClick={() => setIsAutoSpin(!isAutoSpin)}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono shadow-md transition-colors"
        >
          <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${isAutoSpin ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isAutoSpin ? 'Auto-Orbit: ON' : 'Paused'}</span>
        </button>
      </div>

      {/* Drag Hint Footer */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-400 dark:text-neutral-400 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 pointer-events-none">
        Drag to rotate sphere in 3D • Click any node to inspect
      </div>
    </div>
  );
};

export default Skills3DScene;
