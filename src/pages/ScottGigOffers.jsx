import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Manager Gig Offers - Review pending offers
 * GREEN YES / RED NO decision interface
 */
export default function ScottGigOffers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    const filterStatus = urlParams.get('status') || 'pending_manager_review';

    const { data: pendingOffers = [] } = useQuery({
        queryKey: ['scottPendingOffers', artistId, filterStatus],
        queryFn: async () => {
            const offers = await base44.entities.ScottGigOffer.filter({
                status: filterStatus
            });
            return artistId ? offers.filter(o => o.artist_id === artistId) : offers;
        },
        staleTime: 30000
    });

    const approveMutation = useMutation({
        mutationFn: (offerId) =>
            base44.entities.ScottGigOffer.update(offerId, { status: 'sent_to_band' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottPendingOffers'] });
        }
    });

    const rejectMutation = useMutation({
        mutationFn: (offerId) =>
            base44.entities.ScottGigOffer.update(offerId, { status: 'rejected' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottPendingOffers'] });
        }
    });

    const handleApprove = (offer) => {
        approveMutation.mutate(offer.id);
    };

    const handleReject = (offer) => {
        if (confirm(`Reject offer from ${offer.venue}?`)) {
            rejectMutation.mutate(offer.id);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-3">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-2xl font-black text-white font-mono mb-6">PENDING OFFERS</h1>

            {pendingOffers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 font-mono text-sm">No pending offers</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {pendingOffers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-black border-2 border-cyan-500/50 rounded-lg p-4 hover:border-cyan-500 transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h2 className="text-lg font-black text-white">{offer.venue}</h2>
                                    <p className="text-cyan-400 font-mono text-sm">
                                        {offer.date} • £{offer.fee?.toLocaleString() || '?'}
                                    </p>
                                </div>
                                <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-[10px] font-bold font-mono">
                                    AI PARSED
                                </span>
                            </div>

                            {offer.notes && (
                                <p className="text-gray-400 text-xs mb-3 p-2 bg-black/50 rounded border border-gray-700">
                                    ⚠️ {offer.notes}
                                </p>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleApprove(offer)}
                                    disabled={approveMutation.isPending}
                                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black py-2 rounded font-mono text-sm flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    YES
                                </button>
                                <button
                                    onClick={() => handleReject(offer)}
                                    disabled={rejectMutation.isPending}
                                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black py-2 rounded font-mono text-sm flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    NO
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}