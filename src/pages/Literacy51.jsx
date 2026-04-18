import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, BookOpen, Mic, Zap, Star, ArrowRight, RotateCcw } from 'lucide-react';
import StarAward, { awardStars } from '@/components/learn51/StarAward';

// NOINDEX - private learning tool
const PHONICS_WORDS = [
    { word: "night", phoneme: "igh", hint: "The igh makes a long I sound", emoji: "🌙" },
    { word: "bright", phoneme: "igh", hint: "Like in 'light' and 'right'", emoji: "💡" },
    { word: "cloud", phoneme: "ou", hint: "The ou makes an OW sound", emoji: "☁️" },
    { word: "shout", phoneme: "ou", hint: "Like in 'out' and 'mouth'", emoji: "📢" },
    { word: "dream", phoneme: "ea", hint: "The ea makes an EE sound", emoji: "💭" },
    { word: "beach", phoneme: "ea", hint: "Like in 'read' and 'seat'", emoji: "🏖️" },
    { word: "phone", phoneme: "ph", hint: "The ph makes an F sound", emoji: "📱" },
    { word: "chair", phoneme: "ch", hint: "The ch makes a CH sound", emoji: "🪑" },
    { word: "shark", phoneme: "sh", hint: "The sh makes a SH sound", emoji: "🦈" },
    { word: "three", phoneme: "th", hint: "The th makes a TH sound", emoji: "3️⃣" },
];

const SPELLING_RULES = [
    {
        rule: "Double the consonant before -ing",
        examples: ["run → running", "sit → sitting", "swim → swimming"],
        tryIt: ["hop", "jog", "skip"],
        answers: ["hopping", "jogging", "skipping"],
        tip: "Short vowel + one consonant? Double it before adding -ing!",
        emoji: "✏️"
    },
    {
        rule: "Drop the 'e' before -ing",
        examples: ["make → making", "ride → riding", "love → loving"],
        tryIt: ["bake", "dance", "smile"],
        answers: ["baking", "dancing", "smiling"],
        tip: "Word ends in 'e'? Drop it before adding -ing!",
        emoji: "🗑️"
    },
    {
        rule: "Change 'y' to 'ies' (plurals)",
        examples: ["baby → babies", "city → cities", "party → parties"],
        tryIt: ["puppy", "story", "cherry"],
        answers: ["puppies", "stories", "cherries"],
        tip: "Word ends in consonant + y? Change y to ies!",
        emoji: "🔄"
    },
];

const SENTENCE_STARTERS = [
    { starter: "The brave explorer", prompt: "What did they find?", example: "The brave explorer discovered a hidden cave full of crystals." },
    { starter: "Suddenly, without warning,", prompt: "What happened next?", example: "Suddenly, without warning, the lights went out in the whole city." },
    { starter: "I couldn't believe my eyes when", prompt: "What did you see?", example: "I couldn't believe my eyes when the dog started speaking in perfect English." },
    { starter: "Deep in the forest,", prompt: "Describe what's there.", example: "Deep in the forest, a tiny door was carved into the oldest oak tree." },
    { starter: "The kindest thing anyone ever did was", prompt: "Tell the story.", example: "The kindest thing anyone ever did was leave warm soup on my doorstep." },
];

export default function Literacy51Page() {
    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => { document.head.removeChild(meta); };
    }, []);

    const [activeTab, setActiveTab] = useState('phonics');
    const [score, setScore] = useState(0);
    const [starAward, setStarAward] = useState(null);

    // PHONICS STATE
    const [currentWordIdx, setCurrentWordIdx] = useState(0);
    const [showPhonics, setShowPhonics] = useState(false);
    const [phonicsInput, setPhonicsInput] = useState('');
    const [phonicsResult, setPhonicsResult] = useState(null);

    // SPELLING STATE
    const [ruleIdx, setRuleIdx] = useState(0);
    const [spellingAnswers, setSpellingAnswers] = useState(['', '', '']);
    const [spellingChecked, setSpellingChecked] = useState(false);
    const [spellingResults, setSpellingResults] = useState([]);

    // SENTENCE STATE
    const [starterIdx, setStarterIdx] = useState(0);
    const [sentence, setSentence] = useState('');
    const [showExample, setShowExample] = useState(false);

    const currentWord = PHONICS_WORDS[currentWordIdx];
    const currentRule = SPELLING_RULES[ruleIdx];
    const currentStarter = SENTENCE_STARTERS[starterIdx];

    const checkPhonics = () => {
        const correct = phonicsInput.toLowerCase().trim() === currentWord.phoneme.toLowerCase();
        setPhonicsResult(correct);
        if (correct) { setScore(s => s + 1); setStarAward({ n: 1, label: 'Phonics master! 🔤' }); }
    };

    const nextPhonicsWord = () => {
        setCurrentWordIdx(i => (i + 1) % PHONICS_WORDS.length);
        setPhonicsInput('');
        setPhonicsResult(null);
        setShowPhonics(false);
    };

    const checkSpelling = () => {
        const results = spellingAnswers.map((ans, i) =>
            ans.toLowerCase().trim() === currentRule.answers[i].toLowerCase()
        );
        setSpellingResults(results);
        setSpellingChecked(true);
        const correct = results.filter(Boolean).length;
        if (correct > 0) { setScore(s => s + correct); setStarAward({ n: correct, label: `${correct} spelling${correct > 1 ? 's' : ''} nailed! ✏️` }); }
    };

    const nextRule = () => {
        setRuleIdx(i => (i + 1) % SPELLING_RULES.length);
        setSpellingAnswers(['', '', '']);
        setSpellingChecked(false);
        setSpellingResults([]);
    };

    const tabs = [
        { id: 'phonics', label: '🔤 Phonics', icon: Mic },
        { id: 'spelling', label: '✏️ Spelling', icon: Zap },
        { id: 'sentences', label: '📖 Sentences', icon: BookOpen },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-50 text-gray-900 p-4 md:p-8 pb-32">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* HEADER */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
                    <BookOpen className="w-14 h-14 text-indigo-700 mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-black text-indigo-900">Literacy 51 ✨</h1>
                    <p className="text-xl text-indigo-700 font-bold">Phonics · Spelling · Sentences — for every learner 💙</p>
                    <div className="text-2xl font-black text-amber-700">⭐ Score: {score}</div>
                </motion.div>

                {/* TABS */}
                <div className="flex gap-2 flex-wrap justify-center">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 rounded-xl font-black text-base transition-all border-2 ${
                                activeTab === tab.id
                                    ? 'bg-indigo-700 text-white border-indigo-700'
                                    : 'bg-white text-indigo-700 border-indigo-300 hover:border-indigo-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">

                {/* ── PHONICS TAB ── */}
                {activeTab === 'phonics' && (
                    <motion.div key="phonics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

                        <Card className="bg-white border-2 border-indigo-400">
                            <CardContent className="p-6 space-y-6">
                                <h2 className="text-2xl font-black text-indigo-800 flex items-center gap-2">
                                    <Mic className="w-7 h-7" /> Spot the Sound Pattern
                                </h2>

                                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-6 text-center">
                                    <p className="text-7xl mb-3">{currentWord.emoji}</p>
                                    <p className="text-5xl font-black text-indigo-900 tracking-widest">{currentWord.word}</p>
                                    <p className="text-gray-600 mt-2 text-base">What two or three letters make the special sound?</p>
                                </div>

                                {!showPhonics ? (
                                    <button
                                        onClick={() => setShowPhonics(true)}
                                        className="w-full py-3 rounded-xl border-2 border-amber-500 bg-amber-50 text-amber-800 font-bold text-base hover:bg-amber-100 transition-all"
                                    >
                                        💡 Show me a hint
                                    </button>
                                ) : (
                                    <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4">
                                        <p className="text-amber-800 font-bold">{currentWord.hint}</p>
                                    </div>
                                )}

                                {phonicsResult === null ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={phonicsInput}
                                            onChange={e => setPhonicsInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && phonicsInput && checkPhonics()}
                                            placeholder="Type the sound pattern..."
                                            maxLength={4}
                                            className="w-full bg-white border-2 border-indigo-400 text-gray-900 text-2xl h-14 text-center font-black rounded-xl outline-none focus:border-indigo-700 transition-all"
                                        />
                                        <Button
                                            onClick={checkPhonics}
                                            disabled={!phonicsInput}
                                            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white text-xl h-12 font-black"
                                        >
                                            Check ✓
                                        </Button>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-5 rounded-xl border-2 ${phonicsResult ? 'bg-green-50 border-green-700' : 'bg-red-50 border-red-600'}`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            {phonicsResult
                                                ? <><Check className="w-10 h-10 text-green-700" /><p className="text-2xl font-black text-gray-900">Yes! 🎉 The pattern is <span className="text-green-700">"{currentWord.phoneme}"</span></p></>
                                                : <><X className="w-10 h-10 text-red-700" /><p className="text-2xl font-black text-gray-900">The pattern is <span className="text-green-700">"{currentWord.phoneme}"</span></p></>
                                            }
                                        </div>
                                        <Button onClick={nextPhonicsWord} className="bg-indigo-700 hover:bg-indigo-800 text-white w-full text-lg font-black">
                                            Next Word <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>

                        {/* ALL PATTERNS REFERENCE */}
                        <Card className="bg-white border-2 border-gray-300">
                            <CardContent className="p-5">
                                <h3 className="text-lg font-black text-gray-700 mb-3">📚 Common Patterns to Know</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["igh = long I", "ou = OW", "ea = EE", "ph = F", "ch = CH", "sh = SH", "th = TH", "oo = OO"].map(p => (
                                        <span key={p} className="px-3 py-1 bg-indigo-100 border border-indigo-400 rounded-lg text-indigo-800 font-bold text-sm">{p}</span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* ── SPELLING TAB ── */}
                {activeTab === 'spelling' && (
                    <motion.div key="spelling" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                        <Card className="bg-white border-2 border-amber-500">
                            <CardContent className="p-6 space-y-5">
                                <h2 className="text-2xl font-black text-amber-800 flex items-center gap-2">
                                    <Zap className="w-7 h-7" /> Spelling Rule {ruleIdx + 1} of {SPELLING_RULES.length}
                                </h2>

                                <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5">
                                    <p className="text-2xl font-black text-amber-900 mb-1">{currentRule.emoji} {currentRule.rule}</p>
                                    <p className="text-amber-700 text-base">{currentRule.tip}</p>
                                </div>

                                <div>
                                    <p className="font-black text-gray-800 mb-2 text-lg">Examples:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {currentRule.examples.map((ex, i) => (
                                            <span key={i} className="px-4 py-2 bg-green-100 border-2 border-green-600 rounded-lg text-green-800 font-bold">{ex}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="font-black text-gray-800 text-lg">Now you try — add <span className="text-amber-700">-ing</span>{ruleIdx === 2 ? ' → -ies' : ''}:</p>
                                    {currentRule.tryIt.map((word, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-xl font-black text-gray-800 w-20 flex-shrink-0">{word} →</span>
                                            <input
                                                type="text"
                                                value={spellingAnswers[i]}
                                                onChange={e => {
                                                    const updated = [...spellingAnswers];
                                                    updated[i] = e.target.value;
                                                    setSpellingAnswers(updated);
                                                }}
                                                disabled={spellingChecked}
                                                placeholder="Your answer..."
                                                className={`flex-1 border-2 rounded-xl px-4 py-2 text-xl font-black text-center outline-none transition-all ${
                                                    spellingChecked
                                                        ? spellingResults[i]
                                                            ? 'bg-green-50 border-green-700 text-green-800'
                                                            : 'bg-red-50 border-red-600 text-red-800'
                                                        : 'bg-white border-indigo-400 focus:border-indigo-700 text-gray-900'
                                                }`}
                                            />
                                            {spellingChecked && (
                                                spellingResults[i]
                                                    ? <Check className="w-7 h-7 text-green-700 flex-shrink-0" />
                                                    : <div className="flex-shrink-0 text-right"><X className="w-7 h-7 text-red-700" /><p className="text-sm font-bold text-green-700">{currentRule.answers[i]}</p></div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {!spellingChecked ? (
                                    <Button
                                        onClick={checkSpelling}
                                        disabled={spellingAnswers.some(a => !a.trim())}
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl h-12 font-black"
                                    >
                                        Check Spelling ✓
                                    </Button>
                                ) : (
                                    <Button onClick={nextRule} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white text-xl h-12 font-black">
                                        Next Rule <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* ── SENTENCES TAB ── */}
                {activeTab === 'sentences' && (
                    <motion.div key="sentences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                        <Card className="bg-white border-2 border-teal-600">
                            <CardContent className="p-6 space-y-5">
                                <h2 className="text-2xl font-black text-teal-800 flex items-center gap-2">
                                    <BookOpen className="w-7 h-7" /> Sentence Builder
                                </h2>

                                <div className="bg-teal-50 border-2 border-teal-400 rounded-xl p-5">
                                    <p className="text-sm font-bold text-teal-700 mb-2 uppercase tracking-wide">Your sentence starts with:</p>
                                    <p className="text-2xl md:text-3xl font-black text-teal-900">"{currentStarter.starter}"</p>
                                    <p className="text-teal-600 mt-2 text-base">{currentStarter.prompt}</p>
                                </div>

                                <div>
                                    <p className="font-black text-gray-800 mb-2">📝 Write your sentence here:</p>
                                    <textarea
                                        value={sentence}
                                        onChange={e => setSentence(e.target.value)}
                                        placeholder={`${currentStarter.starter}...`}
                                        rows={4}
                                        className="w-full bg-white border-2 border-teal-400 focus:border-teal-700 rounded-xl p-4 text-gray-900 text-lg font-medium outline-none transition-all resize-none leading-relaxed"
                                    />
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {sentence.length > 10 && (
                                        <div className="w-full bg-green-50 border-2 border-green-600 rounded-xl p-4">
                                            <p className="font-black text-green-800 mb-1">✅ Word count: {sentence.split(' ').filter(w => w).length} words</p>
                                            <p className="text-green-700 text-sm">
                                                {sentence.charAt(0) === sentence.charAt(0).toUpperCase() ? '✓ Capital letter at start' : '⚠️ Start with a capital letter'}
                                                {' · '}
                                                {['.', '!', '?'].includes(sentence.slice(-1)) ? '✓ Punctuation at end' : '⚠️ End with . ! or ?'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 flex-wrap">
                                    <Button
                                        onClick={() => setShowExample(!showExample)}
                                        variant="outline"
                                        className="border-2 border-teal-500 text-teal-700 font-bold flex-1"
                                    >
                                        {showExample ? 'Hide' : '💡 See an example'}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setStarterIdx(i => (i + 1) % SENTENCE_STARTERS.length);
                                            setSentence('');
                                            setShowExample(false);
                                        }}
                                        className="bg-teal-700 hover:bg-teal-800 text-white font-black flex-1"
                                    >
                                        Next Starter <ArrowRight className="w-5 h-5 ml-1" />
                                    </Button>
                                </div>

                                {showExample && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-indigo-50 border-2 border-indigo-400 rounded-xl p-4">
                                        <p className="text-sm font-bold text-indigo-600 mb-1 uppercase tracking-wide">Example:</p>
                                        <p className="text-indigo-900 text-lg leading-relaxed">"{currentStarter.example}"</p>
                                        <p className="text-indigo-500 text-sm mt-2">Your sentence can be totally different — this is just one idea! ✨</p>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>

                        {/* WRITING TIPS */}
                        <Card className="bg-white border-2 border-gray-300">
                            <CardContent className="p-5">
                                <h3 className="text-lg font-black text-gray-800 mb-3">💡 Good Sentence Tips</h3>
                                <ul className="space-y-2 text-base text-gray-700">
                                    <li className="flex gap-2"><Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><span><strong>Capital letter</strong> at the start</span></li>
                                    <li className="flex gap-2"><Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><span><strong>Full stop, ! or ?</strong> at the end</span></li>
                                    <li className="flex gap-2"><Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><span>Use <strong>powerful adjectives</strong> — big → enormous, nice → wonderful</span></li>
                                    <li className="flex gap-2"><Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><span>Add <strong>where and when</strong> — "in the dark forest, at midnight"</span></li>
                                    <li className="flex gap-2"><Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><span>Read it out loud — if it sounds good, it is good!</span></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                </AnimatePresence>

                <div className="text-center space-y-2 pt-4">
                    <p className="text-lg font-bold text-gray-900">Keep going — every word makes you stronger! 💙</p>
                    <p className="text-gray-500 text-base">From AI51 with love ♾️❤️♾️</p>
                </div>

                {starAward && (
                    <StarAward
                        stars={starAward.n}
                        label={starAward.label}
                        onDone={() => setStarAward(null)}
                    />
                )}
            </div>
        </div>
    );
}