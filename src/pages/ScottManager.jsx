import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Radio, Mail, Users, Calendar, ClipboardList, Send, Loader2, Heart, Globe, DollarSign, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * CB51 - CLEAN SLATE FOR SCOTT
 * Based on floor diagrams: Manager/Artist Dashboard, Automated Gig Offers, Admin Tasks
 */

export default function ScottManager() {
    const [pinEntered, setPinEntered] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [activeSection, setActiveSection] = useState('dashboard');
    const [gigEmailText, setGigEmailText] = useState('');
    const [parsedGig, setParsedGig] = useState(null);

    // Fetch basic data
    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({}),
        enabled: pinEntered
    });

    const { data: upcomingGigs = [] } = useQuery({
        queryKey: ['scottUpcomingGigs'],
        queryFn: () => base44.entities.ScottEvent.filter({ event_type: 'gig' }),
        enabled: pinEntered
    });

    const { data: tasks = [] } = useQuery({
        queryKey: ['scottTasks'],
        queryFn: () => base44.entities.ScottTask.filter({ status: 'pending' }),
        enabled: pinEntered
    });

    const parseGigMutation = useMutation({
        mutationFn: async (email) => {
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract gig details from this email:\n\n${email}\n\nReturn: venue, date (YYYY-MM-DD), fee, artist name, notes`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        venue: { type: "string" },
                        date: { type: "string" },
                        fee: { type: "number" },
                        artist: { type: "string" },
                        notes: { type: "string" }
                    }
                }
            });
            return result;
        },
        onSuccess: (data) => setParsedGig(data)
    });

    const sendGigToTeamMutation = useMutation({
        mutationFn: async () => {
            await base44.entities.ScottGigOffer.create({
                venue_name: parsedGig.venue,
                offer_date: parsedGig.date,
                guarantee: parsedGig.fee,
                artist_name: parsedGig.artist,
                notes: parsedGig.notes,
                status: 'pending_team'
            });
        },
        onSuccess: () => {
            setGigEmailText('');
            setParsedGig(null);
            alert('Sent to team ✓');
        }
    });

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') setPinEntered(true);
        document.title = 'CB51 - Manager Dashboard';
    }, []);

    const handlePinSubmit = () => {
        if (pinInput === '1888') {
            localStorage.setItem('scott_access_pin', '1888');
            setPinEntered(true);
        }
    };

    if (!pinEntered) {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black border-4 border-cyan-500 p-8 max-w-sm w-full"
                    style={{ boxShadow: '0 0 60px rgba(34, 211, 238, 0.5)' }}
                >
                    <div className="text-center mb-8">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="mb-6"
                        >
                            <Radio className="w-20 h-20 text-cyan-400 mx-auto" />
                        </motion.div>
                        <h1 className="text-4xl font-black text-cyan-400 mb-2 font-mono" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>CB51</h1>
                        <p className="text-pink-400 text-lg font-bold font-mono mb-1">CITIZEN BAND 51</p>
                        <p className="text-gray-400 text-sm font-mono">10-4 BRO51 + SK51 ♾️📻</p>
                        <p className="text-gray-600 text-xs font-mono mt-4">Enter PIN to unlock</p>
                    </div>

                    <Input
                        type="password"
                        placeholder="****"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black border-4 border-cyan-500 text-white text-center text-3xl mb-4 focus:border-pink-500 transition-all tracking-widest font-mono"
                    />
                    <button
                        onClick={handlePinSubmit}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 border-4 border-cyan-400 text-black font-black py-4 font-mono text-lg tracking-wider"
                        style={{ boxShadow: '8px 8px 0px rgba(34, 211, 238, 0.5)' }}
                    >
                        ENTER CB51 →
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">

            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-cyan-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400 font-mono">CB51</h1>
                            <p className="text-gray-500 text-xs font-mono">Manager Dashboard</p>
                        </div>
                    </div>
                    <Link to={createPageUrl('ScottAbout')}>
                        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                            ABOUT
                        </button>
                    </Link>
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`flex-1 py-3 rounded-lg font-bold font-mono text-sm ${activeSection === 'dashboard' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400'}`}
                >
                    <Users className="w-4 h-4 inline mr-2" />
                    DASHBOARD
                </button>
                <button
                    onClick={() => setActiveSection('gig')}
                    className={`flex-1 py-3 rounded-lg font-bold font-mono text-sm ${activeSection === 'gig' ? 'bg-amber-500 text-black' : 'bg-gray-900 text-gray-400'}`}
                >
                    <Mail className="w-4 h-4 inline mr-2" />
                    GIG OFFER
                </button>
                <button
                    onClick={() => setActiveSection('admin')}
                    className={`flex-1 py-3 rounded-lg font-bold font-mono text-sm ${activeSection === 'admin' ? 'bg-green-500 text-black' : 'bg-gray-900 text-gray-400'}`}
                >
                    <ClipboardList className="w-4 h-4 inline mr-2" />
                    ADMIN
                </button>
            </div>

            {/* DASHBOARD SECTION */}
            {activeSection === 'dashboard' && (
                <div className="space-y-4">
                    <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-4">
                        <h2 className="text-cyan-400 font-bold mb-3 font-mono">YOUR ARTISTS</h2>
                        {artists.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-gray-500 text-sm mb-3">No artists yet</p>
                                <Link to={createPageUrl('ScottAddArtist')}>
                                    <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm">
                                        ADD ARTIST
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {artists.map(artist => (
                                    <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)}>
                                        <div className="bg-black border border-gray-800 hover:border-cyan-500 rounded p-3 transition-all">
                                            <p className="text-white font-bold">{artist.name}</p>
                                            <p className="text-gray-500 text-xs">{artist.genre || artist.type}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-900 border-2 border-amber-500 rounded-lg p-4">
                        <h2 className="text-amber-400 font-bold mb-3 font-mono">UPCOMING GIGS</h2>
                        {upcomingGigs.length === 0 ? (
                            <p className="text-gray-500 text-sm">No upcoming gigs</p>
                        ) : (
                            <div className="space-y-2">
                                {upcomingGigs.slice(0, 3).map(gig => (
                                    <div key={gig.id} className="bg-black border border-gray-800 rounded p-3">
                                        <p className="text-white font-bold text-sm">{gig.title}</p>
                                        <p className="text-gray-500 text-xs">{gig.date}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-4">
                        <h2 className="text-green-400 font-bold mb-3 font-mono">PENDING TASKS</h2>
                        {tasks.length === 0 ? (
                            <p className="text-gray-500 text-sm">All clear ✓</p>
                        ) : (
                            <div className="space-y-2">
                                {tasks.slice(0, 3).map(task => (
                                    <div key={task.id} className="bg-black border border-gray-800 rounded p-3">
                                        <p className="text-white text-sm">{task.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* GIG OFFER AUTOMATION */}
            {activeSection === 'gig' && (
                <div className="space-y-4">
                    {!parsedGig ? (
                        <div className="bg-gray-900 border-2 border-amber-500 rounded-lg p-4">
                            <h2 className="text-amber-400 font-bold mb-3 font-mono">PASTE GIG EMAIL</h2>
                            <Textarea
                                value={gigEmailText}
                                onChange={(e) => setGigEmailText(e.target.value)}
                                placeholder="Paste the gig offer email here..."
                                rows={8}
                                className="bg-black border-2 border-gray-700 text-white mb-3 font-mono text-sm"
                            />
                            <Button
                                onClick={() => parseGigMutation.mutate(gigEmailText)}
                                disabled={!gigEmailText.trim() || parseGigMutation.isPending}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black"
                            >
                                {parseGigMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        SCANNING...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        SCAN EMAIL
                                    </>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                                <h2 className="text-green-400 font-bold mb-3 font-mono">✓ GIG DETAILS</h2>
                                <div className="space-y-2 text-sm">
                                    <p className="text-white"><strong>Venue:</strong> {parsedGig.venue}</p>
                                    <p className="text-white"><strong>Date:</strong> {parsedGig.date}</p>
                                    <p className="text-white"><strong>Fee:</strong> £{parsedGig.fee}</p>
                                    <p className="text-white"><strong>Artist:</strong> {parsedGig.artist}</p>
                                    {parsedGig.notes && <p className="text-gray-400 text-xs">{parsedGig.notes}</p>}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => { setGigEmailText(''); setParsedGig(null); }}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600"
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    onClick={() => sendGigToTeamMutation.mutate()}
                                    disabled={sendGigToTeamMutation.isPending}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-black font-black"
                                >
                                    {sendGigToTeamMutation.isPending ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Users className="w-4 h-4 mr-2" />
                                    )}
                                    SEND TO TEAM
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ADMIN TASKS */}
            {activeSection === 'admin' && (
                <div className="space-y-4">
                    <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-4">
                        <h2 className="text-green-400 font-bold mb-3 font-mono">QUICK ADMIN</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <Link to={createPageUrl('ScottCalendar')}>
                                <button className="w-full bg-black border border-gray-700 hover:border-green-500 p-3 rounded">
                                    <Calendar className="w-6 h-6 text-green-400 mx-auto mb-1" />
                                    <p className="text-white text-xs font-bold">CALENDAR</p>
                                </button>
                            </Link>
                            <Link to={createPageUrl('ScottInvoices')}>
                                <button className="w-full bg-black border border-gray-700 hover:border-green-500 p-3 rounded">
                                    <ClipboardList className="w-6 h-6 text-green-400 mx-auto mb-1" />
                                    <p className="text-white text-xs font-bold">INVOICES</p>
                                </button>
                            </Link>
                            <Link to={createPageUrl('ScottExpenses')}>
                                <button className="w-full bg-black border border-gray-700 hover:border-green-500 p-3 rounded">
                                    <ClipboardList className="w-6 h-6 text-green-400 mx-auto mb-1" />
                                    <p className="text-white text-xs font-bold">EXPENSES</p>
                                </button>
                            </Link>
                            <Link to={createPageUrl('ScottContracts')}>
                                <button className="w-full bg-black border border-gray-700 hover:border-green-500 p-3 rounded">
                                    <ClipboardList className="w-6 h-6 text-green-400 mx-auto mb-1" />
                                    <p className="text-white text-xs font-bold">CONTRACTS</p>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4">
                        <p className="text-gray-500 text-sm text-center">More admin tools coming based on your feedback</p>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <div className="mt-12 text-center space-y-3">
                <p className="text-gray-600 text-xs font-mono">CB51 • Clean & Simple</p>
                <p className="text-gray-700 text-[10px] font-mono">Built on feedback from floor diagrams ♾️📻</p>
            </div>
        </div>
    );
}