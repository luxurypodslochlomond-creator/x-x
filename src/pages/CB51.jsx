import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Plus, Trash2, AlertCircle, Calendar, MessageSquare, Users, Zap, Mail, CheckCircle, Heart, DollarSign, Shield, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import TechStatusBar from '@/components/scott/TechStatusBar';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import CB51NotificationInbox from '@/components/scott/CB51NotificationInbox';
import CB51BandNotifications from '@/components/scott/CB51BandNotifications';
import CB51SecurityNotice from '@/components/scott/CB51SecurityNotice';
import CB51BandVoteAlert from '@/components/scott/CB51BandVoteAlert';
import CB51VoteBreakdown from '@/components/scott/CB51VoteBreakdown';
import LiveClock from '@/components/shared/LiveClock';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';

/**
 * CB51 HOME PAGE - CLEAN URL FOR WHITE LABEL
 * Artist management hub
 */

export default function CB51() {
                const navigate = useNavigate();
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);
          const [editArtistsOpen, setEditArtistsOpen] = useState(false);
          const [moreToolsOpen, setMoreToolsOpen] = useState(false);
          const [archivedOpen, setArchivedOpen] = useState(false);
          const [settingsOpen, setSettingsOpen] = useState(false);
          const [pasteModalOpen, setPasteModalOpen] = useState(false);
          const [pastedText, setPastedText] = useState('');
          const [scanning, setScanning] = useState(false);
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

    const handlePaste = async () => {
        if (!pastedText.trim()) return;

        setScanning(true);
        try {
            await base44.functions.invoke('scanGigOffers', { 
                emailText: pastedText, 
                artistId: artists[0]?.id 
            });

            queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
            queryClient.invalidateQueries({ queryKey: ['scottInvoices'] });

            setPastedText('');
            setPasteModalOpen(false);
            alert('✅ Scanned!');
        } catch (e) {
            alert('Error: ' + e.message);
        } finally {
            setScanning(false);
        }
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

                                    {/* AI51 SMART SCAN */}
                                                    {user?.role === 'admin' && (
                                                        <div className="mb-6">
                                                            <button
                                                                onClick={() => setPasteModalOpen(!pasteModalOpen)}
                                                                className="w-full bg-black hover:bg-gray-900 text-cyan-400 font-bold font-mono text-sm py-3 rounded-lg border border-cyan-500/50 hover:border-cyan-500 flex items-center justify-center gap-2 transition-all"
                                                            >
                                                                <AI51AtomIcon size={20} animate={true} />
                                                                <span>AI51 SCAN</span>
                                                            </button>

                                                            {pasteModalOpen && (
                                                                <div className="mt-3 bg-black border border-cyan-500/50 rounded-lg p-4">
                                                                    <div className="flex items-start gap-2 mb-3">
                                                                        <AI51AtomIcon size={24} animate={true} />
                                                                        <div>
                                                                            <p className="text-cyan-400 font-bold text-sm">Paste message or upload</p>
                                                                            <p className="text-gray-500 text-xs">AI51 extracts gigs, tasks, invoices, contracts</p>
                                                                        </div>
                                                                    </div>
                                                                    <Textarea
                                                                        value={pastedText}
                                                                        onChange={(e) => setPastedText(e.target.value)}
                                                                        placeholder="Paste WhatsApp, email, or contract text..."
                                                                        className="bg-black/50 border-cyan-500/30 text-white text-sm min-h-[180px] mb-3 focus:border-cyan-500"
                                                                    />
                                                                    <label className="block mb-3 cursor-pointer">
                                                                        <div className="bg-black/50 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 rounded-lg p-4 text-center transition-all">
                                                                            <p className="text-cyan-400 text-xs font-mono">or upload PDF/image</p>
                                                                        </div>
                                                                        <input 
                                                                            type="file" 
                                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if (file) {
                                                                                    // Handle file upload
                                                                                    alert('File upload coming soon');
                                                                                }
                                                                            }}
                                                                            className="hidden" 
                                                                        />
                                                                    </label>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => { setPasteModalOpen(false); setPastedText(''); }}
                                                                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-400 font-bold py-2.5 rounded-lg text-sm border border-gray-700"
                                                                        >
                                                                            CANCEL
                                                                        </button>
                                                                        <button
                                                                            onClick={handlePaste}
                                                                            disabled={scanning || !pastedText.trim()}
                                                                            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2.5 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                                                        >
                                                                            {scanning ? (
                                                                                <>
                                                                                    <AI51AtomIcon size={16} animate={true} />
                                                                                    <span>SCANNING...</span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <AI51AtomIcon size={16} animate={true} />
                                                                                    <span>SCAN</span>
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                    {/* REAL-TIME BAND VOTE ALERTS */}
                                    {user && (
                                        <CB51BandVoteAlert userEmail={user.email} />
                                    )}

                    {/* PENDING APPROVALS - PRIORITY */}
                                    {stats.pendingOffers > 0 && (
                                        <div className="mb-6 bg-black border-2 border-cyan-500 rounded-lg p-4">
                                            <h2 className="text-cyan-400 font-black font-mono text-sm mb-3 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                PENDING APPROVALS ({stats.pendingOffers})
                                            </h2>
                                            <div className="space-y-3">
                                                {allOffers
                                                    .filter(o => o.status === 'pending_manager_review')
                                                    .slice(0, 3)
                                                    .map(offer => (
                                                        <div key={offer.id} className="bg-black/60 border border-cyan-500/30 rounded p-3 space-y-2">
                                                            <div className="flex items-between justify-between">
                                                                <div className="flex-1">
                                                                    <p className="text-white font-bold text-sm">{offer.venue || 'Gig Offer'}</p>
                                                                    <p className="text-cyan-400 text-[10px] font-mono">{offer.date || 'TBD'} • £{offer.fee || '?'}</p>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <button 
                                                                        onClick={() => {
                                                                            queryClient.setQueryData(['scottAllGigOffers'], allOffers.map(o => o.id === offer.id ? {...o, status: 'sent_to_band'} : o));
                                                                            base44.entities.ScottGigOffer.update(offer.id, {status: 'sent_to_band'}).then(() => queryClient.invalidateQueries({queryKey: ['scottAllGigOffers']}));
                                                                        }}
                                                                        className="bg-green-600/40 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                    >
                                                                        ✓
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => {
                                                                            if(confirm('Reject this gig?')) {
                                                                                queryClient.setQueryData(['scottAllGigOffers'], allOffers.map(o => o.id === offer.id ? {...o, status: 'rejected'} : o));
                                                                                base44.entities.ScottGigOffer.update(offer.id, {status: 'rejected'}).then(() => queryClient.invalidateQueries({queryKey: ['scottAllGigOffers']}));
                                                                            }
                                                                        }}
                                                                        className="bg-red-600/40 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <CB51VoteBreakdown gigOfferId={offer.id} />
                                                        </div>
                                                    ))}
                                            </div>
                                            {stats.pendingOffers > 3 && (
                                                <Link to={createPageUrl('ScottGigOffers')} className="text-cyan-400 hover:text-cyan-300 text-[10px] font-mono font-bold mt-2 block">
                                                    See all ({stats.pendingOffers}) →
                                                </Link>
                                            )}
                                        </div>
                                    )}

                                    {/* BAND MEMBER NOTIFICATIONS */}
                                    {user && user.role !== 'admin' && (
                                        <div className="mb-6">
                                            <CB51BandNotifications userEmail={user.email} />
                                        </div>
                                    )}

                    {/* ARTIST CIRCLES - BIG AND CENTERED */}
                     {artists.length > 0 && (
                         <div className="mb-4 mt-6">
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

                    {/* EDIT ARTISTS - RIGHT AFTER CIRCLES */}
                    <div className="mb-4 lg:hidden">
                        <button 
                            onClick={() => setEditArtistsOpen(!editArtistsOpen)}
                            className="w-full font-mono text-xs font-bold text-cyan-400 text-left py-2 flex items-center gap-2"
                        >
                            <span>{editArtistsOpen ? '▼' : '▶'}</span>
                            Edit Artists
                        </button>
                        {editArtistsOpen && (
                            <div className="space-y-1 mt-1">
                                {artists.map((artist) => (
                                    <button
                                        key={artist.id}
                                        onClick={() => navigate(createPageUrl(`ScottAddArtist?edit=${artist.id}`))}
                                        className="w-full bg-black border border-cyan-500/30 rounded p-2 text-left hover:border-cyan-500 transition-all flex items-center justify-between text-xs"
                                    >
                                        <span className="font-mono text-cyan-400">{artist.name}</span>
                                        <span className="text-cyan-400">♪</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SETTINGS & TOOLS - ALWAYS VISIBLE ON MOBILE */}
                    <div className="space-y-2">


                        {/* QUICK TOOLS - NO COLLAPSE ON MOBILE */}
                        <div className="grid grid-cols-2 gap-2 lg:hidden">
                            <Link to={createPageUrl('ScottMessageInbox')}>
                                <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:border-cyan-500 transition-all">
                                    <Mail className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                                    <p className="font-mono text-[9px] text-cyan-400 font-bold">EMAIL</p>
                                </div>
                            </Link>
                            <Link to={createPageUrl('ScottCalendarView')}>
                                <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:border-cyan-500 transition-all">
                                    <Calendar className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                                    <p className="font-mono text-[9px] text-cyan-400 font-bold">CALENDAR</p>
                                </div>
                            </Link>
                            <Link to={createPageUrl('ScottToDo')}>
                                <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:border-cyan-500 transition-all">
                                    <CheckCircle className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                                    <p className="font-mono text-[9px] text-cyan-400 font-bold">TASKS</p>
                                </div>
                            </Link>
                            <Link to={createPageUrl('ScottFinanceAdmin')}>
                                <div className="bg-black border border-cyan-500/30 rounded p-2 text-center hover:border-cyan-500 transition-all">
                                    <DollarSign className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                                    <p className="font-mono text-[9px] text-cyan-400 font-bold">FINANCE</p>
                                </div>
                            </Link>
                        </div>

                        {/* ARCHIVED - COLLAPSIBLE */}
                        {archivedArtists.length > 0 && (
                            <div className="lg:hidden">
                                <button 
                                    onClick={() => setArchivedOpen(!archivedOpen)}
                                    className="w-full font-mono text-xs font-bold text-gray-600 text-left py-2 flex items-center gap-2"
                                >
                                    <span>{archivedOpen ? '▼' : '▶'}</span>
                                    Archived ({archivedArtists.length})
                                </button>
                                {archivedOpen && (
                                    <div className="space-y-1">
                                        {archivedArtists.map((artist) => (
                                            <div key={artist.id} className="flex items-center justify-between bg-black border border-gray-700 rounded p-2 text-xs">
                                                <p className="font-mono text-gray-600">{artist.name}</p>
                                                <button
                                                    onClick={() => handleRestoreArtist(artist)}
                                                    className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors font-bold"
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

                    </div>
                    );
                    }