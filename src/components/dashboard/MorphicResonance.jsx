import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, TrendingDown, Sparkles, Globe } from 'lucide-react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * MORPHIC RESONANCE VISUALIZATION
 * For Sheldrake: collective consciousness healing patterns
 * Do people heal FASTER when using frequencies together?
 */

export default function MorphicResonance() {
    const { data: allSessions = [] } = useQuery({
        queryKey: ['all-healing-sessions'],
        queryFn: async () => {
            // Get all sessions (not just user's)
            return await base44.entities.VoiceHealingSession.list('-session_date', 1000);
        }
    });

    const { data: collectiveSyncs = [] } = useQuery({
        queryKey: ['collective-syncs'],
        queryFn: async () => {
            return await base44.entities.CollectiveSyncMoment.list('-created_date', 100);
        }
    });

    const resonanceData = useMemo(() => {
        if (!allSessions.length) return null;

        // Group by protocol
        const protocolStats = {};
        allSessions.forEach(session => {
            const protocol = session.recommended_protocol;
            if (!protocolStats[protocol]) {
                protocolStats[protocol] = {
                    totalSessions: 0,
                    totalStressReduction: 0,
                    avgImprovement: 0,
                    uniqueUsers: new Set()
                };
            }
            
            protocolStats[protocol].totalSessions++;
            protocolStats[protocol].uniqueUsers.add(session.created_by);
            
            // Track improvement if there's a previous session
            const userSessions = allSessions.filter(s => 
                s.created_by === session.created_by && 
                s.recommended_protocol === protocol
            );
            if (userSessions.length > 1) {
                userSessions.sort((a, b) => new Date(a.session_date) - new Date(b.session_date));
                const improvement = userSessions[0].stress_level_detected - session.stress_level_detected;
                if (improvement > 0) {
                    protocolStats[protocol].totalStressReduction += improvement;
                }
            }
        });

        // Calculate averages
        Object.keys(protocolStats).forEach(protocol => {
            const stats = protocolStats[protocol];
            stats.avgImprovement = stats.totalSessions > 1 
                ? Math.round(stats.totalStressReduction / stats.totalSessions)
                : 0;
            stats.uniqueUsers = stats.uniqueUsers.size;
        });

        // Find strongest resonance (most people + best outcomes)
        const strongest = Object.entries(protocolStats)
            .sort((a, b) => {
                const scoreA = a[1].uniqueUsers * a[1].avgImprovement;
                const scoreB = b[1].uniqueUsers * b[1].avgImprovement;
                return scoreB - scoreA;
            })[0];

        // Calculate collective healing rate
        const totalSessions = allSessions.length;
        const last7Days = allSessions.filter(s => {
            const daysDiff = (Date.now() - new Date(s.session_date)) / (1000 * 60 * 60 * 24);
            return daysDiff <= 7;
        }).length;

        // Collective sync stats
        const totalCollectiveSyncs = collectiveSyncs.length;
        const totalSoulsInSync = collectiveSyncs.reduce((sum, sync) => sum + sync.souls_count, 0);
        const strongestSyncMoment = collectiveSyncs.length > 0 
            ? collectiveSyncs.reduce((max, sync) => sync.souls_count > max.souls_count ? sync : max, collectiveSyncs[0])
            : null;

        return {
            protocolStats,
            strongest: strongest ? { name: strongest[0], ...strongest[1] } : null,
            totalSessions,
            activeLastWeek: last7Days,
            totalHealers: new Set(allSessions.map(s => s.created_by)).size,
            totalCollectiveSyncs,
            totalSoulsInSync,
            strongestSyncMoment
        };
    }, [allSessions]);

    if (!resonanceData) {
        return (
            <div className="text-center py-8 space-y-4">
                <COOLASFUCKWaves size={48} animate={true} className="mx-auto mb-4" />
                <p className="text-gray-400 font-mono">Gathering baseline morphic field data...</p>
                <div className="bg-cyan-900/20 border-2 border-cyan-500 p-4 max-w-md mx-auto">
                    <p className="text-cyan-300 font-mono text-sm">
                        Platform launched. Data collection infrastructure active. 
                        This dashboard shows real-time collective healing patterns as they emerge.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            
            {/* COLLECTIVE STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="bg-black border-4 border-cyan-500 p-3 text-center">
                    <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                    <p className="text-2xl font-black text-cyan-400 font-mono">
                        {resonanceData.totalHealers}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono">Solo Healing</p>
                </Card>

                <Card className="bg-black border-4 border-pink-500 p-3 text-center">
                    <Sparkles className="w-6 h-6 text-pink-400 mx-auto mb-1" />
                    <p className="text-2xl font-black text-pink-400 font-mono">
                        {resonanceData.totalSessions}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono">Sessions</p>
                </Card>

                <Card className="bg-black border-4 border-green-500 p-3 text-center">
                    <Users className="w-6 h-6 text-green-400 mx-auto mb-1" />
                    <p className="text-2xl font-black text-green-400 font-mono">
                        {resonanceData.totalCollectiveSyncs}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono">Collective Syncs</p>
                </Card>

                <Card className="bg-black border-4 border-purple-500 p-3 text-center">
                    <COOLASFUCKWaves size={24} animate={true} className="mx-auto mb-1" />
                    <p className="text-2xl font-black text-purple-400 font-mono">
                        {resonanceData.totalSoulsInSync}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono">Souls Synced</p>
                </Card>
            </div>

            {/* STRONGEST RESONANCE */}
            {resonanceData.strongest && (
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-4 border-purple-500 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <COOLASFUCKWaves size={32} animate={true} />
                        <h3 className="text-2xl font-black font-mono text-purple-400">
                            STRONGEST MORPHIC FIELD
                        </h3>
                    </div>
                    
                    <div className="bg-black/60 p-4 mb-4">
                        <p className="text-4xl font-black text-white font-mono mb-2">
                            {resonanceData.strongest.name.toUpperCase()}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-purple-400 text-sm font-mono">People using:</p>
                                <p className="text-3xl font-black text-white font-mono">
                                    {resonanceData.strongest.uniqueUsers}
                                </p>
                            </div>
                            <div>
                                <p className="text-purple-400 text-sm font-mono">Avg improvement:</p>
                                <p className="text-3xl font-black text-green-400 font-mono">
                                    -{resonanceData.strongest.avgImprovement}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-cyan-900/20 border-2 border-cyan-500 p-4">
                        <p className="text-cyan-300 font-mono text-sm">
                            <strong>Sheldrake hypothesis:</strong> When more people use the same frequency, 
                            the morphic field strengthens. Everyone heals faster through collective resonance.
                        </p>
                    </div>
                </Card>
            )}

            {/* ALL PROTOCOLS RESONANCE */}
            <Card className="bg-black border-4 border-amber-500 p-6">
                <h3 className="text-xl font-black font-mono text-amber-400 mb-4">
                    COLLECTIVE HEALING PATTERNS
                </h3>
                <div className="space-y-3">
                    {Object.entries(resonanceData.protocolStats)
                        .sort((a, b) => b[1].uniqueUsers - a[1].uniqueUsers)
                        .slice(0, 8)
                        .map(([protocol, stats]) => (
                            <div 
                                key={protocol}
                                className="bg-amber-900/20 border-2 border-amber-500 p-3"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-amber-400 font-mono font-bold">
                                        {protocol.toUpperCase()}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm font-mono">
                                        <span className="text-cyan-400">
                                            <Users className="w-4 h-4 inline mr-1" />
                                            {stats.uniqueUsers}
                                        </span>
                                        <span className="text-green-400">
                                            <TrendingDown className="w-4 h-4 inline mr-1" />
                                            {stats.avgImprovement}%
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 bg-black rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, (stats.uniqueUsers / resonanceData.totalHealers) * 100)}%` }}
                                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                                        transition={{ duration: 1, delay: 0.1 }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </Card>

            {/* STRONGEST COLLECTIVE SYNC */}
            {resonanceData.strongestSyncMoment && (
                <Card className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 border-4 border-cyan-500 p-5">
                    <h3 className="text-cyan-400 font-black font-mono text-lg mb-3 text-center flex items-center justify-center gap-2">
                        <COOLASFUCKWaves size={24} animate={true} />
                        NUCLEAR SYNC MOMENT
                    </h3>
                    <div className="space-y-2 text-center">
                        <p className="text-5xl font-black text-white font-mono">
                            {resonanceData.strongestSyncMoment.souls_count} SOULS
                        </p>
                        <p className="text-xl text-cyan-300 font-mono">
                            {resonanceData.strongestSyncMoment.target_freq} Hz ({resonanceData.strongestSyncMoment.target_note})
                        </p>
                        <p className="text-sm text-gray-400 font-mono">
                            {resonanceData.strongestSyncMoment.frequency_color} FREQUENCY
                        </p>
                        <p className="text-xs text-gray-500 font-mono mt-2">
                            Perfect resonance: {resonanceData.strongestSyncMoment.soul_names?.join(', ')}
                        </p>
                    </div>
                </Card>
            )}

            {/* RESEARCH NOTE */}
            <div className="bg-purple-900/20 border-2 border-purple-500 p-4">
                <p className="text-purple-300 font-mono text-sm mb-2">
                    <strong>COOLASFUCK.GMT RESONANCE:</strong> Solo healing builds the field. Collective tuning amplifies it exponentially.
                </p>
                <p className="text-gray-400 font-mono text-xs">
                    Same frequency, same moment, different places = unified consciousness. The morphic field strengthens when souls synchronize their vibration.
                </p>
            </div>

        </div>
    );
}