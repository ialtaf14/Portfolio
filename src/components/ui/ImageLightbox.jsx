import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

/**
 * ImageLightbox — fullscreen gallery with:
 * - Keyboard navigation (Esc, Left/Right arrows)
 * - Zoom in/out with scroll wheel
 * - Swipe support (touch)
 * - Smooth Framer Motion transitions
 */
const ImageLightbox = ({ images = [], initialIndex = 0, isOpen, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef(null);

  // Sync initialIndex when opened
  useEffect(() => {
    if (isOpen) {
      setCurrent(initialIndex);
      setZoom(1);
    }
  }, [isOpen, initialIndex]);

  const prev = useCallback(() => {
    setZoom(1);
    setCurrent((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setZoom(1);
    setCurrent((p) => (p + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, prev, next, onClose]);

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 0.1, 3));
    } else {
      setZoom((z) => Math.max(z - 0.1, 0.5));
    }
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-label="Image Lightbox"
          aria-modal="true"
        >
          {/* Toolbar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3 z-10 bg-gradient-to-b from-black/70 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-mono text-white/60">
              {current + 1} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              {/* Zoom Out */}
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {/* Zoom Level */}
              <span className="text-xs font-mono text-white/60 min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              {/* Zoom In */}
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {/* Reset Zoom */}
              <button
                onClick={() => setZoom(1)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="relative flex items-center justify-center w-full h-full px-16"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[current]}
              alt={`Screenshot ${current + 1}`}
              draggable={false}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl transition-transform duration-150 select-none"
              style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? 'grab' : 'default' }}
            />
          </motion.div>

          {/* Prev / Next Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all border border-white/20 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all border border-white/20 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Thumbnail Strip */}
          {images.length > 1 && (
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 px-4 py-3 z-10 bg-gradient-to-t from-black/70 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setZoom(1); setCurrent(i); }}
                  className={`flex-shrink-0 w-12 h-8 rounded-lg overflow-hidden border-2 transition-all ${
                    i === current
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-white/20 opacity-60 hover:opacity-90 hover:border-white/50'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Keyboard hint */}
          <div className="absolute bottom-16 right-4 text-[10px] font-mono text-white/30 text-right space-y-0.5">
            <div>← → Navigate</div>
            <div>Scroll to Zoom</div>
            <div>Esc to Close</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
