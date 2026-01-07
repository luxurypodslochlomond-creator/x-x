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

/**
 * CB51 HOME PAGE - CLEAN URL FOR WHITE LABEL
 * Artist management hub
 */

export default function CB51() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();
    
    // Expandable sections state
    const [expandedSections, setExpandedSections] = useState({
        urgent: true,
        messages: false,
        artists: true,
        gigs: false,
        legal: false,
        finance: false,
        calendar: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

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

    const { data: legalDocs = [] } = useQuery({
        queryKey: ['scottLegalDocs'],
        queryFn: () => base44.entities.ScottLegalDoc.filter({}),
        enabled: !!user
    });

    const { data: invoices = [] } = useQuery({
        queryKey: ['scottInvoices'],
        queryFn: () => base44.entities.ScottInvoice.filter({}),
        enabled: !!user
    });

    const { data: events = [] } = useQuery({
        queryKey: ['scottEvents'],
        queryFn: () => base44.entities.ScottEvent.filter({}),
        enabled: !!user
    });

    const { data: messages = [] } = useQuery({
        queryKey: ['scottMessages'],
        queryFn: () => base44.entities.ScottMessage.filter({}),
        enabled: !!user
    });

    // Intelligence - what needs attention TODAY
    const pendingOffers = allOffers.filter(o => o.status === 'pending_manager_review').length;
    const awaitingBand = allOffers.filter(o => o.status === 'sent_to_band').length;
    const confirmedGigs = allOffers.filter(o => o.status === 'confirmed').length;
    const upcomingGigs = events.filter(e => new Date(e.date) >= new Date() && e.status === 'confirmed').slice(0, 3);
    const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
    const expiringDocs = legalDocs.filter(d => d.expiry_date && new Date(d.expiry_date) <= new Date(Date.now() + 30*24*60*60*1000)).length;
    const pendingMessages = messages.filter(m => m.status === 'pending').length;
    const urgentMessages = messages.filter(m => m.status === 'pending' && m.urgency === 'urgent').length;
    
    const totalTimeSaved = allOffers.reduce((sum, offer) => sum + (offer.time_saved_minutes || 120), 0);
    const hoursPerWeek = Math.round(totalTimeSaved / 60);

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
                    <div className="w-12 h-12 border-2 border-gray-900 border-t-cyan-500 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600 font-mono text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    // Section component for expandable areas
    const Section = ({ id, title, icon: Icon, badge, color, children }) => {
        const isExpanded = expandedSections[id];
        return (
            <div className="mb-3">
                <button
                    onClick={() => toggleSection(id)}
                    className={`w-full bg-black border-2 ${color} rounded-xl p-4 flex items-center justify-between hover:border-opacity-100 transition-all`}
                >
                    <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
                        <span className="text-white font-black font-mono text-lg tracking-wider">{title}</span>
                        {badge > 0 && (
                            <span className={`bg-black ${color.replace('border-', 'text-')} px-2 py-1 rounded-full text-xs font-bold font-mono border ${color}`}>
                                {badge}
                            </span>
                        )}
                    </div>
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                </button>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 bg-black border-x-2 border-b-2 border-gray-900 rounded-b-xl -mt-2">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* HEADER */}
            <div className="mb-6 pt-4">
                <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-6 h-6 text-cyan-400" />
                    <h1 className="text-2xl font-black text-cyan-400 font-mono">OPERATION CENTRE</h1>
                </div>
                <p className="text-gray-600 text-sm font-mono">Everything you need at a glance</p>
            </div>

            {/* TIME SAVED STAT */}
            {user && totalTimeSaved > 0 && (
                <div className="mb-6 bg-black border-2 border-amber-500/50 rounded-xl p-4 text-center">
                    <p className="text-amber-400 text-xs font-mono mb-1 tracking-widest font-bold">TIME SAVED THIS WEEK</p>
                    <p className="text-4xl font-black text-white font-mono">{hoursPerWeek}h</p>
                </div>
            )}

            {/* URGENT - WHAT NEEDS ME TODAY */}
            <Section id="urgent" title="WHAT NEEDS ME TODAY" icon={AlertCircle} badge={pendingOffers + awaitingBand + overdueInvoices + expiringDocs + urgentMessages} color="border-amber-500/50">
                {pendingOffers === 0 && awaitingBand === 0 && overdueInvoices === 0 && expiringDocs === 0 && urgentMessages === 0 ? (
                    <p className="text-gray-600 font-mono text-sm">✅ All clear bro</p>
                ) : (
                    <div className="space-y-3">
                        {pendingOffers > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border-2 border-amber-500/50 rounded-lg p-3 hover:border-amber-500 transition-all">
                                    <p className="text-amber-400 font-bold font-mono">{pendingOffers} gig offers need review</p>
                                    <p className="text-gray-600 text-xs font-mono mt-1">Tap to review →</p>
                                </div>
                            </Link>
                        )}
                        {awaitingBand > 0 && (
                            <Link to={createPageUrl('ScottGigOffers')}>
                                <div className="bg-black border-2 border-cyan-500/50 rounded-lg p-3 hover:border-cyan-500 transition-all">
                                    <p className="text-cyan-400 font-bold font-mono">{awaitingBand} offers sent to band</p>
                                    <p className="text-gray-600 text-xs font-mono mt-1">Waiting for votes →</p>
                                </div>
                            </Link>
                        )}
                        {overdueInvoices > 0 && (
                            <Link to={createPageUrl('ScottInvoices')}>
                                <div className="bg-black border-2 border-red-500/50 rounded-lg p-3 hover:border-red-500 transition-all">
                                    <p className="text-red-400 font-bold font-mono">{overdueInvoices} overdue invoices</p>
                                    <p className="text-gray-600 text-xs font-mono mt-1">Chase payment →</p>
                                </div>
                            </Link>
                        )}
                        {expiringDocs > 0 && (
                            <Link to={createPageUrl('ScottLegalDocs')}>
                                <div className="bg-black border-2 border-orange-500/50 rounded-lg p-3 hover:border-orange-500 transition-all">
                                    <p className="text-orange-400 font-bold font-mono">{expiringDocs} docs expiring soon</p>
                                    <p className="text-gray-600 text-xs font-mono mt-1">Renew now →</p>
                                </div>
                            </Link>
                        )}
                        {urgentMessages > 0 && (
                            <div className="bg-black border-2 border-red-500/50 rounded-lg p-3">
                                <p className="text-red-400 font-bold font-mono">{urgentMessages} urgent messages need replies</p>
                                <p className="text-gray-600 text-xs font-mono mt-1">Check message centre ↓</p>
                            </div>
                        )}
                    </div>
                )}
            </Section>

            {/* MESSAGE CENTRE */}
            <Section id="messages" title="MESSAGE CENTRE" icon={MessageSquare} badge={pendingMessages} color="border-cyan-500/50">
                <ScottMessageCentre />
            </Section>

            {/* ARTISTS */}
            <Section id="artists" title="ARTISTS" icon={Music} badge={artists.length} color="border-cyan-500/50">
                <div className="grid grid-cols-2 gap-3">
                    {artists.length === 0 ? (
                        <div className="col-span-2 text-center">
                            <p className="text-gray-600 text-sm font-mono mb-4">No artists yet</p>
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-6 py-3 rounded-lg text-sm font-mono">
                                    ADD FIRST ARTIST
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {artists.map((artist) => (
                                <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                                    <div className="bg-black border-2 border-gray-900 hover:border-cyan-500/50 rounded-lg p-3 transition-all flex items-center gap-3">
                                        {artist.profile_pic_url ? (
                                            <img 
                                                src={artist.profile_pic_url} 
                                                alt={artist.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black text-lg flex items-center justify-center">
                                                {artist.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-bold font-mono text-sm truncate">{artist.name}</p>
                                            <p className="text-gray-600 text-xs font-mono">{artist.genre || 'Artist'}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <div className="bg-black border-2 border-dashed border-gray-900 hover:border-cyan-500/50 rounded-lg p-3 h-[72px] flex items-center justify-center transition-all">
                                    <Plus className="w-6 h-6 text-cyan-400" />
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </Section>

            {/* GIG OFFERS */}
            <Section id="gigs" title="GIG OFFERS" icon={Zap} badge={allOffers.length} color="border-amber-500/50">
                <div className="space-y-2">
                    <div className="flex gap-2 mb-3">
                        <div className="flex-1 bg-black border-2 border-amber-500/50 rounded-lg p-3 text-center">
                            <p className="text-2xl font-black text-white font-mono">{pendingOffers}</p>
                            <p className="text-xs text-amber-400 font-mono tracking-widest">PENDING</p>
                        </div>
                        <div className="flex-1 bg-black border-2 border-green-500/50 rounded-lg p-3 text-center">
                            <p className="text-2xl font-black text-white font-mono">{confirmedGigs}</p>
                            <p className="text-xs text-green-400 font-mono tracking-widest">CONFIRMED</p>
                        </div>
                    </div>
                    <Link to={createPageUrl('ScottGigOffers')}>
                        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-3 rounded-lg font-mono transition-all">
                            VIEW ALL OFFERS →
                        </button>
                    </Link>
                </div>
            </Section>

            {/* UPCOMING GIGS */}
            <Section id="calendar" title="UPCOMING GIGS" icon={Calendar} badge={upcomingGigs.length} color="border-green-500/50">
                {upcomingGigs.length === 0 ? (
                    <p className="text-gray-600 font-mono text-sm">No upcoming gigs</p>
                ) : (
                    <div className="space-y-2">
                        {upcomingGigs.map(gig => (
                            <div key={gig.id} className="bg-black border-2 border-green-500/50 rounded-lg p-3">
                                <p className="text-white font-bold font-mono">{gig.title}</p>
                                <p className="text-green-400 text-sm font-mono">{format(new Date(gig.date), 'd MMM yyyy')}</p>
                                {gig.location && <p className="text-gray-600 text-xs font-mono mt-1">{gig.location}</p>}
                            </div>
                        ))}
                        <Link to={createPageUrl('ScottCalendarView')}>
                            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-2 rounded-lg font-mono text-sm mt-2 transition-all">
                                VIEW CALENDAR →
                            </button>
                        </Link>
                    </div>
                )}
            </Section>

            {/* LEGAL */}
            <Section id="legal" title="LEGAL & DOCS" icon={FileText} badge={expiringDocs} color="border-amber-500/50">
                <div className="space-y-2">
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-3">
                        <p className="text-amber-400 text-xs font-mono tracking-widest font-bold">TOTAL DOCUMENTS</p>
                        <p className="text-2xl font-black text-white font-mono">{legalDocs.length}</p>
                    </div>
                    {expiringDocs > 0 && (
                        <div className="bg-black border-2 border-orange-500/50 rounded-lg p-3">
                            <p className="text-orange-400 font-bold font-mono">{expiringDocs} expiring within 30 days</p>
                        </div>
                    )}
                    <Link to={createPageUrl('ScottLegalDocs')}>
                        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-3 rounded-lg font-mono transition-all">
                            MANAGE DOCS →
                        </button>
                    </Link>
                </div>
            </Section>

            {/* FINANCE */}
            <Section id="finance" title="FINANCE" icon={DollarSign} badge={overdueInvoices} color="border-amber-500/50">
                <div className="space-y-2">
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-3">
                        <p className="text-amber-400 text-xs font-mono tracking-widest font-bold">TOTAL INVOICES</p>
                        <p className="text-2xl font-black text-white font-mono">{invoices.length}</p>
                    </div>
                    {overdueInvoices > 0 && (
                        <div className="bg-black border-2 border-red-500/50 rounded-lg p-3">
                            <p className="text-red-400 font-bold font-mono">{overdueInvoices} OVERDUE - chase now!</p>
                        </div>
                    )}
                    <Link to={createPageUrl('ScottInvoices')}>
                        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-3 rounded-lg font-mono transition-all">
                            MANAGE INVOICES →
                        </button>
                    </Link>
                </div>
            </Section>

            {/* ARCHIVED ARTISTS */}
            {archivedArtists.length > 0 && (
                <div className="mt-6 bg-black border-2 border-gray-900 rounded-xl p-4">
                    <h3 className="text-gray-700 font-black text-sm mb-3 font-mono tracking-widest">ARCHIVED ARTISTS</h3>
                    <div className="space-y-2">
                        {archivedArtists.map((artist) => (
                            <div 
                                key={artist.id}
                                onClick={() => handleRestoreArtist(artist)}
                                className="bg-black border border-gray-900 hover:border-gray-700 rounded-lg p-3 cursor-pointer transition-all"
                            >
                                <p className="text-gray-600 font-bold font-mono text-sm">{artist.name}</p>
                                <p className="text-gray-800 text-xs font-mono">Tap to restore</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-800 text-xs font-mono">CB51</p>
            </div>
            </div>
            );
            }