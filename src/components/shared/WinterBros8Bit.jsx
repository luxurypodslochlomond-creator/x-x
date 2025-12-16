import React from 'react';
import { motion } from 'framer-motion';

/**
 * WINTER BROS 8-BIT - Fist Bump in Snow
 * Two mates fist bumping in the snow
 * Pure brotherhood ♾️❤️😎
 */

export default function WinterBros8Bit({ size = 64, animate = false }) {
    const Wrapper = animate ? motion.div : 'div';
    const animateProps = animate ? {
        animate: { 
            scale: [1, 1.03, 1]
        },
        transition: { 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    } : {};

    return (
        <Wrapper className="inline-block" style={{ width: size, height: size }} {...animateProps}>
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 64 64" 
                fill="none"
                style={{ imageRendering: 'pixelated' }}
            >
                {/* Snowflakes falling */}
                <motion.g
                    animate={animate ? {
                        y: [0, 8, 0],
                        opacity: [0.4, 0.8, 0.4]
                    } : {}}
                    transition={animate ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    } : {}}
                >
                    <rect x="8" y="2" width="2" height="2" fill="#e0f2fe" opacity="0.6" />
                    <rect x="20" y="4" width="2" height="2" fill="#e0f2fe" opacity="0.6" />
                    <rect x="42" y="3" width="2" height="2" fill="#e0f2fe" opacity="0.6" />
                    <rect x="54" y="5" width="2" height="2" fill="#e0f2fe" opacity="0.6" />
                    <rect x="14" y="8" width="2" height="2" fill="#e0f2fe" opacity="0.4" />
                    <rect x="48" y="7" width="2" height="2" fill="#e0f2fe" opacity="0.4" />
                </motion.g>

                {/* Ground snow */}
                <rect x="0" y="56" width="64" height="8" fill="#f0f9ff" opacity="0.3" />
                
                {/* PERSON 1 (LEFT) */}
                <g>
                    {/* Fresh hoodie */}
                    <rect x="12" y="28" width="10" height="12" fill="#06b6d4" />
                    <rect x="14" y="29" width="6" height="2" fill="#22d3ee" /> {/* Hood detail */}
                    <rect x="14" y="40" width="6" height="8" fill="#06b6d4" />
                    
                    {/* Head with beanie */}
                    <rect x="14" y="18" width="6" height="2" fill="#f59e0b" />
                    <rect x="14" y="20" width="6" height="6" fill="#fbbf24" />
                    <rect x="14" y="26" width="6" height="2" fill="#d97706" />
                    
                    {/* Sunglasses - COOLASFUCK */}
                    <rect x="15" y="22" width="2" height="2" fill="#1e293b" />
                    <rect x="18" y="22" width="2" height="2" fill="#1e293b" />
                    <rect x="17" y="22" width="1" height="1" fill="#000000" />
                    <rect x="15" y="22" width="1" height="1" fill="#64748b" opacity="0.7" /> {/* Shine */}
                    
                    {/* Arm reaching for fist bump */}
                    <rect x="22" y="30" width="4" height="4" fill="#06b6d4" />
                    <rect x="26" y="31" width="3" height="3" fill="#fbbf24" /> {/* Fist */}
                    
                    {/* Legs */}
                    <rect x="14" y="48" width="2" height="6" fill="#1e293b" />
                    <rect x="18" y="48" width="2" height="6" fill="#1e293b" />
                    
                    {/* Fresh kicks */}
                    <rect x="13" y="54" width="4" height="2" fill="#dc2626" />
                    <rect x="17" y="54" width="4" height="2" fill="#dc2626" />
                </g>

                {/* PERSON 2 (RIGHT) */}
                <g>
                    {/* Fresh hoodie */}
                    <rect x="42" y="28" width="10" height="12" fill="#8b5cf6" />
                    <rect x="44" y="29" width="6" height="2" fill="#a855f7" /> {/* Hood detail */}
                    <rect x="44" y="40" width="6" height="8" fill="#8b5cf6" />
                    
                    {/* Head with beanie */}
                    <rect x="44" y="18" width="6" height="2" fill="#10b981" />
                    <rect x="44" y="20" width="6" height="6" fill="#fbbf24" />
                    <rect x="44" y="26" width="6" height="2" fill="#d97706" />
                    
                    {/* Sunglasses - COOLASFUCK */}
                    <rect x="45" y="22" width="2" height="2" fill="#1e293b" />
                    <rect x="48" y="22" width="2" height="2" fill="#1e293b" />
                    <rect x="47" y="22" width="1" height="1" fill="#000000" />
                    <rect x="48" y="22" width="1" height="1" fill="#64748b" opacity="0.7" /> {/* Shine */}
                    
                    {/* Arm reaching for fist bump */}
                    <rect x="38" y="30" width="4" height="4" fill="#8b5cf6" />
                    <rect x="35" y="31" width="3" height="3" fill="#fbbf24" /> {/* Fist */}
                    
                    {/* Legs */}
                    <rect x="44" y="48" width="2" height="6" fill="#1e293b" />
                    <rect x="48" y="48" width="2" height="6" fill="#1e293b" />
                    
                    {/* Fresh kicks */}
                    <rect x="43" y="54" width="4" height="2" fill="#dc2626" />
                    <rect x="47" y="54" width="4" height="2" fill="#dc2626" />
                </g>

                {/* FIST BUMP IMPACT */}
                <motion.g
                    animate={animate ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                    } : {}}
                    transition={animate ? {
                        duration: 1,
                        repeat: Infinity
                    } : {}}
                >
                    {/* Impact spark */}
                    <rect x="29" y="30" width="6" height="6" fill="#fbbf24" opacity="0.8" />
                    <rect x="28" y="29" width="2" height="2" fill="#fef08a" />
                    <rect x="34" y="29" width="2" height="2" fill="#fef08a" />
                    <rect x="28" y="35" width="2" height="2" fill="#fef08a" />
                    <rect x="34" y="35" width="2" height="2" fill="#fef08a" />
                    {/* Energy lines */}
                    <rect x="27" y="32" width="2" height="1" fill="#fef08a" />
                    <rect x="35" y="32" width="2" height="1" fill="#fef08a" />
                </motion.g>

                {/* Breath clouds (cold air) */}
                <motion.g
                    animate={animate ? {
                        x: [0, 2, 0],
                        opacity: [0.3, 0.6, 0.3]
                    } : {}}
                    transition={animate ? {
                        duration: 2,
                        repeat: Infinity
                    } : {}}
                >
                    <rect x="22" y="24" width="2" height="1" fill="#e0f2fe" opacity="0.4" />
                    <rect x="40" y="24" width="2" height="1" fill="#e0f2fe" opacity="0.4" />
                </motion.g>

                {/* Heart above (the bond) */}
                <motion.g
                    animate={animate ? {
                        y: [-1, 1, -1],
                        scale: [1, 1.08, 1]
                    } : {}}
                    transition={animate ? {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    } : {}}
                >
                    <rect x="28" y="12" width="2" height="2" fill="#ec4899" />
                    <rect x="34" y="12" width="2" height="2" fill="#ec4899" />
                    <rect x="26" y="14" width="6" height="2" fill="#ec4899" />
                    <rect x="32" y="14" width="6" height="2" fill="#ec4899" />
                    <rect x="28" y="16" width="8" height="2" fill="#ec4899" />
                    <rect x="30" y="18" width="4" height="2" fill="#ec4899" />
                    <rect x="31" y="20" width="2" height="2" fill="#ec4899" />
                </motion.g>

            </svg>
        </Wrapper>
    );
}