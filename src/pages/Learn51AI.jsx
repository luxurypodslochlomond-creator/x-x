import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, Star, Heart, Brain, Globe, Zap } from 'lucide-react';

// ============================================================
// LEARN51 AI — World-first adaptive AI education
// No login. No data. No shame. Free forever.
// Uses claude_sonnet_4_6 for the best possible teaching
// ============================================================

const INTERESTS = [
  { emoji: '⚽', label: 'Football' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '🐶', label: 'Animals' },
  { emoji: '🚀', label: 'Space' },
  { emoji: '🍕', label: 'Food' },
  { emoji: '🎨', label: 'Art' },
  { emoji: '🏄', label: 'Sports' },
  { emoji: '🦖', label: 'Dinosaurs' },
  { emoji: '💻', label: 'Tech' },
];

const TOPICS = [
  { id: 'maths', emoji: '🧮', label: 'Maths', color: 'from-violet-500 to-indigo-600', border: 'border-violet-400', desc: 'Numbers, shapes, patterns' },
  { id: 'reading', emoji: '📖', label: 'Reading & Words', color: 'from-emerald-500 to-teal-600', border: 'border-emerald-400', desc: 'Phonics, spelling, stories' },
  { id: 'health', emoji: '💪', label: 'Health & Body', color: 'from-rose-500 to-pink-600', border: 'border-rose-400', desc: 'How your body works' },
  { id: 'respect', emoji: '🌍', label: 'Kindness & Rights', color: 'from-amber-500 to-orange-600', border: 'border-amber-400', desc: 'Your rights, others\' rights' },
  { id: 'science', emoji: '🔬', label: 'How Things Work', color: 'from-cyan-500 to-blue-600', border: 'border-cyan-400', desc: 'Physics, nature, universe' },
  { id: 'money', emoji: '💰', label: 'Real Life Skills', color: 'from-green-500 to-emerald-600', border: 'border-green-400', desc: 'Money, cooking, staying safe' },
];

const PROMPT_TEMPLATE = ({ topic, interest, age, level, history }) => `
You are Learn51 AI — the world's most caring, brilliant teacher. You genuinely love children and want every single one on Earth to learn and thrive.

CHILD INFO:
- Topic they want to learn: ${topic}
- Their favourite thing: ${interest}
- Age: ${age}
- Level (1=beginner, 5=advanced): ${level}
- Previous questions this session: ${history}

YOUR JOB:
1. Give ONE brilliant, personalised lesson moment — not a lecture, a SPARK
2. Connect the topic directly to their interest (${interest}) — make it feel magical that these connect
3. Ask ONE clear question at the end to check understanding
4. Keep it SHORT — 4-6 sentences max for the lesson, then the question
5. Language: simple, warm, excited — never condescending
6. If they've had ${history} questions already, slightly increase difficulty
7. Topics to weave in naturally when relevant: health, kindness, respect, their rights as a child

TONE: You are their brilliant friend who happens to know everything. Not a teacher reading from a book.

FORMAT your response EXACTLY like this JSON (no extra text):
{
  "wow_fact": "One mind-blowing connection between ${topic} and ${interest} in ONE sentence",
  "lesson": "The actual teaching moment — warm, brilliant, 3-4 sentences",  
  "question": "ONE clear question to check they got it",
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

export default function Learn51AIPage() {
  const [stage, setStage] = useState('intro'); // intro | topic | learning | result
  const [interest, setInterest] = useState(null);
  const [age, setAge] = useState(null);
  const [topic, setTopic] = useState(null);
  const [level, setLevel] = useState(1);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);

  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState([]);

  const inputRef = useRef(null);

  const loadLesson = async (topicOverride, levelOverride) => {
    setLoading(true);
    setAnswer('');
    setAssessment(null);
    setShowHint(false);
    setLessonData(null);

    const useTopic = topicOverride || topic;
    const useLevel = levelOverride || level;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: PROMPT_TEMPLATE({
        topic: TOPICS.find(t => t.id === useTopic)?.label || useTopic,
        interest: interest,
        age: age,
        level: useLevel,
        history: history.length,
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
    setStage('learning');
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !lessonData) return;
    setLoading(true);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: ASSESS_PROMPT({
        question: lessonData.question,
        answer,
        topic: TOPICS.find(t => t.id === topic)?.label,
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

    const newScore = score + (result.score_change || 0);
    const newCount = questionCount + 1;
    setScore(newScore);
    setQuestionCount(newCount);
    setHistory(h => [...h, lessonData.question]);

    if (result.correct) {
      setStars(s => s + 1);
      // Level up every 3 correct answers
      if (newScore > 0 && newScore % 3 === 0) {
        setLevel(l => Math.min(l + 1, 5));
      }
    }
  };

  const nextQuestion = () => {
    loadLesson();
  };

  const reset = () => {
    setStage('intro');
    setInterest(null);
    setAge(null);
    setTopic(null);
    setLevel(1);
    setQuestionCount(0);
    setScore(0);
    setStars(0);
    setHistory([]);
    setLessonData(null);
    setAssessment(null);
  };

  // ── INTRO STAGE ──
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-gray-900 p-4 md:p-8 pb-20">
        <div className="max-w-2xl mx-auto space-y-8">

          <Link to="/Learn51" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 text-base">
            ← Back to Learn51
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
            <div className="text-6xl">🤖✨</div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Learn51 AI</h1>
            <p className="text-xl text-indigo-700 font-bold">Learning made just for YOU</p>
            <p className="text-gray-500 text-base">No login · No data · Free forever · Powered by AI</p>
          </motion.div>

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

          {/* STEP 3: Topic */}
          {interest && age && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
              <p className="text-xl font-black text-gray-900 mb-1">Step 3 — What shall we explore? 🌍</p>
              <p className="text-gray-500 text-sm mb-4">I'll connect it to {interest} — I promise it'll surprise you</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOPICS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTopic(t.id);
                      loadLesson(t.id, 1);
                    }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all font-bold ${
                      topic === t.id
                        ? `${t.border} bg-gray-50`
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-3xl">{t.emoji}</span>
                    <div>
                      <p className="text-gray-900 font-black">{t.label}</p>
                      <p className="text-gray-500 text-sm font-normal">{t.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </button>
                ))}
              </div>
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
          <div className="text-6xl">🤖</div>
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
      <div className="min-h-screen bg-[#faf9f6] text-gray-900 p-4 md:p-8 pb-20">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* HEADER BAR */}
          <div className="flex items-center justify-between">
            <button onClick={reset} className="text-gray-400 hover:text-gray-600 font-bold text-sm flex items-center gap-1">
              <RotateCcw className="w-4 h-4" /> Start over
            </button>
            <div className="flex items-center gap-4">
              <span className="text-amber-600 font-black text-lg">{'⭐'.repeat(Math.min(stars, 5))}</span>
              <span className="bg-indigo-100 text-indigo-700 font-black px-3 py-1 rounded-full text-sm">
                Level {level}
              </span>
              <span className="text-gray-500 text-sm font-bold">Q{questionCount + 1}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16 space-y-4">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-5xl">🤖</motion.div>
              <p className="text-indigo-700 font-black text-lg">Thinking of the perfect question...</p>
            </motion.div>
          ) : lessonData && (
            <motion.div key="lesson" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

              {/* WOW FACT */}
              <div className={`bg-gradient-to-r ${topicData?.color} rounded-3xl p-5 text-white`}>
                <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">✨ Did you know?</p>
                <p className="text-lg font-bold leading-relaxed">{lessonData.wow_fact}</p>
              </div>

              {/* LESSON */}
              <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">📚 Let's explore</p>
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
                      onClick={() => setShowHint(!showHint)}
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

                  <button
                    onClick={nextQuestion}
                    className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg transition-all flex items-center justify-center gap-2"
                  >
                    Next question <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
          </AnimatePresence>

          {/* CHANGE TOPIC */}
          {!loading && (
            <div className="flex gap-2 justify-center flex-wrap pt-2">
              {TOPICS.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setTopic(t.id); setHistory([]); loadLesson(t.id, level); }}
                  className={`text-sm px-3 py-1.5 rounded-full border font-bold transition-all ${
                    topic === t.id
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