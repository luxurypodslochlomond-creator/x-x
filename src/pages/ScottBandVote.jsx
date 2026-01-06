import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Radio, ThumbsUp, ThumbsDown, CheckCircle, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

/**
 * BAND MEMBER VOTING PAGE
 * Band members vote yes/no on gig offers
 * Simple, no login required - just name
 */

export default function ScottBandVote() {
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get('offer');
    
    const [memberName, setMemberName] = useState('');
    const [vote, setVote] = useState(null);
    const [notes, setNotes] = useState('');
    const [hasVoted, setHasVoted] = useState(false);

    const { data: offer, isLoading } = useQuery({
        queryKey: ['scottGigOffer', offerId],
        queryFn: () => base44.entities.ScottGigOffer.filter({ id: offerId }).then(r => r[0]),
        enabled: !!offerId
    });

    // Check if this person already voted
    useEffect(() => {
        if (offer && memberName) {
            const alreadyVoted = offer.band_responses?.some(r => r.member_name.toLowerCase() === memberName.toLowerCase());
            setHasVoted(alreadyVoted);
        }
    }, [offer, memberName]);

    const voteMutation = useMutation({
        mutationFn: async () => {
            const responses = offer.band_responses || [];
            responses.push({
                member_name: memberName,
                response: vote,
                notes: notes,
                responded_at: new Date().toISOString()
            });

            return base44.entities.ScottGigOffer.update(offer.id, {
                band_responses: responses,
                all_responses_in: false // Manager can manually mark this
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffer'] });
            setHasVoted(true);
        }
    });

    const handleVote = () => {
        if (!memberName || !vote) return;
        voteMutation.mutate();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-mono">Loading gig offer...</p>
                </div>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="text-center">
                    <Radio className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-red-400 mb-2 font-mono">GIG NOT FOUND</h1>
                    <p className="text-gray-500 font-mono">Check your link</p>
                </div>
            </div>
        );
    }

    if (hasVoted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full text-center"
                >
                    <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-black text-green-400 mb-2 font-mono">VOTE RECORDED!</h1>
                    <p className="text-gray-400 font-mono mb-4">Thanks {memberName}! Scott will see your vote.</p>
                    
                    <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 mt-6">
                        <Music className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                        <p className="text-white font-bold text-lg mb-2">{offer.venue}</p>
                        <p className="text-gray-400 text-sm font-mono">
                            {format(new Date(offer.date), 'd MMM yyyy')} • £{offer.fee}
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-2xl mx-auto py-8">
                
                {/* HEADER */}
                <div className="text-center mb-8">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-black text-cyan-400 font-mono mb-2">GIG OFFER VOTE</h1>
                    <p className="text-gray-500 text-sm font-mono">Quick yes or no from you</p>
                </div>

                {/* GIG DETAILS */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-6 mb-6">
                    <h2 className="text-purple-400 font-black text-xl font-mono mb-4">{offer.venue}</h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-black/60 rounded p-3">
                            <p className="text-xs text-gray-400 font-mono mb-1">DATE</p>
                            <p className="text-white font-bold font-mono">{format(new Date(offer.date), 'd MMM yyyy')}</p>
                        </div>
                        <div className="bg-black/60 rounded p-3">
                            <p className="text-xs text-gray-400 font-mono mb-1">FEE</p>
                            <p className="text-white font-bold font-mono">£{offer.fee}</p>
                        </div>
                    </div>

                    {offer.city && (
                        <div className="bg-black/60 rounded p-3 mb-3">
                            <p className="text-xs text-gray-400 font-mono mb-1">LOCATION</p>
                            <p className="text-white font-mono">{offer.city}{offer.county ? `, ${offer.county}` : ''}</p>
                        </div>
                    )}

                    {offer.manager_notes && (
                        <div className="bg-black/60 rounded p-3">
                            <p className="text-xs text-gray-400 font-mono mb-1">SCOTT'S NOTES</p>
                            <p className="text-white text-sm font-mono">{offer.manager_notes}</p>
                        </div>
                    )}
                </div>

                {/* VOTING FORM */}
                <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">YOUR NAME</label>
                            <Input
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                placeholder="e.g., Sarah, John, etc"
                                className="bg-black border-2 border-gray-700 text-white h-12 text-lg font-bold"
                            />
                        </div>

                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-3 block">YOUR VOTE</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setVote('yes')}
                                    className={`p-6 rounded-lg border-4 transition-all ${
                                        vote === 'yes'
                                            ? 'bg-green-500/40 border-green-400'
                                            : 'bg-gray-800 border-gray-700 hover:border-green-500'
                                    }`}
                                >
                                    <ThumbsUp className={`w-12 h-12 mx-auto mb-2 ${vote === 'yes' ? 'text-green-400' : 'text-gray-500'}`} />
                                    <p className={`font-black text-xl font-mono ${vote === 'yes' ? 'text-green-400' : 'text-gray-500'}`}>
                                        YES
                                    </p>
                                </button>
                                <button
                                    onClick={() => setVote('no')}
                                    className={`p-6 rounded-lg border-4 transition-all ${
                                        vote === 'no'
                                            ? 'bg-red-500/40 border-red-400'
                                            : 'bg-gray-800 border-gray-700 hover:border-red-500'
                                    }`}
                                >
                                    <ThumbsDown className={`w-12 h-12 mx-auto mb-2 ${vote === 'no' ? 'text-red-400' : 'text-gray-500'}`} />
                                    <p className={`font-black text-xl font-mono ${vote === 'no' ? 'text-red-400' : 'text-gray-500'}`}>
                                        NO
                                    </p>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">NOTES (optional)</label>
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any thoughts? Conflicts? Excited?"
                                className="bg-black border-2 border-gray-700 text-white"
                                rows={3}
                            />
                        </div>

                        <Button
                            onClick={handleVote}
                            disabled={!memberName || !vote || voteMutation.isPending}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black text-lg h-14"
                        >
                            {voteMutation.isPending ? 'SENDING...' : 'SUBMIT VOTE'}
                        </Button>
                    </div>
                </div>

                {offer.response_deadline && (
                    <p className="text-center text-gray-500 text-xs font-mono mt-4">
                        Vote by: {format(new Date(offer.response_deadline), 'd MMM yyyy HH:mm')}
                    </p>
                )}
            </div>
        </div>
    );
}