import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format, isBefore, startOfDay } from 'date-fns';

/**
 * ARTIST HOME PAGE - SCOTT'S FLOOR DIAGRAM
 * 5 main sections (can be optional, opted in/out):
 * - LIVE (Booking, Logistics, Admin)
 * - WRITING/RECORDING SESSIONS
 * - FINANCE/ADMIN
 * - TO-DO LIST
 * - CALENDAR
 */

export default function ScottArtistHome() {
    const navigate = useNavigate();
    const [artist, setArtist] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    // Fetch calendar events for widget
    const { data: events = [] } = useQuery({
        queryKey: ['scottCalendarEvents', artistId],
        queryFn: () => base44.entities.ScottEvent.filter({ artist_id: artistId }),
        enabled: !!artistId
    });

    useEffect(() => {
        if (!artistId) {
            navigate(createPageUrl('ScottManager'));
            return;
        }
        base44.entities.ScottArtist.filter({ id: artistId }).then(results => {
            if (results.length > 0) setArtist(results[0]);
        });
    }, [artistId]);

    if (!artist) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-mono">Loading artist...</p>
                </div>
            </div>
        );
    }

    const sections = [
        {
            title: 'LIVE',
            icon: Mic2,
            color: 'pink',
            description: 'Booking • Logistics • Admin',
            link: createPageUrl(`ScottLive?id=${artistId}`)
        },
        {
            title: 'SESSIONS',
            icon: Music,
            color: 'purple',
            description: 'Writing • Recording • Rehearsals',
            link: createPageUrl(`ScottSessions?id=${artistId}`)
        },
        {
            title: 'FINANCE / ADMIN',
            icon: DollarSign,
            color: 'amber',
            description: 'Invoices • Visas • Legal',
            link: createPageUrl(`ScottFinanceAdmin?id=${artistId}`)
        },
        {
            title: 'TO-DO LIST',
            icon: ClipboardList,
            color: 'green',
            description: 'Tasks • Deadlines • Progress',
            link: createPageUrl(`ScottToDo?id=${artistId}`)
        },

    ];

    const colorMap = {
        pink: { bg: 'from-pink-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        purple: { bg: 'from-purple-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        amber: { bg: 'from-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        green: { bg: 'from-green-500/20', border: 'border-green-500', text: 'text-green-400' },
        cyan: { bg: 'from-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-bold font-mono">BACK TO ADMIN</span>
                </button>

                <div className="flex items-center gap-3 pb-4 border-b-2 border-cyan-500">
                    <Radio className="w-10 h-10 text-cyan-400" />
                    <div>
                        <h1 className="text-2xl font-black text-white font-mono">{artist.name}</h1>
                        <p className="text-gray-500 text-xs font-mono">Artist Hub</p>
                    </div>
                </div>
            </div>

            {/* ARTIST PROFILE CARD */}
            <div className="mb-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/50 rounded-xl p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* LEFT COLUMN */}
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-500 text-xs font-mono mb-1">CONTACT</p>
                            <div className="space-y-1">
                                {artist.phone && (
                                    <p className="text-white font-mono text-sm">📞 {artist.phone}</p>
                                )}
                                {artist.email && (
                                    <p className="text-white font-mono text-sm">✉️ {artist.email}</p>
                                )}
                            </div>
                        </div>
                        {(artist.rate || artist.genre || artist.gear) && (
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">INFO</p>
                                <div className="space-y-1">
                                    {artist.rate && (
                                        <p className="text-cyan-400 font-mono text-sm">💰 {artist.rate}</p>
                                    )}
                                    {artist.genre && (
                                        <p className="text-purple-400 font-mono text-sm">🎵 {artist.genre}</p>
                                    )}
                                    {artist.gear && (
                                        <p className="text-pink-400 font-mono text-sm">🎸 {artist.gear}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-3">
                        {(artist.social_links?.instagram || artist.social_links?.spotify) && (
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">SOCIALS</p>
                                <div className="space-y-1">
                                    {artist.social_links?.instagram && (
                                        <a href={artist.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 font-mono text-sm hover:text-pink-300 block">
                                            📸 Instagram →
                                        </a>
                                    )}
                                    {artist.social_links?.spotify && (
                                        <a href={artist.social_links.spotify} target="_blank" rel="noopener noreferrer" className="text-green-400 font-mono text-sm hover:text-green-300 block">
                                            🎵 Spotify →
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                        {artist.notes && (
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">NOTES</p>
                                <p className="text-gray-400 font-mono text-sm">{artist.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 5 MAIN SECTIONS */}
            <div className="space-y-3">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colors = colorMap[section.color];
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className={`bg-gradient-to-r ${colors.bg} to-black border-2 ${colors.border} rounded-lg p-5 hover:shadow-lg transition-all`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon className={`w-8 h-8 ${colors.text}`} />
                                    <div className="flex-1">
                                        <p className={`${colors.text} font-black text-lg font-mono mb-1`}>
                                            {section.title}
                                        </p>
                                        <p className="text-gray-400 text-xs font-mono">
                                            {section.description}
                                        </p>
                                    </div>
                                    <div className={`${colors.text} text-2xl`}>→</div>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* CALENDAR WIDGET */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-lg font-mono">CALENDAR</h2>
                    </div>
                    <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                        <button className="text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            ADD
                        </button>
                    </Link>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {events.length === 0 ? (
                        <p className="text-gray-500 text-sm font-mono text-center py-4">No events yet</p>
                    ) : (
                        events
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .slice(0, 5)
                            .map(event => {
                                const isPast = isBefore(new Date(event.date), startOfDay(new Date()));
                                const statusColors = {
                                    confirmed: 'bg-green-500',
                                    tbc: 'bg-amber-500',
                                    unavailable: 'bg-red-500'
                                };

                                return (
                                    <div 
                                        key={event.id} 
                                        className={`flex items-center justify-between bg-black/60 border border-gray-700 rounded p-2 ${isPast ? 'opacity-40' : ''}`}
                                    >
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-bold font-mono truncate">{event.title}</p>
                                            <p className="text-gray-400 text-xs font-mono">
                                                {format(new Date(event.date), 'd MMM yyyy')}
                                                {event.location && ` • ${event.location}`}
                                            </p>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${statusColors[event.status]} flex-shrink-0 ml-2`}></div>
                                    </div>
                                );
                            })
                    )}
                </div>

                {events.length > 5 && (
                    <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                        <button className="w-full mt-3 text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300">
                            VIEW ALL ({events.length})
                        </button>
                    </Link>
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • {artist.name}</p>
                <p className="text-gray-700 text-[10px] font-mono mt-1">Simple hub ♾️📻</p>
            </div>
            </div>
            );
            }