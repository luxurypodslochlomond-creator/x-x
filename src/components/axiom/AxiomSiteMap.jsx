import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';

export default function AxiomSiteMap({ sites, onSelectSite }) {
  const canvasRef = useRef(null);
  const sitePositionsRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let animId;
    let time = 0;
    
    // Earth rotation: 360° per 86400 seconds (24h), sped up for visual effect
    const earthRotationSpeed = (360 / 86400) * 100; // 100x speed for vibe

    // Handle canvas clicks
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

      // Check if click is near any site (tolerance: 30px)
      const tolerance = 30;
      for (const [siteId, pos] of Object.entries(sitePositionsRef.current)) {
        const dist = Math.hypot(clickX - pos.x, clickY - pos.y);
        if (dist < tolerance) {
          const site = sites.find(s => s.id === siteId);
          if (site) onSelectSite(site);
          return;
        }
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

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

      // Sites with pulsing halos + frequency visualization
      sites.forEach((site, idx) => {
        const latRad = (site.lat * Math.PI) / 180;
        // Apply Earth rotation to longitude
        const rotatedLng = site.lng + (time * earthRotationSpeed);
        const lngRad = (rotatedLng * Math.PI) / 180;
        const x = cx + radius * Math.cos(latRad) * Math.cos(lngRad);
        const y = cy + radius * Math.sin(latRad);

        // Multi-layer quantum halo
        const pulse1 = 35 + Math.sin(time * 1.2 + idx) * 12;
        const pulse2 = 50 + Math.sin(time * 0.8 + idx + 2) * 15;
        
        // Outer quantum ring
        const grad2 = ctx.createRadialGradient(x, y, 0, x, y, pulse2);
        grad2.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
        grad2.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
        grad2.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(x, y, pulse2, 0, Math.PI * 2);
        ctx.fill();

        // Inner halo
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulse1);
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.6)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulse1, 0, Math.PI * 2);
        ctx.fill();

        // Core dot with frequency-responsive vibration
        const freqVibration = Math.sin(time * (site.frequency / 100)) * 1.5;
        const freqGlow = 8 + Math.sin(time * (site.frequency / 200)) * 3;
        ctx.shadowColor = `hsl(${(site.frequency / 10) % 360}, 100%, 50%)`;
        ctx.shadowBlur = freqGlow;
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(x + freqVibration, y + freqVibration, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner spark — resonance indicator
        const resonance = Math.sin(time * (site.frequency / 50));
        ctx.shadowColor = resonance > 0 ? 'rgba(236, 72, 153, 0.8)' : 'rgba(16, 185, 129, 0.8)';
        ctx.shadowBlur = Math.abs(resonance) * 12;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 2 + Math.abs(resonance) * 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Connecting lines — flowing resonance
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

          // Background connection
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Flowing energy pulse
          const flowPos = (time * 50) % 100;
          const px = x1 + ((x2 - x1) * flowPos) / 100;
          const py = y1 + ((y2 - y1) * flowPos) / 100;
          
          ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

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