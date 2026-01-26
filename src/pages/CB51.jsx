import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Plus, Trash2, AlertCircle, Calendar, MessageSquare, Users, Zap, Mail, CheckCircle, Heart, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TechStatusBar from '@/components/scott/TechStatusBar';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import CB51NotificationInbox from '@/components/scott/CB51NotificationInbox';

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
        <div className="min-h-screen bg-black text-white p-3 pb-20">

            <TechStatusBar showP2PSync={true} />

            {/* COMPACT HEADER */}
            <div className="mb-3 pt-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Radio className="w-6 h-6 text-cyan-400" />
                        <h1 className="text-xl font-black text-cyan-400 font-mono">CB51</h1>
                    </div>
                </div>
                <div className="mb-2">
                    <PushNotificationManager />
                </div>

                {/* COMPACT STATS BAR */}
                <div className="flex items-center gap-1 bg-black border border-cyan-500/20 rounded-lg p-2">
                    <Link to={createPageUrl('ScottGigOffers')} className="flex-1">
                        <div className="text-center hover:bg-green-500/10 rounded p-1 transition-all">
                            <p className="text-green-400/60 text-[8px] font-mono">PIPELINE</p>
                            <p className="text-white text-xs font-black font-mono">£{stats.pipelineValue.toLocaleString()}</p>
                        </div>
                    </Link>
                    <div className="w-px h-6 bg-cyan-500/20"></div>
                    <div className="flex-1">
                        <div className="text-center hover:bg-cyan-500/10 rounded p-1 transition-all">
                            <p className="text-cyan-400/60 text-[8px] font-mono">SAVED</p>
                            <p className="text-white text-xs font-black font-mono">{stats.hoursPerWeek}h</p>
                        </div>
                    </div>
                    <div className="w-px h-6 bg-cyan-500/20"></div>
                    <div className="flex-1">
                        <div className="text-center hover:bg-amber-500/10 rounded p-1 transition-all">
                            <p className="text-amber-400/60 text-[8px] font-mono">TODAY</p>
                            <p className="text-white text-xs font-black font-mono">
                                {stats.pendingOffers + stats.awaitingBand + stats.overdueInvoices + stats.urgentMessages}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPACT ALERTS */}
            {(stats.pendingOffers > 0 || stats.awaitingBand > 0 || stats.overdueInvoices > 0 || stats.urgentMessages > 0) && (
                <div className="mb-3 bg-black border border-amber-500/50 rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        <h2 className="text-amber-400 font-black font-mono text-[10px]">NEEDS ATTENTION</h2>
                    </div>
                    <div className="space-y-1">
                        {stats.pendingOffers > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border border-amber-500/30 rounded p-1.5 hover:border-amber-500 transition-all">
                                    <p className="text-amber-400 font-bold font-mono text-[10px]">{stats.pendingOffers} gig offers →</p>
                                </div>
                            </Link>
                        )}
                        {stats.awaitingBand > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border border-cyan-500/30 rounded p-1.5 hover:border-cyan-500 transition-all">
                                    <p className="text-cyan-400 font-bold font-mono text-[10px]">{stats.awaitingBand} awaiting band →</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* COMPACT ARTISTS GRID */}
            <div>
                {artists.length === 0 ? (
                    <div className="text-center py-6">
                        <p className="text-gray-600 text-xs font-mono mb-3">No artists yet</p>
                        <Link to={createPageUrl('ScottAddArtist')}>
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-6 py-3 rounded-lg font-mono text-sm">
                                ADD FIRST ARTIST
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-2">
                            {artists.map((artist) => (
                                <motion.div
                                    key={artist.id}
                                    whileTap={{ scale: 0.96 }}
                                    className="relative bg-black border-2 border-cyan-500 rounded-lg overflow-hidden group"
                                    style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                                >
                                    <Link to={createPageUrl(`ScottArtistHome?id=${artist.id}`)} className="relative block p-2">
                                        <div className="flex flex-col items-center text-center gap-1">
                                            {artist.profile_pic_url ? (
                                                <img 
                                                    src={artist.profile_pic_url} 
                                                    alt={artist.name}
                                                    className="w-12 h-12 rounded object-cover border border-cyan-500"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded bg-cyan-500 text-black font-black text-lg flex items-center justify-center">
                                                    {artist.name.charAt(0)}
                                                </div>
                                            )}
                                            <p className="text-white font-black text-[10px] font-mono leading-tight">{artist.name}</p>
                                        </div>
                                    </Link>

                                    {/* Edit + Archive - Always visible */}
                                    <div className="flex border-t border-cyan-500/20">
                                        <Link 
                                            to={createPageUrl(`ScottAddArtist?edit=${artist.id}`)}
                                            className="flex-1 bg-black/90 text-cyan-400 text-[8px] font-bold font-mono py-1 text-center border-r border-cyan-500/20 hover:bg-cyan-500/10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            EDIT
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleArchiveArtist(artist);
                                            }}
                                            className="flex-1 bg-black/90 text-red-400 text-[8px] font-bold font-mono py-1 hover:bg-red-500/10"
                                        >
                                            ARCHIVE
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Add Artist Card */}
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <motion.div
                                    whileTap={{ scale: 0.96 }}
                                    className="bg-black border-2 border-dashed border-gray-800 hover:border-cyan-500 rounded-lg p-2 h-full flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                                    style={{ minHeight: '85px' }}
                                >
                                    <Plus className="w-6 h-6 text-cyan-400" />
                                    <span className="text-cyan-400 font-black font-mono text-[8px]">ADD</span>
                                </motion.div>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* MAIN QUICK ACCESS GRID */}
            <div className="mt-3 grid grid-cols-3 gap-2">
                <Link to={createPageUrl('ScottGigOffers')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-green-500 rounded-lg p-2 text-center hover:bg-green-500/10"
                        style={{ boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
                    >
                        <Zap className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <p className="text-green-400 font-black font-mono text-[8px]">GIGS</p>
                        {allOffers.length > 0 && <p className="text-white text-sm font-black font-mono">{stats.pendingOffers + stats.awaitingBand}</p>}
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottMessageInbox')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-cyan-500 rounded-lg p-2 text-center hover:bg-cyan-500/10"
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                    >
                        <Mail className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-cyan-400 font-black font-mono text-[8px]">EMAIL</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottCalendarView')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-cyan-500 rounded-lg p-2 text-center hover:bg-cyan-500/10"
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                    >
                        <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-cyan-400 font-black font-mono text-[8px]">CAL</p>
                        {stats.upcomingGigs > 0 && <p className="text-white text-sm font-black font-mono">{stats.upcomingGigs}</p>}
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottToDo')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-cyan-500 rounded-lg p-2 text-center hover:bg-cyan-500/10"
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                    >
                        <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-cyan-400 font-black font-mono text-[8px]">TASKS</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottTeamAccess')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-cyan-500 rounded-lg p-2 text-center hover:bg-cyan-500/10"
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                    >
                        <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-cyan-400 font-black font-mono text-[8px]">TEAMS</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottFinanceAdmin')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-cyan-500 rounded-lg p-2 text-center hover:bg-cyan-500/10"
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                    >
                        <DollarSign className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-cyan-400 font-black font-mono text-[8px]">FIN</p>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottSettings')}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border-2 border-amber-500 rounded-lg p-2 text-center hover:bg-amber-500/10"
                        style={{ boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)' }}
                    >
                        <svg className="w-5 h-5 text-amber-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-amber-400 font-black font-mono text-[8px]">SET</p>
                    </motion.div>
                </Link>
                </div>

            {/* ARCHIVED ARTISTS */}
            {archivedArtists.length > 0 && (
                <div className="mt-3">
                    <details className="text-gray-700">
                        <summary className="cursor-pointer text-[9px] font-mono mb-2">Archived ({archivedArtists.length})</summary>
                        <div className="space-y-1">
                            {archivedArtists.map((artist) => (
                                <div key={artist.id} className="flex items-center justify-between bg-black border border-gray-900 rounded p-2">
                                    <p className="text-gray-700 font-mono text-[9px]">{artist.name}</p>
                                    <button
                                        onClick={() => handleRestoreArtist(artist)}
                                        className="text-cyan-400 hover:text-cyan-300 text-[9px] font-mono"
                                    >
                                        RESTORE
                                    </button>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            )}
        </div>
    );
}