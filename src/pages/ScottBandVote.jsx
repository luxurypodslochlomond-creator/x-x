import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Calendar, DollarSign, MapPin, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * BAND MEMBER VOTE PAGE
 * Band member sees gig → GREEN YES / RED NO
 * If NO → Must explain why (critical for manager)
 */

export default function ScottBandVote() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);
    const [decision, setDecision] = useState(null);
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get('offerId');

    useEffect(() => {
        base44.auth.me().then(setUser);
    }, []);

    const { data: gigOffer } = useQuery({
        queryKey: ['gigOffer', offerId],
        queryFn: () => base44.entities.ScottGigOffer.filter({ id: offerId }).then(r => r[0]),
        enabled: !!offerId
    });

    const { data: existingResponse } = useQuery({
        queryKey: ['bandResponse', offerId, user?.email],
        queryFn: () => base44.entities.ScottBandResponse.filter({ 
            gig_offer_id: offerId,
            band_member_email: user?.email 
        }).then(r => r[0]),
        enabled: !!offerId && !!user
    });

    const submitVoteMutation = useMutation({
        mutationFn: async ({ decision, reason }) => {
            if (existingResponse) {
                // Update existing
                return base44.entities.ScottBandResponse.update(existingResponse.id, {
                    decision,
                    reason_if_no: decision === 'no' ? reason : null,
                    responded_at: new Date().toISOString()
                });
            } else {
                // Create new
                return base44.entities.ScottBandResponse.create({
                    gig_offer_id: offerId,
                    band_member_email: user.email,
                    band_member_name: user.full_name,
                    decision,
                    reason_if_no: decision === 'no' ? reason : null,
                    responded_at: new Date().toISOString()
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bandResponse'] });
            navigate(createPageUrl('ScottArtistHome') + `?id=${gigOffer.artist_id}`);
        }
    });

    const handleSubmit = async () => {
        if (!decision) return;
        if (decision === 'no' && !reason.trim()) {
            alert('Please explain why you\'re saying NO');
            return;
        }

        setSubmitting(true);
        await submitVoteMutation.mutateAsync({ decision, reason });
        setSubmitting(false);
    };

    if (!gigOffer) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-gray-600 font-mono">Loading...</p>
            </div>
        );
    }

    // Already voted
    if (existingResponse && !decision) {
        return (
            <div className="min-h-screen bg-black text-white p-6">
                <div className="max-w-md mx-auto text-center space-y-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                        existingResponse.decision === 'yes' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                        {existingResponse.decision === 'yes' ? (
                            <CheckCircle className="w-12 h-12 text-green-400" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-400" />
                        )}
                    </div>
                    <h1 className="text-2xl font-black text-white font-mono">
                        YOU VOTED {existingResponse.decision === 'yes' ? 'YES' : 'NO'}
                    </h1>
                    <p className="text-gray-600 text-sm font-mono">{gigOffer.venue_name}</p>
                    <Button
                        onClick={() => setDecision(existingResponse.decision)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                    >
                        CHANGE VOTE
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <div className="max-w-md mx-auto space-y-6">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-cyan-400 font-mono mb-2">GIG VOTE</h1>
                    <p className="text-gray-600 text-xs font-mono">Manager says YES • You in?</p>
                </div>

                {/* GIG DETAILS */}
                <div className="bg-black border-2 border-cyan-500 rounded-lg p-6 space-y-4" style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}>
                    <div>
                        <p className="text-cyan-400 font-mono text-xs mb-1">VENUE</p>
                        <p className="text-white font-black text-xl">{gigOffer.venue_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-cyan-400 font-mono text-xs mb-1">DATE</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-white" />
                                <p className="text-white font-mono text-sm">
                                    {new Date(gigOffer.date).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-cyan-400 font-mono text-xs mb-1">FEE</p>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-white" />
                                <p className="text-white font-mono text-sm">£{gigOffer.fee?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {gigOffer.manager_notes && (
                        <div className="bg-black border border-cyan-500/30 rounded p-3">
                            <p className="text-cyan-400 font-mono text-xs mb-1">MANAGER NOTES</p>
                            <p className="text-white font-mono text-xs">{gigOffer.manager_notes}</p>
                        </div>
                    )}
                </div>

                {/* DECISION BUTTONS */}
                {!decision ? (
                    <div className="space-y-3">
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDecision('yes')}
                            className="w-full bg-green-900/40 hover:bg-green-900/60 border-4 border-green-500 text-green-400 font-black py-6 rounded-xl transition-all font-mono text-xl flex items-center justify-center gap-3"
                            style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
                        >
                            <CheckCircle className="w-8 h-8" />
                            YES - I'M IN
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDecision('no')}
                            className="w-full bg-red-900/40 hover:bg-red-900/60 border-4 border-red-500 text-red-400 font-black py-6 rounded-xl transition-all font-mono text-xl flex items-center justify-center gap-3"
                            style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
                        >
                            <XCircle className="w-8 h-8" />
                            NO - CAN'T DO IT
                        </motion.button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* REASON (if NO) */}
                        {decision === 'no' && (
                            <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                                <p className="text-red-400 font-mono text-sm mb-2">WHY CAN'T YOU DO IT?</p>
                                <Textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Manager needs to know why..."
                                    className="bg-black border-2 border-gray-900 text-white font-mono min-h-[100px]"
                                />
                            </div>
                        )}

                        {/* SUBMIT */}
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setDecision(null)}
                                variant="outline"
                                className="flex-1 border-2 border-gray-700 text-gray-400 font-mono"
                            >
                                BACK
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={submitting || (decision === 'no' && !reason.trim())}
                                className={`flex-1 font-black font-mono ${
                                    decision === 'yes' 
                                        ? 'bg-green-500 hover:bg-green-600 text-black' 
                                        : 'bg-red-500 hover:bg-red-600 text-black'
                                }`}
                            >
                                {submitting ? 'SAVING...' : 'CONFIRM'}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}