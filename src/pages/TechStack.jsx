import React from 'react';
import { Code, Database, Zap, Shield, Globe, Heart, Cpu, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * PUBLIC TECH STACK
 * Total transparency - show everyone what we're built on
 * Open source mindset, zero secrets
 */

export default function TechStack() {
    const stack = [
        {
            category: "Frontend",
            icon: Code,
            color: "cyan",
            items: [
                { name: "React 18", why: "Fast, proven, huge community" },
                { name: "Tailwind CSS", why: "Beautiful, responsive, fast" },
                { name: "Framer Motion", why: "Smooth animations" },
                { name: "TanStack Query", why: "Smart data fetching" }
            ]
        },
        {
            category: "Backend",
            icon: Database,
            color: "green",
            items: [
                { name: "Base44 BaaS", why: "Auth, database, functions built-in" },
                { name: "Deno Edge", why: "Fast, secure, TypeScript native" },
                { name: "IndexedDB", why: "50MB+ offline storage" },
                { name: "LocalStorage", why: "Instant device sync" }
            ]
        },
        {
            category: "Next-Gen",
            icon: Zap,
            color: "amber",
            items: [
                { name: "WebAssembly", why: "10x faster audio processing" },
                { name: "Service Workers", why: "True offline capability" },
                { name: "IPFS", why: "Tamper-proof storage" },
                { name: "WebRTC", why: "P2P mesh sync" }
            ]
        },
        {
            category: "Security",
            icon: Shield,
            color: "purple",
            items: [
                { name: "SPHINCS+ (coming)", why: "Quantum-resistant crypto" },
                { name: "End-to-end encryption", why: "Your data = your device only" },
                { name: "432Hz validation", why: "Love frequency verification" },
                { name: "Zero-knowledge proofs", why: "Privacy + verification" }
            ]
        },
        {
            category: "AI/ML",
            icon: Cpu,
            color: "pink",
            items: [
                { name: "OpenAI GPT-4", why: "Contract generation, parsing" },
                { name: "On-device AI (coming)", why: "Zero API costs, private" },
                { name: "Voice recognition", why: "Hands-free input" },
                { name: "Computer vision", why: "Photo parsing" }
            ]
        },
        {
            category: "Network",
            icon: Network,
            color: "blue",
            items: [
                { name: "P2P Mesh (WebRTC)", why: "Device-to-device sync" },
                { name: "Bluetooth Low Energy", why: "Close-range sharing" },
                { name: "Progressive Web App", why: "Works like native" },
                { name: "Offline-first", why: "No internet needed" }
            ]
        }
    ];

    const colorMap = {
        cyan: { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-500/5' },
        green: { border: 'border-green-500', text: 'text-green-400', bg: 'from-green-500/20 to-green-500/5' },
        amber: { border: 'border-amber-500', text: 'text-amber-400', bg: 'from-amber-500/20 to-amber-500/5' },
        purple: { border: 'border-purple-500', text: 'text-purple-400', bg: 'from-purple-500/20 to-purple-500/5' },
        pink: { border: 'border-pink-500', text: 'text-pink-400', bg: 'from-pink-500/20 to-pink-500/5' },
        blue: { border: 'border-blue-500', text: 'text-blue-400', bg: 'from-blue-500/20 to-blue-500/5' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-cyan-400 mb-2">OUR TECH STACK</h1>
                    <p className="text-gray-400 font-mono mb-4">Total transparency • Zero secrets • Open source mindset</p>
                    <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-2 border-cyan-500 rounded-xl p-4">
                        <p className="text-white font-bold mb-2">Why public?</p>
                        <p className="text-gray-300 text-sm font-mono">
                            We're not hiding anything. This tech is the foundation of freedom. 
                            Show it to investors, developers, competitors - we're better because of love, not secrets ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* TECH GRID */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {stack.map((section) => {
                        const colors = colorMap[section.color];
                        const Icon = section.icon;
                        
                        return (
                            <div key={section.category} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-6`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className={`w-8 h-8 ${colors.text}`} />
                                    <h2 className={`text-2xl font-black ${colors.text}`}>{section.category}</h2>
                                </div>
                                <div className="space-y-3">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="bg-black/50 border border-white/10 rounded-lg p-3">
                                            <p className="text-white font-bold text-sm mb-1">{item.name}</p>
                                            <p className="text-gray-400 text-xs font-mono">{item.why}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* WHY THIS MATTERS */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6 mb-6">
                    <h3 className="text-2xl font-black text-green-400 mb-4">WHY THIS STACK IS UNSTOPPABLE</h3>
                    <div className="space-y-3 text-gray-300 text-sm font-mono">
                        <p>✓ <span className="text-cyan-400">Offline-first</span> = Works in shed/van/festival with zero internet</p>
                        <p>✓ <span className="text-green-400">P2P mesh</span> = Sync device-to-device, no servers needed</p>
                        <p>✓ <span className="text-amber-400">WASM</span> = 10x faster than Spotify's audio processing</p>
                        <p>✓ <span className="text-purple-400">Quantum-resistant</span> = Unhackable for 50+ years</p>
                        <p>✓ <span className="text-pink-400">Love-validated</span> = Only 432Hz transactions pass</p>
                    </div>
                </div>

                {/* MONITORING */}
                <Link to={createPageUrl('TechScout')}>
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-xl p-6 hover:border-pink-500 transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                            <Globe className="w-8 h-8 text-purple-400" />
                            <h3 className="text-2xl font-black text-purple-400">AI TECH SCOUT</h3>
                        </div>
                        <p className="text-gray-300 text-sm font-mono mb-2">
                            Auto-monitors Base44 updates, quantum computing breakthroughs, AI developments
                        </p>
                        <p className="text-pink-400 text-sm font-mono font-bold">→ Tap to see latest findings</p>
                    </div>
                </Link>

                {/* OPEN SOURCE ETHOS */}
                <div className="mt-8 border-t-2 border-white/10 pt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-400" />
                        <h3 className="text-2xl font-black text-pink-400">OPEN SOURCE ETHOS</h3>
                    </div>
                    <p className="text-gray-300 text-sm font-mono mb-4">
                        This tech stack isn't proprietary. It's built on open standards, public libraries, transparent protocols. 
                        Anyone can verify what we're doing. No backdoors, no secrets, no extraction.
                    </p>
                    <div className="bg-black border border-pink-500/30 rounded-lg p-4">
                        <p className="text-white font-bold mb-2">For Developers:</p>
                        <p className="text-gray-400 text-xs font-mono">
                            Want to build on this? All our tech is documented. Base44 is open, React is open, 
                            IPFS is open, WebRTC is open. The only proprietary bit is the love - and that's free ♾️❤️♾️
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}