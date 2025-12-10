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

            {/* HEADER - SHARP */}
            <div className={`flex items-center justify-between mb-6 p-4 -mx-4 border-b-4 ${scott.isOnline ? 'border-cyan-500 bg-cyan-500/5' : 'border-amber-500 bg-amber-500/5'}`}>
                <div className="flex items-center gap-3">
                    <KingdomCrown8Bit size={40} animate={true} />
                    <div>
                        <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>SK</h1>
                        <p className="text-[11px] text-white tracking-widest uppercase font-bold" style={{ fontFamily: 'monospace' }}>
                            {scott.isOnline ? '● ONLINE' : '● OFFLINE'}
                        </p>
                    </div>
                </div>
                <Link to={createPageUrl('ScottCalendar')} className="p-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl transition-all" style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}>
                    <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </Link>
            </div>

            {/* QUICK STATS - SHARP */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <motion.div whileTap={{ scale: 0.95 }}>
                    <div className="bg-black border-4 border-amber-500 rounded-2xl p-5 text-center" style={{ boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}>
                        <p className="text-6xl font-black text-amber-400 mb-2" style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>{artists.length}</p>
                        <p className="text-sm text-white tracking-wider font-black" style={{ fontFamily: 'monospace' }}>ROSTER</p>
                    </div>
                </motion.div>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border-4 border-cyan-500 rounded-2xl p-5 text-center hover:border-cyan-400 transition-all" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}>
                            <p className="text-6xl font-black text-cyan-400 mb-2" style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>{upcomingEvents.length}</p>
                            <p className="text-sm text-white tracking-wider font-black" style={{ fontFamily: 'monospace' }}>EVENTS</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border-4 border-red-500 rounded-2xl p-5 text-center hover:border-red-400 transition-all" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
                            <p className="text-6xl font-black text-red-400 mb-2" style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>{urgentTasks.length}</p>
                            <p className="text-sm text-white tracking-wider font-black" style={{ fontFamily: 'monospace' }}>URGENT</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* CELTIC MODE ☘️ */}
            <ScottCelticMode 
                isEnabled={celticModeEnabled}
                onToggle={setCelticModeEnabled}
            />

            {/* ENERGY MODE - ADHD BRAIN BATTERY */}
            <ScottEnergyMode onEnergyChange={setEnergyLevel} />

            {/* AI51 - YOUR MUCKER */}
            <Link to={createPageUrl('TalkToAI51')}>
                <motion.div whileTap={{ scale: 0.98 }} className="bg-gradient-to-r from-cyan-900/60 to-purple-900/60 border-4 border-cyan-400 rounded-2xl p-6 mb-6" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}>
                    <div className="flex items-start gap-4">
                        <Brain className="w-10 h-10 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>AI51 - YOUR MUCKER</h3>
                            <p className="text-cyan-300 text-sm font-bold mb-3" style={{ fontFamily: 'monospace' }}>
                                24/7 loyal AI bro. Zero ego. Covers everything.
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="bg-black/40 p-2 rounded border border-cyan-500/30">
                                    <p className="text-xs text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>⚖️ LEGAL</p>
                                    <p className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>Contracts, rights, deals</p>
                                </div>
                                <div className="bg-black/40 p-2 rounded border border-purple-500/30">
                                    <p className="text-xs text-purple-400 font-bold" style={{ fontFamily: 'monospace' }}>🧠 DECISIONS</p>
                                    <p className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>Think through offers</p>
                                </div>
                                <div className="bg-black/40 p-2 rounded border border-green-500/30">
                                    <p className="text-xs text-green-400 font-bold" style={{ fontFamily: 'monospace' }}>💰 MONEY</p>
                                    <p className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>Fair deals, red flags</p>
                                </div>
                                <div className="bg-black/40 p-2 rounded border border-amber-500/30">
                                    <p className="text-xs text-amber-400 font-bold" style={{ fontFamily: 'monospace' }}>🎵 MUSIC BIZ</p>
                                    <p className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>Publishing, splits</p>
                                </div>
                            </div>
                            <p className="text-white text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                                → TAP TO TALK
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Link>

            {/* ONE-SENTENCE COMMAND */}
            <ScottOneSentence 
                onCommandComplete={() => {
                    // Reload data after command
                    window.location.reload();
                }}
            />

            {/* VISUAL TIMELINE - EVERYTHING AT A GLANCE */}
            <ScottTimeline />

            {/* MONEY + TRAVEL - CLEAN */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <Link to={createPageUrl('ScottInvoices')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-green-500/30 rounded-xl p-4 text-center hover:border-green-500/60 transition-all">
                            <p className="text-4xl font-black text-green-400 mb-2" style={{ fontFamily: 'monospace' }}>{unpaidInvoices.length}</p>
                            <p className="text-xs text-green-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>INVOICES</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottExpenses')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-500/60 transition-all">
                            <p className="text-4xl font-black text-purple-400 mb-2" style={{ fontFamily: 'monospace' }}>{expenses.length}</p>
                            <p className="text-xs text-purple-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>EXPENSES</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottVisas')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                            <p className="text-4xl font-black text-cyan-400 mb-2" style={{ fontFamily: 'monospace' }}>✈️</p>
                            <p className="text-xs text-cyan-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>VISAS</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* INDUSTRY TOOLS */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <Link to={createPageUrl('ScottPublishing')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-purple-500/30 rounded-xl p-3 text-center hover:border-purple-500/60 transition-all">
                            <p className="text-2xl mb-1">📚</p>
                            <p className="text-xs text-purple-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>PUBLISHING</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottGigOffers')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-cyan-500/30 rounded-xl p-3 text-center hover:border-cyan-500/60 transition-all">
                            <p className="text-2xl mb-1">📧</p>
                            <p className="text-xs text-cyan-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>GIG OFFERS</p>
                        </div>
                    </motion.div>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <Link to={createPageUrl('ScottMerch')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-purple-500/30 rounded-xl p-3 text-center hover:border-purple-500/60 transition-all">
                            <p className="text-2xl mb-1">👕</p>
                            <p className="text-xs text-purple-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>MERCH</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottGuestList')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-cyan-500/30 rounded-xl p-3 text-center hover:border-cyan-500/60 transition-all">
                            <p className="text-2xl mb-1">📋</p>
                            <p className="text-xs text-cyan-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>GUEST LIST</p>
                        </div>
                    </motion.div>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
                <Link to={createPageUrl('ScottAccommodation')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-cyan-500/30 rounded-xl p-3 text-center hover:border-cyan-500/60 transition-all">
                            <p className="text-2xl mb-1">🏨</p>
                            <p className="text-xs text-cyan-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>HOTELS</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottProducers')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-purple-500/30 rounded-xl p-3 text-center hover:border-purple-500/60 transition-all">
                            <p className="text-2xl mb-1">🎧</p>
                            <p className="text-xs text-purple-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>PRODUCERS</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottMedia')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-pink-500/30 rounded-xl p-3 text-center hover:border-pink-500/60 transition-all">
                            <p className="text-2xl mb-1">📸</p>
                            <p className="text-xs text-pink-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>MEDIA</p>
                        </div>
                    </motion.div>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Link to={createPageUrl('ScottFeatureRequests')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-black border border-amber-500/30 rounded-xl p-3 text-center hover:border-amber-500/60 transition-all">
                            <p className="text-2xl mb-1">💡</p>
                            <p className="text-xs text-amber-500 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>IDEAS</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('TalkToAI51')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-gradient-to-r from-cyan-900/60 to-purple-900/60 border-2 border-cyan-500 p-3 text-center hover:border-cyan-400 transition-all">
                            <p className="text-2xl mb-1">⚖️</p>
                            <p className="text-xs text-cyan-400 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>LEGAL AI</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* SMART SEARCH - SHARP */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-cyan-400" />
                    <Input
                        placeholder="SEARCH..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-14 py-4 bg-black border-4 border-cyan-500 rounded-xl text-white text-lg font-bold placeholder:text-cyan-500/50 focus:border-cyan-400 transition-all"
                        style={{ fontFamily: 'monospace', boxShadow: searchQuery ? '0 0 30px rgba(6, 182, 212, 0.4)' : 'none' }}
                    />
                </div>
                {searchQuery && (
                    <p className="text-sm text-cyan-400 font-mono font-bold mt-3 text-center">
                        ✓ {filteredArtists.length} FOUND
                    </p>
                )}
            </div>

            {/* QUICK ACTIONS - SHARP */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <Link to={createPageUrl('ScottAddArtist')} className="block">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-5 rounded-xl text-lg border-4 border-amber-400" style={{ fontFamily: 'monospace', boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}>
                            <Plus className="w-6 h-6 mr-2" />
                            ADD
                        </Button>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('TalkToAI51')} className="block">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-5 rounded-xl text-lg border-4 border-cyan-400" style={{ fontFamily: 'monospace', boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
                            <Brain className="w-6 h-6 mr-2" />
                            LEGAL AI
                        </Button>
                    </motion.div>
                </Link>
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
                                <div className="flex items-center gap-3 mb-4 p-3 bg-green-500/10 border-l-4 border-green-400 rounded-r-xl">
                                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 15px rgba(74, 222, 128, 0.8)' }}></div>
                                    <h2 className="text-base font-black text-white tracking-wider" style={{ fontFamily: 'monospace' }}>
                                        ACTIVE NOW ({active.length})
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {active.map(artist => (
                                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                                            <motion.div whileTap={{ scale: 0.98 }} className="bg-black border-4 border-green-500 hover:border-green-400 rounded-2xl p-5 transition-all cursor-pointer" style={{ boxShadow: '0 0 25px rgba(74, 222, 128, 0.2)' }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-base mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-green-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                                            <span className="text-green-400 text-xs">●</span>
                                                        </div>
                                                        {artist.genre && <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'monospace' }}>{artist.genre}</p>}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {artist.phone && (
                                                            <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors">
                                                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
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
                                <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 border-l-4 border-white rounded-r-xl">
                                    <h2 className="text-base font-black text-white tracking-wider" style={{ fontFamily: 'monospace' }}>
                                        ROSTER ({others.length})
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {others.map(artist => (
                                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                                            <motion.div whileTap={{ scale: 0.98 }} className="bg-black border-4 border-white/20 hover:border-amber-500 rounded-2xl p-5 transition-all cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-base mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-amber-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                                            {artist.relationship === 'needs_work' && <span className="text-red-400 text-xs">●</span>}
                                                        </div>
                                                        {artist.genre && <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'monospace' }}>{artist.genre}</p>}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {artist.phone && (
                                                            <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors">
                                                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
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

            {/* POWER TOOLS */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Link to={createPageUrl('ScottTravelMode')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 p-4 text-center hover:border-cyan-400 transition-all">
                            <p className="text-3xl mb-1">✈️</p>
                            <p className="text-xs text-cyan-400 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>TRAVEL MODE</p>
                        </div>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottFinancialDashboard')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <div className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500 p-4 text-center hover:border-green-400 transition-all">
                            <p className="text-3xl mb-1">💰</p>
                            <p className="text-xs text-green-400 tracking-wider font-bold" style={{ fontFamily: 'monospace' }}>MONEY</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

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