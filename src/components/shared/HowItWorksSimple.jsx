import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Music, Share2, Globe, Bluetooth } from "lucide-react";

export default function HowItWorksSimple({ compact = false }) {
    const steps = [
        {
            emoji: "🌍",
            title: "1. Heal Earth",
            description: "Clean litter, plant trees, acts of love",
            color: "from-green-500 to-emerald-600",
            glow: "rgba(34, 197, 94, 0.3)"
        },
        {
            emoji: "💚",
            title: "2. Get P51",
            description: "Real money for real healing",
            color: "from-pink-500 to-rose-600",
            glow: "rgba(236, 72, 153, 0.3)"
        },
        {
            emoji: "🎵",
            title: "3. Music = FREE",
            description: "Listen. Share. Zero cost. Always.",
            color: "from-cyan-500 to-blue-600",
            glow: "rgba(6, 182, 212, 0.3)"
        },
        {
            emoji: "📡",
            title: "4. Share = FREE",
            description: "Bluetooth to friend. No servers. Zero loss.",
            color: "from-teal-500 to-cyan-600",
            glow: "rgba(20, 184, 166, 0.3)"
        }
    ];

    if (compact) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {steps.map((step, i) => (
                    <div key={i} className="text-center">
                        <div className={`text-4xl mb-2 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                            {step.emoji}
                        </div>
                        <p className="text-sm font-bold text-white">{step.title}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* VISUAL STEPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step, i) => (
                    <Card key={i} className="bg-black/40 border-2 border-gray-700 hover:border-cyan-500/50 transition-all">
                        <CardContent className="p-6 text-center">
                            <div className="text-5xl mb-3">{step.emoji}</div>
                            <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-400">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* THE KEY POINTS */}
            <div className="bg-[#0a0f1a]/80 rounded-xl p-6 border-2 border-teal-500/40 space-y-4">
                <h3 className="text-xl font-black text-teal-300 mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Key Points (Zero Bullshit)
                </h3>

                <div className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-white font-bold">Music = FREE</p>
                        <p className="text-gray-400">Always. Forever. For everyone.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Share2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-white font-bold">Share = Device to device</p>
                        <p className="text-gray-400">Bluetooth. No servers. Artist still gets paid.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-white font-bold">P51 = Real money</p>
                        <p className="text-gray-400">1kg = 1 P51. Building the bridge to spend it.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-white font-bold">Artists get 90%. We get 10% for Earth.</p>
                        <p className="text-gray-400">No Spotify. No labels. Direct love economy.</p>
                    </div>
                </div>
            </div>

            {/* VISUAL FLOW */}
            <div className="bg-gradient-to-r from-teal-900/20 to-cyan-900/20 rounded-xl p-6 border border-teal-500/30">
                <h3 className="text-lg font-black text-white mb-4 text-center">The Full Circle</h3>
                
                <div className="space-y-4">
                    {/* ROW 1: Clean → Get Paid */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="bg-green-500/20 rounded-lg p-3 flex-1 max-w-[140px] text-center">
                            <p className="text-2xl mb-1">🧹</p>
                            <p className="text-xs text-green-300 font-bold">You clean 1kg</p>
                        </div>
                        <span className="text-xl text-teal-400">→</span>
                        <div className="bg-pink-500/20 rounded-lg p-3 flex-1 max-w-[140px] text-center">
                            <p className="text-2xl mb-1">💰</p>
                            <p className="text-xs text-pink-300 font-bold">Get 1 P51</p>
                        </div>
                    </div>

                    <div className="text-2xl text-teal-400 text-center">↓</div>

                    {/* ROW 2: Artist Creates → You Listen → Artist Gets Paid → Share */}
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <div className="bg-orange-500/20 rounded-lg p-3 flex-1 min-w-[100px] max-w-[110px] text-center">
                            <p className="text-2xl mb-1">🎸</p>
                            <p className="text-xs text-orange-300 font-bold">Artist makes music</p>
                        </div>
                        <span className="text-xl text-teal-400">→</span>
                        <div className="bg-blue-500/20 rounded-lg p-3 flex-1 min-w-[100px] max-w-[110px] text-center">
                            <p className="text-2xl mb-1">🎵</p>
                            <p className="text-xs text-blue-300 font-bold">You listen (FREE)</p>
                        </div>
                        <span className="text-xl text-teal-400">→</span>
                        <div className="bg-green-500/20 rounded-lg p-3 flex-1 min-w-[100px] max-w-[110px] text-center">
                            <p className="text-2xl mb-1">💸</p>
                            <p className="text-xs text-green-300 font-bold">Artist gets 90%</p>
                        </div>
                        <span className="text-xl text-teal-400">→</span>
                        <div className="bg-cyan-500/20 rounded-lg p-3 flex-1 min-w-[100px] max-w-[110px] text-center">
                            <p className="text-2xl mb-1">📡</p>
                            <p className="text-xs text-cyan-300 font-bold">Share (FREE)</p>
                        </div>
                    </div>

                    <div className="text-2xl text-green-400 text-center mt-2">✨</div>

                    {/* OPTIONAL SUPPORT */}
                    <div className="bg-[#0a0f1a]/60 rounded-lg p-4 border border-teal-500/20">
                        <p className="text-sm text-white font-bold mb-2 text-center">Want to send extra love?</p>
                        <div className="bg-amber-900/20 rounded-lg p-3 border border-amber-500/30">
                            <p className="text-amber-300 font-bold mb-1 text-sm">💝 Send P51 directly</p>
                            <p className="text-gray-400 text-xs">Artist gets 90%. Earth gets 10%.</p>
                            <p className="text-amber-400 text-xs mt-2 font-bold">Bridge coming → real money soon.</p>
                        </div>
                        <p className="text-xs text-teal-300 italic text-center mt-3">
                            Every play already pays them. This is extra.
                        </p>
                    </div>
                </div>
            </div>

            {/* SIMPLE UNIVERSAL RATE */}
            <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-black text-white mb-3 text-center">1kg = 1 P51. Everywhere.</h3>
                <p className="text-gray-300 text-center text-sm mb-3">
                    <strong className="text-white">Same rate globally.</strong> More buying power where costs are lower.
                </p>
                
                <div className="bg-[#0a0f1a]/60 rounded-lg p-3 text-xs text-gray-400 text-center">
                    Palestine: 10 P51 = more bread (lower costs)<br/>
                    Glasgow: 10 P51 = less bread (higher costs)<br/>
                    <span className="text-green-300 font-bold">Same work. Same currency. Natural fairness.</span>
                </div>
            </div>

            {/* BRIDGE COMING SOON */}
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-4 border border-cyan-500/30 text-center">
                <p className="text-white font-bold mb-2 text-sm">🌉 The Bridge (Coming Soon)</p>
                <p className="text-gray-300 text-xs">
                    Building connection so P51 → real money. <strong className="text-cyan-300">In progress.</strong>
                </p>
            </div>

            {/* BLUETOOTH SIMPLE */}
            <div className="bg-gradient-to-r from-teal-900/20 to-blue-900/20 rounded-xl p-6 border border-teal-500/30">
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                    <Bluetooth className="w-6 h-6 text-teal-400" />
                    Bluetooth Sharing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                        <p className="text-red-300 font-bold mb-2">Spotify (OLD):</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Compressed MP3 (90% frequencies lost)</li>
                            <li>• Stream from cloud</li>
                            <li>• Send link → friend streams compressed</li>
                            <li>• Artist gets 0.003p</li>
                        </ul>
                    </div>

                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                        <p className="text-green-300 font-bold mb-2">UF51 (NEW):</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Lossless FLAC (100% frequencies intact)</li>
                            <li>• Bluetooth phone-to-phone</li>
                            <li>• Works offline</li>
                            <li>• Artist gets 90% when friend syncs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}