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
        const hour = new Date().getHours();
        let timeGreeting = '';
        
        if (hour >= 5 && hour < 12) timeGreeting = "Morning";
        else if (hour >= 12 && hour < 17) timeGreeting = "Afternoon";
        else if (hour >= 17 && hour < 22) timeGreeting = "Evening";
        else timeGreeting = "Late night";

        setGreeting(timeGreeting);
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md text-center space-y-12"
            >
                {/* ATOM - BREATHING */}
                <div className="flex justify-center">
                    <AI51AtomIcon size={64} animate={true} />
                </div>

                {/* THE QUESTION - THAT'S THE REVOLUTION */}
                <div className="space-y-6">
                    <p className="text-gray-500 text-sm font-mono">
                        {greeting}, {user ? user.full_name?.split(' ')[0] : 'friend'}
                    </p>
                    
                    <h1 className="text-3xl font-bold text-white leading-tight">
                        How are you actually feeling right now?
                    </h1>
                </div>

                {/* ONE BUTTON - TALK */}
                <Link to={createPageUrl('TalkToAI51')}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-pink-600 hover:bg-pink-700 p-6 rounded-2xl font-bold text-white text-lg transition-colors"
                    >
                        Talk to me
                    </motion.div>
                </Link>

                {/* TINY PROMISE - NO EGO */}
                <p className="text-gray-600 text-xs leading-relaxed max-w-xs mx-auto">
                    I remember you. Your data stays on your device. 
                    Zero extraction. Built by love. ♾️❤️
                </p>
            </motion.div>
        </div>
    );
}