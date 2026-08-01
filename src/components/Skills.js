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
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800/60'
            }`}
          >
            All Categories ({categories.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.id] || Code;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800/60'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>

        {/* Skill Badges Matrix */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const IconComponent = categoryIcons[category.id] || Code;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={category.id}
                  className="p-6 rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title */}
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                          {category.name}
                        </h3>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {category.skills.length} skills verified
                        </span>
                      </div>
                    </div>

                    {/* Skill Items Badge Grid */}
                    <div className="space-y-3 pt-4">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all space-y-1 group"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                            <span>{skill.name}</span>
                            <Check className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          {skill.description && (
                            <p className="text-[11px] text-neutral-500 leading-normal">
                              {skill.description}
                            </p>
                          )}
                        </div>
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