import React, { useEffect, useRef, useState } from 'react';

/**
 * VISUAL THERAPY
 * Screen pulses at exact healing frequency
 * Color therapy synchronized to audio
 */

export default function VisualTherapy({ 
  active, 
  frequency, 
  color = [99, 102, 241], 
  intensity = 80 
}) {
  const [pulse, setPulse] = useState(0);
  const animRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    if (!active || frequency <= 0) {
      setPulse(0);
      return;
    }

    // Clamp frequency for visual (too fast is seizure risk)
    const visualHz = Math.min(frequency, 10);
    const cycleTime = 1000 / visualHz;

    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      // Advance phase based on frequency
      phaseRef.current += (delta / cycleTime) * Math.PI * 2;
      if (phaseRef.current > Math.PI * 2) {
        phaseRef.current -= Math.PI * 2;
      }

      // Smooth sine wave pulse
      const newPulse = Math.sin(phaseRef.current) * 0.5 + 0.5;
      setPulse(newPulse);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [active, frequency]);

  if (!active) return null;

  const [r, g, b] = color;
  const scaledIntensity = intensity / 100;
  const alpha = 0.1 + pulse * 0.5 * scaledIntensity;
  const glowSize = 200 + pulse * 300 * scaledIntensity;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at 50% 40%, 
          rgba(${r}, ${g}, ${b}, ${alpha}) 0%, 
          transparent ${glowSize}px, 
          transparent 100%)`
      }}
    />
  );
}