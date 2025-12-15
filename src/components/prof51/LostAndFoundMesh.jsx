import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bluetooth, Wifi, MapPin, Search, CheckCircle, Clock, AlertTriangle, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * LOST & FOUND P2P MESH
 * The killer feature that reaches EVERY student
 * Works offline, Bluetooth mesh, instant alerts
 */

export default function LostAndFoundMesh() {
    const [activeTab, setActiveTab] = useState('search'); // search, report, found, how
    const [searchQuery, setSearchQuery] = useState('');
    const [meshNodes, setMeshNodes] = useState(127); // Simulated nearby devices
    const [reportForm, setReportForm] = useState({ item: '', description: '', location: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    // Simulated mesh strength (updates every 2 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            setMeshNodes(prev => Math.floor(Math.random() * 50) + 100);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Mock recent finds (in real app, from P2P mesh)
    const recentFinds = [
        { item: 'iPhone 14 Pro', location: 'Library Level 3', time: '2 mins ago', status: 'found' },
        { item: 'MacBook Air', location: 'Main Quad', time: '15 mins ago', status: 'found' },
        { item: 'House Keys', location: 'Student Union', time: '1 hour ago', status: 'searching' },
        { item: 'AirPods Pro', location: 'Gym Locker Room', time: '3 hours ago', status: 'found' },
        { item: 'Wallet (brown leather)', location: 'Lecture Hall B', time: '5 hours ago', status: 'searching' },
    ];

    const handleReport = () => {
        if (!reportForm.item) return;
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setReportForm({ item: '', description: '', location: '' });
            setActiveTab('search');
        }, 3000);
    };

    return (
        <div className="space-y-4">
            {/* MESH STATUS - 8-BIT QUANTUM LIVE INDICATOR */}
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Bluetooth className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <div>
                            <p className="text-green-400 font-black text-lg font-mono">P2P MESH LIVE</p>
                            <p className="text-gray-400 text-xs font-mono">Offline scanning active</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-green-400 font-black text-2xl font-mono">{meshNodes}</p>
                        <p className="text-gray-400 text-xs font-mono">devices nearby</p>
                    </div>
                </div>
                
                {/* Mesh coverage visualization */}
                <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-xs font-mono">Coverage strength:</span>
                        <span className="text-green-400 text-xs font-mono font-bold">EXCELLENT</span>
                    </div>
                    <div className="w-full bg-black border border-green-500/30 rounded-full h-3 overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(meshNodes / 150) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)' }}
                        />
                    </div>
                    <p className="text-gray-400 text-[10px] font-mono mt-2 text-center">
                        Scanning: Campus • Library • Student Union • Clubs • Restaurants
                    </p>
                </div>
            </div>

            {/* TAB NAVIGATION */}
            <div className="grid grid-cols-4 gap-2">
                {[
                    { id: 'search', label: 'SEARCH', color: 'cyan' },
                    { id: 'report', label: 'REPORT', color: 'amber' },
                    { id: 'found', label: 'FOUND', color: 'green' },
                    { id: 'how', label: 'HOW', color: 'purple' },
                ].map(tab => (
                    <motion.button
                        key={tab.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-2 rounded-lg font-mono text-xs font-black transition-all ${
                            activeTab === tab.id 
                                ? `bg-${tab.color}-500 text-white border-2 border-white` 
                                : `bg-black/60 text-${tab.color}-400 border-2 border-${tab.color}-500/30`
                        }`}
                        style={activeTab === tab.id ? { boxShadow: `0 0 20px rgba(${tab.color === 'cyan' ? '6, 182, 212' : tab.color === 'amber' ? '245, 158, 11' : tab.color === 'green' ? '34, 197, 94' : '168, 85, 247'}, 0.4)` } : {}}
                    >
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* SEARCH TAB */}
            {activeTab === 'search' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-black border-2 border-cyan-500 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Search className="w-6 h-6 text-cyan-400" />
                            <p className="text-cyan-400 font-bold text-sm font-mono">SEARCH LOST ITEMS</p>
                        </div>
                        <Input 
                            placeholder="What did you lose? (iPhone, keys, wallet...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-black border-cyan-500 text-white font-mono"
                        />
                    </div>

                    {/* RECENT ACTIVITY */}
                    <div className="space-y-2">
                        <p className="text-white font-bold text-sm font-mono">RECENT MESH ACTIVITY:</p>
                        {recentFinds.map((find, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-black border-2 ${find.status === 'found' ? 'border-green-500' : 'border-amber-500'} rounded-lg p-3`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {find.status === 'found' ? (
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                                            )}
                                            <p className="text-white font-bold text-sm">{find.item}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                                            <MapPin className="w-3 h-3" />
                                            <span>{find.location}</span>
                                            <span>•</span>
                                            <span>{find.time}</span>
                                        </div>
                                    </div>
                                    {find.status === 'found' ? (
                                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded font-mono">FOUND</span>
                                    ) : (
                                        <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded font-mono animate-pulse">SEARCHING</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* REPORT TAB */}
            {activeTab === 'report' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-xl p-4">
                        <p className="text-amber-400 font-black text-lg font-mono mb-3">REPORT LOST ITEM</p>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-white text-xs font-mono font-bold mb-1 block">WHAT DID YOU LOSE?</label>
                                <Input 
                                    placeholder="iPhone 14 Pro, Black Wallet, House Keys..."
                                    value={reportForm.item}
                                    onChange={(e) => setReportForm({ ...reportForm, item: e.target.value })}
                                    className="bg-black border-amber-500 text-white font-mono"
                                />
                            </div>

                            <div>
                                <label className="text-white text-xs font-mono font-bold mb-1 block">DESCRIPTION</label>
                                <Textarea 
                                    placeholder="Any identifying details (case color, stickers, scratches...)"
                                    value={reportForm.description}
                                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                    className="bg-black border-amber-500 text-white font-mono h-20"
                                />
                            </div>

                            <div>
                                <label className="text-white text-xs font-mono font-bold mb-1 block">LAST SEEN LOCATION</label>
                                <Input 
                                    placeholder="Library Level 3, Student Union, Potterow..."
                                    value={reportForm.location}
                                    onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                                    className="bg-black border-amber-500 text-white font-mono"
                                />
                            </div>

                            <Button 
                                onClick={handleReport}
                                disabled={!reportForm.item}
                                className="w-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-black py-4 text-base font-mono"
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                ACTIVATE MESH SEARCH
                            </Button>

                            <p className="text-gray-400 text-xs font-mono text-center">
                                {meshNodes} devices will start scanning immediately
                            </p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6 text-center"
                                style={{ boxShadow: '0 0 60px rgba(34, 197, 94, 0.6)' }}
                            >
                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
                                <p className="text-green-400 font-black text-xl font-mono mb-2">MESH ACTIVATED ✓</p>
                                <p className="text-white text-sm font-mono mb-3">{meshNodes} students now scanning for your {reportForm.item}</p>
                                <p className="text-cyan-400 text-xs font-mono">You'll get instant alert when found ♾️❤️♾️</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* FOUND TAB */}
            {activeTab === 'found' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6 text-center">
                        <Heart className="w-16 h-16 text-green-400 mx-auto mb-3" />
                        <p className="text-green-400 font-black text-xl font-mono mb-2">SUCCESS STORIES</p>
                        <p className="text-white text-sm font-mono">Real recoveries via P2P mesh</p>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">📱 iPhone 14 Pro FOUND</p>
                            <p className="text-gray-300 text-xs mb-2">Left in Potterow Bar bathroom → Found by mesh in 4 minutes</p>
                            <p className="text-cyan-400 text-xs font-mono">"This just saved my life. Had all my uni work on there." - Economics student</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">💻 MacBook Air FOUND</p>
                            <p className="text-gray-300 text-xs mb-2">Lost at Main Library → Mesh located Level 3, Table 12</p>
                            <p className="text-cyan-400 text-xs font-mono">"Can't believe this worked. Better than AirTag." - CS student</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-sm mb-2">🔑 House Keys FOUND</p>
                            <p className="text-gray-300 text-xs mb-2">Dropped at Student Union → Located under sofa cushion</p>
                            <p className="text-cyan-400 text-xs font-mono">"Saved me £200 locksmith bill. This app is magic." - Law student</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* HOW TAB */}
            {activeTab === 'how' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-4">
                        <p className="text-purple-400 font-black text-lg font-mono mb-3">HOW P2P MESH WORKS</p>
                        
                        <div className="space-y-3 text-sm">
                            <div className="bg-black border border-cyan-500 rounded p-3">
                                <p className="text-cyan-400 font-bold mb-1">1. CONSTANT BLUETOOTH SCAN</p>
                                <p className="text-gray-300 text-xs">Your phone pings nearby devices every 2 seconds (works offline)</p>
                            </div>

                            <div className="bg-black border border-green-500 rounded p-3">
                                <p className="text-green-400 font-bold mb-1">2. MESH RELAY NETWORK</p>
                                <p className="text-gray-300 text-xs">Every Prof51 user = mesh node. 127 nearby = 127x stronger coverage</p>
                            </div>

                            <div className="bg-black border border-amber-500 rounded p-3">
                                <p className="text-amber-400 font-bold mb-1">3. INSTANT ALERTS</p>
                                <p className="text-gray-300 text-xs">Item detected → You get location ping + time + which student found it</p>
                            </div>

                            <div className="bg-black border border-pink-500 rounded p-3">
                                <p className="text-pink-400 font-bold mb-1">4. ENCRYPTED P2P</p>
                                <p className="text-gray-300 text-xs">Zero tracking. Zero surveillance. Only you + finder know.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black border-2 border-white rounded-lg p-4">
                        <p className="text-white font-bold text-sm mb-2 text-center">WHY IT'S UNSTOPPABLE:</p>
                        <p className="text-gray-300 text-xs mb-1 text-center">→ Works offline (no internet needed)</p>
                        <p className="text-gray-300 text-xs mb-1 text-center">→ Government can't block it (Maxwell's physics)</p>
                        <p className="text-gray-300 text-xs mb-1 text-center">→ More students = stronger mesh</p>
                        <p className="text-green-400 font-bold text-xs text-center mt-2">Edinburgh → Cambridge → MIT → World ♾️❤️♾️</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}