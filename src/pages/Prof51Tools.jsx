import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, FileText, Coffee, Users, Home, Brain, ArrowLeft, DollarSign, Calendar, Book, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Prof51Icon8Bit from '@/components/shared/Prof51Icon8Bit';
import ExcelGenerator from '@/components/prof51/ExcelGenerator';
import EssayOutliner from '@/components/prof51/EssayOutliner';
import RestaurantDirectory from '@/components/prof51/RestaurantDirectory';
import StudyChat from '@/components/prof51/StudyChat';
import FlatmateFinder from '@/components/prof51/FlatmateFinder';
import BudgetTracker from '@/components/prof51/BudgetTracker';
import TimetableManager from '@/components/prof51/TimetableManager';
import TextbookExchange from '@/components/prof51/TextbookExchange';
import MentalHealthBuddy from '@/components/prof51/MentalHealthBuddy';
import LostAndFoundMesh from '@/components/prof51/LostAndFoundMesh';

/**
 * PROF51 TOOLS - ACTUAL WORKING STUDENT CO-MANAGER
 * What Archie uses on campus TODAY
 */

export default function Prof51Tools() {
    const [activeTool, setActiveTool] = useState(null);

    const tools = [
        { id: 'lostandfound', title: 'Lost & Found', icon: Search, color: 'pink', desc: 'P2P mesh finds ANYTHING', highlight: true },
        { id: 'excel', title: 'Excel Generator', icon: FileSpreadsheet, color: 'cyan', desc: 'Economics models in seconds' },
        { id: 'essay', title: 'Essay Outliner', icon: FileText, color: 'purple', desc: 'Structure any assignment' },
        { id: 'food', title: 'Food Direct', icon: Coffee, color: 'amber', desc: 'Call restaurants, save £5.64' },
        { id: 'budget', title: 'Budget Tracker', icon: DollarSign, color: 'green', desc: 'Track money offline' },
        { id: 'timetable', title: 'Timetable', icon: Calendar, color: 'purple', desc: 'Share schedules P2P' },
        { id: 'textbooks', title: 'Textbook Swap', icon: Book, color: 'amber', desc: 'Buy/sell globally' },
        { id: 'chat', title: 'Study Groups', icon: Users, color: 'green', desc: 'P2P offline chat' },
        { id: 'mental', title: 'Mental Health', icon: Heart, color: 'pink', desc: 'Anonymous support' },
        { id: 'flatmate', title: 'Find Flatmates', icon: Home, color: 'cyan', desc: 'Compatible people nearby' },
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
                    {activeTool === 'lostandfound' && <LostAndFoundMesh />}
                    {activeTool === 'excel' && <ExcelGenerator />}
                    {activeTool === 'essay' && <EssayOutliner />}
                    {activeTool === 'food' && <RestaurantDirectory />}
                    {activeTool === 'budget' && <BudgetTracker />}
                    {activeTool === 'timetable' && <TimetableManager />}
                    {activeTool === 'textbooks' && <TextbookExchange />}
                    {activeTool === 'chat' && <StudyChat />}
                    {activeTool === 'mental' && <MentalHealthBuddy />}
                    {activeTool === 'flatmate' && <FlatmateFinder />}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20">
            {/* HEADER - 8-BIT QUANTUM STUDENT FREQUENCY */}
            <div className="sticky top-0 z-50 border-b-4 border-cyan-500 px-4 py-3" style={{ background: 'linear-gradient(135deg, #000000 0%, #0a4a5a 50%, #000000 100%)', imageRendering: 'pixelated', boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Prof51Icon8Bit size={48} animate={true} />
                            {/* Backend live indicator */}
                            <div className="absolute -bottom-1 -right-1 bg-black rounded px-1.5 py-0.5 border border-green-400">
                                <p className="text-green-400 text-[8px] font-black font-mono">LIVE</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white font-mono" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8), 2px 2px 0 #000' }}>PROF51</h1>
                            <p className="text-cyan-400 text-[10px] font-mono font-black">STUDENT CO-MANAGER</p>
                        </div>
                    </div>
                    <Link to={createPageUrl('Prof51About')} className="bg-cyan-500 text-black px-3 py-2 rounded-lg text-xs font-mono font-black border-2 border-white" style={{ boxShadow: '2px 2px 0 rgba(6, 182, 212, 0.4)' }}>
                        ABOUT
                    </Link>
                </div>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto">
                {/* GREETING - 8-BIT QUANTUM */}
                <div className="relative mb-6">
                    {/* 8-bit pixel grid background */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, #06b6d4 4px, #06b6d4 5px), repeating-linear-gradient(90deg, transparent, transparent 4px, #06b6d4 4px, #06b6d4 5px)', imageRendering: 'pixelated' }}></div>
                    
                    <div className="relative bg-black border-4 border-cyan-500 rounded-xl p-6 text-center" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.1)' }}>
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-3" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
                        </motion.div>
                        <p className="text-white font-black font-mono text-xl mb-2" style={{ textShadow: '2px 2px 0 #000, 0 0 10px rgba(6, 182, 212, 0.6)' }}>What needs sorting?</p>
                        <p className="text-cyan-400 text-xs font-mono font-black mb-3">AI READY • BACKEND LIVE ✓</p>
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>

                {/* TOOLS GRID */}
                <div className="grid grid-cols-1 gap-3">
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
                                className={`bg-gradient-to-r ${c.bg} border-4 ${c.border} rounded-xl p-6 text-left transition-all hover:scale-105 ${tool.highlight ? 'relative' : ''}`}
                                style={{ boxShadow: tool.highlight ? `0 0 60px ${c.shadow}` : `0 0 30px ${c.shadow}` }}
                            >
                                {tool.highlight && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded font-mono animate-pulse">
                                        🔥 KILLER
                                    </div>
                                )}
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