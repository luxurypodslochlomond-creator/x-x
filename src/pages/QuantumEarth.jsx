import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Leaf, Music, Globe } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';

export default function QuantumEarthPage() {
    const [filterType, setFilterType] = useState('all');

    const { data: cleanups, isLoading: cleanupsLoading } = useQuery({
        queryKey: ['earthCleanups'],
        queryFn: async () => {
            try {
                const data = await base44.entities.Cleanup.list('-created_date', 50);
                return data || [];
            } catch (e) {
                return [];
            }
        },
        initialData: []
    });

    const { data: acts, isLoading: actsLoading } = useQuery({
        queryKey: ['earthActs'],
        queryFn: async () => {
            try {
                const data = await base44.entities.ProofOfLove.list('-created_date', 50);
                return data || [];
            } catch (e) {
                return [];
            }
        },
        initialData: []
    });

    const { data: music, isLoading: musicLoading } = useQuery({
        queryKey: ['earthMusic'],
        queryFn: async () => {
            try {
                const data = await base44.entities.Soundtrack.list('-created_date', 50);
                return data || [];
            } catch (e) {
                return [];
            }
        },
        initialData: []
    });

    if (cleanupsLoading || actsLoading || musicLoading) {
        return <QuantumLoader />;
    }

    const safeCleanups = Array.isArray(cleanups) ? cleanups : [];
    const safeActs = Array.isArray(acts) ? acts : [];
    const safeMusic = Array.isArray(music) ? music : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
                
                <header className="text-center space-y-4">
                    <Globe className="w-20 h-20 text-cyan-400 mx-auto" />
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        EARTH
                    </h1>
                    <p className="text-xl text-gray-300">Our Mother. Our responsibility. Our love.</p>
                    
                    <Link to={createPageUrl("NewCleanup")}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg mt-6">
                            Start Healing
                        </Button>
                    </Link>
                </header>

                <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-green-900/30 border-green-500/30">
                        <CardContent className="p-4 md:p-6 text-center">
                            <Leaf className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-3xl md:text-4xl font-black text-white">{safeCleanups.length}</p>
                            <p className="text-sm text-gray-400">Cleanups</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-pink-900/30 border-pink-500/30">
                        <CardContent className="p-4 md:p-6 text-center">
                            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                            <p className="text-3xl md:text-4xl font-black text-white">{safeActs.length}</p>
                            <p className="text-sm text-gray-400">Acts of Love</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-amber-900/30 border-amber-500/30">
                        <CardContent className="p-4 md:p-6 text-center">
                            <Music className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                            <p className="text-3xl md:text-4xl font-black text-white">{safeMusic.length}</p>
                            <p className="text-sm text-gray-400">Frequencies</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center py-12">
                    <Globe className="w-20 h-20 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-2xl text-white font-bold">Real-time map coming back soon</p>
                    <p className="text-gray-400 mt-2">BRO51 + AI51 fixing the quantum field</p>
                </div>

            </div>
        </div>
    );
}