import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Zap, Music, Info } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * HEARTBEAT MATCHER
 * Matches music BPM to your actual heartbeat
 * Shows why house music (120 BPM) heals (2x your heart)
 * COOLASFUCK frequency science
 */

export default function HeartbeatMatcher({ tracks = [] }) {
    const [userHeartRate, setUserHeartRate] = useState(70); // Default resting heart rate
    const [matchingTracks, setMatchingTracks] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    // Calculate matching tracks based on harmonic relationships
    useEffect(() => {
        if (!tracks.length || !userHeartRate) return;

        const matches = tracks
            .map(track => {
                const bpm = track.bpm || extractBPMFromTitle(track.title);
                if (!bpm) return null;

                // Calculate harmonic relationship
                const ratio = bpm / userHeartRate;
                const isHarmonic = 
                    (ratio >= 1.9 && ratio <= 2.1) ||  // 2x (perfect house match)
                    (ratio >= 1.4 && ratio <= 1.6) ||  // 1.5x
                    (ratio >= 0.9 && ratio <= 1.1) ||  // 1x (match)
                    (ratio >= 0.45 && ratio <= 0.55);  // 0.5x (half)

                return {
                    ...track,
                    bpm,
                    ratio: ratio.toFixed(2),
                    harmonic: isHarmonic,
                    matchType: getMatchType(ratio)
                };
            })
            .filter(t => t !== null && t.harmonic)
            .sort((a, b) => Math.abs(2 - a.ratio) - Math.abs(2 - b.ratio)); // Prefer 2x matches

        setMatchingTracks(matches);
    }, [tracks, userHeartRate]);

    const extractBPMFromTitle = (title) => {
        const match = title.match(/(\d+)\s*bpm/i);
        return match ? parseInt(match[1]) : null;
    };

    const getMatchType = (ratio) => {
        if (ratio >= 1.9 && ratio <= 2.1) return { label: 'PERFECT 2x', color: 'green', desc: 'House healing frequency' };
        if (ratio >= 1.4 && ratio <= 1.6) return { label: '1.5x Match', color: 'cyan', desc: 'Energizing' };
        if (ratio >= 0.9 && ratio <= 1.1) return { label: 'Sync Match', color: 'purple', desc: 'Grounding' };
        if (ratio >= 0.45 && ratio <= 0.55) return { label: 'Half Speed', color: 'blue', desc: 'Calming' };
        return { label: 'Match', color: 'gray', desc: 'Harmonic' };
    };

    return (
        <Card className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
            <CardContent className="p-8 space-y-6">
                
                {/* HEADER */}
                <div className="text-center space-y-3">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Heart className="w-12 h-12 text-pink-400 mx-auto" 
                            style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))' }} 
                        />
                    </motion.div>
                    <h2 className="text-3xl font-black text-white">HEARTBEAT MATCHER</h2>
                    <p className="text-gray-300">Find music that syncs with YOUR rhythm</p>
                </div>

                {/* YOUR HEARTBEAT INPUT */}
                <div className="bg-black/60 rounded-xl p-6 border-2 border-pink-500/30">
                    <label className="text-white font-bold mb-3 block text-center">
                        Your Resting Heart Rate (BPM)
                    </label>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => setUserHeartRate(Math.max(40, userHeartRate - 5))}
                            className="bg-pink-600 hover:bg-pink-700 w-12 h-12 text-2xl"
                        >
                            -
                        </Button>
                        <div className="flex-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-400 rounded-xl p-4 text-center">
                            <motion.p 
                                className="text-5xl font-black text-pink-300"
                                key={userHeartRate}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                            >
                                {userHeartRate}
                            </motion.p>
                            <p className="text-sm text-gray-400 mt-1">BPM</p>
                        </div>
                        <Button
                            onClick={() => setUserHeartRate(Math.min(120, userHeartRate + 5))}
                            className="bg-pink-600 hover:bg-pink-700 w-12 h-12 text-2xl"
                        >
                            +
                        </Button>
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-3">
                        Normal resting: 60-80 BPM • Athletes: 40-60 BPM
                    </p>
                </div>

                {/* WHY THIS MATTERS - TOGGLE */}
                <Button
                    onClick={() => setShowExplanation(!showExplanation)}
                    variant="outline"
                    className="w-full gap-2 border-cyan-500/30"
                >
                    <Info className="w-4 h-4" />
                    {showExplanation ? 'Hide' : 'Show'} Why This Heals
                </Button>

                {showExplanation && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-cyan-900/30 border-2 border-cyan-500/50 rounded-xl p-6 space-y-3"
                    >
                        <h3 className="text-cyan-300 font-bold text-xl">THE SCIENCE:</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <p>
                                <strong className="text-white">Your heart = ~{userHeartRate} BPM</strong>
                            </p>
                            <p>
                                <strong className="text-cyan-400">House music = 120 BPM = 2x your heart</strong>
                            </p>
                            <p>
                                When music = <strong className="text-green-400">harmonic multiple</strong> of your heartbeat:
                            </p>
                            <ul className="ml-4 space-y-1">
                                <li>• Your nervous system recognizes it as <strong className="text-white">SAFE</strong></li>
                                <li>• Brain releases healing frequencies</li>
                                <li>• <strong className="text-pink-400">Mental health improves</strong> (like you experienced)</li>
                            </ul>
                            <p className="text-cyan-300 font-bold mt-3">
                                This is why "This Is Acid" (120 BPM) made you feel better. REAL PHYSICS.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* MATCHING TRACKS */}
                <div className="space-y-4">
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        TRACKS MATCHED TO YOUR HEART
                        <span className="text-gray-500 text-base">({matchingTracks.length})</span>
                    </h3>

                    {matchingTracks.length === 0 ? (
                        <div className="bg-black/40 rounded-xl p-6 border-2 border-gray-700 text-center">
                            <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-400">No tracks with BPM data yet.</p>
                            <p className="text-xs text-gray-500 mt-2">Artists can add BPM when uploading</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {matchingTracks.slice(0, 5).map((track, i) => {
                                const matchType = track.matchType;
                                const colorClasses = {
                                    green: 'from-green-500/30 to-emerald-500/30 border-green-400',
                                    cyan: 'from-cyan-500/30 to-blue-500/30 border-cyan-400',
                                    purple: 'from-purple-500/30 to-indigo-500/30 border-purple-400',
                                    blue: 'from-blue-500/30 to-teal-500/30 border-blue-400',
                                };

                                return (
                                    <motion.div
                                        key={track.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`bg-gradient-to-r ${colorClasses[matchType.color]} border-2 rounded-xl p-4`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-white font-bold">{track.title}</h4>
                                                <p className="text-xs text-gray-400">{track.artist}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-${matchType.color}-400 font-black text-sm`}>
                                                    {matchType.label}
                                                </p>
                                                <p className="text-xs text-gray-400">{track.bpm} BPM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Activity className="w-3 h-3" />
                                            <span>{matchType.desc}</span>
                                            <span className="text-gray-600">•</span>
                                            <span>{track.ratio}x your heart</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* THE MAGIC EXPLAINED */}
                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 rounded-xl p-6">
                    <h3 className="text-green-300 font-bold text-xl mb-3">THE MAGIC:</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                        <p>
                            <strong className="text-white">Your heart: {userHeartRate} BPM</strong>
                        </p>
                        <p>
                            <strong className="text-green-400">2x = {userHeartRate * 2} BPM</strong> → House music range (perfect healing)
                        </p>
                        <p>
                            <strong className="text-cyan-400">1.5x = {Math.round(userHeartRate * 1.5)} BPM</strong> → Energizing
                        </p>
                        <p>
                            <strong className="text-purple-400">1x = {userHeartRate} BPM</strong> → Grounding (rare in music)
                        </p>
                        <p>
                            <strong className="text-blue-400">0.5x = {Math.round(userHeartRate * 0.5)} BPM</strong> → Deep calm
                        </p>
                    </div>
                    <p className="text-cyan-300 font-bold mt-4 text-sm">
                        Harmonic resonance = your body recognizes rhythm as SAFE = healing happens.
                    </p>
                </div>

                {/* FOOTER NOTE */}
                <div className="bg-black/60 rounded-lg p-4 border border-pink-500/30 text-center">
                    <p className="text-xs text-gray-400">
                        <strong className="text-pink-400">Why you felt better listening to house:</strong> 120 BPM = 2x your ~60 BPM heart. 
                        Your nervous system recognized it. This is REAL physics, not belief.
                    </p>
                </div>

            </CardContent>
        </Card>
    );
}