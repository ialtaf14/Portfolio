import React from 'react';

// Official SVG Brand Logos Component Suite
export const GithubLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export const LinkedinLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
  </svg>
);

export const GmailLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

export const VercelLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L24 22H0L12 1Z"/>
  </svg>
);

export const XLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const InstagramLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

// Clickable Brand Social Button Component
export const BrandSocialButton = ({ type, url, label, className = "" }) => {
  const brandConfigs = {
    github: {
      logo: GithubLogo,
      color: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:shadow-cyan-500/20",
      border: "border-neutral-700/50 dark:border-neutral-300/50"
    },
    linkedin: {
      logo: LinkedinLogo,
      color: "bg-[#0A66C2] text-white hover:bg-[#004182] hover:shadow-blue-500/30",
      border: "border-[#0A66C2]/40"
    },
    gmail: {
      logo: GmailLogo,
      color: "bg-[#EA4335] text-white hover:bg-[#c5221f] hover:shadow-red-500/30",
      border: "border-[#EA4335]/40"
    },
    portfolio: {
      logo: VercelLogo,
      color: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/30",
      border: "border-cyan-400/50"
    },
    x: {
      logo: XLogo,
      color: "bg-black text-white dark:bg-neutral-800 hover:shadow-purple-500/20",
      border: "border-neutral-700/50"
    },
    instagram: {
      logo: InstagramLogo,
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:shadow-pink-500/30",
      border: "border-pink-500/40"
    }
  };

  const config = brandConfigs[type] || brandConfigs.portfolio;
  const LogoComponent = config.logo;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${config.color} ${config.border} ${className}`}
      title={label || `Open ${type}`}
    >
      <LogoComponent className="w-4 h-4 flex-shrink-0" />
      <span>{label || type.toUpperCase()}</span>
    </a>
  );
};
