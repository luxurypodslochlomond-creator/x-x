import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function ScottCalendarView() {
          const navigate = useNavigate();
          const queryClient = useQueryClient();
          const [showAddEvent, setShowAddEvent] = useState(false);
          const [selectedEvent, setSelectedEvent] = useState(null);
          const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '' });

          const urlParams = new URLSearchParams(window.location.search);
          const artistId = urlParams.get('id');

    const { data: events = [] } = useQuery({
        queryKey: ['scottEvents', artistId],
        queryFn: () => artistId ? base44.entities.ScottEvent.filter({ artist_id: artistId }) : [],
        enabled: !!artistId
    });

    const createEventMutation = useMutation({
        mutationFn: (eventData) => base44.entities.ScottEvent.create(eventData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottEvents'] });
            setNewEvent({ title: '', date: '', location: '' });
            setShowAddEvent(false);
        }
    });

    const deleteEventMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottEvent.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottEvents'] })
    });

    const handleAddEvent = () => {
        if (!newEvent.title.trim() || !newEvent.date) return;
        createEventMutation.mutate({ ...newEvent, artist_id: artistId });
    };

    const isMobile = window.innerWidth < 1024;

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-3xl font-black text-white font-mono mb-4">CALENDAR</h1>

            {showAddEvent && (
                <div className="bg-black border border-gray-800 rounded p-4 mb-4 space-y-3">
                    <Input placeholder="Event name" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} className="bg-black border-gray-700 text-white" />
                    <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} className="bg-black border-gray-700 text-white" />
                    <Input placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} className="bg-black border-gray-700 text-white" />
                    <div className="flex gap-2">
                        <Button onClick={() => setShowAddEvent(false)} className="flex-1 bg-gray-700">CANCEL</Button>
                        <Button onClick={handleAddEvent} className="flex-1 bg-cyan-500 text-black font-black">SAVE</Button>
                    </div>
                </div>
            )}

            <button onClick={() => setShowAddEvent(!showAddEvent)} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded mb-4 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> ADD EVENT
            </button>

            <div className="space-y-2">
                {events.length === 0 ? (
                    <div className="text-center py-8 text-gray-600 font-mono">No events</div>
                ) : (
                    [...events].sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
                        <button 
                            key={event.id} 
                            onClick={() => setSelectedEvent(event)}
                            className="w-full bg-black border border-gray-800 hover:border-cyan-500/50 rounded p-3 flex items-start justify-between transition-all text-left"
                        >
                            <div className="flex-1">
                                <p className="text-white font-bold font-mono text-sm">{event.title}</p>
                                <p className="text-gray-600 text-xs font-mono">{new Date(event.date).toLocaleDateString()}</p>
                                {event.location && <p className="text-gray-500 text-xs font-mono">{event.location}</p>}
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEventMutation.mutate(event.id);
                                }}
                                className="flex-shrink-0"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        </button>
                    ))
                )}
            </div>

            {/* EVENT DETAIL MODAL */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-6 max-w-sm w-full space-y-4">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-white font-black font-mono text-lg flex-1">{selectedEvent.title}</h2>
                            <button onClick={() => setSelectedEvent(null)} className="text-cyan-400 hover:text-cyan-300 text-xl">✕</button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-cyan-400 font-mono font-bold text-xs">DATE</p>
                                <p className="text-white font-mono">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                            </div>
                            {selectedEvent.location && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">LOCATION</p>
                                    <p className="text-white font-mono">{selectedEvent.location}</p>
                                </div>
                            )}
                            {selectedEvent.venue && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">VENUE</p>
                                    <p className="text-white font-mono">{selectedEvent.venue}</p>
                                </div>
                            )}
                            {selectedEvent.city && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">CITY</p>
                                    <p className="text-white font-mono">{selectedEvent.city}{selectedEvent.country ? `, ${selectedEvent.country}` : ''}</p>
                                </div>
                            )}
                            {selectedEvent.fee && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">FEE</p>
                                    <p className="text-green-400 font-black font-mono">{selectedEvent.currency || 'GBP'}{selectedEvent.fee}</p>
                                </div>
                            )}
                            {selectedEvent.promoter && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">PROMOTER</p>
                                    <p className="text-white font-mono">{selectedEvent.promoter}</p>
                                </div>
                            )}
                            {selectedEvent.capacity && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">CAPACITY</p>
                                    <p className="text-white font-mono">{selectedEvent.capacity}</p>
                                </div>
                            )}
                            {selectedEvent.time && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">TIME</p>
                                    <p className="text-white font-mono">{selectedEvent.time}</p>
                                </div>
                            )}
                            {selectedEvent.notes && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">NOTES</p>
                                    <p className="text-gray-400 text-xs">{selectedEvent.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setSelectedEvent(null)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded text-sm">CLOSE</button>
                            <button onClick={() => { deleteEventMutation.mutate(selectedEvent.id); setSelectedEvent(null); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm">DELETE</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}