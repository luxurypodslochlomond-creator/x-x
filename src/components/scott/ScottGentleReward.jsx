import React, { useState, useEffect } from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GENTLE REWARD - NOT GAMEY, JUST LOVE
 * "I see you did that hard thing bro ❤️"
 */

export default function ScottGentleReward({ onComplete }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (onComplete) {
            triggerReward();
        }
    }, [onComplete]);

    const triggerReward = () => {
        const messages = [
            "You did it bro ❤️",
            "That was hard - you smashed it",
            "I see you mate. Well done",
            "Sorted. Proud of you bro",
            "You pushed through ❤️",
            "Hard day but you showed up",
            "You're doing it mate",
            "One step. That matters ❤️",
            "I know that wasn't easy bro",
            "You kept going. That's everything",
            "Small win. Real win ❤️",
            "You matter bro. This matters",
        ];
        
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShow(true);
        
        setTimeout(() => setShow(false), 3000);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="bg-black border-2 border-green-500 px-6 py-4 flex items-center gap-3 shadow-2xl">
                        <Heart className="w-6 h-6 text-green-400 animate-pulse" />
                        <p className="text-white font-mono text-lg">{message}</p>
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}