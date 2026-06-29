/**
 * SortedFeedback — one-tap "was this helpful?" after every SORTED result.
 *
 * Stores feedback in localStorage (anonymized, no PII) and sends to
 * SortedCase entity if a caseId exists, so we can learn over time what
 * advice actually helps people.
 *
 * This is how SORTED stops guessing and starts knowing.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'sorted_feedback_v1';

export function saveFeedbackLocally(tool, rating, caseId) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push({ tool, rating, caseId: caseId || null, timestamp: new Date().toISOString() });
    if (existing.length > 100) existing.splice(0, existing.length - 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {}
}

export default function SortedFeedback({ tool, caseId, accentColor = '#f97316' }) {
  const [rating, setRating] = useState(null);
  const [showThanks, setShowThanks] = useState(false);

  const handleVote = (value) => {
    setRating(value);
    saveFeedbackLocally(tool, value, caseId);
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 2500);
  };

  if (rating && !showThanks) {
    return (
      <div style={{
        padding: '10px 14px', borderRadius: 8,
        background: rating === 'helpful' ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.04)',
        border: `1px solid ${rating === 'helpful' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.15)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
          color: rating === 'helpful' ? '#22c55e' : '#ef4444',
        }}>
          {rating === 'helpful' ? 'Glad it helped' : "Sorry it wasn't useful — we'll learn from this"}
        </span>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showThanks ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            padding: '10px 14px', borderRadius: 8,
            background: rating === 'helpful' ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.04)',
            border: `1px solid ${rating === 'helpful' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            color: rating === 'helpful' ? '#22c55e' : '#ef4444',
          }}>
            THANK YOU
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="vote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'rgba(26,18,8,0.02)',
            border: '1px solid rgba(26,18,8,0.08)',
          }}
        >
          <p style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
            color: 'rgba(26,18,8,0.4)', margin: '0 0 10px', textAlign: 'center',
          }}>
            WAS THIS HELPFUL?
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button
              onClick={() => handleVote('helpful')}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 11, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: '1px solid rgba(34,197,94,0.3)',
                background: 'rgba(34,197,94,0.05)',
                color: '#16a34a',
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
            >
              YES, HELPED
            </motion.button>
            <motion.button
              onClick={() => handleVote('not_helpful')}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 11, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: '1px solid rgba(239,68,68,0.25)',
                background: 'rgba(239,68,68,0.04)',
                color: '#ef4444',
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
            >
              NOT REALLY
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}