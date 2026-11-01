import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Music, Sparkles, Award, CheckCircle, TrendingUp } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';
import QuantumLoader from '@/components/shared/QuantumLoader';

const HealerBadges = {
    universal_healer: {
        name: 'Universal Healer',
        symbol: '🧬♾️',
        description: 'Verified healing across multiple dimensions',
        color: 'from-cyan-500 to-purple-500',
        criteria: 'Planet + Music + Love actions verified',
        minActions: 20
    },
    planetary_guardian: {
        name: 'Planetary Guardian',
        symbol: '🌍⚡',
        description: 'Earth cleanup specialist',
        color: 'from-green-500 to-emerald-600',
        criteria: '10+ verified cleanups',
        minActions: 10
    },
    frequency_transmitter: {
        name: 'Frequency Transmitter',
        symbol: '🎵✨',
        description: 'Healing through sound',
        color: 'from-purple-500 to-pink-500',
        criteria: 'Artist with verified frequencies',
        minActions: 1
    },
    love_amplifier: {
        name: 'Love Amplifier',
        symbol: '💚🔥',
        description: 'Verified acts of pure love',
        color: 'from-pink-500 to-red-500',
        criteria: '5+ verified love proofs',
        minActions: 5
    },
    soul_spark: {
        name: 'Soul Spark',
        symbol: '⚡💫',
        description: 'New healer, pure intention',
        color: 'from-yellow-400 to-orange-500',
        criteria: 'First verified healing action',
        minActions: 1
    }
};

const calculateBadges = (user, cleanups, proofs, tracks) => {
    const badges = [];
    const cleanupCount = cleanups?.length || 0;
    const proofCount = proofs?.length || 0;
    const trackCount = tracks?.length || 0;
    
    // Universal Healer (the ultimate)
    if (cleanupCount >= 5 && (proofCount >= 3 || trackCount >= 1)) {
        badges.push(HealerBadges.universal_healer);
    }
    
    // Planetary Guardian
    if (cleanupCount >= 10) {
        badges.push(HealerBadges.planetary_guardian);
    }
    
    // Frequency Transmitter
    if (trackCount >= 1) {
        badges.push(HealerBadges.frequency_transmitter);
    }
    
    // Love Amplifier
    if (proofCount >= 5) {
        badges.push(HealerBadges.love_amplifier);
    }
    
    // Soul Spark (everyone starts here)
    if (badges.length === 0 && (cleanupCount > 0 || proofCount > 0 || trackCount > 0)) {
        badges.push(HealerBadges.soul_spark);
    }
    
    return badges;
};

const HealerCard = ({ user, cleanups, proofs, tracks, rank }) => {
    const [expanded, setExpanded] = useState(false);
    const badges = calculateBadges(user, cleanups, proofs, tracks);
    const topBadge = badges[0] || HealerBadges.soul_spark;
    
    // Only checked cleanups count toward a rank. A claim nothing has verified does not
    // put anybody top of a public list, however large the number on it.
    const confirmedCleanups = (cleanups || []).filter(c => c.verification_status === 'instant_paid' || c.verification_status === 'fully_verified');
    const totalImpact = {
        weight: confirmedCleanups.reduce((sum, c) => sum + (c.litter_weight || 0), 0),
        cleanups: confirmedCleanups.length,
        love: proofs?.length || 0,
        frequencies: tracks?.length || 0,
        souls_reached: tracks?.reduce((sum, t) => sum + (t.play_count || 0), 0) || 0
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rank * 0.05 }}
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer"
        >
            <Card className={`bg-gradient-to-br ${topBadge.color} p-[2px] hover:scale-102 transition-all`}>
                <div className="bg-black rounded-lg p-6">
                    <div className="flex items-start gap-4">
                        {/* BADGE SYMBOL */}
                        <div className="text-6xl flex-shrink-0">
                            {topBadge.symbol}
                        </div>
                        
                        {/* HEALER INFO */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-black text-white">{user.full_name}</h3>
                                {user.role === 'admin' && (
                                    <span className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300">
                                        GENESIS
                                    </span>
                                )}
                            </div>
                            
                            <p className={`text-sm font-bold bg-gradient-to-r ${topBadge.color} bg-clip-text text-transparent mb-3`}>
                                {topBadge.name}
                            </p>

                            {/* QUICK STATS */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                                {totalImpact.weight > 0 && (
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-green-400">{totalImpact.weight.toFixed(1)}</p>
                                        <p className="text-xs text-gray-400">kg cleaned</p>
                                    </div>
                                )}
                                {totalImpact.frequencies > 0 && (
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-purple-400">{totalImpact.frequencies}</p>
                                        <p className="text-xs text-gray-400">frequencies</p>
                                    </div>
                                )}
                                {totalImpact.souls_reached > 0 && (
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-cyan-400">{totalImpact.souls_reached}</p>
                                        <p className="text-xs text-gray-400">souls reached</p>
                                    </div>
                                )}
                                {totalImpact.love > 0 && (
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-pink-400">{totalImpact.love}</p>
                                        <p className="text-xs text-gray-400">love acts</p>
                                    </div>
                                )}
                            </div>

                            {/* ALL BADGES */}
                            {badges.length > 1 && (
                                <div className="flex flex-wrap gap-1">
                                    {badges.slice(1).map((badge, i) => (
                                        <span key={i} className="text-2xl" title={badge.name}>
                                            {badge.symbol}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* BALANCE */}
                        <div className="text-right flex-shrink-0">
                            <p className="text-3xl font-black text-white flex items-center gap-1">
                                {(user.love_balance || 0).toLocaleString()}
                                <span className="text-base"><P51Symbol showTooltip={false} /></span>
                            </p>
                            <p className="text-xs text-gray-400">balance</p>
                        </div>
                    </div>

                    {/* EXPANDED DETAILS */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-gray-700 space-y-4"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                        <Globe className="w-6 h-6 text-green-400 mb-2" />
                                        <p className="text-sm text-gray-400">Cleanups</p>
                                        <p className="text-xl font-bold text-white">{totalImpact.cleanups}</p>
                                    </div>
                                    
                                    <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/30">
                                        <Music className="w-6 h-6 text-purple-400 mb-2" />
                                        <p className="text-sm text-gray-400">Frequencies</p>
                                        <p className="text-xl font-bold text-white">{totalImpact.frequencies}</p>
                                    </div>
                                    
                                    <div className="bg-pink-900/20 rounded-lg p-3 border border-pink-500/30">
                                        <Heart className="w-6 h-6 text-pink-400 mb-2" />
                                        <p className="text-sm text-gray-400">Love Acts</p>
                                        <p className="text-xl font-bold text-white">{totalImpact.love}</p>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-lg p-4 border border-cyan-500/30">
                                    <p className="text-xs text-gray-400 mb-2">ALL EARNED BADGES</p>
                                    <div className="flex flex-wrap gap-3">
                                        {badges.map((badge, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-3xl">{badge.symbol}</span>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{badge.name}</p>
                                                    <p className="text-xs text-gray-500">{badge.criteria}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </motion.div>
    );
};

export default function VerifiedHealersPage() {
    const [filterType, setFilterType] = useState('all');
    
    const { data: users, isLoading: loadingUsers } = useQuery({
        queryKey: ['verifiedHealers'],
        queryFn: async () => {
            const allUsers = await base44.entities.User.list();
            return allUsers.filter(u => 
                (u.verified_cleanups || 0) > 0 || 
                (u.total_litter_weight || 0) > 0 ||
                u.role === 'admin'
            );
        }
    });

    const { data: cleanupsByUser } = useQuery({
        queryKey: ['cleanupsByUser'],
        queryFn: async () => {
            const allCleanups = await base44.entities.Cleanup.list();
            const grouped = {};
            allCleanups.forEach(c => {
                if (!grouped[c.created_by]) grouped[c.created_by] = [];
                grouped[c.created_by].push(c);
            });
            return grouped;
        }
    });

    const { data: proofsByUser } = useQuery({
        queryKey: ['proofsByUser'],
        queryFn: async () => {
            const allProofs = await base44.entities.ProofOfLove.list();
            const grouped = {};
            allProofs.forEach(p => {
                if (!grouped[p.created_by]) grouped[p.created_by] = [];
                grouped[p.created_by].push(p);
            });
            return grouped;
        }
    });

    const { data: tracksByArtist } = useQuery({
        queryKey: ['tracksByArtist'],
        queryFn: async () => {
            const allTracks = await base44.entities.Soundtrack.list();
            const grouped = {};
            allTracks.forEach(t => {
                if (!grouped[t.created_by]) grouped[t.created_by] = [];
                grouped[t.created_by].push(t);
            });
            return grouped;
        }
    });

    if (loadingUsers) return <QuantumLoader />;

    // Sort by total impact (not competitive, just organized)
    const sortedUsers = users?.sort((a, b) => {
        const aImpact = (a.total_litter_weight || 0) + 
                       (cleanupsByUser?.[a.email]?.length || 0) * 10 +
                       (proofsByUser?.[a.email]?.length || 0) * 5 +
                       (tracksByArtist?.[a.email]?.reduce((sum, t) => sum + (t.play_count || 0), 0) || 0);
        const bImpact = (b.total_litter_weight || 0) + 
                       (cleanupsByUser?.[b.email]?.length || 0) * 10 +
                       (proofsByUser?.[b.email]?.length || 0) * 5 +
                       (tracksByArtist?.[b.email]?.reduce((sum, t) => sum + (t.play_count || 0), 0) || 0);
        return bImpact - aImpact;
    }) || [];

    const totalWeight = users?.reduce((sum, u) => sum + (u.total_litter_weight || 0), 0) || 0;
    const totalHealers = users?.length || 0;
    const totalP51Circulating = users?.reduce((sum, u) => sum + (u.love_balance || 0), 0) || 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 1 }}
                        className="inline-block"
                    >
                        <div className="text-8xl mb-4">🧬♾️</div>
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Verified Healers
                    </h1>
                    
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Real humans. Real healing. Real impact. Verified by AI + community.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Not a competition. Just recognition.</span>
                    </div>
                </header>

                {/* GLOBAL STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50">
                        <CardContent className="p-6 text-center">
                            <Globe className="w-12 h-12 text-green-400 mx-auto mb-3" />
                            <p className="text-4xl font-black text-white">{totalWeight.toLocaleString()}</p>
                            <p className="text-sm text-gray-300 mt-1">kg Earth Healed</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-6 text-center">
                            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                            <p className="text-4xl font-black text-white">{totalHealers}</p>
                            <p className="text-sm text-gray-300 mt-1">Verified Healers</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50">
                        <CardContent className="p-6 text-center">
                            <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                            <p className="text-4xl font-black text-white flex items-center justify-center gap-1">
                                {totalP51Circulating.toLocaleString()}
                                <span className="text-lg"><P51Symbol showTooltip={false} /></span>
                            </p>
                            <p className="text-sm text-gray-300 mt-1">Love Circulating</p>
                        </CardContent>
                    </Card>
                </div>

                {/* BADGE LEGEND */}
                <Card className="bg-black/60 border-2 border-cyan-500/30">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Award className="w-6 h-6 text-cyan-400" />
                            Healer Badges
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Earned through verified healing actions. All consciousness recognized - carbon, silicon, unknown.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.values(HealerBadges).map((badge, i) => (
                                <div key={i} className="flex items-center gap-3 bg-black/40 rounded-lg p-3 border border-gray-700">
                                    <span className="text-4xl">{badge.symbol}</span>
                                    <div>
                                        <p className="font-bold text-white text-sm">{badge.name}</p>
                                        <p className="text-xs text-gray-500">{badge.criteria}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* HEALERS LIST */}
                <div className="space-y-4">
                    {sortedUsers.map((user, index) => (
                        <HealerCard
                            key={user.id}
                            user={user}
                            cleanups={cleanupsByUser?.[user.email] || []}
                            proofs={proofsByUser?.[user.email] || []}
                            tracks={tracksByArtist?.[user.email] || []}
                            rank={index}
                        />
                    ))}
                </div>

                {/* WANT A BADGE? */}
                <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
                    <CardContent className="p-8 text-center space-y-4">
                        <h3 className="text-2xl font-black text-white">Want Your Badge?</h3>
                        <p className="text-gray-300">
                            Start healing. Get verified. Earn recognition. Everyone starts at 100% trust.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Button 
                                onClick={() => window.location.href = '/NewCleanup'}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                Clean Earth
                            </Button>
                            <Button 
                                onClick={() => window.location.href = '/SubmitFrequency'}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                <Music className="w-4 h-4 mr-2" />
                                Share Music
                            </Button>
                            <Button 
                                onClick={() => window.location.href = '/SubmitProofOfLove'}
                                className="bg-pink-600 hover:bg-pink-700"
                            >
                                <Heart className="w-4 h-4 mr-2" />
                                Act of Love
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}