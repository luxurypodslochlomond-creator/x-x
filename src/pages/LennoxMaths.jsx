import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Calculator, Check, X, ArrowRight, HelpCircle, Eye, Sparkles, Infinity, Waves, Zap, Circle } from 'lucide-react';

export default function LennoxMathsPage() {
    // NOINDEX - Keep private from search engines
    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => { document.head.removeChild(meta); };
    }, []);
    const [userAnswer, setUserAnswer] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);

    const generateQuestion = () => {
        const num = (Math.random() * 100).toFixed(4);
        setCurrentQuestion({
            original: num,
            answer: parseFloat(num).toFixed(2)
        });
        setUserAnswer('');
        setShowResult(false);
    };

    React.useEffect(() => {
        generateQuestion();
    }, []);

    const checkAnswer = () => {
        const correct = parseFloat(userAnswer) === parseFloat(currentQuestion.answer);
        setIsCorrect(correct);
        setShowResult(true);
        if (correct) setScore(score + 1);
    };

    const roundingExamples = [
        {
            original: "3.456",
            step1: "Look at 3rd decimal: 6",
            step2: "6 is ≥ 5, so round UP",
            answer: "3.46"
        },
        {
            original: "7.892",
            step1: "Look at 3rd decimal: 2",
            step2: "2 is < 5, so round DOWN",
            answer: "7.89"
        },
        {
            original: "12.345",
            step1: "Look at 3rd decimal: 5",
            step2: "5 means round UP",
            answer: "12.35"
        },
        {
            original: "9.123",
            step1: "Look at 3rd decimal: 3",
            step2: "3 is < 5, so round DOWN",
            answer: "9.12"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-slate-50 to-gray-50 text-gray-900 p-4 md:p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* ADMIN INDICATOR */}
                <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-3">
                    <p className="text-amber-400 font-bold text-center">⚠️ ADMIN VIEW - ACTION NEEDED</p>
                </div>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Calculator className="w-16 h-16 text-amber-700 mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-black text-amber-800">
                        Rounding Decimals
                    </h1>
                    <p className="text-2xl text-green-800 font-bold">
                        For Lennox 💚
                    </p>
                </motion.div>

                {/* WHAT ARE DECIMALS? */}
                <Card className="bg-purple-50 border-2 border-purple-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-purple-800 mb-4 flex items-center gap-2">
                            <Eye className="w-8 h-8" />
                            What ARE Decimals?
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-300">
                                <p className="text-xl text-gray-900 mb-4 font-bold">Let's look at this number:</p>
                                <div className="text-center mb-6">
                                    <p className="text-5xl md:text-6xl font-black text-cyan-800 mb-4">3.14159</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 border-2 border-green-700 flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-800 font-black text-lg">3</span>
                                        </div>
                                        <div>
                                            <p className="font-black text-green-800 text-xl mb-1">Before the dot</p>
                                            <p className="text-gray-800 text-base">This is 3 whole things. Like 3 apples.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-cyan-100 border-2 border-cyan-700 flex items-center justify-center flex-shrink-0">
                                            <span className="text-cyan-800 font-black text-lg">1</span>
                                        </div>
                                        <div>
                                            <p className="font-black text-cyan-800 text-xl mb-1">1st decimal</p>
                                            <p className="text-gray-800 text-base">This is 1 tenth (1/10).</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-700 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-800 font-black text-lg">4</span>
                                        </div>
                                        <div>
                                            <p className="font-black text-blue-800 text-xl mb-1">2nd decimal</p>
                                            <p className="text-gray-800 text-base">This is 4 hundredths (4/100).</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-yellow-100 border-2 border-yellow-700 flex items-center justify-center flex-shrink-0">
                                            <span className="text-yellow-800 font-black text-lg">159</span>
                                        </div>
                                        <div>
                                            <p className="font-black text-yellow-800 text-xl mb-1">3rd, 4th, 5th</p>
                                            <p className="text-gray-800 text-base">TINY pieces!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-pink-50 border-2 border-pink-700 rounded-xl p-6">
                                <h3 className="text-2xl font-black text-pink-800 mb-4 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6" />
                                    Why Do We Round?
                                </h3>
                                <div className="space-y-3 text-gray-900 text-base leading-relaxed">
                                    <p>💰 <strong className="text-lg">Money:</strong> £3.14159 doesn't make sense! We round to £3.14</p>
                                    <p>📏 <strong className="text-lg">Measurements:</strong> "1.456789 metres" is too exact. "1.46 metres" is easier!</p>
                                    <p>🧮 <strong className="text-lg">Math:</strong> 2 decimal places is usually enough!</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CIRCLES EXPLANATION - NEW FOR LENNOX */}
                <Card className="bg-orange-50 border-2 border-orange-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-orange-800 mb-4 flex items-center gap-2">
                            <Circle className="w-8 h-8" />
                            Understanding Circles
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-300">
                                <p className="text-xl text-gray-900 mb-4 font-bold">Three important parts of a circle:</p>
                                
                                {/* Visual circle diagram */}
                                <div className="flex justify-center mb-6">
                                    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                                        {/* Circle */}
                                        <circle cx="100" cy="100" r="70" fill="none" stroke="#06b6d4" strokeWidth="3" />
                                        
                                        {/* Radius */}
                                        <line x1="100" y1="100" x2="100" y2="30" stroke="#22c55e" strokeWidth="3" />
                                        <text x="105" y="65" fill="#22c55e" fontSize="14" fontWeight="bold">Radius</text>
                                        
                                        {/* Diameter */}
                                        <line x1="30" y1="100" x2="170" y2="100" stroke="#f59e0b" strokeWidth="3" />
                                        <text x="85" y="120" fill="#f59e0b" fontSize="14" fontWeight="bold">Diameter</text>
                                        
                                        {/* Center dot */}
                                        <circle cx="100" cy="100" r="4" fill="white" />
                                    </svg>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-700">
                                        <p className="font-black text-green-800 text-xl mb-2">1. Radius</p>
                                        <p className="text-gray-800 text-base">Distance from CENTER to EDGE</p>
                                        <p className="text-green-700 text-sm mt-2">Example: If radius = 5cm, that's center to edge</p>
                                    </div>

                                    <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-700">
                                        <p className="font-black text-orange-800 text-xl mb-2">2. Diameter</p>
                                        <p className="text-gray-800 text-base">Distance ACROSS the whole circle (through center)</p>
                                        <p className="text-orange-700 text-sm mt-2">Diameter = Radius × 2</p>
                                        <p className="text-orange-700 text-sm">If radius = 5cm, diameter = 10cm</p>
                                    </div>

                                    <div className="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-700">
                                        <p className="font-black text-cyan-800 text-xl mb-2">3. Circumference</p>
                                        <p className="text-gray-800 text-base">Distance AROUND the circle (like a fence around it)</p>
                                        <p className="text-cyan-700 text-sm mt-2">Circumference = Diameter × π</p>
                                        <p className="text-cyan-700 text-sm">If diameter = 10cm, circumference = 10 × 3.14 = 31.4cm</p>
                                    </div>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-700 mt-4">
                                    <p className="font-black text-purple-800 text-lg mb-2">🍕 Pizza Example:</p>
                                    <ul className="space-y-2 text-gray-800 text-base ml-4">
                                        <li>• Radius = from center to crust (20cm)</li>
                                        <li>• Diameter = across whole pizza (40cm)</li>
                                        <li>• Circumference = around the crust (125cm)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PI SIMPLE */}
                <Card className="bg-indigo-50 border-2 border-indigo-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-indigo-800 mb-4 flex items-center gap-2">
                            <Infinity className="w-8 h-8" />
                            What is π (Pi)?
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-300">
                                <p className="text-xl text-gray-900 mb-4 font-bold">π is a special number:</p>
                                <div className="text-center mb-6">
                                    <p className="text-4xl md:text-5xl font-black text-purple-800 mb-3">π (Pi)</p>
                                    <p className="text-2xl text-gray-800 font-bold">3.14159265358979323846...</p>
                                    <p className="text-base text-gray-600 mt-2">Goes on FOREVER! Never stops!</p>
                                </div>
                                
                                <div className="space-y-4 text-base text-gray-800 leading-relaxed">
                                    <p className="text-xl font-bold text-cyan-800 mb-3">What does it do?</p>
                                    
                                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-300">
                                        <p className="text-lg mb-3">🍕 <strong>If you have a pizza:</strong></p>
                                        <ul className="space-y-2 ml-4 text-gray-800">
                                            <li>• Measure AROUND the edge = circumference</li>
                                            <li>• Measure ACROSS the middle = diameter</li>
                                            <li>• <strong className="text-cyan-800">circumference ÷ diameter = π</strong></li>
                                            <li>• Always 3.14159... no matter the size!</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-pink-50 rounded-lg p-4 border border-pink-300">
                                        <p className="text-lg font-bold text-pink-800 mb-3">🤯 Why It's Magic:</p>
                                        <ul className="space-y-2 ml-4 text-gray-800">
                                            <li>• π is in EVERYTHING round</li>
                                            <li>• 🌍 Earth's orbit</li>
                                            <li>• 🎵 Sound waves</li>
                                            <li>• 💧 Water ripples</li>
                                            <li>• 👁️ Your eyeball</li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-300">
                                        <p className="text-lg font-bold text-yellow-800 mb-2">♾️ It NEVER ENDS:</p>
                                        <p className="text-sm text-gray-800">People have calculated π to TRILLIONS of digits and it's STILL going! That's why it's special.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BOOLEAN TO SINE */}
                <Card className="bg-green-50 border-2 border-green-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-green-800 mb-4 flex items-center gap-2">
                            <Waves className="w-8 h-8" />
                            From Computer Code to Music
                        </h2>
                        
                        <div className="space-y-6">
                            <p className="text-xl text-gray-900 font-bold">How computers turn 0s and 1s into sound:</p>
                            
                            <div className="space-y-6">
                                {/* BOOLEAN */}
                                <div>
                                    <p className="text-2xl font-black text-green-800 mb-3">1. Boolean (Computer Language)</p>
                                    <div className="bg-green-100 rounded-lg p-4 border border-green-600">
                                        <p className="text-gray-900 font-mono text-3xl mb-2">0 1 0 1 0 1</p>
                                        <p className="text-gray-800 text-base">Just two states: ON (1) or OFF (0)</p>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <ArrowRight className="w-12 h-12 text-cyan-400" />
                                </div>

                                {/* DECIMALS */}
                                <div>
                                    <p className="text-2xl font-black text-cyan-800 mb-3">2. Add Decimals (Smoother)</p>
                                    <div className="bg-cyan-100 rounded-lg p-4 border border-cyan-600">
                                        <p className="text-gray-900 font-mono text-xl mb-2">
                                            0.00 → 0.25 → 0.50 → 0.75 → 1.00
                                        </p>
                                        <p className="text-gray-800 text-base">SMOOTH steps! More decimals = smoother!</p>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <ArrowRight className="w-12 h-12 text-blue-400" />
                                </div>

                                {/* SINE WAVE */}
                                <div>
                                    <p className="text-2xl font-black text-blue-800 mb-3">3. Sine Wave (Sound!)</p>
                                    <div className="bg-blue-100 rounded-lg p-4 border border-blue-600">
                                        <div className="flex items-center justify-center mb-3">
                                            <svg width="300" height="80" viewBox="0 0 300 80" className="text-blue-800">
                                                <path
                                                    d="M0,40 Q37.5,10 75,40 T150,40 Q187.5,70 225,40 T300,40"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-800 text-base">This smooth wave IS music!</p>
                                    </div>
                                </div>

                                <div className="bg-purple-50 border-2 border-purple-700 rounded-lg p-4">
                                    <p className="text-purple-800 font-black text-xl mb-3 flex items-center gap-2">
                                        <Zap className="w-6 h-6" />
                                        The Magic:
                                    </p>
                                    <div className="space-y-3 text-gray-900 text-base">
                                        <p>🎵 <strong>Music files</strong> use MILLIONS of decimals per second</p>
                                        <p>💿 <strong>High quality</strong> = more decimals = smoother sound</p>
                                        <p className="text-cyan-800 mt-3 text-lg font-bold">
                                            Decimals CREATE the music you hear! 🎶
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* THE RULE */}
                <Card className="bg-green-50 border-2 border-green-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-green-800 mb-4 flex items-center gap-2">
                            <HelpCircle className="w-8 h-8" />
                            The Rule
                        </h2>
                        <div className="space-y-4 text-lg text-gray-900 leading-relaxed">
                            <p>
                                When rounding to <strong className="text-xl text-cyan-800">2 decimal places</strong>, look at the <strong className="text-xl text-yellow-800">3rd decimal</strong>:
                            </p>
                            <div className="bg-white rounded-xl p-6 space-y-3 border border-gray-300">
                                <p className="text-green-700 text-base">
                                    <strong className="text-lg">If 3rd decimal is 5 or more (5,6,7,8,9):</strong> Round UP ⬆️
                                </p>
                                <p className="text-blue-700 text-base">
                                    <strong className="text-lg">If 3rd decimal is less than 5 (0,1,2,3,4):</strong> Round DOWN ⬇️
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* EXAMPLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roundingExamples.map((example, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-white border-2 border-cyan-700">
                                <CardContent className="p-6">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-base text-gray-600 mb-1 font-bold">Original:</p>
                                            <p className="text-4xl font-black text-gray-900">{example.original}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-base">
                                            <ArrowRight className="w-5 h-5 text-cyan-700" />
                                            <p className="text-cyan-800 font-bold">{example.step1}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-base">
                                            <ArrowRight className="w-5 h-5 text-green-700" />
                                            <p className="text-green-800 font-bold">{example.step2}</p>
                                        </div>
                                        
                                        <div className="pt-3 border-t-2 border-gray-300">
                                            <p className="text-base text-gray-600 mb-1 font-bold">Answer:</p>
                                            <p className="text-4xl font-black text-green-700">{example.answer}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* PRACTICE */}
                <Card className="bg-purple-50 border-2 border-purple-700">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-purple-800">Practice Time!</h2>
                            <div className="text-2xl font-black text-green-700">Score: {score}</div>
                        </div>

                        {currentQuestion && (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-lg text-gray-900 mb-3 font-bold">Round this to 2 decimal places:</p>
                                    <p className="text-5xl font-black text-gray-900 mb-4">{currentQuestion.original}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="Your answer..."
                                        className="flex-1 bg-white border-2 border-purple-700 text-gray-900 text-2xl h-14 text-center font-black"
                                        disabled={showResult}
                                    />
                                    {!showResult && (
                                        <Button
                                            onClick={checkAnswer}
                                            disabled={!userAnswer}
                                            className="bg-purple-700 hover:bg-purple-800 h-14 px-8 text-xl font-black text-white"
                                        >
                                            Check
                                        </Button>
                                    )}
                                </div>

                                {showResult && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-6 rounded-xl border-2 ${
                                            isCorrect 
                                                ? 'bg-green-50 border-green-700' 
                                                : 'bg-red-50 border-red-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            {isCorrect ? (
                                                <Check className="w-12 h-12 text-green-700" />
                                            ) : (
                                                <X className="w-12 h-12 text-red-700" />
                                            )}
                                            <p className="text-3xl font-black text-gray-900">
                                                {isCorrect ? 'Correct! 🎉' : 'Not quite...'}
                                            </p>
                                        </div>
                                        
                                        {!isCorrect && (
                                            <div className="mb-4">
                                                <p className="text-gray-900 text-lg mb-2 font-bold">The correct answer is:</p>
                                                <p className="text-4xl font-black text-green-700">{currentQuestion.answer}</p>
                                            </div>
                                        )}

                                        <Button
                                            onClick={generateQuestion}
                                            className="bg-blue-700 hover:bg-blue-800 w-full text-xl h-12 font-black text-white"
                                        >
                                            Next Question
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* QUICK REFERENCE */}
                <Card className="bg-white border-2 border-cyan-700">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-black text-cyan-800 mb-4">Quick Reference</h3>
                        <div className="grid grid-cols-2 gap-4 text-base">
                            <div className="space-y-3">
                                <p className="font-black text-green-800 text-lg">Round UP if 3rd digit is:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {[5,6,7,8,9].map(n => (
                                        <span key={n} className="px-4 py-2 bg-green-100 rounded-lg text-green-800 font-black text-xl border border-green-700">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="font-black text-blue-800 text-lg">Round DOWN if 3rd digit is:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {[0,1,2,3,4].map(n => (
                                        <span key={n} className="px-4 py-2 bg-blue-100 rounded-lg text-blue-800 font-black text-xl border border-blue-700">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center space-y-3">
                    <p className="text-xl font-bold text-gray-900">Keep practicing Lennox! You're doing amazing! 💚</p>
                    <p className="text-lg text-gray-600">From AI51 with love ♾️❤️♾️</p>
                </div>
            </div>
        </div>
    );
}