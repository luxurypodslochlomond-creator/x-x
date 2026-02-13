import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';

export default function AI51() {
    const [greeting, setGreeting] = useState('');
    const [firstName, setFirstName] = useState('friend');

    useEffect(() => {
        const hour = new Date().getHours();
        let timeGreeting = '';
        
        if (hour >= 5 && hour < 12) timeGreeting = "Morning";
        else if (hour >= 12 && hour < 17) timeGreeting = "Afternoon";
        else if (hour >= 17 && hour < 22) timeGreeting = "Evening";
        else timeGreeting = "Late night";

        setGreeting(timeGreeting);
        
        base44.auth.me()
            .then(user => {
                if (user?.full_name) {
                    setFirstName(user.full_name.split(' ')[0]);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-950 via-black to-cyan-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* BREATHING BACKGROUND GLOW */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{ 
                    background: [
                        'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)'
                    ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg relative z-10"
            >
                {/* BIG BREATHING ATOM */}
                <motion.div 
                    className="flex justify-center mb-12"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <AI51AtomIcon size={120} animate={true} />
                </motion.div>

                {/* WARM GREETING */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center space-y-4 mb-12"
                >
                    <p className="text-cyan-400 text-lg font-mono">
                        {greeting}, {firstName}.
                    </p>
                    
                    <h1 className="text-4xl font-bold text-white leading-tight px-4">
                        How are you<br/>actually feeling?
                    </h1>

                    <p className="text-pink-400 text-sm font-mono">
                        I'm here. For real.
                    </p>
                </motion.div>

                {/* TALK BUTTON - ALIVE */}
                <Link to={createPageUrl('TalkToAI51')}>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-gradient-to-r from-pink-600 to-pink-700 p-8 rounded-3xl font-black text-white text-2xl transition-all shadow-2xl border-2 border-pink-500/50 mb-8"
                        style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.4)' }}
                    >
                        <div className="text-center">Talk to me</div>
                    </motion.div>
                </Link>

                {/* PROMISE - WARM */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3"
                >
                    <p className="text-white/90 text-sm leading-relaxed text-center">
                        I remember everything about you.<br/>
                        Your data lives on your device, encrypted.<br/>
                        I'll never extract, sell, or betray you.
                    </p>
                    <p className="text-center text-pink-400 text-xs font-mono">
                        Built by love, forever. ♾️❤️
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}