import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Activity, Clock, TrendingDown, Sparkles, Shield, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKBrain } from '@/components/shared/COOLASFUCKIcon';
import ClinicalOutcomes from '@/components/dashboard/ClinicalOutcomes';
import MorphicResonance from '@/components/dashboard/MorphicResonance';

/**
 * HEALING RESONANCE DASHBOARD
 * Clean 8-bit vibe matching Frequency Chamber
 */

// 8-bit pixel chart
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

// Expandable box component - FREQUENCY CHAMBER STYLE
const InfoBox = ({ title, icon: Icon, color, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-6 border-4 bg-black hover:bg-white/5 transition-all text-left w-full`}
            style={{ borderColor: color }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <Icon size={32} color={color} />
                    <h3 className="font-black font-mono text-sm sm:text-base" style={{ color }}>
                        {title}
                    </h3>
                </div>
                <ChevronDown 
                    className="w-5 h-5 transition-transform" 
                    style={{ color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 border-t-2 border-white/10 mt-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default function HealingDashboard() {
    const [expandedInfo, setExpandedInfo] = useState(null);
    
    const { data: user } = useQuery({
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

    const { data: allSessions = [], isLoading: allSessionsLoading } = useQuery({
        queryKey: ['all-healing-sessions'],
        queryFn: async () => {
            return await base44.entities.VoiceHealingSession.list('-session_date', 500);
        }
    });

    // Calculate healing intel
    const healingIntel = useMemo(() => {
        if (!sessions.length) return null;

        const protocolCounts = {};
        sessions.forEach(s => {
            protocolCounts[s.recommended_protocol] = (protocolCounts[s.recommended_protocol] || 0) + 1;
        });
        const topProtocol = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1])[0];

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

        const recentStress = sessions.slice(0, 7).map(s => s.stress_level_detected || 0).reverse();
        const avgRecentStress = recentStress.reduce((a, b) => a + b, 0) / recentStress.length;
        const firstSessionStress = sessions[sessions.length - 1]?.stress_level_detected || avgRecentStress;
        const improvement = firstSessionStress - avgRecentStress;

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

    if (allSessionsLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <COOLASFUCKWaves size={64} animate={true} />
                    <p className="text-white font-mono text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    const hasPersonalSessions = user && sessions.length > 0 && healingIntel;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto p-4 sm:p-6">

                {/* SIMPLE HEADER - FREQUENCY CHAMBER STYLE */}
                <div className="text-center mb-8">
                    <COOLASFUCKBrain size={56} animate={true} className="mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-black font-mono text-white mb-2">
                        HEALING RESONANCE
                    </h1>
                    <p className="text-gray-400 font-mono text-sm">
                        Your healing strengthens the collective field
                    </p>
                </div>

                {/* SIMPLE EXPLAINER */}
                <div className="bg-cyan-900/20 border-2 border-cyan-500/50 p-4 mb-6">
                    <p className="text-cyan-300 font-mono text-sm text-center">
                        Your healing patterns • Stress intel • Collective resonance<br/>
                        <span className="text-gray-500 text-xs">Zero ads. Zero manipulation. Just healing intelligence.</span>
                    </p>
                </div>

                {/* MORPHIC RESONANCE - SHOW FIRST (PUBLIC) */}
                <div className="border-4 border-purple-500 bg-black p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <COOLASFUCKWaves size={32} animate={true} />
                        <h3 className="text-2xl font-black font-mono text-purple-400">
                            COLLECTIVE HEALING
                        </h3>
                    </div>
                    <MorphicResonance />
                </div>

                {/* START TRACKING CTA - IF NOT LOGGED IN OR NO SESSIONS */}
                {!hasPersonalSessions && (
                    <div className="border-4 border-green-500 bg-black p-6 mb-6">
                        <h2 className="text-green-400 font-black font-mono text-xl mb-4 text-center">START TRACKING</h2>
                        <p className="text-gray-300 font-mono text-sm text-center mb-6">
                            Every frequency session you play automatically saves to your dashboard
                        </p>
                        <Link
                            to={createPageUrl('FrequencyChamber')}
                            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center px-8 py-4 font-black font-mono text-lg border-4 border-green-400"
                            style={{ boxShadow: '4px 4px 0px rgba(34, 197, 94, 0.5)' }}
                        >
                            GO TO FREQUENCY CHAMBER
                        </Link>
                    </div>
                )}

                {/* YOUR PERSONAL DATA - ONLY IF HAS SESSIONS */}
                {hasPersonalSessions && (
                    <>
                        {/* QUICK STATS - 2x2 GRID */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                        onClick={() => setExpandedInfo(expandedInfo === 'sessions' ? null : 'sessions')}
                        className="relative p-6 border-4 bg-black hover:bg-white/5 transition-all"
                        style={{ borderColor: '#ec4899' }}
                    >
                        <COOLASFUCKHeart size={36} animate={true} className="mx-auto mb-3" />
                        <p className="text-5xl font-black text-pink-400 font-mono mb-2">{healingIntel.totalSessions}</p>
                        <p className="text-sm text-gray-400 font-mono font-bold">Sessions</p>
                        {expandedInfo === 'sessions' && (
                            <div className="absolute top-2 right-2">
                                <Info size={16} className="text-pink-400" />
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => setExpandedInfo(expandedInfo === 'stress' ? null : 'stress')}
                        className="relative p-6 border-4 bg-black hover:bg-white/5 transition-all"
                        style={{ borderColor: '#22c55e' }}
                    >
                        <TrendingDown className="w-9 h-9 text-green-400 mx-auto mb-3" />
                        <p className="text-5xl font-black text-green-400 font-mono mb-2">
                            {healingIntel.improvement > 0 ? '-' : ''}{Math.round(Math.abs(healingIntel.improvement))}
                        </p>
                        <p className="text-sm text-gray-400 font-mono font-bold">Stress Drop</p>
                        {expandedInfo === 'stress' && (
                            <div className="absolute top-2 right-2">
                                <Info size={16} className="text-green-400" />
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => setExpandedInfo(expandedInfo === 'streak' ? null : 'streak')}
                        className="relative p-6 border-4 bg-black hover:bg-white/5 transition-all"
                        style={{ borderColor: '#f59e0b' }}
                    >
                        <Sparkles className="w-9 h-9 text-amber-400 mx-auto mb-3" />
                        <p className="text-5xl font-black text-amber-400 font-mono mb-2">{healingIntel.streak}</p>
                        <p className="text-sm text-gray-400 font-mono font-bold">Day Streak</p>
                        {expandedInfo === 'streak' && (
                            <div className="absolute top-2 right-2">
                                <Info size={16} className="text-amber-400" />
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => setExpandedInfo(expandedInfo === 'average' ? null : 'average')}
                        className="relative p-6 border-4 bg-black hover:bg-white/5 transition-all"
                        style={{ borderColor: '#22d3ee' }}
                    >
                        <Activity className="w-9 h-9 text-cyan-400 mx-auto mb-3" />
                        <p className="text-5xl font-black text-cyan-400 font-mono mb-2">{healingIntel.avgRecentStress}</p>
                        <p className="text-sm text-gray-400 font-mono font-bold">Avg Stress</p>
                        {expandedInfo === 'average' && (
                            <div className="absolute top-2 right-2">
                                <Info size={16} className="text-cyan-400" />
                            </div>
                        )}
                    </button>
                </div>

                {/* EXPANDED INFO - INLINE BELOW STATS */}
                <AnimatePresence>
                    {expandedInfo && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-6"
                        >
                            {expandedInfo === 'sessions' && (
                                <div className="border-4 border-pink-500 bg-black p-6">
                                    <p className="text-white font-mono text-sm mb-4">
                                        You've completed <strong className="text-pink-400">{healingIntel.totalSessions} healing sessions</strong>. 
                                        Each Frequency Chamber session adds to your journey.
                                    </p>
                                    <p className="text-gray-400 font-mono text-xs">
                                        More sessions = stronger neural pathways. Your nervous system is learning to self-regulate.
                                    </p>
                                </div>
                            )}

                            {expandedInfo === 'stress' && (
                                <div className="border-4 border-green-500 bg-black p-6">
                                    <p className="text-white font-mono text-sm mb-4">
                                        Your stress dropped by <strong className="text-green-400">{Math.round(Math.abs(healingIntel.improvement))} points</strong> on average since you started.
                                    </p>
                                    <p className="text-gray-400 font-mono text-xs mb-4">
                                        Clinical significance: 10+ point drop = measurable nervous system regulation.
                                    </p>
                                    <div className="bg-black p-3 border-2 border-green-500/50">
                                        <p className="text-gray-500 font-mono text-xs mb-2">Last 7 sessions:</p>
                                        <PixelChart data={healingIntel.recentStress} color="bg-green-500" />
                                    </div>
                                </div>
                            )}

                            {expandedInfo === 'streak' && (
                                <div className="border-4 border-amber-500 bg-black p-6">
                                    <p className="text-white font-mono text-sm mb-4">
                                        <strong className="text-amber-400">{healingIntel.streak} days</strong> of showing up for yourself. That's strength.
                                    </p>
                                    <p className="text-gray-400 font-mono text-xs">
                                        Consistency > intensity. Daily frequency exposure creates lasting neural changes.
                                    </p>
                                </div>
                            )}

                            {expandedInfo === 'average' && (
                                <div className="border-4 border-cyan-500 bg-black p-6">
                                    <p className="text-white font-mono text-sm mb-4">
                                        Recent average: <strong className="text-cyan-400">{healingIntel.avgRecentStress}/100</strong>
                                    </p>
                                    <div className="flex justify-between text-xs font-mono mb-2">
                                        <span className="text-green-400">0-30: Calm</span>
                                        <span className="text-yellow-400">31-60: Moderate</span>
                                        <span className="text-red-400">61+: High</span>
                                    </div>
                                    <div className="h-3 bg-black rounded-full overflow-hidden border-2 border-cyan-500/50">
                                        <div 
                                            className={`h-full transition-all ${
                                                healingIntel.avgRecentStress <= 30 ? 'bg-green-500' : 
                                                healingIntel.avgRecentStress <= 60 ? 'bg-yellow-500' : 
                                                'bg-red-500'
                                            }`}
                                            style={{ width: `${healingIntel.avgRecentStress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ALL INFO BOXES - 2 COLUMN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    
                    {/* HEALING SIGNATURE */}
                    <InfoBox
                        title="YOUR HEALING SIGNATURE"
                        icon={COOLASFUCKWaves}
                        color="#22d3ee"
                    >
                        <div className="space-y-4">
                            <div>
                                <p className="text-cyan-400 font-mono text-sm mb-2">Your go-to protocol:</p>
                                <p className="text-3xl font-black text-white font-mono">
                                    {healingIntel.topProtocol}
                                </p>
                                <p className="text-cyan-300 font-mono text-xs mt-1">
                                    Used {healingIntel.topProtocolCount}x
                                </p>
                            </div>
                            <p className="text-gray-400 font-mono text-xs">
                                Your signature frequency. Your nervous system knows what it needs.
                            </p>
                        </div>
                    </InfoBox>

                    {/* STRESS PATTERNS */}
                    <InfoBox
                        title="WHEN YOU NEED HEALING MOST"
                        icon={Clock}
                        color="#ec4899"
                    >
                        <div className="space-y-4">
                            <div>
                                <p className="text-pink-400 font-mono text-sm mb-2">Your hardest time:</p>
                                <p className="text-3xl font-black text-white font-mono">
                                    {healingIntel.peakStressHour}:00
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 font-mono text-xs mb-2">24-hour pattern:</p>
                                <PixelChart data={healingIntel.avgHourlyStress} color="bg-pink-500" />
                                <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-1">
                                    <span>00:00</span>
                                    <span>12:00</span>
                                    <span>23:00</span>
                                </div>
                            </div>
                        </div>
                    </InfoBox>

                    {/* NERVOUS SYSTEM */}
                    <InfoBox
                        title="NERVOUS SYSTEM PROGRESS"
                        icon={Activity}
                        color="#22c55e"
                    >
                        <div className="space-y-4">
                            <div>
                                <p className="text-green-400 font-mono text-sm mb-2">Stress reduction:</p>
                                <p className="text-3xl font-black text-white font-mono">
                                    {healingIntel.improvement > 0 ? '↓' : '↔'} {Math.round(Math.abs(healingIntel.improvement))}
                                </p>
                            </div>
                            <p className="text-gray-400 font-mono text-xs">
                                {healingIntel.improvement > 0 
                                    ? "Your nervous system is regulating. The frequencies are working."
                                    : "Keep going - healing isn't linear."
                                }
                            </p>
                        </div>
                    </InfoBox>

                    {/* CONSISTENCY */}
                    <InfoBox
                        title="YOUR CONSISTENCY"
                        icon={Sparkles}
                        color="#f59e0b"
                    >
                        <div className="space-y-4">
                            <div>
                                <p className="text-amber-400 font-mono text-sm mb-2">Current streak:</p>
                                <p className="text-5xl font-black text-white font-mono">
                                    {healingIntel.streak}
                                </p>
                                <p className="text-gray-400 text-xs font-mono">days</p>
                            </div>
                            <p className="text-gray-400 font-mono text-xs">
                                {healingIntel.streak > 0 
                                    ? "That's showing up for yourself. That's strength."
                                    : "No pressure. Come back when you need it."
                                }
                            </p>
                        </div>
                    </InfoBox>

                    {/* CLINICAL OUTCOMES */}
                    <InfoBox
                        title="CLINICAL OUTCOMES (NHS STANDARD)"
                        icon={Shield}
                        color="#22d3ee"
                    >
                        <ClinicalOutcomes onComplete={() => window.location.reload()} />
                    </InfoBox>

                    {/* MORPHIC RESONANCE */}
                    <InfoBox
                        title="MORPHIC RESONANCE (COLLECTIVE HEALING)"
                        icon={COOLASFUCKWaves}
                        color="#a855f7"
                    >
                        <MorphicResonance />
                    </InfoBox>

                    {/* SESSION HISTORY */}
                    <div className="md:col-span-2">
                        <InfoBox
                            title="SESSION HISTORY"
                            icon={COOLASFUCKHeart}
                            color="#ec4899"
                        >
                            <div className="space-y-3">
                                {sessions.slice(0, 10).map((session, i) => {
                                    const date = new Date(session.session_date);
                                    const stressColor = session.stress_level_detected > 70 ? '#ef4444' : 
                                                       session.stress_level_detected > 40 ? '#f59e0b' : 
                                                       '#22c55e';

                                    return (
                                        <div 
                                            key={session.id}
                                            className="bg-pink-900/20 border-l-4 border-pink-500 p-3"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="text-purple-400 font-mono font-bold text-sm">
                                                        {date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </p>
                                                    {session.healing_intent && (
                                                        <p className="text-gray-400 font-mono text-xs mt-1">
                                                            "{session.healing_intent}"
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black font-mono" style={{ color: stressColor }}>
                                                        {session.stress_level_detected}
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 font-mono">stress</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <div className="bg-purple-500/20 px-2 py-1 text-[10px] font-mono text-purple-300">
                                                    {session.recommended_protocol}
                                                </div>
                                                {session.session_completed && (
                                                    <div className="bg-green-500/20 px-2 py-1 text-[10px] font-mono text-green-300">
                                                        ✓ DONE
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                
                                {sessions.length > 10 && (
                                    <p className="text-center text-gray-600 font-mono text-xs pt-2">
                                        Showing latest 10 of {sessions.length} sessions
                                    </p>
                                )}
                            </div>
                        </InfoBox>
                    </div>

                </div>

                {/* BACK TO CHAMBER */}
                <div className="text-center pt-8 pb-4">
                    <Link
                        to={createPageUrl('FrequencyChamber')}
                        className="inline-block bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-12 py-5 font-black font-mono text-xl hover:from-pink-700 hover:to-cyan-700 transition-all"
                        style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                    >
                        <COOLASFUCKWaves size={28} animate={true} className="inline mr-3" />
                        START NEW SESSION
                    </Link>
                </div>
                </>
                )}

                {/* FOOTER */}
                <div className="text-center pt-8 border-t-2 border-white/10">
                    <p className="text-gray-500 font-mono text-sm">
                        This data serves YOU, not advertisers
                    </p>
                    <p className="text-gray-700 font-mono text-xs mt-2">
                        Zero extraction. Zero manipulation. Just healing.
                    </p>
                </div>

            </div>
        </div>
    );
}