import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Clock, Users, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import CB51DraftEmailsInline from './CB51DraftEmailsInline.jsx';

/**
 * CB51 ACTION DASHBOARD
 * Clean, tappable cards showing what manager needs to do
 * Replaces clunky modal with simple action list
 */

export default function CB51ActionDashboard({ artistId }) {
  const navigate = useNavigate();
  const [showDraftModal, setShowDraftModal] = React.useState(false);
  const queryClient = React.useQueryClient();

  // Pending gig approvals
  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer.filter({ 
        artist_id: artistId,
        status: 'manager_reviewing'
      });
      const seen = new Set();
      return gigs.filter(g => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });
    },
    enabled: !!artistId,
    refetchInterval: 5000
  });

  // Band voting in progress
  const { data: votingGigs = [] } = useQuery({
    queryKey: ['votingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId, 
      status: 'band_voting' 
    }),
    enabled: !!artistId,
    refetchInterval: 5000
  });

  // Confirmed gigs waiting for email
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ 
      artist_id: artistId, 
      status: 'confirmed'
    }),
    enabled: !!artistId,
    refetchInterval: 10000
  });

  const actions = [];

  // URGENT: Gigs need approval
  if (pendingGigs.length > 0) {
    actions.push({
      id: 'pending-approval',
      title: `${pendingGigs.length} gig${pendingGigs.length > 1 ? 's' : ''} need YES/NO`,
      subtitle: pendingGigs[0]?.venue || 'Tap to review',
      icon: Clock,
      color: 'red',
      priority: 1,
      action: () => {} // Already on page
    });
  }

  // IN PROGRESS: Band voting
  if (votingGigs.length > 0) {
    actions.push({
      id: 'band-voting',
      title: `${votingGigs.length} gig${votingGigs.length > 1 ? 's' : ''} - Band voting`,
      subtitle: 'Waiting for band votes',
      icon: Users,
      color: 'cyan',
      priority: 2,
      action: () => navigate(createPageUrl('CB51BandVotingDashboard') + `?id=${artistId}`)
    });
  }

  // READY: Draft emails
  if (confirmedGigs.length > 0) {
    actions.push({
      id: 'draft-email',
      title: `${confirmedGigs.length} draft email${confirmedGigs.length > 1 ? 's' : ''} ready`,
      subtitle: 'Tap to copy & send',
      icon: Mail,
      color: 'green',
      priority: 3,
      action: () => setShowDraftModal(true)
    });
  }

  if (actions.length === 0) {
    return (
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
        <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
        <p className="text-green-400 font-bold text-sm">All clear</p>
        <p className="text-gray-500 text-xs mt-1">No pending actions</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {actions.sort((a, b) => a.priority - b.priority).map((action) => {
          const Icon = action.icon;
          const colorMap = {
            red: { bg: 'bg-red-900/20', border: 'border-red-500/40', text: 'text-red-400', icon: 'text-red-400' },
            cyan: { bg: 'bg-cyan-900/20', border: 'border-cyan-500/40', text: 'text-cyan-400', icon: 'text-cyan-400' },
            green: { bg: 'bg-green-900/20', border: 'border-green-500/40', text: 'text-green-400', icon: 'text-green-400' }
          };
          const colors = colorMap[action.color];

          return (
            <motion.button
              key={action.id}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className={`w-full ${colors.bg} border ${colors.border} rounded-lg p-4 flex items-center gap-3 transition-all hover:border-opacity-100`}
            >
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`${colors.text} font-bold text-sm`}>{action.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{action.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showDraftModal && (
          <CB51DraftEmailsInline
            artistId={artistId}
            onClose={() => setShowDraftModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}