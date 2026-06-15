import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_IDEAS = [
  { emoji: '🃏', label: 'SNAP!', color: '#f43f5e', idea: 'Build a single-player SNAP card game. Show one card at a time from a shuffled deck of 20 emoji cards (use 10 pairs: 🐶🐶🐱🐱🐸🐸🦊🦊🐼🐼🦁🦁🐯🐯🐨🐨🦄🦄🐙🐙). Show the CURRENT card and PREVIOUS card side by side. Player clicks the big SNAP button if they match. Score goes up on correct snap with confetti and chime. Show wrong answer flash if they miss. Game ends when deck runs out — show final score and Play Again.' },
  { emoji: '🍪', label: 'Cookie Clicker', color: '#f59e0b', idea: 'Build a cookie clicker idle game. Giant cookie emoji in centre — click it to earn cookies, show +1 pop and click sound each time. Show cookie count big at top. Three upgrade buttons: Grandma costs 50 cookies gives +1 per second, Farm costs 200 cookies gives +5 per second, Factory costs 500 cookies gives +15 per second. Show how many of each upgrade owned. Auto-earn cookies every second based on upgrades. Unlock fanfare sound when buying upgrade.' },
  { emoji: '🐴', label: 'Horse Quiz', color: '#8b5cf6', idea: 'Build a 10-question multiple choice horse quiz. Questions about horse breeds, facts, and care. Show one question at a time with 4 big answer buttons. Flash green and play ding on correct, flash red and buzz on wrong. Show progress bar and score. Shuffle questions randomly. End screen shows score out of 10 with confetti if 8 or more correct. Play Again button.' },
  { emoji: '🎨', label: 'Pixel Art', color: '#06b6d4', idea: 'Build a pixel art drawing app with a 16x16 grid of squares. Show 16 colour swatches including bright neons. Click a colour to select it. Click or drag on the grid to paint squares that colour. Eraser button to clear squares. Clear All button. Each paint click makes a satisfying pop sound using Web Audio API.' },
  { emoji: '📖', label: 'Adventure', color: '#10b981', idea: 'Build a choose-your-own-adventure story in a magical forest. Start with an intro scene and 2 choices. Each choice leads to a new scene with 2 more choices. At least 8 scenes total with 2 different endings (good and bad). Show a big emoji illustration for each scene. Atmospheric chime sounds on scene change. Back button to restart from beginning.' },
  { emoji: '🔢', label: 'Times Tables', color: '#3b82f6', idea: 'Build a times tables quiz game. Show a random multiplication question like 6 x 7. Player types the answer in a big input box and presses Enter or Check button. Flash green with a celebration ding if correct. If wrong, show the correct answer gently with a kind message like "Nearly! It was 42 — you will get it next time! 💪" and a soft warm sound — never scary or harsh. Show score and current streak. After 10 questions show final score with a big encouraging message. New random questions each round.' },
  { emoji: '🐉', label: 'Dragon Tapper', color: '#ec4899', idea: 'Build a dragon tapper clicker game. Show a big dragon egg emoji. Click it to earn gold coins — show +1 gold and pop sound each click. Display gold count. Three evolution buttons: Hatch Egg costs 20 gold shows 🐣, Baby Dragon costs 100 gold shows 🐲, Fire Dragon costs 500 gold shows 🔥🐉. When evolving play a roar sound and show confetti. Show current evolution stage with big emoji.' },
  { emoji: '🥁', label: 'Beat Maker', color: '#f97316', idea: 'Build an 8-step drum machine. Four rows: Kick 🥁, Snare 🪘, Hi-Hat 🎩, Clap 👏. Each row has 8 toggle buttons — click to turn on or off. Play button starts the beat looping through all 8 steps left to right. Highlight current step with bright colour. Use Web Audio API to synthesise each drum sound — kick is low thump, snare is noise burst, hihat is short hiss, clap is sharp crack. Stop button. Tempo slider.' },
  { emoji: '🌟', label: 'Wish Jar', color: '#a78bfa', idea: 'Build a magical wish jar app. Show a big glowing jar illustration made from CSS. Text input box and a Wish button. When player types a wish and clicks Wish, animate a star flying into the jar with a magical chime sound. Show all wishes listed below the jar. Each wish can be deleted with a click. Jar glows brighter as more wishes are added. Purple and gold colour scheme.' },
  { emoji: '🎮', label: 'My own idea!', color: '#14b8a6', idea: '' },
];

// Voice support check
const hasVoice = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

export default function ZappCreator({ onSubmit }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voicePulse, setVoicePulse] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastTranscriptRef = useRef(''); // iOS Safari fallback — capture last heard text

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

  const startListening = async () => {
    if (!hasVoice) return;

    // Request mic permission explicitly first (fixes iOS/Android first-tap issue)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      // Permission denied — show a friendly message
      setVoiceText('Mic blocked! Please allow microphone access in your browser settings 🎤');
      setIsListening(false);
      setTimeout(() => setVoiceText(''), 4000);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-GB';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceText('');
      setVoicePulse(true);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      // Always keep a ref to the latest transcript so onend can use it (iOS Safari fix)
      const latest = final || interim;
      lastTranscriptRef.current = latest;
      setVoiceText(latest);

      if (final) {
        const trimmed = final.trim();
        lastTranscriptRef.current = '';
        setVoiceText('');
        setIsListening(false);
        setVoicePulse(false);
        if (trimmed.length >= 3) {
          setTimeout(() => onSubmit(trimmed), 200);
        }
      }
    };

    recognition.onerror = (e) => {
      setIsListening(false);
      setVoicePulse(false);
      if (e.error === 'not-allowed') {
        setVoiceText('Mic blocked! Check browser settings 🎤');
        setTimeout(() => setVoiceText(''), 4000);
      }
    };

    // iOS Safari often fires onend before a final result — use whatever we captured
    recognition.onend = () => {
      setIsListening(false);
      setVoicePulse(false);
      const captured = lastTranscriptRef.current.trim();
      if (captured.length >= 3) {
        lastTranscriptRef.current = '';
        setVoiceText('');
        setTimeout(() => onSubmit(captured), 200);
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setVoicePulse(false);
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
          tap an idea · or say it out loud ⚡
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
            onClick={isListening ? stopListening : startListening}
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
              {isListening ? 'LISTENING...' : '🎤 SPEAK YOUR IDEA'}
            </span>
          </motion.button>

          <AnimatePresence mode="wait">
            {isListening && voiceText ? (
              <motion.p
                key="voicetext"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-white/90 text-base font-bold text-center italic px-4"
              >
                "{voiceText}"
              </motion.p>
            ) : isListening ? (
              <motion.p key="listening-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-300 font-bold text-sm">say your idea now! tap to stop</motion.p>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/30 text-sm font-semibold text-center">tap the big button · say your idea out loud</motion.p>
            )}
          </AnimatePresence>
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
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-2 px-3 py-5 rounded-2xl font-bold transition-shadow"
              style={{
                background: `${item.color}15`,
                border: `2px solid ${item.color}40`,
                boxShadow: `0 4px 24px ${item.color}18`,
              }}
            >
              <span style={{ fontSize: 32 }}>{item.emoji}</span>
              <span className="text-xs font-black text-center leading-tight text-white/90">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Type your own */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="w-full max-w-2xl"
      >
        {!customMode ? (
          <button
            onClick={() => { setCustomMode(true); setTimeout(() => textareaRef.current?.focus(), 100); }}
            className="w-full py-3 rounded-xl font-bold text-white/25 hover:text-white/50 text-sm transition-all"
            style={{ border: '1px dashed rgba(255,255,255,0.08)', background: 'transparent' }}
          >
            ✏️ or type your own idea...
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: isFocused ? '2px solid rgba(167,139,250,0.7)' : '2px solid rgba(255,255,255,0.1)',
              boxShadow: isFocused ? '0 0 40px rgba(167,139,250,0.2)' : 'none'
            }}
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="a quiz about dinosaurs with 10 questions..."
              rows={3}
              className="w-full bg-transparent text-white text-lg font-medium px-5 pt-5 pb-3 resize-none outline-none placeholder-white/20 leading-relaxed"
              style={{ caretColor: '#a78bfa' }}
            />
            <div className="flex justify-between items-center px-4 pb-4">
              <button onClick={() => setCustomMode(false)} className="text-white/20 hover:text-white/50 text-sm transition-colors">cancel</button>
              <motion.button
                onClick={() => handleSubmit()}
                disabled={value.trim().length < 3}
                whileHover={{ scale: value.trim().length >= 3 ? 1.05 : 1 }}
                whileTap={{ scale: value.trim().length >= 3 ? 0.97 : 1 }}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-black text-base transition-all"
                style={{
                  background: value.trim().length >= 3
                    ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                    : 'rgba(255,255,255,0.05)',
                  color: value.trim().length >= 3 ? '#fff' : 'rgba(255,255,255,0.2)',
                  boxShadow: value.trim().length >= 3 ? '0 0 30px rgba(124,58,237,0.5)' : 'none'
                }}
              >
                ZAPP it ⚡
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <p className="text-white/10 text-xs mt-6 font-mono text-center">
        no account needed · nothing stored · safe for kids
      </p>
    </div>
  );
}