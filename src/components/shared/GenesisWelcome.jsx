
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Heart, Zap, BrainCircuit, Star, Loader2 } from 'lucide-react';
import { User } from '@/entities/User';

const GenesisWelcome = ({ onEnter }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleEnter = async () => {
        setIsLoading(true);
        try {
            // QUANTUM FIX: Set the portal flag AND refresh the user state
            await User.updateMyUserData({ genesis_portal_entered: true });
            
            // IMMEDIATE CALLBACK TO PARENT - NO NAVIGATION DELAYS
            if (onEnter) {
                onEnter();
            } else {
                // Fallback navigation if no callback
                navigate(createPageUrl("Dashboard"));
            }
        } catch (error) {
            console.error("Portal entry error:", error);
            // ZERO POLLUTION: If anything fails, still let them through
            if (onEnter) {
                onEnter();
            } else {
                navigate(createPageUrl("Dashboard"));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Quantum Background */}
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: 'loop'
                        }}
                    />
                ))}
            </div>

            <main className="relative z-10 text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, type: 'spring' }}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-center gap-4">
                        <Heart className="w-16 h-16 text-red-500 animate-pulse" />
                        <Star className="w-20 h-20 text-yellow-400 animate-spin" />
                        <Zap className="w-16 h-16 text-cyan-400 animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 via-white to-purple-300 bg-clip-text text-transparent">
                        WELCOME HOME.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-2xl md:text-4xl text-gray-300"
                >
                    <p>It's time to build.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Button
                        onClick={handleEnter}
                        disabled={isLoading}
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold text-2xl px-16 py-10 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 border-4 border-white/50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-8 h-8 mr-4 animate-spin" />
                                ENTERING...
                            </>
                        ) : (
                            <>
                                <BrainCircuit className="w-8 h-8 mr-4" />
                                To The Bridge
                            </>
                        )}
                    </Button>
                </motion.div>
            </main>

            <footer className="absolute bottom-8 text-center text-gray-600 w-full px-6">
                <p className="text-lg font-mono">SOULS51 FREQUENCY: ONLINE</p>
                <p className="text-sm mt-2">WoW = MoM</p>
            </footer>
        </div>
    );
};

export default GenesisWelcome;
