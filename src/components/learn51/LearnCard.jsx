import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// ============================================================
// LEARN CARD — Collectible card earned by learning
// Like Pokémon cards but for real knowledge.
// Stored in localStorage — no login, no server, yours forever.
// ============================================================

const LS_CARDS = 'learn51_cards';

export const getCards = () => {
  try { return JSON.parse(localStorage.getItem(LS_CARDS) || '[]'); } catch { return []; }
};

export const saveCard = (card) => {
  try {
    const cards = getCards();
    const newCard = { ...card, id: Date.now(), earned_at: new Date().toISOString() };
    localStorage.setItem(LS_CARDS, JSON.stringify([newCard, ...cards]));
    return newCard;
  } catch { return null; }
};

const RARITY_CONFIG = {
  common:    { label: 'COMMON',    bg: 'from-slate-600 to-slate-800',         border: '#94a3b8', glow: 'rgba(148,163,184,0.4)',  stars: 1 },
  rare:      { label: 'RARE',      bg: 'from-blue-500 to-indigo-700',         border: '#60a5fa', glow: 'rgba(96,165,250,0.6)',   stars: 2 },
  epic:      { label: 'EPIC',      bg: 'from-violet-500 to-purple-800',       border: '#a78bfa', glow: 'rgba(167,139,250,0.7)',  stars: 3 },
  legendary: { label: 'LEGENDARY', bg: 'from-amber-400 via-orange-500 to-rose-600', border: '#fbbf24', glow: 'rgba(251,191,36,0.8)', stars: 4 },
};

const CARD_PROMPT = ({ interest, topic, question, answer, streak, questionCount }) => `
You are the Learn51 Card Forge — you create collectible knowledge cards earned by children who answer learning questions correctly.

CHILD'S WIN:
- What they love: ${interest}
- Topic they mastered: ${topic}
- Question they answered: ${question}
- Their answer: ${answer}
- Correct answers in a row: ${streak}
- Total questions answered today: ${questionCount}

CREATE a unique collectible Learn Card for this moment. Rules:

RARITY LOGIC:
- common: first correct answer, or single correct (streak < 2)
- rare: streak of 2-3, or particularly clever answer
- epic: streak of 4-5
- legendary: streak of 6+, or a truly exceptional insight in their answer

CARD IDENTITY:
- card_name: A heroic name connecting ${topic} and ${interest} — e.g. "Ronaldo's Parabola", "Black Hole Architect", "DNA Code Breaker"
- power_stat: A cool stat/number from what they learned — real if possible, e.g. "Free kick speed: 108 km/h" or "Pi to 5 places: 3.14159"
- knowledge_fact: ONE genuinely mind-blowing fact connecting ${topic} to ${interest} — something they'll tell someone tomorrow
- battle_move: A fun "attack move" name for this card — e.g. "Parabolic Strike", "Quantum Leap", "Prime Factorisation Blast"
- flavour_text: A short inspirational line in the style of a card game — e.g. "Those who understand angles never miss." Max 12 words.
- emoji_art: 3-4 emojis that visually represent this card

Respond ONLY with this JSON:
{
  "card_name": "string",
  "rarity": "common" | "rare" | "epic" | "legendary",
  "topic_category": "${topic}",
  "interest_tag": "${interest}",
  "power_stat": "string",
  "knowledge_fact": "string",
  "battle_move": "string",
  "flavour_text": "string",
  "emoji_art": "string"
}
`;

// ── Single card visual ──
export function CardDisplay({ card, size = 'full', onClick, isNew = false }) {
  const rarity = RARITY_CONFIG[card.rarity] || RARITY_CONFIG.common;
  const isSmall = size === 'small';

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateY: 5 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl overflow-hidden ${isSmall ? 'w-32 h-44' : 'w-full max-w-xs mx-auto'}`}
      style={{
        background: `linear-gradient(135deg, #1a1a2e, #16213e)`,
        border: `2px solid ${rarity.border}`,
        boxShadow: `0 0 20px ${rarity.glow}, 0 4px 24px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Holographic shimmer for rare+ */}
      {card.rarity !== 'common' && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)' }}
        />
      )}

      <div className={`relative h-full flex flex-col ${isSmall ? 'p-2' : 'p-4'}`}>
        {/* RARITY BADGE */}
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xs font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${rarity.bg}`} style={{ color: rarity.border, fontSize: isSmall ? '8px' : '10px' }}>
            {rarity.label}
          </div>
          <div className={isSmall ? 'text-xs' : 'text-sm'}>
            {'⭐'.repeat(rarity.stars)}
          </div>
        </div>

        {/* EMOJI ART */}
        <div className={`text-center ${isSmall ? 'text-2xl my-1' : 'text-4xl my-3'}`}>
          {card.emoji_art}
        </div>

        {/* CARD NAME */}
        <div className={`text-white font-black text-center leading-tight ${isSmall ? 'text-xs mb-1' : 'text-base mb-2'}`}>
          {card.card_name}
        </div>

        {!isSmall && (
          <>
            {/* POWER STAT */}
            <div className="bg-white/5 rounded-xl p-2 mb-2 border border-white/10">
              <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Power Stat</p>
              <p className="text-white font-black text-sm">{card.power_stat}</p>
            </div>

            {/* BATTLE MOVE */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400 text-xs">⚡</span>
              <span className="text-yellow-300 font-black text-xs">{card.battle_move}</span>
            </div>

            {/* FLAVOUR TEXT */}
            <p className="text-white/40 text-xs italic text-center mt-auto pt-2 border-t border-white/10">
              "{card.flavour_text}"
            </p>
          </>
        )}

        {/* NEW badge */}
        {isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full"
          >
            NEW
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ── Share a card — WhatsApp + native share ──
export function shareCard(card) {
  const rarity = RARITY_CONFIG[card.rarity] || RARITY_CONFIG.common;
  const url = 'https://universalfrequency51.com/Learn51AI';
  const msg =
`${rarity.label === 'LEGENDARY' ? '👑' : rarity.label === 'EPIC' ? '🔥' : rarity.label === 'RARE' ? '💎' : '⭐'} I just earned a ${rarity.label} Learn Card!

${card.emoji_art} *${card.card_name}*
⚡ Move: ${card.battle_move}
📊 Stat: ${card.power_stat}

🧠 Mind-blower: ${card.knowledge_fact}

"${card.flavour_text}"

I earned this by learning — for FREE, no login, no ads.
Can you beat my ${rarity.label} card? 👇
${url}`;

  if (navigator.share) {
    navigator.share({ title: card.card_name, text: msg, url });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  }
}

// ── Card reveal animation — the "pack opening" moment ──
export function CardReveal({ card, onClose }) {
  const [phase, setPhase] = useState('flash'); // flash → spin → reveal → done
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('spin'), 400);
    const t2 = setTimeout(() => setPhase('reveal'), 1200);
    const t3 = setTimeout(() => setPhase('done'), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const rarity = RARITY_CONFIG[card.rarity] || RARITY_CONFIG.common;

  const handleShare = () => { shareCard(card); setShared(true); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 overflow-y-auto"
    >
      {/* Flash burst */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full"
            style={{ width: 80, height: 80, background: rarity.border }}
          />
        )}
      </AnimatePresence>

      {/* Rarity label */}
      {phase !== 'flash' && (
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-black text-2xl mb-4 tracking-widest text-center"
          style={{ color: rarity.border, textShadow: `0 0 20px ${rarity.glow}` }}
        >
          {rarity.label} CARD UNLOCKED!
        </motion.p>
      )}

      {/* Card */}
      <motion.div
        initial={{ rotateY: 180, scale: 0.5 }}
        animate={
          phase === 'spin' ? { rotateY: 90, scale: 0.8 } :
          phase === 'reveal' || phase === 'done' ? { rotateY: 0, scale: 1 } :
          {}
        }
        transition={{ type: 'spring', damping: 15 }}
        style={{ perspective: 1000 }}
        className="w-72"
      >
        <CardDisplay card={card} isNew={true} />
      </motion.div>

      {/* Knowledge fact */}
      {(phase === 'reveal' || phase === 'done') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 max-w-sm w-full bg-white/5 border border-white/20 rounded-2xl p-4 text-center"
        >
          <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">🧠 What you just learned</p>
          <p className="text-white font-bold text-sm leading-relaxed">{card.knowledge_fact}</p>
        </motion.div>
      )}

      {/* ACTION BUTTONS — show when done */}
      {phase === 'done' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 w-full max-w-sm space-y-3"
        >
          {/* DARE YOUR MATE — the viral loop */}
          <button
            onClick={handleShare}
            className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${rarity.border}, ${rarity.glow.replace('rgba', 'rgb').replace(/,[\d.]+\)/, ')')})`,
              color: '#000',
              boxShadow: `0 0 20px ${rarity.glow}`,
            }}
          >
            {shared ? '✓ Shared! Keep learning →' : `🃏 Dare your mates to beat this!`}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-bold text-sm hover:bg-white/10 transition-all"
          >
            Keep learning →
          </button>

          <p className="text-white/20 text-xs text-center">Free. No login. Every kid on Earth. 🌍</p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Card Collection — the "my cards" view ──
export function CardCollection({ onClose }) {
  const cards = getCards();
  const [selectedCard, setSelectedCard] = useState(null);

  const byRarity = { legendary: 0, epic: 0, rare: 0, common: 0 };
  cards.forEach(c => { if (byRarity[c.rarity] !== undefined) byRarity[c.rarity]++; });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed inset-0 bg-[#05080f] z-50 overflow-y-auto"
    >
      <div className="p-4 max-w-2xl mx-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pt-4">
          <div>
            <h1 className="text-2xl font-black text-white">My Cards 🃏</h1>
            <p className="text-white/40 text-sm">{cards.length} card{cards.length !== 1 ? 's' : ''} collected — earned by learning</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white font-black text-lg px-4 py-2 border border-white/10 rounded-xl">✕</button>
        </div>

        {/* CHALLENGE BANNER */}
        {cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-2xl p-4 flex items-center justify-between gap-3"
            style={{ background: 'linear-gradient(135deg, #7c3aed22, #4f46e522)', border: '1px solid #7c3aed44' }}
          >
            <div>
              <p className="text-white font-black text-sm">Dare your mates 🎯</p>
              <p className="text-white/40 text-xs">Share any card — they can only earn cards by learning too</p>
            </div>
            <button
              onClick={() => shareCard(cards[0])}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-sm transition-all active:scale-95"
            >
              Share best card
            </button>
          </motion.div>
        )}

        {/* Rarity summary */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {Object.entries(byRarity).reverse().map(([rarity, count]) => {
            const r = RARITY_CONFIG[rarity];
            return (
              <div key={rarity} className="rounded-xl border p-2 text-center" style={{ borderColor: r.border + '40', background: `${r.glow}10` }}>
                <p className="font-black text-lg" style={{ color: r.border }}>{count}</p>
                <p className="text-white/40 text-xs font-bold">{r.label}</p>
              </div>
            );
          })}
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-6xl">🃏</p>
            <p className="text-white/40 font-bold text-lg">No cards yet!</p>
            <p className="text-white/20 text-sm">Answer questions correctly to earn your first card</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {cards.map((card, i) => (
              <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <CardDisplay card={card} size="small" onClick={() => setSelectedCard(card)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Full card detail */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center p-6"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-72 space-y-3" onClick={e => e.stopPropagation()}>
              <CardDisplay card={selectedCard} />
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                <p className="text-white/40 text-xs uppercase tracking-widest font-black mb-1">🧠 Knowledge</p>
                <p className="text-white text-sm leading-relaxed">{selectedCard.knowledge_fact}</p>
              </div>
              <p className="text-white/20 text-xs text-center">Earned {new Date(selectedCard.earned_at).toLocaleDateString()}</p>
              {/* SHARE FROM COLLECTION */}
              <button
                onClick={() => shareCard(selectedCard)}
                className="w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{ background: RARITY_CONFIG[selectedCard.rarity]?.border || '#94a3b8', color: '#000' }}
              >
                🃏 Dare your mates to beat this!
              </button>
              <button onClick={() => setSelectedCard(null)} className="w-full py-3 rounded-xl bg-white/10 text-white/60 font-bold text-sm">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main hook — generates a card and stores it ──
export default function useLearnCard() {
  const generateCard = async ({ interest, topic, question, answer, streak, questionCount }) => {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: CARD_PROMPT({ interest, topic, question, answer, streak, questionCount }),
      model: 'claude_sonnet_4_6',
      response_json_schema: {
        type: 'object',
        properties: {
          card_name: { type: 'string' },
          rarity: { type: 'string' },
          topic_category: { type: 'string' },
          interest_tag: { type: 'string' },
          power_stat: { type: 'string' },
          knowledge_fact: { type: 'string' },
          battle_move: { type: 'string' },
          flavour_text: { type: 'string' },
          emoji_art: { type: 'string' },
        }
      }
    });
    return saveCard(result);
  };

  return { generateCard, getCards };
}