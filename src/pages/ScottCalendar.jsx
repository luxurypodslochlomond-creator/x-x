import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';

function ScottCalendarInner() {
    const navigate = useNavigate();
    const scott = useScottOffline();
    const [viewMode, setViewMode] = useState('upcoming');
    const [events, setEvents] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        setEvents(scott.getEvents());
        setArtists(scott.getArtists());
        
        if (scott.isOnline) {
            scott.pullFromServer().then(() => {
                setEvents(scott.getEvents());
                setArtists(scott.getArtists());
            });
        }
    }, [scott.isOnline]);

    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
    const pastEvents = events.filter(e => new Date(e.date) < new Date());
    const displayEvents = viewMode === 'upcoming' ? upcomingEvents : events;

    const getArtistName = (artistId) => {
        const artist = artists.find(a => a.id === artistId);
        return artist ? artist.name : 'Unknown';
    };

    const groupByMonth = (events) => {
        const grouped = {};
        events.forEach(event => {
            const monthKey = new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
            if (!grouped[monthKey]) grouped[monthKey] = [];
            grouped[monthKey].push(event);
        });
        return grouped;
    };

    const groupedEvents = groupByMonth(displayEvents);

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm tracking-wider font-bold">BACK</span>
                </button>
                
                {!scott.isOnline && (
                    <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded">
                        <WifiOff className="w-3 h-3 text-amber-400" />
                        <span className="text-[10px] text-amber-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                            OFFLINE
                        </span>
                    </div>
                )}
            </div>

            <div className="mb-6 pb-4 border-b border-amber-500/20">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <KingdomCrown8Bit size={32} />
                    <h1 className="text-2xl font-black text-amber-400 tracking-tight" style={{ fontFamily: 'monospace' }}>CALENDAR</h1>
                </div>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('upcoming')}
                        className={`flex-1 py-3 font-black tracking-wider transition-all ${
                            viewMode === 'upcoming' 
                                ? 'bg-amber-500 text-black' 
                                : 'bg-black border-2 border-gray-800 text-gray-600 hover:border-amber-500/50'
                        }`}
                        style={{ fontFamily: 'monospace', boxShadow: viewMode === 'upcoming' ? '0 0 20px rgba(245, 158, 11, 0.4), inset 0 -2px 0 rgba(0,0,0,0.3)' : 'none' }}
                    >
                        UPCOMING ({upcomingEvents.length})
                    </button>
                    <button
                        onClick={() => setViewMode('all')}
                        className={`flex-1 py-3 font-black tracking-wider transition-all ${
                            viewMode === 'all' 
                                ? 'bg-amber-500 text-black' 
                                : 'bg-black border-2 border-gray-800 text-gray-600 hover:border-amber-500/50'
                        }`}
                        style={{ fontFamily: 'monospace', boxShadow: viewMode === 'all' ? '0 0 20px rgba(245, 158, 11, 0.4), inset 0 -2px 0 rgba(0,0,0,0.3)' : 'none' }}
                    >
                        ALL ({events.length})
                    </button>
                </div>
            </div>

            {Object.keys(groupedEvents).length === 0 ? (
                <Card className="bg-black border border-gray-800 p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-700 text-sm tracking-widest font-black" style={{ fontFamily: 'monospace' }}>NO EVENTS</p>
                </Card>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                        <div key={month}>
                            <h2 className="text-sm font-black text-amber-500 tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>{month.toUpperCase()}</h2>
                            <div className="space-y-2">
                                {monthEvents.map(event => {
                                    const isPast = new Date(event.date) < new Date();
                                    return (
                                        <motion.div
                                            key={event.id}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => {
                                                if (event.artist_id) {
                                                    navigate(createPageUrl(`ScottArtist?id=${event.artist_id}`));
                                                }
                                            }}
                                            className={`bg-black p-4 cursor-pointer transition-colors ${
                                                isPast 
                                                    ? 'border border-gray-800 opacity-50' 
                                                    : 'border border-gray-800 hover:border-amber-500/30'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <p className="text-white font-bold text-base mb-1" style={{ fontFamily: 'monospace' }}>{event.title}</p>
                                                    <p className="text-amber-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{event.event_type}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white text-sm font-bold" style={{ fontFamily: 'monospace' }}>
                                                        {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                                    </p>
                                                    <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                                        {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {event.location && (
                                                <p className="text-gray-600 text-xs mb-2" style={{ fontFamily: 'monospace' }}>{event.location}</p>
                                            )}
                                            
                                            {event.artist_id && (
                                                <p className="text-cyan-400 text-xs" style={{ fontFamily: 'monospace' }}>
                                                    {getArtistName(event.artist_id)}
                                                </p>
                                            )}
                                            
                                            {event.notes && (
                                                <div className="bg-amber-500/10 p-2 border border-amber-500/20 mt-2">
                                                    <p className="text-gray-400 text-xs" style={{ fontFamily: 'monospace' }}>{event.notes}</p>
                                                </div>
                                            )}
                                            
                                            {event.status === 'cancelled' && (
                                                <div className="mt-2">
                                                    <span className="text-red-400 text-xs font-bold tracking-widest" style={{ fontFamily: 'monospace' }}>CANCELLED</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewMode === 'upcoming' && pastEvents.length > 0 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setViewMode('all')}
                        className="text-gray-700 text-xs hover:text-amber-400 tracking-widest font-bold transition-colors"
                        style={{ fontFamily: 'monospace' }}
                    >
                        + {pastEvents.length} PAST
                    </button>
                </div>
            )}

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

export default function ScottCalendar() {
    return (
        <ScottOfflineProvider>
            <ScottCalendarInner />
        </ScottOfflineProvider>
    );
}