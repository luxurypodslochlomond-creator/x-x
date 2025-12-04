import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/components/shared/AudioProvider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, SkipBack, SkipForward, Share2, Heart, ChevronDown, ChevronUp, Waves, Music, Zap } from 'lucide-react';
import { createPageUrl } from '@/utils';

const getFrequencyColor = (frequency_type) => {
    const colors = {
        'Healing': '#00FF88',
        'Creation': '#FFD700',
        'Focus': '#00D9FF',
        'Decompression': '#9D4EDD',
        'Love': '#FF1B8D',
        'Genesis': '#FFFFFF',
        'Revolution': '#FF6B35',
        'Soul_Signature': '#F59E0B'
    };
    return colors[frequency_type] || '#00FF88';
};

const LiveFrequencyVisualizer = ({ color, isPlaying, analyserRef }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            if (!isPlaying || !analyserRef?.current) {
                // Draw static waves when not playing
                ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                animationRef.current = requestAnimationFrame(draw);
                return;
            }

            const analyser = analyserRef.current;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            // Fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw frequency bars
            const barWidth = canvas.width / bufferLength * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
                
                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, color + '40');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }

            // Draw particle effects
            const centerY = canvas.height / 2;
            for (let i = 0; i < bufferLength; i += 8) {
                const amplitude = dataArray[i] / 255;
                const radius = amplitude * 4;
                const particleX = (i / bufferLength) * canvas.width;
                const particleY = centerY + Math.sin(i * 0.1 + Date.now() * 0.002) * amplitude * 100;
                
                ctx.beginPath();
                ctx.arc(particleX, particleY, radius, 0, Math.PI * 2);
                ctx.fillStyle = color + Math.floor(amplitude * 255).toString(16).padStart(2, '0');
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [color, isPlaying, analyserRef]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ touchAction: 'none' }}
        />
    );
};

const BreathingGuide = ({ color, bpm, isPlaying }) => {
    const breathsPerMinute = bpm ? Math.round(bpm / 4) : 6; // Typical: 4 beats per breath
    const breathDuration = 60 / breathsPerMinute;

    return (
        <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
                scale: isPlaying ? [1, 1.5, 1] : 1,
                opacity: isPlaying ? [0.3, 0.8, 0.3] : 0.3
            }}
            transition={{
                duration: breathDuration,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
            }}
        >
            <div
                className="w-32 h-32 rounded-full border-4"
                style={{
                    borderColor: color,
                    boxShadow: `0 0 40px ${color}80`
                }}
            />
        </motion.div>
    );
};

const FrequencyInfoPanel = ({ track, color, isExpanded }) => {
    return (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-32 left-0 right-0 p-6 mx-4 rounded-2xl backdrop-blur-xl"
                    style={{
                        background: `linear-gradient(135deg, ${color}20, rgba(0,0,0,0.8))`,
                        border: `2px solid ${color}40`
                    }}
                >
                    <div className="space-y-4">
                        {/* What it does */}
                        {track.description && (
                            <div>
                                <h3 className="text-sm font-bold mb-1" style={{ color }}>
                                    WHAT IT DOES
                                </h3>
                                <p className="text-white text-base">{track.description}</p>
                            </div>
                        )}

                        {/* Frequency data */}
                        <div className="grid grid-cols-3 gap-3">
                            {track.soul_frequency_hz && (
                                <div className="bg-black/40 rounded-lg p-3 text-center">
                                    <Zap className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                                    <p className="text-xs text-gray-400">Hz</p>
                                    <p className="text-lg font-black text-white">{track.soul_frequency_hz}</p>
                                </div>
                            )}
                            {track.bpm && (
                                <div className="bg-black/40 rounded-lg p-3 text-center">
                                    <Heart className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                                    <p className="text-xs text-gray-400">BPM</p>
                                    <p className="text-lg font-black text-white">{track.bpm}</p>
                                </div>
                            )}
                            {track.key_signature && (
                                <div className="bg-black/40 rounded-lg p-3 text-center">
                                    <Music className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                                    <p className="text-xs text-gray-400">Key</p>
                                    <p className="text-lg font-black text-white">{track.key_signature}</p>
                                </div>
                            )}
                        </div>

                        {/* Zero Loss Badge */}
                        {track.audio_quality_format && (
                            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex items-center gap-3">
                                <Waves className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-green-400 uppercase tracking-wider">Zero Loss Audio</p>
                                    <p className="text-sm text-white">{track.audio_quality_format} - Every Hz transmitted perfectly</p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function FrequencySessionPage() {
    const { currentTrack, isPlaying, togglePlayPause, skipForward, skipBackward, stopTrack, analyserRef } = useAudio();
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);
    const [hapticSupported, setHapticSupported] = useState(false);

    useEffect(() => {
        // Check haptic support
        if ('vibrate' in navigator) {
            setHapticSupported(true);
        }
    }, []);

    // Haptic pulse synced to frequency
    useEffect(() => {
        if (!isPlaying || !hapticSupported || !currentTrack) return;

        const bpm = currentTrack.bpm || 60;
        const interval = (60 / bpm) * 1000; // ms per beat

        const pulseInterval = setInterval(() => {
            navigator.vibrate(20); // Short pulse
        }, interval);

        return () => clearInterval(pulseInterval);
    }, [isPlaying, currentTrack, hapticSupported]);

    // Redirect if no track
    useEffect(() => {
        if (!currentTrack) {
            navigate(createPageUrl('QuantumJukebox'));
        }
    }, [currentTrack, navigate]);

    if (!currentTrack) return null;

    const frequencyColor = getFrequencyColor(currentTrack.frequency_type);

    const handleClose = () => {
        navigate(createPageUrl('QuantumJukebox'));
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentTrack.title,
                    text: `${currentTrack.artist} - ${currentTrack.title}\n${currentTrack.frequency_type} Frequency\nListen on UF51`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black overflow-hidden" style={{ touchAction: 'none' }}>
            {/* Background pulse effect */}
            <motion.div
                className="fixed inset-0"
                animate={{
                    backgroundColor: isPlaying ? [
                        'rgba(0,0,0,1)',
                        `${frequencyColor}15`,
                        'rgba(0,0,0,1)'
                    ] : 'rgba(0,0,0,1)'
                }}
                transition={{
                    duration: currentTrack.bpm ? (60 / currentTrack.bpm) * 4 : 4,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "easeInOut"
                }}
            />

            {/* Live frequency visualizer */}
            <LiveFrequencyVisualizer
                color={frequencyColor}
                isPlaying={isPlaying}
                analyserRef={analyserRef}
            />

            {/* Breathing guide */}
            <BreathingGuide
                color={frequencyColor}
                bpm={currentTrack.bpm}
                isPlaying={isPlaying}
            />

            {/* Top bar - Track info */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 p-6 z-50"
                style={{
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)`
                }}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <motion.div
                            className="flex items-center gap-2 mb-2"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: frequencyColor,
                                    boxShadow: `0 0 15px ${frequencyColor}`
                                }}
                            />
                            <span
                                className="text-xs font-black tracking-wider uppercase"
                                style={{ color: frequencyColor }}
                            >
                                {currentTrack.frequency_type} FREQUENCY ACTIVE
                            </span>
                        </motion.div>
                        <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
                            {currentTrack.title}
                        </h1>
                        <p className="text-lg text-gray-300">{currentTrack.artist}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-3 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>
            </motion.div>

            {/* Info panel */}
            <FrequencyInfoPanel
                track={currentTrack}
                color={frequencyColor}
                isExpanded={showInfo}
            />

            {/* Bottom controls */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 p-6 z-50"
                style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.9), transparent)`,
                    paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))'
                }}
            >
                {/* Info toggle */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                        <span className="text-sm font-bold text-white">
                            {showInfo ? 'Hide Info' : 'Show Info'}
                        </span>
                        {showInfo ? (
                            <ChevronDown className="w-4 h-4 text-white" />
                        ) : (
                            <ChevronUp className="w-4 h-4 text-white" />
                        )}
                    </button>
                </div>

                {/* Main controls */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={() => skipBackward(10)}
                        className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all active:scale-95"
                    >
                        <SkipBack className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="p-8 rounded-full transition-all active:scale-95"
                        style={{
                            background: `linear-gradient(135deg, ${frequencyColor}, ${frequencyColor}dd)`,
                            boxShadow: `0 0 40px ${frequencyColor}60`
                        }}
                    >
                        {isPlaying ? (
                            <Pause className="w-10 h-10 text-white" />
                        ) : (
                            <Play className="w-10 h-10 text-white" />
                        )}
                    </button>

                    <button
                        onClick={() => skipForward(10)}
                        className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all active:scale-95"
                    >
                        <SkipForward className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Secondary controls */}
                <div className="flex justify-center gap-6 mt-6">
                    <button
                        onClick={handleShare}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        title="Share frequency"
                    >
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}