import React from 'react';
import { motion } from 'framer-motion';

/**
 * 8-BIT ACTIVITY ICONS
 * Custom pixel art for activity feed
 * Each activity type gets its own unique pixel icon
 */

// 8-BIT GLOBE (for cleanups)
export const BitGlobe = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                rotate: [0, 360],
            } : {}}
            transition={animate ? {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            } : {}}
        >
            {/* Outer circle */}
            <rect x="6" y="2" width="12" height="2" fill="#22c55e"/>
            <rect x="4" y="4" width="2" height="16" fill="#22c55e"/>
            <rect x="18" y="4" width="2" height="16" fill="#22c55e"/>
            <rect x="6" y="20" width="12" height="2" fill="#22c55e"/>
            
            {/* Continents (land masses) */}
            <rect x="8" y="6" width="2" height="2" fill="#10b981"/>
            <rect x="14" y="6" width="2" height="2" fill="#10b981"/>
            <rect x="10" y="8" width="4" height="2" fill="#10b981"/>
            <rect x="8" y="12" width="2" height="2" fill="#10b981"/>
            <rect x="12" y="12" width="4" height="2" fill="#10b981"/>
            <rect x="10" y="16" width="2" height="2" fill="#10b981"/>
            <rect x="14" y="16" width="2" height="2" fill="#10b981"/>
            
            {/* Sparkle */}
            <rect x="20" y="4" width="2" height="2" fill="#fbbf24" opacity="0.8"/>
        </Component>
    );
};

// 8-BIT HEART (for proof of love)
export const BitHeart = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.2, 1]
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

// 8-BIT COIN (for token transactions)
export const BitCoin = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                rotateY: [0, 360]
            } : {}}
            transition={animate ? {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            } : {}}
        >
            {/* Coin outline */}
            <rect x="6" y="4" width="12" height="2" fill="#f59e0b"/>
            <rect x="4" y="6" width="2" height="12" fill="#f59e0b"/>
            <rect x="18" y="6" width="2" height="12" fill="#f59e0b"/>
            <rect x="6" y="18" width="12" height="2" fill="#f59e0b"/>
            
            {/* $P symbol */}
            <rect x="11" y="8" width="2" height="8" fill="#fbbf24"/>
            <rect x="9" y="9" width="4" height="2" fill="#fbbf24"/>
            <rect x="9" y="13" width="4" height="2" fill="#fbbf24"/>
            <rect x="13" y="10" width="2" height="2" fill="#fbbf24"/>
        </Component>
    );
};

// 8-BIT GIFT (for receiving)
export const BitGift = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                y: [0, -4, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* Box */}
            <rect x="6" y="10" width="12" height="10" fill="#a855f7"/>
            <rect x="4" y="8" width="16" height="2" fill="#9333ea"/>
            
            {/* Ribbon vertical */}
            <rect x="11" y="8" width="2" height="12" fill="#fbbf24"/>
            
            {/* Bow */}
            <rect x="8" y="4" width="3" height="2" fill="#f59e0b"/>
            <rect x="13" y="4" width="3" height="2" fill="#f59e0b"/>
            <rect x="11" y="6" width="2" height="2" fill="#f59e0b"/>
        </Component>
    );
};

// 8-BIT SEND (for sending)
export const BitSend = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                x: [0, 4, 0]
            } : {}}
            transition={animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* Arrow */}
            <rect x="4" y="11" width="12" height="2" fill="#06b6d4"/>
            <rect x="14" y="7" width="2" height="2" fill="#06b6d4"/>
            <rect x="16" y="9" width="2" height="2" fill="#06b6d4"/>
            <rect x="18" y="11" width="2" height="2" fill="#06b6d4"/>
            <rect x="16" y="13" width="2" height="2" fill="#06b6d4"/>
            <rect x="14" y="15" width="2" height="2" fill="#06b6d4"/>
            
            {/* Trail */}
            <rect x="2" y="11" width="2" height="2" fill="#22d3ee" opacity="0.6"/>
        </Component>
    );
};

// 8-BIT MISSION (for mission contributions)
export const BitMission = ({ className = "", size = 24, animate = true }) => {
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
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* Target circles */}
            <rect x="8" y="4" width="8" height="2" fill="#8b5cf6"/>
            <rect x="6" y="6" width="2" height="12" fill="#8b5cf6"/>
            <rect x="16" y="6" width="2" height="12" fill="#8b5cf6"/>
            <rect x="8" y="18" width="8" height="2" fill="#8b5cf6"/>
            
            <rect x="10" y="8" width="4" height="2" fill="#a78bfa"/>
            <rect x="10" y="14" width="4" height="2" fill="#a78bfa"/>
            <rect x="8" y="10" width="2" height="4" fill="#a78bfa"/>
            <rect x="14" y="10" width="2" height="4" fill="#a78bfa"/>
            
            {/* Center */}
            <rect x="11" y="11" width="2" height="2" fill="#c4b5fd"/>
        </Component>
    );
};

// 8-BIT SPARKLE (for special events)
export const BitSparkle = ({ className = "", size = 24, animate = true }) => {
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

export default {
    BitGlobe,
    BitHeart,
    BitCoin,
    BitGift,
    BitSend,
    BitMission,
    BitSparkle
};