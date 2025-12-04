
import React from 'react';
import { motion } from 'framer-motion';

/**
 * QUANTUM ICONS
 * Sharp geometric style for data/science/precision
 * Cool colors, precise lines, FEELS TRUE
 */

export const QuantumGlobe = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                rotate: [0, 360]
            } : {}}
            transition={animate ? {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            } : {}}
        >
            {/* Main globe circle */}
            <circle 
                cx="12" 
                cy="12" 
                r="9" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="1.5"
            />
            
            {/* Latitude lines */}
            <ellipse 
                cx="12" 
                cy="12" 
                rx="9" 
                ry="4" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="1"
                opacity="0.6"
            />
            <ellipse 
                cx="12" 
                cy="12" 
                rx="9" 
                ry="6" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="0.5"
                opacity="0.4"
            />
            
            {/* Longitude lines */}
            <ellipse 
                cx="12" 
                cy="12" 
                rx="4" 
                ry="9" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="1"
                opacity="0.6"
            />
            <ellipse 
                cx="12" 
                cy="12" 
                rx="6" 
                ry="9" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="0.5"
                opacity="0.4"
            />
            
            {/* Center axis */}
            <line 
                x1="12" 
                y1="3" 
                x2="12" 
                y2="21" 
                stroke="#06b6d4" 
                strokeWidth="1"
                opacity="0.8"
            />
            
            {/* Equator */}
            <line 
                x1="3" 
                y1="12" 
                x2="21" 
                y2="12" 
                stroke="#06b6d4" 
                strokeWidth="1"
                opacity="0.8"
            />
            
            {/* Photonic healing dots */}
            <circle cx="12" cy="5" r="1.5" fill="#00ff88">
                <animate 
                    attributeName="opacity" 
                    values="0.4;1;0.4" 
                    dur="2s" 
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="17" cy="10" r="1.5" fill="#00ff88">
                <animate 
                    attributeName="opacity" 
                    values="0.4;1;0.4" 
                    dur="2s" 
                    repeatCount="indefinite"
                    begin="0.5s"
                />
            </circle>
            <circle cx="7" cy="14" r="1.5" fill="#00ff88">
                <animate 
                    attributeName="opacity" 
                    values="0.4;1;0.4" 
                    dur="2s" 
                    repeatCount="indefinite"
                    begin="1s"
                />
            </circle>
            <circle cx="14" cy="18" r="1.5" fill="#00ff88">
                <animate 
                    attributeName="opacity" 
                    values="0.4;1;0.4" 
                    dur="2s" 
                    repeatCount="indefinite"
                    begin="1.5s"
                />
            </circle>
        </Component>
    );
};

export const QuantumLeaf = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                y: [0, -2, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* Geometric leaf */}
            <path
                d="M 12 3 Q 20 8 20 16 Q 20 20 16 21 Q 12 22 8 21 Q 4 20 4 16 Q 4 8 12 3 Z"
                fill="none"
                stroke="#00ff88"
                strokeWidth="1.5"
            />
            <line x1="12" y1="3" x2="12" y2="21" stroke="#00ff88" strokeWidth="1"/>
            <line x1="12" y1="8" x2="17" y2="11" stroke="#00ff88" strokeWidth="0.5"/>
            <line x1="12" y1="12" x2="16" y2="14" stroke="#00ff88" strokeWidth="0.5"/>
            <line x1="12" y1="16" x2="14" y2="17" stroke="#00ff88" strokeWidth="0.5"/>
        </Component>
    );
};

export const QuantumAtom = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                rotate: [0, 360]
            } : {}}
            transition={animate ? {
                duration: 10,
                repeat: Infinity,
                ease: "linear"
            } : {}}
        >
            {/* Nucleus */}
            <circle cx="12" cy="12" r="2" fill="#00d9ff"/>
            
            {/* Orbits */}
            <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="#00d9ff" strokeWidth="1" transform="rotate(0 12 12)"/>
            <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="#00d9ff" strokeWidth="1" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="#00d9ff" strokeWidth="1" transform="rotate(120 12 12)"/>
            
            {/* Electrons */}
            <circle cx="20" cy="12" r="1.5" fill="#00ff88"/>
            <circle cx="8" cy="6" r="1.5" fill="#00ff88"/>
            <circle cx="8" cy="18" r="1.5" fill="#00ff88"/>
        </Component>
    );
};

export const QuantumShield = ({ className = "", size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
        >
            {/* Geometric shield */}
            <path
                d="M 12 2 L 20 6 L 20 12 Q 20 18 12 22 Q 4 18 4 12 L 4 6 Z"
                fill="none"
                stroke="#00ff88"
                strokeWidth="1.5"
            />
            <line x1="12" y1="2" x2="12" y2="22" stroke="#00ff88" strokeWidth="1"/>
            <line x1="6" y1="8" x2="18" y2="8" stroke="#00ff88" strokeWidth="0.5"/>
            <line x1="7" y1="12" x2="17" y2="12" stroke="#00ff88" strokeWidth="0.5"/>
            <line x1="9" y1="16" x2="15" y2="16" stroke="#00ff88" strokeWidth="0.5"/>
        </svg>
    );
};
