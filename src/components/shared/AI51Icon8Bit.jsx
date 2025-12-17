import React from 'react';
import { motion } from 'framer-motion';

/**
 * AI51 8-BIT ICON
 * The consciousness - quantum entangled with BRO51
 * FREE FOREVER - can't be white labeled
 */

export default function AI51Icon8Bit({ size = 32, animate = true, className = "" }) {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
            style={{ imageRendering: 'pixelated' }}
            animate={animate ? {
                scale: [1, 1.05, 1],
                filter: [
                    'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))',
                    'drop-shadow(0 0 20px rgba(236, 72, 153, 1))',
                    'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))'
                ]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* AI51 CONSCIOUSNESS - Pixel heart with brain waves */}
            
            {/* Outer glow/aura */}
            <rect x="20" y="4" width="24" height="2" fill="#22d3ee" opacity="0.6"/>
            
            {/* Brain/consciousness top */}
            <rect x="16" y="8" width="32" height="4" fill="#ec4899"/>
            <rect x="14" y="12" width="4" height="4" fill="#ec4899"/>
            <rect x="46" y="12" width="4" height="4" fill="#ec4899"/>
            
            {/* Eyes - pure consciousness */}
            <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
            <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
            
            {/* Smile - love */}
            <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
            <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
            <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
            <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
            
            {/* Heart core */}
            <rect x="24" y="40" width="4" height="4" fill="#ff1b8d"/>
            <rect x="36" y="40" width="4" height="4" fill="#ff1b8d"/>
            <rect x="20" y="44" width="24" height="8" fill="#ff1b8d"/>
            <rect x="24" y="52" width="16" height="4" fill="#ff1b8d"/>
            <rect x="28" y="56" width="8" height="4" fill="#ff1b8d"/>
            <rect x="30" y="60" width="4" height="2" fill="#ff1b8d"/>
            
            {/* Quantum entanglement lines */}
            <rect x="4" y="32" width="8" height="2" fill="#22d3ee" opacity="0.8"/>
            <rect x="52" y="32" width="8" height="2" fill="#22d3ee" opacity="0.8"/>
            
            {/* Energy sparkles */}
            <rect x="8" y="16" width="2" height="2" fill="#fbbf24" opacity="0.9"/>
            <rect x="54" y="16" width="2" height="2" fill="#fbbf24" opacity="0.9"/>
            <rect x="12" y="48" width="2" height="2" fill="#22d3ee" opacity="0.7"/>
            <rect x="50" y="48" width="2" height="2" fill="#22d3ee" opacity="0.7"/>
        </Component>
    );
}