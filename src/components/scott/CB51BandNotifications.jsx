import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Bell, CheckCircle, XCircle, Music } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BAND MEMBER NOTIFICATIONS
 * Shows ScottNotification entities for band members
 * Displays gig offers they need to vote on
 */

export default function CB51BandNotifications({ userEmail }) {
    const navigate = useNavigate();

    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ['bandNotifications', userEmail],
        queryFn: async () => {
            const notifs = await base44.entities.ScottNotification.filter({
                recipient_email: userEmail,
                notification_type: 'band_gig_offer'
            });
            // Filter out dismissed/read ones
            return notifs.filter(n => !n.dismissed_at);
        },
        refetchInterval: 5000, // Poll every 5s
        enabled: !!userEmail
    });

    const handleClick = (notification) => {
        // Mark as read
        base44.entities.ScottNotification.update(notification.id, {
            read_at: new Date().toISOString()
        });
        
        // Navigate to vote page
        navigate(createPageUrl('ScottBandVote') + `?offerId=${notification.gig_offer_id}`);
    };

    if (isLoading) return null;

    if (notifications.length === 0) {
        return (
            <div className="bg-black border-2 border-cyan-500/30 rounded-lg p-4 text-center">
                <Bell className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-mono">No pending votes</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* HEADER */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 rounded-lg p-3 flex items-center gap-2"
            >
                <Music className="w-5 h-5 text-pink-400 flex-shrink-0 animate-pulse" />
                <div>
                    <p className="text-pink-400 font-bold font-mono text-sm">{notifications.length} GIG{notifications.length > 1 ? 'S' : ''} NEED YOUR VOTE</p>
                    <p className="text-pink-400/60 text-xs font-mono">Manager says YES • You in?</p>
                </div>
            </motion.div>

            {/* NOTIFICATIONS */}
            <AnimatePresence>
                {notifications.map((notif, idx) => (
                    <motion.button
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleClick(notif)}
                        className="w-full bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 text-left transition-all"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-black font-mono text-sm flex-1">
                                {notif.title}
                            </h3>
                            <Music className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                        </div>
                        <p className="text-cyan-400 text-xs font-mono whitespace-pre-line">
                            {notif.message}
                        </p>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cyan-500/20">
                            <div className="flex-1 flex items-center justify-center gap-2 bg-green-900/20 border border-green-500/50 text-green-400 py-1 px-2 rounded font-mono text-xs">
                                <CheckCircle className="w-3 h-3" />
                                YES
                            </div>
                            <div className="flex-1 flex items-center justify-center gap-2 bg-red-900/20 border border-red-500/50 text-red-400 py-1 px-2 rounded font-mono text-xs">
                                <XCircle className="w-3 h-3" />
                                NO
                            </div>
                        </div>
                    </motion.button>
                ))}
            </AnimatePresence>
        </div>
    );
}