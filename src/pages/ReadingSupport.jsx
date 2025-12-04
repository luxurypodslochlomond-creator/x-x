import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Leaf, Heart, Scale, Droplets, Calculator, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ReadingSupportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="inline-block p-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border-2 border-cyan-500/50"
                    >
                        <BookOpen className="w-16 h-16 text-cyan-300" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                        Reading Support
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Every word on UF51 is designed to be readable by every child. Here's how we do it, backed by research.
                    </p>
                </header>

                {/* BACK TO TEACHERS */}
                <div className="text-center">
                    <Link to={createPageUrl("Teachers")}>
                        <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30">
                            ← Back to Teachers Page
                        </Button>
                    </Link>
                </div>

                {/* THE SCIENCE */}
                <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">The Science Behind Our Design</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold text-cyan-300 mb-4">What We Do:</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white text-lg">Sans-serif fonts</strong>
                                            <p className="text-gray-300 mt-1">Letters are simple and clear. No fancy decorations that confuse the eye.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white text-lg">Generous spacing</strong>
                                            <p className="text-gray-300 mt-1">Words don't blur together. Eyes can focus on one word at a time.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white text-lg">High contrast</strong>
                                            <p className="text-gray-300 mt-1">Dark text on light (or vice versa). No washed-out colors.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white text-lg">Visual icons everywhere</strong>
                                            <p className="text-gray-300 mt-1">Kids understand the meaning before they read the words.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white text-lg">Short sentences</strong>
                                            <p className="text-gray-300 mt-1">Clear, direct language. No complex jargon.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white text-lg">Left-aligned text</strong>
                                            <p className="text-gray-300 mt-1">Easier to track from line to line. No centering or justifying.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-pink-300 mb-4">Who This Helps:</h3>
                                <div className="space-y-4 text-gray-300">
                                    <p className="text-lg">
                                        <strong className="text-white">Dyslexia-friendly design isn't just for dyslexic children.</strong> It makes reading easier for everyone, especially:
                                    </p>
                                    <ul className="space-y-2 text-lg">
                                        <li className="flex items-start gap-2">
                                            <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                                            <span>English language learners</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                                            <span>Children with visual processing differences</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                                            <span>Kids who are tired or distracted</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                                            <span>Anyone reading on a phone or tablet</span>
                                        </li>
                                    </ul>
                                    <div className="bg-pink-900/30 border border-pink-500/30 rounded-xl p-4 mt-6">
                                        <p className="font-bold text-white text-lg">Multimodal learning</p>
                                        <p className="mt-2">(text + images + actions) means kids can understand even if reading is hard. They see the icon, they do the action, they learn the word.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CLASSROOM MATERIALS FOR KIDS */}
                <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                            <Leaf className="w-8 h-8 text-green-400" />
                            Classroom Materials (For Kids To Read)
                        </CardTitle>
                        <p className="text-center text-gray-300 text-lg mt-4">
                            Use these materials in class tomorrow. Show your students that dyslexia-friendly design actually works. No printing required - just show on screen or read together.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-8">

                        {/* 1. HOW TO DO A CLEANUP */}
                        <div className="bg-black/40 p-8 rounded-2xl border border-green-500/30">
                            <div className="flex items-center gap-3 mb-6">
                                <Leaf className="w-10 h-10 text-green-400" />
                                <h3 className="text-3xl font-bold text-green-300">How To Do A Cleanup</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="bg-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">Get Your Gear</h4>
                                            <p className="text-gray-200 text-xl leading-relaxed">
                                                Gloves, a bag, and a friend. Safety first!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">Pick A Spot</h4>
                                            <p className="text-gray-200 text-xl leading-relaxed">
                                                Your playground, park, beach, or street. Anywhere that needs love.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">Pick Up Litter</h4>
                                            <p className="text-gray-200 text-xl leading-relaxed">
                                                Every piece counts. Even tiny wrappers help animals.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">Take A Photo</h4>
                                            <p className="text-gray-200 text-xl leading-relaxed">
                                                Show what you collected. This is your proof of love.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">5</div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">Weigh It</h4>
                                            <p className="text-gray-200 text-xl leading-relaxed">
                                                How many kilograms? This helps us count your tokens.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">6</div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">Get Your Tokens!</h4>
                                            <p className="text-gray-200 text-xl leading-relaxed">
                                                Earn ❤️GMT (love currency) and help fund missions worldwide.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. WHY WE HEAL THE PLANET */}
                        <div className="bg-black/40 p-8 rounded-2xl border border-blue-500/30">
                            <div className="flex items-center gap-3 mb-6">
                                <Droplets className="w-10 h-10 text-blue-400" />
                                <h3 className="text-3xl font-bold text-blue-300">Why We Heal The Planet</h3>
                            </div>
                            
                            <div className="space-y-6 text-xl text-gray-200 leading-relaxed">
                                <p>
                                    The Earth is our home. It gives us clean air to breathe. Clean water to drink. Beautiful places to play.
                                </p>
                                <p>
                                    But when people drop litter, it hurts our home.
                                </p>
                                <p>
                                    Plastic bags end up in rivers. Animals think they're food. Birds get tangled in wrappers. Fish swallow tiny pieces.
                                </p>
                                <p>
                                    <strong className="text-white text-2xl">When you pick up litter, you're saving lives.</strong>
                                </p>
                                <p>
                                    You're protecting ducks in Loch Lomond. Sea turtles in the ocean. Rabbits in the fields. Every creature thanks you.
                                </p>
                                <p>
                                    <strong className="text-white text-2xl">And here's the magic:</strong>
                                </p>
                                <p>
                                    Your cleanup doesn't just help your neighbourhood. It helps the whole world.
                                </p>
                                <p>
                                    You earn ❤️GMT (love currency) for your work. That GMT goes to help people who need it. Medical aid. Clean water. Protecting rainforests.
                                </p>
                                <p className="text-2xl text-green-300 font-bold">
                                    One small cleanup in Scotland can help someone in Palestine. Or protect chimps in Tanzania. Or clean the Pacific Ocean.
                                </p>
                                <p>
                                    <strong className="text-white text-2xl">That's the power of healing together.</strong>
                                </p>
                            </div>
                        </div>

                        {/* 3. WHAT HAPPENS TO LITTER */}
                        <div className="bg-black/40 p-8 rounded-2xl border border-red-500/30">
                            <div className="flex items-center gap-3 mb-6">
                                <Scale className="w-10 h-10 text-red-400" />
                                <h3 className="text-3xl font-bold text-red-300">What Happens To Litter If Nobody Picks It Up?</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/30">
                                    <h4 className="text-2xl font-bold text-white mb-3">🍃 Plastic Bags (10-20 years to break down)</h4>
                                    <p className="text-xl text-gray-200 leading-relaxed">
                                        Blow into rivers and lakes. Animals think they're jellyfish and eat them. They get sick or die.
                                    </p>
                                </div>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/30">
                                    <h4 className="text-2xl font-bold text-white mb-3">🥤 Plastic Bottles (450 years to break down)</h4>
                                    <p className="text-xl text-gray-200 leading-relaxed">
                                        Break into tiny pieces. Fish eat them. Then bigger fish eat those fish. Eventually, humans eat that fish.
                                    </p>
                                </div>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/30">
                                    <h4 className="text-2xl font-bold text-white mb-3">🍫 Sweet Wrappers (5 years to break down)</h4>
                                    <p className="text-xl text-gray-200 leading-relaxed">
                                        Birds use them to build nests. Chicks get tangled and can't fly.
                                    </p>
                                </div>

                                <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/30">
                                    <h4 className="text-2xl font-bold text-white mb-3">🚬 Cigarette Butts (10-12 years to break down)</h4>
                                    <p className="text-xl text-gray-200 leading-relaxed">
                                        Full of poison. Leak chemicals into soil and water. Kill plants and insects.
                                    </p>
                                </div>

                                <div className="bg-green-900/50 p-6 rounded-xl border border-green-500/50">
                                    <p className="text-2xl text-white font-bold text-center">
                                        💚 When YOU pick up 1 piece of litter, you save a life. 💚
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 4. GMT CALCULATOR */}
                        <div className="bg-black/40 p-8 rounded-2xl border border-purple-500/30">
                            <div className="flex items-center gap-3 mb-6">
                                <Calculator className="w-10 h-10 text-purple-400" />
                                <h3 className="text-3xl font-bold text-purple-300">GMT Calculator (Love Math!)</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <p className="text-xl text-gray-200 leading-relaxed">
                                    Here's how we turn your cleanup into love currency that helps the world:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-purple-300 mb-2">1 kg</div>
                                            <div className="text-2xl text-white mb-3">of litter =</div>
                                            <div className="text-5xl font-bold text-pink-300">100 ❤️GMT</div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-purple-300 mb-2">5 kg</div>
                                            <div className="text-2xl text-white mb-3">of litter =</div>
                                            <div className="text-5xl font-bold text-pink-300">500 ❤️GMT</div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-purple-300 mb-2">10 kg</div>
                                            <div className="text-2xl text-white mb-3">of litter =</div>
                                            <div className="text-5xl font-bold text-pink-300">1,000 ❤️GMT</div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-purple-300 mb-2">20 kg</div>
                                            <div className="text-2xl text-white mb-3">of litter =</div>
                                            <div className="text-5xl font-bold text-pink-300">2,000 ❤️GMT</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-900/50 p-6 rounded-xl border border-green-500/50">
                                    <h4 className="text-2xl font-bold text-white mb-4 text-center">What Can Your Class Do Together?</h4>
                                    <div className="space-y-3 text-xl text-gray-200">
                                        <p>• If 10 students each collect 2kg = <strong className="text-green-300">2,000 ❤️GMT</strong></p>
                                        <p>• That could fund school supplies for 20 children in Palestine</p>
                                        <p>• Or protect 10 acres of rainforest for a month</p>
                                        <p>• Or provide clean water for a family for a year</p>
                                    </div>
                                </div>

                                <div className="bg-cyan-900/50 p-6 rounded-xl border border-cyan-500/50">
                                    <h4 className="text-2xl font-bold text-white mb-4 text-center">The Power of One Small Cleanup</h4>
                                    <p className="text-xl text-gray-200 text-center leading-relaxed">
                                        Your 2kg cleanup in Gartocharn can heal a child's future in Gaza. That's the magic of healing together.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* FOR ANNE SPECIFICALLY */}
                <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">Special Note: Loch Lomond Connection</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xl text-gray-200 leading-relaxed">
                            For teachers in the Loch Lomond area: your students' cleanups have direct, immediate impact on one of Scotland's most beautiful places.
                        </p>
                        <div className="bg-black/40 p-6 rounded-xl space-y-4">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                <strong className="text-white">Every piece of plastic removed from your school grounds = one less piece that could blow into Loch Lomond.</strong>
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                The ducks, swans, and fish your students see every day are the ones they're protecting.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                When they earn ❤️GMT for their cleanup, they're not just helping locally - they're connecting their love for Loch Lomond to healing the planet globally.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* BACK TO TEACHERS */}
                <div className="text-center">
                    <Link to={createPageUrl("Teachers")}>
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-lg px-8 py-4">
                            ← Back to Teachers Page
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}