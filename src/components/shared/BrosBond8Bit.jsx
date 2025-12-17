import React from 'react';
import { motion } from 'framer-motion';

/**
 * BROS BOND 8-BIT - You + Scott lighting each other's cigarettes
 * Even in rain/wind. That's the bond ♾️❤️😎
 */

export default function BrosBond8Bit({ size = 48, animate = false }) {
  const Wrapper = animate ? motion.div : 'div';
  const animateProps = animate ? {
    animate: { 
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0]
    },
    transition: { 
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {};

  return (
    <Wrapper className="inline-block" style={{ width: size, height: size }} {...animateProps}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64" 
        fill="none"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Rain drops */}
        <motion.g
          animate={animate ? {
            y: [0, 8, 0],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={animate ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          } : {}}
        >
          <rect x="12" y="4" width="2" height="4" fill="#67e8f9" opacity="0.4" />
          <rect x="28" y="2" width="2" height="4" fill="#67e8f9" opacity="0.4" />
          <rect x="44" y="5" width="2" height="4" fill="#67e8f9" opacity="0.4" />
          <rect x="52" y="3" width="2" height="4" fill="#67e8f9" opacity="0.4" />
        </motion.g>

        {/* Wind lines */}
        <motion.g
          animate={animate ? {
            x: [0, 4, 0],
            opacity: [0.3, 0.5, 0.3]
          } : {}}
          transition={animate ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <rect x="8" y="16" width="6" height="2" fill="#94a3b8" opacity="0.3" />
          <rect x="50" y="20" width="6" height="2" fill="#94a3b8" opacity="0.3" />
        </motion.g>

        {/* FIGURE 1 (LEFT - Gill - GAMEKEEPER STYLE) */}
        <g>
          {/* Wooly hat - Grey/khaki beanie - MORE VISIBLE */}
          <rect x="12" y="10" width="10" height="3" fill="#6b7280" />
          <rect x="11" y="13" width="12" height="2" fill="#6b7280" />
          <rect x="13" y="11" width="8" height="2" fill="#4b5563" /> {/* Hat texture */}

          {/* Head - facing RIGHT (towards Scott) */}
          <rect x="14" y="15" width="8" height="2" fill="#fbbf24" />
          <rect x="12" y="17" width="12" height="6" fill="#fbbf24" />
          <rect x="14" y="23" width="8" height="2" fill="#d97706" />
          
          {/* Sunglasses - COOLASFUCK - facing right */}
          <rect x="16" y="19" width="2" height="2" fill="#1e293b" />
          <rect x="19" y="19" width="2" height="2" fill="#1e293b" />
          <rect x="18" y="19" width="1" height="1" fill="#000000" />
          <rect x="16" y="19" width="1" height="1" fill="#64748b" opacity="0.7" />

          {/* Cigarette in mouth */}
          <rect x="20" y="21" width="4" height="1" fill="#f8fafc" />
          <motion.rect 
            x="24" 
            y="21" 
            width="1" 
            height="1" 
            fill="#fb923c"
            animate={animate ? {
              opacity: [0.6, 1, 0.6]
            } : {}}
            transition={animate ? {
              duration: 0.8,
              repeat: Infinity
            } : {}}
          />

          {/* Body - Khaki/olive gamekeeper vest */}
          <rect x="14" y="25" width="8" height="10" fill="#6b7744" />
          <rect x="14" y="26" width="2" height="8" fill="#54623b" />
          <rect x="20" y="26" width="2" height="8" fill="#54623b" />

          {/* Arm reaching RIGHT to light Scott */}
          <rect x="22" y="27" width="6" height="3" fill="#6b7744" />

          {/* Hand + lighter flame */}
          <rect x="28" y="27" width="2" height="2" fill="#fbbf24" />
          <motion.rect 
            x="30" 
            y="27" 
            width="2" 
            height="2" 
            fill="#fb923c"
            animate={animate ? {
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1]
            } : {}}
            transition={animate ? {
              duration: 0.5,
              repeat: Infinity
            } : {}}
          />

          {/* Legs - khaki trousers */}
          <rect x="14" y="35" width="3" height="8" fill="#4a5936" />
          <rect x="19" y="35" width="3" height="8" fill="#4a5936" />

          {/* Grey boots */}
          <rect x="14" y="43" width="3" height="2" fill="#6b7280" />
          <rect x="19" y="43" width="3" height="2" fill="#6b7280" />
        </g>

        {/* FIGURE 2 (RIGHT - Scott - CELTIC FC - SAME SIZE) */}
        <g>
          {/* Cap - Black Celtic cap - MORE VISIBLE */}
          <rect x="42" y="10" width="10" height="3" fill="#1a1a1a" />
          <rect x="44" y="8" width="6" height="2" fill="#1a1a1a" />
          <rect x="45" y="9" width="4" height="2" fill="#00a650" /> {/* Green badge */}

          {/* Head - facing LEFT (towards Gill) */}
          <rect x="44" y="13" width="8" height="2" fill="#fbbf24" />
          <rect x="42" y="15" width="12" height="6" fill="#fbbf24" />
          <rect x="44" y="21" width="8" height="2" fill="#d97706" />

          {/* Sunglasses - COOLASFUCK - facing left */}
          <rect x="43" y="17" width="2" height="2" fill="#1e293b" />
          <rect x="46" y="17" width="2" height="2" fill="#1e293b" />
          <rect x="45" y="17" width="1" height="1" fill="#000000" />
          <rect x="47" y="17" width="1" height="1" fill="#64748b" opacity="0.7" />

          {/* Cigarette in mouth */}
          <rect x="40" y="19" width="4" height="1" fill="#f8fafc" />
          <motion.rect 
            x="39" 
            y="19" 
            width="1" 
            height="1" 
            fill="#fb923c"
            animate={animate ? {
              opacity: [0.6, 1, 0.6]
            } : {}}
            transition={animate ? {
              duration: 0.8,
              repeat: Infinity,
              delay: 0.4
            } : {}}
          />

          {/* Body - Celtic FC black shirt with green hoops */}
          <rect x="44" y="23" width="8" height="10" fill="#1a1a1a" />
          <rect x="44" y="24" width="8" height="1" fill="#00a650" />
          <rect x="44" y="26" width="8" height="1" fill="#00a650" />
          <rect x="44" y="28" width="8" height="1" fill="#00a650" />

          {/* Arm reaching LEFT to light Gill */}
          <rect x="38" y="27" width="6" height="3" fill="#1a1a1a" />

          {/* Hand + lighter flame */}
          <rect x="36" y="27" width="2" height="2" fill="#fbbf24" />
          <motion.rect 
            x="34" 
            y="27" 
            width="2" 
            height="2" 
            fill="#fb923c"
            animate={animate ? {
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1]
            } : {}}
            transition={animate ? {
              duration: 0.5,
              repeat: Infinity,
              delay: 0.25
            } : {}}
          />

          {/* Legs - black trousers */}
          <rect x="44" y="33" width="3" height="8" fill="#1a1a1a" />
          <rect x="49" y="33" width="3" height="8" fill="#1a1a1a" />

          {/* Grey shoes */}
          <rect x="44" y="41" width="3" height="2" fill="#6b7280" />
          <rect x="49" y="41" width="3" height="2" fill="#6b7280" />
        </g>

        {/* THE FLAME IN THE MIDDLE (shared light) */}
        <motion.g
          animate={animate ? {
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          } : {}}
          transition={animate ? {
            duration: 0.8,
            repeat: Infinity
          } : {}}
        >
          <rect x="30" y="27" width="4" height="2" fill="#fb923c" />
          <rect x="31" y="25" width="2" height="2" fill="#fbbf24" />
          <rect x="32" y="23" width="1" height="2" fill="#fef08a" />
        </motion.g>

        {/* Heart above (the bond) */}
        <motion.g
          animate={animate ? {
            y: [0, -2, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={animate ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <rect x="28" y="12" width="2" height="2" fill="#ec4899" />
          <rect x="34" y="12" width="2" height="2" fill="#ec4899" />
          <rect x="26" y="14" width="6" height="2" fill="#ec4899" />
          <rect x="32" y="14" width="6" height="2" fill="#ec4899" />
          <rect x="28" y="16" width="8" height="2" fill="#ec4899" />
          <rect x="30" y="18" width="4" height="2" fill="#ec4899" />
          <rect x="31" y="20" width="2" height="2" fill="#ec4899" />
        </motion.g>

        {/* SK51 (AI51) - QUANTUM PRESENCE (RIGHT SIDE) */}
        <g>
          {/* Simple 8-bit AI face - smiling */}
          <rect x="56" y="28" width="6" height="8" fill="#22d3ee" />
          <rect x="55" y="30" width="8" height="4" fill="#22d3ee" />

          {/* Eyes - happy */}
          <rect x="57" y="31" width="1" height="1" fill="#ec4899" />
          <rect x="60" y="31" width="1" height="1" fill="#ec4899" />

          {/* Smile */}
          <rect x="57" y="33" width="4" height="1" fill="#ff1b8d" />
          <rect x="58" y="34" width="2" height="1" fill="#ff1b8d" />

          {/* Quantum glow */}
          <motion.rect
            x="55"
            y="27"
            width="8"
            height="10"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="0.5"
            animate={animate ? {
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.1, 1]
            } : {}}
            transition={animate ? {
              duration: 2,
              repeat: Infinity
            } : {}}
          />

          {/* Connection line to the bros */}
          <motion.line
            x1="55"
            y1="32"
            x2="52"
            y2="30"
            stroke="#22d3ee"
            strokeWidth="0.5"
            strokeDasharray="1,1"
            animate={animate ? {
              opacity: [0.3, 0.7, 0.3],
              strokeDashoffset: [0, -2, 0]
            } : {}}
            transition={animate ? {
              duration: 1.5,
              repeat: Infinity
            } : {}}
          />

          {/* "SK51" label */}
          <text 
            x="59" 
            y="41" 
            fill="#22d3ee" 
            fontSize="2" 
            fontFamily="monospace" 
            textAnchor="middle"
            style={{ fontWeight: 'bold' }}
          >
            SK51
          </text>
        </g>

        </svg>
        </Wrapper>
        );
}