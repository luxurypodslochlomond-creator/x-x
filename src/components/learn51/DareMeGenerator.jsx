import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function DareMeGenerator({ vibe }) {
  const [dare, setDare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  const generateDare = async () => {
    setLoading(true);
    try {
      const prompt = `Generate ONE surprising, fun, 2-3 sentence dare/challenge for a kid interested in "${vibe?.label || 'everything'}" that teaches something wild and interesting. Make it spark curiosity, not feel like homework. No grades, no judging. Just "whoa I didn't know that was connected to MY thing". Keep it weird and unexpected.`;
      
      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        model: 'gemini_3_flash',
      });
      
      setDare(result);
      setShown(true);
    } catch (err) {
      console.error('Dare generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const colors = ['#ec4899', '#f59e0b', '#34d399', '#06b6d4', '#c084fc'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.button
      onClick={generateDare}
      disabled={loading}
      whileTap={{ scale: 0.95 }}
      className="w-full rounded-3xl font-black py-5 overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${randomColor}22 0%, ${randomColor}06 100%)`,
        border: `2.5px solid ${randomColor}`,
        color: randomColor,
        fontSize: 17,
        letterSpacing: '-0.3px',
        boxShadow: `0 0 30px ${randomColor}20, inset 0 0 20px ${randomColor}10`,
      }}
    >
      {/* Animated shimmer */}
      {!shown && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ opacity: 0.1 }}
          animate={{ x: ['−100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10 flex items-center justify-center gap-2">
        <span style={{ fontSize: 22 }}>🎲</span>
        <span>{loading ? 'Generating...' : shown && dare ? 'Another dare?' : 'Dare me 🚀'}</span>
      </div>

      {/* Dare reveal */}
      {shown && dare && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 pt-3 border-t"
          style={{ borderColor: `${randomColor}40` }}
        >
          <p className="text-sm font-bold leading-relaxed opacity-80">{dare}</p>
        </motion.div>
      )}
    </motion.button>
  );
}