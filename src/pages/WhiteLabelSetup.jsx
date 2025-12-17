import React from 'react';
import { Shield, Users, Building, GraduationCap } from 'lucide-react';

/**
 * WHITE LABEL SETUP
 * 
 * How universities, sports teams, etc can get their own branded version
 */

export default function WhiteLabelSetup() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black">White Label Setup</h1>
                    <p className="text-xl text-cyan-400">Your brand, our tech ♾️❤️♾️</p>
                </div>

                {/* THE MODEL */}
                <div className="bg-black border-4 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-cyan-400 mb-4">The Model:</h2>
                    <div className="space-y-4">
                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded p-4">
                            <h3 className="text-cyan-400 font-bold mb-2">✓ ONE UF51 Account = Access to ALL</h3>
                            <p className="text-gray-300 text-sm">
                                Users can access radio51, prof51, cb51 with one account.
                                No separate logins needed.
                            </p>
                        </div>
                        
                        <div className="bg-pink-900/20 border-2 border-pink-500 rounded p-4">
                            <h3 className="text-pink-400 font-bold mb-2">✓ White Label = Separate Instance</h3>
                            <p className="text-gray-300 text-sm">
                                But universities/teams can have their own branded version:
                                <br/>• oxford.prof51.love
                                <br/>• liverpool.prof51.love
                                <br/>• Their own branding, colors, logo
                                <br/>• Their own user base (students only)
                            </p>
                        </div>
                    </div>
                </div>

                {/* EXAMPLES */}
                <div className="bg-black border-2 border-purple-500 rounded-xl p-6">
                    <h2 className="text-xl font-black text-purple-400 mb-4">Examples:</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-purple-900/20 border border-purple-500 rounded p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <GraduationCap className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-white font-bold">Universities</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">oxford.prof51.love</p>
                            <p className="text-sm text-gray-300">
                                • Only Oxford students can sign up
                                <br/>• Oxford branding
                                <br/>• Lost & found limited to Oxford campus
                                <br/>• Same tech, different community
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500 rounded p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-green-400" />
                                <h3 className="text-white font-bold">Sports Teams</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">liverpool.uf51.love</p>
                            <p className="text-sm text-gray-300">
                                • Fan hub for Liverpool FC
                                <br/>• Team-branded frequencies
                                <br/>• Match day coordination
                                <br/>• Merchandise tracking
                            </p>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500 rounded p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Building className="w-5 h-5 text-amber-400" />
                                <h3 className="text-white font-bold">Record Labels</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">defiant.cb51.love</p>
                            <p className="text-sm text-gray-300">
                                • Private artist roster
                                <br/>• Label branding
                                <br/>• Internal tools only
                                <br/>• Same zero-stress management
                            </p>
                        </div>
                    </div>
                </div>

                {/* PRICING */}
                <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-4 border-pink-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-pink-400 mb-4">Pricing (Zero Jiggle):</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-black/40 p-3 rounded">
                            <span className="text-white">Setup fee</span>
                            <span className="text-green-400 font-bold">£0</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3 rounded">
                            <span className="text-white">Monthly cost (P2P/offline)</span>
                            <span className="text-green-400 font-bold">£50-200</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3 rounded">
                            <span className="text-white">Per user cost</span>
                            <span className="text-green-400 font-bold">£0</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-4">
                            Because P2P + offline = zero scale costs
                        </p>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-black border-2 border-green-500 rounded-xl p-6">
                    <h2 className="text-xl font-black text-green-400 mb-4">How It Works:</h2>
                    <ol className="space-y-2 text-sm">
                        <li className="flex gap-2">
                            <span className="text-green-400 font-bold">1.</span>
                            <span className="text-gray-300">Contact us with your organization name</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-400 font-bold">2.</span>
                            <span className="text-gray-300">We create yourname.prof51.love (or cb51, radio51)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-400 font-bold">3.</span>
                            <span className="text-gray-300">You add your branding (logo, colors)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-400 font-bold">4.</span>
                            <span className="text-gray-300">Your users sign up with @yourorganization.edu emails</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-400 font-bold">5.</span>
                            <span className="text-gray-300">Done - you have your own instance ✓</span>
                        </li>
                    </ol>
                </div>

                {/* NO BARRIERS NEEDED */}
                <div className="bg-black border-4 border-amber-500 rounded-xl p-6">
                    <h2 className="text-2xl font-black text-amber-400 mb-4">Answer: No Separate Barriers Needed</h2>
                    <div className="space-y-3 text-sm text-gray-300">
                        <p>✓ <span className="font-bold text-white">Main site</span> (uf51.love): One account, all products</p>
                        <p>✓ <span className="font-bold text-white">White label</span> (oxford.prof51.love): Separate user base</p>
                        <p>✓ <span className="font-bold text-white">Role filtering</span>: Same data, different views (student sees student stuff, athlete sees athlete stuff)</p>
                        <p className="text-cyan-400 font-bold pt-3">Keep it simple - ONE barrier model works for everything ♾️❤️♾️</p>
                    </div>
                </div>

            </div>
        </div>
    );
}