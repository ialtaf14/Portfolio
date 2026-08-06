import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Download, Terminal, Copy, Check } from 'lucide-react';
import { BrandSocialButton, GithubLogo, LinkedinLogo, GmailLogo, VercelLogo } from './ui/BrandLogos';
import { useRecruiter } from '../contexts/RecruiterContext';
import RecruiterViewDeck from './ui/RecruiterViewDeck';

/* ─── Custom Cursor Component ─────────────────────────────────────────────── */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerp = (a, b, n) => a + (b - a) * n;

    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animateRing);
    };

    const onEnterInteractive = () => setExpanded(true);
    const onLeaveInteractive = () => setExpanded(false);

    document.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animateRing);

    // Attach to all interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, .glass-card, img');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${expanded ? 'cursor-expanded' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999 }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${expanded ? 'cursor-expanded' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99998 }}
      />
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