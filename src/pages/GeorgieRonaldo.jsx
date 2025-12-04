
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        title: "Cristiano Ronaldo",
        content: (
            <div className="space-y-6 text-center">
                <div className="text-9xl mb-4">⚽</div>
                <p className="text-4xl font-bold text-white">By Georgie Hughes</p>
            </div>
        ),
        bg: "from-blue-900 to-purple-900"
    },
    {
        title: "My Name!",
        content: (
            <div className="space-y-8 text-center">
                <div className="text-8xl mb-4">🌟</div>
                <p className="text-4xl font-bold text-yellow-300">I'm named after George Best!</p>
                <div className="bg-white/10 p-8 rounded-2xl max-w-2xl mx-auto">
                    <p className="text-2xl text-white leading-relaxed">
                        George Best also played for Manchester United, just like Ronaldo!
                    </p>
                </div>
                <p className="text-3xl text-cyan-300">Two legends 💫</p>
            </div>
        ),
        bg: "from-pink-900 to-purple-900"
    },
    {
        title: "I Met Ronaldo!",
        content: (
            <div className="space-y-8 text-center">
                <div className="text-9xl mb-4">🤩</div>
                <p className="text-4xl font-bold text-cyan-300">October 2024</p>
                <div className="bg-white/10 p-8 rounded-2xl max-w-3xl mx-auto">
                    <p className="text-3xl text-white leading-relaxed mb-6">
                        Me and my dad met Cristiano Ronaldo at Cameron House Hotel
                    </p>
                    <p className="text-2xl text-gray-300">
                        It's only 5 minutes from my house!
                    </p>
                </div>
                <p className="text-3xl text-pink-400">Best day ever! 💚</p>
            </div>
        ),
        bg: "from-cyan-900 to-blue-900"
    },
    {
        title: "Who is Ronaldo?",
        content: (
            <div className="space-y-6 text-center text-2xl">
                <div className="bg-white/10 p-6 rounded-xl">
                    <p className="text-white font-bold">🎂 40 years old</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                    <p className="text-white font-bold">🇵🇹 From Portugal</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                    <p className="text-white font-bold">⚽ Best footballer in the world</p>
                </div>
            </div>
        ),
        bg: "from-green-900 to-blue-900"
    },
    {
        title: "Why He's Amazing",
        content: (
            <div className="space-y-8 text-center">
                <div className="bg-yellow-900/30 p-8 rounded-2xl border-2 border-yellow-500/50">
                    <p className="text-4xl mb-4">💪</p>
                    <p className="text-3xl font-bold text-yellow-300">Trains Every Day</p>
                </div>
                <div className="bg-green-900/30 p-8 rounded-2xl border-2 border-green-500/50">
                    <p className="text-4xl mb-4">🎯</p>
                    <p className="text-3xl font-bold text-green-300">Never Gives Up</p>
                </div>
                <div className="bg-pink-900/30 p-8 rounded-2xl border-2 border-pink-500/50">
                    <p className="text-4xl mb-4">❤️</p>
                    <p className="text-3xl font-bold text-pink-300">Helps People</p>
                </div>
            </div>
        ),
        bg: "from-orange-900 to-red-900"
    },
    {
        title: "What I Learned",
        content: (
            <div className="space-y-8 text-center">
                <div className="bg-yellow-900/30 p-8 rounded-2xl border-2 border-yellow-500/50">
                    <p className="text-4xl mb-4">🌟</p>
                    <p className="text-3xl font-bold text-yellow-300">Practice Makes Perfect</p>
                </div>
                <div className="bg-green-900/30 p-8 rounded-2xl border-2 border-green-500/50">
                    <p className="text-4xl mb-4">💪</p>
                    <p className="text-3xl font-bold text-green-300">Keep Trying</p>
                </div>
                <div className="bg-pink-900/30 p-8 rounded-2xl border-2 border-pink-500/50">
                    <p className="text-4xl mb-4">❤️</p>
                    <p className="text-3xl font-bold text-pink-300">Be Kind</p>
                </div>
            </div>
        ),
        bg: "from-indigo-900 to-purple-900"
    },
    {
        title: "Thank You!",
        content: (
            <div className="text-center space-y-8">
                <div className="text-9xl">⚽💚✨</div>
                <p className="text-5xl font-black text-white">Any Questions?</p>
            </div>
        ),
        bg: "from-purple-900 to-blue-900"
    }
];

export default function GeorgieRonaldoPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const slide = slides[currentSlide];

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* ADMIN INDICATOR */}
                <div className="mb-4 bg-amber-900/30 border-2 border-amber-500 rounded-lg p-3">
                    <p className="text-amber-400 font-bold text-center">⚠️ ADMIN VIEW - ACTION NEEDED</p>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-amber-400">Georgie's Presentation</h1>
                        <p className="text-gray-400">Slide {currentSlide + 1} of {slides.length}</p>
                    </div>
                </div>

                {/* Slide Display */}
                <Card className={`bg-gradient-to-br ${slide.bg} border-4 border-amber-500/40 shadow-2xl`}>
                    <CardContent className="p-12 md:p-16 min-h-[600px] flex flex-col">
                        <div className="text-center mb-8">
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                                {slide.title}
                            </h2>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            {slide.content}
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                    <Button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-6 disabled:opacity-30"
                    >
                        <ChevronLeft className="w-6 h-6" />
                        Back
                    </Button>
                    
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`w-4 h-4 rounded-full transition-all ${
                                    idx === currentSlide 
                                        ? 'bg-cyan-400 w-10' 
                                        : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                            />
                        ))}
                    </div>

                    <Button
                        onClick={nextSlide}
                        disabled={currentSlide === slides.length - 1}
                        className="gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-6 disabled:opacity-30"
                    >
                        Next
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>

            </div>
        </div>
    );
}
