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
            <div className="mb-6 pb-4 border-b-2 border-purple-500">
                <Link to={createPageUrl(`ScottSessions?id=${artistId}`)} className="flex items-center gap-2 text-gray-400 hover:text-purple-400 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">BACK TO SESSIONS</span>
                </Link>
                <h1 className="text-3xl font-black text-purple-400 font-mono">WRITING</h1>
                <p className="text-gray-500 text-sm font-mono">Songwriting • Demos • Ideas</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4"
                >
                    <Music className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-purple-400 font-black text-2xl font-mono">{totalDemos}</p>
                    <p className="text-purple-300 text-xs font-mono">TOTAL DEMOS</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4"
                >
                    <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-green-400 font-black text-2xl font-mono">{recentDemos.length}</p>
                    <p className="text-green-300 text-xs font-mono">THIS MONTH</p>
                </motion.div>
            </div>

            {/* RECENT DEMOS */}
            {recentDemos.length > 0 && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
                    <h2 className="text-purple-400 font-black text-lg font-mono mb-4">RECENT DEMOS</h2>
                    <div className="space-y-2">
                        {recentDemos.map(demo => (
                            <div key={demo.id} className="bg-black/60 border border-gray-700 rounded p-3 flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-white text-sm font-bold font-mono">{demo.title}</p>
                                    <p className="text-gray-400 text-xs font-mono">
                                        {format(new Date(demo.created_date), 'd MMM yyyy')}
                                    </p>
                                </div>
                                {demo.audio_url && (
                                    <a href={demo.audio_url} target="_blank" rel="noopener noreferrer">
                                        <Play className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUICK ACTIONS */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottDemos?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <Upload className="w-5 h-5" />
                        UPLOAD DEMO
                    </motion.button>
                </Link>

                <Link to={createPageUrl(`ScottDemos?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <Music className="w-5 h-5" />
                        VIEW ALL DEMOS
                    </motion.button>
                </Link>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Writing</p>
            </div>
        </div>
    );
}