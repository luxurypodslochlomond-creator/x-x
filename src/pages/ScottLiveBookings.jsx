import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Mail, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

/**
 * BOOKINGS DASHBOARD - GIG OFFERS AT A GLANCE
 * Shows pending offers, confirmed gigs, time saved
 */

export default function ScottLiveBookings() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: offers = [] } = useQuery({
        queryKey: ['scottGigOffers', artistId],
        queryFn: () => base44.entities.ScottGigOffer.filter(artistId ? { artist_id: artistId } : {}),
    });

    const { data: artist } = useQuery({
        queryKey: ['scottArtist', artistId],
        queryFn: () => base44.entities.ScottArtist.filter({ id: artistId }).then(r => r[0]),
        enabled: !!artistId
    });

    const pending = offers.filter(o => o.status === 'pending_manager_review').length;
    const sentToBand = offers.filter(o => o.status === 'sent_to_band').length;
    const confirmed = offers.filter(o => o.status === 'confirmed').length;
    const timeSaved = offers.reduce((sum, o) => sum + (o.time_saved_minutes || 120), 0);

    const recentOffers = offers.slice(0, 5);

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
                <h1 className="text-4xl font-black text-white font-mono mb-2">BOOKINGS</h1>
                <p className="text-gray-600 text-xs font-mono">Gig Offers & Confirmed Shows</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500 rounded-lg p-4"
                >
                    <Clock className="w-6 h-6 text-amber-400 mb-2" />
                    <p className="text-amber-400 font-black text-2xl font-mono">{pending}</p>
                    <p className="text-amber-300 text-xs font-mono">NEEDS REVIEW</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4"
                >
                    <Mail className="w-6 h-6 text-cyan-400 mb-2" />
                    <p className="text-cyan-400 font-black text-2xl font-mono">{sentToBand}</p>
                    <p className="text-cyan-300 text-xs font-mono">BAND VOTING</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4"
                >
                    <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-green-400 font-black text-2xl font-mono">{confirmed}</p>
                    <p className="text-green-300 text-xs font-mono">CONFIRMED</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4"
                >
                    <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-purple-400 font-black text-2xl font-mono">{Math.round(timeSaved / 60)}h</p>
                    <p className="text-purple-300 text-xs font-mono">TIME SAVED</p>
                </motion.div>
            </div>

            {/* RECENT OFFERS */}
            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-lg p-4 mb-6">
                <h2 className="text-pink-400 font-black text-lg font-mono mb-4">RECENT OFFERS</h2>
                {recentOffers.length === 0 ? (
                    <p className="text-gray-500 text-sm font-mono text-center py-4">No offers yet</p>
                ) : (
                    <div className="space-y-2">
                        {recentOffers.map(offer => {
                            const statusColors = {
                                pending_manager_review: 'bg-amber-500',
                                sent_to_band: 'bg-cyan-500',
                                confirmed: 'bg-green-500',
                                rejected_by_manager: 'bg-gray-500',
                                rejected_by_band: 'bg-gray-500'
                            };

                            return (
                                <div key={offer.id} className="bg-black/60 border border-gray-700 rounded p-3 flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-bold font-mono">{offer.venue}</p>
                                        <p className="text-gray-400 text-xs font-mono">
                                            {format(new Date(offer.date), 'd MMM yyyy')} • £{offer.fee}
                                        </p>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${statusColors[offer.status]} flex-shrink-0`}></div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* QUICK ACTIONS */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottGigOffers?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-4 rounded-lg font-mono"
                    >
                        VIEW ALL GIG OFFERS
                    </motion.button>
                </Link>

                <Link to={createPageUrl(`ScottAddShow?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono"
                    >
                        + ADD SHOW
                    </motion.button>
                </Link>

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
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Bookings</p>
            </div>
        </div>
    );
}