import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Users, Package, Phone, Clock, MapPin, Music, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Plane8Bit } from '@/components/shared/Plane8Bit';

/**
 * SCOTT LA TRIP DASHBOARD
 * YES AND MAYBE → LA → Dec 2024
 * Producers, gigs, sessions - all in one place
 */

export default function ScottLATrip() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('scott_la_checklist');
        return saved ? JSON.parse(saved) : {
            passports: false,
            gear: false,
            merch: false,
            contracts: false,
            insurance: false,
            accommodation_confirmed: false,
            flights_confirmed: false,
            producer_contacts: false,
            venue_contacts: false,
            emergency_cash: false
        };
    });

    const [schedule, setSchedule] = useState(() => {
        const saved = localStorage.getItem('scott_la_schedule');
        return saved ? JSON.parse(saved) : [
            { date: '2025-12-16', time: 'TBC', type: 'session', title: 'Core Ideas Meeting - Scott + Gill', location: 'Glasgow (Monday/Tuesday)' },
            { date: '2026-03-15', time: '10:00', type: 'flight', title: 'LHR → LAX', location: 'Heathrow Terminal 5' },
            { date: '2026-03-16', time: '14:00', type: 'session', title: 'Producer Meeting - TBC', location: 'LA' },
            { date: '2026-03-17', time: '20:00', type: 'gig', title: 'YES AND MAYBE @ Troubadour', location: '9081 Santa Monica Blvd' },
            { date: '2026-03-18', time: '11:00', type: 'session', title: 'Recording Session', location: 'LA Studio TBC' },
            { date: '2026-03-19', time: '21:00', type: 'gig', title: 'YES AND MAYBE @ The Roxy', location: '9009 Sunset Blvd' }
        ];
    });

    const [budget, setBudget] = useState(() => {
        const saved = localStorage.getItem('scott_la_budget');
        return saved ? JSON.parse(saved) : {
            total_budget_gbp: 8000,
            spent_usd: 0,
            flights: 2400,
            accommodation: 1800,
            studio: 2000,
            transport: 500,
            food: 800,
            misc: 500
        };
    });

    const [contacts, setContacts] = useState(() => {
        const saved = localStorage.getItem('scott_la_contacts');
        return saved ? JSON.parse(saved) : [
            { name: 'Producer Name', phone: '+1 310 XXX XXXX', role: 'Studio Producer' },
            { name: 'Venue Contact', phone: '+1 310 XXX XXXX', role: 'Troubadour' },
            { name: 'Accommodation', phone: '+1 310 XXX XXXX', role: 'Airbnb Host' }
        ];
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('scott_la_checklist', JSON.stringify(checklist));
    }, [checklist]);

    useEffect(() => {
        localStorage.setItem('scott_la_schedule', JSON.stringify(schedule));
    }, [schedule]);

    useEffect(() => {
        localStorage.setItem('scott_la_budget', JSON.stringify(budget));
    }, [budget]);

    useEffect(() => {
        localStorage.setItem('scott_la_contacts', JSON.stringify(contacts));
    }, [contacts]);

    // Check if PIN entered
    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin !== '1888') {
            navigate('/ScottManager');
        }
    }, [navigate]);

    const toggleChecklistItem = (key) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const completedItems = Object.values(checklist).filter(Boolean).length;
    const totalItems = Object.keys(checklist).length;
    const progressPercent = Math.round((completedItems / totalItems) * 100);

    // Time until departure
    const getDaysUntilDeparture = () => {
        const departure = new Date('2026-03-15'); // March 2026
        const now = new Date();
        const diff = departure - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    const daysLeft = getDaysUntilDeparture();

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-20">
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-6">
                <button
                    onClick={() => navigate('/ScottManager')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 font-mono text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                </button>

                <div className="bg-gradient-to-r from-amber-500/80 to-amber-600/80 p-6 rounded-xl border-4 border-amber-400 mb-4" style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4), 8px 8px 0px rgba(0,0,0,0.6)', imageRendering: 'pixelated' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Plane8Bit size={56} animate={true} color="#ffffff" />
                            <div>
                                <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'monospace', textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>
                                    LA TRIP
                                </h1>
                                <p className="text-white/80 text-sm font-bold font-mono">YES AND MAYBE • March 2026</p>
                            </div>
                        </div>
                        {daysLeft > 0 && (
                            <div className="text-right bg-black/40 backdrop-blur-sm border-2 border-white/20 rounded-lg p-3">
                                <p className="text-5xl font-black text-white font-mono" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }}>{daysLeft}</p>
                                <p className="text-xs text-white/70 font-mono tracking-widest">DAYS LEFT</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="bg-black border-2 border-amber-500 p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-mono font-black text-amber-400 tracking-wider">TRIP READY</p>
                        <p className="text-2xl font-mono font-black text-white">{progressPercent}%</p>
                    </div>
                    <div className="h-4 bg-gray-900 border-2 border-gray-800 overflow-hidden">
                        <motion.div
                            className="h-full bg-amber-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="max-w-4xl mx-auto mb-6">
                <div className="grid grid-cols-5 gap-2">
                    {[
                        { id: 'overview', icon: Plane8Bit, label: 'Overview' },
                        { id: 'schedule', icon: Calendar, label: 'Schedule' },
                        { id: 'checklist', icon: Package, label: 'Checklist' },
                        { id: 'budget', icon: DollarSign, label: 'Budget' },
                        { id: 'contacts', icon: Phone, label: 'Contacts' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-3 border-2 font-mono text-xs font-black transition-all ${
                                activeTab === tab.id
                                    ? 'bg-amber-500 border-amber-400 text-black'
                                    : 'bg-black border-gray-800 text-gray-400 hover:border-amber-500/50'
                            }`}
                        >
                            {tab.id === 'overview' ? (
                                <Plane8Bit size={20} animate={activeTab === tab.id} color={activeTab === tab.id ? '#000000' : '#9ca3af'} className="mx-auto mb-1" />
                            ) : (
                                <tab.icon className="w-5 h-5 mx-auto mb-1" />
                            )}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto space-y-4">
                {/* OVERVIEW */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="bg-black border-2 border-pink-500 p-6 mb-4">
                            <h2 className="text-2xl font-black text-pink-400 font-mono mb-4 tracking-wider">NEXT STEP</h2>
                            <div className="space-y-2">
                                <p className="text-white text-sm font-bold font-mono">Meeting Mon/Tue next week - Core ideas</p>
                                <p className="text-gray-400 text-sm font-mono">• Scott's few core ideas to discuss</p>
                                <p className="text-gray-400 text-sm font-mono">• Proper sit down (not rushed)</p>
                                <p className="text-gray-400 text-sm font-mono">• Might go Oz next weekend but that's holiday</p>
                            </div>
                        </div>

                        <div className="bg-black border-2 border-amber-500 p-6 mb-4">
                            <h2 className="text-2xl font-black text-amber-400 font-mono mb-4 tracking-wider">MISSION</h2>
                            <div className="space-y-2">
                                <p className="text-white text-sm font-bold font-mono">Take YES AND MAYBE to LA - March 2025</p>
                                <p className="text-gray-400 text-sm font-mono">• Work with world-class producers</p>
                                <p className="text-gray-400 text-sm font-mono">• Play iconic venues (Troubadour, Roxy)</p>
                                <p className="text-gray-400 text-sm font-mono">• Build US connections</p>
                                <p className="text-gray-400 text-sm font-mono">• Come back with recorded material</p>
                                <p className="text-green-400 text-sm font-mono mt-2">✓ Loads of time to plan this properly</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black border-2 border-amber-500 p-4">
                                <Clock className="w-6 h-6 text-amber-400 mb-2" />
                                <p className="text-xs text-amber-400 font-mono font-bold tracking-wider">TIME ZONE</p>
                                <p className="text-xl font-black text-white font-mono">PST (GMT-8)</p>
                            </div>
                            <div className="bg-black border-2 border-amber-500 p-4">
                                <MapPin className="w-6 h-6 text-amber-400 mb-2" />
                                <p className="text-xs text-amber-400 font-mono font-bold tracking-wider">BASE</p>
                                <p className="text-xl font-black text-white font-mono">Hollywood</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SCHEDULE */}
                {activeTab === 'schedule' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {schedule.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-black border-2 border-amber-500/50 rounded-lg p-4"
                            >
                                <div className="flex items-start gap-3">
                                    {item.type === 'gig' && <Music className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />}
                                    {item.type === 'session' && <Users className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />}
                                    {item.type === 'flight' && <Plane8Bit size={20} animate={false} color="#f59e0b" className="flex-shrink-0 mt-1" />}
                                    <div className="flex-1">
                                        <p className="text-white font-bold font-mono text-sm">{item.title}</p>
                                        <p className="text-gray-400 text-xs font-mono mt-1">{item.date} • {item.time}</p>
                                        <p className="text-gray-500 text-xs font-mono mt-1">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* CHECKLIST */}
                {activeTab === 'checklist' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        {Object.entries(checklist).map(([key, checked]) => (
                            <button
                                key={key}
                                onClick={() => toggleChecklistItem(key)}
                                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                                    checked
                                        ? 'bg-amber-900/20 border-amber-500'
                                        : 'bg-black border-gray-800 hover:border-amber-500/50'
                                }`}
                            >
                                {checked ? (
                                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                                )}
                                <p className={`text-sm font-mono text-left ${checked ? 'text-amber-400 line-through' : 'text-white'}`}>
                                    {key.replace(/_/g, ' ').toUpperCase()}
                                </p>
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* BUDGET */}
                {activeTab === 'budget' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="bg-black border-2 border-amber-500 rounded-lg p-6 mb-4">
                            <p className="text-xs text-gray-500 font-mono mb-2">TOTAL BUDGET</p>
                            <p className="text-4xl font-black text-amber-400 font-mono">£{budget.total_budget_gbp.toLocaleString()}</p>
                        </div>

                        <div className="space-y-2">
                            {Object.entries(budget).filter(([key]) => !['total_budget_gbp', 'spent_usd'].includes(key)).map(([key, value]) => (
                                <div key={key} className="bg-black border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                                    <p className="text-white text-sm font-mono">{key.replace(/_/g, ' ').toUpperCase()}</p>
                                    <p className="text-amber-400 text-sm font-mono font-bold">£{value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* CONTACTS */}
                {activeTab === 'contacts' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {contacts.map((contact, idx) => (
                            <div key={idx} className="bg-black border-2 border-amber-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-white font-bold font-mono text-sm">{contact.name}</p>
                                        <p className="text-amber-400 text-xs font-mono mt-1">{contact.phone}</p>
                                        <p className="text-gray-500 text-xs font-mono mt-1">{contact.role}</p>
                                    </div>
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-xs font-mono text-black font-bold"
                                    >
                                        CALL
                                    </a>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* EMERGENCY BANNER */}
            <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto">
                <div className="bg-red-900/90 border-2 border-red-500 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-red-200 text-xs font-mono">EMERGENCY: +44 7XXX XXX XXX (Scott UK)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}