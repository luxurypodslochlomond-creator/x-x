import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Radio, Plus, Loader2, Trash2, ChevronDown, ChevronRight, AlertCircle, Calendar, FileText, DollarSign, Music, Zap, TrendingUp, MessageSquare, Users } from 'lucide-react';
import ScottMessageCentre from '@/components/scott/ScottMessageCentre';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TechStatusBar from '@/components/scott/TechStatusBar';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import { format } from 'date-fns';

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
            
            // Check PIN for non-admins
            if (currentUser.role !== 'admin') {
                const pinEntered = sessionStorage.getItem('cb51_pin_1888');
                if (pinEntered !== 'true') {
                    navigate(createPageUrl('CB51Login'));
                    return;
                }

                // If user is an artist, redirect them to their artist home
                const artists = await base44.entities.ScottArtist.filter({ email: currentUser.email });
                if (artists.length > 0) {
                    setUser(currentUser);
                    setLoading(false);
                    // Auto-redirect to artist home after render
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

    const artists = allArtists.filter(a => !a.archived);
    const archivedArtists = allArtists.filter(a => a.archived);

    // Load everything else in background (don't block UI)
    const { data: allOffers = [] } = useQuery({
        queryKey: ['scottAllGigOffers'],
        queryFn: () => base44.entities.ScottGigOffer.filter({}),
        enabled: !!user && !artistsLoading,
        staleTime: 10000,
        refetchInterval: 5000 // Auto-refresh every 5s so Scott sees new offers instantly
    });

    const { data: invoices = [] } = useQuery({
        queryKey: ['scottInvoices'],
        queryFn: () => base44.entities.ScottInvoice.filter({}),
        enabled: !!user && !artistsLoading,
        staleTime: 60000
    });

    const { data: messages = [] } = useQuery({
        queryKey: ['scottMessages'],
        queryFn: () => base44.entities.ScottMessage.filter({}),
        enabled: !!user && !artistsLoading,
        staleTime: 30000
    });

    // Real-time subscription to extension auto-scans
    useEffect(() => {
        if (!user) return;
        
        const unsubscribeGigs = base44.entities.ScottGigOffer.subscribe((event) => {
            if (event.data?.auto_extracted) {
                queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
            }
        });

        const unsubscribeTasks = base44.entities.ScottTask.subscribe((event) => {
            if (event.data?.auto_extracted) {
                queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
            }
        });

        return () => {
            unsubscribeGigs();
            unsubscribeTasks();
        };
    }, [user, queryClient]);

    // Quick stats (only what we need)
    const pendingOffers = allOffers.filter(o => o.status === 'pending_manager_review').length;
    const awaitingBand = allOffers.filter(o => o.status === 'sent_to_band').length;
    const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
    const urgentMessages = messages.filter(m => m.status === 'pending' && m.urgency === 'urgent').length;

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

    const hoursPerWeek = allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').length * 2;
    const upcomingGigs = allOffers.filter(o => o.status === 'confirmed' && o.date && new Date(o.date) > new Date());

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
                    <p className="text-gray-600 text-xs font-mono">AI51 co-manager for your band ♾️</p>
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
                                £{allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').reduce((sum, o) => sum + (o.fee || 0), 0).toLocaleString()}
                            </p>
                        </div>
                    </Link>
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="flex-1">
                        <div className="text-center hover:bg-cyan-500/10 rounded-lg p-2 transition-all">
                            <p className="text-cyan-400/60 text-[9px] font-mono tracking-wider">SAVED</p>
                            <p className="text-white text-base font-black font-mono mt-1">{hoursPerWeek}h</p>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="flex-1">
                        <div className="text-center hover:bg-amber-500/10 rounded-lg p-2 transition-all">
                            <p className="text-amber-400/60 text-[9px] font-mono tracking-wider">TODAY</p>
                            <p className="text-white text-base font-black font-mono mt-1">
                                {pendingOffers + awaitingBand + overdueInvoices + urgentMessages}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHAT NEEDS ME - CLEAN */}
            {(pendingOffers > 0 || awaitingBand > 0 || overdueInvoices > 0 || urgentMessages > 0) && (
                <div className="mb-8 bg-black border-2 border-amber-500 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <h2 className="text-amber-400 font-black font-mono">NEEDS ATTENTION</h2>
                    </div>
                    <div className="space-y-2">
                        {pendingOffers > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border border-amber-500/50 rounded-lg p-3 hover:border-amber-500 transition-all">
                                    <p className="text-amber-400 font-bold font-mono text-sm">{pendingOffers} gig offers →</p>
                                </div>
                            </Link>
                        )}
                        {awaitingBand > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border border-cyan-500/50 rounded-lg p-3 hover:border-cyan-500 transition-all">
                                    <p className="text-cyan-400 font-bold font-mono text-sm">{awaitingBand} awaiting band →</p>
                                </div>
                            </Link>
                        )}
                        {overdueInvoices > 0 && (
                            <Link to={createPageUrl('ScottInvoices')}>
                                <div className="bg-black border border-red-500/50 rounded-lg p-3 hover:border-red-500 transition-all">
                                    <p className="text-red-400 font-bold font-mono text-sm">{overdueInvoices} overdue invoices →</p>
                                </div>
                            </Link>
                        )}
                        {urgentMessages > 0 && (
                            <div className="bg-black border border-red-500/50 rounded-lg p-3">
                                <p className="text-red-400 font-bold font-mono text-sm">{urgentMessages} urgent messages</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ARTISTS - SCOTT'S ACTUAL DESIGN */}
            <div className="space-y-3">
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
                        {artists.map((artist) => (
                            <div key={artist.id} className="relative">
                                <Link to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                                    <motion.div
                                        whileHover={{ scale: 0.98, y: -2 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-2xl p-5 hover:border-cyan-500 transition-all overflow-hidden group"
                                        style={{ boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1)' }}
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative flex items-center gap-4">
                                            {artist.profile_pic_url ? (
                                                <img 
                                                    src={artist.profile_pic_url} 
                                                    alt={artist.name}
                                                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-cyan-500/50"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-xl flex items-center justify-center">
                                                    {artist.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="text-white font-black text-lg font-mono">{artist.name}</p>
                                                {artist.genre && <p className="text-cyan-400/60 text-xs font-mono mt-0.5">{artist.genre}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleArchiveArtist(artist);
                                    }}
                                    className="absolute top-2 right-2 bg-black/80 hover:bg-red-500/20 text-gray-600 hover:text-red-400 p-2 rounded-lg transition-all z-10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <Link to={createPageUrl('ScottAddArtist')}>
                            <motion.div
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-gradient-to-br from-gray-900 to-black border-2 border-dashed border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex items-center justify-center gap-3 transition-all"
                            >
                                <Plus className="w-7 h-7 text-cyan-400" />
                                <span className="text-cyan-400 font-black font-mono">ADD ARTIST</span>
                            </motion.div>
                        </Link>
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
                        {allOffers.length > 0 && <p className="text-white text-2xl font-black font-mono mt-1 relative z-10">{allOffers.length}</p>}
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
                        {upcomingGigs.length > 0 && <p className="text-white text-2xl font-black font-mono mt-1 relative z-10">{upcomingGigs.length}</p>}
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