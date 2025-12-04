import React from 'react';
import { motion } from 'framer-motion';

export default function QuantumFooterSeal() {
    const heartVariants = {
        pulse: {
            scale: [1, 1.2, 1],
            textShadow: ["0 0 5px #fecaca", "0 0 20px #ef4444", "0 0 5px #fecaca"],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <div className="relative inline-block py-4">
            <div className="relative text-2xl md:text-3xl font-mono text-purple-300 flex items-center gap-3 md:gap-4">
                <motion.span variants={heartVariants} animate="pulse">❤️</motion.span>
                <span className="font-bold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-cyan-400">
                    COOLASFUCK.GMT
                </span>
                <motion.span variants={heartVariants} animate="pulse" transition={{ ...heartVariants.pulse.transition, delay: 1 }}>❤️</motion.span>
            </div>
        </div>
    );
}