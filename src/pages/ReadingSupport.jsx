import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, CheckCircle, Eye, Volume2, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const TIP = ({ emoji, title, desc }) => (
  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
    <span className="text-3xl flex-shrink-0">{emoji}</span>
    <div>
      <p className="text-white font-black text-lg">{title}</p>
      <p className="text-gray-300 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const STRATEGIES = [
  {
    icon: '🎯',
    title: 'Read aloud together',
    desc: 'Reading out loud slows things down. It helps your brain process words properly. No rushing.',
  },
  {
    icon: '👆',
    title: 'Use your finger',
    desc: 'Put your finger under each word as you read. It stops eyes jumping around.',
  },
  {
    icon: '📖',
    title: 'Cover what you haven\'t read yet',
    desc: 'Use a piece of paper to hide the lines below. One line at a time. Less overwhelming.',
  },
  {
    icon: '🔁',
    title: 'Re-read is not failing',
    desc: 'Reading something twice is smart, not slow. Even adults re-read. Always.',
  },
  {
    icon: '💬',
    title: 'Say it in your own words',
    desc: 'After reading a sentence, close your eyes and say what it meant. If you can, you got it.',
  },
  {
    icon: '⏸️',
    title: 'Pause at the full stop',
    desc: 'Every full stop is a breathing moment. Stop. Think. Then carry on.',
  },
];

const DYSLEXIA_TIPS = [
  { emoji: '🅰️', title: 'Letters that flip', desc: 'b/d and p/q flip for many people. Try drawing a fist with your left hand — the bump is "b". That\'s normal. You\'re not broken.' },
  { emoji: '🌈', title: 'Coloured overlays help', desc: 'Some kids read better with a coloured sheet over the page. Yellow, blue, pink — try it. It genuinely works for many people.' },
  { emoji: '📏', title: 'Bigger text = easier reading', desc: 'On phones and tablets, always zoom in. There\'s no rule that says text has to be small.' },
  { emoji: '🎧', title: 'Listen AND read', desc: 'If someone reads it out loud while you follow along, your brain gets two chances to understand. Double power.' },
];

export default function ReadingSupportPage() {
  const [activeTab, setActiveTab] = useState('tips');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* BACK */}
        <Link to={createPageUrl('Learn51')} className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Learn51
        </Link>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="text-6xl">📖</div>
          <h1 className="text-4xl md:text-5xl font-black text-white">Reading Support</h1>
          <p className="text-xl text-indigo-200 leading-relaxed max-w-xl mx-auto">
            Reading is a skill — not a talent. Everyone learns differently. Here's what actually helps.
          </p>
        </motion.div>

        {/* TABS */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-2xl">
          {[
            { id: 'tips', label: '💡 Reading Tips' },
            { id: 'dyslexia', label: '🧠 Dyslexia Help' },
            { id: 'parents', label: '👨‍👩‍👧 For Parents' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-gray-300 text-lg">These work for everyone — slow readers, fast readers, all readers.</p>
            {STRATEGIES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <TIP emoji={s.icon} title={s.title} desc={s.desc} />
              </motion.div>
            ))}

            <div className="bg-indigo-900/50 border-2 border-indigo-400/40 rounded-2xl p-6 text-center mt-6">
              <p className="text-2xl font-black text-white">Reading is not a race. 🐢</p>
              <p className="text-indigo-200 mt-2">The tortoise always wins. Slow and understanding beats fast and confused every time.</p>
            </div>
          </motion.div>
        )}

        {/* DYSLEXIA TAB */}
        {activeTab === 'dyslexia' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-pink-900/30 border-2 border-pink-500/40 rounded-2xl p-6">
              <p className="text-xl font-black text-white mb-2">Dyslexia is not low intelligence. 💡</p>
              <p className="text-gray-300 leading-relaxed">
                Many of the world's best engineers, artists, entrepreneurs and athletes have dyslexia.
                It just means your brain processes text differently — and with the right tools, nothing can stop you.
              </p>
            </div>

            <div className="space-y-4">
              {DYSLEXIA_TIPS.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <TIP emoji={t.emoji} title={t.title} desc={t.desc} />
                </motion.div>
              ))}
            </div>

            <div className="bg-green-900/30 border-2 border-green-500/40 rounded-2xl p-6 space-y-3">
              <p className="text-xl font-black text-white">What Learn51 does differently:</p>
              {[
                'Short sentences — never long walls of text',
                'Big clear fonts — always easy to see',
                'Emojis and visuals alongside every key idea',
                'AI adapts to YOU — not a fixed reading level',
                'Zero shame — wrong answers are just stepping stones',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PARENTS TAB */}
        {activeTab === 'parents' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-amber-900/30 border-2 border-amber-500/40 rounded-2xl p-6">
              <p className="text-xl font-black text-white mb-2">The most important thing you can do 🏠</p>
              <p className="text-gray-300 leading-relaxed">
                Read together. Not instead of them — <em>with</em> them. 10 minutes a day of shared reading
                has more impact than any reading programme.
              </p>
            </div>

            {[
              { emoji: '🎯', title: 'Make it feel like a game, not a test', desc: 'Ask "what do you think happens next?" not "what does this word say?" Curiosity beats pressure every time.' },
              { emoji: '📺', title: 'Subtitles on TV are reading practice', desc: 'Watching shows with subtitles on is genuinely proven to improve reading. And kids love it.' },
              { emoji: '🎮', title: 'Gaming involves reading', desc: 'Games with text, menus, missions and stories all build reading skills. Don\'t dismiss it.' },
              { emoji: '❤️', title: 'Never make reading feel like a punishment', desc: 'The fastest way to kill a love of reading is making it feel hard or shameful. Go slow. Go kind. Always.' },
              { emoji: '🤝', title: 'Ask their teacher specifically', desc: 'Not "how are they doing" — ask "what one reading strategy should I reinforce at home?" Specific questions get specific answers.' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <TIP emoji={t.emoji} title={t.title} desc={t.desc} />
              </motion.div>
            ))}

            <div className="bg-indigo-900/50 border-2 border-indigo-400/40 rounded-2xl p-6 text-center">
              <p className="text-lg font-black text-white">Learn51 is free. No login. No data. Just learning. ♾️</p>
              <p className="text-indigo-200 mt-2 text-sm">Every child on Earth deserves a brilliant tutor. This is ours.</p>
            </div>
          </motion.div>
        )}

        {/* BACK TO LEARN */}
        <div className="text-center pt-4">
          <Link
            to={createPageUrl('Learn51AI')}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all"
          >
            Start Learning with AI → 🚀
          </Link>
        </div>

      </div>
    </div>
  );
}