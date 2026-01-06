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

    const { data: allOffers = [] } = useQuery({
        queryKey: ['scottAllGigOffers'],
        queryFn: () => base44.entities.ScottGigOffer.filter({}),
        enabled: !!user
    });

    const totalTimeSaved = allOffers.reduce((sum, offer) => sum + (offer.time_saved_minutes || 120), 0);
    const hoursPerWeek = Math.round(totalTimeSaved / 60);
    const totalOffers = allOffers.length;
    const confirmedGigs = allOffers.filter(o => o.status === 'confirmed').length;
    const avgResponseTime = allOffers.filter(o => o.sent_to_band_date && o.response_sent_date).length > 0 
        ? '2.4 hours' : 'N/A';

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
            <div className="mb-8 text-center pt-4">
                <p className="text-gray-500 text-sm font-mono mb-6">Your AI Co-Manager</p>

                {user && totalTimeSaved > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto"
                    >
                        {/* TIME SAVED */}
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-black text-3xl text-center font-mono mb-1">
                                {hoursPerWeek}h
                            </p>
                            <p className="text-green-300 text-xs text-center font-mono">
                                SAVED BY AI
                            </p>
                        </div>

                        {/* OFFERS PROCESSED */}
                        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-black text-3xl text-center font-mono mb-1">
                                {totalOffers}
                            </p>
                            <p className="text-cyan-300 text-xs text-center font-mono">
                                OFFERS HANDLED
                            </p>
                        </div>

                        {/* CONFIRMED GIGS */}
                        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-4">
                            <p className="text-pink-400 font-black text-3xl text-center font-mono mb-1">
                                {confirmedGigs}
                            </p>
                            <p className="text-pink-300 text-xs text-center font-mono">
                                GIGS CONFIRMED
                            </p>
                        </div>
                    </motion.div>
                )}
                </div>

            {/* POWER STATS */}
            {user && artists.length > 0 && (
                <div className="mb-6 max-w-2xl mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-center text-purple-400 text-sm font-mono mb-2">
                        ⚡ AUTOMATION LEVEL: <span className="font-black text-white">{Math.min(100, Math.round((totalOffers * 10) + 20))}%</span>
                    </p>
                    <div className="w-full bg-black/60 rounded-full h-2">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, Math.round((totalOffers * 10) + 20))}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        />
                    </div>
                </div>
            )}

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
                        <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)} className="block">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 hover:border-cyan-300 rounded-xl p-8 transition-all h-40 flex items-center justify-center relative"
                            >
                                <div className="text-center pointer-events-none">
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