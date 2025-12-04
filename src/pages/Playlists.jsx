import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Play, Music, Radio, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAudio } from '@/components/shared/AudioProvider';
import QuantumLoader from '@/components/shared/QuantumLoader';

const getVibeColor = (vibe_type) => {
    const colors = {
        'Joy': '#FFD700',
        'House': '#FF1B8D',
        'Soul': '#9D4EDD',
        'Rock': '#FF6B35',
        'Electronic': '#00D9FF',
        'Acoustic': '#F59E0B',
        'Healing': '#00FF88',
        'Creation': '#FFD700',
        'Revolution': '#FF6B35',
        'Mixed': '#00D9FF'
    };
    return colors[vibe_type] || '#00D9FF';
};

export default function PlaylistsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { playTrack } = useAudio();

    const { data: playlists = [], isLoading } = useQuery({
        queryKey: ['playlists'],
        queryFn: async () => {
            return await base44.entities.Playlist.list('-created_date', 100);
        },
        initialData: []
    });

    const { data: allTracks = [] } = useQuery({
        queryKey: ['allSoundtracks'],
        queryFn: () => base44.entities.Soundtrack.list('-sequence', 500),
        initialData: []
    });

    const handlePlayPlaylist = async (playlist) => {
        // Get first track from playlist
        const trackIds = playlist.track_ids || [];
        if (trackIds.length === 0) return;

        const firstTrack = allTracks.find(t => t.id === trackIds[0]);
        if (firstTrack) {
            await playTrack(firstTrack);
            navigate(createPageUrl('QuantumJukebox'));
        }
    };

    const filteredPlaylists = playlists.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <QuantumLoader />;

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-12 pb-40">
            {/* QUANTUM GRID */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                
                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Radio className="w-16 h-16 md:w-20 md:h-20 text-pink-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.6))' }} />
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            AI51 PLAYLISTS
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        Curated frequencies. Not "healing" - VIBING. Like Freddie. Like Marshall. Pure joy.
                    </p>
                </motion.div>

                {/* SEARCH */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))' }} />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search playlists..."
                            className="pl-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20 border-2 border-pink-500/30 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-pink-400 transition-all"
                            style={{
                                boxShadow: '0 0 20px rgba(244, 114, 182, 0.1)'
                            }}
                        />
                    </div>
                </div>

                {/* PLAYLISTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlaylists.map((playlist, index) => {
                        const vibeColor = getVibeColor(playlist.vibe_type);
                        const trackCount = playlist.track_ids?.length || 0;

                        return (
                            <motion.div
                                key={playlist.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card 
                                    className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all rounded-2xl overflow-hidden cursor-pointer group border"
                                    style={{
                                        borderColor: `${vibeColor}40`
                                    }}
                                    onClick={() => handlePlayPlaylist(playlist)}
                                >
                                    <CardContent className="p-0">
                                        <div className="relative aspect-square">
                                            {playlist.cover_art_url ? (
                                                <img
                                                    src={playlist.cover_art_url}
                                                    alt={playlist.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div 
                                                    className="w-full h-full flex items-center justify-center"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${vibeColor}40, ${vibeColor}80)`
                                                    }}
                                                >
                                                    <Music className="w-16 h-16" style={{ color: vibeColor }} />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                            
                                            {/* PLAY BUTTON ON HOVER */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Play className="w-16 h-16 text-white" />
                                            </div>

                                            {/* CURATOR BADGE */}
                                            <div 
                                                className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold border"
                                                style={{
                                                    background: vibeColor,
                                                    color: '#000',
                                                    borderColor: vibeColor,
                                                    boxShadow: `0 0 10px ${vibeColor}`
                                                }}
                                            >
                                                {playlist.curator === 'AI51' ? '🤖 AI51' : playlist.curator}
                                            </div>

                                            {/* BOTTOM INFO */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                                <h3 className="font-black text-white text-xl mb-1">
                                                    {playlist.title}
                                                </h3>
                                                <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                                                    {playlist.description}
                                                </p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: vibeColor }}
                                                        />
                                                        <span 
                                                            className="text-xs font-bold tracking-wide uppercase"
                                                            style={{ color: vibeColor }}
                                                        >
                                                            {playlist.vibe_type}
                                                        </span>
                                                    </div>
                                                    
                                                    <span className="text-xs text-gray-400">
                                                        {trackCount} tracks
                                                    </span>
                                                </div>

                                                {/* WHY THESE TRACKS */}
                                                {playlist.why_these_tracks && (
                                                    <div className="mt-2 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <p className="text-xs text-gray-400 italic line-clamp-2">
                                                            {playlist.why_these_tracks}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* EMPTY STATE */}
                {filteredPlaylists.length === 0 && (
                    <div className="text-center py-16">
                        <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No playlists yet</h3>
                        <p className="text-gray-400">AI51 is curating the first vibes...</p>
                    </div>
                )}
            </div>
        </div>
    );
}