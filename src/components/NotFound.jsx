import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Terminal, Github, Linkedin, Mail, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  // Set document title for 404 page
  useEffect(() => {
    document.title = '404 — Page Not Found | Altaf Khan Portfolio';
    return () => {
      document.title = 'Altaf Khan | Data Analyst & Data Scientist';
    };
  }, []);

  const QUICK_LINKS = [
    { label: 'Projects', href: '/#github-projects' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Education', href: '/#education' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white px-4 py-16"
      role="main"
      aria-label="404 Page Not Found"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-md w-full text-center space-y-8 p-8 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl"
      >
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs font-mono text-red-600 dark:text-red-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>404 — PAGE NOT FOUND</span>
        </div>

        {/* Big 404 */}
        <div className="space-y-2">
          <div className="text-8xl font-black font-mono text-neutral-900 dark:text-white tracking-tighter select-none">
            404
          </div>
          <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Oops! Page doesn't exist
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            The page or route you're looking for doesn't exist, was moved, or the URL may be incorrect.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-left space-y-2">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Quick Navigation</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-colors"
              >
                <Search className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>

        {/* Social Row */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <a href="https://github.com/ialtaf14" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/altaf-khan-7a544b256/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full text-neutral-400 hover:text-blue-500 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:altafkhan122105@gmail.com" aria-label="Email" className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </a>
          <span className="text-[11px] font-mono text-neutral-400 ml-2">altafkhan122105@gmail.com</span>
        </div>

      </motion.div>
    </div>
  );
};

export default NotFound;
