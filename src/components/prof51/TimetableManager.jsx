import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Clock, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TimetableManager() {
    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newClass, setNewClass] = useState({ name: '', day: 'monday', time: '', location: '', professor: '' });

    useEffect(() => {
        const saved = localStorage.getItem('prof51_timetable');
        if (saved) setClasses(JSON.parse(saved));
    }, []);

    const addClass = () => {
        if (!newClass.name || !newClass.time) return;
        const updated = [...classes, { ...newClass, id: Date.now() }];
        setClasses(updated);
        localStorage.setItem('prof51_timetable', JSON.stringify(updated));
        setNewClass({ name: '', day: 'monday', time: '', location: '', professor: '' });
        setShowForm(false);
    };

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const today = days[new Date().getDay() - 1] || 'monday';

    const todayClasses = classes.filter(c => c.day === today).sort((a, b) => a.time.localeCompare(b.time));

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-10 h-10 text-purple-400" />
                        <div>
                            <h2 className="text-purple-400 font-black text-xl font-mono">TIMETABLE</h2>
                            <p className="text-gray-400 text-xs font-mono">Today: {today.toUpperCase()}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        size="sm"
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                {/* ADD CLASS FORM */}
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2 mb-4"
                    >
                        <Input
                            placeholder="Class name"
                            value={newClass.name}
                            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                            className="bg-black border-purple-500/30 text-white font-mono text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={newClass.day}
                                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                                className="bg-black border border-purple-500/30 rounded-lg px-3 py-2 text-white font-mono text-sm"
                            >
                                {days.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
                            </select>
                            <Input
                                type="time"
                                value={newClass.time}
                                onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                                className="bg-black border-purple-500/30 text-white font-mono text-sm"
                            />
                        </div>
                        <Input
                            placeholder="Location (optional)"
                            value={newClass.location}
                            onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
                            className="bg-black border-purple-500/30 text-white font-mono text-sm"
                        />
                        <Input
                            placeholder="Professor (optional)"
                            value={newClass.professor}
                            onChange={(e) => setNewClass({ ...newClass, professor: e.target.value })}
                            className="bg-black border-purple-500/30 text-white font-mono text-sm"
                        />
                        <Button onClick={addClass} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black">
                            ADD CLASS
                        </Button>
                    </motion.div>
                )}

                {/* TODAY'S CLASSES */}
                <div className="space-y-2">
                    {todayClasses.map(c => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-black border-2 border-purple-500/30 hover:border-purple-500 rounded-lg p-3 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-white font-black font-mono mb-1">{c.name}</p>
                                    <div className="space-y-1">
                                        <p className="text-purple-400 text-xs font-mono flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {c.time}
                                        </p>
                                        {c.location && (
                                            <p className="text-cyan-400 text-xs font-mono flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {c.location}
                                            </p>
                                        )}
                                        {c.professor && (
                                            <p className="text-gray-400 text-xs font-mono flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {c.professor}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {todayClasses.length === 0 && (
                        <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
                            <p className="text-gray-600 text-sm font-mono">No classes today</p>
                            <p className="text-green-400 text-xs font-mono mt-1">Free day! 🎉</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center">
                <p className="text-purple-400 text-xs font-mono">Share timetable P2P • Find study groups ♾️</p>
            </div>
        </div>
    );
}