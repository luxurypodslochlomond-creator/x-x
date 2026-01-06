import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Radio, Plus, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * ADMIN HOME PAGE - SCOTT'S FLOOR DIAGRAM
 * Simple list: ARTIST 1, ARTIST 2, ARTIST 3, etc
 * Each link goes to artist home page
 */

export default function ScottManager() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        base44.auth.me().then(async (currentUser) => {
            setUser(currentUser);
            
            // If user is an artist (not admin), redirect them to their artist home
            if (currentUser.role !== 'admin') {
                const artists = await base44.entities.ScottArtist.filter({ email: currentUser.email });
                if (artists.length > 0) {
                    navigate(createPageUrl(`ScottArtistHome?id=${artists[0].id}`));
                    return;
                }
            }
            // If admin or no artist found, stay on this page
            setLoading(false);
        }).catch(() => {
            // Allow public access - no redirect
            setUser(null);
            setLoading(false);
        });
    }, [navigate]);

    const { data: artists = [], isLoading } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({}),
        enabled: !!user
    });

    const deleteArtistMutation = useMutation({
        mutationFn: (artistId) => base44.entities.ScottArtist.delete(artistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottArtists'] });
        }
    });

    const handleDeleteArtist = (artist) => {
        if (confirm(`Delete ${artist.name}? This cannot be undone.`)) {
            deleteArtistMutation.mutate(artist.id);
        }
    };

    if (loading || isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-mono">Loading admin home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Radio className="w-12 h-12 text-cyan-400" />
                    <h1 className="text-4xl font-black text-cyan-400 font-mono">ADMIN HOME</h1>
                </div>
                <p className="text-gray-500 text-sm font-mono">Manager Dashboard</p>
            </div>

            {/* ARTIST GRID - EXACTLY LIKE SKETCH */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {artists.length === 0 ? (
                    <div className="col-span-2 bg-gray-900 border-4 border-gray-700 rounded-xl p-12 text-center">
                        <p className="text-gray-500 text-lg font-mono mb-4">No artists yet</p>
                        {user && (
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-4 rounded-xl text-lg">
                                    ADD FIRST ARTIST
                                </button>
                            </Link>
                        )}
                    </div>
                ) : (
                    artists.map((artist, index) => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 hover:border-cyan-300 rounded-xl p-8 transition-all h-40 flex items-center justify-center relative group"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-cyan-500 text-black font-black text-3xl flex items-center justify-center mb-3 mx-auto">
                                        A{index + 1}
                                    </div>
                                    <p className="text-white font-black text-xl font-mono">
                                        {artist.name}
                                    </p>
                                    <p className="text-gray-400 text-sm font-mono mt-1">
                                        {artist.genre || 'Artist'}
                                    </p>
                                </div>

                                {/* Delete button on hover */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteArtist(artist);
                                    }}
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-900/90 hover:bg-red-800 text-white p-2 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        </Link>
                    ))
                )}

                {/* ADD ARTIST BUTTON */}
                {user && artists.length > 0 && (
                    <Link to={createPageUrl('ScottAddArtist')}>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="border-4 border-dashed border-gray-700 hover:border-cyan-500 rounded-xl p-8 transition-all h-40 flex items-center justify-center"
                        >
                            <div className="text-center">
                                <Plus className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                                <p className="text-gray-500 font-mono text-sm">ADD ARTIST</p>
                            </div>
                        </motion.div>
                    </Link>
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Simple as requested</p>
                <p className="text-gray-700 text-[10px] font-mono mt-1">From Scott's floor diagrams ♾️📻</p>
            </div>
        </div>
    );
}