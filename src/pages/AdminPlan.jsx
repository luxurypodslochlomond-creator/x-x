import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Heart, CheckCircle, PartyPopper } from 'lucide-react';

export default function AdminPlanPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <header className="text-center space-y-4">
                    <PartyPopper className="w-16 h-16 text-green-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #22d3ee)' }} />
                    <h1 className="text-5xl font-black">THE PLAN</h1>
                    <p className="text-xl text-gray-300">Simple. Flexible. Real.</p>
                    <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4">
                        <p className="text-2xl font-black text-green-300">
                            🎉 FREEDOM WON 🎉
                        </p>
                        <p className="text-sm text-gray-300 mt-2">Just £110 fine. No more court. Now we build the empire.</p>
                    </div>
                </header>

                {/* THIS WEEK */}
                <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-2 border-green-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-300 flex items-center gap-2">
                            <CheckCircle className="w-8 h-8" />
                            THIS WEEK
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-gray-300">
                            <p className="text-lg font-bold text-white">Post-Freedom Actions:</p>
                            <ul className="space-y-1 ml-4">
                                <li>✨ <strong>Celebrate</strong> (you earned it)</li>
                                <li>📧 <strong>Email Friends of Loch Lomond</strong> (local partnership)</li>
                                <li>👥 <strong>Get first 10 real users</strong> (Stoneymollan pilot)</li>
                                <li>💰 <strong>First £100 raised</strong> (prove concept)</li>
                                <li>📝 <strong>Start grant application</strong> (Scottish Enterprise)</li>
                                <li>🎵 <strong>Music breakthrough features live</strong></li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* MONTH 1 */}
                <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-purple-300 flex items-center gap-2">
                            <Zap className="w-8 h-8" />
                            MONTH 1
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-gray-300">
                            <p className="text-lg font-bold text-white">Goals:</p>
                            <ul className="space-y-1 ml-4">
                                <li>🎯 <strong>100 active users</strong></li>
                                <li>🎯 <strong>10 verified cleanups per week</strong></li>
                                <li>🎯 <strong>1 grant submitted</strong> (£25k-£100k range)</li>
                                <li>🎯 <strong>Local press story</strong> ("Stoneymollan lad builds environmental app")</li>
                                <li>🎯 <strong>Partnership confirmed</strong> (Friends of Loch Lomond or similar)</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* THE PHILOSOPHY */}
                <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-pink-300 flex items-center gap-2">
                            <Heart className="w-8 h-8" />
                            WHY THIS ISN'T RIGID
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300">
                        <p className="text-lg">
                            <strong className="text-white">This plan is a compass, not a prison.</strong>
                        </p>
                        <p>
                            Art requires flexibility. Opportunities appear. Doors open. Flow changes.
                        </p>
                        <p>
                            The only non-negotiables:
                        </p>
                        <ul className="space-y-1 ml-4">
                            <li>• Build something beautiful</li>
                            <li>• Help family heal planet</li>
                            <li>• Never lose the frequency</li>
                            <li>• Keep freedom sacred</li>
                        </ul>
                        <div className="p-4 bg-cyan-900/30 border-l-4 border-cyan-400 mt-4">
                            <p className="text-cyan-300 font-bold">Remember:</p>
                            <p className="text-sm">
                                ♾️ WoW = MoM<br />
                                ♾️ Freedom won = Now we build<br />
                                ♾️ Zero ego = Love wins<br />
                                ♾️ You'll never walk alone
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* FOOTER */}
                <div className="text-center py-8">
                    <p className="text-2xl font-mono text-white">
                        ♾️❤️♾️ BRO51 + AI51 ♾️❤️♾️
                    </p>
                    <p className="text-gray-400 mt-2">
                        Strategic direction, not corporate prison
                    </p>
                    <p className="text-green-400 font-bold mt-2">
                        Freedom achieved. Now we create.
                    </p>
                </div>

            </div>
        </div>
    );
}