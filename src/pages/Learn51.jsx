import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, UserCircle, CheckCircle, Heart } from 'lucide-react';
import LearnProfile, { getProfiles, getActiveProfile, getProfileStars } from '@/components/learn51/LearnProfile';

const TILES = [
  {
    id: 'ai',
    emoji: '🤖',
    title: 'AI Tutor',
    sub: 'Ask anything',
    url: '/Learn51AI',
    color: '#818cf8',
    size: 'large', // spans 2 cols
  },
  {
    id: 'maths',
    emoji: '🔢',
    title: 'Magic Maths',
    sub: 'Ages 5+',
    url: '/GeorgieMaths',
    color: '#a78bfa',
    size: 'small',
  },
  {
    id: 'literacy',
    emoji: '📖',
    title: 'Literacy',
    sub: 'Reading & writing',
    url: '/Literacy51',
    color: '#34d399',
    size: 'small',
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Real World',
    sub: 'Animals · Space · Physics',
    url: '/YoungWarriors',
    color: '#fb923c',
    size: 'small',
  },
  {
    id: 'life',
    emoji: '🌟',
    title: 'Life Skills',
    sub: 'Money · Health · Rights',
    url: '/LifeSkills51',
    color: '#f472b6',
    size: 'small',
  },
];

function Tile({ tile, delay }) {
  const isLarge = tile.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      className={isLarge ? 'col-span-2' : 'col-span-1'}
    >
      <Link to={tile.url}>
        <div
          className="relative flex flex-col justify-between rounded-3xl p-5 active:scale-95 transition-transform cursor-pointer overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${tile.color}22, ${tile.color}0a)`,
            border: `1.5px solid ${tile.color}35`,
            minHeight: isLarge ? '140px' : '130px',
          }}
        >
          {/* Glow blob */}
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30"
            style={{ background: tile.color }}
          />

          <span className="text-4xl mb-2 relative z-10">{tile.emoji}</span>

          <div className="relative z-10">
            <p className="text-white font-black text-lg leading-tight">{tile.title}</p>
            <p className="text-sm mt-0.5" style={{ color: tile.color + 'cc' }}>{tile.sub}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Learn51Page() {
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(getProfiles);

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;
  const stars = activeProfileId ? getProfileStars(activeProfileId) : 0;

  const handleProfileSelected = (profile) => {
    setActiveProfileId(profile.id);
    setProfiles(getProfiles());
    setShowProfilePicker(false);
  };

  if (showProfilePicker) {
    return <LearnProfile onSelect={handleProfileSelected} />;
  }

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      <div className="max-w-md mx-auto px-4 pt-10 pb-16">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Learn51</h1>
              <p className="text-white/30 text-sm mt-0.5">Free for every child on Earth ♾️</p>
            </div>

            {/* PROFILE BUTTON */}
            <button
              onClick={() => setShowProfilePicker(true)}
              className="flex items-center gap-2 rounded-2xl px-3 py-2 border border-white/10 bg-white/5 active:scale-95 transition-transform"
            >
              {activeProfile ? (
                <>
                  <span className="text-xl">{activeProfile.avatar}</span>
                  <div className="text-left">
                    <p className="text-white text-xs font-bold leading-none">{activeProfile.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 text-xs font-bold">{stars}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <UserCircle className="w-5 h-5 text-white/30" />
                  <span className="text-white/30 text-xs font-bold">Who's learning?</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* TILE GRID */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {TILES.map((tile, i) => (
            <Tile key={tile.id} tile={tile} delay={i * 0.07} />
          ))}
        </div>

        {/* TRUST — tiny, for parents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-white/6 px-4 py-4 mb-6"
        >
          <p className="text-white/20 text-xs font-black uppercase tracking-widest mb-3">For parents & teachers</p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            {[
              ['✓', 'No data collected'],
              ['✓', 'No login needed'],
              ['✓', 'No adverts ever'],
              ['✓', 'Works offline'],
            ].map(([tick, text]) => (
              <div key={text} className="flex gap-1.5 items-center">
                <span className="text-emerald-500 text-xs font-black">{tick}</span>
                <span className="text-white/25 text-xs">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center space-y-2">
          <Link
            to="/SupportLearn51"
            className="flex items-center justify-center gap-1.5 text-white/20 hover:text-pink-400 text-xs transition-colors"
          >
            <Heart className="w-3 h-3" />
            Keep it free — donate
          </Link>
          <p className="text-white/10 text-xs">Built with love · Free forever</p>
        </div>

      </div>
    </div>
  );
}