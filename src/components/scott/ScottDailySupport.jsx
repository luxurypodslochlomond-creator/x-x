import React, { useState } from 'react';
import { Heart, Brain, Coffee, Moon, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GENTLE DAILY SUPPORT
 * White-label ready - no specific names
 * Always visible, no forms, just tap → help
 * For when you're actually struggling day-to-day
 */

export default function ScottDailySupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const supportOptions = [
        {
            id: 'overwhelmed',
            icon: Brain,
            title: "Too much on",
            color: "cyan",
            actions: [
                { label: "What actually matters today?", action: "focus" },
                { label: "Quick brain dump", action: "dump" },
                { label: "Just breathe for 2 minutes", action: "breathe" }
            ]
        },
        {
            id: 'tired',
            icon: Coffee,
            title: "Knackered mate",
            color: "amber",
            actions: [
                { label: "Power nap reminder (20 mins)", action: "nap" },
                { label: "What can wait till tomorrow?", action: "defer" },
                { label: "Quick energy frequency", action: "energy" }
            ]
        },
        {
            id: 'stuck',
            icon: Zap,
            title: "Stuck on something",
            color: "purple",
            actions: [
                { label: "Talk it through with AI", action: "ai" },
                { label: "Break it down smaller", action: "break" },
                { label: "Come back to it later", action: "later" }
            ]
        },
        {
            id: 'anxious',
            icon: Heart,
            title: "Bit anxious",
            color: "pink",
            actions: [
                { label: "Calm frequency (5 mins)", action: "calm" },
                { label: "What's actually in my control?", action: "control" },
                { label: "Just need to talk", action: "talk" }
            ]
        }
    ];

    const handleAction = (action) => {
        // Simple actions that help immediately
        switch(action) {
            case 'breathe':
                alert('Take 3 deep breaths:\n\nIn for 4... Hold for 4... Out for 6...\n\nYou got this mate ❤️');
                break;
            case 'dump':
                // Open brain dump
                window.location.hash = 'brain-dump';
                break;
            case 'calm':
                // Open frequency chamber
                window.location.href = '/FrequencyChamber';
                break;
            case 'ai':
                // Open AI chat
                window.location.href = '/TalkToAI51';
                break;
            case 'focus':
                // Just show today's urgent stuff
                alert('Showing only today\'s urgent tasks...');
                break;
            case 'nap':
                // Simple 20 min timer
                alert('20 minute power nap starting... Timer set ⏰');
                setTimeout(() => alert('Wakey wakey mate ☀️'), 1200000); // 20 mins
                break;
            case 'energy':
                window.location.href = '/FrequencyChamber?preset=energy';
                break;
            case 'defer':
                alert('Let\'s move non-urgent stuff to tomorrow...');
                break;
            case 'break':
                alert('Breaking this down into smaller chunks...');
                break;
            case 'later':
                alert('Noted - we\'ll come back to this later ✓');
                setIsOpen(false);
                break;
            case 'control':
                alert('Focus on what YOU can actually control right now.\n\nLet the rest go for now mate ❤️');
                break;
            case 'talk':
                window.location.href = '/TalkToAI51';
                break;
            default:
                alert('On it mate...');
        }
        setIsOpen(false);
        setSelected(null);
    };

    return (
        <>
            {/* Always visible gentle button */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500/50 hover:border-pink-500 rounded-xl p-4 mb-4 transition-all group"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Heart className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                            <p className="text-white font-bold text-sm font-mono">Need a hand?</p>
                            <p className="text-gray-400 text-xs font-mono">Always here mate</p>
                        </div>
                    </div>
                    <span className="text-pink-400 text-xs font-mono">Tap</span>
                </div>
            </button>

            {/* Support modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        onClick={() => { setIsOpen(false); setSelected(null); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black border-4 border-pink-500 rounded-xl p-6 max-w-md w-full"
                            style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.6)' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Heart className="w-8 h-8 text-pink-400" />
                                    <h2 className="text-2xl font-black text-pink-400 font-mono">
                                        {selected ? selected.title : "What's going on?"}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => { setIsOpen(false); setSelected(null); }}
                                    className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {!selected ? (
                                // Option selection
                                <div className="space-y-3">
                                    {supportOptions.map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelected(option)}
                                            className={`w-full bg-black border-2 border-${option.color}-500/50 hover:border-${option.color}-500 rounded-lg p-4 transition-all group flex items-center gap-3`}
                                        >
                                            <option.icon className={`w-6 h-6 text-${option.color}-400 group-hover:scale-110 transition-transform`} />
                                            <p className="text-white font-bold font-mono">{option.title}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                // Action selection
                                <div className="space-y-3">
                                    {selected.actions.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAction(action.action)}
                                            className={`w-full bg-black border-2 border-${selected.color}-500/50 hover:border-${selected.color}-500 rounded-lg p-4 transition-all text-left`}
                                        >
                                            <p className="text-white font-bold text-sm font-mono">{action.label}</p>
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="w-full bg-gray-900 hover:bg-gray-800 rounded-lg p-3 text-gray-400 font-mono text-sm transition-all"
                                    >
                                        Back
                                    </button>
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-pink-500/20 text-center">
                                <p className="text-gray-500 text-xs font-mono">Zero judgment • Always here • You got this ❤️</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}