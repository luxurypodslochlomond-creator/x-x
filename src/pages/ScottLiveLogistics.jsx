import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Hotel, Car, Map, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isFuture } from 'date-fns';

/**
 * LOGISTICS DASHBOARD - TRAVEL & ACCOMMODATION
 * Shows upcoming stays, routes, quick access
 */

export default function ScottLiveLogistics() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: accommodation = [] } = useQuery({
        queryKey: ['scottAccommodation', artistId],
        queryFn: () => base44.entities.ScottAccommodation.filter(artistId ? { artist_id: artistId } : {}),
    });

    const { data: events = [] } = useQuery({
        queryKey: ['scottEvents', artistId],
        queryFn: () => base44.entities.ScottEvent.filter(artistId ? { artist_id: artistId } : {}),
    });

    const upcomingStays = accommodation.filter(a => isFuture(new Date(a.check_in))).length;
    const nextEvents = events.filter(e => isFuture(new Date(e.date))).slice(0, 3);

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Link to={createPageUrl(`ScottLive?id=${artistId}`)} className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs font-mono font-bold">BACK</span>
                    </Link>
                    <span className="text-gray-600 text-xs">|</span>
                    <a href={createPageUrl('CB51')} className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all">
                        <span className="text-xs font-mono font-bold">CB51</span>
                    </a>
                </div>
                <h1 className="text-4xl font-black text-white font-mono mb-2">LOGISTICS</h1>
                <p className="text-gray-600 text-xs font-mono">Travel • Accommodation • Routes</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4"
                >
                    <Hotel className="w-6 h-6 text-cyan-400 mb-2" />
                    <p className="text-cyan-400 font-black text-2xl font-mono">{upcomingStays}</p>
                    <p className="text-cyan-300 text-xs font-mono">UPCOMING STAYS</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4"
                >
                    <Calendar className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-green-400 font-black text-2xl font-mono">{nextEvents.length}</p>
                    <p className="text-green-300 text-xs font-mono">NEXT SHOWS</p>
                </motion.div>
            </div>

            {/* NEXT SHOWS */}
            {nextEvents.length > 0 && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
                    <h2 className="text-purple-400 font-black text-lg font-mono mb-4 flex items-center gap-2">
                        <Map className="w-5 h-5" />
                        UPCOMING SHOWS
                    </h2>
                    <div className="space-y-2">
                        {nextEvents.map(event => (
                            <div key={event.id} className="bg-black/60 border border-gray-700 rounded p-3">
                                <p className="text-white text-sm font-bold font-mono">{event.title}</p>
                                <p className="text-gray-400 text-xs font-mono">
                                    {format(new Date(event.date), 'd MMM yyyy')}
                                    {event.location && ` • ${event.location}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUICK ACTIONS */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottAccommodation?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <Hotel className="w-5 h-5" />
                        ACCOMMODATION
                    </motion.button>
                </Link>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    <Car className="w-5 h-5" />
                    TRAVEL ROUTES
                    <span className="text-xs bg-amber-500 px-2 py-1 rounded">COMING SOON</span>
                </motion.button>

                <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <Calendar className="w-5 h-5" />
                        VIEW CALENDAR
                    </motion.button>
                </Link>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Logistics</p>
            </div>
        </div>
    );
}