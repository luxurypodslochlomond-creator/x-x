import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_IDEAS = [
  { emoji: '🃏', label: 'SNAP!', idea: 'a two-player SNAP card game where cards flip one at a time onto a pile, and you have to press SNAP! as fast as possible when two matching cards appear. Cards should have big colourful emojis (animals, fruit, shapes). Show both player scores. Play a loud buzzer sound on wrong snap, a celebration sound and confetti on correct snap. Make it feel FAST and exciting with big animations when SNAP happens.' },
  { emoji: '⚡', label: 'Cookie Clicker', idea: 'a cookie clicker idle game — big cookie in the middle, click it to earn cookies. Buy upgrades: Grandma (costs 50, +1/sec), Farm (costs 200, +5/sec), Factory (costs 1000, +20/sec), Portal (costs 5000, +100/sec). Show cookies per second, total cookies, upgrade shop on the right. Make clicking feel satisfying with pop animations and click sounds. Add cookie particles when you click.' },
  { emoji: '🐴', label: 'Horse Quiz', idea: 'a 10-question multiple choice quiz all about horses — breeds, facts, care, riding. Big colourful question cards, 4 answer buttons, a progress bar, fun horse sound effects (whinny on correct, sad trombone on wrong), final score screen with a star rating and encouraging message. Randomise question order each time so it\'s different every play.' },
  { emoji: '🎨', label: 'Pixel Art', idea: 'a 16x16 pixel art drawing tool. Colour palette with 20 bright colours. Click or drag to paint pixels. Eraser tool. Fill bucket tool. Clear button. Save as PNG download button. Make it feel like a proper art app — satisfying click sounds, smooth drawing.' },
  { emoji: '📖', label: 'Adventure Story', idea: 'a choose your own adventure story set in a magical forest. At least 15 different story nodes, branching choices, different endings (good ending, bad ending, secret ending). Animated scene descriptions, emoji illustrations, keep track of items you collect. Sound effects for atmosphere.' },
  { emoji: '🔢', label: 'Times Tables', idea: 'a fast-paced times tables quiz — random question appears, type the answer, press enter. Big satisfying correct/wrong animations. Score streak counter — lose streak on wrong answer. Speed bonus for fast answers. Hall of fame top 5 scores saved in browser. Encouraging messages. Satisfying ding sounds for correct, buzz for wrong.' },
  { emoji: '🌈', label: 'Colour Mixer', idea: 'a colour mixing lab — three big paint pot sliders for red, green, blue (0-255). Show the mixed colour live in a big circle. Name the colour (use a lookup table of 50+ colour names). Let you save colours to a palette. Mixing sound effect. Paint splat animations.' },
  { emoji: '🐉', label: 'Dragon Tapper', idea: 'a dragon evolution idle tapper — tap a baby dragon egg to hatch it, then tap the dragon to earn gold. Buy evolutions: Baby Dragon, Fire Dragon, Ice Dragon, Thunder Dragon, Cosmic Dragon. Each evolution looks different (use CSS/emoji art), gets bigger, breathes fire animation. Dragon roar sounds. Satisfying evolution cutscene.' },
  { emoji: '🌟', label: 'Wish Jar', idea: 'a magical glowing wish jar — type a wish, press the sparkle button, it flies into the jar with a star animation and a magical chime sound. The jar fills up visually as you add wishes. Click wishes in the jar to read them. Delete wishes with a puff of smoke animation. Make it feel genuinely magical with CSS animations and Web Audio sparkle sounds.' },
  { emoji: '🎵', label: 'Beat Maker', idea: 'a simple 8-step drum machine beat maker. Rows for: Kick, Snare, Hi-Hat, Clap. 8 step buttons per row. Play/stop button. Tempo slider (60-180 BPM). Each button lights up when active. Current step highlighted as it plays. Web Audio API for all sounds — actual drum sounds synthesised. Save and load 3 preset beats.' },
];

export default function ZappCreator({ onSubmit }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 max-w-3xl"
      >
        <div className="text-5xl md:text-7xl font-black mb-3 leading-none tracking-tighter" style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          what do you<br />want to build?
        </div>
        <p className="text-white/40 text-lg font-medium mt-3">
          tell me your idea — I'll build it in seconds ⚡
        </p>
      </motion.div>

      {/* Quick idea buttons — tap to instantly build */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-3xl mb-6"
      >
        <p className="text-white/25 text-xs font-bold tracking-widest text-center mb-3 font-mono">TAP TO BUILD INSTANTLY</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {QUICK_IDEAS.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => onSubmit(item.idea)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl font-bold text-sm transition-all"
              style={{
                background: 'rgba(167, 139, 250, 0.08)',
                border: '2px solid rgba(167, 139, 250, 0.2)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-bold text-center leading-tight">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* OR divider */}
      <div className="flex items-center gap-4 w-full max-w-2xl mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/20 text-sm font-bold">or type your own idea</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Custom input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div
          className="relative rounded-2xl transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: isFocused
              ? '2px solid rgba(167, 139, 250, 0.6)'
              : '2px solid rgba(255,255,255,0.08)',
            boxShadow: isFocused ? '0 0 40px rgba(167, 139, 250, 0.2)' : 'none'
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
            rows={2}
            className="w-full bg-transparent text-white text-lg font-medium px-5 pt-5 pb-3 resize-none outline-none placeholder-white/20 leading-relaxed"
            style={{ caretColor: '#a78bfa' }}
          />
          <div className="flex justify-end px-4 pb-4">
            <motion.button
              onClick={handleSubmit}
              disabled={value.trim().length < 3}
              whileHover={{ scale: value.trim().length >= 3 ? 1.05 : 1 }}
              whileTap={{ scale: value.trim().length >= 3 ? 0.97 : 1 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-base transition-all"
              style={{
                background: value.trim().length >= 3
                  ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                  : 'rgba(255,255,255,0.05)',
                color: value.trim().length >= 3 ? '#fff' : 'rgba(255,255,255,0.2)',
                boxShadow: value.trim().length >= 3 ? '0 0 30px rgba(124, 58, 237, 0.5)' : 'none'
              }}
            >
              <span>ZAPP it</span>
              <span className="text-lg">⚡</span>
            </motion.button>
          </div>
        </div>
        <p className="text-center text-white/20 text-xs mt-3">
          no account needed · nothing stored · safe for kids
        </p>
      </motion.div>
    </div>
  );
}