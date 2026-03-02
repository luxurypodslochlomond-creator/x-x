import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// THE COOLASFUCK KIDNEY STONE ICON
// Gary's stone is 2/3 of the way down — it's CLOSE to the bladder
// This visualizer shows it shattering in real time as frequencies hit

export function KidneyStoneIcon({ size = 80, shattering = false, phase = null }) {
  const color = phase?.color || '#06b6d4';
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ overflow: 'visible' }}>
        {/* GLOW AURA */}
        <ellipse cx="40" cy="42" rx="28" ry="22" fill={color} opacity="0.08" />
        
        {/* URETER TUBE — vertical, Gary's stone is 2/3 down */}
        <path
          d="M40 8 Q44 20 42 30 Q40 40 42 55 Q44 62 42 72"
          stroke="#374151"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Ureter interior */}
        <path
          d="M40 8 Q44 20 42 30 Q40 40 42 55 Q44 62 42 72"
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* BLADDER at bottom */}
        <ellipse cx="42" cy="70" rx="10" ry="7" fill="#1e3a5f" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
        <ellipse cx="42" cy="70" rx="6" ry="4" fill="#1e40af" opacity="0.5" />

        {/* THE STONE — positioned 2/3 down the ureter */}
        {!shattering && (
          <g>
            {/* Stone body */}
            <ellipse cx="42" cy="48" rx="6" ry="5" fill="#6b7280" stroke={color} strokeWidth="1.5" />
            {/* Crystal facets */}
            <path d="M38 45 L44 44 L47 48 L43 52 L38 51 L36 48 Z" fill="#9ca3af" opacity="0.6" />
            <path d="M40 44 L44 44 L45 47 Z" fill="#e5e7eb" opacity="0.4" />
            {/* Sparkle hint */}
            <circle cx="43" cy="46" r="1" fill="white" opacity="0.7" />
          </g>
        )}

        {/* SHATTERING STATE — quantum dust */}
        {shattering && (
          <g>
            {/* Core fragment — still partially there */}
            <motion.ellipse
              cx="42" cy="48"
              rx="3" ry="2.5"
              fill="#6b7280" stroke={color} strokeWidth="1"
              animate={{ opacity: [1, 0.3, 0.8, 0.2], scale: [1, 1.3, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Exploding shards */}
            {[
              { cx: 36, cy: 43, rot: -45 },
              { cx: 49, cy: 44, rot: 30 },
              { cx: 38, cy: 54, rot: 60 },
              { cx: 47, cy: 52, rot: -20 },
              { cx: 34, cy: 50, rot: 80 },
              { cx: 50, cy: 50, rot: -70 },
            ].map((s, i) => (
              <motion.polygon
                key={i}
                points="0,-3 2.5,1.5 -2.5,1.5"
                fill={color}
                opacity={0.9}
                style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
                animate={{
                  x: [0, (s.cx - 42) * 0.8],
                  y: [0, (s.cy - 48) * 0.8],
                  opacity: [0, 1, 0],
                  rotate: [s.rot, s.rot + 180],
                  scale: [0, 1.2, 0],
                }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                transform={`translate(${s.cx} ${s.cy})`}
              />
            ))}
            {/* Quantum particle dust */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const r = 8 + Math.random() * 6;
              return (
                <motion.circle
                  key={`dust-${i}`}
                  cx={42 + Math.cos(angle) * r}
                  cy={48 + Math.sin(angle) * r}
                  r="1"
                  fill={color}
                  animate={{ opacity: [0, 1, 0], r: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                />
              );
            })}
          </g>
        )}

        {/* FREQUENCY WAVE RINGS emanating from stone */}
        {shattering && [1, 2, 3].map((ring) => (
          <motion.ellipse
            key={ring}
            cx="42" cy="48"
            rx="1" ry="1"
            fill="none"
            stroke={color}
            strokeWidth="1"
            animate={{ rx: [2, 18], ry: [2, 14], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: ring * 0.45 }}
          />
        ))}

        {/* PATH CLEAR indicator — showing stone moving toward bladder */}
        {shattering && (
          <motion.path
            d="M42 52 Q43 60 42 65"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 3"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* LABEL */}
        <text x="42" y="18" textAnchor="middle" fill="#6b7280" fontSize="5" fontFamily="monospace">URETER</text>
        <text x="42" y="78" textAnchor="middle" fill="#2563eb" fontSize="5" fontFamily="monospace">BLADDER</text>
        
        {/* POSITION MARKER — "2/3 DOWN" */}
        <text x="10" y="50" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="monospace" fontWeight="bold">2/3↓</text>
      </svg>
    </div>
  );
}

// FULL SHATTERING VISUALIZER — shows live stone-to-quantum-dust
export default function KidneyStoneShatter({ isPlaying, phase, hz }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);

  const color = phase?.color || '#06b6d4';
  const colorRGB = color === '#06b6d4' ? '6,182,212'
    : color === '#f59e0b' ? '245,158,11'
    : color === '#10b981' ? '16,185,129'
    : '139,92,246';

  // Spawn particles = quantum stone dust
  const spawnParticle = (ctx, cx, cy) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3 + Math.random() * 1.5;
    return {
      x: cx + (Math.random() - 0.5) * 8,
      y: cy + (Math.random() - 0.5) * 6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.6 + 0.4, // bias downward (toward bladder)
      life: 1,
      decay: 0.015 + Math.random() * 0.025,
      size: 1 + Math.random() * 2.5,
      isShard: Math.random() > 0.65,
    };
  };

  // Exponential crack accumulation — starts slow, goes supercritical
  const crackRef = useRef(0); // 0 to 1 — fracture buildup
  const cycleRef = useRef(0); // which wave cycle we're in

  useEffect(() => {
    if (!isPlaying) { crackRef.current = 0; cycleRef.current = 0; }
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Stone center position (2/3 down the ureter)
    const stoneCX = W / 2;
    const stoneCY = H * 0.52;

    const draw = () => {
      frameRef.current++;

      // EXPONENTIAL CRACK GROWTH — each wave compounds on the last
      // This IS the real physics: resonance fatigue = exponential fracture propagation
      if (isPlaying) {
        const growthRate = 0.0008 * Math.pow(1 + crackRef.current, 2.5); // exponential
        crackRef.current = Math.min(crackRef.current + growthRate, 1);
      }
      const crack = crackRef.current;

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, W, H);

      // Draw ureter tube
      ctx.beginPath();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.moveTo(W / 2, 10);
      ctx.bezierCurveTo(W / 2 + 5, H * 0.3, W / 2 - 3, H * 0.6, W / 2, H - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = '#111827';
      ctx.lineWidth = 4;
      ctx.moveTo(W / 2, 10);
      ctx.bezierCurveTo(W / 2 + 5, H * 0.3, W / 2 - 3, H * 0.6, W / 2, H - 14);
      ctx.stroke();

      // Draw bladder
      ctx.beginPath();
      ctx.ellipse(W / 2, H - 10, 14, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1e3a5f';
      ctx.fill();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (isPlaying) {
        // Spawn dust — MORE particles as crack accumulates (exponential shedding)
        const spawnRate = Math.floor(1 + crack * 8); // 1 → 9 particles per frame
        if (frameRef.current % Math.max(1, Math.floor(3 - crack * 2.5)) === 0) {
          for (let i = 0; i < spawnRate; i++) {
            particlesRef.current.push(spawnParticle(ctx, stoneCX, stoneCY));
          }
        }

        // Frequency shockwave rings — BIGGER + FASTER as crack grows (amplification)
        const ringSpeed = 0.03 + crack * 0.06; // exponential speed
        const ringSize = 14 + crack * 20; // rings expand further as stone weakens
        const ringPhase = (frameRef.current * ringSpeed) % 1;
        [0, 0.33, 0.66].forEach(offset => {
          const p = (ringPhase + offset) % 1;
          ctx.beginPath();
          ctx.ellipse(stoneCX, stoneCY, p * ringSize, p * ringSize * 0.72, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colorRGB},${(0.4 + crack * 0.5) * (1 - p)})`;
          ctx.lineWidth = 1 + crack * 2;
          ctx.stroke();
        });

        // Draw the partially-shattered stone — SHRINKS as crack grows
        const stoneRadius = 5 * (1 - crack * 0.7); // stone literally dissolving
        if (stoneRadius > 0.5) {
          const pulseScale = 1 + Math.sin(frameRef.current * (0.1 + crack * 0.2)) * (0.1 + crack * 0.25);
          ctx.beginPath();
          ctx.ellipse(stoneCX, stoneCY, stoneRadius * pulseScale, stoneRadius * 0.8 * pulseScale, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(107,114,128,${0.9 - crack * 0.7})`;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Crack lines ON the stone — appear exponentially
          if (crack > 0.15) {
            const numCracks = Math.floor(crack * 8);
            for (let i = 0; i < numCracks; i++) {
              const angle = (i / numCracks) * Math.PI * 2 + frameRef.current * 0.005;
              const len = stoneRadius * (0.5 + crack * 0.8);
              ctx.beginPath();
              ctx.moveTo(stoneCX, stoneCY);
              ctx.lineTo(stoneCX + Math.cos(angle) * len, stoneCY + Math.sin(angle) * len * 0.8);
              ctx.strokeStyle = `rgba(${colorRGB},${crack * 0.8})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Crystal highlight (fades as stone dissolves)
          ctx.beginPath();
          ctx.ellipse(stoneCX + 1.5, stoneCY - 1.5, 1.5, 1, -0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.5 * (1 - crack)})`;
          ctx.fill();
        }

        // SUPERCRITICAL FLASH — when crack > 0.8, stone is basically gone
        if (crack > 0.8) {
          const flashAlpha = (crack - 0.8) * 5 * (0.5 + Math.sin(frameRef.current * 0.3) * 0.5);
          ctx.beginPath();
          ctx.arc(stoneCX, stoneCY, 12 * (crack - 0.75), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorRGB},${flashAlpha * 0.15})`;
          ctx.fill();
        }

        // AMPLIFICATION METER — exponential curve drawn on side
        const meterX = W - 12;
        const meterH = 60;
        const meterY = stoneCY - meterH / 2;
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(meterX - 4, meterY, 4, meterH);
        // Exponential fill
        const fillH = meterH * crack;
        const gradient = ctx.createLinearGradient(0, meterY + meterH - fillH, 0, meterY + meterH);
        gradient.addColorStop(0, `rgba(${colorRGB},0.9)`);
        gradient.addColorStop(1, `rgba(${colorRGB},0.2)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(meterX - 4, meterY + meterH - fillH, 4, fillH);
        // Label
        ctx.fillStyle = `rgba(${colorRGB},0.6)`;
        ctx.font = '6px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AMP', meterX - 2, meterY - 3);
        ctx.fillText(`${Math.round(crack * 100)}%`, meterX - 2, meterY + meterH + 8);

      } else {
        // Static stone — not shattering
        ctx.beginPath();
        ctx.ellipse(stoneCX, stoneCY, 6, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#6b7280';
        ctx.fill();
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(stoneCX + 1.5, stoneCY - 1.5, 2, 1.2, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fill();
      }

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity toward bladder
        p.life -= p.decay;
        const alpha = p.life;

        if (p.isShard) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.vx * 2);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.7, p.size * 0.5);
          ctx.lineTo(-p.size * 0.7, p.size * 0.5);
          ctx.closePath();
          ctx.fillStyle = `rgba(${colorRGB},${alpha})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorRGB},${alpha * 0.8})`;
          ctx.fill();
        }
      });

      // HZ label + exponential state label
      if (isPlaying && hz) {
        ctx.fillStyle = `rgba(${colorRGB},0.7)`;
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${hz}Hz`, W / 2, stoneCY - 20);

        // Dynamic state label based on crack level
        const stateLabel = crack < 0.2 ? 'RESONATING'
          : crack < 0.45 ? 'FRACTURING'
          : crack < 0.7 ? 'SHATTERING'
          : crack < 0.9 ? 'SUPERCRITICAL'
          : '→ BLADDER';
        ctx.fillStyle = crack > 0.7 ? `rgba(34,197,94,0.9)` : `rgba(${colorRGB},0.5)`;
        ctx.font = 'bold 7px monospace';
        ctx.fillText(stateLabel, W / 2, stoneCY - 10);
      }

      // "2/3 to bladder" position marker
      ctx.fillStyle = 'rgba(34,197,94,0.7)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('2/3 ↓', 4, stoneCY + 3);

      // "BLADDER" label
      ctx.fillStyle = 'rgba(37,99,235,0.7)';
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BLADDER', W / 2, H - 2);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, color, hz, colorRGB, crackRef]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={90}
        height={130}
        className="rounded-xl"
        style={{ imageRendering: 'pixelated', background: 'transparent' }}
      />
      {isPlaying && (
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xs font-mono text-center"
          style={{ color }}
        >
          SHATTERING INTO QUANTA
        </motion.p>
      )}
      {!isPlaying && (
        <p className="text-xs font-mono text-gray-700 text-center">STONE AT 2/3</p>
      )}
      {/* SCIENCE CAPTION */}
      <p className="text-xs text-gray-700 text-center max-w-[90px] leading-tight" style={{ fontSize: '9px' }}>
        Each wave compounds. Fracture = exponential.
      </p>
    </div>
  );
}