import React from 'react';
import ScottOfflineMesh from '@/components/scott/ScottOfflineMesh';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * SCOTT OFFLINE MODE PAGE
 * For gigs/festivals with no internet
 */

export default function ScottOfflineMode() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto" />
                    <h1 className="text-4xl font-black font-mono text-white">
                        OFFLINE MODE
                    </h1>
                    <p className="text-gray-400 text-sm">
                        KINGDOM51 works at gigs/festivals with zero internet ⚡
                    </p>
                </div>

                {/* Main Component */}
                <ScottOfflineMesh />

                {/* Info Card */}
                <Card className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border-2 border-cyan-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white font-black">
                            <Zap className="w-6 h-6 text-cyan-400" />
                            WHY THIS MATTERS
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300">
                        <p>
                            <strong className="text-white">Festivals = Dead Zones:</strong> No signal, 
                            dead batteries, overloaded networks. You need your gig info NOW.
                        </p>
                        <p>
                            <strong className="text-white">Mesh Sharing:</strong> Share critical data 
                            with your team via Bluetooth/file sharing - no internet needed.
                        </p>
                        <p>
                            <strong className="text-white">Auto-Sync:</strong> When you're back online, 
                            everything syncs automatically. Zero effort.
                        </p>
                        <div className="pt-4 border-t border-gray-700">
                            <Link 
                                to={createPageUrl('ScottManager')}
                                className="text-cyan-400 hover:text-cyan-300 font-bold"
                            >
                                ← Back to KINGDOM51
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}