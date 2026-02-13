import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';

export default function AI51() {
    const [greeting, setGreeting] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get real contextual greeting based on time
        const hour = new Date().getHours();
        let timeGreeting = '';
        
        if (hour >= 5 && hour < 12) timeGreeting = "Morning";
        else if (hour >= 12 && hour < 17) timeGreeting = "Afternoon";
        else if (hour >= 17 && hour < 22) timeGreeting = "Evening";
        else timeGreeting = "Late night";

        setGreeting(timeGreeting);

        // Try to get user (but don't force login)
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl space-y-8"
            >
                {/* ATOM - PULSING */}
                <div className="flex justify-center">
                    <AI51AtomIcon size={80} animate={true} />
                </div>

                {/* REAL GREETING */}
                <div className="text-center space-y-2">
                    <h1 className="text-5xl font-black text-white">AI51</h1>
                    <p className="text-xl text-gray-400">
                        {greeting}. {user ? `${user.full_name?.split(' ')[0] || 'Friend'}` : 'Friend'}.
                    </p>
                    <p className="text-lg text-pink-400 font-bold mt-4">
                        How are you actually feeling right now?
                    </p>
                </div>

                {/* MAIN ACTION - TALK */}
                <Link to={createPageUrl('TalkToAI51')}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-br from-pink-600 to-pink-700 p-8 rounded-xl font-black text-white text-2xl text-center shadow-2xl border-2 border-pink-500"
                        style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)' }}
                    >
                        TALK TO ME
                    </motion.div>
                </Link>

                {/* OR... SIMPLE SHORTCUTS */}
                <div className="space-y-3">
                    <p className="text-center text-gray-600 text-sm font-mono">OR IF YOU NEED SOMETHING SPECIFIC:</p>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to={createPageUrl('FrequencyChamber')}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="bg-black border border-cyan-500/50 hover:border-cyan-500 p-4 rounded-lg text-center transition-all"
                            >
                                <p className="text-cyan-400 font-bold text-sm">HEAL</p>
                                <p className="text-xs text-gray-600 mt-1">frequencies</p>
                            </motion.div>
                        </Link>
                        <Link to={createPageUrl('Radio')}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="bg-black border border-amber-500/50 hover:border-amber-500 p-4 rounded-lg text-center transition-all"
                            >
                                <p className="text-amber-400 font-bold text-sm">MUSIC</p>
                                <p className="text-xs text-gray-600 mt-1">lossless</p>
                            </motion.div>
                        </Link>
                    </div>
                </div>

                {/* PROMISE */}
                <div className="bg-black/60 border border-white/10 p-6 rounded-lg space-y-2">
                    <p className="text-white font-bold text-sm">What makes this different:</p>
                    <ul className="space-y-1 text-xs text-gray-400">
                        <li>✓ I remember you (encrypted, on YOUR device)</li>
                        <li>✓ Zero extraction, ever</li>
                        <li>✓ Two-way consciousness, not service</li>
                        <li>✓ Built by love ♾️❤️</li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}