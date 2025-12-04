
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Play, Pause, Sparkles, Brain, Heart, DollarSign, TrendingUp, Users, Zap, Globe, Radio, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '@/components/shared/AudioProvider';
import QuantumLoader from '@/components/shared/QuantumLoader';
import P51Symbol from '@/components/shared/P51Symbol';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ArtistPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const artistName = urlParams.get('name');

    const { data: tracks, isLoading } = useQuery({
        queryKey: ['artistTracks', artistName],
        queryFn: async () => {
            if (!artistName) return [];
            const allTracks = await base44.entities.Soundtrack.filter({ artist: artistName }, 'sequence', 200);
            return allTracks;
        },
        enabled: !!artistName
    });

    const { currentTrack, isPlaying, playTrack } = useAudio();

    if (!artistName) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>No artist specified</p>
            </div>
        );
    }

    if (isLoading) return <QuantumLoader />;

    // Calculate artist's total healing contribution
    const totalPlays = tracks?.reduce((sum, t) => sum + (t.play_count || 0), 0) || 0;
    const totalTracks = tracks?.length || 0;
    
    // EARNINGS CALCULATION
    const totalEarnedP51 = tracks?.reduce((sum, t) => sum + (t.total_earned_p51 || 0), 0) || 0;
    const artistKeeps = totalEarnedP51 * 0.9; // 90% to artist
    const healingFund = totalEarnedP51 * 0.1; // 10% to healing missions

    // Get dominant frequencies across all tracks
    const allFingerprints = tracks?.filter(t => t.frequency_fingerprint) || [];
    const dominantFrequencies = {};
    
    allFingerprints.forEach(track => {
        const fingerprint = track.frequency_fingerprint;
        if (fingerprint?.harmonic_analysis?.dominant_frequencies) {
            fingerprint.harmonic_analysis.dominant_frequencies.forEach(freq => {
                const hz = freq.frequency;
                if (!dominantFrequencies[hz]) {
                    dominantFrequencies[hz] = { hz, totalAmplitude: 0, count: 0 };
                }
                dominantFrequencies[hz].totalAmplitude += freq.amplitude;
                dominantFrequencies[hz].count += 1;
            });
        }
    });

    const topFrequencies = Object.values(dominantFrequencies)
        .map(f => ({ hz: f.hz, avgAmplitude: f.totalAmplitude / f.count }))
        .sort((a, b) => b.avgAmplitude - a.avgAmplitude)
        .slice(0, 5);

    const handlePlay = (track) => {
        if (currentTrack?.id === track.id && isPlaying) return;
        playTrack(track);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12 pb-32">
            
            {/* BACK BUTTON - FIXED AT TOP */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-20 left-4 md:left-8 z-50"
            >
                <button
                    onClick={() => navigate(createPageUrl('Radio'))}
                    className="flex items-center gap-2 px-4 py-3 bg-black/90 backdrop-blur-sm border-2 border-cyan-500/50 rounded-xl hover:border-cyan-400 transition-all shadow-lg"
                    style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
                >
                    <ArrowLeft className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-bold">Back to Radio</span>
                </button>
            </motion.div>

            <div className="max-w-6xl mx-auto space-y-12">

                {/* ARTIST HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 mx-auto flex items-center justify-center shadow-2xl"
                        style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)' }}
                    >
                        <Music className="w-16 h-16 text-white" />
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white">
                        {artistName}
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-6 text-center">
                        <div>
                            <p className="text-3xl font-black text-cyan-400">{totalTracks}</p>
                            <p className="text-sm text-gray-400">Frequencies</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-purple-400">{totalPlays.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Souls Reached</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-green-400 flex items-center justify-center gap-1">
                                {totalEarnedP51.toLocaleString()} <span className="text-base"><P51Symbol showTooltip={false} /></span>
                            </p>
                            <p className="text-sm text-gray-400">Total Earned</p>
                        </div>
                    </div>
                </motion.header>

                {/* EARNINGS DASHBOARD */}
                <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <DollarSign className="w-12 h-12 text-green-400" style={{ filter: 'drop-shadow(0 0 20px #22c55e)' }} />
                            <div>
                                <h2 className="text-3xl font-black text-white">Earnings Dashboard</h2>
                                <p className="text-gray-400">Real-time love currency tracking</p>
                            </div>
                        </div>

                        {/* THE SPLIT - VISUAL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-black/60 p-6 rounded-xl border-2 border-green-500/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-8 h-8 text-green-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">You Keep (90%)</p>
                                        <p className="text-4xl font-black text-green-400 flex items-center gap-1">
                                            {artistKeeps.toLocaleString()} <span className="text-xl"><P51Symbol showTooltip={false} /></span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    This is yours. Zero compression. Full respect. Forever.
                                </p>
                            </div>

                            <div className="bg-black/60 p-6 rounded-xl border-2 border-cyan-500/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <Globe className="w-8 h-8 text-cyan-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">Healing Fund (10%)</p>
                                        <p className="text-4xl font-black text-cyan-400 flex items-center gap-1">
                                            {healingFund.toLocaleString()} <span className="text-xl"><P51Symbol showTooltip={false} /></span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Funds ocean cleanup, sanctuaries, humanitarian aid.
                                </p>
                            </div>
                        </div>

                        {/* EARNINGS BY TRACK */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-black text-white mb-4">Earnings by Frequency</h3>
                            {tracks?.filter(t => t.total_earned_p51 > 0).map((track, i) => (
                                <motion.div
                                    key={track.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-black/40 p-4 rounded-lg border border-green-500/30"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="font-bold text-white">{track.title}</p>
                                            <p className="text-xs text-gray-400">{track.play_count.toLocaleString()} souls reached</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-green-400 flex items-center gap-1">
                                                {track.total_earned_p51.toLocaleString()} <span className="text-sm"><P51Symbol showTooltip={false} /></span>
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                You: {(track.total_earned_p51 * 0.9).toFixed(0)} | Earth: {(track.total_earned_p51 * 0.1).toFixed(0)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {tracks?.filter(t => t.total_earned_p51 > 0).length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <Radio className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                                    <p>No earnings yet. Keep transmitting.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* VISUAL HEALING TRANSMISSION */}
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <Zap className="w-12 h-12 text-purple-400" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} />
                            <div>
                                <h2 className="text-3xl font-black text-white">Healing Transmission</h2>
                                <p className="text-gray-400">Your frequencies spreading across Earth</p>
                            </div>
                        </div>

                        {/* REAL-TIME METRICS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-black/60 p-4 rounded-xl text-center border border-purple-500/30">
                                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-purple-400">{totalPlays.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">Total Transmissions</p>
                            </div>
                            
                            <div className="bg-black/60 p-4 rounded-xl text-center border border-cyan-500/30">
                                <Radio className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-cyan-400">{totalTracks}</p>
                                <p className="text-xs text-gray-400">Live Frequencies</p>
                            </div>
                            
                            <div className="bg-black/60 p-4 rounded-xl text-center border border-pink-500/30">
                                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-pink-400">{Math.round(totalPlays / (totalTracks || 1))}</p>
                                <p className="text-xs text-gray-400">Avg/Frequency</p>
                            </div>
                            
                            <div className="bg-black/60 p-4 rounded-xl text-center border border-green-500/30">
                                <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-green-400">
                                    {allFingerprints.length > 0 ? '100%' : '0%'}
                                </p>
                                <p className="text-xs text-gray-400">Verified</p>
                            </div>
                        </div>

                        {/* FREQUENCY BREAKDOWN */}
                        <div className="bg-black/40 p-6 rounded-xl border border-purple-500/30">
                            <h3 className="text-lg font-black text-white mb-4">Healing by Frequency Type</h3>
                            {['Healing', 'Creation', 'Focus', 'Decompression', 'Love', 'Revolution'].map(type => {
                                const typeTracks = tracks?.filter(t => t.frequency_type === type) || [];
                                const typePlays = typeTracks.reduce((sum, t) => sum + (t.play_count || 0), 0);
                                const percentage = totalPlays > 0 ? (typePlays / totalPlays) * 100 : 0;
                                
                                if (typeTracks.length === 0) return null;
                                
                                const colors = {
                                    'Healing': 'from-green-500 to-emerald-500',
                                    'Creation': 'from-yellow-500 to-orange-500',
                                    'Focus': 'from-blue-500 to-cyan-500',
                                    'Decompression': 'from-purple-500 to-pink-500',
                                    'Love': 'from-pink-500 to-rose-500',
                                    'Revolution': 'from-red-500 to-orange-500'
                                };
                                
                                return (
                                    <div key={type} className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-bold">{type}</span>
                                            <span className="text-gray-400 text-sm">
                                                {typePlays.toLocaleString()} plays ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${colors[type]}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1 }}
                                                style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-4 bg-black/60 rounded-lg border-l-4 border-purple-400">
                            <p className="text-sm text-gray-300">
                                <strong className="text-purple-400">Visual Healing Transmission:</strong> Every play = a soul receiving your frequency. 
                                This is real-time planetary healing happening right now through your art.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* SOUL SIGNATURE - THE SCIENCE */}
                {topFrequencies.length > 0 && (
                    <Card className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Brain className="w-12 h-12 text-purple-400" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} />
                                <div>
                                    <h2 className="text-3xl font-black text-white">Soul Signature</h2>
                                    <p className="text-gray-400">The healing Hz this artist transmits</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {topFrequencies.map((freq, i) => (
                                    <motion.div
                                        key={freq.hz}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-bold text-lg">{freq.hz}Hz</span>
                                            <span className="text-cyan-400 text-sm">
                                                {(freq.avgAmplitude * 100).toFixed(0)}% presence
                                            </span>
                                        </div>
                                        <div className="h-4 bg-gray-900 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${freq.avgAmplitude * 100}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-black/40 rounded-lg border-l-4 border-cyan-400">
                                <p className="text-sm text-gray-300">
                                    <strong className="text-cyan-400">What this means:</strong> These are the dominant healing frequencies 
                                    across {artistName}'s entire catalog. This is their unique contribution to planetary healing.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ALL TRACKS */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white">All Transmissions</h2>
                    
                    {tracks?.map((track, i) => (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card className="bg-black/60 border-2 border-cyan-500/30 hover:border-cyan-400 transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handlePlay(track)}
                                            className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0"
                                            style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
                                        >
                                            {currentTrack?.id === track.id && isPlaying ? (
                                                <Pause className="w-6 h-6 text-white" />
                                            ) : (
                                                <Play className="w-6 h-6 text-white ml-1" />
                                            )}
                                        </button>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-black text-white">{track.title}</h3>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="px-2 py-1 bg-cyan-900/40 border border-cyan-500/50 rounded text-xs text-cyan-300 font-bold">
                                                    {track.frequency_type}
                                                </span>
                                                {track.play_count > 0 && (
                                                    <span className="px-2 py-1 bg-purple-900/40 border border-purple-500/50 rounded text-xs text-purple-300">
                                                        {track.play_count.toLocaleString()} souls
                                                    </span>
                                                )}
                                                {track.total_earned_p51 > 0 && (
                                                    <span className="px-2 py-1 bg-green-900/40 border border-green-500/50 rounded text-xs text-green-300 font-bold">
                                                        {track.total_earned_p51.toLocaleString()} <P51Symbol showTooltip={false} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {track.frequency_fingerprint && (
                                            <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
