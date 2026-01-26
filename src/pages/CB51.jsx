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
import CB51SecurityNotice from '@/components/scott/CB51SecurityNotice';

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

            {/* NOTIFICATION MANAGER IN TOP RIGHT */}
            <div className="mb-6 flex justify-end">
                <PushNotificationManager />
            </div>

            {/* IN-APP NOTIFICATION INBOX - ONLY SHOW IF OFFERS PENDING */}
            {stats.pendingOffers > 0 && (
                <div className="mb-6">
                    <CB51NotificationInbox />
                </div>
            )}

            {/* COMPACT ARTISTS GRID */}
            <div className="mb-8 pt-4">
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
                        <div className="grid grid-cols-3 gap-4">
                            {artists.map((artist) => (
                                <motion.div
                                    key={artist.id}
                                    whileTap={{ scale: 0.96 }}
                                    className="relative w-20 h-20 bg-black border-2 border-cyan-500 rounded-full overflow-hidden group flex flex-col items-center justify-center"
                                    style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
                                >
                                    <Link to={createPageUrl(`ScottArtistHome?id=${artist.id}`)} className="relative w-full h-full flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center text-center gap-1">
                                            {artist.profile_pic_url ? (
                                                <img 
                                                    src={artist.profile_pic_url} 
                                                    alt={artist.name}
                                                    className="w-14 h-14 rounded-full object-cover border border-cyan-500"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-cyan-500 text-black font-black text-lg flex items-center justify-center">
                                                    {artist.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    {/* Hover menu - Edit + Archive */}
                                    <div className="absolute inset-0 bg-black/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                        <p className="text-white font-black text-[8px] font-mono text-center px-1">{artist.name}</p>
                                        <Link 
                                            to={createPageUrl(`ScottAddArtist?edit=${artist.id}`)}
                                            className="text-cyan-400 text-[7px] font-bold font-mono hover:text-cyan-300"
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
                                            className="text-red-400 text-[7px] font-bold font-mono hover:text-red-300"
                                        >
                                            ARCHIVE
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Add Artist Circle */}
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <motion.div
                                    whileTap={{ scale: 0.96 }}
                                    className="w-20 h-20 bg-black border-2 border-dashed border-gray-800 hover:border-cyan-500 rounded-full flex items-center justify-center transition-all cursor-pointer"
                                >
                                    <Plus className="w-6 h-6 text-cyan-400" />
                                </motion.div>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* QUICK LINKS - Keep minimal, only essential */}
            <div className="flex gap-2 mb-6 mt-6">
                <Link to={createPageUrl('ScottGigOffers')} className="flex-1">
                    <button className="w-full bg-green-500/10 border border-green-500/50 text-green-400 py-2 rounded-lg font-mono text-xs font-bold hover:bg-green-500/20 transition-all">
                        + NEW GIG
                    </button>
                </Link>
                <Link to={createPageUrl('ScottSettings')} className="flex-1">
                    <button className="w-full bg-amber-500/10 border border-amber-500/50 text-amber-400 py-2 rounded-lg font-mono text-xs font-bold hover:bg-amber-500/20 transition-all">
                        SETTINGS
                    </button>
                </Link>
            </div>

            {/* HIDDEN MENU - Collapsible for power users */}
            <details className="mb-4">
                <summary className="cursor-pointer text-cyan-400 font-mono text-xs font-bold hover:text-cyan-300">More Tools ▼</summary>
                <div className="mt-3 grid grid-cols-3 gap-2">
                    <Link to={createPageUrl('ScottMessageInbox')}>
                        <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:bg-cyan-500/10 transition-all">
                            <Mail className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-cyan-400 font-mono text-[8px]">EMAIL</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottCalendarView')}>
                        <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:bg-cyan-500/10 transition-all">
                            <Calendar className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-cyan-400 font-mono text-[8px]">CALENDAR</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottToDo')}>
                        <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:bg-cyan-500/10 transition-all">
                            <CheckCircle className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-cyan-400 font-mono text-[8px]">TASKS</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottTeamAccess')}>
                        <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:bg-cyan-500/10 transition-all">
                            <Users className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-cyan-400 font-mono text-[8px]">TEAMS</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottFinanceAdmin')}>
                        <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:bg-cyan-500/10 transition-all">
                            <DollarSign className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-cyan-400 font-mono text-[8px]">FINANCE</p>
                        </div>
                    </Link>
                </div>
            </details>

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