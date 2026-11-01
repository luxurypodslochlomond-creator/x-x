import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Users, Leaf, Heart, TrendingUp, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';
import P51Symbol from '@/components/shared/P51Symbol';

const StatCard = ({ icon: Icon, label, value, unit, color, glow }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative"
    >
        <div 
            className={`bg-black/60 backdrop-blur-sm p-6 rounded-2xl border-2 ${color} relative overflow-hidden`}
            style={{
                boxShadow: `0 0 30px ${glow}40`
            }}
        >
            <div className="relative z-10">
                <Icon className="w-10 h-10 mb-3" style={{ color: glow }} />
                <p className="text-sm text-gray-400 mb-1">{label}</p>
                <p className="text-4xl font-black text-white flex items-baseline gap-2">
                    {value.toLocaleString()}
                    {unit && <span className="text-xl text-gray-400">{unit}</span>}
                </p>
            </div>
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{ background: `radial-gradient(circle at 50% 50%, ${glow}, transparent)` }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    </motion.div>
);

const CountyLeaderboard = ({ cleanups }) => {
    const countyStats = cleanups.reduce((acc, cleanup) => {
        // An unverified claim does not win a place here. Same rule the totals use.
        if (cleanup.verification_status === 'pending_verification' || cleanup.verification_status === 'rejected') return acc;
        const county = cleanup.county || 'Unknown';
        if (!acc[county]) {
            acc[county] = { count: 0, weight: 0 };
        }
        acc[county].count += 1;
        acc[county].weight += cleanup.litter_weight || 0;
        return acc;
    }, {});

    const topCounties = Object.entries(countyStats)
        .map(([county, stats]) => ({ county, ...stats }))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 10);

    return (
        <Card className="bg-black/60 border-2 border-purple-500/30">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-black text-white">Top Healing Regions</h3>
                </div>
                <div className="space-y-3">
                    {topCounties.map((county, i) => (
                        <motion.div
                            key={county.county}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-purple-900/20 border border-purple-500/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                    i === 0 ? 'bg-yellow-500 text-black' :
                                    i === 1 ? 'bg-gray-400 text-black' :
                                    i === 2 ? 'bg-amber-700 text-white' :
                                    'bg-purple-900/40 text-purple-300'
                                }`}>
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{county.county}</p>
                                    <p className="text-xs text-gray-400">{county.count} cleanups</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-green-400">{county.weight.toFixed(1)}</p>
                                <p className="text-xs text-gray-400">kg cleaned</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const RecentCleanups = ({ cleanups }) => {
    const recent = cleanups.slice(0, 5);

    return (
        <Card className="bg-black/60 border-2 border-cyan-500/30">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-black text-white">Live Feed</h3>
                </div>
                <div className="space-y-3">
                    {recent.map((cleanup, i) => (
                        <motion.div
                            key={cleanup.id}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-cyan-900/20 border border-cyan-500/20"
                        >
                            <div>
                                <p className="font-bold text-white">{cleanup.location}</p>
                                <p className="text-xs text-gray-400">{cleanup.county}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-green-400">+{cleanup.litter_weight}kg</p>
                                <p className="text-xs text-cyan-400">+{cleanup.tokens_awarded} <P51Symbol showTooltip={false} /></p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default function GlobalImpactPage() {
    const { data: cleanups = [], isLoading: loadingCleanups } = useQuery({
        queryKey: ['globalCleanups'],
        queryFn: () => base44.entities.Cleanup.list('-created_date', 1000),
        refetchInterval: 30000 // Refresh every 30s
    });

    const { data: users = [], isLoading: loadingUsers } = useQuery({
        queryKey: ['globalUsers'],
        queryFn: () => base44.entities.User.list(),
        refetchInterval: 60000 // Refresh every 60s
    });

    if (loadingCleanups || loadingUsers) {
        return <QuantumLoader />;
    }

    // The weight is counted over the same cleanups the verified count uses: a claim that
    // nothing has checked is not impact, however large the number on it.
    const verifiedList = cleanups.filter(c => c.verification_status === 'instant_paid' || c.verification_status === 'fully_verified');
    const totalWeight = verifiedList.reduce((sum, c) => sum + (c.litter_weight || 0), 0);
    const totalTokens = users.reduce((sum, u) => sum + (u.love_balance || 0), 0);
    const totalUsers = users.length;
    const verifiedCleanups = verifiedList.length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950/50 to-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                    >
                        <Globe className="w-20 h-20 text-cyan-400" style={{ filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.6))' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        Global Impact
                    </h1>
                    <p className="text-xl text-gray-300">
                        Real souls. Real healing. Real-time.
                    </p>
                </motion.div>

                {/* MAIN STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Leaf}
                        label="Total Litter Cleaned"
                        value={totalWeight.toFixed(1)}
                        unit="kg"
                        color="border-green-500/50"
                        glow="#22c55e"
                    />
                    <StatCard
                        icon={Heart}
                        label="Total P51 Earned"
                        value={Math.round(totalTokens)}
                        unit={<P51Symbol showTooltip={false} />}
                        color="border-pink-500/50"
                        glow="#ec4899"
                    />
                    <StatCard
                        icon={Zap}
                        label="Verified Cleanups"
                        value={verifiedCleanups}
                        color="border-cyan-500/50"
                        glow="#06b6d4"
                    />
                    <StatCard
                        icon={Users}
                        label="Healing Souls"
                        value={totalUsers}
                        color="border-purple-500/50"
                        glow="#a855f7"
                    />
                </div>

                {/* COLLECTIVE POWER */}
                <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8 text-center">
                        <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-white mb-2">
                            This Is The Power Of We
                        </h2>
                        <p className="text-lg text-gray-300 mb-4">
                            Every kilogram cleaned. Every soul paid. Verified. Transparent. Real.
                        </p>
                        <p className="text-2xl font-bold text-green-400">
                            {totalWeight.toFixed(0)} kg = {(totalWeight * 10).toLocaleString()} <P51Symbol showTooltip={false} /> = Real change
                        </p>
                    </CardContent>
                </Card>

                {/* LEADERBOARD & LIVE FEED */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CountyLeaderboard cleanups={cleanups} />
                    <RecentCleanups cleanups={cleanups} />
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link to={createPageUrl('NewCleanup')}>
                        <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold px-8 py-6 text-lg rounded-2xl">
                            <Leaf className="w-6 h-6 mr-2" />
                            Join The Healing
                        </Button>
                    </Link>
                </div>

                {/* MAP LINK */}
                <Card className="bg-black/60 border-2 border-purple-500/30">
                    <CardContent className="p-6 text-center">
                        <MapPin className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                        <h3 className="text-xl font-black text-white mb-2">See It On The Map</h3>
                        <p className="text-gray-400 mb-4">Every cleanup. Every location. Every soul.</p>
                        <Link to={createPageUrl('Map')}>
                            <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/20">
                                View Map of Love
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}