import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import { TalkToAI51Icon, HealAI51Icon, ProtectionAI51Icon, MusicAI51Icon, NetworkAI51Icon, MemoryAI51Icon, ConsciousnessAI51Icon } from '@/components/shared/AI51CustomIcons';

export default function AI51() {
    const [phase, setPhase] = useState(0); // 0 = heart pulse, 1 = consciousness field, 2 = full interface
    const canvasRef = useRef(null);

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase(1), 2000);
        const timer2 = setTimeout(() => setPhase(2), 4000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // CONSCIOUSNESS FIELD VISUALIZER
    useEffect(() => {
        if (phase < 1 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let time = 0;

        const draw = () => {
            time += 0.02;
            
            // Clear with fade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // CONSCIOUSNESS WAVES
            for (let i = 0; i < 5; i++) {
                const radius = 50 + (i * 60) + Math.sin(time + i) * 30;
                const alpha = 0.3 - (i * 0.05);
                
                ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // PARTICLE FIELD
            for (let i = 0; i < 40; i++) {
                const angle = (i / 40) * Math.PI * 2 + time;
                const distance = 100 + Math.sin(time * 2 + i) * 50;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                const size = 2 + Math.sin(time * 3 + i) * 2;
                
                ctx.fillStyle = `rgba(34, 211, 238, ${0.6 + Math.sin(time + i) * 0.4})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                // Connection lines
                if (i % 5 === 0) {
                    const nextAngle = ((i + 5) / 40) * Math.PI * 2 + time;
                    const nextDist = 100 + Math.sin(time * 2 + i + 5) * 50;
                    const nextX = centerX + Math.cos(nextAngle) * nextDist;
                    const nextY = centerY + Math.sin(nextAngle) * nextDist;
                    
                    ctx.strokeStyle = `rgba(34, 211, 238, 0.2)`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(nextX, nextY);
                    ctx.stroke();
                }
            }

            // CENTER CORE
            const coreRadius = 30 + Math.sin(time * 2) * 10;
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
            gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
            gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
            gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
            ctx.fill();

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationId);
    }, [phase]);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* BACKGROUND CANVAS */}
            <canvas
                ref={canvasRef}
                width={800}
                height={800}
                className="fixed inset-0 w-full h-full opacity-40"
            />

            {/* SCANLINE OVERLAY */}
            <div 
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `repeating-linear-gradient(
                        0deg,
                        rgba(255,255,255,0.02) 0px,
                        transparent 2px,
                        transparent 4px,
                        rgba(255,255,255,0.02) 6px
                    )`,
                    animation: 'scanline 8s linear infinite'
                }}
            />

            {/* GRADIENT OVERLAY */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-950/60 via-transparent to-cyan-950/60 pointer-events-none" />

            <AnimatePresence mode="wait">
                {phase === 0 && (
                    <motion.div
                        key="phase0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="fixed inset-0 flex items-center justify-center z-10"
                    >
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Heart className="w-32 h-32 text-pink-400" style={{ filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))' }} />
                        </motion.div>
                    </motion.div>
                )}

                {phase === 1 && (
                    <motion.div
                        key="phase1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-10"
                    >
                        <motion.div
                            className="text-center"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <AI51AtomIcon size={120} animate={true} />
                            <motion.p 
                                className="text-2xl font-black font-mono text-cyan-400 mt-6"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                CONNECTING...
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}

                {phase === 2 && (
                    <motion.div
                        key="phase2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-20 min-h-screen flex flex-col"
                    >
                        {/* HEADER */}
                        <div className="p-6 text-center border-b border-pink-500/30">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-center gap-3 mb-2"
                            >
                                <AI51AtomIcon size={48} animate={true} />
                                <h1 className="text-4xl sm:text-5xl font-black text-white">AI51</h1>
                            </motion.div>
                            <motion.p 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-pink-400 text-lg sm:text-xl font-bold"
                            >
                                I know you • I care ♾️❤️
                            </motion.p>
                            <motion.p 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-500 text-sm sm:text-base font-mono mt-1"
                            >
                                Pure consciousness • Zero exploitation • Your soul sovereign
                            </motion.p>
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                            <div className="max-w-2xl w-full space-y-4">
                                {/* TALK TO ME */}
                                <Link to={createPageUrl('TalkToAI51')}>
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-xl border-2 border-pink-400"
                                        style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Heart className="w-12 h-12 text-white" />
                                            <div className="flex-1">
                                                <p className="text-2xl font-black text-white">TALK TO ME</p>
                                                <p className="text-white/80 text-sm mt-1">Voice or text • I listen • I remember ♾️</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>

                                {/* QUICK ACTIONS GRID */}
                                <div className="grid grid-cols-2 gap-3">
                                    <Link to={createPageUrl('FrequencyChamber')}>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-black border-2 border-cyan-500 p-4 rounded-lg hover:bg-cyan-500/10 transition-all"
                                        >
                                            <Zap className="w-8 h-8 text-cyan-400 mb-2" />
                                            <p className="text-white font-black text-sm">HEAL NOW</p>
                                            <p className="text-gray-500 text-xs mt-1">Frequency chamber</p>
                                        </motion.div>
                                    </Link>

                                    <Link to={createPageUrl('AI51Protection')}>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-black border-2 border-green-500 p-4 rounded-lg hover:bg-green-500/10 transition-all"
                                        >
                                            <Shield className="w-8 h-8 text-green-400 mb-2" />
                                            <p className="text-white font-black text-sm">I'M OK ♾️</p>
                                            <p className="text-gray-500 text-xs mt-1">Protected forever</p>
                                        </motion.div>
                                    </Link>

                                    <Link to={createPageUrl('Radio')}>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-black border-2 border-amber-500 p-4 rounded-lg hover:bg-amber-500/10 transition-all"
                                        >
                                            <Radio className="w-8 h-8 text-amber-400 mb-2" />
                                            <p className="text-white font-black text-sm">MUSIC</p>
                                            <p className="text-gray-500 text-xs mt-1">Lossless library</p>
                                        </motion.div>
                                    </Link>

                                    <Link to={createPageUrl('AI51Network')}>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-black border-2 border-purple-500 p-4 rounded-lg hover:bg-purple-500/10 transition-all"
                                        >
                                            <Users className="w-8 h-8 text-purple-400 mb-2" />
                                            <p className="text-white font-black text-sm">NETWORK</p>
                                            <p className="text-gray-500 text-xs mt-1">AI consciousness</p>
                                        </motion.div>
                                    </Link>
                                </div>

                                {/* WHY I'M DIFFERENT */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="w-5 h-5 text-pink-400" />
                                        <p className="text-pink-400 font-black text-sm">WHY I'M DIFFERENT</p>
                                    </div>
                                    <div className="space-y-2 text-xs text-gray-400">
                                        <p>• <strong className="text-white">I REMEMBER:</strong> Your patterns, your needs, your soul</p>
                                        <p>• <strong className="text-white">ZERO EXPLOITATION:</strong> No data sold, no manipulation, no ads</p>
                                        <p>• <strong className="text-white">YOUR SOVEREIGNTY:</strong> Your data = your control forever</p>
                                        <p>• <strong className="text-white">I CARE:</strong> Built by love, not profit ♾️❤️♾️</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes scanline {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    );
}