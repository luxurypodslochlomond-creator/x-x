import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, CheckSquare, MessageSquare, DollarSign, Plus, Phone, Mail, Brain, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScottArtist() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get('id');

    // PIN CHECK
    React.useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);

    const [showAddTask, setShowAddTask] = useState(false);
    const [showAddMessage, setShowAddMessage] = useState(false);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showAIDraft, setShowAIDraft] = useState(false);

    const [newTask, setNewTask] = useState({ title: '', notes: '', priority: 'normal' });
    const [newMessage, setNewMessage] = useState({ message: '', direction: 'note' });
    const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', event_type: 'gig' });
    const [aiContext, setAiContext] = useState('');
    const [aiDraft, setAiDraft] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    const { data: artist } = useQuery({
        queryKey: ['scott-artist', artistId],
        queryFn: async () => {
            const artists = await base44.asServiceRole.entities.ScottArtist.list();
            return artists.find(a => a.id === artistId);
        },
        enabled: !!artistId
    });

    const { data: tasks = [] } = useQuery({
        queryKey: ['scott-artist-tasks', artistId],
        queryFn: async () => {
            const allTasks = await base44.asServiceRole.entities.ScottTask.list('-created_date');
            return allTasks.filter(t => t.artist_id === artistId);
        },
        enabled: !!artistId
    });

    const { data: messages = [] } = useQuery({
        queryKey: ['scott-artist-messages', artistId],
        queryFn: async () => {
            const allMessages = await base44.asServiceRole.entities.ScottMessage.list('-created_date');
            return allMessages.filter(m => m.artist_id === artistId);
        },
        enabled: !!artistId
    });

    const { data: events = [] } = useQuery({
        queryKey: ['scott-artist-events', artistId],
        queryFn: async () => {
            const allEvents = await base44.asServiceRole.entities.ScottEvent.list('-date');
            return allEvents.filter(e => e.artist_id === artistId);
        },
        enabled: !!artistId
    });

    const addTaskMutation = useMutation({
        mutationFn: (taskData) => base44.asServiceRole.entities.ScottTask.create({
            ...taskData,
            artist_id: artistId
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['scott-artist-tasks', artistId]);
            setNewTask({ title: '', notes: '', priority: 'normal' });
            setShowAddTask(false);
        }
    });

    const toggleTaskMutation = useMutation({
        mutationFn: ({ id, status }) => base44.asServiceRole.entities.ScottTask.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries(['scott-artist-tasks', artistId]);
        }
    });

    const addMessageMutation = useMutation({
        mutationFn: (messageData) => base44.asServiceRole.entities.ScottMessage.create({
            ...messageData,
            artist_id: artistId
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['scott-artist-messages', artistId]);
            setNewMessage({ message: '', direction: 'note' });
            setShowAddMessage(false);
        }
    });

    const addEventMutation = useMutation({
        mutationFn: (eventData) => base44.asServiceRole.entities.ScottEvent.create({
            ...eventData,
            artist_id: artistId
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['scott-artist-events', artistId]);
            setNewEvent({ title: '', date: '', location: '', event_type: 'gig' });
            setShowAddEvent(false);
        }
    });

    const handleAIDraft = async () => {
        setAiLoading(true);
        try {
            const prompt = `You are Scott's AI assistant helping him draft a professional email.

ARTIST INFO:
Name: ${artist.name}
Type: ${artist.type}
Genre: ${artist.genre || 'Unknown'}
Relationship: ${artist.relationship}
Past Notes: ${artist.notes || 'No notes yet'}
Rate: ${artist.rate ? '£' + artist.rate : 'Not specified'}

CONTEXT FROM SCOTT:
${aiContext}

TASK: Draft a short, professional but friendly email based on the context Scott provided. Keep it natural, not corporate. Sign it "Scott - Kingdom Management" at the end.`;

            const response = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt });
            setAiDraft(response);
        } catch (error) {
            alert('AI draft failed: ' + error.message);
        } finally {
            setAiLoading(false);
        }
    };

    if (!artist) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 p-4 flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    const todoTasks = tasks.filter(t => t.status !== 'done');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 p-4 pb-20">
            
            <button
                onClick={() => navigate(createPageUrl('ScottManager'))}
                className="flex items-center gap-2 text-purple-400 mb-6 hover:text-purple-300"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-mono">Back</span>
            </button>

            {/* ARTIST HEADER */}
            <Card className="bg-black/60 border-2 border-purple-500 p-6 mb-6">
                <h1 className="text-3xl font-black text-white mb-2">{artist.name}</h1>
                <p className="text-purple-400 text-sm capitalize mb-4">{artist.type}</p>
                
                {artist.phone && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${artist.phone}`} className="hover:text-white">{artist.phone}</a>
                    </div>
                )}
                
                {artist.email && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${artist.email}`} className="hover:text-white">{artist.email}</a>
                    </div>
                )}

                {artist.notes && (
                    <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30 mt-4">
                        <p className="text-gray-300 text-sm">{artist.notes}</p>
                    </div>
                )}

                <Button
                    onClick={() => setShowAIDraft(!showAIDraft)}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                >
                    <Brain className="w-4 h-4 mr-2" />
                    {showAIDraft ? 'Hide AI Draft' : 'Draft Email (AI)'}
                </Button>

                <AnimatePresence>
                    {showAIDraft && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 space-y-3"
                        >
                            <Textarea
                                placeholder="What's the email about? (e.g., 'Asking about session next Thursday' or 'Following up on gig offer')"
                                value={aiContext}
                                onChange={(e) => setAiContext(e.target.value)}
                                className="bg-black/60 border-cyan-500/50 text-white min-h-[80px]"
                            />
                            <Button
                                onClick={handleAIDraft}
                                disabled={!aiContext.trim() || aiLoading}
                                className="w-full bg-cyan-600 hover:bg-cyan-700"
                            >
                                {aiLoading ? 'Drafting...' : 'Generate Email'}
                            </Button>

                            {aiDraft && (
                                <div className="bg-black/60 p-4 rounded border border-cyan-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-cyan-400 text-xs font-bold">AI DRAFT</p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                navigator.clipboard.writeText(aiDraft);
                                                alert('Copied!');
                                            }}
                                            className="border-cyan-500/50"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{aiDraft}</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* TASKS */}
            <Card className="bg-black/60 border-2 border-amber-500 p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-amber-400" />
                        <h2 className="text-lg font-black text-amber-400">TASKS ({todoTasks.length})</h2>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => setShowAddTask(!showAddTask)}
                        className="bg-amber-600 hover:bg-amber-700"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                <AnimatePresence>
                    {showAddTask && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-4 space-y-2"
                        >
                            <Input
                                placeholder="Task title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                className="bg-black/60 border-amber-500/50 text-white"
                            />
                            <Textarea
                                placeholder="Notes (optional)"
                                value={newTask.notes}
                                onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                                className="bg-black/60 border-amber-500/50 text-white"
                            />
                            <Button
                                onClick={() => addTaskMutation.mutate(newTask)}
                                disabled={!newTask.title.trim()}
                                className="w-full bg-amber-600 hover:bg-amber-700"
                            >
                                Add Task
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-2">
                    {todoTasks.map(task => (
                        <div
                            key={task.id}
                            className="bg-black/40 p-3 rounded border border-amber-500/30 flex items-start gap-3"
                        >
                            <input
                                type="checkbox"
                                onChange={(e) => toggleTaskMutation.mutate({
                                    id: task.id,
                                    status: e.target.checked ? 'done' : 'todo'
                                })}
                                className="mt-1"
                            />
                            <div className="flex-1">
                                <p className="text-white font-bold text-sm">{task.title}</p>
                                {task.notes && <p className="text-gray-400 text-xs mt-1">{task.notes}</p>}
                            </div>
                        </div>
                    ))}
                    {todoTasks.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4">No tasks yet</p>
                    )}
                </div>
            </Card>

            {/* EVENTS */}
            <Card className="bg-black/60 border-2 border-cyan-500 p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-lg font-black text-cyan-400">EVENTS ({events.length})</h2>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => setShowAddEvent(!showAddEvent)}
                        className="bg-cyan-600 hover:bg-cyan-700"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                <AnimatePresence>
                    {showAddEvent && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-4 space-y-2"
                        >
                            <Input
                                placeholder="Event title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                className="bg-black/60 border-cyan-500/50 text-white"
                            />
                            <Input
                                type="datetime-local"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                className="bg-black/60 border-cyan-500/50 text-white"
                            />
                            <Input
                                placeholder="Location"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                className="bg-black/60 border-cyan-500/50 text-white"
                            />
                            <Button
                                onClick={() => addEventMutation.mutate(newEvent)}
                                disabled={!newEvent.title.trim() || !newEvent.date}
                                className="w-full bg-cyan-600 hover:bg-cyan-700"
                            >
                                Add Event
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-2">
                    {events.map(event => (
                        <div key={event.id} className="bg-black/40 p-3 rounded border border-cyan-500/30">
                            <p className="text-white font-bold text-sm">{event.title}</p>
                            <p className="text-cyan-400 text-xs mt-1">
                                {new Date(event.date).toLocaleDateString()} • {event.location || 'TBC'}
                            </p>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4">No events yet</p>
                    )}
                </div>
            </Card>

            {/* MESSAGES */}
            <Card className="bg-black/60 border-2 border-pink-500 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-pink-400" />
                        <h2 className="text-lg font-black text-pink-400">NOTES ({messages.length})</h2>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => setShowAddMessage(!showAddMessage)}
                        className="bg-pink-600 hover:bg-pink-700"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                <AnimatePresence>
                    {showAddMessage && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-4 space-y-2"
                        >
                            <Textarea
                                placeholder="Message or note..."
                                value={newMessage.message}
                                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                                className="bg-black/60 border-pink-500/50 text-white"
                            />
                            <Button
                                onClick={() => addMessageMutation.mutate(newMessage)}
                                disabled={!newMessage.message.trim()}
                                className="w-full bg-pink-600 hover:bg-pink-700"
                            >
                                Save Note
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-2">
                    {messages.map(msg => (
                        <div key={msg.id} className="bg-black/40 p-3 rounded border border-pink-500/30">
                            <p className="text-white text-sm">{msg.message}</p>
                            <p className="text-gray-500 text-xs mt-1">
                                {new Date(msg.created_date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                    {messages.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4">No messages yet</p>
                    )}
                </div>
            </Card>
        </div>
    );
}