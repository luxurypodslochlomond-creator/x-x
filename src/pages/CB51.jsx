import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Radio, Plus, Loader2, Trash2, ChevronDown, ChevronRight, AlertCircle, Calendar, FileText, DollarSign, Music, Zap, TrendingUp, MessageSquare } from 'lucide-react';
import ScottMessageCentre from '@/components/scott/ScottMessageCentre';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TechStatusBar from '@/components/scott/TechStatusBar';
import { format } from 'date-fns';
import CB51Modal from '@/components/scott/CB51Modal';
import AI51WhatIsBanner from '@/components/scott/AI51WhatIsBanner';

/**
 * CB51 HOME PAGE - CLEAN URL FOR WHITE LABEL
 * Artist management hub
 */

export default function CB51() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
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
        staleTime: 60000
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

    if (loading || isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative">
                {/* Content preview behind */}
                <div className="absolute inset-0 opacity-20 blur-sm">
                    <div className="p-6 pt-20">
                        <div className="flex items-center gap-3 mb-6">
                            <Radio className="w-8 h-8 text-cyan-400" />
                            <div className="text-3xl font-black text-cyan-400 font-mono">CB51</div>
                        </div>
                        <div className="bg-black border-2 border-gray-900 rounded-lg p-4 mb-4">
                            <div className="h-8 bg-gray-900 rounded mb-2"></div>
                            <div className="h-8 bg-gray-900 rounded"></div>
                        </div>
                    </div>
                </div>
                
                {/* CB51 loader overlay */}
                <div className="relative z-10 text-center">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-cyan-400 font-black font-mono text-xl">CB51</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* AI51 EDUCATION */}
            <AI51WhatIsBanner />

            {/* BRAIN BAR - ALWAYS VISIBLE */}
            <div className="mb-6 pt-4">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Radio className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-3xl font-black text-cyan-400 font-mono">CB51</h1>
                    </div>
                    <p className="text-gray-600 text-xs font-mono">AI51 consciousness • Not parsing ♾️</p>
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
                    <button 
                        onClick={() => {
                            setModalContent({
                                title: 'TIME SAVED',
                                body: (
                                    <div className="space-y-4">
                                        <p className="text-white font-black font-mono text-3xl">{hoursPerWeek} hours</p>
                                        <p className="text-gray-400 text-sm">this month</p>
                                        <div className="space-y-2 text-sm font-mono text-gray-400 bg-black/50 rounded-lg p-3">
                                            <p>• Email parsing: ~2h per offer</p>
                                            <p>• Band coordination: ~30m per gig</p>
                                            <p>• Draft responses: ~15m each</p>
                                        </div>
                                        <p className="text-cyan-400 font-bold font-mono mt-4">Time = money bro ♾️❤️♾️</p>
                                    </div>
                                )
                            });
                            setModalOpen(true);
                        }}
                        className="flex-1"
                    >
                        <div className="text-center hover:bg-cyan-500/10 rounded-lg p-2 transition-all">
                            <p className="text-cyan-400/60 text-[9px] font-mono tracking-wider">SAVED</p>
                            <p className="text-white text-base font-black font-mono mt-1">{hoursPerWeek}h</p>
                        </div>
                    </button>
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                    <button
                        onClick={() => {
                            const items = [];
                            if (pendingOffers > 0) items.push(`${pendingOffers} gig offers need review`);
                            if (awaitingBand > 0) items.push(`${awaitingBand} awaiting band votes`);
                            if (overdueInvoices > 0) items.push(`${overdueInvoices} overdue invoices`);
                            if (urgentMessages > 0) items.push(`${urgentMessages} urgent messages`);

                            setModalContent({
                                title: 'TODAY',
                                body: items.length > 0 ? (
                                    <div className="space-y-3 font-mono text-sm">
                                        {items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-black/50 rounded-lg p-3">
                                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                                <p className="text-amber-400">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-green-400 font-bold font-mono text-2xl mb-2">All clear bro ✓</p>
                                        <p className="text-gray-400 text-sm">Nothing needs attention right now</p>
                                    </div>
                                )
                            });
                            setModalOpen(true);
                        }}
                        className="flex-1"
                    >
                        <div className="text-center hover:bg-amber-500/10 rounded-lg p-2 transition-all">
                            <p className="text-amber-400/60 text-[9px] font-mono tracking-wider">TODAY</p>
                            <p className="text-white text-base font-black font-mono mt-1">
                                {pendingOffers + awaitingBand + overdueInvoices + urgentMessages}
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            {/* WHAT NEEDS ME - CLEAN */}
            {(pendingOffers > 0 || awaitingBand > 0 || overdueInvoices > 0 || expiringDocs > 0 || urgentMessages > 0) && (
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
                </motion.div>
            )}

            {/* ARTISTS - SCOTT'S ACTUAL DESIGN */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="space-y-3"
            >
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
                            <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
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
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-800 text-xs font-mono">CB51 • Simple</p>
            </div>

            {/* CB51 MODAL */}
            <CB51Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent?.title}
            >
                {modalContent?.body}
            </CB51Modal>
            </div>
            );
            }