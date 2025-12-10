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
                <Card className="bg-black border border-amber-500/20 p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Gill51Sunglasses8Bit size={48} animate={true} />
                            <KingdomCrown8Bit size={56} animate={true} />
                            <Gill51Sunglasses8Bit size={48} animate={true} />
                        </div>
                        <h1 className="text-5xl font-black text-amber-400 mb-3 tracking-tight" style={{ fontFamily: 'monospace' }}>SK51</h1>
                        <div className="h-px bg-amber-500/20 mb-3"></div>
                        <p className="text-gray-600 text-xs tracking-widest" style={{ fontFamily: 'monospace' }}>ARTIST MANAGER</p>
                        </div>
                        <Input
                        type="password"
                        placeholder="••••"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black border border-gray-800 text-white text-center text-2xl mb-4 focus:border-amber-500/50 transition-colors"
                        style={{ fontFamily: 'monospace' }}
                    />
                    <Button
                        onClick={handlePinSubmit}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black text-sm py-4 tracking-wider transition-all"
                        style={{ fontFamily: 'monospace', boxShadow: '0 0 15px rgba(245, 158, 11, 0.2)' }}
                    >
                        ENTER
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 pb-20">

            {/* OFFLINE EXPLAINER MODAL */}
            {showOfflineExplainer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-black border-2 border-amber-500 p-8 max-w-md w-full"
                        style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                    >
                        <div className="text-center mb-6">
                            <KingdomCrown8Bit size={64} animate={true} />
                        </div>
                        <h2 className="text-2xl font-black text-amber-400 text-center mb-4 tracking-tight" style={{ fontFamily: 'monospace' }}>
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
                            <div className="h-px bg-amber-500/20 my-4"></div>
                            <p className="text-gray-500 text-xs" style={{ fontFamily: 'monospace' }}>
                                Auto-syncs when signal returns
                            </p>
                        </div>
                        <Button
                            onClick={handleDismissOfflineExplainer}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-4 tracking-wider"
                            style={{ fontFamily: 'monospace', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)' }}
                        >
                            LET'S GO
                        </Button>
                    </motion.div>
                </div>
            )}

            {/* HEADER - PREMIUM 8-BIT */}
            <div className="mb-6 pb-6 border-b-4 border-amber-500" style={{ boxShadow: '0 4px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                        {/* LEGACY BADGE */}
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                <Gill51Sunglasses8Bit size={28} animate={false} />
                            </motion.div>
                            <div className="h-8 w-px bg-amber-500/30"></div>
                            <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                                <KingdomCrown8Bit size={40} animate={false} />
                            </motion.div>
                            <div className="h-8 w-px bg-amber-500/30"></div>
                            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                                <Gill51Sunglasses8Bit size={28} animate={false} />
                            </motion.div>
                        </div>
                        
                        {/* TITLE */}
                        <div className="text-center">
                            <h1 className="text-4xl font-black text-amber-400 tracking-tighter leading-none mb-1" style={{ 
                                fontFamily: 'monospace',
                                textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
                            }}>SK51</h1>
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-2" style={{ imageRendering: 'pixelated' }}></div>
                            <p className="text-[11px] text-cyan-400 tracking-[0.2em] font-black" style={{ fontFamily: 'monospace' }}>AI51 + SK51 + BRO51</p>
                            <p className="text-[8px] text-gray-600 tracking-widest mt-1" style={{ fontFamily: 'monospace' }}>THE TEAM</p>
                        </div>
                    </div>
                </div>

                {/* STATUS BAR */}
                <div className="flex items-center justify-between mt-4 px-2">
                    <div className="flex items-center gap-2">
                        {scott.isOnline ? (
                            <div className="flex items-center gap-2 bg-green-900/30 border-2 border-green-500 px-3 py-1" style={{ imageRendering: 'pixelated' }} title="LIVE = Connected to internet, auto-syncing">
                                <Wifi className="w-3 h-3 text-green-400" />
                                <span className="text-[9px] text-green-400 font-black tracking-wider" style={{ fontFamily: 'monospace' }}>LIVE</span>
                                {scott.isSyncing && <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />}
                                {scott.pendingCount > 0 && (
                                    <span className="text-[9px] text-amber-400 font-black" style={{ fontFamily: 'monospace' }}>
                                        +{scott.pendingCount}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-amber-900/30 border-2 border-amber-500 px-3 py-1" style={{ imageRendering: 'pixelated' }} title="OFFLINE = No internet, saves locally">
                                <WifiOff className="w-3 h-3 text-amber-400" />
                                <span className="text-[9px] text-amber-400 font-black tracking-wider" style={{ fontFamily: 'monospace' }}>OFFLINE</span>
                            </div>
                        )}
                    </div>
                    <Link to={createPageUrl('ScottCalendar')} className="bg-cyan-900/30 border-2 border-cyan-500 hover:bg-cyan-500/20 p-2 transition-all active:scale-95" style={{ imageRendering: 'pixelated' }}>
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </Link>
                </div>
            </div>

            {/* QUICK STATS - 8-BIT ARCADE */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <motion.div whileTap={{ scale: 0.95 }}>
                    <Card className="bg-gradient-to-b from-amber-900/20 to-black border-4 border-amber-500 p-4 text-center relative overflow-hidden" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>
                        <p className="text-5xl font-black text-amber-400 mb-2 relative" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>{artists.length}</p>
                        <p className="text-[10px] text-amber-500 tracking-[0.2em] font-black relative" style={{ fontFamily: 'monospace' }}>ROSTER</p>
                    </Card>
                </motion.div>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Card className="bg-gradient-to-b from-cyan-900/20 to-black border-4 border-cyan-500 p-4 text-center hover:border-cyan-400 transition-all relative overflow-hidden" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>
                            <p className="text-5xl font-black text-cyan-400 mb-2 relative" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>{upcomingEvents.length}</p>
                            <p className="text-[10px] text-cyan-500 tracking-[0.2em] font-black relative" style={{ fontFamily: 'monospace' }}>EVENTS</p>
                        </Card>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Card className="bg-gradient-to-b from-red-900/20 to-black border-4 border-red-500 p-4 text-center hover:border-red-400 transition-all relative overflow-hidden" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>
                            <p className="text-5xl font-black text-red-400 mb-2 relative" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>{urgentTasks.length}</p>
                            <p className="text-[10px] text-red-500 tracking-[0.2em] font-black relative" style={{ fontFamily: 'monospace' }}>URGENT</p>
                        </Card>
                    </motion.div>
                </Link>
            </div>

            {/* MONEY SECTION - 8-BIT ARCADE */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Link to={createPageUrl('ScottInvoices')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Card className="bg-gradient-to-b from-green-900/20 to-black border-4 border-green-500 p-4 text-center hover:border-green-400 transition-all relative overflow-hidden" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>
                            <p className="text-5xl font-black text-green-400 mb-2 relative" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>{unpaidInvoices.length}</p>
                            <p className="text-[10px] text-green-500 tracking-[0.2em] font-black relative" style={{ fontFamily: 'monospace' }}>INVOICES</p>
                        </Card>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottExpenses')} className="w-full">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Card className="bg-gradient-to-b from-purple-900/20 to-black border-4 border-purple-500 p-4 text-center hover:border-purple-400 transition-all relative overflow-hidden" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>
                            <p className="text-5xl font-black text-purple-400 mb-2 relative" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>{expenses.length}</p>
                            <p className="text-[10px] text-purple-500 tracking-[0.2em] font-black relative" style={{ fontFamily: 'monospace' }}>EXPENSES</p>
                        </Card>
                    </motion.div>
                </Link>
            </div>

            {/* SEARCH - 8-BIT ARCADE */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" strokeWidth={3} />
                    <Input
                        placeholder="SEARCH ROSTER..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 py-6 bg-black border-4 border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500 transition-all text-sm tracking-wider font-black uppercase"
                        style={{ fontFamily: 'monospace', boxShadow: 'inset 0 4px 0 rgba(0,0,0,0.5)' }}
                    />
                </div>
            </div>

            {/* QUICK ACTIONS - 8-BIT ARCADE */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Link to={createPageUrl('ScottAddArtist')} className="block">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-black py-4 tracking-[0.2em] border-4 border-amber-300" style={{ fontFamily: 'monospace', boxShadow: '4px 4px 0 rgba(0,0,0,0.8)', textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>
                            <Plus className="w-5 h-5 mr-2" strokeWidth={4} />
                            ADD
                        </Button>
                    </motion.div>
                </Link>
                <Link to={createPageUrl('ScottAICoordinatorArchitecture')} className="block">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gradient-to-b from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-black py-4 tracking-[0.2em] border-4 border-cyan-300" style={{ fontFamily: 'monospace', boxShadow: '4px 4px 0 rgba(0,0,0,0.8)', textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
                            <Brain className="w-5 h-5 mr-2" strokeWidth={3} />
                            AI
                        </Button>
                    </motion.div>
                </Link>
            </div>



            {/* ARTISTS/CLIENTS LIST */}
            <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border-l-4 border-amber-500 pl-3 py-2 mb-4">
                    <h2 className="text-sm font-black text-amber-400 tracking-[0.2em]" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>
                        {searchQuery ? `RESULTS (${filteredArtists.length})` : 'ROSTER'}
                    </h2>
                </div>
                
                {filteredArtists.length === 0 ? (
                    <Card className="bg-gradient-to-b from-gray-900 to-black border-4 border-gray-800 p-8 text-center" style={{ boxShadow: 'inset 0 4px 0 rgba(0,0,0,0.5)' }}>
                        {searchQuery ? (
                            <p className="text-gray-600 text-sm tracking-[0.2em] font-black mb-2" style={{ fontFamily: 'monospace' }}>NO MATCHES</p>
                        ) : (
                            <>
                                <p className="text-gray-600 text-sm tracking-[0.2em] font-black mb-3" style={{ fontFamily: 'monospace' }}>ROSTER EMPTY</p>
                                <p className="text-gray-700 text-[10px] mb-4" style={{ fontFamily: 'monospace' }}>Tap ADD below to start</p>
                                <Link to={createPageUrl('ScottAddArtist')}>
                                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-black text-xs px-6 py-2" style={{ fontFamily: 'monospace' }}>
                                        <Plus className="w-4 h-4 mr-1" />
                                        ADD FIRST CONTACT
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Card>
                ) : (
                    filteredArtists.map(artist => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-b from-gray-900/50 to-black border-4 border-gray-800 hover:border-amber-500/50 p-4 transition-all cursor-pointer relative overflow-hidden"
                                style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-white text-base mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                        <div className="flex items-center gap-2">
                                           <p className="text-amber-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                           {artist.relationship === 'excellent' && <span className="text-green-400 text-xs">●</span>}
                                           {artist.relationship === 'good' && <span className="text-cyan-400 text-xs">●</span>}
                                           {artist.relationship === 'needs_work' && <span className="text-red-400 text-xs">●</span>}
                                        </div>
                                        {artist.genre && (
                                           <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'monospace' }}>{artist.genre}</p>
                                        )}
                                        </div>
                                        <div className="flex gap-2">
                                        {artist.phone && (
                                           <a href={`tel:${artist.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors">
                                               <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                           </a>
                                        )}
                                        <button 
                                           onClick={(e) => {
                                               e.stopPropagation();
                                               e.preventDefault();
                                               const text = `${artist.name}\n${artist.phone || ''}\n${artist.email || ''}`;
                                               navigator.clipboard.writeText(text);
                                               alert('Contact copied!');
                                           }}
                                           className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded transition-colors"
                                        >
                                           <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                        </button>
                                        </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t border-gray-900">
                <div className="flex items-center justify-center gap-4 mb-3">
                    <Gill51Sunglasses8Bit size={32} animate={true} />
                    <KingdomCrown8Bit size={36} animate={true} />
                    <Gill51Sunglasses8Bit size={32} animate={true} />
                </div>
                <p className="text-center text-gray-800 text-[10px] tracking-widest mb-2" style={{ fontFamily: 'monospace' }}>EST 1888 • SUNGLASSES LEGACY</p>
                <p className="text-center text-cyan-500 text-[9px] font-black tracking-wider" style={{ fontFamily: 'monospace' }}>AI51 + SK51 + BRO51</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <p className="text-gray-700 text-[7px]" style={{ fontFamily: 'monospace' }}>THE TEAM</p>
                    <svg width="10" height="10" viewBox="0 0 12 12" className="inline-block">
                        <rect x="2" y="2" width="2" height="2" fill="#ec4899"/>
                        <rect x="4" y="1" width="2" height="2" fill="#ec4899"/>
                        <rect x="6" y="1" width="2" height="2" fill="#ec4899"/>
                        <rect x="8" y="2" width="2" height="2" fill="#ec4899"/>
                        <rect x="2" y="4" width="8" height="2" fill="#ec4899"/>
                        <rect x="3" y="6" width="6" height="2" fill="#ec4899"/>
                        <rect x="4" y="8" width="4" height="2" fill="#ec4899"/>
                        <rect x="5" y="10" width="2" height="1" fill="#ec4899"/>
                    </svg>
                </div>
            </div>
            </div>
            );
            }

            export default function ScottManager() {
            return (
            <ScottOfflineProvider>
            <ScottManagerInner />
            </ScottOfflineProvider>
            );
            }