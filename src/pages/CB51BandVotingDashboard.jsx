import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Users, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BAND VOTING DASHBOARD - Manager view
 * See all gigs currently in voting phase + live vote counts
 * No spam, just live progress
 */

export default function CB51BandVotingDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('id');
  const [expandedGigs, setExpandedGigs] = useState(new Set());

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
            <p className="text-gray-400 text-sm font-mono mt-1">{gigsInVoting.length} gig{gigsInVoting.length !== 1 ? 's' : ''} waiting</p>
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
              const bandSize = votes.yes + votes.no + 1; // Estimate from votes + pending
              const pending = Math.max(1, bandSize - votes.total);
              const allConfirmed = votes.yes === bandSize;
              const hasRejection = votes.no > 0;

              const isExpanded = expandedGigs.has(gig.id);

              return (
                <motion.div
                  key={gig.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-gradient-to-r from-rose-950/40 to-amber-950/20 rounded-xl border border-rose-500/20 overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.1)'
                  }}
                  onClick={() => {
                    const newExpanded = new Set(expandedGigs);
                    if (isExpanded) {
                      newExpanded.delete(gig.id);
                    } else {
                      newExpanded.add(gig.id);
                    }
                    setExpandedGigs(newExpanded);
                  }}
                >
                  <div className="p-6">
                    {/* GIG INFO */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-white mb-1">{gig.venue || gig.title || 'Gig'}</h3>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-2" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <div className="space-y-1">
                        {gig.date_start && (
                          <p className="text-sm text-gray-400 font-mono">📅 {gig.date_start}</p>
                        )}
                        {gig.fee && (
                          <p className="text-sm text-green-400 font-mono">💰 £{gig.fee}</p>
                        )}
                        {gig.promoter_name && (
                          <p className="text-sm text-gray-400 font-mono">🎤 {gig.promoter_name}</p>
                        )}
                        {!isExpanded && gig.offer_details && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{gig.offer_details}</p>
                        )}
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
                  </div>

                  {/* EXPANDED DETAILS */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10 overflow-hidden"
                      >
                        <div className="p-6 space-y-4 bg-black/20">
                          {/* Full offer details */}
                          {gig.offer_details && (
                            <div>
                              <h4 className="text-xs text-cyan-400 font-mono uppercase mb-2">Offer Details</h4>
                              <p className="text-sm text-gray-300 whitespace-pre-wrap">{gig.offer_details}</p>
                            </div>
                          )}

                          {/* Location */}
                          {gig.location && (
                            <div>
                              <h4 className="text-xs text-cyan-400 font-mono uppercase mb-2">Location</h4>
                              <p className="text-sm text-gray-300">{gig.location}</p>
                            </div>
                          )}

                          {/* Contact */}
                          {(gig.promoter_email || gig.promoter_phone) && (
                            <div>
                              <h4 className="text-xs text-cyan-400 font-mono uppercase mb-2">Contact</h4>
                              {gig.promoter_email && (
                                <p className="text-sm text-gray-300">✉️ {gig.promoter_email}</p>
                              )}
                              {gig.promoter_phone && (
                                <p className="text-sm text-gray-300">📞 {gig.promoter_phone}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}