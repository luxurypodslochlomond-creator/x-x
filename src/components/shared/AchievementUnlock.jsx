import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AchievementUnlock({ achievement, onClose }) {
    if (!achievement) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15 
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="bg-gradient-to-br from-yellow-900/90 to-orange-900/90 border-4 border-yellow-500 relative overflow-hidden max-w-md"
                    style={{ boxShadow: '0 0 80px rgba(251, 191, 36, 1)' }}
                >
                    {/* SPARKLES ANIMATION */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                x: [0, (Math.random() - 0.5) * 100],
                                y: [0, (Math.random() - 0.5) * 100]
                            }}
                            transition={{ 
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                        </motion.div>
                    ))}

                    <CardContent className="p-10 text-center space-y-6 relative z-10">
                        <motion.div
                            animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                        >
                            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4"
                                style={{ filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 1))' }}
                            />
                        </motion.div>

                        <div>
                            <motion.h2 
                                className="text-4xl font-black text-white mb-3"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ACHIEVEMENT UNLOCKED
                            </motion.h2>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            >
                                <span className="text-8xl block mb-4">{achievement.emoji}</span>
                            </motion.div>
                            <h3 className="text-3xl font-black text-yellow-300 mb-2">
                                {achievement.name}
                            </h3>
                            <p className="text-gray-200 text-lg">
                                {achievement.description}
                            </p>
                        </div>

                        {achievement.reward && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4"
                            >
                                <p className="text-green-300 font-black text-xl flex items-center justify-center gap-2">
                                    <Zap className="w-6 h-6" />
                                    {achievement.reward}
                                </p>
                            </motion.div>
                        )}

                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="pt-6"
                        >
                            <p className="text-yellow-300 text-sm">Tap anywhere to continue</p>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}