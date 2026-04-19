import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { getActiveProfile, addProfileStars, getProfileStars } from './LearnProfile';

// Backwards-compatible helpers — use active profile if set, else legacy key
const LEGACY_KEY = 'learn51_stars';

export const awardStars = (n) => {
  try {
    const profileId = getActiveProfile();
    if (profileId) {
      addProfileStars(profileId, n);
      return getProfileStars(profileId);
    }
    // legacy fallback
    const current = parseInt(localStorage.getItem(LEGACY_KEY) || '0', 10);
    const next = current + n;
    localStorage.setItem(LEGACY_KEY, String(next));
    return next;
  } catch { return 0; }
};

export const getLearnStars = () => {
  try {
    const profileId = getActiveProfile();
    if (profileId) return getProfileStars(profileId);
    return parseInt(localStorage.getItem(LEGACY_KEY) || '0', 10);
  } catch { return 0; }
};

export default function StarAward({ stars = 1, label = 'Great work!', onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    awardStars(stars);
    const t = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border-4 border-yellow-400 rounded-3xl px-8 py-5 shadow-2xl text-center"
        >
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: stars }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>
          <p className="text-2xl font-black text-gray-900">+{stars} {stars === 1 ? 'Star' : 'Stars'}!</p>
          <p className="text-gray-600 font-bold">{label}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}