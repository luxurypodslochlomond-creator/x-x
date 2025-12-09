import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScottCalendar() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('upcoming'); // upcoming or all

    const { data: events = [] } = useQuery({
        queryKey: ['scott-all-events'],
        queryFn: () => base44.entities.ScottEvent.list('-date')
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scott-artists'],
        queryFn: () => base44.entities.ScottArtist.list()
    });

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
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 p-4 pb-20">
            
            <button
                onClick={() => navigate(createPageUrl('ScottManager'))}
                className="flex items-center gap-2 text-purple-400 mb-6 hover:text-purple-300"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-mono">Back</span>
            </button>

            <div className="mb-6">
                <h1 className="text-3xl font-black text-white mb-4">CALENDAR</h1>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('upcoming')}
                        className={`px-4 py-2 rounded font-bold ${
                            viewMode === 'upcoming' 
                                ? 'bg-cyan-600 text-white' 
                                : 'bg-black/60 text-gray-400 border border-cyan-500/30'
                        }`}
                    >
                        Upcoming ({upcomingEvents.length})
                    </button>
                    <button
                        onClick={() => setViewMode('all')}
                        className={`px-4 py-2 rounded font-bold ${
                            viewMode === 'all' 
                                ? 'bg-cyan-600 text-white' 
                                : 'bg-black/60 text-gray-400 border border-cyan-500/30'
                        }`}
                    >
                        All ({events.length})
                    </button>
                </div>
            </div>

            {Object.keys(groupedEvents).length === 0 ? (
                <Card className="bg-black/60 border-2 border-gray-700 p-8 text-center">
                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 font-mono">No events yet</p>
                </Card>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                        <div key={month}>
                            <h2 className="text-xl font-black text-cyan-400 mb-3">{month}</h2>
                            <div className="space-y-3">
                                {monthEvents.map(event => {
                                    const isPast = new Date(event.date) < new Date();
                                    return (
                                        <motion.div
                                            key={event.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                if (event.artist_id) {
                                                    navigate(createPageUrl(`ScottArtist?id=${event.artist_id}`));
                                                }
                                            }}
                                            className={`bg-black/60 border-2 p-4 rounded-lg ${
                                                isPast 
                                                    ? 'border-gray-700 opacity-60' 
                                                    : 'border-cyan-500/50 hover:border-cyan-500'
                                            } cursor-pointer transition-all`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-white font-black text-lg">{event.title}</p>
                                                    <p className="text-cyan-400 text-sm capitalize">{event.event_type}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white font-bold">
                                                        {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {event.location && (
                                                <p className="text-gray-400 text-sm mb-2">{event.location}</p>
                                            )}
                                            
                                            {event.artist_id && (
                                                <p className="text-purple-400 text-sm">
                                                    With: {getArtistName(event.artist_id)}
                                                </p>
                                            )}
                                            
                                            {event.notes && (
                                                <div className="bg-cyan-900/20 p-2 rounded border border-cyan-500/20 mt-2">
                                                    <p className="text-gray-300 text-xs">{event.notes}</p>
                                                </div>
                                            )}
                                            
                                            {event.status === 'cancelled' && (
                                                <div className="mt-2">
                                                    <span className="text-red-400 text-xs font-bold">CANCELLED</span>
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
                        className="text-gray-500 text-sm hover:text-gray-300"
                    >
                        + {pastEvents.length} past events
                    </button>
                </div>
            )}
        </div>
    );
}