import React, { useState } from 'react';
import { Search, Zap, Loader, CheckCircle, AlertCircle, Sparkles, Brain } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

/**
 * AI TECH SCOUT
 * Monitors Base44, quantum computing, AI developments
 * Surfaces relevant tech for UF51
 */

export default function TechScout() {
    const [findings, setFindings] = useState([]);
    const [customQuery, setCustomQuery] = useState('');

    const scoutMutation = useMutation({
        mutationFn: async (topic) => {
            const prompt = `You are a technical scout for UF51, a music/healing platform built on Base44, using React, P2P mesh, quantum-resistant crypto, and offline-first architecture.

Search for: ${topic}

Return JSON with this structure:
{
  "findings": [
    {
      "title": "Brief title",
      "description": "What it is",
      "relevance": "Why it matters to UF51",
      "actionable": "What we should do",
      "priority": "high|medium|low"
    }
  ]
}

Focus on: Base44 platform updates, quantum computing breakthroughs, AI developments, offline-first tech, P2P protocols, WebAssembly advancements, IPFS improvements.`;

            const result = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                add_context_from_internet: true,
                response_json_schema: {
                    type: "object",
                    properties: {
                        findings: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    relevance: { type: "string" },
                                    actionable: { type: "string" },
                                    priority: { type: "string" }
                                }
                            }
                        }
                    }
                }
            });

            return result;
        },
        onSuccess: (data) => {
            if (data.findings) {
                setFindings(prev => [...data.findings, ...prev]);
            }
        }
    });

    const quickScouts = [
        { label: "Base44 Updates", query: "Base44 platform latest updates features releases" },
        { label: "Quantum Computing", query: "Quantum computing breakthroughs post-quantum cryptography SPHINCS+" },
        { label: "AI Developments", query: "AI developments GPT-5 on-device AI LLMs privacy" },
        { label: "WebAssembly", query: "WebAssembly WASM audio processing performance improvements" },
        { label: "P2P Tech", query: "P2P peer-to-peer WebRTC mesh networking offline-first" },
        { label: "IPFS/Storage", query: "IPFS decentralized storage web3 storage improvements" }
    ];

    const runCustomScout = () => {
        if (customQuery.trim()) {
            scoutMutation.mutate(customQuery);
        }
    };

    const priorityColors = {
        high: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-500', text: 'text-red-400' },
        medium: { bg: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        low: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <Brain className="w-10 h-10 text-purple-400" />
                        <h1 className="text-4xl font-black text-purple-400">AI TECH SCOUT</h1>
                    </div>
                    <p className="text-gray-400 font-mono mb-4">Auto-monitors tech developments • Surfaces what matters</p>
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-xl p-4">
                        <p className="text-white font-bold mb-2">How it works:</p>
                        <p className="text-gray-300 text-sm font-mono">
                            AI searches the web for Base44 updates, quantum computing breakthroughs, AI developments, 
                            P2P tech, WebAssembly improvements - then tells you what's relevant and what to do.
                        </p>
                    </div>
                </div>

                {/* QUICK SCOUTS */}
                <div className="mb-8">
                    <h2 className="text-xl font-black text-cyan-400 mb-4">QUICK SCOUTS</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {quickScouts.map((scout) => (
                            <button
                                key={scout.label}
                                onClick={() => scoutMutation.mutate(scout.query)}
                                disabled={scoutMutation.isPending}
                                className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 transition-all disabled:opacity-50"
                            >
                                <Sparkles className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-white text-sm font-bold">{scout.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* CUSTOM SCOUT */}
                <div className="mb-8">
                    <h2 className="text-xl font-black text-green-400 mb-4">CUSTOM SCOUT</h2>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={customQuery}
                            onChange={(e) => setCustomQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && runCustomScout()}
                            placeholder="e.g., 'latest React 19 features' or 'WebGPU for audio'"
                            className="flex-1 bg-black border-2 border-green-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                        />
                        <button
                            onClick={runCustomScout}
                            disabled={scoutMutation.isPending || !customQuery.trim()}
                            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {scoutMutation.isPending ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                            Scout
                        </button>
                    </div>
                </div>

                {/* SCOUTING STATUS */}
                {scoutMutation.isPending && (
                    <div className="bg-cyan-500/10 border-2 border-cyan-500 rounded-xl p-6 mb-8">
                        <div className="flex items-center gap-3">
                            <Loader className="w-6 h-6 text-cyan-400 animate-spin" />
                            <p className="text-cyan-400 font-bold">Scouting the web...</p>
                        </div>
                    </div>
                )}

                {/* FINDINGS */}
                {findings.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-white mb-4">FINDINGS ({findings.length})</h2>
                        {findings.map((finding, idx) => {
                            const colors = priorityColors[finding.priority] || priorityColors.low;
                            return (
                                <div key={idx} className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-xl p-6`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-black text-white">{finding.title}</h3>
                                        <span className={`px-3 py-1 ${colors.border} border-2 rounded font-mono text-xs ${colors.text} font-bold uppercase`}>
                                            {finding.priority}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="bg-black/50 border border-white/10 rounded-lg p-3">
                                            <p className="text-gray-400 text-xs font-bold mb-1">WHAT IT IS:</p>
                                            <p className="text-gray-300 text-sm font-mono">{finding.description}</p>
                                        </div>

                                        <div className="bg-black/50 border border-white/10 rounded-lg p-3">
                                            <p className="text-cyan-400 text-xs font-bold mb-1">WHY IT MATTERS:</p>
                                            <p className="text-gray-300 text-sm font-mono">{finding.relevance}</p>
                                        </div>

                                        <div className="bg-black/50 border border-green-500/30 rounded-lg p-3">
                                            <p className="text-green-400 text-xs font-bold mb-1">ACTION:</p>
                                            <p className="text-white text-sm font-mono">{finding.actionable}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* EMPTY STATE */}
                {findings.length === 0 && !scoutMutation.isPending && (
                    <div className="bg-black border-2 border-gray-800 rounded-xl p-12 text-center">
                        <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 font-mono text-sm">No findings yet - tap a quick scout or search custom</p>
                    </div>
                )}

                {/* INFO */}
                <div className="mt-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-6 h-6 text-pink-400" />
                        <h3 className="text-xl font-black text-pink-400">WHY THIS MATTERS</h3>
                    </div>
                    <p className="text-gray-300 text-sm font-mono mb-3">
                        Tech moves fast. Base44 ships updates, quantum computing breaks through, AI gets better. 
                        This scout keeps you ahead - tells you what's relevant, what to integrate, what to build.
                    </p>
                    <p className="text-pink-400 text-sm font-mono font-bold">
                        Stay ahead → Integrate best tech → Remain unstoppable ♾️❤️♾️
                    </p>
                </div>

            </div>
        </div>
    );
}