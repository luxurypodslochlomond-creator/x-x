import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Zap, CheckCircle, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * AI51 SMART LEARNING SYSTEM
 * 
 * LEARNS YOUR PATTERNS:
 * - Recognizes repetitive tasks
 * - Suggests automations
 * - Remembers your preferences
 * - Adapts to your style
 * 
 * REDUCES WORK:
 * - "You always email this template" → Auto-draft
 * - "You schedule gigs on Fridays" → Pre-fill
 * - "You prefer this format" → Apply automatically
 * 
 * GETS SMARTER:
 * - Every interaction = learning
 * - Patterns recognized = suggestions
 * - Never forgets what matters
 */

export default function AI51SmartLearning({ userId, context = 'co-manager' }) {
    const [insights, setInsights] = useState([]);

    // Fetch learning patterns
    const { data: memories = [] } = useQuery({
        queryKey: ['ai51_learning', userId],
        queryFn: () => base44.entities.AI51Memory.filter({
            memory_type: 'learning',
            tags: { $contains: context }
        }, '-created_date', 50)
    });

    // Analyze patterns
    useEffect(() => {
        if (memories.length < 3) return;

        const patterns = analyzePatterns(memories);
        setInsights(patterns);
    }, [memories]);

    const analyzePatterns = (mems) => {
        const patterns = [];
        
        // Count task types
        const taskTypes = {};
        mems.forEach(m => {
            const content = m.content.toLowerCase();
            if (content.includes('email')) taskTypes.email = (taskTypes.email || 0) + 1;
            if (content.includes('gig') || content.includes('event')) taskTypes.gig = (taskTypes.gig || 0) + 1;
            if (content.includes('invoice')) taskTypes.invoice = (taskTypes.invoice || 0) + 1;
            if (content.includes('contract')) taskTypes.contract = (taskTypes.contract || 0) + 1;
        });

        // Generate insights
        Object.entries(taskTypes).forEach(([type, count]) => {
            if (count >= 3) {
                patterns.push({
                    type,
                    count,
                    suggestion: getSuggestion(type, count)
                });
            }
        });

        return patterns;
    };

    const getSuggestion = (type, count) => {
        const suggestions = {
            email: `You've sent ${count} similar emails. I can auto-draft them now.`,
            gig: `You've scheduled ${count} gigs. I can pre-fill details based on past patterns.`,
            invoice: `You've created ${count} invoices. I can generate them automatically.`,
            contract: `You've reviewed ${count} contracts. I can highlight key terms instantly.`
        };
        return suggestions[type] || `I've learned your ${type} workflow (${count} times).`;
    };

    return (
        <div className="bg-gradient-to-br from-black via-purple-950 to-black border-2 border-purple-500 rounded-2xl p-6" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)' }}>
            <div className="flex items-center gap-3 mb-6">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Brain className="w-10 h-10 text-purple-400" />
                </motion.div>
                <div>
                    <h2 className="text-purple-400 font-black text-2xl font-mono">LEARNING YOU</h2>
                    <p className="text-gray-500 text-xs font-mono">Getting smarter every day ♾️❤️♾️</p>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="text-cyan-400 text-2xl font-black font-mono">{memories.length}</p>
                    <p className="text-gray-500 text-xs font-mono">Memories</p>
                </div>
                <div className="bg-black/60 border border-green-500/30 rounded-lg p-3 text-center">
                    <p className="text-green-400 text-2xl font-black font-mono">{insights.length}</p>
                    <p className="text-gray-500 text-xs font-mono">Patterns</p>
                </div>
                <div className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center">
                    <p className="text-purple-400 text-2xl font-black font-mono">{insights.reduce((sum, i) => sum + i.count, 0)}</p>
                    <p className="text-gray-500 text-xs font-mono">Actions</p>
                </div>
            </div>

            {/* INSIGHTS */}
            <div className="space-y-3">
                {insights.length === 0 ? (
                    <div className="bg-black/60 border border-gray-700 rounded-lg p-6 text-center">
                        <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm font-mono">Learning your patterns...</p>
                        <p className="text-gray-700 text-xs font-mono mt-1">Use me more and I'll get smarter ♾️</p>
                    </div>
                ) : (
                    insights.map((insight, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="bg-purple-500 rounded-full p-2 flex-shrink-0">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-bold text-sm font-mono mb-1">
                                        {insight.type.toUpperCase()} PATTERN DETECTED
                                    </p>
                                    <p className="text-purple-300 text-xs font-mono">{insight.suggestion}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <CheckCircle className="w-3 h-3 text-green-400" />
                                        <p className="text-green-400 text-xs font-mono font-bold">Ready to automate</p>
                                    </div>
                                </div>
                                <div className="bg-purple-900/50 rounded px-2 py-1">
                                    <p className="text-purple-400 text-xs font-black font-mono">{insight.count}x</p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* OPEN SOURCE BADGE */}
            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <div>
                        <p className="text-cyan-400 font-bold text-xs font-mono">OPEN SOURCE CORE</p>
                        <p className="text-gray-500 text-xs font-mono">Can merge with other AIs • Frequency-based intelligence ♾️</p>
                    </div>
                </div>
            </div>
        </div>
    );
}