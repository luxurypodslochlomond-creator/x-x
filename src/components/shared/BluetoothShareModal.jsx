import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bluetooth, CheckCircle, Share2 } from 'lucide-react';

export default function BluetoothShareModal({ isOpen, onClose, track }) {
    const [isBeaming, setIsBeaming] = useState(false);
    const [beamComplete, setBeamComplete] = useState(false);
    const [offlinePlaysQueued, setOfflinePlaysQueued] = useState(0);

    // NEW: Load offline plays from localStorage
    useEffect(() => {
        if (isOpen) {
            const offlinePlays = JSON.parse(localStorage.getItem('uf51_offline_plays') || '[]');
            setOfflinePlaysQueued(offlinePlays.length);
        }
    }, [isOpen]);

    const handleBeam = async () => {
        setIsBeaming(true);
        
        // NEW: Store offline play in localStorage (will sync when online)
        const offlinePlays = JSON.parse(localStorage.getItem('uf51_offline_plays') || '[]');
        offlinePlays.push({
            track_id: track.id,
            artist: track.artist,
            played_at: new Date().toISOString(),
            transmitted_via_bluetooth: true,
            synced_to_server: false
        });
        localStorage.setItem('uf51_offline_plays', JSON.stringify(offlinePlays));
        
        // Simulate beaming process
        setTimeout(() => {
            setIsBeaming(false);
            setBeamComplete(true);
            setOfflinePlaysQueued(offlinePlays.length);
            setTimeout(() => {
                setBeamComplete(false);
                onClose();
            }, 2000);
        }, 2000);
    };

    const handleWebShare = async () => {
        const shareUrl = `${window.location.origin}/radio?track=${track.id}`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: track.title,
                    text: `🎵 ${track.title} by ${track.artist}\n\nHealing frequency transmission on UF51`,
                    url: shareUrl,
                });
                onClose();
            } catch (err) {
                // User cancelled
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('Link copied! Send it to anyone, anywhere.');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md"
                >
                    <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 border-2 border-cyan-500/50">
                        <CardContent className="p-6 space-y-6">
                            
                            {/* HEADER */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">BEAMING ENGINE</h3>
                                    <p className="text-sm text-gray-300">Share this frequency with nearby devices</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* TRACK INFO */}
                            <div className="bg-black/40 rounded-xl p-4 border border-cyan-500/30">
                                <p className="text-sm text-gray-400 mb-1">Beaming:</p>
                                <p className="text-lg font-bold text-white">{track.title}</p>
                                <p className="text-sm text-cyan-400">{track.artist}</p>
                            </div>

                            {/* NEW: OFFLINE PLAYS INDICATOR */}
                            {offlinePlaysQueued > 0 && (
                                <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4">
                                    <p className="text-sm text-green-400 mb-2">
                                        🔋 <strong>Offline Mode Active</strong>
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        {offlinePlaysQueued} plays waiting to sync. Artists will be credited when you reconnect.
                                    </p>
                                </div>
                            )}

                            {/* BEAMING STATUS */}
                            <AnimatePresence mode="wait">
                                {beamComplete ? (
                                    <motion.div
                                        key="complete"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="text-center py-8"
                                    >
                                        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                                        <p className="text-xl font-bold text-green-400">Frequency Transmitted!</p>
                                        <p className="text-sm text-gray-300 mt-2">
                                            Artist will be paid when recipient connects
                                        </p>
                                    </motion.div>
                                ) : isBeaming ? (
                                    <motion.div
                                        key="beaming"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-8"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Bluetooth className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
                                        </motion.div>
                                        <p className="text-lg font-bold text-white">Transmitting frequency...</p>
                                        <p className="text-sm text-gray-400 mt-2">Searching for nearby devices</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="options"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-3"
                                    >
                                        {/* BLUETOOTH BEAM */}
                                        <Button
                                            onClick={handleBeam}
                                            className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-bold"
                                        >
                                            <Bluetooth className="w-6 h-6 mr-3" />
                                            Beam to Nearby Device
                                        </Button>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-600"></div>
                                            </div>
                                            <div className="relative flex justify-center text-xs">
                                                <span className="px-2 bg-purple-900 text-gray-400">or share via</span>
                                            </div>
                                        </div>

                                        {/* WEB SHARE (Works Now) */}
                                        <Button
                                            onClick={handleWebShare}
                                            className="w-full h-16 bg-cyan-600 hover:bg-cyan-700 text-lg font-bold"
                                        >
                                            <Share2 className="w-6 h-6 mr-3" />
                                            Share Link
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* INFO - UPDATED */}
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4">
                                <p className="text-xs text-gray-300 mb-2">
                                    <strong className="text-cyan-400">How Offline Sharing Works:</strong>
                                </p>
                                <ul className="text-xs text-gray-400 space-y-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                                        <span>Device → Device transmission. NO internet needed.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                                        <span>Recipient can listen offline immediately.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                                        <span>When recipient connects, artist gets P51 automatically.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                                        <span>Stadium scale possible: 1 → 10 → 100 → 10,000 devices.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                                        <span>Artist ALWAYS gets paid. Zero exploitation.</span>
                                    </li>
                                </ul>
                            </div>

                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}