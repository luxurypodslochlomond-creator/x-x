import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function ScottArtistHome() {
    const navigate = useNavigate();
    const [artist, setArtist] = useState(null);
    const [calendarExpanded, setCalendarExpanded] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: events = [] } = useQuery({
        queryKey: ['scottCalendarEvents', artistId],
        queryFn: () => base44.entities.ScottEvent.filter({ artist_id: artistId }),
        enabled: !!artistId
    });

    useEffect(() => {
        if (!artistId) {
            navigate(createPageUrl('CB51'));
            return;
        }
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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Radio className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
            </div>
        );
    }

    const sections = [
        { title: 'LIVE', icon: Mic2, link: createPageUrl(`ScottLive?id=${artistId}`), color: 'cyan' },
        { title: 'SESSIONS', icon: Music, link: createPageUrl(`ScottSessions?id=${artistId}`), color: 'orange' },
        { title: 'TO-DO', icon: ClipboardList, link: createPageUrl(`ScottToDo?id=${artistId}`), color: 'cyan' },
        { title: 'FINANCE', icon: DollarSign, link: createPageUrl(`ScottFinanceAdmin?id=${artistId}`), color: 'orange' },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-3 pb-20">
            <button onClick={() => navigate(createPageUrl('CB51'))} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-3">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
                {artist.profile_pic_url ? (
                    <img src={artist.profile_pic_url} alt={artist.name} className="w-12 h-12 rounded object-cover border border-cyan-500" />
                ) : (
                    <div className="w-12 h-12 rounded bg-cyan-500 text-black font-black text-lg flex items-center justify-center">{artist.name.charAt(0)}</div>
                )}
                <div>
                    <h1 className="text-xl font-black text-white font-mono">{artist.name}</h1>
                    <p className="text-gray-600 text-xs font-mono">Operations</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colorMap = {
                        cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500' },
                        orange: { border: 'border-orange-500', bg: 'bg-orange-500' }
                    };
                    const color = colorMap[section.color] || colorMap.cyan;

                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div whileTap={{ scale: 0.96 }} className={`bg-black border-2 ${color.border} rounded-lg p-2 text-center`}>
                                <div className={`w-12 h-12 rounded ${color.bg} text-black font-black flex items-center justify-center mx-auto mb-1`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <p className="text-white font-black text-[10px] font-mono">{section.title}</p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-black border border-cyan-500/20 rounded-lg p-2 mb-3">
                <button onClick={() => setCalendarExpanded(!calendarExpanded)} className="w-full flex items-center justify-between p-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-xs font-mono">CALENDAR</h2>
                    </div>
                    <div className="text-cyan-400">{calendarExpanded ? '−' : '+'}</div>
                </button>
                {calendarExpanded && (
                    <div className="pt-2">
                        <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                            <button className="w-full text-[9px] font-bold font-mono text-cyan-400 hover:text-cyan-300">+ ADD EVENT</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}