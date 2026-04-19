import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, Plus, X } from 'lucide-react';

const PROFILE_KEY = 'learn51_profiles';
const ACTIVE_KEY = 'learn51_active_profile';

const AVATARS = ['🦁', '🐯', '🐬', '🦊', '🐼', '🦋', '🐢', '🦅', '🐉', '⭐', '🚀', '🌈'];
const COLORS = [
  'from-violet-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-lime-500 to-green-600',
];

export const getProfiles = () => {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '[]'); } catch { return []; }
};

export const saveProfiles = (profiles) => {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles)); } catch {}
};

export const getActiveProfile = () => {
  try { return localStorage.getItem(ACTIVE_KEY) || null; } catch { return null; }
};

export const setActiveProfile = (id) => {
  try { localStorage.setItem(ACTIVE_KEY, id); } catch {}
};

export const getProfileStars = (profileId) => {
  try { return parseInt(localStorage.getItem(`learn51_stars_${profileId}`) || '0', 10); } catch { return 0; }
};

export const addProfileStars = (profileId, n) => {
  try {
    const current = getProfileStars(profileId);
    localStorage.setItem(`learn51_stars_${profileId}`, String(current + n));
  } catch {}
};

export const clearProfileStars = (profileId) => {
  try { localStorage.setItem(`learn51_stars_${profileId}`, '0'); } catch {}
};

// Hook to use in pages
export const useLearnProfile = () => {
  const [activeId, setActiveId] = useState(getActiveProfile);
  const profiles = getProfiles();
  const profile = profiles.find(p => p.id === activeId) || null;
  const stars = activeId ? getProfileStars(activeId) : 0;

  const awardStars = (n) => {
    if (activeId) addProfileStars(activeId, n);
  };

  return { profile, stars, awardStars, activeId };
};

// ── PROFILE PICKER MODAL ──────────────────────────────────────────────────────
export default function LearnProfile({ onSelect }) {
  const [profiles, setProfiles] = useState(getProfiles);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(AVATARS[0]);
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [confirmClear, setConfirmClear] = useState(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const profile = {
      id: Date.now().toString(),
      name: newName.trim(),
      avatar: newAvatar,
      color: newColor,
    };
    const updated = [...profiles, profile];
    saveProfiles(updated);
    setProfiles(updated);
    setCreating(false);
    setNewName('');
    // auto-select
    setActiveProfile(profile.id);
    onSelect(profile);
  };

  const handleSelect = (profile) => {
    setActiveProfile(profile.id);
    onSelect(profile);
  };

  const handleClearStars = (profileId) => {
    clearProfileStars(profileId);
    setConfirmClear(null);
    // force re-render
    setProfiles([...getProfiles()]);
  };

  const handleDeleteProfile = (profileId) => {
    const updated = profiles.filter(p => p.id !== profileId);
    saveProfiles(updated);
    setProfiles(updated);
    setConfirmClear(null);
  };

  return (
    <div className="min-h-screen bg-[#05080f] text-white flex flex-col items-center justify-center px-5 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🚀</div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Who's learning today?
          </h1>
          <p className="text-white/40 text-sm">Pick your name — your stars are saved just for you</p>
        </div>

        {/* Existing profiles */}
        <div className="space-y-3 mb-6">
          {profiles.map(profile => {
            const stars = getProfileStars(profile.id);
            return (
              <div key={profile.id} className="relative">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(profile)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${profile.color} bg-opacity-20 border border-white/10 hover:border-white/30 transition-all text-left`}
                >
                  <span className="text-4xl flex-shrink-0">{profile.avatar}</span>
                  <div className="flex-1">
                    <p className="text-white font-black text-xl">{profile.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-300 font-bold text-sm">{stars} stars</span>
                    </div>
                  </div>
                  <span className="text-white/40 text-2xl">→</span>
                </motion.button>

                {/* Clear / delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmClear(profile.id); }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 text-white/20 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add new profile */}
        {!creating ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCreating(true)}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-white/20 hover:border-violet-400/50 text-white/40 hover:text-violet-300 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold">Add new learner</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-black">New learner</p>
              <button onClick={() => setCreating(false)} className="text-white/30 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Name input */}
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="Your name..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl font-black placeholder-white/20 outline-none focus:border-violet-400"
            />

            {/* Avatar picker */}
            <div>
              <p className="text-white/40 text-xs mb-2">Pick your animal</p>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map(a => (
                  <button
                    key={a}
                    onClick={() => setNewAvatar(a)}
                    className={`text-2xl p-2 rounded-xl transition-all ${newAvatar === a ? 'bg-violet-500/30 border-2 border-violet-400' : 'bg-white/5 border border-white/10'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div>
              <p className="text-white/40 text-xs mb-2">Pick a colour</p>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setNewColor(c)}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} transition-all ${newColor === c ? 'ring-2 ring-white scale-110' : 'opacity-60'}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-black text-lg py-3 rounded-xl disabled:opacity-30 transition-opacity"
            >
              Let's go! 🚀
            </button>
          </motion.div>
        )}

        <p className="text-center text-white/20 text-xs mt-6">No internet needed · No accounts · Stars saved on this device</p>
      </motion.div>

      {/* Confirm clear/delete modal */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-5"
            onClick={() => setConfirmClear(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0f1419] border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-4"
            >
              <p className="text-white font-black text-xl text-center">What do you want to do?</p>
              <button
                onClick={() => handleClearStars(confirmClear)}
                className="w-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black py-3 rounded-xl hover:bg-amber-500/30 transition-colors"
              >
                ⭐ Clear stars (keep name)
              </button>
              <button
                onClick={() => handleDeleteProfile(confirmClear)}
                className="w-full bg-red-500/20 border border-red-500/40 text-red-300 font-black py-3 rounded-xl hover:bg-red-500/30 transition-colors"
              >
                🗑️ Delete this learner
              </button>
              <button
                onClick={() => setConfirmClear(null)}
                className="w-full text-white/30 text-sm py-2"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}