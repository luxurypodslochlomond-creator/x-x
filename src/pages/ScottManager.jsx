import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Wifi, WifiOff, RefreshCw, Brain } from 'lucide-react';
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
import ScottVoiceCommand from '@/components/scott/ScottVoiceCommand';
import ScottMorningBriefing from '@/components/scott/ScottMorningBriefing';
import ScottFocusMode from '@/components/scott/ScottFocusMode';
import ScottContextMemory from '@/components/scott/ScottContextMemory';
import ScottDidIDoThis from '@/components/scott/ScottDidIDoThis';

/**
 * SCOTT'S ARTIST/CLIENT MANAGER
 * Mobile-first, simple, streamlined
 * For managing artists, clients, venues - gigs, tasks, communication
 */

function ScottManagerInner() {
    const [pinEntered, setPinEntered] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showOfflineExplainer, setShowOfflineExplainer] = useState(false);
    
    const scott = useScottOffline();
    const [artists, setArtists] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [urgentTasks, setUrgentTasks] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [energyLevel, setEnergyLevel] = useState('high');
    const [celticModeEnabled, setCelticModeEnabled] = useState(true);

    // Check if PIN already stored + show offline explainer first time
    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            
            // Show offline explainer on first launch
            const hasSeenOfflineExplainer = localStorage.getItem('scott_offline_explainer_seen');
            if (!hasSeenOfflineExplainer) {
                setShowOfflineExplainer(true);
            }
        }
    }, []);
    
    const handleDismissOfflineExplainer = () => {
        localStorage.setItem('scott_offline_explainer_seen', 'true');
        setShowOfflineExplainer(false);
    };

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
        <div className="min-h-screen bg-black p-4 pb-20">

            {/* MORNING BRIEFING */}
            <ScottMorningBriefing />

            {/* CONTEXT MEMORY */}
            <ScottContextMemory />

            {/* OFFLINE EXPLAINER MODAL */}
            {showOfflineExplainer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-black border border-amber-500/50 rounded-xl p-8 max-w-md w-full"
                    >
                        <div className="text-center mb-6">
                            <KingdomCrown8Bit size={64} animate={true} />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-400 text-center mb-4" style={{ fontFamily: 'monospace' }}>
                            100% OFFLINE
                        </h2>
                        <div className="space-y-3 mb-6 text-center">
                            <p className="text-white text-sm" style={{ fontFamily: 'monospace' }}>
                                Works in basements
                            </p>
                            <p className="text-white text-sm" style={{ fontFamily: 'monospace' }}>
                                Works in vans
                            </p>
                            <p className="text-white text-sm" style={{ fontFamily: 'monospace' }}>
                                Works at festivals
                            </p>
                            <p className="text-white text-sm" style={{ fontFamily: 'monospace' }}>
                                Works anywhere
                            </p>
                            <div className="h-px bg-gray-800 my-4"></div>
                            <p className="text-gray-500 text-xs" style={{ fontFamily: 'monospace' }}>
                                Auto-syncs when signal returns
                            </p>
                        </div>
                        <Button
                            onClick={handleDismissOfflineExplainer}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg"
                            style={{ fontFamily: 'monospace' }}
                        >
                            LET'S GO
                        </Button>
                    </motion.div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-amber-500/30">
                <div className="flex items-center gap-3">
                    <KingdomCrown8Bit size={40} animate={true} />
                    <div>
                        <h1 className="text-4xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>SK</h1>
                        <p className="text-[10px] text-gray-500 tracking-widest uppercase font-bold" style={{ fontFamily: 'monospace' }}>
                            {scott.isOnline ? '● ONLINE' : '● OFFLINE'}
                        </p>
                    </div>
                </div>
                <Link to={createPageUrl('ScottCalendar')} className="p-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-all">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </Link>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-black border-2 border-amber-500/50 rounded-lg p-4 text-center">
                    <p className="text-4xl font-black text-amber-400 mb-1" style={{ fontFamily: 'monospace' }}>{artists.length}</p>
                    <p className="text-xs text-gray-400 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>ROSTER</p>
                </div>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <div className="bg-black border-2 border-cyan-500/50 rounded-lg p-4 text-center hover:border-cyan-500 transition-all">
                        <p className="text-4xl font-black text-cyan-400 mb-1" style={{ fontFamily: 'monospace' }}>{upcomingEvents.length}</p>
                        <p className="text-xs text-gray-400 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>EVENTS</p>
                    </div>
                </Link>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <div className="bg-black border-2 border-red-500/50 rounded-lg p-4 text-center hover:border-red-500 transition-all">
                        <p className="text-4xl font-black text-red-400 mb-1" style={{ fontFamily: 'monospace' }}>{urgentTasks.length}</p>
                        <p className="text-xs text-gray-400 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>URGENT</p>
                    </div>
                </Link>
            </div>

            {/* AI51 - YOUR MUCKER */}
            <Link to={createPageUrl('TalkToAI51')}>
                <div className="bg-black border-2 border-cyan-500 rounded-lg p-5 mb-6 hover:border-cyan-400 transition-all">
                    <div className="flex items-start gap-4">
                        <Brain className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>AI51 - YOUR MUCKER</h3>
                            <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: 'monospace' }}>
                                24/7 loyal AI bro. Zero ego. Covers everything.
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="bg-black border border-gray-800 p-2 rounded">
                                    <p className="text-xs text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>⚖️ LEGAL</p>
                                    <p className="text-[10px] text-gray-600" style={{ fontFamily: 'monospace' }}>Contracts, rights</p>
                                </div>
                                <div className="bg-black border border-gray-800 p-2 rounded">
                                    <p className="text-xs text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>🧠 DECISIONS</p>
                                    <p className="text-[10px] text-gray-600" style={{ fontFamily: 'monospace' }}>Think through</p>
                                </div>
                                <div className="bg-black border border-gray-800 p-2 rounded">
                                    <p className="text-xs text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>💰 MONEY</p>
                                    <p className="text-[10px] text-gray-600" style={{ fontFamily: 'monospace' }}>Fair deals</p>
                                </div>
                                <div className="bg-black border border-gray-800 p-2 rounded">
                                    <p className="text-xs text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>🎵 MUSIC BIZ</p>
                                    <p className="text-[10px] text-gray-600" style={{ fontFamily: 'monospace' }}>Publishing</p>
                                </div>
                            </div>
                            <p className="text-cyan-400 text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                                → TAP TO TALK
                            </p>
                        </div>
                    </div>
                </div>
            </Link>

            {/* ONE-SENTENCE COMMAND */}
            <ScottOneSentence 
                onCommandComplete={() => {
                    // Reload data after command
                    window.location.reload();
                }}
            />

            {/* VISUAL TIMELINE */}
            <ScottTimeline />

            {/* QUICK ACTIONS FIRST */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Link to={createPageUrl('ScottAddArtist')} className="block">
                    <div className="bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-lg text-center transition-all border-2 border-amber-400" style={{ fontFamily: 'monospace' }}>
                        <Plus className="w-5 h-5 mx-auto mb-1" />
                        ADD
                    </div>
                </Link>
                <Link to={createPageUrl('TalkToAI51')} className="block">
                    <div className="bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-lg text-center transition-all border-2 border-cyan-400" style={{ fontFamily: 'monospace' }}>
                        <Brain className="w-5 h-5 mx-auto mb-1" />
                        AI51
                    </div>
                </Link>
            </div>

            {/* SMART SEARCH */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                        placeholder="Search roster..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-cyan-500 transition-all"
                        style={{ fontFamily: 'monospace' }}
                    />
                </div>
                {searchQuery && (
                    <p className="text-xs text-gray-500 font-mono mt-2">
                        {filteredArtists.length} results
                    </p>
                )}
            </div>



            {/* SMART ROSTER - AUTO-ORGANIZED */}
            <div className="space-y-6">
                {!searchQuery ? (
                    <>
                    {/* ACTIVE - Working with right now */}
                    {(() => {
                        const active = filteredArtists.filter(a => a.relationship === 'excellent' || a.relationship === 'good');
                        if (active.length === 0) return null;
                        return (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                    <h2 className="text-sm font-bold text-white" style={{ fontFamily: 'monospace' }}>
                                        ACTIVE NOW ({active.length})
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {active.map(artist => (
                                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                                            <div className="bg-black border-2 border-green-500/50 hover:border-green-500 rounded-lg p-4 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm font-bold mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                                        <p className="text-gray-500 text-xs" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                                    </div>
                                                    {artist.phone && (
                                                        <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors">
                                                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
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

                    {/* EVERYONE ELSE */}
                    {(() => {
                        const others = filteredArtists.filter(a => a.relationship !== 'excellent' && a.relationship !== 'good');
                        if (others.length === 0) return null;
                        return (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <h2 className="text-sm font-bold text-gray-400" style={{ fontFamily: 'monospace' }}>
                                        ROSTER ({others.length})
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {others.map(artist => (
                                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                                            <div className="bg-black border-2 border-gray-800 hover:border-gray-700 rounded-lg p-4 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm font-bold mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                                        <p className="text-gray-500 text-xs" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                                    </div>
                                                    {artist.phone && (
                                                        <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
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
                            SEARCH RESULTS ({filteredArtists.length})
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
                <p className="text-gray-600 text-sm font-bold mb-3" style={{ fontFamily: 'monospace' }}>ROSTER EMPTY</p>
                <p className="text-gray-700 text-xs mb-4" style={{ fontFamily: 'monospace' }}>Tap ADD to start</p>
                <Link to={createPageUrl('ScottAddArtist')}>
                    <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs px-6 py-2 rounded-lg">
                        <Plus className="w-4 h-4 mr-1 inline" />
                        ADD FIRST CONTACT
                    </button>
                </Link>
                </div>
                )}
                </div>

            {/* MORE TOOLS - COLLAPSED */}
            <details className="mb-6">
                <summary className="cursor-pointer bg-black border-2 border-gray-800 rounded-lg p-4 text-center hover:border-gray-700 transition-all">
                    <span className="text-sm text-gray-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>MORE TOOLS</span>
                </summary>
                <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                        <Link to={createPageUrl('ScottInvoices')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">💰</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>INVOICES</p>
                        </Link>
                        <Link to={createPageUrl('ScottExpenses')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">📝</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>EXPENSES</p>
                        </Link>
                        <Link to={createPageUrl('ScottVisas')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">✈️</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>VISAS</p>
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <Link to={createPageUrl('ScottPublishing')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">📚</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>PUBLISHING</p>
                        </Link>
                        <Link to={createPageUrl('ScottGigOffers')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">📧</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>GIG OFFERS</p>
                        </Link>
                        <Link to={createPageUrl('ScottMerch')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">👕</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>MERCH</p>
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <Link to={createPageUrl('ScottGuestList')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">📋</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>GUEST LIST</p>
                        </Link>
                        <Link to={createPageUrl('ScottAccommodation')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">🏨</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>HOTELS</p>
                        </Link>
                        <Link to={createPageUrl('ScottProducers')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">🎧</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>PRODUCERS</p>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Link to={createPageUrl('ScottMedia')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">📸</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>MEDIA</p>
                        </Link>
                        <Link to={createPageUrl('ScottFeatureRequests')} className="bg-black border border-gray-800 rounded p-3 text-center hover:border-cyan-500 transition-all">
                            <p className="text-2xl mb-1">💡</p>
                            <p className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'monospace' }}>IDEAS</p>
                        </Link>
                    </div>
                </div>
            </details>

            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t border-gray-900 text-center">
                <p className="text-gray-800 text-xs mb-2" style={{ fontFamily: 'monospace' }}>Kingdom Management</p>
            </div>

            {/* DID I DO THIS? */}
            <ScottDidIDoThis />

            {/* FLOATING QUICK ACTIONS */}
            <ScottQuickActions />

            {/* VOICE COMMAND */}
            <ScottVoiceCommand onCommandComplete={() => window.location.reload()} />
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