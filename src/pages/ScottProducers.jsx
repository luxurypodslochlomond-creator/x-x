import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Headphones, Plus, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * PRODUCER ROLODEX
 * Track producers, their rates, points, credits
 * Who to call for what vibe
 */

export default function ScottProducers() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [producers, setProducers] = useState([]);

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
            const allProducers = await base44.entities.ScottProducer.list();
            setProducers(allProducers);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    if (!pinEntered) return null;

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Headphones className="w-8 h-8 text-purple-400" />
                        <div>
                            <h1 className="text-3xl font-black text-purple-400" style={{ fontFamily: 'monospace' }}>PRODUCERS</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>The hit makers</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-black border border-purple-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-purple-400" style={{ fontFamily: 'monospace' }}>
                            {producers.length}
                        </p>
                        <p className="text-xs text-purple-500" style={{ fontFamily: 'monospace' }}>IN NETWORK</p>
                    </div>
                    <div className="bg-black border border-cyan-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>
                            {producers.reduce((sum, p) => sum + (p.credits?.length || 0), 0)}
                        </p>
                        <p className="text-xs text-cyan-500" style={{ fontFamily: 'monospace' }}>CREDITS</p>
                    </div>
                </div>

                {/* LIST */}
                <div className="space-y-4">
                    {producers.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Headphones className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No producers yet</p>
                        </div>
                    ) : (
                        producers.map(producer => (
                            <div key={producer.id} className="bg-black border-2 border-purple-500/50 p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <p className="text-white font-mono font-bold text-lg">{producer.name}</p>
                                        <p className="text-purple-400 text-sm font-mono uppercase">{producer.role}</p>
                                    </div>
                                    <div className="text-right">
                                        {producer.standard_rate && (
                                            <p className="text-green-400 font-mono text-xl font-black">£{producer.standard_rate}</p>
                                        )}
                                        {producer.standard_points && (
                                            <p className="text-cyan-400 font-mono text-sm">{producer.standard_points}% points</p>
                                        )}
                                    </div>
                                </div>

                                {/* CREDITS */}
                                {producer.credits && producer.credits.length > 0 && (
                                    <div className="bg-black/60 p-3 mb-2">
                                        <p className="text-amber-400 text-xs font-mono font-bold mb-2 flex items-center gap-1">
                                            <Award className="w-3 h-3" /> CREDITS:
                                        </p>
                                        {producer.credits.map((credit, i) => (
                                            <div key={i} className="text-xs font-mono text-gray-400 mb-1">
                                                {credit.track_name} - {credit.artist_name}
                                                {credit.points_agreed && <span className="text-cyan-400 ml-2">({credit.points_agreed}%)</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* CONTACT */}
                                <div className="text-xs font-mono text-gray-500">
                                    {producer.contact_email && <p>📧 {producer.contact_email}</p>}
                                    {producer.contact_phone && <p>📱 {producer.contact_phone}</p>}
                                </div>
                            </div>
                        ))
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