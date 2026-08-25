import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, MessageSquare } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

const Avatar = ({ avatar, avatarFallback, avatarColor, name }) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-11 h-11 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
      />
    );
  }
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 border-2 border-white/20"
      style={{ backgroundColor: avatarColor || '#6366f1' }}
    >
      {avatarFallback}
    </div>
  );
};

const Testimonials = ({ data = [] }) => {
  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-5">
            <MessageSquare size={13} className="text-violet-500" />
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
            What People Say
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl text-sm sm:text-base">
            Kind words from colleagues, mentors, and collaborators who have worked alongside me.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {data.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="glass-panel-ultra glass-shimmer rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top: Large Quote Symbol + Highlight */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <Quote
                    size={40}
                    className="text-violet-500/30 dark:text-violet-400/25 -mt-1 -ml-1 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  {/* Highlight Badge */}
                  {item.highlight && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-500 dark:text-violet-400 border border-violet-500/25 ml-2 text-right">
                      {item.highlight}
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: Author + Platform */}
              <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-neutral-200/50 dark:border-neutral-700/40">
                {/* Author Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar
                    avatar={item.avatar}
                    avatarFallback={item.avatarFallback}
                    avatarColor={item.avatarColor}
                    name={item.name}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {item.role}
                      {item.company ? ` \u00b7 ${item.company}` : ''}
                    </p>
                  </div>
                </div>

                {/* Platform Badge */}
                {item.platform && (
                  <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-700/70 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600/50">
                    <Star size={9} className="text-amber-400" />
                    {item.platform}
                  </span>
                )}
              </div>

              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/5 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
