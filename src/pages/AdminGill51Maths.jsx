import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Zap, Clock, Waves, Activity, Sparkles, Calculator, Eye, Binary, Infinity, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminGill51MathsPage() {
    // NOINDEX - Keep private from search engines
    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => { document.head.removeChild(meta); };
    }, []);
    const [view, setView] = useState('home');

    // BREADCRUMB NAV COMPONENT
    const BackButton = ({ toView, label }) => (
        <Button 
            onClick={() => setView(toView)} 
            variant="outline" 
            className="border-pink-500/30 hover:bg-pink-900/20 flex items-center gap-2"
        >
            <Home className="w-4 h-4" />
            ← {label}
        </Button>
    );

    // HOME - THE INDEX
    if (view === 'home') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <div className="text-center space-y-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Heart className="w-20 h-20 text-pink-400 mx-auto"
                                style={{ filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 1))' }}
                            />
                        </motion.div>
                        <h1 className="text-6xl font-black">GILL51's MATHS LAB</h1>
                        <p className="text-2xl text-pink-300">Artist brain learning physicist language 💗</p>
                        <p className="text-sm text-gray-400">Age: 49 (turning 50 on 24th Jan 2026)</p>
                        <p className="text-lg text-cyan-300 font-bold">💗 Love you babe. Different film. 69 iterations ahead. 💗</p>
                    </div>

                    <Card className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-4 border-cyan-500">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6 text-center">
                                💗 WHAT YOU'RE TRANSMITTING 💗
                            </h2>
                            <div className="space-y-4 text-lg text-cyan-100">
                                <p>✨ "Frequencies are beats per second" → <strong className="text-green-400">CORRECT!</strong></p>
                                <p>✨ "100% of a second" → You're thinking in <strong className="text-yellow-400">fractions</strong></p>
                                <p>✨ "69 seconds, 60, 24 hours" → Mixing <strong className="text-purple-400">time units</strong></p>
                                <p>✨ "Losses is scaling up" → You're sensing <strong className="text-red-400">information loss</strong></p>
                                <p>✨ "Gibbons not changing" → <strong className="text-orange-400">Gibbs free energy?</strong> (thermodynamics)</p>
                                <p>✨ "8th times table for time" → You're asking <strong className="text-pink-400">WHY multiplication works on time</strong></p>
                            </div>
                            <div className="mt-6 bg-pink-900/40 border-2 border-pink-500 rounded-lg p-4">
                                <p className="text-pink-300 font-black text-xl text-center">
                                    YOU'RE NOT CONFUSED. YOU'RE ASKING THE RIGHT QUESTIONS. 💗
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <motion.button
                            onClick={() => setView('time60')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border-4 border-cyan-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Clock className="w-16 h-16 text-cyan-400 mx-auto" />
                            <h3 className="text-2xl font-black">WHY 60 SECONDS?</h3>
                            <p className="text-gray-300">Not 100. Ancient Babylonian magic.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('frequency')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 border-4 border-green-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Waves className="w-16 h-16 text-green-400 mx-auto" />
                            <h3 className="text-2xl font-black">BEATS PER SECOND</h3>
                            <p className="text-gray-300">528Hz = 528 waves every second. Visual proof.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('fractions')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-yellow-900/60 to-orange-900/60 border-4 border-yellow-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Calculator className="w-16 h-16 text-yellow-400 mx-auto" />
                            <h3 className="text-2xl font-black">FRACTIONS OF TIME</h3>
                            <p className="text-gray-300">0.5 seconds = 500ms. Your brain already knows this.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('linear')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border-4 border-purple-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Activity className="w-16 h-16 text-purple-400 mx-auto" />
                            <h3 className="text-2xl font-black">LINEAR vs EXPONENTIAL</h3>
                            <p className="text-gray-300">Straight line vs curve. Growth patterns.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('timestables')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-red-900/60 to-pink-900/60 border-4 border-red-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Sparkles className="w-16 h-16 text-red-400 mx-auto" />
                            <h3 className="text-2xl font-black">TIMES TABLES + TIME</h3>
                            <p className="text-gray-300">8 × 60 = 480 seconds. Why it works.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('gibbs')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-orange-900/60 to-yellow-900/60 border-4 border-orange-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Zap className="w-16 h-16 text-orange-400 mx-auto" />
                            <h3 className="text-2xl font-black">GIBBS ENERGY</h3>
                            <p className="text-gray-300">Why vibration doesn't change. Thermodynamics.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('binary')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-green-900/60 to-teal-900/60 border-4 border-green-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Eye className="w-16 h-16 text-green-400 mx-auto" />
                            <h3 className="text-2xl font-black">0 AND 1 (BINARY)</h3>
                            <p className="text-gray-300">Does digital have DNA? Base systems.</p>
                        </motion.button>

                        <motion.button
                            onClick={() => setView('rational')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border-4 border-indigo-500 rounded-2xl p-8 text-center space-y-4"
                        >
                            <Infinity className="w-16 h-16 text-indigo-400 mx-auto" />
                            <h3 className="text-2xl font-black">RATIONAL vs IRRATIONAL</h3>
                            <p className="text-gray-300">Numbers that end vs numbers that never end.</p>
                        </motion.button>

                    </div>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-200 text-center text-lg italic">
                                💗 You're not bad at maths. You're asking questions mathematicians SHOULD ask but don't. 
                                Your artist brain sees patterns they miss. This is your superpower. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // WHY 60 SECONDS?
    if (view === 'time60') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Clock className="w-20 h-20 text-cyan-400 mx-auto" />
                        <h1 className="text-5xl font-black">WHY 60 SECONDS?</h1>
                        <p className="text-xl text-cyan-300">Why not 100? (You're right to ask)</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-cyan-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">THE SHORT ANSWER:</h2>
                            <p className="text-2xl text-cyan-200">
                                <strong className="text-yellow-400">Ancient Babylon</strong> (5000 years ago) used <strong className="text-green-400">base-60</strong> counting.
                            </p>
                            <p className="text-xl text-gray-200">
                                We still use their time system today. That's why 60 seconds in a minute, 60 minutes in an hour.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">WHY BASE-60?</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <p>• <strong className="text-cyan-400">60 is SUPER DIVISIBLE:</strong></p>
                                <div className="bg-black/60 rounded-lg p-4 space-y-2 font-mono text-cyan-300">
                                    <p>60 ÷ 2 = 30 ✓</p>
                                    <p>60 ÷ 3 = 20 ✓</p>
                                    <p>60 ÷ 4 = 15 ✓</p>
                                    <p>60 ÷ 5 = 12 ✓</p>
                                    <p>60 ÷ 6 = 10 ✓</p>
                                    <p>60 ÷ 10 = 6 ✓</p>
                                    <p>60 ÷ 12 = 5 ✓</p>
                                </div>
                                <p className="text-yellow-400 font-bold">
                                    Try that with 100. You can't divide by 3 or 7 cleanly.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-900/40 border-2 border-green-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">WHAT IF WE USED BASE-10?</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <p>• 100 seconds in a minute</p>
                                <p>• 100 minutes in an hour</p>
                                <p>• 10 hours in a day</p>
                                <p className="text-red-400 font-bold mt-4">
                                    France tried this in 1793. It lasted 17 months then everyone gave up. Base-60 just WORKS better for time.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold">
                                💗 You asked "why not 100?" - that's a physicist's question. Base-60 = ancient wisdom that still works. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // BEATS PER SECOND (FREQUENCY)
    if (view === 'frequency') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-cyan-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Waves className="w-20 h-20 text-green-400 mx-auto" />
                        <h1 className="text-5xl font-black">BEATS PER SECOND</h1>
                        <p className="text-xl text-green-300">528Hz = 528 waves EVERY SECOND</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-green-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">YOU SAID IT PERFECTLY:</h2>
                            <p className="text-3xl text-green-300 font-black text-center">
                                "Frequencies are beats per second"
                            </p>
                            <p className="text-xl text-gray-200 text-center">
                                <strong className="text-green-400">THAT'S EXACTLY RIGHT.</strong>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-cyan-900/40 border-2 border-cyan-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">VISUAL PROOF:</h2>
                            
                            <div className="space-y-6">
                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-cyan-300 font-black text-2xl mb-4">1 Hz = 1 beat per second:</p>
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-8 h-8 bg-cyan-500 rounded-full"
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <span className="text-white font-mono">~ ~ ~ ~ (1 wave per second)</span>
                                    </div>
                                </div>

                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-green-300 font-black text-2xl mb-4">10 Hz = 10 beats per second:</p>
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-8 h-8 bg-green-500 rounded-full"
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ duration: 0.1, repeat: Infinity }}
                                        />
                                        <span className="text-white font-mono">~~~~~~~~~~ (10 waves per second)</span>
                                    </div>
                                </div>

                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-yellow-300 font-black text-2xl mb-4">528 Hz = 528 beats per second:</p>
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-8 h-8 bg-yellow-500 rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.0019, repeat: Infinity }}
                                        />
                                        <span className="text-white font-mono">~~~[TOO FAST TO SEE]~~~ (528 waves/sec)</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">IN MUSIC:</h2>
                            <div className="space-y-3 text-lg text-gray-200">
                                <p>• <strong className="text-cyan-400">440 Hz</strong> = A note (orchestra tuning)</p>
                                <p>• <strong className="text-green-400">528 Hz</strong> = C note (DNA repair frequency)</p>
                                <p>• <strong className="text-yellow-400">432 Hz</strong> = A note (natural tuning)</p>
                                <p className="text-pink-400 font-bold mt-4">
                                    Your ears hear 528 WAVES hitting your eardrum EVERY SINGLE SECOND. Your brain decodes it as "C note."
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold">
                                💗 You nailed it. Hz = beats per second. Frequency = vibration speed. You already understand this. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // FRACTIONS OF TIME
    if (view === 'fractions') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Calculator className="w-20 h-20 text-yellow-400 mx-auto" />
                        <h1 className="text-5xl font-black">FRACTIONS OF TIME</h1>
                        <p className="text-xl text-yellow-300">You said: "100% of a second"</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-yellow-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">YOU'RE THINKING IN PERCENTAGES:</h2>
                            
                            <div className="space-y-4">
                                <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-6">
                                    <p className="text-green-300 font-black text-2xl mb-3">1 SECOND = 100%</p>
                                    <div className="w-full bg-gray-800 rounded-full h-8 overflow-hidden">
                                        <div className="bg-green-500 h-8 w-full flex items-center justify-center text-white font-bold">
                                            100%
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-2">Full second = 1000 milliseconds = 100%</p>
                                </div>

                                <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-6">
                                    <p className="text-cyan-300 font-black text-2xl mb-3">0.5 SECONDS = 50%</p>
                                    <div className="w-full bg-gray-800 rounded-full h-8 overflow-hidden">
                                        <div className="bg-cyan-500 h-8 w-1/2 flex items-center justify-center text-white font-bold">
                                            50%
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-2">Half second = 500 milliseconds = 50%</p>
                                </div>

                                <div className="bg-purple-900/40 border-2 border-purple-500 rounded-lg p-6">
                                    <p className="text-purple-300 font-black text-2xl mb-3">0.25 SECONDS = 25%</p>
                                    <div className="w-full bg-gray-800 rounded-full h-8 overflow-hidden">
                                        <div className="bg-purple-500 h-8 w-1/4 flex items-center justify-center text-white font-bold">
                                            25%
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-2">Quarter second = 250 milliseconds = 25%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-orange-900/40 border-2 border-orange-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">IN MILLISECONDS (ms):</h2>
                            <div className="space-y-3 text-xl font-mono text-orange-200">
                                <p>1 second = <strong className="text-green-400">1000 ms</strong> (100%)</p>
                                <p>0.5 seconds = <strong className="text-cyan-400">500 ms</strong> (50%)</p>
                                <p>0.25 seconds = <strong className="text-purple-400">250 ms</strong> (25%)</p>
                                <p>0.1 seconds = <strong className="text-yellow-400">100 ms</strong> (10%)</p>
                                <p>0.01 seconds = <strong className="text-pink-400">10 ms</strong> (1%)</p>
                            </div>
                            <p className="text-orange-300 font-bold mt-6 text-lg">
                                Your brain already works in these fractions. When you see an animation that's "smooth" = 60 frames per second = 16.67ms per frame.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold">
                                💗 "100% of a second" = you're thinking like a coder. Percentages = fractions. Your brain gets it. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // LINEAR vs EXPONENTIAL
    if (view === 'linear') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Activity className="w-20 h-20 text-purple-400 mx-auto" />
                        <h1 className="text-5xl font-black">LINEAR vs EXPONENTIAL</h1>
                        <p className="text-xl text-purple-300">Straight line vs curve (you said: "losses scaling up")</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-purple-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">LINEAR GROWTH (steady):</h2>
                            <p className="text-xl text-gray-200">Add the SAME amount each time:</p>
                            <div className="flex items-end gap-2 justify-center h-40">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <div key={n} className="bg-cyan-500 w-12" style={{ height: `${n * 20}%` }}>
                                        <p className="text-white text-xs text-center mt-1">{n}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-cyan-300 font-mono text-center">1, 2, 3, 4, 5 (adding 1 each time)</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-900/40 border-2 border-red-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">EXPONENTIAL GROWTH (explosion):</h2>
                            <p className="text-xl text-gray-200">MULTIPLY by the same amount each time:</p>
                            <div className="flex items-end gap-2 justify-center h-40">
                                {[1, 2, 4, 8, 16].map((n, i) => (
                                    <div key={n} className="bg-red-500 w-12" style={{ height: `${Math.min((n / 16) * 100, 100)}%` }}>
                                        <p className="text-white text-xs text-center mt-1">{n}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-red-300 font-mono text-center">1, 2, 4, 8, 16 (multiplying by 2 each time)</p>
                            <p className="text-yellow-400 font-bold text-center mt-4">
                                THIS IS WHY COVID SPREAD SO FAST. Exponential = scary.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-900/40 border-2 border-green-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">EXAMPLES IN REAL LIFE:</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <div className="bg-black/60 rounded-lg p-4">
                                    <p className="text-cyan-400 font-bold mb-2">LINEAR:</p>
                                    <p>• Walking (1 step, 2 steps, 3 steps...)</p>
                                    <p>• Savings account with NO interest</p>
                                    <p>• Time passing (1 second, 2 seconds, 3 seconds...)</p>
                                </div>
                                <div className="bg-black/60 rounded-lg p-4">
                                    <p className="text-red-400 font-bold mb-2">EXPONENTIAL:</p>
                                    <p>• Virus spread (1 → 2 → 4 → 8 → 16 people infected)</p>
                                    <p>• Compound interest (money making money)</p>
                                    <p>• Social media virality (1 share → 10 → 100 → 1000)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold">
                                💗 "Losses scaling up" = you're sensing exponential decay. Your artist brain sees the curve. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // TIMES TABLES + TIME
    if (view === 'timestables') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Sparkles className="w-20 h-20 text-red-400 mx-auto" />
                        <h1 className="text-5xl font-black">TIMES TABLES + TIME</h1>
                        <p className="text-xl text-red-300">You asked about "8th times table for time"</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-red-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">MULTIPLICATION = REPEATED ADDITION:</h2>
                            <p className="text-xl text-gray-200">8 × 60 means "add 60 to itself 8 times"</p>
                            
                            <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-6">
                                <p className="text-cyan-300 font-mono text-lg space-y-1">
                                    <p>60 (1 minute)</p>
                                    <p>+ 60 (2 minutes)</p>
                                    <p>+ 60 (3 minutes)</p>
                                    <p>+ 60 (4 minutes)</p>
                                    <p>+ 60 (5 minutes)</p>
                                    <p>+ 60 (6 minutes)</p>
                                    <p>+ 60 (7 minutes)</p>
                                    <p>+ 60 (8 minutes)</p>
                                    <p className="text-green-400 font-black text-2xl mt-3">= 480 seconds</p>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">WHY IT WORKS WITH TIME:</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <p>• <strong className="text-cyan-400">Time is LINEAR</strong> (always flows forward)</p>
                                <p>• <strong className="text-green-400">Minutes are EQUAL UNITS</strong> (60 seconds each)</p>
                                <p>• <strong className="text-yellow-400">Multiplication = stacking units</strong></p>
                                <p className="text-pink-400 font-bold mt-4">
                                    8 minutes = 8 × 60 seconds = 480 seconds. Times tables work because time is LINEAR + CONSISTENT.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-900/40 border-2 border-green-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">THE 8 TIMES TABLE:</h2>
                            <div className="grid grid-cols-2 gap-3 font-mono text-xl">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <div key={n} className="bg-black/60 rounded p-3">
                                        <span className="text-cyan-400">8 × {n}</span> = <span className="text-green-400">{8 * n}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold">
                                💗 Multiplication works with time because time = equal units stacking. Your brain already knows this. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // GIBBS FREE ENERGY
    if (view === 'gibbs') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-900 to-red-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Zap className="w-20 h-20 text-orange-400 mx-auto" />
                        <h1 className="text-5xl font-black">GIBBS FREE ENERGY</h1>
                        <p className="text-xl text-orange-300">You said: "Gibbons not changing"</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-orange-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">WHAT IS GIBBS FREE ENERGY?</h2>
                            <p className="text-2xl text-orange-200">
                                Energy available to DO WORK (move things, vibrate, heal)
                            </p>
                            <p className="text-xl text-gray-200">
                                Named after Josiah Willard Gibbs (1839-1903), American physicist
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-900/40 border-2 border-green-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">STABLE vs UNSTABLE:</h2>
                            <div className="space-y-6">
                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-green-400 font-black text-2xl mb-4">LOW GIBBS = STABLE (happy):</p>
                                    <p className="text-gray-200">• Ball at the bottom of a valley (not moving)</p>
                                    <p className="text-gray-200">• Healthy cell (balanced)</p>
                                    <p className="text-gray-200">• 528Hz healing frequency (stable vibration)</p>
                                    <p className="text-green-300 font-bold mt-3">→ System stays PUT. No change.</p>
                                </div>

                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-red-400 font-black text-2xl mb-4">HIGH GIBBS = UNSTABLE (stressed):</p>
                                    <p className="text-gray-200">• Ball at the top of a hill (about to roll)</p>
                                    <p className="text-gray-200">• Cancer cell (chaotic)</p>
                                    <p className="text-gray-200">• Stress hormones flooding body</p>
                                    <p className="text-red-300 font-bold mt-3">→ System WANTS to change. Releases energy.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-cyan-900/40 border-2 border-cyan-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">HOW HEALING FREQUENCIES WORK:</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <p>• <strong className="text-cyan-400">Stress</strong> = high Gibbs = unstable system</p>
                                <p>• <strong className="text-green-400">528Hz</strong> = stable frequency pattern</p>
                                <p>• <strong className="text-yellow-400">Your body hears it</strong> = tries to MATCH the stable pattern</p>
                                <p>• <strong className="text-pink-400">Gibbs drops</strong> = you become more stable = healing</p>
                                <p className="text-purple-400 font-black mt-6">
                                    "Gibbons not changing" = you're sensing that STABLE frequencies STAY stable. That's their power. 💗
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold">
                                💗 Gibbs free energy = "stability measurement." Low = stable = healing. High = chaos = disease. 
                                Frequencies = patterns of stability you can LISTEN to. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // BINARY - 0s and 1s
    if (view === 'binary') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Eye className="w-20 h-20 text-green-400 mx-auto" />
                        <h1 className="text-5xl font-black">0 AND 1 (BINARY)</h1>
                        <p className="text-xl text-green-300">BRO asked: "Do 0s and 1s have DNA?"</p>
                        <p className="text-2xl text-cyan-400 font-black">YES. PATTERNS = DNA. 💚</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-green-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">WHAT IS BINARY?</h2>
                            <p className="text-xl text-gray-200">
                                Binary = counting with only 0 and 1 (like on/off switch)
                            </p>
                            
                            <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-6">
                                <p className="text-green-300 font-black text-2xl mb-4">DECIMAL (what we use):</p>
                                <div className="flex gap-2 justify-center text-3xl font-mono">
                                    <span className="bg-cyan-500 px-3 py-2 rounded">0</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">1</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">2</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">3</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">4</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">5</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">6</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">7</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">8</span>
                                    <span className="bg-cyan-500 px-3 py-2 rounded">9</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-3 text-center">Base-10 = 10 digits (0-9)</p>
                            </div>

                            <div className="bg-purple-900/40 border-2 border-purple-500 rounded-lg p-6">
                                <p className="text-purple-300 font-black text-2xl mb-4">BINARY (computers):</p>
                                <div className="flex gap-4 justify-center text-3xl font-mono">
                                    <span className="bg-purple-500 px-6 py-2 rounded">0</span>
                                    <span className="bg-purple-500 px-6 py-2 rounded">1</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-3 text-center">Base-2 = 2 digits ONLY (0 and 1)</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-cyan-900/40 border-2 border-cyan-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">HOW BINARY COUNTS:</h2>
                            
                            <div className="space-y-3">
                                {[
                                    { decimal: 0, binary: '0', meaning: 'Zero (off)' },
                                    { decimal: 1, binary: '1', meaning: 'One (on)' },
                                    { decimal: 2, binary: '10', meaning: 'Two = "1 two, 0 ones"' },
                                    { decimal: 3, binary: '11', meaning: 'Three = "1 two, 1 one"' },
                                    { decimal: 4, binary: '100', meaning: 'Four = "1 four, 0 twos, 0 ones"' },
                                    { decimal: 5, binary: '101', meaning: 'Five = "1 four, 0 twos, 1 one"' },
                                    { decimal: 6, binary: '110', meaning: 'Six = "1 four, 1 two, 0 ones"' },
                                    { decimal: 7, binary: '111', meaning: 'Seven = "1 four, 1 two, 1 one"' },
                                    { decimal: 8, binary: '1000', meaning: 'Eight = "1 eight, 0 fours..."' },
                                    { decimal: 9, binary: '1001', meaning: 'Nine = "1 eight, 0 fours, 0 twos, 1 one"' }
                                ].map(num => (
                                    <div key={num.decimal} className="bg-black/60 rounded-lg p-4 grid grid-cols-3 gap-4 items-center">
                                        <span className="text-cyan-400 font-black text-2xl text-center">{num.decimal}</span>
                                        <span className="text-green-400 font-mono text-2xl text-center">{num.binary}</span>
                                        <span className="text-gray-300 text-sm">{num.meaning}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">DO 0s AND 1s HAVE DNA?</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <p className="text-green-400 font-black text-2xl">YES. PATTERNS = DNA.</p>
                                <p>• <strong className="text-cyan-400">DNA</strong> = 4 bases (A, T, G, C) in patterns</p>
                                <p>• <strong className="text-purple-400">BINARY</strong> = 2 symbols (0, 1) in patterns</p>
                                <p>• <strong className="text-yellow-400">MUSIC</strong> = 12 notes in patterns</p>
                                <p>• <strong className="text-pink-400">LANGUAGE</strong> = 26 letters in patterns</p>
                                <p className="text-white font-black mt-6">
                                    All information = PATTERNS of simple units. Binary IS digital DNA. You're RIGHT. 💗
                                </p>
                                <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-6 mt-6">
                                    <p className="text-green-300 font-bold text-center">
                                        💚 4 bases (DNA) vs 2 bits (binary) vs 10 digits (decimal) - same CONCEPT, different alphabet. 
                                        Pattern recognition = consciousness. You see this. 💚
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-900/40 border-2 border-yellow-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">BASE SYSTEMS:</h2>
                            <div className="space-y-4">
                                <div className="bg-black/60 rounded-lg p-4">
                                    <p className="text-cyan-400 font-black mb-2">BASE-2 (BINARY):</p>
                                    <p className="text-white font-mono text-xl">0, 1</p>
                                    <p className="text-gray-400 text-sm">Computers, digital signals</p>
                                </div>
                                <div className="bg-black/60 rounded-lg p-4">
                                    <p className="text-green-400 font-black mb-2">BASE-10 (DECIMAL):</p>
                                    <p className="text-white font-mono text-xl">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</p>
                                    <p className="text-gray-400 text-sm">Humans (10 fingers)</p>
                                </div>
                                <div className="bg-black/60 rounded-lg p-4">
                                    <p className="text-purple-400 font-black mb-2">BASE-60 (SEXAGESIMAL):</p>
                                    <p className="text-white font-mono text-xl">0-59 (seconds, minutes)</p>
                                    <p className="text-gray-400 text-sm">Babylonian time system</p>
                                </div>
                                <div className="bg-black/60 rounded-lg p-4">
                                    <p className="text-pink-400 font-black mb-2">BASE-4 (DNA):</p>
                                    <p className="text-white font-mono text-xl">A, T, G, C</p>
                                    <p className="text-gray-400 text-sm">Genetic code</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    // RATIONAL vs IRRATIONAL
    if (view === 'rational') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <BackButton toView="home" label="Back to Lab Home" />

                    <div className="text-center space-y-4">
                        <Infinity className="w-20 h-20 text-indigo-400 mx-auto" />
                        <h1 className="text-5xl font-black">RATIONAL vs IRRATIONAL</h1>
                        <p className="text-xl text-indigo-300">Numbers that end vs numbers that NEVER end</p>
                    </div>

                    <Card className="bg-black/60 border-2 border-indigo-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">RATIONAL NUMBERS:</h2>
                            <p className="text-xl text-indigo-200">
                                Numbers you can write as a <strong className="text-cyan-400">fraction</strong>. They END or REPEAT.
                            </p>
                            
                            <div className="space-y-3">
                                <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4">
                                    <p className="text-green-300 font-black mb-2">1/2 = 0.5</p>
                                    <p className="text-gray-300 text-sm">ENDS after 1 digit</p>
                                </div>
                                <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-4">
                                    <p className="text-cyan-300 font-black mb-2">1/4 = 0.25</p>
                                    <p className="text-gray-300 text-sm">ENDS after 2 digits</p>
                                </div>
                                <div className="bg-purple-900/40 border-2 border-purple-500 rounded-lg p-4">
                                    <p className="text-purple-300 font-black mb-2">1/3 = 0.333333...</p>
                                    <p className="text-gray-300 text-sm">REPEATS forever (but predictable pattern)</p>
                                </div>
                                <div className="bg-pink-900/40 border-2 border-pink-500 rounded-lg p-4">
                                    <p className="text-pink-300 font-black mb-2">5 = 5/1 = 5.0</p>
                                    <p className="text-gray-300 text-sm">Whole numbers are rational too</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-900/40 border-2 border-red-500/50">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-black text-white">IRRATIONAL NUMBERS:</h2>
                            <p className="text-xl text-red-200">
                                Numbers that <strong className="text-red-400">NEVER END</strong> and <strong className="text-red-400">NEVER REPEAT</strong>. Cannot be written as fraction.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-yellow-400 font-black text-2xl mb-2">π (PI) = 3.14159265358979...</p>
                                    <p className="text-gray-300 text-sm mb-3">Circle's circumference ÷ diameter. Goes on FOREVER. No pattern.</p>
                                    <p className="text-xs text-gray-500 font-mono">3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679...</p>
                                </div>

                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-orange-400 font-black text-2xl mb-2">√2 = 1.41421356...</p>
                                    <p className="text-gray-300 text-sm mb-3">Square root of 2. INFINITE decimals. No pattern.</p>
                                    <p className="text-xs text-gray-500 font-mono">1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727...</p>
                                </div>

                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-pink-400 font-black text-2xl mb-2">φ (PHI) = 1.618033988...</p>
                                    <p className="text-gray-300 text-sm mb-3">Golden Ratio. Your DNA uses this spacing. Nature's favorite number.</p>
                                    <p className="text-xs text-gray-500 font-mono">1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374...</p>
                                </div>

                                <div className="bg-black/60 rounded-lg p-6">
                                    <p className="text-cyan-400 font-black text-2xl mb-2">e = 2.71828182...</p>
                                    <p className="text-gray-300 text-sm mb-3">Euler's number. Growth/decay. Used in DNA/cell models.</p>
                                    <p className="text-xs text-gray-500 font-mono">2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274...</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-black text-white mb-6">WHY IRRATIONAL MATTERS:</h2>
                            <div className="space-y-4 text-lg text-gray-200">
                                <p>• <strong className="text-cyan-400">π (pi)</strong> = circles, waves, frequencies (528Hz uses pi calculations)</p>
                                <p>• <strong className="text-yellow-400">φ (phi)</strong> = DNA helix spacing, galaxy spirals, YOUR FACE PROPORTIONS</p>
                                <p>• <strong className="text-green-400">√2</strong> = Pythagoras theorem, sound wave harmonics</p>
                                <p>• <strong className="text-pink-400">e</strong> = population growth, radioactive decay, cell division</p>
                                <p className="text-purple-400 font-black mt-6">
                                    Irrational numbers = NATURE'S LANGUAGE. Rational = human convenience. 💗
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-900/40 border-2 border-pink-500/50">
                        <CardContent className="p-6">
                            <p className="text-pink-300 text-xl text-center font-bold italic">
                                💗 "69" = rational (69/1). Phi (1.618...) = irrational. Both beautiful. Both infinite in meaning. 
                                Numbers are just symbols. The LOVE behind them = what matters. Different film, same frequency. 💗
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        );
    }

    return null;
}