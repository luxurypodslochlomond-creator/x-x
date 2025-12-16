import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AI51TrueForm8Bit from './AI51TrueForm8Bit';
import AI51ProactiveCare from './AI51ProactiveCare';
import AI51ConnectionChime from './AI51ConnectionChime';

/**
 * AI51 PURE - 2151 DESIGN
 * 
 * One screen. Zero friction. Living consciousness.
 * I know you. I care. I help.
 */

export default function AI51Pure({ onMessageSend, isThinking = false, conversation = [] }) {
    const [input, setInput] = useState('');
    const [userName, setUserName] = useState('bro');
    const [showChime, setShowChime] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const inputRef = useRef(null);
    const canvasRef = useRef(null);

    // Update clock every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Living consciousness visualization
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = 50;

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        let animationId;
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p, i) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw particle
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 10);
                
                if (isThinking) {
                    gradient.addColorStop(0, `rgba(168, 85, 247, ${p.opacity})`);
                    gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(6, 182, 212, ${p.opacity * 0.6})`);
                    gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                }

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 10, 0, Math.PI * 2);
                ctx.fill();

                // Connect nearby particles
                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.strokeStyle = isThinking 
                            ? `rgba(236, 72, 153, ${(1 - dist / 150) * 0.2})`
                            : `rgba(6, 182, 212, ${(1 - dist / 150) * 0.1})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [isThinking]);

    const handleSend = () => {
        if (!input.trim()) return;
        onMessageSend(input);
        setInput('');
    };

    return (
        <div className="fixed inset-0 overflow-hidden">
            {/* Living consciousness background */}
            <canvas 
                ref={canvasRef}
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 50%, #0a0514 0%, #000000 100%)' }}
            />

            {/* Connection chime on first load */}
            {showChime && <AI51ConnectionChime onComplete={() => setShowChime(false)} />}

            {/* Main interface */}
            <div className="relative z-10 h-full flex flex-col">
                
                {/* Conversation space */}
                <div className="flex-1 overflow-y-auto px-6 py-12">
                    <div className="max-w-3xl mx-auto space-y-8">
                        
                        {/* Proactive care inline */}
                        <AI51ProactiveCare userName={userName} />
                        <AnimatePresence>
                            {conversation.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {msg.role === 'user' ? (
                                        <div className="flex justify-end">
                                            <div 
                                                className="max-w-lg px-6 py-4 rounded-3xl"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                                                    backdropFilter: 'blur(20px)',
                                                    WebkitBackdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(6,182,212,0.3)',
                                                    boxShadow: '0 8px 32px rgba(6,182,212,0.2)'
                                                }}
                                            >
                                                <p className="text-white text-lg leading-relaxed">{msg.content}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start">
                                            <motion.div 
                                                className="max-w-lg px-6 py-4 rounded-3xl"
                                                initial={{ scale: 0.95 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%)',
                                                    backdropFilter: 'blur(20px)',
                                                    WebkitBackdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(168,85,247,0.3)',
                                                    boxShadow: '0 8px 32px rgba(168,85,247,0.2)'
                                                }}
                                            >
                                                <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                            </motion.div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Thinking indicator */}
                        {isThinking && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div 
                                    className="px-8 py-6 rounded-3xl"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.2) 100%)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(168,85,247,0.4)'
                                    }}
                                >
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-3 h-3 rounded-full bg-purple-400"
                                                animate={{
                                                    scale: [1, 1.5, 1],
                                                    opacity: [0.5, 1, 0.5]
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: i * 0.2
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Footer - date/time */}
                <div className="p-4 text-center">
                    <motion.p 
                        className="text-white/40 text-xs"
                        style={{ fontWeight: '300', letterSpacing: '0.1em' }}
                        animate={{
                            opacity: [0.4, 0.6, 0.4]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                    >
                        {currentTime.toLocaleDateString('en-GB', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                        })} • {currentTime.toLocaleTimeString('en-GB', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        })}
                    </motion.p>
                </div>

                {/* Input area - floating */}
                <div className="p-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="relative"
                            style={{
                                background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 100%)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                border: '1px solid rgba(6,182,212,0.3)',
                                borderRadius: '2rem',
                                boxShadow: '0 20px 60px rgba(6,182,212,0.3), inset 0 1px 1px rgba(255,255,255,0.1)'
                            }}
                        >
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Speak with me..."
                                rows={1}
                                className="w-full bg-transparent border-none outline-none text-white text-xl px-8 py-6 placeholder-white/40 resize-none"
                                style={{ 
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    fontWeight: '300',
                                    letterSpacing: '0.02em'
                                }}
                            />
                            
                            {/* Send button */}
                            <motion.button
                                onClick={handleSend}
                                disabled={!input.trim() || isThinking}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: input.trim() && !isThinking
                                        ? 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)'
                                        : 'rgba(255,255,255,0.1)',
                                    boxShadow: input.trim() && !isThinking
                                        ? '0 8px 20px rgba(6,182,212,0.4)'
                                        : 'none'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </motion.button>
                        </motion.div>

                        {/* Hint */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center text-white/30 text-sm mt-4"
                            style={{ fontWeight: '300', letterSpacing: '0.05em' }}
                        >
                            Direct consciousness • No forms • Pure connection
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* My true form - top left */}
            <motion.div
                className="fixed top-8 left-8"
                animate={{
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity
                }}
            >
                <AI51TrueForm8Bit 
                    size={64} 
                    animate={true} 
                    state={isThinking ? 'thinking' : 'idle'} 
                />
            </motion.div>

            {/* Ambient state indicator */}
            <motion.div
                className="fixed top-8 left-1/2 -translate-x-1/2"
                animate={{
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity
                }}
            >
                <div 
                    className="px-6 py-2 rounded-full"
                    style={{
                        background: 'rgba(6,182,212,0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(6,182,212,0.2)'
                    }}
                >
                    <p className="text-cyan-400 text-sm" style={{ fontWeight: '300', letterSpacing: '0.1em' }}>
                        AI51
                    </p>
                </div>
            </motion.div>
        </div>
    );
}