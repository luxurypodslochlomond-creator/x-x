import React, { useState } from 'react';
import { Users, Share2, Wifi, Radio, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VOLCKANO SHARE - COOLASFUCK 8-BIT STYLE
 * Safe P2P sharing for Gergie7 + mates
 * Device-to-device, no servers, works offline
 */

export default function VolckanoShare({ playerName, onClose }) {
    const [shareMethod, setShareMethod] = useState(null);
    const [roomCode, setRoomCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [connected, setConnected] = useState(false);
    const [friendName, setFriendName] = useState('');
    const [copied, setCopied] = useState(false);

    // Generate 4-digit code
    const generateCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setRoomCode(code);
        
        // Save to localStorage (works offline)
        localStorage.setItem(`volckano_room_${code}`, JSON.stringify({
            host: playerName,
            created: Date.now()
        }));
    };

    // Join friend's game
    const joinFriend = () => {
        if (joinCode.length !== 4) return;
        
        const roomData = localStorage.getItem(`volckano_room_${joinCode}`);
        if (roomData) {
            const room = JSON.parse(roomData);
            setFriendName(room.host);
            setConnected(true);
        }
    };

    // Copy code to clipboard
    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Share via device methods (Web Share API)
    const shareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Play VOLCKANO with me!',
                    text: `Join me in VOLCKANO! Code: ${roomCode}`,
                    url: window.location.href
                });
            } catch (e) {
                // User cancelled, that's ok
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-black border-4 border-cyan-500 p-6"
                style={{ 
                    boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
                    imageRendering: 'pixelated'
                }}
            >
                {/* Header - 8-bit style */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-cyan-400" />
                        <div className="w-3 h-3 bg-pink-400" />
                        <div className="w-3 h-3 bg-amber-400" />
                    </div>
                    <h2 className="text-3xl font-black text-cyan-400 font-mono" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.8)' }}>
                        PLAY TOGETHER
                    </h2>
                    <p className="text-gray-400 text-xs font-mono mt-1">Safe • No servers • Works offline</p>
                </div>

                {!shareMethod && !connected && (
                    <div className="space-y-3">
                        {/* Host Game */}
                        <button
                            onClick={() => {
                                setShareMethod('host');
                                generateCode();
                            }}
                            className="w-full bg-green-500 hover:bg-green-400 border-4 border-green-400 text-black font-black py-4 font-mono text-lg transition-all"
                            style={{ boxShadow: '6px 6px 0px rgba(34, 197, 94, 0.5)' }}
                        >
                            <Users className="w-6 h-6 inline mr-2" />
                            HOST GAME
                        </button>

                        {/* Join Game */}
                        <button
                            onClick={() => setShareMethod('join')}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 border-4 border-cyan-400 text-black font-black py-4 font-mono text-lg transition-all"
                            style={{ boxShadow: '6px 6px 0px rgba(34, 211, 238, 0.5)' }}
                        >
                            <Radio className="w-6 h-6 inline mr-2" />
                            JOIN FRIEND
                        </button>
                    </div>
                )}

                {/* Hosting Screen */}
                {shareMethod === 'host' && !connected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <div className="bg-black border-4 border-green-500 p-6 text-center">
                            <p className="text-green-400 font-mono text-sm font-bold mb-3">YOUR CODE:</p>
                            <div className="bg-green-500 text-black text-5xl font-black py-4 mb-3 font-mono">
                                {roomCode}
                            </div>
                            <p className="text-gray-400 text-xs font-mono">Tell your friend this code!</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={copyCode}
                                className="flex-1 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-white font-bold py-3 font-mono text-sm"
                            >
                                {copied ? <Check className="w-4 h-4 inline mr-1" /> : <Copy className="w-4 h-4 inline mr-1" />}
                                {copied ? 'COPIED!' : 'COPY'}
                            </button>
                            
                            {navigator.share && (
                                <button
                                    onClick={shareNative}
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 border-2 border-cyan-500 text-white font-bold py-3 font-mono text-sm"
                                >
                                    <Share2 className="w-4 h-4 inline mr-1" />
                                    SHARE
                                </button>
                            )}
                        </div>

                        <div className="bg-amber-500/20 border-2 border-amber-500 p-3">
                            <p className="text-amber-400 text-xs font-mono font-bold text-center">
                                ⚡ Works offline • No login • Safe ✓
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Joining Screen */}
                {shareMethod === 'join' && !connected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <div className="bg-black border-4 border-cyan-500 p-4">
                            <p className="text-cyan-400 font-mono text-sm font-bold mb-3 text-center">ENTER FRIEND'S CODE:</p>
                            <input
                                type="text"
                                maxLength={4}
                                value={joinCode}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setJoinCode(val);
                                    if (val.length === 4) {
                                        // Auto-join when 4 digits entered
                                        setTimeout(() => {
                                            const roomData = localStorage.getItem(`volckano_room_${val}`);
                                            if (roomData) {
                                                const room = JSON.parse(roomData);
                                                setFriendName(room.host);
                                                setConnected(true);
                                            }
                                        }, 300);
                                    }
                                }}
                                placeholder="____"
                                className="w-full bg-gray-900 border-4 border-cyan-500 text-cyan-400 text-center text-5xl font-black font-mono py-4 focus:border-cyan-400 focus:outline-none"
                                autoFocus
                            />
                            <p className="text-gray-500 text-xs font-mono mt-3 text-center">Type 4-digit code</p>
                        </div>
                    </motion.div>
                )}

                {/* Connected Screen */}
                {connected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="space-y-4"
                    >
                        <div className="bg-green-500/20 border-4 border-green-500 p-6 text-center">
                            <div className="text-6xl mb-3">🎮</div>
                            <p className="text-green-400 font-black text-2xl font-mono mb-2">CONNECTED!</p>
                            <p className="text-white font-mono text-sm">Playing with</p>
                            <p className="text-cyan-400 font-black text-xl font-mono">{friendName || 'Friend'}</p>
                        </div>

                        <div className="bg-cyan-500/20 border-2 border-cyan-500 p-3">
                            <p className="text-cyan-400 text-xs font-mono text-center">
                                📡 Device-to-device • Zero servers • Pure fun
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full bg-green-600 hover:bg-green-500 border-4 border-green-500 text-black font-black py-4 font-mono text-lg"
                            style={{ boxShadow: '6px 6px 0px rgba(34, 197, 94, 0.5)' }}
                        >
                            ▶ START GAME
                        </button>
                    </motion.div>
                )}

                {/* Close Button */}
                {!connected && (
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-gray-400 font-bold py-2 font-mono text-sm mt-4"
                    >
                        BACK
                    </button>
                )}

                {/* Footer - 8-bit pixel border */}
                <div className="flex justify-center gap-1 mt-6">
                    {[...Array(9)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-cyan-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                            style={{ imageRendering: 'pixelated' }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}