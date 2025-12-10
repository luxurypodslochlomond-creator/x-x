import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Bed, Plus, MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { format } from 'date-fns';

/**
 * ACCOMMODATION TRACKER
 * Tour hotels, Airbnbs, who's staying where
 * Auto-detected from booking emails
 */

export default function ScottAccommodation() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [accommodations, setAccommodations] = useState([]);
    const [events, setEvents] = useState([]);

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
            const allAccommodations = await base44.entities.ScottAccommodation.list('-check_in');
            const allEvents = await base44.entities.ScottEvent.list();
            setAccommodations(allAccommodations);
            setEvents(allEvents);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    if (!pinEntered) return null;

    const upcoming = accommodations.filter(a => new Date(a.check_in) >= new Date());
    const totalCost = accommodations.reduce((sum, a) => sum + (a.total_cost || 0), 0);

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Bed className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>ACCOMMODATION</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Tour stays sorted</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-black border border-cyan-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>
                            {upcoming.length}
                        </p>
                        <p className="text-xs text-cyan-500" style={{ fontFamily: 'monospace' }}>UPCOMING</p>
                    </div>
                    <div className="bg-black border border-green-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                            £{totalCost.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-500" style={{ fontFamily: 'monospace' }}>TOTAL SPEND</p>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 p-4 mb-6">
                    <h3 className="text-cyan-400 font-mono font-bold text-sm mb-2">AUTO-MAGIC</h3>
                    <p className="text-gray-300 text-xs font-mono">
                        Forward booking emails to scott@kingdom.uf51.com - AI auto-creates accommodation records
                    </p>
                </div>

                {/* LIST */}
                <div className="space-y-4">
                    {accommodations.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Bed className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No bookings yet</p>
                        </div>
                    ) : (
                        accommodations.map(acc => {
                            const event = events.find(e => e.id === acc.event_id);
                            return (
                                <div key={acc.id} className="bg-black border-2 border-cyan-500/50 p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-mono font-bold text-lg">{acc.name}</p>
                                            <p className="text-cyan-400 text-sm font-mono uppercase">{acc.type}</p>
                                            {acc.address && (
                                                <p className="text-gray-500 text-xs font-mono mt-1">
                                                    <MapPin className="w-3 h-3 inline mr-1" />
                                                    {acc.address}
                                                </p>
                                            )}
                                        </div>
                                        {acc.total_cost && (
                                            <div className="text-right">
                                                <p className="text-green-400 font-mono text-2xl font-black">£{acc.total_cost}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* DATES */}
                                    <div className="bg-black/60 p-3 mb-3">
                                        <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">CHECK IN</p>
                                                <p className="text-cyan-400">{format(new Date(acc.check_in), 'd MMM yyyy')}</p>
                                            </div>
                                            {acc.check_out && (
                                                <div>
                                                    <p className="text-gray-500 text-xs mb-1">CHECK OUT</p>
                                                    <p className="text-cyan-400">{format(new Date(acc.check_out), 'd MMM yyyy')}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* DETAILS */}
                                    {acc.confirmation_number && (
                                        <p className="text-gray-500 text-xs font-mono mb-1">
                                            Confirmation: {acc.confirmation_number}
                                        </p>
                                    )}
                                    {acc.rooms_needed > 1 && (
                                        <p className="text-gray-500 text-xs font-mono mb-1">
                                            {acc.rooms_needed} rooms
                                        </p>
                                    )}
                                    {acc.who_staying && acc.who_staying.length > 0 && (
                                        <p className="text-gray-400 text-xs font-mono">
                                            👥 {acc.who_staying.join(', ')}
                                        </p>
                                    )}
                                    {event && (
                                        <p className="text-purple-400 text-xs font-mono mt-2">
                                            🎸 {event.title}
                                        </p>
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