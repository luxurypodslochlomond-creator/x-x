import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Music, Upload, Play, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

/**
 * WRITING DASHBOARD - SONGWRITING & DEMOS
 * Shows recent demos, upload stats, quick access
 */

export default function ScottSessionsWriting() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: demos = [] } = useQuery({
        queryKey: ['scottDemos', artistId],
        queryFn: () => base44.entities.ScottDemo.filter(artistId ? { artist_id: artistId } : {}),
    });

    const totalDemos = demos.length;
    const recentDemos = demos.slice(0, 5);

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-8 pb-4 border-b border-gray-800">
                <Link to={createPageUrl(`ScottSessions?id=${artistId}`)} className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">BACK</span>
                </Link>
                <h1 className="text-4xl font-black text-white font-mono">WRITING</h1>
                <p className="text-gray-600 text-xs font-mono mt-1">Songwriting • Demos • Ideas</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black border border-gray-800 rounded-lg p-4">
                    <Music className="w-5 h-5 text-gray-500 mb-3" />
                    <p className="text-white font-black text-3xl font-mono">{totalDemos}</p>
                    <p className="text-gray-600 text-xs font-mono mt-1">Total Demos</p>
                </div>

                <div className="bg-black border border-gray-800 rounded-lg p-4">
                    <TrendingUp className="w-5 h-5 text-gray-500 mb-3" />
                    <p className="text-white font-black text-3xl font-mono">{recentDemos.length}</p>
                    <p className="text-gray-600 text-xs font-mono mt-1">This Month</p>
                </div>
            </div>

            {/* RECENT DEMOS */}
            {recentDemos.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-gray-600 font-black text-xs font-mono mb-4 tracking-wider">RECENT</h2>
                    <div className="space-y-2">
                        {recentDemos.map(demo => (
                            <div key={demo.id} className="bg-black border border-gray-800 rounded p-4 flex items-center justify-between hover:border-gray-700 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-bold font-mono truncate">{demo.title}</p>
                                    <p className="text-gray-600 text-xs font-mono mt-1">
                                        {format(new Date(demo.created_date), 'd MMM yyyy')}
                                    </p>
                                </div>
                                {demo.audio_url && (
                                    <a href={demo.audio_url} target="_blank" rel="noopener noreferrer" className="ml-4 flex-shrink-0">
                                        <Play className="w-5 h-5 text-gray-500 hover:text-cyan-400 transition-colors" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ACTIONS */}
            <div className="space-y-2">
                <Link to={createPageUrl(`ScottDemos?id=${artistId}`)}>
                    <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded font-mono text-sm flex items-center justify-center gap-2 transition-colors">
                        <Upload className="w-4 h-4" />
                        UPLOAD DEMO
                    </button>
                </Link>

                <Link to={createPageUrl(`ScottDemos?id=${artistId}`)}>
                    <button className="w-full bg-black border border-gray-800 hover:border-cyan-400 text-white font-bold py-3 rounded font-mono text-sm flex items-center justify-center gap-2 transition-colors">
                        <Music className="w-4 h-4" />
                        VIEW ALL
                    </button>
                </Link>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Writing</p>
            </div>
        </div>
    );
}