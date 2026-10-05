import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Leaf, MapPin, Heart } from 'lucide-react';

export default function LiveCleanupFeed({ compact = false }) {
  const [cleanups, setCleanups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCleanups = async () => {
      try {
        const recent = await base44.entities.Cleanup.list('-created_date', 5);
        setCleanups(recent.slice(0, compact ? 2 : 5));
      } catch (error) {
        console.error('Failed to fetch cleanups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCleanups();

    // Subscribe to new cleanups
    const unsubscribe = base44.entities.Cleanup.subscribe((event) => {
      if (event.type === 'create') {
        setCleanups((prev) => [event.data, ...prev.slice(0, compact ? 1 : 4)]);
      }
    });

    return unsubscribe;
  }, [compact]);

  if (loading || cleanups.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-green-500/10 border border-green-500/30 rounded-lg p-3 ${compact ? 'text-xs' : 'text-sm'}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Leaf className={`text-green-400 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <span className="text-green-300 font-bold">Live Impact</span>
      </div>

      <div className={`space-y-2 ${compact ? 'space-y-1' : ''}`}>
        {cleanups.map((cleanup, idx) => (
          <motion.div
            key={cleanup.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-black/40 rounded p-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <Heart className="w-3 h-3 text-pink-400" fill="currentColor" />
              </motion.div>
              <div className="min-w-0">
                <p className="text-white font-mono truncate">{cleanup.litter_weight}kg cleaned</p>
                {!compact && cleanup.county && (
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {cleanup.county}
                  </p>
                )}
              </div>
            </div>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-green-400 font-bold text-xs whitespace-nowrap ml-2"
            >
              +{Math.floor(cleanup.litter_weight)} P51
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}