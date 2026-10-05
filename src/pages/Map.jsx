import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Heart, Gift, Music } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';
import LiveImpactFeed from '@/components/map/LiveImpactFeed';
import { COOLASFUCKGlobe } from '@/components/shared/COOLASFUCKIcon';

// Custom quantum marker icons
const createQuantumIcon = (IconComponent, color, glowColor) => {
    const iconHtml = `
        <div style="position: relative; width: 40px; height: 40px;">
            <div style="
                position: absolute;
                inset: 0;
                background: ${color};
                border-radius: 50%;
                animation: quantumPulse 2s infinite;
                box-shadow: 0 0 20px ${glowColor}, 0 0 40px ${glowColor};
            "></div>
            <div style="
                position: absolute;
                inset: 6px;
                background: black;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid ${color};
            ">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${getIconPath(IconComponent)}
                </svg>
            </div>
        </div>
        <style>
            @keyframes quantumPulse {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50% { transform: scale(1.1); opacity: 1; }
            }
        </style>
    `;
    
    return L.divIcon({
        html: iconHtml,
        className: 'quantum-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
};

const getIconPath = (IconComponent) => {
    if (IconComponent === Leaf) {
        return '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>';
    }
    if (IconComponent === Heart) {
        return '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>';
    }
    if (IconComponent === Gift) {
        return '<rect width="18" height="18" x="3" y="8" rx="2"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>';
    }
    if (IconComponent === Music) {
        return '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>';
    }
    return '';
};

const icons = {
    planetary_healing: createQuantumIcon(Leaf, '#22c55e', '#22c55e'),
    act_of_love: createQuantumIcon(Heart, '#ec4899', '#ec4899'),
    funded_mission: createQuantumIcon(Gift, '#f97316', '#f97316'),
    music_frequency: createQuantumIcon(Music, '#06b6d4', '#06b6d4'), // Changed from purple to cyan
};

const MapLegend = () => (
    <div className="absolute top-4 left-4 z-[1000] bg-black/90 backdrop-blur-sm p-4 rounded-xl border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <h3 className="text-white font-bold mb-3 text-lg">Map of Love</h3>
        <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-green-400" style={{ filter: 'drop-shadow(0 0 8px #22c55e)' }} />
                <span className="text-gray-200">Planetary Healing</span>
            </div>
            <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-pink-400" style={{ filter: 'drop-shadow(0 0 8px #ec4899)' }} />
                <span className="text-gray-200">Acts of Love</span>
            </div>
            <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-orange-400" style={{ filter: 'drop-shadow(0 0 8px #f97316)' }} />
                <span className="text-gray-200">Funded Missions</span>
            </div>
            <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-cyan-400" style={{ filter: 'drop-shadow(0 0 8px #06b6d4)' }} />
                <span className="text-gray-200">Healing Frequencies</span>
            </div>
        </div>
    </div>
);

const QuantumPopup = ({ type, data, isLive }) => {
    const colors = {
        planetary_healing: 'text-green-400',
        act_of_love: 'text-pink-400',
        funded_mission: 'text-orange-400',
        music_frequency: 'text-cyan-400' // Changed from purple to cyan
    };
    
    return (
        <div className="bg-black/95 text-white p-3 rounded-lg border border-cyan-500/30 min-w-[200px]">
            <h4 className={`font-bold mb-2 ${colors[type]}`}>
                {type === 'planetary_healing' && '🌍 Planetary Healing'}
                {type === 'act_of_love' && '❤️ Act of Love'}
                {type === 'funded_mission' && '🎁 Funded Mission'}
                {type === 'music_frequency' && (
                    <>
                        🎵 Healing Frequency {isLive && <span className="text-sm font-normal text-red-500">(Live)</span>}
                    </>
                )}
            </h4>
            {type === 'music_frequency' ? (
                <>
                    <p className="text-sm font-bold text-white">{data.title}</p>
                    <p className="text-xs text-cyan-400 mt-1">by {data.artist}</p>
                    <p className="text-xs text-gray-400 mt-1">{data.frequency_type} frequency</p>
                    {data.play_count > 0 && (
                        <p className="text-xs text-cyan-400 mt-2">
                            {data.play_count.toLocaleString()} souls reached
                        </p>
                    )}
                </>
            ) : (
                <>
                    <p className="text-sm text-gray-300">{data.location}</p>
                    {data.litter_weight && <p className="text-xs text-cyan-400 mt-1">{data.litter_weight}kg removed</p>}
                    {data.love_type && <p className="text-xs text-pink-400 mt-1">{data.love_type.replace(/_/g, ' ')}</p>}
                </>
            )}
        </div>
    );
};

const CoolAsFuckMap = ({ cleanups, proofs, tracks, plays, isLoading, position }) => {
    if (typeof window === 'undefined') {
        return <QuantumLoader />;
    }

    return (
        <div className="h-[60vh] md:h-[70vh] w-full rounded-2xl overflow-hidden border-4 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] relative">
            {isLoading && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-[1001]">
                    <QuantumLoader />
                </div>
            )}
            <MapContainer 
                center={position} 
                zoom={3} 
                scrollWheelZoom={true} 
                className="h-full w-full"
                style={{ background: '#0a0a0a' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapLegend />

                {cleanups?.map(c => c.coordinates?.lat && c.coordinates?.lng && (
                    <Marker 
                        key={`c-${c.id}`} 
                        position={[c.coordinates.lat, c.coordinates.lng]} 
                        icon={icons.planetary_healing}
                    >
                        <Popup className="quantum-popup">
                            <QuantumPopup type="planetary_healing" data={c} />
                        </Popup>
                    </Marker>
                ))}
                
                {proofs?.map(p => p.coordinates?.lat && p.coordinates?.lng && (
                    <Marker 
                        key={`p-${p.id}`} 
                        position={[p.coordinates.lat, p.coordinates.lng]} 
                        icon={icons.act_of_love}
                    >
                        <Popup className="quantum-popup">
                            <QuantumPopup type="act_of_love" data={p} />
                        </Popup>
                    </Marker>
                ))}

                {/* Display static Soundtrack markers (these are not 'live plays' in the FrequencyPlay sense) */}
                {tracks?.map(t => t.coordinates?.lat && t.coordinates?.lng && (
                    <Marker 
                        key={`t-${t.id}`} 
                        position={[t.coordinates.lat, t.coordinates.lng]} 
                        icon={icons.music_frequency}
                    >
                        <Popup className="quantum-popup">
                            <QuantumPopup type="music_frequency" data={t} isLive={false} /> 
                        </Popup>
                    </Marker>
                ))}

                {/* Display live FrequencyPlays. The query already filters for live instances. */}
                {plays?.map(play => play.coordinates?.lat && play.coordinates?.lng && (
                    <Marker 
                        key={`play-${play.id}`} 
                        position={[play.coordinates.lat, play.coordinates.lng]} 
                        icon={icons.music_frequency}
                    >
                        <Popup className="quantum-popup">
                            <QuantumPopup type="music_frequency" data={play} isLive={true} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default function MapPage() {
    const { data: cleanups, isLoading: loadingCleanups } = useQuery({
        queryKey: ['mapCleanups'],
        queryFn: () => base44.entities.Cleanup.filter({ coordinates: { "$ne": null } }, '-created_date', 200)
    });

    const { data: proofs, isLoading: loadingProofs } = useQuery({
        queryKey: ['mapProofsOfLove'],
        queryFn: () => base44.entities.ProofOfLove.filter({ coordinates: { "$ne": null } }, '-created_date', 200)
    });

    const { data: tracks, isLoading: loadingTracks } = useQuery({
        queryKey: ['mapSoundtracks'],
        queryFn: () => base44.entities.Soundtrack.filter({ coordinates: { "$ne": null } }, '-created_date', 200)
    });

    const { data: plays, isLoading: loadingPlays } = useQuery({
        queryKey: ['mapFrequencyPlays'],
        queryFn: async () => {
            const now = new Date().toISOString();
            return base44.entities.FrequencyPlay.filter({ 
                coordinates: { "$ne": null },
                expires_at: { "$gte": now } // Filter for plays that are currently active/live
            }, '-created_date', 100);
        },
        refetchInterval: 30000 // Keep refetch interval for live updates
    });

    const isLoading = loadingCleanups || loadingProofs || loadingTracks || loadingPlays;
    const position = [55.9533, -3.1883]; // Default to Edinburgh

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-green-950/50 to-black text-white p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="text-center space-y-4 mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center"
                    >
                        <COOLASFUCKGlobe size={80} animate={true} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        MAP OF LOVE
                    </h1>
                    <p className="text-lg text-gray-300 flex items-center justify-center gap-2">
                        <Leaf className="w-4 h-4 text-green-400" />
                        Real-Time Acts of Love Across Earth
                        <Leaf className="w-4 h-4 text-green-400" />
                    </p>
                </header>
                
                {/* LIVE IMPACT FEED + MAP GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* LIVE IMPACT FEED - LEFT COLUMN */}
                    <div className="lg:col-span-1">
                        <LiveImpactFeed />
                    </div>

                    {/* MAP - RIGHT 2 COLUMNS */}
                    <div className="lg:col-span-2">
                        <Card className="bg-black/60 border-2 border-cyan-500/30">
                            <CardContent className="p-0">
                                <CoolAsFuckMap 
                                    cleanups={cleanups} 
                                    proofs={proofs} 
                                    tracks={tracks} 
                                    plays={plays} 
                                    isLoading={isLoading} 
                                    position={position} 
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Card className="bg-black/50 border-2 border-cyan-500/30 max-w-2xl mx-auto">
                        <CardContent className="p-6">
                            <p className="text-gray-300 text-lg">
                                Every dot is a soul healing the planet. Every marker is proof that love is not just a feeling - it's a <span className="text-cyan-400 font-mono">P51</span> currency.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}