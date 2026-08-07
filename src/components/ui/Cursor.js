import React, { useEffect, useState, useRef } from 'react';

const Cursor = () => {
  const pointerRef = useRef(null);
  const auraRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a, b, n) => a + (b - a) * n;

    const onMouseMove = (e) => {
      setIsHidden(false);
      pos.current = { x: e.clientX, y: e.clientY };
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const animateAura = () => {
      auraPos.current.x = lerp(auraPos.current.x, pos.current.x, 0.16);
      auraPos.current.y = lerp(auraPos.current.y, pos.current.y, 0.16);
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x - 16}px, ${auraPos.current.y - 16}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animateAura);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.glass-card') ||
        (target.classList && target.classList.contains('cursor-pointer'));
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafRef.current = requestAnimationFrame(animateAura);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={auraRef}
        className={`custom-cursor-aura ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
      />
      <div
        ref={pointerRef}
        className={`custom-cursor-pointer ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
      >
        <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ios-glass-body-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="50%" stopColor="rgba(0, 220, 255, 0.75)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.85)" />
            </linearGradient>

            <linearGradient id="ios-glass-stroke-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <filter id="ios-glow-filter-2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0, 230, 255, 0.6)" />
            </filter>
          </defs>

          <g filter="url(#ios-glow-filter-2)">
            <path
              d="M0 0L24 16L14 18L19 30L14.5 32L9.5 20L0 27V0Z"
              fill="url(#ios-glass-body-2)"
              stroke="url(#ios-glass-stroke-2)"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M3 4L19 14.5L12 16"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default Cursor;
