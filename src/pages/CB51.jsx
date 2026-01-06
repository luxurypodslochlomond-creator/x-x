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
            // Not logged in - redirect to CB51 login page
            navigate(createPageUrl('CB51Login'));
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
            <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f1419] to-[#0a0f1a] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-gray-800 border-t-cyan-500 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600 font-mono text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f1419] to-[#0a0f1a] text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* HEADER */}
            <div className="mb-8 pt-4">
                <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-6 h-6 text-cyan-400" />
                    <h1 className="text-2xl font-black text-cyan-400 font-mono">CB51</h1>
                </div>
                <p className="text-gray-500 text-sm font-mono">Your AI Co-Manager</p>

                {user && totalTimeSaved > 0 && (
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
                            <p className="text-2xl font-bold text-white text-center font-mono mb-1">
                                {hoursPerWeek}h
                            </p>
                            <p className="text-xs text-gray-600 text-center font-mono uppercase tracking-wider">
                                Saved
                            </p>
                        </div>

                        <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
                            <p className="text-2xl font-bold text-white text-center font-mono mb-1">
                                {totalOffers}
                            </p>
                            <p className="text-xs text-gray-600 text-center font-mono uppercase tracking-wider">
                                Offers
                            </p>
                        </div>

                        <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
                            <p className="text-2xl font-bold text-white text-center font-mono mb-1">
                                {confirmedGigs}
                            </p>
                            <p className="text-xs text-gray-600 text-center font-mono uppercase tracking-wider">
                                Gigs
                            </p>
                        </div>
                    </div>
                )}
                </div>

            {/* ACTIVE ARTISTS */}
            <div className="mb-10">
                <h2 className="text-cyan-400 font-black text-lg mb-4 font-mono uppercase tracking-wider">Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {artists.length === 0 ? (
                    <div className="col-span-2 md:col-span-3 bg-gray-900/60 border border-cyan-500/30 rounded-xl p-12 text-center">
                        <p className="text-gray-500 text-sm font-mono mb-6">No artists yet</p>
                        {user ? (
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-4 rounded-xl text-base font-mono transition-all uppercase tracking-wider">
                                    Add First Artist
                                </button>
                            </Link>
                        ) : (
                            <button 
                                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-4 rounded-xl text-base font-mono transition-all uppercase tracking-wider"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                ) : (
                    artists.map((artist, index) => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)} className="block">
                            <div className="bg-gray-900/60 hover:bg-gray-900/80 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl p-5 transition-all h-32 flex items-center gap-4">
                                {artist.profile_pic_url ? (
                                    <img 
                                        src={artist.profile_pic_url} 
                                        alt={artist.name}
                                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black text-xl flex items-center justify-center flex-shrink-0">
                                        {artist.name.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-bold text-base font-mono truncate">
                                        {artist.name}
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono mt-0.5">
                                        {artist.genre || 'Artist'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}

                {/* ADD ARTIST BUTTON */}
                {user && artists.length > 0 && (
                    <Link to={createPageUrl('ScottAddArtist')}>
                        <div className="bg-gray-900/60 hover:bg-gray-900/80 border border-dashed border-cyan-500/30 hover:border-cyan-500/60 rounded-xl p-5 transition-all h-32 flex items-center justify-center">
                            <Plus className="w-8 h-8 text-cyan-400" />
                        </div>
                    </Link>
                )}
                </div>
            </div>

            {/* ARCHIVED ARTISTS - RESTORE */}
            {archivedArtists.length > 0 && (
                <div className="mb-10">
                <h2 className="text-gray-600 font-black text-lg mb-4 font-mono uppercase tracking-wider">Archived</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {archivedArtists.map((artist, index) => (
                            <div 
                                key={artist.id}
                                onClick={() => handleRestoreArtist(artist)}
                                className="bg-gray-900/20 hover:bg-gray-900/40 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition-all h-32 flex items-center gap-4 cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gray-900 text-gray-700 font-black text-xl flex items-center justify-center flex-shrink-0">
                                    {artist.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-600 font-bold text-base font-mono truncate">
                                        {artist.name}
                                    </p>
                                    <p className="text-gray-700 text-xs font-mono mt-0.5">
                                        Tap to restore
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUICK LINKS - ADMIN */}
            {user?.role === 'admin' && (
                <div className="space-y-3 mt-10">
                    <Link to={createPageUrl('ScottAbout')}>
                        <button className="w-full bg-gray-900/60 hover:bg-gray-900/80 border border-cyan-500/30 hover:border-cyan-500/60 text-white font-mono px-5 py-4 rounded-xl text-sm transition-all">
                            About CB51 →
                        </button>
                    </Link>
                </div>
            )}

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-700 text-xs font-mono">CB51</p>
            </div>
            </div>
            );
            }