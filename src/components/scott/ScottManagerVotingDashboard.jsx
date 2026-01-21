import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * MANAGER VIEW - See all band member votes + reasons
 * Critical: Show "NO" reasons clearly so manager can act
 */

export default function ScottManagerVotingDashboard({ gigOfferId }) {
  const { data: responses = [] } = useQuery({
    queryKey: ['bandResponses', gigOfferId],
    queryFn: () => base44.entities.ScottBandResponse.filter({ gig_offer_id: gigOfferId })
  });

  const yesCount = responses.filter(r => r.decision === 'yes').length;
  const noCount = responses.filter(r => r.decision === 'no').length;
  const pendingCount = responses.filter(r => r.decision === 'pending').length;

  const allResponded = pendingCount === 0 && responses.length > 0;

  return (
    <div className="space-y-4">
      {/* Vote Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
          <p className="text-green-400 font-black font-mono text-xl">{yesCount}</p>
          <p className="text-green-300 text-xs font-mono">YES</p>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
          <p className="text-red-400 font-black font-mono text-xl">{noCount}</p>
          <p className="text-red-300 text-xs font-mono">NO</p>
        </div>
        <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-3 text-center">
          <p className="text-amber-400 font-black font-mono text-xl">{pendingCount}</p>
          <p className="text-amber-300 text-xs font-mono">PENDING</p>
        </div>
      </div>

      {/* Individual Responses */}
      <div className="space-y-2">
        {responses.map((response) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`border-l-4 p-3 rounded ${
              response.decision === 'yes'
                ? 'bg-green-500/10 border-green-500'
                : response.decision === 'no'
                  ? 'bg-red-500/10 border-red-500'
                  : 'bg-gray-900/50 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              {response.decision === 'yes' && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
              {response.decision === 'no' && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
              {response.decision === 'pending' && <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
              
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{response.band_member_name}</p>
                <p className={`text-xs font-mono font-black mt-1 ${
                  response.decision === 'yes' ? 'text-green-400' :
                  response.decision === 'no' ? 'text-red-400' :
                  'text-amber-400'
                }`}>
                  {response.decision?.toUpperCase()}
                </p>
                
                {/* CRITICAL: Show reason if NO */}
                {response.decision === 'no' && response.reason_if_no && (
                  <p className="text-red-300 text-xs mt-2 bg-red-500/20 p-2 rounded border border-red-500/30">
                    💬 {response.reason_if_no}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All Responded Alert */}
      {allResponded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-cyan-500/20 border border-cyan-500 rounded-lg p-3"
        >
          <p className="text-cyan-400 font-black font-mono text-sm">✓ ALL BAND MEMBERS VOTED</p>
        </motion.div>
      )}
    </div>
  );
}