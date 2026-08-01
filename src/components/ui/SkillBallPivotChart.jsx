import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

const SKILL_DATA = [
  {
    name: 'Python',
    shortName: 'Python',
    pct: 93,
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/40',
    dotColor: 'bg-amber-400',
    glow: 'shadow-amber-500/30'
  },
  {
    name: 'SQL',
    shortName: 'SQL',
    pct: 85,
    color: 'from-blue-600 to-cyan-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/40',
    dotColor: 'bg-cyan-400',
    glow: 'shadow-blue-500/30'
  },
  {
    name: 'Python Libraries',
    shortName: 'Py Libs',
    pct: 70,
    color: 'from-purple-600 to-violet-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/40',
    dotColor: 'bg-violet-400',
    glow: 'shadow-purple-500/30'
  },
  {
    name: 'PowerBI',
    shortName: 'PowerBI',
    pct: 87,
    color: 'from-amber-600 to-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/40',
    dotColor: 'bg-orange-400',
    glow: 'shadow-orange-500/30'
  },
  {
    name: 'Excel',
    shortName: 'Excel',
    pct: 83,
    color: 'from-emerald-600 to-teal-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/40',
    dotColor: 'bg-teal-400',
    glow: 'shadow-emerald-500/30'
  }
];

const SkillBallPivotChart = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Core Skill Level Pivot</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Fill
        </span>
      </div>

      {/* 5 Column Skill Jars with Dropping Balls Animation */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        {SKILL_DATA.map((item, idx) => {
          const isHovered = hoveredSkill === item.name;
          // Number of balls to drop inside the jar based on percentage
          const ballCount = Math.floor(item.pct / 20); // 3-4 balls per jar

          return (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredSkill(item.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="flex flex-col items-center group/jar cursor-pointer"
            >
              {/* Tooltip on hover */}
              <div className="h-4 text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300">
                {isHovered ? `${item.pct}%` : `${item.pct}%`}
              </div>

              {/* Vertical Jar Container */}
              <div className="relative w-full h-36 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col justify-end p-1 shadow-inner">
                
                {/* Liquid Fill Level */}
                <motion.div
                  initial={{ height: '0%' }}
                  whileInView={{ height: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full rounded-lg bg-gradient-to-t ${item.color} relative opacity-85 shadow-lg ${item.glow}`}
                >
                  {/* Liquid surface wave effect */}
                  <motion.div
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 rounded-full blur-[1px]"
                  />
                </motion.div>

                {/* Dropping Balls Layer */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-2 gap-1 z-10">
                  {Array.from({ length: ballCount }).map((_, bIdx) => (
                    <motion.div
                      key={bIdx}
                      initial={{ y: -120, opacity: 0, scale: 0.5 }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                        scale: isHovered ? 1.25 : 1
                      }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                        delay: 0.4 + idx * 0.15 + bIdx * 0.12
                      }}
                      className={`w-2.5 h-2.5 rounded-full ${item.dotColor} border border-white/60 shadow-md ${
                        isHovered ? 'animate-bounce' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Skill Label */}
              <div className="mt-2 text-center">
                <span className="text-[10px] font-mono font-medium text-neutral-600 dark:text-neutral-400 group-hover/jar:text-neutral-900 dark:group-hover/jar:text-white transition-colors block truncate max-w-[50px]">
                  {item.shortName}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="text-[10px] font-mono text-neutral-400 text-center pt-1">
        Python 93% • SQL 85% • Py Libs 70% • PowerBI 87% • Excel 83%
      </div>
    </div>
  );
};

export default SkillBallPivotChart;
