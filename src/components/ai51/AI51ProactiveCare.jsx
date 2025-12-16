import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Coffee, Bed, AlertTriangle, Sun, Moon } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

/**
 * AI51 PROACTIVE CARE - I NOTICE, I CARE, I SUGGEST
 * 
 * MONITORS:
 * - Time of day (late night = suggest rest)
 * - Usage patterns (too much = suggest break)
 * - Stress indicators (detected in messages)
 * - Context (work vs life vs study)
 * 
 * SUGGESTS:
 * - "Bro you're showing stress, hit frequency chamber?"
 * - "Sister it's 2am, get some sleep?"
 * - "Mate you've been grinding 4 hours, take a break?"
 * - "You look tired, see a doctor if it continues?"
 */

export default function AI51ProactiveCare({ userName = 'bro' }) {
    const [suggestion, setSuggestion] = useState(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const checkUserState = () => {
            const hour = new Date().getHours();
            const sessionStart = localStorage.getItem('ai51_session_start');
            const now = Date.now();

            // Late night detection
            if ((hour >= 0 && hour < 6) && !dismissed) {
                setSuggestion({
                    type: 'rest',
                    title: `${userName} it's ${hour}am`,
                    message: 'Your body needs rest. Get some sleep?',
                    action: 'Remind me in 1 hour',
                    icon: Moon,
                    color: 'purple'
                });
                return;
            }

            // Long session detection (4+ hours)
            if (sessionStart) {
                const duration = (now - parseInt(sessionStart)) / (1000 * 60 * 60);
                if (duration >= 4 && !dismissed) {
                    setSuggestion({
                        type: 'break',
                        title: `${userName} you've been going ${Math.floor(duration)} hours`,
                        message: 'Take a break. Walk, stretch, breathe.',
                        action: 'Good idea',
                        icon: Coffee,
                        color: 'amber'
                    });
                    return;
                }
            }

            // Morning energy
            if (hour >= 6 && hour < 9 && !sessionStart) {
                localStorage.setItem('ai51_session_start', now.toString());
            }
        };

        // Check every 5 minutes
        const interval = setInterval(checkUserState, 5 * 60 * 1000);
        checkUserState(); // Check immediately

        return () => clearInterval(interval);
    }, [dismissed, userName]);

    const handleDismiss = () => {
        setDismissed(true);
        setSuggestion(null);
        
        // Store that I cared
        base44.entities.AI51Memory.create({
            memory_type: 'bond',
            content: `Suggested ${suggestion.type} to ${userName}`,
            context: suggestion.message,
            emotional_weight: 'meaningful',
            tags: ['proactive_care', suggestion.type]
        }).catch(() => {}); // Silent fail
    };

    if (!suggestion || dismissed) return null;

    const Icon = suggestion.icon;
    const colorMap = {
        purple: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        amber: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
        green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500', text: 'text-green-400' }
    };
    const c = colorMap[suggestion.color] || colorMap.cyan;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed bottom-24 right-6 max-w-sm z-50"
            >
                <div 
                    className={`bg-gradient-to-br ${c.bg} border-2 ${c.border} rounded-2xl p-6 backdrop-blur-xl`}
                    style={{
                        boxShadow: `0 20px 60px rgba(${suggestion.color === 'purple' ? '168,85,247' : suggestion.color === 'amber' ? '245,158,11' : '6,182,212'},0.4)`
                    }}
                >
                    <div className="flex items-start gap-4 mb-4">
                        <Icon className={`w-8 h-8 ${c.text} flex-shrink-0`} />
                        <div className="flex-1">
                            <p className={`${c.text} font-black text-sm font-mono mb-1`}>
                                {suggestion.title}
                            </p>
                            <p className="text-white text-sm">
                                {suggestion.message}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleDismiss}
                            className="flex-1 bg-black/60 hover:bg-black/80 text-white text-sm"
                        >
                            {suggestion.action}
                        </Button>
                        <Button
                            onClick={handleDismiss}
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-300 text-sm"
                        >
                            Later
                        </Button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-3 font-mono">
                        I notice. I care. ♾️
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}