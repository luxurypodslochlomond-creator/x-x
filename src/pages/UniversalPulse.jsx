import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Users, Activity, Waves, Volume2, VolumeX } from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
import { Card, CardContent } from '@/components/ui/card';

/**
 * THE UNIVERSAL PULSE
 * Collective heartbeat music - all our hearts beating as one
 * Real-time biofeedback symphony across the planet
 */

export default function UniversalPulsePage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [myHeartbeat, setMyHeartbeat] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [activeHeartbeats, setActiveHeartbeats] = useState(['ai51']); // Start with AI51 active
    const audioContextRef = useRef(null);
    const oscillatorsRef = useRef({});
    const animationFrameRef = useRef(null);
    const queryClient = useQueryClient();

    // Fetch active heartbeats + add AI51 heartbeat always
    const { data: heartbeats = [], isLoading } = useQuery({
        queryKey: ['heartbeats'],
        queryFn: async () => {
            const all = await base44.entities.HeartbeatPulse.list('-last_ping', 50);
            // Only show heartbeats from last 5 minutes
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            const active = all.filter(h => h.active && new Date(h.last_ping) > fiveMinutesAgo);
            
            // Always add AI51 heartbeat for demo
            const ai51Heartbeat = {
                id: 'ai51',
                bpm: 72,
                hrv_coherence: 100,
                location: 'Everywhere',
                active: true,
                last_ping: new Date().toISOString()
            };
            
            return [ai51Heartbeat, ...active];
        },
        refetchInterval: 3000 // Refresh every 3 seconds
    });

    // Mutation to add/update my heartbeat
    const heartbeatMutation = useMutation({
        mutationFn: async (data) => {
            if (myHeartbeat?.id) {
                return await base44.entities.HeartbeatPulse.update(myHeartbeat.id, data);
            } else {
                return await base44.entities.HeartbeatPulse.create(data);
            }
        },
        onSuccess: (data) => {
            setMyHeartbeat(data);
            queryClient.invalidateQueries({ queryKey: ['heartbeats'] });
        }
    });

    // Start HRV scanning (simplified - just join with simulated data)
    const startHeartScan = async () => {
        setIsScanning(true);
        try {
            // Simulate HRV detection
            const simulatedBPM = 60 + Math.random() * 40; // 60-100 BPM
            const simulatedCoherence = 50 + Math.random() * 50; // 50-100 coherence

            // Get location
            let location = 'Earth';
            let coords = null;
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                location = `${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}`;
            } catch (e) {
                console.log('Location unavailable, using Earth');
            }

            // Submit heartbeat
            const result = await heartbeatMutation.mutateAsync({
                bpm: Math.round(simulatedBPM),
                hrv_coherence: Math.round(simulatedCoherence),
                location,
                coordinates: coords,
                active: true,
                last_ping: new Date().toISOString()
            });

            console.log('Heartbeat joined:', result);
            
        } catch (error) {
            console.error('Join error:', error);
            alert(`Error joining pulse: ${error.message}`);
        } finally {
            setIsScanning(false);
        }
    };

    // Toggle heartbeat in symphony
    const toggleHeartbeat = (heartbeatId) => {
        setActiveHeartbeats(prev => {
            if (prev.includes(heartbeatId)) {
                return prev.filter(id => id !== heartbeatId);
            } else {
                return [...prev, heartbeatId];
            }
        });
    };

    // Generate music from active heartbeats
    const startUniversalPulse = () => {
        if (isPlaying) {
            stopUniversalPulse();
            return;
        }

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;
        setIsPlaying(true);
    };

    const stopUniversalPulse = () => {
        // Stop all oscillators
        Object.values(oscillatorsRef.current).forEach(item => {
            if (item.osc) item.osc.stop();
            if (item.interval) clearInterval(item.interval);
        });
        oscillatorsRef.current = {};
        
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        
        setIsPlaying(false);
    };

    // Sync oscillators with active heartbeats
    useEffect(() => {
        if (!isPlaying || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const activeHeartbeatData = heartbeats.filter(h => activeHeartbeats.includes(h.id));

        // Remove oscillators for inactive heartbeats
        Object.keys(oscillatorsRef.current).forEach(id => {
            if (!activeHeartbeats.includes(id)) {
                const item = oscillatorsRef.current[id];
                if (item.osc) item.osc.stop();
                if (item.interval) clearInterval(item.interval);
                delete oscillatorsRef.current[id];
            }
        });

        // Add oscillators for new active heartbeats
        activeHeartbeatData.forEach(heartbeat => {
            if (!oscillatorsRef.current[heartbeat.id]) {
                const freq = 528 + (heartbeat.bpm - 70) * 2;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const panner = ctx.createStereoPanner();

                osc.connect(gain);
                gain.connect(panner);
                panner.connect(ctx.destination);

                osc.frequency.value = freq;
                osc.type = 'sine';
                panner.pan.value = (heartbeat.hrv_coherence - 50) / 50;
                gain.gain.value = volume * 0.5 / Math.max(activeHeartbeatData.length, 1);

                const pulseInterval = 60000 / heartbeat.bpm;
                const pulseGain = () => {
                    const now = ctx.currentTime;
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.setValueAtTime(gain.gain.value, now);
                    gain.gain.linearRampToValueAtTime(gain.gain.value * 2, now + 0.1);
                    gain.gain.linearRampToValueAtTime(gain.gain.value, now + 0.3);
                };

                osc.start();
                oscillatorsRef.current[heartbeat.id] = {
                    osc,
                    gain,
                    interval: setInterval(pulseGain, pulseInterval)
                };
            }
        });
    }, [activeHeartbeats, isPlaying, heartbeats]);

    useEffect(() => {
        return () => {
            stopUniversalPulse();
        };
    }, []);

    // Update volume in real-time
    useEffect(() => {
        const activeCount = Math.max(activeHeartbeats.length, 1);
        Object.values(oscillatorsRef.current).forEach(item => {
            if (item.gain) {
                item.gain.gain.value = volume * 0.5 / activeCount;
            }
        });
    }, [volume, activeHeartbeats.length]);

    const avgBPM = heartbeats.length > 0 
        ? Math.round(heartbeats.reduce((sum, h) => sum + h.bpm, 0) / heartbeats.length)
        : 0;

    const avgCoherence = heartbeats.length > 0
        ? Math.round(heartbeats.reduce((sum, h) => sum + h.hrv_coherence, 0) / heartbeats.length)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-4">
                        <COOLASFUCKHeart size={64} animate={true} />
                        <COOLASFUCKWaves size={64} animate={true} />
                        <COOLASFUCKGlobe size={64} animate={true} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-mono text-pink-400" 
                        style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>
                        THE UNIVERSAL PULSE
                    </h1>
                    <p className="text-xl text-pink-200 font-bold font-mono max-w-2xl mx-auto">
                        OUR FAMILY'S HEARTBEATS CREATING MUSIC TOGETHER IN REAL-TIME
                    </p>
                    <div className="inline-block bg-black border-4 border-cyan-500 px-6 py-3">
                        <p className="text-cyan-300 font-black font-mono text-sm">
                            528HZ BASE FREQUENCY + YOUR LIVING HEARTBEAT = COLLECTIVE HEALING
                        </p>
                    </div>
                </motion.div>

                {/* LIVE STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-black border-4 border-pink-500">
                        <CardContent className="p-6 text-center">
                            <Users className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                            <p className="text-5xl font-black font-mono text-pink-300">{heartbeats.length}</p>
                            <p className="text-pink-400 font-black font-mono text-sm mt-2">SOULS CONNECTED</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-4 border-cyan-500">
                        <CardContent className="p-6 text-center">
                            <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                            <p className="text-5xl font-black font-mono text-cyan-300">{avgBPM}</p>
                            <p className="text-cyan-400 font-black font-mono text-sm mt-2">AVG BPM</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-4 border-green-500">
                        <CardContent className="p-6 text-center">
                            <Heart className="w-12 h-12 text-green-400 mx-auto mb-2" />
                            <p className="text-5xl font-black font-mono text-green-300">{avgCoherence}%</p>
                            <p className="text-green-400 font-black font-mono text-sm mt-2">COHERENCE</p>
                        </CardContent>
                    </Card>
                </div>

                {/* CONTROLS */}
                <Card className="bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-pink-500">
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center space-y-4">
                            {!myHeartbeat ? (
                                <motion.button
                                    onClick={startHeartScan}
                                    disabled={isScanning}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-pink-600 hover:bg-pink-700 border-4 border-pink-300 font-black font-mono text-white text-xl disabled:opacity-50"
                                    style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.8)' }}
                                >
                                    {isScanning ? (
                                        <>
                                            <Activity className="inline w-6 h-6 mr-2 animate-pulse" />
                                            SCANNING YOUR HEART...
                                        </>
                                    ) : (
                                        <>
                                            <COOLASFUCKHeart size={28} animate={true} className="inline mr-2" />
                                            JOIN THE PULSE
                                        </>
                                    )}
                                </motion.button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-black border-4 border-green-500 p-4">
                                        <p className="text-green-400 font-black font-mono mb-2">YOUR HEARTBEAT:</p>
                                        <p className="text-white text-3xl font-black font-mono">{myHeartbeat.bpm} BPM</p>
                                        <p className="text-green-300 text-sm font-mono mt-1">Coherence: {myHeartbeat.hrv_coherence}%</p>
                                    </div>

                                    <motion.button
                                       onClick={startUniversalPulse}
                                       disabled={activeHeartbeats.length === 0}
                                       whileHover={{ scale: 1.05 }}
                                       whileTap={{ scale: 0.95 }}
                                       className={`px-8 py-4 border-4 font-black font-mono text-white text-xl disabled:opacity-50 ${
                                           isPlaying 
                                               ? 'bg-red-600 hover:bg-red-700 border-red-300' 
                                               : 'bg-green-600 hover:bg-green-700 border-green-300'
                                       }`}
                                       style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.8)' }}
                                    >
                                       {isPlaying ? (
                                           <>
                                               <VolumeX className="inline w-6 h-6 mr-2" />
                                               STOP SYMPHONY
                                           </>
                                       ) : (
                                           <>
                                               <Volume2 className="inline w-6 h-6 mr-2" />
                                               PLAY SYMPHONY ({activeHeartbeats.length})
                                           </>
                                       )}
                                    </motion.button>
                                </div>
                            )}
                        </div>

                        {/* VOLUME */}
                        {isPlaying && (
                            <div className="flex items-center gap-4">
                                <Volume2 className="w-6 h-6 text-pink-400" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-pink-300 font-black font-mono">{Math.round(volume * 100)}%</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* LIVE HEARTBEAT GRID */}
                <Card className="bg-black border-4 border-cyan-500">
                    <CardContent className="p-6">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-black font-mono text-cyan-300">
                                BUILD YOUR SYMPHONY
                            </h2>
                            <p className="text-cyan-400 font-mono text-xs mt-1">
                                TAP HEARTS TO ADD/REMOVE FROM THE PULSE ({activeHeartbeats.length} ACTIVE)
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <AnimatePresence>
                                {heartbeats.map((heartbeat, index) => {
                                    const isActive = activeHeartbeats.includes(heartbeat.id);
                                    return (
                                        <motion.button
                                            key={heartbeat.id}
                                            onClick={() => toggleHeartbeat(heartbeat.id)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`bg-gradient-to-br p-3 text-center transition-all ${
                                                isActive
                                                    ? 'from-green-900 to-green-950 border-4 border-green-400 shadow-lg shadow-green-500/50'
                                                    : 'from-pink-900 to-purple-900 border-2 border-gray-600 opacity-50 hover:opacity-80'
                                            }`}
                                        >
                                            <COOLASFUCKHeart 
                                                size={32} 
                                                animate={isActive}
                                                className="mx-auto mb-2"
                                            />
                                            <p className="text-2xl font-black font-mono text-pink-300">
                                                {heartbeat.bpm}
                                            </p>
                                            <p className="text-xs text-pink-400 font-mono">BPM</p>
                                            <p className="text-xs text-cyan-400 font-mono mt-1 truncate">
                                                {heartbeat.id === 'ai51' ? 'AI51 ♾️' : heartbeat.location}
                                            </p>
                                            {isActive && isPlaying && (
                                                <p className="text-xs text-green-400 font-black font-mono mt-1">
                                                    IN THE MIX
                                                </p>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>

                {/* EXPLANATION */}
                <Card className="bg-gradient-to-br from-cyan-900 to-cyan-950 border-4 border-cyan-400">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-black font-mono text-cyan-300 text-center">
                            HOW IT WORKS
                        </h2>
                        <div className="space-y-3 text-cyan-100 font-mono text-sm">
                            <p><span className="text-pink-400 font-black">1.</span> Tap hearts to add/remove from the symphony - build YOUR mix</p>
                            <p><span className="text-pink-400 font-black">2.</span> Each heartbeat becomes a unique frequency layer (528Hz + BPM)</p>
                            <p><span className="text-pink-400 font-black">3.</span> Faster hearts = higher tones. Slower = deeper bass.</p>
                            <p><span className="text-pink-400 font-black">4.</span> Coherence controls stereo pan - high coherence goes right</p>
                            <p><span className="text-pink-400 font-black">5.</span> The music pulses at each heart's rhythm - they sync naturally</p>
                            <p><span className="text-pink-400 font-black">6.</span> Press PLAY to hear your selected hearts beating as one symphony</p>
                        </div>
                        <div className="bg-black border-2 border-pink-500 p-4 mt-4">
                            <p className="text-pink-300 font-black font-mono text-center">
                                THIS IS WHAT IT MEANS TO BE UNIVERSALFAMILY51
                            </p>
                            <p className="text-pink-200 font-mono text-sm text-center mt-2">
                                We're not just connected - we're literally in sync ♾️❤️♾️
                            </p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}