import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Radio, Plus, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TechStatusBar from '@/components/scott/TechStatusBar';

/**
 * CB51 HOME PAGE - CLEAN URL FOR WHITE LABEL
 * Artist management hub
 */

export default function CB51() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        // Set page title and meta tags for CB51 branding
        document.title = 'CB51 • Your AI Co-Manager';
        
        // Update meta tags for sharing/bookmarking
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        metaTheme.content = '#06b6d4';
        
        let metaAppName = document.querySelector('meta[name="apple-mobile-web-app-title"]');
        if (!metaAppName) {
            metaAppName = document.createElement('meta');
            metaAppName.name = 'apple-mobile-web-app-title';
            document.head.appendChild(metaAppName);
        }
        metaAppName.content = 'CB51';
        
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

    const { data: allArtists = [], isLoading } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({}),
        enabled: !!user
    });

    const artists = allArtists.filter(a => !a.archived);
    const archivedArtists = allArtists.filter(a => a.archived);

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

    const archiveArtistMutation = useMutation({
        mutationFn: ({ artistId, archived }) => 
            base44.entities.ScottArtist.update(artistId, { archived: archived }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottArtists'] });
        }
    });

    const handleArchiveArtist = (artist) => {
        if (confirm(`Archive ${artist.name}? You can restore them later.`)) {
            archiveArtistMutation.mutate({ artistId: artist.id, archived: true });
        }
    };

    const handleRestoreArtist = (artist) => {
        archiveArtistMutation.mutate({ artistId: artist.id, archived: false });
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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* HEADER */}
            <div className="mb-8 text-center pt-4">
                <h1 className="text-4xl font-black text-cyan-400 mb-2 font-mono tracking-tight">CB51 OPERATIONS</h1>
                <p className="text-gray-500 text-sm font-mono">Your AI Co-Manager</p>

                {user && totalTimeSaved > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
                    >
                        <div className="bg-black border-4 border-green-500 rounded-xl p-6 transition-all" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}>
                            <p className="text-green-400 font-black text-4xl text-center font-mono mb-2">
                                {hoursPerWeek}h
                            </p>
                            <p className="text-gray-400 text-sm text-center font-mono">
                                Time saved
                            </p>
                        </div>

                        <div className="bg-black border-4 border-cyan-500 rounded-xl p-6 transition-all" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
                            <p className="text-cyan-400 font-black text-4xl text-center font-mono mb-2">
                                {totalOffers}
                            </p>
                            <p className="text-gray-400 text-sm text-center font-mono">
                                Offers handled
                            </p>
                        </div>

                        <div className="bg-black border-4 border-pink-500 rounded-xl p-6 transition-all" style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}>
                            <p className="text-pink-400 font-black text-4xl text-center font-mono mb-2">
                                {confirmedGigs}
                            </p>
                            <p className="text-gray-400 text-sm text-center font-mono">
                                Confirmed gigs
                            </p>
                        </div>
                    </motion.div>
                )}
                </div>

            {/* ACTIVE ARTISTS */}
            <div className="mb-10">
                <h2 className="text-white font-black text-2xl mb-6 text-center font-mono">Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {artists.length === 0 ? (
                    <div className="md:col-span-3 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-16 text-center">
                        <p className="text-gray-500 text-lg font-mono mb-6">No artists yet</p>
                        {user ? (
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-10 py-4 rounded-xl text-lg transition-all">
                                    ADD FIRST ARTIST
                                </button>
                            </Link>
                        ) : (
                            <button 
                                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-10 py-4 rounded-xl text-lg transition-all"
                            >
                                SIGN IN
                            </button>
                        )}
                    </div>
                ) : (
                    artists.map((artist, index) => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)} className="block">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-4 border-cyan-500 rounded-xl p-4 md:p-6 transition-all h-40 md:h-44 flex flex-col items-center justify-center"
                                style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-black font-black text-2xl md:text-3xl flex items-center justify-center mb-3 md:mb-4">
                                    {artist.name.charAt(0)}
                                </div>
                                <p className="text-white font-black text-sm md:text-lg font-mono text-center">
                                    {artist.name}
                                </p>
                                <p className="text-gray-500 text-[10px] md:text-xs font-mono mt-1 md:mt-2">
                                    {artist.genre || 'Artist'}
                                </p>
                            </motion.div>
                        </Link>
                    ))
                )}

                {/* ADD ARTIST BUTTON */}
                {user && artists.length > 0 && (
                    <Link to={createPageUrl('ScottAddArtist')}>
                            <motion.div 
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-4 border-dashed border-green-500 hover:border-green-400 rounded-xl p-4 md:p-6 transition-all h-40 md:h-44 flex flex-col items-center justify-center"
                                style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' }}
                            >
                                <Plus className="w-10 h-10 md:w-14 md:h-14 text-green-400 mb-2 md:mb-3" />
                                <p className="text-green-400 font-mono text-xs md:text-sm font-bold">ADD</p>
                            </motion.div>
                        </Link>
                )}
                </div>
            </div>

            {/* ARCHIVED ARTISTS - RESTORE */}
            {archivedArtists.length > 0 && (
                <div className="mb-10">
                <h2 className="text-gray-600 font-black text-xl mb-6 text-center font-mono">Archived</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                        {archivedArtists.map((artist, index) => (
                            <motion.div 
                                key={artist.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleRestoreArtist(artist)}
                                className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/60 rounded-xl p-4 md:p-6 transition-all h-40 md:h-44 flex flex-col items-center justify-center cursor-pointer"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-800 text-gray-500 font-black text-2xl md:text-3xl flex items-center justify-center mb-3 md:mb-4">
                                    {artist.name.charAt(0)}
                                </div>
                                <p className="text-gray-500 font-black text-sm md:text-lg font-mono text-center">
                                    {artist.name}
                                </p>
                                <p className="text-gray-700 text-[10px] md:text-xs font-mono mt-1 md:mt-2">
                                    Tap to restore
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUICK LINKS - ADMIN */}
            {user?.role === 'admin' && (
                <div className="max-w-5xl mx-auto space-y-4 mt-10">
                    <Link to={createPageUrl('ScottAbout')}>
                        <button className="w-full bg-black border-4 border-cyan-500 text-cyan-400 font-black px-6 py-4 rounded-xl text-sm font-mono transition-all" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
                            ABOUT CB51 →
                        </button>
                    </Link>
                </div>
            )}

            {/* FOOTER */}
            <div className="mt-16 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 Operations Centre</p>
                <p className="text-gray-800 text-[10px] font-mono mt-1">♾️📻♾️</p>
            </div>
            </div>
            );
            }