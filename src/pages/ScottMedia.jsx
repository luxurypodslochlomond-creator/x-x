import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Image, Video, Plus, Upload, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * MEDIA VAULT
 * Track every photo, video, social post
 * Know rights, repost easy, AI suggests new content
 * Zero vanity metrics - pure connection
 */

export default function ScottMedia() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [media, setMedia] = useState([]);
    const [artists, setArtists] = useState([]);
    const [selectedVibe, setSelectedVibe] = useState('all');
    const [showUploadForm, setShowUploadForm] = useState(false);

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadData();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, []);

    const loadData = async () => {
        try {
            const allMedia = await base44.entities.ScottMedia.list();
            const allArtists = await base44.entities.ScottArtist.list();
            setMedia(allMedia);
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    if (!pinEntered) return null;

    const vibes = ['all', 'fire', 'chill', 'professional', 'backstage', 'fans', 'promo'];
    const filteredMedia = selectedVibe === 'all' 
        ? media 
        : media.filter(m => m.vibe === selectedVibe);

    const mediaByType = {
        photo: filteredMedia.filter(m => m.media_type === 'photo').length,
        video: filteredMedia.filter(m => m.media_type === 'video').length,
        reel: filteredMedia.filter(m => m.media_type === 'reel').length,
        tiktok: filteredMedia.filter(m => m.media_type === 'tiktok').length,
    };

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Image className="w-8 h-8 text-pink-400" />
                        <div>
                            <h1 className="text-3xl font-black text-pink-400" style={{ fontFamily: 'monospace' }}>MEDIA VAULT</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Track content, own rights, create fresh</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-black border border-pink-500/30 p-4 text-center">
                        <p className="text-3xl font-black text-pink-400 mb-1" style={{ fontFamily: 'monospace' }}>
                            {mediaByType.photo}
                        </p>
                        <p className="text-xs text-pink-500 tracking-wider" style={{ fontFamily: 'monospace' }}>PHOTOS</p>
                    </div>
                    <div className="bg-black border border-purple-500/30 p-4 text-center">
                        <p className="text-3xl font-black text-purple-400 mb-1" style={{ fontFamily: 'monospace' }}>
                            {mediaByType.video}
                        </p>
                        <p className="text-xs text-purple-500 tracking-wider" style={{ fontFamily: 'monospace' }}>VIDEOS</p>
                    </div>
                    <div className="bg-black border border-cyan-500/30 p-4 text-center">
                        <p className="text-3xl font-black text-cyan-400 mb-1" style={{ fontFamily: 'monospace' }}>
                            {mediaByType.reel}
                        </p>
                        <p className="text-xs text-cyan-500 tracking-wider" style={{ fontFamily: 'monospace' }}>REELS</p>
                    </div>
                    <div className="bg-black border border-green-500/30 p-4 text-center">
                        <p className="text-3xl font-black text-green-400 mb-1" style={{ fontFamily: 'monospace' }}>
                            {mediaByType.tiktok}
                        </p>
                        <p className="text-xs text-green-500 tracking-wider" style={{ fontFamily: 'monospace' }}>TIKTOK</p>
                    </div>
                </div>

                {/* VIBE FILTER */}
                <div className="mb-6">
                    <p className="text-xs text-gray-600 font-mono mb-2">FILTER BY VIBE:</p>
                    <div className="flex gap-2 flex-wrap">
                        {vibes.map(vibe => (
                            <button
                                key={vibe}
                                onClick={() => setSelectedVibe(vibe)}
                                className={`px-4 py-2 font-mono text-sm transition-all ${
                                    selectedVibe === vibe
                                        ? 'bg-cyan-500 text-black border-2 border-cyan-400'
                                        : 'bg-black border-2 border-gray-800 text-gray-500 hover:border-cyan-500/50'
                                }`}
                            >
                                {vibe.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI CONTENT SUGGESTION */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                        <div>
                            <h3 className="text-cyan-400 font-black font-mono text-sm">AI CONTENT IDEAS</h3>
                            <p className="text-gray-400 text-xs font-mono">Fresh posts based on artist vibe</p>
                        </div>
                    </div>
                    <Link to={createPageUrl('TalkToAI51')}>
                        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-mono">
                            GET AI CAPTION + POST IDEAS
                        </Button>
                    </Link>
                </div>

                {/* UPLOAD BUTTON */}
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="w-full mb-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-mono flex items-center justify-center gap-2"
                >
                    <Upload className="w-5 h-5" />
                    UPLOAD NEW MEDIA
                </button>

                {/* MEDIA GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredMedia.length === 0 ? (
                        <div className="col-span-full bg-black border border-gray-800 p-8 text-center">
                            <Image className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">
                                {selectedVibe === 'all' ? 'No media yet' : `No ${selectedVibe} content`}
                            </p>
                        </div>
                    ) : (
                        filteredMedia.map(item => {
                            const artist = artists.find(a => a.id === item.artist_id);
                            return (
                                <div key={item.id} className="bg-black border-2 border-gray-800 hover:border-pink-500/50 transition-all">
                                    {/* THUMBNAIL */}
                                    <div className="aspect-square bg-gray-900 flex items-center justify-center overflow-hidden">
                                        {item.thumbnail_url ? (
                                            <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                                        ) : item.media_type === 'video' || item.media_type === 'reel' || item.media_type === 'tiktok' ? (
                                            <Video className="w-12 h-12 text-gray-700" />
                                        ) : (
                                            <Image className="w-12 h-12 text-gray-700" />
                                        )}
                                    </div>

                                    {/* INFO */}
                                    <div className="p-3">
                                        <p className="text-white font-mono text-sm font-bold mb-1">{item.title}</p>
                                        {artist && (
                                            <p className="text-pink-400 text-xs font-mono mb-2">{artist.name}</p>
                                        )}
                                        
                                        {/* VIBE TAG */}
                                        {item.vibe && (
                                            <div className="inline-block px-2 py-1 bg-cyan-900/40 border border-cyan-500/50 mb-2">
                                                <p className="text-cyan-400 text-xs font-mono">{item.vibe}</p>
                                            </div>
                                        )}

                                        {/* WHERE POSTED */}
                                        {item.posted_where && item.posted_where.length > 0 && (
                                            <p className="text-gray-500 text-xs font-mono mb-1">
                                                📍 {item.posted_where.join(', ')}
                                            </p>
                                        )}

                                        {/* ENGAGEMENT NOTE */}
                                        {item.engagement && (
                                            <p className="text-gray-400 text-xs font-mono italic">
                                                "{item.engagement}"
                                            </p>
                                        )}

                                        {/* RIGHTS */}
                                        <div className="mt-2 pt-2 border-t border-gray-800">
                                            <p className="text-gray-600 text-xs font-mono">
                                                {item.can_repost ? '✓ Can repost' : '✗ Rights locked'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to={createPageUrl('ScottManager')} className="text-gray-600 text-sm font-mono hover:text-gray-400">
                        ← Back to Kingdom
                    </Link>
                </div>

            </div>
        </div>
    );
}