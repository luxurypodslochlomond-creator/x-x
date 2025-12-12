import React from 'react';
import { motion } from 'framer-motion';

/**
 * 8-BIT PLANE ICON - COOLASFUCK style for LA Trip
 * Animated flying motion
 */

export const Plane8Bit = ({ className = "", size = 32, animate = true, color = "#fbbf24" }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 32 32"
            className={className}
            animate={animate ? {
                x: [0, 3, 0],
                y: [0, -2, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* Plane body */}
            <rect x="14" y="12" width="8" height="4" fill={color}/>
            
            {/* Nose */}
            <rect x="22" y="12" width="2" height="4" fill={color}/>
            <rect x="24" y="13" width="2" height="2" fill={color}/>
            
            {/* Wings */}
            <rect x="8" y="13" width="10" height="2" fill={color}/>
            <rect x="6" y="14" width="2" height="2" fill="#fef3c7"/>
            
            {/* Tail wing */}
            <rect x="12" y="10" width="4" height="2" fill={color}/>
            <rect x="12" y="16" width="4" height="2" fill={color}/>
            
            {/* Window */}
            <rect x="18" y="13" width="2" height="2" fill="#06b6d4"/>
            
            {/* Engine glow */}
            <rect x="26" y="13" width="2" height="2" fill="#ec4899" opacity="0.8"/>
        </Component>
    );
};

export default Plane8Bit;