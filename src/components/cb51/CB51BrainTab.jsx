import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mail, Calendar, DollarSign, CheckCircle, Zap, ExternalLink, RefreshCw, Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// The CB51 Intelligence Layer — reads your world, tells you what matters
export default function CB51BrainTab({ artistId }) {
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailSignals, setGmailSignals] = useState([]);

  const generateBriefing = async () => {
    setLoading(true);
    try {
      // Pull all CB51 data and generate an AI morning briefing
      const [gigOffers, events, invoices, tasks] = await Promise.all([
        base44.entities.CB51Event ? base44.entities.CB51Event.filter({ artist_id: artistId, status: 'pending' }).catch(() => []) : Promise.resolve([]),
        base44.entities.CB51Event ? base44.entities.CB51Event.filter({ artist_id: artistId }).catch(() => []) : Promise.resolve([]),
        base44.entities.CB51Invoice ? base44.entities.CB51Invoice.filter({ artist_id: artistId, status: 'unpaid' }).catch(() => []) : Promise.resolve([]),
        base44.entities.CB51Task ? base44.entities.CB51Task.filter({ artist_id: artistId, status: 'pending' }).catch(() => []) : Promise.resolve([]),
      ]);

      const prompt = `You are CB51, an AI co-manager for a music artist. Generate a sharp, personal morning briefing (3-4 sentences max) based on this data:

Pending gig decisions: ${gigOffers.length}
Upcoming shows: ${events.length}
Unpaid invoices: ${invoices.length}
Open tasks: ${tasks.length}
Gmail signals: ${gmailSignals.length > 0 ? gmailSignals.map(s => s.subject).join(', ') : 'not connected'}

Be direct, actionable, no fluff. Sound like a smart co-manager who's already read everything. Start with the most urgent thing. Use plain English, no emojis.`;

      const result = await base44.integrations.Core.InvokeLLM({ prompt });
      
      setBriefing({
        text: result,
        timestamp: new Date(),
        stats: {
          decisions: gigOffers.length,
          shows: events.length,
          invoices: invoices.length,
          tasks: tasks.length,
        }
      });
    } catch (err) {
      console.error('Briefing error:', err);
      setBriefing({
        text: "Couldn't fetch all data right now. Check your gig offers, finance and tasks tabs manually.",
        timestamp: new Date(),
        stats: { decisions: 0, shows: 0, invoices: 0, tasks: 0 }
      });
    } finally {
      setLoading(false);
    }
  };

  const connectGmail = async () => {
    // Gmail OAuth — coming soon, shows intent for now
    alert('Gmail OAuth connection coming soon. This will let CB51 scan your inbox for gig offers, contracts and promoter emails automatically.');
  };

  const signals = [
    { icon: Mail, label: 'Gmail', desc: 'Scan inbox for gig offers & contracts', connected: gmailConnected, color: 'text-red-400', borderColor: 'border-red-500/30', action: connectGmail },
    { icon: Calendar, label: 'Calendar', desc: 'Auto-sync confirmed shows', connected: false, color: 'text-amber-400', borderColor: 'border-amber-500/30', action: null },
    { icon: DollarSign, label: 'Stripe / Bank', desc: 'Track payments & outstanding fees', connected: false, color: 'text-green-400', borderColor: 'border-green-500/30', action: null },
  ];

  return (
    <div className="space-y-4">

      {/* MORNING BRIEFING */}
      <div className="border border-cyan-500/30 rounded-xl p-5 bg-cyan-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h2 className="text-cyan-400 font-mono font-bold text-sm uppercase tracking-wider">Brain</h2>
            <span className="text-gray-600 text-[10px] font-mono">intelligence layer</span>
          </div>
          <button
            onClick={generateBriefing}
            disabled={loading}
            className="flex items-center gap-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all disabled:opacity-50"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <RefreshCw className="w-3 h-3" />
              </motion.div>
            ) : (
              <Zap className="w-3 h-3" />
            )}
            {loading ? 'Reading...' : briefing ? 'Refresh' : 'Brief me'}
          </button>
        </div>

        <AnimatePresence>
          {briefing ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* AI BRIEFING TEXT */}
              <div className="border-l-2 border-cyan-400 pl-4">
                <p className="text-white text-sm leading-relaxed font-mono">{briefing.text}</p>
                <p className="text-gray-600 text-[10px] font-mono mt-2">
                  {briefing.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} — AI briefing
                </p>
              </div>

              {/* STAT PILLS */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Decisions', value: briefing.stats.decisions, color: 'text-cyan-400', urgent: briefing.stats.decisions > 0 },
                  { label: 'Shows', value: briefing.stats.shows, color: 'text-amber-400', urgent: false },
                  { label: 'Invoices', value: briefing.stats.invoices, color: 'text-red-400', urgent: briefing.stats.invoices > 0 },
                  { label: 'Tasks', value: briefing.stats.tasks, color: 'text-green-400', urgent: false },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className={`text-center p-2 rounded-lg border ${stat.urgent ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-gray-800 bg-gray-900/40'}`}
                  >
                    <div className={`text-lg font-black font-mono ${stat.color}`}>{stat.value}</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : !loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <Brain className="w-10 h-10 text-cyan-500/30 mx-auto mb-3" />
              <p className="text-gray-500 font-mono text-xs">Tap "Brief me" — CB51 reads everything and tells you what matters today.</p>
            </motion.div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 font-mono text-xs animate-pulse">Reading your world...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* DATA CONNECTIONS */}
      <div className="border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-gray-400" />
          <h3 className="text-gray-400 font-mono font-bold text-xs uppercase tracking-wider">Data Connections</h3>
          <span className="text-gray-600 text-[10px] font-mono">privacy-first · you control this</span>
        </div>

        <div className="space-y-3">
          {signals.map(({ icon: Icon, label, desc, connected, color, borderColor, action }) => (
            <div
              key={label}
              className={`flex items-center justify-between p-3 rounded-lg border ${connected ? 'border-green-500/40 bg-green-500/5' : borderColor + ' bg-gray-900/30'}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${connected ? 'text-green-400' : color}`} />
                <div>
                  <div className="text-white font-mono text-xs font-bold">{label}</div>
                  <div className="text-gray-500 text-[10px] font-mono">{desc}</div>
                </div>
              </div>
              {action ? (
                <button
                  onClick={action}
                  className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Connect
                </button>
              ) : (
                <span className="text-gray-600 text-[10px] font-mono">Soon</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-[10px] font-mono mt-3 leading-relaxed">
          CB51 reads signals from your connected accounts. Raw data never stored — only what matters is surfaced.
        </p>
      </div>
    </div>
  );
}