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

    const statusColors = {
        confirmed: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', label: 'CONFIRMED' },
        tbc: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', label: 'TBC' },
        unavailable: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', label: 'UNAVAILABLE' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-cyan-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400 font-mono">CALENDAR</h1>
                            <p className="text-gray-500 text-xs font-mono">Simple • Streamlined • Clutter-free</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddEvent(!showAddEvent)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        ADD
                    </button>
                </div>
            </div>

            {/* ADD EVENT FORM */}
            <AnimatePresence>
                {showAddEvent && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-gray-900 border-2 border-cyan-500 rounded-lg p-4 space-y-3"
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
                                className={`flex-1 py-2 rounded font-bold text-sm ${newEvent.status === 'confirmed' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400'}`}
                            >
                                CONFIRMED
                            </button>
                            <button
                                onClick={() => setNewEvent({...newEvent, status: 'tbc'})}
                                className={`flex-1 py-2 rounded font-bold text-sm ${newEvent.status === 'tbc' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}
                            >
                                TBC
                            </button>
                            <button
                                onClick={() => setNewEvent({...newEvent, status: 'unavailable'})}
                                className={`flex-1 py-2 rounded font-bold text-sm ${newEvent.status === 'unavailable' ? 'bg-red-500 text-black' : 'bg-gray-800 text-gray-400'}`}
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
            <div className="mb-4 flex gap-2 text-xs font-mono">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">Confirmed</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-400">TBC</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-400">Unavailable</span>
                </div>
            </div>

            {/* EVENTS LIST */}
            {sortedEvents.length === 0 ? (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-12 text-center">
                    <p className="text-gray-500 font-mono">No events yet</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {sortedEvents.map(event => {
                        const colors = statusColors[event.status] || statusColors.confirmed;
                        const isPast = new Date(event.date) < new Date();
                        
                        return (
                            <motion.div
                                key={event.id}
                                whileTap={{ scale: 0.98 }}
                                className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4 ${isPast ? 'opacity-50' : ''}`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`${colors.text} text-xs font-bold font-mono px-2 py-1 bg-black/40 rounded`}>
                                                {colors.label}
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