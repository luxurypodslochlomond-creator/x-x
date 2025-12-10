import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, ThumbsUp, ThumbsDown, MessageCircle, CheckCircle, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { format } from 'date-fns';

/**
 * GIG OFFERS - TEAM VOTING
 * Email AI auto-creates offers
 * Team votes (Rosie, artist, band)
 * Scott makes final call
 */

export default function ScottGigOffers() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [offers, setOffers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [voteReason, setVoteReason] = useState('');

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadData();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, []);

    const loadData = async () => {
        try {
            const allOffers = await base44.entities.ScottGigOffer.list('-created_date');
            const allArtists = await base44.entities.ScottArtist.list();
            setOffers(allOffers);
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    const handleVote = async (offerId, vote) => {
        try {
            const offer = offers.find(o => o.id === offerId);
            const existingVotes = offer.team_votes || [];
            
            const newVote = {
                voter: 'Scott',
                vote: vote,
                reason: voteReason,
                timestamp: new Date().toISOString()
            };

            await base44.entities.ScottGigOffer.update(offerId, {
                team_votes: [...existingVotes, newVote]
            });

            setVoteReason('');
            setSelectedOffer(null);
            loadData();
        } catch (error) {
            console.error('Vote error:', error);
        }
    };

    const handleAccept = async (offerId) => {
        try {
            const offer = offers.find(o => o.id === offerId);
            
            // Create event
            await base44.entities.ScottEvent.create({
                title: `${offer.venue} - ${offer.fee ? `£${offer.fee}` : 'TBC'}`,
                artist_id: offer.artist_id,
                event_type: 'gig',
                date: offer.date,
                location: offer.venue,
                notes: offer.details,
                status: 'confirmed'
            });

            // Update offer status
            await base44.entities.ScottGigOffer.update(offerId, {
                status: 'accepted'
            });

            loadData();
        } catch (error) {
            console.error('Accept error:', error);
        }
    };

    const handleDecline = async (offerId) => {
        try {
            await base44.entities.ScottGigOffer.update(offerId, {
                status: 'declined'
            });
            loadData();
        } catch (error) {
            console.error('Decline error:', error);
        }
    };

    if (!pinEntered) return null;

    const pendingOffers = offers.filter(o => o.status === 'pending');

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Mail className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>GIG OFFERS</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Auto-detected from email</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-black border border-cyan-500/30 p-3 text-center">
                        <p className="text-3xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>
                            {pendingOffers.length}
                        </p>
                        <p className="text-xs text-cyan-500" style={{ fontFamily: 'monospace' }}>PENDING</p>
                    </div>
                    <div className="bg-black border border-green-500/30 p-3 text-center">
                        <p className="text-3xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                            {offers.filter(o => o.status === 'accepted').length}
                        </p>
                        <p className="text-xs text-green-500" style={{ fontFamily: 'monospace' }}>ACCEPTED</p>
                    </div>
                    <div className="bg-black border border-red-500/30 p-3 text-center">
                        <p className="text-3xl font-black text-red-400" style={{ fontFamily: 'monospace' }}>
                            {offers.filter(o => o.status === 'declined').length}
                        </p>
                        <p className="text-xs text-red-500" style={{ fontFamily: 'monospace' }}>DECLINED</p>
                    </div>
                    <div className="bg-black border border-amber-500/30 p-3 text-center">
                        <p className="text-3xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>
                            {offers.filter(o => o.status === 'negotiating').length}
                        </p>
                        <p className="text-xs text-amber-500" style={{ fontFamily: 'monospace' }}>NEGOTIATING</p>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 p-4 mb-6">
                    <h3 className="text-cyan-400 font-mono font-bold text-sm mb-2">HOW IT WORKS</h3>
                    <div className="space-y-1 text-xs font-mono text-gray-300">
                        <p>1. Forward gig emails to scott@kingdom.uf51.com</p>
                        <p>2. AI extracts offer details + creates card</p>
                        <p>3. Team votes (you, Rosie, artist)</p>
                        <p>4. Accept = auto-creates calendar event</p>
                    </div>
                </div>

                {/* OFFERS */}
                <div className="space-y-4">
                    {offers.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Mail className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm mb-2">No gig offers yet</p>
                            <p className="text-gray-700 font-mono text-xs">Forward emails to scott@kingdom.uf51.com</p>
                        </div>
                    ) : (
                        offers.map(offer => {
                            const artist = artists.find(a => a.id === offer.artist_id);
                            const yesVotes = (offer.team_votes || []).filter(v => v.vote === 'yes').length;
                            const noVotes = (offer.team_votes || []).filter(v => v.vote === 'no').length;
                            const maybeVotes = (offer.team_votes || []).filter(v => v.vote === 'maybe').length;

                            return (
                                <div key={offer.id} className="bg-black border-2 border-cyan-500/50 p-4">
                                    
                                    {/* HEADER */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-mono font-bold text-lg">{offer.venue}</p>
                                            <p className="text-cyan-400 text-sm font-mono">{artist?.name}</p>
                                            <p className="text-gray-400 text-sm font-mono">
                                                {format(new Date(offer.date), 'd MMM yyyy')}
                                            </p>
                                        </div>
                                        {offer.fee && (
                                            <div className="text-right">
                                                <p className="text-green-400 font-mono text-2xl font-black">£{offer.fee}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* DETAILS */}
                                    {offer.details && (
                                        <p className="text-gray-500 text-xs font-mono mb-3 p-2 bg-black/60">
                                            {offer.details}
                                        </p>
                                    )}

                                    {/* AI RECOMMENDATION */}
                                    {offer.ai_recommendation && (
                                        <div className="bg-purple-900/40 border border-purple-500/50 p-2 mb-3">
                                            <p className="text-purple-400 text-xs font-mono font-bold mb-1">AI ANALYSIS:</p>
                                            <p className="text-gray-300 text-xs font-mono">{offer.ai_recommendation}</p>
                                        </div>
                                    )}

                                    {/* TEAM VOTES */}
                                    {offer.team_votes && offer.team_votes.length > 0 && (
                                        <div className="bg-black/60 p-3 mb-3">
                                            <p className="text-gray-500 text-xs font-mono mb-2">TEAM VOTES:</p>
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="flex items-center gap-1">
                                                    <ThumbsUp className="w-4 h-4 text-green-400" />
                                                    <span className="text-green-400 font-mono text-sm font-bold">{yesVotes}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ThumbsDown className="w-4 h-4 text-red-400" />
                                                    <span className="text-red-400 font-mono text-sm font-bold">{noVotes}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle className="w-4 h-4 text-amber-400" />
                                                    <span className="text-amber-400 font-mono text-sm font-bold">{maybeVotes}</span>
                                                </div>
                                            </div>
                                            {offer.team_votes.map((v, i) => (
                                                <div key={i} className="text-xs font-mono text-gray-400 mb-1">
                                                    {v.voter}: {v.vote} {v.reason && `- ${v.reason}`}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ACTIONS */}
                                    {offer.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAccept(offer.id)}
                                                className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-mono text-sm flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                ACCEPT
                                            </button>
                                            <button
                                                onClick={() => setSelectedOffer(offer.id)}
                                                className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm flex items-center justify-center gap-2"
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                                VOTE
                                            </button>
                                            <button
                                                onClick={() => handleDecline(offer.id)}
                                                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm flex items-center justify-center gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                DECLINE
                                            </button>
                                        </div>
                                    )}

                                    {/* VOTE FORM */}
                                    {selectedOffer === offer.id && (
                                        <div className="mt-3 bg-black/60 border border-cyan-500 p-3">
                                            <input
                                                type="text"
                                                placeholder="Reason (optional)"
                                                value={voteReason}
                                                onChange={(e) => setVoteReason(e.target.value)}
                                                className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleVote(offer.id, 'yes')}
                                                    className="flex-1 py-2 bg-green-600 text-white font-mono text-xs"
                                                >
                                                    YES
                                                </button>
                                                <button
                                                    onClick={() => handleVote(offer.id, 'maybe')}
                                                    className="flex-1 py-2 bg-amber-600 text-white font-mono text-xs"
                                                >
                                                    MAYBE
                                                </button>
                                                <button
                                                    onClick={() => handleVote(offer.id, 'no')}
                                                    className="flex-1 py-2 bg-red-600 text-white font-mono text-xs"
                                                >
                                                    NO
                                                </button>
                                                <button
                                                    onClick={() => setSelectedOffer(null)}
                                                    className="px-3 py-2 bg-gray-700 text-white font-mono text-xs"
                                                >
                                                    CANCEL
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* STATUS BADGE */}
                                    {offer.status !== 'pending' && (
                                        <div className={`mt-3 text-center py-2 font-mono text-sm uppercase ${
                                            offer.status === 'accepted' ? 'bg-green-900/40 text-green-400' :
                                            offer.status === 'declined' ? 'bg-red-900/40 text-red-400' :
                                            'bg-amber-900/40 text-amber-400'
                                        }`}>
                                            {offer.status}
                                        </div>
                                    )}

                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to={createPageUrl('ScottManager')} className="text-gray-600 text-sm font-mono hover:text-gray-400">
                        ← Back to Kingdom
                    </Link>
                </div>

            </div>
        </div>
    );
}