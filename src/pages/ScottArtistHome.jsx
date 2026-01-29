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
        <div className="min-h-screen text-white p-3 pb-20" style={{ backgroundColor: 'var(--cb51-bg-primary)' }}>
            <button onClick={() => navigate(createPageUrl('CB51'))} className="flex items-center gap-2 hover:opacity-80 transition-all mb-3" style={{ color: 'var(--cb51-text-muted)' }}>
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
                {artist.profile_pic_url ? (
                    <img src={artist.profile_pic_url} alt={artist.name} className="w-12 h-12 rounded object-cover" style={{ border: '2px solid var(--cb51-rose)' }} />
                ) : (
                    <div className="w-12 h-12 rounded text-black font-black text-lg flex items-center justify-center" style={{ backgroundColor: 'var(--cb51-rose)' }}>{artist.name.charAt(0)}</div>
                )}
                <div>
                    <h1 className="text-xl font-black font-mono" style={{ color: 'var(--cb51-rose)' }}>{artist.name}</h1>
                    <p className="text-xs font-mono" style={{ color: 'var(--cb51-text-muted)' }}>Operations</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colorMap = {
                        cyan: { color: 'var(--cb51-tasks)' },
                        orange: { color: 'var(--cb51-finance)' }
                    };
                    const color = colorMap[section.color] || colorMap.cyan;

                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div whileTap={{ scale: 0.96 }} className="border-2 rounded-lg p-2 text-center" style={{ backgroundColor: 'var(--cb51-bg-card)', borderColor: color.color }}>
                                <div className="w-12 h-12 rounded text-black font-black flex items-center justify-center mx-auto mb-1" style={{ backgroundColor: color.color }}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <p className="font-black text-[10px] font-mono" style={{ color: color.color }}>{section.title}</p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="rounded-lg p-2 mb-3" style={{ backgroundColor: 'var(--cb51-bg-card)', border: '1px solid var(--cb51-border)' }}>
                <button onClick={() => setCalendarExpanded(!calendarExpanded)} className="w-full flex items-center justify-between p-1 hover:opacity-80">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: 'var(--cb51-calendar)' }} />
                        <h2 className="font-black text-xs font-mono" style={{ color: 'var(--cb51-calendar)' }}>CALENDAR</h2>
                    </div>
                    <div style={{ color: 'var(--cb51-calendar)' }}>{calendarExpanded ? '−' : '+'}</div>
                </button>
                {calendarExpanded && (
                    <div className="pt-2">
                        <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                            <button className="w-full text-[9px] font-bold font-mono hover:opacity-80" style={{ color: 'var(--cb51-calendar)' }}>+ ADD EVENT</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}