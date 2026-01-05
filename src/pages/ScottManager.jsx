import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Radio, Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * ADMIN HOME PAGE - SCOTT'S FLOOR DIAGRAM
 * Simple list: ARTIST 1, ARTIST 2, ARTIST 3, etc
 * Each link goes to artist home page
 */

export default function ScottManager() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => {
            base44.auth.redirectToLogin();
        }).finally(() => setLoading(false));
    }, []);

    const { data: artists = [], isLoading } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({}),
        enabled: !!user
    });

    if (loading || isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-cyan-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400 font-mono">CB51</h1>
                            <p className="text-gray-500 text-xs font-mono">Admin Home</p>
                        </div>
                    </div>
                    {user?.role === 'admin' && (
                        <Link to={createPageUrl('ScottAddArtist')}>
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                ADD ARTIST
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {/* ARTIST LIST */}
            <div className="space-y-3">
                {artists.length === 0 ? (
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-500 mb-4">No artists yet</p>
                        {user?.role === 'admin' && (
                            <Link to={createPageUrl('ScottAddArtist')}>
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 py-3 rounded-lg">
                                    ADD FIRST ARTIST
                                </button>
                            </Link>
                        )}
                    </div>
                ) : (
                    artists.map((artist, index) => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)}>
                            <motion.div 
                                whileTap={{ scale: 0.98 }}
                                className="bg-gray-900 border-2 border-cyan-500 hover:border-cyan-400 rounded-lg p-5 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-black text-lg font-mono">
                                            ARTIST {index + 1}: {artist.name}
                                        </p>
                                        <p className="text-gray-500 text-xs font-mono mt-1">
                                            {artist.genre || artist.type || 'Artist'}
                                        </p>
                                    </div>
                                    <div className="text-cyan-400 text-2xl">→</div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Simple as requested</p>
                <p className="text-gray-700 text-[10px] font-mono mt-1">From Scott's floor diagrams ♾️📻</p>
            </div>
        </div>
    );
}