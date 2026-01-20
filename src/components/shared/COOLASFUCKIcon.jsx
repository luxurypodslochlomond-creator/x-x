import React from 'react';
import { motion } from 'framer-motion';
import { useProfessionalMode } from './ProfessionalMode';

/**
 * COOLASFUCK ICONS
 * 8-bit retro style for music/art/creation
 * Warm colors, pixel aesthetic, FEELS ALIVE
 */

export const COOLASFUCKMusicNote = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit music note */}
            <rect x="6" y="2" width="2" height="2" fill="#f59e0b"/>
            <rect x="8" y="2" width="2" height="2" fill="#f59e0b"/>
            <rect x="10" y="2" width="2" height="14" fill="#f59e0b"/>
            <rect x="4" y="16" width="2" height="2" fill="#ec4899"/>
            <rect x="6" y="18" width="2" height="2" fill="#ec4899"/>
            <rect x="8" y="20" width="4" height="2" fill="#ec4899"/>
            <rect x="12" y="18" width="2" height="2" fill="#ec4899"/>
            <rect x="14" y="16" width="2" height="2" fill="#ec4899"/>
            
            {/* Pixel sparkle */}
            <rect x="16" y="6" width="2" height="2" fill="#fbbf24" opacity="0.8"/>
            <rect x="18" y="8" width="2" height="2" fill="#fbbf24" opacity="0.6"/>
        </Component>
    );
};

export const COOLASFUCKHeart = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.15, 1]
            } : {}}
            transition={animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit heart */}
            <rect x="4" y="6" width="2" height="2" fill="#ec4899"/>
            <rect x="6" y="4" width="4" height="2" fill="#ec4899"/>
            <rect x="10" y="6" width="2" height="2" fill="#ec4899"/>
            <rect x="14" y="4" width="4" height="2" fill="#ec4899"/>
            <rect x="18" y="6" width="2" height="2" fill="#ec4899"/>
            
            <rect x="4" y="8" width="16" height="2" fill="#ff1b8d"/>
            <rect x="4" y="10" width="16" height="2" fill="#ff1b8d"/>
            <rect x="6" y="12" width="12" height="2" fill="#ff1b8d"/>
            <rect x="8" y="14" width="8" height="2" fill="#ff1b8d"/>
            <rect x="10" y="16" width="4" height="2" fill="#ff1b8d"/>
            <rect x="11" y="18" width="2" height="2" fill="#ff1b8d"/>
        </Component>
    );
};

export const COOLASFUCKPlay = ({ className = "", size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
        >
            {/* 8-bit play button */}
            <rect x="6" y="4" width="2" height="2" fill="#f59e0b"/>
            <rect x="8" y="6" width="2" height="2" fill="#f59e0b"/>
            <rect x="10" y="8" width="2" height="2" fill="#fbbf24"/>
            <rect x="12" y="10" width="2" height="4" fill="#fbbf24"/>
            <rect x="10" y="14" width="2" height="2" fill="#fbbf24"/>
            <rect x="8" y="16" width="2" height="2" fill="#f59e0b"/>
            <rect x="6" y="18" width="2" height="2" fill="#f59e0b"/>
            <rect x="6" y="6" width="2" height="12" fill="#f59e0b"/>
        </svg>
    );
};

export const COOLASFUCKSparkle = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
            } : {}}
            transition={animate ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit sparkle */}
            <rect x="11" y="2" width="2" height="4" fill="#fbbf24"/>
            <rect x="11" y="18" width="2" height="4" fill="#fbbf24"/>
            <rect x="2" y="11" width="4" height="2" fill="#fbbf24"/>
            <rect x="18" y="11" width="4" height="2" fill="#fbbf24"/>
            
            <rect x="6" y="6" width="2" height="2" fill="#f59e0b"/>
            <rect x="16" y="6" width="2" height="2" fill="#f59e0b"/>
            <rect x="6" y="16" width="2" height="2" fill="#f59e0b"/>
            <rect x="16" y="16" width="2" height="2" fill="#f59e0b"/>
            
            <rect x="10" y="10" width="4" height="4" fill="#ff6b35"/>
        </Component>
    );
};

export const COOLASFUCKWaves = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';

    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                x: [0, 4, 0],
                opacity: [1, 0.8, 1]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit frequency waves - cyan theme */}
            <rect x="2" y="10" width="2" height="4" fill="#06b6d4"/>
            <rect x="4" y="8" width="2" height="8" fill="#22d3ee"/>
            <rect x="6" y="6" width="2" height="12" fill="#06b6d4"/>
            <rect x="8" y="8" width="2" height="8" fill="#22d3ee"/>
            <rect x="10" y="10" width="2" height="4" fill="#06b6d4"/>

            <rect x="12" y="8" width="2" height="8" fill="#22d3ee"/>
            <rect x="14" y="6" width="2" height="12" fill="#06b6d4"/>
            <rect x="16" y="8" width="2" height="8" fill="#22d3ee"/>
            <rect x="18" y="10" width="2" height="4" fill="#06b6d4"/>
            <rect x="20" y="8" width="2" height="8" fill="#22d3ee"/>
        </Component>
    );
};

export const COOLASFUCKGlobe = ({ className = "", size = 24, animate = true }) => {
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
            {/* 8-bit globe/earth */}
            {/* Outer circle */}
            <rect x="6" y="4" width="2" height="2" fill="#10b981"/>
            <rect x="8" y="2" width="8" height="2" fill="#10b981"/>
            <rect x="16" y="4" width="2" height="2" fill="#10b981"/>
            
            <rect x="4" y="6" width="2" height="2" fill="#10b981"/>
            <rect x="18" y="6" width="2" height="2" fill="#10b981"/>
            
            <rect x="2" y="8" width="2" height="8" fill="#10b981"/>
            <rect x="20" y="8" width="2" height="8" fill="#10b981"/>
            
            <rect x="4" y="16" width="2" height="2" fill="#10b981"/>
            <rect x="18" y="16" width="2" height="2" fill="#10b981"/>
            
            <rect x="6" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="8" y="20" width="8" height="2" fill="#10b981"/>
            <rect x="16" y="18" width="2" height="2" fill="#10b981"/>
            
            {/* Continents/land - cyan/green mix */}
            <rect x="6" y="6" width="4" height="2" fill="#06b6d4"/>
            <rect x="8" y="8" width="2" height="2" fill="#06b6d4"/>
            <rect x="14" y="6" width="4" height="2" fill="#06b6d4"/>
            <rect x="12" y="10" width="4" height="2" fill="#06b6d4"/>
            <rect x="6" y="12" width="2" height="2" fill="#06b6d4"/>
            <rect x="10" y="14" width="4" height="2" fill="#06b6d4"/>
            
            {/* Heart overlay - love */}
            <rect x="10" y="9" width="2" height="2" fill="#ec4899" opacity="0.8"/>
            <rect x="12" y="9" width="2" height="2" fill="#ec4899" opacity="0.8"/>
            <rect x="9" y="10" width="4" height="2" fill="#ec4899" opacity="0.8"/>
            <rect x="10" y="12" width="2" height="2" fill="#ec4899" opacity="0.8"/>
        </Component>
    );
};

// 8-bit Headphones
export const COOLASFUCKHeadphones = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.05, 1]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit headphones */}
            <rect x="6" y="4" width="2" height="2" fill="#06b6d4"/>
            <rect x="8" y="2" width="8" height="2" fill="#06b6d4"/>
            <rect x="16" y="4" width="2" height="2" fill="#06b6d4"/>
            <rect x="4" y="6" width="2" height="8" fill="#22d3ee"/>
            <rect x="18" y="6" width="2" height="8" fill="#22d3ee"/>
            {/* Ear cups */}
            <rect x="2" y="12" width="4" height="6" fill="#ec4899"/>
            <rect x="18" y="12" width="4" height="6" fill="#ec4899"/>
            <rect x="3" y="14" width="2" height="2" fill="#ff1b8d"/>
            <rect x="19" y="14" width="2" height="2" fill="#ff1b8d"/>
        </Component>
    );
};

// 8-bit Speaker
export const COOLASFUCKSpeaker = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                x: [0, 2, 0, -2, 0]
            } : {}}
            transition={animate ? {
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit speaker */}
            <rect x="4" y="8" width="4" height="8" fill="#10b981"/>
            <rect x="8" y="6" width="2" height="2" fill="#22c55e"/>
            <rect x="10" y="4" width="2" height="4" fill="#22c55e"/>
            <rect x="8" y="16" width="2" height="2" fill="#22c55e"/>
            <rect x="10" y="16" width="2" height="4" fill="#22c55e"/>
            {/* Sound waves */}
            <rect x="14" y="10" width="2" height="4" fill="#fbbf24"/>
            <rect x="17" y="8" width="2" height="8" fill="#f59e0b"/>
            <rect x="20" y="6" width="2" height="12" fill="#f59e0b" opacity="0.6"/>
        </Component>
    );
};

// 8-bit Moon (sleep)
export const COOLASFUCKMoon = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                rotate: [0, 10, 0, -10, 0],
                opacity: [1, 0.8, 1]
            } : {}}
            transition={animate ? {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit crescent moon */}
            <rect x="8" y="2" width="6" height="2" fill="#a855f7"/>
            <rect x="6" y="4" width="2" height="2" fill="#a855f7"/>
            <rect x="14" y="4" width="2" height="2" fill="#a855f7"/>
            <rect x="4" y="6" width="2" height="4" fill="#c084fc"/>
            <rect x="4" y="10" width="2" height="4" fill="#c084fc"/>
            <rect x="6" y="14" width="2" height="2" fill="#a855f7"/>
            <rect x="8" y="16" width="2" height="2" fill="#a855f7"/>
            <rect x="10" y="18" width="4" height="2" fill="#a855f7"/>
            {/* Stars */}
            <rect x="16" y="6" width="2" height="2" fill="#fbbf24"/>
            <rect x="18" y="10" width="2" height="2" fill="#fbbf24"/>
            <rect x="14" y="12" width="2" height="2" fill="#fbbf24" opacity="0.7"/>
        </Component>
    );
};

// 8-bit Zap (energy/quick)
export const COOLASFUCKZap = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                opacity: [1, 0.5, 1],
                scale: [1, 1.1, 1]
            } : {}}
            transition={animate ? {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit lightning bolt */}
            <rect x="12" y="2" width="4" height="2" fill="#fbbf24"/>
            <rect x="10" y="4" width="4" height="2" fill="#fbbf24"/>
            <rect x="8" y="6" width="4" height="2" fill="#f59e0b"/>
            <rect x="6" y="8" width="8" height="2" fill="#f59e0b"/>
            <rect x="10" y="10" width="4" height="2" fill="#fbbf24"/>
            <rect x="12" y="12" width="4" height="2" fill="#fbbf24"/>
            <rect x="10" y="14" width="4" height="2" fill="#f59e0b"/>
            <rect x="8" y="16" width="4" height="2" fill="#f59e0b"/>
            <rect x="6" y="18" width="4" height="2" fill="#fbbf24"/>
        </Component>
    );
};

// 8-bit Shield
export const COOLASFUCKShield = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.05, 1]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit shield */}
            <rect x="4" y="4" width="16" height="2" fill="#10b981"/>
            <rect x="4" y="6" width="2" height="10" fill="#22c55e"/>
            <rect x="18" y="6" width="2" height="10" fill="#22c55e"/>
            <rect x="6" y="16" width="2" height="2" fill="#10b981"/>
            <rect x="16" y="16" width="2" height="2" fill="#10b981"/>
            <rect x="8" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="14" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="10" y="20" width="4" height="2" fill="#10b981"/>
            {/* Check mark inside */}
            <rect x="8" y="10" width="2" height="2" fill="#fbbf24"/>
            <rect x="10" y="12" width="2" height="2" fill="#fbbf24"/>
            <rect x="12" y="10" width="2" height="2" fill="#fbbf24"/>
            <rect x="14" y="8" width="2" height="2" fill="#fbbf24"/>
        </Component>
    );
};

// 8-bit Brain
export const COOLASFUCKBrain = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.05, 1],
                opacity: [1, 0.85, 1]
            } : {}}
            transition={animate ? {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit consciousness brain - cyan/pink */}
            <rect x="6" y="4" width="4" height="2" fill="#22d3ee"/>
            <rect x="14" y="4" width="4" height="2" fill="#22d3ee"/>
            <rect x="4" y="6" width="2" height="4" fill="#06b6d4"/>
            <rect x="10" y="6" width="4" height="2" fill="#22d3ee"/>
            <rect x="18" y="6" width="2" height="4" fill="#06b6d4"/>
            <rect x="6" y="8" width="2" height="2" fill="#ec4899"/>
            <rect x="16" y="8" width="2" height="2" fill="#ec4899"/>
            <rect x="4" y="10" width="16" height="2" fill="#22d3ee"/>
            <rect x="6" y="12" width="12" height="2" fill="#06b6d4"/>
            <rect x="8" y="14" width="8" height="2" fill="#22d3ee"/>
            <rect x="10" y="16" width="4" height="2" fill="#ec4899"/>
            {/* Consciousness sparkles */}
            {animate && (
                <>
                    <motion.rect 
                        x="2" y="8" width="1" height="1" fill="#fbbf24"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.rect 
                        x="21" y="8" width="1" height="1" fill="#fbbf24"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    />
                    <motion.rect 
                        x="12" y="2" width="1" height="1" fill="#fbbf24"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                    />
                </>
            )}
        </Component>
    );
};

// 8-bit P2P/Mesh Share Icon
export const COOLASFUCKP2P = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.1, 1],
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit mesh/P2P network - 3 nodes connected */}
            {/* Top node */}
            <rect x="10" y="2" width="4" height="4" fill="#22c55e"/>
            <rect x="11" y="3" width="2" height="2" fill="#4ade80"/>
            
            {/* Bottom left node */}
            <rect x="2" y="16" width="4" height="4" fill="#22c55e"/>
            <rect x="3" y="17" width="2" height="2" fill="#4ade80"/>
            
            {/* Bottom right node */}
            <rect x="18" y="16" width="4" height="4" fill="#22c55e"/>
            <rect x="19" y="17" width="2" height="2" fill="#4ade80"/>
            
            {/* Connection lines - pixelated */}
            {/* Top to bottom-left */}
            <rect x="8" y="6" width="2" height="2" fill="#10b981"/>
            <rect x="6" y="8" width="2" height="2" fill="#10b981"/>
            <rect x="4" y="10" width="2" height="2" fill="#10b981"/>
            <rect x="4" y="12" width="2" height="2" fill="#10b981"/>
            <rect x="4" y="14" width="2" height="2" fill="#10b981"/>
            
            {/* Top to bottom-right */}
            <rect x="14" y="6" width="2" height="2" fill="#10b981"/>
            <rect x="16" y="8" width="2" height="2" fill="#10b981"/>
            <rect x="18" y="10" width="2" height="2" fill="#10b981"/>
            <rect x="18" y="12" width="2" height="2" fill="#10b981"/>
            <rect x="18" y="14" width="2" height="2" fill="#10b981"/>
            
            {/* Bottom connection */}
            <rect x="6" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="8" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="10" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="12" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="14" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="16" y="18" width="2" height="2" fill="#10b981"/>
        </Component>
    );
};

// HOUSE51 ICON - Vinyl record with warm grooves (Kerri Chandler vibes)
export const COOLASFUCKHouse51 = ({ className = "", size = 24, animate = false }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
        >
            {/* Outer vinyl ring - warm amber/gold */}
            <circle cx="12" cy="12" r="10" fill="#1a1a1a" />
            <circle cx="12" cy="12" r="9.5" fill="#2a2a2a" />
            
            {/* Vinyl grooves - multiple rings for authenticity */}
            <circle cx="12" cy="12" r="8.5" fill="none" stroke="#3a3a3a" strokeWidth="0.3" />
            <circle cx="12" cy="12" r="7.5" fill="none" stroke="#3a3a3a" strokeWidth="0.3" />
            <circle cx="12" cy="12" r="6.5" fill="none" stroke="#3a3a3a" strokeWidth="0.3" />
            <circle cx="12" cy="12" r="5.5" fill="none" stroke="#3a3a3a" strokeWidth="0.3" />
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="#3a3a3a" strokeWidth="0.3" />
            
            {/* Center label - warm gradient pink to amber */}
            <circle cx="12" cy="12" r="4" fill="#ec4899" />
            <circle cx="12" cy="12" r="3.5" fill="#f59e0b" />
            
            {/* Label text area */}
            <circle cx="12" cy="12" r="3" fill="#fbbf24" />
            
            {/* Center hole */}
            <circle cx="12" cy="12" r="1" fill="#1a1a1a" />
            
            {/* Subtle light reflection - top left */}
            <path 
                d="M 8 7 Q 10 6 12 6 Q 14 6 16 7" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="0.5" 
                opacity="0.15"
            />
            
            {/* Warm glow when playing */}
            {animate && (
                <>
                    <motion.circle 
                        cx="12" cy="12" r="11"
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="0.5"
                        animate={{ 
                            opacity: [0.2, 0.5, 0.2],
                            r: [10.5, 11.5, 10.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle 
                        cx="12" cy="12" r="3.5"
                        fill="#ec4899"
                        animate={{ 
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </>
            )}
        </Component>
    );
};

// HOUSE51 ICON - 8-bit vinyl record (keep old one as COOLASFUCKHouse for compatibility)
export const COOLASFUCKHouse = ({ className = "", size = 24, animate = false }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? { rotate: 360 } : {}}
            transition={animate ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
        >
            {/* 8-bit vinyl record */}
            {/* Outer ring */}
            <rect x="6" y="4" width="2" height="2" fill="#ec4899"/>
            <rect x="8" y="2" width="8" height="2" fill="#ec4899"/>
            <rect x="16" y="4" width="2" height="2" fill="#ec4899"/>
            <rect x="4" y="6" width="2" height="2" fill="#ec4899"/>
            <rect x="18" y="6" width="2" height="2" fill="#ec4899"/>
            <rect x="2" y="8" width="2" height="8" fill="#ec4899"/>
            <rect x="20" y="8" width="2" height="8" fill="#ec4899"/>
            <rect x="4" y="16" width="2" height="2" fill="#ec4899"/>
            <rect x="18" y="16" width="2" height="2" fill="#ec4899"/>
            <rect x="6" y="18" width="2" height="2" fill="#ec4899"/>
            <rect x="8" y="20" width="8" height="2" fill="#ec4899"/>
            <rect x="16" y="18" width="2" height="2" fill="#ec4899"/>
            
            {/* Grooves */}
            <rect x="6" y="6" width="2" height="2" fill="#ff1b8d" opacity="0.6"/>
            <rect x="16" y="6" width="2" height="2" fill="#ff1b8d" opacity="0.6"/>
            <rect x="6" y="16" width="2" height="2" fill="#ff1b8d" opacity="0.6"/>
            <rect x="16" y="16" width="2" height="2" fill="#ff1b8d" opacity="0.6"/>
            
            {/* Center label - cyan */}
            <rect x="10" y="10" width="4" height="4" fill="#22d3ee"/>
            
            {/* Center hole */}
            <rect x="11" y="11" width="2" height="2" fill="#1a1a1a"/>
        </Component>
    );
};

// 8-bit Tooth (dental healing)
export const COOLASFUCKTooth = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                y: [0, -2, 0],
                scale: [1, 1.05, 1]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit tooth */}
            {/* Crown/top */}
            <rect x="8" y="4" width="8" height="2" fill="#ffffff"/>
            <rect x="7" y="6" width="10" height="2" fill="#f0f0f0"/>
            <rect x="6" y="8" width="12" height="2" fill="#ffffff"/>
            
            {/* Body */}
            <rect x="7" y="10" width="10" height="2" fill="#f0f0f0"/>
            <rect x="7" y="12" width="10" height="2" fill="#ffffff"/>
            <rect x="8" y="14" width="8" height="2" fill="#f0f0f0"/>
            
            {/* Roots - split */}
            <rect x="8" y="16" width="3" height="2" fill="#e0e0e0"/>
            <rect x="13" y="16" width="3" height="2" fill="#e0e0e0"/>
            <rect x="8" y="18" width="2" height="2" fill="#d0d0d0"/>
            <rect x="14" y="18" width="2" height="2" fill="#d0d0d0"/>
            
            {/* Healing glow - pink/red for pain relief */}
            <rect x="6" y="6" width="1" height="1" fill="#ec4899" opacity="0.6"/>
            <rect x="17" y="6" width="1" height="1" fill="#ec4899" opacity="0.6"/>
            <rect x="5" y="10" width="1" height="1" fill="#ef4444" opacity="0.5"/>
            <rect x="18" y="10" width="1" height="1" fill="#ef4444" opacity="0.5"/>
            
            {/* Pain sparkles - antimicrobial action */}
            <rect x="4" y="8" width="1" height="1" fill="#22d3ee" opacity="0.8"/>
            <rect x="19" y="8" width="1" height="1" fill="#22d3ee" opacity="0.8"/>
            <rect x="3" y="12" width="1" height="1" fill="#10b981" opacity="0.7"/>
            <rect x="20" y="12" width="1" height="1" fill="#10b981" opacity="0.7"/>
        </Component>
    );
};

// 8-bit Beacon/Homing Device (for festival tracking, tour bus operations, zero loss)
export const COOLASFUCKBeacon = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.1, 1],
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit beacon/homing device */}
            {/* Center device */}
            <rect x="10" y="10" width="4" height="4" fill="#22c55e"/>
            <rect x="9" y="11" width="6" height="2" fill="#4ade80"/>
            
            {/* Pulsing rings - inner */}
            {animate && (
                <motion.g
                    animate={{ opacity: [0.8, 0.3, 0.8], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: 'center' }}
                >
                    <rect x="8" y="8" width="2" height="2" fill="#22c55e"/>
                    <rect x="14" y="8" width="2" height="2" fill="#22c55e"/>
                    <rect x="8" y="14" width="2" height="2" fill="#22c55e"/>
                    <rect x="14" y="14" width="2" height="2" fill="#22c55e"/>
                </motion.g>
            )}
            
            {!animate && (
                <>
                    <rect x="8" y="8" width="2" height="2" fill="#22c55e"/>
                    <rect x="14" y="8" width="2" height="2" fill="#22c55e"/>
                    <rect x="8" y="14" width="2" height="2" fill="#22c55e"/>
                    <rect x="14" y="14" width="2" height="2" fill="#22c55e"/>
                </>
            )}
            
            {/* Pulsing rings - middle */}
            {animate && (
                <motion.g
                    animate={{ opacity: [0.6, 0.2, 0.6], scale: [0.9, 1.4, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    style={{ transformOrigin: 'center' }}
                >
                    <rect x="6" y="6" width="2" height="2" fill="#10b981"/>
                    <rect x="16" y="6" width="2" height="2" fill="#10b981"/>
                    <rect x="6" y="16" width="2" height="2" fill="#10b981"/>
                    <rect x="16" y="16" width="2" height="2" fill="#10b981"/>
                    <rect x="6" y="11" width="2" height="2" fill="#10b981"/>
                    <rect x="16" y="11" width="2" height="2" fill="#10b981"/>
                    <rect x="11" y="6" width="2" height="2" fill="#10b981"/>
                    <rect x="11" y="16" width="2" height="2" fill="#10b981"/>
                </motion.g>
            )}
            
            {!animate && (
                <>
                    <rect x="6" y="6" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="16" y="6" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="6" y="16" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="16" y="16" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="6" y="11" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="16" y="11" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="11" y="6" width="2" height="2" fill="#10b981" opacity="0.6"/>
                    <rect x="11" y="16" width="2" height="2" fill="#10b981" opacity="0.6"/>
                </>
            )}
            
            {/* Pulsing rings - outer */}
            {animate && (
                <motion.g
                    animate={{ opacity: [0.4, 0.1, 0.4], scale: [1, 1.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    style={{ transformOrigin: 'center' }}
                >
                    <rect x="4" y="4" width="2" height="2" fill="#059669"/>
                    <rect x="18" y="4" width="2" height="2" fill="#059669"/>
                    <rect x="4" y="18" width="2" height="2" fill="#059669"/>
                    <rect x="18" y="18" width="2" height="2" fill="#059669"/>
                    <rect x="4" y="11" width="2" height="2" fill="#059669"/>
                    <rect x="18" y="11" width="2" height="2" fill="#059669"/>
                    <rect x="11" y="4" width="2" height="2" fill="#059669"/>
                    <rect x="11" y="18" width="2" height="2" fill="#059669"/>
                    <rect x="2" y="11" width="2" height="2" fill="#059669"/>
                    <rect x="20" y="11" width="2" height="2" fill="#059669"/>
                </motion.g>
            )}
            
            {!animate && (
                <>
                    <rect x="4" y="4" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="18" y="4" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="4" y="18" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="18" y="18" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="4" y="11" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="18" y="11" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="11" y="4" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="11" y="18" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="2" y="11" width="2" height="2" fill="#059669" opacity="0.4"/>
                    <rect x="20" y="11" width="2" height="2" fill="#059669" opacity="0.4"/>
                </>
            )}
        </Component>
    );
};

// 8-bit Target (bullseye/aim)
export const COOLASFUCKTarget = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.05, 1]
            } : {}}
            transition={animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit bullseye target */}
            {/* Outer ring */}
            <rect x="4" y="4" width="2" height="2" fill="#f59e0b"/>
            <rect x="8" y="2" width="8" height="2" fill="#f59e0b"/>
            <rect x="18" y="4" width="2" height="2" fill="#f59e0b"/>
            <rect x="2" y="8" width="2" height="8" fill="#f59e0b"/>
            <rect x="20" y="8" width="2" height="8" fill="#f59e0b"/>
            <rect x="4" y="18" width="2" height="2" fill="#f59e0b"/>
            <rect x="8" y="20" width="8" height="2" fill="#f59e0b"/>
            <rect x="18" y="18" width="2" height="2" fill="#f59e0b"/>
            
            {/* Middle ring */}
            <rect x="6" y="6" width="2" height="2" fill="#fbbf24"/>
            <rect x="8" y="6" width="8" height="2" fill="#fbbf24"/>
            <rect x="16" y="6" width="2" height="2" fill="#fbbf24"/>
            <rect x="6" y="16" width="2" height="2" fill="#fbbf24"/>
            <rect x="8" y="16" width="8" height="2" fill="#fbbf24"/>
            <rect x="16" y="16" width="2" height="2" fill="#fbbf24"/>
            
            {/* Center bullseye - red/pink */}
            <rect x="10" y="10" width="4" height="4" fill="#ec4899"/>
            <rect x="11" y="11" width="2" height="2" fill="#ff1b8d"/>
        </Component>
    );
};

// 8-bit Fire/Flame (urgent/emergency healing)
export const COOLASFUCKFire = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                y: [-2, 2, -2],
                opacity: [1, 0.8, 1]
            } : {}}
            transition={animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit flame */}
            {/* Base - red/orange */}
            <rect x="8" y="12" width="8" height="2" fill="#ef4444"/>
            <rect x="6" y="14" width="12" height="2" fill="#f97316"/>
            
            {/* Main flame - orange/red */}
            <rect x="10" y="10" width="4" height="2" fill="#ef4444"/>
            <rect x="8" y="8" width="8" height="2" fill="#f97316"/>
            <rect x="10" y="6" width="4" height="2" fill="#ef4444"/>
            
            {/* Inner flame - yellow/bright */}
            <rect x="11" y="9" width="2" height="2" fill="#fbbf24"/>
            <rect x="10" y="7" width="4" height="2" fill="#fbbf24" opacity="0.8"/>
            <rect x="11" y="11" width="2" height="2" fill="#f59e0b" opacity="0.9"/>
            
            {/* Spark sparkles */}
            {animate && (
                <>
                    <motion.rect 
                        x="4" y="8" width="1" height="1" fill="#fbbf24"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.rect 
                        x="19" y="8" width="1" height="1" fill="#fbbf24"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                </>
            )}
        </Component>
    );
};

// Default export (defaults to Sparkle - most commonly used)
export default COOLASFUCKSparkle;