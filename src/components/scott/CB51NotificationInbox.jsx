import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

/**
 * CB51 NOTIFICATION INBOX
 * Works on iOS PWA (no Web Push API needed)
 * Shows pending gig offers with GREEN YES / RED NO directly in-app
 * Badge counter on home screen for quick awareness
 */

export default function CB51NotificationInbox() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [expandedOfferId, setExpandedOfferId] = useState(null);

    // Fetch pending gig offers (manager approval needed)
    const { data: pendingOffers = [], isLoading } = useQuery({
        queryKey: ['pendingGigOffers'],
        queryFn: async () => {
            try {
                const offers = await base44.entities.ScottGigOffer.filter({
                    status: 'pending_manager_review'
                });
                setUnreadCount(offers.length);
                return offers;
            } catch (error) {
                console.error('Error fetching offers:', error);
                return [];
            }
        },
        refetchInterval: 5000 // Poll every 5s for new offers
    });

    // Update badge count on home screen (PWA feature)
    useEffect(() => {
        if ('setAppBadge' in navigator) {
            navigator.setAppBadge(unreadCount);
        }
    }, [unreadCount]);

    const handleManagerApproval = async (offerId, approved) => {
        try {
            const offerToUpdate = pendingOffers.find(o => o.id === offerId);
            
            await base44.entities.ScottGigOffer.update(offerId, {
                status: approved ? 'sent_to_band' : 'rejected',
                sent_to_band_at: approved ? new Date().toISOString() : null
            });

            // If YES: notify band members via in-app notifications (pure CB51, no email)
            if (approved && offerToUpdate) {
                await base44.functions.invoke('notifyBandGigApproval', {
                    gigOfferId: offerId,
                    gigDetails: {
                        venue: offerToUpdate.venue_name,
                        date: offerToUpdate.date,
                        promoter: offerToUpdate.promoter_name,
                        fee: offerToUpdate.fee
                    }
                });
            }

            setExpandedOfferId(null);
            toast.success(approved ? '✓ BAND NOTIFIED' : '✗ REJECTED');
        } catch (error) {
            console.error('Error updating offer:', error);
            toast.error('Failed to save decision');
        }
    };

    if (pendingOffers.length === 0) {
        return (
            <div className="bg-black border-2 border-cyan-500/30 rounded-lg p-4 text-center">
                <Bell className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-mono">No pending gig offers</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* UNREAD BADGE */}
            {unreadCount > 0 && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 rounded-lg p-3 flex items-center gap-2"
                >
                    <AlertCircle className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <div>
                        <p className="text-pink-400 font-bold font-mono text-sm">{unreadCount} PENDING DECISIONS</p>
                        <p className="text-pink-400/60 text-xs font-mono">Gig offers waiting for your YES/NO</p>
                    </div>
                </motion.div>
            )}

            {/* PENDING OFFERS LIST */}
            <AnimatePresence>
                {pendingOffers.map((offer, idx) => (
                    <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-black border-2 border-cyan-500/50 rounded-lg overflow-hidden"
                    >
                        {/* HEADER */}
                        <button
                            onClick={() => setExpandedOfferId(expandedOfferId === offer.id ? null : offer.id)}
                            className="w-full p-4 flex items-start justify-between hover:bg-cyan-500/10 transition-colors"
                        >
                            <div className="flex-1 text-left">
                                <h3 className="text-white font-black font-mono text-sm">
                                    {offer.venue_name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <p className="text-cyan-400 text-xs font-mono">
                                        {new Date(offer.date).toLocaleDateString()}
                                    </p>
                                    <span className="text-gray-500">•</span>
                                    <p className="text-gray-400 text-xs font-mono">{offer.promoter_name}</p>
                                </div>
                            </div>
                            <AlertCircle className="w-5 h-5 text-pink-400 flex-shrink-0 animate-pulse" />
                        </button>

                        {/* EXPANDED DETAILS */}
                        {expandedOfferId === offer.id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-cyan-500/30 bg-black/50 p-4 space-y-4"
                            >
                                {/* DETAILS */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-mono">Fee:</span>
                                        <span className="text-white font-black font-mono">£{offer.fee}</span>
                                    </div>
                                    {offer.manager_notes && (
                                        <div>
                                            <span className="text-gray-500 font-mono">Notes:</span>
                                            <p className="text-gray-300 font-mono text-xs mt-1">{offer.manager_notes}</p>
                                        </div>
                                    )}
                                </div>

                                {/* ACTION BUTTONS - SCOTT'S DESIGN: GREEN YES / RED NO */}
                                <div className="flex gap-3 pt-3 border-t border-cyan-500/20">
                                    <button
                                        onClick={() => handleManagerApproval(offer.id, false)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-900/40 hover:bg-red-900/60 border-2 border-red-500/50 hover:border-red-500 text-red-400 font-black py-2 rounded-lg transition-all font-mono text-sm"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        NO
                                    </button>
                                    <button
                                        onClick={() => handleManagerApproval(offer.id, true)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-900/40 hover:bg-green-900/60 border-2 border-green-500/50 hover:border-green-500 text-green-400 font-black py-2 rounded-lg transition-all font-mono text-sm"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        YES
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}