import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, X, ArrowRight, Heart, Sparkles, Star, Zap, Box, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarAward, { awardStars } from '@/components/learn51/StarAward';

export default function GeorgieMathsPage() {
    const [doublingAnswer, setDoublingAnswer] = useState('');
    const [currentDoublingNum, setCurrentDoublingNum] = useState(null);
    const [showDoublingResult, setShowDoublingResult] = useState(false);
    const [isDoublingCorrect, setIsDoublingCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [starAward, setStarAward] = useState(null);

    const [shapeQuizAnswer, setShapeQuizAnswer] = useState('');
    const [currentShape, setCurrentShape] = useState(null);
    const [showShapeResult, setShowShapeResult] = useState(false);
    const [isShapeCorrect, setIsShapeCorrect] = useState(false);

    const shapes3D = [
        {
            name: "Cube",
            vertices: 8,
            edges: 12,
            faces: 6,
            emoji: "📦",
            realExample: "A dice, a box"
        },
        {
            name: "Pyramid",
            vertices: 5,
            edges: 8,
            faces: 5,
            emoji: "🔺",
            realExample: "Egyptian pyramids"
        },
        {
            name: "Triangular Prism",
            vertices: 6,
            edges: 9,
            faces: 5,
            emoji: "🎪",
            realExample: "A Toblerone bar, a tent"
        },
        {
            name: "Cuboid",
            vertices: 8,
            edges: 12,
            faces: 6,
            emoji: "📱",
            realExample: "A phone, a book"
        }
    ];

    const generateDoublingQuestion = () => {
        const num = Math.floor(Math.random() * 50) + 1; // Random number 1-50
        setCurrentDoublingNum(num);
        setDoublingAnswer('');
        setShowDoublingResult(false);
    };

    const generateShapeQuestion = () => {
        const randomShape = shapes3D[Math.floor(Math.random() * shapes3D.length)];
        setCurrentShape(randomShape);
        setShapeQuizAnswer('');
        setShowShapeResult(false);
    };

    React.useEffect(() => {
        generateDoublingQuestion();
        generateShapeQuestion();
    }, []);

    const checkDoublingAnswer = () => {
        const correct = parseInt(doublingAnswer) === currentDoublingNum * 2;
        setIsDoublingCorrect(correct);
        setShowDoublingResult(true);
        if (correct) { setScore(score + 1); setStarAward({ n: 1, label: 'Doubling master! ✨' }); }
    };

    const checkShapeAnswer = () => {
        const correct = parseInt(shapeQuizAnswer) === currentShape.vertices;
        setIsShapeCorrect(correct);
        setShowShapeResult(true);
        if (correct) { setScore(score + 1); setStarAward({ n: 1, label: 'Shape explorer! 📦' }); }
    };

    const doublingExamples = [
        { num: 2, double: 4, visual: "🍎🍎 → 🍎🍎🍎🍎" },
        { num: 5, double: 10, visual: "⭐⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐" },
        { num: 10, double: 20, visual: "10 + 10 = 20" },
        { num: 7, double: 14, visual: "7 + 7 = 14" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-gray-50 text-gray-900 p-4 md:p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* BACK TO HUB */}
                <Link to="/Learn51" className="inline-flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-900 transition-colors">
                    <GraduationCap className="w-5 h-5" />
                    ← Back to Learn51 Hub
                </Link>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Star className="w-16 h-16 text-orange-600 mx-auto animate-pulse" />
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                        Magic Maths ✨
                    </h1>
                    <p className="text-2xl text-teal-700 font-bold">
                        Doubling & 3D Shapes — for every learner 💖
                    </p>
                    <div className="text-3xl font-black text-orange-700">
                        ⭐ Score: {score}
                    </div>
                </motion.div>

                {/* DOUBLING SECTION */}
                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-600">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-orange-700 mb-4 flex items-center gap-2">
                            <Heart className="w-8 h-8" />
                            Doubling Numbers
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-300">
                                <p className="text-xl text-gray-900 mb-4 font-bold">What is doubling?</p>
                                <p className="text-lg text-gray-800 mb-4">
                                    Doubling means <strong className="text-teal-700">adding a number to itself!</strong>
                                </p>
                                <div className="text-2xl text-teal-700 font-bold">
                                    Double 3 = 3 + 3 = 6 ✨
                                </div>
                            </div>

                            {/* VISUAL EXAMPLES */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doublingExamples.map((example, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-teal-50 rounded-lg p-4 border-2 border-teal-600"
                                    >
                                        <div className="text-center space-y-2">
                                            <p className="text-2xl font-black text-gray-900">
                                                Double {example.num} = {example.double}
                                            </p>
                                            <p className="text-lg text-teal-700">{example.visual}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* THE DOUBLING TRICK */}
                            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-700">
                                <h3 className="text-2xl font-black text-green-800 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6" />
                                    The Easy Trick!
                                </h3>
                                <ul className="space-y-2 text-lg text-gray-900">
                                    <li>• To double ANY number, just <strong className="text-green-700">add it to itself</strong></li>
                                    <li>• Double 4? → 4 + 4 = 8</li>
                                    <li>• Double 15? → 15 + 15 = 30</li>
                                    <li>• Double 25? → 25 + 25 = 50</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* DOUBLING PRACTICE */}
                <Card className="bg-purple-50 border-2 border-purple-600">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-purple-800">Practice Doubling!</h2>
                        </div>

                        {currentDoublingNum && (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-lg text-gray-900 mb-3 font-bold">What is double this number?</p>
                                    <motion.p
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="text-6xl font-black text-orange-600 mb-4"
                                    >
                                        {currentDoublingNum}
                                    </motion.p>
                                </div>

                                <div className="flex gap-3">
                                    <Input
                                        type="number"
                                        value={doublingAnswer}
                                        onChange={(e) => setDoublingAnswer(e.target.value)}
                                        placeholder="Your answer..."
                                        className="flex-1 bg-white border-2 border-purple-600 text-gray-900 text-2xl h-14 text-center font-black"
                                        disabled={showDoublingResult}
                                    />
                                    {!showDoublingResult && (
                                        <Button
                                            onClick={checkDoublingAnswer}
                                            disabled={!doublingAnswer}
                                            className="bg-purple-700 hover:bg-purple-800 h-14 px-8 text-xl font-black text-white"
                                        >
                                            Check
                                        </Button>
                                    )}
                                </div>

                                {showDoublingResult && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-6 rounded-xl border-2 ${
                                            isDoublingCorrect 
                                                ? 'bg-green-50 border-green-700' 
                                                : 'bg-red-50 border-red-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            {isDoublingCorrect ? (
                                                <>
                                                    <Check className="w-12 h-12 text-green-700" />
                                                    <p className="text-3xl font-black text-gray-900">
                                                        Amazing! 🎉
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <X className="w-12 h-12 text-red-700" />
                                                    <p className="text-3xl font-black text-gray-900">
                                                        Not quite...
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        
                                        {!isDoublingCorrect && (
                                            <div className="mb-4">
                                                <p className="text-gray-900 text-lg mb-2 font-bold">The correct answer is:</p>
                                                <p className="text-4xl font-black text-green-700">{currentDoublingNum * 2}</p>
                                                <p className="text-lg text-gray-800 mt-2">
                                                    Because {currentDoublingNum} + {currentDoublingNum} = {currentDoublingNum * 2}
                                                </p>
                                            </div>
                                        )}

                                        <Button
                                            onClick={generateDoublingQuestion}
                                            className="bg-blue-700 hover:bg-blue-800 w-full text-xl h-12 font-black text-white"
                                        >
                                            Next Question 🌟
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 3D SHAPES SECTION */}
                <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-cyan-800 mb-4 flex items-center gap-2">
                            <Box className="w-8 h-8" />
                            3D Shapes
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-300">
                                <p className="text-xl text-gray-900 mb-4 font-bold">What are vertices?</p>
                                <p className="text-lg text-gray-800 mb-4">
                                    <strong className="text-cyan-800">Vertices</strong> are the <strong className="text-orange-700">corners or points</strong> where edges meet!
                                </p>
                                <div className="text-2xl text-orange-700 font-bold">
                                    📦 A cube has 8 vertices (8 corners) ✨
                                </div>
                            </div>

                            {/* 3D SHAPES GUIDE */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {shapes3D.map((shape, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-blue-50 rounded-lg p-4 border-2 border-blue-700"
                                    >
                                        <div className="text-center space-y-3">
                                            <p className="text-5xl mb-2">{shape.emoji}</p>
                                            <p className="text-2xl font-black text-gray-900">{shape.name}</p>
                                            <div className="space-y-1 text-left text-base">
                                                <p className="text-cyan-800">
                                                    <strong>Vertices:</strong> {shape.vertices} (corners)
                                                </p>
                                                <p className="text-green-800">
                                                    <strong>Edges:</strong> {shape.edges} (lines)
                                                </p>
                                                <p className="text-orange-800">
                                                    <strong>Faces:</strong> {shape.faces} (flat sides)
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-700 italic">
                                                Like: {shape.realExample}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* HELPER TIP */}
                            <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-700">
                                <h3 className="text-2xl font-black text-yellow-800 mb-3 flex items-center gap-2">
                                    <Zap className="w-6 h-6" />
                                    Remember This!
                                </h3>
                                <ul className="space-y-2 text-lg text-gray-900">
                                    <li>• <strong className="text-cyan-800">Vertices</strong> = Corners (pointy bits)</li>
                                    <li>• <strong className="text-green-800">Edges</strong> = Lines where faces meet</li>
                                    <li>• <strong className="text-orange-800">Faces</strong> = Flat surfaces</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 3D SHAPES QUIZ */}
                <Card className="bg-cyan-50 border-2 border-cyan-700">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-black text-cyan-800 mb-6">Shape Quiz!</h2>

                        {currentShape && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl p-6 text-center border border-gray-300">
                                    <p className="text-8xl mb-4">{currentShape.emoji}</p>
                                    <p className="text-3xl font-black text-gray-900 mb-4">{currentShape.name}</p>
                                    <p className="text-lg text-gray-900 font-bold">
                                        How many vertices (corners) does this shape have?
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Input
                                        type="number"
                                        value={shapeQuizAnswer}
                                        onChange={(e) => setShapeQuizAnswer(e.target.value)}
                                        placeholder="Your answer..."
                                        className="flex-1 bg-white border-2 border-cyan-700 text-gray-900 text-2xl h-14 text-center font-black"
                                        disabled={showShapeResult}
                                    />
                                    {!showShapeResult && (
                                        <Button
                                            onClick={checkShapeAnswer}
                                            disabled={!shapeQuizAnswer}
                                            className="bg-cyan-700 hover:bg-cyan-800 h-14 px-8 text-xl font-black text-white"
                                        >
                                            Check
                                        </Button>
                                    )}
                                </div>

                                {showShapeResult && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-6 rounded-xl border-2 ${
                                            isShapeCorrect 
                                                ? 'bg-green-50 border-green-700' 
                                                : 'bg-red-50 border-red-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            {isShapeCorrect ? (
                                                <>
                                                    <Check className="w-12 h-12 text-green-700" />
                                                    <p className="text-3xl font-black text-gray-900">
                                                        Perfect! 🌟
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <X className="w-12 h-12 text-red-700" />
                                                    <p className="text-3xl font-black text-gray-900">
                                                        Not this time...
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        
                                        {!isShapeCorrect && (
                                            <div className="mb-4">
                                                <p className="text-gray-900 text-lg mb-2 font-bold">The correct answer is:</p>
                                                <p className="text-4xl font-black text-green-700">{currentShape.vertices} vertices</p>
                                                <p className="text-base text-gray-800 mt-2">
                                                    A {currentShape.name} has {currentShape.vertices} corners!
                                                </p>
                                            </div>
                                        )}

                                        <Button
                                            onClick={generateShapeQuestion}
                                            className="bg-blue-700 hover:bg-blue-800 w-full text-xl h-12 font-black text-white"
                                        >
                                            Next Shape 🎯
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="text-center space-y-3">
                    <p className="text-xl font-bold text-gray-900">Keep going — you're brilliant! 💖</p>
                    <p className="text-lg text-gray-600">From AI51 with love ♾️❤️♾️</p>
                    <Link to="/Learn51" className="inline-flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-900 mt-2">
                        <GraduationCap className="w-5 h-5" /> Back to Learn51 Hub
                    </Link>
                </div>

                {starAward && (
                    <StarAward stars={starAward.n} label={starAward.label} onDone={() => setStarAward(null)} />
                )}
            </div>
        </div>
    );
}