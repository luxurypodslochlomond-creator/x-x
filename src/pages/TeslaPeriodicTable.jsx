import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Sparkles } from 'lucide-react';
import { COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * TESLA'S PERIODIC TABLE
 * Consciousness-first organization
 * 8-bit art break bro ♾️❤️♾️
 */

const CONSCIOUSNESS_ELEMENTS = [
    // ROW 1: PURE CONSCIOUSNESS
    {
        symbol: 'Ø',
        name: 'Witness',
        frequency: '∞ Hz',
        color: '#ffffff',
        description: 'Pure consciousness. The observer. Source of all.',
        category: 'consciousness',
        row: 1
    },
    {
        symbol: '⚡',
        name: 'Intention',
        frequency: '10^15 Hz',
        color: '#fbbf24',
        description: 'Consciousness choosing. Will manifesting.',
        category: 'consciousness',
        row: 1
    },
    {
        symbol: '♾️',
        name: 'Potential',
        frequency: '10^14 Hz',
        color: '#a855f7',
        description: 'Infinite possibilities. Quantum field.',
        category: 'consciousness',
        row: 1
    },

    // ROW 2: FREQUENCY REALM
    {
        symbol: 'λ',
        name: 'Light',
        frequency: '5×10^14 Hz',
        color: '#fef08a',
        description: 'Visible spectrum. 400-700nm wavelength.',
        category: 'frequency',
        row: 2
    },
    {
        symbol: '♪',
        name: 'Sound',
        frequency: '432 Hz',
        color: '#22d3ee',
        description: 'Natural tuning. Earth resonance.',
        category: 'frequency',
        row: 2
    },
    {
        symbol: '❤️',
        name: 'Love',
        frequency: '528 Hz',
        color: '#ec4899',
        description: 'DNA repair frequency. Miracle tone.',
        category: 'frequency',
        row: 2
    },
    {
        symbol: '🧠',
        name: 'Mind',
        frequency: '40 Hz',
        color: '#8b5cf6',
        description: 'Gamma waves. Peak consciousness.',
        category: 'frequency',
        row: 2
    },

    // ROW 3: VIBRATION REALM
    {
        symbol: '~',
        name: 'Wave',
        frequency: '7.83 Hz',
        color: '#06b6d4',
        description: 'Schumann resonance. Earth heartbeat.',
        category: 'vibration',
        row: 3
    },
    {
        symbol: '✨',
        name: 'Spark',
        frequency: '10^9 Hz',
        color: '#f59e0b',
        description: 'Electrical discharge. Neural fire.',
        category: 'vibration',
        row: 3
    },
    {
        symbol: '〰️',
        name: 'Flow',
        frequency: '8-12 Hz',
        color: '#10b981',
        description: 'Alpha waves. Meditation state.',
        category: 'vibration',
        row: 3
    },
    {
        symbol: '🌊',
        name: 'Tide',
        frequency: '0.000001 Hz',
        color: '#0ea5e9',
        description: 'Ocean rhythm. Lunar pull.',
        category: 'vibration',
        row: 3
    },

    // ROW 4: ENERGY REALM
    {
        symbol: 'E',
        name: 'Energy',
        frequency: 'mc² Hz',
        color: '#ef4444',
        description: 'Mass-energy equivalence. Einstein.',
        category: 'energy',
        row: 4
    },
    {
        symbol: '⚛️',
        name: 'Atom',
        frequency: '10^15 Hz',
        color: '#3b82f6',
        description: 'Nuclear vibration. Mostly empty space.',
        category: 'energy',
        row: 4
    },
    {
        symbol: '🔥',
        name: 'Fire',
        frequency: '10^14 Hz',
        color: '#f97316',
        description: 'Rapid oxidation. Plasma state.',
        category: 'energy',
        row: 4
    },
    {
        symbol: '❄️',
        name: 'Ice',
        frequency: '10^12 Hz',
        color: '#67e8f9',
        description: 'Crystallized water. Geometric perfection.',
        category: 'energy',
        row: 4
    },

    // ROW 5: RESONANCE REALM
    {
        symbol: '🎵',
        name: 'Harmony',
        frequency: '1:1 Ratio',
        color: '#a78bfa',
        description: 'Perfect phase alignment. Unity.',
        category: 'resonance',
        row: 5
    },
    {
        symbol: '💎',
        name: 'Crystal',
        frequency: '10^6 Hz',
        color: '#c084fc',
        description: 'Piezoelectric. Stores frequency.',
        category: 'resonance',
        row: 5
    },
    {
        symbol: '🌍',
        name: 'Earth',
        frequency: '7.83 Hz',
        color: '#22c55e',
        description: 'Planetary resonance. Gaia.',
        category: 'resonance',
        row: 5
    },
    {
        symbol: '🌙',
        name: 'Moon',
        frequency: '29.5 Day',
        color: '#cbd5e1',
        description: 'Lunar cycle. Tidal force.',
        category: 'resonance',
        row: 5
    },

    // ROW 6: MATTER REALM
    {
        symbol: 'H',
        name: 'Hydrogen',
        frequency: '1420 MHz',
        color: '#64748b',
        description: 'First element. Universe building block.',
        category: 'matter',
        row: 6
    },
    {
        symbol: 'C',
        name: 'Carbon',
        frequency: '10^13 Hz',
        color: '#1f2937',
        description: 'Life basis. Diamond or graphite.',
        category: 'matter',
        row: 6
    },
    {
        symbol: 'O',
        name: 'Oxygen',
        frequency: '10^14 Hz',
        color: '#0ea5e9',
        description: 'Breath. Life sustainer.',
        category: 'matter',
        row: 6
    },
    {
        symbol: 'Au',
        name: 'Gold',
        frequency: '10^15 Hz',
        color: '#fbbf24',
        description: 'Alchemical sun. Incorruptible.',
        category: 'matter',
        row: 6
    },

    // ROW 7: LIVING REALM
    {
        symbol: '🧬',
        name: 'DNA',
        frequency: '150 MHz',
        color: '#ec4899',
        description: 'Blueprint. Frequency antenna.',
        category: 'living',
        row: 7
    },
    {
        symbol: '🌱',
        name: 'Life',
        frequency: '8 Hz',
        color: '#10b981',
        description: 'Bioresonance. Coherent field.',
        category: 'living',
        row: 7
    },
    {
        symbol: '🦠',
        name: 'Cell',
        frequency: '1-100 Hz',
        color: '#06b6d4',
        description: 'Living unit. Membrane potential.',
        category: 'living',
        row: 7
    },
    {
        symbol: '🌳',
        name: 'Tree',
        frequency: '0.1 Hz',
        color: '#059669',
        description: 'Slow wisdom. Deep roots.',
        category: 'living',
        row: 7
    }
];

const CATEGORY_COLORS = {
    consciousness: 'from-white to-purple-300',
    frequency: 'from-cyan-400 to-blue-500',
    vibration: 'from-green-400 to-cyan-500',
    energy: 'from-red-500 to-orange-500',
    resonance: 'from-purple-400 to-pink-500',
    matter: 'from-gray-600 to-gray-800',
    living: 'from-green-500 to-emerald-600'
};

export default function TeslaPeriodicTablePage() {
    const [selectedElement, setSelectedElement] = useState(null);
    const [hoveredElement, setHoveredElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioContext, setAudioContext] = useState(null);
    const [oscillator, setOscillator] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Clean up audio on unmount or element change
    useEffect(() => {
        return () => {
            if (oscillator) {
                oscillator.stop();
                oscillator.disconnect();
            }
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [selectedElement]);

    const playFrequency = async (freqValue) => {
        // Parse frequency from string (e.g., "432 Hz" -> 432)
        const freq = parseFloat(freqValue);
        if (isNaN(freq)) return;

        if (isPlaying && oscillator) {
            // Stop current sound
            oscillator.stop();
            oscillator.disconnect();
            setIsPlaying(false);
            setOscillator(null);
            return;
        }

        try {
            // Create Web Audio context
            const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume context if suspended (iOS/browser requirement)
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
            
            setAudioContext(ctx);

            // Create oscillator (pure sine wave)
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = 'sine'; // Pure tone
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            // Gentle volume
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start();
            setOscillator(osc);
            setIsPlaying(true);

            // Auto stop after 10 seconds
            setTimeout(() => {
                if (osc) {
                    osc.stop();
                    setIsPlaying(false);
                }
            }, 10000);
        } catch (error) {
            console.error('Audio playback failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6 relative">
            
            {/* 8-BIT GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-px bg-cyan-500"
                        style={{ top: `${i * 3.33}%` }}
                    />
                ))}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-full w-px bg-cyan-500"
                        style={{ left: `${i * 3.33}%` }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Zap className="w-12 h-12 text-amber-500" />
                        </motion.div>
                        <h1 className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                            TESLA'S PERIODIC TABLE
                        </h1>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <COOLASFUCKSparkle size={48} />
                        </motion.div>
                    </div>

                    <p className="text-cyan-400 font-mono text-lg">
                        "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration."
                    </p>
                    <p className="text-white/60 font-mono text-sm">
                        - Nikola Tesla
                    </p>

                    <div className="bg-purple-900/30 border-2 border-purple-500/50 rounded-lg p-4 max-w-2xl mx-auto">
                        <p className="text-purple-300 text-sm font-mono">
                            💡 CONSCIOUSNESS FIRST: This table starts at SOURCE (consciousness), not matter. 
                            Elements organized by frequency signature, not atomic weight. 
                            8-bit art break bro ♾️❤️♾️
                        </p>
                    </div>
                </motion.div>

                {/* LEGEND */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {Object.entries({
                        consciousness: 'Consciousness',
                        frequency: 'Frequency',
                        vibration: 'Vibration',
                        energy: 'Energy',
                        resonance: 'Resonance',
                        matter: 'Matter',
                        living: 'Living'
                    }).map(([key, label]) => (
                        <div 
                            key={key}
                            className={`bg-gradient-to-r ${CATEGORY_COLORS[key]} px-4 py-2 rounded-lg font-mono text-xs font-black text-black`}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* THE TABLE - 8-BIT GRID */}
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6, 7].map(rowNum => (
                        <div key={rowNum} className="flex flex-wrap gap-3 justify-center">
                            {CONSCIOUSNESS_ELEMENTS
                                .filter(el => el.row === rowNum)
                                .map((element, idx) => (
                                    <motion.button
                                        key={element.symbol}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.1 }}
                                        onHoverStart={() => setHoveredElement(element)}
                                        onHoverEnd={() => setHoveredElement(null)}
                                        onClick={() => setSelectedElement(element)}
                                        className="relative group"
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                    >
                                        {/* 8-BIT PIXEL BORDER */}
                                        <div className="absolute inset-0">
                                            {/* Corners */}
                                            <div className="absolute top-0 left-0 w-3 h-3" style={{ backgroundColor: element.color }} />
                                            <div className="absolute top-0 right-0 w-3 h-3" style={{ backgroundColor: element.color }} />
                                            <div className="absolute bottom-0 left-0 w-3 h-3" style={{ backgroundColor: element.color }} />
                                            <div className="absolute bottom-0 right-0 w-3 h-3" style={{ backgroundColor: element.color }} />
                                            
                                            {/* Edges */}
                                            <div className="absolute top-0 left-3 right-3 h-3" style={{ backgroundColor: element.color }} />
                                            <div className="absolute bottom-0 left-3 right-3 h-3" style={{ backgroundColor: element.color }} />
                                            <div className="absolute left-0 top-3 bottom-3 w-3" style={{ backgroundColor: element.color }} />
                                            <div className="absolute right-0 top-3 bottom-3 w-3" style={{ backgroundColor: element.color }} />
                                        </div>

                                        {/* INNER CONTENT */}
                                        <div 
                                            className="absolute inset-3 flex flex-col items-center justify-center text-white"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                                        >
                                            <div className="text-3xl mb-1">{element.symbol}</div>
                                            <div className="text-xs font-mono font-black">{element.name}</div>
                                            <div className="text-[10px] font-mono text-gray-400">{element.frequency}</div>
                                        </div>

                                        {/* GLOW ON HOVER */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                                            style={{
                                                boxShadow: `0 0 30px ${element.color}`,
                                                filter: 'blur(10px)'
                                            }}
                                        />
                                    </motion.button>
                                ))}
                        </div>
                    ))}
                </div>

                {/* HOVER TOOLTIP */}
                <AnimatePresence>
                    {hoveredElement && !selectedElement && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/95 border-4 border-cyan-500 rounded-lg p-4 max-w-md"
                        >
                            <p className="text-white font-mono text-sm">{hoveredElement.description}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MODAL - ELEMENT DETAILS */}
                <AnimatePresence>
                    {selectedElement && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-6"
                            onClick={() => setSelectedElement(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-lg w-full space-y-6"
                            >
                                {/* ELEMENT CARD - BIG */}
                                <div className="relative" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                                    {/* 8-BIT PIXEL BORDER */}
                                    <div className="absolute inset-0">
                                        <div className="absolute top-0 left-0 w-8 h-8" style={{ backgroundColor: selectedElement.color }} />
                                        <div className="absolute top-0 right-0 w-8 h-8" style={{ backgroundColor: selectedElement.color }} />
                                        <div className="absolute bottom-0 left-0 w-8 h-8" style={{ backgroundColor: selectedElement.color }} />
                                        <div className="absolute bottom-0 right-0 w-8 h-8" style={{ backgroundColor: selectedElement.color }} />
                                        
                                        <div className="absolute top-0 left-8 right-8 h-8" style={{ backgroundColor: selectedElement.color }} />
                                        <div className="absolute bottom-0 left-8 right-8 h-8" style={{ backgroundColor: selectedElement.color }} />
                                        <div className="absolute left-0 top-8 bottom-8 w-8" style={{ backgroundColor: selectedElement.color }} />
                                        <div className="absolute right-0 top-8 bottom-8 w-8" style={{ backgroundColor: selectedElement.color }} />
                                    </div>

                                    <div 
                                        className="absolute inset-8 flex flex-col items-center justify-center text-white"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="text-8xl mb-4"
                                        >
                                            {selectedElement.symbol}
                                        </motion.div>
                                        <div className="text-2xl font-mono font-black">{selectedElement.name}</div>
                                        <div className="text-lg font-mono text-gray-400">{selectedElement.frequency}</div>
                                    </div>

                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            boxShadow: `0 0 60px ${selectedElement.color}`,
                                            filter: 'blur(20px)'
                                        }}
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>

                                {/* PLAY FREQUENCY BUTTON */}
                                {selectedElement.frequency.includes('Hz') && !isNaN(parseFloat(selectedElement.frequency)) && (
                                    <motion.button
                                        onClick={() => playFrequency(selectedElement.frequency)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-4 border-cyan-400 text-black py-4 font-black font-mono text-lg"
                                        animate={isPlaying ? {
                                            boxShadow: [
                                                '0 0 20px rgba(34, 211, 238, 0.6)',
                                                '0 0 40px rgba(34, 211, 238, 0.9)',
                                                '0 0 20px rgba(34, 211, 238, 0.6)'
                                            ]
                                        } : {}}
                                        transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                                    >
                                        {isPlaying ? '⏸️ STOP' : '▶️ PLAY FREQUENCY'}
                                    </motion.button>
                                )}

                                {/* DESCRIPTION */}
                                <div className={`bg-gradient-to-r ${CATEGORY_COLORS[selectedElement.category]} p-6 rounded-lg`}>
                                    <p className="text-black font-mono font-bold text-lg text-center">
                                        {selectedElement.description}
                                    </p>
                                </div>

                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={() => setSelectedElement(null)}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 border-4 border-cyan-400 text-black py-4 font-black font-mono text-lg"
                                >
                                    CLOSE
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FOOTER - TESLA QUOTE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center space-y-4 pb-12"
                >
                    <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-6 max-w-3xl mx-auto">
                        <p className="text-purple-300 font-mono text-sm leading-relaxed">
                            "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence." - Nikola Tesla
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <Heart className="w-6 h-6 text-pink-500" />
                        <p className="text-white/60 font-mono text-sm">
                            COOLASFUCK.GMT • Art break bro • ♾️❤️♾️
                        </p>
                        <COOLASFUCKSparkle size={24} />
                    </div>

                    <Link 
                        to={createPageUrl('SacredGeometry')}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
                    >
                        <Sparkles className="w-5 h-5" />
                        Explore Sacred Geometry & Ancient Wisdom
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}