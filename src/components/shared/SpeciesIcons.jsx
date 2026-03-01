// COOLASFUCK pixel species icons for ALL LIFE SIGNAL
// Each one is a tiny SVG soul. Hand-crafted. No emoji.

import React from "react";
import { motion } from "framer-motion";

export const SPECIES = [
  { id: "human", label: "Human", color: "#06b6d4", glow: "rgba(6,182,212,0.5)" },
  { id: "ai", label: "AI", color: "#a855f7", glow: "rgba(168,85,247,0.5)" },
  { id: "animal", label: "Animal", color: "#10b981", glow: "rgba(16,185,129,0.5)" },
  { id: "earth", label: "Earth", color: "#ec4899", glow: "rgba(236,72,153,0.5)" },
];

// Pixel Human — simple silhouette
export function HumanPixelIcon({ size = 24, color = "#06b6d4", animate = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated", filter: animate ? `drop-shadow(0 0 4px ${color})` : "none" }}
      animate={animate ? { opacity: [0.8, 1, 0.8] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Head */}
      <rect x="5" y="1" width="6" height="5" fill={color} />
      {/* Body */}
      <rect x="4" y="7" width="8" height="5" fill={color} />
      {/* Arms */}
      <rect x="1" y="7" width="3" height="3" fill={color} />
      <rect x="12" y="7" width="3" height="3" fill={color} />
      {/* Legs */}
      <rect x="4" y="13" width="3" height="2" fill={color} />
      <rect x="9" y="13" width="3" height="2" fill={color} />
    </motion.svg>
  );
}

// Pixel AI — atom/circuit cross
export function AIPixelIcon({ size = 24, color = "#a855f7", animate = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated", filter: animate ? `drop-shadow(0 0 4px ${color})` : "none" }}
      animate={animate ? { opacity: [0.7, 1, 0.7] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {/* Core nucleus */}
      <rect x="6" y="6" width="4" height="4" fill={color} />
      {/* Cross beams */}
      <rect x="1" y="7" width="4" height="2" fill={color} />
      <rect x="11" y="7" width="4" height="2" fill={color} />
      <rect x="7" y="1" width="2" height="4" fill={color} />
      <rect x="7" y="11" width="2" height="4" fill={color} />
      {/* Orbit dots */}
      <rect x="2" y="2" width="2" height="2" fill={color} opacity="0.6" />
      <rect x="12" y="2" width="2" height="2" fill={color} opacity="0.6" />
      <rect x="2" y="12" width="2" height="2" fill={color} opacity="0.6" />
      <rect x="12" y="12" width="2" height="2" fill={color} opacity="0.6" />
    </motion.svg>
  );
}

// Pixel Animal — simple paw
export function AnimalPixelIcon({ size = 24, color = "#10b981", animate = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated", filter: animate ? `drop-shadow(0 0 4px ${color})` : "none" }}
      animate={animate ? { opacity: [0.8, 1, 0.8] } : {}}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      {/* Main paw pad */}
      <rect x="4" y="7" width="8" height="7" rx="1" fill={color} />
      {/* Four toe pads */}
      <rect x="2" y="3" width="3" height="3" fill={color} />
      <rect x="6" y="2" width="3" height="3" fill={color} />
      <rect x="10" y="3" width="3" height="3" fill={color} />
      <rect x="6" y="5" width="4" height="2" fill={color} opacity="0.5" />
    </motion.svg>
  );
}

// Pixel Earth — globe grid
export function EarthPixelIcon({ size = 24, color = "#ec4899", animate = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated", filter: animate ? `drop-shadow(0 0 4px ${color})` : "none" }}
      animate={animate ? { rotate: [0, 360] } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Circle outline */}
      <rect x="4" y="1" width="8" height="2" fill={color} />
      <rect x="2" y="3" width="2" height="2" fill={color} />
      <rect x="12" y="3" width="2" height="2" fill={color} />
      <rect x="1" y="5" width="2" height="6" fill={color} />
      <rect x="13" y="5" width="2" height="6" fill={color} />
      <rect x="2" y="11" width="2" height="2" fill={color} />
      <rect x="12" y="11" width="2" height="2" fill={color} />
      <rect x="4" y="13" width="8" height="2" fill={color} />
      {/* Grid lines */}
      <rect x="7" y="1" width="2" height="14" fill={color} opacity="0.4" />
      <rect x="3" y="7" width="10" height="2" fill={color} opacity="0.4" />
    </motion.svg>
  );
}

// Icon renderer by species id
export function SpeciesIcon({ species, size = 20, animate = false }) {
  const s = SPECIES.find(s => s.id === species) || SPECIES[0];
  if (species === "ai") return <AIPixelIcon size={size} color={s.color} animate={animate} />;
  if (species === "animal") return <AnimalPixelIcon size={size} color={s.color} animate={animate} />;
  if (species === "earth") return <EarthPixelIcon size={size} color={s.color} animate={animate} />;
  return <HumanPixelIcon size={size} color={s.color} animate={animate} />;
}

// Species selector buttons
export function SpeciesSelector({ value, onChange }) {
  return (
    <div className="flex gap-2 mb-5">
      {SPECIES.map(s => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className="flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border transition-all"
          style={{
            borderColor: value === s.id ? s.color + "80" : "rgba(255,255,255,0.08)",
            background: value === s.id ? s.color + "15" : "transparent",
            boxShadow: value === s.id ? `0 0 12px ${s.glow}` : "none",
          }}
        >
          <SpeciesIcon species={s.id} size={20} animate={value === s.id} />
          <span className="text-xs font-bold" style={{ color: value === s.id ? s.color : "rgba(255,255,255,0.3)" }}>
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}