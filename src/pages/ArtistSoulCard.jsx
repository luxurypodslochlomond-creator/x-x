import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Heart, Globe, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

export default function ArtistSoulCardPage() {
    const [searchParams] = useSearchParams();
    const artistEmail = searchParams.get('artist');
    
    const { data: artistUser, isLoading: userLoading } = useQuery({
        queryKey: ['artistUser', artistEmail],
        queryFn: async () => {
            if (!artistEmail) return null;
            try {
                const users = await base44.asServiceRole.entities.User.filter({ email: artistEmail });
                return users[0] || null;
            } catch (err) {
                console.error('Failed to load artist user:', err);
                return null;
            }
        },
        enabled: !!artistEmail
    });

    const { data: tracks = [], isLoading: tracksLoading } = useQuery({
        queryKey: ['artistTracks', artistEmail],
        queryFn: async () => {
            if (!artistEmail) return [];
            try {
                return await base44.entities.Soundtrack.filter({ created_by: artistEmail }, '-created_date', 100);
            } catch (err) {
                console.error('Failed to load tracks:', err);
                return [];
            }
        },
        enabled: !!artistEmail
    });

    const { data: plays = [] } = useQuery({
        queryKey: ['artistPlays', tracks],
        queryFn: async () => {
            if (!tracks.length) return [];
            const trackIds = tracks.map(t => t.id);
            const allPlays = await Promise.all(
                trackIds.map(id => base44.entities.FrequencyPlay.filter({ track_id: id }, '-created_date', 1000).catch(() => []))
            );
            return allPlays.flat();
        },
        enabled: tracks.length > 0
    });

    if (userLoading || tracksLoading) {
        return <QuantumLoader />;
    }

    if (!artistEmail) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
                <p className="text-xl text-gray-400">No artist specified</p>
            </div>
        );
    }

    if (!artistUser) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
                <div className="text-center">
                    <Music className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-400">Artist not found</p>
                    <p className="text-sm text-gray-500 mt-2">{artistEmail}</p>
                </div>
            </div>
        );
    }

    const totalPlays = tracks.reduce((sum, t) => sum + (t.play_count || 0), 0);
    const estimatedFundSupport = totalPlays * 0.05;
    const directLove = tracks.reduce((sum, t) => sum + (t.total_earned_p51 || 0), 0);
    const totalEarnings = estimatedFundSupport + directLove;
    const uniqueLocations = new Set(plays.map(p => p.listener_location).filter(Boolean)).size;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-pink-500 mx-auto flex items-center justify-center text-6xl">
                        {artistUser.profile_image_url ? (
                            <img src={artistUser.profile_image_url} alt={artistUser.full_name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <Music className="w-16 h-16 text-white" />
                        )}
                    </div>
                    
                    <div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
                            {artistUser.full_name}
                        </h1>
                        <p className="text-gray-400 text-lg mt-2">{artistUser.email}</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30">
                            <CardContent className="p-6 text-center">
                                <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                <p className="text-4xl font-black text-white">{totalPlays.toLocaleString()}</p>
                                <p className="text-sm text-gray-300 mt-2">Transmissions</p>
                                <p className="text-xs text-gray-400 mt-1">Across {uniqueLocations} locations</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
                            <CardContent className="p-6 text-center">
                                <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                <p className="text-4xl font-black text-white">{estimatedFundSupport.toLocaleString()}</p>
                                <p className="text-sm text-gray-300 mt-2 font-mono">P51 from Fund</p>
                                <p className="text-xs text-gray-400 mt-1">The family supports you</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border-pink-500/30">
                            <CardContent className="p-6 text-center">
                                <DollarSign className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                                <p className="text-4xl font-black text-white">{directLove.toLocaleString()}</p>
                                <p className="text-sm text-gray-300 mt-2 font-mono">P51 from Listeners</p>
                                <p className="text-xs text-gray-400 mt-1">Direct love transmissions</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-8 text-center"
                >
                    <p className="text-gray-300 text-lg mb-2">TOTAL EARNED</p>
                    <p className="text-6xl font-black bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
                        {totalEarnings.toLocaleString()}
                    </p>
                    <p className="text-2xl font-mono text-gray-300 mt-2">P51</p>
                    <p className="text-sm text-gray-400 mt-4">
                        = {estimatedFundSupport.toLocaleString()} (fund) + {directLove.toLocaleString()} (listeners)
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Frequencies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tracks.map((track) => (
                            <Card key={track.id} className="bg-gray-900/90 border-gray-800 hover:border-amber-500/50 transition-all">
                                <CardContent className="p-0">
                                    <img
                                        src={track.cover_art_url || 'https://source.unsplash.com/400x400/?music,abstract,warm'}
                                        alt={track.title}
                                        className="w-full h-48 object-cover rounded-t-xl"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-bold text-white text-lg">{track.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{track.frequency_type || 'Creation'}</p>
                                        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                                            <span>{(track.play_count || 0).toLocaleString()} transmissions</span>
                                            <span>{(track.total_earned_p51 || 0).toLocaleString()} P51</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}