import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Check, X, Loader } from 'lucide-react';

export default function CB51GigOfferVoting({ gigOffer, onVoted }) {
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(null);

  const handleVote = async (vote) => {
    setLoading(true);
    try {
      await base44.functions.invoke('approveGigAndNotifyBand', {
        gigOfferId: gigOffer.id,
        managerApproval: vote === 'yes',
        bandMemberEmails: gigOffer.band_member_emails || []
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
        <p className={voted === 'yes' ? 'text-green-400' : 'text-red-400'}>
          {voted === 'yes' ? '✅ Band voting now...' : '❌ Declined'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => handleVote('yes')}
        disabled={loading}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
        YES
      </Button>
      <Button
        onClick={() => handleVote('no')}
        disabled={loading}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : <X className="w-4 h-4 mr-2" />}
        NO
      </Button>
    </div>
  );
}