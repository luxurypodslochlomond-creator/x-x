import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Send, Clock, Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

/**
 * SCOTT'S CORE WORKFLOW
 * 1. Manager reviews gig offer
 * 2. Sends to band for vote
 * 3. Band members vote yes/no
 * 4. Manager sees results and responds
 */

export default function ScottGigWorkflow({ offer }) {
    const queryClient = useQueryClient();
    const [managerNotes, setManagerNotes] = useState(offer.manager_notes || '');
    const [responseDeadline, setResponseDeadline] = useState('');
    const [finalResponse, setFinalResponse] = useState('');

    // Manager approves and sends to band
    const sendToBandMutation = useMutation({
        mutationFn: async () => {
            const deadline = responseDeadline ? new Date(responseDeadline).toISOString() : new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
            return base44.entities.ScottGigOffer.update(offer.id, {
                status: 'sent_to_band',
                manager_approved: true,
                manager_notes: managerNotes,
                sent_to_band_date: new Date().toISOString(),
                response_deadline: deadline,
                urgency: deadline < new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() ? 'urgent' : 'normal'
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
        },
        onError: (error) => {
            console.error('Error sending to band:', error);
            alert('Failed to send to band: ' + (error.message || 'Unknown error'));
        }
    });

    // Manager rejects without sending to band
    const rejectMutation = useMutation({
        mutationFn: () => base44.entities.ScottGigOffer.update(offer.id, {
            status: 'rejected_by_manager',
            manager_notes: managerNotes,
            rejection_reason: managerNotes
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
        },
        onError: (error) => {
            console.error('Error rejecting offer:', error);
            alert('Failed to reject: ' + (error.message || 'Unknown error'));
        }
    });

    // Manager sends final response after band votes
    const sendResponseMutation = useMutation({
        mutationFn: (accept) => base44.entities.ScottGigOffer.update(offer.id, {
            status: accept ? 'confirmed' : 'rejected_by_band',
            final_response_sent: finalResponse,
            response_sent_date: new Date().toISOString()
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
        },
        onError: (error) => {
            console.error('Error sending response:', error);
            alert('Failed to send response: ' + (error.message || 'Unknown error'));
        }
    });

    // PENDING MANAGER REVIEW
    if (offer.status === 'pending_manager_review') {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500 rounded-lg p-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-6 h-6 text-amber-400" />
                    <h3 className="text-amber-400 font-black text-lg font-mono">MANAGER REVIEW</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-amber-400 text-xs font-bold font-mono mb-2 block">YOUR NOTES</label>
                        <Textarea
                            value={managerNotes}
                            onChange={(e) => setManagerNotes(e.target.value)}
                            placeholder="Any thoughts for the band?"
                            className="bg-black border-2 border-gray-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-amber-400 text-xs font-bold font-mono mb-2 block">BAND MUST RESPOND BY (optional)</label>
                        <Input
                            type="datetime-local"
                            value={responseDeadline}
                            onChange={(e) => setResponseDeadline(e.target.value)}
                            className="bg-black border-2 border-gray-700 text-white"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => rejectMutation.mutate()}
                            disabled={rejectMutation.isPending}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            REJECT
                        </Button>
                        <Button
                            onClick={() => sendToBandMutation.mutate()}
                            disabled={sendToBandMutation.isPending}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            SEND TO BAND
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // SENT TO BAND - WAITING FOR VOTES
    if (offer.status === 'sent_to_band') {
        const responses = offer.band_responses || [];
        const yesVotes = responses.filter(r => r.response === 'yes').length;
        const noVotes = responses.filter(r => r.response === 'no').length;

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-cyan-400 font-black text-lg font-mono">BAND VOTING</h3>
                    </div>
                    {offer.response_deadline && (
                        <p className="text-xs text-gray-400 font-mono">
                            Deadline: {format(new Date(offer.response_deadline), 'd MMM HH:mm')}
                        </p>
                    )}
                </div>

                {offer.manager_notes && (
                    <div className="bg-black/60 rounded p-3 mb-4">
                        <p className="text-xs text-gray-400 font-mono mb-1">YOUR NOTES TO BAND:</p>
                        <p className="text-white text-sm font-mono">{offer.manager_notes}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-500/20 border-2 border-green-500 rounded p-3 text-center">
                        <ThumbsUp className="w-6 h-6 text-green-400 mx-auto mb-1" />
                        <p className="text-green-400 font-black text-2xl font-mono">{yesVotes}</p>
                        <p className="text-green-300 text-xs font-mono">YES</p>
                    </div>
                    <div className="bg-red-500/20 border-2 border-red-500 rounded p-3 text-center">
                        <ThumbsDown className="w-6 h-6 text-red-400 mx-auto mb-1" />
                        <p className="text-red-400 font-black text-2xl font-mono">{noVotes}</p>
                        <p className="text-red-300 text-xs font-mono">NO</p>
                    </div>
                </div>

                {responses.length > 0 && (
                    <div className="space-y-2 mb-4">
                        {responses.map((r, i) => (
                            <div key={i} className="bg-black/60 rounded p-2 flex items-center justify-between">
                                <span className="text-white text-sm font-mono">{r.member_name}</span>
                                <div className="flex items-center gap-2">
                                    {r.response === 'yes' ? (
                                        <span className="text-green-400 font-black text-xs">YES ✓</span>
                                    ) : (
                                        <span className="text-red-400 font-black text-xs">NO ✗</span>
                                    )}
                                    {r.notes && <span className="text-gray-400 text-xs">"{r.notes}"</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-black/60 rounded p-3">
                    <p className="text-xs text-cyan-400 font-mono mb-2">BAND VOTING LINK:</p>
                    <div className="flex gap-2">
                        <input
                            readOnly
                            value={`${window.location.origin}/ScottBandVote?offer=${offer.id}`}
                            className="flex-1 bg-gray-900 border border-gray-700 text-white text-xs font-mono p-2 rounded"
                        />
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/ScottBandVote?offer=${offer.id}`);
                                alert('Link copied!');
                            }}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold"
                        >
                            COPY
                        </Button>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-cyan-500">
                    <p className="text-cyan-300 font-bold text-center mb-3 font-mono">
                        {yesVotes} YES • {noVotes} NO
                    </p>
                    
                    <Button
                        onClick={async () => {
                            // Generate AI draft responses
                            const accept = await base44.integrations.Core.InvokeLLM({
                                prompt: `Write a professional acceptance email for this gig offer. Be warm, confirm details, ask about next steps. 

Gig: ${offer.venue}
Date: ${offer.date}
Fee: £${offer.fee}
Location: ${offer.city}
Promoter: ${offer.promoter}

Band voted YES. Keep it friendly, professional, Scott's voice.`
                            });

                            const reject = await base44.integrations.Core.InvokeLLM({
                                prompt: `Write a polite rejection email for this gig offer. Be respectful, leave door open for future.

Gig: ${offer.venue}
Date: ${offer.date}

Band can't do it. Keep it kind, professional, Scott's voice.`
                            });

                            await base44.entities.ScottGigOffer.update(offer.id, {
                                ai_draft_accept: accept,
                                ai_draft_reject: reject,
                                all_responses_in: true
                            });

                            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
                        }}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black mb-4"
                    >
                        ✨ GENERATE AI DRAFTS
                    </Button>

                    {offer.all_responses_in && (
                        <>
                            <Textarea
                                value={finalResponse}
                                onChange={(e) => setFinalResponse(e.target.value)}
                                placeholder={yesVotes > noVotes ? offer.ai_draft_accept : offer.ai_draft_reject}
                                className="bg-black border-2 border-gray-700 text-white mb-3"
                                rows={4}
                            />

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => sendResponseMutation.mutate(false)}
                                    disabled={sendResponseMutation.isPending}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black"
                                >
                                    SEND REJECTION
                                </Button>
                                <Button
                                    onClick={() => sendResponseMutation.mutate(true)}
                                    disabled={sendResponseMutation.isPending}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black"
                                >
                                    SEND ACCEPTANCE
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }

    // CONFIRMED OR REJECTED - DONE
    const isDone = offer.status === 'confirmed' || offer.status === 'rejected_by_band' || offer.status === 'rejected_by_manager';
    if (isDone) {
        const isConfirmed = offer.status === 'confirmed';
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-r ${isConfirmed ? 'from-green-500/20 to-emerald-500/20 border-green-500' : 'from-gray-500/20 to-slate-500/20 border-gray-500'} border-2 rounded-lg p-6`}
            >
                <div className="flex items-center gap-2 mb-4">
                    {isConfirmed ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                        <XCircle className="w-6 h-6 text-gray-400" />
                    )}
                    <h3 className={`${isConfirmed ? 'text-green-400' : 'text-gray-400'} font-black text-lg font-mono`}>
                        {isConfirmed ? 'CONFIRMED' : 'REJECTED'}
                    </h3>
                </div>

                {offer.final_response_sent && (
                    <div className="bg-black/60 rounded p-3">
                        <p className="text-xs text-gray-400 font-mono mb-1">RESPONSE SENT:</p>
                        <p className="text-white text-sm font-mono whitespace-pre-wrap">{offer.final_response_sent}</p>
                    </div>
                )}
            </motion.div>
        );
    }

    return null;
}