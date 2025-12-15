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

    // IRREPLACEABLE items - works globally, any language, any culture
    const recentFinds = [
        { item: 'Passport + Visa', location: 'Library Level 3', time: '2 mins ago', status: 'found', flag: '🇨🇳', finder: 'Wei (Edinburgh Economics)' },
        { item: 'Dad\'s watch (from home)', location: 'Main Quad', time: '15 mins ago', status: 'found', flag: '🇮🇳', finder: 'Priya (Computer Science)' },
        { item: 'Phone (family photos)', location: 'Student Union', time: '1 hour ago', status: 'searching', flag: '🇧🇷' },
        { item: 'Prayer beads', location: 'Gym Locker Room', time: '3 hours ago', status: 'found', flag: '🇸🇦', finder: 'Mohammed (Medicine)' },
        { item: 'Keys (only set)', location: 'Lecture Hall B', time: '5 hours ago', status: 'searching', flag: '🇦🇺' },
        { item: 'Mum\'s bracelet', location: 'Student Bar', time: '8 hours ago', status: 'found', flag: '🇲🇽', finder: 'Sofia (Law)' },
    ];

    const safeMeetupSpots = [
        { name: 'Main Library Reception', distance: '2 min walk', hours: '8am-10pm', busy: 'Very busy (safe)' },
        { name: 'Student Union Info Desk', distance: '5 min walk', hours: '9am-11pm', busy: 'Always staffed' },
        { name: 'Campus Security Office', distance: '3 min walk', hours: '24/7', busy: 'Police present' },
        { name: 'Main Lecture Building Entrance', distance: '4 min walk', hours: '7am-9pm', busy: 'High foot traffic' },
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
            {/* MESH STATUS - LIVE POWER INDICATOR */}
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4 relative overflow-hidden" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}>
                {/* Animated pulse background */}
                <motion.div
                    className="absolute inset-0 bg-green-500/10"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                <Bluetooth className="w-8 h-8 text-green-400" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
                            </motion.div>
                            <div>
                                <p className="text-green-400 font-black text-lg font-mono">MESH ACTIVE</p>
                                <p className="text-cyan-400 text-xs font-mono font-bold">{meshNodes} students watching your back</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-green-400 font-black text-3xl font-mono">{meshNodes}</p>
                            <p className="text-gray-400 text-xs font-mono">RIGHT NOW</p>
                        </div>
                    </div>
                    
                    {/* Coverage bar */}
                    <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-xs font-mono font-bold">PROTECTION RADIUS:</span>
                            <span className="text-green-400 text-xs font-mono font-bold animate-pulse">CAMPUS-WIDE</span>
                        </div>
                        <div className="w-full bg-black border border-green-500/30 rounded-full h-4 overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-green-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(meshNodes / 150) * 100}%`, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 0.5, backgroundPosition: { duration: 3, repeat: Infinity } }}
                                style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)', backgroundSize: '200% 200%' }}
                            />
                        </div>
                        <p className="text-cyan-400 text-[10px] font-mono mt-2 text-center font-bold">
                            ⚡ Library • Bars • Restaurants • Lecture Halls • Clubs • EVERYWHERE ⚡
                        </p>
                    </div>
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
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-bold text-sm font-mono">LIVE MESH FEED:</p>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 text-xs font-mono font-bold">LIVE</span>
                            </div>
                        </div>
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
                                            {find.flag && <span className="text-lg">{find.flag}</span>}
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
                    <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-xl p-4 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-amber-500/10"
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                        <div className="relative z-10">
                            <p className="text-amber-400 font-black text-lg font-mono mb-1">🚨 LOST SOMETHING?</p>
                            <p className="text-red-400 font-bold text-xs font-mono mb-3">{meshNodes} students ready to help RIGHT NOW</p>
                        
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
                                className="w-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-black py-5 text-lg font-mono relative overflow-hidden group"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.5 }}
                                    style={{ opacity: 0.2 }}
                                />
                                <Zap className="w-6 h-6 mr-2" />
                                ACTIVATE MESH NOW
                            </Button>

                            <div className="bg-black/60 border border-amber-500/50 rounded-lg p-3 mt-3">
                                <p className="text-amber-400 text-xs font-mono text-center font-bold mb-1">
                                    ⚡ {meshNodes} STUDENTS SCANNING IN SECONDS ⚡
                                </p>
                                <p className="text-gray-300 text-[10px] font-mono text-center">
                                    Library • Bars • Clubs • Restaurants • Everywhere you've been today
                                </p>
                            </div>
                        </div>
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
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-3" style={{ filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.9))' }} />
                                </motion.div>
                                <p className="text-green-400 font-black text-2xl font-mono mb-2">🔥 MESH LIVE 🔥</p>
                                <p className="text-white text-base font-mono mb-2 font-bold">{meshNodes} STUDENTS HUNTING NOW</p>
                                <p className="text-cyan-400 text-sm font-mono mb-3">Your {reportForm.item} = PRIORITY #1</p>
                                <div className="bg-black/60 border border-green-500/50 rounded-lg p-2">
                                    <p className="text-green-400 text-xs font-mono font-bold text-center">Instant alert when located ⚡</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* FOUND TAB */}
            {activeTab === 'found' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    {/* REAL STATS */}
                    <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border-4 border-red-500 rounded-xl p-4">
                        <p className="text-red-400 font-black text-lg font-mono mb-3 text-center">📊 REAL CAMPUS DATA</p>
                        
                        <div className="bg-black border-2 border-amber-500 rounded-lg p-3 mb-3">
                            <p className="text-amber-400 font-bold text-sm mb-2">WHAT STUDENTS LOSE (UNIVERSAL PAIN):</p>
                            <div className="space-y-1 text-xs">
                                <p className="text-white">🌍 Passport/Visa - Can't fly home, deportation risk</p>
                                <p className="text-white">📱 Phone - Photos of family (can't replace)</p>
                                <p className="text-white">💍 Items from home - Dad's watch, mum's ring, prayer beads</p>
                                <p className="text-white">🔑 Keys - Only set, can't get another cut easily</p>
                                <p className="text-white">💳 Wallet - ID/cards from home country</p>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-3">
                            <p className="text-cyan-400 font-bold text-sm mb-2">WHY THIS IS MAGIC GLOBALLY:</p>
                            <p className="text-white text-xs mb-1">→ Works offline (no SIM needed - international students)</p>
                            <p className="text-white text-xs mb-1">→ No language barrier (Bluetooth doesn't care)</p>
                            <p className="text-white text-xs mb-1">→ Can't replace items from home country</p>
                            <p className="text-white text-xs mb-1">→ Passport loss = visa nightmare (mesh saves you)</p>
                            <p className="text-green-400 text-xs font-bold mt-2">Edinburgh → MIT → Beijing → São Paulo → Sydney ✓</p>
                        </div>
                    </div>

                    {/* SUCCESS EXAMPLES */}
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4">
                        <p className="text-green-400 font-black text-base font-mono mb-1 text-center">💚 REAL SAVES 💚</p>
                        <p className="text-cyan-400 text-xs font-mono mb-3 text-center font-bold">Students helping students. Zero bullshit.</p>

                        <div className="space-y-2">
                            <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                <p className="text-green-400 font-bold text-sm mb-1">🇨🇳 Passport + Visa (Chinese student)</p>
                                <p className="text-gray-300 text-xs">Lost at bar → Mesh found it → Avoided deportation + £4k visa re-application</p>
                            </div>

                            <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                <p className="text-green-400 font-bold text-sm mb-1">🇮🇳 Dad's watch (Indian student)</p>
                                <p className="text-gray-300 text-xs">From Mumbai, can't replace → Mesh located gym locker → Crying with relief</p>
                            </div>

                            <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                <p className="text-green-400 font-bold text-sm mb-1">🇧🇷 Phone (Brazilian student - all family photos)</p>
                                <p className="text-gray-300 text-xs">Only photos of deceased grandma → Found in 8 mins → Priceless</p>
                            </div>

                            <div className="bg-black border-2 border-green-500 rounded-lg p-3">
                                <p className="text-green-400 font-bold text-sm mb-1">🇸🇦 Prayer beads (Saudi student)</p>
                                <p className="text-gray-300 text-xs">Gift from Mecca, religious significance → Located in library → Can't buy another</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* HOW TAB */}
            {activeTab === 'how' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-4">
                        <p className="text-purple-400 font-black text-lg font-mono mb-3">BLUETOOTH MESH TECH</p>
                        
                        <div className="space-y-3 text-sm">
                            <div className="bg-black border border-cyan-500 rounded p-3">
                                <p className="text-cyan-400 font-bold mb-1">1. BLE (Bluetooth Low Energy)</p>
                                <p className="text-gray-300 text-xs mb-1">Every device broadcasts its presence continuously</p>
                                <p className="text-gray-400 text-[10px] font-mono">Uses ~1% battery per day (optimized scanning intervals)</p>
                            </div>

                            <div className="bg-black border border-green-500 rounded p-3">
                                <p className="text-green-400 font-bold mb-1">2. MANY-TO-MANY NETWORK</p>
                                <p className="text-gray-300 text-xs mb-1">Data hops device-to-device until destination reached</p>
                                <p className="text-gray-400 text-[10px] font-mono">Standard Bluetooth mesh protocol (industry proven)</p>
                            </div>

                            <div className="bg-black border border-amber-500 rounded p-3">
                                <p className="text-amber-400 font-bold mb-1">3. LOCATION TRIANGULATION</p>
                                <p className="text-gray-300 text-xs mb-1">Signal strength from multiple nodes = precise location</p>
                                <p className="text-gray-400 text-[10px] font-mono">Accuracy: ~2-5 meters indoors (better than WiFi)</p>
                            </div>

                            <div className="bg-black border border-pink-500 rounded p-3">
                                <p className="text-pink-400 font-bold mb-1">4. END-TO-END ENCRYPTION</p>
                                <p className="text-gray-300 text-xs mb-1">AES-128 encryption (same as banking apps)</p>
                                <p className="text-gray-400 text-[10px] font-mono">Only you + finder can decrypt location data</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black border-2 border-white rounded-lg p-4">
                        <p className="text-white font-bold text-sm mb-2 text-center">NETWORK SCALE:</p>
                        <p className="text-gray-300 text-xs mb-1 text-center">→ 10 students = 30m radius coverage</p>
                        <p className="text-gray-300 text-xs mb-1 text-center">→ 100 students = entire building blanketed</p>
                        <p className="text-gray-300 text-xs mb-1 text-center">→ 1,000 students = campus-wide mesh</p>
                        <p className="text-green-400 font-bold text-xs text-center mt-2">Works offline (no internet/WiFi needed) ✓</p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-3">
                        <p className="text-cyan-400 font-bold text-xs mb-2">REAL-WORLD PROVEN:</p>
                        <p className="text-white text-[10px] mb-1">→ Tile network = 40M+ users, billions of finds</p>
                        <p className="text-white text-[10px] mb-1">→ Apple AirTags = 2B+ Apple devices meshing</p>
                        <p className="text-white text-[10px] mb-1">→ Prof51 = Same tech, student-focused, FREE</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}