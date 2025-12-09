import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Activity, Clock, Target, TrendingDown, Sparkles, Heart, Moon, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKBrain, COOLASFUCKMoon, COOLASFUCKShield, COOLASFUCKZap } from '@/components/shared/COOLASFUCKIcon';
import ClinicalOutcomes from '@/components/dashboard/ClinicalOutcomes';
import MorphicResonance from '@/components/dashboard/MorphicResonance';

/**
 * HEALING RESONANCE DASHBOARD
 * 8-bit custom dashboard showing YOUR healing signature
 * Data serves YOU, not advertisers
 */

// Expandable section component - FREQUENCY CHAMBER AESTHETIC
const DashboardSection = ({ title, icon: Icon, color, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    const colorMap = {
        'border-cyan-500': { 
            border: 'border-cyan-500/30', 
            borderHover: 'hover:border-cyan-500',
            text: 'text-cyan-400',
            bg: 'from-cyan-500/10',
            glow: '0 0 30px rgba(34, 211, 238, 0.2)'
        },
        'border-pink-500': { 
            border: 'border-pink-500/30', 
            borderHover: 'hover:border-pink-500',
            text: 'text-pink-400',
            bg: 'from-pink-500/10',
            glow: '0 0 30px rgba(236, 72, 153, 0.2)'
        },
        'border-green-500': { 
            border: 'border-green-500/30', 
            borderHover: 'hover:border-green-500',
            text: 'text-green-400',
            bg: 'from-green-500/10',
            glow: '0 0 30px rgba(34, 197, 94, 0.2)'
        },
        'border-amber-500': { 
            border: 'border-amber-500/30', 
            borderHover: 'hover:border-amber-500',
            text: 'text-amber-400',
            bg: 'from-amber-500/10',
            glow: '0 0 30px rgba(245, 158, 11, 0.2)'
        },
        'border-purple-500': { 
            border: 'border-purple-500/30', 
            borderHover: 'hover:border-purple-500',
            text: 'text-purple-400',
            bg: 'from-purple-500/10',
            glow: '0 0 30px rgba(168, 85, 247, 0.2)'
        },
    };
    
    const c = colorMap[color] || colorMap['border-cyan-500'];
    
    return (
        <Card className={`relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 ${c.border} ${c.borderHover} transition-all`}
              style={{ boxShadow: isOpen ? c.glow : 'none' }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} via-transparent to-transparent opacity-${isOpen ? '100' : '0'} transition-opacity`} />
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-full p-5 sm:p-6 flex items-center justify-between group"
            >
                <div className="flex items-center gap-4">
                    <Icon size={40} animate={isOpen} className={c.text} />
                    <h2 className={`text-xl sm:text-2xl font-black font-mono ${c.text}`}>
                        {title}
                    </h2>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className={`w-6 h-6 ${c.text} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <div className="relative px-5 sm:px-6 pb-6 pt-2 border-t border-white/10">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

// 8-bit pixel chart component
const PixelChart = ({ data, color, maxHeight = 100 }) => {
    const max = Math.max(...data, 1);
    
    return (
        <div className="flex items-end gap-1 h-24">
            {data.map((value, i) => {
                const height = (value / max) * maxHeight;
                return (
                    <div
                        key={i}
                        className={`w-3 ${color} transition-all hover:opacity-80`}
                        style={{ 
                            height: `${height}%`,
                            minHeight: value > 0 ? '8px' : '2px'
                        }}
                    />
                );
            })}
        </div>
    );
};

export default function HealingDashboard() {
    const [selectedStat, setSelectedStat] = useState(null);
    
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => base44.auth.me(),
        retry: false
    });

    const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ['healing-sessions'],
        queryFn: async () => {
            const allSessions = await base44.entities.VoiceHealingSession.list('-session_date', 100);
            return allSessions;
        },
        enabled: !!user
    });

    // Fetch collective stats (limited for performance)
    const { data: allSessions = [] } = useQuery({
        queryKey: ['all-healing-sessions'],
        queryFn: async () => {
            return await base44.entities.VoiceHealingSession.list('-session_date', 500);
        }
    });

    // Calculate healing intel
    const healingIntel = useMemo(() => {
        if (!sessions.length) return null;

        // Frequency preferences
        const protocolCounts = {};
        sessions.forEach(s => {
            protocolCounts[s.recommended_protocol] = (protocolCounts[s.recommended_protocol] || 0) + 1;
        });
        const topProtocol = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1])[0];

        // Stress patterns by hour
        const hourlyStress = Array(24).fill(0);
        const hourlyCounts = Array(24).fill(0);
        sessions.forEach(s => {
            if (s.session_date && s.stress_level_detected) {
                const hour = new Date(s.session_date).getHours();
                hourlyStress[hour] += s.stress_level_detected;
                hourlyCounts[hour]++;
            }
        });
        const avgHourlyStress = hourlyStress.map((total, i) => 
            hourlyCounts[i] > 0 ? Math.round(total / hourlyCounts[i]) : 0
        );
        const peakStressHour = avgHourlyStress.indexOf(Math.max(...avgHourlyStress));

        // Stress trend (last 7 sessions)
        const recentStress = sessions.slice(0, 7).map(s => s.stress_level_detected || 0).reverse();
        const avgRecentStress = recentStress.reduce((a, b) => a + b, 0) / recentStress.length;
        const firstSessionStress = sessions[sessions.length - 1]?.stress_level_detected || avgRecentStress;
        const improvement = firstSessionStress - avgRecentStress;

        // Healing streak
        const now = new Date();
        let streak = 0;
        for (let i = 0; i < sessions.length; i++) {
            const sessionDate = new Date(sessions[i].session_date);
            const daysDiff = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24));
            if (daysDiff <= streak + 1) streak++;
            else break;
        }

        return {
            topProtocol: topProtocol ? topProtocol[0] : null,
            topProtocolCount: topProtocol ? topProtocol[1] : 0,
            peakStressHour,
            avgHourlyStress,
            recentStress,
            improvement,
            avgRecentStress: Math.round(avgRecentStress),
            totalSessions: sessions.length,
            streak
        };
    }, [sessions]);

    if (userLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <COOLASFUCKWaves size={64} animate={true} />
                    <p className="text-white font-mono text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    // PUBLIC VIEW - Show collective data always
    if (!user || (!sessionsLoading && !sessions.length) || !healingIntel) {
        // Calculate live stats from collective data (safely handle undefined/null)
        const safeAllSessions = Array.isArray(allSessions) ? allSessions : [];
        const totalHealers = safeAllSessions.length > 0 ? new Set(safeAllSessions.map(s => s.created_by)).size : 0;
        const totalSessions = safeAllSessions.length;
        const avgStressReduction = safeAllSessions.length > 0 
            ? Math.round(safeAllSessions.reduce((acc, s) => acc + (s.stress_level_detected || 0), 0) / safeAllSessions.length)
            : 0;
        const last24h = safeAllSessions.filter(s => {
            if (!s.session_date) return false;
            const sessionTime = new Date(s.session_date).getTime();
            const now = Date.now();
            return (now - sessionTime) < 24 * 60 * 60 * 1000;
        }).length;

        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    
                    {/* HEADER */}
                    <div className="text-center space-y-4 mb-8">
                        <COOLASFUCKBrain size={64} animate={true} className="mx-auto" />
                        <h1 className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-green-400">
                            HEALING RESONANCE
                        </h1>
                        <p className="text-gray-400 font-mono">Your healing strengthens the collective field</p>
                        </div>

                        {/* WHAT IS THIS - SUBTLE EXPLAINER */}
                        <div className="bg-cyan-900/10 border border-cyan-500/30 p-3 text-center">
                            <p className="text-cyan-400 font-mono text-xs mb-1">
                                Your healing patterns, stress intel, collective resonance
                            </p>
                            <p className="text-gray-500 font-mono text-[10px]">
                                Zero ads. Zero manipulation. Just healing intelligence.
                            </p>
                        </div>

                        {/* LIVE COLLECTIVE STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-black border-4 border-purple-500 p-4 text-center">
                            <COOLASFUCKWaves size={32} animate={true} className="mx-auto mb-2" />
                            <p className="text-3xl font-black text-purple-400 font-mono">{totalHealers}</p>
                            <p className="text-sm text-gray-400 font-mono">Healers</p>
                        </Card>

                        <Card className="bg-black border-4 border-cyan-500 p-4 text-center">
                            <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-cyan-400 font-mono">{totalSessions}</p>
                            <p className="text-sm text-gray-400 font-mono">Total Sessions</p>
                        </Card>

                        <Card className="bg-black border-4 border-green-500 p-4 text-center">
                            <TrendingDown className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-green-400 font-mono">{avgStressReduction}</p>
                            <p className="text-sm text-gray-400 font-mono">Avg Stress</p>
                        </Card>

                        <Card className="bg-black border-4 border-amber-500 p-4 text-center">
                            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-amber-400 font-mono">{last24h}</p>
                            <p className="text-sm text-gray-400 font-mono">Last 24h</p>
                        </Card>
                    </div>

                    {/* YOUR TRACKING OPTIONS */}
                    <Card className="bg-black border-4 border-green-500 p-6">
                        <h2 className="text-2xl font-black text-green-400 font-mono mb-4 text-center">HOW TO START TRACKING</h2>

                        <div className="bg-green-900/20 border-2 border-green-500 p-6 mb-6 text-center">
                            <COOLASFUCKWaves size={48} animate={true} className="mx-auto mb-4" />
                            <h3 className="text-xl font-black text-green-400 font-mono mb-3">JUST PLAY FREQUENCIES</h3>
                            <p className="text-gray-300 font-mono text-sm mb-4">
                                Every frequency session you play automatically saves to your dashboard. No voice recording needed.
                            </p>
                            <Link
                                to={createPageUrl('FrequencyChamber')}
                                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 font-black font-mono text-lg"
                            >
                                GO TO FREQUENCY CHAMBER
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* VOICE HEALING - OPTIONAL */}
                            <div className="bg-pink-900/20 border-2 border-pink-500/50 p-6 text-center space-y-4">
                                <COOLASFUCKHeart size={40} animate={true} className="mx-auto" />
                                <h3 className="text-lg font-black text-pink-400 font-mono">VOICE HEALING (OPTIONAL)</h3>
                                <p className="text-gray-400 font-mono text-xs">
                                    AI analyzes your voice stress for personalized recommendations. Optional extra.
                                </p>
                            </div>

                            {/* CLINICAL ASSESSMENT - OPTIONAL */}
                            <div className="bg-cyan-900/20 border-2 border-cyan-500/50 p-6 text-center space-y-4">
                                <Shield className="w-10 h-10 text-cyan-400 mx-auto" />
                                <h3 className="text-lg font-black text-cyan-400 font-mono">CLINICAL TESTS (OPTIONAL)</h3>
                                <p className="text-gray-400 font-mono text-xs">
                                    PHQ-9 & GAD-7 - NHS standard depression/anxiety tracking. Optional extra.
                                </p>
                            </div>

                        </div>
                    </Card>

                    {/* MORPHIC RESONANCE DATA - PUBLIC */}
                    <Card className="bg-black border-4 border-purple-500 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <COOLASFUCKWaves size={32} animate={true} />
                            <h3 className="text-2xl font-black font-mono text-purple-400">
                                COLLECTIVE HEALING PATTERNS
                            </h3>
                        </div>
                        <p className="text-gray-400 font-mono text-sm mb-4">
                            Do people heal faster when using frequencies together? Tracking collective healing patterns.
                        </p>
                        <MorphicResonance />
                    </Card>

                    {/* SIGN IN FOR PERSONAL TRACKING */}
                    {!user && (
                        <Card className="bg-black border-4 border-cyan-500 p-6 text-center">
                            <COOLASFUCKBrain size={48} animate={true} className="mx-auto mb-4" />
                            <h3 className="text-2xl font-black text-cyan-400 font-mono mb-3">TRACK YOUR PERSONAL HEALING</h3>
                            <p className="text-gray-300 font-mono text-sm mb-6">
                                Sign in to track your stress patterns, progress over time, and get personalized insights.
                            </p>
                            <button
                                onClick={() => base44.auth.redirectToLogin()}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 font-black font-mono text-lg"
                            >
                                SIGN IN TO TRACK
                            </button>
                        </Card>
                    )}

                    <div className="text-center pt-4 space-y-2 border-t-2 border-white/10">
                        <p className="text-gray-500 font-mono text-sm">
                            This data serves YOU, not advertisers
                        </p>
                        <p className="text-gray-600 font-mono text-xs">
                            Zero extraction. Zero manipulation. Just healing.
                        </p>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 relative"
                >
                    <div className="absolute inset-0 blur-3xl opacity-30">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-500 rounded-full" />
                        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500 rounded-full" />
                    </div>

                    <div className="relative">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <COOLASFUCKBrain size={72} animate={true} className="mx-auto mb-6" />
                        </motion.div>

                        <h1 className="text-4xl sm:text-6xl font-black font-mono mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-green-400">
                                HEALING RESONANCE
                            </span>
                        </h1>

                        <p className="text-gray-400 font-mono text-sm sm:text-base max-w-2xl mx-auto">
                            Your healing strengthens the collective field
                        </p>
                    </div>
                </motion.div>

                {/* WHAT IS THIS - SLEEK BANNER */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />
                    <div className="relative backdrop-blur-xl bg-cyan-900/10 border border-cyan-500/30 px-6 py-4 text-center">
                        <p className="text-cyan-400 font-mono text-xs sm:text-sm font-bold mb-1">
                            Healing patterns • Stress intel • Collective resonance
                        </p>
                        <p className="text-gray-500 font-mono text-[10px] sm:text-xs">
                            Zero ads. Zero manipulation. Just healing intelligence.
                        </p>
                    </div>
                </motion.div>

                {/* QUICK STATS - SLEEK TAPPABLE CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card 
                            onClick={() => setSelectedStat(selectedStat === 'sessions' ? null : 'sessions')}
                            className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-pink-500/30 hover:border-pink-500 p-5 sm:p-6 text-center cursor-pointer transition-all active:scale-95 group"
                            style={{ boxShadow: selectedStat === 'sessions' ? '0 0 30px rgba(236, 72, 153, 0.3)' : 'none' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <COOLASFUCKHeart size={36} animate={true} className="mx-auto mb-3" />
                                <p className="text-4xl sm:text-5xl font-black text-pink-400 font-mono mb-2">{healingIntel.totalSessions}</p>
                                <p className="text-xs sm:text-sm text-gray-400 font-mono font-bold">Sessions</p>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card 
                            onClick={() => setSelectedStat(selectedStat === 'stress' ? null : 'stress')}
                            className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-green-500/30 hover:border-green-500 p-5 sm:p-6 text-center cursor-pointer transition-all active:scale-95 group"
                            style={{ boxShadow: selectedStat === 'stress' ? '0 0 30px rgba(34, 197, 94, 0.3)' : 'none' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <TrendingDown className="w-9 h-9 text-green-400 mx-auto mb-3" />
                                <p className="text-4xl sm:text-5xl font-black text-green-400 font-mono mb-2">
                                    {healingIntel.improvement > 0 ? '-' : ''}{Math.round(Math.abs(healingIntel.improvement))}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400 font-mono font-bold">Stress Drop</p>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card 
                            onClick={() => setSelectedStat(selectedStat === 'streak' ? null : 'streak')}
                            className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-amber-500/30 hover:border-amber-500 p-5 sm:p-6 text-center cursor-pointer transition-all active:scale-95 group"
                            style={{ boxShadow: selectedStat === 'streak' ? '0 0 30px rgba(245, 158, 11, 0.3)' : 'none' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <Sparkles className="w-9 h-9 text-amber-400 mx-auto mb-3" />
                                <p className="text-4xl sm:text-5xl font-black text-amber-400 font-mono mb-2">{healingIntel.streak}</p>
                                <p className="text-xs sm:text-sm text-gray-400 font-mono font-bold">Day Streak</p>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card 
                            onClick={() => setSelectedStat(selectedStat === 'average' ? null : 'average')}
                            className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-cyan-500/30 hover:border-cyan-500 p-5 sm:p-6 text-center cursor-pointer transition-all active:scale-95 group"
                            style={{ boxShadow: selectedStat === 'average' ? '0 0 30px rgba(34, 211, 238, 0.3)' : 'none' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <Activity className="w-9 h-9 text-cyan-400 mx-auto mb-3" />
                                <p className="text-4xl sm:text-5xl font-black text-cyan-400 font-mono mb-2">{healingIntel.avgRecentStress}</p>
                                <p className="text-xs sm:text-sm text-gray-400 font-mono font-bold">Avg Stress</p>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* INLINE STAT INTEL - SLEEK EXPANSION */}
                <AnimatePresence>
                    {selectedStat === 'sessions' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden mb-6"
                        >
                            <Card className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-pink-500 p-6 sm:p-8"
                                  style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-transparent" />
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <COOLASFUCKHeart size={48} animate={true} />
                                        <h3 className="text-3xl font-black text-pink-400 font-mono">SESSIONS</h3>
                                    </div>
                                    <p className="text-white font-mono text-sm sm:text-base mb-4 leading-relaxed">
                                        You've completed <strong className="text-pink-400 text-lg">{healingIntel.totalSessions} healing sessions</strong>. 
                                        Each time you use the Frequency Chamber, it adds to your healing journey.
                                    </p>
                                    <div className="bg-pink-900/20 border-l-4 border-pink-500 pl-4 py-2">
                                        <p className="text-gray-300 font-mono text-xs sm:text-sm">
                                            More sessions = stronger neural pathways. Your nervous system is learning to self-regulate.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {selectedStat === 'stress' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden mb-6"
                        >
                            <Card className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-green-500 p-6 sm:p-8"
                                  style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.2)' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-transparent" />
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <TrendingDown className="w-12 h-12 text-green-400" />
                                        <h3 className="text-3xl font-black text-green-400 font-mono">STRESS DROP</h3>
                                    </div>
                                    <p className="text-white font-mono text-sm sm:text-base mb-4 leading-relaxed">
                                        Your stress levels have dropped by <strong className="text-green-400 text-lg">{Math.round(Math.abs(healingIntel.improvement))} points</strong> on average 
                                        compared to when you started.
                                    </p>
                                    <p className="text-gray-300 font-mono text-xs sm:text-sm mb-4">
                                        This is measured from your first session to your recent average. The frequencies are working ❤️
                                    </p>
                                    <div className="bg-green-900/30 border-l-4 border-green-500 pl-4 py-3">
                                        <p className="text-green-300 font-mono text-xs sm:text-sm font-bold">
                                            ✓ Clinical significance: A 10+ point drop indicates measurable nervous system regulation.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {selectedStat === 'streak' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden mb-6"
                        >
                            <Card className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-amber-500 p-6 sm:p-8"
                                  style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent" />
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Sparkles className="w-12 h-12 text-amber-400" />
                                        <h3 className="text-3xl font-black text-amber-400 font-mono">DAY STREAK</h3>
                                    </div>
                                    <p className="text-white font-mono text-sm sm:text-base mb-4 leading-relaxed">
                                        You've shown up for yourself <strong className="text-amber-400 text-lg">{healingIntel.streak} days</strong> in a row. 
                                        That's commitment to your healing.
                                    </p>
                                    <div className="bg-amber-900/20 border-l-4 border-amber-500 pl-4 py-2 mb-4">
                                        <p className="text-gray-300 font-mono text-xs sm:text-sm">
                                            Consistency > intensity. Daily frequency exposure creates lasting neural changes.
                                        </p>
                                    </div>
                                    {healingIntel.streak >= 7 && (
                                        <div className="bg-amber-900/30 border-2 border-amber-500 p-4 backdrop-blur-sm">
                                            <p className="text-amber-300 font-mono text-xs sm:text-sm font-bold">
                                                🔥 Research shows 7+ days of daily practice creates measurable brain changes.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {selectedStat === 'average' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden mb-6"
                        >
                            <Card className="relative overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-cyan-500 p-6 sm:p-8"
                                  style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.2)' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent" />
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Activity className="w-12 h-12 text-cyan-400" />
                                        <h3 className="text-3xl font-black text-cyan-400 font-mono">AVG STRESS</h3>
                                    </div>
                                    <p className="text-white font-mono text-sm sm:text-base mb-6 leading-relaxed">
                                        Your recent average stress level is <strong className="text-cyan-400 text-lg">{healingIntel.avgRecentStress}/100</strong>.
                                    </p>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-xs sm:text-sm font-mono font-bold">
                                            <span className="text-green-400">0-30: Calm</span>
                                            <span className="text-yellow-400">31-60: Moderate</span>
                                            <span className="text-red-400">61+: High</span>
                                        </div>
                                        <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-cyan-500/30">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${healingIntel.avgRecentStress}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={`h-full ${
                                                    healingIntel.avgRecentStress <= 30 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                                                    healingIntel.avgRecentStress <= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                                                    'bg-gradient-to-r from-red-500 to-red-400'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-cyan-900/20 border-l-4 border-cyan-500 pl-4 py-2">
                                        <p className="text-gray-300 font-mono text-xs sm:text-sm">
                                            Based on your last 7 sessions. Keep using frequencies to lower this naturally.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* EXPANDABLE SECTIONS - SLEEK DESIGN */}
                <div className="space-y-4">

                    {/* YOUR HEALING SIGNATURE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <DashboardSection
                            title="YOUR HEALING SIGNATURE"
                            icon={COOLASFUCKWaves}
                            color="border-cyan-500"
                            defaultOpen={false}
                        >
                        <div className="space-y-6">
                            <div className="bg-cyan-900/30 backdrop-blur-sm border-l-4 border-cyan-500 p-5">
                                <p className="text-cyan-400 font-mono font-bold text-sm mb-3">Your go-to protocol:</p>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                                        {healingIntel.topProtocol}
                                    </div>
                                    <div className="text-cyan-300 font-mono text-xs sm:text-sm bg-cyan-900/30 px-3 py-1 rounded-full">
                                        Used {healingIntel.topProtocolCount}x
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">
                                This is YOUR signature healing frequency. Your nervous system knows what it needs.
                            </p>
                        </div>
                    </DashboardSection>

                    {/* STRESS PATTERNS */}
                    <DashboardSection
                        title="WHEN YOU NEED HEALING MOST"
                        icon={Clock}
                        color="border-pink-500"
                    >
                        <div className="space-y-6">
                            <div className="bg-pink-900/30 backdrop-blur-sm border-l-4 border-pink-500 p-5">
                                <p className="text-pink-400 font-mono font-bold text-sm mb-3">Your hardest time:</p>
                                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                                    {healingIntel.peakStressHour}:00 - {(healingIntel.peakStressHour + 1) % 24}:00
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-gray-400 font-mono text-sm font-bold">24-hour stress pattern:</p>
                                <div className="bg-black/40 p-4 rounded-lg border border-pink-500/20">
                                    <PixelChart 
                                        data={healingIntel.avgHourlyStress} 
                                        color="bg-pink-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 font-mono mt-2">
                                        <span>00:00</span>
                                        <span>12:00</span>
                                        <span>23:00</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">
                                The app could auto-suggest protocols at your peak stress times.
                            </p>
                        </div>
                    </DashboardSection>

                    {/* NERVOUS SYSTEM REGULATION */}
                    <DashboardSection
                        title="NERVOUS SYSTEM PROGRESS"
                        icon={Activity}
                        color="border-green-500"
                    >
                        <div className="space-y-6">
                            <div className="bg-green-900/30 backdrop-blur-sm border-l-4 border-green-500 p-5">
                                <p className="text-green-400 font-mono font-bold text-sm mb-3">Stress reduction:</p>
                                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                                    {healingIntel.improvement > 0 ? '↓' : '↔'} {Math.round(Math.abs(healingIntel.improvement))} points
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-gray-400 font-mono text-sm font-bold">Last 7 sessions:</p>
                                <div className="bg-black/40 p-4 rounded-lg border border-green-500/20">
                                    <PixelChart 
                                        data={healingIntel.recentStress} 
                                        color="bg-green-500"
                                    />
                                </div>
                            </div>

                            <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">
                                {healingIntel.improvement > 0 
                                    ? "Your nervous system is regulating. The frequencies are working."
                                    : "Keep going - healing isn't linear, it's a spiral."
                                }
                            </p>
                        </div>
                    </DashboardSection>

                    {/* HEALING STREAK */}
                    <DashboardSection
                        title="YOUR CONSISTENCY"
                        icon={Sparkles}
                        color="border-amber-500"
                    >
                        <div className="space-y-6">
                            <div className="bg-amber-900/30 backdrop-blur-sm border-l-4 border-amber-500 p-5">
                                <p className="text-amber-400 font-mono font-bold text-sm mb-3">Current streak:</p>
                                <div className="text-5xl sm:text-6xl font-black text-white font-mono">
                                    {healingIntel.streak} days
                                </div>
                            </div>

                            <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">
                                {healingIntel.streak > 0 
                                    ? `${healingIntel.streak} days of showing up for yourself. That's strength.`
                                    : "No pressure. Come back when you need it. That's self-love too."
                                }
                            </p>
                        </div>
                    </DashboardSection>

                    {/* CLINICAL OUTCOMES */}
                    <DashboardSection
                        title="CLINICAL OUTCOMES (NHS STANDARD)"
                        icon={Shield}
                        color="border-cyan-500"
                    >
                        <ClinicalOutcomes onComplete={() => window.location.reload()} />
                    </DashboardSection>

                    {/* MORPHIC RESONANCE */}
                    <DashboardSection
                        title="MORPHIC RESONANCE (COLLECTIVE HEALING)"
                        icon={COOLASFUCKWaves}
                        color="border-purple-500"
                    >
                        <MorphicResonance />
                    </DashboardSection>

                    {/* SESSION HISTORY */}
                    <DashboardSection
                        title="SESSION HISTORY"
                        icon={COOLASFUCKHeart}
                        color="border-pink-500"
                    >
                        <div className="space-y-3">
                            {sessions.slice(0, 10).map((session, i) => {
                                const date = new Date(session.session_date);
                                const stressColor = session.stress_level_detected > 70 ? 'text-red-400' : 
                                                   session.stress_level_detected > 40 ? 'text-amber-400' : 
                                                   'text-green-400';

                                return (
                                    <motion.div 
                                        key={session.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-pink-900/20 backdrop-blur-sm border-l-4 border-pink-500 p-4 hover:bg-pink-900/30 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="text-purple-400 font-mono font-bold">
                                                    {date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </p>
                                                {session.healing_intent && (
                                                    <p className="text-gray-400 font-mono text-sm mt-1">
                                                        "{session.healing_intent}"
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-2xl font-black font-mono ${stressColor}`}>
                                                    {session.stress_level_detected}
                                                </div>
                                                <p className="text-xs text-gray-500 font-mono">stress level</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="bg-purple-500/20 px-2 py-1 text-xs font-mono text-purple-300">
                                                {session.recommended_protocol}
                                            </div>
                                            {session.session_completed && (
                                                <div className="bg-green-500/20 px-2 py-1 text-xs font-mono text-green-300">
                                                    ✓ COMPLETED
                                                </div>
                                            )}
                                        </div>
                                        
                                        {session.post_session_notes && (
                                            <p className="text-gray-300 font-mono text-sm mt-2 italic">
                                                "{session.post_session_notes}"
                                            </p>
                                        )}
                                    </motion.div>
                                    );
                                    })}

                                    {sessions.length > 10 && (
                                    <p className="text-center text-gray-500 font-mono text-xs sm:text-sm pt-4">
                                    Showing latest 10 of {sessions.length} sessions
                                    </p>
                                    )}
                                    </div>
                                    </DashboardSection>
                                    </motion.div>

                                    </div>

                {/* BACK TO CHAMBER - SLEEK CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center pt-12 pb-8"
                >
                    <Link
                        to={createPageUrl('FrequencyChamber')}
                        className="inline-flex items-center gap-4 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-black font-mono text-base sm:text-xl hover:from-pink-700 hover:to-cyan-700 transition-all shadow-2xl">
                            <COOLASFUCKWaves size={36} animate={true} className="inline mr-3" />
                            START NEW SESSION
                        </div>
                    </Link>
                </motion.div>

                {/* FOOTER NOTE - REFINED */}
                <div className="text-center pt-8 pb-4 space-y-3 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <p className="text-gray-400 font-mono text-xs sm:text-sm font-bold">
                            This data serves YOU, not advertisers
                        </p>
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                    <p className="text-gray-600 font-mono text-[10px] sm:text-xs max-w-md mx-auto">
                        Zero extraction. Zero manipulation. Just your healing journey.
                    </p>
                </div>

            </div>
        </div>
    );
}