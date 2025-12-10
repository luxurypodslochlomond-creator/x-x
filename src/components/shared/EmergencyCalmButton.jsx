import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * EMERGENCY CALM BUTTON
 * Panic attack? One tap → instant 432Hz + breathing
 * PTSD trigger? Immediate Schumann grounding
 * Works offline, no loading
 */

export default function EmergencyCalmButton() {
    const [isActive, setIsActive] = useState(false);
    const [breathCount, setBreathCount] = useState(0);
    const [breathPhase, setBreathPhase] = useState('in'); // 'in', 'hold', 'out'
    const [audioContext, setAudioContext] = useState(null);
    const [oscillators, setOscillators] = useState([]);

    useEffect(() => {
        let breathInterval;
        if (isActive) {
            breathInterval = setInterval(() => {
                setBreathCount(prev => {
                    const newCount = prev + 1;
                    const cycle = newCount % 16; // 4s in, 4s hold, 8s out = 16s total
                    if (cycle < 4) setBreathPhase('in');
                    else if (cycle < 8) setBreathPhase('hold');
                    else setBreathPhase('out');
                    return newCount;
                });
            }, 1000);
        }
        return () => clearInterval(breathInterval);
    }, [isActive]);

    const startEmergencyCalm = () => {
        setIsActive(true);
        setBreathCount(0);
        setBreathPhase('in');

        // Instant audio - 432Hz + Schumann 7.83Hz
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.2; // Low volume for calm

        const osc432 = ctx.createOscillator();
        osc432.type = 'sine';
        osc432.frequency.value = 432;
        osc432.connect(gainNode);

        const oscSchumann = ctx.createOscillator();
        oscSchumann.type = 'sine';
        oscSchumann.frequency.value = 7.83;
        oscSchumann.connect(gainNode);

        gainNode.connect(ctx.destination);
        osc432.start();
        oscSchumann.start();

        setOscillators([osc432, oscSchumann]);
    };

    const stopEmergencyCalm = () => {
        oscillators.forEach(osc => osc.stop());
        if (audioContext) audioContext.close();
        setOscillators([]);
        setAudioContext(null);
        setIsActive(false);
        setBreathCount(0);
    };

    return (
        <>
            {/* TRIGGER BUTTON - Fixed position */}
            {!isActive && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <Button
                        onClick={startEmergencyCalm}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-2xl"
                        style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}
                    >
                        <Heart className="w-8 h-8 text-white" />
                    </Button>
                </motion.div>
            )}

            {/* EMERGENCY CALM OVERLAY */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6"
                    >
                        <Button
                            onClick={stopEmergencyCalm}
                            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white"
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        <div className="text-center max-w-md">
                            {/* BREATHING VISUAL */}
                            <motion.div
                                animate={{
                                    scale: breathPhase === 'in' ? [0.8, 1.2] : breathPhase === 'hold' ? 1.2 : [1.2, 0.8],
                                    opacity: breathPhase === 'hold' ? [0.6, 1, 0.6] : 1,
                                }}
                                transition={{
                                    duration: breathPhase === 'in' ? 4 : breathPhase === 'hold' ? 4 : 8,
                                    ease: "easeInOut"
                                }}
                                className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                                style={{ boxShadow: '0 0 80px rgba(34, 211, 238, 0.8)' }}
                            />

                            {/* INSTRUCTION */}
                            <motion.div
                                key={breathPhase}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6"
                            >
                                <p className="text-4xl font-black text-white mb-2">
                                    {breathPhase === 'in' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                                </p>
                                <p className="text-cyan-400 text-sm">
                                    {breathPhase === 'in' ? '4 seconds' : breathPhase === 'hold' ? '4 seconds' : '8 seconds'}
                                </p>
                            </motion.div>

                            {/* FREQUENCIES */}
                            <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-4 mb-6">
                                <p className="text-gray-400 text-xs mb-2">Playing healing frequencies:</p>
                                <div className="flex justify-center gap-4 text-sm">
                                    <span className="text-cyan-400 font-mono">432Hz</span>
                                    <span className="text-purple-400 font-mono">7.83Hz</span>
                                </div>
                            </div>

                            {/* AFFIRMATION */}
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-gray-300 text-lg"
                            >
                                You are safe. You are loved. This will pass.
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}