import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Sun, Moon, Monitor, FileText, Github,
  Linkedin, Mail, User, Cpu, FolderGit2, GraduationCap, Award
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { mockData } from '../../data/mockData';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, setTheme } = useTheme();

  // Search items definition
  const items = [
    // Navigation
    { id: 'nav-home', title: 'Go to Home', category: 'Navigation', icon: User, action: () => scrollTo('#home') },
    { id: 'nav-about', title: 'Go to About Me', category: 'Navigation', icon: User, action: () => scrollTo('#about') },
    { id: 'nav-skills', title: 'Go to Technical Skills', category: 'Navigation', icon: Cpu, action: () => scrollTo('#skills') },
    { id: 'nav-projects', title: 'Go to Featured Projects', category: 'Navigation', icon: FolderGit2, action: () => scrollTo('#projects') },
    { id: 'nav-github', title: 'Go to Live GitHub Repos', category: 'Navigation', icon: Github, action: () => scrollTo('#github-projects') },
    { id: 'nav-edu', title: 'Go to Education', category: 'Navigation', icon: GraduationCap, action: () => scrollTo('#education') },
    { id: 'nav-cert', title: 'Go to Certifications', category: 'Navigation', icon: Award, action: () => scrollTo('#certifications') },
    { id: 'nav-contact', title: 'Go to Contact Form', category: 'Navigation', icon: Mail, action: () => scrollTo('#contact') },

    // Featured Projects direct links
    ...mockData.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `Project: ${p.title}`,
      subtitle: p.subtitle || p.description,
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        scrollTo('#projects');
        if (p.githubUrl) window.open(p.githubUrl, '_blank');
      }
    })),

    // Verified Certifications
    ...mockData.education.certifications.map((c) => ({
      id: `cert-${c.id}`,
      title: `Certificate: ${c.name}`,
      subtitle: `${c.issuer} (${c.date})`,
      category: 'Certifications',
      icon: Award,
      action: () => {
        scrollTo('#certifications');
        if (c.pdfUrl) window.open(c.pdfUrl, '_blank');
      }
    })),

    // Theme Switchers
    { id: 'theme-dark', title: 'Switch to Dark Mode', category: 'Theme', icon: Moon, action: () => setTheme('dark') },
    { id: 'theme-light', title: 'Switch to Light Mode', category: 'Theme', icon: Sun, action: () => setTheme('light') },
    { id: 'theme-system', title: 'Use System Preference', category: 'Theme', icon: Monitor, action: () => setTheme('system') },

    // Actions & External
    { id: 'act-resume', title: 'Download Resume (PDF)', category: 'Actions', icon: FileText, action: () => downloadFile('/cv/Altaf_Khan_CV.pdf') },
    { id: 'act-github', title: 'Open GitHub Profile (@ialtaf14)', category: 'Social', icon: Github, action: () => window.open('https://github.com/ialtaf14', '_blank') },
    { id: 'act-linkedin', title: 'Open LinkedIn Profile', category: 'Social', icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/altaf-khan-7a544b256/', '_blank') },
    { id: 'act-email', title: 'Send Direct Email', category: 'Contact', icon: Mail, action: () => window.open('mailto:altafkhan122105@gmail.com') }
  ];

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    link.click();
  };

  // Filter items based on query
  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  const handleSelect = useCallback(
    (item) => {
      item.action();
      onClose();
    },
    [onClose]
  );

  // Keyboard navigation & Ctrl+K trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open trigger from external call or App
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect, onClose]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Palette Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', duration: 0.25 }}
          className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 gap-3">
            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search sections, projects, certs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
            />
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-colors ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <div className="truncate text-left">
                        <div className="truncate">{item.title}</div>
                        {item.subtitle && (
                          <div className={`text-[10px] truncate ${isSelected ? 'opacity-80' : 'text-neutral-400'}`}>
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md flex-shrink-0 ml-2 ${
                      isSelected
                        ? 'bg-white/20 text-white dark:bg-black/20 dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}>
                      {item.category}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-neutral-400">
                No matching commands found for "{query}"
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
            <div>Altaf Khan Portfolio</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
