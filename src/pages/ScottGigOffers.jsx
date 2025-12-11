import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Calendar, DollarSign, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * GIG OFFERS - TEAM VOTING
 * View all gig offers, vote on them, see AI recommendations
 */

export default function ScottGigOffers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [pinEntered, setPinEntered] = useState(false);

    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        } else {
            setPinEntered(true);
        }
    }, [navigate]);

    const { data: offers = [], isLoading } = useQuery({
        queryKey: ['scottGigOffers'],
        queryFn: () => base44.entities.ScottGigOffer.list('-created_date'),
        enabled: pinEntered
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.list(),
        enabled: pinEntered
    });

    const voteMutation = useMutation({
        mutationFn: async ({ offerId, vote, reason }) => {
            const offer = offers.find(o => o.id === offerId);
            const updatedVotes = [...(offer.team_votes || []), {
                voter: 'Scott', // TODO: Get from current user
                vote,
                reason,
                timestamp: new Date().toISOString()
            }];

            await base44.entities.ScottGigOffer.update(offerId, {
                team_votes: updatedVotes
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ offerId, status }) => {
            await base44.entities.ScottGigOffer.update(offerId, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
        }
    });

    const handleVote = (offerId, vote) => {
        const reason = prompt(`Why ${vote}?`);
        if (reason) {
            voteMutation.mutate({ offerId, vote, reason });
        }
    };

    const getArtistName = (artistId) => {
        const artist = artists.find(a => a.id === artistId);
        return artist?.name || 'Unknown Artist';
    };

    const getVoteCounts = (offer) => {
        const votes = offer.team_votes || [];
        return {
            yes: votes.filter(v => v.vote === 'yes').length,
            no: votes.filter(v => v.vote === 'no').length,
            maybe: votes.filter(v => v.vote === 'maybe').length
        };
    };

    const statusColors = {
        pending: 'border-amber-500/50 text-amber-400',
        accepted: 'border-green-500/50 text-green-400',
        declined: 'border-red-500/50 text-red-400',
        negotiating: 'border-cyan-500/50 text-cyan-400'
    };

    if (!pinEntered || isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-gray-500 font-mono">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-amber-500/30">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>
                
                <h1 className="text-xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>GIG OFFERS</h1>
            </div>

            {/* ADD OFFER BUTTON */}
            <Link to={createPageUrl('ScottPasteGigOffer')}>
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono mb-6 py-6">
                    + PASTE NEW OFFER
                </Button>
            </Link>

            {/* OFFERS LIST */}
            {offers.length === 0 ? (
                <div className="bg-black border-2 border-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-600 font-mono text-sm mb-4">NO GIG OFFERS YET</p>
                    <Link to={createPageUrl('ScottPasteGigOffer')}>
                        <Button className="bg-amber-500 hover:bg-amber-400 text-black font-mono">
                            PASTE FIRST OFFER
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {offers.map(offer => {
                        const votes = getVoteCounts(offer);
                        const hasVoted = (offer.team_votes || []).some(v => v.voter === 'Scott');
                        
                        return (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-black border-2 ${statusColors[offer.status]} rounded-lg p-4`}
                            >
                                {/* HEADER */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold font-mono text-lg mb-1">{offer.venue}</h3>
                                        <p className="text-cyan-400 font-mono text-sm">{getArtistName(offer.artist_id)}</p>
                                    </div>
                                    <div className={`text-xs font-bold font-mono px-3 py-1 rounded ${statusColors[offer.status]} border-2`}>
                                        {offer.status.toUpperCase()}
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-white font-mono text-sm">{offer.date}</span>
                                    </div>
                                    {offer.fee && (
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-500" />
                                            <span className="text-white font-mono text-sm">£{offer.fee}</span>
                                        </div>
                                    )}
                                    {offer.contact_person && (
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-white font-mono text-xs">{offer.contact_person}</span>
                                        </div>
                                    )}
                                </div>

                                {/* VOTES */}
                                <div className="flex items-center gap-3 mb-4 p-3 bg-black/50 rounded">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400 font-mono text-sm font-bold">{votes.yes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ThumbsDown className="w-4 h-4 text-red-400" />
                                        <span className="text-red-400 font-mono text-sm font-bold">{votes.no}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4 text-amber-400" />
                                        <span className="text-amber-400 font-mono text-sm font-bold">{votes.maybe}</span>
                                    </div>
                                </div>

                                {/* VOTE BUTTONS */}
                                {!hasVoted && offer.status === 'pending' && (
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button
                                            onClick={() => handleVote(offer.id, 'yes')}
                                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-2 border-green-500/50 font-mono"
                                        >
                                            YES
                                        </Button>
                                        <Button
                                            onClick={() => handleVote(offer.id, 'maybe')}
                                            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border-2 border-amber-500/50 font-mono"
                                        >
                                            MAYBE
                                        </Button>
                                        <Button
                                            onClick={() => handleVote(offer.id, 'no')}
                                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-2 border-red-500/50 font-mono"
                                        >
                                            NO
                                        </Button>
                                    </div>
                                )}

                                {/* STATUS BUTTONS */}
                                {hasVoted && offer.status === 'pending' && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            onClick={() => updateStatusMutation.mutate({ offerId: offer.id, status: 'accepted' })}
                                            className="bg-green-500 hover:bg-green-600 text-black font-mono font-bold"
                                        >
                                            ACCEPT
                                        </Button>
                                        <Button
                                            onClick={() => updateStatusMutation.mutate({ offerId: offer.id, status: 'declined' })}
                                            className="bg-red-500 hover:bg-red-600 text-black font-mono font-bold"
                                        >
                                            DECLINE
                                        </Button>
                                    </div>
                                )}

                                {/* TEAM FEEDBACK */}
                                {(offer.team_votes || []).length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-800">
                                        <p className="text-gray-500 font-mono text-xs mb-2">TEAM FEEDBACK</p>
                                        <div className="space-y-2">
                                            {offer.team_votes.map((vote, idx) => (
                                                <div key={idx} className="bg-black/50 p-2 rounded">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-cyan-400 font-mono text-xs font-bold">{vote.voter}</span>
                                                        <span className={`text-xs font-mono ${
                                                            vote.vote === 'yes' ? 'text-green-400' : 
                                                            vote.vote === 'no' ? 'text-red-400' : 
                                                            'text-amber-400'
                                                        }`}>
                                                            {vote.vote.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 font-mono text-xs">{vote.reason}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}