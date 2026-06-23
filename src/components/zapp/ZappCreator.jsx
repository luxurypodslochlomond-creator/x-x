import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const QUICK_IDEAS = [
  {
    label: 'SNAP!', color: '#f43f5e', accent: '#ff8fa3',
    visual: { shape: 'cards', bg: 'linear-gradient(135deg, #1a0008 0%, #2d0010 100%)' },
    idea: 'Build a single-player SNAP card game. Show one card at a time from a shuffled deck of 20 emoji cards (use 10 pairs: 🐶🐶🐱🐱🐸🐸🦊🦊🐼🐼🦁🦁🐯🐯🐨🐨🦄🦄🐙🐙). Show the CURRENT card and PREVIOUS card side by side. Player clicks the big SNAP button if they match. Score goes up on correct snap with confetti and chime. Show wrong answer flash if they miss. Game ends when deck runs out — show final score and Play Again.'
  },
  {
    label: 'COOKIE\nCLICKER', color: '#f59e0b', accent: '#fde68a',
    visual: { shape: 'circle', bg: 'linear-gradient(135deg, #1a0e00 0%, #2d1800 100%)' },
    idea: 'Build a cookie clicker idle game. Giant cookie in centre — click it to earn cookies, show +1 pop and click sound. Show cookie count big at top. Three upgrade buttons: Grandma costs 50 cookies gives +1 per second, Farm costs 200 cookies gives +5 per second, Factory costs 500 cookies gives +15 per second. Auto-earn cookies every second based on upgrades.'
  },
  {
    label: 'HORSE\nQUIZ', color: '#8b5cf6', accent: '#c4b5fd',
    visual: { shape: 'diamond', bg: 'linear-gradient(135deg, #0d0018 0%, #1a0030 100%)' },
    idea: 'Build a 10-question multiple choice horse quiz. Questions about horse breeds, facts, and care. Show one question at a time with 4 big answer buttons. Flash green and play ding on correct, flash red and buzz on wrong. Show progress bar and score. End screen with confetti if 8 or more correct.'
  },
  {
    label: 'PIXEL\nART', color: '#06b6d4', accent: '#67e8f9',
    visual: { shape: 'grid', bg: 'linear-gradient(135deg, #00101a 0%, #001a2d 100%)' },
    idea: 'Build a pixel art drawing app with a 16x16 grid of squares. Show 16 colour swatches including bright neons. Click a colour to select it. Click or drag on the grid to paint squares that colour. Eraser button to clear squares. Clear All button. Each paint click makes a satisfying pop sound using Web Audio API.'
  },
  {
    label: 'ADVENTURE', color: '#10b981', accent: '#6ee7b7',
    visual: { shape: 'arrow', bg: 'linear-gradient(135deg, #001a0e 0%, #002d18 100%)' },
    idea: 'Build a choose-your-own-adventure story in a magical forest. Start with an intro scene and 2 choices. Each choice leads to a new scene with 2 more choices. At least 8 scenes total with 2 different endings. Show a big emoji illustration for each scene. Atmospheric chime sounds on scene change.'
  },
  {
    label: 'TIMES\nTABLES', color: '#3b82f6', accent: '#93c5fd',
    visual: { shape: 'multiply', bg: 'linear-gradient(135deg, #00081a 0%, #00102d 100%)' },
    idea: 'Build a times tables quiz game. Show a random multiplication question like 6 x 7. Player types the answer and presses Enter or Check. Flash green with celebration if correct. If wrong, show correct answer kindly — never scary or harsh. Show score and streak. After 10 questions show final score with big encouraging message.'
  },
  {
    label: 'DRAGON\nTAPPER', color: '#ec4899', accent: '#f9a8d4',
    visual: { shape: 'flame', bg: 'linear-gradient(135deg, #1a0010 0%, #2d001a 100%)' },
    idea: 'Build a dragon tapper clicker game. Big dragon egg in centre. Click it to earn gold coins — show +1 gold and pop sound each click. Three evolution buttons: Hatch Egg costs 20 gold, Baby Dragon costs 100 gold, Fire Dragon costs 500 gold. When evolving play a roar sound and show confetti.'
  },
  {
    label: 'BEAT\nMAKER', color: '#f97316', accent: '#fdba74',
    visual: { shape: 'bars', bg: 'linear-gradient(135deg, #1a0800 0%, #2d1000 100%)' },
    idea: 'Build an 8-step drum machine. Four rows: Kick, Snare, Hi-Hat, Clap. Each row has 8 toggle buttons. Play button starts the beat looping. Highlight current step with bright colour. Use Web Audio API to synthesise each drum sound. Stop button. Tempo slider.'
  },
  {
    label: 'WISH\nJAR', color: '#a78bfa', accent: '#ddd6fe',
    visual: { shape: 'star', bg: 'linear-gradient(135deg, #0d0018 0%, #140025 100%)' },
    idea: 'Build a magical wish jar app. Big glowing jar made from CSS. Text input and Wish button. When player types a wish animate a star flying into the jar with magical chime. Show all wishes listed. Jar glows brighter as more wishes added. Purple and gold colour scheme.'
  },
  {
    label: 'MY OWN\nIDEA', color: '#14b8a6', accent: '#5eead4',
    visual: { shape: 'plus', bg: 'linear-gradient(135deg, #001a18 0%, #002d28 100%)' },
    idea: ''
  },
];

// Voice support — hidden file input with capture works on ALL devices (iOS native recorder, Android mic)
const hasVoice = typeof window !== 'undefined';

// Custom geometric shape for each idea card — no emoji, pure CSS/SVG
const IdeaShape = ({ shape, color, accent }) => {
  const s = { position: 'absolute', top: 12, left: 12 };
  if (shape === 'cards') return (
    <div style={s}>
      <div style={{ width: 28, height: 36, background: `${color}30`, border: `2px solid ${color}80`, borderRadius: 5, position: 'absolute', top: 0, left: 0, transform: 'rotate(-8deg)' }} />
      <div style={{ width: 28, height: 36, background: `${color}20`, border: `2px solid ${color}60`, borderRadius: 5, position: 'absolute', top: 2, left: 8, transform: 'rotate(5deg)' }} />
    </div>
  );
  if (shape === 'circle') return (
    <div style={{ ...s, width: 38, height: 38, borderRadius: '50%', background: `radial-gradient(circle, ${accent}40 0%, ${color}20 60%, transparent 100%)`, border: `2px solid ${color}60` }} />
  );
  if (shape === 'diamond') return (
    <div style={{ ...s, width: 30, height: 30, background: `${color}30`, border: `2px solid ${color}70`, transform: 'rotate(45deg)', borderRadius: 4, marginTop: 4 }} />
  );
  if (shape === 'grid') return (
    <div style={{ ...s, display: 'grid', gridTemplateColumns: 'repeat(4,7px)', gap: 2 }}>
      {Array.from({length:16}).map((_,i) => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: 1.5, background: i%3===0 ? accent : i%5===0 ? color : `${color}30`, border: `1px solid ${color}40` }} />
      ))}
    </div>
  );
  if (shape === 'arrow') return (
    <svg style={s} width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 18 L22 18 M16 10 L26 18 L16 26" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    </svg>
  );
  if (shape === 'multiply') return (
    <svg style={s} width="36" height="36" viewBox="0 0 36 36" fill="none">
      <text x="4" y="26" fontSize="22" fontWeight="900" fill={color} opacity="0.8" fontFamily="monospace">×</text>
    </svg>
  );
  if (shape === 'flame') return (
    <svg style={s} width="32" height="36" viewBox="0 0 32 36" fill="none">
      <path d="M16 2 C16 2 24 10 24 18 C24 24 20 30 16 30 C12 30 8 24 8 18 C8 12 12 6 16 2Z" fill={`${color}30`} stroke={color} strokeWidth="1.5" opacity="0.9"/>
      <path d="M16 14 C16 14 20 18 20 22 C20 25 18 28 16 28 C14 28 12 25 12 22 C12 18 16 14 16 14Z" fill={accent} opacity="0.5"/>
    </svg>
  );
  if (shape === 'bars') return (
    <div style={{ ...s, display: 'flex', alignItems: 'flex-end', gap: 3, height: 36 }}>
      {[0.5, 1, 0.7, 0.9, 0.6, 1, 0.4, 0.8].map((h,i) => (
        <div key={i} style={{ width: 4, height: 36*h*0.8, background: i%2===0 ? color : accent, borderRadius: 2, opacity: 0.8 }} />
      ))}
    </div>
  );
  if (shape === 'star') return (
    <svg style={s} width="36" height="36" viewBox="0 0 36 36" fill="none">
      <polygon points="18,2 21,13 32,13 23,20 26,31 18,24 10,31 13,20 4,13 15,13" fill={`${color}35`} stroke={color} strokeWidth="1.5" opacity="0.9"/>
    </svg>
  );
  if (shape === 'plus') return (
    <svg style={s} width="36" height="36" viewBox="0 0 36 36" fill="none">
      <line x1="18" y1="5" x2="18" y2="31" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="5" y1="18" x2="31" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
    </svg>
  );
  return null;
};

export default function ZappCreator({ onSubmit }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [customMode, setCustomMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voicePulse, setVoicePulse] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [voiceStatus, setVoiceStatus] = useState(''); // '' | 'recording' | 'transcribing' | error message

  const handleSubmit = (text) => {
    const t = (text || value).trim();
    if (t.length < 3) return;
    onSubmit(t);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickTap = (item) => {
    if (!item.idea) {
      setCustomMode(true);
      setTimeout(() => textareaRef.current?.focus(), 100);
    } else {
      onSubmit(item.idea);
    }
  };

  const handleVoiceTap = () => {
    // Open native voice recorder (iOS Voice Memos / Android mic)
    fileInputRef.current?.click();
  };

  const handleVoiceFile = async (e) => {
    const file = e.target.files?.[0];
    // Reset input so the same file can be selected again
    e.target.value = '';

    if (!file) {
      setIsListening(false);
      setVoicePulse(false);
      return;
    }

    if (file.size < 1000) {
      setVoiceText('Recording too short — try again!');
      setTimeout(() => setVoiceText(''), 4000);
      return;
    }

    setIsListening(true);
    setVoicePulse(true);
    setVoiceStatus('transcribing');
    setVoiceText('listening to your idea...');

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const result = await base44.integrations.Core.TranscribeAudio({ audio_url: file_url });

      const text = (typeof result === 'string' ? result : result?.text || result?.transcript || '').trim();
      if (text.length >= 3) {
        setVoiceText(text);
        setValue(text);
        setVoiceStatus('');
        setTimeout(() => onSubmit(text), 600);
      } else {
        setVoiceText('Nothing heard — try again!');
        setVoiceStatus('');
        setIsListening(false);
        setVoicePulse(false);
        setTimeout(() => setVoiceText(''), 4000);
      }
    } catch (err) {
      console.error('ZAPP voice transcription error:', err);
      setVoiceText('Could not transcribe — try again!');
      setVoiceStatus('');
      setIsListening(false);
      setVoicePulse(false);
      setTimeout(() => setVoiceText(''), 4000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-4 pt-8 pb-16" style={{ minHeight: 'calc(100vh - 72px)' }}>

      {/* Big bold headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center mb-8 max-w-2xl"
      >
        <h1 className="font-black leading-none tracking-tight mb-3" style={{
          fontSize: 'clamp(2.8rem, 8vw, 5rem)',
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          what do you<br />want to build?
        </h1>
        <p className="text-white/40 font-semibold" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
          tap an idea · or say it out loud · any language
        </p>
      </motion.div>

      {/* VOICE BUTTON — BIG COOLASFUCK pill for kids */}
      {hasVoice && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-8 flex flex-col items-center gap-4 w-full max-w-xs"
        >
          <motion.button
            onClick={isListening ? undefined : handleVoiceTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            className="relative flex items-center justify-center gap-4 w-full select-none"
            style={{
              height: 80,
              borderRadius: 40,
              background: isListening
                ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #ec4899 60%, #f59e0b 100%)',
              boxShadow: isListening
                ? '0 0 0 4px rgba(239,68,68,0.2), 0 8px 40px rgba(239,68,68,0.6)'
                : '0 0 0 4px rgba(124,58,237,0.15), 0 8px 40px rgba(124,58,237,0.5)',
              border: 'none',
              cursor: 'pointer',
            }}
            animate={isListening ? { scale: [1, 1.03, 1] } : {}}
            transition={isListening ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : {}}
          >
            {/* Mic SVG icon */}
            {!isListening && (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <rect x="8" y="2" width="8" height="13" rx="4" fill="white" />
                <path d="M5 10a7 7 0 0 0 14 0" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}

            {/* Animated bars when listening */}
            {isListening && (
              <div className="flex items-center gap-1" style={{ height: 36 }}>
                {[0.4, 0.9, 0.6, 1, 0.5, 0.9, 0.7, 1, 0.4].map((h, i) => (
                  <motion.div
                    key={i}
                    style={{ width: 4, borderRadius: 4, background: 'rgba(255,255,255,0.9)' }}
                    animate={{ height: [36 * h * 0.4, 36 * h, 36 * h * 0.3, 36 * h, 36 * h * 0.4] }}
                    transition={{ duration: 0.45 + i * 0.06, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            )}

            <span className="text-white font-black text-xl tracking-tight">
              {voiceStatus === 'transcribing' ? 'LISTENING...' : isListening ? 'LISTENING...' : 'SPEAK YOUR IDEA'}
            </span>
          </motion.button>

          {/* Hidden file input — opens native iOS/Android voice recorder */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            capture="microphone"
            onChange={handleVoiceFile}
            style={{ display: 'none' }}
          />

          <AnimatePresence mode="wait">
            {voiceText ? (
              <motion.p
                key="voicetext"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-white/90 text-base font-bold text-center italic px-4"
              >
                {voiceStatus === 'transcribing' ? voiceText : `"${voiceText}"`}
              </motion.p>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/30 text-sm font-semibold text-center">tap the big button · record your idea · tap done</motion.p>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
            <span className="text-white/20 text-[10px] font-semibold tracking-wider">WORKS IN ALL LANGUAGES</span>
          </div>
        </motion.div>
      )}

      {/* Quick idea grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-2xl mb-6"
      >
        <p className="text-white/20 text-xs font-black tracking-widest text-center mb-4 uppercase">or tap an idea to build instantly</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {QUICK_IDEAS.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => handleQuickTap(item)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              whileHover={{ scale: 1.06, y: -5 }}
              whileTap={{ scale: 0.93 }}
              className="relative flex flex-col items-end justify-between overflow-hidden"
              style={{
                background: item.visual.bg,
                border: `1.5px solid ${item.color}35`,
                borderRadius: 20,
                padding: '14px 14px 12px',
                minHeight: 110,
                boxShadow: `0 8px 32px ${item.color}20, inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              {/* Abstract geometric visual — top left */}
              <IdeaShape shape={item.visual.shape} color={item.color} accent={item.accent} />

              {/* Label — bottom right */}
              <span
                className="font-black leading-tight text-left w-full whitespace-pre-line"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  color: item.accent,
                  textShadow: `0 0 20px ${item.color}80`,
                  marginTop: 'auto',
                }}
              >
                {item.label}
              </span>

              {/* Glow dot top right */}
              <div style={{
                position: 'absolute', top: 10, right: 10,
                width: 6, height: 6, borderRadius: '50%',
                background: item.color,
                boxShadow: `0 0 8px ${item.color}`,
              }} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Type your own — always visible, premium feel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="w-full max-w-2xl"
      >
        <div
          className="relative rounded-3xl overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(219,39,119,0.06) 100%)',
            border: isFocused
              ? '1.5px solid rgba(167,139,250,0.6)'
              : value.length > 0
              ? '1.5px solid rgba(167,139,250,0.3)'
              : '1.5px solid rgba(255,255,255,0.07)',
            boxShadow: isFocused
              ? '0 0 0 4px rgba(124,58,237,0.12), 0 20px 60px rgba(124,58,237,0.2)'
              : value.length > 0
              ? '0 8px 32px rgba(124,58,237,0.1)'
              : 'none',
          }}
        >
          {/* Subtle top label */}
          <div className="px-5 pt-4 pb-0">
            <span className="text-white/20 text-xs font-black tracking-widest uppercase">
              or describe your own idea
            </span>
          </div>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="a game where you dodge meteors and collect stars..."
            rows={3}
            className="w-full bg-transparent text-white px-5 pt-3 pb-4 resize-none outline-none leading-relaxed"
            style={{
              fontSize: 17,
              fontWeight: 500,
              caretColor: '#a78bfa',
              color: 'rgba(255,255,255,0.9)',
            }}
          />

          {/* Bottom bar with char hint + ZAPP button */}
          <div
            className="flex items-center justify-between px-4 pb-4 gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="text-white/15 text-xs font-mono">
              {value.length > 0 ? `${value.length} chars` : 'type anything · no rules'}
            </span>
            <motion.button
              onClick={() => handleSubmit()}
              disabled={value.trim().length < 3}
              whileHover={{ scale: value.trim().length >= 3 ? 1.04 : 1 }}
              whileTap={{ scale: value.trim().length >= 3 ? 0.96 : 1 }}
              className="flex items-center gap-2 font-black text-sm tracking-wide transition-all"
              style={{
                padding: '10px 22px',
                borderRadius: 14,
                background: value.trim().length >= 3
                  ? 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)'
                  : 'rgba(255,255,255,0.04)',
                color: value.trim().length >= 3 ? '#fff' : 'rgba(255,255,255,0.15)',
                boxShadow: value.trim().length >= 3
                  ? '0 0 24px rgba(124,58,237,0.6), 0 4px 16px rgba(219,39,119,0.3)'
                  : 'none',
                border: value.trim().length >= 3
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="currentColor" />
              </svg>
              ZAPP IT
            </motion.button>
          </div>
        </div>
      </motion.div>

      <p className="text-white/10 text-xs mt-6 font-mono text-center pb-4">
        no account needed · nothing stored · safe for kids
      </p>
    </div>
  );
}