import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Share2, Sparkles, MessageCircle } from 'lucide-react';

// ============================================================
// CREATIVE REWARD — AI-generated unique art + story for each child
// One-of-a-kind. Theirs. Forever. No data stored.
// ============================================================

const REWARD_TYPES = [
  { id: 'poem', label: 'A poem about you', emoji: '📜' },
  { id: 'story', label: 'A micro story', emoji: '📖' },
  { id: 'art', label: 'ASCII art + facts', emoji: '🎨' },
  { id: 'song', label: 'A song verse', emoji: '🎵' },
];

const REWARD_PROMPT = ({ interest, topic, childAge, correctAnswer, questionAsked, streakCount }) => `
You are the most creative, warm AI artist-teacher in the world. A child just got a learning question RIGHT and deserves an amazing, unique creative reward.

CHILD INFO:
- Favourite thing: ${interest}
- Topic they just learned: ${topic}
- Age: ${childAge}
- The question they answered: ${questionAsked}
- Their answer: ${correctAnswer}
- Questions correct in a row: ${streakCount}

CREATE a personalised creative reward. Make it feel MAGICAL and completely unique to them.

Rules:
- Reference their interest (${interest}) with REAL depth — use actual player moments, stats, iconic plays
  - "Football & Ronaldo": CR7's 900+ goals, his free kick spin technique, his SIUUU celebration, his record-breaking career — connect the MATHS/TOPIC to his actual game
  - "Messi & Argentina": Leo's 2022 World Cup final, his dribble stats, his left foot wizardry, his tiki-taka — connect the TOPIC to his actual genius
  - NEVER reference their children or personal family life — only their professional legendary moments
  - Make it feel like it was written BY someone who loves that thing as much as they do
- Connect it directly to what they just learned (${topic}) — the link should feel surprising and brilliant ("Ronaldo's free kick travels at exactly the angle you just calculated")
- Age-appropriate warmth — not babyish, not adult. Cool. Like a smart friend.
- Short but POWERFUL — something they'd actually want to send to their mates on WhatsApp
- If streakCount >= 3, make it LEGENDARY — about THEM becoming a legend, connecting to the player's own rise

Return EXACTLY this JSON:
{
  "reward_type": "poem" | "story" | "song" | "art",
  "title": "A brilliant short title for this reward (max 6 words)",
  "content": "The actual poem/story/song verse/ASCII art (4-10 lines, use line breaks with \\n)",
  "dedication": "One line: 'This was made just for you, [name based on their interest world]' — e.g. 'This was made just for you, Champion of the Numbers Pitch'",
  "achievement_name": "A cool achievement title they just unlocked, e.g. 'Maths Wizard of the Pitch' or 'Cosmic Number Cruncher' — relevant to their interest and topic",
  "rarity": "common" | "rare" | "legendary",
  "rarity_reason": "One sentence on why this is rare/legendary (if applicable)"
}
`;

export default function CreativeReward({ interest, topic, childAge, correctAnswer, questionAsked, streakCount = 1, onClose }) {
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateReward();
  }, []);

  const generateReward = async () => {
    setLoading(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: REWARD_PROMPT({ interest, topic, childAge, correctAnswer, questionAsked, streakCount }),
      model: 'claude_sonnet_4_6',
      response_json_schema: {
        type: 'object',
        properties: {
          reward_type: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' },
          dedication: { type: 'string' },
          achievement_name: { type: 'string' },
          rarity: { type: 'string' },
          rarity_reason: { type: 'string' },
        }
      }
    });
    setReward(result);
    setLoading(false);
  };

  const rarityConfig = {
    common: { bg: 'from-indigo-500 to-violet-600', badge: 'bg-indigo-100 text-indigo-700', label: '✨ Reward Unlocked', glow: 'shadow-indigo-300' },
    rare: { bg: 'from-emerald-500 to-teal-600', badge: 'bg-emerald-100 text-emerald-700', label: '🔥 Rare Reward!', glow: 'shadow-emerald-300' },
    legendary: { bg: 'from-amber-400 via-orange-500 to-rose-500', badge: 'bg-amber-100 text-amber-700', label: '👑 LEGENDARY!', glow: 'shadow-amber-300' },
  };

  const getShareText = () =>
    `🌟 ${reward.title}\n\n${reward.content}\n\n${reward.dedication}\n\n🏆 I just unlocked: ${reward.achievement_name}\n\nMade for me by Learn51 — free for every kid on Earth 🌍♾️`;

  const handleShare = async () => {
    if (!reward) return;
    const text = getShareText();
    if (navigator.share) {
      navigator.share({ title: reward.title, text });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (!reward) return;
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const config = reward ? (rarityConfig[reward.rarity] || rarityConfig.common) : rarityConfig.common;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className={`w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl ${config.glow}`}
        >
          {/* GRADIENT HEADER */}
          <div className={`bg-gradient-to-br ${config.bg} p-6 text-white text-center relative overflow-hidden`}>
            {/* Sparkle particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 80 }}
                transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute text-xl pointer-events-none"
                style={{ left: '50%', top: '50%' }}
              >
                {['⭐', '✨', '🌟', '💫', '🎯', '🔥', '💥', '🌈'][i]}
              </motion.div>
            ))}

            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              {loading ? '🤖' : reward?.reward_type === 'poem' ? '📜' : reward?.reward_type === 'story' ? '📖' : reward?.reward_type === 'song' ? '🎵' : '🎨'}
            </motion.div>

            <div className={`inline-block ${config.badge} text-xs font-black px-3 py-1 rounded-full mb-2`}>
              {config.label}
            </div>

            {!loading && reward && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-black leading-tight">{reward.title}</h2>
                {reward.rarity !== 'common' && reward.rarity_reason && (
                  <p className="text-white/80 text-xs mt-1">{reward.rarity_reason}</p>
                )}
              </motion.div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-5">
            {loading ? (
              <div className="text-center py-8 space-y-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles className="w-10 h-10 text-indigo-500 mx-auto" />
                </motion.div>
                <p className="text-indigo-700 font-black text-lg">Creating something just for you...</p>
                <p className="text-gray-500 text-sm">Connecting {topic} to {interest}...</p>
              </div>
            ) : reward && (
              <>
                {/* ACHIEVEMENT BADGE */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3"
                >
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-xs font-black text-amber-600 uppercase tracking-widest">Achievement Unlocked</p>
                    <p className="text-gray-900 font-black text-base">{reward.achievement_name}</p>
                  </div>
                </motion.div>

                {/* CREATIVE CONTENT */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 rounded-2xl border border-gray-200 p-5"
                >
                  <p className="text-gray-900 font-medium text-base leading-relaxed whitespace-pre-line">
                    {reward.content}
                  </p>
                </motion.div>

                {/* DEDICATION */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-indigo-600 font-bold text-sm italic"
                >
                  {reward.dedication}
                </motion.p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send to mates 💬
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-1 px-4 py-3 rounded-2xl border-2 border-indigo-300 bg-indigo-50 text-indigo-700 font-black text-sm hover:bg-indigo-100 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    {copied ? '✓' : 'Copy'}
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-all"
                >
                  Keep learning →
                </button>

                <p className="text-center text-gray-400 text-xs">
                  Only you will ever get this exact reward 🌟 No data stored. Just yours.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}