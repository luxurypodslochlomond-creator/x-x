import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Volume2, VolumeX, Clock, Heart, Brain, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SLEEP HEALING PROTOCOLS
 * 8 hours every night to heal
 * Overnight theta/delta wave protocols
 * Tesla's frequencies while you sleep
 */

const SLEEP_PROTOCOLS = [
    {
        id: 'deep_sleep',
        name: 'Deep Sleep',
        icon: Moon,
        color: 'indigo',
        frequencies: [0.5, 1, 2, 4], // Delta waves
        description: 'Delta waves (0.5-4Hz) for deepest sleep and cellular regeneration',
        benefits: ['Physical healing', 'Immune system boost', 'Growth hormone release'],
        duration: '8 hours'
    },
    {
        id: 'dream_state',
        name: 'Dream Enhancement',
        icon: Brain,
        color: 'purple',
        frequencies: [4, 5, 6, 7], // Theta waves
        description: 'Theta waves (4-8Hz) for vivid dreams and subconscious healing',
        benefits: ['Emotional processing', 'Memory consolidation', 'Creativity boost'],
        duration: '6-8 hours'
    },
    {
        id: 'insomnia_relief',
        name: 'Insomnia Relief',
        icon: Waves,
        color: 'cyan',
        frequencies: [7.83, 3, 1.5], // Schumann + delta
        description: 'Schumann Resonance combined with delta for natural sleep induction',
        benefits: ['Fall asleep faster', 'Stay asleep longer', 'Wake refreshed'],
        duration: '30min-8hours'
    },
    {
        id: 'circadian_reset',
        name: 'Circadian Reset',
        icon: Sun,
        color: 'amber',
        frequencies: [10, 7.83, 5], // Alpha + Schumann + Theta
        description: 'Gentle frequency shift to reset your natural sleep/wake cycle',
        benefits: ['Jet lag recovery', 'Shift work adjustment', 'Sleep schedule repair'],
        duration: '3-7 nights'
    }
];

export default function SleepHealing() {
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [oscillators, setOscillators] = useState([]);
    const [volume, setVolume] = useState(0.3);

    useEffect(() => {
        return () => {
            stopHealing();
        };
    }, []);

    const startHealing = (protocol) => {
        setSelectedProtocol(protocol);
        
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);

        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        gainNode.connect(ctx.destination);

        const oscs = protocol.frequencies.map(freq => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.connect(gainNode);
            osc.start();
            return osc;
        });

        setOscillators(oscs);
        setIsPlaying(true);

        // Optional timer
        if (protocol.duration !== '8 hours') {
            const durationMs = protocol.duration === '30min-8hours' ? 30 * 60 * 1000 : 8 * 60 * 60 * 1000;
            const t = setTimeout(() => {
                stopHealing();
            }, durationMs);
            setTimer(t);
        }
    };

    const stopHealing = () => {
        oscillators.forEach(osc => osc.stop());
        if (audioContext) audioContext.close();
        if (timer) clearTimeout(timer);
        setOscillators([]);
        setAudioContext(null);
        setIsPlaying(false);
        setTimer(null);
    };

    const togglePlayback = () => {
        if (isPlaying) {
            stopHealing();
        } else if (selectedProtocol) {
            startHealing(selectedProtocol);
        }
    };

    const colorMap = {
        indigo: { bg: 'from-indigo-900/40 to-indigo-600/20', border: 'border-indigo-500', text: 'text-indigo-400' },
        purple: { bg: 'from-purple-900/40 to-purple-600/20', border: 'border-purple-500', text: 'text-purple-400' },
        cyan: { bg: 'from-cyan-900/40 to-cyan-600/20', border: 'border-cyan-500', text: 'text-cyan-400' },
        amber: { bg: 'from-amber-900/40 to-amber-600/20', border: 'border-amber-500', text: 'text-amber-400' },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* HEADER */}
                <div className="text-center mb-8">
                    <Moon className="w-16 h-16 text-indigo-400 mx-auto mb-4 animate-pulse" />
                    <h1 className="text-4xl font-black text-indigo-400 mb-2">Sleep Healing</h1>
                    <p className="text-gray-400">8 hours every night to heal • Tesla frequencies while you sleep</p>
                </div>

                {/* PROTOCOLS */}
                <div className="grid md:grid-cols-2 gap-4">
                    {SLEEP_PROTOCOLS.map(protocol => {
                        const Icon = protocol.icon;
                        const colors = colorMap[protocol.color];
                        const isSelected = selectedProtocol?.id === protocol.id;

                        return (
                            <motion.div
                                key={protocol.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card 
                                    className={`bg-gradient-to-br ${colors.bg} border-2 ${isSelected ? colors.border : 'border-white/10'} p-6 cursor-pointer transition-all ${isSelected ? 'ring-4 ring-offset-2 ring-offset-black' : ''}`}
                                    style={isSelected ? { boxShadow: `0 0 30px ${protocol.color === 'indigo' ? 'rgba(99, 102, 241, 0.5)' : protocol.color === 'purple' ? 'rgba(168, 85, 247, 0.5)' : protocol.color === 'cyan' ? 'rgba(34, 211, 238, 0.5)' : 'rgba(245, 158, 11, 0.5)'}` } : {}}
                                    onClick={() => setSelectedProtocol(protocol)}
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <Icon className={`w-8 h-8 ${colors.text} flex-shrink-0`} />
                                        <div>
                                            <h3 className={`text-xl font-bold ${colors.text} mb-1`}>{protocol.name}</h3>
                                            <p className="text-gray-300 text-sm mb-2">{protocol.description}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                                <Clock className="w-3 h-3" />
                                                <span>{protocol.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        {protocol.benefits.map((benefit, i) => (
                                            <p key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                                <span className={colors.text}>✓</span> {benefit}
                                            </p>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* PLAYBACK CONTROLS */}
                <AnimatePresence>
                    {selectedProtocol && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Card className="bg-black/80 border-2 border-indigo-500 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{selectedProtocol.name}</h3>
                                        <p className="text-gray-400 text-sm">Playing: {selectedProtocol.frequencies.join('Hz, ')}Hz</p>
                                    </div>
                                    <Button
                                        onClick={togglePlayback}
                                        className={`${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white px-8 py-6 text-lg font-bold`}
                                    >
                                        {isPlaying ? 'Stop' : 'Start Healing'}
                                    </Button>
                                </div>

                                {isPlaying && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <VolumeX className="w-5 h-5 text-gray-400" />
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={(e) => {
                                                    const newVol = parseFloat(e.target.value);
                                                    setVolume(newVol);
                                                    if (audioContext) {
                                                        const gainNode = audioContext.createGain();
                                                        gainNode.gain.value = newVol;
                                                    }
                                                }}
                                                className="flex-1"
                                            />
                                            <Volume2 className="w-5 h-5 text-gray-400" />
                                        </div>

                                        <div className="bg-indigo-500/20 border border-indigo-500 p-4 rounded-lg">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
                                                <p className="text-white font-bold">Healing in progress</p>
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                Use comfortable headphones. Keep volume low. Let the frequencies guide you to sleep.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* INSTRUCTIONS */}
                <Card className="bg-black/60 border border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-white mb-3">How to Use Sleep Healing</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                        <p>1. Choose a protocol based on your sleep needs</p>
                        <p>2. Put on comfortable headphones or use a Bluetooth speaker near your bed</p>
                        <p>3. Keep volume LOW - barely audible is perfect</p>
                        <p>4. Start the healing and let it play overnight</p>
                        <p>5. Your brain will entrain to the frequencies naturally</p>
                        <p className="text-cyan-400 font-bold mt-4">💡 Most effective when used consistently for 7-14 nights</p>
                    </div>
                </Card>

            </div>
        </div>
    );
}