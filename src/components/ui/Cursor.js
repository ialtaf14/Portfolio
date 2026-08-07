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
        auraRef.current.style.transform = `translate3d(${auraPos.current.x - 11}px, ${auraPos.current.y - 11}px, 0)`;
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
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mac-neon-outline-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#00c8ff" />
            </linearGradient>

            <filter id="mac-neon-glow-2" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(0, 240, 255, 0.95)" />
            </filter>
          </defs>

          <g filter="url(#mac-neon-glow-2)">
            <path
              d="M1 1L31 20L17 22.5L24 37L19 39L12 27L1 35V1Z"
              fill="rgba(0, 240, 255, 0.08)"
              stroke="url(#mac-neon-outline-2)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M4 5L23 19L15 20.5"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default Cursor;
