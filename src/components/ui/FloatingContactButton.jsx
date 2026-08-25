import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Phone, Linkedin, Github, ArrowUpRight } from 'lucide-react';

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
    href: 'https://www.linkedin.com/in/ialtaf14/',
    color: 'bg-sky-600 hover:bg-sky-700 text-white',
    desc: 'linkedin.com/in/ialtaf14'
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/ialtaf14',
    color: 'bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-neutral-700 dark:hover:bg-neutral-600',
    desc: 'github.com/ialtaf14'
  }
];

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

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

  const handleClick = () => {
    setIsOpen((prev) => !prev);
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
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-3"
        >
          {/* Contact Options Tray */}
          <AnimatePresence>
            {isOpen && (
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

          {/* Main Contact FAB Button */}
          <button
            onClick={handleClick}
            aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isOpen
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 focus:ring-neutral-500'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 focus:ring-blue-500'
            }`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
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

            {/* Green Online Dot when contact button is closed */}
            {!isOpen && (
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
