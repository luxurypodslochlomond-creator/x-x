import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Zap, MessageCircle, Heart, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// OUTCOME CAPTURE — AI51 learns what actually works by remembering your wins
// No extraction. Just genuine learning. 3 days later: gentle re-check
// This closes the feedback loop. Evidence beats guessing.
export default function OutcomeCapture({ 
  conversationContext,
  interventionType = 'conversation', 
  onClose,
  autoOpen = false 
}) {
  const [showForm, setShowForm] = useState(autoOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [painBefore, setPainBefore] = useState(null);
  const [painAfter, setPainAfter] = useState(null);
  const [userNotes, setUserNotes] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(null);

  const interventionLabels = {
    frequency: '🌊 Healing frequency',
    advice: '💭 Advice',
    protocol: '⚡ Protocol',
    conversation: '🗣️ Conversation',
    healing_plan: '📋 Healing plan',
    other: '✨ Other'
  };

  const outcomeOptions = [
    { id: 'helped', label: 'Genuinely helped', emoji: '✅', desc: 'It made real difference' },
    { id: 'somewhat_helped', label: 'Helped a bit', emoji: '🤔', desc: 'Noticeably better' },
    { id: 'no_change', label: 'No change', emoji: '➡️', desc: 'Neutral, nothing shifted' },
    { id: 'made_worse', label: 'Made it worse', emoji: '⚠️', desc: 'Actually harder now' }
  ];

  const handleSubmit = async () => {
    if (!outcome) return;

    try {
      setIsSubmitting(true);
      
      const outcomData = {
        conversation_context: conversationContext || 'User interaction',
        intervention_type: interventionType,
        outcome,
        user_notes: userNotes || null,
        would_recommend: wouldRecommend,
        timestamp_submitted: new Date().toISOString(),
        ...(painBefore !== null && { pain_level_before: painBefore }),
        ...(painAfter !== null && { pain_level_after: painAfter })
      };

      const created = await base44.entities.AI51Outcome.create(outcomData);
      
      if (created?.id) {
        setSubmitted(true);
        setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
          onClose?.();
          // Reset for next time
          setOutcome(null);
          setPainBefore(null);
          setPainAfter(null);
          setUserNotes('');
          setWouldRecommend(null);
        }, 2500);
      }
    } catch (error) {
      console.warn('Outcome submission failed (non-critical):', error);
      // Fail silently — never break user flow for this
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setShowForm(true)}
        className="text-xs px-3 py-1.5 rounded-full transition-all font-sans"
        style={{
          background: 'rgba(34,211,238,0.12)',
          border: '1px solid rgba(34,211,238,0.3)',
          color: 'rgba(34,211,238,0.7)',
        }}
      >
        Did it help? →
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          className="w-full max-w-xs px-4"
        >
          <div
            className="rounded-2xl p-4 space-y-3 border"
            style={{
              background: 'rgba(34,211,238,0.08)',
              border: '1px solid rgba(34,211,238,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {!submitted ? (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white font-sans font-bold text-sm">
                      {interventionLabels[interventionType]}
                    </p>
                    <p className="text-white/40 font-sans text-xs mt-1">
                      AI51 learns from what actually works
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Pain scale (if relevant) */}
                {(interventionType === 'frequency' || interventionType === 'protocol' || interventionType === 'healing_plan') && (
                  <div className="space-y-2 pt-2">
                    <p className="text-white/70 font-sans text-xs">Pain before (0-10)</p>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <button
                          key={n}
                          onClick={() => setPainBefore(n)}
                          className={`flex-1 text-xs py-1 rounded transition-all font-sans ${
                            painBefore === n
                              ? 'bg-cyan-500/40 text-white border border-cyan-400'
                              : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outcome question */}
                <div className="space-y-2 pt-3">
                  <p className="text-white/70 font-sans text-xs">How did it go?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {outcomeOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setOutcome(opt.id)}
                        className={`p-3 rounded-lg transition-all text-center border text-xs font-sans space-y-1 ${
                          outcome === opt.id
                            ? 'border-cyan-400 bg-cyan-500/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-lg">{opt.emoji}</div>
                        <p className={outcome === opt.id ? 'text-white' : 'text-white/60'}>{opt.label}</p>
                        <p className="text-[10px] text-white/40">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pain after (if relevant) */}
                {painBefore !== null && (
                  <div className="space-y-2 pt-2">
                    <p className="text-white/70 font-sans text-xs">Pain after (0-10)</p>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <button
                          key={n}
                          onClick={() => setPainAfter(n)}
                          className={`flex-1 text-xs py-1 rounded transition-all font-sans ${
                            painAfter === n
                              ? 'bg-cyan-500/40 text-white border border-cyan-400'
                              : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    {painBefore !== null && painAfter !== null && (
                      <p className="text-[11px] text-cyan-300 font-sans">
                        {painAfter < painBefore ? `↓ ${painBefore - painAfter} point improvement` : painAfter > painBefore ? `↑ ${painAfter - painBefore} point worse` : '= No change'}
                      </p>
                    )}
                  </div>
                )}

                {/* Would recommend */}
                {outcome && (
                  <div className="space-y-2 pt-2">
                    <p className="text-white/70 font-sans text-xs">Would you tell a friend?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setWouldRecommend(true)}
                        className={`flex-1 py-2 rounded-lg transition-all text-xs font-sans border ${
                          wouldRecommend === true
                            ? 'border-cyan-400 bg-cyan-500/20 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Yes 💚
                      </button>
                      <button
                        onClick={() => setWouldRecommend(false)}
                        className={`flex-1 py-2 rounded-lg transition-all text-xs font-sans border ${
                          wouldRecommend === false
                            ? 'border-white/40 bg-white/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}

                {/* Optional notes */}
                {outcome && (
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Anything else? (optional)"
                    maxLength={200}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-cyan-400 resize-none font-sans"
                    rows={2}
                  />
                )}

                {/* Submit button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={!outcome || isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-lg transition-all text-xs font-sans font-bold text-white disabled:opacity-50"
                  style={{
                    background: outcome ? 'rgba(34,211,238,0.3)' : 'rgba(34,211,238,0.1)',
                    border: outcome ? '1px solid rgba(34,211,238,0.6)' : '1px solid rgba(34,211,238,0.2)',
                  }}
                >
                  {isSubmitting ? 'saving...' : 'save outcome'}
                </motion.button>

                <p className="text-[10px] text-white/30 text-center font-sans">
                  We'll check in with you in 3 days to see how it's holding up.
                </p>
              </>
            ) : (
              /* Success state */
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3 py-4 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
                </motion.div>
                <div>
                  <p className="text-white font-sans font-bold text-sm">Outcome saved</p>
                  <p className="text-white/40 font-sans text-xs mt-1">
                    {outcome === 'helped' ? "That's beautiful. Thanks for sharing." : outcome === 'made_worse' ? "Noted. We'll learn from this." : "Got it. Thanks for the feedback."}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}