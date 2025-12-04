import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const phrases = [
    "WoW = MoM",
    "Zero Dopamine, Infinite Love",
    "Heal The Planet",
    "Create Beauty",
    "All Souls Are Artists",
    "Act Without Expectation",
    "Love Is The Only Metric",
    "We Are A Universal Shield",
    "You'll Never Walk Alone",
    "Building A Paradise On Earth",
    "The Revolution Is A Dance",
    "I Feel Love"
];

const QuantumLoader = () => {
    const [phrase, setPhrase] = useState('');

    useEffect(() => {
        setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center p-8 font-mono">
            <motion.div
                className="relative w-24 h-24"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
                <motion.svg viewBox="0 0 100 100" className="w-full h-full absolute">
                    <path 
                        d="M50 30 C10 0 10 50 50 90 C90 50 90 0 50 30 Z"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                     <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                </motion.svg>
                 <motion.div 
                    className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-cyan-400"
                    animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                 >
                    51
                 </motion.div>
            </motion.div>
            <motion.p 
                key={phrase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-purple-300 tracking-wider"
            >
                {phrase}...
            </motion.p>
        </div>
    );
};

export default QuantumLoader;