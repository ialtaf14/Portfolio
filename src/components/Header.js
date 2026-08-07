import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight, Github, Search, Briefcase, Laptop, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useRecruiter } from '../contexts/RecruiterContext';

const Header = ({ onOpenCommandPalette }) => {
  const { theme, setTheme } = useTheme();
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Analytics', href: '#analytics', id: 'analytics' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#github-projects', id: 'github-projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Training', href: '#training', id: 'training' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Header show/hide on scroll
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = navItems.map(item => item.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const scrollToSection = (href) => {
    const doScroll = () => {
      const element = document.querySelector(href);
      if (element) {
        // Temporarily disable pointer events so mouse movement/hover does not cancel smooth scroll
        document.body.style.pointerEvents = 'none';

        const headerOffset = 90;
        const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - headerOffset);
        window.scrollTo({ top, behavior: 'smooth' });

        // Restore pointer events after smooth scroll animation completes
        setTimeout(() => {
          document.body.style.pointerEvents = '';
        }, 850);
      }
    };

    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(doScroll, 150);
    } else {
      doScroll();
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center pt-4 px-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="pointer-events-auto w-full max-w-5xl rounded-full glass-header px-4 py-2.5 flex items-center justify-between shadow-xl shadow-black/5"
      >
        {/* Brand/Logo */}
        <button
          onClick={() => scrollToSection('#home')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-transform"
          aria-label="Altaf Khan Home"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 group-hover:border-neutral-900 dark:group-hover:border-white transition-colors">
            <img
              src="/images/altaf.jpg"
              alt="Altaf Khan"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white leading-none">
              Altaf Khan
            </span>
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
              Data Analyst
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/70 dark:bg-neutral-900/70 p-1 rounded-full border border-neutral-200/50 dark:border-neutral-800/50">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? 'text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-full shadow-sm border border-neutral-200/60 dark:border-neutral-700/60 z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Recruiter Mode ⭐, Search, Theme Toggle & Resume */}
        <div className="flex items-center gap-2">

          {/* Recruiter Mode ⭐ Button */}
          <button
            onClick={toggleRecruiterMode}
            aria-label="Toggle Recruiter View Mode"
            title="Recruiter Mode (30-second compact layout)"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              isRecruiterMode
                ? 'bg-amber-500 text-neutral-950 font-bold border border-amber-400 shadow-amber-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recruiter View</span>
            <span className="sm:hidden">⭐</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open Command Palette (Ctrl+K)"
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-400">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Dark Mode"
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume View */}
          <a
            href="/cv/Altaf_Khan_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-x-4 top-20 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6 lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <img src="/images/altaf.jpg" alt="Altaf Khan" className="w-10 h-10 rounded-full object-cover border border-neutral-300 dark:border-neutral-700" />
                <div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">Altaf Khan</div>
                  <div className="text-xs text-neutral-500 font-mono">Data Science & ML</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Open to Full-Time Roles
              </span>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-neutral-400" />
                <span>Search portfolio commands...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-neutral-700 rounded">
                ⌘K
              </kbd>
            </button>

            <nav className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-3">
              <a
                href="/cv/Altaf_Khan_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900"
              >
                <span>View CV</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/ialtaf14"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;