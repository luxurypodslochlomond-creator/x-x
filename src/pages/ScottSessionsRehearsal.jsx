import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Music, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isFuture } from 'date-fns';

/**
 * REHEARSAL DASHBOARD - PRACTICE SESSIONS
 * Shows upcoming rehearsals, quick calendar access
 */

export default function ScottSessionsRehearsal() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: events = [] } = useQuery({
        queryKey: ['scottEvents', artistId],
        queryFn: () => base44.entities.ScottEvent.filter(artistId ? { artist_id: artistId } : {}),
    });

    const rehearsals = events.filter(e => e.event_type === 'rehearsal');
    const upcoming = rehearsals.filter(r => isFuture(new Date(r.date))).slice(0, 5);

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-green-500">
                <Link to={createPageUrl(`ScottSessions?id=${artistId}`)} className="flex items-center gap-2 text-gray-400 hover:text-green-400 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">BACK TO SESSIONS</span>
                </Link>
                <h1 className="text-3xl font-black text-green-400 font-mono">REHEARSAL</h1>
                <p className="text-gray-500 text-sm font-mono">Practice Sessions • Band</p>
            </div>

            {/* STATS */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4 mb-6"
            >
                <Music className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-green-400 font-black text-2xl font-mono">{upcoming.length}</p>
                <p className="text-green-300 text-xs font-mono">UPCOMING REHEARSALS</p>
            </motion.div>

            {/* UPCOMING REHEARSALS */}
            {upcoming.length > 0 && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                    <h2 className="text-green-400 font-black text-lg font-mono mb-4">NEXT SESSIONS</h2>
                    <div className="space-y-2">
                        {upcoming.map(rehearsal => (
                            <div key={rehearsal.id} className="bg-black/60 border border-gray-700 rounded p-3">
                                <div className="flex items-start justify-between mb-2">
                                    <p className="text-white text-sm font-bold font-mono">{rehearsal.title}</p>
                                    <span className="text-green-400 text-xs font-mono">
                                        {format(new Date(rehearsal.date), 'd MMM')}
                                    </span>
                                </div>
                                {rehearsal.location && (
                                    <div className="flex items-center gap-1 text-gray-400 text-xs font-mono">
                                        <MapPin className="w-3 h-3" />
                                        {rehearsal.location}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUICK ACTIONS */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <Calendar className="w-5 h-5" />
                        VIEW CALENDAR
                    </motion.button>
                </Link>

                <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        + ADD REHEARSAL
                    </motion.button>
                </Link>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Rehearsal</p>
            </div>
        </div>
    );
}