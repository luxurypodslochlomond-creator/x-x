import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

/**
 * CB51 Vote Breakdown - Live vote counter
 * Shows YES / NO / PENDING in real-time as band votes
 */

export default function CB51VoteBreakdown({ gigOfferId }) {
  const { data: responses = [], isLoading } = useQuery({
    queryKey: ['gigVotes', gigOfferId],
    queryFn: () => base44.entities.ScottBandResponse.filter({
      gig_offer_id: gigOfferId
    }),
    refetchInterval: 1000, // Poll every second for live feel
    staleTime: 0
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const unsubscribe = base44.entities.ScottBandResponse.subscribe((event) => {
      // Refetch on any change
      // (React Query will handle the update)
    });

    return unsubscribe;
  }, [gigOfferId]);

  const yes = responses.filter(r => r.vote === 'yes').length;
  const no = responses.filter(r => r.vote === 'no').length;
  const pending = responses.filter(r => r.vote === 'pending').length;
  const total = responses.length;

  if (isLoading || total === 0) return null;

  const yesPercent = total > 0 ? Math.round((yes / total) * 100) : 0;
  const noPercent = total > 0 ? Math.round((no / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black/40 border border-cyan-500/20 rounded p-3 space-y-2"
    >
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-gray-400">Band votes:</span>
        <span className="text-cyan-400 font-bold">{yes + no}/{total}</span>
      </div>

      {/* Vote bars */}
      <div className="space-y-1">
        {/* YES */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${yesPercent}%` }}
            transition={{ duration: 0.3 }}
            className="h-2 bg-green-500 rounded"
          />
          <span className="text-green-400 text-[10px] font-bold w-8">
            ✓ {yes}
          </span>
        </div>

        {/* NO */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${noPercent}%` }}
            transition={{ duration: 0.3 }}
            className="h-2 bg-red-500 rounded"
          />
          <span className="text-red-400 text-[10px] font-bold w-8">
            ✕ {no}
          </span>
        </div>
      </div>

      {/* Pending indicator */}
      {pending > 0 && (
        <p className="text-gray-500 text-[10px] font-mono">
          ⏳ {pending} waiting...
        </p>
      )}

      {/* Show reasons if any NOs */}
      {no > 0 && (
        <div className="border-t border-red-500/20 pt-2 space-y-1">
          {responses
            .filter(r => r.vote === 'no' && r.reason)
            .map(r => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 rounded p-2"
              >
                <p className="text-red-400 text-[9px] font-mono font-bold">
                  {r.band_member_name}
                </p>
                <p className="text-red-400/60 text-[9px]">{r.reason}</p>
              </motion.div>
            ))}
        </div>
      )}
    </motion.div>
  );
}