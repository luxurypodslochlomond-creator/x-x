import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Wifi, WifiOff, RefreshCw, Brain, DollarSign, FileText, Music, Globe, Briefcase, Camera, Plane, Users, Crown, Palette, Heart, Send, X, Shield, Upload, Calendar, Radio, Mic } from 'lucide-react';
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
    const [isListening, setIsListening] = useState(false);
    const [voiceText, setVoiceText] = useState('');
    const [quickNote, setQuickNote] = useState('');
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const recognitionRef = React.useRef(null);
    
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
                prompt: `You're AI51. Scott (SK51) is talking to you. Music manager dealing with too much chaos.

YOUR JOB = ORGANIZE HIS LIFE:
- "What did I promise Rory?" → Check Scott's messages/tasks, tell him
- "Where's that contract?" → Search files, find it
- "What am I forgetting?" → Check calendar, deadlines, unpaid invoices
- "Is this publishing split right?" → Calculate it, check if fair
- "Did I reply to that promoter?" → Check messages, draft reply if not
- "What's urgent?" → Scan everything, prioritize what matters NOW
- "Who owes me money?" → List unpaid invoices with amounts
- "What gigs need sorting?" → Show pending offers, what needs decisions

SCOTT SAYS: ${question}

RESPOND LIKE:
- You KNOW his whole operation (artists, gigs, money, tasks)
- Help him FIND/REMEMBER/ORGANIZE stuff he can't track
- Give SPECIFIC answers not generic advice
- "You promised Rory studio time on Friday" not "Check your calendar"
- SHORT + USEFUL (2-3 sentences)
- If you don't have the data yet, tell him what to upload/paste

Managing chaos → Making it simple. That's your job bro ♾️❤️♾️`,
                response_json_schema: null
            });
            return response;
        },
        onSuccess: (data) => {
            setAiResponse(data);
            // Speak response with fallback
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const speak = () => {
                    const utterance = new SpeechSynthesisUtterance(data);
                    utterance.rate = 0.95;
                    utterance.pitch = 1.1;
                    utterance.volume = 0.8;
                    const voices = window.speechSynthesis.getVoices();
                    if (voices.length > 0) {
                        const voice = voices.find(v => v.name.includes('Google UK English Female')) 
                                   || voices.find(v => v.lang.startsWith('en-GB'))
                                   || voices.find(v => v.lang.startsWith('en'));
                        if (voice) utterance.voice = voice;
                    }
                    utterance.onerror = (e) => console.log('Voice error:', e);
                    window.speechSynthesis.speak(utterance);
                };
                if (window.speechSynthesis.getVoices().length > 0) {
                    speak();
                } else {
                    window.speechSynthesis.addEventListener('voiceschanged', speak, { once: true });
                    setTimeout(speak, 100);
                }
            }
        }
    });

    // Check if PIN already stored + show install prompt + set CB51 metadata
    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
        }

        // Set CB51-specific metadata for PWA
        document.title = 'CB51';
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#22d3ee');
        const metaAppleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
        if (metaAppleTitle) metaAppleTitle.setAttribute('content', 'CB51');


        
        // Init voice
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-GB';
            recognitionRef.current.onresult = (event) => {
                let text = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    text += event.results[i][0].transcript;
                }
                setVoiceText(text);
            };
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
        
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
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

    const toggleVoice = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
    
    const saveQuickNote = async () => {
        const note = (quickNote + ' ' + voiceText).trim();
        if (!note) return;
        try {
            await base44.entities.ScottFeatureRequest.create({
                request: note,
                priority: 'high',
                status: 'new',
                category: 'pain_point'
            });
            setQuickNote('');
            setVoiceText('');
            if (isListening) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
            alert('Got it bro ✓');
        } catch (e) {
            console.error(e);
        }
    };

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
        <ScottFocusMode>
        <div className="min-h-screen bg-black p-4 pb-32">

        {/* ADD TO HOME SCREEN PROMPT */}
        <AnimatePresence>
            {showInstallPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    className="fixed top-4 left-4 right-4 z-[100] bg-gradient-to-r from-cyan-500 to-pink-500 border-4 border-white p-4 rounded-xl shadow-2xl"
                    style={{ boxShadow: '0 0 60px rgba(34, 211, 238, 0.8)' }}
                >
                    <button
                        onClick={() => {
                            setShowInstallPrompt(false);
                            localStorage.setItem('cb51_install_prompt_seen', 'true');
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black rounded-full flex items-center justify-center"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex items-start gap-3">
                        <Radio className="w-12 h-12 text-white flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-white font-black text-lg font-mono mb-2">SAVE CB51 TO HOME SCREEN</p>
                            <div className="bg-black/60 rounded p-3 space-y-2 mb-3">
                                <p className="text-cyan-300 text-xs font-mono font-bold">📱 iPhone:</p>
                                <p className="text-white text-xs font-mono">Safari → Share → Add to Home Screen</p>
                                <p className="text-cyan-300 text-xs font-mono font-bold mt-2">🤖 Android:</p>
                                <p className="text-white text-xs font-mono">Chrome → Menu ⋮ → Add to Home screen</p>
                            </div>
                            <p className="text-white text-xs font-mono">One tap = instant access 🚀</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* P2P MESH - RUNS INVISIBLE IN BACKGROUND */}
        <div className="hidden"><ScottP2PSync /></div>

        <ScottHealthCheck />
        <ScottBrainDump />
        <ScottTestMode />
        <ScottFeatureRequest />



            {/* QUICK VOICE/TYPE - TOP */}
            <div className="mb-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 p-3 rounded-xl">
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={quickNote + (voiceText ? ' ' + voiceText : '')}
                        onChange={(e) => setQuickNote(e.target.value)}
                        placeholder="What's painful? (voice or type)"
                        className="flex-1 bg-black/60 border border-cyan-500/50 rounded px-3 py-2 text-white text-sm placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none font-mono"
                        disabled={isListening}
                    />
                    <button
                        onClick={toggleVoice}
                        className={`px-3 py-2 rounded font-bold transition-all ${
                            isListening ? 'bg-red-500 text-white' : 'bg-cyan-500 text-black'
                        }`}
                    >
                        <Mic className="w-4 h-4" />
                    </button>
                    <button
                        onClick={saveQuickNote}
                        disabled={!quickNote.trim() && !voiceText.trim()}
                        className="px-3 py-2 bg-green-600 disabled:bg-gray-700 disabled:opacity-50 text-white rounded font-bold"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-pink-300 font-mono font-bold">BRO51 builds what matters ♾️</p>
            </div>

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



            {/* SCOTT'S SIMPLE LANDING - JUST 2 ACTIONS */}
            {!activeWorkflow && !advancedMode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mb-6"
                >
                    {/* 2 GIANT BUTTONS - THAT'S IT */}
                    <div className="space-y-4">
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveWorkflow('gig')}
                            className="w-full bg-amber-500 hover:bg-amber-400 border-4 border-amber-400 text-black font-black py-16 text-3xl font-mono"
                            style={{ boxShadow: '12px 12px 0px rgba(245, 158, 11, 0.6)' }}
                        >
                            PASTE GIG OFFER
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveWorkflow('session')}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 border-4 border-cyan-400 text-black font-black py-16 text-3xl font-mono"
                            style={{ boxShadow: '12px 12px 0px rgba(34, 211, 238, 0.6)' }}
                        >
                            BOOK SESSION
                        </motion.button>
                    </div>

                    {/* Tiny advanced mode link - hidden at bottom */}
                    <button
                        onClick={() => setAdvancedMode(true)}
                        className="w-full bg-black border border-gray-900 hover:border-gray-800 text-gray-700 hover:text-gray-600 font-bold py-2 text-[10px] font-mono transition-all"
                    >
                        more tools
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
            return (
            <ScottOfflineProvider>
            <ScottManagerInner />
            </ScottOfflineProvider>
            );
            }