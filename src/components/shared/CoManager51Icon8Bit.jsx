import React from 'react';
import { motion } from 'framer-motion';

/**
 * CO-MANAGER51 ICON - 8-bit COOLASFUCK
 * Crown with sunglasses + "51" badge
 * For Scott's Co-Manager tool
 */

export const CoManager51Icon8Bit = ({ className = "", size = 64, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
            animate={animate ? {
                y: [0, -4, 0],
                rotate: [0, 3, 0, -3, 0]
            } : {}}
            transition={animate ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
            style={{ imageRendering: 'pixelated' }}
        >
            {/* Crown base */}
            <rect x="8" y="48" width="48" height="8" fill="#f59e0b"/>
            <rect x="12" y="56" width="40" height="4" fill="#d97706"/>
            
            {/* Crown body */}
            <rect x="12" y="40" width="40" height="8" fill="#fbbf24"/>
            
            {/* Left tower */}
            <rect x="12" y="24" width="8" height="16" fill="#f59e0b"/>
            <rect x="12" y="16" width="8" height="8" fill="#fbbf24"/>
            <rect x="14" y="12" width="4" height="4" fill="#fef3c7"/>
            
            {/* Center tower (tallest) */}
            <rect x="28" y="16" width="8" height="24" fill="#f59e0b"/>
            <rect x="28" y="8" width="8" height="8" fill="#fbbf24"/>
            <rect x="30" y="4" width="4" height="4" fill="#fef3c7"/>
            
            {/* Right tower */}
            <rect x="44" y="24" width="8" height="16" fill="#f59e0b"/>
            <rect x="44" y="16" width="8" height="8" fill="#fbbf24"/>
            <rect x="46" y="12" width="4" height="4" fill="#fef3c7"/>
            
            {/* SUNGLASSES - COOL AS FUCK */}
            {/* Left lens frame */}
            <rect x="14" y="34" width="12" height="2" fill="#000000"/>
            <rect x="14" y="36" width="2" height="6" fill="#000000"/>
            <rect x="24" y="36" width="2" height="6" fill="#000000"/>
            <rect x="14" y="42" width="12" height="2" fill="#000000"/>
            
            {/* Left lens - dark gradient effect */}
            <rect x="16" y="36" width="8" height="6" fill="#1e293b"/>
            <rect x="16" y="36" width="6" height="2" fill="#334155"/>
            
            {/* Bridge */}
            <rect x="26" y="36" width="12" height="4" fill="#000000"/>
            
            {/* Right lens frame */}
            <rect x="38" y="34" width="12" height="2" fill="#000000"/>
            <rect x="38" y="36" width="2" height="6" fill="#000000"/>
            <rect x="48" y="36" width="2" height="6" fill="#000000"/>
            <rect x="38" y="42" width="12" height="2" fill="#000000"/>
            
            {/* Right lens - dark gradient effect */}
            <rect x="40" y="36" width="8" height="6" fill="#1e293b"/>
            <rect x="40" y="36" width="6" height="2" fill="#334155"/>
            
            {/* Temple arms */}
            <rect x="10" y="38" width="4" height="2" fill="#000000"/>
            <rect x="50" y="38" width="4" height="2" fill="#000000"/>
            
            {/* "51" BADGE - 8-bit style on crown */}
            <rect x="22" y="44" width="20" height="10" fill="#06b6d4"/>
            <rect x="24" y="46" width="16" height="6" fill="#0891b2"/>
            
            {/* "51" text in 8-bit */}
            {/* 5 */}
            <rect x="26" y="47" width="2" height="1" fill="#ffffff"/>
            <rect x="26" y="48" width="2" height="1" fill="#ffffff"/>
            <rect x="28" y="48" width="2" height="1" fill="#ffffff"/>
            <rect x="28" y="49" width="2" height="1" fill="#ffffff"/>
            <rect x="26" y="50" width="2" height="1" fill="#ffffff"/>
            
            {/* 1 */}
            <rect x="32" y="47" width="2" height="1" fill="#ffffff"/>
            <rect x="33" y="47" width="2" height="4" fill="#ffffff"/>
            <rect x="32" y="50" width="4" height="1" fill="#ffffff"/>
            
            {/* Shine on sunglasses */}
            <rect x="18" y="37" width="2" height="2" fill="#64748b" opacity="0.6"/>
            <rect x="42" y="37" width="2" height="2" fill="#64748b" opacity="0.6"/>
        </Component>
    );
};

export default CoManager51Icon8Bit;