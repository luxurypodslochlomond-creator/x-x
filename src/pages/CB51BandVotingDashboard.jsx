import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * BAND VOTING DASHBOARD - Manager view
 * See all gigs currently in voting phase + live vote counts
 * No spam, just live progress
 */

export default function CB51BandVotingDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('id');

  const { data: gigsInVoting = [], isLoading } = useQuery({
    queryKey: ['gigsInVoting', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      const gigs = await base44.entities.GigOffer.filter({
        artist_id: artistId,
        status: 'band_voting'
      });
      // Deduplicate by ID
      const seen = new Set();
      return gigs.filter(g => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });
    },
    enabled: !!artistId,
    refetchInterval: 2000 // Poll every 2s for live votes
  });

  const { data: allVotes = [] } = useQuery({
    queryKey: ['allVotes', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      const gigs = await base44.entities.GigOffer.filter({
        artist_id: artistId,
        status: 'band_voting'
      });
      const gigIds = gigs.map(g => g.id);
      
      if (gigIds.length === 0) return [];
      
      const votes = [];
      for (const gigId of gigIds) {
        const gigVotes = await base44.entities.GigVote.filter({
          gig_id: gigId,
          voted_by_role: 'band_member'
        });
        votes.push(...gigVotes);
      }
      return votes;
    },
    enabled: !!artistId,
    refetchInterval: 2000
  });

  const getVoteCount = (gigId) => {
    const gigVotes = allVotes.filter(v => v.gig_id === gigId);
    return {
      yes: gigVotes.filter(v => v.vote_type === 'yes').length,
      no: gigVotes.filter(v => v.vote_type === 'no').length,
      total: gigVotes.length
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-cyan-400">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black">Band Voting</h1>
        </div>
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-3xl font-black">Band Voting</h1>
            <p className="text-gray-400 text-sm font-mono mt-1">{gigsInVoting.length} gigs waiting</p>
          </div>
        </div>

        {gigsInVoting.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No gigs currently in voting</p>
          </div>
        ) : (
          <div className="space-y-4">
            {gigsInVoting.map((gig) => {
              const votes = getVoteCount(gig.id);
              const bandSize = 4; // TODO: Get actual band member count
              const pending = bandSize - votes.total;
              const allConfirmed = votes.yes === bandSize;
              const hasRejection = votes.no > 0;

              return (
                <motion.div
                  key={gig.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-gradient-to-r from-rose-950/40 to-amber-950/20 rounded-xl p-6 border border-rose-500/20"
                  style={{
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.1)'
                  }}
                >
                  {/* GIG INFO */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-1">{gig.venue}</h3>
                    <div className="flex gap-4 text-sm text-gray-400 font-mono">
                      <span>{gig.date}</span>
                      <span>£{gig.fee}</span>
                    </div>
                  </div>

                  {/* VOTE PROGRESS */}
                  <div className="space-y-3">
                    {/* YES votes */}
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div className="flex-1">
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                            style={{ width: `${(votes.yes / bandSize) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-mono text-green-400">{votes.yes}/{bandSize}</span>
                    </div>

                    {/* NO votes */}
                    {votes.no > 0 && (
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400 font-mono">{votes.no} rejected</span>
                      </div>
                    )}

                    {/* Pending */}
                    {pending > 0 && (
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500 font-mono">{pending} waiting...</span>
                      </div>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    {allConfirmed ? (
                      <p className="text-sm text-green-400 font-bold">✓ Ready to send to agent</p>
                    ) : hasRejection ? (
                      <p className="text-sm text-red-400 font-bold">⚠ Discuss rejections with band</p>
                    ) : (
                      <p className="text-sm text-amber-400 font-bold">Waiting on {pending}...</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}