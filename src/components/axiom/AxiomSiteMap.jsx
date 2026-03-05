import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';

export default function AxiomSiteMap({ sites, onSelectSite }) {
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
      time += 0.01;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = 'rgba(10, 5, 20, 0.8)';
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Earth sphere projection
      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * 0.35;

      // Draw sphere grid
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 1;
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const rad = (lat * Math.PI) / 180;
          const x = cx + radius * Math.cos(rad) * Math.cos((lng * Math.PI) / 180);
          const y = cy + radius * Math.sin(rad);
          lng === -180 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -80; lat <= 80; lat += 5) {
          const rad = (lat * Math.PI) / 180;
          const x = cx + radius * Math.cos(rad) * Math.cos((lng * Math.PI) / 180);
          const y = cy + radius * Math.sin(rad);
          lat === -80 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Sites with pulsing halos
      sites.forEach(site => {
        const latRad = (site.lat * Math.PI) / 180;
        const lngRad = (site.lng * Math.PI) / 180;
        const x = cx + radius * Math.cos(latRad) * Math.cos(lngRad);
        const y = cy + radius * Math.sin(latRad);

        // Halo
        const haloSize = 25 + Math.sin(time + site.id.length) * 8;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, haloSize);
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
        gradient.addColorStop(0.7, 'rgba(34, 211, 238, 0.1)');
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, haloSize, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Connecting lines between sites
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      for (let i = 0; i < sites.length; i++) {
        for (let j = i + 1; j < sites.length; j++) {
          const site1 = sites[i];
          const site2 = sites[j];
          const lat1 = (site1.lat * Math.PI) / 180;
          const lng1 = (site1.lng * Math.PI) / 180;
          const lat2 = (site2.lat * Math.PI) / 180;
          const lng2 = (site2.lng * Math.PI) / 180;

          const x1 = cx + radius * Math.cos(lat1) * Math.cos(lng1);
          const y1 = cy + radius * Math.sin(lat1);
          const x2 = cx + radius * Math.cos(lat2) * Math.cos(lng2);
          const y2 = cy + radius * Math.sin(lat2);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [sites]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full rounded-2xl border border-cyan-500/30 bg-black"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sites.map(site => (
          <motion.button
            key={site.id}
            onClick={() => onSelectSite(site)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all text-left"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm">{site.name}</h4>
                <p className="text-xs text-white/50">{site.location}</p>
              </div>
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}