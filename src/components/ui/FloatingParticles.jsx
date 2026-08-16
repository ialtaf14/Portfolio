import React from "react";

const PARTICLES = [
  { top: "15%", left: "10%", size: 4, duration: "7s", delay: "0s", color: "rgba(0, 240, 255, 0.4)" },
  { top: "25%", left: "85%", size: 6, duration: "9s", delay: "1.5s", color: "rgba(112, 0, 255, 0.35)" },
  { top: "60%", left: "15%", size: 5, duration: "8s", delay: "2s", color: "rgba(59, 130, 246, 0.35)" },
  { top: "75%", left: "80%", size: 4, duration: "6s", delay: "0.5s", color: "rgba(0, 240, 255, 0.3)" },
  { top: "45%", left: "92%", size: 7, duration: "10s", delay: "3s", color: "rgba(16, 185, 129, 0.3)" },
  { top: "80%", left: "30%", size: 5, duration: "8.5s", delay: "1s", color: "rgba(112, 0, 255, 0.25)" },
  { top: "20%", left: "50%", size: 3, duration: "6.5s", delay: "2.5s", color: "rgba(0, 240, 255, 0.45)" },
];

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle-drift"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            "--duration": p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
