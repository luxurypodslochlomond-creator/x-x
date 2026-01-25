import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Plus, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
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

    const sections = [
        {
            title: 'LIVE',
            icon: Mic2,
            description: 'Booking • Logistics • Admin',
            link: createPageUrl(`ScottLive?id=${artistId}`)
        },
        {
            title: 'SESSIONS',
            icon: Music,
            description: 'Writing • Recording • Rehearsals',
            link: createPageUrl(`ScottSessions?id=${artistId}`)
        },
        {
            title: 'FINANCE / ADMIN',
            icon: DollarSign,
            description: 'Invoices • Visas • Legal',
            link: createPageUrl(`ScottFinanceAdmin?id=${artistId}`)
        },
        {
            title: 'TO-DO LIST',
            icon: ClipboardList,
            description: 'Tasks • Deadlines • Progress',
            link: createPageUrl(`ScottToDo?id=${artistId}`)
        },

    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <TechStatusBar showP2PSync={true} />
            
            {/* HEADER */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(createPageUrl('CB51'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-bold font-mono">BACK</span>
                </button>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        {artist.profile_pic_url ? (
                            <img 
                                src={artist.profile_pic_url} 
                                alt={artist.name}
                                className="w-16 h-16 rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                                <span className="text-2xl font-black text-white">{artist.name.charAt(0)}</span>
                            </div>
                        )}
                        <button
                            onClick={() => setIsEditingPic(!isEditingPic)}
                            className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                            <Upload className="w-5 h-5 text-white" />
                        </button>
                        {isEditingPic && (
                            <div className="absolute top-full mt-2 left-0 z-50">
                                <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-3 whitespace-nowrap">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePicUpload}
                                        disabled={picLoading}
                                        className="text-xs file:bg-cyan-500 file:text-white file:border-0 file:px-2 file:py-1 file:rounded file:cursor-pointer cursor-pointer"
                                    />
                                    <button
                                        onClick={() => setIsEditingPic(false)}
                                        className="absolute -top-2 -right-2 bg-gray-900 p-1 rounded-full"
                                    >
                                        <X className="w-3 h-3 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white font-mono">{artist.name}</h1>
                        <p className="text-gray-600 text-sm font-mono">Operations</p>
                    </div>
                </div>
            </div>

            {/* ARTIST INFO - CLEAN */}
            {(artist.phone || artist.email || artist.rate || artist.genre) && (
                <div className="mb-8 bg-black border-2 border-gray-900 rounded-xl p-6">
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
                                    <p className="text-white font-mono text-sm">{artist.rate}</p>
                                </div>
                            )}
                            {artist.genre && (
                                <div>
                                    <p className="text-gray-600 text-xs font-mono mb-1">Genre</p>
                                    <p className="text-white font-mono text-sm">{artist.genre}</p>
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
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-black border-4 border-cyan-500 rounded-xl p-6 transition-all h-32 flex items-center gap-4"
                            >
                                <Icon className="w-10 h-10 text-cyan-400" />
                                <div className="flex-1">
                                    <p className="text-white font-black text-xl font-mono mb-1">
                                        {section.title}
                                    </p>
                                    <p className="text-gray-600 text-xs font-mono">
                                        {section.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* BAND MEMBERS */}
            <div className="mb-8">
                <ScottBandMembers 
                    artist={artist} 
                    onUpdate={updateArtistMutation.mutate}
                />
            </div>

            {/* EMAIL TASK SCANNER */}
            <div className="mb-8">
                <ScottEmailTaskScanner 
                    artistId={artistId}
                    onTasksExtracted={() => {
                        queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
                        queryClient.invalidateQueries({ queryKey: ['scottCalendarEvents'] });
                    }}
                />
            </div>

            {/* CALENDAR WIDGET */}
            <div className="bg-black border-2 border-gray-900 rounded-xl p-6">
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
                        <p className="text-gray-600 text-sm font-mono text-center py-4">No events yet</p>
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
                                        className={`flex items-center justify-between bg-black border-2 border-gray-900 rounded p-2 ${isPast ? 'opacity-40' : ''}`}
                                    >
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-bold font-mono truncate">{event.title}</p>
                                            <p className="text-gray-600 text-xs font-mono">
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