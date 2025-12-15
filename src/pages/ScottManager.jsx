import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Wifi, WifiOff, RefreshCw, Brain, DollarSign, FileText, Music, Globe, Briefcase, Camera, Plane, Users, Crown, Palette, Heart, Send, X, Shield, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import CoManager51Icon8Bit from '@/components/shared/CoManager51Icon8Bit';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';
import BrosBond8Bit from '@/components/shared/BrosBond8Bit';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';
import ScottOneSentence from '@/components/scott/ScottOneSentence';
import ScottEnergyMode from '@/components/scott/ScottEnergyMode';
import ScottCelticMode from '@/components/scott/ScottCelticMode';
import ScottTimeline from '@/components/scott/ScottTimeline';
import ScottQuickActions from '@/components/scott/ScottQuickActions';
import ScottTeamShare from '@/components/scott/ScottTeamShare';
import ScottMorningBriefing from '@/components/scott/ScottMorningBriefing';
import ScottFocusMode from '@/components/scott/ScottFocusMode';
import ScottContextMemory from '@/components/scott/ScottContextMemory';
import ScottDidIDoThis from '@/components/scott/ScottDidIDoThis';
import ScottQuickTools from '@/components/scott/ScottQuickTools';
import ScottGigOffersFeed from '@/components/scott/ScottGigOffersFeed';
import ScottBrainDump from '@/components/scott/ScottBrainDump';
import ScottHealthCheck from '@/components/scott/ScottHealthCheck';
import ScottTestMode from '@/components/scott/ScottTestMode';
import ScottFeatureRequest from '@/components/scott/ScottFeatureRequest';
import ScottSampleTools from '@/components/scott/ScottSampleTools';
import ScottP51Converter from '@/components/scott/ScottP51Converter';
import ScottFamilyCredit from '@/components/scott/ScottFamilyCredit';
import ScottP2PSync from '@/components/scott/ScottP2PSync';
import ScottDailySupport from '@/components/scott/ScottDailySupport';
import ScottTeamChat from '@/components/scott/ScottTeamChat';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import ScottFileUpload from '@/components/scott/ScottFileUpload';
import ScottMessageInbox from '@/components/scott/ScottMessageInbox';
import ScottDecisionCenter from '@/components/scott/ScottDecisionCenter';
import ScottEmailDrafter from '@/components/scott/ScottEmailDrafter';

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
    
    const scott = useScottOffline();
    const [artists, setArtists] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [urgentTasks, setUrgentTasks] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [energyLevel, setEnergyLevel] = useState('high');
    const [celticModeEnabled, setCelticModeEnabled] = useState(true);

    const aiMutation = useMutation({
        mutationFn: async (question) => {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51, Scott's AI co-manager for Co-Manager51. Help with: ${question}. 
                
Context: Music manager dealing with artists, tours, contracts, publishing, visas, expenses.
Keep it SHORT, practical, straight to the point. No bullshit. Real help.`,
                response_json_schema: null
            });
            return response;
        },
        onSuccess: (data) => {
            setAiResponse(data);
        }
    });

    // Check if PIN already stored
    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
        }
    }, []);

    // Load data from offline storage
    useEffect(() => {
        if (pinEntered) {
            const loadedArtists = scott.getArtists();
            const loadedEvents = scott.getEvents();
            const loadedTasks = scott.getTasks();
            const loadedInvoices = scott.getUnpaidInvoices();
            const loadedExpenses = scott.getExpenses();

            setArtists(loadedArtists);
            setUnpaidInvoices(loadedInvoices);
            setExpenses(loadedExpenses);

            const upcoming = loadedEvents.filter(e => new Date(e.date) >= new Date());
            setUpcomingEvents(upcoming);

            const urgent = loadedTasks.filter(t => 
                t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
            );
            setUrgentTasks(urgent);

            // Pull fresh data if online
            if (scott.isOnline) {
                scott.pullFromServer().then(() => {
                    setArtists(scott.getArtists());
                    setUnpaidInvoices(scott.getUnpaidInvoices());
                    setExpenses(scott.getExpenses());
                    setUpcomingEvents(scott.getEvents().filter(e => new Date(e.date) >= new Date()));
                    setUrgentTasks(scott.getTasks().filter(t => 
                        t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
                    ));
                });
            }
        }
    }, [pinEntered, scott.isOnline]);

    const handlePinSubmit = () => {
        if (pinInput === '1888') {
            localStorage.setItem('scott_access_pin', '1888');
            setPinEntered(true);
        }
    };

    const filteredArtists = artists.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // PIN ENTRY SCREEN - CLEAN SIMPLE
    if (!pinEntered) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-8 max-w-sm w-full shadow-2xl"
                    style={{ boxShadow: '0 0 60px rgba(245, 158, 11, 0.15)' }}
                >
                    <div className="text-center mb-8">
                        <BrosBond8Bit size={80} animate={true} className="mx-auto mb-4" />
                        <h1 className="text-3xl font-black text-white mb-2 font-mono tracking-tight">Co-Manager51</h1>
                        <p className="text-gray-400 text-sm font-mono">You + Scott • Light each other's fire ♾️❤️😎</p>
                        <p className="text-gray-600 text-xs font-mono mt-2">Enter PIN to unlock</p>
                    </div>

                    <Input
                        type="password"
                        placeholder="••••"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        className="bg-black/50 border-2 border-amber-500/50 text-white text-center text-2xl mb-4 focus:border-amber-500 transition-all tracking-widest font-mono rounded-lg"
                        style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.1)' }}
                    />
                    <Button
                        onClick={handlePinSubmit}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black py-4 transition-all shadow-lg font-mono text-sm tracking-wider rounded-lg"
                        style={{ boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)' }}
                    >
                        ENTER
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <ScottFocusMode>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 pb-32">

        <ScottHealthCheck />
        <ScottBrainDump />
        <ScottTestMode />
        <ScottFeatureRequest />



            {/* HEADER - CLEAN - STICKY */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-0 z-50 mb-6 bg-black/95 backdrop-blur-xl py-4 -mx-4 px-4"
            >
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-5 flex items-center justify-between shadow-lg" style={{ boxShadow: '0 4px 30px rgba(245, 158, 11, 0.1)' }}>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <CoManager51Icon8Bit size={28} animate={true} />
                            <h1 className="text-2xl font-black text-white font-mono tracking-tight">Co-Manager51</h1>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                            <span className={scott.isOnline ? 'text-green-400' : 'text-amber-400'}>●</span> 
                            {scott.isOnline ? 'Online' : 'Offline'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to={createPageUrl('ScottAbout')} className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all border border-gray-700">
                            <Heart className="w-5 h-5 text-gray-300" />
                        </Link>
                        <Link to={createPageUrl('ScottWhiteLabelPricing')} className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-lg transition-all shadow-md" style={{ boxShadow: '0 2px 12px rgba(245, 158, 11, 0.3)' }}>
                            <DollarSign className="w-5 h-5 text-black" />
                        </Link>
                        <Link to={createPageUrl('ScottCalendar')} className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all border border-gray-700">
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* WHAT'S NEXT - TOP SO YOU SEE ACTIVITY */}
            <div className="mb-6">
                <div className="bg-black p-4 rounded-xl mb-3 border-2 border-amber-500">
                    <p className="text-white font-black text-sm font-mono mb-2">⚡ WHAT'S NEXT</p>
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

            {/* LA TRIP - URGENT */}
            <Link to={createPageUrl('ScottLATrip')} className="block mb-6">
                <div className="bg-black p-6 rounded-xl border-4 border-amber-500 relative overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(245, 158, 11, 0.6)' }}>
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded font-mono">
                        LIVE
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Plane className="w-8 h-8 text-amber-400" />
                            <div>
                                <p className="text-white font-black text-xl mb-0.5" style={{ fontFamily: 'monospace' }}>LA TRIP</p>
                                <p className="text-gray-600 text-xs font-mono">YES AND MAYBE • Dec 2025</p>
                            </div>
                        </div>
                        <div className="bg-black border border-amber-500/30 rounded-lg p-3 mb-2">
                            <p className="text-gray-300 text-sm font-mono">✓ Schedule • Checklist • Budget</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                            <p>Producers • Gigs • LA Contacts</p>
                        </div>
                    </div>
                </div>
            </Link>

            {showFileUpload && <ScottFileUpload onClose={() => setShowFileUpload(false)} />}

            {/* AI CHAT - INLINE */}
            <div className="mb-6">
                {!showAIChat ? (
                    <div className="space-y-2">
                        <button onClick={() => setShowAIChat(true)} className="w-full bg-black border-2 border-amber-500 hover:border-amber-400 rounded-lg p-4 transition-all text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <Brain className="w-8 h-8 text-amber-400" />
                                <div className="flex-1">
                                    <p className="text-lg font-bold text-white font-mono">AI51 Help</p>
                                    <p className="text-xs text-gray-500 font-mono">Ask anything about music management</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm font-mono">Contracts • Deals • Tours • Publishing • No bullshit ✓</p>
                        </button>
                        <button onClick={() => setShowFileUpload(true)} className="w-full bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 border-2 border-cyan-500 rounded-lg p-4 transition-all text-left">
                            <div className="flex items-center gap-3">
                                <Upload className="w-8 h-8 text-white" />
                                <div className="flex-1">
                                    <p className="text-lg font-bold text-white font-mono">Upload to AI51</p>
                                    <p className="text-xs text-cyan-200 font-mono">Contracts • Emails • Offers → AI extracts</p>
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
                                    placeholder="e.g. How do I split publishing on a collab? What visa do I need for US tour? Sample clearance process?"
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



            {/* WHAT'S NEXT - TOP SO YOU SEE ACTIVITY */}
            <div className="mb-6">
                <div className="bg-black p-4 rounded-xl mb-3 border-2 border-amber-500">
                    <p className="text-white font-black text-sm font-mono mb-2">⚡ WHAT'S NEXT</p>
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

            {/* LIFE STATS - WHAT MATTERS */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-3 gap-3 mb-6"
            >
                <div className="bg-gradient-to-br from-amber-950/30 to-black border-2 border-amber-500/50 p-4 text-center rounded-lg shadow-md">
                    <p className="text-3xl font-black text-amber-400 mb-1 font-mono">{artists.filter(a => a.type === 'band_crew' || a.relationship === 'excellent').length}</p>
                    <p className="text-[9px] text-gray-500 tracking-wider font-bold font-mono">FAMILY</p>
                </div>
                <Link to={createPageUrl('ScottCalendar')} className="w-full">
                    <div className="bg-gradient-to-br from-cyan-950/30 to-black border-2 border-cyan-500/50 hover:border-cyan-500 p-4 text-center transition-all rounded-lg shadow-md">
                        <p className="text-3xl font-black text-cyan-400 mb-1 font-mono">{upcomingEvents.length}</p>
                        <p className="text-[9px] text-gray-500 tracking-wider font-bold font-mono">PLANS</p>
                    </div>
                </Link>
                <div className="bg-gradient-to-br from-green-950/30 to-black border-2 border-green-500/50 p-4 text-center rounded-lg shadow-md">
                    <p className="text-3xl font-black text-green-400 mb-1 font-mono">{artists.length}</p>
                    <p className="text-[9px] text-gray-500 tracking-wider font-bold font-mono">PEOPLE</p>
                </div>
            </motion.div>



            {/* SEARCH - SIMPLE */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <Input
                        placeholder="Find artist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 py-2 bg-black border border-gray-800 rounded-lg text-white text-sm focus:border-cyan-500 transition-all"
                        style={{ fontFamily: 'monospace' }}
                    />
                </div>
            </div>



            {/* SMART ROSTER - AUTO-ORGANIZED */}
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

            {/* ACTIVE DEALS & CONTRACTS */}
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

            {/* P2P MESH SYNC */}
            <ScottP2PSync />

            {/* $P51 CONVERTER */}
            <div className="mb-6">
                <ScottP51Converter />
            </div>

            {/* FAMILY CREDIT */}
            <div className="mb-6">
                <ScottFamilyCredit />
            </div>

            {/* PRICING - COOLASFUCK */}
            <Link to={createPageUrl('ScottWhiteLabelPricing')} className="block mb-6">
                <div className="bg-gradient-to-r from-pink-500/20 to-amber-500/20 border-4 border-pink-500 p-4 rounded-xl" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-8 h-8 text-pink-400" />
                        <div>
                            <p className="text-pink-400 font-black text-base font-mono">🏹 PRICING</p>
                            <p className="text-amber-400 text-xs font-mono">Labels fund cleanup crews</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs font-mono">
                        Free indies • £49-£1,499 labels • Your money pays people to heal planet ♾️❤️♾️
                    </p>
                </div>
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
                    <Link to={createPageUrl('ScottWhiteLabel')} className="bg-black border-2 border-pink-500/50 hover:border-pink-500 rounded-lg p-3 text-center transition-all">
                        <Palette className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-600 font-bold" style={{ fontFamily: 'monospace' }}>TEST IT</p>
                    </Link>
                </div>
            </div>

            {/* FOOTER - SIMPLE */}
            <div className="mt-12 pt-6 border-t border-gray-800 text-center mb-32">
                <p className="text-gray-600 text-xs">Co-Manager</p>
            </div>

            {/* QUICK TOOLS - ONE BUTTON */}
            <ScottQuickTools onComplete={() => window.location.reload()} />

            {/* TEAM CHAT - FLOATING (Hidden by default) */}

            </div>
            </ScottFocusMode>
            );
            }

            export default function ScottManager() {
            return (
            <ScottOfflineProvider>
            <ScottManagerInner />
            </ScottOfflineProvider>
            );
            }