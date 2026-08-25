import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Github, ExternalLink, Zap, CheckCircle2, Layers, ChevronDown, ChevronUp, FlaskConical, Database, Settings, Lightbulb, Target } from 'lucide-react';
import ProjectModal from './ui/ProjectModal';

const Projects = ({ data }) => {
  const projectsList = Array.isArray(data) ? data : (data?.projects || []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openCaseStudy, setOpenCaseStudy] = useState(null);

  return (
    <section id="projects" className="py-24 relative bg-neutral-50/50 dark:bg-neutral-950/50 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Projects Cards Showcase */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projectsList.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col justify-between group hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-mono font-medium tracking-wide uppercase text-emerald-400 bg-neutral-950/80 border border-emerald-500/30 rounded-md backdrop-blur-md">
                      {project.category || 'Data Science & AI'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <div className="text-xs font-mono text-neutral-500 mt-1">
                        {project.subtitle}
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Feature Bullet Points */}
                  {project.features && (
                    <div className="space-y-1.5 pt-1">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[10px] font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 rounded-md border border-neutral-200/60 dark:border-neutral-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Case Study Toggle */}
                  {project.caseStudy && (
                    <div>
                      <button
                        onClick={() => setOpenCaseStudy(openCaseStudy === (project.id || idx) ? null : (project.id || idx))}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/25 hover:bg-teal-500/20 transition-colors mt-1"
                      >
                        {openCaseStudy === (project.id || idx)
                          ? <ChevronUp className="w-3.5 h-3.5" />
                          : <ChevronDown className="w-3.5 h-3.5" />
                        }
                        <span>View Case Study</span>
                      </button>

                      <AnimatePresence initial={false}>
                        {openCaseStudy === (project.id || idx) && (
                          <motion.div
                            key="case-study"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="bg-neutral-950/80 border border-neutral-700/60 rounded-2xl p-6 mt-4 space-y-4 text-sm">
                              {/* Row 1: Problem */}
                              <div className="flex gap-3">
                                <FlaskConical className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-neutral-200">Problem</span>
                                  <p className="text-neutral-400 mt-0.5 text-xs leading-relaxed">{project.caseStudy.problem}</p>
                                </div>
                              </div>
                              {/* Row 2: Dataset */}
                              <div className="flex gap-3">
                                <Database className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-neutral-200">Dataset</span>
                                  <p className="text-neutral-400 mt-0.5 text-xs leading-relaxed">{project.caseStudy.dataset}</p>
                                </div>
                              </div>
                              {/* Row 3: Approach */}
                              <div className="flex gap-3">
                                <Settings className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-neutral-200">Approach</span>
                                  <p className="text-neutral-400 mt-0.5 text-xs leading-relaxed">{project.caseStudy.approach}</p>
                                </div>
                              </div>
                              {/* Row 4: Key Insights */}
                              <div className="flex gap-3">
                                <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-neutral-200">Key Insights</span>
                                  <ul className="mt-1 space-y-1">
                                    {project.caseStudy.insights.map((insight, i) => (
                                      <li key={i} className="flex items-start gap-1.5 text-xs text-neutral-400">
                                        <span className="text-yellow-500 flex-shrink-0">•</span>
                                        <span>{insight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              {/* Row 5: Impact */}
                              <div className="flex gap-3">
                                <Target className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-neutral-200">Impact</span>
                                  <p className="mt-1 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 leading-relaxed">{project.caseStudy.impact}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View Project</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 transition-colors"
                      aria-label={`View ${project.title} GitHub repo`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};

export default Projects;