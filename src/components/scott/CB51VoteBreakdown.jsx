import React, { useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function CB51VoteBreakdown({ gigOfferId }) {
  const { data: responses = [], isLoading } = useQuery({
    queryKey: ['bandResponses', gigOfferId],
    queryFn: () => base44.entities.ScottBandResponse.filter({ gig_offer_id: gigOfferId }),
    enabled: !!gigOfferId,
    refetchInterval: 5000 // Poll every 5s for new votes
  });

  const summary = useMemo(() => {
    const yes = responses.filter(r => r.decision === 'yes').length;
    const no = responses.filter(r => r.decision === 'no').length;
    const pending = responses.filter(r => r.decision === 'pending').length;
    return { yes, no, pending, total: responses.length };
  }, [responses]);

  if (isLoading) return <div className="text-xs text-gray-500">Loading votes...</div>;

  return (
    <div className="bg-black/60 border border-cyan-500/20 rounded p-2 space-y-2">
      {/* SUMMARY */}
      <div className="flex gap-2 text-xs font-bold font-mono">
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span className="text-green-500">{summary.yes} YES</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle className="w-3 h-3 text-red-500" />
          <span className="text-red-500">{summary.no} NO</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-gray-500" />
          <span className="text-gray-500">{summary.pending} WAITING</span>
        </div>
      </div>

      {/* RESPONSES */}
      {responses.length > 0 && (
        <div className="space-y-1 pt-2 border-t border-cyan-500/10">
          {responses.map(response => (
            <div key={response.id} className="text-[10px] bg-black/40 p-1.5 rounded">
              <div className="flex items-center gap-2 mb-1">
                {response.decision === 'yes' ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : response.decision === 'no' ? (
                  <XCircle className="w-3 h-3 text-red-500" />
                ) : (
                  <Clock className="w-3 h-3 text-gray-500" />
                )}
                <span className="font-bold text-white">{response.band_member_name}</span>
                {response.responded_at && (
                  <span className="text-gray-600 ml-auto">
                    {new Date(response.responded_at).toLocaleTimeString()}
                  </span>
                )}
              </div>
              {response.reason_if_no && (
                <p className="text-gray-400 ml-5 italic">{response.reason_if_no}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}