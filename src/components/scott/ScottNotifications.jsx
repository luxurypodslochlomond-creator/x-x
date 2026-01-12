import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tantml:invoke>
import { CheckCircle, XCircle, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

/**
 * CB51 NOTIFICATIONS - SIMPLE YES/NO
 * Web Push API for browser notifications
 * Clutter-free, stress-free, streamlined
 */

export default function ScottNotifications({ offer, artist, onResponse }) {
    const queryClient = useQueryClient();
    const [responding, setResponding] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [reason, setReason] = useState('');

    const updateMutation = useMutation({
        mutationFn: ({ offerId, response, memberName, reason }) => {
            const currentResponses = offer.band_responses || [];
            const newResponse = {
                member_name: memberName,
                response: response,
                notes: reason || null,
                responded_at: new Date().toISOString()
            };
            
            const updated = [...currentResponses, newResponse];
            const allResponded = updated.length === (artist?.members?.length || 0);
            const allYes = updated.every(r => r.response === 'yes');
            
            return base44.entities.ScottGigOffer.update(offerId, {
                band_responses: updated,
                all_responses_in: allResponded,
                status: allResponded && allYes ? 'accepted_by_band' : offer.status
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
            setShowReason(false);
            setReason('');
            onResponse?.();
        }
    });

    const handleResponse = async (response) => {
        if (response === 'no') {
            setShowReason(true);
            return;
        }

        setResponding(true);
        try {
            const user = await base44.auth.me();
            await updateMutation.mutateAsync({
                offerId: offer.id,
                response: response,
                memberName: user.full_name || user.email
            });
        } catch (error) {
            alert('Error: ' + error.message);
        }
        setResponding(false);
    };

    const submitNo = async () => {
        if (!reason.trim()) {
            alert('Please add a reason');
            return;
        }

        setResponding(true);
        try {
            const user = await base44.auth.me();
            await updateMutation.mutateAsync({
                offerId: offer.id,
                response: 'no',
                memberName: user.full_name || user.email,
                reason: reason
            });
        } catch (error) {
            alert('Error: ' + error.message);
        }
        setResponding(false);
    };

    // Check if current user already responded
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    const myResponse = (offer.band_responses || []).find(r => 
        r.member_name === (user?.full_name || user?.email)
    );

    if (myResponse) {
        return (
            <div className="bg-black border-2 border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-mono text-sm">
                    ✓ You responded: {myResponse.response === 'yes' ? '✓ YES' : '✗ NO'}
                </p>
                {myResponse.notes && (
                    <p className="text-gray-600 text-xs font-mono mt-1">Reason: {myResponse.notes}</p>
                )}
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-black to-gray-950 border-4 border-cyan-500 rounded-2xl p-6">
            <div className="mb-6">
                <p className="text-white font-black text-xl font-mono mb-2">{offer.venue}</p>
                <p className="text-cyan-400 font-mono mb-1">
                    {format(new Date(offer.date), 'd MMM yyyy')} • £{offer.fee?.toLocaleString()}
                </p>
                <p className="text-gray-600 text-xs font-mono">{offer.city}, {offer.country}</p>
            </div>

            <AnimatePresence mode="wait">
                {!showReason ? (
                    <motion.div
                        key="buttons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <button
                            onClick={() => handleResponse('yes')}
                            disabled={responding}
                            className="bg-green-500 hover:bg-green-600 text-white font-black py-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                            style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
                        >
                            {responding ? <Loader2 className="w-7 h-7 animate-spin" /> : <CheckCircle className="w-7 h-7" />}
                            <span className="text-2xl font-mono">YES</span>
                        </button>

                        <button
                            onClick={() => handleResponse('no')}
                            disabled={responding}
                            className="bg-red-500 hover:bg-red-600 text-white font-black py-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                            style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)' }}
                        >
                            <XCircle className="w-7 h-7" />
                            <span className="text-2xl font-mono">NO</span>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reason"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="bg-black border-2 border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-mono text-sm mb-3">Why can't you make it?</p>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full bg-black border-2 border-gray-900 text-white rounded-lg p-3 font-mono text-sm min-h-[100px]"
                                placeholder="Simple sentence here..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowReason(false)}
                                className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-400 font-bold py-3 rounded-xl font-mono"
                            >
                                BACK
                            </button>
                            <button
                                onClick={submitNo}
                                disabled={responding || !reason.trim()}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-3 rounded-xl font-mono flex items-center justify-center gap-2"
                            >
                                {responding ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEND NO'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* RESPONSES FROM OTHERS */}
            {(offer.band_responses || []).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-900">
                    <p className="text-gray-600 text-xs font-mono mb-3">BAND RESPONSES</p>
                    <div className="space-y-2">
                        {offer.band_responses.map((resp, i) => (
                            <div key={i} className="bg-black border border-gray-900 rounded p-2 flex items-start justify-between">
                                <div>
                                    <p className="text-white text-sm font-mono">{resp.member_name}</p>
                                    {resp.notes && <p className="text-gray-600 text-xs font-mono mt-1">{resp.notes}</p>}
                                </div>
                                <span className={`text-sm font-black font-mono ${resp.response === 'yes' ? 'text-green-400' : 'text-red-400'}`}>
                                    {resp.response === 'yes' ? '✓' : '✗'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}