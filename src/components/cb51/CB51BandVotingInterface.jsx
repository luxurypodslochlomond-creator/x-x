import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Loader } from 'lucide-react';

export default function CB51BandVotingInterface({ gigOffer, bandMemberEmail, onVoted }) {
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(null);
  const [reason, setReason] = useState('');

  const handleVote = async (vote) => {
    setLoading(true);
    try {
      await base44.functions.invoke('processBandVoteResponse', {
        gigOfferId: gigOffer.id,
        bandMemberEmail,
        vote,
        reason: vote === 'no' ? reason : null
      });
      setVoted(vote);
      onVoted?.(vote);
    } catch (error) {
      console.error('Vote error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (voted) {
    return (
      <div className={`p-4 rounded-lg border-2 ${voted === 'yes' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
        <p className={voted === 'yes' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
          {voted === 'yes' ? '✅ You\'re in!' : '❌ Declined'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          onClick={() => handleVote('yes')}
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-lg"
        >
          {loading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
          YES
        </Button>
        <Button
          onClick={() => handleVote('no')}
          disabled={loading}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-12 text-lg"
        >
          {loading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : <X className="w-5 h-5 mr-2" />}
          NO
        </Button>
      </div>

      {gigOffer && (
        <div className="text-sm text-cyan-300 space-y-1">
          <p><strong>{gigOffer.venue_name}</strong></p>
          <p>{gigOffer.date} @ {gigOffer.time}</p>
        </div>
      )}

      {reason !== '' && (
        <div>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why not? (one sentence)"
            className="bg-black/40 border-red-500/30 text-white placeholder-gray-500 h-20"
          />
        </div>
      )}
    </div>
  );
}