import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Copy, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Shows confirmed gigs where all band voted YES
 * Displays the AI-drafted email for manager to send to promoter
 */
export default function CB51ConfirmedGigDraftEmail({ artistId }) {
  const [openGigId, setOpenGigId] = useState(null);
  const [copied, setCopied] = useState(false);

  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigsWithDraft', artistId],
    queryFn: () => base44.entities.GigOffer.filter({
      artist_id: artistId,
      status: 'confirmed'
    }),
    enabled: !!artistId,
    refetchInterval: 5000
  });

  // Only show gigs that have a draft email (band confirmed) and haven't had email sent
  const gigsWithDraft = confirmedGigs.filter(g => g.ai_draft_accept && !g.response_sent_date);

  if (gigsWithDraft.length === 0) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-400" />
        <span className="text-green-400 font-mono font-bold text-xs uppercase tracking-wider">
          Band Confirmed — Send to Promoter
        </span>
      </div>

      {gigsWithDraft.map(gig => (
        <motion.div
          key={gig.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-950/20 border-2 border-green-500/40 rounded-xl overflow-hidden"
          style={{ boxShadow: '0 4px 24px rgba(34, 197, 94, 0.15)' }}
        >
          {/* HEADER */}
          <button
            onClick={() => setOpenGigId(openGigId === gig.id ? null : gig.id)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div>
              <p className="text-white font-bold">{gig.venue || gig.title}</p>
              <p className="text-green-400 text-xs font-mono">
                ✅ All band said YES · Draft ready to send
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-green-400 transition-transform ${openGigId === gig.id ? 'rotate-180' : ''}`} />
          </button>

          {/* DRAFT EMAIL */}
          <AnimatePresence>
            {openGigId === gig.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 border-t border-green-500/20">
                  <p className="text-gray-500 text-xs pt-3 font-mono">AI DRAFT — copy and send to promoter:</p>
                  <div className="bg-black/60 border border-green-500/20 rounded-lg p-4">
                    <p className="text-gray-200 text-sm whitespace-pre-line leading-relaxed">
                      {gig.ai_draft_accept}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(gig.ai_draft_accept)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy Email'}
                    </button>
                    {gig.promoter_email && (
                      <a
                        href={`mailto:${gig.promoter_email}?body=${encodeURIComponent(gig.ai_draft_accept)}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Open Email
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}