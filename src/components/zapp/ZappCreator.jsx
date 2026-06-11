import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_IDEAS = [
  { emoji: '🃏', label: 'SNAP!', color: '#f43f5e', idea: 'a two-player SNAP card game where cards flip one at a time. Big colourful emoji cards (animals, fruit, shapes). Press the giant SNAP button when two matching cards appear. Loud celebration sound and confetti explosion on correct snap. Buzzer sound on wrong snap. Show both player scores. Fast exciting animations.' },
  { emoji: '🍪', label: 'Cookie Clicker', color: '#f59e0b', idea: 'a cookie clicker idle game. Giant cookie in centre. Click it to earn cookies with pop sound and particle burst. Buy upgrades on the right: Grandma (50 cookies, +1/sec), Farm (200 cookies, +5/sec), Factory (1000, +20/sec), Portal (5000, +100/sec). Show cookies per second. Upgrades unlock with fanfare sounds.' },
  { emoji: '🐴', label: 'Horse Quiz', color: '#8b5cf6', idea: 'a 10-question multiple choice quiz all about horses — breeds, facts, care, famous horses. Big colourful question cards. 4 answer buttons. Progress bar. Horse whinny sound on correct, sad trombone on wrong. Confetti explosion on a perfect score. Randomise questions every time.' },
  { emoji: '🎨', label: 'Pixel Art', color: '#06b6d4', idea: 'a 20x20 pixel art drawing app. 24-colour palette with bright neon colours. Click or drag to paint. Eraser tool. Fill bucket. Clear button. Download as PNG. Satisfying click sounds when drawing.' },
  { emoji: '📖', label: 'Adventure', color: '#10b981', idea: 'a choose your own adventure story in a magical forest with dragons. 15+ branching story nodes. Different endings. Collect items that affect the story. Atmospheric sound effects. Emoji scene art. Exciting choices at every step.' },
  { emoji: '🔢', label: 'Times Tables', color: '#3b82f6', idea: 'a fast-paced times tables quiz. Random question pops up, type answer, press enter. Big correct/wrong animations. Score streak counter. Speed bonus for fast answers. Top 5 high scores saved. Satisfying ding on correct, buzz on wrong.' },
  { emoji: '🐉', label: 'Dragon Tapper', color: '#ec4899', idea: 'a dragon evolution tapper game. Tap the dragon egg to earn gold. Buy evolutions: Egg, Baby Dragon, Fire Dragon, Ice Dragon, Thunder Dragon, Cosmic Dragon. Each looks different with emoji art. Dragon roar sounds. Confetti on evolution. Idle gold per second.' },
  { emoji: '🥁', label: 'Beat Maker', color: '#f97316', idea: 'an 8-step drum machine. Rows for Kick, Snare, Hi-Hat, Clap. 8 step buttons per row. Play/stop. Tempo slider 60-180 BPM. Current step highlighted. Web Audio API drum sounds. Save 3 beat presets. Looks like a real drum machine.' },
  { emoji: '🌟', label: 'Wish Jar', color: '#a78bfa', idea: 'a magical glowing wish jar. Type a wish, press sparkle button, it flies into the jar with star animations and magical chime. Jar fills up visually. Click wishes to read them. Delete with puff of smoke. Glowing purple and gold colours.' },
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

  const startListening = () => {
    if (!hasVoice) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
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
      setVoiceText(final || interim);
      if (final) {
        const trimmed = final.trim();
        setVoiceText('');
        setIsListening(false);
        setVoicePulse(false);
        // Call onSubmit directly with the captured text — avoids stale closure on value state
        if (trimmed.length >= 3) {
          setTimeout(() => onSubmit(trimmed), 350);
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoicePulse(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setVoicePulse(false);
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

      {/* VOICE BUTTON — front and centre */}
      {hasVoice && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-8 flex flex-col items-center gap-3"
        >
          <motion.button
            onClick={isListening ? stopListening : startListening}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex items-center justify-center rounded-full font-black text-white"
            style={{
              width: 80, height: 80,
              background: isListening
                ? 'linear-gradient(135deg, #ef4444, #f97316)'
                : 'linear-gradient(135deg, #7c3aed, #db2777)',
              boxShadow: isListening
                ? '0 0 0 0 rgba(239,68,68,0.7)'
                : '0 0 30px rgba(124,58,237,0.5)',
            }}
            animate={isListening ? {
              boxShadow: ['0 0 0 0 rgba(239,68,68,0.7)', '0 0 0 20px rgba(239,68,68,0)', '0 0 0 0 rgba(239,68,68,0)']
            } : {}}
            transition={isListening ? { duration: 1, repeat: Infinity } : {}}
          >
            {isListening ? (
              <span style={{ fontSize: 32 }}>🛑</span>
            ) : (
              <span style={{ fontSize: 32 }}>🎤</span>
            )}
          </motion.button>

          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-center"
              >
                <p className="font-black text-red-400 text-base">listening... say your idea!</p>
                {voiceText && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/70 text-sm mt-1 max-w-xs text-center italic"
                  >
                    "{voiceText}"
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/30 text-sm font-semibold"
              >
                tap to speak your idea
              </motion.p>
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