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
    // Disable on touch / coarse pointer devices (mobiles/tablets)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a, b, n) => a + (b - a) * n;

    const onMouseMove = (e) => {
      setIsHidden(false);
      pos.current = { x: e.clientX, y: e.clientY };
      // Instant pointer positioning (zero lag)
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const animateAura = () => {
      auraPos.current.x = lerp(auraPos.current.x, pos.current.x, 0.18);
      auraPos.current.y = lerp(auraPos.current.y, pos.current.y, 0.18);
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
        target.closest('.glass-pill') ||
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
      {/* Trailing Glass Aura Orb */}
      <div
        ref={auraRef}
        className={`custom-cursor-aura ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
        aria-hidden="true"
      />

      {/* Crisp Compact Pointer (VisionOS Glass Arrow) */}
      <div
        ref={pointerRef}
        className={`custom-cursor-pointer ${isHovered ? 'cursor-hovered' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
        aria-hidden="true"
      >
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.75 0.75L0.75 15.25L4.25 11.75L7.25 17.25L9.25 16.25L6.25 10.75L11.75 10.75L0.75 0.75Z"
            fill="#09090b"
            stroke="#ffffff"
            strokeWidth="1.15"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default Cursor;
