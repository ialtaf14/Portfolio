import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, BarChart2, Terminal, Images, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

// ─── Auto-Sliding Screenshot Preview Panel ─────────────────────────────────────
const ScreenshotPreview = ({ images, onClose }) => {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 3500); // Normal slide time: 3.5 seconds
  }, [images.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const go = (dir, e) => {
    e.stopPropagation();
    setActive((p) => (p + dir + images.length) % images.length);
    resetTimer();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2.5 rounded-xl bg-black/60 text-white hover:bg-black/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close preview"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Counter pill */}
        <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
          {active + 1} / {images.length}
        </div>

        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={images[active]}
              alt={`Screenshot ${active + 1}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain bg-neutral-900"
            />
          </AnimatePresence>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => go(-1, e)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 sm:p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => go(1, e)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 sm:p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 py-3 bg-neutral-950">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActive(i); resetTimer(); }}
                aria-label={`Screenshot ${i + 1}`}
                animate={{ width: i === active ? 24 : 8, opacity: i === active ? 1 : 0.4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`h-1.5 rounded-full transition-colors ${
                  i === active ? 'bg-white' : 'bg-neutral-500'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Card-level auto-cycling thumbnail (no controls, just cycle) ───────────────
const AutoCycleThumbnail = ({ images }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActive((p) => (p + 1) % images.length), 3500); // Normal slide time: 3.5 seconds
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={images[active]}
          alt={`Screenshot ${active + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </AnimatePresence>

      {/* Animated dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, i) => (
            <motion.span
              key={i}
              animate={{ width: i === active ? 18 : 6, opacity: i === active ? 1 : 0.45 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`h-1.5 rounded-full ${i === active ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Count badge */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white">
          {active + 1}/{images.length}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

// ─── Placeholder when no screenshots ──────────────────────────────────────────
const Placeholder = ({ title, language }) => (
  <div className="relative w-full h-full bg-neutral-900 text-white flex flex-col justify-between p-4 select-none">
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-blue-500/20 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-neutral-300">
        <Terminal className="w-3 h-3 text-emerald-400" />
        <span>DATA PROJECT</span>
      </div>
      {language && (
        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-neutral-800/80 border border-neutral-700/80 rounded text-neutral-300">
          {language}
        </span>
      )}
    </div>
    <div className="relative z-10 my-auto flex items-center justify-center gap-3 py-2">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <Database className="w-6 h-6 text-blue-400" />
      </div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <BarChart2 className="w-6 h-6 text-emerald-400" />
      </div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <Code2 className="w-6 h-6 text-purple-400" />
      </div>
    </div>
    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10 pt-2">
      <span className="truncate max-w-[200px] text-white font-medium">{title}</span>
      <span className="text-[9px] uppercase tracking-wider text-neutral-500">Repository</span>
    </div>
  </div>
);

// ─── Main Export ───────────────────────────────────────────────────────────────
const ProjectCardMedia = ({ images = [], fallbackImage = null, title = '', language = '', isExpanded = false }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const allImages = images && images.length > 0
    ? images
    : fallbackImage
    ? [fallbackImage]
    : [];

  const hasImages = allImages.length > 0;

  return (
    <>
      {/* Fixed-height media banner */}
      <motion.div
        animate={{ height: isExpanded ? 200 : 176 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full rounded-t-2xl overflow-hidden border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0"
      >
        {hasImages ? (
          <AutoCycleThumbnail images={allImages} />
        ) : (
          <Placeholder title={title} language={language} />
        )}

        {/* Hover reveal: View Screenshots / No Preview */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none"
            >
              {hasImages ? (
                <button
                  onClick={(e) => { e.stopPropagation(); setPreviewOpen(true); }}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white hover:bg-black/90 transition-colors shadow-lg"
                >
                  <Images className="w-3.5 h-3.5 text-blue-400" />
                  View Screenshots ({allImages.length})
                </button>
              ) : (
                <div className="pointer-events-none inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-neutral-400 shadow-lg">
                  <ImageOff className="w-3.5 h-3.5 text-neutral-500" />
                  No Preview Available
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full-screen screenshot preview modal */}
      <AnimatePresence>
        {previewOpen && hasImages && (
          <ScreenshotPreview images={allImages} onClose={() => setPreviewOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCardMedia;
