import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Calendar as CalendarIcon, MessageSquare, CheckSquare, Brain, Users, Instagram, Twitter, Plane, FileText, DollarSign, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLife51Offline, Life51OfflineProvider } from '@/components/life51/Life51OfflineStorage';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';

/**
 * LIFE51 - MVP ESSENTIALS
 * Calendar • Tasks • Messages • AI drafts
 * Works offline → syncs
 * Clean, simple, breathable
 */

function Life51Inner() {
    const [pinEntered, setPinEntered] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState('dashboard'); // dashboard | calendar | tasks | messages | social
    
    const life51 = useLife51Offline();
    const [people, setPeople] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [urgentTasks, setUrgentTasks] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [socialPosts, setSocialPosts] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const storedPin = localStorage.getItem('life51_pin');
        if (storedPin === '1111') setPinEntered(true);
    }, []);

    useEffect(() => {
        if (pinEntered) {
            const loadedPeople = life51.getPeople();
            const loadedEvents = life51.getEvents();
            const loadedTasks = life51.getTasks();
            const loadedMessages = life51.getMessages();
            const loadedSocial = life51.getSocialPosts();
            const loadedApps = life51.getApplications();

            setPeople(loadedPeople);
            setSocialPosts(loadedSocial);
            setApplications(loadedApps);

            const upcoming = loadedEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
            setUpcomingEvents(upcoming);

            const urgent = loadedTasks.filter(t => 
                t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
            ).slice(0, 3);
            setUrgentTasks(urgent);

            const unread = loadedMessages.filter(m => !m.read).slice(0, 3);
            setUnreadMessages(unread);

            if (life51.isOnline) {
                life51.pullFromServer().then(() => {
                    setPeople(life51.getPeople());
                    setSocialPosts(life51.getSocialPosts());
                    setApplications(life51.getApplications());
                    setUpcomingEvents(life51.getEvents().filter(e => new Date(e.date) >= new Date()).slice(0, 3));
                    setUrgentTasks(life51.getTasks().filter(t => 
                        t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
                    ).slice(0, 3));
                    setUnreadMessages(life51.getMessages().filter(m => !m.read).slice(0, 3));
                });
            }
        }
    }, [pinEntered, life51.isOnline]);

    const handlePinSubmit = () => {
        if (pinInput === '1111') {
            localStorage.setItem('life51_pin', '1111');
            setPinEntered(true);
        }
    };

    // PIN ENTRY
    if (!pinEntered) {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <div className="bg-black border-4 border-cyan-500 rounded-xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <Kingdom51Crown8Bit size={96} animate={true} />
                        </div>
                        
                        <h1 className="text-5xl font-black text-cyan-400 mb-3 tracking-tight font-mono">
                            LIFE51
                        </h1>
                        
                        <p className="text-cyan-500 text-xs font-black tracking-[0.3em] mb-4 font-mono">
                            YOUR AI CO-PILOT
                        </p>
                        
                        <div className="flex items-center justify-center gap-1 mb-6">
                            <div className="w-2 h-2 bg-cyan-500" />
                            <div className="w-2 h-2 bg-cyan-400" />
                            <div className="flex-1 h-1 bg-cyan-500" />
                            <div className="w-2 h-2 bg-cyan-400" />
                            <div className="w-2 h-2 bg-cyan-500" />
                        </div>
                    </div>
                    
                    <Input
                        type="password"
                        placeholder="••••"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black border-2 border-cyan-500 text-white text-center text-3xl mb-4 font-black tracking-widest font-mono"
                    />
                    <Button
                        onClick={handlePinSubmit}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg py-4 font-mono"
                    >
                        ENTER
                    </Button>
                    <p className="text-center text-cyan-600 text-xs mt-4 font-mono">Simple • Smart • Always works</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 pb-32">

            {/* HEADER */}
            <div className="mb-6">
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 p-[3px] rounded-xl">
                    <div className="bg-black rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Kingdom51Crown8Bit size={40} animate={true} />
                            <div>
                                <h1 className="text-2xl font-black text-cyan-400 font-mono">LIFE51</h1>
                                <p className="text-[9px] text-cyan-500/80 tracking-widest uppercase font-bold font-mono">
                                    <span className={life51.isOnline ? 'text-green-400' : 'text-cyan-400'}>●</span> 
                                    {life51.isOnline ? 'ONLINE' : 'OFFLINE'}
                                </p>
                            </div>
                        </div>
                        <button className="p-3 bg-cyan-500/10 border-2 border-cyan-500/30 hover:border-cyan-500 rounded-lg">
                            <Brain className="w-5 h-5 text-cyan-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* WHAT'S NEXT */}
            <div className="mb-6">
                <div className="bg-black p-4 rounded-xl border-2 border-cyan-500">
                    <p className="text-white font-black text-sm font-mono mb-2">⚡ WHAT'S NEXT</p>
                    {urgentTasks.length > 0 ? (
                        <div className="bg-black border border-red-500/50 rounded p-3">
                            <p className="text-red-400 font-bold text-xs font-mono">🔥 {urgentTasks.length} URGENT TASK{urgentTasks.length > 1 ? 'S' : ''}</p>
                            <p className="text-gray-600 text-xs font-mono mt-1">{urgentTasks[0].title}</p>
                        </div>
                    ) : upcomingEvents.length > 0 ? (
                        <div className="bg-black border border-cyan-500/50 rounded p-3">
                            <p className="text-cyan-400 font-bold text-xs font-mono">📅 {upcomingEvents.length} UPCOMING</p>
                            <p className="text-gray-600 text-xs font-mono mt-1">{upcomingEvents[0].title}</p>
                        </div>
                    ) : (
                        <div className="bg-black border border-green-500/50 rounded p-3">
                            <p className="text-green-400 font-bold text-xs font-mono">✓ ALL CLEAR</p>
                        </div>
                    )}
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-black border-2 border-cyan-500 p-3 text-center rounded-lg">
                    <p className="text-2xl font-black text-cyan-400 font-mono">{upcomingEvents.length}</p>
                    <p className="text-[10px] text-gray-600 tracking-wider font-bold font-mono">EVENTS</p>
                </div>
                <div className="bg-black border-2 border-cyan-500 p-3 text-center rounded-lg">
                    <p className="text-2xl font-black text-cyan-400 font-mono">{urgentTasks.length}</p>
                    <p className="text-[10px] text-gray-600 tracking-wider font-bold font-mono">TASKS</p>
                </div>
                <div className="bg-black border-2 border-cyan-500 p-3 text-center rounded-lg">
                    <p className="text-2xl font-black text-cyan-400 font-mono">{unreadMessages.length}</p>
                    <p className="text-[10px] text-gray-600 tracking-wider font-bold font-mono">MESSAGES</p>
                </div>
            </div>

            {/* MAIN SECTIONS */}
            <div className="space-y-3">
                {/* CALENDAR */}
                <div className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <CalendarIcon className="w-6 h-6 text-cyan-400" />
                        <div className="flex-1">
                            <p className="text-white font-black text-sm font-mono">CALENDAR</p>
                            <p className="text-gray-600 text-xs font-mono">AI reads emails → adds events</p>
                        </div>
                        <span className="text-cyan-400 text-sm font-mono font-bold">{upcomingEvents.length}</span>
                    </div>
                    {upcomingEvents.length > 0 && (
                        <div className="bg-black/40 border border-cyan-500/30 rounded p-2 space-y-1">
                            {upcomingEvents.map(event => (
                                <div key={event.id} className="text-xs font-mono">
                                    <p className="text-cyan-400">{event.title}</p>
                                    <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* TASKS */}
                <div className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <CheckSquare className="w-6 h-6 text-cyan-400" />
                        <div className="flex-1">
                            <p className="text-white font-black text-sm font-mono">TASKS</p>
                            <p className="text-gray-600 text-xs font-mono">Per person, per project</p>
                        </div>
                        <span className="text-cyan-400 text-sm font-mono font-bold">{urgentTasks.length}</span>
                    </div>
                    {urgentTasks.length > 0 && (
                        <div className="bg-black/40 border border-cyan-500/30 rounded p-2 space-y-1">
                            {urgentTasks.map(task => (
                                <div key={task.id} className="text-xs font-mono flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                                    <p className="text-white flex-1">{task.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MESSAGES */}
                <div className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <MessageSquare className="w-6 h-6 text-cyan-400" />
                        <div className="flex-1">
                            <p className="text-white font-black text-sm font-mono">MESSAGES</p>
                            <p className="text-gray-600 text-xs font-mono">Thread per person</p>
                        </div>
                        <span className="text-cyan-400 text-sm font-mono font-bold">{unreadMessages.length}</span>
                    </div>
                    {unreadMessages.length > 0 && (
                        <div className="bg-black/40 border border-cyan-500/30 rounded p-2 space-y-1">
                            {unreadMessages.map(msg => (
                                <div key={msg.id} className="text-xs font-mono">
                                    <p className="text-cyan-400">{msg.from}</p>
                                    <p className="text-gray-600 truncate">{msg.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SOCIAL MEDIA */}
                <div className="bg-black border-2 border-pink-500/50 hover:border-pink-500 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <Instagram className="w-6 h-6 text-pink-400" />
                        <div className="flex-1">
                            <p className="text-white font-black text-sm font-mono">SOCIAL</p>
                            <p className="text-gray-600 text-xs font-mono">AI drafts → you approve</p>
                        </div>
                        <span className="text-pink-400 text-sm font-mono font-bold">{socialPosts.filter(p => p.status === 'draft').length}</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-black/40 border border-pink-500/30 rounded p-2 flex-1 text-center">
                            <Instagram className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                            <p className="text-xs font-mono text-pink-400">{socialPosts.filter(p => p.platform === 'instagram').length}</p>
                        </div>
                        <div className="bg-black/40 border border-blue-500/30 rounded p-2 flex-1 text-center">
                            <Twitter className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                            <p className="text-xs font-mono text-blue-400">{socialPosts.filter(p => p.platform === 'twitter').length}</p>
                        </div>
                    </div>
                </div>

                {/* APPLICATIONS */}
                <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-amber-400" />
                        <div className="flex-1">
                            <p className="text-white font-black text-sm font-mono">APPLICATIONS</p>
                            <p className="text-gray-600 text-xs font-mono">Visas, funding, grants</p>
                        </div>
                        <span className="text-amber-400 text-sm font-mono font-bold">{applications.filter(a => a.status === 'in_progress').length}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/40 border border-amber-500/30 rounded p-2 text-center">
                            <Plane className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                            <p className="text-xs font-mono text-amber-400">VISAS</p>
                            <p className="text-xs font-mono text-gray-600">{applications.filter(a => a.type === 'visa').length}</p>
                        </div>
                        <div className="bg-black/40 border border-green-500/30 rounded p-2 text-center">
                            <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
                            <p className="text-xs font-mono text-green-400">FUNDING</p>
                            <p className="text-xs font-mono text-gray-600">{applications.filter(a => a.type === 'funding').length}</p>
                        </div>
                    </div>
                </div>

                {/* PEOPLE */}
                <div className="bg-black border-2 border-purple-500/50 hover:border-purple-500 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-purple-400" />
                        <div className="flex-1">
                            <p className="text-white font-black text-sm font-mono">PEOPLE</p>
                            <p className="text-gray-600 text-xs font-mono">Everyone you work with</p>
                        </div>
                        <span className="text-purple-400 text-sm font-mono font-bold">{people.length}</span>
                    </div>
                    <button className="w-full bg-purple-500/10 border border-purple-500/30 hover:border-purple-500 rounded p-2 text-purple-400 text-xs font-mono font-bold transition-all">
                        + ADD PERSON
                    </button>
                </div>
            </div>

            {/* AI CO-PILOT BUTTON */}
            <div className="fixed bottom-6 right-6 z-50">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-2xl"
                    style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}
                >
                    <Brain className="w-8 h-8" />
                </motion.button>
            </div>

            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t-2 border-cyan-500/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Kingdom51Crown8Bit size={20} animate={false} />
                    <p className="text-cyan-500/60 text-xs font-black tracking-wider font-mono">LIFE51</p>
                </div>
                <p className="text-cyan-600/40 text-[10px] font-mono">Simple AI co-pilot for life</p>
            </div>

        </div>
    );
}

export default function Life51() {
    return (
        <Life51OfflineProvider>
            <Life51Inner />
        </Life51OfflineProvider>
    );
}