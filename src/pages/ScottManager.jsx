import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, User, Calendar, CheckSquare, MessageSquare, DollarSign, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import CelticFC8Bit from '@/components/shared/CelticFC8Bit';

/**
 * SCOTT'S ARTIST/CLIENT MANAGER
 * Mobile-first, simple, streamlined
 * For managing artists, clients, venues - gigs, tasks, communication
 */

export default function ScottManager() {
    const [pinEntered, setPinEntered] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Check if PIN already stored
    React.useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
        }
    }, []);

    const handlePinSubmit = () => {
        if (pinInput === '1888') {
            localStorage.setItem('scott_access_pin', '1888');
            setPinEntered(true);
        }
    };

    const { data: artists = [] } = useQuery({
        queryKey: ['scott-artists'],
        queryFn: () => base44.asServiceRole.entities.ScottArtist.list('-created_date'),
        enabled: pinEntered
    });

    const { data: upcomingEvents = [] } = useQuery({
        queryKey: ['scott-upcoming-events'],
        queryFn: async () => {
            const events = await base44.asServiceRole.entities.ScottEvent.list('-date', 10);
            return events.filter(e => new Date(e.date) >= new Date());
        },
        enabled: pinEntered
    });

    const { data: urgentTasks = [] } = useQuery({
        queryKey: ['scott-urgent-tasks'],
        queryFn: async () => {
            const tasks = await base44.asServiceRole.entities.ScottTask.list('-created_date', 20);
            return tasks.filter(t => t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent'));
        },
        enabled: pinEntered
    });

    const filteredArtists = artists.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // PIN ENTRY SCREEN
    if (!pinEntered) {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <Card className="bg-black border border-amber-500/30 p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <KingdomCrown8Bit size={48} />
                        </div>
                        <h1 className="text-4xl font-black text-amber-400 mb-3 tracking-tight" style={{ fontFamily: 'monospace' }}>KINGDOM</h1>
                        <div className="h-px bg-amber-500/30 mb-3"></div>
                        <p className="text-gray-400 text-sm tracking-wide" style={{ fontFamily: 'monospace' }}>ARTIST MANAGEMENT SYSTEM</p>
                    </div>
                    <Input
                        type="password"
                        placeholder="••••"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black border border-amber-500/30 text-white text-center text-2xl mb-4 focus:border-amber-500 transition-colors"
                        style={{ fontFamily: 'monospace' }}
                    />
                    <Button
                        onClick={handlePinSubmit}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black text-sm py-4 tracking-wider transition-all"
                        style={{ fontFamily: 'monospace' }}
                    >
                        ACCESS
                    </Button>
                    <div className="text-center mt-6 pt-6 border-t border-green-500/20">
                        <p className="text-green-400/60 text-xs tracking-wider" style={{ fontFamily: 'monospace' }}>EST. 1888</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            {/* HEADER */}
            <div className="mb-8 pb-6 border-b border-amber-500/20">
                <div className="flex items-center justify-center mb-4">
                    <KingdomCrown8Bit size={40} />
                </div>
                <h1 className="text-3xl font-black text-center text-amber-400 mb-2 tracking-tight" style={{ fontFamily: 'monospace' }}>KINGDOM</h1>
                <p className="text-center text-gray-500 text-xs tracking-wider" style={{ fontFamily: 'monospace' }}>ARTIST MANAGEMENT</p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <Card className="bg-black border border-amber-500/30 p-4 text-center hover:border-amber-500/60 transition-colors">
                    <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'monospace' }}>{artists.length}</p>
                    <p className="text-[10px] text-amber-500 tracking-widest" style={{ fontFamily: 'monospace' }}>ROSTER</p>
                </Card>
                <Card className="bg-black border border-cyan-500/30 p-4 text-center hover:border-cyan-500/60 transition-colors">
                    <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'monospace' }}>{upcomingEvents.length}</p>
                    <p className="text-[10px] text-cyan-500 tracking-widest" style={{ fontFamily: 'monospace' }}>EVENTS</p>
                </Card>
                <Card className="bg-black border border-green-500/30 p-4 text-center hover:border-green-500/60 transition-colors">
                    <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'monospace' }}>{urgentTasks.length}</p>
                    <p className="text-[10px] text-green-500 tracking-widest" style={{ fontFamily: 'monospace' }}>URGENT</p>
                </Card>
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
            <Link to={createPageUrl('ScottAddArtist')}>
                <Button className="w-full mb-8 bg-amber-500 hover:bg-amber-600 text-black font-black py-4 tracking-wider transition-colors" style={{ fontFamily: 'monospace' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    NEW CONTACT
                </Button>
            </Link>

            {/* URGENT TASKS */}
            {urgentTasks.length > 0 && (
                <Card className="bg-black border border-red-500/30 p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-black text-red-500 tracking-wider" style={{ fontFamily: 'monospace' }}>URGENT</h2>
                        <div className="h-px bg-red-500/30 flex-1 ml-3"></div>
                    </div>
                    <div className="space-y-2">
                        {urgentTasks.slice(0, 3).map(task => (
                            <div key={task.id} className="bg-black border border-red-500/20 p-3 hover:border-red-500/40 transition-colors">
                                <p className="text-white text-sm mb-1" style={{ fontFamily: 'monospace' }}>{task.title}</p>
                                {task.due_date && (
                                    <p className="text-red-500 text-xs tracking-wide" style={{ fontFamily: 'monospace' }}>{new Date(task.due_date).toLocaleDateString()}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* UPCOMING EVENTS */}
            {upcomingEvents.length > 0 && (
                <Card className="bg-black border border-cyan-500/30 p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-black text-cyan-500 tracking-wider" style={{ fontFamily: 'monospace' }}>UPCOMING</h2>
                        <div className="h-px bg-cyan-500/30 flex-1 ml-3"></div>
                    </div>
                    <div className="space-y-2">
                        {upcomingEvents.slice(0, 3).map(event => (
                            <div key={event.id} className="bg-black border border-cyan-500/20 p-3 hover:border-cyan-500/40 transition-colors">
                                <p className="text-white text-sm mb-1" style={{ fontFamily: 'monospace' }}>{event.title}</p>
                                <p className="text-cyan-500 text-xs tracking-wide" style={{ fontFamily: 'monospace' }}>
                                    {new Date(event.date).toLocaleDateString()} • {event.location || 'TBC'}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Link to={createPageUrl('ScottCalendar')}>
                        <Button variant="outline" className="w-full mt-3 border border-cyan-500/30 text-cyan-500 hover:border-cyan-500/60 transition-colors tracking-wider" style={{ fontFamily: 'monospace' }}>
                            CALENDAR
                        </Button>
                    </Link>
                </Card>
            )}

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
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)}>
                            <motion.div
                                whileTap={{ scale: 0.99 }}
                                className="bg-black border border-gray-800 hover:border-amber-500/30 p-4 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-white text-base mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                        <p className="text-amber-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                        {artist.phone && (
                                            <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'monospace' }}>{artist.phone}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <MessageSquare className="w-5 h-5 text-gray-700" />
                                        <CheckSquare className="w-5 h-5 text-gray-700" />
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