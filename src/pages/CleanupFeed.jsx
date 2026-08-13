import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Weight, AlertTriangle, CheckCircle, X, Flag } from 'lucide-react';
import { COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import CleanupImage from '@/components/cleanup/CleanupImage';


export default function CleanupFeedPage() {
  const [flaggingCleanup, setFlaggingCleanup] = useState(null);
  const [flagReason, setFlagReason] = useState('');
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: cleanups = [], isLoading } = useQuery({
    queryKey: ['allCleanups'],
    queryFn: async () => {
      const data = await base44.entities.Cleanup.list('-created_date', 100);
      return data;
    },
    staleTime: 30000, // Cache for 30s
    gcTime: 5 * 60 * 1000, // Keep in cache for 5min
    refetchOnWindowFocus: false, // Don't refetch on tab switch
  });

  const flagMutation = useMutation({
    mutationFn: async ({ cleanupId, reason }) => {
      await base44.entities.FraudFlag.create({
        cleanup_id: cleanupId,
        reason,
        flagged_by: user?.email || 'anonymous',
        status: 'pending_review'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCleanups'] });
      setFlaggingCleanup(null);
      setFlagReason('');
    },
  });

  const handleFlag = (cleanup) => {
    setFlaggingCleanup(cleanup);
  };

  const submitFlag = () => {
    if (!flagReason.trim()) return;
    flagMutation.mutate({
      cleanupId: flaggingCleanup.id,
      reason: flagReason
    });
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-cyan-400 font-mono">Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-950 to-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black text-cyan-400 font-mono">CLEANUP FEED</h1>
          <p className="text-gray-400 font-mono">Real-time community verification • Flag suspicious activity</p>
        </motion.div>

        {/* FLAGGING MODAL */}
        <AnimatePresence>
          {flaggingCleanup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setFlaggingCleanup(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-red-900/90 to-orange-900/90 border-4 border-red-500 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                style={{ boxShadow: '0 0 60px rgba(239, 68, 68, 0.6)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-red-400 font-mono flex items-center gap-3">
                    <AlertTriangle className="w-10 h-10" />
                    FLAG CLEANUP
                  </h2>
                  <Button
                    onClick={() => setFlaggingCleanup(null)}
                    className="bg-black/50 hover:bg-black/70"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <CleanupImage 
                                                      src={flaggingCleanup.photo_url}
                                                      alt="Cleanup photo"
                                                      className="w-full h-64 object-cover rounded-xl border-4 border-red-500"
                                                    />
                  
                  <div className="bg-black/60 rounded-xl p-4 font-mono text-sm space-y-2">
                    <p><strong className="text-red-400">ID:</strong> {flaggingCleanup.id}</p>
                    <p><strong className="text-red-400">User:</strong> Anonymous (ID: {flaggingCleanup.created_by_id?.slice(-8)})</p>
                    <p><strong className="text-red-400">Weight:</strong> {flaggingCleanup.litter_weight} kg</p>
                    <p><strong className="text-red-400">Location:</strong> {flaggingCleanup.location || 'Not specified'}</p>
                  </div>

                  <Textarea
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    placeholder="Why are you flagging this cleanup? Be specific..."
                    className="bg-black/60 border-red-500/50 text-white font-mono"
                    rows={4}
                  />

                  <Button
                    onClick={submitFlag}
                    disabled={!flagReason.trim() || flagMutation.isPending}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 text-xl font-mono"
                  >
                    {flagMutation.isPending ? 'SUBMITTING...' : 'SUBMIT FLAG'}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CLEANUPS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cleanups.map((cleanup, index) => (
            <motion.div
              key={cleanup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-black/60 border-2 border-cyan-500/30 backdrop-blur-sm overflow-hidden" style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}>
                <CardContent className="p-0">
                  <CleanupImage 
                                                      src={cleanup.photo_url}
                                                      alt="Cleanup photo"
                                                      className="w-full h-64 object-cover"
                                                    />
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400">
                        {format(new Date(cleanup.created_date), 'dd MMM yyyy HH:mm')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-mono font-bold ${
                        cleanup.verification_status === 'fully_verified' ? 'bg-green-500/20 text-green-400' :
                        cleanup.verification_status === 'instant_paid' ? 'bg-cyan-500/20 text-cyan-400' :
                        cleanup.verification_status === 'pending_verification' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {cleanup.verification_status === 'fully_verified' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : null}
                        {cleanup.verification_status?.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Weight className="w-4 h-4" />
                        <span className="font-bold">{cleanup.litter_weight} kg</span>
                      </div>
                      
                      {cleanup.location && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs truncate">{cleanup.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-pink-400 font-bold">{cleanup.tokens_awarded || 0} $P51</span>
                      </div>

                      {cleanup.notes && (
                        <p className="text-xs text-gray-400 line-clamp-2">{cleanup.notes}</p>
                      )}
                    </div>

                    <Button
                      onClick={() => handleFlag(cleanup)}
                      className="w-full bg-red-600/80 hover:bg-red-600 text-white font-mono text-sm py-3 mt-2"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Flag Suspicious
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {cleanups.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-mono text-lg">No cleanups yet. Be the first!</p>
          </div>
        )}
      </div>
    </div>
  );
}