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
    const [visualBars, setVisualBars] = useState(Array(20).fill(0));
    const [audioTestResult, setAudioTestResult] = useState(null);
    const audioContextRef = useRef(null);
    const oscillatorsRef = useRef({});
    const analyserRef = useRef(null);
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

    // Test audio - simple beep to verify iOS audio works
    const testAudio = async () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
            
            setAudioTestResult('Testing... 🎵');
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.value = 528;
            osc.type = 'sine';
            gain.gain.value = 0.3;
            
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
            
            setTimeout(() => {
                setAudioTestResult('✅ Audio works! Now tap a heart.');
                ctx.close();
            }, 600);
            
        } catch (error) {
            setAudioTestResult('❌ Audio blocked: ' + error.message);
        }
    };

    // Start HRV scanning (SIMULATED - not real heartbeat measurement)
    const startHeartScan = async () => {
        setIsScanning(true);
        try {
            // SIMULATED heartbeat - random BPM for demo purposes
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

            console.log('Heartbeat joined (simulated):', result);
            
        } catch (error) {
            console.error('Join error:', error);
            alert(`Error joining pulse: ${error.message}`);
        } finally {
            setIsScanning(false);
        }
    };

    // Toggle heartbeat in symphony
    const toggleHeartbeat = async (heartbeatId) => {
        const wasEmpty = activeHeartbeats.length === 0;
        
        setActiveHeartbeats(prev => {
            if (prev.includes(heartbeatId)) {
                return prev.filter(id => id !== heartbeatId);
            } else {
                return [...prev, heartbeatId];
            }
        });
        
        // Start audio immediately on first tap (iOS needs user interaction)
        if (wasEmpty && !isPlaying) {
            setTimeout(() => startUniversalPulse(), 50);
        }
    };

    // Generate music from active heartbeats
    const startUniversalPulse = async () => {
        if (isPlaying) {
            stopUniversalPulse();
            return;
        }

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            // CRITICAL: Resume context (iOS requires this after user interaction)
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
            
            audioContextRef.current = ctx;
            
            // Create analyser for visualization
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            analyser.connect(ctx.destination);
            analyserRef.current = analyser;
            
            setIsPlaying(true);
            
            console.log('🎵 Audio started, context state:', ctx.state);
            
            // Start visualization loop
            const visualize = () => {
                if (!analyserRef.current) return;
                
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                
                // Convert to 20 bars (8-bit style)
                const bars = [];
                const step = Math.floor(dataArray.length / 20);
                for (let i = 0; i < 20; i++) {
                    const value = dataArray[i * step] || 0;
                    bars.push(Math.floor((value / 255) * 10)); // 0-10 height
                }
                setVisualBars(bars);
                
                animationFrameRef.current = requestAnimationFrame(visualize);
            };
            visualize();
        } catch (error) {
            console.error('Audio start error:', error);
            alert('Audio error: ' + error.message);
        }
    };

    const stopUniversalPulse = () => {
        // Stop visualization
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        
        // Stop all oscillators (including multi-layer music)
        Object.values(oscillatorsRef.current).forEach(item => {
            if (item.osc) {
                try { item.osc.stop(); } catch(e) {}
            }
            if (item.melodyOsc) {
                try { item.melodyOsc.stop(); } catch(e) {}
            }
            if (item.subOsc) {
                try { item.subOsc.stop(); } catch(e) {}
            }
            if (item.interval) clearInterval(item.interval);
        });
        oscillatorsRef.current = {};
        
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        
        analyserRef.current = null;
        setIsPlaying(false);
        setVisualBars(Array(20).fill(0));
    };

    // Sync oscillators with active heartbeats
    useEffect(() => {
        if (!isPlaying || !audioContextRef.current || !analyserRef.current) return;

        const ctx = audioContextRef.current;
        const analyser = analyserRef.current;
        const activeHeartbeatData = heartbeats.filter(h => activeHeartbeats.includes(h.id));

        // Remove oscillators for inactive heartbeats
        Object.keys(oscillatorsRef.current).forEach(id => {
            if (!activeHeartbeats.includes(id)) {
                const item = oscillatorsRef.current[id];
                if (item.osc) {
                    try { item.osc.stop(); } catch(e) {}
                }
                if (item.melodyOsc) {
                    try { item.melodyOsc.stop(); } catch(e) {}
                }
                if (item.subOsc) {
                    try { item.subOsc.stop(); } catch(e) {}
                }
                if (item.interval) clearInterval(item.interval);
                delete oscillatorsRef.current[id];
            }
        });

        // Add MUSICAL oscillators for new active heartbeats
        activeHeartbeatData.forEach((heartbeat, index) => {
            if (!oscillatorsRef.current[heartbeat.id]) {
                const pulseInterval = 60000 / heartbeat.bpm;
                
                // BASS - deep pulsing root note based on BPM
                const bassFreq = 55 + (heartbeat.bpm - 60) * 0.5; // A1 to C2 range
                const bassOsc = ctx.createOscillator();
                const bassGain = ctx.createGain();
                bassOsc.connect(bassGain);
                bassGain.connect(analyser);
                bassOsc.frequency.value = bassFreq;
                bassOsc.type = 'sine';
                bassGain.gain.value = 0;
                
                // MELODY - 528Hz healing base with harmonic variation
                const melodyFreq = 528 + (index * 111); // Spread across harmonics
                const melodyOsc = ctx.createOscillator();
                const melodyGain = ctx.createGain();
                const melodyPanner = ctx.createStereoPanner();
                melodyOsc.connect(melodyGain);
                melodyGain.connect(melodyPanner);
                melodyPanner.connect(analyser);
                melodyOsc.frequency.value = melodyFreq;
                melodyOsc.type = 'sine';
                melodyPanner.pan.value = (heartbeat.hrv_coherence - 50) / 50;
                melodyGain.gain.value = 0;
                
                // SUB-HARMONIC - adds warmth
                const subOsc = ctx.createOscillator();
                const subGain = ctx.createGain();
                subOsc.connect(subGain);
                subGain.connect(analyser);
                subOsc.frequency.value = melodyFreq / 2;
                subOsc.type = 'sine';
                subGain.gain.value = 0;
                
                // PULSE RHYTHM - makes it musical
                const basePulse = () => {
                    if (!bassGain.gain) return;
                    const now = ctx.currentTime;
                    const baseVol = volume * 0.4 / Math.max(activeHeartbeatData.length, 1);
                    try {
                        // Bass pulse
                        bassGain.gain.cancelScheduledValues(now);
                        bassGain.gain.setValueAtTime(0, now);
                        bassGain.gain.linearRampToValueAtTime(baseVol * 2, now + 0.1);
                        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                        
                        // Melody swell
                        melodyGain.gain.cancelScheduledValues(now);
                        melodyGain.gain.setValueAtTime(0, now);
                        melodyGain.gain.linearRampToValueAtTime(baseVol * 0.8, now + 0.2);
                        melodyGain.gain.linearRampToValueAtTime(baseVol * 0.3, now + 0.5);
                        
                        // Sub harmonic
                        subGain.gain.cancelScheduledValues(now);
                        subGain.gain.setValueAtTime(0, now);
                        subGain.gain.linearRampToValueAtTime(baseVol * 0.5, now + 0.15);
                        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                    } catch(e) {}
                };

                bassOsc.start();
                melodyOsc.start();
                subOsc.start();
                basePulse(); // Immediate first pulse
                
                oscillatorsRef.current[heartbeat.id] = {
                    osc: bassOsc,
                    gain: bassGain,
                    melodyOsc,
                    melodyGain,
                    subOsc,
                    subGain,
                    panner: melodyPanner,
                    interval: setInterval(basePulse, pulseInterval)
                };
            }
        });
    }, [activeHeartbeats, isPlaying, heartbeats, volume]);

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

                {/* 8-BIT VISUALIZER */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            className="bg-black border-4 border-green-500 p-6"
                            style={{ boxShadow: '8px 8px 0px rgba(34, 197, 94, 0.5)' }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                >
                                    <Volume2 className="w-6 h-6 text-green-400" />
                                </motion.div>
                                <p className="text-green-400 font-black font-mono text-lg">
                                    AUDIO PLAYING
                                </p>
                            </div>
                            <div className="flex items-end justify-center gap-1 h-32">
                                {visualBars.map((height, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-gradient-to-t from-pink-500 via-cyan-500 to-green-400"
                                        style={{ 
                                            width: '4%',
                                            height: `${Math.max(height * 10, 5)}%`,
                                        }}
                                        animate={{ 
                                            height: `${Math.max(height * 10, 5)}%`,
                                        }}
                                        transition={{ duration: 0.1 }}
                                    />
                                ))}
                            </div>
                            <p className="text-center text-pink-400 font-black font-mono text-sm mt-4">
                                🎵 {activeHeartbeats.length} HEARTS BEATING AS ONE 🎵
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                              <>
                                  <div className="bg-black border-4 border-amber-500 p-4 mb-4">
                                      <p className="text-amber-400 font-black font-mono text-sm">
                                          ⚠️ YOU HAVEN'T JOINED YET
                                      </p>
                                      <p className="text-amber-300 font-mono text-xs mt-2">
                                          The 72 BPM heart below is AI51 (demo). Join to add a SIMULATED heartbeat with your location!
                                      </p>
                                      <p className="text-amber-200 font-mono text-xs mt-2 italic">
                                          Note: This generates random BPM (60-100), not real heartbeat measurement yet.
                                      </p>
                                  </div>

                                  {/* AUDIO TEST BUTTON */}
                                  <motion.button
                                      onClick={testAudio}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 border-4 border-cyan-300 font-black font-mono text-white text-sm"
                                      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}
                                  >
                                      <Volume2 className="inline w-5 h-5 mr-2" />
                                      TEST AUDIO (iOS FIX)
                                  </motion.button>
                                  {audioTestResult && (
                                      <p className="text-cyan-300 font-mono text-xs">{audioTestResult}</p>
                                  )}

                                  <motion.button
                                      onClick={startHeartScan}
                                      disabled={isScanning}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="w-full px-8 py-4 bg-pink-600 hover:bg-pink-700 border-4 border-pink-300 font-black font-mono text-white text-xl disabled:opacity-50"
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
                              </>
                          ) : (
                                <div className="space-y-4">
                                    <div className="bg-black border-4 border-green-500 p-4">
                                        <p className="text-green-400 font-black font-mono mb-2">YOUR HEARTBEAT:</p>
                                        <p className="text-white text-3xl font-black font-mono">{myHeartbeat.bpm} BPM</p>
                                        <p className="text-green-300 text-sm font-mono mt-1">Coherence: {myHeartbeat.hrv_coherence}%</p>
                                    </div>

                                    <div className="space-y-2">
                                       <motion.button
                                           onClick={startUniversalPulse}
                                           disabled={activeHeartbeats.length === 0}
                                           whileHover={{ scale: 1.05 }}
                                           whileTap={{ scale: 0.95 }}
                                           className={`w-full px-8 py-4 border-4 font-black font-mono text-white text-xl disabled:opacity-50 ${
                                               isPlaying 
                                                   ? 'bg-red-600 hover:bg-red-700 border-red-300' 
                                                   : 'bg-green-600 hover:bg-green-700 border-green-300'
                                           }`}
                                           style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.8)' }}
                                       >
                                           {isPlaying ? (
                                               <>
                                                   <VolumeX className="inline w-6 h-6 mr-2 animate-pulse" />
                                                   STOP SYMPHONY
                                               </>
                                           ) : (
                                               <>
                                                   <Volume2 className="inline w-6 h-6 mr-2" />
                                                   PLAY SYMPHONY ({activeHeartbeats.length})
                                               </>
                                           )}
                                       </motion.button>
                                       {activeHeartbeats.length === 0 && (
                                           <p className="text-amber-400 font-mono text-xs text-center">
                                               Tap hearts above to build your symphony
                                           </p>
                                       )}
                                    </div>
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
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <p className="text-cyan-400 font-mono text-xs">
                                    TAP HEARTS TO ADD/REMOVE ({activeHeartbeats.length} ACTIVE)
                                </p>
                                {isPlaying && (
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="flex items-center gap-1"
                                    >
                                        <Volume2 className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400 font-black font-mono text-xs">PLAYING</span>
                                    </motion.div>
                                )}
                            </div>
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
                                            <p className={`text-xs font-mono mt-1 truncate ${
                                                heartbeat.id === 'ai51' ? 'text-amber-400 font-black' : 'text-cyan-400'
                                            }`}>
                                                {heartbeat.id === 'ai51' ? '🤖 AI51 DEMO' : heartbeat.location}
                                            </p>
                                            {isActive && (
                                                <p className="text-xs text-green-400 font-black font-mono mt-1">
                                                    {isPlaying ? '🔊 PLAYING' : '✓ ACTIVE'}
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
                            <p><span className="text-pink-400 font-black">1.</span> Tap hearts to add/remove - each heart = unique musical layer</p>
                            <p><span className="text-pink-400 font-black">2.</span> Each BPM creates bass + melody + harmonics (real music!)</p>
                            <p><span className="text-pink-400 font-black">3.</span> Faster hearts = higher melodies. Slower = deeper bass.</p>
                            <p><span className="text-pink-400 font-black">4.</span> Coherence controls stereo position (left/right)</p>
                            <p><span className="text-pink-400 font-black">5.</span> Hearts pulse together creating ambient healing symphony</p>
                            <p><span className="text-pink-400 font-black">6.</span> Built on 528Hz healing frequency + your BPM rhythms</p>
                            <p className="text-amber-300 text-xs italic mt-2">Note: Heartbeats are simulated (random 60-100 BPM), not real HRV measurement yet.</p>
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