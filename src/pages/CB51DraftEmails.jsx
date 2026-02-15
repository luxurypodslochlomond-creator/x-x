import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mail, CheckCircle, Loader, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51DraftEmailModal from '@/components/cb51/CB51DraftEmailModal';

export default function CB51DraftEmails() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedGig, setSelectedGig] = useState(null);
  const [draftEmail, setDraftEmail] = useState(null);
  const [loadingDraft, setLoadingDraft] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('artistId');

  // Get all gigs where band voted YES unanimously
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer.filter({ 
        artist_id: artistId,
        status: 'band_voting'
      });

      // Filter to only show gigs where ALL votes are YES and band members exist
      const gigsWithVotes = await Promise.all(
        gigs.map(async (gig) => {
          const votes = await base44.entities.GigVote.filter({ gig_id: gig.id });
          const bandMembers = await base44.entities.TeamMember.filter({ artist_id: gig.artist_id });
          
          // All votes must be YES, and vote count must match band size
          const allYes = votes.every(v => v.vote_type === 'yes');
          const allVotedIn = votes.length === bandMembers.length;
          const hasVotes = votes.length > 0;
          
          return allYes && allVotedIn && hasVotes ? gig : null;
        })
      );

      return gigsWithVotes.filter(Boolean);
    },
    enabled: !!artistId,
    refetchInterval: 5000
  });

  const handleGenerateDraft = async (gig) => {
    setLoadingDraft(gig.id);
    try {
      const res = await base44.functions.invoke('generateGigConfirmationEmail', {
        gigId: gig.id,
        artistId: artistId
      });
      
      const draft = res.data?.draft || res.draft;
      setDraftEmail(draft);
      setSelectedGig(gig);
    } catch (err) {
      console.error('Draft generation failed:', err);
    } finally {
      setLoadingDraft(null);
    }
  };

  const sendEmailMutation = useMutation({
    mutationFn: async (emailBody) => {
      if (!selectedGig || !draftEmail) return;

      // Send the email
      await base44.integrations.Core.SendEmail({
        to: draftEmail.to,
        subject: draftEmail.subject,
        body: emailBody
      });

      // Update gig status to confirmed
      await base44.entities.GigOffer.update(selectedGig.id, {
        status: 'confirmed'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['confirmedGigs', artistId] });
      setDraftEmail(null);
      setSelectedGig(null);
    }
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mb-6 font-mono text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </button>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-mono font-black text-white mb-2">DRAFT EMAILS</h1>
          <p className="text-gray-500 text-xs font-mono">Gigs ready to confirm to promoter</p>
        </div>

        {/* GIGS LIST */}
        {confirmedGigs.length === 0 ? (
          <div className="bg-black border border-cyan-500/20 rounded-lg p-8 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No gigs ready to confirm</p>
          </div>
        ) : (
          <div className="space-y-3">
            {confirmedGigs.map((gig) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black border border-green-500/40 rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm mb-1">{gig.venue || gig.title}</h3>
                    <p className="text-gray-500 text-xs">{gig.date_start} • £{gig.fee || '0'}</p>
                    <p className="text-gray-600 text-xs mt-1">{gig.promoter_name}</p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/40 rounded px-2 py-1">
                    <p className="text-green-400 text-[10px] font-bold font-mono">ALL YES</p>
                  </div>
                </div>

                <button
                  onClick={() => handleGenerateDraft(gig)}
                  disabled={loadingDraft === gig.id}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-4 py-2 rounded font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {loadingDraft === gig.id ? (
                    <>
                      <Loader className="w-3 h-3 animate-spin" />
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Mail className="w-3 h-3" />
                      DRAFT EMAIL
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* DRAFT EMAIL MODAL */}
      <AnimatePresence>
        {draftEmail && (
          <CB51DraftEmailModal
            draft={draftEmail}
            onClose={() => {
              setDraftEmail(null);
              setSelectedGig(null);
            }}
            onSend={(emailBody) => sendEmailMutation.mutate(emailBody)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}