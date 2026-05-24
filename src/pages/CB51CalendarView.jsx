import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function CB51CalendarView() {
          const navigate = useNavigate();
          const queryClient = useQueryClient();
          const [showAddEvent, setShowAddEvent] = useState(false);
          const [selectedEvent, setSelectedEvent] = useState(null);
          const [newEvent, setNewEvent] = useState({ 
        title: '', 
        date: '', 
        time: '',
        venue: '',
        location: '',
        city: '',
        country: '',
        promoter: '',
        promoter_phone: '',
        promoter_email: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        fee: '',
        currency: 'GBP',
        capacity: '',
        notes: ''
    });

          const urlParams = new URLSearchParams(window.location.search);
          const artistId = urlParams.get('id');

    const { data: events = [] } = useQuery({
        queryKey: ['events', artistId],
        queryFn: () => artistId ? base44.entities.CB51Event.filter({ artist_id: artistId }) : [],
        enabled: !!artistId
    });

    const createEventMutation = useMutation({
        mutationFn: (eventData) => base44.entities.CB51Event.create(eventData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            setNewEvent({ title: '', date: '', location: '' });
            setShowAddEvent(false);
        }
    });

    const deleteEventMutation = useMutation({
        mutationFn: (id) => base44.entities.CB51Event.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] })
    });

    const handleAddEvent = () => {
        if (!newEvent.title.trim() || !newEvent.date) return;
        createEventMutation.mutate({ 
            ...newEvent, 
            artist_id: artistId,
            fee: newEvent.fee ? parseFloat(newEvent.fee) : undefined,
            capacity: newEvent.capacity ? parseInt(newEvent.capacity) : undefined
        });
        setNewEvent({ 
            title: '', 
            date: '', 
            time: '',
            venue: '',
            location: '',
            city: '',
            country: '',
            promoter: '',
            promoter_phone: '',
            promoter_email: '',
            emergency_contact_name: '',
            emergency_contact_phone: '',
            fee: '',
            currency: 'GBP',
            capacity: '',
            notes: ''
        });
    };

    const isMobile = window.innerWidth < 1024;

    // Safe date parser — handles "2025-06-12" strings correctly on all browsers
    const parseDate = (d) => {
        if (!d) return null;
        // If it's a date-only string (YYYY-MM-DD), parse as UTC to avoid timezone off-by-one
        if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
            const [y, m, day] = d.split('-').map(Number);
            return new Date(y, m - 1, day);
        }
        return new Date(d);
    };

    const formatEventDate = (d) => {
        const date = parseDate(d);
        if (!date || isNaN(date)) return '—';
        return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getDateParts = (d) => {
        const date = parseDate(d);
        if (!date || isNaN(date)) return { day: '?', month: '???' };
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
        };
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-3xl font-black text-cyan-400 font-mono mb-4">CALENDAR</h1>

            {showAddEvent && (
                <div className="rounded-xl p-4 mb-4 space-y-3" style={{ background: '#0e1420', border: '1px solid rgba(6,182,212,0.25)' }}>
                    <Input placeholder="Event name" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} className="bg-black border-gray-700 text-white text-xs" />
                    <div className="flex gap-2">
                        <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                        <Input type="time" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                    </div>
                    <div className="flex gap-2">
                        <Input placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                        <Input placeholder="City" value={newEvent.city} onChange={(e) => setNewEvent({...newEvent, city: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                    </div>
                    <Input placeholder="Address/Location" value={newEvent.location} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} className="bg-black border-gray-700 text-white text-xs" />
                    <Input placeholder="Promoter name" value={newEvent.promoter} onChange={(e) => setNewEvent({...newEvent, promoter: e.target.value})} className="bg-black border-gray-700 text-white text-xs" />
                    <div className="flex gap-2">
                        <Input placeholder="Promoter phone" value={newEvent.promoter_phone} onChange={(e) => setNewEvent({...newEvent, promoter_phone: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                        <Input placeholder="Promoter email" value={newEvent.promoter_email} onChange={(e) => setNewEvent({...newEvent, promoter_email: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                    </div>
                    <div className="flex gap-2">
                        <Input placeholder="Emergency contact" value={newEvent.emergency_contact_name} onChange={(e) => setNewEvent({...newEvent, emergency_contact_name: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                        <Input placeholder="Emergency phone" value={newEvent.emergency_contact_phone} onChange={(e) => setNewEvent({...newEvent, emergency_contact_phone: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                    </div>
                    <div className="flex gap-2">
                        <Input type="number" placeholder="Fee" value={newEvent.fee} onChange={(e) => setNewEvent({...newEvent, fee: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                        <Input type="number" placeholder="Capacity" value={newEvent.capacity} onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})} className="bg-black border-gray-700 text-white text-xs flex-1" />
                    </div>
                    <Input placeholder="Notes" value={newEvent.notes} onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})} className="bg-black border-gray-700 text-white text-xs" />
                    <div className="flex gap-2">
                        <Button onClick={() => setShowAddEvent(false)} className="flex-1 bg-gray-700">CANCEL</Button>
                        <Button onClick={handleAddEvent} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black">SAVE</Button>
                    </div>
                </div>
            )}

            <button onClick={() => setShowAddEvent(!showAddEvent)} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded-xl mb-4 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> ADD EVENT
            </button>

            <div className="space-y-2">
                {events.length === 0 ? (
                    <div className="text-center py-12 text-gray-700 font-mono">
                        <p className="text-lg font-black text-gray-600">No shows yet</p>
                        <p className="text-xs mt-1">Add your first event above</p>
                    </div>
                ) : (
                    [...events].sort((a, b) => (parseDate(a.date) || 0) - (parseDate(b.date) || 0)).map(event => {
                        const { day, month } = getDateParts(event.date);
                        return (
                        <motion.div key={event.id} layout className="rounded-xl overflow-hidden" style={{ background: '#0e1420', border: '1px solid rgba(6,182,212,0.15)' }}>
                            <button 
                                onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                                className="w-full p-3 flex items-center gap-3 text-left transition-colors"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {/* Date chip */}
                                <div className="flex-shrink-0 w-12 h-14 rounded-xl flex flex-col items-center justify-center" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)' }}>
                                    <span className="font-black text-xl leading-none" style={{ color: '#06b6d4' }}>{day}</span>
                                    <span className="text-[9px] font-bold tracking-widest mt-0.5" style={{ color: '#64748b' }}>{month}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-bold text-sm truncate">{event.title}</p>
                                    {(event.city || event.venue) && <p className="text-gray-500 text-xs truncate">{event.city || event.venue}</p>}
                                    {event.fee > 0 && <p className="text-green-400 text-xs font-bold mt-0.5">£{event.fee?.toLocaleString()}</p>}
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteEventMutation.mutate(event.id);
                                    }}
                                    className="flex-shrink-0 p-1"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400/60" />
                                </button>
                            </button>

                            {selectedEvent?.id === event.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-gray-800 bg-black/60 p-4 space-y-3 text-sm"
                                >
                                    <div>
                                        <p className="text-cyan-400 font-mono font-bold text-xs">DATE</p>
                                        <p className="text-white font-mono">{formatEventDate(event.date)}{event.time ? ` · ${event.time}` : ''}</p>
                                    </div>
                                    {event.location && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">LOCATION</p>
                                            <p className="text-white font-mono">{event.location}</p>
                                        </div>
                                    )}
                                    {event.venue && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">VENUE</p>
                                            <p className="text-white font-mono">{event.venue}</p>
                                        </div>
                                    )}
                                    {event.city && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">CITY</p>
                                            <p className="text-white font-mono">{event.city}{event.country ? `, ${event.country}` : ''}</p>
                                        </div>
                                    )}
                                    {event.fee && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">FEE</p>
                                            <p className="text-green-400 font-black font-mono">£{event.fee?.toLocaleString()}</p>
                                        </div>
                                    )}
                                    {event.promoter && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">PROMOTER</p>
                                            <p className="text-white font-mono">{event.promoter}</p>
                                        </div>
                                    )}
                                    {event.capacity && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">CAPACITY</p>
                                            <p className="text-white font-mono">{event.capacity}</p>
                                        </div>
                                    )}
                                    {event.time && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">TIME</p>
                                            <p className="text-white font-mono">{event.time}</p>
                                        </div>
                                    )}
                                    {event.promoter_phone && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">PROMOTER PHONE</p>
                                            <p className="text-white font-mono">{event.promoter_phone}</p>
                                        </div>
                                    )}
                                    {event.promoter_email && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">PROMOTER EMAIL</p>
                                            <p className="text-white font-mono text-xs">{event.promoter_email}</p>
                                        </div>
                                    )}
                                    {event.emergency_contact_name && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">EMERGENCY CONTACT</p>
                                            <p className="text-white font-mono">{event.emergency_contact_name}</p>
                                            {event.emergency_contact_phone && <p className="text-gray-400 font-mono text-xs">{event.emergency_contact_phone}</p>}
                                        </div>
                                    )}
                                    {event.location && event.city && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">DIRECTIONS</p>
                                            <a 
                                                href={`https://maps.google.com/maps?q=${encodeURIComponent(`${event.location}, ${event.city}${event.country ? ', ' + event.country : ''}`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-amber-400 hover:text-amber-300 text-xs font-mono underline"
                                            >
                                                Open in Google Maps →
                                            </a>
                                        </div>
                                    )}
                                    {event.notes && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">NOTES</p>
                                            <p className="text-gray-400 text-xs">{event.notes}</p>
                                        </div>
                                    )}

                                    <button onClick={() => { deleteEventMutation.mutate(event.id); setSelectedEvent(null); }} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm mt-2">DELETE</button>
                                    </motion.div>
                                    )}
                                    </motion.div>
                                    );
                                    })
                                    )}
            </div>
        </div>
    );
}