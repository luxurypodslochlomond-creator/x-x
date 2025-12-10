import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, Plus, CheckCircle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import ScottAAAPassGenerator from '@/components/scott/ScottAAAPassGenerator';

/**
 * GUEST LIST MANAGER
 * Who's on the list, who showed up, who gets AAA
 * Check people in with one tap
 */

export default function ScottGuestList() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('event_id');

    const [pinEntered, setPinEntered] = useState(false);
    const [event, setEvent] = useState(null);
    const [guestList, setGuestList] = useState([]);
    const [artists, setArtists] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGuest, setNewGuest] = useState({
        name: '',
        plus_ones: 0,
        pass_type: 'guest_list',
        notes: '',
        added_by: 'Scott'
    });

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadData();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, [eventId]);

    const loadData = async () => {
        try {
            if (eventId) {
                const eventData = await base44.entities.ScottEvent.list();
                const thisEvent = eventData.find(e => e.id === eventId);
                setEvent(thisEvent);

                const guests = await base44.entities.ScottGuestList.list();
                const eventGuests = guests.filter(g => g.event_id === eventId);
                setGuestList(eventGuests);
            }

            const allArtists = await base44.entities.ScottArtist.list();
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    const handleAddGuest = async () => {
        if (!newGuest.name || !eventId) return;

        try {
            await base44.entities.ScottGuestList.create({
                event_id: eventId,
                artist_id: event?.artist_id,
                ...newGuest
            });

            setShowAddForm(false);
            setNewGuest({
                name: '',
                plus_ones: 0,
                pass_type: 'guest_list',
                notes: '',
                added_by: 'Scott'
            });
            loadData();
        } catch (error) {
            console.error('Add error:', error);
        }
    };

    const handleCheckIn = async (guestId) => {
        try {
            await base44.entities.ScottGuestList.update(guestId, {
                checked_in: true,
                checked_in_time: new Date().toISOString()
            });
            loadData();
        } catch (error) {
            console.error('Check in error:', error);
        }
    };

    if (!pinEntered) return null;

    if (!eventId) {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <div className="text-center">
                    <Users className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-600 font-mono">Select an event first</p>
                    <Link to={createPageUrl('ScottCalendar')} className="text-cyan-400 font-mono text-sm hover:text-cyan-300 mt-2 block">
                        Go to Calendar
                    </Link>
                </div>
            </div>
        );
    }

    const artist = artists.find(a => a.id === event?.artist_id);
    const checkedIn = guestList.filter(g => g.checked_in).length;
    const totalGuests = guestList.reduce((sum, g) => sum + 1 + (g.plus_ones || 0), 0);

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h1 className="text-2xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>GUEST LIST</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                {event?.title} • {event?.location}
                            </p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-black border border-cyan-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>
                            {guestList.length}
                        </p>
                        <p className="text-xs text-cyan-500" style={{ fontFamily: 'monospace' }}>NAMES</p>
                    </div>
                    <div className="bg-black border border-green-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                            {totalGuests}
                        </p>
                        <p className="text-xs text-green-500" style={{ fontFamily: 'monospace' }}>+ GUESTS</p>
                    </div>
                    <div className="bg-black border border-amber-500/30 p-4 text-center">
                        <p className="text-4xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>
                            {checkedIn}
                        </p>
                        <p className="text-xs text-amber-500" style={{ fontFamily: 'monospace' }}>CHECKED IN</p>
                    </div>
                </div>

                {/* AAA PASS GENERATOR */}
                <ScottAAAPassGenerator 
                    eventName={event?.title}
                    eventDate={event?.date}
                    venue={event?.location}
                />

                {/* ADD BUTTON */}
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full my-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-mono flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        ADD TO LIST
                    </button>
                )}

                {/* ADD FORM */}
                {showAddForm && (
                    <div className="bg-black border-2 border-cyan-500 p-4 my-6">
                        <h3 className="text-cyan-400 font-mono font-bold mb-3">ADD GUEST</h3>
                        
                        <input
                            type="text"
                            placeholder="Name"
                            value={newGuest.name}
                            onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="number"
                            placeholder="Plus ones (0, 1, 2, etc)"
                            value={newGuest.plus_ones}
                            onChange={(e) => setNewGuest({...newGuest, plus_ones: parseInt(e.target.value) || 0})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <select
                            value={newGuest.pass_type}
                            onChange={(e) => setNewGuest({...newGuest, pass_type: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        >
                            <option value="guest_list">Guest List</option>
                            <option value="all_access">All Access</option>
                            <option value="backstage">Backstage</option>
                            <option value="photo_pit">Photo Pit</option>
                            <option value="crew">Crew</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Notes (VIP, industry, family, etc)"
                            value={newGuest.notes}
                            onChange={(e) => setNewGuest({...newGuest, notes: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddGuest}
                                className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm"
                            >
                                ADD
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-mono text-sm"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )}

                {/* GUEST LIST */}
                <div className="space-y-2">
                    {guestList.map(guest => (
                        <div key={guest.id} className={`bg-black border-2 ${
                            guest.checked_in ? 'border-green-500/50' : 'border-gray-800'
                        } p-4 flex items-center justify-between`}>
                            <div className="flex-1">
                                <p className={`font-mono font-bold ${
                                    guest.checked_in ? 'text-green-400' : 'text-white'
                                }`}>
                                    {guest.name}
                                </p>
                                <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                                    <span className="text-cyan-400 uppercase">{guest.pass_type.replace(/_/g, ' ')}</span>
                                    {guest.plus_ones > 0 && <span>+{guest.plus_ones}</span>}
                                    {guest.notes && <span>{guest.notes}</span>}
                                </div>
                            </div>

                            {!guest.checked_in ? (
                                <button
                                    onClick={() => handleCheckIn(guest.id)}
                                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm flex items-center gap-2"
                                >
                                    <Clock className="w-4 h-4" />
                                    CHECK IN
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 text-green-400">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-mono text-xs">IN</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link to={createPageUrl('ScottCalendar')} className="text-gray-600 text-sm font-mono hover:text-gray-400">
                        ← Back to Calendar
                    </Link>
                </div>

            </div>
        </div>
    );
}