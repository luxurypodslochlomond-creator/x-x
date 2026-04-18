import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Brain, BookOpen, Globe, Zap, Heart, Trophy, Sparkles, ArrowRight, Lock, CheckCircle, Shield, Wifi, Radio, Ban, Infinity, HardDrive, GraduationCap, Home, Rocket } from 'lucide-react';

// Gain-only star system — stars ONLY ever go up, stored locally, no account needed
const STORAGE_KEY = 'learn51_stars';

const getStars = () => {
  try { return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10); } 
  catch { return 0; }
};

const addStars = (n) => {
  try {
    const current = getStars();
    const next = current + n;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch { return 0; }
};

const AGE_GROUPS = [
  { id: 'little', label: 'Little Learners', ages: 'Ages 5 – 7', color: 'from-yellow-400 to-orange-400', border: 'border-orange-400', text: 'text-orange-900', bg: 'bg-orange-50', Icon: Star },
  { id: 'growing', label: 'Growing Minds', ages: 'Ages 8 – 10', color: 'from-green-400 to-teal-500', border: 'border-teal-500', text: 'text-teal-900', bg: 'bg-teal-50', Icon: Sparkles },
  { id: 'explorer', label: 'Explorers', ages: 'Ages 11 – 13', color: 'from-blue-500 to-indigo-600', border: 'border-indigo-500', text: 'text-indigo-900', bg: 'bg-indigo-50', Icon: Globe },
  { id: 'creator', label: 'Creators', ages: 'Ages 14+', color: 'from-purple-500 to-pink-600', border: 'border-purple-500', text: 'text-purple-900', bg: 'bg-purple-50', Icon: Zap },
];

// Subjects per age group — unlocks as stars grow
const SUBJECTS = {
  little: [
    { id: 'phonics', title: 'Magic Letters', desc: 'Learn sounds & letters through play', Icon: BookOpen, link: '/Literacy51', stars: 0, color: 'bg-yellow-100 border-yellow-500', iconColor: 'text-yellow-700' },
    { id: 'counting', title: 'Magic Maths', desc: 'Numbers, shapes & patterns', Icon: Brain, link: '/GeorgieMaths', stars: 0, color: 'bg-orange-100 border-orange-500', iconColor: 'text-orange-700' },
    { id: 'nature', title: 'Nature Explorers', desc: 'Animals, plants & our planet', Icon: Globe, link: '/YoungWarriors', stars: 5, color: 'bg-green-100 border-green-500', iconColor: 'text-green-700' },
    { id: 'drawing', title: 'Create & Draw', desc: 'Colours, shapes & stories', Icon: Sparkles, link: '/GenerateLogo', stars: 10, color: 'bg-pink-100 border-pink-500', iconColor: 'text-pink-700' },
  ],
  growing: [
    { id: 'literacy', title: 'Word Power', desc: 'Phonics, spelling & sentences', Icon: BookOpen, link: '/Literacy51', stars: 0, color: 'bg-teal-100 border-teal-500', iconColor: 'text-teal-700' },
    { id: 'maths', title: 'Maths Adventures', desc: 'Rounding, decimals & more', Icon: Brain, link: '/LennoxMaths', stars: 0, color: 'bg-green-100 border-green-500', iconColor: 'text-green-700' },
    { id: 'planet', title: 'Planet Protectors', desc: 'Ecosystems, litter & climate', Icon: Globe, link: '/YoungWarriors', stars: 5, color: 'bg-blue-100 border-blue-500', iconColor: 'text-blue-700' },
    { id: 'science', title: 'Sound Science', desc: 'Frequencies, vibrations & healing', Icon: Radio, link: '/FrequencyChamber', stars: 15, color: 'bg-purple-100 border-purple-500', iconColor: 'text-purple-700' },
  ],
  explorer: [
    { id: 'literacy2', title: 'Creative Writing', desc: 'Stories, essays & self-expression', Icon: BookOpen, link: '/Literacy51', stars: 0, color: 'bg-indigo-100 border-indigo-500', iconColor: 'text-indigo-700' },
    { id: 'deepmaths', title: 'Deep Maths', desc: 'Algebra, geometry & decimals', Icon: Brain, link: '/LennoxMaths', stars: 0, color: 'bg-blue-100 border-blue-500', iconColor: 'text-blue-700' },
    { id: 'earth', title: 'Earth Science', desc: 'Physics of our planet', Icon: Zap, link: '/ThePhysics', stars: 10, color: 'bg-green-100 border-green-500', iconColor: 'text-green-700' },
    { id: 'impact', title: 'Real Impact', desc: 'Submit a litter pick, earn tokens', Icon: Trophy, link: '/NewCleanup', stars: 20, color: 'bg-amber-100 border-amber-500', iconColor: 'text-amber-700' },
  ],
  creator: [
    { id: 'writing', title: 'Writer\'s Studio', desc: 'Advanced writing & storytelling', Icon: BookOpen, link: '/Literacy51', stars: 0, color: 'bg-purple-100 border-purple-500', iconColor: 'text-purple-700' },
    { id: 'physics', title: 'Physics & Frequencies', desc: 'Sound, healing & science', Icon: Radio, link: '/ThePhysics', stars: 0, color: 'bg-pink-100 border-pink-500', iconColor: 'text-pink-700' },
    { id: 'planet2', title: 'Climate Action', desc: 'Real missions, real change', Icon: Globe, link: '/Missions', stars: 10, color: 'bg-green-100 border-green-500', iconColor: 'text-green-700' },
    { id: 'build', title: 'Build Things', desc: 'Create music, logos & more with AI', Icon: Rocket, link: '/LearnGuitar', stars: 25, color: 'bg-indigo-100 border-indigo-500', iconColor: 'text-indigo-700' },
  ],
  // Real life skills — available to all age groups via the dedicated section below
  life: [
    { id: 'money', title: 'Money & Budgeting', desc: 'How money actually works, budgets, debt & saving', Icon: Zap, link: '/LifeSkills51', stars: 0, color: 'bg-yellow-100 border-yellow-500', iconColor: 'text-yellow-700' },
    { id: 'cooking', title: 'Cooking & Food', desc: 'Simple healthy meals, nutrition & not wasting food', Icon: Heart, link: '/LifeSkills51', stars: 0, color: 'bg-orange-100 border-orange-500', iconColor: 'text-orange-700' },
    { id: 'mental', title: 'Mental Health', desc: 'Emotions, anxiety, breathing & being kind to yourself', Icon: Brain, link: '/LifeSkills51', stars: 0, color: 'bg-pink-100 border-pink-500', iconColor: 'text-pink-700' },
    { id: 'relationships', title: 'Relationships', desc: 'Friendships, family, boundaries & respect', Icon: Heart, link: '/LifeSkills51', stars: 0, color: 'bg-red-100 border-red-500', iconColor: 'text-red-700' },
    { id: 'work', title: 'Work & Purpose', desc: 'Finding what you love, CVs, interviews & rights at work', Icon: Trophy, link: '/LifeSkills51', stars: 0, color: 'bg-indigo-100 border-indigo-500', iconColor: 'text-indigo-700' },
    { id: 'rights', title: 'Your Rights', desc: 'Know your legal rights, housing, benefits & contracts', Icon: Shield, link: '/LifeSkills51', stars: 0, color: 'bg-teal-100 border-teal-500', iconColor: 'text-teal-700' },
  ],
};

// Unlockable creative rewards — stars only go up, never down
const UNLOCKS = [
  { stars: 5, title: 'Star Collector', desc: 'You\'re on your way!', Icon: Star },
  { stars: 15, title: 'Planet Guardian', desc: 'You\'re making a difference', Icon: Globe },
  { stars: 30, title: 'Frequency Explorer', desc: 'You understand how things connect', Icon: Radio },
  { stars: 50, title: 'Earth Champion', desc: 'The planet knows your name', Icon: Trophy },
  { stars: 100, title: 'Universal Learner', desc: 'You belong to the whole world', Icon: Infinity },
];

export default function Learn51Page() {
  const [stars, setStars] = useState(getStars());
  const [ageGroup, setAgeGroup] = useState(null);
  const [justUnlocked, setJustUnlocked] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check for star celebrations when page loads
  useEffect(() => {
    const stored = getStars();
    setStars(stored);
    const latest = UNLOCKS.filter(u => u.stars <= stored).pop();
    const seen = localStorage.getItem('learn51_last_seen_unlock');
    if (latest && latest.stars.toString() !== seen) {
      setJustUnlocked(latest);
      setShowCelebration(true);
      localStorage.setItem('learn51_last_seen_unlock', latest.stars.toString());
    }
  }, []);

  // Restore age group from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('learn51_age_group');
    if (saved) setAgeGroup(saved);
  }, []);

  const selectAge = (id) => {
    setAgeGroup(id);
    localStorage.setItem('learn51_age_group', id);
  };

  const currentGroup = AGE_GROUPS.find(g => g.id === ageGroup);
  const subjects = ageGroup ? SUBJECTS[ageGroup] : [];
  const nextUnlock = UNLOCKS.find(u => u.stars > stars);
  const earnedUnlocks = UNLOCKS.filter(u => u.stars <= stars);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-purple-50 text-gray-900 pb-32">

      {/* CELEBRATION MODAL */}
      <AnimatePresence>
        {showCelebration && justUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl font-black text-indigo-900 mb-2">You unlocked it! 🎉</h2>
              <p className="text-2xl font-bold text-indigo-700 mb-1">{justUnlocked.title}</p>
              <p className="text-gray-600 mb-6">{justUnlocked.desc}</p>
              <button
                onClick={() => setShowCelebration(false)}
                className="w-full bg-indigo-700 text-white font-black text-xl py-3 rounded-xl"
              >
                Keep Learning! ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 text-white px-4 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GraduationCap className="w-16 h-16 mx-auto mb-3 text-yellow-300" />
          <h1 className="text-4xl md:text-6xl font-black mb-2">Learn51</h1>
          <p className="text-xl md:text-2xl text-blue-100 font-bold mb-2">Free learning for every child on Earth</p>
          <p className="text-blue-200 text-base">No login. No data. No cost. Ever.</p>
        </motion.div>

        {/* STAR COUNTER — gain only, never goes down */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 inline-flex items-center gap-3 bg-white/20 backdrop-blur border-2 border-yellow-300 rounded-2xl px-6 py-3"
        >
          <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
          <div className="text-left">
            <div className="text-3xl font-black text-yellow-200">{stars} Stars</div>
            {nextUnlock && (
              <div className="text-sm text-blue-200">{nextUnlock.stars - stars} more to unlock: {nextUnlock.emoji} {nextUnlock.title}</div>
            )}
            {!nextUnlock && <div className="text-sm text-yellow-200">Universal Learner achieved! ♾️</div>}
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* AGE GROUP PICKER */}
        <div>
          <h2 className="text-2xl font-black text-gray-800 mb-4 text-center">
            {ageGroup ? '👋 Welcome back! Change your group?' : '👋 Who\'s learning today?'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AGE_GROUPS.map(group => (
              <motion.button
                key={group.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectAge(group.id)}
                className={`rounded-2xl p-4 text-center border-2 transition-all ${
                  ageGroup === group.id
                    ? `bg-gradient-to-b ${group.color} text-white border-transparent shadow-lg`
                    : `bg-white ${group.border} text-gray-800 hover:shadow-md`
                }`}
              >
                <group.Icon className={`w-8 h-8 mx-auto mb-1 ${ageGroup === group.id ? 'text-white' : 'text-gray-600'}`} />
                <div className="font-black text-sm leading-tight">{group.label}</div>
                <div className={`text-xs mt-1 ${ageGroup === group.id ? 'text-white/80' : 'text-gray-500'}`}>{group.ages}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* SUBJECTS for selected age group */}
        <AnimatePresence mode="wait">
        {ageGroup && (
          <motion.div key={ageGroup} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-black text-gray-800 mb-4">
              {currentGroup?.emoji} {currentGroup?.label} — Choose a subject
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map(subject => {
                const locked = stars < subject.stars;
                return (
                  <motion.div key={subject.id} whileHover={locked ? {} : { scale: 1.02 }} whileTap={locked ? {} : { scale: 0.98 }}>
                    {locked ? (
                      <div className={`rounded-2xl border-2 p-5 ${subject.color} opacity-60 relative`}>
                        <div className="flex items-start gap-4">
                          <subject.Icon className={`w-9 h-9 flex-shrink-0 mt-1 opacity-50 ${subject.iconColor}`} />
                          <div className="flex-1">
                            <h3 className="text-xl font-black text-gray-700">{subject.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{subject.desc}</p>
                            <div className="flex items-center gap-1 mt-2 text-amber-700 font-bold text-sm">
                              <Lock className="w-4 h-4" />
                              Unlocks at {subject.stars} ⭐ — you need {subject.stars - stars} more!
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link to={subject.link}>
                        <div className={`rounded-2xl border-2 p-5 ${subject.color} hover:shadow-lg transition-all`}>
                          <div className="flex items-start gap-4">
                            <subject.Icon className={`w-9 h-9 flex-shrink-0 mt-1 ${subject.iconColor}`} />
                            <div className="flex-1">
                              <h3 className="text-xl font-black text-gray-800">{subject.title}</h3>
                              <p className="text-gray-600 text-sm mt-1">{subject.desc}</p>
                              <div className="flex items-center gap-1 mt-3 text-indigo-700 font-bold text-sm">
                                <span>Start learning</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* EARNED BADGES */}
        {earnedUnlocks.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500" /> Your Achievements</h2>
            <div className="flex flex-wrap gap-3">
              {earnedUnlocks.map(u => (
                <div key={u.stars} className="flex items-center gap-2 bg-white border-2 border-indigo-400 rounded-xl px-4 py-2 shadow-sm">
                  <u.Icon className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-black text-indigo-900 text-sm">{u.title}</p>
                    <p className="text-gray-500 text-xs">{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOW STARS WORK */}
        <div className="bg-white border-2 border-indigo-300 rounded-2xl p-6">
          <h2 className="text-xl font-black text-indigo-900 mb-3 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" /> How Stars Work
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><span><strong>Stars only ever go UP.</strong> You can never lose them.</span></li>
            <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><span><strong>No account needed.</strong> Saved on your device, belongs to you.</span></li>
            <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><span><strong>No leaderboards.</strong> This is your journey, not a competition.</span></li>
            <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><span><strong>Stars unlock new subjects</strong> — the more you learn, the more opens up.</span></li>
            <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><span><strong>Free forever.</strong> Every child on Earth deserves this. No exceptions.</span></li>
          </ul>
        </div>

        {/* THE MISSION */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-2xl p-6 text-center">
          <Globe className="w-12 h-12 mx-auto mb-3 text-blue-200" />
          <h2 className="text-2xl font-black mb-2">273 million children out of school.</h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            We're building for every single one of them. No child left behind.<br/>
            Every language. Every ability. Every corner of Earth. Free. Always.
          </p>
          <p className="text-blue-200 text-sm mt-4">
            Works offline. No data collected. No account needed.<br/>
            Built with love by UF51 ❤️
          </p>
        </div>

        {/* REAL LIFE SKILLS SECTION */}
        <div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-5 mb-4 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-yellow-100" />
            <h2 className="text-2xl font-black mb-1">Real Life Skills</h2>
            <p className="text-amber-100 text-base">The stuff school often forgets to teach — but you actually need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBJECTS.life.map(subject => (
              <motion.div key={subject.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to={subject.link}>
                  <div className={`rounded-2xl border-2 p-5 ${subject.color} hover:shadow-lg transition-all`}>
                    <div className="flex items-start gap-4">
                      <subject.Icon className={`w-9 h-9 flex-shrink-0 mt-1 ${subject.iconColor}`} />
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-gray-800">{subject.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{subject.desc}</p>
                        <div className="flex items-center gap-1 mt-3 text-amber-700 font-bold text-sm">
                          <span>Start learning</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOME EDUCATION NOTE */}
        <div className="bg-white border-2 border-green-400 rounded-2xl p-6 text-center">
          <Home className="w-10 h-10 mx-auto mb-2 text-green-600" />
          <h3 className="text-xl font-black text-green-900 mb-2">Built for home education too</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Learn51 is designed so any family, anywhere in the world, can use it as a complete free learning companion —
            whether that's after school, instead of school, or in places where no school exists.
            Every subject, every age, no login, no cost.
          </p>
        </div>

        {/* WHY LEARN51 — TRUST & VISION */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 space-y-5">
          <div className="text-center">
            <Shield className="w-10 h-10 mx-auto mb-2 text-cyan-400" />
            <h2 className="text-2xl font-black mb-1">Why Learn51 is different</h2>
            <p className="text-gray-400 text-sm">This is our promise. Not marketing. Actual commitments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { Icon: Lock, color: 'text-cyan-400', title: 'Your data stays on your device', body: 'No servers store what your child learns, how long they spend, or what they struggle with. Stars and progress live on the device only. We cannot see it. Nobody can.' },
              { Icon: Globe, color: 'text-blue-400', title: 'Any device. Anywhere on Earth.', body: 'Works on a 5-year-old phone, a slow connection, a TV browser, an old laptop. We test on low-end hardware deliberately. No child gets left out because of their device.' },
              { Icon: Brain, color: 'text-pink-400', title: 'AI that teaches, not tracks', body: 'We use advanced AI to make learning better — clearer explanations, adapted to how you learn. Not to build a profile, sell your attention, or make you dependent.' },
              { Icon: Ban, color: 'text-red-400', title: 'No dark patterns. Ever.', body: 'No push notifications. No streaks that punish you for missing a day. No leaderboards making you feel behind. No FOMO. Just learning, at your pace, on your terms.' },
              { Icon: Heart, color: 'text-green-400', title: 'Free. Genuinely free.', body: 'Not free-then-paid. Not free-unless-you-want-the-good-bit. The education tools are free permanently. We fund this through other products in the ecosystem, not through children.' },
              { Icon: HardDrive, color: 'text-amber-400', title: 'Built to last without us', body: 'Learn51 is being built so that if UF51 disappeared tomorrow, the tools could run offline indefinitely. No single point of failure. No dependency on our servers being up.' },
            ].map(({ Icon, color, title, body }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Icon className={`w-7 h-7 mb-2 ${color}`} />
                <h3 className="font-black text-white text-base mb-1">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VISION — THE BIG ONE */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-2xl p-8 text-center space-y-4">
          <Rocket className="w-14 h-14 mx-auto text-indigo-300" />
          <h2 className="text-3xl font-black">Education is a right. Not a product.</h2>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-2xl mx-auto">
            The best education in the world has always been locked behind money. Private tutors. Elite schools. Expensive platforms.
          </p>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl mx-auto font-bold">
            AI changes that. For the first time in history, we can deliver genuinely world-class, personalised education to every child on Earth — for free, in any language, on any device, with full privacy.
          </p>
          <p className="text-indigo-200 text-base leading-relaxed max-w-2xl mx-auto">
            That's what we're building. Not a school. Not an app. A right — made real.
          </p>
          <div className="pt-2">
            <p className="text-indigo-300 text-sm">273 million children out of school. We're building for every single one. ♾️❤️</p>
          </div>
        </div>

      </div>
    </div>
  );
}