import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Database, Brain, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const milestones = [
  {
    year: '2022',
    title: 'Started B.Tech CSE',
    institution: 'Mewat Engineering College / Gurugram University',
    description: 'Enrolled in 4-year Computer Science & Engineering degree. Built strong fundamentals in programming, computer logic, and mathematics.',
    icon: GraduationCap,
    iconBg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    tags: ['C++', 'Problem Solving', 'CS Fundamentals']
  },
  {
    year: '2023',
    title: 'Learned Python & Data Structures',
    institution: 'Core Programming Focus',
    description: 'Mastered Python programming language, data structures, algorithms, object-oriented concepts, and basic scripting.',
    icon: Code,
    iconBg: 'bg-yellow-500/10 text-amber-500 border-yellow-500/20',
    tags: ['Python', 'OOP', 'Algorithms', 'Data Structures']
  },
  {
    year: '2024',
    title: 'SQL & Relational Data Management',
    institution: 'Database Systems & Analytics',
    description: 'Deep-dived into SQL database design, multi-table JOINs, subqueries, aggregations, GROUP BY, and data cleaning workflows.',
    icon: Database,
    iconBg: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    tags: ['SQL', 'DBMS', 'Pandas', 'NumPy', 'Data Wrangling']
  },
  {
    year: '2025',
    title: 'Machine Learning & Professional Certifications',
    institution: 'NPTEL (IIT) & Cisco Networking Academy',
    description: 'Earned 4 industry certifications in AI, Data Analytics & IoT. Built RealityML (AI Feasibility Suite) and Nova AI assistant.',
    icon: Brain,
    iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    tags: ['Scikit-learn', 'EDA', 'Power BI', 'Streamlit', 'NPTEL & Cisco Certs']
  },
  {
    year: '2026',
    title: 'Graduated B.Tech CSE & Seeking Roles',
    institution: 'Gurugram University (Specialization: Data Science & ML)',
    description: 'Graduated with undergraduate B.Tech degree. Ready to contribute as a full-time Data Analyst, Business Analyst, or Python Developer.',
    icon: Sparkles,
    iconBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    tags: ['Graduated 2026', 'Immediate Joiner', 'Data Scientist']
  }
];

const LearningTimeline = () => {
  return (
    <section id="timeline" className="py-24 relative bg-neutral-50/50 dark:bg-neutral-950/50 overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60">
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
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 -translate-x-1/2 hidden sm:block opacity-30" />

          <div className="space-y-12 relative">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full sm:w-1/2">
                    <div className="p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 shadow-sm hover:shadow-xl space-y-4">
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
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

                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="relative flex-shrink-0 z-10 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-blue-500/50 shadow-md">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>

                  {/* Spacer for alignment */}
                  <div className="w-full sm:w-1/2 hidden sm:block" />

                </motion.div>
              );
            })}
          </div>

          {/* Current Status Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-lg mx-auto p-6 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 border border-blue-500/30 backdrop-blur-xl shadow-lg space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
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
