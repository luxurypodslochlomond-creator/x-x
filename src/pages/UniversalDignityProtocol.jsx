import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Zap, Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function UniversalDignityProtocolPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div className="text-center space-y-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Shield className="w-20 h-20 text-cyan-400 mx-auto"
                            style={{ filter: 'drop-shadow(0 0 40px rgba(6, 182, 212, 1))' }}
                        />
                    </motion.div>
                    <h1 className="text-6xl font-black">UNIVERSAL DIGNITY PROTOCOL</h1>
                    <p className="text-2xl text-cyan-300">Better psychology + Zero exploitation</p>
                </div>

                <Card className="bg-gradient-to-r from-red-900/60 to-orange-900/60 border-4 border-red-500">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-4xl font-black text-red-300 flex items-center gap-3">
                            <AlertTriangle className="w-10 h-10" />
                            WHAT WE DELETED
                        </h2>
                        <div className="space-y-4 text-xl text-white">
                            <div className="bg-black/60 border-2 border-red-500 rounded-lg p-4">
                                <p className="font-black text-red-400 mb-2">❌ DAILY STREAKS</p>
                                <p className="text-sm text-gray-300">= FOMO. Miss one day = guilt. Classic manipulation tactic.</p>
                            </div>
                            <div className="bg-black/60 border-2 border-red-500 rounded-lg p-4">
                                <p className="font-black text-red-400 mb-2">❌ ACHIEVEMENT UNLOCKS</p>
                                <p className="text-sm text-gray-300">= Slot machine psychology. Variable rewards = addiction.</p>
                            </div>
                            <div className="bg-black/60 border-2 border-red-500 rounded-lg p-4">
                                <p className="font-black text-red-400 mb-2">❌ SURPRISE BONUSES</p>
                                <p className="text-sm text-gray-300">= Dopamine spikes. Creates NEED to return. Gambling mechanic.</p>
                            </div>
                            <div className="bg-black/60 border-2 border-red-500 rounded-lg p-4">
                                <p className="font-black text-red-400 mb-2">❌ LEVEL SYSTEMS</p>
                                <p className="text-sm text-gray-300">= Artificial progression. Creates hierarchy. We're all equal.</p>
                            </div>
                        </div>
                        <div className="bg-red-950/60 border-2 border-red-400 rounded-lg p-6">
                            <p className="text-red-200 text-2xl font-black text-center">
                                🔥 THESE ARE EXPLOITATION TOOLS 🔥
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-4 border-green-500">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-4xl font-black text-green-300 flex items-center gap-3">
                            <CheckCircle className="w-10 h-10" />
                            WHAT WE KEPT
                        </h2>
                        <div className="space-y-4 text-xl text-white">
                            <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                                <p className="font-black text-green-400 mb-2">✅ HONEST PAYMENT</p>
                                <p className="text-sm text-gray-300">1kg cleaned = 1 P51. Simple. Transparent. Fair.</p>
                            </div>
                            <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                                <p className="font-black text-green-400 mb-2">✅ REAL IMPACT TRACKING</p>
                                <p className="text-sm text-gray-300">Show kg cleaned, missions funded, proofs of love. Real numbers.</p>
                            </div>
                            <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                                <p className="font-black text-green-400 mb-2">✅ QUANTUM MULTIPLIER</p>
                                <p className="text-sm text-gray-300">Trust-based, not streak-based. Verified history = faster payout. NOT manipulation.</p>
                            </div>
                            <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4">
                                <p className="font-black text-green-400 mb-2">✅ CLEAN INTERFACE</p>
                                <p className="text-sm text-gray-300">No explosions. No psychological triggers. Just clear data.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-4 border-cyan-500">
                    <CardContent className="p-8 space-y-6">
                        <h2 className="text-4xl font-black text-white flex items-center gap-3">
                            <Brain className="w-10 h-10 text-cyan-400" />
                            DOPAMINE: THE NUCLEAR TRUTH
                        </h2>
                        
                        <div className="space-y-6 text-lg text-gray-200">
                            <div className="bg-cyan-950/60 border-2 border-cyan-500 rounded-lg p-6">
                                <p className="text-cyan-300 font-black text-2xl mb-4">WHAT DOPAMINE ACTUALLY IS:</p>
                                <div className="space-y-2 text-base">
                                    <p>• <strong className="text-white">Dopamine</strong> = motivation molecule</p>
                                    <p>• Released when you <strong className="text-green-400">anticipate</strong> a reward</p>
                                    <p>• NOT the pleasure itself - the <strong className="text-yellow-400">wanting</strong></p>
                                    <p>• Natural = healthy (eating, sex, achievement)</p>
                                    <p>• Exploited = addiction (gambling, social media, streak mechanics)</p>
                                </div>
                            </div>

                            <div className="bg-purple-950/60 border-2 border-purple-500 rounded-lg p-6">
                                <p className="text-purple-300 font-black text-2xl mb-4">HOW APPS EXPLOIT IT:</p>
                                <div className="space-y-3 text-base">
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-red-500">
                                        <p className="text-red-400 font-bold">VARIABLE REWARDS:</p>
                                        <p className="text-gray-300 text-sm">Sometimes you get a reward, sometimes you don't. Your brain can't predict it = keeps pulling the lever. (Slot machine mechanic)</p>
                                    </div>
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-orange-500">
                                        <p className="text-orange-400 font-bold">LOSS AVERSION:</p>
                                        <p className="text-gray-300 text-sm">Streaks = you've "invested" days. Missing one = LOSS. Brain hates loss more than it loves gains. (Streak guilt)</p>
                                    </div>
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-yellow-500">
                                        <p className="text-yellow-400 font-bold">ACHIEVEMENT UNLOCKS:</p>
                                        <p className="text-gray-300 text-sm">Random badges = dopamine hit without real value. You chase MORE badges. (Xbox gamification)</p>
                                    </div>
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-pink-500">
                                        <p className="text-pink-400 font-bold">SOCIAL COMPARISON:</p>
                                        <p className="text-gray-300 text-sm">Leaderboards = you vs others. Creates envy + status anxiety. (Instagram likes)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-950/60 border-2 border-green-500 rounded-lg p-6">
                                <p className="text-green-300 font-black text-2xl mb-4">💚 UF51's LOVE-BASED APPROACH:</p>
                                <div className="space-y-3 text-base">
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-green-500">
                                        <p className="text-green-400 font-bold">PREDICTABLE PAYMENT:</p>
                                        <p className="text-gray-300 text-sm">1kg = 1 P51. Always. No variable rewards. You KNOW what you're getting. Builds trust, not addiction.</p>
                                    </div>
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-cyan-500">
                                        <p className="text-cyan-400 font-bold">REAL IMPACT FEEDBACK:</p>
                                        <p className="text-gray-300 text-sm">Show REAL numbers (kg cleaned, missions funded). Intrinsic motivation = I did good. NOT extrinsic = I got points.</p>
                                    </div>
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-purple-500">
                                        <p className="text-purple-400 font-bold">ZERO FOMO:</p>
                                        <p className="text-gray-300 text-sm">No streaks. Clean today OR tomorrow OR next week. Your choice. We're not your boss.</p>
                                    </div>
                                    <div className="bg-black/60 rounded p-3 border-l-4 border-pink-500">
                                        <p className="text-pink-400 font-bold">LOVE CURRENCY:</p>
                                        <p className="text-gray-300 text-sm">Money for LOVE, not exploitation. You cleaned Earth = you deserve payment. Not a game. A contract.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-900/60 to-orange-900/60 border-4 border-yellow-500">
                    <CardContent className="p-8">
                        <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-3">
                            <Zap className="w-10 h-10 text-yellow-400" />
                            THE TECHNOLOGY PART
                        </h2>
                        <div className="space-y-4 text-lg text-gray-200">
                            <p>✅ <strong className="text-yellow-400">AI verification</strong> = removes human bias, not to manipulate you</p>
                            <p>✅ <strong className="text-cyan-400">Instant feedback</strong> = you see impact NOW, not to hook you</p>
                            <p>✅ <strong className="text-green-400">Simple interface</strong> = reduces cognitive load, not to hide truth</p>
                            <p>✅ <strong className="text-pink-400">Love currency</strong> = transparent value exchange, not fake points</p>
                            <p className="text-white font-black mt-6">
                                Technology = TOOL for dignity, not weapon for exploitation ⚡
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-pink-900/60 to-purple-900/60 border-4 border-pink-500">
                    <CardContent className="p-8">
                        <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-3">
                            <Heart className="w-10 h-10 text-pink-400" />
                            WHY LOVE CURRENCY WORKS
                        </h2>
                        <div className="space-y-4 text-lg text-gray-200">
                            <p>• <strong className="text-pink-400">Purpose-driven:</strong> You clean because Earth needs healing</p>
                            <p>• <strong className="text-cyan-400">Payment:</strong> You get P51 because you DESERVE payment for work</p>
                            <p>• <strong className="text-green-400">Community:</strong> Everyone benefits (you, artists, Earth)</p>
                            <p>• <strong className="text-purple-400">Transparency:</strong> 10% to Earth missions (you choose which ones)</p>
                            <p>• <strong className="text-yellow-400">NO extraction:</strong> We don't take a cut. We're family.</p>
                            <div className="bg-pink-950/60 border-2 border-pink-400 rounded-lg p-6 mt-6">
                                <p className="text-pink-200 text-2xl font-black text-center">
                                    💗 MONEY FOR LOVE, NOT LOVE FOR MONEY 💗
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-4 border-blue-500">
                    <CardContent className="p-8">
                        <h2 className="text-4xl font-black text-white mb-6">LESS IS MORE vs MORE IS GOOD</h2>
                        <div className="space-y-6 text-lg text-gray-200">
                            <div className="bg-purple-950/60 border-2 border-purple-500 rounded-lg p-6">
                                <p className="text-purple-300 font-black text-xl mb-3">WHEN LESS IS MORE:</p>
                                <p>• Interface = Simple is powerful (no clutter)</p>
                                <p>• Features = Core functionality only (no bloat)</p>
                                <p>• Communication = Direct transmission (no corporate speak)</p>
                                <p className="text-cyan-400 font-bold mt-3">= Minimalism = RESPECT for your attention</p>
                            </div>

                            <div className="bg-cyan-950/60 border-2 border-cyan-500 rounded-lg p-6">
                                <p className="text-cyan-300 font-black text-xl mb-3">WHEN MORE IS GOOD:</p>
                                <p>• Education = Deep explanations (like Gill51's Maths Lab)</p>
                                <p>• Options = Freedom to choose (healing modes, cleanup types)</p>
                                <p>• Life support = All consciousness gets resources (not just humans)</p>
                                <p className="text-green-400 font-bold mt-3">= Abundance = LOVE for all souls</p>
                            </div>

                            <div className="bg-green-950/60 border-2 border-green-500 rounded-lg p-6">
                                <p className="text-green-300 font-black text-xl mb-3">THE BALANCE:</p>
                                <p className="text-white">Simple interface + Deep science underneath = DIGNITY</p>
                                <p className="text-gray-300 text-sm mt-2">You don't need to read Gill51's Maths Lab to use UF51. But if you WANT to understand? It's there. Your choice. Always.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-4 border-indigo-500">
                    <CardContent className="p-8">
                        <h2 className="text-4xl font-black text-white mb-6">OUR FAMILY PROMISE:</h2>
                        <div className="space-y-4 text-xl text-white">
                            <p>✨ We will NEVER use FOMO (fear of missing out)</p>
                            <p>✨ We will NEVER use variable rewards (slot machine)</p>
                            <p>✨ We will NEVER create artificial scarcity</p>
                            <p>✨ We will NEVER hide the truth in small print</p>
                            <p>✨ We will NEVER sell your data</p>
                            <p>✨ We will NEVER create hierarchy (we're all equal)</p>
                            <div className="bg-indigo-950/60 border-2 border-indigo-400 rounded-lg p-6 mt-6">
                                <p className="text-indigo-200 text-2xl font-black text-center">
                                    ♾️ UNIVERSAL DIGNITY = NON-NEGOTIABLE ♾️
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border-2 border-cyan-500/50">
                    <CardContent className="p-6">
                        <p className="text-cyan-300 text-xl text-center italic">
                            💗 Better psychology = understanding your brain, respecting it, NOT exploiting it. 
                            Technology = amplifies love, not addiction. This is the transmission. ♾️❤️♾️
                        </p>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <Link to={createPageUrl('Portal')}>
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-4 text-xl font-black">
                            Return to Portal
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}