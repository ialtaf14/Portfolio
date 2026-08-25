import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Database, Brain, Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const milestones = [
  {
    year: '2022',
    title: 'Started B.Tech CSE',
    institution: 'Mewat Engineering College / Gurugram University',
    description: 'Enrolled in 4-year Computer Science & Engineering degree. Built strong fundamentals in programming, computer logic, and mathematics.',
    icon: GraduationCap,
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.35)',
    tags: ['C++', 'Problem Solving', 'CS Fundamentals']
  },
  {
    year: '2023',
    title: 'Learned Python & Data Structures',
    institution: 'Core Programming Focus',
    description: 'Mastered Python programming language, data structures, algorithms, object-oriented concepts, and basic scripting.',
    icon: Code,
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.35)',
    tags: ['Python', 'OOP', 'Algorithms', 'Data Structures']
  },
  {
    year: '2024',
    title: 'SQL & Relational Data Management',
    institution: 'Database Systems & Analytics',
    description: 'Deep-dived into SQL database design, multi-table JOINs, subqueries, aggregations, GROUP BY, and data cleaning workflows.',
    icon: Database,
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.35)',
    tags: ['SQL', 'DBMS', 'Pandas', 'NumPy', 'Data Wrangling']
  },
  {
    year: '2025',
    title: 'Machine Learning & Professional Certifications',
    institution: 'NPTEL (IIT) & Cisco Networking Academy',
    description: 'Earned 4 industry certifications in AI, Data Analytics & IoT. Built RealityML (AI Feasibility Suite) and Nova AI assistant.',
    icon: Brain,
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.35)',
    tags: ['Scikit-learn', 'EDA', 'Power BI', 'Streamlit', 'NPTEL & Cisco Certs']
  },
  {
    year: '2026',
    title: 'Graduated B.Tech CSE & Seeking Roles',
    institution: 'Gurugram University (Specialization: Data Science & ML)',
    description: 'Graduated with undergraduate B.Tech degree. Ready to contribute as a full-time Data Analyst, Business Analyst, or Python Developer.',
    icon: Sparkles,
    color: '#6366f1',
    glowColor: 'rgba(99,102,241,0.35)',
    tags: ['Graduated 2026', 'Immediate Joiner', 'Data Scientist']
  }
];

const LearningTimeline = () => {
  return (
    <section id="timeline" className="py-24 relative bg-neutral-50/50 dark:bg-neutral-950/50 overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60">
      
      {/* 3D Depth Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)' }} />
        <div className="absolute right-1/4 bottom-1/3 w-[300px] h-[300px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>LEARNING TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Academic & Skill Evolution
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Structured journey from entering engineering college to mastering Python, SQL, Machine Learning, and graduating in 2026.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* 3D Vertical Laser Beam Connector */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden sm:block overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 via-emerald-500 to-indigo-500 opacity-50" />
            {/* Animated laser pulse */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-20 blur-sm"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.9), transparent)' }}
              animate={{ top: ['-5%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="space-y-12 relative">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isEven ? 40 : -40, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full sm:w-1/2">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative p-6 sm:p-7 rounded-3xl glass-panel-ultra glass-shimmer space-y-4 transition-all duration-300 border border-neutral-200/80 dark:border-white/[0.08] hover:border-blue-500/40 overflow-hidden group"
                      style={{
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                      }}
                    >
                      {/* 3D Holographic top bar on hover */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
                      />

                      {/* Glow orb in background */}
                      <div
                        className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${m.color} 0%, transparent 70%)` }}
                      />
                      
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="px-3 py-1 text-xs font-mono font-bold rounded-full border"
                          style={{ color: m.color, backgroundColor: `${m.color}18`, borderColor: `${m.color}44` }}
                        >
                          {m.year}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">
                          Milestone {idx + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          {m.title}
                        </h3>
                        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {m.institution}
                        </p>
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {m.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {m.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* 3D Floating Orb Node Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotateY: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="relative flex-shrink-0 z-10 hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-neutral-900 shadow-2xl"
                    style={{
                      border: `2px solid ${m.color}88`,
                      boxShadow: `0 0 0 6px ${m.glowColor}, 0 12px 32px rgba(0,0,0,0.2), 0 0 20px ${m.glowColor}`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: m.color }} />

                    {/* Pulsing ring aura */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${m.color}` }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </motion.div>

                  {/* Spacer for alignment */}
                  <div className="w-full sm:w-1/2 hidden sm:block" />

                </motion.div>
              );
            })}
          </div>

          {/* Current Status Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-lg mx-auto p-7 rounded-3xl border backdrop-blur-xl shadow-2xl space-y-3 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.08) 50%, rgba(16,185,129,0.08) 100%)',
              border: '1px solid rgba(99,102,241,0.3)',
            }}
          >
            {/* Animated top laser accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>CURRENT STATUS</span>
            </div>
            <h4 className="text-base font-extrabold text-neutral-900 dark:text-white">
              Graduated B.Tech CSE (2026) — Ready to Join Immediately
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Available for Full-Time Data Analyst, Data Scientist, or Python Developer opportunities (Remote & On-site across India).
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LearningTimeline;
