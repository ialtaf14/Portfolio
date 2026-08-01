import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import SpotlightCard from './ui/SpotlightCard';

const Experience = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading
            title="Work Experience"
            subtitle="Fresher with hands-on experience through projects and coursework in Data Science, AI/ML, and Python."
            isInView={isInView}
          />

          <div className="max-w-4xl mx-auto">
            {data.positions.map((position, index) => (
              <motion.div
                key={index}
                className="relative mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              >
                {/* Timeline Line */}
                {index < data.positions.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-accent/20" />
                )}

                <div className="flex gap-8">
                  {/* Timeline Dot */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-transparent shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white font-semibold text-lg">
                        {position.company.charAt(0)}
                      </span>
                    </motion.div>
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    className="flex-1 transition-all duration-300 hover:shadow-xl"
                    whileHover={{ y: -2 }}
                  >
                    <SpotlightCard className="glass-card p-6 h-full hover:border-white/30" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {position.title}
                          </h3>
                          <div className="flex items-center gap-2 text-accent font-medium">
                            <span>{position.company}</span>
                            {position.website && (
                              <ExternalLink className="w-4 h-4 cursor-pointer hover:text-accent/80" />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-foreground/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{position.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{position.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-foreground/80 mb-6 leading-relaxed">
                        {position.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-3 mb-6">
                        {position.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.2 + achIndex * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-foreground/80 text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {position.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 glass-base text-foreground/90 dark:text-white/90 rounded-full text-xs font-medium hover:bg-white/40 dark:hover:bg-white/20 transition-all duration-200 cursor-default"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.2 + techIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;