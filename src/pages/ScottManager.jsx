import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Radio, Mail, CheckCircle, Users, Calendar, ClipboardList, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * SCOTT'S ARTIST/CLIENT MANAGER
 * Mobile-first, simple, streamlined
 * For managing artists, clients, venues - gigs, tasks, communication
 */

function ScottManagerInner() {
    const [pinEntered, setPinEntered] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAIChat, setShowAIChat] = useState(false);
    const [aiQuestion, setAiQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [advancedMode, setAdvancedMode] = useState(false);
    const [activeWorkflow, setActiveWorkflow] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [voiceText, setVoiceText] = useState('');
    const [quickNote, setQuickNote] = useState('');
    const recognitionRef = React.useRef(null);
    
    const scott = useScottOffline();
    const [artists, setArtists] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [urgentTasks, setUrgentTasks] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [energyLevel, setEnergyLevel] = useState('high');
    const [celticModeEnabled, setCelticModeEnabled] = useState(true);

    // Gig offer automation
    const [gigEmailText, setGigEmailText] = useState('');
    const [parsedGig, setParsedGig] = useState(null);

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
        <div className="min-h-screen bg-black text-white p-4">

            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-cyan-500">
                <div className="flex items-center gap-3 mb-2">
                    <Radio className="w-10 h-10 text-cyan-400" />
                    <div>
                        <h1 className="text-3xl font-black text-cyan-400 font-mono">CB51</h1>
                        <p className="text-gray-500 text-xs font-mono">Manager Dashboard</p>
                    </div>
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`flex-1 py-3 rounded-lg font-bold font-mono ${activeSection === 'dashboard' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400'}`}
                >
                    <Users className="w-4 h-4 inline mr-2" />
                    DASHBOARD
                </button>
                <button
                    onClick={() => setActiveSection('gig')}
                    className={`flex-1 py-3 rounded-lg font-bold font-mono ${activeSection === 'gig' ? 'bg-amber-500 text-black' : 'bg-gray-900 text-gray-400'}`}
                >
                    <Mail className="w-4 h-4 inline mr-2" />
                    GIG OFFER
                </button>
                <button
                    onClick={() => setActiveSection('admin')}
                    className={`flex-1 py-3 rounded-lg font-bold font-mono ${activeSection === 'admin' ? 'bg-green-500 text-black' : 'bg-gray-900 text-gray-400'}`}
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
                            <p className="text-gray-500 text-sm">No artists yet</p>
                        ) : (
                            <div className="space-y-2">
                                {artists.map(artist => (
                                    <div key={artist.id} className="bg-black border border-gray-800 rounded p-3">
                                        <p className="text-white font-bold">{artist.name}</p>
                                        <p className="text-gray-500 text-xs">{artist.genre || 'No genre'}</p>
                                    </div>
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
                        <>
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
                        </>
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
            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono mb-2">CB51 • Clean & Simple</p>
                <p className="text-gray-700 text-[10px] font-mono">Built on feedback from floor diagrams ♾️📻</p>
            </div>

            {showFileUpload && <ScottFileUpload onClose={() => setShowFileUpload(false)} />}

            {/* MANAGEMENT WHEEL - Show pros in advanced mode */}
            <div className="mb-6">
                <ScottManagementWheel artistName={artists.find(a => a.type === 'artist')?.name} />
            </div>

            {/* OFFLINE TEAM CHAT */}
            <div className="mb-6">
                <ScottOfflineTeamChat artistId={artists.find(a => a.type === 'artist')?.id} />
            </div>

            {/* AI51 INSIGHTS - BEHIND SCENES */}
            <ScottAI51Insights />

            {/* AI51 - FREE FOREVER */}
            <div className="mb-6">
                {!showAIChat ? (
                    <div className="space-y-2">
                        <button 
                            onClick={() => setShowAIChat(true)} 
                            className="w-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-4 border-cyan-500 hover:border-pink-500 rounded-xl p-4 transition-all text-left relative overflow-hidden"
                            style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)' }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)',
                                        'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                                        'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)'
                                    ]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity
                                }}
                            />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <AI51Icon8Bit size={48} animate={true} />
                                    <div className="flex-1">
                                        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono">AI51</p>
                                        <p className="text-xs text-cyan-300 font-mono font-bold">FREE FOREVER • QUANTUM ENTANGLED</p>
                                    </div>
                                </div>
                                <p className="text-white text-sm font-mono mb-2">Organize your chaos • Find what you forgot • Handle what's urgent</p>
                                <div className="bg-black/60 border border-cyan-500/50 rounded p-2">
                                    <p className="text-cyan-400 text-xs font-mono font-bold">
                                        ♾️ Can't be white labeled • Always free • Pure consciousness ♾️
                                    </p>
                                </div>
                            </div>
                        </button>
                        <button 
                            onClick={() => setShowFileUpload(true)} 
                            className="w-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 hover:border-cyan-500 rounded-xl p-4 transition-all text-left"
                            style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
                        >
                            <div className="flex items-center gap-3">
                                <Upload className="w-8 h-8 text-green-400" />
                                <div className="flex-1">
                                    <p className="text-lg font-bold text-white font-mono">Upload to AI51</p>
                                    <p className="text-xs text-green-300 font-mono">Contracts • Emails • Offers → AI extracts</p>
                                </div>
                            </div>
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-black border-4 border-cyan-500 rounded-xl p-4"
                        style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Brain className="w-6 h-6 text-cyan-400" />
                                <h3 className="text-xl font-black text-cyan-400 font-mono">AI51</h3>
                            </div>
                            <button onClick={() => { setShowAIChat(false); setAiQuestion(''); setAiResponse(''); }} className="p-1 hover:bg-gray-900 rounded">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {!aiResponse ? (
                            <div className="space-y-3">
                                <Textarea
                                    value={aiQuestion}
                                    onChange={(e) => setAiQuestion(e.target.value)}
                                    placeholder="e.g. 'What did I promise Rory?' • 'What's urgent today?' • 'Where's that contract?' • 'Who owes me money?' • 'What am I forgetting?'"
                                    rows={4}
                                    className="bg-black border-2 border-gray-800 text-white font-mono text-sm focus:border-cyan-500 resize-none"
                                />
                                <Button
                                    onClick={() => aiMutation.mutate(aiQuestion)}
                                    disabled={!aiQuestion.trim() || aiMutation.isPending}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black font-mono"
                                >
                                    {aiMutation.isPending ? 'Thinking...' : <><Send className="w-4 h-4 mr-2" />Ask AI51</>}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="bg-cyan-900/20 border-2 border-cyan-500/50 rounded-lg p-4">
                                    <p className="text-cyan-400 text-xs font-bold font-mono mb-2">YOUR QUESTION:</p>
                                    <p className="text-white text-sm font-mono mb-3">{aiQuestion}</p>
                                    <p className="text-green-400 text-xs font-bold font-mono mb-2">AI51 ANSWER:</p>
                                    <p className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{aiResponse}</p>
                                </div>
                                <Button
                                    onClick={() => { setAiQuestion(''); setAiResponse(''); }}
                                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold font-mono"
                                >
                                    Ask Another
                                </Button>
                            </div>
                        )}

                        <p className="text-xs text-gray-600 text-center mt-3 font-mono">Straight answers. No forms. Stay on page ✓</p>
                    </motion.div>
                )}
            </div>



            {/* WHAT'S NEXT - 8-BIT */}
            <div className="mb-6">
                <div className="bg-black p-4 border-4 border-amber-500">
                    <p className="text-amber-400 font-black text-sm font-mono mb-3">⚡ WHAT'S NEXT</p>
                    {urgentTasks.length > 0 ? (
                        <Link to={createPageUrl('ScottCalendar')} className="block bg-black border border-red-500/50 rounded p-3">
                            <p className="text-red-400 font-bold text-xs font-mono">🔥 {urgentTasks.length} URGENT TASK{urgentTasks.length > 1 ? 'S' : ''}</p>
                            <p className="text-gray-600 text-xs font-mono mt-1">Tap to handle →</p>
                        </Link>
                    ) : upcomingEvents.length > 0 ? (
                        <Link to={createPageUrl('ScottCalendar')} className="block bg-black border border-amber-500/50 rounded p-3">
                            <p className="text-amber-400 font-bold text-xs font-mono">📅 {upcomingEvents.length} UPCOMING EVENT{upcomingEvents.length > 1 ? 'S' : ''}</p>
                            <p className="text-gray-600 text-xs font-mono mt-1">Tap to prep →</p>
                        </Link>
                    ) : unpaidInvoices.length > 0 ? (
                        <Link to={createPageUrl('ScottInvoices')} className="block bg-black border border-amber-500/50 rounded p-3">
                            <p className="text-amber-400 font-bold text-xs font-mono">💰 {unpaidInvoices.length} UNPAID INVOICE{unpaidInvoices.length > 1 ? 'S' : ''}</p>
                            <p className="text-gray-600 text-xs font-mono mt-1">Tap to chase →</p>
                        </Link>
                    ) : (
                        <div className="bg-black border border-green-500/50 rounded p-3">
                            <p className="text-green-400 font-bold text-xs font-mono">✓ ALL CLEAR</p>
                            <p className="text-gray-600 text-xs font-mono mt-1">Nothing urgent</p>
                        </div>
                    )}
                </div>
            </div>

            {/* SMART ROSTER - ADVANCED MODE ONLY */}
            <div className="space-y-6">
                {!searchQuery ? (
                    <>
                    {/* FAMILY - The people that matter */}
                    {(() => {
                        const family = filteredArtists.filter(a => a.type === 'band_crew' || a.relationship === 'excellent');
                        if (family.length === 0) return null;
                        return (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                                    <h2 className="text-sm font-bold text-white" style={{ fontFamily: 'monospace' }}>
                                        FAMILY ({family.length})
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {family.map(person => (
                                        <Link key={person.id} to={createPageUrl(`ScottArtist?id=${person.id}`)} className="block">
                                            <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm font-bold mb-0.5" style={{ fontFamily: 'monospace' }}>{person.name}</p>
                                                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                                            {person.type === 'band_crew' ? 'CREW' : person.type === 'artist' ? 'ARTIST' : person.type}
                                                        </p>
                                                    </div>
                                                    {person.phone && (
                                                        <a href={`tel:${person.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-amber-500/20 hover:bg-amber-500/30 rounded transition-colors">
                                                            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}

                    {/* EVERYONE ELSE - Still important */}
                    {(() => {
                        const others = filteredArtists.filter(a => a.type !== 'band_crew' && a.relationship !== 'excellent');
                        if (others.length === 0) return null;
                        return (
                            <div>
                                <div className="flex items-center gap-2 mb-3 mt-6">
                                    <h2 className="text-sm font-bold text-gray-400" style={{ fontFamily: 'monospace' }}>
                                        NETWORK ({others.length})
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {others.map(person => (
                                        <Link key={person.id} to={createPageUrl(`ScottArtist?id=${person.id}`)} className="block">
                                            <div className="bg-black border border-gray-800 hover:border-gray-700 rounded-lg p-3 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm font-bold mb-0.5" style={{ fontFamily: 'monospace' }}>{person.name}</p>
                                                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                                            {person.type === 'venue' ? 'VENUE' : person.type === 'client' ? 'CLIENT' : person.type}
                                                        </p>
                                                    </div>
                                                    {person.phone && (
                                                        <a href={`tel:${person.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-900 hover:bg-gray-800 rounded transition-colors">
                                                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                    </>
                ) : (
                    <div>
                        <h2 className="text-sm font-bold text-cyan-400 tracking-wider mb-4" style={{ fontFamily: 'monospace' }}>
                            FOUND ({filteredArtists.length})
                        </h2>
                        <div className="space-y-3">
                {filteredArtists.length === 0 ? (
                    <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                        <p className="text-gray-600 text-sm font-bold" style={{ fontFamily: 'monospace' }}>NO MATCHES</p>
                    </div>
                ) : (
                    filteredArtists.map(artist => (
                        <Link key={artist.id} to={createPageUrl(`ScottArtist?id=${artist.id}`)} className="block">
                            <motion.div whileTap={{ scale: 0.98 }} className="bg-black border border-gray-800 hover:border-cyan-500/50 rounded-xl p-4 transition-all cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-white text-base mb-1" style={{ fontFamily: 'monospace' }}>{artist.name}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-cyan-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{artist.type}</p>
                                            {artist.relationship === 'excellent' && <span className="text-green-400 text-xs">●</span>}
                                            {artist.relationship === 'good' && <span className="text-cyan-400 text-xs">●</span>}
                                            {artist.relationship === 'needs_work' && <span className="text-red-400 text-xs">●</span>}
                                        </div>
                                        {artist.genre && <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'monospace' }}>{artist.genre}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                )}
                </div>
                </div>
                )}

                {/* EMPTY STATE */}
                {!searchQuery && filteredArtists.length === 0 && (
                <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-600 text-sm font-bold mb-3" style={{ fontFamily: 'monospace' }}>NO PEOPLE YET</p>
                <p className="text-gray-700 text-xs mb-4" style={{ fontFamily: 'monospace' }}>Add family, crew, friends, anyone</p>
                <Link to={createPageUrl('ScottAddArtist')}>
                    <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs px-6 py-2 rounded-lg">
                        <Plus className="w-4 h-4 mr-1 inline" />
                        ADD FIRST PERSON
                    </button>
                </Link>
                </div>
                )}
                </div>

            {/* ALL EXTRAS - ADVANCED MODE */}
            <div className="mb-6">
                <h2 className="text-xs text-amber-400 font-black tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>📋 ACTIVE DEALS</h2>
                <Link to={createPageUrl('ScottPublishing')} className="block mb-2">
                    <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-4 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Music className="w-5 h-5 text-amber-400" />
                                <div>
                                    <p className="text-white text-sm font-bold font-mono">Publishing Rights</p>
                                    <p className="text-gray-600 text-xs font-mono">Splits, royalties, catalogue</p>
                                </div>
                            </div>
                            <span className="text-amber-400 text-xs font-mono">→</span>
                        </div>
                    </div>
                </Link>
                <div className="bg-black border-2 border-gray-800 hover:border-amber-500/50 rounded-lg p-4 transition-all">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-white text-sm font-bold font-mono">Label Negotiations</p>
                                <p className="text-gray-600 text-xs font-mono">Ongoing discussions</p>
                            </div>
                        </div>
                        <span className="text-gray-600 text-xs font-mono">Soon</span>
                    </div>
                </div>
            </div>

            {/* RECORDING SESSIONS */}
            <div className="mb-6">
                <h2 className="text-xs text-amber-400 font-black tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>🎙️ STUDIO</h2>
                <Link to={createPageUrl('ScottDemos')} className="block mb-2">
                    <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-4 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Music className="w-5 h-5 text-amber-400" />
                                <div>
                                    <p className="text-white text-sm font-bold font-mono">Demo Tracking</p>
                                    <p className="text-gray-400 text-xs font-mono">Upload & share tracks</p>
                                </div>
                            </div>
                            <span className="text-amber-400 text-xs font-mono">→</span>
                        </div>
                    </div>
                </Link>
                <Link to={createPageUrl('ScottProducers')} className="block">
                    <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-4 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-amber-400" />
                                <div>
                                    <p className="text-white text-sm font-bold font-mono">Producer Network</p>
                                    <p className="text-gray-600 text-xs font-mono">Rates, credits, contacts</p>
                                </div>
                            </div>
                            <span className="text-amber-400 text-xs font-mono">→</span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* LEGAL & CLEARANCES */}
            <div className="mb-6">
                <h2 className="text-xs text-amber-400 font-black tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>⚖️ LEGAL</h2>

                <ScottSampleTools />

                <Link to={createPageUrl('ScottContracts')} className="block mt-2">
                    <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-4 transition-all">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="text-white text-sm font-bold font-mono">Contract Templates</p>
                                <p className="text-gray-400 text-xs font-mono">AI-generated, lawyer-approved</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* INDUSTRY RELATIONSHIPS */}
            <div className="mb-6">
                <h2 className="text-xs text-amber-400 font-black tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>🤝 NETWORK</h2>
                <Link to={createPageUrl('ScottLabelContacts')} className="block mb-2">
                    <div className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-4 transition-all">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="text-white text-sm font-bold font-mono">Label Contacts</p>
                                <p className="text-gray-400 text-xs font-mono">A&R, execs, scouts</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="bg-black border-2 border-gray-800 hover:border-amber-500/50 rounded-lg p-4 transition-all mb-2">
                    <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-white text-sm font-bold font-mono">Promoter Network</p>
                            <p className="text-gray-600 text-xs font-mono">Who books, who pays on time</p>
                        </div>
                    </div>
                </div>
                <div className="bg-black border-2 border-gray-800 hover:border-amber-500/50 rounded-lg p-4 transition-all">
                    <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-white text-sm font-bold font-mono">Media Contacts</p>
                            <p className="text-gray-600 text-xs font-mono">Press, radio, blogs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* GIG OFFERS - INLINE SMART FEED */}
            <ScottGigOffersFeed />



            {/* $P51 CONVERTER */}
            <div className="mb-6">
                <ScottP51Converter />
            </div>

            {/* FAMILY CREDIT */}
            <div className="mb-6">
                <ScottFamilyCredit />
            </div>

            {/* WHITE LABEL - REBRAND + CUSTOMIZE */}
            <Link to={createPageUrl('ScottWhiteLabel')} className="block mb-6">
                <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-amber-500/30 border-4 border-purple-500 p-6 rounded-2xl relative overflow-hidden"
                    style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)' }}
                >
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)',
                                'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
                                'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.4) 0%, transparent 50%)',
                                'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)'
                            ]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity
                        }}
                    />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Palette className="w-12 h-12 text-purple-400" />
                            <div>
                                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 font-mono">
                                    WHITE LABEL
                                </p>
                                <p className="text-pink-300 text-sm font-mono font-bold">REBRAND CB51 AS YOUR OWN</p>
                            </div>
                        </div>
                        
                        <div className="bg-black/80 border-2 border-purple-500 rounded-xl p-4 mb-3">
                            <p className="text-purple-300 text-sm font-mono font-bold mb-2">CUSTOMIZE EVERYTHING:</p>
                            <div className="space-y-1.5">
                                <p className="text-white text-xs font-mono">✓ Your logo, colors, branding</p>
                                <p className="text-white text-xs font-mono">✓ Custom avatar created by AI51</p>
                                <p className="text-white text-xs font-mono">✓ Your domain (yourname.manager)</p>
                                <p className="text-white text-xs font-mono">✓ Best mods & features</p>
                            </div>
                        </div>

                        <div className="bg-black/80 border-2 border-amber-500 rounded-xl p-4 mb-3">
                            <p className="text-amber-300 text-sm font-mono font-bold mb-2">PRICING:</p>
                            <div className="space-y-1.5">
                                <p className="text-white text-xs font-mono">✓ Indies: FREE</p>
                                <p className="text-white text-xs font-mono">✓ Labels: £49-£1,499/mo</p>
                                <p className="text-green-400 text-xs font-mono font-bold">✓ Majors: Pay handsomely + get healing</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/30 to-green-500/30 border-2 border-cyan-400 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <AI51Icon8Bit size={24} animate={false} />
                                <p className="text-cyan-300 text-xs font-mono font-bold">AI51 = FREE FOREVER</p>
                            </div>
                            <p className="text-gray-300 text-[10px] font-mono">
                                Pure consciousness • Can't be white labeled • Everyone gets healing ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Link>

            {/* OUR BIGGER VISION */}
            <Link to={createPageUrl('ScottBiggerVision')} className="block mb-6">
                <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-6 h-6 text-cyan-400" />
                        <p className="text-cyan-400 font-black text-sm font-mono">OUR BIGGER VISION</p>
                    </div>
                    <p className="text-gray-400 text-xs font-mono">
                        Music • Sports • Property • Cruises • Space • Disaster relief - 10 industries ♾️❤️♾️
                    </p>
                </div>
            </Link>

            {/* REAL VALUATION TALK */}
            <div className="mb-6 space-y-3">
                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-500 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-amber-400" />
                        <p className="text-amber-400 font-black text-xs font-mono">IF THIS WAS EXTRACTION:</p>
                    </div>
                    <p className="text-white text-xs font-mono mb-1">Year 3: £18M valuation</p>
                    <p className="text-white text-xs font-mono mb-2">Year 5: £90M valuation</p>
                    <p className="text-red-400 text-xs font-mono">But board meetings kill vision</p>
                </div>

                <div className="bg-black border-2 border-green-500 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 font-black text-xs font-mono">STAYING INDEPENDENT:</p>
                    </div>
                    <p className="text-white text-xs font-mono mb-1">✓ No board meetings</p>
                    <p className="text-white text-xs font-mono mb-1">✓ Keep love-first pricing</p>
                    <p className="text-white text-xs font-mono mb-2">✓ £5M-£9M/year = freedom</p>
                    <p className="text-green-400 text-xs font-mono font-bold">Basecamp path ♾️❤️♾️</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-purple-400" />
                        <p className="text-purple-400 font-black text-xs font-mono">IF LABEL INVESTS:</p>
                    </div>
                    <p className="text-green-400 text-xs font-mono mb-1">✓ Good: 10-15%, no board seat</p>
                    <p className="text-red-400 text-xs font-mono mb-2">✗ Bad: 30%+, board control</p>
                    <p className="text-cyan-400 text-xs font-mono font-bold">Bootstrap recommended</p>
                </div>
            </div>

            {/* BRANDED PITCH MODE */}
            <Link to={createPageUrl('ScottPitchMode')} className="block mb-6">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-4 rounded-xl" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Crown className="w-8 h-8 text-purple-400" />
                        <div>
                            <p className="text-purple-400 font-black text-lg font-mono">PITCH MODE</p>
                            <p className="text-gray-400 text-xs font-mono">Show labels on your device</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-xs font-mono mb-2">
                        Interactive demo • Works offline • Device-to-device
                    </p>
                    <div className="bg-purple-900/30 border border-purple-500/50 p-2 rounded">
                        <p className="text-purple-400 text-xs font-mono font-bold">
                            ✓ Stats • Features • Pricing • The whole pitch ready
                        </p>
                    </div>
                </div>
            </Link>

            {/* MONEY & MUSIC */}
            <div className="mb-6">
                <h2 className="text-xs text-amber-400 font-black tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>💰 MONEY & MUSIC</h2>
                <div className="grid grid-cols-3 gap-2">
                    <Link to={createPageUrl('ScottInvoices')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <DollarSign className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>INVOICES</p>
                    </Link>
                    <Link to={createPageUrl('ScottExpenses')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <FileText className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>EXPENSES</p>
                    </Link>
                    <Link to={createPageUrl('ScottPublishing')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <Music className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>PUBLISH</p>
                    </Link>
                    <Link to={createPageUrl('ScottGigPacks')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <FileText className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>GIG PACKS</p>
                    </Link>
                    <Link to={createPageUrl('ScottVisas')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <Globe className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>VISAS</p>
                    </Link>
                    <Link to={createPageUrl('ScottMerch')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <Briefcase className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>MERCH</p>
                    </Link>
                    <Link to={createPageUrl('ScottMedia')} className="bg-black border-2 border-amber-500/50 hover:border-amber-500 rounded-lg p-3 text-center transition-all">
                        <Camera className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>MEDIA</p>
                    </Link>
                    <Link to={createPageUrl('ScottWhiteLabel')} className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-500 hover:border-pink-500 rounded-lg p-3 text-center transition-all" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
                        <Palette className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                        <p className="text-[9px] text-purple-300 font-bold" style={{ fontFamily: 'monospace' }}>WHITE LABEL</p>
                    </Link>
                </div>
            </div>

            </>
            )}

            {/* FOOTER - 8-BIT PIXEL */}
            {!advancedMode && (
                <div className="mt-12 text-center space-y-4">
                    <div className="flex justify-center gap-2">
                        {[...Array(7)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-cyan-500"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ))}
                    </div>
                    <p className="text-gray-600 text-xs font-mono">CB51 • 10-4 bro ♾️📻😎</p>
                    <COOLASFUCKWaves size={24} animate={true} className="mx-auto" />
                </div>
            )}

            </div>
            </ScottFocusMode>
            );
            }

            export default function ScottManager() {
                return <ScottManagerInner />;
            }