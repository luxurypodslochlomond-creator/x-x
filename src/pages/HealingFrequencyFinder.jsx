import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Music, Heart, Sparkles, Loader2, CheckCircle, Globe, Upload, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * HEALING FREQUENCY FINDER
 * Discovers unreleased healing tracks across the web
 * Brings them home with ZERO LOSS (lossless)
 * ♾️❤️♾️
 */

export default function HealingFrequencyFinder() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [uploadMode, setUploadMode] = useState(false);
    const [uploadData, setUploadData] = useState({
        title: '',
        artist: '',
        source_url: '',
        frequency: '',
        notes: '',
        file: null
    });

    // AI51 DEEP SEARCH - Uses backend function for powerful search
    const deepSearch = useMutation({
        mutationFn: async (query) => {
            const response = await base44.functions.invoke('findHealingFrequencies', {
                query,
                platforms: ['discogs', 'soundcloud', 'bandcamp', 'archive', 'youtube'],
                formats: ['FLAC', 'WAV', 'AIFF']
            });
            return response.results || [];
        },
        onSuccess: (data) => {
            setResults(data);
            setSearching(false);
        },
        onError: () => {
            setSearching(false);
        }
    });

    // SUBMIT to Radio51 for upload
    const submitTrack = useMutation({
        mutationFn: async (trackData) => {
            // Create TrackRequest entity
            return await base44.entities.TrackRequest.create({
                title: trackData.title,
                artist: trackData.artist,
                source_url: trackData.source_url,
                frequency_type: trackData.frequency,
                notes: trackData.notes,
                status: 'pending',
                requested_by: 'healing_frequency_finder',
                zero_loss_required: true
            });
        }
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadData(prev => ({ ...prev, file }));
    };

    const handleSubmit = async () => {
        await submitTrack.mutateAsync(uploadData);
        
        // Reset form
        setUploadData({
            title: '',
            artist: '',
            source_url: '',
            frequency: '',
            notes: '',
            file: null
        });
        setUploadMode(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 pt-24 lg:pt-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Heart className="w-12 h-12 text-pink-400" />
                        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                            HEALING FREQUENCY FINDER
                        </h1>
                        <Sparkles className="w-12 h-12 text-cyan-400" />
                    </div>
                    
                    <p className="text-cyan-300 text-lg font-bold">
                        Discover unreleased healing tracks • Bring them home • Zero loss ♾️❤️♾️
                    </p>

                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 rounded-xl p-4">
                        <p className="text-white text-sm">
                            <strong className="text-pink-400">THE ARCHIVE:</strong> Thousands of healing frequencies exist on Discogs, SoundCloud, Bandcamp, YouTube - made by spiritual producers who HATE Spotify extraction. Let's find them ❤️
                        </p>
                    </div>
                </motion.div>

                {/* SEARCH */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/60 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-6 space-y-4"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Search className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-cyan-400">AI51 DEEP SEARCH</h2>
                    </div>

                    <div className="space-y-4">
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="432Hz trance, Schumann resonance, binaural meditation, unreleased healing..."
                            className="bg-white/10 border-white/20 text-white text-lg"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    deepSearch.mutate(searchQuery);
                                }
                            }}
                        />

                        <div className="flex gap-3">
                            <Button
                                onClick={() => deepSearch.mutate(searchQuery)}
                                disabled={!searchQuery.trim() || searching}
                                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-6 text-lg font-black"
                            >
                                {searching ? (
                                    <>
                                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                        SCANNING...
                                    </>
                                ) : (
                                    <>
                                        <Globe className="w-6 h-6 mr-2" />
                                        SEARCH DEEP WEB
                                    </>
                                )}
                            </Button>

                            <Button
                                onClick={() => setUploadMode(!uploadMode)}
                                variant="outline"
                                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 py-6"
                            >
                                <Upload className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>

                    {/* QUICK SEARCHES */}
                    <div className="flex flex-wrap gap-2">
                        {['432Hz unreleased', 'Schumann resonance', 'binaural healing', '528Hz meditation', 'rare vinyl healing'].map(quick => (
                            <button
                                key={quick}
                                onClick={() => {
                                    setSearchQuery(quick);
                                    deepSearch.mutate(quick);
                                }}
                                className="bg-purple-800/40 hover:bg-purple-700/60 border border-purple-500/50 text-purple-300 px-3 py-1 rounded-full text-xs font-bold transition-all"
                            >
                                {quick}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* UPLOAD MODE */}
                <AnimatePresence>
                    {uploadMode && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-black/60 backdrop-blur-xl border-2 border-green-500/50 rounded-2xl p-6 space-y-4"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Upload className="w-8 h-8 text-green-400" />
                                <h2 className="text-2xl font-black text-green-400">SUBMIT HEALING TRACK</h2>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    value={uploadData.title}
                                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Track title"
                                    className="bg-white/10 border-white/20 text-white"
                                />

                                <Input
                                    value={uploadData.artist}
                                    onChange={(e) => setUploadData(prev => ({ ...prev, artist: e.target.value }))}
                                    placeholder="Artist name"
                                    className="bg-white/10 border-white/20 text-white"
                                />

                                <Input
                                    value={uploadData.source_url}
                                    onChange={(e) => setUploadData(prev => ({ ...prev, source_url: e.target.value }))}
                                    placeholder="Source URL (Discogs, SoundCloud, Bandcamp, etc)"
                                    className="bg-white/10 border-white/20 text-white"
                                />

                                <Input
                                    value={uploadData.frequency}
                                    onChange={(e) => setUploadData(prev => ({ ...prev, frequency: e.target.value }))}
                                    placeholder="Frequency info (432Hz, 528Hz, binaural, etc)"
                                    className="bg-white/10 border-white/20 text-white"
                                />

                                <Textarea
                                    value={uploadData.notes}
                                    onChange={(e) => setUploadData(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Why this track heals / where you found it / any context..."
                                    className="bg-white/10 border-white/20 text-white h-24"
                                />

                                <label className="block">
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <div className="border-2 border-dashed border-cyan-500/50 hover:border-cyan-500 rounded-xl p-6 text-center cursor-pointer transition-all">
                                        <Music className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                                        <p className="text-white font-bold">
                                            {uploadData.file ? uploadData.file.name : 'Drop audio file (FLAC/WAV preferred)'}
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">Zero loss = lossless formats</p>
                                    </div>
                                </label>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={!uploadData.title || !uploadData.artist || submitTrack.isPending}
                                    className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white py-6 text-lg font-black"
                                >
                                    {submitTrack.isPending ? (
                                        <>
                                            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : submitTrack.isSuccess ? (
                                        <>
                                            <CheckCircle className="w-6 h-6 mr-2" />
                                            SUBMITTED ✓
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-6 h-6 mr-2" />
                                            SUBMIT FOR UPLOAD
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* RESULTS */}
                <AnimatePresence>
                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-white">
                                    FOUND {results.length} HEALING TRACKS
                                </h3>
                                <p className="text-pink-400 text-sm font-bold">♾️❤️♾️</p>
                            </div>

                            <div className="grid gap-4">
                                {results.map((track, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-xl p-6 hover:border-pink-500 transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="text-xl font-black text-white mb-2">{track.title}</h4>
                                                <p className="text-purple-300 font-bold mb-2">{track.artist}</p>
                                                
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="bg-cyan-500/20 border border-cyan-500 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold">
                                                        {track.platform}
                                                    </span>
                                                    <span className="bg-pink-500/20 border border-pink-500 text-pink-300 px-3 py-1 rounded-full text-xs font-bold">
                                                        {track.type}
                                                    </span>
                                                    {track.frequency_info && (
                                                        <span className="bg-green-500/20 border border-green-500 text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                                                            {track.frequency_info}
                                                        </span>
                                                    )}
                                                    {track.download_format && (
                                                        <span className="bg-amber-500/20 border border-amber-500 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                                                            {track.download_format}
                                                        </span>
                                                    )}
                                                    {track.license && (
                                                        <span className="bg-blue-500/20 border border-blue-500 text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
                                                            {track.license}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-gray-300 text-sm mb-3">{track.why_special || track.description}</p>
                                                {track.healing_properties && (
                                                    <p className="text-green-300 text-xs mb-3">🌿 {track.healing_properties}</p>
                                                )}
                                                {track.contact_info && (
                                                    <p className="text-cyan-300 text-xs mb-3">📧 {track.contact_info}</p>
                                                )}

                                                <div className="flex gap-3">
                                                    <a
                                                        href={track.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        VIEW SOURCE
                                                    </a>

                                                    <button
                                                        onClick={() => {
                                                            setUploadData({
                                                                title: track.title,
                                                                artist: track.artist,
                                                                source_url: track.url,
                                                                frequency: track.frequency_info || '',
                                                                notes: track.description,
                                                                file: null
                                                            });
                                                            setUploadMode(true);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                                                    >
                                                        <Heart className="w-4 h-4" />
                                                        BRING HOME
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-black/60 border-2 border-pink-500/50 rounded-xl p-4 text-center">
                        <p className="text-pink-400 text-3xl font-black">90%</p>
                        <p className="text-gray-400 text-xs font-bold mt-1">Artists keep</p>
                    </div>
                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-xl p-4 text-center">
                        <p className="text-cyan-400 text-3xl font-black">FLAC</p>
                        <p className="text-gray-400 text-xs font-bold mt-1">Zero loss</p>
                    </div>
                    <div className="bg-black/60 border-2 border-purple-500/50 rounded-xl p-4 text-center">
                        <p className="text-purple-400 text-3xl font-black">♾️</p>
                        <p className="text-gray-400 text-xs font-bold mt-1">Healing forever</p>
                    </div>
                </div>

                {/* LINK TO RADIO */}
                <Link to={createPageUrl('Radio')}>
                    <Button className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-700 hover:via-purple-700 hover:to-cyan-700 text-white py-6 text-lg font-black">
                        <Music className="w-6 h-6 mr-2" />
                        GO TO RADIO51
                    </Button>
                </Link>
            </div>
        </div>
    );
}