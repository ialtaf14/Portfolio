import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Phone, Linkedin, Github, ArrowUpRight, Sparkles } from 'lucide-react';

const CONTACTS = [
  {
    label: 'WhatsApp',
    icon: Phone,
    href: 'https://wa.me/918053821088',
    color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    desc: '+91 80538 21088'
  },
  {
    label: 'Email',
    icon: Mail,
    href: 'mailto:altafkhan122105@gmail.com',
    color: 'bg-blue-500 hover:bg-blue-600 text-white',
    desc: 'altafkhan122105@gmail.com'
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/altaf-khan-7a544b256/',
    color: 'bg-sky-600 hover:bg-sky-700 text-white',
    desc: 'linkedin.com/in/altaf-khan'
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/ialtaf14',
    color: 'bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-neutral-700 dark:hover:bg-neutral-600',
    desc: 'github.com/ialtaf14'
  }
];

// Exact AI Orb SVG Component matching AIChatbot
const AILogoSvg = ({ width = 28, height = 28 }) => (
  <svg viewBox="0 0 32 32" width={width} height={height} fill="none">
    <motion.ellipse
      cx="16" cy="16" rx="13" ry="5"
      stroke="white" strokeWidth="1" opacity="0.4"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '16px 16px' }}
    />
    <motion.ellipse
      cx="16" cy="16" rx="10" ry="4"
      stroke="white" strokeWidth="1" opacity="0.5"
      transform="rotate(60 16 16)"
      animate={{ rotate: [60, 420] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '16px 16px' }}
    />
    <motion.ellipse
      cx="16" cy="16" rx="7" ry="3"
      stroke="white" strokeWidth="1" opacity="0.6"
      transform="rotate(-45 16 16)"
      animate={{ rotate: [-45, 315] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '16px 16px' }}
    />
    <circle cx="16" cy="16" r="4" fill="white" opacity="0.95" />
    <circle cx="16" cy="16" r="2.2" fill="white" opacity="1" />
    <motion.circle
      cx="29" cy="16" r="1.5" fill="white" opacity="0.9"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '16px 16px' }}
    />
    <motion.circle
      cx="16" cy="3" r="1.2" fill="white" opacity="0.7"
      animate={{ rotate: [60, 420] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '16px 16px' }}
    />
    <motion.circle
      cx="6" cy="19" r="1" fill="white" opacity="0.6"
      animate={{ rotate: [-45, 315] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '16px 16px' }}
    />
  </svg>
);

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isAiMorph, setIsAiMorph] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const timerRef = useRef(null);

  // Scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for AI Chatbot open/close state
  useEffect(() => {
    const handleAiState = (e) => {
      if (e.detail) {
        setIsAiChatOpen(!!e.detail.open);
        if (e.detail.open) {
          setIsOpen(false);
          setIsAiMorph(false);
        }
      }
    };
    window.addEventListener('ai-chat-state', handleAiState);
    return () => window.removeEventListener('ai-chat-state', handleAiState);
  }, []);

  // Close tray on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Hover timer: 2.5s -> morph to AI button with exact AI logo
  const handleMouseEnter = () => {
    if (isOpen || isAiChatOpen) return;
    setIsCharging(true);
    timerRef.current = setTimeout(() => {
      setIsAiMorph(true);
      setIsCharging(false);
    }, 2500);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsCharging(false);
    setIsAiMorph(false); // Instantly reset back to normal contact button when cursor leaves!
  };

  const handleClick = () => {
    if (isAiMorph) {
      window.dispatchEvent(new CustomEvent('open-ai-chat'));
      setIsAiMorph(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  // Jab tak AI chat open hai, contact options / contact button hide ho jaaye!
  if (isAiChatOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* AI Morph Tooltip Notification */}
          <AnimatePresence>
            {isAiMorph && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white text-[11px] font-mono font-bold shadow-xl flex items-center gap-1.5 border border-white/20 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                <span>Click to launch Altaf's AI 🤖</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Options Tray */}
          <AnimatePresence>
            {isOpen && !isAiMorph && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className="flex flex-col gap-2 mb-1"
              >
                {CONTACTS.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith('mailto') || c.href.startsWith('https://wa') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-lg text-sm font-medium ${c.color} transition-all`}
                      aria-label={c.label}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-[11px] font-bold leading-none">{c.label}</div>
                        <div className="text-[10px] opacity-80 leading-none mt-0.5 font-mono">{c.desc}</div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70 ml-auto" />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB Button */}
          <button
            onClick={handleClick}
            aria-label={
              isAiMorph
                ? 'Launch AI Assistant'
                : isOpen
                ? 'Close contact options'
                : 'Open contact options'
            }
            className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isAiMorph
                ? 'bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-600 text-white shadow-violet-500/50 scale-110 ring-4 ring-violet-400/40'
                : isOpen
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 focus:ring-neutral-500'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 focus:ring-blue-500'
            }`}
          >
            {/* Charging pulse ring during 2.5s hover */}
            {isCharging && (
              <span className="absolute inset-0 rounded-full border-2 border-violet-400 animate-ping opacity-60 pointer-events-none" />
            )}

            <AnimatePresence mode="wait">
              {isAiMorph ? (
                <motion.div
                  key="ai-icon"
                  initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 180, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  {/* Exact same orbital AI logo SVG */}
                  <AILogoSvg width={28} height={28} />
                </motion.div>
              ) : isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="contact-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Green Online Dot when normal contact button is closed */}
            {!isOpen && !isAiMorph && (
              <span className="absolute top-1 right-1 w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactButton;
