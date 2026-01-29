import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Plus, Upload, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format, isBefore, startOfDay } from 'date-fns';
import TechStatusBar from '@/components/scott/TechStatusBar';
import ScottBandMembers from '@/components/scott/ScottBandMembers';
import ScottEmailTaskScanner from '@/components/scott/ScottEmailTaskScanner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    const [isEditingPic, setIsEditingPic] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const [calendarExpanded, setCalendarExpanded] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    const queryClient = useQueryClient();

    // Fetch calendar events for widget
    const { data: events = [] } = useQuery({
        queryKey: ['scottCalendarEvents', artistId],
        queryFn: () => base44.entities.ScottEvent.filter({ artist_id: artistId }),
        enabled: !!artistId
    });

    // Update artist mutation
    const updateArtistMutation = useMutation({
        mutationFn: (updates) => base44.entities.ScottArtist.update(artistId, updates),
        onSuccess: (updated) => {
            setArtist(updated);
            queryClient.invalidateQueries({ queryKey: ['scottArtists'] });
        }
    });

    const handlePicUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        try {
            setPicLoading(true);
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            await updateArtistMutation.mutateAsync({ profile_pic_url: file_url });
            setIsEditingPic(false);
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setPicLoading(false);
        }
    };

    useEffect(() => {
        // Set page title and CB51 branding
        document.title = 'CB51 • Artist Home';
        
        // CB51 theme color
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        metaTheme.content = '#06b6d4';
        
        if (!artistId) {
            navigate(createPageUrl('ScottManager'));
            return;
        }
        // Optimized fetch with fallback
        base44.entities.ScottArtist.list().then(allArtists => {
            const found = allArtists.find(a => a.id === artistId);
            if (found) {
                setArtist(found);
                document.title = `CB51 • ${found.name}`;
            } else {
                navigate(createPageUrl('CB51'));
            }
        });
    }, [artistId]);

    if (!artist) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10 blur-3xl">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen"></div>
                </div>
                <div className="text-center relative z-10">
                    <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
                    <p className="text-cyan-400 font-black font-mono">CB51</p>
                </div>
            </div>
        );
    }

    // COLOR SYSTEM: Green=LIVE, Orange=SESSIONS, Amber=ADMIN, Cyan=DAILY OPS
    const sections = [
        {
            title: 'LIVE',
            icon: Mic2,
            description: 'Booking • Logistics • Admin',
            link: createPageUrl(`ScottLive?id=${artistId}`),
            color: 'green'
        },
        {
            title: 'SESSIONS',
            icon: Music,
            description: 'Writing • Recording • Rehearsals',
            link: createPageUrl(`ScottSessions?id=${artistId}`),
            color: 'orange'
        },
        {
            title: 'TO-DO LIST',
            icon: ClipboardList,
            description: 'Tasks • Deadlines • Progress',
            link: createPageUrl(`ScottToDo?id=${artistId}`),
            color: 'cyan'
        },
        {
            title: 'FINANCE / ADMIN',
            icon: DollarSign,
            description: 'Invoices • Visas • Legal',
            link: createPageUrl(`ScottFinanceAdmin?id=${artistId}`),
            color: 'amber'
        },

    ];

    return (
        <div className="min-h-screen bg-black text-white p-3 pb-20">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* COMPACT HEADER */}
            <div className="mb-3 pt-2">
                <button
                    onClick={() => navigate(createPageUrl('CB51'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-3"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-bold font-mono">BACK</span>
                </button>

                <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                        <div className="relative group">
                            {artist.profile_pic_url ? (
                                <img 
                                    src={artist.profile_pic_url} 
                                    alt={artist.name}
                                    className="w-12 h-12 rounded object-cover border border-cyan-500"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded bg-cyan-500 text-black font-black text-lg flex items-center justify-center">
                                    {artist.name.charAt(0)}
                                </div>
                            )}
                            <button
                                onClick={() => setIsEditingPic(!isEditingPic)}
                                className="absolute inset-0 rounded bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                <Upload className="w-4 h-4 text-cyan-400" />
                            </button>
                        </div>
                        {isEditingPic && (
                            <div className="absolute top-full mt-2 left-0 z-50 min-w-[200px]">
                                <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                    <input
                                        id="profile-pic-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePicUpload}
                                        disabled={picLoading}
                                        className="hidden"
                                    />
                                    <label 
                                        htmlFor="profile-pic-upload"
                                        className={`block text-center bg-cyan-500 text-black font-mono font-bold text-xs py-2 px-3 rounded cursor-pointer hover:bg-cyan-600 transition-colors ${picLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {picLoading ? 'UPLOADING...' : 'CHOOSE PHOTO'}
                                    </label>
                                    <button
                                        onClick={() => setIsEditingPic(false)}
                                        className="w-full mt-2 text-gray-500 hover:text-gray-400 font-mono text-xs"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white font-mono">{artist.name}</h1>
                        <p className="text-gray-600 text-xs font-mono">Operations</p>
                    </div>
                </div>
                </div>

                {/* MAIN SECTIONS - COMPACT GRID LIKE HOME */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colorMap = {
                        green: { border: 'border-green-500', bg: 'bg-green-500', shadow: '0 0 15px rgba(16, 185, 129, 0.3)' },
                        orange: { border: 'border-orange-500', bg: 'bg-orange-500', shadow: '0 0 15px rgba(249, 115, 22, 0.3)' },
                        amber: { border: 'border-amber-500', bg: 'bg-amber-500', shadow: '0 0 15px rgba(245, 158, 11, 0.3)' },
                        cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500', shadow: '0 0 15px rgba(6, 182, 212, 0.3)' }
                    };
                    const colors = colorMap[section.color];

                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileTap={{ scale: 0.96 }}
                                className={`bg-black border-2 ${colors.border} rounded-lg p-2`}
                                style={{ boxShadow: colors.shadow }}
                            >
                                <div className="flex flex-col items-center text-center gap-1">
                                    <div className={`w-12 h-12 rounded ${colors.bg} text-black font-black text-lg flex items-center justify-center`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-white font-black text-[10px] font-mono leading-tight">
                                        {section.title}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* BAND MEMBERS - COMPACT */}
            <div className="mb-3">
                <ScottBandMembers 
                    artist={artist} 
                    onUpdate={updateArtistMutation.mutate}
                />
            </div>

            {/* EMAIL TASK SCANNER - COMPACT */}
            <div className="mb-3">
                <ScottEmailTaskScanner 
                    artistId={artistId}
                    onTasksExtracted={() => {
                        queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
                        queryClient.invalidateQueries({ queryKey: ['scottCalendarEvents'] });
                    }}
                />
            </div>

            {/* CALENDAR WIDGET - EXPANDABLE */}
            <div className="bg-black border border-cyan-500/20 rounded-lg p-2">
                <button
                    onClick={() => setCalendarExpanded(!calendarExpanded)}
                    className="w-full flex items-center justify-between p-1"
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-xs font-mono">CALENDAR</h2>
                        {events.length > 0 && (
                            <span className="text-gray-600 text-[9px] font-mono">({events.length})</span>
                        )}
                    </div>
                    <div className="text-cyan-400">
                        {calendarExpanded ? '−' : '+'}
                    </div>
                </button>

                <AnimatePresence>
                    {calendarExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                                    <button className="text-[9px] font-bold font-mono text-cyan-400 hover:text-cyan-300">
                                        + ADD EVENT
                                    </button>
                                </Link>
                            </div>

                            <div className="space-y-1">
                                {events.length === 0 ? (
                                    <p className="text-gray-600 text-xs font-mono text-center py-2">No events yet</p>
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
                                                    className={`flex items-center justify-between bg-black border border-gray-900 rounded p-1.5 ${isPast ? 'opacity-40' : ''}`}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-xs font-bold font-mono truncate">{event.title}</p>
                                                        <p className="text-gray-600 text-[9px] font-mono truncate">
                                                            {format(new Date(event.date), 'd MMM')}
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
                                    <button className="w-full mt-2 text-[9px] font-bold font-mono text-cyan-400 hover:text-cyan-300">
                                        VIEW ALL ({events.length})
                                    </button>
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}