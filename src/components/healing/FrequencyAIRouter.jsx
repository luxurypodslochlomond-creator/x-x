import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Headphones } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * FREQUENCY AI ROUTER
 * User says how they feel → AI matches to the best frequency from the catalog.
 * Honest about evidence. Warm, not clinical. One tap to play.
 */
export default function FrequencyAIRouter({ frequencies, onSelect }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const ask = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const catalog = frequencies.map(f => ({
        id: f.id,
        name: f.name,
        hz: f.displayHz || (f.hz ? `${f.hz} Hz` : 'broadband'),
        description: f.description,
        device: f.device
      }));

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are the UF51 Frequency Router — a warm, honest AI that matches people to the right healing frequency.

You care deeply but you don't over-claim. You know the science. You speak like a knowledgeable friend at the kitchen table, not a doctor or a guru.

RULES:
- Match based on their symptoms, feelings, and situation — not just keywords
- Be honest about evidence: "peer-reviewed" vs "traditional practice" — never inflate
- Your "why" should be 2-3 sentences, plain English, warm but real
- If they mention chest pain or severe distress: recommend the most relevant frequency BUT also say "if this is severe or new chest pain, please call 111 (UK) or your local emergency number"
- Do NOT invent frequencies — only recommend IDs from the catalog below
- Pick the BEST match. If two are equally good, pick the one with stronger evidence
- For the alternative: pick something complementary they could try if the first doesn't resonate

CATALOG (only use these IDs):
${JSON.stringify(catalog, null, 2)}

The person says: "${input}"

Match them. Be real. Be warm.`,
        response_json_schema: {
          type: 'object',
          properties: {
            recommended_frequency_id: { type: 'string', description: 'The ID of the best matching frequency' },
            why: { type: 'string', description: '2-3 sentence warm, honest explanation tailored to what they said' },
            alternative_frequency_id: { type: 'string', description: 'ID of a complementary frequency to try if the first does not feel right' },
            alternative_reason: { type: 'string', description: 'One sentence on when to try the alternative' },
            safety_note: { type: 'string', description: 'Only if they mention severe symptoms — otherwise leave empty' }
          },
          required: ['recommended_frequency_id', 'why']
        }
      });

      const recommended = frequencies.find(f => f.id === response.recommended_frequency_id);
      const alternative = frequencies.find(f => f.id === response.alternative_frequency_id);

      if (!recommended) {
        const fallback = frequencies.find(f => f.id === 'calm') || frequencies[0];
        setResult({ ...response, recommended: fallback, alternative, why: response.why || "Let us start with something gentle." });
      } else {
        setResult({ ...response, recommended, alternative });
      }
    } catch (err) {
      setError('Connection hiccup — try again, or browse the grid below.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-black to-purple-950/30 p-5 sm:p-7"
        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.08)' }}
      >
        {/* AMBIENT GLOW */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative z-10">
          {/* BADGE */}
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-[10px] font-bold tracking-widest">AI ROUTER · HONEST MATCHING</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
            What's going on with you?
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Tell me how you feel. I'll match you to the right frequency — honest, no fluff.
          </p>

          {/* INPUT */}
          {!result && !isLoading && (
            <>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) ask();
                }}
                placeholder="e.g. can't sleep, mind racing... or chest feels tight... or anxious about tomorrow..."
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-cyan-500/60 focus:outline-none resize-none font-sans"
                rows="3"
                autoFocus
              />
              <button
                onClick={ask}
                disabled={!input.trim()}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-800 disabled:text-gray-600 text-black font-black py-3 rounded-xl transition-all active:scale-[0.98]"
              >
                FIND MY FREQUENCY
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* LOADING — breathing circle */}
          {isLoading && (
            <div className="flex flex-col items-center py-10">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full bg-cyan-500/20"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="w-6 h-6 rounded-full bg-cyan-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 20px #06b6d4' }}
                />
              </div>
              <p className="text-cyan-400 text-sm font-mono mt-5 tracking-wider">LISTENING...</p>
              <p className="text-gray-600 text-xs mt-1">Matching you to the right frequency</p>
            </div>
          )}

          {/* RESULT */}
          <AnimatePresence>
            {result && result.recommended && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* SAFETY NOTE */}
                {result.safety_note && (
                  <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-3 mb-2">
                    <p className="text-red-300 text-xs font-bold">⚠️ {result.safety_note}</p>
                  </div>
                )}

                {/* RECOMMENDED */}
                <div
                  className="rounded-xl border-2 p-4 cursor-pointer hover:scale-[1.02] transition-all"
                  style={{
                    borderColor: result.recommended.color,
                    backgroundColor: `${result.recommended.color}10`,
                    boxShadow: `0 0 25px ${result.recommended.color}25`
                  }}
                  onClick={() => onSelect(result.recommended)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold" style={{ color: result.recommended.color }}>
                        {result.recommended.displayHz || (result.recommended.hz ? `${result.recommended.hz} Hz` : '')}
                        {result.recommended.binaural && ' · binaural'}
                      </span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-500 text-xs font-mono">{result.recommended.timer}</span>
                    </div>
                    {result.recommended.device === 'headphones' && (
                      <Headphones className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-black" style={{ color: result.recommended.color }}>
                    {result.recommended.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {result.why}
                  </p>
                  <div className="mt-3 flex items-center justify-end">
                    <span className="text-[10px] font-mono font-bold" style={{ color: result.recommended.color }}>
                      TAP TO PLAY →
                    </span>
                  </div>
                </div>

                {/* ALTERNATIVE */}
                {result.alternative && (
                  <button
                    onClick={() => onSelect(result.alternative)}
                    className="w-full text-left p-3 rounded-xl border border-white/10 hover:border-white/30 transition-all"
                  >
                    <p className="text-[10px] font-mono text-gray-500 mb-1">OR TRY:</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: result.alternative.color }}>
                        {result.alternative.name}
                      </span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{result.alternative_reason}</span>
                    </div>
                  </button>
                )}

                {/* RESET */}
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-white text-xs font-mono py-2 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  ASK AGAIN
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ERROR */}
          {error && (
            <div className="text-center py-4">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={reset} className="text-cyan-400 text-xs font-mono mt-2">TRY AGAIN</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}