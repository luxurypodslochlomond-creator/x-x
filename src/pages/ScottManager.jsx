import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
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

            setArtists(loadedArtists);
            
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
                        <div className="flex items-center justify-center mb-6">
                            <KingdomCrown8Bit size={56} animate={true} />
                        </div>
                        <h1 className="text-5xl font-black text-amber-400 mb-3 tracking-tight" style={{ fontFamily: 'monospace' }}>SK</h1>
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
                    <div className="text-center mt-6 pt-6 border-t border-gray-900">
                        <p className="text-gray-800 text-[10px] tracking-widest" style={{ fontFamily: 'monospace' }}>1888</p>
                    </div>
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

            {/* HEADER */}
            <div className="mb-6 pb-4 border-b border-amber-500/20">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <KingdomCrown8Bit size={32} />
                        <div>
                            <h1 className="text-2xl font-black text-amber-400 tracking-tight leading-none" style={{ fontFamily: 'monospace' }}>SK</h1>
                            <p className="text-[9px] text-gray-600 tracking-widest font-bold mt-0.5" style={{ fontFamily: 'monospace' }}>OFFLINE-FIRST MGMT</p>
                        </div>

                        {/* OFFLINE/SYNC STATUS */}
                        <div className="flex items-center gap-2">
                            {scott.isOnline ? (
                                <div className="flex items-center gap-1">
                                    <Wifi className="w-4 h-4 text-green-500" />
                                    {scott.isSyncing && <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />}
                                    {scott.pendingCount > 0 && (
                                        <span className="text-[10px] text-amber-400 font-bold" style={{ fontFamily: 'monospace' }}>
                                            {scott.pendingCount}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded">
                                    <WifiOff className="w-3 h-3 text-amber-400" />
                                    <span className="text-[10px] text-amber-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                                        OFFLINE
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link to={createPageUrl('ScottCalendar')} className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded transition-colors">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                    </Link>
                </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                <button onClick={() => setSearchQuery('')} className="w-full">
                    <Card className="bg-black border border-amber-500/20 p-4 text-center hover:border-amber-500/50 transition-all hover:bg-amber-500/5 active:scale-95">
                        <p className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>{artists.length}</p>
                        <p className="text-xs text-amber-500 tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>ROSTER</p>
                    </Card>
                </button>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <Card className="bg-black border border-cyan-500/20 p-4 text-center hover:border-cyan-500/50 transition-all hover:bg-cyan-500/5 active:scale-95">
                        <p className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>{upcomingEvents.length}</p>
                        <p className="text-xs text-cyan-500 tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>EVENTS</p>
                    </Card>
                </Link>
                <button onClick={() => setSearchQuery('')} className="w-full">
                    <Card className="bg-black border border-red-500/20 p-4 text-center hover:border-red-500/50 transition-all hover:bg-red-500/5 active:scale-95">
                        <p className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>{urgentTasks.length}</p>
                        <p className="text-xs text-red-500 tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>URGENT</p>
                    </Card>
                </button>
            </div>

            {/* SEARCH */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <Input
                        placeholder="Search roster..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                        style={{ fontFamily: 'monospace' }}
                    />
                </div>
            </div>

            {/* ADD NEW BUTTON */}
            <Link to={createPageUrl('ScottAddArtist')} className="block">
                <Button className="w-full mb-6 bg-amber-500 hover:bg-amber-600 text-black font-black py-3 tracking-wider transition-all hover:scale-[1.02]" style={{ fontFamily: 'monospace', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), inset 0 -2px 0 rgba(0,0,0,0.3)' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    ADD
                </Button>
            </Link>



            {/* ARTISTS/CLIENTS LIST */}
            <div className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-black text-amber-500 tracking-wider" style={{ fontFamily: 'monospace' }}>
                        {searchQuery ? `RESULTS (${filteredArtists.length})` : 'ROSTER'}
                    </h2>
                    <div className="h-px bg-amber-500/30 flex-1 ml-3"></div>
                </div>
                
                {filteredArtists.length === 0 ? (
                    <Card className="bg-black border border-gray-800 p-8 text-center">
                        <p className="text-gray-700 text-sm tracking-wider" style={{ fontFamily: 'monospace' }}>
                            {searchQuery ? 'NO MATCHES' : 'NO CONTACTS'}
                        </p>
                    </Card>
                ) : (
                    filteredArtists.map(artist => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                            <motion.div
                                whileTap={{ scale: 0.99 }}
                                className="bg-black border border-gray-800 hover:border-amber-500/30 p-4 transition-colors cursor-pointer"
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
                <div className="flex items-center justify-center gap-3 mb-2">
                    <KingdomCrown8Bit size={24} />
                    <p className="text-gray-700 text-xs tracking-widest" style={{ fontFamily: 'monospace' }}>KINGDOM</p>
                </div>
                <p className="text-center text-gray-800 text-[10px] tracking-widest" style={{ fontFamily: 'monospace' }}>EST 1888</p>
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