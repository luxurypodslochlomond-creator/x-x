import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, UserCircle, CheckCircle } from 'lucide-react';
import LearnProfile, { getProfiles, getActiveProfile, getProfileStars } from '@/components/learn51/LearnProfile';

const MODULES = [
  {
    id: 'ai',
    emoji: '🤖',
    title: 'AI Tutor',
    desc: 'Tell it what you love — it teaches everything around that. Football, gaming, animals, anything.',
    url: '/Learn51AI',
    accent: '#818cf8',
    tag: 'START HERE',
  },
  {
    id: 'maths',
    emoji: '🧮',
    title: 'Magic Maths',
    desc: 'Numbers, shapes, doubling, decimals — maths that actually makes sense.',
    url: '/GeorgieMaths',
    accent: '#a78bfa',
    tag: 'AGES 5+',
  },
  {
    id: 'literacy',
    emoji: '📖',
    title: 'Literacy 51',
    desc: 'Phonics, spelling, sentences, stories — reading and writing that sticks.',
    url: '/Literacy51',
    accent: '#34d399',
    tag: 'ALL AGES',
  },
  {
    id: 'life',
    emoji: '🌟',
    title: 'Life Skills',
    desc: 'Money, food, mental health, your rights — the stuff school forgets to teach.',
    url: '/LifeSkills51',
    accent: '#f472b6',
    tag: 'REAL LIFE',
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Young Warriors',
    desc: 'Real kids making a real difference right now.',
    url: '/YoungWarriors',
    accent: '#fb923c',
    tag: 'INSPIRE',
  },
];

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
      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            Learn51
          </h1>
          <p className="text-gray-400 text-lg">
            Free learning for every child on Earth.<br />
            <span className="text-gray-600 text-base">No login. No data. No cost. Ever.</span>
          </p>
        </motion.div>

        {/* PROFILE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          {activeProfile ? (
            <button
              onClick={() => setShowProfilePicker(true)}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl px-4 py-3 transition-all"
            >
              <span className="text-2xl">{activeProfile.avatar}</span>
              <div className="text-left">
                <p className="text-white font-bold text-sm leading-none">{activeProfile.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-xs font-bold">{stars} stars</span>
                </div>
              </div>
              <span className="text-white/20 text-xs ml-auto">switch</span>
            </button>
          ) : (
            <button
              onClick={() => setShowProfilePicker(true)}
              className="flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors border border-dashed border-white/10 rounded-xl px-4 py-2.5"
            >
              <UserCircle className="w-4 h-4" />
              Save your stars — add your name
            </button>
          )}
        </motion.div>

        {/* MODULES */}
        <div className="space-y-3 mb-10">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
            >
              <Link to={mod.url}>
                <div className="group flex items-center gap-4 bg-white/4 hover:bg-white/7 border border-white/8 hover:border-white/15 rounded-2xl px-5 py-4 transition-all cursor-pointer">
                  <span className="text-3xl flex-shrink-0">{mod.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-black text-base">{mod.title}</span>
                      <span
                        className="text-xs font-black px-2 py-0.5 rounded-md"
                        style={{ color: mod.accent, background: mod.accent + '20' }}
                      >
                        {mod.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-snug truncate">{mod.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 flex-shrink-0 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* TRUST — minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="border border-white/6 rounded-2xl px-5 py-4 mb-8"
        >
          <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">For parents & teachers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Zero data collected from children',
              'No account or email needed',
              'No adverts, no tracking',
              'Stars saved on device only',
            ].map(text => (
              <div key={text} className="flex gap-2 items-center">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-500 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center">
          <p className="text-white/15 text-xs">Built with love by UF51 · Free forever ♾️</p>
          <Link to="/SupportLearn51" className="text-white/15 hover:text-violet-400 text-xs transition-colors mt-1 block">
            Keep it free — donate
          </Link>
        </div>

      </div>
    </div>
  );
}