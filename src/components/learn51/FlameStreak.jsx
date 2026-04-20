import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FlameStreak() {
  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('magic51_streak');
      if (!saved) return 0;
      const { count, lastDate } = JSON.parse(saved);
      const today = new Date().toDateString();
      return lastDate === today ? count : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('magic51_streak');
    let count = 0;

    try {
      const data = saved ? JSON.parse(saved) : { count: 0, lastDate: null };
      if (data.lastDate === today) {
        count = data.count;
      } else {
        count = data.lastDate === new Date(Date.now() - 86400000).toDateString() ? data.count + 1 : 1;
      }
      setStreak(count);
      localStorage.setItem('magic51_streak', JSON.stringify({ count, lastDate: today }));
    } catch {}
  }, []);

  const flames = Array.from({ length: Math.min(streak, 10) });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {flames.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
            style={{ fontSize: 20 }}
          >
            🔥
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="font-black text-white" style={{ fontSize: 13, lineHeight: 1 }}>{streak} day streak</div>
        <div className="font-bold text-xs opacity-50">Keep it alive ❤️</div>
      </div>
    </div>
  );
}