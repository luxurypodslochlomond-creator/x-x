import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const QUICK_IDEAS = [
  { emoji: '🃏', label: 'SNAP!', color: '#f43f5e', idea: 'a two-player SNAP card game where cards flip one at a time onto a pile, and you have to press SNAP! as fast as possible when two matching cards appear. Cards should have big colourful emojis (animals, fruit, shapes). Show both player scores. Play a loud buzzer sound on wrong snap, a celebration sound and confetti on correct snap. Make it feel FAST and exciting with big animations when SNAP happens.' },
  { emoji: '🍪', label: 'Cookie Clicker', color: '#f59e0b', idea: 'a cookie clicker idle game — big cookie in the middle, click it to earn cookies. Buy upgrades: Grandma (costs 50, +1/sec), Farm (costs 200, +5/sec), Factory (costs 1000, +20/sec), Portal (costs 5000, +100/sec). Show cookies per second, total cookies, upgrade shop on the right. Make clicking feel satisfying with pop animations and click sounds. Add cookie particles when you click.' },
  { emoji: '🐴', label: 'Horse Quiz', color: '#8b5cf6', idea: 'a 10-question multiple choice quiz all about horses — breeds, facts, care, riding. Big colourful question cards, 4 answer buttons, a progress bar, fun horse sound effects (whinny on correct, sad trombone on wrong), final score screen with a star rating and encouraging message. Randomise question order each time so its different every play.' },
  { emoji: '🎨', label: 'Pixel Art', color: '#06b6d4', idea: 'a 16x16 pixel art drawing tool. Colour palette with 20 bright colours. Click or drag to paint pixels. Eraser tool. Fill bucket tool. Clear button. Save as PNG download button. Satisfying click sounds and smooth drawing.' },
  { emoji: '📖', label: 'Adventure', color: '#10b981', idea: 'a choose your own adventure story set in a magical forest. At least 15 different story nodes, branching choices, different endings (good ending, bad ending, secret ending). Animated scene descriptions, emoji illustrations, keep track of items you collect. Sound effects for atmosphere.' },
  { emoji: '🔢', label: 'Times Tables', color: '#3b82f6', idea: 'a fast-paced times tables quiz — random question appears, type the answer, press enter. Big satisfying correct/wrong animations. Score streak counter — lose streak on wrong answer. Speed bonus for fast answers. Hall of fame top 5 scores saved in browser. Satisfying ding sounds for correct, buzz for wrong.' },
  { emoji: '🐉', label: 'Dragon Tapper', color: '#ec4899', idea: 'a dragon evolution idle tapper — tap a baby dragon egg to hatch it, then tap the dragon to earn gold. Buy evolutions: Baby Dragon, Fire Dragon, Ice Dragon, Thunder Dragon, Cosmic Dragon. Each evolution looks different with emoji art, gets bigger, breathes fire animation. Dragon roar sounds. Satisfying evolution cutscene.' },
  { emoji: '🥁', label: 'Beat Maker', color: '#f97316', idea: 'a simple 8-step drum machine beat maker. Rows for: Kick, Snare, Hi-Hat, Clap. 8 step buttons per row. Play/stop button. Tempo slider 60-180 BPM. Each button lights up when active. Current step highlighted as it plays. Web Audio API for all sounds — actual drum sounds synthesised. Save and load 3 preset beats.' },
  { emoji: '🌟', label: 'Wish Jar', color: '#a78bfa', idea: 'a magical glowing wish jar — type a wish, press the sparkle button, it flies into the jar with a star animation and a magical chime sound. The jar fills up visually as you add wishes. Click wishes in the jar to read them. Delete wishes with a puff of smoke animation. Make it feel genuinely magical.' },
  { emoji: '🎮', label: 'My Own Game', color: '#14b8a6', idea: '' },
];

export default function ZappCreator({ onSubmit }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (value.trim().length < 3) return;
    onSubmit(value.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickTap = (item) => {
    if (item.label === 'My Own Game') {
      setCustomMode(true);
      setTimeout(() => textareaRef.current?.focus(), 100);
    } else {
      onSubmit(item.idea);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-72px)] px-4 pt-6 pb-10">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6 max-w-2xl"
      >
        <div className="text-4xl md:text-6xl font-black mb-2 leading-none tracking-tight" style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          what do you<br />want to build? ⚡
        </div>
        <p className="text-white/50 text-base font-medium mt-2">
          tap an idea below — your app is ready in seconds
        </p>
      </motion.div>

      {/* Quick idea buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-2xl mb-5"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {QUICK_IDEAS.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => handleQuickTap(item)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.94 }}
              className="flex flex-col items-center gap-2 px-3 py-5 rounded-2xl font-bold transition-all"
              style={{
                background: `${item.color}18`,
                border: `2px solid ${item.color}50`,
                boxShadow: `0 4px 20px ${item.color}20`,
              }}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-xs font-black text-center leading-tight text-white">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Custom input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        {!customMode ? (
          <button
            onClick={() => { setCustomMode(true); setTimeout(() => textareaRef.current?.focus(), 100); }}
            className="w-full py-3 rounded-xl font-bold text-white/30 hover:text-white/60 transition-all text-sm"
            style={{ border: '1px dashed rgba(255,255,255,0.1)', background: 'transparent' }}
          >
            ✏️ or describe your own idea...
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
              placeholder="a quiz about dinosaurs with 10 questions and sound effects..."
              rows={3}
              className="w-full bg-transparent text-white text-lg font-medium px-5 pt-5 pb-3 resize-none outline-none placeholder-white/20 leading-relaxed"
              style={{ caretColor: '#a78bfa' }}
            />
            <div className="flex justify-between items-center px-4 pb-4">
              <button onClick={() => setCustomMode(false)} className="text-white/20 hover:text-white/50 text-sm transition-colors">cancel</button>
              <motion.button
                onClick={handleSubmit}
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
        <p className="text-center text-white/15 text-xs mt-3 font-mono">
          no account needed · nothing stored · safe for kids
        </p>
      </motion.div>
    </div>
  );
}