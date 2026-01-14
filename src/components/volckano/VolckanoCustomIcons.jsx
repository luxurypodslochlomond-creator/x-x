import React from 'react';
import { motion } from 'framer-motion';

/**
 * Custom VOLCKANO Icons - UniversalFamily51 Style
 * Beautiful, simple, recognizable - made with love ♾️❤️♾️
 */

// PLAYER CHARACTERS - Cute and bouncy
export const VolckanoPlayer = ({ type = 'happy', size = 60 }) => {
    const faces = {
        happy: (
            <svg width={size} height={size} viewBox="0 0 64 64" style={{ imageRendering: 'pixelated' }}>
                {/* Face */}
                <circle cx="32" cy="32" r="28" fill="#FFD700" stroke="#FF6B00" strokeWidth="3"/>
                {/* Eyes */}
                <circle cx="22" cy="26" r="4" fill="#000"/>
                <circle cx="42" cy="26" r="4" fill="#000"/>
                {/* Smile */}
                <path d="M 18 38 Q 32 48 46 38" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
        ),
        unicorn: (
            <svg width={size} height={size} viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFB6FF" stroke="#FF00FF" strokeWidth="3"/>
                <polygon points="32,8 28,20 36,20" fill="#FFD700"/>
                <circle cx="22" cy="28" r="4" fill="#000"/>
                <circle cx="42" cy="28" r="4" fill="#000"/>
                <path d="M 18 40 Q 32 50 46 40" stroke="#000" strokeWidth="3" fill="none"/>
            </svg>
        ),
        dragon: (
            <svg width={size} height={size} viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#00FF88" stroke="#00AA44" strokeWidth="3"/>
                <circle cx="22" cy="28" r="5" fill="#FF0000"/>
                <circle cx="42" cy="28" r="5" fill="#FF0000"/>
                <path d="M 20 42 L 32 38 L 44 42" stroke="#000" strokeWidth="3" fill="none"/>
            </svg>
        ),
        kitty: (
            <svg width={size} height={size} viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFA500" stroke="#FF6B00" strokeWidth="3"/>
                <polygon points="10,18 18,10 22,24" fill="#FFA500"/>
                <polygon points="54,18 46,10 42,24" fill="#FFA500"/>
                <circle cx="22" cy="28" r="4" fill="#000"/>
                <circle cx="42" cy="28" r="4" fill="#000"/>
                <path d="M 18 40 Q 32 48 46 40" stroke="#000" strokeWidth="3" fill="none"/>
            </svg>
        ),
        rocket: (
            <svg width={size} height={size} viewBox="0 0 64 64">
                <rect x="24" y="16" width="16" height="32" fill="#FF0000" stroke="#AA0000" strokeWidth="2" rx="8"/>
                <circle cx="32" cy="28" r="6" fill="#00FFFF"/>
                <polygon points="24,48 20,56 24,52" fill="#FFA500"/>
                <polygon points="40,48 44,56 40,52" fill="#FFA500"/>
            </svg>
        ),
        star: (
            <svg width={size} height={size} viewBox="0 0 64 64">
                <polygon points="32,8 36,24 52,24 40,34 44,50 32,40 20,50 24,34 12,24 28,24" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
                <circle cx="32" cy="32" r="8" fill="#FFF"/>
            </svg>
        )
    };

    return faces[type] || faces.happy;
};

// BEINGS TO SAVE - All life is sacred ♾️❤️
export const VolckanoLife = ({ type, size = 40 }) => {
    const beings = {
        human: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <circle cx="24" cy="16" r="10" fill="#FFCC99" stroke="#000" strokeWidth="2"/>
                <rect x="18" y="26" width="12" height="18" fill="#00AAFF" stroke="#000" strokeWidth="2" rx="2"/>
                <circle cx="19" cy="18" r="2" fill="#000"/>
                <circle cx="29" cy="18" r="2" fill="#000"/>
            </svg>
        ),
        dog: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <ellipse cx="24" cy="28" rx="14" ry="12" fill="#8B4513" stroke="#000" strokeWidth="2"/>
                <circle cx="24" cy="16" r="8" fill="#8B4513" stroke="#000" strokeWidth="2"/>
                <ellipse cx="12" cy="14" rx="4" ry="6" fill="#8B4513" stroke="#000" strokeWidth="2"/>
                <ellipse cx="36" cy="14" rx="4" ry="6" fill="#8B4513" stroke="#000" strokeWidth="2"/>
                <circle cx="20" cy="16" r="2" fill="#000"/>
                <circle cx="28" cy="16" r="2" fill="#000"/>
            </svg>
        ),
        cat: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <circle cx="24" cy="26" r="12" fill="#FF8C00" stroke="#000" strokeWidth="2"/>
                <polygon points="14,12 18,18 20,12" fill="#FF8C00" stroke="#000" strokeWidth="2"/>
                <polygon points="34,12 30,18 28,12" fill="#FF8C00" stroke="#000" strokeWidth="2"/>
                <circle cx="20" cy="24" r="2" fill="#00FF00"/>
                <circle cx="28" cy="24" r="2" fill="#00FF00"/>
            </svg>
        ),
        plant: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <ellipse cx="24" cy="36" rx="8" ry="10" fill="#8B4513" stroke="#000" strokeWidth="2"/>
                <path d="M 24 36 Q 18 24 20 12 Q 22 6 24 8 Q 26 6 28 12 Q 30 24 24 36" fill="#00AA00" stroke="#006600" strokeWidth="2"/>
                <circle cx="24" cy="10" r="4" fill="#FF69B4"/>
            </svg>
        ),
        robot: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <rect x="14" y="18" width="20" height="24" fill="#CCCCCC" stroke="#000" strokeWidth="2" rx="2"/>
                <rect x="18" y="8" width="12" height="10" fill="#AAAAAA" stroke="#000" strokeWidth="2" rx="2"/>
                <circle cx="20" cy="26" r="3" fill="#00FFFF"/>
                <circle cx="28" cy="26" r="3" fill="#00FFFF"/>
                <rect x="18" cy="34" width="12" height="2" fill="#00FF00"/>
                <circle cx="24" cy="4" r="2" fill="#FFD700"/>
            </svg>
        ),
        butterfly: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <ellipse cx="16" cy="20" rx="8" ry="12" fill="#FF1493" stroke="#000" strokeWidth="2"/>
                <ellipse cx="32" cy="20" rx="8" ry="12" fill="#FF1493" stroke="#000" strokeWidth="2"/>
                <ellipse cx="16" cy="32" rx="6" ry="10" fill="#00CED1" stroke="#000" strokeWidth="2"/>
                <ellipse cx="32" cy="32" rx="6" ry="10" fill="#00CED1" stroke="#000" strokeWidth="2"/>
                <rect x="22" y="12" width="4" height="28" fill="#000" rx="2"/>
            </svg>
        ),
        turtle: (
            <svg width={size} height={size} viewBox="0 0 48 48">
                <ellipse cx="24" cy="28" rx="16" ry="12" fill="#228B22" stroke="#000" strokeWidth="2"/>
                <circle cx="24" cy="20" r="6" fill="#90EE90" stroke="#000" strokeWidth="2"/>
                <circle cx="20" cy="20" r="2" fill="#000"/>
                <circle cx="28" cy="20" r="2" fill="#000"/>
            </svg>
        )
    };

    return beings[type] || beings.human;
};

// FLAME OBSTACLE - Animated and dangerous
export const VolckanoFlame = ({ size = 50, inverted = false }) => {
    return (
        <motion.svg 
            width={size} 
            height={size} 
            viewBox="0 0 64 64"
            animate={{
                scaleY: [1, 1.2, 1],
                scaleX: [1, 0.9, 1],
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            style={{ transform: inverted ? 'scaleY(-1)' : 'none' }}
        >
            {/* Outer flame */}
            <path d="M 32 8 Q 20 20 20 32 Q 20 48 32 56 Q 44 48 44 32 Q 44 20 32 8 Z" 
                  fill="#FF4500" 
                  stroke="#FF0000" 
                  strokeWidth="2"/>
            {/* Middle flame */}
            <path d="M 32 16 Q 24 24 24 34 Q 24 44 32 50 Q 40 44 40 34 Q 40 24 32 16 Z" 
                  fill="#FF8C00"/>
            {/* Inner flame */}
            <path d="M 32 24 Q 28 28 28 36 Q 28 42 32 46 Q 36 42 36 36 Q 36 28 32 24 Z" 
                  fill="#FFD700"/>
        </motion.svg>
    );
};

// STAR COLLECTIBLE - Sparkly and inviting
export const VolckanoStar = ({ size = 32 }) => {
    return (
        <motion.svg 
            width={size} 
            height={size} 
            viewBox="0 0 64 64"
            animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
            }}
            transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <polygon 
                points="32,8 36,24 52,24 40,34 44,50 32,40 20,50 24,34 12,24 28,24" 
                fill="#FFD700" 
                stroke="#FFA500" 
                strokeWidth="2"
            />
            <circle cx="32" cy="32" r="6" fill="#FFF" opacity="0.8"/>
        </motion.svg>
    );
};