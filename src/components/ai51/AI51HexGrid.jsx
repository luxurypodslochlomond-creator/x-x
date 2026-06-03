import React, { useEffect, useRef } from 'react';

/**
 * AI51 HEXAGONAL TESSELLATION — the soul of the aesthetic ♾️
 * Living, breathing hex grid that reacts to AI state
 */
export default function AI51HexGrid({ state = 'idle', intensity = 0 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const stateColors = {
    idle:     { primary: '#06b6d4', secondary: '#0e7490', glow: 'rgba(6,182,212,0.15)' },
    thinking: { primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245,158,11,0.2)' },
    speaking: { primary: '#10b981', secondary: '#059669', glow: 'rgba(16,185,129,0.2)' },
    listening:{ primary: '#ec4899', secondary: '#db2777', glow: 'rgba(236,72,153,0.25)' },
    memory:   { primary: '#a855f7', secondary: '#7c3aed', glow: 'rgba(168,85,247,0.2)' },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const hexSize = 22;
    const hexH = hexSize * Math.sqrt(3);
    const hexW = hexSize * 2;

    const drawHex = (x, y, size, alpha, color, glowColor) => {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      if (glowColor && alpha > 0.3) {
        ctx.shadowBlur = 12 * alpha;
        ctx.shadowColor = glowColor;
      }

      ctx.strokeStyle = color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
      // Handle hex colors
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1,3),16);
        const g = parseInt(color.slice(3,5),16);
        const b = parseInt(color.slice(5,7),16);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.06})`;
      }
      ctx.lineWidth = 0.8;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      timeRef.current += 0.012;
      const t = timeRef.current;
      const colors = stateColors[state] || stateColors.idle;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / (hexW * 0.75)) + 2;
      const rows = Math.ceil(canvas.height / hexH) + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * hexW * 0.75;
          const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);

          const distX = (x - canvas.width / 2) / canvas.width;
          const distY = (y - canvas.height / 2) / canvas.height;
          const dist = Math.sqrt(distX * distX + distY * distY);

          const wave = Math.sin(t * 1.2 - dist * 8 + col * 0.3 + row * 0.3);
          const pulse = Math.sin(t * 2.5 + dist * 5) * 0.5 + 0.5;

          const baseAlpha = 0.08 + intensity * 0.1;
          const alpha = baseAlpha + wave * 0.12 + pulse * 0.08 * (1 - dist * 0.8);

          const clampedAlpha = Math.max(0.02, Math.min(0.5, alpha));

          // Alternate primary/secondary
          const color = (col + row) % 3 === 0 ? colors.secondary : colors.primary;
          drawHex(x, y, hexSize - 2, clampedAlpha, color, colors.glow);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [state, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}