import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Radio, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * CALENDAR - Scott's sketch
 * Simple, streamlined, clutter-free
 * Color-coded: Confirmed / TBC / Unavailable
 * Easy to look at
 */

export default function ScottCalendarView() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        status: 'confirmed',
        event_type: 'gig',
        location: ''
    });

    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    useEffect(() => {
        base44.auth.me().then(setUser);
    }, []);

    const { data: events = [] } = useQuery({
        queryKey: ['scottEvents', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottEvent.filter({ artist_id: artistId })
            : base44.entities.ScottEvent.filter({}),
        enabled: !!user
    });

    const createEventMutation = useMutation({
        mutationFn: (eventData) => base44.entities.ScottEvent.create(eventData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottEvents'] });
            setNewEvent({ title: '', date: '', status: 'confirmed', event_type: 'gig', location: '' });
            setShowAddEvent(false);
        }
    });

    const deleteEventMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottEvent.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottEvents'] })
    });

    const handleAddEvent = () => {
        if (!newEvent.title.trim() || !newEvent.date) return;
        createEventMutation.mutate({
            ...newEvent,
            artist_id: artistId || null
        });
    };

    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white font-mono mb-2">CALENDAR</h1>
                    <p className="text-gray-600 text-xs font-mono">Simple • Streamlined • Clutter-free</p>
                </div>
                <button
                    onClick={() => setShowAddEvent(!showAddEvent)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    ADD
                </button>
            </div>

            {/* ADD EVENT FORM */}
            <AnimatePresence>
                {showAddEvent && (
                    <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className="mb-6 bg-black border border-gray-800 rounded p-4 space-y-3"
                   >
                       <Input
                            placeholder="Event name"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            className="bg-black border-gray-700 text-white font-mono"
                        />
                        <Input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                            className="bg-black border-gray-700 text-white font-mono"
                        />
                        <Input
                            placeholder="Location (optional)"
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                            className="bg-black border-gray-700 text-white font-mono"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setNewEvent({...newEvent, status: 'confirmed'})}
                                className={`flex-1 py-2 rounded font-bold text-sm font-mono ${newEvent.status === 'confirmed' ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400'}`}
                            >
                                CONFIRMED
                            </button>
                            <button
                                onClick={() => setNewEvent({...newEvent, status: 'tbc'})}
                                className={`flex-1 py-2 rounded font-bold text-sm font-mono ${newEvent.status === 'tbc' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                            >
                                TBC
                            </button>
                            <button
                                onClick={() => setNewEvent({...newEvent, status: 'unavailable'})}
                                className={`flex-1 py-2 rounded font-bold text-sm font-mono ${newEvent.status === 'unavailable' ? 'bg-gray-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                            >
                                UNAVAILABLE
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setShowAddEvent(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={handleAddEvent}
                                disabled={!newEvent.title.trim() || !newEvent.date || createEventMutation.isPending}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                            >
                                SAVE
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* COLOR KEY */}
            <div className="mb-4 text-xs font-mono text-gray-600">No color key needed—status obvious from context.</div>

            {/* EVENTS LIST */}
            {sortedEvents.length === 0 ? (
                <div className="bg-black border border-gray-800 rounded p-12 text-center">
                    <p className="text-gray-600 font-mono text-sm">No events yet</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {sortedEvents.map(event => {
                        const isPast = new Date(event.date) < new Date();

                        return (
                            <motion.div
                                key={event.id}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-black border border-gray-800 rounded p-4 ${isPast ? 'opacity-40' : ''}`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold font-mono text-gray-600">
                                                {event.status.toUpperCase()}
                                            </span>
                                            {isPast && (
                                                <span className="text-gray-600 text-xs font-mono">PAST</span>
                                            )}
                                        </div>
                                        <p className="text-white font-bold mb-1 font-mono">{event.title}</p>
                                        <p className="text-gray-400 text-sm font-mono mb-2">
                                            {new Date(event.date).toLocaleDateString('en-GB', { 
                                                weekday: 'short', 
                                                day: 'numeric', 
                                                month: 'short', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                        {event.location && (
                                            <p className="text-gray-500 text-xs font-mono">{event.location}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => deleteEventMutation.mutate(event.id)}
                                        className="text-gray-600 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Calendar</p>
            </div>
        </div>
    );
}