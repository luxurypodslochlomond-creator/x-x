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
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 p-4 flex items-center justify-center">
                <Card className="bg-black/80 border-2 border-green-500 p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <CelticFC8Bit size={50} animate={true} />
                            <KingdomCrown8Bit size={70} animate={true} />
                            <CelticFC8Bit size={50} animate={true} />
                        </div>
                        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text mb-2">KINGDOM</h1>
                        <p className="text-amber-400 text-sm font-mono">Artist & Client Management</p>
                        <p className="text-green-400 text-xs font-mono mt-1">☘️ CELTIC FC 1888 ☘️</p>
                    </div>
                    <Input
                        type="password"
                        placeholder="Access code"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black/60 border-purple-500/50 text-white text-center text-2xl mb-4"
                    />
                    <Button
                        onClick={handlePinSubmit}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black"
                    >
                        ENTER
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 p-4 pb-20">
            
            {/* HEADER */}
            <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <CelticFC8Bit size={50} animate={true} />
                    <KingdomCrown8Bit size={70} animate={true} />
                    <CelticFC8Bit size={50} animate={true} />
                </div>
                <h1 className="text-4xl font-black text-center text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text mb-2">KINGDOM</h1>
                <p className="text-center text-amber-400 text-sm font-mono">Artist & Client Management System</p>
                <p className="text-center text-green-400 text-xs font-mono mt-1">☘️ CELTIC FC 1888 ☘️</p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <Card className="bg-purple-900/30 border-2 border-purple-500 p-3 text-center">
                    <User className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-2xl font-black text-white">{artists.length}</p>
                    <p className="text-xs text-gray-400">People</p>
                </Card>
                <Card className="bg-cyan-900/30 border-2 border-cyan-500 p-3 text-center">
                    <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <p className="text-2xl font-black text-white">{upcomingEvents.length}</p>
                    <p className="text-xs text-gray-400">Events</p>
                </Card>
                <Card className="bg-amber-900/30 border-2 border-amber-500 p-3 text-center">
                    <CheckSquare className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <p className="text-2xl font-black text-white">{urgentTasks.length}</p>
                    <p className="text-xs text-gray-400">Urgent</p>
                </Card>
            </div>

            {/* SEARCH */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                        placeholder="Search artists, clients, venues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-black/60 border-2 border-purple-500/50 text-white"
                    />
                </div>
            </div>

            {/* ADD NEW BUTTON */}
            <Link to={createPageUrl('ScottAddArtist')}>
                <Button className="w-full mb-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black py-6">
                    <Plus className="w-5 h-5 mr-2" />
                    ADD ARTIST / CLIENT / VENUE
                </Button>
            </Link>

            {/* URGENT TASKS */}
            {urgentTasks.length > 0 && (
                <Card className="bg-red-900/30 border-2 border-red-500 p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckSquare className="w-5 h-5 text-red-400" />
                        <h2 className="text-lg font-black text-red-400">URGENT TASKS</h2>
                    </div>
                    <div className="space-y-2">
                        {urgentTasks.slice(0, 3).map(task => (
                            <div key={task.id} className="bg-black/40 p-3 rounded border border-red-500/30">
                                <p className="text-white font-bold text-sm">{task.title}</p>
                                {task.due_date && (
                                    <p className="text-red-400 text-xs mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* UPCOMING EVENTS */}
            {upcomingEvents.length > 0 && (
                <Card className="bg-cyan-900/30 border-2 border-cyan-500 p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-lg font-black text-cyan-400">NEXT EVENTS</h2>
                    </div>
                    <div className="space-y-2">
                        {upcomingEvents.slice(0, 3).map(event => (
                            <div key={event.id} className="bg-black/40 p-3 rounded border border-cyan-500/30">
                                <p className="text-white font-bold text-sm">{event.title}</p>
                                <p className="text-cyan-400 text-xs mt-1">
                                    {new Date(event.date).toLocaleDateString()} • {event.location || 'TBC'}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Link to={createPageUrl('ScottCalendar')}>
                        <Button variant="outline" className="w-full mt-3 border-cyan-500 text-cyan-400">
                            View Full Calendar
                        </Button>
                    </Link>
                </Card>
            )}

            {/* ARTISTS/CLIENTS LIST */}
            <div className="space-y-3">
                <h2 className="text-xl font-black text-white mb-3">
                    {searchQuery ? `SEARCH RESULTS (${filteredArtists.length})` : 'ALL PEOPLE'}
                </h2>
                
                {filteredArtists.length === 0 ? (
                    <Card className="bg-black/60 border-2 border-gray-700 p-8 text-center">
                        <User className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400 font-mono">
                            {searchQuery ? 'No matches found' : 'No artists/clients yet'}
                        </p>
                    </Card>
                ) : (
                    filteredArtists.map(artist => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)}>
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="bg-black/60 border-2 border-purple-500/50 hover:border-purple-500 p-4 rounded-lg transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-white font-black text-lg">{artist.name}</p>
                                        <p className="text-purple-400 text-sm capitalize">{artist.type}</p>
                                        {artist.phone && (
                                            <p className="text-gray-500 text-xs mt-1">{artist.phone}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <MessageSquare className="w-5 h-5 text-cyan-400" />
                                        <CheckSquare className="w-5 h-5 text-amber-400" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-purple-500/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <KingdomCrown8Bit size={24} />
                    <p className="text-amber-400 text-sm font-mono font-black">KINGDOM MGMT</p>
                </div>
                <p className="text-center text-gray-600 text-xs font-mono">Professional Artist Management</p>
            </div>
        </div>
    );
}