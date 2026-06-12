import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function ZappGallery({ onPlay, onRemix }) {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null); // id of creation being previewed

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const items = await base44.entities.ZappCreation.list('-created_date', 30);
      setCreations(items);
    } catch (e) {
      console.error('Gallery load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = async (item) => {
    // Increment play count
    try {
      await base44.entities.ZappCreation.update(item.id, { play_count: (item.play_count || 0) + 1 });
    } catch {}
    setPlaying(item);
    if (onPlay) onPlay(item);
  };

  if (playing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#000' }}>
        <iframe
          srcDoc={playing.html}
          className="flex-1 w-full border-0"
          title={playing.title}
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-2"
          style={{ background: 'rgba(0,0,0,0.9)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg flex-shrink-0">{playing.emoji || '⚡'}</span>
            <span className="text-white font-black text-sm truncate max-w-[130px]">{playing.title}</span>
            {playing.creator_name && (
              <span className="text-white/30 text-xs flex-shrink-0">by {playing.creator_name}</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button
              onClick={() => onRemix(playing)}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-lg text-xs font-black"
              style={{ background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.4)', color: '#f472b6' }}
            >
              🔀 remix
            </motion.button>
            <motion.button
              onClick={() => setPlaying(null)}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-lg text-xs font-black"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
            >
              ← back
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto" style={{ minHeight: 'calc(100vh - 72px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="font-black text-3xl text-white mb-1">🏆 Hall of Fame</h2>
        <p className="text-white/30 text-sm">apps built by kids, for kids — tap to play!</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="text-4xl"
          >⚡</motion.div>
        </div>
      ) : creations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-5xl mb-4">🌟</p>
          <p className="text-white/40 font-black text-lg">no apps yet — be the first!</p>
          <p className="text-white/20 text-sm mt-2">build something amazing and save it to the Hall of Fame</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {creations.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl overflow-hidden cursor-pointer group"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Preview thumbnail — mini iframe */}
              <div
                className="relative overflow-hidden"
                style={{ height: 120, background: '#0a0a0f' }}
                onClick={() => handlePlay(item)}
              >
                <iframe
                  srcDoc={item.html}
                  className="w-full border-0 pointer-events-none"
                  style={{ height: 400, transform: 'scale(0.3)', transformOrigin: 'top left', width: '333%' }}
                  title={item.title}
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <span className="text-white font-black text-sm px-3 py-1.5 rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                    ▶ play
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <p className="text-white font-black text-xs truncate">{item.emoji || '⚡'} {item.title}</p>
                    {item.creator_name && (
                      <p className="text-white/30 text-[10px] truncate">by {item.creator_name}</p>
                    )}
                    {item.remix_of && (
                      <p className="text-pink-400/60 text-[10px]">🔀 remix</p>
                    )}
                  </div>
                  {(item.play_count > 0) && (
                    <span className="text-white/20 text-[10px] flex-shrink-0">{item.play_count} plays</span>
                  )}
                </div>
                <button
                  onClick={() => onRemix(item)}
                  className="mt-2 w-full py-1 rounded-lg text-[10px] font-black text-pink-400/70 hover:text-pink-400 transition-colors"
                  style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.15)' }}
                >
                  🔀 remix this
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}