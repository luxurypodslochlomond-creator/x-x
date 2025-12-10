import React from 'react';
import { DollarSign, Music, Radio, Tv, Users } from 'lucide-react';

/**
 * MUSIC RIGHTS BREAKDOWN
 * The diagram Scott tried to draw - but COOLASFUCK
 * Shows where money comes from in the music industry
 */

export default function ScottMusicRightsBreakdown() {
    return (
        <div className="bg-gradient-to-br from-purple-900/40 via-cyan-900/40 to-amber-900/40 border-4 border-amber-500 p-6">
            <h3 className="text-amber-400 font-black font-mono text-xl mb-4 text-center">
                THE MUSIC MONEY MAP 💰
            </h3>
            <p className="text-gray-400 text-xs font-mono text-center mb-6">
                Where every £ comes from (including other planets 😂)
            </p>

            {/* THE PIE */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* COMPOSITION RIGHTS */}
                <div className="bg-black/60 border-2 border-purple-500 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Music className="w-5 h-5 text-purple-400" />
                        <h4 className="text-purple-400 font-mono font-bold text-sm">COMPOSITION</h4>
                    </div>
                    <div className="text-xs font-mono text-gray-300 space-y-2">
                        <p className="text-purple-300 font-bold">Publishing Rights</p>
                        <p>• Performance (PRO) - radio, live, streaming</p>
                        <p>• Mechanical - physical/digital sales</p>
                        <p>• Sync - TV, film, ads, games</p>
                        <p className="text-amber-400 mt-2">Split: Writers + Publishers</p>
                    </div>
                </div>

                {/* MASTER RIGHTS */}
                <div className="bg-black/60 border-2 border-cyan-500 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Radio className="w-5 h-5 text-cyan-400" />
                        <h4 className="text-cyan-400 font-mono font-bold text-sm">MASTER</h4>
                    </div>
                    <div className="text-xs font-mono text-gray-300 space-y-2">
                        <p className="text-cyan-300 font-bold">Recording Ownership</p>
                        <p>• Streaming royalties</p>
                        <p>• Download sales</p>
                        <p>• Physical sales</p>
                        <p>• Master sync licenses</p>
                        <p className="text-amber-400 mt-2">Owner: Artist or Label</p>
                    </div>
                </div>

            </div>

            {/* PRODUCER POINTS */}
            <div className="bg-black/60 border-2 border-green-500 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-green-400" />
                    <h4 className="text-green-400 font-mono font-bold text-sm">PRODUCER POINTS</h4>
                </div>
                <div className="text-xs font-mono text-gray-300 space-y-2">
                    <p>• Producers get % of MASTER (not publishing)</p>
                    <p>• Typical: 2-5% (top producers: 10%+)</p>
                    <p>• Paid from artist's master share</p>
                    <p className="text-red-400 mt-2">Example: If artist gets 80% master, producer gets 3% = artist keeps 77%</p>
                </div>
            </div>

            {/* SYNC LICENSES */}
            <div className="bg-black/60 border-2 border-amber-500 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <Tv className="w-5 h-5 text-amber-400" />
                    <h4 className="text-amber-400 font-mono font-bold text-sm">SYNC = BIG MONEY</h4>
                </div>
                <div className="text-xs font-mono text-gray-300 space-y-2">
                    <p>• TV show uses song = sync license</p>
                    <p>• Need BOTH master + publishing clearance</p>
                    <p>• Master owner sets price, publishers set price</p>
                    <p className="text-green-400 mt-2">£££: Commercial £10k-£500k+, Film £50k-£1m+</p>
                </div>
            </div>

            {/* SCOTT'S JOB */}
            <div className="bg-gradient-to-r from-amber-900/60 to-purple-900/60 border-2 border-amber-500 p-4">
                <h4 className="text-amber-400 font-mono font-bold text-sm mb-2">SCOTT'S MISSION ☘️</h4>
                <div className="text-xs font-mono text-gray-300 space-y-1">
                    <p>✓ Artists own their masters</p>
                    <p>✓ Fair publishing deals</p>
                    <p>✓ Producer contracts locked in</p>
                    <p>✓ Sync opportunities maxed</p>
                    <p>✓ PRO registrations sorted</p>
                    <p className="text-green-400 mt-2">= Artists keep 80%+ of everything</p>
                </div>
            </div>

            {/* UNIVERSAL JOKE */}
            <div className="mt-4 bg-black/60 border border-gray-700 p-3">
                <p className="text-gray-500 text-xs font-mono italic text-center">
                    📡 "Including music on other planets" - Scott's contracts are FUTURE PROOF 😂🚀
                </p>
            </div>
        </div>
    );
}