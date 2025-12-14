import React, { useState, useEffect } from 'react';
import { useMesh } from '@/components/shared/MeshNetwork';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, Download, Upload, Wifi, Radio, CheckCircle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * SCOTT OFFLINE MESH - KINGDOM51 @ GIGS/FESTIVALS
 * 
 * Critical data available offline:
 * - Events (gigs)
 * - Accommodation
 * - Guest lists
 * - Contracts
 * - Travel info
 * - Team contacts
 * 
 * Syncs via mesh when no internet
 */

export default function ScottOfflineMesh() {
    const { isOnline, saveOffline, loadOffline, shareP2P, syncAll, syncStatus } = useMesh();
    const [offlineData, setOfflineData] = useState(null);
    const [lastCached, setLastCached] = useState(null);

    // Fetch all critical data
    const { data: events } = useQuery({
        queryKey: ['scottEvents'],
        queryFn: () => base44.entities.ScottEvent.list(),
        enabled: isOnline
    });

    const { data: accommodation } = useQuery({
        queryKey: ['scottAccommodation'],
        queryFn: () => base44.entities.ScottAccommodation.list(),
        enabled: isOnline
    });

    const { data: guestLists } = useQuery({
        queryKey: ['scottGuestLists'],
        queryFn: () => base44.entities.ScottGuestList.list(),
        enabled: isOnline
    });

    const { data: contracts } = useQuery({
        queryKey: ['scottContracts'],
        queryFn: () => base44.entities.ScottContract.list(),
        enabled: isOnline
    });

    // Cache all data when online
    useEffect(() => {
        if (isOnline && events && accommodation && guestLists && contracts) {
            const payload = {
                events,
                accommodation,
                guestLists,
                contracts,
                cached_at: Date.now()
            };

            saveOffline('kingdom51_critical', payload);
            setLastCached(Date.now());
        }
    }, [events, accommodation, guestLists, contracts, isOnline]);

    // Load cached data when offline
    useEffect(() => {
        if (!isOnline) {
            loadOffline('kingdom51_critical').then(data => {
                if (data) {
                    setOfflineData(data);
                    setLastCached(data.cached_at);
                }
            });
        }
    }, [isOnline]);

    // Share critical data with team
    const handleShareToTeam = async () => {
        const dataToShare = isOnline ? {
            events,
            accommodation,
            guestLists,
            contracts
        } : offlineData;

        const result = await shareP2P(dataToShare, 'KINGDOM51 Critical Data');
        
        if (result.success) {
            alert(`Shared via ${result.method === 'web_share' ? 'Bluetooth/NFC' : 'Clipboard'} ⚡`);
        } else {
            alert('Share failed: ' + result.error);
        }
    };

    // Import data from file
    const handleImportData = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const payload = JSON.parse(text);

            // Save received data
            await saveOffline('kingdom51_critical', payload.data);
            setOfflineData(payload.data);
            alert('Data imported successfully ⚡');
        } catch (error) {
            alert('Import failed: ' + error.message);
        }
    };

    const activeData = isOnline ? {
        events: events || [],
        accommodation: accommodation || [],
        guestLists: guestLists || [],
        contracts: contracts || []
    } : offlineData;

    return (
        <div className="space-y-6">
            {/* Status Card */}
            <Card className="bg-black border-2 border-cyan-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        {isOnline ? (
                            <Wifi className="w-6 h-6 text-green-400" />
                        ) : (
                            <Radio className="w-6 h-6 text-amber-400" />
                        )}
                        <span className="text-white font-black font-mono">
                            {isOnline ? 'ONLINE MODE' : 'OFFLINE MESH'}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-400 text-sm">
                        {isOnline 
                            ? 'All data synced. Critical info cached for offline use.'
                            : 'No internet. Running on cached data + mesh sharing.'
                        }
                    </p>

                    {lastCached && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>
                                Last cached: {new Date(lastCached).toLocaleString()}
                            </span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            onClick={handleShareToTeam}
                            className="bg-cyan-600 hover:bg-cyan-700 gap-2"
                            disabled={!activeData}
                        >
                            <Share2 className="w-4 h-4" />
                            Share to Team
                        </Button>

                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportData}
                                className="hidden"
                            />
                            <Button
                                as="span"
                                variant="outline"
                                className="gap-2 border-cyan-500 text-cyan-400"
                            >
                                <Upload className="w-4 h-4" />
                                Import Data
                            </Button>
                        </label>

                        {!isOnline && syncStatus === 'idle' && (
                            <Button
                                onClick={syncAll}
                                variant="outline"
                                className="gap-2 border-green-500 text-green-400"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Force Sync
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Data Summary */}
            {activeData && (
                <Card className="bg-black border-2 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white font-black font-mono">
                            CACHED DATA
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                                <p className="text-2xl font-black text-cyan-400">
                                    {activeData.events?.length || 0}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">EVENTS</p>
                            </div>
                            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                                <p className="text-2xl font-black text-pink-400">
                                    {activeData.accommodation?.length || 0}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">ACCOMMODATION</p>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                <p className="text-2xl font-black text-green-400">
                                    {activeData.guestLists?.length || 0}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">GUEST LISTS</p>
                            </div>
                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                <p className="text-2xl font-black text-amber-400">
                                    {activeData.contracts?.length || 0}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">CONTRACTS</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Usage Instructions */}
            <Card className="bg-black border-2 border-gray-700">
                <CardContent className="p-6">
                    <h3 className="text-white font-black mb-4">HOW IT WORKS</h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>✅ <strong className="text-white">Online:</strong> All data cached automatically</p>
                        <p>✅ <strong className="text-white">Offline:</strong> Access cached data instantly</p>
                        <p>✅ <strong className="text-white">Share:</strong> Send data to team via Bluetooth/file</p>
                        <p>✅ <strong className="text-white">Import:</strong> Receive data from team</p>
                        <p>✅ <strong className="text-white">Sync:</strong> Auto-syncs when back online</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}