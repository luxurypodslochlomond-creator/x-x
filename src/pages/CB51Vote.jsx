import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader, Calendar, MapPin, Banknote, Music, Clock, User } from 'lucide-react';

/**
 * CB51 PUBLIC VOTE PAGE — NO LOGIN REQUIRED
 * Band member taps a link (SMS/email) with ?token=xxx
 * Shows gig details → BIG GREEN YES / BIG RED NO
 * Works on any phone, no account needed. ♾️❤️
 */

export default function CB51Vote() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [state, setState] = useState('loading');
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

  const formatDate = (d) => {
    if (!d) return null;
    try {
      return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return d; }
  };

  // ── LOADING ──
  if (state === 'loading' || state === 'voting') {
    return (
      <div className="min-h-screen bg-[#060a0f] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
            <Music className="w-6 h-6 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 font-mono text-sm tracking-widest">
            {state === 'voting' ? 'SENDING VOTE…' : 'LOADING GIG…'}
          </p>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-[#060a0f] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-white font-black text-xl">Link Error</h2>
          <p className="text-gray-500 text-sm">{error}</p>
          <p className="text-gray-700 text-xs">Contact your manager for a new link.</p>
        </div>
      </div>
    );
  }

  // ── ALREADY VOTED ──
  if (existingVote && state === 'ready') {
    const isYes = existingVote.vote === 'yes';
    return (
      <div className="min-h-screen bg-[#060a0f] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-5 max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${isYes ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
            style={{ boxShadow: isYes ? '0 0 50px rgba(34,197,94,0.15)' : '0 0 50px rgba(239,68,68,0.15)' }}
          >
            {isYes ? <CheckCircle className="w-12 h-12 text-green-400" /> : <XCircle className="w-12 h-12 text-red-400" />}
          </motion.div>
          <div>
            <p className="text-gray-600 text-xs font-mono tracking-widest mb-2">ALREADY VOTED</p>
            <h2 className="text-white font-black text-3xl mb-1">
              You said <span className={isYes ? 'text-green-400' : 'text-red-400'}>{isYes ? 'YES' : 'NO'}</span>
            </h2>
            {existingVote.reason && <p className="text-gray-500 text-sm italic mt-2">"{existingVote.reason}"</p>}
          </div>
          <p className="text-gray-700 text-xs">Your manager has been notified. You can close this page.</p>
          <div className="pt-2">
            <span className="text-gray-800 text-xs font-mono">CB51 · Avoid the Noise</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── VOTE DONE ──
  if (state === 'done' && result) {
    const isYes = result.vote === 'yes';
    return (
      <div className="min-h-screen bg-[#060a0f] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6 max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0.3, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center ${isYes ? 'bg-green-500/15 border-2 border-green-400/40' : 'bg-red-500/15 border-2 border-red-400/40'}`}
            style={{ boxShadow: isYes ? '0 0 60px rgba(34,197,94,0.25)' : '0 0 60px rgba(239,68,68,0.25)' }}
          >
            {isYes ? <CheckCircle className="w-14 h-14 text-green-400" /> : <XCircle className="w-14 h-14 text-red-400" />}
          </motion.div>

          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-white font-black text-4xl mb-2">
              {isYes ? '🎸 YES!' : 'No — noted'}
            </h2>
            {result.allVotedYes && (
              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-green-400 font-bold text-lg mt-2"
              >
                🎉 Band all in! Manager notified.
              </motion.p>
            )}
            {!result.allVotedYes && (
              <p className="text-gray-500 text-sm mt-2">
                {result.voteCount?.yes ?? 0} YES · {result.voteCount?.no ?? 0} NO · {result.voteCount?.total ?? 0} total
              </p>
            )}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-600 text-xs">
            Your manager has been notified instantly.
          </motion.p>

          <div className="pt-2">
            <span className="text-gray-800 text-xs font-mono">CB51 · Avoid the Noise</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── MAIN VOTE SCREEN ──
  const gig = gigData;
  const currencySymbol = gig?.currency === 'GBP' ? '£' : gig?.currency === 'EUR' ? '€' : '$';

  return (
    <div className="min-h-screen bg-[#060a0f] text-white flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-8 pb-6 flex flex-col gap-5">

        {/* BRAND */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Music className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-cyan-400 font-black font-mono text-sm tracking-widest">CB51</span>
          <span className="text-gray-700 text-xs font-mono ml-1">· GIG VOTE</span>
        </div>

        {/* INTRO */}
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <p className="text-gray-500 text-sm">Your manager needs a <span className="text-white font-bold">YES or NO</span> on this gig offer.</p>
        </motion.div>

        {/* GIG CARD */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-cyan-500/15 overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #0a0f1a, #0d1420)', boxShadow: '0 8px 40px rgba(6,182,212,0.06)' }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }} />

          <div className="p-5 space-y-4">
            <div>
              <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest mb-1">Gig Offer</p>
              <h1 className="text-white font-black text-2xl leading-tight">{gig?.title || gig?.venue}</h1>
              {gig?.title && gig?.venue && gig.title !== gig.venue && (
                <p className="text-gray-500 text-sm mt-0.5">{gig.venue}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {(gig?.date || gig?.date_start) && (
                <div className="flex items-center gap-3 bg-white/3 rounded-xl px-3 py-2.5">
                  <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">{formatDate(gig.date || gig.date_start)}</p>
                    {(gig?.time || gig?.time_start) && (
                      <p className="text-gray-500 text-xs">{gig.time || gig.time_start}</p>
                    )}
                  </div>
                </div>
              )}

              {(gig?.city || gig?.location) && (
                <div className="flex items-center gap-3 bg-white/3 rounded-xl px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <p className="text-white text-sm font-semibold">{gig.city || gig.location}{gig.country ? `, ${gig.country}` : ''}</p>
                </div>
              )}

              {gig?.fee > 0 && (
                <div className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <Banknote className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <p className="text-green-400 font-black text-lg">{currencySymbol}{gig.fee?.toLocaleString()}</p>
                </div>
              )}

              {gig?.promoter && (
                <div className="flex items-center gap-3 bg-white/3 rounded-xl px-3 py-2.5">
                  <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">{gig.promoter}</p>
                </div>
              )}
            </div>

            {(gig?.notes || gig?.requirements || gig?.offer_details) && (
              <div className="border-t border-white/5 pt-3">
                <p className="text-gray-600 text-xs leading-relaxed">
                  {(gig.notes || gig.requirements || gig.offer_details || '').substring(0, 280)}
                  {(gig.notes || gig.requirements || gig.offer_details || '').length > 280 ? '…' : ''}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* YES / NO BUTTONS */}
        <AnimatePresence mode="wait">
          {!showRejectReason ? (
            <motion.div
              key="buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <button
                onClick={() => castVote('yes')}
                className="w-full py-6 rounded-2xl font-black text-2xl text-white flex items-center justify-center gap-3 transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  boxShadow: '0 8px 32px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <CheckCircle className="w-8 h-8" />
                I'M IN
              </button>

              <button
                onClick={() => setShowRejectReason(true)}
                className="w-full py-6 rounded-2xl font-black text-2xl text-white flex items-center justify-center gap-3 transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  boxShadow: '0 8px 32px rgba(239,68,68,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <XCircle className="w-8 h-8" />
                CAN'T DO IT
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reason"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="rounded-2xl border border-red-500/25 overflow-hidden"
              style={{ background: 'rgba(220,38,38,0.04)' }}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-red-400 font-bold">Why can't you make it?</h3>
                </div>
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="e.g. already booked, holiday, family commitment…"
                  className="w-full bg-black/50 border border-red-500/25 rounded-xl px-4 py-3 text-white placeholder-gray-700 text-sm h-24 resize-none focus:outline-none focus:border-red-400/60"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowRejectReason(false); setRejectReason(''); }}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/8 text-gray-400 font-bold rounded-xl transition-colors text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => castVote('no', rejectReason)}
                    className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-colors text-sm"
                    style={{ boxShadow: '0 4px 16px rgba(239,68,68,0.3)' }}
                  >
                    Send to Manager
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-gray-800 text-xs pb-2">
          CB51 · Your manager will be notified instantly
        </p>
      </div>
    </div>
  );
}