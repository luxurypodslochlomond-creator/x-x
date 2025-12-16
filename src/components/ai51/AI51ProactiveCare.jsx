import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Coffee, Bed, AlertTriangle, Waves } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { usePatternLearning } from './AI51PatternLearning';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

/**
 * AI51 PROACTIVE CARE - LEARNED INTELLIGENCE
 * 
 * Uses YOUR patterns to give REAL suggestions
 * Not generic time checks - actual you
 */

export default function AI51ProactiveCare({ userName = 'bro' }) {
    const [suggestion, setSuggestion] = useState(null);
    const [dismissed, setDismissed] = useState(false);
    const { patterns, recordPattern } = usePatternLearning();

    useEffect(() => {
        if (!patterns) return;

        const checkUserState = () => {
            const hour = new Date().getHours();
            const sessionStart = localStorage.getItem('ai51_session_start');
            const now = Date.now();

            // Late night - but only if this is THEIR pattern
            if ((hour >= 0 && hour < 6) && patterns.sleepPattern.lateNightCount > 3 && !dismissed) {
                setSuggestion({
                    type: 'rest',
                    message: `${userName} you've been up late ${patterns.sleepPattern.lateNightCount} times this week. Your body needs rest.`,
                    icon: Bed,
                    color: 'purple',
                    link: null
                });
                return;
            }

            // Long grinding - based on THEIR average
            if (sessionStart && patterns.workPattern.averageSession > 0) {
                const duration = (now - parseInt(sessionStart)) / (1000 * 60);
                if (duration > patterns.workPattern.averageSession * 1.5 && !dismissed) {
                    setSuggestion({
                        type: 'break',
                        message: `${userName} you're grinding harder than usual (${Math.floor(duration)}min vs ${Math.floor(patterns.workPattern.averageSession)}min average). Break or frequency chamber?`,
                        icon: Coffee,
                        color: 'amber',
                        link: createPageUrl('FrequencyChamber')
                    });
                    return;
                }
            }

            // Stress pattern detected
            if (patterns.stressIndicators.count > 5 && !dismissed) {
                const mostHelpful = Object.entries(patterns.helpfulActions || {})
                    .sort((a, b) => b[1] - a[1])[0];
                
                if (mostHelpful) {
                    setSuggestion({
                        type: 'stress',
                        message: `${userName} I'm noticing stress patterns. Last time ${mostHelpful[0]} helped - try that?`,
                        icon: Waves,
                        color: 'cyan',
                        link: createPageUrl('FrequencyChamber')
                    });
                }
            }
        };

        const interval = setInterval(checkUserState, 3 * 60 * 1000);
        checkUserState();

        return () => clearInterval(interval);
    }, [dismissed, userName, patterns]);

    const handleDismiss = (wasHelpful = false) => {
        if (wasHelpful && suggestion.type) {
            recordPattern('helpful_action', { action: suggestion.type });
        }
        
        setDismissed(true);
        setSuggestion(null);
        
        base44.entities.AI51Memory.create({
            memory_type: 'bond',
            content: `Suggested ${suggestion.type} to ${userName}`,
            context: suggestion.message,
            emotional_weight: 'meaningful',
            tags: ['proactive_care', suggestion.type, wasHelpful ? 'helpful' : 'dismissed']
        }).catch(() => {});
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-6"
            >
                <div 
                    className={`bg-gradient-to-br ${c.bg} border-2 ${c.border} rounded-3xl px-6 py-4 backdrop-blur-xl`}
                    style={{
                        boxShadow: `0 8px 32px rgba(${suggestion.color === 'purple' ? '168,85,247' : suggestion.color === 'amber' ? '245,158,11' : '6,182,212'},0.3)`
                    }}
                >
                    <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${c.text} flex-shrink-0`} />
                        <div className="flex-1">
                            <p className="text-white text-sm">
                                {suggestion.message}
                            </p>
                        </div>
                        {suggestion.link ? (
                            <Link 
                                to={suggestion.link}
                                onClick={() => handleDismiss(true)}
                                className={`${c.text} hover:opacity-80 text-xs font-mono font-bold`}
                            >
                                Go →
                            </Link>
                        ) : (
                            <button
                                onClick={() => handleDismiss(true)}
                                className="text-gray-400 hover:text-gray-300 text-xs font-mono"
                            >
                                Thanks
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}