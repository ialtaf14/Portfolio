import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Download, Calendar, Building2, ArrowUpRight, Sparkles } from 'lucide-react';
import MagneticCard from './ui/MagneticCard';

const statusConfig = {
  Active: { label: 'Active', className: 'bg-green-500/20 text-green-400 border border-green-500/30' },
  Completed: { label: 'Completed', className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  Ongoing: { label: 'Ongoing', className: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const PracticalExperience = ({ data = [] }) => {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900/50 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-5">
            <Briefcase size={13} className="text-indigo-500" />
            Practical Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
            Hands-On Experience
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl text-sm sm:text-base">
            Real-world simulations, professional training, and self-directed projects that shaped my analytical skills.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {data.map((item) => {
            const status = statusConfig[item.status] || statusConfig.Completed;
            return (
              <motion.div key={item.id} variants={cardVariants}>
                <MagneticCard>
                  <div className="relative rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex">
                    {/* Left Accent Bar */}
                    <div
                      className="w-1.5 flex-shrink-0 rounded-l-2xl"
                      style={{ backgroundColor: item.badgeColor }}
                    />

                    <div className="flex-1 p-6 sm:p-8">
                      {/* Top Row: Type Badge + Status */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                          style={{
                            backgroundColor: item.badgeColor + '22',
                            color: item.badgeColor,
                            borderColor: item.badgeColor + '55',
                          }}
                        >
                          <Sparkles size={11} />
                          {item.type}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                          {status.label}
                        </span>
                        {item.badge && (
                          <span
                            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-md"
                            style={{ backgroundColor: item.badgeColor + '33', color: item.badgeColor }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                        {item.title}
                      </h3>

                      {/* Company + Platform + Duration */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        {item.company && (
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 size={13} className="flex-shrink-0" />
                            {item.company}
                          </span>
                        )}
                        {item.platform && (
                          <span className="inline-flex items-center gap-1.5">
                            <ArrowUpRight size={13} className="flex-shrink-0" />
                            {item.platform}
                          </span>
                        )}
                        {item.duration && (
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={13} className="flex-shrink-0" />
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-5 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Tasks Checklist */}
                      {item.tasks && item.tasks.length > 0 && (
                        <ul className="space-y-2 mb-5">
                          {item.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                              <CheckCircle2
                                size={15}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: item.badgeColor }}
                              />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Skills */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {item.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700/70 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Certificate Button */}
                      {item.certificateUrl && (
                        <a
                          href={item.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: item.badgeColor }}
                        >
                          <Download size={14} />
                          Download Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PracticalExperience;
