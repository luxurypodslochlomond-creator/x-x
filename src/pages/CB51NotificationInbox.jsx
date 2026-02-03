import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Bell } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

export default function CB51NotificationInbox() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [expandedId, setExpandedId] = useState(null);

    const { data: allOffers = [] } = useQuery({
        queryKey: ['scottAllGigOffers'],
        queryFn: () => base44.entities.ScottGigOffer.filter({}),
        staleTime: 30000
    });

    const pendingOffers = allOffers.filter(o => o.status === 'pending_manager_review');

    const updateOfferMutation = useMutation({
        mutationFn: ({ offerId, data }) => base44.entities.ScottGigOffer.update(offerId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
        }
    });

    const handleApprove = async (offer) => {
        updateOfferMutation.mutate({ offerId: offer.id, data: { status: 'sent_to_band' } });
    };

    const handleReject = async (offer) => {
        updateOfferMutation.mutate({ offerId: offer.id, data: { status: 'rejected' } });
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6 text-cyan-400" />
                <h1 className="text-3xl font-black text-white font-mono">PENDING APPROVAL</h1>
            </div>

            <div className="space-y-2">
                {pendingOffers.length === 0 ? (
                    <div className="text-center py-8 text-gray-600 font-mono">No pending gigs</div>
                ) : (
                    pendingOffers.map(offer => (
                        <motion.div
                            key={offer.id}
                            layout
                            className="bg-black border border-cyan-500/50 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedId(expandedId === offer.id ? null : offer.id)}
                                className="w-full p-4 flex items-start justify-between hover:bg-cyan-500/10 transition-all text-left"
                            >
                                <div className="flex-1">
                                    <p className="text-white font-bold font-mono text-sm">{offer.venue || 'Gig Offer'}</p>
                                    <p className="text-cyan-400 text-xs font-mono mt-1">{offer.date} • {offer.currency || 'GBP'}{offer.fee || '?'}</p>
                                </div>
                                <span className="text-cyan-400 text-xs font-mono font-bold">{expandedId === offer.id ? '−' : '+'}</span>
                            </button>

                            {expandedId === offer.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-cyan-500/50 bg-black/60 p-4 space-y-3"
                                >
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        {offer.city && (
                                            <div>
                                                <p className="text-cyan-400 font-bold">CITY</p>
                                                <p className="text-gray-400">{offer.city}{offer.country ? `, ${offer.country}` : ''}</p>
                                            </div>
                                        )}
                                        {offer.promoter && (
                                            <div>
                                                <p className="text-cyan-400 font-bold">PROMOTER</p>
                                                <p className="text-gray-400">{offer.promoter}</p>
                                            </div>
                                        )}
                                        {offer.capacity && (
                                            <div>
                                                <p className="text-cyan-400 font-bold">CAPACITY</p>
                                                <p className="text-gray-400">{offer.capacity}</p>
                                            </div>
                                        )}
                                        {offer.time && (
                                            <div>
                                                <p className="text-cyan-400 font-bold">TIME</p>
                                                <p className="text-gray-400">{offer.time}</p>
                                            </div>
                                        )}
                                    </div>

                                    {offer.notes && (
                                        <div>
                                            <p className="text-cyan-400 text-xs font-bold">NOTES</p>
                                            <p className="text-gray-400 text-xs bg-black/40 p-2 rounded mt-1">{offer.notes}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleReject(offer)}
                                            className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 font-bold py-2 rounded text-xs border border-red-600/50"
                                        >
                                            REJECT
                                        </button>
                                        <button
                                            onClick={() => handleApprove(offer)}
                                            className="flex-1 bg-green-600/20 hover:bg-green-600/40 text-green-400 font-bold py-2 rounded text-xs border border-green-600/50"
                                        >
                                            APPROVE
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}