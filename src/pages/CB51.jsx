import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Plus, Trash2, AlertCircle, Calendar, MessageSquare, Users, Zap, Mail, CheckCircle, Heart, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TechStatusBar from '@/components/scott/TechStatusBar';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import CB51NotificationInbox from '@/components/scott/CB51NotificationInbox';
import CB51BandNotifications from '@/components/scott/CB51BandNotifications';
import CB51SecurityNotice from '@/components/scott/CB51SecurityNotice';
import LiveClock from '@/components/shared/LiveClock';

/**
 * CB51 HOME PAGE - CLEAN URL FOR WHITE LABEL
 * Artist management hub
 */

export default function CB51() {
          const navigate = useNavigate();
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);
          const [editArtistsOpen, setEditArtistsOpen] = useState(false);
          const [settingsOpen, setSettingsOpen] = useState(false);
          const [moreToolsOpen, setMoreToolsOpen] = useState(false);
          const [archivedOpen, setArchivedOpen] = useState(false);
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
                <div className="min-h-screen bg-black text-white p-4 pb-20">

                    {/* NOTIFICATION MANAGER */}
                    <div className="mb-6 flex justify-end">
                        <PushNotificationManager />
                    </div>

                    {/* BAND MEMBER NOTIFICATIONS */}
                    {user && user.role !== 'admin' && (
                        <div className="mb-6">
                            <CB51BandNotifications userEmail={user.email} />
                        </div>
                    )}

                    {/* ARTIST CIRCLES - BIG AND CENTERED */}
                    {artists.length > 0 && (
                        <div className="mb-8 mt-6">
                            <div className="flex justify-center items-center gap-8 flex-wrap">
                                {artists.slice(0, 3).map((artist) => (
                                    <Link 
                                        key={artist.id}
                                        to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}
                                    >
                                        <motion.div
                                            whileTap={{ scale: 0.95 }}
                                            className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center font-black text-3xl text-black cursor-pointer hover:opacity-90 transition-opacity"
                                        >
                                            {artist.profile_pic_url ? (
                                                <img 
                                                    src={artist.profile_pic_url} 
                                                    alt={artist.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                artist.name.charAt(0).toUpperCase()
                                            )}
                                        </motion.div>
                                    </Link>
                                ))}
                                {artists.length < 5 && (
                                    <Link to={createPageUrl('ScottAddArtist')}>
                                        <motion.div
                                            whileTap={{ scale: 0.95 }}
                                            className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors"
                                        >
                                            <Plus className="w-8 h-8 text-cyan-400" />
                                        </motion.div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    {/* EDIT ARTISTS SECTION */}
                    <div className="mb-4">
                        <button 
                            onClick={() => setEditArtistsOpen(!editArtistsOpen)}
                            className="w-full font-mono text-xs font-bold text-cyan-400 text-left py-2 flex items-center gap-2"
                        >
                            <span>{editArtistsOpen ? '▼' : '▶'}</span>
                            Edit Artists
                        </button>
                        {editArtistsOpen && (
                            <div className="space-y-2">
                                {artists.map((artist) => (
                                    <button
                                        key={artist.id}
                                        onClick={() => navigate(createPageUrl(`ScottAddArtist?edit=${artist.id}`))}
                                        className="w-full bg-black border border-cyan-500/30 rounded p-3 text-left hover:border-cyan-500 transition-all flex items-center justify-between"
                                    >
                                        <span className="font-mono text-xs text-cyan-400">{artist.name}</span>
                                        <span className="text-cyan-400 text-lg">♪</span>
                                    </button>
                                ))}
                                {artists.length === 0 && (
                                    <Link to={createPageUrl('ScottAddArtist')} className="block">
                                        <button className="w-full bg-cyan-500 text-black font-black py-2 rounded font-mono text-xs hover:bg-cyan-600 transition-all">
                                            ADD FIRST ARTIST
                                        </button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* SETTINGS SECTION */}
                    <div className="mb-4">
                        <button 
                            onClick={() => setSettingsOpen(!settingsOpen)}
                            className="w-full font-mono text-xs font-bold text-yellow-600 hover:text-yellow-500 text-left py-2 flex items-center justify-between px-4 py-3 border-2 border-yellow-600 rounded hover:border-yellow-500 transition-all"
                        >
                            <span>⚙️ SETTINGS</span>
                            <span>{settingsOpen ? '▼' : '▶'}</span>
                        </button>
                        {settingsOpen && (
                            <div className="mt-2 p-4 bg-black border border-yellow-600/30 rounded">
                                <p className="text-gray-600 font-mono text-xs">Settings coming soon</p>
                            </div>
                        )}
                    </div>

                    {/* MORE TOOLS SECTION */}
                    <div className="mb-4">
                        <button 
                            onClick={() => setMoreToolsOpen(!moreToolsOpen)}
                            className="w-full font-mono text-xs font-bold text-cyan-400 text-left py-2 flex items-center gap-2"
                        >
                            <span>{moreToolsOpen ? '▼' : '▶'}</span>
                            More Tools
                        </button>
                        {moreToolsOpen && (
                            <div className="grid grid-cols-2 gap-3">
                                <Link to={createPageUrl('ScottMessageInbox')}>
                                    <div className="bg-black border border-cyan-500/30 rounded p-3 text-center hover:border-cyan-500 transition-all">
                                        <Mail className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                                        <p className="font-mono text-[10px] text-cyan-400 font-bold">EMAIL</p>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('ScottCalendarView')}>
                                    <div className="bg-black border border-cyan-500/30 rounded p-3 text-center hover:border-cyan-500 transition-all">
                                        <Calendar className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                                        <p className="font-mono text-[10px] text-cyan-400 font-bold">CALENDAR</p>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('ScottToDo')}>
                                    <div className="bg-black border border-cyan-500/30 rounded p-3 text-center hover:border-cyan-500 transition-all">
                                        <CheckCircle className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                                        <p className="font-mono text-[10px] text-cyan-400 font-bold">TASKS</p>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('ScottTeamAccess')}>
                                    <div className="bg-black border border-cyan-500/30 rounded p-3 text-center hover:border-cyan-500 transition-all">
                                        <Users className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                                        <p className="font-mono text-[10px] text-cyan-400 font-bold">TEAMS</p>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('ScottFinanceAdmin')} className="col-span-2">
                                    <div className="bg-black border border-cyan-500/30 rounded p-3 text-center hover:border-cyan-500 transition-all">
                                        <DollarSign className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                                        <p className="font-mono text-[10px] text-cyan-400 font-bold">FINANCE</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ARCHIVED ARTISTS */}
                    {archivedArtists.length > 0 && (
                        <div className="mt-6">
                            <button 
                                onClick={() => setArchivedOpen(!archivedOpen)}
                                className="w-full font-mono text-xs font-bold text-gray-600 text-left py-2 flex items-center gap-2"
                            >
                                <span>{archivedOpen ? '▼' : '▶'}</span>
                                Archived ({archivedArtists.length})
                            </button>
                            {archivedOpen && (
                                <div className="space-y-2">
                                    {archivedArtists.map((artist) => (
                                        <div key={artist.id} className="flex items-center justify-between bg-black border border-gray-700 rounded p-3">
                                            <p className="font-mono text-xs text-gray-600">{artist.name}</p>
                                            <button
                                                onClick={() => handleRestoreArtist(artist)}
                                                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors font-bold"
                                            >
                                                RESTORE
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}


                    </div>
                    );
                    }