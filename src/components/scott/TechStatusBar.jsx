import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Radio, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TECH STATUS BAR - Shows offline/online, P2P sync status, AI features
 * Makes CB51's tech advantages VISIBLE
 */

export default function TechStatusBar({ showAIParsed = false, showP2PSync = false }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [justSynced, setJustSynced] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setJustSynced(true);
            setTimeout(() => setJustSynced(false), 3000);
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
            {/* OFFLINE/ONLINE STATUS */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-xl border font-mono text-xs font-bold ${
                    isOnline 
                        ? 'bg-green-500/20 border-green-500/40 text-green-400' 
                        : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                }`}
            >
                {isOnline ? (
                    <>
                        <Wifi className="w-4 h-4" />
                        ONLINE
                    </>
                ) : (
                    <>
                        <WifiOff className="w-4 h-4" />
                        OFFLINE READY
                    </>
                )}
            </motion.div>

            {/* P2P SYNC STATUS */}
            {showP2PSync && (
                <AnimatePresence>
                    {justSynced && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-mono text-xs font-bold"
                        >
                            <Radio className="w-4 h-4" />
                            P2P SYNCED
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* AI PARSED INDICATOR */}
            {showAIParsed && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 font-mono text-xs font-bold"
                >
                    <Zap className="w-4 h-4" />
                    AI PARSED
                </motion.div>
            )}
        </div>
    );
}

// Compact badge version for inline use
export function TechBadge({ type, className = "" }) {
    const badges = {
        offline: {
            icon: WifiOff,
            text: 'OFFLINE OK',
            color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
        },
        p2p: {
            icon: Radio,
            text: 'P2P',
            color: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
        },
        ai: {
            icon: Zap,
            text: 'AI',
            color: 'bg-pink-500/20 border-pink-500/40 text-pink-400'
        },
        verified: {
            icon: CheckCircle,
            text: 'VERIFIED',
            color: 'bg-green-500/20 border-green-500/40 text-green-400'
        }
    };

    const badge = badges[type];
    if (!badge) return null;

    const Icon = badge.icon;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border backdrop-blur-sm ${badge.color} font-mono text-[10px] font-bold ${className}`}>
            <Icon className="w-3 h-3" />
            {badge.text}
        </div>
    );
}