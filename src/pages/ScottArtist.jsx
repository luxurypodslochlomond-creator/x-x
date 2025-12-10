import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckSquare, Plus, Phone, Mail, Brain, Copy, Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';

function ScottArtistInner() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get('id');
    const scott = useScottOffline();

    // PIN CHECK
    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);

    const [artist, setArtist] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [messages, setMessages] = useState([]);
    const [events, setEvents] = useState([]);
    
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

    // Load data from offline storage
    useEffect(() => {
        if (artistId) {
            setArtist(scott.getArtist(artistId));
            setTasks(scott.getTasksForArtist(artistId));
            setMessages(scott.getMessagesForArtist(artistId));
            setEvents(scott.getEventsForArtist(artistId));
        }
    }, [artistId]);

    const handleAddTask = () => {
        scott.createTask({ ...newTask, artist_id: artistId });
        setTasks(scott.getTasksForArtist(artistId));
        setNewTask({ title: '', notes: '', priority: 'normal' });
        setShowAddTask(false);
    };

    const handleToggleTask = (taskId, status) => {
        scott.updateTask(taskId, { status });
        setTasks(scott.getTasksForArtist(artistId));
    };

    const handleAddMessage = () => {
        scott.createMessage({ ...newMessage, artist_id: artistId });
        setMessages(scott.getMessagesForArtist(artistId));
        setNewMessage({ message: '', direction: 'note' });
        setShowAddMessage(false);
    };

    const handleAddEvent = () => {
        scott.createEvent({ ...newEvent, artist_id: artistId });
        setEvents(scott.getEventsForArtist(artistId));
        setNewEvent({ title: '', date: '', location: '', event_type: 'gig' });
        setShowAddEvent(false);
    };

    const handleAIDraft = async () => {
        if (!scott.isOnline) {
            alert('Need internet for AI draft - save it offline first, draft when back online ❤️');
            return;
        }
        
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
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <p className="text-gray-400" style={{ fontFamily: 'monospace' }}>Loading...</p>
            </div>
        );
    }

    const todoTasks = tasks.filter(t => t.status !== 'done');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold tracking-wider">BACK</span>
                </button>
                
                {/* OFFLINE STATUS */}
                {!scott.isOnline && (
                    <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded">
                        <WifiOff className="w-3 h-3 text-amber-400" />
                        <span className="text-[10px] text-amber-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                            OFFLINE
                        </span>
                    </div>
                )}
            </div>

            {/* ARTIST HEADER */}
            <Card className="bg-black border border-amber-500/20 p-6 mb-6">
                <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>{artist.name}</h1>
                <p className="text-amber-400 text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                
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

                {scott.isOnline && (
                    <Button
                        onClick={() => setShowAIDraft(!showAIDraft)}
                        className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                    >
                        <Brain className="w-4 h-4 mr-2" />
                        {showAIDraft ? 'Hide AI Draft' : 'Draft Email (AI)'}
                    </Button>
                )}

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
            <Card className="bg-black border border-amber-500/20 p-4 mb-6">
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
                                onClick={handleAddTask}
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
                                checked={task.status === 'done'}
                                onChange={(e) => handleToggleTask(task.id, e.target.checked ? 'done' : 'todo')}
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
            <Card className="bg-black border border-cyan-500/20 p-4 mb-6">
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
                                onClick={handleAddEvent}
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
            <Card className="bg-black border border-pink-500/20 p-4">
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
                                onClick={handleAddMessage}
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

            export default function ScottArtist() {
            return (
            <ScottOfflineProvider>
              <ScottArtistInner />
            </ScottOfflineProvider>
            );
            }