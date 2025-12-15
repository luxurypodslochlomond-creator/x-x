import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, FileText, Coffee, Users, Home, Brain, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Prof51Icon8Bit from '@/components/shared/Prof51Icon8Bit';
import ExcelGenerator from '@/components/prof51/ExcelGenerator';
import EssayOutliner from '@/components/prof51/EssayOutliner';
import RestaurantDirectory from '@/components/prof51/RestaurantDirectory';
import StudyChat from '@/components/prof51/StudyChat';
import FlatmateFinder from '@/components/prof51/FlatmateFinder';

/**
 * PROF51 TOOLS - ACTUAL WORKING STUDENT CO-MANAGER
 * What Archie uses on campus TODAY
 */

export default function Prof51Tools() {
    const [activeTool, setActiveTool] = useState(null);

    const tools = [
        { id: 'excel', title: 'Excel Generator', icon: FileSpreadsheet, color: 'cyan', desc: 'Economics models in seconds' },
        { id: 'essay', title: 'Essay Outliner', icon: FileText, color: 'purple', desc: 'Structure any assignment' },
        { id: 'food', title: 'Food Direct', icon: Coffee, color: 'amber', desc: 'Call restaurants, save £5.64' },
        { id: 'chat', title: 'Study Groups', icon: Users, color: 'green', desc: 'P2P offline chat' },
        { id: 'flatmate', title: 'Find Flatmates', icon: Home, color: 'pink', desc: 'Compatible people nearby' },
    ];

    if (activeTool) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 px-4 py-3">
                    <button
                        onClick={() => setActiveTool(null)}
                        className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        BACK TO TOOLS
                    </button>
                </div>

                <div className="p-4">
                    {activeTool === 'excel' && <ExcelGenerator />}
                    {activeTool === 'essay' && <EssayOutliner />}
                    {activeTool === 'food' && <RestaurantDirectory />}
                    {activeTool === 'chat' && <StudyChat />}
                    {activeTool === 'flatmate' && <FlatmateFinder />}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Prof51Icon8Bit size={40} animate={true} />
                        <div>
                            <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">PROF51 TOOLS</h1>
                            <p className="text-cyan-500 text-[10px] font-mono">Archie's co-manager</p>
                        </div>
                    </div>
                    <Link to={createPageUrl('Prof51')} className="text-cyan-400 text-xs font-mono">ABOUT</Link>
                </div>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto">
                {/* GREETING */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-4 mb-6 text-center">
                    <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                    <p className="text-white font-black font-mono text-lg mb-1">What needs sorting, Archie?</p>
                    <p className="text-gray-400 text-xs font-mono">Tap what you need help with</p>
                </div>

                {/* TOOLS GRID */}
                <div className="grid grid-cols-1 gap-4">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        const colorMap = {
                            cyan: { border: 'border-cyan-500', bg: 'from-cyan-500/20 to-cyan-500/10', text: 'text-cyan-400', shadow: 'rgba(6, 182, 212, 0.4)' },
                            purple: { border: 'border-purple-500', bg: 'from-purple-500/20 to-purple-500/10', text: 'text-purple-400', shadow: 'rgba(168, 85, 247, 0.4)' },
                            amber: { border: 'border-amber-500', bg: 'from-amber-500/20 to-amber-500/10', text: 'text-amber-400', shadow: 'rgba(245, 158, 11, 0.4)' },
                            green: { border: 'border-green-500', bg: 'from-green-500/20 to-green-500/10', text: 'text-green-400', shadow: 'rgba(34, 197, 94, 0.4)' },
                            pink: { border: 'border-pink-500', bg: 'from-pink-500/20 to-pink-500/10', text: 'text-pink-400', shadow: 'rgba(236, 72, 153, 0.4)' },
                        };
                        const c = colorMap[tool.color];

                        return (
                            <motion.button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-gradient-to-r ${c.bg} border-4 ${c.border} rounded-xl p-6 text-left transition-all hover:scale-105`}
                                style={{ boxShadow: `0 0 30px ${c.shadow}` }}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon className={`w-12 h-12 ${c.text} flex-shrink-0`} />
                                    <div>
                                        <h2 className={`${c.text} font-black text-lg font-mono mb-1`}>{tool.title}</h2>
                                        <p className="text-gray-400 text-xs font-mono">{tool.desc}</p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* QUICK STATS */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 text-center">
                        <p className="text-cyan-400 text-2xl font-black font-mono">12</p>
                        <p className="text-gray-400 text-[10px] font-mono">Hours saved</p>
                    </div>
                    <div className="bg-black/60 border border-green-500/30 rounded-lg p-3 text-center">
                        <p className="text-green-400 text-2xl font-black font-mono">£43</p>
                        <p className="text-gray-400 text-[10px] font-mono">Money saved</p>
                    </div>
                    <div className="bg-black/60 border border-pink-500/30 rounded-lg p-3 text-center">
                        <p className="text-pink-400 text-2xl font-black font-mono">24/7</p>
                        <p className="text-gray-400 text-[10px] font-mono">Always here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}