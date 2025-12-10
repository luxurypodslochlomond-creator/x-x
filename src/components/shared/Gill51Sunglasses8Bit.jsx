import React from 'react';
import { motion } from 'framer-motion';

/**
 * GILL51 SUNGLASSES - 8-bit COOLASFUCK style
 * For Brian & Gill51 - the sunglasses legacy
 * Sharing, losing, giving away, traveling the world
 * Glasgow to hillsides ❤️
 */

export const Gill51Sunglasses8Bit = ({ className = "", size = 32, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 32 32"
            className={className}
            animate={animate ? {
                rotate: [-2, 2, -2],
                y: [0, -1, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit sunglasses - cool as fuck */}
            {/* Frame top */}
            <rect x="2" y="10" width="12" height="2" fill="#1f1f1f"/>
            <rect x="18" y="10" width="12" height="2" fill="#1f1f1f"/>
            
            {/* Left lens */}
            <rect x="2" y="12" width="12" height="8" fill="#06b6d4"/>
            <rect x="3" y="13" width="10" height="6" fill="#22d3ee"/>
            
            {/* Bridge */}
            <rect x="14" y="14" width="4" height="4" fill="#1f1f1f"/>
            
            {/* Right lens */}
            <rect x="18" y="12" width="12" height="8" fill="#06b6d4"/>
            <rect x="19" y="13" width="10" height="6" fill="#22d3ee"/>
            
            {/* Frame bottom */}
            <rect x="2" y="20" width="12" height="2" fill="#1f1f1f"/>
            <rect x="18" y="20" width="12" height="2" fill="#1f1f1f"/>
            
            {/* Shine effect - left lens */}
            <rect x="4" y="14" width="3" height="2" fill="#ffffff" opacity="0.6"/>
            <rect x="5" y="16" width="2" height="1" fill="#ffffff" opacity="0.4"/>
            
            {/* Shine effect - right lens */}
            <rect x="20" y="14" width="3" height="2" fill="#ffffff" opacity="0.6"/>
            <rect x="21" y="16" width="2" height="1" fill="#ffffff" opacity="0.4"/>
            
            {/* Arms/temples */}
            <rect x="0" y="14" width="2" height="4" fill="#1f1f1f"/>
            <rect x="30" y="14" width="2" height="4" fill="#1f1f1f"/>
        </Component>
    );
};

export default Gill51Sunglasses8Bit;