import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, X, Check } from 'lucide-react';

// Share a win — spreads Learn51 to more kids for free ❤️
export default function ShareYourWin({ interest, topic, stars, streak, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareText = `🌟 I just learned something amazing about ${topic} using ${interest}! I have ${stars} stars on Learn51 AI — the FREE AI tutor for every kid on Earth 🌍\n\nTry it free: learn51.ai / uf51.com/Learn51AI\n\nNo login. No cost. Just learning. ❤️`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I just learned something amazing! 🌟',
          text: shareText,
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-black text-gray-900">Share your win! 🎉</p>
              <p className="text-gray-500 text-sm">Help another kid find this — it's free for everyone</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Preview card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
            <p className="font-black text-lg leading-snug">
              🌟 I just learned {topic} through {interest}!
            </p>
            <p className="text-indigo-200 text-sm mt-1">{stars} stars · Free AI tutor · No login ever</p>
            <p className="text-white/80 text-xs mt-2">learn51.ai</p>
          </div>

          {/* Streak bonus message */}
          {streak >= 3 && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 text-center">
              <p className="text-orange-700 font-black">🔥 {streak} streak! You're on fire — your friends need to see this!</p>
            </div>
          )}

          {/* Share buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share now
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-lg transition-all"
            >
              💬 Send on WhatsApp
            </a>

            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-bold text-base transition-all ${
                copied
                  ? 'border-green-400 bg-green-50 text-green-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy message</>}
            </button>
          </div>

          <p className="text-center text-gray-400 text-xs">
            Every share = one more kid with a free AI tutor ❤️
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}