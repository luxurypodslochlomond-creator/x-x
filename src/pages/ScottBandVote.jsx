import React, { useState } from 'react';
      import { base44 } from '@/api/base44Client';
      import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
      import { motion } from 'framer-motion';
      import { CheckCircle2, XCircle, Clock, ArrowLeft } from 'lucide-react';
      import { useNavigate } from 'react-router-dom';
      import { createPageUrl } from '@/utils';
      import OfflineMeshSync, { storeVoteOffline } from '@/components/scott/OfflineMeshSync';

export default function ScottBandVote() {
  const [selectedGigId, setSelectedGigId] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [reasonText, setReasonText] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get current user
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  // Get all gig offers where band member has a response pending
  const { data: myGigOffers = [], isLoading } = useQuery({
    queryKey: ['myGigOffers', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      
      // Get all responses for this band member
      const responses = await base44.entities.ScottBandResponse.filter({
        band_member_email: user.email
      });
      
      if (!responses.length) return [];
      
      // Get full gig offer details for each
      const offers = await Promise.all(
        responses.map(async (response) => {
          const gig = await base44.entities.ScottGigOffer.get(response.gig_offer_id);
          return { ...gig, myResponse: response };
        })
      );
      
      return offers.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    enabled: !!user?.email
  });

  // Submit vote
  const submitVoteMutation = useMutation({
    mutationFn: async (voteData) => {
      const response = await base44.entities.ScottBandResponse.update(
        voteData.responseId,
        {
          decision: voteData.decision,
          reason_if_no: voteData.decision === 'no' ? voteData.reason : null,
          responded_at: new Date().toISOString()
        }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGigOffers'] });
      setSelectedGigId(null);
      setSelectedAnswer(null);
      setReasonText('');
    }
  });

  const handleSubmitVote = () => {
    const gig = myGigOffers.find(g => g.id === selectedGigId);
    if (!gig) return;

    submitVoteMutation.mutate({
      responseId: gig.myResponse.id,
      decision: selectedAnswer,
      reason: reasonText
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-4 flex items-center justify-center">
        <p className="text-cyan-400 font-mono">LOADING GIGS...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-4 flex items-center justify-center">
        <p className="text-red-400 font-mono">NOT LOGGED IN</p>
      </div>
    );
  }

  const selectedGig = myGigOffers.find(g => g.id === selectedGigId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <h1 className="text-2xl font-black text-white font-mono">GIG VOTES</h1>
        </div>

        {myGigOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 font-mono">No gigs to vote on yet</p>
          </div>
        ) : !selectedGig ? (
          // List of gigs
          <div className="space-y-3">
            {myGigOffers.map(gig => {
              const hasVoted = gig.myResponse?.decision && gig.myResponse.decision !== 'pending';
              const voted = gig.myResponse?.decision || 'pending';

              return (
                <motion.button
                  key={gig.id}
                  onClick={() => setSelectedGigId(gig.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    voted === 'yes'
                      ? 'border-green-500/50 bg-green-500/10'
                      : voted === 'no'
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-cyan-500/50 bg-cyan-500/10 hover:border-cyan-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">{gig.venue_name}</h3>
                      <p className="text-gray-300 text-sm">{gig.promoter_name}</p>
                      <p className="text-cyan-300 text-xs mt-2">{gig.date} • £{gig.fee}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      {voted === 'yes' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      {voted === 'no' && <XCircle className="w-5 h-5 text-red-400" />}
                      {voted === 'pending' && <Clock className="w-5 h-5 text-amber-400 animate-pulse" />}
                      <span className="text-xs font-mono">
                        {voted === 'yes' && 'YES'}
                        {voted === 'no' && 'NO'}
                        {voted === 'pending' && 'PENDING'}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          // Voting interface
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Back button */}
            <button
              onClick={() => {
                setSelectedGigId(null);
                setSelectedAnswer(null);
                setReasonText('');
              }}
              className="text-cyan-400 hover:text-cyan-300 font-mono text-sm flex items-center gap-2"
            >
              ← BACK TO LIST
            </button>

            {/* Gig details */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-4">{selectedGig.venue_name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-xs font-mono mb-1">PROMOTER</p>
                  <p className="text-white font-bold">{selectedGig.promoter_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-mono mb-1">DATE</p>
                  <p className="text-white font-bold">{selectedGig.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-mono mb-1">FEE</p>
                  <p className="text-green-400 font-bold">£{selectedGig.fee}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-mono mb-1">MANAGER NOTES</p>
                  <p className="text-gray-300 text-sm">{selectedGig.manager_notes || 'None'}</p>
                </div>
              </div>
            </div>

            {/* Vote buttons */}
            <div className="space-y-3">
              <p className="text-gray-400 font-mono text-sm">YOUR DECISION:</p>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAnswer('yes')}
                  className={`py-4 rounded-lg font-black text-lg border-2 transition-all ${
                    selectedAnswer === 'yes'
                      ? 'bg-green-500 border-green-500 text-black'
                      : 'border-green-500/50 text-green-400 hover:border-green-500'
                  }`}
                >
                  👍 YES
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAnswer('no')}
                  className={`py-4 rounded-lg font-black text-lg border-2 transition-all ${
                    selectedAnswer === 'no'
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-red-500/50 text-red-400 hover:border-red-500'
                  }`}
                >
                  👎 NO
                </motion.button>
              </div>
            </div>

            {/* Reason if NO */}
            {selectedAnswer === 'no' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-gray-400 font-mono text-sm">WHY NOT? (CRITICAL FOR MANAGER)</p>
                <textarea
                  value={reasonText}
                  onChange={(e) => setReasonText(e.target.value)}
                  placeholder="Tell manager why you can't do this gig..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
                  rows={3}
                />
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitVote}
              disabled={!selectedAnswer || submitVoteMutation.isPending}
              className={`w-full py-4 rounded-lg font-black text-lg font-mono transition-all ${
                selectedAnswer
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-black'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {submitVoteMutation.isPending ? 'SUBMITTING...' : 'SUBMIT VOTE'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}