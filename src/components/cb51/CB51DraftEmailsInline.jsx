import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Mail, Loader, Copy, CheckCircle } from 'lucide-react';
import CB51DraftEmailModal from './CB51DraftEmailModal';

export default function CB51DraftEmailsInline({ artistId, onClose }) {
  const queryClient = useQueryClient();
  const [selectedGig, setSelectedGig] = useState(null);
  const [draftEmail, setDraftEmail] = useState(null);
  const [loadingDraft, setLoadingDraft] = useState(null);

  // Get confirmed gigs
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigsInline', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId, 
      status: 'confirmed'
    }),
    enabled: !!artistId,
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

      await base44.integrations.Core.SendEmail({
        to: draftEmail.to,
        subject: draftEmail.subject,
        body: emailBody
      });

      await base44.entities.GigOffer.update(selectedGig.id, {
        status: 'confirmed'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['confirmedGigsInline', artistId] });
      setDraftEmail(null);
      setSelectedGig(null);
    }
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/80"
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-auto bg-black border-t-2 lg:border-2 border-cyan-500/40 lg:rounded-lg p-4 w-full lg:w-96 max-h-[80vh] overflow-y-auto z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-cyan-400 font-bold text-sm font-mono">DRAFT EMAILS</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedGigs.length === 0 ? (
          <div className="bg-black border border-cyan-500/20 rounded-lg p-6 text-center">
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
                className="bg-black border border-green-500/40 rounded-lg p-3"
              >
                <div className="mb-2">
                  <h3 className="text-white font-bold text-xs mb-1">{gig.venue || gig.title}</h3>
                  <p className="text-gray-500 text-[11px]">{gig.date_start} • £{gig.fee || '0'}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">{gig.promoter_name}</p>
                </div>

                <button
                  onClick={() => handleGenerateDraft(gig)}
                  disabled={loadingDraft === gig.id}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-3 py-2 rounded font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2"
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
      </motion.div>

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
    </>
  );
}