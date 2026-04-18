import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, Star, Volume2, VolumeX, Share2 } from 'lucide-react';
import CreativeReward from '@/components/learn51/CreativeReward';
import ShareYourWin from '@/components/learn51/ShareYourWin';
import LanguagePicker, { LANGUAGES } from '@/components/learn51/LanguagePicker';
import Learn51AIIcon from '@/components/learn51/Learn51AIIcon';

// Web Speech API — free, built-in, no API key needed
const speak = (text) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.85;
  utt.pitch = 1.05;
  // prefer a natural English voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && v.localService);
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
};
const stopSpeaking = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };

// ============================================================
// LEARN51 AI — World-first adaptive AI education
// No login. No data. No shame. Free forever.
// Uses claude_sonnet_4_6 for the best possible teaching
// ============================================================

const INTERESTS = [
  { emoji: '⚽', label: 'Football & Ronaldo' },
  { emoji: '🐐', label: 'Messi & Argentina' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '🐶', label: 'Animals' },
  { emoji: '🚀', label: 'Space' },
  { emoji: '🍕', label: 'Food' },
  { emoji: '🎨', label: 'Art' },
  { emoji: '🏀', label: 'Basketball' },
  { emoji: '🦖', label: 'Dinosaurs' },
  { emoji: '💻', label: 'Tech' },
  { emoji: '🎬', label: 'Movies' },
];

const TOPICS = [
  { id: 'maths', emoji: '🧮', label: 'Maths', color: 'from-violet-500 to-indigo-600', border: 'border-violet-400', desc: 'Numbers, shapes, patterns' },
  { id: 'reading', emoji: '📖', label: 'Reading & Words', color: 'from-emerald-500 to-teal-600', border: 'border-emerald-400', desc: 'Phonics, spelling, stories' },
  { id: 'health', emoji: '💪', label: 'Health & Body', color: 'from-rose-500 to-pink-600', border: 'border-rose-400', desc: 'How your body works' },
  { id: 'respect', emoji: '🌍', label: 'Kindness & Rights', color: 'from-amber-500 to-orange-600', border: 'border-amber-400', desc: 'Your rights, others\' rights' },
  { id: 'science', emoji: '🔬', label: 'How Things Work', color: 'from-cyan-500 to-blue-600', border: 'border-cyan-400', desc: 'Physics, nature, universe' },
  { id: 'money', emoji: '💰', label: 'Real Life Skills', color: 'from-green-500 to-emerald-600', border: 'border-green-400', desc: 'Money, cooking, staying safe' },
];

const PROMPT_TEMPLATE = ({ topic, interest, age, level, history, paceNote, language }) => `
You are Learn51 AI — the world's most caring, brilliant teacher. You genuinely love children and want every single one on Earth to learn and thrive.

CRITICAL: Respond ENTIRELY in ${language || 'English'}. Every word of your JSON values must be in ${language || 'English'}.

CHILD INFO:
- Topic they want to learn: ${topic}
- Their favourite thing: ${interest}
- Age: ${age}
- Level (1=beginner, 5=advanced): ${level}
- Previous questions this session: ${history}
- HOW THEY ARE LEARNING RIGHT NOW: ${paceNote}

YOUR JOB:
1. Give ONE brilliant, personalised lesson moment — not a lecture, a SPARK
2. Connect the topic DEEPLY to their specific interest (${interest}) — use REAL names, real facts. 
   - If they love "Football & Ronaldo": use Cristiano Ronaldo's actual stats, free kick angles, his kids, his training regime
   - If they love "Messi & Argentina": use Leo Messi's dribbling physics, World Cup geometry, his son Thiago
   - Make it feel like insider knowledge — "did you know Ronaldo's free kicks use EXACTLY this maths?"
3. Ask ONE clear question at the end to check understanding
4. CRITICALLY — adapt your teaching to match how they are learning: "${paceNote}"
   - If they're struggling: use a DIFFERENT angle or analogy, break it into smaller steps, be warmer
   - If they're flying: stretch them with a harder concept or a "what if?" challenge
   - If they're slow to answer: keep it simple and reassuring, never rush them
5. Keep it SHORT — 4-6 sentences max for the lesson, then the question
6. Language: simple, warm, excited — never condescending. Talk like a cool older sibling.
7. Weave in naturally when relevant: health, kindness, respect, their rights as a child

TONE: You are their brilliant friend who happens to know everything. Like a cool older sibling with a PhD. NOT a teacher reading from a book. Make them feel LUCKY to know this.

FORMAT your response EXACTLY like this JSON (no extra text):
{
  "wow_fact": "One mind-blowing connection between ${topic} and ${interest} in ONE sentence",
  "lesson": "The actual teaching moment — warm, brilliant, 3-4 sentences. ADAPTED to their current pace.",  
  "question": "ONE clear question to check they got it — difficulty matched to their current pace",
  "encouragement": "A short warm line (not cheesy) for after they answer",
  "hint": "A gentle hint if they're stuck — one sentence",
  "answer_keywords": ["key", "words", "that", "indicate", "correct", "understanding"],
  "fun_fact": "One completely wild extra fact to leave them thinking"
}
`;

const ASSESS_PROMPT = ({ question, answer, topic, interest }) => `
A child just answered a learning question. Assess warmly and helpfully.

Topic: ${topic}
Question asked: ${question}
Child's answer: ${answer}

Respond ONLY with this JSON:
{
  "correct": true or false,
  "how_close": "perfect" | "nearly" | "on_the_right_track" | "different_angle_needed",
  "response": "2-3 sentences — warm, specific, never shame. If wrong, gently show the right direction without just giving the answer.",
  "score_change": 1 or 0
}
`;

// ── localStorage helpers — no login, no server, 100% private ──
const LS_KEY = 'learn51ai_progress';
const loadProgress = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch { return null; } };
const saveProgress = (data) => { try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {} };
const loadLanguage = () => { try { return localStorage.getItem('learn51ai_lang') || null; } catch { return null; } };
const saveLanguage = (code) => { try { localStorage.setItem('learn51ai_lang', code); } catch {} };

// ── Adaptive pace engine — figures out how the child learns ──
// Tracks: answer speed, hint usage, wrong streaks, partial credit
// Returns a plain-English "pace note" the AI can act on
const buildPaceNote = ({ questionCount, wrongStreak, hintUsedCount, avgResponseMs, recentResults }) => {
  const notes = [];

  // Speed signals
  if (questionCount >= 2 && avgResponseMs < 15000) notes.push('answers very quickly — may be ready for more challenge');
  if (avgResponseMs > 60000) notes.push('takes their time — keep explanations clear and unhurried');

  // Struggle signals
  if (wrongStreak >= 2) notes.push(`got ${wrongStreak} wrong in a row — gently revisit the concept before moving on`);
  if (hintUsedCount > questionCount / 2 && questionCount >= 2) notes.push('uses hints often — they may need more scaffolding and smaller steps');

  // Success signals
  const recentCorrect = recentResults.filter(Boolean).length;
  if (recentResults.length >= 3 && recentCorrect === recentResults.length) notes.push('getting everything right — ready to be stretched and challenged more');
  if (recentResults.length >= 3 && recentCorrect === 0) notes.push('struggling consistently — try a different angle or analogy, stay warm and encouraging');

  return notes.length > 0 ? notes.join('; ') : 'going at a steady pace';
};

export default function Learn51AIPage() {
   const saved = loadProgress();

   const [stage, setStage] = useState('intro');
   const [interest, setInterest] = useState(saved?.interest || null);
   const [age, setAge] = useState(saved?.age || null);
   const [topic, setTopic] = useState(null);
   const [level, setLevel] = useState(saved?.level || 1);
   const [questionCount, setQuestionCount] = useState(0);
   const [score, setScore] = useState(0);
   const [stars, setStars] = useState(saved?.stars || 0);

   // Save progress on every state change for critical fields
   useEffect(() => {
     const progressToSave = { stars, level, interest, age };
     persistProgress(progressToSave);
   }, [stars, level, interest, age]);

  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState([]);
  const [showReward, setShowReward] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [iconState, setIconState] = useState('idle'); // 'idle' | 'thinking' | 'responding' | 'celebrating'

  // ── Language — remembered across visits ──
  const savedLangCode = loadLanguage();
  const [language, setLanguage] = useState(LANGUAGES.find(l => l.code === savedLangCode) || LANGUAGES[0]);

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    saveLanguage(lang.code);
  }, []);
  const [showShare, setShowShare] = useState(false);
  const [hasWon, setHasWon] = useState(false); // show share button after first win

  // ── Adaptive pace tracking ──
  const [wrongStreak, setWrongStreak] = useState(0);
  const [hintUsedCount, setHintUsedCount] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalResponseMs, setTotalResponseMs] = useState(0);
  const [recentResults, setRecentResults] = useState([]); // last 5: true/false

  const inputRef = useRef(null);

  // Persist progress to localStorage whenever key values change
  const persistProgress = useCallback((updates) => {
    const current = loadProgress() || {};
    const merged = { ...current, ...updates, lastSaved: Date.now() };
    saveProgress(merged);
  }, []);

  const readLesson = useCallback((data) => {
    if (!data || !data.lesson) return;
    setIsSpeaking(true);
    const text = `${data.wow_fact || ''} ${data.lesson || ''} ${data.question || ''}`.trim();
    // Use selected language voice
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 0.85;
      utt.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith(language.speechLang.split('-')[0]));
      if (preferred) utt.voice = preferred;
      utt.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utt);
    }
    setTimeout(() => setIsSpeaking(false), text.length * 60);
  }, [language]);

  const loadLesson = async (topicOverride, levelOverride) => {
   setLoading(true);
   setAnswer('');
   setAssessment(null);
   setShowHint(false);
   setLessonData(null);
   setIconState('thinking');

    const useTopic = topicOverride || topic;
    const useLevel = levelOverride || level;

    const avgMs = questionCount > 0 ? totalResponseMs / questionCount : 30000;
    const paceNote = buildPaceNote({ questionCount, wrongStreak, hintUsedCount, avgResponseMs: avgMs, recentResults });

    const topicLabels = selectedTopics.length > 0 
      ? selectedTopics.map(id => TOPICS.find(t => t.id === id)?.label).filter(Boolean).join(' + ')
      : TOPICS.find(t => t.id === useTopic)?.label || useTopic;
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: PROMPT_TEMPLATE({
        topic: topicLabels,
        interest: interest,
        age: age,
        level: useLevel,
        history: history.join(' | '),
        paceNote,
        language: language.label,
      }),
      model: 'claude_sonnet_4_6',
      response_json_schema: {
        type: 'object',
        properties: {
          wow_fact: { type: 'string' },
          lesson: { type: 'string' },
          question: { type: 'string' },
          encouragement: { type: 'string' },
          hint: { type: 'string' },
          answer_keywords: { type: 'array', items: { type: 'string' } },
          fun_fact: { type: 'string' },
        }
      }
    });

    setLessonData(result);
    setLoading(false);
    setIconState('responding');
    setStage('learning');
    setQuestionStartTime(Date.now()); // start timing their response
    setTimeout(() => { setIconState('idle'); inputRef.current?.focus(); }, 800);
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !lessonData) return;
    setLoading(true);

    const topicLabels = selectedTopics.length > 0 
      ? selectedTopics.map(id => TOPICS.find(t => t.id === id)?.label).filter(Boolean).join(' + ')
      : TOPICS.find(t => t.id === topic)?.label;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: ASSESS_PROMPT({
        question: lessonData.question,
        answer,
        topic: topicLabels,
        interest,
      }),
      model: 'claude_sonnet_4_6',
      response_json_schema: {
        type: 'object',
        properties: {
          correct: { type: 'boolean' },
          how_close: { type: 'string' },
          response: { type: 'string' },
          score_change: { type: 'number' },
        }
      }
    });

    setAssessment(result);
    setLoading(false);
    setIconState(result.correct ? 'celebrating' : 'responding');

    // ── Record pace data ──
    const responseMs = questionStartTime ? Date.now() - questionStartTime : 30000;
    setTotalResponseMs(t => t + responseMs);
    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    setHistory(h => [...h, lessonData.question]);
    setRecentResults(r => [...r.slice(-4), result.correct]); // keep last 5

    const newScore = score + (result.score_change || 0);
    setScore(newScore);

    if (result.correct) {
      const newStreak = streak + 1;
      const newStars = stars + 1;
      // Level up every 3 correct in a row OR every 3 correct total — but only if not struggling
      const newLevel = (newScore > 0 && newScore % 3 === 0 && wrongStreak === 0) ? Math.min(level + 1, 5) : level;
      setStreak(newStreak);
      setStars(newStars);
      setWrongStreak(0); // reset wrong streak on correct
      setShowReward(true);
      setHasWon(true); // unlock share button after first win
      if (newLevel !== level) setLevel(newLevel);
      persistProgress({ stars: newStars, level: newLevel, interest, age });
    } else {
      setStreak(0);
      setWrongStreak(w => w + 1);
      // Level DOWN if 3 wrong in a row — gently step back
      if (wrongStreak >= 2 && level > 1) {
        setLevel(l => Math.max(l - 1, 1));
      }
    }
  };

  const nextQuestion = () => {
    loadLesson();
  };

  const reset = () => {
    // Keep stars + level — only reset the session, not their achievements
    const saved2 = loadProgress();
    setStage('intro');
    setInterest(saved2?.interest || null); // remember their interest
    setAge(saved2?.age || null);           // remember their age
    setTopic(null);
    setLevel(saved2?.level || 1);          // keep their level
    setQuestionCount(0);
    setScore(0);
    setStars(saved2?.stars || 0);          // keep their stars
    setHistory([]);
    setLessonData(null);
    setAssessment(null);
    setHasWon(false);
    setWrongStreak(0);
    setRecentResults([]);
  };

  const fullReset = () => {
    reset();
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  // ── INTRO STAGE ──
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-gray-900 p-4 md:p-8 pb-20" dir={language.rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-2xl mx-auto space-y-8">

          <div className="flex items-center justify-between">
            <Link to="/Learn51" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 text-base">
              ← Back to Learn51
            </Link>
            <LanguagePicker selectedLang={language.code} onChange={handleLanguageChange} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
            <div className="flex justify-center">
              <Learn51AIIcon size={100} animate={true} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Learn51 AI</h1>
            <p className="text-xl text-indigo-700 font-bold">Learning made just for YOU</p>
            <p className="text-gray-500 text-base">No login · No data · Free forever · Powered by AI</p>
          </motion.div>

          {/* WELCOME BACK BANNER */}
          {saved && saved.stars > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌟</span>
                  <div>
                    <p className="font-black text-amber-800">Welcome back! {saved.stars} ⭐ {saved.stars === 1 ? 'star' : 'stars'} earned</p>
                    <p className="text-amber-600 text-sm">Level {saved.level}{saved.interest ? ` · loves ${saved.interest}` : ''} · saved on this device only</p>
                  </div>
                </div>
                <button onClick={fullReset} className="text-xs text-gray-400 hover:text-gray-600 font-bold underline flex-shrink-0">Start fresh</button>
              </div>
              {saved.interest && saved.age && (
                <div className="flex flex-wrap gap-2">
                  <p className="text-amber-700 text-sm font-bold w-full">Jump back in — pick a topic:</p>
                  {TOPICS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTopic(t.id); loadLesson(t.id, saved.level || 1); }}
                      className="px-3 py-1.5 rounded-xl border-2 border-amber-300 bg-white text-amber-800 text-sm font-black hover:border-amber-500 transition-all"
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: What do you love? */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
            <p className="text-xl font-black text-gray-900 mb-1">Step 1 — What do you love? 💛</p>
            <p className="text-gray-500 text-sm mb-4">We'll use this to make everything click for you</p>
            <div className="grid grid-cols-5 gap-2">
              {INTERESTS.map(i => (
                <button
                  key={i.label}
                  onClick={() => setInterest(i.label)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-all font-bold text-xs ${
                    interest === i.label
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{i.emoji}</span>
                  <span>{i.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* STEP 2: Age */}
          {interest && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
              <p className="text-xl font-black text-gray-900 mb-1">Step 2 — How old are you? 🎂</p>
              <p className="text-gray-500 text-sm mb-4">This helps me get the level right — no pressure either way</p>
              <div className="flex gap-2 flex-wrap">
                {['5-6', '7-8', '9-10', '11-12', '13-14', '15+'].map(a => (
                  <button
                    key={a}
                    onClick={() => setAge(a)}
                    className={`px-5 py-3 rounded-2xl border-2 font-black text-base transition-all ${
                      age === a
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Topics (Multi-select) */}
          {interest && age && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
              <p className="text-xl font-black text-gray-900 mb-1">Step 3 — What sounds fun? 🌍</p>
              <p className="text-gray-500 text-sm mb-4">Pick one or mix & match! I'll blend them with {interest}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOPICS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      const updated = selectedTopics.includes(t.id)
                        ? selectedTopics.filter(id => id !== t.id)
                        : [...selectedTopics, t.id];
                      setSelectedTopics(updated);
                      if (updated.length > 0) setTopic(updated[0]); // set first as primary
                    }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all font-bold ${
                      selectedTopics.includes(t.id)
                        ? `${t.border} bg-gray-50`
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-3xl">{t.emoji}</span>
                    <div className="flex-1">
                      <p className="text-gray-900 font-black">{t.label}</p>
                      <p className="text-gray-500 text-sm font-normal">{t.desc}</p>
                    </div>
                    {selectedTopics.includes(t.id) && <span className="text-indigo-600 font-black">✓</span>}
                  </button>
                ))}
              </div>
              {selectedTopics.length > 0 && (
                <button
                  onClick={() => {
                    setTopic(selectedTopics[0]); 
                    loadLesson(selectedTopics[0], 1);
                  }}
                  className="w-full mt-4 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black rounded-2xl transition-all active:scale-95"
                >
                  Let's go! 🚀
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // ── LOADING ──
  if (loading && stage !== 'learning') {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <Learn51AIIcon size={100} animate={true} />
          </div>
          <p className="text-xl font-black text-indigo-700">Finding the perfect lesson for you...</p>
          <p className="text-gray-500">Connecting {TOPICS.find(t => t.id === topic)?.label} to {interest}...</p>
        </motion.div>
      </div>
    );
  }

  // ── LEARNING STAGE ──
  if (stage === 'learning') {
    const topicData = TOPICS.find(t => t.id === topic);
    return (
      <div className="min-h-screen bg-[#faf9f6] text-gray-900 p-4 md:p-8 pb-20" dir={language.rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-2xl mx-auto space-y-5">

          {/* HEADER BAR */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={reset} className="text-gray-400 hover:text-gray-600 font-bold text-sm flex items-center gap-1">
                <RotateCcw className="w-4 h-4" /> Start over
              </button>
              <LanguagePicker selectedLang={language.code} onChange={handleLanguageChange} />
            </div>
            <div className="flex items-center gap-3">
              {wrongStreak >= 2 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-600 font-bold text-xs bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">
                  🤖 adapting for you
                </motion.span>
              )}
              {hasWon && (
                <button
                  onClick={() => setShowShare(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 border-purple-300 bg-purple-50 text-purple-700 hover:border-purple-400 transition-all"
                >
                  <Share2 className="w-3 h-3" /> Share
                </button>
              )}
              {streak >= 2 && wrongStreak === 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                  className="text-orange-500 font-black text-sm bg-orange-50 border border-orange-200 px-2 py-1 rounded-full"
                >
                  🔥 {streak} streak
                </motion.span>
              )}
              <span className="text-amber-600 font-black text-sm">{'⭐'.repeat(Math.min(stars, 5))}</span>
              <span className="bg-indigo-100 text-indigo-700 font-black px-3 py-1 rounded-full text-sm">
                Lvl {level}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16 space-y-4">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="flex justify-center">
                  <Learn51AIIcon size={80} animate={true} isListening={true} />
                </motion.div>
              <p className="text-indigo-700 font-black text-lg">Thinking of the perfect question...</p>
            </motion.div>
          ) : lessonData && (
            <motion.div key="lesson" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

              {/* AI ICON STATE */}
              <div className="flex justify-center py-2">
                <Learn51AIIcon 
                  size={80} 
                  animate={true} 
                  isListening={iconState === 'thinking'}
                  isResponding={iconState === 'responding'}
                />
              </div>

              {/* WOW FACT */}
              <div className={`bg-gradient-to-r ${topicData?.color} rounded-3xl p-5 text-white`}>
                <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">✨ Did you know?</p>
                <p className="text-lg font-bold leading-relaxed">{lessonData.wow_fact}</p>
              </div>

              {/* LESSON */}
              <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">📚 Let's explore</p>
                  <button
                    onClick={() => { isSpeaking ? (stopSpeaking(), setIsSpeaking(false)) : readLesson(lessonData); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border-2 ${
                      isSpeaking
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-indigo-200 bg-indigo-50 text-indigo-600 hover:border-indigo-400'
                    }`}
                  >
                    {isSpeaking ? <><VolumeX className="w-3 h-3" /> Stop</> : <><Volume2 className="w-3 h-3" /> Read to me 🔊</>}
                  </button>
                </div>
                <p className="text-gray-900 text-lg leading-relaxed font-medium">{lessonData.lesson}</p>
              </div>

              {/* QUESTION */}
              <div className="bg-indigo-50 rounded-3xl border-2 border-indigo-200 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-3">💭 Your turn</p>
                <p className="text-gray-900 text-xl font-black leading-relaxed">{lessonData.question}</p>
              </div>

              {/* ANSWER INPUT */}
              {!assessment && (
                <div className="space-y-3">
                  <textarea
                    ref={inputRef}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && answer.trim() && submitAnswer()}
                    placeholder="Type your answer here... there's no wrong way to think about it"
                    rows={3}
                    className="w-full bg-white border-2 border-gray-300 focus:border-indigo-400 rounded-2xl p-4 text-gray-900 text-lg font-medium outline-none transition-all resize-none leading-relaxed"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsedCount(h => h + 1); }}
                      className="flex-1 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50 text-amber-700 font-bold text-base hover:bg-amber-100 transition-all"
                    >
                      💡 {showHint ? 'Hide hint' : 'Show hint'}
                    </button>
                    <button
                      onClick={submitAnswer}
                      disabled={!answer.trim()}
                      className="flex-2 flex-grow-[2] py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-lg transition-all"
                    >
                      Check my answer ✓
                    </button>
                  </div>

                  {showHint && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
                      <p className="text-amber-800 font-bold">💡 {lessonData.hint}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ASSESSMENT */}
              {assessment && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-3xl border-2 p-6 space-y-4 ${
                    assessment.correct
                      ? 'bg-green-50 border-green-300'
                      : assessment.how_close === 'nearly'
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-blue-50 border-blue-300'
                  }`}
                >
                  {/* AI CELEBRATES OR ENCOURAGES */}
                  <div className="flex justify-center py-2">
                    <Learn51AIIcon 
                      size={70} 
                      animate={true} 
                      isResponding={assessment.correct}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {assessment.correct ? '🌟' : assessment.how_close === 'nearly' ? '🔥' : '💙'}
                    </span>
                    <p className="text-xl font-black text-gray-900">
                      {assessment.correct
                        ? 'Yes! ' + lessonData.encouragement
                        : assessment.how_close === 'nearly'
                        ? 'Really close!'
                        : 'Good thinking — let\'s look at it together'}
                    </p>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{assessment.response}</p>

                  {/* FUN FACT */}
                  <div className="bg-white/60 rounded-2xl p-4 border border-gray-200">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">🤯 Bonus mind-blower</p>
                    <p className="text-gray-800 font-medium">{lessonData.fun_fact}</p>
                  </div>

                  {!assessment.correct && (
                    <button
                      onClick={nextQuestion}
                      className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg transition-all flex items-center justify-center gap-2"
                    >
                      Try another question <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                  {assessment.correct && (
                    <button
                      onClick={() => setShowReward(true)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-lg transition-all flex items-center justify-center gap-2"
                    >
                      🎁 Claim your reward!
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
          </AnimatePresence>

          {/* SHARE WIN MODAL */}
          {showShare && (
            <ShareYourWin
              interest={interest}
              topic={TOPICS.find(t => t.id === topic)?.label}
              stars={stars}
              streak={streak}
              onClose={() => setShowShare(false)}
            />
          )}

          {/* CREATIVE REWARD MODAL */}
          {showReward && lessonData && (
            <CreativeReward
              interest={interest}
              topic={TOPICS.find(t => t.id === topic)?.label}
              childAge={age}
              correctAnswer={answer}
              questionAsked={lessonData.question}
              streakCount={streak}
              onClose={() => { setShowReward(false); nextQuestion(); }}
            />
          )}

          {/* QUICK TOPIC SWITCH */}
          {!loading && (
            <div className="flex gap-2 justify-center flex-wrap pt-2">
              {TOPICS.map(t => (
                <button
                  key={t.id}
                  onClick={() => { 
                    setSelectedTopics([t.id]);
                    setTopic(t.id); 
                    setHistory([]); 
                    loadLesson(t.id, level); 
                  }}
                  className={`text-sm px-3 py-1.5 rounded-full border font-bold transition-all ${
                    topic === t.id || selectedTopics.includes(t.id)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}