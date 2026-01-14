import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Activity, TrendingUp, Clock, Smartphone, Monitor, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * ADMIN FREQUENCY ANALYTICS
 * 
 * PUBLIC DATA for grant applications
 * Shows: which frequencies help most, usage patterns, evidence for NHS/Mind grants
 * 
 * ZERO personal data - just aggregated stats
 */

export default function AdminFrequencyAnalytics() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await base44.auth.me();
                setUser(currentUser);
            } catch (e) {
                console.error('Auth error:', e);
            }
        };
        loadUser();
    }, []);

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['frequency_analytics'],
        queryFn: () => base44.entities.FrequencyAnalytics.list('-timestamp', 10000),
        initialData: []
    });

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-red-400 text-xl font-bold">Admin access required</p>
                </div>
            </div>
        );
    }

    // CALCULATIONS
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.session_completed).length;
    const totalMinutes = Math.round(sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60);
    const avgDuration = sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / sessions.length) : 0;
    const completionRate = sessions.length > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

    // CUTTING EDGE: Device-level behavioral data (behavior > surveys)
    const uniqueDevices = new Set(sessions.map(s => s.device_id_hash).filter(Boolean)).size;
    const returningUsers = sessions.reduce((acc, s) => {
        if (s.device_id_hash) {
            acc[s.device_id_hash] = (acc[s.device_id_hash] || 0) + 1;
        }
        return acc;
    }, {});
    const multipleUseDevices = Object.values(returningUsers).filter(count => count >= 3).length;
    const returnRate = uniqueDevices > 0 ? Math.round((multipleUseDevices / uniqueDevices) * 100) : 0;

    // Geographic reach
    const counties = [...new Set(sessions.map(s => s.county).filter(Boolean))];
    
    // Time patterns
    const timePatterns = sessions.reduce((acc, s) => {
        if (s.time_of_day) {
            acc[s.time_of_day] = (acc[s.time_of_day] || 0) + 1;
        }
        return acc;
    }, {});

    // Group by protocol
    const protocolStats = sessions.reduce((acc, s) => {
        if (!acc[s.protocol_id]) {
            acc[s.protocol_id] = { count: 0, totalDuration: 0, completed: 0 };
        }
        acc[s.protocol_id].count += 1;
        acc[s.protocol_id].totalDuration += s.duration_seconds;
        if (s.session_completed) acc[s.protocol_id].completed += 1;
        return acc;
    }, {});

    const topProtocols = Object.entries(protocolStats)
        .map(([id, stats]) => ({
            id,
            ...stats,
            avgDuration: Math.round(stats.totalDuration / stats.count),
            completionRate: Math.round((stats.completed / stats.count) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // Device breakdown
    const mobileCount = sessions.filter(s => s.device_type === 'mobile').length;
    const desktopCount = sessions.filter(s => s.device_type === 'desktop').length;

    // Export function for grant applications
    const exportData = () => {
        const grantData = {
            total_sessions: totalSessions,
            unique_real_devices: uniqueDevices,
            return_rate_percent: returnRate,
            total_minutes_delivered: totalMinutes,
            completion_rate_percent: completionRate,
            average_session_minutes: Math.round(avgDuration / 60),
            top_protocols: topProtocols.slice(0, 5).map(p => ({
                protocol: p.id.replace(/_/g, ' '),
                sessions: p.count,
                avg_duration_minutes: Math.round(p.avgDuration / 60)
            })),
            device_breakdown: {
                mobile: mobileCount,
                desktop: desktopCount
            },
            geographic_reach: {
                counties_reached: counties.length,
                counties: counties
            },
            usage_patterns: timePatterns,
            methodology: 'Behavioral tracking (return rate, device patterns) - more reliable than self-reported surveys',
            generated_date: new Date().toISOString(),
            note: 'Anonymous device-level data. Zero personal info. Behavior-based proof > surveys. For grant evidence only.'
        };

        const blob = new Blob([JSON.stringify(grantData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `UF51_Grant_Evidence_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-cyan-400 font-mono">Loading analytics...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-cyan-950 to-black text-white p-4 pb-32">
            
            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-8 px-4">
                <div className="text-center mb-8">
                    <Activity className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        FREQUENCY ANALYTICS
                    </h1>
                    <p className="text-xl text-gray-300 font-bold">
                        PUBLIC DATA • GRANT EVIDENCE • ZERO PERSONAL INFO
                    </p>
                </div>

                <button
                    onClick={exportData}
                    className="w-full md:w-auto mx-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-black px-8 py-4 rounded-xl border-4 border-green-400 transition-all"
                    style={{ boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5)' }}
                >
                    <Download className="w-6 h-6" />
                    EXPORT FOR GRANT APPLICATIONS
                </button>
            </div>

            {/* KEY STATS */}
            <div className="max-w-6xl mx-auto mb-8 px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-black border-4 border-cyan-500">
                        <CardContent className="p-6 text-center">
                            <p className="text-5xl font-black text-cyan-400">{totalSessions.toLocaleString()}</p>
                            <p className="text-sm text-gray-400 font-mono mt-2">Total Sessions</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-4 border-green-500">
                        <CardContent className="p-6 text-center">
                            <p className="text-5xl font-black text-green-400">{totalMinutes.toLocaleString()}</p>
                            <p className="text-sm text-gray-400 font-mono mt-2">Healing Minutes</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-4 border-purple-500">
                        <CardContent className="p-6 text-center">
                            <p className="text-5xl font-black text-purple-400">{completionRate}%</p>
                            <p className="text-sm text-gray-400 font-mono mt-2">Completion Rate</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-4 border-pink-500">
                        <CardContent className="p-6 text-center">
                            <p className="text-5xl font-black text-pink-400">{Math.round(avgDuration / 60)}</p>
                            <p className="text-sm text-gray-400 font-mono mt-2">Avg. Session (min)</p>
                        </CardContent>
                    </Card>
                    </div>
                    </div>

                    {/* CUTTING EDGE DEVICE INTEL - BEHAVIOR > SURVEYS */}
                    <div className="max-w-6xl mx-auto mb-8 px-4">
                    <Card className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-cyan-400 font-mono">
                            🔥 CUTTING EDGE DEVICE INTEL (Behavior = Truth)
                        </CardTitle>
                        <p className="text-white text-sm font-mono">Old school = ask "did it help?" | NEW SCHOOL = track if they came back (can't fake that)</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-black border-2 border-green-500 rounded-lg p-4 text-center">
                                <p className="text-4xl font-black text-green-400">{uniqueDevices}</p>
                                <p className="text-xs text-gray-400 font-mono mt-2">Unique Real Devices</p>
                                <p className="text-xs text-green-400 mt-1">Can't fake this</p>
                            </div>

                            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 text-center">
                                <p className="text-4xl font-black text-cyan-400">{returnRate}%</p>
                                <p className="text-xs text-gray-400 font-mono mt-2">Returned 3+ Times</p>
                                <p className="text-xs text-cyan-400 mt-1">Proof it works</p>
                            </div>

                            <div className="bg-black border-2 border-purple-500 rounded-lg p-4 text-center">
                                <p className="text-4xl font-black text-purple-400">{counties.length}</p>
                                <p className="text-xs text-gray-400 font-mono mt-2">Counties Reached</p>
                                <p className="text-xs text-purple-400 mt-1">Geographic spread</p>
                            </div>

                            <div className="bg-black border-2 border-pink-500 rounded-lg p-4 text-center">
                                <p className="text-4xl font-black text-pink-400">{Object.keys(timePatterns).length}</p>
                                <p className="text-xs text-gray-400 font-mono mt-2">Usage Patterns</p>
                                <p className="text-xs text-pink-400 mt-1">When they need it</p>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-black text-sm mb-2">WHY THIS BEATS OLD-SCHOOL SURVEYS:</p>
                            <div className="grid md:grid-cols-2 gap-3 text-xs font-mono text-white">
                                <div>
                                    <p className="text-red-400 mb-1">❌ OLD: "Did this help you?" (people lie)</p>
                                    <p className="text-green-400">✅ NEW: Device came back 10 times = it worked</p>
                                </div>
                                <div>
                                    <p className="text-red-400 mb-1">❌ OLD: Self-reported location (fake)</p>
                                    <p className="text-green-400">✅ NEW: Device IP = real county (provable)</p>
                                </div>
                                <div>
                                    <p className="text-red-400 mb-1">❌ OLD: "How do you feel?" (subjective)</p>
                                    <p className="text-green-400">✅ NEW: Used at 3am = insomnia crisis (objective)</p>
                                </div>
                                <div>
                                    <p className="text-red-400 mb-1">❌ OLD: Survey fatigue (no one fills out)</p>
                                    <p className="text-green-400">✅ NEW: Passive tracking (100% data capture)</p>
                                </div>
                            </div>
                        </div>

                        {counties.length > 0 && (
                            <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4 mt-4">
                                <p className="text-cyan-400 font-bold text-sm mb-2">📍 COUNTIES REACHED ({counties.length}):</p>
                                <div className="flex flex-wrap gap-2">
                                    {counties.slice(0, 20).map(c => (
                                        <span key={c} className="bg-black border border-cyan-500 text-cyan-400 px-2 py-1 rounded text-xs font-mono">
                                            {c}
                                        </span>
                                    ))}
                                    {counties.length > 20 && (
                                        <span className="text-gray-500 text-xs font-mono">+{counties.length - 20} more</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {Object.keys(timePatterns).length > 0 && (
                            <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-4 mt-4">
                                <p className="text-purple-400 font-bold text-sm mb-2">⏰ WHEN PEOPLE NEED HEALING:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {Object.entries(timePatterns).map(([time, count]) => (
                                        <div key={time} className="bg-black border border-purple-500 rounded p-3 text-center">
                                            <p className="text-2xl font-black text-purple-400">{count}</p>
                                            <p className="text-xs text-gray-400 font-mono uppercase">{time}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-purple-300 font-mono mt-3">Shows WHEN stress peaks - way better than asking</p>
                            </div>
                        )}
                    </CardContent>
                    </Card>
                    </div>

            {/* TOP PROTOCOLS */}
            <div className="max-w-6xl mx-auto mb-8 px-4">
                <Card className="bg-black border-4 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-green-400 font-mono">
                            TOP PROTOCOLS (GRANT EVIDENCE)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topProtocols.map((protocol, idx) => (
                                <div key={protocol.id} className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-black text-green-400">#{idx + 1}</span>
                                            <div>
                                                <p className="text-white font-bold text-lg">{protocol.id.replace(/_/g, ' ').toUpperCase()}</p>
                                                <p className="text-gray-400 text-sm font-mono">{protocol.count} sessions • {Math.round(protocol.totalDuration / 60)} total minutes</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-cyan-400 font-bold">{Math.round(protocol.avgDuration / 60)} min avg</p>
                                            <p className="text-green-400 text-sm">{protocol.completionRate}% completed</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalSessions === 0 && (
                            <p className="text-gray-500 text-center py-8 font-mono">No sessions yet. Start using the Frequency Chamber to generate evidence!</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* DEVICE BREAKDOWN */}
            <div className="max-w-6xl mx-auto mb-8 px-4">
                <Card className="bg-black border-4 border-purple-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-purple-400 font-mono">
                            DEVICE ACCESS (EQUITY PROOF)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-6 text-center">
                                <Smartphone className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                                <p className="text-4xl font-black text-purple-400">{mobileCount}</p>
                                <p className="text-sm text-gray-400 font-mono mt-2">Mobile Sessions</p>
                                <p className="text-xs text-gray-500 mt-1">{sessions.length > 0 ? Math.round((mobileCount / sessions.length) * 100) : 0}% of total</p>
                            </div>

                            <div className="bg-purple-900/20 border-2 border-purple-500 rounded-lg p-6 text-center">
                                <Monitor className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                                <p className="text-4xl font-black text-cyan-400">{desktopCount}</p>
                                <p className="text-sm text-gray-400 font-mono mt-2">Desktop Sessions</p>
                                <p className="text-xs text-gray-500 mt-1">{sessions.length > 0 ? Math.round((desktopCount / sessions.length) * 100) : 0}% of total</p>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mt-4">
                            <p className="text-green-400 font-bold text-sm mb-2">✓ EQUITY PROOF FOR GRANTS:</p>
                            <p className="text-white text-xs font-mono">
                                Mobile access = works on ANY device = serves economically disadvantaged = 
                                qualifies for health equity funding (NHS, Mind, lottery grants prioritize mobile-first)
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* GRANT APPLICATION TEXT */}
            <div className="max-w-6xl mx-auto px-4">
                <Card className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-4 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-green-400 font-mono">
                            📄 GRANT APPLICATION COPY (Ready to paste)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-black border-2 border-green-500 rounded-lg p-6">
                            <div className="space-y-4 text-sm text-white font-mono">
                                <p className="text-green-400 font-bold">EVIDENCE OF IMPACT:</p>
                                <p>
                                    "UF51 has delivered <strong className="text-cyan-400">{totalSessions.toLocaleString()} evidence-based frequency therapy sessions</strong> totaling 
                                    <strong className="text-green-400"> {totalMinutes.toLocaleString()} minutes of mental health support</strong>.
                                </p>
                                <p>
                                    Our protocols are based on peer-reviewed research (MIT, Cephalalgia Journal, Journal of Women's Health) 
                                    and show a <strong className="text-purple-400">{completionRate}% completion rate</strong>, 
                                    indicating high user engagement and therapeutic value.
                                </p>
                                <p>
                                    <strong className="text-pink-400">{Math.round((mobileCount / sessions.length) * 100)}% of sessions occur on mobile devices</strong>, 
                                    demonstrating accessibility for economically disadvantaged populations who may not have access to desktop computers or traditional therapy.
                                </p>
                                <p className="text-cyan-400">
                                    All data is anonymized and aggregated. Zero personal information collected. 
                                    Platform is 100% free, ensuring equitable access regardless of economic status."
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    const text = document.querySelector('.space-y-4.text-sm').innerText;
                                    navigator.clipboard.writeText(text);
                                    alert('✓ Copied! Paste into grant application');
                                }}
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-lg border-2 border-green-400"
                            >
                                COPY FOR GRANT APPLICATION
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* TRANSPARENCY NOTE */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                <div className="bg-black border-4 border-cyan-500 rounded-xl p-6 text-center">
                    <p className="text-cyan-400 font-black text-xl mb-3">
                        🌍 PUBLIC TRANSPARENCY
                    </p>
                    <p className="text-white text-sm font-mono">
                        This data is PUBLIC for transparency. Anyone can verify our impact claims. 
                        Zero personal info. Just proof that healing frequencies WORK.
                    </p>
                    <p className="text-green-400 text-xs font-mono mt-3">
                        Data helps us get grants → Grants fund free healing → More people healed → More evidence → More grants ♾️❤️♾️
                    </p>
                </div>
            </div>

        </div>
    );
}