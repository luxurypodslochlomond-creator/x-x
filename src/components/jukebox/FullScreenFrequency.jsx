import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Waves } from 'lucide-react';
import { useAudio } from '@/components/shared/AudioProvider';

/**
 * FULL-SCREEN FREQUENCY EXPERIENCE
 * COOLASFUCK audio + visual healing
 * Tap floating player to expand
 * P2P transmission of consciousness
 */

export default function FullScreenFrequency({ isOpen, onClose }) {
    const { currentTrack, isPlaying, analyserNode, audioContextRef } = useAudio();
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [heartbeatSync, setHeartbeatSync] = useState(false);

    useEffect(() => {
        if (!isOpen || !canvasRef.current || !analyserNode) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Set canvas to full screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // COOLASFUCK VISUALIZATION
        const draw = () => {
            if (!isOpen) return;
            
            animationRef.current = requestAnimationFrame(draw);
            analyserNode.getByteFrequencyData(dataArray);

            // Clear with fade trail (cooler than hard clear)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // CIRCULAR FREQUENCY BARS (COOLASFUCK)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) * 0.25;
            const bars = 128;
            const angleStep = (Math.PI * 2) / bars;

            for (let i = 0; i < bars; i++) {
                const value = dataArray[Math.floor(i * bufferLength / bars)];
                const barHeight = (value / 255) * radius * 0.8;
                const angle = angleStep * i;

                const x1 = centerX + Math.cos(angle) * radius;
                const y1 = centerY + Math.sin(angle) * radius;
                const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                const y2 = centerY + Math.sin(angle) * (radius + barHeight);

                // Color gradient based on frequency
                const hue = (i / bars) * 360;
                const saturation = 80 + (value / 255) * 20;
                const lightness = 50 + (value / 255) * 30;
                
                ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // CENTER PULSING HEART
            const avgFrequency = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
            const heartScale = 1 + (avgFrequency / 255) * 0.5;
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(heartScale, heartScale);
            
            // Draw heart shape
            ctx.fillStyle = `rgba(236, 72, 153, ${0.6 + (avgFrequency / 255) * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(0, 15);
            ctx.bezierCurveTo(-25, -10, -50, 0, 0, 50);
            ctx.bezierCurveTo(50, 0, 25, -10, 0, 15);
            ctx.fill();
            
            ctx.restore();

            // TRACK INFO - BOTTOM
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 24px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(currentTrack?.title || 'No Track', centerX, canvas.height - 80);
            
            ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
            ctx.font = '18px sans-serif';
            ctx.fillText(currentTrack?.artist || '', centerX, canvas.height - 50);

            // BPM if available
            if (currentTrack?.bpm) {
                ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
                ctx.font = 'bold 20px monospace';
                ctx.fillText(`${currentTrack.bpm} BPM`, centerX, canvas.height - 20);
            }
        };

        if (isPlaying) {
            draw();
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isOpen, analyserNode, isPlaying, currentTrack]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[9999]"
            >
                {/* CLOSE BUTTON */}
                <motion.button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className="w-7 h-7 text-white" />
                </motion.button>

                {/* FREQUENCY INFO - TOP */}
                <div className="absolute top-6 left-6 z-50 bg-black/80 backdrop-blur-md rounded-xl p-4 border-2 border-cyan-500/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Waves className="w-5 h-5 text-cyan-400" />
                        <span className="text-cyan-300 font-bold text-sm">FREQUENCY HEALING</span>
                    </div>
                    <p className="text-white text-xs">
                        {currentTrack?.frequency_type || 'Unknown'} • Zero-loss transmission
                    </p>
                    {currentTrack?.bpm && (
                        <p className="text-cyan-400 text-xs mt-1">
                            <Heart className="w-3 h-3 inline mr-1" />
                            {currentTrack.bpm} BPM = 2x heartbeat
                        </p>
                    )}
                </div>

                {/* CANVAS - FULL SCREEN */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                />

                {/* TAP ANYWHERE TO CLOSE HINT */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50"
                >
                    <p className="text-gray-400 text-sm">Tap X to close</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}