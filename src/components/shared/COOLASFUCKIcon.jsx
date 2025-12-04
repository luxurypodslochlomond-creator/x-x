import React from 'react';
import { motion } from 'framer-motion';

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
                scale: [1, 1.03, 1],
                opacity: [1, 0.9, 1]
            } : {}}
            transition={animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit brain */}
            <rect x="6" y="4" width="4" height="2" fill="#ec4899"/>
            <rect x="14" y="4" width="4" height="2" fill="#ec4899"/>
            <rect x="4" y="6" width="2" height="4" fill="#f472b6"/>
            <rect x="10" y="6" width="4" height="2" fill="#f472b6"/>
            <rect x="18" y="6" width="2" height="4" fill="#f472b6"/>
            <rect x="6" y="8" width="2" height="2" fill="#ec4899"/>
            <rect x="16" y="8" width="2" height="2" fill="#ec4899"/>
            <rect x="4" y="10" width="16" height="2" fill="#db2777"/>
            <rect x="6" y="12" width="12" height="2" fill="#f472b6"/>
            <rect x="8" y="14" width="8" height="2" fill="#ec4899"/>
            <rect x="10" y="16" width="4" height="2" fill="#db2777"/>
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

// Default export (defaults to Sparkle - most commonly used)
export default COOLASFUCKSparkle;