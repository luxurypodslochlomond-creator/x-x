import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { Flag, Leaf, AlertTriangle, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveImpactFeed() {
    const [flaggingCleanup, setFlaggingCleanup] = useState(null);
    const [flagReason, setFlagReason] = useState('');
    const queryClient = useQueryClient();

    const { data: recentCleanups = [], isLoading } = useQuery({
        queryKey: ['liveImpactFeed'],
        queryFn: async () => {
            const cleanups = await base44.entities.Cleanup.list('-created_date', 20);
            return cleanups;
        },
        refetchInterval: 30000, // Refresh every 30 seconds
    });

    const flagMutation = useMutation({
        mutationFn: async ({ cleanup_id, reason }) => {
            return await base44.entities.FraudFlag.create({
                submission_id: cleanup_id,
                submission_type: 'cleanup',
                flagged_by: (await base44.auth.me()).email,
                flag_reason: reason,
                status: 'pending_ai_review'
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['liveImpactFeed'] });
            setFlaggingCleanup(null);
            setFlagReason('');
        }
    });

    const handleFlag = (e) => {
        e.preventDefault();
        if (!flagReason.trim()) return;
        flagMutation.mutate({
            cleanup_id: flaggingCleanup.id,
            reason: flagReason
        });
    };

    // Privacy-safe location display
    const getLocationDisplay = (cleanup) => {
        // Show city/town + county only, not exact coordinates
        if (cleanup.location && cleanup.county) {
            return `${cleanup.location}, ${cleanup.county}`;
        }
        return cleanup.county || 'Unknown';
    };

    if (isLoading) {
        return (
            <Card className="bg-black/60 border-2 border-gray-700">
                <CardContent className="p-6">
                    <p className="text-gray-400 text-center">Loading impact feed...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card className="bg-black/60 border-2 border-cyan-500/30">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white flex items-center gap-2">
                            <Leaf className="w-6 h-6 text-green-400" />
                            Live Impact Feed
                        </h3>
                        <p className="text-xs text-gray-500">Updates every 30s</p>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {recentCleanups.map((cleanup, i) => (
                            <motion.div
                                key={cleanup.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Check className="w-4 h-4 text-green-400" />
                                            <p className="text-white font-bold">
                                                {cleanup.litter_weight}kg cleaned
                                            </p>
                                        </div>
                                        
                                        <div className="space-y-1 text-sm">
                                            <p className="text-gray-300">
                                                📍 {getLocationDisplay(cleanup)}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                {formatDistanceToNow(new Date(cleanup.created_date), { addSuffix: true })}
                                            </p>
                                            {cleanup.cleanup_type && (
                                                <p className="text-cyan-400 text-xs capitalize">
                                                    {cleanup.cleanup_type.replace(/_/g, ' ')}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setFlaggingCleanup(cleanup)}
                                        className="text-gray-500 hover:text-red-400 transition-colors"
                                        title="Flag for review"
                                    >
                                        <Flag className="w-4 h-4" />
                                    </Button>
                                </div>

                                {cleanup.notes && (
                                    <p className="text-gray-400 text-xs italic mt-2 border-t border-white/10 pt-2">
                                        "{cleanup.notes}"
                                    </p>
                                )}
                            </motion.div>
                        ))}

                        {recentCleanups.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <Leaf className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No recent cleanups yet. Be the first!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* FLAG MODAL */}
            <AnimatePresence>
                {flaggingCleanup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-6"
                        onClick={() => setFlaggingCleanup(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md"
                        >
                            <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-2 border-red-500/50">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="w-8 h-8 text-red-400" />
                                            <div>
                                                <h3 className="text-xl font-black text-white">Flag for Review</h3>
                                                <p className="text-sm text-gray-400">Community fraud detection</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setFlaggingCleanup(null)}
                                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <p className="text-white font-bold mb-2">Cleanup Details:</p>
                                        <p className="text-sm text-gray-300">Weight: {flaggingCleanup.litter_weight}kg</p>
                                        <p className="text-sm text-gray-300">Location: {getLocationDisplay(flaggingCleanup)}</p>
                                        <p className="text-sm text-gray-300">
                                            Time: {formatDistanceToNow(new Date(flaggingCleanup.created_date), { addSuffix: true })}
                                        </p>
                                    </div>

                                    <form onSubmit={handleFlag} className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-300 mb-2 block">
                                                Why are you flagging this cleanup?
                                            </label>
                                            <Textarea
                                                value={flagReason}
                                                onChange={(e) => setFlagReason(e.target.value)}
                                                placeholder="e.g., 'Duplicate photos', 'Suspicious pattern', 'Fake location'..."
                                                className="bg-black/40 border-gray-600 text-white min-h-[100px]"
                                                required
                                            />
                                        </div>

                                        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3">
                                            <p className="text-xs text-yellow-300">
                                                ⚠️ This will be reviewed by AI51. False flags harm community trust.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setFlaggingCleanup(null)}
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={flagMutation.isPending}
                                                className="flex-1 bg-red-600 hover:bg-red-700"
                                            >
                                                {flagMutation.isPending ? 'Submitting...' : 'Submit Flag'}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}