import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function CB51GigVoteTally({ gigOfferId, bandMembers = [] }) {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const allVotes = await base44.entities.GigVote.filter({
          gig_offer_id: gigOfferId
        });
        setVotes(allVotes || []);
      } catch (error) {
        console.error('Load votes error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVotes();

    // Real-time subscription
    const unsubscribe = base44.entities.GigVote.subscribe((event) => {
      if (event.data?.gig_offer_id === gigOfferId) {
        loadVotes();
      }
    });

    return unsubscribe;
  }, [gigOfferId]);

  const yesCount = votes.filter(v => v.vote_response === 'yes').length;
  const noCount = votes.filter(v => v.vote_response === 'no').length;
  const noResponses = votes.filter(v => v.vote_response === 'no');
  const totalExpected = bandMembers.length;
  const responded = votes.length;

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-400"><Loader className="w-4 h-4 animate-spin" /> Loading...</div>;
  }

  return (
    <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-2xl font-black text-green-500">{yesCount}</span>
          </div>
          <p className="text-xs text-gray-400">YES</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <span className="text-2xl font-black text-red-500">{noCount}</span>
          </div>
          <p className="text-xs text-gray-400">NO</p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10">
        <p className="text-xs text-gray-500 mb-2">{responded} of {totalExpected} responded</p>
        <div className="w-full bg-black/60 rounded-full h-2">
          <div 
            className="bg-cyan-500 h-2 rounded-full transition-all"
            style={{ width: totalExpected > 0 ? `${(responded / totalExpected) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {noResponses.length > 0 && (
        <div className="pt-3 border-t border-white/10 space-y-2">
          <p className="text-xs font-bold text-red-400">Reasons:</p>
          {noResponses.map(v => (
            <div key={v.id} className="text-xs text-red-300 bg-red-500/5 p-2 rounded border border-red-500/20">
              <p className="font-mono text-gray-400">{v.voter_email.split('@')[0]}</p>
              <p>{v.reason_if_no}</p>
            </div>
          ))}
        </div>
      )}

      {yesCount === totalExpected && totalExpected > 0 && (
        <div className="pt-3 border-t border-white/10 bg-green-500/10 p-3 rounded border border-green-500/30">
          <p className="text-green-400 font-bold text-sm">🎉 All confirmed! Send acceptance email.</p>
        </div>
      )}
    </div>
  );
}