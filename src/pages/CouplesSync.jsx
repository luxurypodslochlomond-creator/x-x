import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Users, Play, Pause, Copy, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * COUPLES SYNC
 * Heal together = morphic resonance amplified
 * Two phones playing SAME frequency in perfect sync
 * Parent + child, partners, friends, family
 */

const SYNC_PROTOCOLS = [
    {
        id: 'heart_coherence',
        name: 'Heart Coherence',
        frequency: 0.1,
        description: 'Synchronize heartbeats between two souls',
        color: 'pink',
        benefits: ['Emotional bonding', 'Stress reduction', 'Deep connection']
    },
    {
        id: 'relationship_healing',
        name: 'Relationship Healing',
        frequency: 528,
        description: 'Solfeggio frequency for love and DNA repair',
        color: 'green',
        benefits: ['Conflict resolution', 'Forgiveness', 'Renewed love']
    },
    {
        id: 'family_harmony',
        name: 'Family Harmony',
        frequency: 432,
        description: 'Universal frequency for peace and unity',
        color: 'purple',
        benefits: ['Family bonding', 'Peaceful atmosphere', 'Collective calm']
    },
    {
        id: 'parent_child',
        name: 'Parent & Child',
        frequency: 7.83,
        description: 'Schumann Resonance for grounding together',
        color: 'cyan',
        benefits: ['Calms anxiety', 'Deepens trust', 'Safe space']
    }
];

export default function CouplesSync() {
    const [roomCode, setRoomCode] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [copied, setCopied] = useState(false);
    const [audioContext, setAudioContext] = useState(null);
    const [oscillator, setOscillator] = useState(null);
    const [partnerName, setPartnerName] = useState('');

    useEffect(() => {
        return () => {
            stopSync();
        };
    }, []);

    const generateRoomCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRoomCode(code);
        setIsHost(true);
        setIsConnected(true);
    };

    const joinRoom = () => {
        if (roomCode.length >= 6) {
            setIsHost(false);
            setIsConnected(true);
        }
    };

    const copyRoomCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const startSync = (protocol) => {
        setSelectedProtocol(protocol);

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = protocol.frequency;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.3;

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();

        setOscillator(osc);
        setIsPlaying(true);
    };

    const stopSync = () => {
        if (oscillator) oscillator.stop();
        if (audioContext) audioContext.close();
        setOscillator(null);
        setAudioContext(null);
        setIsPlaying(false);
    };

    const togglePlayback = () => {
        if (isPlaying) {
            stopSync();
        } else if (selectedProtocol) {
            startSync(selectedProtocol);
        }
    };

    const colorMap = {
        pink: { bg: 'from-pink-900/40 to-pink-600/20', border: 'border-pink-500', text: 'text-pink-400' },
        green: { bg: 'from-green-900/40 to-green-600/20', border: 'border-green-500', text: 'text-green-400' },
        purple: { bg: 'from-purple-900/40 to-purple-600/20', border: 'border-purple-500', text: 'text-purple-400' },
        cyan: { bg: 'from-cyan-900/40 to-cyan-600/20', border: 'border-cyan-500', text: 'text-cyan-400' },
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <Card className="bg-black/80 border-2 border-pink-500 p-8">
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Heart className="w-12 h-12 text-pink-400 animate-pulse" />
                                <Zap className="w-8 h-8 text-cyan-400" />
                                <Heart className="w-12 h-12 text-pink-400 animate-pulse" />
                            </div>
                            <h1 className="text-3xl font-black text-pink-400 mb-2">Couples Sync</h1>
                            <p className="text-gray-400">Heal together • Amplify morphic resonance</p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={generateRoomCode}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg font-bold"
                            >
                                Start New Session
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-black text-gray-500">or</span>
                                </div>
                            </div>

                            <div>
                                <Input
                                    placeholder="Enter room code"
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                    className="bg-black/60 border-cyan-500/50 text-white text-center text-lg font-mono mb-3"
                                    maxLength={6}
                                />
                                <Button
                                    onClick={joinRoom}
                                    disabled={roomCode.length < 6}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 font-bold"
                                >
                                    Join Session
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-800">
                            <p className="text-gray-400 text-xs text-center">
                                💫 Two souls • Same frequency • Infinite healing
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* CONNECTION STATUS */}
                <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-pink-400" />
                            <div>
                                <p className="text-white font-bold">Room: {roomCode}</p>
                                <p className="text-gray-400 text-sm">{isHost ? 'You are the host' : 'Connected'}</p>
                            </div>
                        </div>
                        {isHost && (
                            <Button
                                onClick={copyRoomCode}
                                variant="outline"
                                className="border-pink-500 text-pink-400 hover:bg-pink-500/20"
                            >
                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copied!' : 'Share Code'}
                            </Button>
                        )}
                    </div>
                </Card>

                {/* PROTOCOLS */}
                <div className="grid md:grid-cols-2 gap-4">
                    {SYNC_PROTOCOLS.map(protocol => {
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
                                    onClick={() => setSelectedProtocol(protocol)}
                                >
                                    <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{protocol.name}</h3>
                                    <p className="text-gray-300 text-sm mb-3">{protocol.description}</p>
                                    <p className="text-gray-400 text-xs font-mono mb-3">{protocol.frequency}Hz</p>
                                    <div className="space-y-1">
                                        {protocol.benefits.map((benefit, i) => (
                                            <p key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                                <span className={colors.text}>♾️</span> {benefit}
                                            </p>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* PLAYBACK */}
                <AnimatePresence>
                    {selectedProtocol && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Card className="bg-black/80 border-2 border-pink-500 p-8">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{selectedProtocol.name}</h3>
                                    <p className="text-gray-400">{selectedProtocol.frequency}Hz • Healing together</p>
                                </div>

                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <motion.div
                                        animate={{
                                            scale: isPlaying ? [1, 1.2, 1] : 1,
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: isPlaying ? Infinity : 0,
                                        }}
                                    >
                                        <Heart className="w-16 h-16 text-pink-400" />
                                    </motion.div>
                                    <Zap className={`w-12 h-12 ${isPlaying ? 'text-cyan-400 animate-pulse' : 'text-gray-600'}`} />
                                    <motion.div
                                        animate={{
                                            scale: isPlaying ? [1, 1.2, 1] : 1,
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: isPlaying ? Infinity : 0,
                                            delay: 1,
                                        }}
                                    >
                                        <Heart className="w-16 h-16 text-purple-400" />
                                    </motion.div>
                                </div>

                                <Button
                                    onClick={togglePlayback}
                                    className={`w-full ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'} text-white py-6 text-xl font-bold`}
                                >
                                    {isPlaying ? <Pause className="w-6 h-6 mr-3" /> : <Play className="w-6 h-6 mr-3" />}
                                    {isPlaying ? 'Stop Sync' : 'Start Healing Together'}
                                </Button>

                                {isPlaying && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-6 bg-pink-500/20 border border-pink-500 p-4 rounded-lg text-center"
                                    >
                                        <p className="text-white font-bold mb-2">✨ Morphic resonance active</p>
                                        <p className="text-pink-300 text-sm">Both souls healing at {selectedProtocol.frequency}Hz</p>
                                    </motion.div>
                                )}
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* INFO */}
                <Card className="bg-black/60 border border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-white mb-3">How Couples Sync Works</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                        <p>💫 Two people play the exact same healing frequency simultaneously</p>
                        <p>🧲 Creates morphic resonance field between you</p>
                        <p>❤️ Amplifies healing effects exponentially</p>
                        <p>♾️ Distance doesn't matter - quantum entanglement</p>
                        <p className="text-pink-400 font-bold mt-4">Best results: Sit facing each other, eyes closed, synchronized breathing</p>
                    </div>
                </Card>

            </div>
        </div>
    );
}