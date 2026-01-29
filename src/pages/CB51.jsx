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
import CB51BandNotifications from '@/components/scott/CB51BandNotifications';
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

    // Memoize stats - but don't display them yet
    const stats = useMemo(() => ({
        pendingOffers: allOffers.filter(o => o.status === 'pending_manager_review').length,
        awaitingBand: allOffers.filter(o => o.status === 'sent_to_band').length,
        overdueInvoices: invoices.filter(i => i.status === 'overdue').length,
        urgentMessages: messages.filter(m => m.status === 'pending' && m.urgency === 'urgent').length,
        hoursPerWeek: allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').length * 2,
        upcomingGigs: allOffers.filter(o => o.status === 'confirmed' && o.date && new Date(o.date) > new Date()).length,
        pipelineValue: allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').reduce((sum, o) => sum + (o.fee || 0), 0)
    }), [allOffers, invoices, messages]);

    // Quick link to pending offers if any
    const hasPendingOffers = stats.pendingOffers > 0;

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

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Radio className="w-16 h-16 mx-auto mb-4 animate-pulse text-cyan-400" />
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

            {/* BAND MEMBER NOTIFICATIONS */}
            {user && user.role !== 'admin' && (
                <div className="mb-6">
                    <CB51BandNotifications userEmail={user.email} />
                </div>
            )}



            {/* COMPACT ARTISTS GRID */}
            <div className="mb-8 pt-4">
                {artists.length === 0 ? (
                    <div className="text-center py-6">
                        <p className="text-gray-600 text-xs font-mono mb-3">No artists yet</p>
                        <Link to={createPageUrl('ScottAddArtist')}>
                            <button className="bg-cyan-500 text-black font-black px-6 py-3 rounded-lg font-mono text-sm hover:bg-cyan-600 transition-all">
                                ADD FIRST ARTIST
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-4">
                            {artists.map((artist) => (
                                <div key={artist.id} className="relative">
                                    <Link 
                                        to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}
                                        className="block"
                                    >
                                        <motion.div
                                            whileTap={{ scale: 0.96 }}
                                            className="w-20 h-20 border-2 border-cyan-500 rounded-full overflow-hidden flex items-center justify-center bg-black"
                                        >
                                            {artist.profile_pic_url ? (
                                                <img 
                                                    src={artist.profile_pic_url} 
                                                    alt={artist.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full text-black font-black text-2xl flex items-center justify-center bg-cyan-400">
                                                    {artist.name.charAt(0)}
                                                </div>
                                            )}
                                        </motion.div>
                                    </Link>
                                </div>
                            ))}

                            {/* Add Artist Circle */}
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <motion.div
                                    whileTap={{ scale: 0.96 }}
                                    className="w-20 h-20 border-2 border-dashed rounded-full flex items-center justify-center transition-all cursor-pointer"
                                    style={{ backgroundColor: 'var(--cb51-bg-card)', borderColor: 'var(--cb51-border)' }}
                                >
                                    <Plus className="w-6 h-6" style={{ color: 'var(--cb51-rose)' }} />
                                </motion.div>
                            </Link>
                        </div>

                        {/* Edit Artists - Quick Access */}
                        <details className="mt-3">
                            <summary className="cursor-pointer font-mono text-xs font-bold hover:opacity-80" style={{ color: 'var(--cb51-rose)' }}>Edit Artists ▼</summary>
                            <div className="mt-2 space-y-2">
                                {artists.map((artist) => (
                                    <button
                                        key={artist.id}
                                        onClick={() => navigate(createPageUrl(`ScottAddArtist?edit=${artist.id}`))}
                                        className="w-full rounded p-2 text-left hover:opacity-80 transition-all flex items-center justify-between"
                                        style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}
                                    >
                                        <span className="font-mono text-xs" style={{ color: 'var(--cb51-rose)' }}>{artist.name}</span>
                                        <span className="text-xs" style={{ color: 'var(--cb51-calendar)' }}>✎</span>
                                    </button>
                                ))}
                            </div>
                        </details>
                    </>
                )}
            </div>

            {/* QUICK LINKS - Only show when needed */}
            {hasPendingOffers && (
                <div className="flex gap-2 mb-6 mt-6">
                    <Link to={createPageUrl('ScottGigOffers')} className="flex-1">
                        <button className="w-full text-white py-2 rounded-lg font-mono text-xs font-bold transition-all animate-pulse hover:opacity-90" style={{ backgroundColor: 'var(--cb51-rose)' }}>
                            {stats.pendingOffers} PENDING OFFER{stats.pendingOffers !== 1 ? 'S' : ''}
                        </button>
                    </Link>
                </div>
            )}
            <div className="flex gap-2 mb-6 mt-6">
                <Link to={createPageUrl('ScottSettings')} className="flex-1">
                    <button className="w-full py-2 rounded-lg font-mono text-xs font-bold hover:opacity-80 transition-all" style={{ backgroundColor: 'var(--cb51-bg-card)', color: 'var(--cb51-rose)', border: '1px solid var(--cb51-border)' }}>
                        SETTINGS
                    </button>
                </Link>
            </div>

            {/* HIDDEN MENU - Clean & simple */}
            <details className="mb-4">
                <summary className="cursor-pointer font-mono text-xs font-bold hover:opacity-80" style={{ color: 'var(--cb51-rose)' }}>More Tools ▼</summary>
                <div className="mt-3 grid grid-cols-3 gap-2">
                    <Link to={createPageUrl('ScottMessageInbox')}>
                        <div className="rounded p-2 text-center hover:opacity-90 transition-all" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                            <Mail className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--cb51-rose)' }} />
                            <p className="font-mono text-[8px]" style={{ color: 'var(--cb51-rose)' }}>EMAIL</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottCalendarView')}>
                        <div className="rounded p-2 text-center hover:opacity-90 transition-all" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                            <Calendar className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--cb51-calendar)' }} />
                            <p className="font-mono text-[8px]" style={{ color: 'var(--cb51-calendar)' }}>CALENDAR</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottToDo')}>
                        <div className="rounded p-2 text-center hover:opacity-90 transition-all" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                            <CheckCircle className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--cb51-tasks)' }} />
                            <p className="font-mono text-[8px]" style={{ color: 'var(--cb51-tasks)' }}>TASKS</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottTeamAccess')}>
                        <div className="rounded p-2 text-center hover:opacity-90 transition-all" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                            <Users className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--cb51-rose)' }} />
                            <p className="font-mono text-[8px]" style={{ color: 'var(--cb51-rose)' }}>TEAMS</p>
                        </div>
                    </Link>
                    <Link to={createPageUrl('ScottFinanceAdmin')}>
                        <div className="rounded p-2 text-center hover:opacity-90 transition-all" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                            <DollarSign className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--cb51-finance)' }} />
                            <p className="font-mono text-[8px]" style={{ color: 'var(--cb51-finance)' }}>FINANCE</p>
                        </div>
                    </Link>
                </div>
            </details>

            {/* ARCHIVED ARTISTS */}
            {archivedArtists.length > 0 && (
                <div className="mt-3">
                    <details>
                        <summary className="cursor-pointer text-[9px] font-mono mb-2 hover:opacity-80" style={{ color: 'var(--cb51-text-muted)' }}>Archived ({archivedArtists.length})</summary>
                        <div className="space-y-1">
                            {archivedArtists.map((artist) => (
                                <div key={artist.id} className="flex items-center justify-between rounded p-2" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                                    <p className="font-mono text-[9px]" style={{ color: 'var(--cb51-text-muted)' }}>{artist.name}</p>
                                    <button
                                        onClick={() => handleRestoreArtist(artist)}
                                        className="text-[9px] font-mono hover:opacity-80"
                                        style={{ color: 'var(--cb51-rose)' }}
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