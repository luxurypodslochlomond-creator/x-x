import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader, Calendar, MapPin, DollarSign, Music } from 'lucide-react';

/**
 * CB51 PUBLIC VOTE PAGE — NO LOGIN REQUIRED
 * Band member taps a link (SMS/email) with ?token=xxx
 * Shows gig details → BIG GREEN YES / BIG RED NO
 * Works on any phone, no account needed. ♾️❤️
 */

export default function CB51Vote() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [state, setState] = useState('loading'); // loading | ready | voting | done | error
  const [gigData, setGigData] = useState(null);
  const [existingVote, setExistingVote] = useState(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setState('error');
      setError('No vote link found. Please use the link sent to you.');
      return;
    }
    loadGig();
  }, [token]);

  async function loadGig() {
    try {
      setState('loading');
      const res = await base44.functions.invoke('bandVotePublic', {}, { method: 'GET', params: { token } });
      setGigData(res.gig);
      setExistingVote(res.existingVote);
      setState('ready');
    } catch (e) {
      setState('error');
      setError('Could not load gig details. The link may have expired.');
    }
  }

  async function castVote(vote, reason) {
    try {
      setState('voting');
      const res = await base44.functions.invoke('bandVotePublic', { token, vote, reason: reason || null });
      setResult(res);
      setState('done');
    } catch (e) {
      setState('error');
      setError('Could not record your vote. Please try again.');
    }
  }

  // ── LOADING ──
  if (state === 'loading' || state === 'voting') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
          <p className="text-gray-500 font-mono text-sm">{state === 'voting' ? 'Recording your vote…' : 'Loading gig…'}</p>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-white font-black text-xl">Oops</h2>
          <p className="text-gray-500 text-sm">{error}</p>
          <p className="text-gray-600 text-xs">Contact your manager for a new link.</p>
        </div>
      </div>
    );
  }

  // ── ALREADY VOTED ──
  if (existingVote && state === 'ready') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-5 max-w-sm w-full"
        >
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${existingVote.vote === 'yes' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {existingVote.vote === 'yes'
              ? <CheckCircle className="w-12 h-12 text-green-400" />
              : <XCircle className="w-12 h-12 text-red-400" />
            }
          </div>
          <div>
            <h2 className="text-white font-black text-2xl mb-1">Already voted</h2>
            <p className="text-gray-500">You voted <span className={existingVote.vote === 'yes' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>{existingVote.vote.toUpperCase()}</span></p>
            {existingVote.reason && <p className="text-gray-600 text-sm mt-2">"{existingVote.reason}"</p>}
          </div>
          <p className="text-gray-700 text-xs">Your manager has been notified.</p>
        </motion.div>
      </div>
    );
  }

  // ── VOTE DONE ──
  if (state === 'done' && result) {
    const isYes = result.vote === 'yes';
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-5 max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${isYes ? 'bg-green-500/20' : 'bg-red-500/20'}`}
            style={{ boxShadow: isYes ? '0 0 40px rgba(34,197,94,0.3)' : '0 0 40px rgba(239,68,68,0.3)' }}
          >
            {isYes
              ? <CheckCircle className="w-14 h-14 text-green-400" />
              : <XCircle className="w-14 h-14 text-red-400" />
            }
          </motion.div>

          <div>
            <h2 className="text-white font-black text-3xl mb-2">
              {isYes ? 'YES! 🎸' : 'No — noted'}
            </h2>
            {result.allVotedYes && (
              <p className="text-green-400 font-bold text-lg">Band all confirmed! 🎉</p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              {result.voteCount.yes}/{result.voteCount.total} YES · {result.voteCount.no}/{result.voteCount.total} NO
            </p>
          </div>
          <p className="text-gray-600 text-xs">Your manager has been notified. You can close this page.</p>
        </motion.div>
      </div>
    );
  }

  // ── MAIN VOTE SCREEN ──
  const gig = gigData;
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-lg mx-auto p-6 pt-10 space-y-6">

        {/* CB51 BRAND */}
        <div className="flex items-center gap-2 mb-2">
          <Music className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-black font-mono text-sm tracking-widest">CB51</span>
        </div>

        {/* GIG CARD */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-950 border border-cyan-500/20 rounded-2xl p-6 space-y-4"
          style={{ boxShadow: '0 8px 40px rgba(6,182,212,0.08)' }}
        >
          <div>
            <p className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-1">Gig Offer</p>
            <h1 className="text-white font-black text-2xl leading-tight">{gig.venue}</h1>
          </div>

          <div className="space-y-2">
            {gig.date && (
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className="font-mono">{gig.date}{gig.time ? ` · ${gig.time}` : ''}</span>
              </div>
            )}
            {(gig.city || gig.location) && (
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span>{gig.city || gig.location}</span>
              </div>
            )}
            {gig.fee > 0 && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-green-400 font-bold text-lg">{gig.currency === 'GBP' ? '£' : gig.currency}{gig.fee?.toLocaleString()}</span>
              </div>
            )}
            {gig.promoter && (
              <p className="text-gray-600 text-sm">Promoter: {gig.promoter}</p>
            )}
          </div>

          {gig.details && (
            <p className="text-gray-500 text-xs leading-relaxed border-t border-white/5 pt-3">{gig.details.substring(0, 300)}{gig.details.length > 300 ? '…' : ''}</p>
          )}
        </motion.div>

        {/* YES / NO */}
        <AnimatePresence mode="wait">
          {!showRejectReason ? (
            <motion.div
              key="buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="space-y-3"
            >
              <button
                onClick={() => castVote('yes')}
                className="w-full py-7 rounded-2xl font-black text-2xl text-white flex items-center justify-center gap-4 transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  boxShadow: '0 8px 32px rgba(34,197,94,0.35)'
                }}
              >
                <CheckCircle className="w-10 h-10" />
                YES
              </button>

              <button
                onClick={() => setShowRejectReason(true)}
                className="w-full py-7 rounded-2xl font-black text-2xl text-white flex items-center justify-center gap-4 transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  boxShadow: '0 8px 32px rgba(239,68,68,0.35)'
                }}
              >
                <XCircle className="w-10 h-10" />
                NO
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reason"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-gray-950 border border-red-500/30 rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-red-400 font-bold">Why can't you do it?</h3>
              </div>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="e.g. already booked, holiday, family commitment…"
                className="w-full bg-black border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-700 text-sm h-24 resize-none focus:outline-none focus:border-red-400"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowRejectReason(false); setRejectReason(''); }}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-gray-400 font-bold rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => castVote('no', rejectReason)}
                  className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-colors"
                >
                  Send to Manager
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-gray-700 text-xs pb-6">Powered by CB51 · Your manager will be notified instantly</p>
      </div>
    </div>
  );
}