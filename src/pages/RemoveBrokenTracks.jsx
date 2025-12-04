import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';

export default function RemoveBrokenTracks() {
    const queryClient = useQueryClient();
    const [removing, setRemoving] = useState(false);
    const [removed, setRemoved] = useState(false);

    const { data: tracks, isLoading } = useQuery({
        queryKey: ['allTracks'],
        queryFn: () => base44.entities.Soundtrack.list('-sequence', 500)
    });

    const handleRemoveBroken = async () => {
        setRemoving(true);
        try {
            // Find tracks with freesound.org URLs (broken webpage links)
            const brokenTracks = tracks.filter(t => 
                t.file_url && (
                    t.file_url.includes('freesound.org/people') ||
                    t.artist === 'Universal Healing Frequencies'
                )
            );

            console.log('Removing broken tracks:', brokenTracks);

            for (const track of brokenTracks) {
                await base44.entities.Soundtrack.delete(track.id);
                console.log('Deleted:', track.title);
            }

            queryClient.invalidateQueries({ queryKey: ['soundtracks'] });
            queryClient.invalidateQueries({ queryKey: ['allTracks'] });
            
            setRemoved(true);
            setTimeout(() => {
                window.location.href = '/QuantumJukebox';
            }, 2000);
        } catch (error) {
            console.error('Error removing tracks:', error);
            alert('Failed to remove tracks: ' + error.message);
        }
        setRemoving(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
        );
    }

    const brokenTracks = tracks?.filter(t => 
        t.file_url && (
            t.file_url.includes('freesound.org/people') ||
            t.artist === 'Universal Healing Frequencies'
        )
    ) || [];

    if (removed) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Card className="bg-green-900/30 border border-green-500/50 max-w-md">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-green-400 mb-4">✓ Cleaned Up!</h2>
                        <p className="text-gray-300">Redirecting to Jukebox...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black text-white p-8">
            <Card className="bg-black/50 border border-red-500/30 max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6" />
                        Admin: Remove Broken Healing Frequencies
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-300">
                        Found <strong className="text-red-400">{brokenTracks.length}</strong> tracks with broken Freesound webpage URLs.
                    </p>
                    
                    {brokenTracks.length > 0 && (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {brokenTracks.map(track => (
                                <div key={track.id} className="bg-red-900/20 p-3 rounded border border-red-500/30">
                                    <p className="font-bold text-white">{track.title}</p>
                                    <p className="text-xs text-gray-400 truncate">{track.file_url}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button 
                        onClick={handleRemoveBroken}
                        disabled={removing || brokenTracks.length === 0}
                        className="bg-red-600 hover:bg-red-700 w-full text-lg py-6"
                    >
                        {removing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Removing...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-5 h-5 mr-2" />
                                Remove {brokenTracks.length} Broken Tracks
                            </>
                        )}
                    </Button>

                    {brokenTracks.length === 0 && (
                        <div className="bg-green-900/30 p-4 rounded border border-green-500/30">
                            <p className="text-green-400 font-bold">✓ No broken tracks found!</p>
                            <p className="text-sm text-gray-300 mt-2">Jukebox should work fine now.</p>
                        </div>
                    )}

                    <div className="bg-cyan-900/30 p-4 rounded border border-cyan-500/30 mt-6">
                        <p className="text-sm text-cyan-300 font-bold mb-2">FOR HEALING FREQUENCIES:</p>
                        <p className="text-xs text-gray-300">Just use YouTube for now ("528 hz pure tone" etc). Works the same for healing.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}