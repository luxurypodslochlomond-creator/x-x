import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Music, Plus, DollarSign, Percent } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import ScottMusicRightsBreakdown from '@/components/scott/ScottMusicRightsBreakdown';

/**
 * PUBLISHING RIGHTS TRACKER
 * Track who owns what, who gets paid what
 * Writers, publishers, master ownership, splits
 * The industry bible - but COOLASFUCK
 */

export default function ScottPublishing() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

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
            const allTracks = await base44.entities.ScottPublishing.list();
            const allArtists = await base44.entities.ScottArtist.list();
            setTracks(allTracks);
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    if (!pinEntered) return null;

    const totalStreams = tracks.reduce((sum, t) => sum + (t.total_streams || 0), 0);
    const totalEarnings = tracks.reduce((sum, t) => sum + (t.estimated_earnings || 0), 0);

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Music className="w-8 h-8 text-purple-400" />
                        <div>
                            <h1 className="text-3xl font-black text-purple-400" style={{ fontFamily: 'monospace' }}>PUBLISHING</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Rights, royalties, catalogue</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* OVERVIEW STATS */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-black border border-purple-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-purple-400 mb-2" style={{ fontFamily: 'monospace' }}>
                            {tracks.length}
                        </p>
                        <p className="text-xs text-purple-500 tracking-wider" style={{ fontFamily: 'monospace' }}>TRACKS</p>
                    </div>
                    <div className="bg-black border border-cyan-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-cyan-400 mb-2" style={{ fontFamily: 'monospace' }}>
                            {(totalStreams / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-xs text-cyan-500 tracking-wider" style={{ fontFamily: 'monospace' }}>STREAMS</p>
                    </div>
                    <div className="bg-black border border-green-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-green-400 mb-2" style={{ fontFamily: 'monospace' }}>
                            £{totalEarnings.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-500 tracking-wider" style={{ fontFamily: 'monospace' }}>EARNINGS</p>
                    </div>
                </div>

                {/* THE KNOWLEDGE - VISUAL BREAKDOWN */}
                <ScottMusicRightsBreakdown />

                {/* ADD BUTTON */}
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="w-full mb-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    ADD TRACK TO CATALOGUE
                </button>

                {/* TRACKS LIST */}
                <div className="space-y-4">
                    {tracks.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Music className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No tracks in catalogue yet</p>
                        </div>
                    ) : (
                        tracks.map(track => {
                            const artist = artists.find(a => a.id === track.artist_id);
                            return (
                                <div key={track.id} className="bg-black border-2 border-purple-500/50 p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-white font-mono font-bold text-lg">{track.track_title}</p>
                                            <p className="text-purple-400 text-sm font-mono">{artist?.name}</p>
                                        </div>
                                        {track.total_streams > 0 && (
                                            <div className="text-right">
                                                <p className="text-cyan-400 font-mono text-sm">{(track.total_streams / 1000000).toFixed(1)}M streams</p>
                                                <p className="text-green-400 font-mono text-sm">£{track.estimated_earnings?.toLocaleString()}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* WRITERS */}
                                    {track.writers && track.writers.length > 0 && (
                                        <div className="bg-black/60 p-3 mb-2">
                                            <p className="text-amber-400 text-xs font-mono font-bold mb-2">WRITERS:</p>
                                            {track.writers.map((w, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs font-mono mb-1">
                                                    <span className="text-gray-300">{w.name} ({w.pro})</span>
                                                    <span className="text-amber-400">{w.share_percentage}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* MASTER OWNERSHIP */}
                                    {track.master_ownership && (
                                        <div className="bg-black/60 p-3 mb-2">
                                            <p className="text-cyan-400 text-xs font-mono font-bold mb-1">MASTER:</p>
                                            <p className="text-gray-300 text-xs font-mono">{track.master_ownership}</p>
                                        </div>
                                    )}

                                    {/* METADATA */}
                                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-500 mt-3 pt-3 border-t border-gray-800">
                                        {track.isrc && <p>ISRC: {track.isrc}</p>}
                                        {track.label && <p>Label: {track.label}</p>}
                                        {track.distributor && <p>Distributor: {track.distributor}</p>}
                                        {track.release_date && <p>Released: {track.release_date}</p>}
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