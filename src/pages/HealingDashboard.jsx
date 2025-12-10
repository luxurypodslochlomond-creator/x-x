import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKBrain } from '@/components/shared/COOLASFUCKIcon';
import { TrendingDown, Sparkles, Activity, Calendar, Info } from 'lucide-react';
import MorphicResonance from '@/components/dashboard/MorphicResonance';


/**
 * HEALING INTELLIGENCE
 * Your personal healing + collective healing network
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
                        Your healing strengthens the collective field
                    </p>

                    {/* PIXEL DECORATION */}
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

                {/* WHAT IS THIS? - CLEAR INTEL */}
                <div className="bg-cyan-900/20 border-2 border-cyan-500 p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-cyan-300 font-mono text-sm mb-2">
                                <strong>This is your healing intelligence dashboard.</strong>
                            </p>
                            <p className="text-gray-400 font-mono text-xs">
                                Every Frequency Chamber session saves here. Watch yourself heal over time. See how you connect to the global healing network.
                            </p>
                        </div>
                    </div>
                </div>



                {/* COLLECTIVE HEALING FIELD */}
                <div className="bg-black border-4 border-purple-500 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <COOLASFUCKWaves size={32} animate={true} />
                        <div>
                            <h2 className="text-2xl font-black font-mono text-purple-400">
                                COLLECTIVE HEALING
                            </h2>
                            <p className="text-purple-300 font-mono text-xs">
                                Global healing network
                            </p>
                        </div>
                    </div>

                    <div className="bg-purple-900/20 border-2 border-purple-500/50 p-4 mb-4">
                        <p className="text-purple-200 font-mono text-sm mb-3">
                            Thousands of people worldwide using these frequencies to heal. <strong className="text-purple-400">Together we build the evidence.</strong>
                        </p>
                        <p className="text-gray-400 font-mono text-xs">
                            Every session tracked. Every healing measured. Real data proving what works.
                        </p>
                    </div>

                    <MorphicResonance />
                </div>

                {/* START HEALING CTA - IF NO PERSONAL DATA */}
                {!hasPersonalData && (
                    <div className="bg-black border-4 border-pink-500 p-8 text-center mb-6">
                        <COOLASFUCKHeart size={64} animate={true} className="mx-auto mb-6" />
                        <h2 className="text-3xl font-black font-mono text-pink-400 mb-3">
                            START YOUR HEALING
                        </h2>
                        <p className="text-white font-mono text-sm mb-2 max-w-md mx-auto">
                            Free healing frequencies - proven to reduce anxiety, improve sleep, manage pain
                        </p>
                        <p className="text-gray-400 font-mono text-xs mb-8 max-w-md mx-auto">
                            Your sessions auto-save here. You'll see your stress drop, your nervous system regulate, your strength grow.
                        </p>
                        <Link
                            to={createPageUrl('FrequencyChamber')}
                            className="inline-block bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-12 py-5 font-black font-mono text-xl hover:from-pink-700 hover:to-cyan-700 transition-all"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                        >
                            <COOLASFUCKWaves size={28} animate={true} className="inline mr-3" />
                            ENTER FREQUENCY CHAMBER
                        </Link>
                    </div>
                )}

                {/* YOUR PERSONAL HEALING DATA */}
                {hasPersonalData && (
                    <>
                        {/* TAPPABLE STATS */}
                        <Link to={createPageUrl('FrequencyChamber')} className="block">
                            <div className="bg-black border-4 border-cyan-500 p-4 mb-6 hover:bg-cyan-500/10 transition-all active:scale-98">
                                <div className="grid grid-cols-4 gap-3 text-center">
                                    <div>
                                        <p className="text-3xl font-black text-pink-400 font-mono">
                                            {totalSessions}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono">sessions</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-green-400 font-mono">
                                            -{Math.round(Math.abs(improvement))}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono">stress drop</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-cyan-400 font-mono">
                                            {avgRecentStress}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono">current</p>
                                    </div>
                                    <div>
                                        <p className="text-sm md:text-base font-black text-amber-400 font-mono leading-tight">
                                            {topProtocol ? (topProtocol[0] === 'menopause' ? 'vitality' : topProtocol[0].split('_')[0]) : 'none'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-mono">frequency</p>
                                    </div>
                                </div>
                                <p className="text-center text-xs text-cyan-400 font-mono mt-3">TAP TO HEAL →</p>
                            </div>
                        </Link>

                        {/* STRESS GRAPH - VISUAL */}
                        {sessions.length > 2 && (
                            <div className="bg-black border-4 border-pink-500 p-6 mb-6">
                                <h3 className="text-pink-400 font-black font-mono text-lg mb-4 text-center">
                                    STRESS TRAJECTORY
                                </h3>
                                <div className="flex items-end justify-center gap-2 h-32 mb-4">
                                    {sessions.slice(0, 10).reverse().map((session, i) => {
                                        const height = session.stress_level_detected;
                                        const color = height > 70 ? '#ef4444' : height > 40 ? '#f59e0b' : '#22c55e';
                                        return (
                                            <motion.div
                                                key={i}
                                                className="flex-1 max-w-8"
                                                style={{ 
                                                    height: `${height}%`, 
                                                    backgroundColor: color,
                                                    imageRendering: 'pixelated'
                                                }}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 font-mono">
                                    <span>OLDEST</span>
                                    <span>NEWEST</span>
                                </div>
                            </div>
                        )}

                        {/* THE SCORE - SIMPLE */}
                        <div className="bg-black border-4 border-cyan-500 p-6 mb-6 text-center">
                            <p className="text-cyan-400 font-black font-mono text-sm mb-3">THE SCORE</p>
                            <p className="text-white font-mono text-lg leading-relaxed">
                                {totalSessions === 1 
                                    ? `You've done 1 session at ${avgRecentStress} stress. Do more sessions to see your trajectory.`
                                    : improvement > 10 
                                        ? `Your stress dropped ${Math.round(Math.abs(improvement))} points over ${totalSessions} sessions. That's clinically significant. The frequencies work.`
                                        : improvement > 0
                                            ? `Your stress dropped ${Math.round(Math.abs(improvement))} points over ${totalSessions} sessions. Your body is responding.`
                                            : `${totalSessions} sessions logged. Healing isn't linear - your consistency matters most.`}
                            </p>
                        </div>

                        {/* HISTORY - ONLY IF >1 SESSION */}
                        {sessions.length > 1 && (
                            <div className="bg-black border-4 border-purple-500 p-4 mb-6">
                                <h3 className="text-purple-400 font-black font-mono text-sm mb-3 text-center">
                                    LAST {Math.min(5, sessions.length)} SESSIONS
                                </h3>
                                <div className="space-y-2">
                                    {sessions.slice(0, 5).map((session, i) => {
                                        const stressColor = session.stress_level_detected > 70 ? '#ef4444' : 
                                                           session.stress_level_detected > 40 ? '#f59e0b' : 
                                                           '#22c55e';
                                        return (
                                            <motion.div 
                                                key={session.id}
                                                className="flex items-center justify-between bg-purple-900/20 p-2 border border-purple-500/30"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <p className="text-xs text-purple-300 font-mono flex-1">
                                                    {session.recommended_protocol === 'menopause' ? 'vitality' : session.recommended_protocol.split('_')[0]}
                                                </p>
                                                <div 
                                                    className="w-12 h-6 border-2 font-black font-mono text-sm flex items-center justify-center"
                                                    style={{ 
                                                        borderColor: stressColor,
                                                        color: stressColor
                                                    }}
                                                >
                                                    {session.stress_level_detected}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* BIG CTA - DO IT NOW */}
                        <Link
                            to={createPageUrl('FrequencyChamber')}
                            className="block bg-gradient-to-r from-pink-600 to-cyan-600 text-white p-8 font-black font-mono text-2xl text-center hover:from-pink-700 hover:to-cyan-700 transition-all border-4 border-pink-400"
                            style={{ boxShadow: '8px 8px 0px rgba(236, 72, 153, 0.8)' }}
                        >
                            <COOLASFUCKWaves size={40} animate={true} className="mx-auto mb-3" />
                            <div>DO YOUR HEALING NOW</div>
                            <p className="text-sm text-pink-200 mt-2 font-normal">
                                {avgRecentStress > 60 ? 'High stress detected - heal it' : 
                                 avgRecentStress > 40 ? 'Medium stress - bring it down' :
                                 'Maintain your healing practice'}
                            </p>
                        </Link>
                    </>
                )}



            </div>
        </div>
    );
}