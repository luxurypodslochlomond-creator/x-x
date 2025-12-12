import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Wifi, WifiOff, RefreshCw, Brain, DollarSign, FileText, Music, Globe, Briefcase, Camera, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';
import ScottOneSentence from '@/components/scott/ScottOneSentence';
import ScottEnergyMode from '@/components/scott/ScottEnergyMode';
import ScottCelticMode from '@/components/scott/ScottCelticMode';
import ScottTimeline from '@/components/scott/ScottTimeline';
import ScottQuickActions from '@/components/scott/ScottQuickActions';
import ScottTeamShare from '@/components/scott/ScottTeamShare';
import ScottMorningBriefing from '@/components/scott/ScottMorningBriefing';
import ScottFocusMode from '@/components/scott/ScottFocusMode';
import ScottContextMemory from '@/components/scott/ScottContextMemory';
import ScottDidIDoThis from '@/components/scott/ScottDidIDoThis';
import ScottQuickTools from '@/components/scott/ScottQuickTools';
import ScottGigOffersFeed from '@/components/scott/ScottGigOffersFeed';
import ScottBrainDump from '@/components/scott/ScottBrainDump';

/**
 * SCOTT'S ARTIST/CLIENT MANAGER
 * Mobile-first, simple, streamlined
 * For managing artists, clients, venues - gigs, tasks, communication
 */

function ScottManagerInner() {
    const [pinEntered, setPinEntered] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    const scott = useScottOffline();
    const [artists, setArtists] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [urgentTasks, setUrgentTasks] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [energyLevel, setEnergyLevel] = useState('high');
    const [celticModeEnabled, setCelticModeEnabled] = useState(true);

    // Check if PIN already stored
    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
        }
    }, []);

    // Load data from offline storage
    useEffect(() => {
        if (pinEntered) {
            const loadedArtists = scott.getArtists();
            const loadedEvents = scott.getEvents();
            const loadedTasks = scott.getTasks();
            const loadedInvoices = scott.getUnpaidInvoices();
            const loadedExpenses = scott.getExpenses();

            setArtists(loadedArtists);
            setUnpaidInvoices(loadedInvoices);
            setExpenses(loadedExpenses);

            const upcoming = loadedEvents.filter(e => new Date(e.date) >= new Date());
            setUpcomingEvents(upcoming);

            const urgent = loadedTasks.filter(t => 
                t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
            );
            setUrgentTasks(urgent);

            // Pull fresh data if online
            if (scott.isOnline) {
                scott.pullFromServer().then(() => {
                    setArtists(scott.getArtists());
                    setUnpaidInvoices(scott.getUnpaidInvoices());
                    setExpenses(scott.getExpenses());
                    setUpcomingEvents(scott.getEvents().filter(e => new Date(e.date) >= new Date()));
                    setUrgentTasks(scott.getTasks().filter(t => 
                        t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
                    ));
                });
            }
        }
    }, [pinEntered, scott.isOnline]);

    const handlePinSubmit = () => {
        if (pinInput === '1888') {
            localStorage.setItem('scott_access_pin', '1888');
            setPinEntered(true);
        }
    };

    const filteredArtists = artists.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // PIN ENTRY SCREEN
    if (!pinEntered) {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <Card className="bg-black border border-gray-800 rounded-xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <KingdomCrown8Bit size={48} animate={true} />
                        </div>
                        <h1 className="text-4xl font-black text-amber-400 mb-2" style={{ fontFamily: 'monospace' }}>SK</h1>
                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>OFFLINE-FIRST MGMT</p>
                    </div>
                    <Input
                        type="password"
                        placeholder="••••"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black border border-gray-800 rounded-lg text-white text-center text-2xl mb-4 focus:border-amber-500/50 transition-colors"
                        style={{ fontFamily: 'monospace' }}
                    />
                    <Button
                        onClick={handlePinSubmit}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm py-3 rounded-lg transition-all"
                        style={{ fontFamily: 'monospace' }}
                    >
                        ENTER
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <ScottFocusMode>
        <div className="min-h-screen bg-black p-4 pb-32">

        <ScottBrainDump />



            {/* HEADER - MINIMAL */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-900">
                <div className="flex items-center gap-2">
                    <KingdomCrown8Bit size={32} animate={true} />
                    <div>
                        <h1 className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>SK</h1>
                        <p className="text-[9px] text-gray-600 tracking-widest uppercase font-bold" style={{ fontFamily: 'monospace' }}>
                            {scott.isOnline ? '● ONLINE' : '● OFFLINE'}
                        </p>
                    </div>
                </div>
                <Link to={createPageUrl('ScottCalendar')} className="p-2 bg-black border border-gray-800 hover:border-cyan-500 rounded-lg transition-all">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </Link>
            </div>

            {/* LA TRIP - URGENT */}
            <Link to={createPageUrl('ScottLATrip')} className="block mb-6">
                <div className="bg-gradient-to-br from-amber-500 to-pink-600 p-6 rounded-xl border-4 border-amber-400 relative overflow-hidden animate-pulse" style={{ boxShadow: '0 8px 40px rgba(245, 158, 11, 0.6)' }}>
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded font-mono">
                        LIVE
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Plane className="w-8 h-8 text-white" />
                            <div>
                                <p className="text-white font-black text-xl mb-0.5" style={{ fontFamily: 'monospace' }}>LA TRIP</p>
                                <p className="text-white/80 text-xs font-mono">YES AND MAYBE • Dec 2024</p>
                            </div>
                        </div>
                        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 mb-2">
                            <p className="text-white text-xs font-mono">✓ Schedule • Checklist • Budget</p>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-xs font-mono">
                            <p>Producers • Gigs • LA Contacts</p>
                        </div>
                    </div>
                </div>
            </Link>

            {/* AI51 CHAT - THE STAR */}
            <Link to={createPageUrl('ScottAI51')} className="block mb-6">
                <div className="bg-gradient-to-br from-cyan-500 via-purple-600 to-green-500 p-6 rounded-xl border-4 border-black relative overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(6, 182, 212, 0.4)' }}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Brain className="w-8 h-8 text-white animate-pulse" />
                            <div>
                                <p className="text-white font-black text-xl mb-0.5" style={{ fontFamily: 'monospace' }}>AI51</p>
                                <p className="text-white/80 text-xs font-mono">Your right hand</p>
                            </div>
                        </div>
                        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-3">
                            <p className="text-white text-sm font-mono">"What's happening Scott?"</p>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-xs font-mono">
                            <p>→ Talk • Photo • Upload</p>
                        </div>
                    </div>
                </div>
            </Link>



            {/* WHAT'S NEXT - ADHD FRIENDLY */}
            <div className="mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl mb-3 border-2 border-purple-400">
                    <p className="text-white font-black text-sm font-mono mb-2">⚡ WHAT'S NEXT</p>
                    {urgentTasks.length > 0 ? (
                        <Link to={createPageUrl('ScottCalendar')} className="block bg-black/40 backdrop-blur-sm border border-white/20 rounded p-3">
                            <p className="text-red-400 font-bold text-xs font-mono">🔥 {urgentTasks.length} URGENT TASK{urgentTasks.length > 1 ? 'S' : ''}</p>
                            <p className="text-white/80 text-xs font-mono mt-1">Tap to handle →</p>
                        </Link>
                    ) : upcomingEvents.length > 0 ? (
                        <Link to={createPageUrl('ScottCalendar')} className="block bg-black/40 backdrop-blur-sm border border-white/20 rounded p-3">
                            <p className="text-cyan-400 font-bold text-xs font-mono">📅 {upcomingEvents.length} UPCOMING EVENT{upcomingEvents.length > 1 ? 'S' : ''}</p>
                            <p className="text-white/80 text-xs font-mono mt-1">Tap to prep →</p>
                        </Link>
                    ) : unpaidInvoices.length > 0 ? (
                        <Link to={createPageUrl('ScottInvoices')} className="block bg-black/40 backdrop-blur-sm border border-white/20 rounded p-3">
                            <p className="text-amber-400 font-bold text-xs font-mono">💰 {unpaidInvoices.length} UNPAID INVOICE{unpaidInvoices.length > 1 ? 'S' : ''}</p>
                            <p className="text-white/80 text-xs font-mono mt-1">Tap to chase →</p>
                        </Link>
                    ) : (
                        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded p-3">
                            <p className="text-green-400 font-bold text-xs font-mono">✓ ALL CLEAR</p>
                            <p className="text-white/80 text-xs font-mono mt-1">Nothing urgent</p>
                        </div>
                    )}
                </div>
            </div>

            {/* LIFE STATS - WHAT MATTERS */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-black border-2 border-amber-500 p-3 text-center">
                    <p className="text-2xl font-black text-amber-400 mb-0.5" style={{ fontFamily: 'monospace' }}>{artists.filter(a => a.type === 'band_crew' || a.relationship === 'excellent').length}</p>
                    <p className="text-[10px] text-gray-600 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>FAMILY</p>
                </div>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <div className="bg-black border-2 border-amber-500 hover:border-amber-400 p-3 text-center transition-all">
                        <p className="text-2xl font-black text-amber-400 mb-0.5" style={{ fontFamily: 'monospace' }}>{upcomingEvents.length}</p>
                        <p className="text-[10px] text-gray-600 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>PLANS</p>
                    </div>
                </Link>
                <div className="bg-black border-2 border-amber-500 p-3 text-center">
                    <p className="text-2xl font-black text-amber-400 mb-0.5" style={{ fontFamily: 'monospace' }}>{artists.length}</p>
                    <p className="text-[10px] text-gray-600 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>PEOPLE</p>
                </div>
            </div>

            {/* SEARCH - SIMPLE */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <Input
                        placeholder="Find artist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 py-2 bg-black border border-gray-800 rounded-lg text-white text-sm focus:border-cyan-500 transition-all"
                        style={{ fontFamily: 'monospace' }}
                    />
                </div>
            </div>



            {/* SMART ROSTER - AUTO-ORGANIZED */}
            <div className="space-y-6">
                {!searchQuery ? (
                    <>
                    {/* FAMILY - The people that matter */}
                    {(() => {
                        const family = filteredArtists.filter(a => a.type === 'band_crew' || a.relationship === 'excellent');
                        if (family.length === 0) return null;
                        return (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                                    <h2 className="text-sm font-bold text-white" style={{ fontFamily: 'monospace' }}>
                                        FAMILY ({family.length})
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {family.map(person => (
                                        <Link key={person.id} to={createPageUrl(`ScottArtist?id=${person.id}`)} className="block">
                                            <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm font-bold mb-0.5" style={{ fontFamily: 'monospace' }}>{person.name}</p>
                                                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                                            {person.type === 'band_crew' ? 'CREW' : person.type === 'artist' ? 'ARTIST' : person.type}
                                                        </p>
                                                    </div>
                                                    {person.phone && (
                                                        <a href={`tel:${person.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-amber-500/20 hover:bg-amber-500/30 rounded transition-colors">
                                                            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}

                    {/* EVERYONE ELSE - Still important */}
                    {(() => {
                        const others = filteredArtists.filter(a => a.type !== 'band_crew' && a.relationship !== 'excellent');
                        if (others.length === 0) return null;
                        return (
                            <div>
                                <div className="flex items-center gap-2 mb-3 mt-6">
                                    <h2 className="text-sm font-bold text-gray-400" style={{ fontFamily: 'monospace' }}>
                                        NETWORK ({others.length})
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {others.map(person => (
                                        <Link key={person.id} to={createPageUrl(`ScottArtist?id=${person.id}`)} className="block">
                                            <div className="bg-black border border-gray-800 hover:border-gray-700 rounded-lg p-3 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm font-bold mb-0.5" style={{ fontFamily: 'monospace' }}>{person.name}</p>
                                                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                                            {person.type === 'venue' ? 'VENUE' : person.type === 'client' ? 'CLIENT' : person.type}
                                                        </p>
                                                    </div>
                                                    {person.phone && (
                                                        <a href={`tel:${person.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-900 hover:bg-gray-800 rounded transition-colors">
                                                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                    </>
                ) : (
                    <div>
                        <h2 className="text-sm font-bold text-cyan-400 tracking-wider mb-4" style={{ fontFamily: 'monospace' }}>
                            FOUND ({filteredArtists.length})
                        </h2>
                        <div className="space-y-3">
                {filteredArtists.length === 0 ? (
                    <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                        <p className="text-gray-600 text-sm font-bold" style={{ fontFamily: 'monospace' }}>NO MATCHES</p>
                    </div>
                ) : (
                    filteredArtists.map(artist => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                            <motion.div whileTap={{ scale: 0.98 }} className="bg-black border border-gray-800 hover:border-cyan-500/50 rounded-xl p-4 transition-all cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-white text-base mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-cyan-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                            {artist.relationship === 'excellent' && <span className="text-green-400 text-xs">●</span>}
                                            {artist.relationship === 'good' && <span className="text-cyan-400 text-xs">●</span>}
                                            {artist.relationship === 'needs_work' && <span className="text-red-400 text-xs">●</span>}
                                        </div>
                                        {artist.genre && <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'monospace' }}>{artist.genre}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                )}
                </div>
                </div>
                )}

                {/* EMPTY STATE */}
                {!searchQuery && filteredArtists.length === 0 && (
                <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-600 text-sm font-bold mb-3" style={{ fontFamily: 'monospace' }}>NO PEOPLE YET</p>
                <p className="text-gray-700 text-xs mb-4" style={{ fontFamily: 'monospace' }}>Add family, crew, friends, anyone</p>
                <Link to={createPageUrl('ScottAddArtist')}>
                    <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs px-6 py-2 rounded-lg">
                        <Plus className="w-4 h-4 mr-1 inline" />
                        ADD FIRST PERSON
                    </button>
                </Link>
                </div>
                )}
                </div>

            {/* GIG OFFERS - INLINE SMART FEED */}
            <ScottGigOffersFeed />

            {/* TOOLS - COLOR CODED FOR ADHD */}
            <details className="mb-6">
                <summary className="cursor-pointer">
                    <h2 className="text-xs text-gray-600 font-bold mb-3 tracking-wider inline" style={{ fontFamily: 'monospace' }}>TOOLS ▼</h2>
                </summary>
                <div className="grid grid-cols-3 gap-2 mt-3">
                    <Link to={createPageUrl('ScottInvoices')} className="bg-gradient-to-br from-green-900/40 to-green-900/20 border-2 border-green-500/50 rounded-lg p-3 text-center hover:border-green-500 transition-all">
                        <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <p className="text-[9px] text-green-400 font-bold" style={{ fontFamily: 'monospace' }}>INVOICES</p>
                    </Link>
                    <Link to={createPageUrl('ScottExpenses')} className="bg-gradient-to-br from-red-900/40 to-red-900/20 border-2 border-red-500/50 rounded-lg p-3 text-center hover:border-red-500 transition-all">
                        <FileText className="w-5 h-5 text-red-400 mx-auto mb-1" />
                        <p className="text-[9px] text-red-400 font-bold" style={{ fontFamily: 'monospace' }}>EXPENSES</p>
                    </Link>
                    <Link to={createPageUrl('ScottPublishing')} className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-2 border-purple-500/50 rounded-lg p-3 text-center hover:border-purple-500 transition-all">
                        <Music className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                        <p className="text-[9px] text-purple-400 font-bold" style={{ fontFamily: 'monospace' }}>PUBLISH</p>
                    </Link>
                    <Link to={createPageUrl('ScottGigPacks')} className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-2 border-cyan-500/50 rounded-lg p-3 text-center hover:border-cyan-500 transition-all">
                        <FileText className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-[9px] text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>GIG PACKS</p>
                    </Link>
                    <Link to={createPageUrl('ScottVisas')} className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-2 border-blue-500/50 rounded-lg p-3 text-center hover:border-blue-500 transition-all">
                        <Globe className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                        <p className="text-[9px] text-blue-400 font-bold" style={{ fontFamily: 'monospace' }}>VISAS</p>
                    </Link>
                    <Link to={createPageUrl('ScottMerch')} className="bg-gradient-to-br from-amber-900/40 to-amber-900/20 border-2 border-amber-500/50 rounded-lg p-3 text-center hover:border-amber-500 transition-all">
                        <Briefcase className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-amber-400 font-bold" style={{ fontFamily: 'monospace' }}>MERCH</p>
                    </Link>
                    <Link to={createPageUrl('ScottMedia')} className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-2 border-pink-500/50 rounded-lg p-3 text-center hover:border-pink-500 transition-all">
                        <Camera className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                        <p className="text-[9px] text-pink-400 font-bold" style={{ fontFamily: 'monospace' }}>MEDIA</p>
                    </Link>
                </div>
            </details>

            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t border-gray-900 text-center mb-32">
                <p className="text-gray-800 text-xs mb-2" style={{ fontFamily: 'monospace' }}>Kingdom Management</p>
            </div>

            {/* QUICK TOOLS - ONE BUTTON */}
            <ScottQuickTools onComplete={() => window.location.reload()} />

            </div>
            </ScottFocusMode>
            );
            }

            export default function ScottManager() {
            return (
            <ScottOfflineProvider>
            <ScottManagerInner />
            </ScottOfflineProvider>
            );
            }