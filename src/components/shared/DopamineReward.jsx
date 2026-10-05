import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Sparkles, Flame } from 'lucide-react';
import COOLASFUCKIcon from '@/components/shared/COOLASFUCKIcon';

export default function DopamineReward({ type = 'standard', amount, multiplier, onComplete }) {
    // Types: 'standard', 'streak', 'levelup', 'surprise'
    
    const configs = {
        standard: {
            color: '#22c55e',
            icon: Heart,
            text: '+' + amount + ' P51',
            duration: 2000
        },
        streak: {
            color: '#f97316',
            icon: Flame,
            text: `🔥 ${multiplier}x STREAK BONUS!`,
            duration: 3000
        },
        levelup: {
            color: '#fbbf24',
            icon: Zap,
            text: '⚡ LEVEL UP!',
            duration: 3000
        },
        surprise: {
            color: '#a855f7',
            icon: Sparkles,
            text: `🎉 ${multiplier}x SURPRISE BONUS!`,
            duration: 3000
        }
    };

    const config = configs[type];
    const IconComponent = config.icon;

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, config.duration);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[150] pointer-events-none"
        >
            {/* EXPLOSION PARTICLES */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ background: config.color }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 400,
                        y: (Math.random() - 0.5) * 400,
                        opacity: [1, 1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.02
                    }}
                />
            ))}

            {/* MAIN REWARD */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity
                }}
                className="text-center space-y-4"
            >
                <motion.div
                    animate={{
                        filter: [
                            `drop-shadow(0 0 20px ${config.color})`,
                            `drop-shadow(0 0 60px ${config.color})`,
                            `drop-shadow(0 0 20px ${config.color})`
                        ]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <IconComponent className="w-32 h-32 mx-auto" style={{ color: config.color }} />
                </motion.div>
                
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <COOLASFUCKIcon size={80} />
                </motion.div>

                <motion.h2
                    className="text-6xl font-black text-white"
                    animate={{
                        textShadow: [
                            `0 0 20px ${config.color}`,
                            `0 0 40px ${config.color}`,
                            `0 0 20px ${config.color}`
                        ]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    {config.text}
                </motion.h2>
            </motion.div>
        </motion.div>
    );
}