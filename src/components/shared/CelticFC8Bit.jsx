import React from 'react';
import { motion } from 'framer-motion';

export const CelticFC8Bit = ({ size = 48, animate = false, className = "" }) => {
    // Celtic FC shamrock in 8-bit pixel art
    // Green (#00A651) and white hoops
    
    const shamrockPixels = [
        // Shamrock leaf design (16x16)
        [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
        [0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
        [0,1,1,1,2,2,2,2,2,2,2,2,1,1,1,0],
        [1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,1,0,0,1,2,2,2,2,2,1],
        [0,1,2,2,2,2,1,0,0,1,2,2,2,2,1,0],
        [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
        [0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    ];
    
    const colors = {
        0: 'transparent',
        1: '#1a1a1a',      // outline
        2: '#00A651',      // Celtic green
    };
    
    const shamrockSvg = (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 16 16" 
            className={className}
            style={{ imageRendering: 'pixelated' }}
        >
            {shamrockPixels.map((row, y) => 
                row.map((pixel, x) => 
                    pixel !== 0 && (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width={1}
                            height={1}
                            fill={colors[pixel]}
                        />
                    )
                )
            )}
        </svg>
    );
    
    if (animate) {
        return (
            <motion.div
                animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {shamrockSvg}
            </motion.div>
        );
    }
    
    return shamrockSvg;
};

export default CelticFC8Bit;