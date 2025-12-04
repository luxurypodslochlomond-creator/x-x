
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Cleanup } from '@/entities/Cleanup';
import { ProofOfLove } from '@/entities/ProofOfLove';
import { Transaction } from '@/entities/Transaction';
import { MissionContribution } from '@/entities/MissionContribution'; // NEW: Import MissionContribution
import L from 'leaflet';
import { Leaf, Heart, MapPin, Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { createRetryWrapper } from '@/components/shared/NetworkUtils';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons
const createCustomIcon = (color, IconComponent) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, ${color}, ${color}dd);
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="transform: rotate(45deg);">
                    ${IconComponent}
                </div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
};

const cleanupIcon = createCustomIcon('#10b981', '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"/></svg>');
const loveIcon = createCustomIcon('#ec4899', '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>');
const passItOnIcon = createCustomIcon('#8b5cf6', '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>');
// NEW: Orange icon for missions
const missionIcon = createCustomIcon('#f97316', '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>');

// MISSION LOCATIONS - hardcoded because they're real organizations
const MISSION_LOCATIONS = {
    'doctors-without-borders': { lat: 48.8566, lng: 2.3522, name: 'Doctors Without Borders (Global HQ - Paris)' },
    'palestine-medical': { lat: 31.9522, lng: 35.2332, name: 'Palestine Medical Relief (Jerusalem)' },
    'ukraine-relief': { lat: 50.4501, lng: 30.5234, name: 'Ukraine Humanitarian Support (Kyiv)' },
    'world-food-programme': { lat: 41.9028, lng: 12.4964, name: 'World Food Programme (Rome HQ)' },
    'homelessness-support': { lat: 55.8642, lng: -4.2518, name: 'Street Outreach (Glasgow)' },
    'mental-health-crisis': { lat: 51.5074, lng: -0.1278, name: 'Mental Health Crisis Services (London)' },
    'jane-goodall': { lat: -6.7924, lng: 39.2083, name: 'Jane Goodall Institute (Tanzania)' },
    'ocean-cleanup': { lat: 52.3676, lng: 4.9041, name: 'Ocean Cleanup (Netherlands HQ)' },
    'surfers-against-sewage': { lat: 50.2660, lng: -5.0527, name: 'Surfers Against Sewage (Cornwall)' },
    'loch-lomond-trust': { lat: 56.1056, lng: -4.5600, name: 'Loch Lomond & Trossachs (Scotland)' },
    'amazon-rainforest': { lat: -3.4653, lng: -62.2159, name: 'Amazon Rainforest Protection (Brazil)' },
    'reforestation': { lat: 0, lng: 0, name: 'Global Reforestation (Worldwide)' },
    'water-liberation': { lat: 39.7392, lng: -104.9903, name: 'Water.org (Denver HQ)' },
    'malala-fund': { lat: 51.5074, lng: -0.1278, name: 'Malala Fund (London Office)' },
    'education-access': { lat: 40.7128, lng: -74.0060, name: 'Universal Education Access (New York)' },
    'disaster-response': { lat: 46.2044, lng: 6.1432, name: 'Emergency Disaster Relief (Geneva)' },
    'clean-water': { lat: 0, lng: 0, name: 'Clean Water Projects (Worldwide)' }
};

function MapUpdater({ markers }) {
    const map = useMap();
    
    useEffect(() => {
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
    }, [markers, map]);
    
    return null;
}

export default function CoolAsFuckMap() {
    const [markers, setMarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadMapData();
    }, []);

    const loadMapData = async () => {
        try {
            const retryableCleanupList = createRetryWrapper(Cleanup.list.bind(Cleanup), 2, 3000);
            const retryableProofList = createRetryWrapper(ProofOfLove.list.bind(ProofOfLove), 2, 3000);
            const retryableTransactionList = createRetryWrapper(Transaction.list.bind(Transaction), 2, 3000);
            const retryableMissionList = createRetryWrapper(MissionContribution.list.bind(MissionContribution), 2, 3000); // NEW: MissionContribution list

            const [cleanups, proofs, transactions, missions] = await Promise.all([ // NEW: Add missions
                retryableCleanupList('-created_date', 100),
                retryableProofList('-created_date', 100),
                retryableTransactionList('-created_date', 100),
                retryableMissionList('-created_date', 100) // NEW: Fetch missions
            ]);

            const allMarkers = [];

            // Add cleanups
            cleanups.forEach(cleanup => {
                if (cleanup.coordinates?.lat && cleanup.coordinates?.lng) {
                    allMarkers.push({
                        lat: cleanup.coordinates.lat,
                        lng: cleanup.coordinates.lng,
                        type: 'cleanup',
                        data: cleanup,
                        icon: cleanupIcon
                    });
                }
            });

            // Add acts of love
            proofs.forEach(proof => {
                if (proof.coordinates?.lat && proof.coordinates?.lng) {
                    allMarkers.push({
                        lat: proof.coordinates.lat,
                        lng: proof.coordinates.lng,
                        type: 'love',
                        data: proof,
                        icon: loveIcon
                    });
                }
            });

            // Add Pass It On transmissions (only ones with location data)
            // For now, we'll use the sender's location if available
            // In future, could add location to Transaction entity
            transactions.forEach(tx => {
                if (tx.transaction_type === 'sent' && tx.to_user) {
                    // Could fetch user location here if we had it
                    // For now, skip location-based Pass It On markers
                }
            });

            // Add funded missions - NEW
            const missionTotals = {};
            missions.forEach(mission => {
                if (!missionTotals[mission.mission_id]) {
                    missionTotals[mission.mission_id] = {
                        total_gmt: 0,
                        contributor_count: 0,
                        mission_name: mission.mission_name
                    };
                }
                missionTotals[mission.mission_id].total_gmt += mission.gmt_amount || 0;
                missionTotals[mission.mission_id].contributor_count += 1;
            });

            // Create markers for funded missions
            Object.keys(missionTotals).forEach(missionId => {
                const location = MISSION_LOCATIONS[missionId];
                if (location && location.lat !== 0 && location.lng !== 0) { // Skip worldwide missions (lat/lng = 0)
                    allMarkers.push({
                        lat: location.lat,
                        lng: location.lng,
                        type: 'mission',
                        data: {
                            mission_id: missionId,
                            mission_name: missionTotals[missionId].mission_name,
                            location_name: location.name,
                            total_gmt: missionTotals[missionId].total_gmt,
                            contributor_count: missionTotals[missionId].contributor_count
                        },
                        icon: missionIcon // Use the new orange mission icon
                    });
                }
            });

            setMarkers(allMarkers);
        } catch (error) {
            console.error("Failed to load map data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getMarkerPopup = (marker) => {
        if (marker.type === 'cleanup') {
            return (
                <div className="text-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-green-500" />
                        <strong className="text-green-700">Planetary Healing</strong>
                    </div>
                    <p><strong>{marker.data.litter_weight}kg</strong> healed</p>
                    <p className="text-gray-600">{marker.data.location}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {new Date(marker.data.created_date).toLocaleDateString()}
                    </p>
                </div>
            );
        } else if (marker.type === 'love') {
            return (
                <div className="text-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <strong className="text-pink-700">Act of Love</strong>
                    </div>
                    <p className="font-semibold capitalize">{marker.data.love_type?.replace(/_/g, ' ')}</p>
                    <p className="text-gray-600 line-clamp-2">{marker.data.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {new Date(marker.data.created_date).toLocaleDateString()}
                    </p>
                </div>
            );
        } else if (marker.type === 'mission') { // NEW: Mission popup
            return (
                <div className="text-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <strong className="text-orange-700">Funded Mission</strong>
                    </div>
                    <p className="font-semibold">{marker.data.mission_name}</p>
                    <p className="text-gray-600 text-xs mb-2">{marker.data.location_name}</p>
                    <div className="bg-orange-50 rounded p-2 mt-2">
                        <p className="font-bold text-orange-700">{marker.data.total_gmt.toLocaleString()} ❤️GMT</p>
                        <p className="text-xs text-gray-600">from {marker.data.contributor_count} souls</p>
                    </div>
                </div>
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-900 to-purple-900">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            </div>
        );
    }

    if (markers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8 text-center">
                <MapPin className="w-16 h-16 text-cyan-400 mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">The Map Awaits</h3>
                <p className="text-gray-300">Be the first to heal the planet and light up the map.</p>
            </div>
        );
    }

    return (
        <MapContainer
            center={[markers[0].lat, markers[0].lng]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <MapUpdater markers={markers} />
            {markers.map((marker, index) => (
                <Marker 
                    key={`${marker.type}-${marker.data.id || marker.data.mission_id}-${index}`}
                    position={[marker.lat, marker.lng]}
                    icon={marker.icon}
                >
                    <Popup>
                        {getMarkerPopup(marker)}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
