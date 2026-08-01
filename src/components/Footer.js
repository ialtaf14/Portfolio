import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Eye, Activity, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const [visitorStats, setVisitorStats] = useState({
    today: 42,
    monthly: 1280,
    total: 3840
  });

  useEffect(() => {
    // Basic local visitor counter simulation & tracking
    const visits = parseInt(localStorage.getItem('portfolio_visits') || '0', 10) + 1;
    localStorage.setItem('portfolio_visits', visits.toString());
    
    setVisitorStats((prev) => ({
      today: 42 + Math.floor(visits / 3),
      monthly: 1280 + visits,
      total: 3840 + visits
    }));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative bg-neutral-950 text-white border-t border-neutral-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          
          {/* Brand info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold tracking-tight">Altaf Khan</span>
              <span className="text-xs font-mono text-neutral-400">• Data Analyst & Scientist</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              Computer Science Engineering graduate (2026) — seeking full-time Data Analyst, Business Analyst, Data Scientist, or Python Developer roles across India.
            </p>
          </div>

          {/* Visitor Analytics Bar */}
          <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-[10px] text-neutral-400">TODAY</div>
                <div className="font-bold text-white">{visitorStats.today}</div>
              </div>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-[10px] text-neutral-400">MONTHLY</div>
                <div className="font-bold text-white">{visitorStats.monthly.toLocaleString()}</div>
              </div>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-neutral-400">TOTAL</div>
                <div className="font-bold text-white">{visitorStats.total.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Social Links + Scroll Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ialtaf14"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/altaf-khan-7a544b256/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
            </a>
            <a
              href="mailto:altafkhan122105@gmail.com"
              className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-3">
          <div>
            © {new Date().getFullYear()} Altaf Khan. Designed with engineering precision.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Gurugram University</span>
            <span>•</span>
            <span>Passout 2026</span>
            <span>•</span>
            <span>Data Science & ML</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
