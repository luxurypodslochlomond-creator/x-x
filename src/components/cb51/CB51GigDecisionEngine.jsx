import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, MapPin, Calendar, DollarSign,
  Users, Loader, ChevronDown, Brain, AlertTriangle, Zap, TrendingUp
} from 'lucide-react';
import CB51DraftResponseEmail from './CB51DraftResponseEmail';
import CB51BandResponseTimer from './CB51BandResponseTimer';
import CB51GigFinanceTracker from './CB51GigFinanceTracker';
import CB51ManagerEmailApproval from './CB51ManagerEmailApproval';
import CB51VoteAggregator from './CB51VoteAggregator';
import CB51DraftConfirmationEmail from './CB51DraftConfirmationEmail';

/**
 * CB51 GIG DECISION ENGINE
 * ─────────────────────────────────────────────
 * Scott's view: just YES / NO.
 * What happens behind the scenes:
 *   • AI scans offer details for red flags
 *   • Checks fee against artist's average
 *   • Checks for calendar date clashes
 *   • Generates a readiness score (0-100)
 *   • Drafts the confirmation email silently
 * Scott taps YES or NO. AI does the rest. ♾️❤️
 */

// AI analyses a gig in the background — runs silently
async function analyseGigWithAI(gig, artistId) {
  try {
    // Parallel: fetch existing confirmed gigs + any calendar events for clash detection
    const [existingGigs, calendarEvents] = await Promise.all([
      base44.entities.GigOffer.filter({ artist_id: artistId, status: 'confirmed' }),
      base44.entities.CB51Event.filter({ artist_id: artistId }).catch(() => [])
    ]);

    // Build date clash context
    const existingDates = [
      ...existingGigs.map(g => g.date_start).filter(Boolean),
      ...calendarEvents.map(e => e.date).filter(Boolean)
    ];
    const hasDateClash = gig.date_start && existingDates.includes(gig.date_start);

    // Fee context
    const feesHistory = existingGigs.map(g => g.fee).filter(f => f && f > 0);
    const avgFee = feesHistory.length > 0
      ? feesHistory.reduce((a, b) => a + b, 0) / feesHistory.length
      : null;
    const feeRatio = avgFee && gig.fee ? (gig.fee / avgFee) : null;

    // Ask AI for a read on the offer — claude_sonnet_4_6 for sharpest judgement
    const aiRead = await base44.integrations.Core.InvokeLLM({
      model: 'claude_sonnet_4_6',
      prompt: `You are CB51, an AI music manager. Analyse this gig offer for an artist manager.

GIG OFFER:
- Venue: ${gig.venue || gig.title}
- Date: ${gig.date_start || 'unknown'}
- Location: ${gig.location || 'unknown'}
- Fee: £${gig.fee || 'not stated'}
- Promoter: ${gig.promoter_name || 'unknown'}
- Details: ${(gig.offer_details || '').substring(0, 500)}

CONTEXT:
- Artist's average fee: ${avgFee ? '£' + Math.round(avgFee) : 'no history yet'}
- Date clash detected: ${hasDateClash ? 'YES - this date is already booked!' : 'No'}
- Past gigs count: ${existingGigs.length}

Give a fast, honest manager's read. Return JSON only.`,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number", description: "0-100 readiness score. 100 = take it immediately" },
          headline: { type: "string", description: "One punchy line. e.g. 'Good fee, solid venue' or 'Low fee - worth a counter'" },
          flags: {
            type: "array",
            items: { type: "string" },
            description: "Short warning strings. e.g. ['Date clash!', 'Fee below average', 'No accommodation mentioned']"
          },
          positives: {
            type: "array",
            items: { type: "string" },
            description: "Short positive strings. e.g. ['Strong fee', 'Good location', 'Established promoter']"
          },
          recommendation: { type: "string", enum: ["yes", "maybe", "no"] }
        },
        required: ["score", "headline", "recommendation"]
      }
    });

    return {
      ...aiRead,
      hasDateClash,
      avgFee: avgFee ? Math.round(avgFee) : null,
      feeRatio
    };
  } catch {
    return null; // AI analysis is a bonus — never block the UI
  }
}

// Score colour
function scoreColor(score) {
  if (score >= 75) return 'text-green-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}
function scoreBg(score) {
  if (score >= 75) return 'bg-green-500/10 border-green-500/20';
  if (score >= 50) return 'bg-amber-500/10 border-amber-500/20';
  return 'bg-red-500/10 border-red-500/20';
}

export default function CB51GigDecisionEngine({ artistId }) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [lastAnalysedId, setLastAnalysedId] = useState(null);
  const queryClient = useQueryClient();

  const { data: pendingGigs = [], isLoading } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: async () => {
      // Fetch both possible "needs manager review" status values
      const [a, b] = await Promise.all([
        base44.entities.GigOffer.filter({ artist_id: artistId, status: 'manager_reviewing' }),
        base44.entities.GigOffer.filter({ artist_id: artistId, status: 'pending' })
      ]);
      return [...a, ...b];
    },
    enabled: !!artistId,
    refetchInterval: 15000
  });

  const { data: votingGigs = [] } = useQuery({
    queryKey: ['votingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ artist_id: artistId, status: 'band_voting' }),
    enabled: !!artistId,
    refetchInterval: 30000
  });

  const currentGig = pendingGigs[0];
  const remainingCount = pendingGigs.length - 1;

  // Silently run AI analysis whenever a new gig comes in
  useEffect(() => {
    if (!currentGig || currentGig.id === lastAnalysedId || !artistId) return;
    setAiAnalysis(null);
    setAiLoading(true);
    setLastAnalysedId(currentGig.id);
    analyseGigWithAI(currentGig, artistId).then(result => {
      setAiAnalysis(result);
      setAiLoading(false);
    });
  }, [currentGig?.id, artistId]);

  const approveMutation = useMutation({
    mutationFn: async (gig) => {
      const res = await base44.functions.invoke('approveGigOffer', { gigId: gig.id, artistId: gig.artist_id, gigData: gig });
      console.log('approve response:', res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      queryClient.invalidateQueries({ queryKey: ['votingGigs', artistId] });
      queryClient.invalidateQueries({ queryKey: ['gigOffers'] });
      setShowRejectReason(false);
      setRejectReason('');
      setShowDetails(false);
      setAiAnalysis(null);
    },
    onError: (err) => {
      console.error('YES failed:', err);
      alert('Could not approve gig: ' + (err.message || 'Unknown error'));
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ gigId, reason, gigData }) => {
      await base44.functions.invoke('rejectGigOffer', { gigId, reason, gigData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setShowRejectReason(false);
      setRejectReason('');
      setShowDetails(false);
      setAiAnalysis(null);
    }
  });

  const isBusy = approveMutation.isPending || rejectMutation.isPending;

  if (isLoading) return null;

  if (!currentGig && votingGigs.length === 0) {
    return (
      <div className="bg-green-950/30 border border-green-500/20 rounded-2xl p-5 text-center">
        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p className="text-green-400 font-bold">All clear</p>
        <p className="text-gray-600 text-xs mt-1">No gigs waiting for a decision</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {/* ── BAND VOTING IN PROGRESS ── */}
      {votingGigs.map(gig => (
        <div key={gig.id} className="bg-cyan-950/30 border border-cyan-500/20 rounded-2xl p-4 flex items-center gap-3">
          <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-cyan-300 font-bold text-sm truncate">{gig.venue || gig.title}</p>
            <p className="text-gray-500 text-xs">Band voting in progress…</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
        </div>
      ))}

      {/* ── CURRENT GIG ── */}
      {currentGig && (
        <motion.div
          key={currentGig.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="bg-gray-950 border-2 border-white/10 rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
        >
          {/* GIG INFO */}
          <div className="p-5 pb-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-1">Gig Offer {pendingGigs.length > 0 && `(${pendingGigs.findIndex(g => g.id === currentGig.id) + 1}/${pendingGigs.length})`}</p>
                <h2 className="text-white font-black text-xl leading-tight">{currentGig.venue || currentGig.title}</h2>
              </div>
              {remainingCount > 0 && (
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0">
                  {remainingCount} more
                </span>
              )}
            </div>

            {/* KEY FACTS */}
            <div className="flex flex-wrap gap-3 text-sm">
              {currentGig.date_start && (
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-mono">{currentGig.date_start}</span>
                </div>
              )}
              {currentGig.location && (
                <div className="flex items-center gap-1.5 text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  <span>{currentGig.location}</span>
                </div>
              )}
              {currentGig.fee > 0 && (
                <div className="flex items-center gap-1.5 text-green-400 font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>£{currentGig.fee.toLocaleString()}</span>
                  {aiAnalysis?.avgFee && (
                    <span className={`text-[10px] font-mono ${aiAnalysis.feeRatio >= 1 ? 'text-green-500' : 'text-amber-500'}`}>
                      {aiAnalysis.feeRatio >= 1 ? '↑' : '↓'} avg £{aiAnalysis.avgFee}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ── AI INTELLIGENCE PANEL ── */}
            <div className={`rounded-xl border p-3 ${aiLoading ? 'bg-white/3 border-white/5' : aiAnalysis ? scoreBg(aiAnalysis.score) : 'hidden'}`}>
              {aiLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Brain className="w-3.5 h-3.5 animate-pulse" />
                  <span className="text-xs font-mono">CB51 reading this offer…</span>
                </div>
              )}

              {!aiLoading && aiAnalysis && (
                <div className="space-y-2">
                  {/* SCORE + HEADLINE */}
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-black font-mono ${scoreColor(aiAnalysis.score)}`}>
                      {aiAnalysis.score}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${scoreColor(aiAnalysis.score)} leading-tight`}>
                        {aiAnalysis.headline}
                      </p>
                    </div>
                    <Brain className={`w-4 h-4 flex-shrink-0 ${scoreColor(aiAnalysis.score)}`} />
                  </div>

                  {/* DATE CLASH WARNING — always show if detected */}
                  {aiAnalysis.hasDateClash && (
                    <div className="flex items-center gap-1.5 text-red-400 bg-red-950/40 rounded-lg px-2 py-1">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-bold">Date clash — already booked this day</span>
                    </div>
                  )}

                  {/* FLAGS */}
                  {aiAnalysis.flags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {aiAnalysis.flags.map((f, i) => (
                        <span key={i} className="text-[10px] bg-amber-950/40 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                          ⚠ {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* POSITIVES */}
                  {aiAnalysis.positives?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {aiAnalysis.positives.map((p, i) => (
                        <span key={i} className="text-[10px] bg-green-950/40 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SHOW MORE DETAILS */}
            {(currentGig.offer_details || currentGig.promoter_name) && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                {showDetails ? 'Less' : 'Full details'}
              </button>
            )}

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 border-t border-white/5 space-y-1 text-xs text-gray-500">
                    {currentGig.promoter_name && <p>Promoter: <span className="text-gray-400">{currentGig.promoter_name}</span></p>}
                    {currentGig.promoter_email && <p>Email: <span className="text-gray-400">{currentGig.promoter_email}</span></p>}
                    {currentGig.promoter_phone && <p>Phone: <span className="text-gray-400">{currentGig.promoter_phone}</span></p>}
                    {currentGig.time_start && <p>Time: <span className="text-gray-400">{currentGig.time_start}</span></p>}
                    {currentGig.offer_details && (
                      <p className="text-gray-500 leading-relaxed mt-2 whitespace-pre-line">{currentGig.offer_details}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FINANCE + BAND TIMER + EMAIL APPROVAL */}
          <div className="px-5 py-4 border-t border-white/5 space-y-3 bg-black/40">
            <CB51GigFinanceTracker artistId={currentGig.artist_id} />
            {currentGig.band_votes?.length > 0 && (
              <>
                <CB51BandResponseTimer votes={currentGig.band_votes} totalMembers={currentGig.band_votes?.length || 0} />
                {/* Show vote aggregator once manager approved */}
                {currentGig.status === 'band_voting' && (
                  <CB51VoteAggregator 
                    gigId={currentGig.id} 
                    artistId={artistId}
                    bandMembers={currentGig.band_votes || []}
                  />
                )}
              </>
            )}
            {/* Show draft email when all votes in and all YES */}
            {currentGig.all_responses_in && currentGig.status === 'band_voting' && (
              <CB51DraftConfirmationEmail 
                gig={currentGig}
                onSent={() => {
                  queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
                }}
              />
            )}
            {currentGig.promoter_email && currentGig.status !== 'band_voting' && (
              <CB51ManagerEmailApproval 
                gig={currentGig}
                onEmailSent={() => {
                  queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
                }}
              />
            )}
          </div>

          {/* ── YES / NO ── */}
          <AnimatePresence mode="wait">
            {!showRejectReason ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 border-t border-white/5"
              >
                <button
                  onClick={() => setShowRejectReason(true)}
                  disabled={isBusy}
                  className="py-6 flex flex-col items-center justify-center gap-1.5 bg-red-950/30 hover:bg-red-950/60 border-r border-white/5 transition-all disabled:opacity-40 active:scale-95"
                >
                  <XCircle className="w-8 h-8 text-red-400" />
                  <span className="text-red-400 font-black text-base tracking-wider">NO</span>
                </button>

                <button
                  onClick={() => approveMutation.mutate(currentGig)}
                  disabled={isBusy}
                  className="py-6 flex flex-col items-center justify-center gap-1.5 bg-green-950/30 hover:bg-green-950/60 transition-all disabled:opacity-40 active:scale-95"
                >
                  {approveMutation.isPending
                    ? <Loader className="w-8 h-8 text-green-400 animate-spin" />
                    : <CheckCircle className="w-8 h-8 text-green-400" />
                  }
                  <span className="text-green-400 font-black text-base tracking-wider">YES</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="reason"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 border-t border-white/5 bg-red-950/20 space-y-3"
              >
                <p className="text-red-400 text-xs font-bold">Why not? <span className="text-gray-600 font-normal">(optional — helps AI learn)</span></p>
                <textarea
                  autoFocus
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="e.g. date clash, fee too low, wrong genre…"
                  className="w-full bg-black/60 border border-red-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-700 h-16 resize-none focus:outline-none focus:border-red-400"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowRejectReason(false); setRejectReason(''); }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-sm rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => rejectMutation.mutate({ gigId: currentGig.id, reason: rejectReason || 'No reason given', gigData: currentGig })}
                    disabled={rejectMutation.isPending}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {rejectMutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : 'Confirm NO'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}