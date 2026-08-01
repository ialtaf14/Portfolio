import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Award, MapPin, Calendar, CheckCircle2, Sparkles,
  Building2, Code2, ArrowUpRight, Heart
} from 'lucide-react';

// ─── Interests data ──────────────────────────────────────────────────────────
const INTERESTS = [
  { label: 'Cinema', emoji: '🎬', pct: 82, color: '#f59e0b', desc: 'Storytelling & direction' },
  { label: 'Music', emoji: '🎵', pct: 89, color: '#8b5cf6', desc: 'Rhythm & creativity' },
  { label: 'Tech Blogs', emoji: '📖', pct: 91, color: '#3b82f6', desc: 'Stay industry-ready' },
  { label: 'Data Science', emoji: '📊', pct: 95, color: '#10b981', desc: 'Core career passion' },
  { label: 'Problem Solving', emoji: '🧩', pct: 88, color: '#f97316', desc: 'Analytical thinking' },
];

// ─── Animated bar chart ───────────────────────────────────────────────────────
const InterestsChart = () => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2.5">
      <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
        <Heart className="w-3 h-3 text-rose-400" />
        Personal Interests
      </h4>

      <div className="space-y-2">
        {INTERESTS.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm leading-none">{item.emoji}</span>
                <span className="text-[10px] font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                  {item.label}
                </span>
                <span className="hidden group-hover:inline text-[9px] text-neutral-400 italic">
                  {item.desc}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold" style={{ color: item.color }}>
                {item.pct}%
              </span>
            </div>
            {/* Track */}
            <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700/60 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${item.pct}%` : '0%',
                  transitionDelay: `${idx * 120}ms`,
                  background: `linear-gradient(90deg, ${item.color}cc, ${item.color})`,
                  boxShadow: `0 0 6px ${item.color}55`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Training = ({ data }) => {
  const [imgError, setImgError] = useState(false);

  if (!data) return null;

  const {
    program    = 'Data Analytics & Python Training',
    institute  = 'QSpiders Gurugram',
    duration   = '01 Aug 2025 – Present',
    mode       = 'On-site',
    location   = 'Sector 16, Gurugram, Haryana, India',
    website    = 'https://qspiders.com/branches/gurugram-jspiders?branchId=58-branchId',
    image      = '/images/qspiders.jpg',
    overview   = '',
    keyLearnings = [],
    techStack    = [],
  } = data;

  return (
    <section
      id="training"
      className="py-24 relative bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-600 dark:text-amber-400"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>PROFESSIONAL TRAINING</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            Industry-Oriented Skill Development
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            Structured professional training program focused on Data Analytics, Python, SQL,
            and Business Intelligence at QSpiders Gurugram.
          </motion.p>
        </div>

        {/* ── Training Card ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl glass-card border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-xl shadow-black/5 hover:border-amber-500/40 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* ── Left column ──────────────────────────────────────────── */}
            <div className="lg:col-span-5 relative bg-neutral-100 dark:bg-neutral-900/60 p-6 sm:p-8 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-neutral-200/80 dark:border-neutral-800/80">

              {/* Institute image */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md group"
                   style={{ aspectRatio: '16/9' }}>
                {imgError ? (
                  /* Fallback gradient banner */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-500/20 via-neutral-900 to-neutral-800">
                    <Building2 className="w-12 h-12 text-amber-400 mb-2" />
                    <span className="text-amber-300 font-mono text-xs font-semibold">{institute}</span>
                  </div>
                ) : (
                  <img
                    src={image}
                    alt={institute}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-mono font-semibold shadow-sm backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {mode} · Active
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                  <div className="text-xs font-mono text-amber-300 font-semibold">{institute}</div>
                  <div className="text-sm font-bold truncate">{program}</div>
                </div>
              </div>

              {/* Meta stats */}
              <div className="space-y-2.5 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400">Duration</div>
                    <div className="font-semibold text-neutral-900 dark:text-white">{duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400">Location</div>
                    <div className="font-semibold text-neutral-900 dark:text-white truncate max-w-[220px]">{location}</div>
                  </div>
                </div>
              </div>

              {/* ── Interests pivot chart ─────────────────────────────── */}
              <div className="p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/50">
                <InterestsChart />
              </div>

              {/* Visit website button */}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 dark:bg-amber-500 dark:text-neutral-950 dark:hover:bg-amber-400 transition-all shadow-md group"
              >
                <span>Visit Official Website</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* ── Right column ─────────────────────────────────────────── */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col">

              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span>{institute}</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{program}</h3>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Program Overview
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {overview}
                </p>
              </div>

              {/* Key learnings grid */}
              {keyLearnings?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Key Learning Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {keyLearnings.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              {techStack?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-500" />
                    Technologies &amp; Tools Mastered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Training;
