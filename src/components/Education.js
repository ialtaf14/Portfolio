import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  ExternalLink,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  Award,
  Sparkles
} from 'lucide-react';

// ─── Auto Slide Campus Image Carousel ───────────────────────────────────────────
const AutoCampusCarousel = ({ images = [], fallbackImage, name, startDelay = 0 }) => {
  const [active, setActive] = useState(0);
  const [imageList, setImageList] = useState(
    images && images.length > 0 ? images : [fallbackImage, fallbackImage]
  );
  const timerRef = useRef(null);
  const delayRef = useRef(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setImageList(images);
    }
  }, [images]);

  useEffect(() => {
    if (imageList.length <= 1) return;

    // Stagger start: delay this carousel so cards never slide simultaneously
    delayRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % imageList.length);
      }, 3500);
    }, startDelay);

    return () => {
      clearTimeout(delayRef.current);
      clearInterval(timerRef.current);
    };
  }, [imageList.length, startDelay]);

  const handleImageError = (failedIndex) => {
    // If remote image fails, replace with reliable fallback so carousel length stays constant & sliding never stops
    setImageList((prev) => {
      const next = [...prev];
      next[failedIndex] = fallbackImage;
      return next;
    });
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl bg-neutral-900 group/carousel">
      {/* Sliding Image with Horizontal Motion */}
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={imageList[active]}
          alt={`${name} campus view ${active + 1}`}
          loading="lazy"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          onError={() => handleImageError(active)}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </AnimatePresence>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

      {/* Synchronized 1.3s Slide Dots Indicator */}
      {imageList.length > 1 && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-auto">
          {imageList.map((_, i) => (
            <motion.button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={`Jump to slide ${i + 1}`}
              animate={{
                width: i === active ? 22 : 6,
                opacity: i === active ? 1 : 0.45
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`h-1.5 rounded-full transition-colors ${
                i === active ? 'bg-white shadow-sm' : 'bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}

      {/* Live Slide Counter Badge */}
      {imageList.length > 1 && (
        <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-medium text-white z-20">
          {active + 1}/{imageList.length}
        </div>
      )}
    </div>
  );
};

const EducationCard = ({ edu, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-3xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden"
    >
      {/* Top Animated Glow Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

      {/* Card Header — Staggered Auto Slide Campus Carousel */}
      <div className="relative">
        <AutoCampusCarousel
          images={edu.images}
          fallbackImage={edu.image}
          name={edu.name}
          startDelay={index * 1750}
        />

        {/* Floating Type & Status Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{edu.type}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-emerald-300 bg-emerald-950/70 backdrop-blur-md border border-emerald-500/30 shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{edu.status}</span>
          </span>
        </div>

        {/* Floating Campus Title Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider">
            {edu.shortName} • ESTD. {edu.established}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mt-0.5 group-hover:text-blue-300 transition-colors duration-300">
            {edu.name}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        
        {/* Verified Badges Row */}
        <div className="flex flex-wrap gap-2">
          {edu.badges.map((badge, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg text-blue-700 dark:text-blue-300 bg-blue-500/10 border border-blue-500/20"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Essential Academic Details */}
        <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">{edu.degree}</span>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Branch: <strong className="text-neutral-800 dark:text-neutral-200">{edu.branch}</strong>
                {edu.specialization && (
                  <span className="block text-blue-600 dark:text-blue-400 text-[11px] font-mono mt-0.5">
                    {edu.specialization}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{edu.location}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Graduation Year: <strong className="text-neutral-800 dark:text-neutral-200">{edu.graduation}</strong></span>
          </div>

          <div className="flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-400 pt-1">
            <Award className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{edu.affiliation}</span>
          </div>
        </div>

        {/* Expanded Description & Detail on Hover/Focus */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60"
            >
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                {edu.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button: Visit Official Website */}
        <div className="pt-2">
          <a
            href={edu.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit official website of ${edu.name}`}
            className="group/btn inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-900 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-neutral-200/80 dark:border-neutral-700/80 transition-all duration-300 shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 group-hover/btn:text-white transition-colors" />
              <span>Visit Official Website</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono opacity-80 group-hover/btn:opacity-100">
              <span className="hidden sm:inline">{edu.shortName}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </a>
        </div>

      </div>
    </motion.div>
  );
};

const Education = ({ data }) => {
  const cards = (data && data.cards) || [];

  return (
    <section id="education" className="py-24 relative bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Decorative Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
            <span>VERIFIED ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Education & Academic Institutions
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Truthful academic records from official institutions. Explore verified campus details, degree specifications, and visit official university websites.
          </p>
        </div>

        {/* Side-by-Side Education Showcase Cards (Desktop: 2 Columns, Mobile: Stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {cards.map((edu, idx) => (
            <EducationCard key={edu.id || idx} edu={edu} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;