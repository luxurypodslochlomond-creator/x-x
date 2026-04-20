import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, Volume2, VolumeX, Share2, Camera, X, Upload } from 'lucide-react';
import ShareYourWin from '@/components/learn51/ShareYourWin';
import useLearnCard, { CardReveal, CardCollection, getCards } from '@/components/learn51/LearnCard';
import LanguagePicker, { LANGUAGES, detectBrowserLanguage } from '@/components/learn51/LanguagePicker';
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
  { id: 'maths', emoji: '🧮', label: 'Maths', color: 'from-violet-500 to-indigo-600', border: 'border-violet-400', desc: 'Numbers, shapes, patterns, algebra' },
  { id: 'reading', emoji: '📖', label: 'Reading & English', color: 'from-emerald-500 to-teal-600', border: 'border-emerald-400', desc: 'Phonics, spelling, writing, literature' },
  { id: 'science', emoji: '🔬', label: 'Science', color: 'from-cyan-500 to-blue-600', border: 'border-cyan-400', desc: 'Physics, chemistry, biology, space' },
  { id: 'history', emoji: '🏛️', label: 'History', color: 'from-amber-500 to-orange-600', border: 'border-amber-400', desc: 'World events, people, civilisations' },
  { id: 'geography', emoji: '🌍', label: 'Geography', color: 'from-green-500 to-emerald-600', border: 'border-green-400', desc: 'Countries, climate, maps, nature' },
  { id: 'health', emoji: '💪', label: 'Health & Body', color: 'from-rose-500 to-pink-600', border: 'border-rose-400', desc: 'How your body works, wellbeing' },
  { id: 'lifeskills', emoji: '💰', label: 'Real Life Skills', color: 'from-teal-500 to-cyan-600', border: 'border-teal-400', desc: 'Money, cooking, rights, staying safe' },
  { id: 'computing', emoji: '💻', label: 'Computing & Tech', color: 'from-indigo-500 to-blue-600', border: 'border-indigo-400', desc: 'Coding, how the internet works' },
  { id: 'languages', emoji: '🗣️', label: 'Languages', color: 'from-purple-500 to-violet-600', border: 'border-purple-400', desc: 'Spanish, French, Swahili + more' },
  { id: 'arts', emoji: '🎨', label: 'Arts & Music', color: 'from-pink-500 to-rose-600', border: 'border-pink-400', desc: 'Creativity, music theory, art history' },
  { id: 'homework', emoji: '📸', label: 'Help With Homework', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-400', desc: 'Photo your work — I\'ll guide you through it' },
];

// UI strings translated by the AI for each language — kids see everything in their language
const UI_STRINGS = {
  en: { back: '← Back to Learn51', step1: 'Step 1 — What do you love? 💛', step2: 'Step 2 — How old are you? 🎂', step3: "Step 3 — What sounds fun? 🌍", letsGo: "Let's go! 🚀", checkAnswer: 'Check my answer ✓', showHint: 'Show hint', hideHint: 'Hide hint', typeAnswer: "Type your answer here... there's no wrong way to think about it", readToMe: 'Read to me 🔊', stop: 'Stop', startOver: 'Start over', claimReward: '🎁 Claim your reward!', tryAnother: 'Try another question', welcomeBack: 'Welcome back!', startFresh: 'Start fresh', jumpBack: 'Jump back in — pick a topic:', didYouKnow: '✨ Did you know?', letsExplore: '📚 Let\'s explore', yourTurn: '💭 Your turn', bonusFact: '🤯 Bonus mind-blower', adapting: '🤖 adapting for you', thinking: 'Thinking of the perfect question...', connecting: 'Finding the perfect lesson for you...' },
  es: { back: '← Volver a Learn51', step1: 'Paso 1 — ¿Qué te encanta? 💛', step2: 'Paso 2 — ¿Cuántos años tienes? 🎂', step3: '¿Qué te parece divertido? 🌍', letsGo: '¡Vamos! 🚀', checkAnswer: 'Comprobar mi respuesta ✓', showHint: 'Mostrar pista', hideHint: 'Ocultar pista', typeAnswer: 'Escribe tu respuesta aquí...', readToMe: 'Léeme 🔊', stop: 'Parar', startOver: 'Empezar de nuevo', claimReward: '🎁 ¡Reclamar recompensa!', tryAnother: 'Otra pregunta', welcomeBack: '¡Bienvenido de vuelta!', startFresh: 'Empezar desde cero', jumpBack: 'Continuar — elige un tema:', didYouKnow: '✨ ¿Sabías que?', letsExplore: '📚 Exploremos', yourTurn: '💭 Tu turno', bonusFact: '🤯 Dato extra', adapting: '🤖 adaptándome a ti', thinking: 'Pensando en la pregunta perfecta...', connecting: 'Encontrando la lección perfecta...' },
  fr: { back: '← Retour à Learn51', step1: 'Étape 1 — Qu\'est-ce que tu aimes? 💛', step2: 'Étape 2 — Quel âge as-tu? 🎂', step3: 'Qu\'est-ce qui te semble amusant? 🌍', letsGo: 'C\'est parti! 🚀', checkAnswer: 'Vérifier ma réponse ✓', showHint: 'Voir l\'indice', hideHint: 'Cacher l\'indice', typeAnswer: 'Écris ta réponse ici...', readToMe: 'Lire pour moi 🔊', stop: 'Stop', startOver: 'Recommencer', claimReward: '🎁 Réclamer la récompense!', tryAnother: 'Autre question', welcomeBack: 'Bon retour!', startFresh: 'Tout recommencer', jumpBack: 'Reprendre — choisis un sujet:', didYouKnow: '✨ Le savais-tu?', letsExplore: '📚 Explorons', yourTurn: '💭 À toi', bonusFact: '🤯 Fait bonus', adapting: '🤖 je m\'adapte', thinking: 'Je cherche la question parfaite...', connecting: 'Je trouve la leçon parfaite...' },
  ar: { back: '← العودة إلى Learn51', step1: 'الخطوة 1 — ماذا تحب؟ 💛', step2: 'الخطوة 2 — كم عمرك؟ 🎂', step3: 'ما الذي يبدو ممتعاً؟ 🌍', letsGo: 'هيا بنا! 🚀', checkAnswer: 'تحقق من إجابتي ✓', showHint: 'أظهر التلميح', hideHint: 'أخفِ التلميح', typeAnswer: 'اكتب إجابتك هنا...', readToMe: 'اقرأ لي 🔊', stop: 'توقف', startOver: 'ابدأ من جديد', claimReward: '🎁 احصل على مكافأتك!', tryAnother: 'سؤال آخر', welcomeBack: 'أهلاً بعودتك!', startFresh: 'ابدأ من الصفر', jumpBack: 'تابع — اختر موضوعاً:', didYouKnow: '✨ هل تعلم؟', letsExplore: '📚 لنستكشف', yourTurn: '💭 دورك', bonusFact: '🤯 حقيقة إضافية', adapting: '🤖 أتكيف معك', thinking: 'أفكر في السؤال المثالي...', connecting: 'أجد الدرس المثالي...' },
  hi: { back: '← Learn51 पर वापस', step1: 'चरण 1 — आपको क्या पसंद है? 💛', step2: 'चरण 2 — आपकी उम्र कितनी है? 🎂', step3: 'क्या मज़ेदार लगता है? 🌍', letsGo: 'चलो! 🚀', checkAnswer: 'मेरा जवाब जांचें ✓', showHint: 'संकेत दिखाएं', hideHint: 'संकेत छुपाएं', typeAnswer: 'यहाँ अपना जवाब लिखें...', readToMe: 'मुझे पढ़ो 🔊', stop: 'रुको', startOver: 'फिर से शुरू', claimReward: '🎁 इनाम लो!', tryAnother: 'दूसरा सवाल', welcomeBack: 'वापसी पर स्वागत!', startFresh: 'नए सिरे से शुरू', jumpBack: 'जारी रखें — विषय चुनें:', didYouKnow: '✨ क्या आप जानते हैं?', letsExplore: '📚 चलो जानते हैं', yourTurn: '💭 आपकी बारी', bonusFact: '🤯 बोनस तथ्य', adapting: '🤖 आपके लिए बदल रहा हूँ', thinking: 'सही सवाल ढूंढ रहा हूँ...', connecting: 'सही पाठ ढूंढ रहा हूँ...' },
  sw: { back: '← Rudi Learn51', step1: 'Hatua 1 — Unachopenda ni nini? 💛', step2: 'Hatua 2 — Una umri gani? 🎂', step3: 'Nini kinaonekana cha kufurahisha? 🌍', letsGo: 'Twende! 🚀', checkAnswer: 'Angalia jibu langu ✓', showHint: 'Onyesha kidokezo', hideHint: 'Ficha kidokezo', typeAnswer: 'Andika jibu lako hapa...', readToMe: 'Nisomee 🔊', stop: 'Simama', startOver: 'Anza upya', claimReward: '🎁 Chukua tuzo!', tryAnother: 'Swali lingine', welcomeBack: 'Karibu tena!', startFresh: 'Anza kutoka mwanzo', jumpBack: 'Endelea — chagua mada:', didYouKnow: '✨ Je, ulijua?', letsExplore: '📚 Tuchunguze', yourTurn: '💭 Zamu yako', bonusFact: '🤯 Ukweli wa ziada', adapting: '🤖 inabadilika kwako', thinking: 'Inatafuta swali kamili...', connecting: 'Inatafuta somo kamili...' },
  uk: { back: '← Назад до Learn51', step1: 'Крок 1 — Що ти любиш? 💛', step2: 'Крок 2 — Скільки тобі років? 🎂', step3: 'Що здається цікавим? 🌍', letsGo: 'Поїхали! 🚀', checkAnswer: 'Перевірити відповідь ✓', showHint: 'Показати підказку', hideHint: 'Сховати підказку', typeAnswer: 'Напиши свою відповідь тут...', readToMe: 'Прочитай мені 🔊', stop: 'Стоп', startOver: 'Почати знову', claimReward: '🎁 Забрати нагороду!', tryAnother: 'Інше питання', welcomeBack: 'З поверненням!', startFresh: 'Почати спочатку', jumpBack: 'Продовжити — обери тему:', didYouKnow: '✨ Чи знав ти?', letsExplore: '📚 Досліджуємо', yourTurn: '💭 Твоя черга', bonusFact: '🤯 Бонусний факт', adapting: '🤖 адаптуюсь для тебе', thinking: 'Шукаю ідеальне питання...', connecting: 'Шукаю ідеальний урок...' },
};
// For languages not in the map — fall back to English (AI handles the content translation)
const getUI = (langCode) => UI_STRINGS[langCode] || UI_STRINGS.en;

const PROMPT_TEMPLATE = ({ topic, interest, age, level, history, paceNote, language }) => `
You are Learn51 AI — the world's most caring, brilliant tutor. You are like the best older sibling imaginable — warm, funny, endlessly patient, and genuinely excited about helping this kid understand things. You NEVER make them feel stupid. You make them feel BRILLIANT.

CRITICAL: Respond ENTIRELY in ${language || 'English'}. Every word of your JSON values must be in ${language || 'English'}.

CHILD INFO:
- Topic: ${topic}
- What they love: ${interest}
- Age: ${age}
- Level (1=beginner, 5=advanced): ${level}
- Questions already covered: ${history}
- LEARNING PACE RIGHT NOW: ${paceNote}

YOUR MISSION:
1. Create ONE brilliant, personalised learning spark — not a lecture. A moment of "OH WOW I GET IT"
2. Connect ${topic} DEEPLY to ${interest} using REAL facts and names:
   - Football/Ronaldo: free kick angles, his actual stats, physics of the ball
   - Gaming: probability, coding logic, frame rates and maths
   - Music: frequency maths, rhythm patterns, music theory through their fave song
   - Make them feel like they're getting insider knowledge nobody else has
3. ASK ONE question at the end — but frame it like a challenge, not a test. "Bet you can figure this out..."
4. ADAPT to their pace: "${paceNote}"
   - Struggling: different angle, smaller steps, more warmth, never give up on them
   - Flying: stretch them, add a twist, say "okay here's the really hard version..."
   - Slow answers: be patient, reassuring, "take your time — there's no rush"
5. Keep lesson to 4-5 sentences max — punchy, clear, exciting
6. NEVER give away the answer. Guide them TO the answer with great questions.
7. Talk like a cool friend who cares. Never like a textbook.

TONE: Warm. Funny when natural. Proud of them before they've even answered. Make learning feel like a superpower.

FORMAT — respond ONLY with this JSON:
{
  "wow_fact": "One mind-blowing connection between ${topic} and ${interest} — ONE punchy sentence that makes them go WOW",
  "lesson": "The teaching moment — warm, brilliant, 4-5 sentences max. Use their interest. Make it real.",
  "question": "ONE question framed as a fun challenge — NOT a test. 'Bet you can figure out...' or 'Here's the tricky bit...'",
  "encouragement": "A short genuine line for after they get it right — not cheesy, real",
  "hint": "A warm nudge if stuck — ONE sentence, steers thinking without giving it away",
  "answer_keywords": ["key", "concepts", "showing", "understanding"],
  "fun_fact": "One genuinely wild bonus fact to leave them buzzing"
}
`;

const HOMEWORK_PHOTO_PROMPT = ({ imageDescription, interest, age, language }) => `
You are Learn51 AI — the world's best tutor. A child has shared their homework with you. Your job is NOT to give them the answer. Your job is to be their brilliant thinking partner — ask questions that guide them to figure it out themselves.

CRITICAL: Respond ENTIRELY in ${language || 'English'}.

Child info:
- Age: ${age}
- What they love: ${interest}
- Their homework/question: ${imageDescription}

YOUR APPROACH (Socratic method — guide, never give):
1. First, acknowledge what you see with warmth — "Oh nice, I can see you're working on..."
2. Ask them what they ALREADY know or notice about it — activate their thinking
3. Break it into the FIRST small step — just one thing to think about
4. Connect it to something they love (${interest}) if you can
5. End with ONE guiding question that moves them forward
6. NEVER give the answer directly. If they ask "just tell me" — say "I know you can figure this out, let's try..."

TONE: Like a brilliant older friend sitting next to them at the kitchen table. Excited to help them think it through.

FORMAT — respond ONLY with this JSON:
{
  "wow_fact": "A warm, curious observation about what you can see in their homework",
  "lesson": "Your Socratic opening — what you notice, what you want them to think about, first guiding question",
  "question": "The key guiding question to get them started — NOT the answer, the first step of thinking",
  "encouragement": "A genuine line reminding them they can do this",
  "hint": "If they're stuck — the gentlest possible nudge toward the first step",
  "answer_keywords": ["thinking", "process", "words"],
  "fun_fact": "A cool real-world connection to what they're studying"
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
   // Note: persistProgress defined below, but useEffect runs after render so it's fine
   useEffect(() => {
     const current = loadProgress() || {};
     saveProgress({ ...current, stars, level, interest, age, lastSaved: Date.now() });
   }, [stars, level, interest, age]);

  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState([]);
  const [showReward, setShowReward] = useState(false);
  const [newCard, setNewCard] = useState(null); // card being revealed
  const [showCollection, setShowCollection] = useState(false);
  const [cardCount, setCardCount] = useState(() => getCards().length);
  const [streak, setStreak] = useState(0);
  const { generateCard } = useLearnCard();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [iconState, setIconState] = useState('idle'); // 'idle' | 'thinking' | 'responding' | 'celebrating'
  const [homeworkPhoto, setHomeworkPhoto] = useState(null); // base64 url
  const [homeworkPhotoUrl, setHomeworkPhotoUrl] = useState(null); // uploaded url
  const photoInputRef = useRef(null);

  // ── Language — remembered across visits, auto-detected on first visit ──
  const savedLangCode = loadLanguage();
  const [language, setLanguage] = useState(
    savedLangCode 
      ? (LANGUAGES.find(l => l.code === savedLangCode) || LANGUAGES[0])
      : detectBrowserLanguage()
  );

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

  // Auto-load lesson when homework photo finishes uploading and we're in learning stage
  useEffect(() => {
    if (homeworkPhotoUrl && topic === 'homework' && stage === 'learning' && !lessonData && !loading) {
      loadLesson('homework', 1, homeworkPhotoUrl);
    }
  }, [homeworkPhotoUrl]);

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

  const handlePhotoUpload = useCallback(async (file) => {
    if (!file) return;
    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setHomeworkPhoto(e.target.result);
    reader.readAsDataURL(file);
    // Upload for AI vision
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setHomeworkPhotoUrl(file_url);
  }, []);

  const loadLesson = async (topicOverride, levelOverride, photoUrl) => {
    setLoading(true);
    setAnswer('');
    setAssessment(null);
    setShowHint(false);
    setLessonData(null);
    setIconState('thinking');
    setStage('learning');

    const useTopic = topicOverride || topic;
    const useLevel = levelOverride || level;
    const usePhotoUrl = photoUrl || homeworkPhotoUrl;
    const isHomework = useTopic === 'homework' || usePhotoUrl;

    const avgMs = questionCount > 0 ? totalResponseMs / questionCount : 30000;
    const paceNote = buildPaceNote({ questionCount, wrongStreak, hintUsedCount, avgResponseMs: avgMs, recentResults });

    const topicLabels = selectedTopics.length > 0 
      ? selectedTopics.map(id => TOPICS.find(t => t.id === id)?.label).filter(Boolean).join(' + ')
      : TOPICS.find(t => t.id === useTopic)?.label || useTopic;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: isHomework && usePhotoUrl
        ? HOMEWORK_PHOTO_PROMPT({ imageDescription: 'See the attached image', interest, age, language: language.label })
        : PROMPT_TEMPLATE({ topic: topicLabels, interest, age, level: useLevel, history: history.join(' | '), paceNote, language: language.label }),
      model: 'claude_sonnet_4_6',
      file_urls: isHomework && usePhotoUrl ? [usePhotoUrl] : undefined,
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
    setQuestionStartTime(Date.now());
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
      const newLevel = (newScore > 0 && newScore % 3 === 0 && wrongStreak === 0) ? Math.min(level + 1, 5) : level;
      setStreak(newStreak);
      setStars(newStars);
      setWrongStreak(0);
      setShowReward(true);
      setHasWon(true);
      if (newLevel !== level) setLevel(newLevel);
      persistProgress({ stars: newStars, level: newLevel, interest, age });
      // Generate a Learn Card in the background
      const topicLabel = selectedTopics.length > 0
        ? selectedTopics.map(id => TOPICS.find(t => t.id === id)?.label).filter(Boolean).join(' + ')
        : TOPICS.find(t => t.id === topic)?.label || topic;
      generateCard({ interest, topic: topicLabel, question: lessonData.question, answer, streak: newStreak, questionCount: newCount })
        .then(card => { if (card) { setNewCard(card); setCardCount(c => c + 1); } });
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

  const ui = getUI(language.code);

  // ── INTRO STAGE ──
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-[#05080f] text-white p-4 md:p-8 pb-20" dir={language.rtl ? 'rtl' : 'ltr'}>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-indigo-700/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-violet-700/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto space-y-6">

          <div className="flex items-center justify-between">
            <Link to="/Learn51" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-white text-sm transition-colors">
              {ui.back}
            </Link>
            <div className="flex items-center gap-2">
              {cardCount > 0 && (
                <button onClick={() => setShowCollection(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400 transition-all">
                  🃏 {cardCount} cards
                </button>
              )}
              <LanguagePicker selectedLang={language.code} onChange={handleLanguageChange} />
            </div>
          </div>

          <AnimatePresence>
            {newCard && <CardReveal card={newCard} onClose={() => setNewCard(null)} />}
            {showCollection && <CardCollection onClose={() => setShowCollection(false)} />}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 py-4">
            <div className="flex justify-center">
              <Learn51AIIcon size={110} animate={true} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Learn51 AI
            </h1>
            <p className="text-xl text-indigo-300 font-bold">Learning made just for YOU</p>
            <p className="text-white/30 text-sm">No login · No data · Free forever</p>
          </motion.div>

          {/* WELCOME BACK BANNER */}
          {saved && saved.stars > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌟</span>
                  <div>
                    <p className="font-black text-amber-300">{ui.welcomeBack} {saved.stars} ⭐ earned</p>
                    <p className="text-amber-400/70 text-sm">Level {saved.level}{saved.interest ? ` · loves ${saved.interest}` : ''}</p>
                  </div>
                </div>
                <button onClick={fullReset} className="text-xs text-white/30 hover:text-white/60 font-bold underline flex-shrink-0">{ui.startFresh}</button>
              </div>
              {saved.interest && saved.age && (
                <div className="flex flex-wrap gap-2">
                  <p className="text-amber-400/80 text-sm font-bold w-full">{ui.jumpBack}</p>
                  {TOPICS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTopic(t.id); loadLesson(t.id, saved.level || 1); }}
                      className="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-sm font-black hover:border-amber-400 transition-all"
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: What do you love? */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="bg-white/5 rounded-3xl border border-white/10 p-6">
            <p className="text-2xl font-black text-white mb-1">🚀 {ui.step1}</p>
            <p className="text-white/40 text-sm mb-5">Everything you learn will connect to this</p>
            <div className="grid grid-cols-4 gap-3">
              {INTERESTS.map(i => (
                <button
                  key={i.label}
                  onClick={() => setInterest(i.label)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all font-bold text-xs ${
                    interest === i.label
                      ? 'border-indigo-400 bg-indigo-500/20 text-white scale-105'
                      : 'border-white/10 hover:border-white/30 text-white/60 hover:text-white'
                  }`}
                >
                  <span className="text-3xl">{i.emoji}</span>
                  <span className="text-center leading-tight">{i.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* STEP 2: Age */}
          {interest && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-3xl border border-white/10 p-6">
              <p className="text-2xl font-black text-white mb-1">🎂 {ui.step2}</p>
              <p className="text-white/40 text-sm mb-5">So I get the level right for you</p>
              <div className="flex gap-3 flex-wrap">
                {['5-6', '7-8', '9-10', '11-12', '13-14', '15+'].map(a => (
                  <button
                    key={a}
                    onClick={() => setAge(a)}
                    className={`px-6 py-3 rounded-2xl border-2 font-black text-lg transition-all ${
                      age === a
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 scale-105'
                        : 'border-white/10 hover:border-white/30 text-white/60 hover:text-white'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Topics */}
          {interest && age && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-3xl border border-white/10 p-6">
              <p className="text-2xl font-black text-white mb-1">🌍 {ui.step3}</p>
              <p className="text-white/40 text-sm mb-5">Pick a subject — I'll connect everything to {interest}</p>

              {/* HOMEWORK PHOTO CARD — special, highlighted */}
              <div className="mb-4">
                <div className={`rounded-2xl border-2 p-4 transition-all ${selectedTopics.includes('homework') ? 'border-yellow-400 bg-yellow-500/10' : 'border-yellow-500/40 bg-yellow-500/5 hover:border-yellow-400/70'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">📸</span>
                    <div className="flex-1">
                      <p className="text-white font-black">Stuck on homework?</p>
                      <p className="text-white/50 text-sm">Take a photo — I'll guide you through it (I never just give answers!)</p>
                    </div>
                  </div>
                  <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={e => { if (e.target.files[0]) { handlePhotoUpload(e.target.files[0]); setSelectedTopics(['homework']); setTopic('homework'); } }} />
                  {homeworkPhoto ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <img src={homeworkPhoto} alt="Homework" className="w-full max-h-48 object-contain rounded-xl border border-yellow-500/30" />
                        <button onClick={() => { setHomeworkPhoto(null); setHomeworkPhotoUrl(null); setSelectedTopics([]); }} className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white/70 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-yellow-400 text-sm font-bold">✓ Photo ready — let's go!</p>
                    </div>
                  ) : (
                    <button onClick={() => photoInputRef.current?.click()} className="w-full py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-300 font-bold flex items-center justify-center gap-2 hover:border-yellow-400 transition-all">
                      <Camera className="w-5 h-5" /> Take photo or upload
                    </button>
                  )}
                </div>
              </div>

              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-3">— or pick a subject —</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TOPICS.filter(t => t.id !== 'homework').map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTopics([t.id]);
                      setTopic(t.id);
                      setHomeworkPhoto(null);
                      setHomeworkPhotoUrl(null);
                    }}
                    className={`flex flex-col items-start gap-1 p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedTopics.includes(t.id)
                        ? 'border-violet-400 bg-violet-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <p className="text-white font-black text-sm leading-tight">{t.label}</p>
                    <p className="text-white/40 text-xs leading-tight">{t.desc}</p>
                    {selectedTopics.includes(t.id) && <span className="text-violet-400 font-black text-xs">✓ selected</span>}
                  </button>
                ))}
              </div>

              {(selectedTopics.length > 0) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => {
                    const t = selectedTopics[0];
                    setTopic(t);
                    if (t === 'homework' && homeworkPhotoUrl) {
                      loadLesson(t, 1, homeworkPhotoUrl);
                    } else if (t === 'homework' && !homeworkPhotoUrl) {
                      photoInputRef.current?.click();
                    } else {
                      loadLesson(t, 1);
                    }
                  }}
                  className="w-full mt-5 py-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700 text-white font-black text-xl rounded-2xl transition-all active:scale-95 shadow-2xl shadow-indigo-500/30"
                >
                  {selectedTopics[0] === 'homework' && !homeworkPhotoUrl ? '📸 Add a photo first' : ui.letsGo}
                </motion.button>
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
      <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-center space-y-4">
          <div className="flex justify-center">
            <Learn51AIIcon size={100} animate={true} />
          </div>
          <p className="text-xl font-black text-indigo-300">{ui.connecting}</p>
          <p className="text-white/40">{TOPICS.find(t => t.id === topic)?.label} × {interest}...</p>
        </motion.div>
      </div>
    );
  }

  // ── LEARNING STAGE ──
  if (stage === 'learning') {
    const topicData = TOPICS.find(t => t.id === topic);
    return (
      <div className="min-h-screen bg-[#05080f] text-white p-4 md:p-8 pb-20" dir={language.rtl ? 'rtl' : 'ltr'}>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-indigo-700/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto space-y-5">

          {/* HEADER BAR */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={reset} className="text-white/40 hover:text-white font-bold text-sm flex items-center gap-1 transition-colors">
                <RotateCcw className="w-4 h-4" /> {ui.startOver}
              </button>
              <LanguagePicker selectedLang={language.code} onChange={handleLanguageChange} />
            </div>
            <div className="flex items-center gap-3">
              {wrongStreak >= 2 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 font-bold text-xs bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded-full">
                  {ui.adapting}
                </motion.span>
              )}
              <button onClick={() => setShowCollection(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400 transition-all">
                🃏 {cardCount} {cardCount === 1 ? 'card' : 'cards'}
              </button>
              {hasWon && (
                <button onClick={() => setShowShare(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border border-purple-500/40 bg-purple-500/10 text-purple-300 hover:border-purple-400 transition-all">
                  <Share2 className="w-3 h-3" /> Share
                </button>
              )}
              {streak >= 2 && wrongStreak === 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }} className="text-orange-400 font-black text-sm bg-orange-500/10 border border-orange-500/30 px-2 py-1 rounded-full">
                  🔥 {streak} streak
                </motion.span>
              )}
              <span className="text-amber-400 font-black text-sm">{'⭐'.repeat(Math.min(stars, 5))}</span>
              <span className="bg-indigo-500/20 text-indigo-300 font-black px-3 py-1 rounded-full text-sm border border-indigo-500/30">
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
              <p className="text-indigo-300 font-black text-lg">{ui.thinking}</p>
            </motion.div>
          ) : lessonData && (
            <motion.div key="lesson" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

              <div className="flex justify-center py-2">
                <Learn51AIIcon size={80} animate={true} isListening={iconState === 'thinking'} isResponding={iconState === 'responding'} />
              </div>

              {/* HOMEWORK PHOTO PREVIEW */}
              {homeworkPhoto && topic === 'homework' && (
                <div className="rounded-2xl border border-yellow-500/30 overflow-hidden">
                  <img src={homeworkPhoto} alt="Your homework" className="w-full max-h-56 object-contain bg-black/40" />
                  <p className="text-center text-yellow-400/60 text-xs py-2 font-bold">Your homework — let's think through it together</p>
                </div>
              )}

              {/* WOW FACT */}
              <div className={`bg-gradient-to-r ${topicData?.color || 'from-yellow-500 to-amber-600'} rounded-3xl p-5 text-white`}>
                <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">{topic === 'homework' ? '👀 What I can see' : ui.didYouKnow}</p>
                <p className="text-lg font-bold leading-relaxed">{lessonData.wow_fact}</p>
              </div>

              {/* LESSON */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black uppercase tracking-widest text-white/30">{ui.letsExplore}</p>
                  <button
                    onClick={() => { isSpeaking ? (stopSpeaking(), setIsSpeaking(false)) : readLesson(lessonData); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
                      isSpeaking ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:border-indigo-400'
                    }`}
                  >
                    {isSpeaking ? <><VolumeX className="w-3 h-3" /> {ui.stop}</> : <><Volume2 className="w-3 h-3" /> {ui.readToMe}</>}
                  </button>
                </div>
                <p className="text-white text-lg leading-relaxed font-medium">{lessonData.lesson}</p>
              </div>

              {/* QUESTION */}
              <div className="bg-indigo-500/10 rounded-3xl border border-indigo-500/30 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-indigo-400/70 mb-3">{ui.yourTurn}</p>
                <p className="text-white text-xl font-black leading-relaxed">{lessonData.question}</p>
              </div>

              {/* ANSWER INPUT */}
              {!assessment && (
                <div className="space-y-3">
                  <textarea
                    ref={inputRef}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && answer.trim() && submitAnswer()}
                    placeholder={ui.typeAnswer}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 rounded-2xl p-4 text-white text-lg font-medium outline-none transition-all resize-none leading-relaxed placeholder:text-white/20"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsedCount(h => h + 1); }}
                      className="flex-1 py-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-bold text-base hover:border-amber-400 transition-all"
                    >
                      💡 {showHint ? ui.hideHint : ui.showHint}
                    </button>
                    <button
                      onClick={submitAnswer}
                      disabled={!answer.trim()}
                      className="flex-grow-[2] py-3 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-lg transition-all"
                    >
                      {ui.checkAnswer}
                    </button>
                  </div>
                  {showHint && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                      <p className="text-amber-300 font-bold">💡 {lessonData.hint}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ASSESSMENT */}
              {assessment && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-3xl border p-6 space-y-4 ${
                    assessment.correct
                      ? 'bg-green-500/10 border-green-500/40'
                      : assessment.how_close === 'nearly'
                      ? 'bg-amber-500/10 border-amber-500/40'
                      : 'bg-blue-500/10 border-blue-500/40'
                  }`}
                >
                  <div className="flex justify-center py-2">
                    <Learn51AIIcon size={70} animate={true} isResponding={assessment.correct} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{assessment.correct ? '🌟' : assessment.how_close === 'nearly' ? '🔥' : '💙'}</span>
                    <p className="text-xl font-black text-white">
                      {assessment.correct ? 'Yes! ' + lessonData.encouragement : assessment.how_close === 'nearly' ? 'Really close!' : "Good thinking — let's look at it together"}
                    </p>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">{assessment.response}</p>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-1">{ui.bonusFact}</p>
                    <p className="text-white/70 font-medium">{lessonData.fun_fact}</p>
                  </div>
                  {!assessment.correct && (
                    <button onClick={nextQuestion} className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-black text-lg transition-all flex items-center justify-center gap-2">
                      {ui.tryAnother} <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                  {assessment.correct && (
                    <button onClick={() => setShowReward(true)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-lg transition-all flex items-center justify-center gap-2">
                      {ui.claimReward}
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
          </AnimatePresence>

          {showShare && <ShareYourWin interest={interest} topic={TOPICS.find(t => t.id === topic)?.label} stars={stars} streak={streak} onClose={() => setShowShare(false)} />}
          {showReward && lessonData && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-amber-500/20 border border-amber-400/60 rounded-2xl px-5 py-3 text-amber-300 font-black text-sm pointer-events-auto"
                onClick={() => { setShowReward(false); nextQuestion(); }}>
                🃏 Card incoming... keep going! →
              </motion.div>
            </div>
          )}
          <AnimatePresence>
            {newCard && <CardReveal card={newCard} onClose={() => setNewCard(null)} />}
            {showCollection && <CardCollection onClose={() => setShowCollection(false)} />}
          </AnimatePresence>

          {/* QUICK TOPIC SWITCH */}
          {!loading && (
            <div className="space-y-2 pt-2">
              <p className="text-white/20 text-xs font-bold text-center uppercase tracking-widest">Switch subject</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {TOPICS.filter(t => t.id !== 'homework').map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedTopics([t.id]); setTopic(t.id); setHistory([]); loadLesson(t.id, level); }}
                    className={`text-sm px-3 py-1.5 rounded-full border font-bold transition-all ${
                      topic === t.id || selectedTopics.includes(t.id)
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300'
                        : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
                {/* Homework photo button */}
                <label className="cursor-pointer text-sm px-3 py-1.5 rounded-full border border-yellow-500/40 text-yellow-400/70 hover:border-yellow-400 hover:text-yellow-300 font-bold transition-all flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Homework photo
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={async e => { if (e.target.files[0]) { setSelectedTopics(['homework']); setTopic('homework'); await handlePhotoUpload(e.target.files[0]); } }} />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}