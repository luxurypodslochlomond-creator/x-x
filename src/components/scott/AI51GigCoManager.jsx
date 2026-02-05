import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, MessageSquare, Calendar, Zap, X } from 'lucide-react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * AI51 GIG CO-MANAGER
 * Like having AI51 as your co-manager for everything
 * Gig offers, emails, messages - all handled intelligently
 */

export default function AI51GigCoManager({ artistId, onGigCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null); // 'paste', 'email', 'chat'
  const [input, setInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const handleProcess = async () => {
    if (!input.trim()) return;
    
    setProcessing(true);
    setAiResponse(null);

    try {
      // AI51 processes the input intelligently
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, the co-manager for CB51 artist management.
        
The user has submitted this:
---
${input}
---

Analyze this and extract:
1. Is this a gig offer? (yes/no)
2. If yes, extract: venue, date, fee, city, promoter contact
3. If it's a question or message, provide a helpful response
4. If it's an email, summarize key action items

Return structured JSON.`,
        response_json_schema: {
          type: "object",
          properties: {
            is_gig_offer: { type: "boolean" },
            venue: { type: "string" },
            date: { type: "string" },
            fee: { type: "number" },
            city: { type: "string" },
            promoter_contact: { type: "string" },
            message_to_user: { type: "string" },
            confidence: { type: "string" }
          }
        }
      });

      setAiResponse(result);

      // If it's a gig offer, create it
      if (result.is_gig_offer && result.venue) {
        await base44.entities.ScottGigOffer.create({
          artist_id: artistId,
          venue: result.venue,
          date: result.date || '',
          fee: result.fee || 0,
          city: result.city || '',
          promoter_contact: result.promoter_contact || '',
          raw_email: input,
          status: 'pending_manager_review',
          urgency: 'normal'
        });

        if (onGigCreated) onGigCreated();
        
        setTimeout(() => {
          setIsOpen(false);
          setInput('');
          setMode(null);
          setAiResponse(null);
        }, 2000);
      }

    } catch (error) {
      setAiResponse({
        message_to_user: `Error: ${error.message}`,
        confidence: 'error'
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-black py-6 rounded-2xl text-lg border-2 border-cyan-500 flex items-center justify-center gap-3"
        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
      >
        <COOLASFUCKWaves size={28} animate={true} />
        <span>AI51 CO-MANAGER</span>
        <Sparkles className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-black via-cyan-950 to-black border-2 border-cyan-500 rounded-2xl p-6 mb-6"
      style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <COOLASFUCKWaves size={32} animate={true} />
          <div>
            <h2 className="text-white font-black text-xl">AI51 CO-MANAGER</h2>
            <p className="text-cyan-400 text-xs font-mono">I know you ♾️❤️ I'll handle this</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            setMode(null);
            setInput('');
            setAiResponse(null);
          }}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {!mode ? (
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('paste')}
            className="bg-cyan-900/40 border-2 border-cyan-500 rounded-xl p-4 text-center hover:bg-cyan-900/60 transition-all"
          >
            <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xs">PASTE GIG</p>
            <p className="text-cyan-400 text-[9px] mt-1">Email/Offer</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('email')}
            className="bg-purple-900/40 border-2 border-purple-500 rounded-xl p-4 text-center hover:bg-purple-900/60 transition-all"
          >
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xs">PROCESS EMAIL</p>
            <p className="text-purple-400 text-[9px] mt-1">Any email</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('chat')}
            className="bg-pink-900/40 border-2 border-pink-500 rounded-xl p-4 text-center hover:bg-pink-900/60 transition-all"
          >
            <MessageSquare className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xs">ASK ME</p>
            <p className="text-pink-400 text-[9px] mt-1">Any question</p>
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            {mode === 'paste' && <Mail className="w-5 h-5 text-cyan-400" />}
            {mode === 'email' && <Zap className="w-5 h-5 text-purple-400" />}
            {mode === 'chat' && <MessageSquare className="w-5 h-5 text-pink-400" />}
            <h3 className="text-white font-bold text-sm">
              {mode === 'paste' && 'PASTE GIG OFFER'}
              {mode === 'email' && 'PASTE ANY EMAIL'}
              {mode === 'chat' && 'ASK ME ANYTHING'}
            </h3>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'paste' 
                ? "Paste the gig offer email here...\nI'll extract everything you need"
                : mode === 'email'
                  ? "Paste any email and I'll help you handle it"
                  : "What do you need help with?"
            }
            className="w-full bg-black/60 border-2 border-cyan-500/50 text-white p-4 rounded-xl font-mono text-sm min-h-[150px] focus:outline-none focus:border-cyan-500"
            disabled={processing}
          />

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border-2 ${
                aiResponse.confidence === 'error'
                  ? 'bg-red-900/20 border-red-500'
                  : 'bg-green-900/20 border-green-500'
              }`}
            >
              <div className="flex items-start gap-2">
                <Sparkles className={`w-5 h-5 mt-0.5 ${aiResponse.confidence === 'error' ? 'text-red-400' : 'text-green-400'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-bold ${aiResponse.confidence === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {aiResponse.is_gig_offer ? '✓ GIG OFFER DETECTED' : 'AI51 RESPONSE'}
                  </p>
                  <p className="text-white text-xs mt-2 whitespace-pre-wrap">
                    {aiResponse.message_to_user}
                  </p>
                  {aiResponse.venue && (
                    <div className="mt-3 space-y-1">
                      <p className="text-cyan-400 text-xs"><strong>Venue:</strong> {aiResponse.venue}</p>
                      {aiResponse.date && <p className="text-cyan-400 text-xs"><strong>Date:</strong> {aiResponse.date}</p>}
                      {aiResponse.fee && <p className="text-cyan-400 text-xs"><strong>Fee:</strong> £{aiResponse.fee}</p>}
                      {aiResponse.city && <p className="text-cyan-400 text-xs"><strong>City:</strong> {aiResponse.city}</p>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleProcess}
              disabled={processing || !input.trim()}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:opacity-50 text-white font-black py-4 rounded-xl text-base flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span>AI51 PROCESSING...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>PROCESS</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMode(null);
                setInput('');
                setAiResponse(null);
              }}
              className="px-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl"
            >
              BACK
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}