import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Cpu, BarChart3, Server, Wrench, Check, Sparkles } from 'lucide-react';
import { useRecruiter } from '../contexts/RecruiterContext';

const categoryIcons = {
  'programming': Code,
  'data-analysis': BarChart3,
  'machine-learning': Brain,
  'ai-deep-learning': Cpu,
  'visualization': BarChart3,
  'backend': Server,
  'tools': Wrench
};

const Skills = ({ data }) => {
  const { isRecruiterMode } = useRecruiter();
  const categories = data.categories || [];
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  const filteredCategories = selectedCategoryId === 'all'
    ? categories
    : categories.filter(c => c.id === selectedCategoryId);

  return (
    <section id="skills" className="py-24 relative bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>TECHNICAL CAPABILITIES</span>
            {isRecruiterMode && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px]">
                RECRUITER REVIEW
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Data Science, Machine Learning & Software Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Categorized technical skills and tools applied across empirical analysis, data transformation pipelines, predictive modeling, and microservice deployment.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedCategoryId('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md shadow-neutral-900/10 dark:shadow-white/10'
                : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            All Categories ({categories.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </motion.button>
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.id] || Code;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md shadow-neutral-900/10 dark:shadow-white/10'
                    : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({cat.skills.length})</span>
              </motion.button>
            );
          })}
        </div>

        {/* Skill Badges Matrix */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, catIdx) => {
              const IconComponent = categoryIcons[category.id] || Code;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  key={category.id}
                  className="p-6 rounded-2xl glass-panel-ultra glass-shimmer space-y-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title */}
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-200/60 dark:border-neutral-800/80">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-neutral-200/50 dark:border-white/10 text-neutral-900 dark:text-white">
                        <IconComponent className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                          {category.name}
                        </h3>
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                          {category.skills.length} skills verified
                        </span>
                      </div>
                    </div>

                    {/* Skill Items Badge Grid */}
                    <div className="space-y-2.5 pt-4">
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 3 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="p-3 rounded-xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200/60 dark:border-white/[0.06] hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all space-y-1 group"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                            <span>{skill.name}</span>
                            <Check className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          {skill.description && (
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                              {skill.description}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;