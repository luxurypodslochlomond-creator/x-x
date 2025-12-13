import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, Music, Play, Pause, Trash2, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';

/**
 * SCOTT DEMOS - Track recordings, versions, send to artists
 * Upload, share links, mark "sent to artist/label"
 */

export default function ScottDemos() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadTitle, setUploadTitle] = useState('');
    const [selectedArtist, setSelectedArtist] = useState('');

    // PIN CHECK
    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);

    // Fetch demos
    const { data: demos = [], isLoading } = useQuery({
        queryKey: ['scott-demos'],
        queryFn: async () => {
            const results = await base44.entities.ScottDemo.list('-created_date');
            return results;
        }
    });

    // Fetch artists for dropdown
    const { data: artists = [] } = useQuery({
        queryKey: ['scott-artists'],
        queryFn: async () => {
            const results = await base44.entities.ScottArtist.list();
            return results;
        }
    });

    // Upload demo
    const uploadMutation = useMutation({
        mutationFn: async ({ file, title, artistId }) => {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            
            return await base44.entities.ScottDemo.create({
                artist_id: artistId,
                title: title || file.name,
                file_url,
                version: '1.0',
                status: 'draft',
                notes: ''
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scott-demos'] });
            setUploadTitle('');
            setSelectedArtist('');
            setIsUploading(false);
        }
    });

    // Delete demo
    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottDemo.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scott-demos'] });
        }
    });

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadMutation.mutate({
            file,
            title: uploadTitle,
            artistId: selectedArtist
        });
    };

    const shareDemo = (demo) => {
        if (navigator.share) {
            navigator.share({
                title: demo.title,
                text: `Check out this demo: ${demo.title}`,
                url: demo.file_url
            });
        } else {
            navigator.clipboard.writeText(demo.file_url);
            alert('Link copied!');
        }
    };

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>

                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                    <div className="bg-black rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Music className="w-8 h-8 text-amber-400" />
                            <div>
                                <h1 className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>DEMOS</h1>
                                <p className="text-gray-400 text-xs font-mono">Track recordings, share with artists/labels</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* UPLOAD SECTION */}
            <div className="bg-black border-2 border-amber-500/50 rounded-xl p-4 mb-6">
                <p className="text-amber-400 font-bold text-sm mb-3 font-mono">UPLOAD NEW DEMO</p>
                
                <select
                    value={selectedArtist}
                    onChange={(e) => setSelectedArtist(e.target.value)}
                    className="w-full bg-black border border-amber-500/30 rounded p-2 text-white text-sm font-mono mb-2 focus:border-amber-500 focus:outline-none"
                >
                    <option value="">Select artist...</option>
                    {artists.map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                </select>

                <Input
                    placeholder="Demo title (optional)"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="bg-black border border-amber-500/30 text-white mb-3 font-mono"
                />

                <label className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded cursor-pointer font-mono">
                    <Upload className="w-5 h-5" />
                    {uploadMutation.isPending ? 'UPLOADING...' : 'CHOOSE FILE'}
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleUpload}
                        className="hidden"
                        disabled={uploadMutation.isPending || !selectedArtist}
                    />
                </label>
                {!selectedArtist && <p className="text-gray-600 text-xs font-mono mt-2">Select artist first</p>}
            </div>

            {/* DEMOS LIST */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 font-mono">Loading demos...</p>
                    </div>
                ) : demos.length === 0 ? (
                    <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                        <Music className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm font-mono">No demos yet</p>
                    </div>
                ) : (
                    demos.map(demo => (
                        <motion.div
                            key={demo.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-black border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-4 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-base mb-1 font-mono">{demo.title}</h3>
                                    <p className="text-gray-500 text-xs font-mono mb-2">
                                        {artists.find(a => a.id === demo.artist_id)?.name || 'Unknown artist'}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                                            demo.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                                            demo.status === 'approved' ? 'bg-cyan-500/20 text-cyan-400' :
                                            'bg-gray-800 text-gray-500'
                                        }`}>
                                            {demo.status?.toUpperCase() || 'DRAFT'}
                                        </span>
                                        {demo.version && (
                                            <span className="text-gray-600 text-xs font-mono">v{demo.version}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={demo.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-amber-500/20 hover:bg-amber-500/30 rounded transition-colors"
                                    >
                                        <Play className="w-4 h-4 text-amber-400" />
                                    </a>
                                    <button
                                        onClick={() => shareDemo(demo)}
                                        className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded transition-colors"
                                    >
                                        <Share2 className="w-4 h-4 text-cyan-400" />
                                    </button>
                                    <button
                                        onClick={() => deleteMutation.mutate(demo.id)}
                                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>

                            {demo.notes && (
                                <p className="text-gray-400 text-sm font-mono mt-3 pt-3 border-t border-gray-800">
                                    {demo.notes}
                                </p>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Kingdom51Crown8Bit size={20} animate={false} />
                    <p className="text-amber-500/60 text-xs font-black tracking-wider" style={{ fontFamily: 'monospace' }}>KINGDOM51</p>
                </div>
            </div>
        </div>
    );
}