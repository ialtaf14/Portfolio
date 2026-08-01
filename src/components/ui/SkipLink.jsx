import React from 'react';

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white dark:focus:bg-white dark:focus:text-neutral-900 focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs font-bold"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
