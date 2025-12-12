import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, DollarSign, MapPin, Calendar, Fuel, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * INLINE GIG OFFERS FEED
 * No page navigation - everything inline
 * Counter-offers, travel calc, clash detection, instant actions
 */

export default function ScottGigOffersFeed() {
    const [expanded, setExpanded] = useState(false);
    const queryClient = useQueryClient();

    const { data: offers = [], isLoading } = useQuery({
        queryKey: ['gigOffers'],
        queryFn: async () => {
            const data = await base44.entities.ScottGigOffer.list('-created_date', 10);
            return data;
        }
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['artists'],
        queryFn: () => base44.entities.ScottArtist.list()
    });

    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: () => base44.entities.ScottEvent.list()
    });

    const voteMutation = useMutation({
        mutationFn: async ({ offerId, vote }) => {
            const offer = offers.find(o => o.id === offerId);
            const votes = offer.team_votes || [];
            const existingVoteIndex = votes.findIndex(v => v.voter === 'Scott');
            
            if (existingVoteIndex >= 0) {
                votes[existingVoteIndex] = { voter: 'Scott', vote, reason: '' };
            } else {
                votes.push({ voter: 'Scott', vote, reason: '' });
            }

            await base44.entities.ScottGigOffer.update(offerId, { team_votes: votes });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gigOffers'] })
    });

    const statusMutation = useMutation({
        mutationFn: async ({ offerId, status }) => {
            await base44.entities.ScottGigOffer.update(offerId, { status });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gigOffers'] })
    });

    // AI COUNTER-OFFER CALCULATOR
    const calculateCounterOffer = (fee, venue) => {
        // Smart logic: base fee + 30% for negotiation room
        const suggested = Math.round(fee * 1.3);
        return suggested;
    };

    // TRAVEL COST CALCULATOR
    const estimateTravelCost = (venue) => {
        // Rough estimate: £50-150 depending on distance keywords
        const lowCost = ['london', 'local', 'glasgow', 'edinburgh'];
        const isNearby = lowCost.some(loc => venue.toLowerCase().includes(loc));
        return isNearby ? 50 : 150;
    };

    // CLASH DETECTOR
    const checkClash = (date) => {
        const offerDate = new Date(date);
        const clashes = events.filter(e => {
            const eventDate = new Date(e.date);
            return Math.abs(eventDate - offerDate) < 86400000; // Same day
        });
        return clashes.length > 0;
    };

    const getArtistName = (artistId) => {
        const artist = artists.find(a => a.id === artistId);
        return artist?.name || 'Unknown';
    };

    const pendingOffers = offers.filter(o => o.status === 'pending');
    const recentOffers = expanded ? pendingOffers : pendingOffers.slice(0, 2);

    if (isLoading) return null;

    return (
        <div className="mb-6">
            <button 
                onClick={() => setExpanded(!expanded)}
                className="w-full bg-black p-4 rounded-lg border-2 border-amber-500 mb-3 flex items-center justify-between"
                style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}
            >
                <div className="text-left">
                    <p className="text-white font-black text-base font-mono mb-1">
                        GIG OFFERS {pendingOffers.length > 0 && `(${pendingOffers.length})`}
                    </p>
                    <p className="text-gray-600 text-xs font-mono">AI math • Instant votes</p>
                </div>
                {expanded ? <ChevronUp className="text-amber-400" /> : <ChevronDown className="text-amber-400" />}
            </button>

            <AnimatePresence>
                {(expanded || pendingOffers.length > 0) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3"
                    >
                        {/* PASTE NEW */}
                        <Link to={createPageUrl('ScottPasteGigOffer')}>
                            <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-3 hover:bg-green-900/30 transition-all">
                                <p className="text-green-400 font-black text-xs font-mono">+ PASTE NEW</p>
                            </div>
                        </Link>

                        {/* OFFERS */}
                        {recentOffers.map(offer => {
                            const counterOffer = calculateCounterOffer(offer.fee, offer.venue);
                            const travelCost = estimateTravelCost(offer.venue);
                            const netProfit = offer.fee - travelCost;
                            const hasClash = checkClash(offer.date);
                            const myVote = offer.team_votes?.find(v => v.voter === 'Scott');

                            return (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-black border-2 border-amber-500/50 rounded-lg p-4"
                                >
                                    {/* HEADER */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-sm font-mono mb-1">{offer.venue}</p>
                                            <p className="text-gray-500 text-xs font-mono">{getArtistName(offer.artist_id)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-amber-400 font-black text-lg font-mono">£{offer.fee}</p>
                                            {hasClash && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <AlertTriangle className="w-3 h-3 text-red-400" />
                                                    <p className="text-red-400 text-[9px] font-mono">CLASH</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* AI MATH */}
                                    <div className="bg-cyan-900/20 border border-cyan-500/50 rounded p-3 mb-3 space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400 font-mono flex items-center gap-1">
                                                <DollarSign className="w-3 h-3" />
                                                Counter-offer
                                            </span>
                                            <span className="text-cyan-400 font-black font-mono">£{counterOffer}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400 font-mono flex items-center gap-1">
                                                <Fuel className="w-3 h-3" />
                                                Travel ~
                                            </span>
                                            <span className="text-gray-400 font-mono">£{travelCost}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs border-t border-cyan-500/30 pt-2">
                                            <span className="text-white font-mono font-bold">Net profit</span>
                                            <span className={`font-black font-mono ${netProfit > 200 ? 'text-green-400' : netProfit > 100 ? 'text-amber-400' : 'text-red-400'}`}>
                                                £{netProfit}
                                            </span>
                                        </div>
                                    </div>

                                    {/* QUICK ACTIONS */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            onClick={() => voteMutation.mutate({ offerId: offer.id, vote: 'yes' })}
                                            disabled={voteMutation.isPending}
                                            className={`py-2 rounded font-mono text-xs font-bold transition-all ${
                                                myVote?.vote === 'yes'
                                                    ? 'bg-green-500 text-black border-2 border-green-400'
                                                    : 'bg-green-900/30 text-green-400 border border-green-500/50 hover:bg-green-900/50'
                                            }`}
                                        >
                                            {myVote?.vote === 'yes' ? '✓ YES' : 'YES'}
                                        </button>
                                        <button
                                            onClick={() => voteMutation.mutate({ offerId: offer.id, vote: 'maybe' })}
                                            disabled={voteMutation.isPending}
                                            className={`py-2 rounded font-mono text-xs font-bold transition-all ${
                                                myVote?.vote === 'maybe'
                                                    ? 'bg-amber-500 text-black border-2 border-amber-400'
                                                    : 'bg-amber-900/30 text-amber-400 border border-amber-500/50 hover:bg-amber-900/50'
                                            }`}
                                        >
                                            {myVote?.vote === 'maybe' ? '? ASK' : 'ASK'}
                                        </button>
                                        <button
                                            onClick={() => voteMutation.mutate({ offerId: offer.id, vote: 'no' })}
                                            disabled={voteMutation.isPending}
                                            className={`py-2 rounded font-mono text-xs font-bold transition-all ${
                                                myVote?.vote === 'no'
                                                    ? 'bg-red-500 text-black border-2 border-red-400'
                                                    : 'bg-red-900/30 text-red-400 border border-red-500/50 hover:bg-red-900/50'
                                            }`}
                                        >
                                            {myVote?.vote === 'no' ? '✗ NO' : 'NO'}
                                        </button>
                                    </div>

                                    {/* ACCEPT/DECLINE */}
                                    {myVote?.vote === 'yes' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-3 pt-3 border-t border-gray-800 space-y-2"
                                        >
                                            <button
                                                onClick={() => statusMutation.mutate({ offerId: offer.id, status: 'accepted' })}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xs py-2 rounded font-mono flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                ACCEPT & GEN CONTRACT
                                            </button>
                                            <p className="text-gray-600 text-[9px] text-center font-mono">Auto-creates event + contract</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* VIEW ALL */}
                        {pendingOffers.length > 2 && !expanded && (
                            <button
                                onClick={() => setExpanded(true)}
                                className="w-full bg-black border border-gray-800 hover:border-amber-500 rounded-lg p-3 text-gray-400 text-xs font-mono transition-all"
                            >
                                + {pendingOffers.length - 2} MORE OFFERS
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}