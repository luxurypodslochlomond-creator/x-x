import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Music, Calendar, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';

/**
 * LIFE51 ROI DASHBOARD
 * For labels - prove the value
 * Time saved • Money made • Artists happy
 * COOLASFUCK but credible for execs
 */

export default function Life51ROI() {
    const [timeRange, setTimeRange] = useState('month'); // week | month | quarter | year

    // MOCK DATA - in real world pull from backend
    const stats = {
        timeSaved: {
            hours: 142,
            percentage: 67,
            trend: 'up'
        },
        dealsCompleted: {
            count: 8,
            value: 245000,
            trend: 'up'
        },
        artistsSigned: {
            count: 3,
            percentage: 18,
            trend: 'up'
        },
        tasksAutomated: {
            count: 487,
            percentage: 89,
            trend: 'up'
        },
        contractsGenerated: {
            count: 12,
            timeSaved: 24
        },
        responseTime: {
            hours: 2.3,
            improvement: 78
        }
    };

    const costBreakdown = {
        platformCost: 99,
        timeValue: 3550, // 142 hours × £25/hour
        dealsValue: 245000,
        roi: 247451 / 99 // 2500x return
    };

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-6">
                <div className="bg-gradient-to-r from-amber-500 via-green-500 to-cyan-500 p-[3px] rounded-xl">
                    <div className="bg-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Kingdom51Crown8Bit size={40} animate={true} />
                                <div>
                                    <h1 className="text-2xl font-black text-amber-400 font-mono">ROI DASHBOARD</h1>
                                    <p className="text-[9px] text-amber-500/80 tracking-widest uppercase font-bold font-mono">
                                        PROOF OF VALUE
                                    </p>
                                </div>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded px-3 py-1">
                                <p className="text-green-400 font-black text-xs font-mono">2500x ROI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TIME RANGE */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {['week', 'month', 'quarter', 'year'].map(range => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded font-mono font-bold text-xs whitespace-nowrap transition-all ${
                            timeRange === range
                                ? 'bg-cyan-500 text-black'
                                : 'bg-black border border-gray-800 text-gray-400 hover:border-cyan-500'
                        }`}
                    >
                        {range.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* BIG NUMBER */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-8 mb-6 text-center"
                style={{ boxShadow: '0 0 50px rgba(34, 197, 94, 0.4)' }}
            >
                <p className="text-gray-400 text-sm font-mono mb-2">TOTAL VALUE GENERATED</p>
                <p className="text-6xl font-black text-green-400 mb-2 font-mono">£{(costBreakdown.dealsValue + costBreakdown.timeValue).toLocaleString()}</p>
                <p className="text-gray-500 text-xs font-mono">Platform cost: £{costBreakdown.platformCost}/month</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <ArrowUp className="w-5 h-5 text-green-400" />
                    <p className="text-green-400 font-bold text-lg font-mono">+156% vs last {timeRange}</p>
                </div>
            </motion.div>

            {/* STAT GRID */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* TIME SAVED */}
                <div className="bg-black border-2 border-cyan-500 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" />
                            {stats.timeSaved.percentage}%
                        </span>
                    </div>
                    <p className="text-3xl font-black text-white font-mono mb-1">{stats.timeSaved.hours}h</p>
                    <p className="text-xs text-gray-600 font-mono">Time saved</p>
                    <p className="text-xs text-cyan-400 font-mono mt-2">Worth £{(stats.timeSaved.hours * 25).toLocaleString()}</p>
                </div>

                {/* DEALS */}
                <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 text-xs font-mono flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" />
                            {stats.dealsCompleted.count}
                        </span>
                    </div>
                    <p className="text-3xl font-black text-white font-mono mb-1">£{(stats.dealsCompleted.value / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-gray-600 font-mono">Deals closed</p>
                    <p className="text-xs text-green-400 font-mono mt-2">{stats.dealsCompleted.count} contracts</p>
                </div>

                {/* ARTISTS */}
                <div className="bg-black border-2 border-purple-500 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-400 text-xs font-mono flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" />
                            {stats.artistsSigned.percentage}%
                        </span>
                    </div>
                    <p className="text-3xl font-black text-white font-mono mb-1">{stats.artistsSigned.count}</p>
                    <p className="text-xs text-gray-600 font-mono">Artists signed</p>
                    <p className="text-xs text-purple-400 font-mono mt-2">This {timeRange}</p>
                </div>

                {/* AUTOMATION */}
                <div className="bg-black border-2 border-amber-500 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        <span className="text-amber-400 text-xs font-mono flex items-center gap-1">
                            {stats.tasksAutomated.percentage}%
                        </span>
                    </div>
                    <p className="text-3xl font-black text-white font-mono mb-1">{stats.tasksAutomated.count}</p>
                    <p className="text-xs text-gray-600 font-mono">Tasks automated</p>
                    <p className="text-xs text-amber-400 font-mono mt-2">AI handled</p>
                </div>
            </div>

            {/* DETAILED BREAKDOWN */}
            <div className="bg-black border-2 border-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-amber-400 font-black text-sm font-mono mb-4">💰 VALUE BREAKDOWN</h2>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black border border-green-500/30 rounded">
                        <div>
                            <p className="text-white font-bold text-sm font-mono">Deals closed</p>
                            <p className="text-gray-600 text-xs font-mono">{stats.dealsCompleted.count} contracts</p>
                        </div>
                        <p className="text-green-400 font-black text-lg font-mono">£{stats.dealsCompleted.value.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black border border-cyan-500/30 rounded">
                        <div>
                            <p className="text-white font-bold text-sm font-mono">Time saved</p>
                            <p className="text-gray-600 text-xs font-mono">{stats.timeSaved.hours} hours @ £25/hour</p>
                        </div>
                        <p className="text-cyan-400 font-black text-lg font-mono">£{(stats.timeSaved.hours * 25).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black border border-purple-500/30 rounded">
                        <div>
                            <p className="text-white font-bold text-sm font-mono">Contracts auto-gen</p>
                            <p className="text-gray-600 text-xs font-mono">{stats.contractsGenerated.count} docs, {stats.contractsGenerated.timeSaved}h saved</p>
                        </div>
                        <p className="text-purple-400 font-black text-lg font-mono">£{(stats.contractsGenerated.timeSaved * 25).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black border border-red-500/30 rounded">
                        <div>
                            <p className="text-white font-bold text-sm font-mono">Platform cost</p>
                            <p className="text-gray-600 text-xs font-mono">Monthly subscription</p>
                        </div>
                        <p className="text-red-400 font-black text-lg font-mono">-£{costBreakdown.platformCost}</p>
                    </div>

                    <div className="h-px bg-gray-800 my-3" />

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded">
                        <div>
                            <p className="text-white font-black text-base font-mono">NET VALUE</p>
                            <p className="text-gray-400 text-xs font-mono">Return on investment</p>
                        </div>
                        <div className="text-right">
                            <p className="text-green-400 font-black text-2xl font-mono">£{(costBreakdown.dealsValue + costBreakdown.timeValue - costBreakdown.platformCost).toLocaleString()}</p>
                            <p className="text-green-400 text-xs font-mono">{Math.round(costBreakdown.roi)}x ROI</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMPROVEMENTS */}
            <div className="bg-black border-2 border-gray-800 rounded-xl p-6">
                <h2 className="text-cyan-400 font-black text-sm font-mono mb-4">⚡ EFFICIENCY GAINS</h2>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black border border-cyan-500/30 rounded">
                        <p className="text-white text-sm font-mono">Response time</p>
                        <div className="text-right">
                            <p className="text-cyan-400 font-bold font-mono">{stats.responseTime.hours}h</p>
                            <p className="text-green-400 text-xs font-mono">-{stats.responseTime.improvement}%</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black border border-green-500/30 rounded">
                        <p className="text-white text-sm font-mono">Tasks automated</p>
                        <div className="text-right">
                            <p className="text-green-400 font-bold font-mono">{stats.tasksAutomated.percentage}%</p>
                            <p className="text-gray-500 text-xs font-mono">{stats.tasksAutomated.count} total</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black border border-purple-500/30 rounded">
                        <p className="text-white text-sm font-mono">Artist satisfaction</p>
                        <div className="text-right">
                            <p className="text-purple-400 font-bold font-mono">94%</p>
                            <p className="text-green-400 text-xs font-mono">+23%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">Credible • Provable • Real results</p>
            </div>

        </div>
    );
}