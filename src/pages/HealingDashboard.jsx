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
 * HEALING DASHBOARD - YOUR PERSONAL HEALING INTELLIGENCE
 * 8-bit custom dashboard showing YOUR healing signature
 * Data serves YOU, not advertisers ❤️
 */

// Expandable section component
const DashboardSection = ({ title, icon: Icon, color, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
        <Card className={`bg-black border-4 ${color} overflow-hidden`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <Icon size={32} animate={isOpen} className={color.replace('border-', 'text-')} />
                    <h2 className={`text-2xl font-black font-mono ${color.replace('border-', 'text-')}`}>
                        {title}
                    </h2>
                </div>
                {isOpen ? (
                    <ChevronDown className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
                ) : (
                    <ChevronRight className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
                )}
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 border-t-2 border-white/10">
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
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => base44.auth.me(),
        retry: false
    });

    const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ['healing-sessions'],
        queryFn: async () => {
            const allSessions = await base44.entities.VoiceHealingSession.list();
            return allSessions.sort((a, b) => new Date(b.session_date) - new Date(a.session_date));
        },
        enabled: !!user
    });

    // Fetch all sessions for collective stats (always enabled for dashboard view)
    const { data: allSessions = [] } = useQuery({
        queryKey: ['all-healing-sessions'],
        queryFn: async () => {
            const sessions = await base44.entities.VoiceHealingSession.list();
            return sessions;
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

    if (userLoading || sessionsLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <COOLASFUCKWaves size={64} animate={true} />
                    <p className="text-white font-mono text-xl">Loading your healing intelligence...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center p-6">
                <Card className="bg-black border-4 border-cyan-500 p-8 max-w-md text-center space-y-6">
                    <COOLASFUCKBrain size={64} animate={true} className="mx-auto" />
                    <h1 className="text-3xl font-black text-cyan-400 font-mono">SIGN IN REQUIRED</h1>
                    <p className="text-gray-300 font-mono">Sign in to see your personal healing intelligence</p>
                    <button
                        onClick={() => base44.auth.redirectToLogin()}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 font-black font-mono"
                    >
                        SIGN IN
                    </button>
                </Card>
            </div>
        );
    }

    if (!sessions.length) {
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
                            HEALING INTELLIGENCE
                        </h1>
                        <p className="text-gray-400 font-mono">Live collective healing data + your personal tracking</p>
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
                                Every frequency session you play automatically saves to your dashboard. No voice recording needed ❤️
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

                    {/* MORPHIC RESONANCE DATA */}
                    <Card className="bg-black border-4 border-purple-500 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <COOLASFUCKWaves size={32} animate={true} />
                            <h3 className="text-2xl font-black font-mono text-purple-400">
                                COLLECTIVE HEALING PATTERNS
                            </h3>
                        </div>
                        <p className="text-gray-400 font-mono text-sm mb-4">
                            Testing Sheldrake's morphic resonance theory: do people heal faster when using frequencies together?
                        </p>
                        <MorphicResonance />
                    </Card>

                    <div className="text-center pt-4 space-y-2 border-t-2 border-white/10">
                        <p className="text-gray-500 font-mono text-sm">
                            This data serves YOU, not advertisers
                        </p>
                        <p className="text-gray-600 font-mono text-xs">
                            Zero extraction. Zero manipulation. Just healing ❤️
                        </p>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* HEADER */}
                <div className="text-center space-y-4 mb-8">
                    <COOLASFUCKBrain size={64} animate={true} className="mx-auto" />
                    <h1 className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-green-400">
                        YOUR HEALING INTELLIGENCE
                    </h1>
                    <p className="text-gray-400 font-mono">Data that serves YOU, not advertisers ❤️</p>
                </div>

                {/* QUICK STATS - ALWAYS VISIBLE */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-black border-4 border-pink-500 p-4 text-center">
                        <COOLASFUCKHeart size={32} animate={true} className="mx-auto mb-2" />
                        <p className="text-3xl font-black text-pink-400 font-mono">{healingIntel.totalSessions}</p>
                        <p className="text-sm text-gray-400 font-mono">Sessions</p>
                    </Card>

                    <Card className="bg-black border-4 border-green-500 p-4 text-center">
                        <TrendingDown className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-3xl font-black text-green-400 font-mono">
                            {healingIntel.improvement > 0 ? '-' : ''}{Math.round(Math.abs(healingIntel.improvement))}
                        </p>
                        <p className="text-sm text-gray-400 font-mono">Stress Drop</p>
                    </Card>

                    <Card className="bg-black border-4 border-amber-500 p-4 text-center">
                        <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <p className="text-3xl font-black text-amber-400 font-mono">{healingIntel.streak}</p>
                        <p className="text-sm text-gray-400 font-mono">Day Streak</p>
                    </Card>

                    <Card className="bg-black border-4 border-cyan-500 p-4 text-center">
                        <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-3xl font-black text-cyan-400 font-mono">{healingIntel.avgRecentStress}</p>
                        <p className="text-sm text-gray-400 font-mono">Avg Stress</p>
                    </Card>
                </div>

                {/* EXPANDABLE SECTIONS */}
                <div className="space-y-4">
                    
                    {/* YOUR HEALING SIGNATURE */}
                    <DashboardSection
                        title="YOUR HEALING SIGNATURE"
                        icon={COOLASFUCKWaves}
                        color="border-cyan-500"
                        defaultOpen={true}
                    >
                        <div className="space-y-4">
                            <div className="bg-cyan-900/20 border-2 border-cyan-500 p-4">
                                <p className="text-cyan-400 font-mono font-bold mb-2">Your go-to protocol:</p>
                                <div className="flex items-center gap-3">
                                    <div className="text-4xl font-black text-white font-mono">
                                        {healingIntel.topProtocol}
                                    </div>
                                    <div className="text-cyan-300 font-mono text-sm">
                                        Used {healingIntel.topProtocolCount} times
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 font-mono text-sm">
                                This is YOUR signature healing frequency. Your nervous system knows what it needs ❤️
                            </p>
                        </div>
                    </DashboardSection>

                    {/* STRESS PATTERNS */}
                    <DashboardSection
                        title="WHEN YOU NEED HEALING MOST"
                        icon={Clock}
                        color="border-pink-500"
                    >
                        <div className="space-y-4">
                            <div className="bg-pink-900/20 border-2 border-pink-500 p-4">
                                <p className="text-pink-400 font-mono font-bold mb-2">Your hardest time:</p>
                                <div className="text-4xl font-black text-white font-mono">
                                    {healingIntel.peakStressHour}:00 - {(healingIntel.peakStressHour + 1) % 24}:00
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-gray-400 font-mono text-sm">24-hour stress pattern:</p>
                                <PixelChart 
                                    data={healingIntel.avgHourlyStress} 
                                    color="bg-pink-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 font-mono">
                                    <span>00:00</span>
                                    <span>12:00</span>
                                    <span>23:00</span>
                                </div>
                            </div>
                            
                            <p className="text-gray-300 font-mono text-sm">
                                The app could auto-suggest protocols at your peak stress times ❤️
                            </p>
                        </div>
                    </DashboardSection>

                    {/* NERVOUS SYSTEM REGULATION */}
                    <DashboardSection
                        title="NERVOUS SYSTEM PROGRESS"
                        icon={Activity}
                        color="border-green-500"
                    >
                        <div className="space-y-4">
                            <div className="bg-green-900/20 border-2 border-green-500 p-4">
                                <p className="text-green-400 font-mono font-bold mb-2">Stress reduction:</p>
                                <div className="text-4xl font-black text-white font-mono">
                                    {healingIntel.improvement > 0 ? '↓' : '↔'} {Math.round(Math.abs(healingIntel.improvement))} points
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-gray-400 font-mono text-sm">Last 7 sessions:</p>
                                <PixelChart 
                                    data={healingIntel.recentStress} 
                                    color="bg-green-500"
                                />
                            </div>
                            
                            <p className="text-gray-300 font-mono text-sm">
                                {healingIntel.improvement > 0 
                                    ? "Your nervous system is regulating. The frequencies are working ❤️"
                                    : "Keep going - healing isn't linear, it's a spiral ❤️"
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
                        <div className="space-y-4">
                            <div className="bg-amber-900/20 border-2 border-amber-500 p-4">
                                <p className="text-amber-400 font-mono font-bold mb-2">Current streak:</p>
                                <div className="text-6xl font-black text-white font-mono">
                                    {healingIntel.streak} days
                                </div>
                            </div>
                            
                            <p className="text-gray-300 font-mono text-sm">
                                {healingIntel.streak > 0 
                                    ? `${healingIntel.streak} days of showing up for yourself. That's strength ❤️`
                                    : "No pressure. Come back when you need it. That's self-love too ❤️"
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
                                    <div 
                                        key={session.id} 
                                        className="bg-purple-900/20 border-2 border-purple-500 p-4 hover:bg-purple-900/30 transition-colors"
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
                                    </div>
                                );
                            })}
                            
                            {sessions.length > 10 && (
                                <p className="text-center text-gray-500 font-mono text-sm pt-2">
                                    Showing latest 10 of {sessions.length} sessions
                                </p>
                            )}
                        </div>
                    </DashboardSection>

                </div>

                {/* BACK TO CHAMBER */}
                <div className="text-center pt-8">
                    <Link
                        to={createPageUrl('FrequencyChamber')}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-8 py-4 font-black font-mono text-lg hover:from-pink-700 hover:to-cyan-700 transition-all"
                        style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                    >
                        <COOLASFUCKWaves size={32} animate={true} />
                        START NEW SESSION
                    </Link>
                </div>

                {/* FOOTER NOTE */}
                <div className="text-center pt-8 space-y-2 border-t-2 border-white/10">
                    <p className="text-gray-500 font-mono text-sm">
                        This data serves YOU, not advertisers
                    </p>
                    <p className="text-gray-600 font-mono text-xs">
                        Zero extraction. Zero manipulation. Just your healing journey ❤️
                    </p>
                </div>

            </div>
        </div>
    );
}