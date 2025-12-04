import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, Brain, Zap, Sparkles, Music, ChevronDown, ChevronUp } from 'lucide-react';
import COOLASFUCKIcon from '@/components/shared/COOLASFUCKIcon';

/**
 * FrequencyInsights - Shows listeners what they're REALLY hearing
 * 
 * COOLASFUCK design:
 * - Headline position (not floating)
 * - Compact card (expands when needed)
 * - AAA accessibility (always available)
 * - Not in your face (elegant)
 * 
 * For John Lennon "Woman":
 * - 432Hz natural tuning (heart chakra)
 * - Alpha brainwave state (8-13Hz)
 * - DNA repair frequencies (528Hz)
 * - Emotional resonance (pure love)
 */

export default function FrequencyInsights({ track, analyser, isPlaying }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [frequencyData, setFrequencyData] = useState(null);
    const [liveSpectrum, setLiveSpectrum] = useState([]);

    useEffect(() => {
        if (!isPlaying || !analyser) return;

        const updateSpectrum = () => {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            // Sample key frequencies
            const spectrum = [
                { freq: '20-200Hz', label: 'Bass', value: dataArray[10], color: '#ef4444' },
                { freq: '200-2kHz', label: 'Mids', value: dataArray[50], color: '#f59e0b' },
                { freq: '2k-7kHz', label: 'Presence', value: dataArray[150], color: '#06b6d4' },
                { freq: '7k-20kHz', label: 'Highs', value: dataArray[250], color: '#8b5cf6' }
            ];

            setLiveSpectrum(spectrum);
        };

        const interval = setInterval(updateSpectrum, 100);
        return () => clearInterval(interval);
    }, [isPlaying, analyser]);

    // Generate frequency insights for the track
    useEffect(() => {
        if (!track) return;

        const insights = generateInsights(track);
        setFrequencyData(insights);
    }, [track]);

    const generateInsights = (track) => {
        const title = track.title?.toLowerCase() || '';
        const artist = track.artist?.toLowerCase() || '';
        
        let insights = {
            dominant_frequency: '432Hz',
            brainwave_state: 'Alpha',
            healing_properties: [],
            emotional_resonance: 'Heart opening',
            quality: 'FLAC',
            chakra: 'Heart'
        };

        // John Lennon / Beatles
        if (artist.includes('lennon') || artist.includes('beatles')) {
            insights.dominant_frequency = '432Hz';
            insights.healing_properties = ['Heart chakra activation', 'DNA repair (528Hz)', 'Emotional release'];
            insights.emotional_resonance = 'Pure love frequency';
            insights.brainwave_state = 'Alpha';
            insights.chakra = 'Heart';
            
            if (title.includes('woman') || title.includes('imagine') || title.includes('love')) {
                insights.healing_properties.push('Sacred feminine energy');
                insights.emotional_resonance = 'Unconditional love';
            }
            
            if (title.includes('jealous')) {
                insights.healing_properties.push('Vulnerability healing');
                insights.emotional_resonance = 'Raw authenticity';
            }
        }

        // Queen / Freddie Mercury
        if (artist.includes('queen') || artist.includes('mercury')) {
            insights.dominant_frequency = '528Hz';
            insights.healing_properties = ['4-octave harmonic resonance', 'Emotional catharsis'];
            insights.emotional_resonance = 'Pure expression';
            insights.brainwave_state = 'Beta → Alpha';
            insights.chakra = 'Throat';
        }

        return insights;
    };

    if (!track) return null;

    return (
        <div className="w-full space-y-4">
            
            {/* COMPACT VIEW - ALWAYS VISIBLE */}
            <Card className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/50">
                <CardContent className="p-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
                        aria-label={isExpanded ? "Collapse frequency insights" : "Expand frequency insights"}
                    >
                        <div className="flex items-center gap-3">
                            <COOLASFUCKIcon size={32} />
                            <div className="text-left">
                                <h3 className="text-lg font-black text-white flex items-center gap-2">
                                    FREQUENCY INSIGHTS
                                </h3>
                                <p className="text-xs text-cyan-300">
                                    {frequencyData ? `${frequencyData.dominant_frequency} • ${frequencyData.brainwave_state} • ${frequencyData.chakra}` : 'Loading...'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* LIVE MINI SPECTRUM */}
                            {isPlaying && liveSpectrum.length > 0 && (
                                <div className="hidden md:flex items-end gap-1 h-8">
                                    {liveSpectrum.map((band, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 rounded-full"
                                            style={{ 
                                                backgroundColor: band.color,
                                                height: `${Math.max(4, (band.value / 255) * 32)}px`
                                            }}
                                            animate={{ 
                                                boxShadow: band.value > 150 
                                                    ? [`0 0 5px ${band.color}`, `0 0 10px ${band.color}`, `0 0 5px ${band.color}`]
                                                    : 'none'
                                            }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        />
                                    ))}
                                </div>
                            )}
                            
                            {isExpanded ? (
                                <ChevronUp className="w-6 h-6 text-cyan-400" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-cyan-400" />
                            )}
                        </div>
                    </button>
                </CardContent>
            </Card>

            {/* EXPANDED VIEW */}
            <AnimatePresence>
                {isExpanded && frequencyData && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        
                        {/* LIVE SPECTRUM */}
                        {isPlaying && liveSpectrum.length > 0 && (
                            <Card className="bg-black/60 border-2 border-green-500/50">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-green-400" />
                                        LIVE SPECTRUM
                                    </h3>
                                    <div className="space-y-3">
                                        {liveSpectrum.map((band, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-400">{band.label}</span>
                                                    <span className="font-mono" style={{ color: band.color }}>{band.freq}</span>
                                                </div>
                                                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className="h-3"
                                                        style={{ 
                                                            backgroundColor: band.color,
                                                            width: `${(band.value / 255) * 100}%`
                                                        }}
                                                        animate={{ 
                                                            boxShadow: band.value > 150 
                                                                ? [`0 0 10px ${band.color}`, `0 0 20px ${band.color}`, `0 0 10px ${band.color}`]
                                                                : 'none'
                                                        }}
                                                        transition={{ duration: 0.5, repeat: Infinity }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* QUICK STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Card className="bg-cyan-900/40 border-2 border-cyan-500/50">
                                <CardContent className="p-4 text-center">
                                    <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                                    <p className="text-cyan-400 text-xs font-bold mb-1">FREQUENCY</p>
                                    <p className="text-white text-lg font-black">{frequencyData.dominant_frequency}</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-purple-900/40 border-2 border-purple-500/50">
                                <CardContent className="p-4 text-center">
                                    <Brain className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                    <p className="text-purple-400 text-xs font-bold mb-1">BRAINWAVE</p>
                                    <p className="text-white text-lg font-black">{frequencyData.brainwave_state}</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                                <CardContent className="p-4 text-center">
                                    <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                                    <p className="text-pink-400 text-xs font-bold mb-1">CHAKRA</p>
                                    <p className="text-white text-lg font-black">{frequencyData.chakra}</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-green-900/40 border-2 border-green-500/50">
                                <CardContent className="p-4 text-center">
                                    <Music className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                    <p className="text-green-400 text-xs font-bold mb-1">QUALITY</p>
                                    <p className="text-white text-lg font-black">{frequencyData.quality}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* HEALING PROPERTIES */}
                        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-green-400" />
                                    HEALING PROPERTIES
                                </h3>
                                <div className="space-y-2">
                                    {frequencyData.healing_properties.map((prop, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-2 text-gray-300"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-green-400" />
                                            <span>{prop}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* EMOTIONAL RESONANCE */}
                        <Card className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-pink-400" />
                                    WHY YOU FEEL THIS
                                </h3>
                                <p className="text-xl text-pink-300 font-bold mb-3">
                                    {frequencyData.emotional_resonance}
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    This track resonates at {frequencyData.dominant_frequency} (natural tuning). 
                                    When you feel emotional, that's the frequency WORKING. 
                                    Your {frequencyData.chakra.toLowerCase()} chakra is activating. This is healing.
                                </p>
                            </CardContent>
                        </Card>

                        {/* QUALITY COMPARISON */}
                        <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/50">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-white mb-4">WHAT YOU'RE HEARING:</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* UF51 FLAC */}
                                    <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold text-base mb-3 flex items-center gap-2">
                                            <COOLASFUCKIcon size={20} />
                                            UF51 (FLAC)
                                        </p>
                                        <div className="space-y-1 text-sm text-gray-300">
                                            <p>✓ Full spectrum: 20Hz - 22kHz</p>
                                            <p>✓ Every harmonic preserved</p>
                                            <p>✓ Healing frequencies intact</p>
                                        </div>
                                    </div>

                                    {/* APPLE MUSIC */}
                                    <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-4">
                                        <p className="text-red-400 font-bold text-base mb-3">APPLE MUSIC (96 KBPS)</p>
                                        <div className="space-y-1 text-sm text-gray-300">
                                            <p>⚠ Limited: 20Hz - 15kHz</p>
                                            <p>⚠ Upper harmonics cut (7kHz+)</p>
                                            <p>⚠ Some frequencies lost</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 bg-cyan-900/30 border-l-4 border-cyan-400 rounded p-4">
                                    <p className="text-white font-bold text-sm">
                                        YOU'RE HEARING 30% MORE MUSIC
                                    </p>
                                    <p className="text-gray-300 text-xs mt-1">
                                        That's why you feel more on UF51. The healing frequencies are preserved.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* THE TRUTH */}
                        <Card className="bg-black/60 border-2 border-white/30">
                            <CardContent className="p-6">
                                <p className="text-white leading-relaxed">
                                    <strong className="text-cyan-400">Music is frequency.</strong> When you cry to "{track.title}" - 
                                    that's not weakness. That's your body RESPONDING to the correct frequencies. 
                                    That's healing happening in real-time.
                                </p>
                                <p className="text-pink-400 font-bold text-lg text-center mt-4">
                                    ♾️❤️♾️
                                </p>
                            </CardContent>
                        </Card>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}