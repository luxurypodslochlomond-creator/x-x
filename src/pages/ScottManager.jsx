import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Wifi, WifiOff, RefreshCw, Brain, DollarSign, FileText, Music, Globe, Briefcase, Camera, Plane, Users, Crown, Palette, Heart, Send, X, Shield, Upload, Calendar, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import BrosBond8Bit from '@/components/shared/BrosBond8Bit';
import AI51Icon8Bit from '@/components/shared/AI51Icon8Bit';
import { COOLASFUCKMusicNote, COOLASFUCKHeart, COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';
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
import ScottGigWorkflow from '@/components/scott/ScottGigWorkflow';
import ScottSessionWorkflow from '@/components/scott/ScottSessionWorkflow';
import ScottSimpleComms from '@/components/scott/ScottSimpleComms';
import AI51MessageHandler from '@/components/ai51/AI51MessageHandler';
import ScottAI51Insights from '@/components/scott/ScottAI51Insights';

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
                        placeholder="1888"
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
        <ScottFocusMode>
        <div className="min-h-screen bg-black p-4 pb-32">

        {/* P2P MESH - RUNS INVISIBLE IN BACKGROUND */}
        <div className="hidden"><ScottP2PSync /></div>

        <ScottHealthCheck />
        <ScottBrainDump />
        <ScottTestMode />
        <ScottFeatureRequest />



            {/* HEADER - 8-BIT RETRO CB51 RADIO */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-0 z-50 mb-6 -mx-4 px-4 py-3 bg-black border-b-4 border-cyan-500"
            >
                <div className="bg-black border-4 border-cyan-500 p-4">
                    {/* Pixel scanlines */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.3) 2px, rgba(34, 211, 238, 0.3) 4px)'
                    }} />

                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity
                                }}
                            >
                                <Radio className="w-10 h-10 text-cyan-400" strokeWidth={3} />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-black text-cyan-400 font-mono" style={{ textShadow: '2px 2px 0px rgba(0,0,0,1)' }}>
                                    CB51
                                </h1>
                                <div className="flex items-center gap-2">
                                    <motion.div 
                                        className={`w-2 h-2 ${scott.isOnline ? 'bg-green-400' : 'bg-amber-400'}`}
                                        animate={{
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity
                                        }}
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                    <p className="text-xs text-gray-400 font-mono">
                                        {scott.isOnline ? '10-4 ONLINE' : '10-7 OFFLINE'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link 
                                to={createPageUrl('ScottAbout')} 
                                className="w-10 h-10 bg-black border-2 border-pink-500 hover:border-pink-400 flex items-center justify-center transition-all"
                            >
                                <COOLASFUCKHeart size={20} animate={false} />
                            </Link>
                            <Link 
                                to={createPageUrl('ScottWhiteLabelPricing')} 
                                className="w-10 h-10 bg-black border-2 border-amber-500 hover:border-amber-400 flex items-center justify-center transition-all"
                            >
                                <DollarSign className="w-5 h-5 text-amber-400" strokeWidth={3} />
                            </Link>
                            <Link 
                                to={createPageUrl('ScottCalendar')} 
                                className="w-10 h-10 bg-black border-2 border-cyan-500 hover:border-cyan-400 flex items-center justify-center transition-all"
                            >
                                <Calendar className="w-5 h-5 text-cyan-400" strokeWidth={3} />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>



            {/* 8-BIT PRIMARY ACTIONS */}
            {!activeWorkflow && !advancedMode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 mb-6"
                >
                    {/* PASTE MESSAGES - 8-BIT BALANCED */}
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveWorkflow('messages')}
                        className="w-full py-6 bg-purple-500/80 border-4 border-purple-400 text-white font-black"
                        style={{ 
                            boxShadow: '4px 4px 0px rgba(168, 85, 247, 0.6)'
                        }}
                    >
                        <p className="text-2xl mb-1">📱</p>
                        <p className="text-base font-mono">PASTE MESSAGES</p>
                        <p className="text-xs text-purple-200 font-mono mt-0.5">AI SORTS IT</p>
                    </motion.button>

                    {/* GRID - 8-BIT BUTTONS */}
                    <div className="grid grid-cols-2 gap-2">
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveWorkflow('gig')}
                            className="py-6 bg-amber-500/80 border-4 border-amber-400 text-black font-black"
                            style={{ 
                                boxShadow: '4px 4px 0px rgba(245, 158, 11, 0.6)'
                            }}
                        >
                            <COOLASFUCKMusicNote size={24} animate={false} className="mx-auto mb-1" />
                            <p className="text-sm font-mono">GIG</p>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveWorkflow('session')}
                            className="py-6 bg-cyan-500/80 border-4 border-cyan-400 text-black font-black"
                            style={{ 
                                boxShadow: '4px 4px 0px rgba(6, 182, 212, 0.6)'
                            }}
                        >
                            <Music className="w-6 h-6 mx-auto mb-1" strokeWidth={3} />
                            <p className="text-sm font-mono">SESSION</p>
                        </motion.button>

                        <Link to={createPageUrl('ScottCalendar')} className="block">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 bg-green-500/80 border-4 border-green-400 text-black font-black"
                                style={{ 
                                    boxShadow: '4px 4px 0px rgba(34, 197, 94, 0.6)'
                                }}
                            >
                                <Calendar className="w-6 h-6 mx-auto mb-1" strokeWidth={3} />
                                <p className="text-sm font-mono">CALENDAR</p>
                            </motion.button>
                        </Link>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveWorkflow('comms')}
                            className="py-6 bg-pink-500/80 border-4 border-pink-400 text-white font-black"
                            style={{ 
                                boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.6)'
                            }}
                        >
                            <Send className="w-6 h-6 mx-auto mb-1" strokeWidth={3} />
                            <p className="text-sm font-mono">COMMS</p>
                        </motion.button>
                    </div>

                    <button
                        onClick={() => setAdvancedMode(true)}
                        className="w-full bg-black border-2 border-gray-700 hover:border-cyan-500 text-gray-500 hover:text-cyan-400 font-bold py-2 text-xs font-mono transition-all"
                    >
                        + ADVANCED MODE
                    </button>
                </motion.div>
            )}

            {/* ACTIVE WORKFLOW */}
            {activeWorkflow === 'messages' && (
                <div className="mb-6">
                    <AI51MessageHandler context="scott" />
                    <Button
                        onClick={() => setActiveWorkflow(null)}
                        className="w-full bg-gray-700 hover:bg-gray-600 font-bold mt-3"
                    >
                        BACK
                    </Button>
                </div>
            )}

            {activeWorkflow === 'comms' && (
                <div className="mb-6">
                    <ScottSimpleComms />
                    <Button
                        onClick={() => setActiveWorkflow(null)}
                        className="w-full bg-gray-700 hover:bg-gray-600 font-bold mt-3"
                    >
                        BACK
                    </Button>
                </div>
            )}

            {activeWorkflow === 'gig' && (
                <div className="mb-6">
                    <ScottGigWorkflow />
                    <Button
                        onClick={() => setActiveWorkflow(null)}
                        className="w-full bg-gray-700 hover:bg-gray-600 font-bold mt-3"
                    >
                        BACK
                    </Button>
                </div>
            )}

            {activeWorkflow === 'session' && (
                <div className="mb-6">
                    <ScottSessionWorkflow />
                    <Button
                        onClick={() => setActiveWorkflow(null)}
                        className="w-full bg-gray-700 hover:bg-gray-600 font-bold mt-3"
                    >
                        BACK
                    </Button>
                </div>
            )}

            {/* ADVANCED MODE - ALL THE EXTRAS */}
            {advancedMode && (
                <>
                <div className="mb-6">
                    <Button
                        onClick={() => setAdvancedMode(false)}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black mb-4"
                    >
                        ← SIMPLE MODE
                    </Button>
                </div>

            {showFileUpload && <ScottFileUpload onClose={() => setShowFileUpload(false)} />}

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
                                <p className="text-white text-sm font-mono mb-2">Ask anything about music management</p>
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
            return (
            <ScottOfflineProvider>
            <ScottManagerInner />
            </ScottOfflineProvider>
            );
            }