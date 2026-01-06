import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format, isBefore, startOfDay } from 'date-fns';
import TechStatusBar from '@/components/scott/TechStatusBar';

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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* HEADER */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-bold font-mono">BACK</span>
                </button>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <span className="text-2xl font-black text-white">{artist.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white font-mono">{artist.name}</h1>
                        <p className="text-gray-500 text-sm font-mono">Operations</p>
                    </div>
                </div>
            </div>

            {/* ARTIST INFO - CLEAN */}
            {(artist.phone || artist.email || artist.rate || artist.genre) && (
                <div className="mb-8 bg-black border-4 border-purple-500 rounded-xl p-6" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            {artist.phone && (
                                <div>
                                    <p className="text-gray-600 text-xs font-mono mb-1">Phone</p>
                                    <p className="text-white font-mono text-sm">{artist.phone}</p>
                                </div>
                            )}
                            {artist.email && (
                                <div>
                                    <p className="text-gray-600 text-xs font-mono mb-1">Email</p>
                                    <p className="text-white font-mono text-sm">{artist.email}</p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-3">
                            {artist.rate && (
                                <div>
                                    <p className="text-gray-600 text-xs font-mono mb-1">Rate</p>
                                    <p className="text-cyan-400 font-mono text-sm">{artist.rate}</p>
                                </div>
                            )}
                            {artist.genre && (
                                <div>
                                    <p className="text-gray-600 text-xs font-mono mb-1">Genre</p>
                                    <p className="text-purple-400 font-mono text-sm">{artist.genre}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN SECTIONS - CLEAN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colors = colorMap[section.color];
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-black border-4 ${colors.border} rounded-xl p-6 transition-all h-32 flex items-center gap-4`}
                                style={{ 
                                    boxShadow: section.color === 'pink' ? '0 0 30px rgba(236, 72, 153, 0.5)' :
                                              section.color === 'purple' ? '0 0 30px rgba(168, 85, 247, 0.5)' :
                                              section.color === 'amber' ? '0 0 30px rgba(245, 158, 11, 0.5)' :
                                              section.color === 'green' ? '0 0 30px rgba(34, 197, 94, 0.5)' :
                                              '0 0 30px rgba(6, 182, 212, 0.5)'
                                }}
                            >
                                <Icon className={`w-10 h-10 ${colors.text}`} />
                                <div className="flex-1">
                                    <p className={`${colors.text} font-black text-xl font-mono mb-1`}>
                                        {section.title}
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono">
                                        {section.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* CALENDAR WIDGET */}
            <div className="bg-black border-4 border-cyan-500 rounded-xl p-6" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}>
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
                                            <p className="text-gray-500 text-xs font-mono">
                                                {format(new Date(event.date), 'd MMM yyyy')}
                                                {event.location && ` · ${event.location}`}
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