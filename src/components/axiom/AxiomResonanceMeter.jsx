import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Waves, Users, Zap } from 'lucide-react';

export default function AxiomResonanceMeter({ level }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let animId;
    let time = 0;

    const draw = () => {
      time += 0.03;
      ctx.clearRect(0, 0, W, H);

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      bgGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
      bgGrad.addColorStop(1, 'rgba(6, 182, 212, 0.05)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Center line
      const centerY = H / 2;
      const maxWidth = W * 0.85;
      const startX = (W - maxWidth) / 2;
      const endX = startX + maxWidth;

      // Background bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.roundRect(startX, centerY - 8, maxWidth, 16, [8, 8, 8, 8]);
      ctx.fill();

      // Progress bar
      const progress = Math.min(level / 2000, 1);
      const fillWidth = maxWidth * progress;

      // Animated gradient
      const fillGrad = ctx.createLinearGradient(startX, centerY, startX + fillWidth, centerY);
      fillGrad.addColorStop(0, 'rgba(6, 182, 212, 0.6)');
      fillGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.8)');
      fillGrad.addColorStop(1, 'rgba(6, 182, 212, 0.6)');

      ctx.fillStyle = fillGrad;
      ctx.roundRect(startX, centerY - 8, fillWidth, 16, [8, 8, 8, 8]);
      ctx.fill();

      // Glow on fill edge
      ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(startX + fillWidth, centerY, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Ripples from the end
      for (let i = 0; i < 3; i++) {
        const offset = (time * 100 - i * 40) % (maxWidth * 0.5);
        const rippleX = startX + offset;
        if (rippleX < endX) {
          const alpha = Math.max(0, 1 - offset / (maxWidth * 0.5));
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.3})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(rippleX, centerY - 20);
          ctx.lineTo(rippleX, centerY + 20);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
      };
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [level]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Harmonic Resonance</h2>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-green-400" />
          <span className="text-lg font-bold text-green-400">{Math.floor(level).toLocaleString()}</span>
          <span className="text-xs text-white/50">active healers</span>
        </motion.div>
      </div>

      <canvas ref={canvasRef} width={600} height={60} className="w-full" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { level: 100, label: 'Level 1: Awakening', unlocked: level >= 100 },
          { level: 500, label: 'Level 2: Connection', unlocked: level >= 500 },
          { level: 1000, label: 'Level 3: Revelation', unlocked: level >= 1000 }
        ].map(milestone => (
          <motion.div
            key={milestone.level}
            animate={{ opacity: milestone.unlocked ? 1 : 0.4 }}
            className={`p-3 rounded-lg text-center text-xs font-bold transition-all ${
              milestone.unlocked
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-white/5 border border-white/10 text-white/40'
            }`}
          >
            <Zap className={`w-3 h-3 mx-auto mb-1 ${milestone.unlocked ? 'text-green-400' : 'text-white/20'}`} />
            <div>{milestone.label}</div>
            <div className="text-[10px] text-white/40 mt-1">{milestone.level} healers</div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-white/40 text-center italic">
        Every healing session amplifies the global resonance. Together, we unlock ancient knowledge.
      </p>
    </div>
  );
}