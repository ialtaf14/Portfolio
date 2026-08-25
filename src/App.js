import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollProgress from './components/ui/ScrollProgress';
import SkipLink from './components/ui/SkipLink';
import CommandPalette from './components/ui/CommandPalette';
import ErrorBoundary from './components/ErrorBoundary';

import { ThemeProvider } from './contexts/ThemeContext';
import { RecruiterProvider } from './contexts/RecruiterContext';

import Portfolio from './components/Portfolio';
import NotFound from './components/NotFound';

function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener + Stale Chunk Recovery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    const handleUnhandledRejection = (e) => {
      const reason = e.reason;
      if (
        reason &&
        (reason.name === 'ChunkLoadError' ||
          (reason.message && reason.message.includes('Loading chunk')))
      ) {
        const lastReload = sessionStorage.getItem('global_chunk_reload');
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem('global_chunk_reload', now.toString());
          window.location.reload();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ThemeProvider>
      <RecruiterProvider>
        <BrowserRouter>
          <SkipLink />
          <ScrollProgress />
          <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />

      <div className="App min-h-screen bg-white dark:bg-neutral-950">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Portfolio onOpenCommandPalette={() => setIsPaletteOpen(true)} />
              </ErrorBoundary>
            }
          />
          <Route
            path="*"
            element={
              <ErrorBoundary>
                <NotFound />
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
        </BrowserRouter>
      </RecruiterProvider>
    </ThemeProvider>
  );
}

export default App;