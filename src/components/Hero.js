import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Terminal, ChevronRight, Copy, Check, Sparkles, Award } from 'lucide-react';
import { useRecruiter } from '../contexts/RecruiterContext';
import RecruiterViewDeck from './ui/RecruiterViewDeck';

const Hero = ({ data }) => {
  const { isRecruiterMode } = useRecruiter();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('altafkhan122105@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Parallax mouse effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (isRecruiterMode) return; // Disable heavy parallax in recruiter mode
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const imageX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  const roles = data.roles || [
    'Data Analyst',
    'Machine Learning Specialist',
    'Python & SQL Engineer',
    'AI Solution Developer'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className={`relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern ${
        isRecruiterMode ? 'bg-amber-500/5 dark:bg-amber-950/10 border-b border-amber-500/20' : ''
      }`}
    >
      {/* Radial Gradient Spotlights */}
      {!isRecruiterMode && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      )}
      
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isRecruiterMode ? 'max-w-[1400px]' : 'max-w-6xl'}`}>
        
        {/* Recruiter 30-Second Executive Summary Deck */}
        <RecruiterViewDeck data={data} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isRecruiterMode ? 0.2 : 0.6 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available Immediately • Open for Data Analyst & Scientist Roles</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="text-gradient-dark">Altaf Khan</span>
              </h1>

              {/* Dynamic Role Switcher */}
              <div className="h-10 flex items-center justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 text-sm sm:text-base font-mono text-neutral-700 dark:text-neutral-200">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-medium"
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
                {data.tagline}
              </p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <a
                href={data.resume || "/cv/Altaf_Khan_CV.pdf"}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-md group"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500 text-white ml-1">v2.4</span>
              </a>

              {/* 1-Click Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>LinkedIn</span>
              </a>
            </motion.div>

            {/* Achievement Counters Bar */}
            <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">2026</div>
                <div className="text-[11px] text-neutral-500">B.Tech Graduated</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">2+</div>
                <div className="text-[11px] text-neutral-500">Public ML Projects</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">4</div>
                <div className="text-[11px] text-neutral-500">NPTEL / Cisco Certs</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">12+</div>
                <div className="text-[11px] text-neutral-500">Data & AI Tools</div>
              </div>
            </div>
          </motion.div>

          {/* Profile Card & Parallax Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ x: imageX, y: imageY }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Outer Card Shell */}
              <div className="relative rounded-[24px] p-3 bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-2xl overflow-hidden">
                <div className="aspect-[4/5] rounded-[18px] overflow-hidden bg-neutral-950 relative">
                  <img
                    src={data.profileImage || "/images/altaf.jpg"}
                    alt="Altaf Khan Headshot"
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono font-medium">
                      <span>Gurugram University</span>
                      <span className="text-emerald-400">Graduated: 2026</span>
                    </div>
                    <div className="text-[11px] text-neutral-300 truncate">
                      Specialization in Data Science & ML
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Accent Shapes */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};

export default Hero;