import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ZappGeometricIcon from '@/components/zapp/ZappGeometricIcon';

const SHAPES = [
  { shape: 'zap', color: '#fbbf24' },
  { shape: 'diamond', color: '#a78bfa' },
  { shape: 'star', color: '#f472b6' },
  { shape: 'pulse', color: '#60a5fa' },
  { shape: 'flame', color: '#f97316' },
  { shape: 'waveform', color: '#34d399' },
  { shape: 'sparkle', color: '#fbbf24' },
  { shape: 'rocket', color: '#ef4444' },
  { shape: 'burst', color: '#ec4899' },
  { shape: 'spectrum', color: '#7c3aed' },
  { shape: 'people', color: '#8b5cf6' },
  { shape: 'laugh', color: '#14b8a6' },
  { shape: 'check', color: '#22c55e' },
  { shape: 'gear', color: '#64748b' },
  { shape: 'trophy', color: '#fbbf24' },
  { shape: 'shuffle', color: '#f472b6' },
];

export default function ZappSaveModal({ appTitle, html, idea, remixOf, remixInstruction, onSaved, onClose }) {
  const [name, setName] = useState('');
  const [selectedShape, setSelectedShape] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedLink, setSavedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const record = {
        title: appTitle || idea,
        idea,
        html,
        emoji: SHAPES[selectedShape].shape,
        creator_name: name.trim() || null,
        play_count: 0,
      };
      if (remixOf) {
        record.remix_of = remixOf;
        record.remix_instruction = remixInstruction;
      }
      const created = await base44.entities.ZappCreation.create(record);
      const link = `${window.location.origin}/Zapp?play=${created?.id}`;
      setSavedLink(link);
      setSaved(true);
      setTimeout(() => onSaved(created?.id), 3000);
    } catch (e) {
      console.error('Save error:', e);
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        className="w-full max-w-sm rounded-3xl p-6"
        style={{ background: '#0f0f1a', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 60px rgba(124,58,237,0.3)' }}
      >
        {saved ? (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              className="mb-3 flex justify-center"
            >
              <ZappGeometricIcon shape="trophy" size={72} color="#fbbf24" accent="#fde68a" />
            </motion.div>
            <p className="text-white font-black text-xl">saved to the Hall of Fame!</p>
            <p className="text-white/40 text-sm mt-2 mb-4">share this link with friends so they can play it right now!</p>
            {savedLink && (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => { navigator.clipboard?.writeText(savedLink); setCopied(true); }}
                className="w-full py-3 rounded-xl font-black text-sm transition-all"
                style={{
                  background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(167,139,250,0.15)',
                  border: copied ? '1px solid rgba(34,197,94,0.5)' : '1px solid rgba(167,139,250,0.4)',
                  color: copied ? '#4ade80' : '#c4b5fd'
                }}
              >
                {copied ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <ZappGeometricIcon shape="check" size={16} color="#4ade80" accent="#86efac" /> link copied! send it to your friends!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <ZappGeometricIcon shape="link" size={16} color="#c4b5fd" accent="#a78bfa" /> tap to copy friend link
                  </span>
                )}
              </motion.button>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 mb-1">
              <ZappGeometricIcon shape="trophy" size={22} color="#fbbf24" accent="#fde68a" />
              <h3 className="text-white font-black text-xl text-center">save to Hall of Fame</h3>
            </div>
            <p className="text-white/30 text-sm text-center mb-5">let other kids play your creation!</p>

            {/* Shape picker */}
            <p className="text-white/40 text-xs font-black mb-2 uppercase tracking-widest">pick an icon</p>
            <div className="grid grid-cols-8 gap-1.5 mb-4">
              {SHAPES.map((s, i) => (
                <button
                  key={s.shape}
                  onClick={() => setSelectedShape(i)}
                  className="rounded-lg py-1.5 transition-all flex items-center justify-center"
                  style={{
                    background: selectedShape === i ? `${s.color}25` : 'rgba(255,255,255,0.04)',
                    border: selectedShape === i ? `1px solid ${s.color}60` : '1px solid transparent'
                  }}
                >
                  <ZappGeometricIcon shape={s.shape} size={22} color={s.color} accent={s.color} />
                </button>
              ))}
            </div>

            {/* Name (optional) */}
            <p className="text-white/40 text-xs font-black mb-2 uppercase tracking-widest">your first name (optional)</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.slice(0, 20))}
              placeholder="e.g. Georgie"
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl text-white font-bold text-base outline-none mb-5"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                caretColor: '#a78bfa'
              }}
            />

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-black text-white/30 hover:text-white/60 transition-colors text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                cancel
              </button>
              <motion.button
                onClick={handleSave}
                disabled={saving}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 rounded-xl font-black text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
              >
                {saving ? 'saving...' : (
                  <span className="flex items-center justify-center gap-1.5">
                    <ZappGeometricIcon shape="trophy" size={16} color="#fff" accent="#fff" /> save it!
                  </span>
                )}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}