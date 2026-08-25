import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Download, Terminal, Copy, Check, Box, User, Sparkles } from 'lucide-react';
import { BrandSocialButton, GithubLogo, LinkedinLogo, GmailLogo, VercelLogo } from './ui/BrandLogos';
import { useRecruiter } from '../contexts/RecruiterContext';
import RecruiterViewDeck from './ui/RecruiterViewDeck';
import FloatingParticles from './ui/FloatingParticles';
import AnimatedCounter from './ui/AnimatedCounter';
import Hero3DCanvas from './ui/Hero3DCanvas';
import MagneticCard from './ui/MagneticCard';

/* ─── Custom Cursor Component (iOS 27 VisionOS Frosted Glass Arrow Pointer) ─── */
const CustomCursor = () => {
  const pointerRef = useRef(null);
  const auraRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a, b, n) => a + (b - a) * n;

    const onMouseMove = (e) => {
      setIsHidden(false);
      pos.current = { x: e.clientX, y: e.clientY };
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const animateAura = () => {
      auraPos.current.x = lerp(auraPos.current.x, pos.current.x, 0.16);
      auraPos.current.y = lerp(auraPos.current.y, pos.current.y, 0.16);
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x - 16}px, ${auraPos.current.y - 16}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animateAura);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.glass-card') ||
        (target.classList && target.classList.contains('cursor-pointer'));
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafRef.current = requestAnimationFrame(animateAura);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={auraRef}
        className={`custom-cursor-aura ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
      />
      <div
        ref={pointerRef}
        className={`custom-cursor-pointer ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
      >
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.75 0.75L0.75 15.25L4.25 11.75L7.25 17.25L9.25 16.25L6.25 10.75L11.75 10.75L0.75 0.75Z"
            fill="#09090b"
            stroke="#ffffff"
            strokeWidth="1.15"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

/* ─── Hero Component ──────────────────────────────────────────────────────── */
const Hero = ({ data }) => {
  const { isRecruiterMode } = useRecruiter();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [heroMode, setHeroMode] = useState('3d'); // '3d' | 'photo'

  // Parallax mouse effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (isRecruiterMode) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const imageX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  const roles = data.roles || [
    'Data Analyst',
    'Machine Learning Enthusiast',
    'Python & SQL Engineer',
    'Aspiring Data Scientist'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      <section
        id="home"
        onMouseMove={handleMouseMove}
        className={`relative min-h-[94vh] flex items-center justify-center pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden bg-grid-pattern ${
          isRecruiterMode ? 'bg-amber-500/5 dark:bg-amber-950/10 border-b border-amber-500/20' : ''
        }`}
      >
        {/* Ambient Orb Glows & Floating Particles */}
        {!isRecruiterMode && (
          <>
            <FloatingParticles />
            <div className="absolute top-1/4 left-1/6 w-[320px] sm:w-[520px] h-[300px] sm:h-[400px] rounded-full pointer-events-none animate-orb opacity-60 sm:opacity-100"
              style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%)', filter: 'blur(50px)' }}
            />
            <div className="absolute bottom-1/4 right-1/6 w-[300px] sm:w-[480px] h-[280px] sm:h-[380px] rounded-full pointer-events-none animate-orb opacity-60 sm:opacity-100"
              style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.16) 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '4s' }}
            />
            <div className="absolute top-1/2 right-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full pointer-events-none animate-pulse-glow opacity-50 sm:opacity-100"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '2s' }}
            />
          </>
        )}

        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isRecruiterMode ? 'max-w-[1400px]' : 'max-w-6xl'}`}>
          
          {/* Recruiter 30-Second Executive Summary Deck */}
          <RecruiterViewDeck data={data} />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Main Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.03, translateY: -1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-200 glass-pill max-w-full truncate shadow-sm"
              >
                <span className="status-ping flex-shrink-0">
                  <span></span><span></span>
                </span>
                <span className="font-medium truncate">Available · Open for Data Roles</span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                  Hi, I'm{' '}
                  <span className="text-gradient-dark">Altaf Khan</span>
                </h1>

                {/* Dynamic Role Switcher */}
                <div className="min-h-10 flex items-center justify-center lg:justify-start">
                  <div
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-200"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.45)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0 animate-pulse" />
                    <motion.span
                      key={currentRoleIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="font-medium truncate"
                    >
                      {roles[currentRoleIndex]}
                    </motion.span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed font-normal mx-auto lg:mx-0">
                  {data.tagline}
                </p>
              </div>

              {/* Action Buttons with Official Clickable Brand Logos */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1 sm:pt-2"
              >
                <motion.a
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.resume || '/cv/Altaf_Khan_CV.pdf'}
                  download
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:shadow-cyan-500/30"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </motion.a>

                <BrandSocialButton type="github" url={data.github || "https://github.com/ialtaf14"} label="GitHub" />
                <BrandSocialButton type="linkedin" url={data.linkedin || "https://www.linkedin.com/in/ialtaf14/"} label="LinkedIn" />
                <BrandSocialButton type="gmail" url="mailto:altafkhan122105@gmail.com" label="Gmail" />
                <BrandSocialButton type="portfolio" url="https://ialtaf14.vercel.app" label="Portfolio" />
              </motion.div>

              {/* Achievement Stats Bar with Animated Counter */}
              <div
                className="pt-5 sm:pt-6 mt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center sm:text-left"
              >
                {[
                  { num: '2026', label: 'B.Tech Graduated' },
                  { num: '4+', label: 'Public Projects' },
                  { num: '4', label: 'NPTEL / Cisco Certs' },
                  { num: '10+', label: 'Data & AI Tools' },
                ].map((s) => (
                  <div key={s.label} className="p-2 sm:p-0 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/50 sm:bg-transparent transition-all duration-300 hover:scale-105">
                    <div className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-white">
                      <AnimatedCounter value={s.num} />
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side — Interactive 3D Hologram & Portrait Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: imageX, y: imageY }}
              className="lg:col-span-5 flex flex-col items-center justify-center space-y-3"
            >
              {/* 3D Mode Toggle Switch */}
              <div className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-md shadow-sm z-20">
                <button
                  onClick={() => setHeroMode('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    heroMode === '3d'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Core</span>
                </button>

                <button
                  onClick={() => setHeroMode('photo')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    heroMode === 'photo'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>3D Portrait</span>
                </button>
              </div>

              {/* 3D Scene View */}
              {heroMode === '3d' ? (
                <div className="w-full max-w-[360px] sm:max-w-[400px]">
                  <Hero3DCanvas />
                </div>
              ) : (
                /* Profile Photo — Multi-layer 3D Glass Card */
                <MagneticCard maxTilt={14} className="w-full max-w-[310px]">
                  <div className="relative w-full">
                    {/* Outer glow ring */}
                    <div
                      className="absolute -inset-3 rounded-[30px] pointer-events-none animate-pulse-glow"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,240,255,0.2) 0%, rgba(112,0,255,0.18) 100%)',
                        filter: 'blur(20px)',
                      }}
                    />

                    {/* Glass Frame */}
                    <div
                      className="relative rounded-[26px] p-[3px] photo-shimmer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,240,255,0.45) 0%, rgba(112,0,255,0.35) 50%, rgba(59,130,246,0.4) 100%)',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,240,255,0.12)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="rounded-[24px] overflow-hidden bg-neutral-950 relative">
                        <img
                          src={data.profileImage || '/images/altaf.jpg'}
                          alt="Altaf Khan"
                          className="w-full aspect-[4/5] object-cover object-top transition-all duration-700 hover:scale-[1.04]"
                          style={{ filter: 'contrast(1.05) brightness(1.02)' }}
                        />

                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                        {/* Floating 3D Info Badge with Depth Lift */}
                        <div
                          className="absolute bottom-4 left-3 right-3 p-3 rounded-[14px] space-y-0.5 transition-transform duration-300"
                          style={{
                            background: 'rgba(0,0,0,0.68)',
                            backdropFilter: 'blur(18px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                            transform: 'translateZ(35px)',
                          }}
                        >
                          <div className="flex items-center justify-between text-xs font-mono font-medium text-white">
                            <span>Gurugram University</span>
                            <span style={{ color: '#10b981' }}>Graduated 2026</span>
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate">
                            Data Science & Machine Learning
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Corner accent blobs */}
                    <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.25) 0%, transparent 70%)', filter: 'blur(14px)' }}
                    />
                    <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.25) 0%, transparent 70%)', filter: 'blur(14px)' }}
                    />
                  </div>
                </MagneticCard>
              )}
            </motion.div>

          </div>
        </div>

        {/* Scroll Hint */}
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          aria-label="Scroll to About"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </section>
    </>
  );
};

export default Hero;