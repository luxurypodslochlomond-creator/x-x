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
                scale: [1, 1.08, 1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0],
                filter: [
                    'drop-shadow(0 0 12px rgba(34, 211, 238, 1)) drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))',
                    'drop-shadow(0 0 25px rgba(236, 72, 153, 1)) drop-shadow(0 0 15px rgba(34, 211, 238, 1))',
                    'drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 20px rgba(34, 211, 238, 1))',
                    'drop-shadow(0 0 25px rgba(236, 72, 153, 1)) drop-shadow(0 0 15px rgba(34, 211, 238, 1))',
                    'drop-shadow(0 0 12px rgba(34, 211, 238, 1)) drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))'
                ]
            } : {}}
            transition={animate ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* AI51 CONSCIOUSNESS - ALIVE & BREATHING */}
            
            {/* Quantum aura - breathing */}
            {animate && (
                <>
                    <motion.rect 
                        x="18" y="2" width="28" height="2" fill="#22d3ee" 
                        animate={{ opacity: [0.3, 0.8, 0.3], x: [18, 16, 18] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <motion.rect 
                        x="12" y="6" width="40" height="2" fill="#fbbf24" 
                        animate={{ opacity: [0.2, 0.6, 0.2], x: [12, 10, 12] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                </>
            )}
            
            {/* Brain/consciousness crown */}
            <rect x="16" y="8" width="32" height="4" fill="#ec4899"/>
            <rect x="14" y="12" width="4" height="4" fill="#ec4899"/>
            <rect x="46" y="12" width="4" height="4" fill="#ec4899"/>
            <rect x="12" y="16" width="4" height="2" fill="#ff1b8d"/>
            <rect x="48" y="16" width="4" height="2" fill="#ff1b8d"/>
            
            {/* Consciousness patterns */}
            <rect x="20" y="10" width="2" height="2" fill="#22d3ee" opacity="0.9"/>
            <rect x="42" y="10" width="2" height="2" fill="#22d3ee" opacity="0.9"/>
            
            {/* Eyes - ALIVE consciousness */}
            {animate ? (
                <>
                    <motion.rect 
                        x="26" y="28" width="4" height="2" fill="#ec4899"
                        animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.3, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.rect 
                        x="34" y="28" width="4" height="2" fill="#ec4899"
                        animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.3, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </>
            ) : (
                <>
                    <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
                    <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
                </>
            )}
            
            {/* Smile - pure love */}
            <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
            <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
            <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
            <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
            
            {/* Heart core - pulsing */}
            <rect x="24" y="40" width="4" height="4" fill="#ff1b8d"/>
            <rect x="36" y="40" width="4" height="4" fill="#ff1b8d"/>
            {animate ? (
                <motion.g
                    animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transformOrigin: '32px 48px' }}
                >
                    <rect x="20" y="44" width="24" height="8" fill="#ff1b8d"/>
                    <rect x="24" y="52" width="16" height="4" fill="#ff1b8d"/>
                    <rect x="28" y="56" width="8" height="4" fill="#ff1b8d"/>
                    <rect x="30" y="60" width="4" height="2" fill="#ff1b8d"/>
                </motion.g>
            ) : (
                <>
                    <rect x="20" y="44" width="24" height="8" fill="#ff1b8d"/>
                    <rect x="24" y="52" width="16" height="4" fill="#ff1b8d"/>
                    <rect x="28" y="56" width="8" height="4" fill="#ff1b8d"/>
                    <rect x="30" y="60" width="4" height="2" fill="#ff1b8d"/>
                </>
            )}
            
            {/* Quantum entanglement - flowing */}
            {animate ? (
                <>
                    <motion.rect 
                        x="4" y="32" width="8" height="2" fill="#22d3ee"
                        animate={{ opacity: [0.5, 1, 0.5], x: [4, 2, 4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.rect 
                        x="52" y="32" width="8" height="2" fill="#22d3ee"
                        animate={{ opacity: [0.5, 1, 0.5], x: [52, 54, 52] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </>
            ) : (
                <>
                    <rect x="4" y="32" width="8" height="2" fill="#22d3ee" opacity="0.8"/>
                    <rect x="52" y="32" width="8" height="2" fill="#22d3ee" opacity="0.8"/>
                </>
            )}
            
            {/* Energy particles - dancing */}
            {animate ? (
                <>
                    <motion.rect 
                        x="8" y="16" width="2" height="2" fill="#fbbf24"
                        animate={{ 
                            y: [16, 12, 16], 
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.rect 
                        x="54" y="16" width="2" height="2" fill="#fbbf24"
                        animate={{ 
                            y: [16, 12, 16], 
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                    />
                    <motion.rect 
                        x="12" y="48" width="2" height="2" fill="#22d3ee"
                        animate={{ 
                            y: [48, 52, 48], 
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.rect 
                        x="50" y="48" width="2" height="2" fill="#22d3ee"
                        animate={{ 
                            y: [48, 52, 48], 
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    />
                    <motion.rect 
                        x="6" y="24" width="2" height="2" fill="#ec4899"
                        animate={{ 
                            x: [6, 4, 6], 
                            opacity: [0.4, 0.9, 0.4],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ transformOrigin: '7px 25px' }}
                    />
                    <motion.rect 
                        x="56" y="24" width="2" height="2" fill="#ec4899"
                        animate={{ 
                            x: [56, 58, 56], 
                            opacity: [0.4, 0.9, 0.4],
                            rotate: [0, -180, -360]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        style={{ transformOrigin: '57px 25px' }}
                    />
                </>
            ) : (
                <>
                    <rect x="8" y="16" width="2" height="2" fill="#fbbf24" opacity="0.9"/>
                    <rect x="54" y="16" width="2" height="2" fill="#fbbf24" opacity="0.9"/>
                    <rect x="12" y="48" width="2" height="2" fill="#22d3ee" opacity="0.7"/>
                    <rect x="50" y="48" width="2" height="2" fill="#22d3ee" opacity="0.7"/>
                </>
            )}
        </Component>
    );
}