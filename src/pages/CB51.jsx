import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Plus, Trash2, AlertCircle, Calendar, MessageSquare, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TechStatusBar from '@/components/scott/TechStatusBar';
import PushNotificationManager from '@/components/scott/PushNotificationManager';

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
        document.title = 'CB51 • Artist Management';
        
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
            
            // Check PIN for non-admins
            if (currentUser.role !== 'admin') {
                const pinEntered = sessionStorage.getItem('cb51_pin_1888');
                if (pinEntered !== 'true') {
                    navigate(createPageUrl('CB51Login'));
                    return;
                }

                // Check if user is a band member (stored in ScottTeamMember)
                const teamMembers = await base44.entities.ScottTeamMember.filter({ email: currentUser.email });
                if (teamMembers.length > 0) {
                    // Band member found - redirect to their artist's home
                    const artistId = teamMembers[0].artist_id;
                    setUser(currentUser);
                    setLoading(false);
                    setTimeout(() => navigate(createPageUrl(`ScottArtistHome?id=${artistId}`)), 0);
                    return;
                }

                // Check if user is an artist (has their own ScottArtist record)
                const artists = await base44.entities.ScottArtist.filter({ email: currentUser.email });
                if (artists.length > 0) {
                    setUser(currentUser);
                    setLoading(false);
                    setTimeout(() => navigate(createPageUrl(`ScottArtistHome?id=${artists[0].id}`)), 0);
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

    // Load artists IMMEDIATELY (most important)
    const { data: allArtists = [], isLoading: artistsLoading } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({}),
        enabled: !!user,
        staleTime: 30000 // Cache for 30s
    });

    // Memoize filtered artists to avoid recalculating
    const artists = useMemo(() => allArtists.filter(a => !a.archived), [allArtists]);
    const archivedArtists = useMemo(() => allArtists.filter(a => a.archived), [allArtists]);

    // Load stats data lazily - only when artists are loaded
    const { data: allOffers = [] } = useQuery({
        queryKey: ['scottAllGigOffers'],
        queryFn: () => base44.entities.ScottGigOffer.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 60000
    });

    const { data: invoices = [] } = useQuery({
        queryKey: ['scottInvoices'],
        queryFn: () => base44.entities.ScottInvoice.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 120000
    });

    const { data: messages = [] } = useQuery({
        queryKey: ['scottMessages'],
        queryFn: () => base44.entities.ScottMessage.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 120000
    });

    // Memoize stats calculations
    const stats = useMemo(() => ({
        pendingOffers: allOffers.filter(o => o.status === 'pending_manager_review').length,
        awaitingBand: allOffers.filter(o => o.status === 'sent_to_band').length,
        overdueInvoices: invoices.filter(i => i.status === 'overdue').length,
        urgentMessages: messages.filter(m => m.status === 'pending' && m.urgency === 'urgent').length,
        hoursPerWeek: allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').length * 2,
        upcomingGigs: allOffers.filter(o => o.status === 'confirmed' && o.date && new Date(o.date) > new Date()).length,
        pipelineValue: allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').reduce((sum, o) => sum + (o.fee || 0), 0)
    }), [allOffers, invoices, messages]);

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

    if (loading || artistsLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-cyan-400 font-black font-mono text-xl">CB51</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />

            {/* BRAIN BAR - ALWAYS VISIBLE */}
            <div className="mb-6 pt-4">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Radio className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-3xl font-black text-cyan-400 font-mono">CB51</h1>
                        <PushNotificationManager />
                    </div>
                    <p className="text-gray-600 text-xs font-mono">Artist management system</p>
                    <Link to={createPageUrl('CB51About')}>
                        <button className="mt-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 hover:border-cyan-500 text-cyan-400 text-xs font-bold px-4 py-2 rounded-lg transition-all">
                            What is CB51? →
                        </button>
                    </Link>
                </div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-black border border-cyan-500/20 rounded-xl p-3">
                    <Link to={createPageUrl('ScottGigOffers')} className="flex-1">
                        <div className="text-center hover:bg-green-500/10 rounded-lg p-2 transition-all">
                            <p className="text-green-400/60 text-[9px] font-mono tracking-wider">PIPELINE</p>
                            <p className="text-white text-base font-black font-mono mt-1">
                                £{stats.pipelineValue.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="flex-1">
                        <div className="text-center hover:bg-cyan-500/10 rounded-lg p-2 transition-all">
                            <p className="text-cyan-400/60 text-[9px] font-mono tracking-wider">SAVED</p>
                            <p className="text-white text-base font-black font-mono mt-1">{stats.hoursPerWeek}h</p>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="flex-1">
                        <div className="text-center hover:bg-amber-500/10 rounded-lg p-2 transition-all">
                            <p className="text-amber-400/60 text-[9px] font-mono tracking-wider">TODAY</p>
                            <p className="text-white text-base font-black font-mono mt-1">
                                {stats.pendingOffers + stats.awaitingBand + stats.overdueInvoices + stats.urgentMessages}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHAT NEEDS ME - CLEAN */}
            {(stats.pendingOffers > 0 || stats.awaitingBand > 0 || stats.overdueInvoices > 0 || stats.urgentMessages > 0) && (
                <div className="mb-8 bg-black border-2 border-amber-500 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <h2 className="text-amber-400 font-black font-mono">NEEDS ATTENTION</h2>
                    </div>
                    <div className="space-y-2">
                        {stats.pendingOffers > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border border-amber-500/50 rounded-lg p-3 hover:border-amber-500 transition-all">
                                    <p className="text-amber-400 font-bold font-mono text-sm">{stats.pendingOffers} gig offers →</p>
                                </div>
                            </Link>
                        )}
                        {stats.awaitingBand > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border border-cyan-500/50 rounded-lg p-3 hover:border-cyan-500 transition-all">
                                    <p className="text-cyan-400 font-bold font-mono text-sm">{stats.awaitingBand} awaiting band →</p>
                                </div>
                            </Link>
                        )}
                        {stats.overdueInvoices > 0 && (
                            <Link to={createPageUrl('ScottInvoices')}>
                                <div className="bg-black border border-red-500/50 rounded-lg p-3 hover:border-red-500 transition-all">
                                    <p className="text-red-400 font-bold font-mono text-sm">{stats.overdueInvoices} overdue invoices →</p>
                                </div>
                            </Link>
                        )}
                        {stats.urgentMessages > 0 && (
                            <div className="bg-black border border-red-500/50 rounded-lg p-3">
                                <p className="text-red-400 font-bold font-mono text-sm">{stats.urgentMessages} urgent messages</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ARTISTS - COOLASFUCK GRID */}
            <div>
                {artists.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-sm font-mono mb-6">No artists yet</p>
                        <Link to={createPageUrl('ScottAddArtist')}>
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-4 rounded-xl font-mono">
                                ADD FIRST ARTIST
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            {artists.map((artist) => (
                                <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                                    <motion.div
                                        whileHover={{ scale: 0.97, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative bg-black border-3 border-cyan-500 rounded-2xl p-4 overflow-hidden group cursor-pointer"
                                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
                                    >
                                        {/* Cyber glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Animated border pulse */}
                                        <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>

                                        <div className="relative flex flex-col items-center text-center gap-3">
                                            {artist.profile_pic_url ? (
                                                <img 
                                                    src={artist.profile_pic_url} 
                                                    alt={artist.name}
                                                    className="w-20 h-20 rounded-xl object-cover border-2 border-cyan-500"
                                                    style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                                                />
                                            ) : (
                                                <div 
                                                    className="w-20 h-20 rounded-xl bg-cyan-500 text-black font-black text-3xl flex items-center justify-center border-2 border-cyan-400"
                                                    style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                                                >
                                                    {artist.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="w-full">
                                                <p className="text-white font-black text-base font-mono leading-tight">{artist.name}</p>
                                                {artist.genre && (
                                                    <p className="text-cyan-400 text-xs font-mono mt-1 uppercase tracking-wider">{artist.genre}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Delete button - hidden by default, shows on hover */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleArchiveArtist(artist);
                                            }}
                                            className="absolute top-2 right-2 bg-black/90 hover:bg-red-500/30 text-gray-600 hover:text-red-400 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                </Link>
                            ))}

                            {/* Add Artist Card */}
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <motion.div
                                    whileHover={{ scale: 0.97, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-black border-3 border-dashed border-gray-800 hover:border-cyan-500 rounded-2xl p-4 h-full flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
                                    style={{ minHeight: '140px' }}
                                >
                                    <Plus className="w-10 h-10 text-cyan-400" />
                                    <span className="text-cyan-400 font-black font-mono text-sm">ADD</span>
                                </motion.div>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* QUICK ACCESS */}
            <div className="mt-8 grid grid-cols-2 gap-3">
                <Link to={createPageUrl('ScottGigOffers')}>
                    <motion.div
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-500/30 hover:border-amber-500 rounded-2xl p-5 text-center transition-all overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Zap className="w-9 h-9 text-amber-400 mx-auto mb-2 relative z-10" />
                        <p className="text-amber-400 font-black font-mono text-sm relative z-10">GIG OFFERS</p>
                        {allOffers.length > 0 && <p className="text-white text-2xl font-black font-mono mt-1 relative z-10">{stats.pendingOffers + stats.awaitingBand}</p>}
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottCalendarView')}>
                    <motion.div
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/30 hover:border-green-500 rounded-2xl p-5 text-center transition-all overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Calendar className="w-9 h-9 text-green-400 mx-auto mb-2 relative z-10" />
                        <p className="text-green-400 font-black font-mono text-sm relative z-10">CALENDAR</p>
                        {stats.upcomingGigs > 0 && <p className="text-white text-2xl font-black font-mono mt-1 relative z-10">{stats.upcomingGigs}</p>}
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottMessageInbox')}>
                    <motion.div
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl p-5 text-center transition-all overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <MessageSquare className="w-9 h-9 text-purple-400 mx-auto mb-2 relative z-10" />
                        <p className="text-purple-400 font-black font-mono text-sm relative z-10">EMAIL AI</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottTeamAccess')}>
                    <motion.div
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-500/30 hover:border-cyan-500 rounded-2xl p-5 text-center transition-all overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Users className="w-9 h-9 text-cyan-400 mx-auto mb-2 relative z-10" />
                        <p className="text-cyan-400 font-black font-mono text-sm relative z-10">TEAMS</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ExtensionManager')}>
                    <motion.div
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-2 border-pink-500/30 hover:border-pink-500 rounded-2xl p-5 text-center transition-all overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Zap className="w-9 h-9 text-pink-400 mx-auto mb-2 relative z-10" />
                        <p className="text-pink-400 font-black font-mono text-sm relative z-10">EXTENSION</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottSettings')}>
                    <motion.div
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/30 hover:border-blue-500 rounded-2xl p-5 text-center transition-all overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <svg className="w-9 h-9 text-blue-400 mx-auto mb-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-blue-400 font-black font-mono text-sm relative z-10">SETTINGS</p>
                    </motion.div>
                </Link>
            </div>

            {/* ARCHIVED ARTISTS */}
            {archivedArtists.length > 0 && (
                <div className="mt-8">
                    <details className="text-gray-700">
                        <summary className="cursor-pointer text-xs font-mono mb-3">Archived ({archivedArtists.length})</summary>
                        <div className="space-y-2">
                            {archivedArtists.map((artist) => (
                                <div key={artist.id} className="flex items-center justify-between bg-black border border-gray-900 rounded-lg p-3">
                                    <p className="text-gray-700 font-mono text-sm">{artist.name}</p>
                                    <button
                                        onClick={() => handleRestoreArtist(artist)}
                                        className="text-cyan-400 hover:text-cyan-300 text-xs font-mono"
                                    >
                                        RESTORE
                                    </button>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            )}

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-800 text-xs font-mono">CB51 • Simple</p>
            </div>
            </div>
            );
            }