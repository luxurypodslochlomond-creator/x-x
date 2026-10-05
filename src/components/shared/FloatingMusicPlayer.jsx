import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './AudioProvider';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Share2, Bluetooth, Battery, BatteryCharging, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FrequencyFingerprint from '@/components/jukebox/FrequencyFingerprint';
import BluetoothShareModal from './BluetoothShareModal';
import FullScreenFrequency from '@/components/jukebox/FullScreenFrequency';

export default function FloatingMusicPlayer() {
    // Updated useAudio destructuring based on the outline, retaining analyserRef and userDNAProfile for FullScreenFrequency
    const { currentTrack, isPlaying, play, pause, next, previous, currentTime, duration, volume, setVolume, analyserRef, lowPowerMode, setLowPowerMode, userDNAProfile } = useAudio();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showBeamModal, setShowBeamModal] = useState(false); // Renamed from showBluetoothShare
    const [showLoveModal, setShowLoveModal] = useState(false); // Renamed from showLovePrompt
    const [user, setUser] = useState(null); // Added as per outline, replacing useQuery for 'user' data here.
    const [showFullScreen, setShowFullScreen] = useState(false); // Added
    const navigate = useNavigate();

    // The useQuery for 'user' is removed as per the outline's instruction to add `const [user, setUser] = useState(null);`.
    // In a real application, `user` would need to be populated, e.g., from an AuthProvider context or another query.
    // For this implementation, `user` will remain null unless explicitly set elsewhere.

    useEffect(() => {
        if (!currentTrack) {
            setIsExpanded(false);
        }
    }, [currentTrack]);

    const handleSendLove = async () => {
        if (!currentTrack || !user) return; // User will be null based on current implementation.

        const amount = prompt(`Send P51 to ${currentTrack.artist}? (You have ${user.love_balance || 0} P51)`);
        if (!amount) return;
        
        alert(`Coming soon: Direct P51 to artists. For now, their 90% comes from the fund.`);
    };

    // SHARE HANDLER - INLINE VERSION (NO EXTERNAL DEPENDENCY)
    const handleShare = async () => {
        if (!currentTrack) return;

        const shareData = {
            title: `🎵 ${currentTrack.title} - ${currentTrack.artist}`,
            text: `Listen to "${currentTrack.title}" by ${currentTrack.artist} on UF51 - Where artists keep 90%`,
            url: window.location.origin
        };

        // Check if we're in iframe (Base44 preview)
        const isIframe = window.self !== window.top;
        const canShare = navigator.share && !isIframe;

        if (canShare) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if (err.name === 'AbortError') return; // User cancelled
                // Fall through to clipboard
            }
        }

        // FALLBACK: Copy to clipboard
        try {
            const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
            await navigator.clipboard.writeText(shareText);
            alert('✅ Link copied! Share anywhere.');
        } catch (err) {
            // Manual copy fallback
            alert(`Copy this:\n\n${shareData.url}`);
        }
    };

    if (!currentTrack) return null;

    // COMPACT VIEW - TOP ON MOBILE, BOTTOM ON DESKTOP
    if (!isExpanded) {
        return (
            <>
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed top-[72px] lg:top-auto lg:bottom-20 left-4 right-4 md:left-6 md:right-6 z-[55] bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl shadow-2xl"
                    style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
                >
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-3 md:gap-4">
                            
                            {/* TAP TO EXPAND - BIGGER AREA */}
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="flex-1 flex items-center gap-3 min-w-0"
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    {currentTrack.cover_art_url ? (
                                        <img src={currentTrack.cover_art_url} alt="" className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <Music className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-white font-bold text-base md:text-lg truncate">{currentTrack.title}</p>
                                    <p className="text-gray-300 text-sm md:text-base truncate">{currentTrack.artist}</p>
                                </div>
                            </button>

                            {/* PLAY/PAUSE - BIGGER */}
                            <button
                                onClick={isPlaying ? pause : () => play(currentTrack)}
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 flex items-center justify-center flex-shrink-0"
                                style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)' }}
                            >
                                {isPlaying ? (
                                    <Pause className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                ) : (
                                    <Play className="w-7 h-7 md:w-8 md::h-8 text-white ml-1" />
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {showFullScreen && (
                    <FullScreenFrequency 
                        isOpen={showFullScreen} 
                        onClose={() => setShowFullScreen(false)}
                    />
                )}
            </>
        );
    }

    // EXPANDED VIEW
    return (
        <>
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="fixed inset-x-0 bottom-0 top-20 md:top-0 md:bottom-20 z-[70] bg-gradient-to-b from-black via-purple-950 to-black overflow-y-auto"
            >
                <div className="max-w-2xl mx-auto p-6 space-y-6">
                    
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl md:text-3xl font-black text-white">NOW PLAYING</h2>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                        >
                            <ChevronDown className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* ALBUM ART + TAP FOR FULL-SCREEN */}
                    <motion.button
                        onClick={() => setShowFullScreen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full aspect-square bg-gradient-to-br from-purple-600 to-cyan-600 rounded-3xl flex items-center justify-center relative overflow-hidden"
                        style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)' }}
                    >
                        {currentTrack.cover_art_url ? (
                            <img src={currentTrack.cover_art_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <Music className="w-32 h-32 text-white" />
                        )}
                        
                        {/* TAP HINT */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-4 left-0 right-0 text-center"
                        >
                            <div className="bg-black/80 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-cyan-400/50">
                                <p className="text-cyan-300 text-sm font-bold flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    Tap for full-screen frequency
                                </p>
                            </div>
                        </motion.div>
                    </motion.button>

                    {/* TRACK INFO */}
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-black text-white">{currentTrack.title}</h3>
                        <p className="text-lg md:text-xl text-gray-300">{currentTrack.artist}</p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span className="px-3 py-1 bg-cyan-900/40 border border-cyan-500/30 rounded-full text-sm text-cyan-300">
                                {currentTrack.frequency_type}
                            </span>
                            {currentTrack.bpm && (
                                <span className="px-3 py-1 bg-pink-900/40 border border-pink-500/30 rounded-full text-sm text-pink-300 flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {currentTrack.bpm} BPM
                                </span>
                            )}
                        </div>
                    </div>

                    {/* FREQUENCY FINGERPRINT (kept as it was in original expanded view, not removed by outline) */}
                    {currentTrack.frequency_fingerprint && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-cyan-400 text-center">Frequency Fingerprint™</h3>
                            <FrequencyFingerprint fingerprint={currentTrack.frequency_fingerprint} />
                        </div>
                    )}

                    {/* PLAYBACK CONTROLS */}
                    <div className="flex items-center justify-center gap-6">
                        <button
                            onClick={previous}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                        >
                            <SkipBack className="w-6 h-6 text-white" />
                        </button>

                        <button
                            onClick={isPlaying ? pause : () => play(currentTrack)}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 flex items-center justify-center transition-all"
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-white" />
                            ) : (
                                <Play className="w-8 h-8 text-white ml-1" />
                            )}
                        </button>

                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                        >
                            <SkipForward className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* VOLUME CONTROL + BATTERY SAVER */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <Volume2 className="w-4 h-4" />
                            <span>{Math.round(volume * 100)}%</span>
                        </div>
                        <Slider
                            value={[volume]}
                            onValueChange={(val) => setVolume(val[0])}
                            max={1}
                            step={0.01}
                            className="w-full"
                        />
                        
                        {/* BATTERY SAVER TOGGLE */}
                        <button
                            onClick={() => setLowPowerMode(!lowPowerMode)} // Updated to use setLowPowerMode
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                lowPowerMode 
                                    ? 'bg-green-900/40 border-green-500/50' 
                                    : 'bg-gray-900/40 border-gray-600'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {lowPowerMode ? (
                                    <BatteryCharging className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Battery className="w-5 h-5 text-gray-400" />
                                )}
                                <span className="text-sm text-white">Battery Saver</span>
                            </div>
                            <span className={`text-xs font-bold ${lowPowerMode ? 'text-green-400' : 'text-gray-500'}`}>
                                {lowPowerMode ? 'ON' : 'OFF'}
                            </span>
                        </button>
                        {lowPowerMode && (
                            <p className="text-xs text-green-400 text-center">
                                Visualizations optimized. Audio quality unchanged.
                            </p>
                        )}
                    </div>

                    {/* ACTIONS - WITH BLUETOOTH BEAMING */}
                    <div className="flex gap-3">
                        <Button
                            onClick={handleShare}
                            className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>

                        <Button
                            onClick={() => setShowBeamModal(true)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            <Bluetooth className="w-4 h-4 mr-2" />
                            Beam
                        </Button>

                        {user && ( // User will be null based on current implementation
                            <Button
                                onClick={handleSendLove}
                                className="flex-1 bg-pink-600 hover:bg-pink-700"
                            >
                                <Heart className="w-4 h-4 mr-2" />
                                Send P51
                            </Button>
                        )}
                    </div>

                    {/* VIEW ALL */}
                    <Button
                        onClick={() => {
                            setIsExpanded(false);
                            navigate(createPageUrl('Radio'));
                        }}
                        variant="outline"
                        className="w-full"
                    >
                        View All Frequencies
                    </Button>
                </div>
            </motion.div>

            {showFullScreen && (
                <FullScreenFrequency 
                    isOpen={showFullScreen} 
                    onClose={() => setShowFullScreen(false)} 
                />
            )}

            {/* BLUETOOTH SHARE MODAL */}
            <BluetoothShareModal
                isOpen={showBeamModal} // Updated state name
                onClose={() => setShowBeamModal(false)} // Updated state name
                track={currentTrack}
            />
        </>
    );
}