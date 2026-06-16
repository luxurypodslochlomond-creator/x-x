import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ZappGeometricIcon from '@/components/zapp/ZappGeometricIcon';

export default function ZappGallery({ onPlay, onRemix }) {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null); // creation being previewed

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
  };

  if (playing) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#000' }}>
        {/* Slim bar */}
        <div style={{ height: 48, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', background: 'rgba(10,10,15,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <ZappGeometricIcon shape="zap" size={18} color="#a78bfa" accent="#c4b5fd" />
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 110 }}>{playing.title}</span>
            {playing.creator_name && <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, flexShrink: 0 }}>by {playing.creator_name}</span>}
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button onClick={() => onRemix(playing)}
              style={{ padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 900, background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.4)', color: '#f472b6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ZappGeometricIcon shape="shuffle" size={13} color="#f472b6" accent="#f9a8d4" /> remix
            </button>
            <button onClick={() => setPlaying(null)}
              style={{ padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 900, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
              ← back
            </button>
          </div>
        </div>
        {/* Game fills ALL remaining space */}
        <iframe
          srcDoc={playing.html}
          title={playing.title}
          sandbox="allow-scripts allow-same-origin"
          style={{ flex: 1, width: '100%', border: 'none', display: 'block', minHeight: 0 }}
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto" style={{ minHeight: '80vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          <ZappGeometricIcon shape="zap" size={36} color="#fbbf24" accent="#fde68a" />
          <h2 className="font-black text-3xl text-white">Community Gallery</h2>
        </div>
        <p className="text-white/30 text-sm">apps built by kids, for everyone — tap to discover!</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <ZappGeometricIcon shape="gear" size={48} color="#a78bfa" accent="#c4b5fd" animate={false} />
          </motion.div>
        </div>
      ) : creations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <motion.div
            className="mb-6 flex justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <ZappGeometricIcon shape="star" size={72} color="#a78bfa" accent="#c4b5fd" />
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ZappGeometricIcon shape="star" size={72} color="#fbbf24" accent="#fde68a" />
              </motion.div>
            </div>
          </motion.div>
          <p className="text-white/50 font-black text-2xl mb-2">nothing here yet</p>
          <p className="text-white/20 text-base max-w-xs mx-auto leading-relaxed">
            build something and share it — your creation could be the first in the gallery!
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-white/10">
            <span className="w-2 h-2 rounded-full bg-violet-500/30" />
            <span className="w-2 h-2 rounded-full bg-pink-500/30" />
            <span className="w-2 h-2 rounded-full bg-cyan-500/30" />
          </div>
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
                  <span className="text-white font-black text-sm px-4 py-2 rounded-xl flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                    <ZappGeometricIcon shape="zap" size={14} color="#fff" accent="#fff" /> play
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <ZappGeometricIcon shape={item.emoji || 'zap'} size={18} color="#a78bfa" accent="#c4b5fd" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-black text-xs truncate">{item.title}</p>
                    {item.creator_name && (
                      <p className="text-white/30 text-[10px] truncate">by {item.creator_name}</p>
                    )}
                    {item.remix_of && (
                      <p className="text-pink-400/60 text-[10px] flex items-center gap-1">
                        <ZappGeometricIcon shape="shuffle" size={10} color="#f472b6" accent="#f9a8d4" /> remix
                      </p>
                    )}
                  </div>
                  {(item.play_count > 0) && (
                    <span className="text-white/20 text-[10px] flex-shrink-0">{item.play_count} plays</span>
                  )}
                </div>
                <button
                  onClick={() => onRemix(item)}
                  className="mt-2 w-full py-1 rounded-lg text-[10px] font-black text-pink-400/70 hover:text-pink-400 transition-colors flex items-center justify-center gap-1"
                  style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.15)' }}
                >
                  <ZappGeometricIcon shape="shuffle" size={10} color="#f472b6" accent="#f9a8d4" /> remix this
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}