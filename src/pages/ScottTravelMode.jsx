import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plane, Calendar, Bed, DollarSign, MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { format, addDays, isAfter, isBefore } from 'date-fns';

/**
 * TRAVEL MODE - EVERYTHING FOR THE ROAD
 * Next 7 days: gigs, hotels, flights, who to pay
 * ONE SCREEN - NO HUNTING
 */

export default function ScottTravelMode() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [roadmap, setRoadmap] = useState([]);

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadRoadmap();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, []);

    const loadRoadmap = async () => {
        try {
            const now = new Date();
            const nextWeek = addDays(now, 7);

            const events = await base44.entities.ScottEvent.list();
            const accommodations = await base44.entities.ScottAccommodation.list();
            const visas = await base44.entities.ScottVisa.list();
            const invoices = await base44.entities.ScottInvoice.list();
            const artists = await base44.entities.ScottArtist.list();

            const items = [];

            // Upcoming gigs
            events.forEach(e => {
                const eventDate = new Date(e.date);
                if (isAfter(eventDate, now) && isBefore(eventDate, nextWeek)) {
                    items.push({
                        type: 'gig',
                        date: eventDate,
                        data: e,
                        artist: artists.find(a => a.id === e.artist_id)
                    });
                }
            });

            // Check ins/outs
            accommodations.forEach(a => {
                const checkIn = new Date(a.check_in);
                const checkOut = a.check_out ? new Date(a.check_out) : null;
                
                if (isAfter(checkIn, now) && isBefore(checkIn, nextWeek)) {
                    items.push({
                        type: 'check_in',
                        date: checkIn,
                        data: a
                    });
                }
                if (checkOut && isAfter(checkOut, now) && isBefore(checkOut, nextWeek)) {
                    items.push({
                        type: 'check_out',
                        date: checkOut,
                        data: a
                    });
                }
            });

            // Visa deadlines
            visas.forEach(v => {
                if (v.application_deadline) {
                    const deadline = new Date(v.application_deadline);
                    if (isAfter(deadline, now) && isBefore(deadline, nextWeek)) {
                        items.push({
                            type: 'visa',
                            date: deadline,
                            data: v,
                            artist: artists.find(a => a.id === v.artist_id)
                        });
                    }
                }
            });

            // Unpaid invoices
            invoices.forEach(i => {
                if (i.status === 'unpaid') {
                    items.push({
                        type: 'payment',
                        date: new Date(i.date),
                        data: i,
                        artist: artists.find(a => a.id === i.artist_id)
                    });
                }
            });

            items.sort((a, b) => a.date - b.date);
            setRoadmap(items);
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
                        <Plane className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>TRAVEL MODE</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Next 7 days at a glance</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* THE ROAD AHEAD */}
                <div className="space-y-3">
                    {roadmap.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <MapPin className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">Nothing in the next 7 days</p>
                        </div>
                    ) : (
                        roadmap.map((item, i) => {
                            let icon, color, title;
                            
                            switch (item.type) {
                                case 'gig':
                                    icon = Calendar;
                                    color = 'cyan';
                                    title = `🎸 ${item.data.title} @ ${item.data.location}`;
                                    break;
                                case 'check_in':
                                    icon = Bed;
                                    color = 'purple';
                                    title = `🏨 Check in: ${item.data.name}`;
                                    break;
                                case 'check_out':
                                    icon = Bed;
                                    color = 'amber';
                                    title = `🏨 Check out: ${item.data.name}`;
                                    break;
                                case 'visa':
                                    icon = Plane;
                                    color = 'red';
                                    title = `✈️ ${item.data.visa_type} visa deadline - ${item.artist?.name}`;
                                    break;
                                case 'payment':
                                    icon = DollarSign;
                                    color = 'green';
                                    title = `💰 Payment due: £${item.data.amount} - ${item.artist?.name}`;
                                    break;
                            }

                            const Icon = icon;
                            const daysUntil = Math.ceil((item.date - new Date()) / (1000 * 60 * 60 * 24));

                            return (
                                <div key={i} className={`bg-black border-2 border-${color}-500/50 p-4`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            <Icon className={`w-6 h-6 text-${color}-400 flex-shrink-0 mt-1`} />
                                            <div>
                                                <p className="text-white font-mono font-bold mb-1">{title}</p>
                                                <div className="flex items-center gap-3 text-xs font-mono">
                                                    <span className={`text-${color}-400`}>
                                                        {format(item.date, 'EEE d MMM')}
                                                    </span>
                                                    <span className="text-gray-600">
                                                        {daysUntil === 0 ? 'TODAY' :
                                                         daysUntil === 1 ? 'TOMORROW' :
                                                         `${daysUntil} days`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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