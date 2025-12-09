import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKBrain } from '@/components/shared/COOLASFUCKIcon';
import { TrendingDown, Sparkles, Activity, Calendar } from 'lucide-react';
import MorphicResonance from '@/components/dashboard/MorphicResonance';

/**
 * HEALING INTELLIGENCE
 * Matching Frequency Chamber aesthetic perfectly
 */

export default function HealingDashboard() {
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => base44.auth.me(),
        retry: false
    });

    const { data: sessions = [] } = useQuery({
        queryKey: ['healing-sessions'],
        queryFn: async () => {
            return await base44.entities.VoiceHealingSession.list('-session_date', 100);
        },
        enabled: !!user
    });

    // Simple stats
    const totalSessions = sessions.length;
    const recentSessions = sessions.slice(0, 7);
    const avgRecentStress = recentSessions.length > 0 
        ? Math.round(recentSessions.reduce((sum, s) => sum + (s.stress_level_detected || 0), 0) / recentSessions.length)
        : 0;
    const firstStress = sessions.length > 0 ? sessions[sessions.length - 1]?.stress_level_detected || avgRecentStress : avgRecentStress;
    const improvement = firstStress - avgRecentStress;

    // Most used protocol
    const protocolCounts = {};
    sessions.forEach(s => {
        protocolCounts[s.recommended_protocol] = (protocolCounts[s.recommended_protocol] || 0) + 1;
    });
    const topProtocol = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1])[0];

    const hasPersonalData = user && sessions.length > 0;

    return (
        <div className="min-h-screen bg-black text-white">
            
            {/* HEADER - EXACT MATCH TO FREQUENCY CHAMBER */}
            <div className="border-b-4 border-cyan-500 p-6 md:p-8 bg-black">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <COOLASFUCKBrain size={56} animate={true} />
                        </motion.div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-mono text-white text-center mb-3 tracking-wider" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>
                        HEALING INTELLIGENCE
                    </h1>
                    <p className="text-gray-400 font-mono text-sm text-center">
                        Collective healing field + your journey
                    </p>

                    {/* PIXEL DECORATION - SAME AS CHAMBER */}
                    <div className="flex justify-center gap-2 mt-4">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-cyan-500"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4">

                {/* COLLECTIVE HEALING - EVERYONE SEES THIS */}
                <div className="bg-black border-4 border-purple-500 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <COOLASFUCKWaves size={32} animate={true} />
                        <h2 className="text-2xl font-black font-mono text-purple-400">
                            COLLECTIVE HEALING FIELD
                        </h2>
                    </div>
                    <MorphicResonance />
                </div>

                {/* START HEALING CTA - IF NO PERSONAL DATA */}
                {!hasPersonalData && (
                    <div className="bg-black border-4 border-pink-500 p-8 text-center mb-6">
                        <COOLASFUCKHeart size={64} animate={true} className="mx-auto mb-6" />
                        <h2 className="text-3xl font-black font-mono text-pink-400 mb-3">
                            START HEALING
                        </h2>
                        <p className="text-white font-mono text-sm mb-2 max-w-md mx-auto">
                            Free frequencies proven to reduce anxiety, improve sleep, manage pain
                        </p>
                        <p className="text-gray-400 font-mono text-xs mb-8 max-w-md mx-auto">
                            Your sessions auto-save here - watch your nervous system regulate
                        </p>
                        <Link
                            to={createPageUrl('FrequencyChamber')}
                            className="inline-block bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-12 py-5 font-black font-mono text-xl hover:from-pink-700 hover:to-cyan-700 transition-all"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                        >
                            <COOLASFUCKWaves size={28} animate={true} className="inline mr-3" />
                            FREQUENCY CHAMBER
                        </Link>
                    </div>
                )}

                {/* YOUR HEALING DATA */}
                {hasPersonalData && (
                    <>
                        {/* SECTION DIVIDER */}
                        <div className="border-t-4 border-cyan-500 pt-6 mb-6">
                            <h2 className="text-2xl font-black font-mono text-cyan-400 mb-6 text-center">
                                YOUR HEALING JOURNEY
                            </h2>
                        </div>

                        {/* 2x2 STAT GRID */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-black border-4 border-pink-500 p-6 text-center">
                                <COOLASFUCKHeart size={40} animate={true} className="mx-auto mb-3" />
                                <p className="text-5xl font-black text-pink-400 font-mono mb-1">
                                    {totalSessions}
                                </p>
                                <p className="text-sm text-gray-400 font-mono">Sessions</p>
                            </div>

                            <div className="bg-black border-4 border-green-500 p-6 text-center">
                                <TrendingDown className="w-10 h-10 text-green-400 mx-auto mb-3" />
                                <p className="text-5xl font-black text-green-400 font-mono mb-1">
                                    {improvement > 0 ? '-' : ''}{Math.round(Math.abs(improvement))}
                                </p>
                                <p className="text-sm text-gray-400 font-mono">Stress Drop</p>
                            </div>

                            <div className="bg-black border-4 border-cyan-500 p-6 text-center">
                                <Activity className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                                <p className="text-5xl font-black text-cyan-400 font-mono mb-1">
                                    {avgRecentStress}
                                </p>
                                <p className="text-sm text-gray-400 font-mono">Avg Stress</p>
                            </div>

                            <div className="bg-black border-4 border-amber-500 p-6 text-center">
                                <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                                <p className="text-2xl font-black text-amber-400 font-mono mb-1">
                                    {topProtocol ? topProtocol[0].split('_').join(' ') : 'none'}
                                </p>
                                <p className="text-sm text-gray-400 font-mono">Top Protocol</p>
                            </div>
                        </div>

                        {/* INFO BOXES - SIDE BY SIDE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            
                            {/* WHAT IT MEANS */}
                            <div className="bg-black border-4 border-cyan-500 p-6">
                                <h3 className="text-cyan-400 font-black font-mono text-lg mb-4">
                                    WHAT THIS MEANS
                                </h3>
                                <div className="space-y-3 text-sm font-mono">
                                    <p className="text-white">
                                        <span className="text-pink-400 font-black">{totalSessions} sessions</span> = neural pathways strengthening
                                    </p>
                                    <p className="text-white">
                                        <span className="text-green-400 font-black">{Math.round(Math.abs(improvement))} point drop</span> = nervous system regulating
                                    </p>
                                    {improvement > 10 && (
                                        <p className="text-green-400">
                                            ✓ Clinically significant improvement
                                        </p>
                                    )}
                                    <p className="text-gray-400 text-xs mt-4">
                                        The frequencies are working. Keep going.
                                    </p>
                                </div>
                            </div>

                            {/* RECENT SESSIONS */}
                            <div className="bg-black border-4 border-pink-500 p-6">
                                <h3 className="text-pink-400 font-black font-mono text-lg mb-4">
                                    RECENT SESSIONS
                                </h3>
                                <div className="space-y-2">
                                    {sessions.slice(0, 5).map((session) => {
                                        const date = new Date(session.session_date);
                                        const stressColor = session.stress_level_detected > 70 ? '#ef4444' : 
                                                           session.stress_level_detected > 40 ? '#f59e0b' : 
                                                           '#22c55e';
                                        return (
                                            <div 
                                                key={session.id}
                                                className="bg-pink-900/20 p-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-3 h-3 text-gray-500" />
                                                        <p className="text-xs text-gray-400 font-mono">
                                                            {date.toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-xs text-purple-300 font-mono">
                                                            {session.recommended_protocol}
                                                        </p>
                                                        <p className="text-xl font-black font-mono" style={{ color: stressColor }}>
                                                            {session.stress_level_detected}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                        {/* BACK TO CHAMBER - EXACT STYLE */}
                        <div className="text-center mb-6">
                            <Link
                                to={createPageUrl('FrequencyChamber')}
                                className="inline-block bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-12 py-5 font-black font-mono text-xl hover:from-pink-700 hover:to-cyan-700 transition-all"
                                style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                            >
                                <COOLASFUCKWaves size={28} animate={true} className="inline mr-3" />
                                NEW SESSION
                            </Link>
                        </div>
                    </>
                )}

                {/* FOOTER */}
                <div className="text-center pt-8 border-t-2 border-white/10">
                    <p className="text-gray-500 font-mono text-sm">
                        This data serves YOU, not advertisers
                    </p>
                </div>

            </div>
        </div>
    );
}