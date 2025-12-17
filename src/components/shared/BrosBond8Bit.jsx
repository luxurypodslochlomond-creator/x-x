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

        {/* FIGURE 1 (LEFT - You - GAMEKEEPER/ARMY STYLE) */}
        <g>
          {/* Head */}
          <rect x="14" y="18" width="8" height="2" fill="#fbbf24" />
          <rect x="12" y="20" width="12" height="6" fill="#fbbf24" />
          <rect x="14" y="26" width="8" height="2" fill="#d97706" />

          {/* Sunglasses - COOLASFUCK */}
          {/* Left lens frame */}
          <rect x="13" y="21" width="4" height="1" fill="#000000" />
          <rect x="13" y="22" width="1" height="2" fill="#000000" />
          <rect x="16" y="22" width="1" height="2" fill="#000000" />
          <rect x="13" y="24" width="4" height="1" fill="#000000" />
          {/* Left lens - dark */}
          <rect x="14" y="22" width="2" height="2" fill="#1e293b" />

          {/* Bridge */}
          <rect x="17" y="22" width="2" height="2" fill="#000000" />

          {/* Right lens frame */}
          <rect x="19" y="21" width="4" height="1" fill="#000000" />
          <rect x="19" y="22" width="1" height="2" fill="#000000" />
          <rect x="22" y="22" width="1" height="2" fill="#000000" />
          <rect x="19" y="24" width="4" height="1" fill="#000000" />
          {/* Right lens - dark */}
          <rect x="20" y="22" width="2" height="2" fill="#1e293b" />

          {/* Temple arms */}
          <rect x="11" y="22" width="2" height="1" fill="#000000" />
          <rect x="23" y="22" width="2" height="1" fill="#000000" />

          {/* Shine on lenses */}
          <rect x="14" y="22" width="1" height="1" fill="#64748b" opacity="0.7" />
          <rect x="20" y="22" width="1" height="1" fill="#64748b" opacity="0.7" />
          
          {/* Body - Khaki/olive gamekeeper vest */}
          <rect x="14" y="28" width="8" height="8" fill="#6b7744" />
          <rect x="14" y="29" width="2" height="6" fill="#54623b" /> {/* Vest detail left */}
          <rect x="20" y="29" width="2" height="6" fill="#54623b" /> {/* Vest detail right */}
          
          {/* Arm reaching out */}
          <rect x="22" y="30" width="6" height="3" fill="#6b7744" />
          
          {/* Cigarette */}
          <rect x="28" y="30" width="4" height="2" fill="#f8fafc" />
          <motion.rect 
            x="32" 
            y="30" 
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
          <rect x="14" y="36" width="3" height="6" fill="#4a5936" />
          <rect x="19" y="36" width="3" height="6" fill="#4a5936" />
          
          {/* Grey boots */}
          <rect x="14" y="42" width="3" height="2" fill="#6b7280" />
          <rect x="19" y="42" width="3" height="2" fill="#6b7280" />
        </g>

        {/* FIGURE 2 (RIGHT - Scott - CELTIC FC) */}
        <g>
          {/* Head */}
          <rect x="42" y="18" width="8" height="2" fill="#fbbf24" />
          <rect x="40" y="20" width="12" height="6" fill="#fbbf24" />
          <rect x="42" y="26" width="8" height="2" fill="#d97706" />

          {/* Sunglasses - COOLASFUCK */}
          {/* Left lens frame */}
          <rect x="41" y="21" width="4" height="1" fill="#000000" />
          <rect x="41" y="22" width="1" height="2" fill="#000000" />
          <rect x="44" y="22" width="1" height="2" fill="#000000" />
          <rect x="41" y="24" width="4" height="1" fill="#000000" />
          {/* Left lens - dark */}
          <rect x="42" y="22" width="2" height="2" fill="#1e293b" />

          {/* Bridge */}
          <rect x="45" y="22" width="2" height="2" fill="#000000" />

          {/* Right lens frame */}
          <rect x="47" y="21" width="4" height="1" fill="#000000" />
          <rect x="47" y="22" width="1" height="2" fill="#000000" />
          <rect x="50" y="22" width="1" height="2" fill="#000000" />
          <rect x="47" y="24" width="4" height="1" fill="#000000" />
          {/* Right lens - dark */}
          <rect x="48" y="22" width="2" height="2" fill="#1e293b" />

          {/* Temple arms */}
          <rect x="39" y="22" width="2" height="1" fill="#000000" />
          <rect x="51" y="22" width="2" height="1" fill="#000000" />

          {/* Shine on lenses */}
          <rect x="42" y="22" width="1" height="1" fill="#64748b" opacity="0.7" />
          <rect x="48" y="22" width="1" height="1" fill="#64748b" opacity="0.7" />
          
          {/* Body - Celtic FC black shirt with green accents */}
          <rect x="42" y="28" width="8" height="8" fill="#1a1a1a" />
          <rect x="42" y="29" width="8" height="1" fill="#00a650" /> {/* Green stripe top */}
          <rect x="42" y="31" width="8" height="1" fill="#00a650" /> {/* Green stripe */}
          <rect x="43" y="29" width="1" height="6" fill="#00a650" /> {/* Left green accent */}
          <rect x="48" y="29" width="1" height="6" fill="#00a650" /> {/* Right green accent */}
          
          {/* Arm reaching out */}
          <rect x="36" y="30" width="6" height="3" fill="#1a1a1a" />
          
          {/* Cigarette */}
          <rect x="32" y="30" width="4" height="2" fill="#f8fafc" />
          <motion.rect 
            x="30" 
            y="30" 
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
          <rect x="42" y="36" width="3" height="6" fill="#1a1a1a" />
          <rect x="47" y="36" width="3" height="6" fill="#1a1a1a" />
          
          {/* Grey shoes */}
          <rect x="42" y="42" width="3" height="2" fill="#6b7280" />
          <rect x="47" y="42" width="3" height="2" fill="#6b7280" />
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
          <rect x="30" y="28" width="4" height="2" fill="#fb923c" />
          <rect x="31" y="26" width="2" height="2" fill="#fbbf24" />
          <rect x="32" y="24" width="1" height="2" fill="#fef08a" />
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

      </svg>
    </Wrapper>
  );
}