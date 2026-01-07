import React from 'react';
import { motion } from 'framer-motion';

/**
 * PETSOUNDS51 8-BIT ICON
 * Dog + Cat hybrid = all pets welcome ♾️❤️
 */

export default function PetSounds51Icon8Bit({ size = 64, animate = true }) {
    const Icon = animate ? motion.svg : 'svg';
    
    return (
        <Icon
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            style={{ imageRendering: 'pixelated' }}
            {...(animate && {
                animate: { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                },
                transition: { 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            })}
        >
            {/* Dog ear (left) */}
            <rect x="16" y="12" width="8" height="12" fill="#8B4513" />
            
            {/* Cat ear (right) */}
            <rect x="40" y="8" width="8" height="8" fill="#FF8C00" />
            <rect x="42" y="10" width="4" height="4" fill="#FFB84D" />
            
            {/* Head */}
            <rect x="20" y="20" width="24" height="20" fill="#CD853F" />
            
            {/* Eyes - loving */}
            <rect x="26" y="26" width="4" height="4" fill="#000" />
            <rect x="34" y="26" width="4" height="4" fill="#000" />
            
            {/* Nose - heart shaped */}
            <rect x="30" y="32" width="4" height="2" fill="#FF1493" />
            <rect x="28" y="34" width="2" height="2" fill="#FF1493" />
            <rect x="34" y="34" width="2" height="2" fill="#FF1493" />
            
            {/* Mouth - happy */}
            <rect x="28" y="36" width="8" height="2" fill="#000" />
            
            {/* Frequency waves coming from head */}
            <motion.rect 
                x="12" y="24" width="4" height="2" fill="#00CED1"
                animate={{ opacity: [0.3, 1, 0.3], x: [12, 8, 12] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect 
                x="48" y="24" width="4" height="2" fill="#00CED1"
                animate={{ opacity: [0.3, 1, 0.3], x: [48, 52, 48] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            
            {/* Paw print below */}
            <rect x="28" y="48" width="8" height="4" fill="#8B4513" />
            <rect x="26" y="44" width="3" height="3" fill="#8B4513" />
            <rect x="35" y="44" width="3" height="3" fill="#8B4513" />
            <rect x="30" y="42" width="4" height="2" fill="#8B4513" />
        </Icon>
    );
}