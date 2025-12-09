import React from 'react';
import { motion } from 'framer-motion';

export const Duck8Bit = ({ size = 48, animate = false, className = "" }) => {
    const pixelSize = size / 16;
    
    const duckPixels = [
        // Row 1-3: Empty (sky)
        // Row 4: Start of head
        [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
        // Row 5: Head continues
        [0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,0],
        // Row 6: Eye and beak start
        [0,0,0,0,1,2,2,3,2,2,1,1,1,0,0,0],
        // Row 7: Beak
        [0,0,0,0,1,2,2,2,2,1,4,4,4,1,0,0],
        // Row 8: Under beak
        [0,0,0,0,0,1,2,2,2,1,1,1,1,0,0,0],
        // Row 9: Neck start
        [0,0,0,0,0,0,1,1,1,2,2,1,0,0,0,0],
        // Row 10-11: Body
        [0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0],
        [0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,0],
        // Row 12: Body continues
        [0,0,0,1,2,2,2,2,2,2,2,2,2,1,0,0],
        // Row 13: Lower body
        [0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],
        // Row 14: Tail
        [0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
        // Row 15: Feet start
        [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
        // Row 16: Feet
        [0,0,0,0,1,4,4,1,1,4,4,1,0,0,0,0],
    ];
    
    const colors = {
        0: 'transparent',
        1: '#1a1a1a',      // outline
        2: '#ffd700',      // yellow body
        3: '#000000',      // eye
        4: '#ff8c00',      // orange beak/feet
    };
    
    const duckSvg = (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 16 16" 
            className={className}
            style={{ imageRendering: 'pixelated' }}
        >
            {duckPixels.map((row, y) => 
                row.map((pixel, x) => 
                    pixel !== 0 && (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y + 3}
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
                    y: [0, -8, 0],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {duckSvg}
            </motion.div>
        );
    }
    
    return duckSvg;
};

export default Duck8Bit;