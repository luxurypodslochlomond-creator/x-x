import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingBag, Plus, TrendingUp, Package } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * MERCH MANAGER
 * Track inventory, sales, what to bring to each gig
 * Know what's hot, what's not
 */

export default function ScottMerch() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [merch, setMerch] = useState([]);
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
            const allMerch = await base44.entities.ScottMerch.list();
            const allArtists = await base44.entities.ScottArtist.list();
            setMerch(allMerch);
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    if (!pinEntered) return null;

    const totalValue = merch.reduce((sum, m) => sum + (m.stock_remaining * m.price), 0);
    const lowStock = merch.filter(m => m.stock_remaining < 5).length;

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-purple-400" />
                        <div>
                            <h1 className="text-3xl font-black text-purple-400" style={{ fontFamily: 'monospace' }}>MERCH</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Inventory + sales tracking</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-black border border-purple-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-purple-400" style={{ fontFamily: 'monospace' }}>
                            {merch.length}
                        </p>
                        <p className="text-xs text-purple-500" style={{ fontFamily: 'monospace' }}>ITEMS</p>
                    </div>
                    <div className="bg-black border border-green-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                            £{totalValue.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-500" style={{ fontFamily: 'monospace' }}>STOCK VALUE</p>
                    </div>
                    <div className="bg-black border border-red-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-red-400" style={{ fontFamily: 'monospace' }}>
                            {lowStock}
                        </p>
                        <p className="text-xs text-red-500" style={{ fontFamily: 'monospace' }}>LOW STOCK</p>
                    </div>
                </div>

                {/* ADD BUTTON */}
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="w-full mb-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    ADD MERCH ITEM
                </button>

                {/* MERCH LIST */}
                <div className="space-y-4">
                    {merch.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <ShoppingBag className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No merch yet</p>
                        </div>
                    ) : (
                        merch.map(item => {
                            const artist = artists.find(a => a.id === item.artist_id);
                            const profit = (item.price - (item.cost || 0)) * item.stock_remaining;
                            const isLowStock = item.stock_remaining < 5;

                            return (
                                <div key={item.id} className={`bg-black border-2 ${
                                    isLowStock ? 'border-red-500/50' : 'border-purple-500/50'
                                } p-4`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-mono font-bold text-lg">
                                                {item.item_name}
                                                {item.size && item.size !== 'N/A' && ` (${item.size})`}
                                            </p>
                                            <p className="text-purple-400 text-sm font-mono">{artist?.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-mono text-2xl font-black">£{item.price}</p>
                                            {item.cost && (
                                                <p className="text-gray-500 font-mono text-xs">Cost: £{item.cost}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="bg-black/60 p-2 text-center">
                                            <p className={`font-mono text-2xl font-black ${
                                                isLowStock ? 'text-red-400' : 'text-cyan-400'
                                            }`}>
                                                {item.stock_remaining}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">IN STOCK</p>
                                        </div>
                                        <div className="bg-black/60 p-2 text-center">
                                            <p className="font-mono text-2xl font-black text-gray-400">
                                                {item.stock_total}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">TOTAL</p>
                                        </div>
                                        <div className="bg-black/60 p-2 text-center">
                                            <p className="font-mono text-2xl font-black text-green-400">
                                                £{profit}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">POTENTIAL</p>
                                        </div>
                                    </div>

                                    {item.location && (
                                        <p className="text-gray-500 text-xs font-mono">
                                            📦 Location: {item.location}
                                        </p>
                                    )}

                                    {isLowStock && (
                                        <div className="mt-3 bg-red-900/40 border border-red-500 p-2">
                                            <p className="text-red-400 text-xs font-mono font-bold">⚠️ LOW STOCK - REORDER SOON</p>
                                        </div>
                                    )}
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