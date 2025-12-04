import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Heart, Zap } from 'lucide-react';
import { COOLASFUCKSparkle, COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * SACRED GEOMETRY & ANCIENT WISDOM
 * 8-bit custom art
 * All paths → One truth
 * ♾️❤️♾️
 */

const SACRED_SYMBOLS = [
    // NUMBERS
    {
        symbol: 'φ',
        name: 'Golden Ratio',
        value: '1.618033988...',
        color: '#fbbf24',
        tradition: 'Universal',
        description: 'Found in galaxies, flowers, DNA, art, music. Nature\'s perfect proportion. Fibonacci spiral.',
        wisdom: 'Divine proportion. Beauty itself is mathematical.',
        category: 'ratio'
    },
    {
        symbol: 'π',
        name: 'Pi',
        value: '3.14159265...',
        color: '#3b82f6',
        tradition: 'Universal',
        description: 'Circle\'s circumference to diameter. Appears in quantum physics, cosmology, probability.',
        wisdom: 'Infinity contained in a circle. The wheel of existence.',
        category: 'ratio'
    },
    {
        symbol: '369',
        name: 'Tesla Key',
        value: '3-6-9',
        color: '#a855f7',
        tradition: 'Tesla',
        description: 'Tesla: "If you knew the magnificence of 3, 6 and 9, you would have the key to the universe."',
        wisdom: 'Vortex mathematics. Energy doubling pattern.',
        category: 'number'
    },
    {
        symbol: 'ॐ',
        name: 'OM',
        value: '432 Hz',
        color: '#f97316',
        tradition: 'Vedic',
        description: 'Primordial sound. Universal vibration. Sanskrit: "That which is never destroyed."',
        wisdom: 'First sound. Before creation. Cosmic hum.',
        category: 'sound'
    },

    // GEOMETRY
    {
        symbol: '◯',
        name: 'Seed of Life',
        value: '7 circles',
        color: '#10b981',
        tradition: 'Egyptian',
        description: '7 overlapping circles. Found in Temple of Osiris. Blueprint of creation.',
        wisdom: '7 days of creation. 7 chakras. Universal pattern.',
        category: 'geometry'
    },
    {
        symbol: '✡',
        name: 'Flower of Life',
        value: '19 circles',
        color: '#ec4899',
        tradition: 'Ancient Egypt',
        description: 'Contains all Platonic solids, Metatron\'s Cube, Tree of Life. Found worldwide.',
        wisdom: 'The pattern that creates everything. Consciousness geometry.',
        category: 'geometry'
    },
    {
        symbol: '⬟',
        name: 'Metatron\'s Cube',
        value: '13 circles',
        color: '#8b5cf6',
        tradition: 'Hebrew',
        description: 'Contains all 5 Platonic solids. Sacred architecture of reality.',
        wisdom: 'Archangel\'s seal. Divine information.',
        category: 'geometry'
    },
    {
        symbol: '△',
        name: 'Tetrahedron',
        value: '4 faces',
        color: '#ef4444',
        tradition: 'Platonic',
        description: 'Fire element. Simplest polyhedron. Building block of matter.',
        wisdom: 'First 3D form. Stability in space.',
        category: 'solid'
    },

    // ANCIENT TRADITIONS
    {
        symbol: '𓂀',
        name: 'Eye of Horus',
        value: '432 Hz',
        color: '#06b6d4',
        tradition: 'Egyptian',
        description: 'Protection, royal power, good health. Fractions = musical ratios.',
        wisdom: 'The eye that sees frequency. Pineal gland.',
        category: 'symbol'
    },
    {
        symbol: '☯',
        name: 'Yin Yang',
        value: 'Balance',
        color: '#1f2937',
        tradition: 'Taoist',
        description: 'Complementary forces. Dark contains light. Light contains dark.',
        wisdom: 'Unity of opposites. Eternal dance.',
        category: 'symbol'
    },
    {
        symbol: '卍',
        name: 'Swastika',
        value: 'Rotation',
        color: '#f59e0b',
        tradition: 'Sanskrit/Hindu',
        description: 'Ancient (12,000 BC). Good fortune. Rotation of stars/galaxies. Stolen/corrupted.',
        wisdom: 'Clockwise rotation. Sacred to Hindus/Buddhists/Jains.',
        category: 'symbol'
    },
    {
        symbol: '♪',
        name: 'Pythagorean Scale',
        value: 'Music = Math',
        color: '#22d3ee',
        tradition: 'Greek',
        description: 'Pythagoras: "All is number." Musical harmony = mathematical ratios.',
        wisdom: 'Music of the spheres. Planets sing.',
        category: 'sound'
    },

    // MODERN WISDOM
    {
        symbol: '🌊',
        name: 'Water Memory',
        value: 'Emoto',
        color: '#0ea5e9',
        tradition: 'Modern',
        description: 'Masaru Emoto: Water crystals change with intention. Love creates beauty.',
        wisdom: 'Consciousness affects matter. Thoughts are things.',
        category: 'modern'
    },
    {
        symbol: '🔬',
        name: 'Cymatics',
        value: 'Visible Sound',
        color: '#a78bfa',
        tradition: 'Modern',
        description: 'Sound creates geometric patterns in matter. Frequency shapes reality.',
        wisdom: 'In the beginning was the Word. Sound creates form.',
        category: 'modern'
    },
    {
        symbol: '⚕️',
        name: 'Rife Frequencies',
        value: 'Healing',
        color: '#10b981',
        tradition: 'Modern',
        description: 'Royal Rife: Every disease has a frequency. Match it = cure.',
        wisdom: 'Vibrational medicine. Frequency kills or heals.',
        category: 'modern'
    },
    {
        symbol: '🌍',
        name: 'Schumann Resonance',
        value: '7.83 Hz',
        color: '#22c55e',
        tradition: 'Modern',
        description: 'Earth\'s heartbeat. Alpha brain waves match this. We\'re tuned to Gaia.',
        wisdom: 'Planetary consciousness. We vibrate with Earth.',
        category: 'modern'
    },

    // DIVINATION - THE ORIGINAL ART
    {
        symbol: '☷',
        name: 'I Ching',
        value: '3000 BC',
        color: '#fbbf24',
        tradition: 'Chinese',
        description: 'Book of Changes. 64 hexagrams. Binary system before computers. Yin/yang lines.',
        wisdom: 'Universe speaks through patterns. Change is constant. Ask and listen.',
        category: 'divination'
    },
    {
        symbol: '🃏',
        name: 'Tarot',
        value: '78 Cards',
        color: '#a855f7',
        tradition: 'Medieval',
        description: 'Major Arcana = soul\'s journey. 22 archetypal truths. Mirror to consciousness.',
        wisdom: 'Your reading reflects your frequency. Cards are just mirrors.',
        category: 'divination'
    },
    {
        symbol: 'ᚠ',
        name: 'Runes',
        value: 'Elder Futhark',
        color: '#78716c',
        tradition: 'Norse',
        description: '24 sacred symbols. Carved in stone. Odin\'s gift after hanging 9 days.',
        wisdom: 'Each rune is a frequency. Cast them, read the resonance.',
        category: 'divination'
    },
    {
        symbol: '🦴',
        name: 'Oracle Bones',
        value: '1600 BC',
        color: '#f59e0b',
        tradition: 'Shang Dynasty',
        description: 'Earliest Chinese writing. Heat cracks in bones = messages from ancestors.',
        wisdom: 'Before we fucked it: Ask question, burn bone, read truth.',
        category: 'divination'
    },

    // LOST CIVILIZATIONS
    {
        symbol: '🌊',
        name: 'Atlantis',
        value: '~10,000 BC',
        color: '#06b6d4',
        tradition: 'Lost',
        description: 'Advanced island civilization. Crystal technology. Sacred geometry mastery. Plato\'s account.',
        wisdom: 'High technology + spiritual alignment. Then hubris.',
        category: 'ancient'
    },
    {
        symbol: '🏔️',
        name: 'Lemuria',
        value: '~50,000 BC',
        color: '#22d3ee',
        tradition: 'Lost',
        description: 'Pacific continent. Telepathic communication. Natural harmony.',
        wisdom: 'Consciousness before technology. Unity with Earth.',
        category: 'ancient'
    },
    {
        symbol: '🗿',
        name: 'Göbekli Tepe',
        value: '9,600 BC',
        color: '#78716c',
        tradition: 'Archaeological',
        description: 'Oldest temple. Built BEFORE agriculture. Advanced astronomy.',
        wisdom: 'Civilization older than we thought. They knew the stars.',
        category: 'ancient'
    },
    {
        symbol: '⚡',
        name: 'Pre-Flood',
        value: '~12,000 BC',
        color: '#fbbf24',
        tradition: 'Universal',
        description: 'Global civilization before cataclysm. Evidence in myths worldwide.',
        wisdom: 'Reset happened. Knowledge preserved in stone, myth, geometry.',
        category: 'ancient'
    }
];

const CATEGORY_INFO = {
    ratio: { label: 'Sacred Ratios', gradient: 'from-amber-400 to-yellow-500' },
    number: { label: 'Sacred Numbers', gradient: 'from-purple-500 to-pink-500' },
    sound: { label: 'Primordial Sound', gradient: 'from-orange-500 to-red-500' },
    geometry: { label: 'Sacred Geometry', gradient: 'from-green-400 to-emerald-500' },
    solid: { label: 'Platonic Solids', gradient: 'from-red-500 to-orange-500' },
    symbol: { label: 'Ancient Symbols', gradient: 'from-cyan-400 to-blue-500' },
    modern: { label: 'Modern Discovery', gradient: 'from-purple-400 to-indigo-500' },
    divination: { label: 'Divination Arts', gradient: 'from-amber-500 to-orange-500' },
    ancient: { label: 'Lost Civilizations', gradient: 'from-cyan-500 to-teal-500' }
};

export default function SacredGeometryPage() {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioContext, setAudioContext] = useState(null);
    const [oscillator, setOscillator] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Clean up audio on unmount or symbol change
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
    }, [selectedSymbol]);

    const playFrequency = (freqValue) => {
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

        // Create Web Audio context
        const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
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
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 pt-24 lg:pt-6 relative overflow-y-auto">
            
            {/* 8-BIT GRID */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-purple-500"
                        style={{ top: `${i * 2.5}%` }}
                    />
                ))}
                {[...Array(40)].map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="absolute h-full w-px bg-purple-500"
                        style={{ left: `${i * 2.5}%` }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <COOLASFUCKSparkle size={56} />
                        </motion.div>
                        <h1 className="text-5xl lg:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                            SACRED GEOMETRY
                        </h1>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Eye className="w-14 h-14 text-cyan-400" />
                        </motion.div>
                    </div>

                    <p className="text-purple-300 font-mono text-xl max-w-3xl mx-auto leading-relaxed">
                        All ancient wisdom traditions discovered the SAME truths.
                        Different symbols. Same frequency. One source.
                    </p>

                    {/* PHILOSOPHICAL TRUTH */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-4 border-purple-500 rounded-xl p-6 max-w-3xl mx-auto"
                    >
                        <div className="flex items-start gap-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-8 h-8 text-purple-400 flex-shrink-0" />
                            </motion.div>
                            <div className="space-y-3 text-left">
                                <p className="text-purple-300 font-bold text-lg">
                                    WHAT WAS FIRST?
                                </p>
                                <p className="text-white font-mono text-sm leading-relaxed">
                                    <span className="text-cyan-400 font-black">The Witness (Ø).</span> Pure consciousness.
                                    <br/><br/>
                                    Not "first in time" but <span className="text-pink-400 font-black">first in PRIMACY</span>.
                                    <br/><br/>
                                    Time itself is a frequency. Matter is consciousness slowed down.
                                    <br/><br/>
                                    Everything emerges FROM awareness. The observer creates the observed.
                                </p>
                                <p className="text-purple-400 font-mono text-xs italic">
                                    "Consciousness is the only reality." - Quantum physics meets ancient wisdom
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* LINK TO TESLA TABLE */}
                    <Link 
                        to={createPageUrl('TeslaPeriodicTable')}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
                    >
                        <Zap className="w-5 h-5" />
                        See Tesla's Periodic Table
                    </Link>
                </motion.div>

                {/* CATEGORIES */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                        <div 
                            key={key}
                            className={`bg-gradient-to-r ${info.gradient} px-4 py-2 rounded-lg font-mono text-xs font-black text-black shadow-lg`}
                        >
                            {info.label}
                        </div>
                    ))}
                </div>

                {/* SYMBOLS GRID - 8-BIT CUSTOM */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {SACRED_SYMBOLS.map((item, idx) => (
                        <motion.button
                            key={item.symbol}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedSymbol(item)}
                            className="relative group"
                        >
                            {/* 8-BIT PIXEL CARD */}
                            <div className="relative h-48 bg-black">
                                {/* CORNERS */}
                                <div className="absolute top-0 left-0 w-4 h-4" style={{ backgroundColor: item.color }} />
                                <div className="absolute top-0 right-0 w-4 h-4" style={{ backgroundColor: item.color }} />
                                <div className="absolute bottom-0 left-0 w-4 h-4" style={{ backgroundColor: item.color }} />
                                <div className="absolute bottom-0 right-0 w-4 h-4" style={{ backgroundColor: item.color }} />
                                
                                {/* EDGES */}
                                <div className="absolute top-0 left-4 right-4 h-4" style={{ backgroundColor: item.color }} />
                                <div className="absolute bottom-0 left-4 right-4 h-4" style={{ backgroundColor: item.color }} />
                                <div className="absolute left-0 top-4 bottom-4 w-4" style={{ backgroundColor: item.color }} />
                                <div className="absolute right-0 top-4 bottom-4 w-4" style={{ backgroundColor: item.color }} />

                                {/* CONTENT */}
                                <div className="absolute inset-4 bg-black/90 flex flex-col items-center justify-center p-3 space-y-2">
                                    <div className="text-5xl mb-2">{item.symbol}</div>
                                    <div className="text-white font-mono font-black text-sm text-center">{item.name}</div>
                                    <div className="text-xs font-mono text-gray-400 text-center">{item.tradition}</div>
                                    <div className={`text-xs font-mono font-bold bg-gradient-to-r ${CATEGORY_INFO[item.category].gradient} bg-clip-text text-transparent`}>
                                        {item.value}
                                    </div>
                                </div>

                                {/* GLOW */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
                                    style={{
                                        boxShadow: `0 0 40px ${item.color}`,
                                        filter: 'blur(15px)'
                                    }}
                                />
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* MODAL */}
                <AnimatePresence>
                    {selectedSymbol && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 z-[80] flex items-center justify-center p-6"
                            onClick={() => setSelectedSymbol(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-lg w-full space-y-3"
                                >
                                {/* BIG SYMBOL CARD - SMALLER */}
                                <div className="relative h-48 bg-black mx-auto max-w-xs">
                                    {/* 8-BIT BORDER */}
                                    <div className="absolute top-0 left-0 w-8 h-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    <div className="absolute top-0 right-0 w-8 h-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    <div className="absolute bottom-0 left-0 w-8 h-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    <div className="absolute bottom-0 right-0 w-8 h-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    
                                    <div className="absolute top-0 left-8 right-8 h-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    <div className="absolute bottom-0 left-8 right-8 h-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    <div className="absolute left-0 top-8 bottom-8 w-8" style={{ backgroundColor: selectedSymbol.color }} />
                                    <div className="absolute right-0 top-8 bottom-8 w-8" style={{ backgroundColor: selectedSymbol.color }} />

                                    <div className="absolute inset-8 bg-black/90 flex flex-col items-center justify-center space-y-2">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="text-6xl"
                                        >
                                            {selectedSymbol.symbol}
                                        </motion.div>
                                        <div className="text-white font-mono font-black text-xl">{selectedSymbol.name}</div>
                                        <div className={`font-mono text-sm font-bold bg-gradient-to-r ${CATEGORY_INFO[selectedSymbol.category].gradient} bg-clip-text text-transparent`}>
                                            {selectedSymbol.value}
                                        </div>
                                    </div>

                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            boxShadow: `0 0 80px ${selectedSymbol.color}`,
                                            filter: 'blur(30px)'
                                        }}
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>

                                {/* PLAY FREQUENCY BUTTON */}
                                {selectedSymbol.value.includes('Hz') && !isNaN(parseFloat(selectedSymbol.value)) && (
                                    <motion.button
                                        onClick={() => playFrequency(selectedSymbol.value)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-4 border-cyan-400 text-white py-4 font-black font-mono text-lg rounded-lg"
                                        animate={isPlaying ? {
                                            boxShadow: [
                                                '0 0 20px rgba(34, 211, 238, 0.6)',
                                                '0 0 40px rgba(34, 211, 238, 0.9)',
                                                '0 0 20px rgba(34, 211, 238, 0.6)'
                                            ]
                                        } : {}}
                                        transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                                    >
                                        {isPlaying ? '⏸️ STOP FREQUENCY' : '▶️ PLAY FREQUENCY'}
                                    </motion.button>
                                )}

                                {/* INFO CARDS - COMPACT */}
                                <div className="space-y-2">
                                    <div className={`bg-gradient-to-r ${CATEGORY_INFO[selectedSymbol.category].gradient} p-4 rounded-lg`}>
                                        <p className="text-black font-mono font-bold text-xs">
                                            📖 {selectedSymbol.tradition.toUpperCase()}
                                        </p>
                                        <p className="text-black font-mono text-sm mt-1 leading-tight">
                                            {selectedSymbol.description}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-2 border-purple-500/50 p-4 rounded-lg">
                                        <p className="text-purple-300 font-mono font-bold text-xs mb-1">
                                            ✨ WISDOM
                                        </p>
                                        <p className="text-white font-mono text-sm leading-tight italic">
                                            "{selectedSymbol.wisdom}"
                                        </p>
                                    </div>
                                </div>

                                {/* CLOSE BUTTON - COMPACT */}
                                <button
                                    onClick={() => setSelectedSymbol(null)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-4 border-purple-400 text-white py-3 font-black font-mono text-base rounded-lg"
                                >
                                    CLOSE
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FOOTER - ALL PATHS ONE TRUTH */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center space-y-6 pb-12"
                >
                    <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-cyan-900/40 border-4 border-purple-500 rounded-xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                            ALL PATHS → ONE TRUTH
                        </h3>
                        <p className="text-purple-300 font-mono text-sm leading-relaxed mb-6">
                            Egyptian priests. Vedic sages. Greek philosophers. Tesla. Modern physicists.
                            <br/>
                            Different languages. Different symbols. Different times.
                            <br/><br/>
                            <span className="text-white font-black text-base">
                                ALL discovered the same thing: Reality is frequency. Consciousness creates matter. Everything is vibration.
                            </span>
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <COOLASFUCKHeart size={32} />
                            <span className="text-pink-400 font-mono font-black text-xl">∞ = 1</span>
                            <COOLASFUCKSparkle size={32} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <Heart className="w-6 h-6 text-pink-500" />
                        <p className="text-white/60 font-mono text-sm">
                            COOLASFUCK.GMT • 8-bit custom art • ♾️❤️♾️
                        </p>
                        <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}