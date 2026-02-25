import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Radio, ArrowLeft, Plus, Trash2, Users, Calendar, Mail, DollarSign, FileText, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Artist() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me().then(setUser);
    }, []);

    const { data: artists = [] } = useQuery({
        queryKey: ['cb51Artists'],
        queryFn: () => base44.entities.Artist.filter({}),
        enabled: !!user
    });

    const deleteArtistMutation = useMutation({
        mutationFn: (id) => base44.entities.Artist.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cb51Artists'] })
    });

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <button
                onClick={() => navigate(createPageUrl('CB51'))}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK TO CB51</span>
            </button>

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white font-mono mb-2">ARTISTS</h1>
                    <p className="text-gray-600 text-xs font-mono">Manage your roster</p>
                </div>
                <Link to={createPageUrl('CB51AddArtist')}>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        ADD ARTIST
                    </Button>
                </Link>
            </div>

            {artists.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 font-mono text-sm mb-4">No artists yet</p>
                    <Link to={createPageUrl('AddArtist')}>
                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black">
                            ADD YOUR FIRST ARTIST
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {artists.map((artist) => (
                        <motion.div
                            key={artist.id}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black border-2 border-gray-900 hover:border-cyan-500/50 rounded-lg p-4 transition-all"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                    <h3 className="text-white font-bold font-mono mb-2">{artist.name}</h3>
                                    <div className="flex flex-wrap gap-3 text-xs">
                                        {artist.email && (
                                            <span className="text-gray-400 font-mono">📧 {artist.email}</span>
                                        )}
                                        {artist.genre && (
                                            <span className="text-gray-400 font-mono">🎵 {artist.genre}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-black text-xs px-3">
                                            VIEW
                                        </Button>
                                    </Link>
                                    <button
                                        onClick={() => deleteArtistMutation.mutate(artist.id)}
                                        className="text-gray-600 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}