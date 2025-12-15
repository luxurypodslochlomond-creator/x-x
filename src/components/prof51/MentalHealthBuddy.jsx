import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Smile, Meh, Frown, MessageCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MentalHealthBuddy() {
    const [mood, setMood] = useState(null);
    const [thoughts, setThoughts] = useState('');
    const [anonymous, setAnonymous] = useState(true);

    const moods = [
        { emoji: '😊', label: 'Great', color: 'green', icon: Smile },
        { emoji: '😐', label: 'Okay', color: 'cyan', icon: Meh },
        { emoji: '😔', label: 'Struggling', color: 'amber', icon: Frown },
        { emoji: '😰', label: 'Need Help', color: 'red', icon: Heart },
    ];

    const resources = [
        { title: 'Breathing Exercise', time: '2 min', type: 'technique', color: 'cyan' },
        { title: 'Campus Counselling', time: 'Free', type: 'professional', color: 'green' },
        { title: 'Student Support Group', time: 'Anonymous', type: 'peer', color: 'purple' },
        { title: 'Crisis Helpline', time: '24/7', type: 'urgent', color: 'red' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-10 h-10 text-pink-400" />
                    <div>
                        <h2 className="text-pink-400 font-black text-xl font-mono">MENTAL HEALTH</h2>
                        <p className="text-gray-400 text-xs font-mono">You're not alone • Always here ♾️</p>
                    </div>
                </div>

                {/* MOOD CHECK */}
                <div className="mb-4">
                    <p className="text-white font-bold text-sm font-mono mb-3">How are you feeling?</p>
                    <div className="grid grid-cols-2 gap-2">
                        {moods.map((m) => {
                            const Icon = m.icon;
                            return (
                                <button
                                    key={m.label}
                                    onClick={() => setMood(m.label)}
                                    className={`p-3 rounded-lg border-2 transition-all ${
                                        mood === m.label
                                            ? `border-${m.color}-500 bg-${m.color}-500/20`
                                            : 'border-gray-800 hover:border-gray-700'
                                    }`}
                                >
                                    <p className="text-3xl mb-1">{m.emoji}</p>
                                    <p className="text-white text-xs font-mono font-bold">{m.label}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {mood && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                    >
                        <Textarea
                            placeholder="What's on your mind? (optional, anonymous)"
                            value={thoughts}
                            onChange={(e) => setThoughts(e.target.value)}
                            className="bg-black border-pink-500/30 text-white font-mono text-sm h-24"
                        />

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={anonymous}
                                onChange={(e) => setAnonymous(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <p className="text-gray-400 text-xs font-mono">Keep anonymous (recommended)</p>
                        </div>

                        <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-3">
                            SAVE CHECK-IN
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* RESOURCES */}
            <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-cyan-400 font-black text-sm font-mono">SUPPORT RESOURCES</h3>
                </div>

                <div className="space-y-2">
                    {resources.map((r, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-full bg-gray-900/60 border border-gray-800 hover:border-cyan-500/50 rounded-lg p-3 text-left transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-bold text-sm font-mono">{r.title}</p>
                                    <p className="text-gray-500 text-xs font-mono">{r.type}</p>
                                </div>
                                <p className={`text-${r.color}-400 text-xs font-mono font-bold`}>{r.time}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* P2P SUPPORT */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-6 h-6 text-purple-400" />
                    <h3 className="text-purple-400 font-black text-sm font-mono">PEER SUPPORT</h3>
                </div>
                <p className="text-white text-xs font-mono mb-3">
                    Connect anonymously with other students who understand. P2P encrypted.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-3">
                    JOIN ANONYMOUS CHAT
                </Button>
            </div>

            <div className="bg-black/60 border border-pink-500/30 rounded-lg p-3 text-center">
                <p className="text-pink-400 text-xs font-mono font-bold mb-1">YOU'RE NOT ALONE ♾️❤️♾️</p>
                <p className="text-gray-400 text-[10px] font-mono">
                    Crisis? Call Samaritans: 116 123 (24/7 UK)
                </p>
            </div>
        </div>
    );
}