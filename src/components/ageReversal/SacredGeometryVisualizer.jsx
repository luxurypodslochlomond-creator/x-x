import React, { useRef, useEffect } from 'react';

// SACRED GEOMETRY SCIENCE:
// Metatron's Cube contains ALL 5 Platonic solids - the building blocks of matter
// Flower of Life = blueprint of creation (found in Egyptian temples, Leonardo da Vinci notebooks)
// Hexagonal tessellation = most efficient energy distribution in nature (honeycombs, carbon/graphene, snowflakes, turtle shells)
// These patterns appear naturally at cellular scale - DNA cross-section is hexagonal
// Cymatic research (Hans Jenny) shows 528Hz physically CREATES hexagonal/flower patterns in water

export default function SacredGeometryVisualizer({ playing, activeFreqs = [] }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) { animRef.current = requestAnimationFrame(draw); return; }
      const cx = W / 2;
      const cy = H / 2;
      const t = timeRef.current;

      ctx.clearRect(0, 0, W, H);

      // Deep space background
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H));
      bg.addColorStop(0, 'rgba(6,10,30,1)');
      bg.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const baseR = Math.min(W, H) * 0.32;
      const speed = playing ? 0.008 : 0.002;
      timeRef.current += speed;

      // === HEXAGONAL TESSELLATION BACKGROUND ===
      drawHexTessellation(ctx, W, H, t, playing);

      // === FLOWER OF LIFE ===
      drawFlowerOfLife(ctx, cx, cy, baseR * 0.55, t, playing);

      // === METATRON'S CUBE (outer) ===
      drawMetatronsCube(ctx, cx, cy, baseR, t, playing);

      // === FREQUENCY RINGS (one per active freq) ===
      if (playing) {
        drawFrequencyRings(ctx, cx, cy, baseR, t);
      }

      // === CENTRE NUCLEUS ===
      drawNucleus(ctx, cx, cy, t, playing);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [playing]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

function drawHexTessellation(ctx, W, H, t, playing) {
  const size = 28;
  const cols = Math.ceil(W / (size * 1.73)) + 2;
  const rows = Math.ceil(H / (size * 1.5)) + 2;
  const alpha = playing ? 0.06 + Math.sin(t * 2) * 0.02 : 0.03;

  ctx.save();
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const x = col * size * 1.73 + (row % 2) * size * 0.865;
      const y = row * size * 1.5;
      const dist = Math.sqrt((x - W/2)**2 + (y - H/2)**2);
      const wave = playing ? Math.sin(t * 3 - dist * 0.02) * 0.5 + 0.5 : 0.3;
      const a = alpha * wave;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle) * 0.9;
        const py = y + size * Math.sin(angle) * 0.9;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(6,182,212,${a})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawFlowerOfLife(ctx, cx, cy, r, t, playing) {
  const petals = 6;
  const alpha = playing ? 0.5 + Math.sin(t * 1.5) * 0.2 : 0.2;

  ctx.save();
  // Centre circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // 6 surrounding petals
  for (let i = 0; i < petals; i++) {
    const angle = (Math.PI * 2 / petals) * i + t * 0.3;
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
    gradient.addColorStop(0, `rgba(16,185,129,${alpha * 0.3})`);
    gradient.addColorStop(1, `rgba(16,185,129,0)`);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = `rgba(16,185,129,${alpha * 0.6})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Second ring (12 petals)
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 / 12) * i - t * 0.15;
    const px = cx + r * 2 * Math.cos(angle);
    const py = cy + r * 2 * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(16,185,129,${alpha * 0.25})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  ctx.restore();
}

function drawMetatronsCube(ctx, cx, cy, r, t, playing) {
  const alpha = playing ? 0.7 + Math.sin(t * 2) * 0.2 : 0.25;
  const rot = t * 0.2;

  // 13 circles of Metatron
  const centres = [[cx, cy]];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + rot;
    centres.push([cx + r * 0.58 * Math.cos(a), cy + r * 0.58 * Math.sin(a)]);
  }
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6 + rot;
    centres.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }

  ctx.save();

  // Draw connecting lines (the cube part)
  ctx.strokeStyle = `rgba(6,182,212,${alpha * 0.35})`;
  ctx.lineWidth = 0.6;
  for (let i = 0; i < centres.length; i++) {
    for (let j = i + 1; j < centres.length; j++) {
      ctx.beginPath();
      ctx.moveTo(centres[i][0], centres[i][1]);
      ctx.lineTo(centres[j][0], centres[j][1]);
      ctx.stroke();
    }
  }

  // Draw the 13 circles
  centres.forEach(([x, y], idx) => {
    const circleR = idx === 0 ? r * 0.12 : r * 0.1;
    ctx.beginPath();
    ctx.arc(x, y, circleR, 0, Math.PI * 2);
    ctx.strokeStyle = idx === 0
      ? `rgba(236,72,153,${alpha})`
      : `rgba(6,182,212,${alpha * 0.7})`;
    ctx.lineWidth = idx === 0 ? 1.5 : 0.8;
    ctx.stroke();
  });

  // Outer containing circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(139,92,246,${alpha * 0.4})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Star tetrahedron / Star of David inside
  for (let tri = 0; tri < 2; tri++) {
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = (Math.PI * 2 / 3) * i + (tri === 0 ? rot : rot + Math.PI / 3);
      const px = cx + r * 0.75 * Math.cos(a);
      const py = cy + r * 0.75 * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(245,158,11,${alpha * 0.5})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.restore();
}

function drawFrequencyRings(ctx, cx, cy, baseR, t) {
  const colors = ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#f97316'];
  colors.forEach((color, i) => {
    const phase = t * (1 + i * 0.15) + i * 0.8;
    const radius = baseR * 1.1 + i * 14 + Math.sin(phase) * 8;
    const alpha = 0.3 + Math.sin(phase * 1.3) * 0.2;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Dashed inner pulse
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
    ctx.strokeStyle = color + '30';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

function drawNucleus(ctx, cx, cy, t, playing) {
  const pulse = playing ? 1 + Math.sin(t * 4) * 0.15 : 1;
  const r = 14 * pulse;

  // Outer glow
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 4);
  glow.addColorStop(0, `rgba(236,72,153,${playing ? 0.4 : 0.15})`);
  glow.addColorStop(0.5, `rgba(139,92,246,${playing ? 0.2 : 0.08})`);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, r * 4, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // Core
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  core.addColorStop(0, '#ffffff');
  core.addColorStop(0.4, '#ec4899');
  core.addColorStop(1, '#8b5cf6');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = core;
  ctx.fill();
}