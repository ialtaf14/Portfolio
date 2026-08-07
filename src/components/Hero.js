import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Download, Terminal, Copy, Check } from 'lucide-react';
import { BrandSocialButton, GithubLogo, LinkedinLogo, GmailLogo, VercelLogo } from './ui/BrandLogos';
import { useRecruiter } from '../contexts/RecruiterContext';
import RecruiterViewDeck from './ui/RecruiterViewDeck';

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
      // Instant Pointer Positioning (Zero delay tip tracking)
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
      {/* Trailing Glass Aura Orb */}
      <div
        ref={auraRef}
        className={`custom-cursor-aura ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
      />

      {/* macOS Proportioned Neon Glass Arrow Pointer */}
      <div
        ref={pointerRef}
        className={`custom-cursor-pointer ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mac-neon-outline" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#00c8ff" />
            </linearGradient>

            <filter id="mac-neon-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(0, 240, 255, 0.95)" />
            </filter>
          </defs>

          <g filter="url(#mac-neon-glow)">
            {/* macOS 40×40 Arrow Pointer — Tip at (0, 0) */}
            <path
              d="M1 1L31 20L17 22.5L24 37L19 39L12 27L1 35V1Z"
              fill="rgba(0, 240, 255, 0.08)"
              stroke="url(#mac-neon-outline)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Subtle Inner Glass Glare Highlight */}
            <path
              d="M4 5L23 19L15 20.5"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

/* ─── Hero Component ──────────────────────────────────────────────────────── */
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
    if (isRecruiterMode) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const imageX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

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
        className={`relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern ${
          isRecruiterMode ? 'bg-amber-500/5 dark:bg-amber-950/10 border-b border-amber-500/20' : ''
        }`}
      >
        {/* Ambient Orb Glows */}
        {!isRecruiterMode && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[480px] h-[380px] rounded-full pointer-events-none animate-orb"
              style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
            />
            <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[340px] rounded-full pointer-events-none animate-orb"
              style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.1) 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '4s' }}
            />
          </>
        )}

        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isRecruiterMode ? 'max-w-[1400px]' : 'max-w-6xl'}`}>
          
          {/* Recruiter 30-Second Executive Summary Deck */}
          <RecruiterViewDeck data={data} />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Main Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono text-neutral-600 dark:text-neutral-300"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <span className="status-ping">
                  <span></span><span></span>
                </span>
                <span>Available · Open for Data Analyst & Scientist Roles</span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
                  Hi, I'm{' '}
                  <span className="text-gradient-dark">Altaf Khan</span>
                </h1>

                {/* Dynamic Role Switcher */}
                <div className="h-11 flex items-center justify-center lg:justify-start">
                  <div
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-mono text-neutral-700 dark:text-neutral-200"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.45)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Terminal className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <motion.span
                      key={currentRoleIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="font-medium"
                    >
                      {roles[currentRoleIndex]}
                    </motion.span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed font-normal mx-auto lg:mx-0">
                  {data.tagline}
                </p>
              </div>

              {/* Action Buttons with Official Clickable Brand Logos */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <a
                  href={data.resume || '/cv/Altaf_Khan_CV.pdf'}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:shadow-cyan-500/30 hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>

                <BrandSocialButton type="github" url={data.github || "https://github.com/ialtaf14"} label="GitHub" />
                <BrandSocialButton type="linkedin" url={data.linkedin || "https://www.linkedin.com/in/altaf-khan-7a544b256/"} label="LinkedIn" />
                <BrandSocialButton type="gmail" url="mailto:altafkhan122105@gmail.com" label="Gmail" />
                <BrandSocialButton type="portfolio" url="https://ialtaf14.vercel.app" label="Portfolio" />
              </motion.div>

              {/* Achievement Stats Bar */}
              <div
                className="pt-6 mt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
              >
                {[
                  { num: '2026', label: 'B.Tech Graduated' },
                  { num: '4+', label: 'Public Projects' },
                  { num: '4', label: 'NPTEL / Cisco Certs' },
                  { num: '10+', label: 'Data & AI Tools' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">{s.num}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Photo — Glass Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: imageX, y: imageY }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[310px]">
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-3 rounded-[30px] pointer-events-none animate-pulse-glow"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(112,0,255,0.12) 100%)',
                    filter: 'blur(18px)',
                  }}
                />

                {/* Glass Frame */}
                <div
                  className="relative rounded-[26px] p-[3px] photo-shimmer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.4) 0%, rgba(112,0,255,0.3) 50%, rgba(59,130,246,0.35) 100%)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,240,255,0.12)',
                  }}
                >
                  <div className="rounded-[24px] overflow-hidden bg-neutral-950 relative">
                    <img
                      src={data.profileImage || '/images/altaf.jpg'}
                      alt="Altaf Khan"
                      className="w-full aspect-[4/5] object-cover object-top transition-all duration-700 hover:scale-[1.03]"
                      style={{ filter: 'contrast(1.05) brightness(1.02)' }}
                    />

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                    {/* Floating Info Badge */}
                    <div
                      className="absolute bottom-4 left-3 right-3 p-3 rounded-[14px] space-y-0.5"
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
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
                  style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)', filter: 'blur(12px)' }}
                />
                <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.2) 0%, transparent 70%)', filter: 'blur(12px)' }}
                />
              </div>
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