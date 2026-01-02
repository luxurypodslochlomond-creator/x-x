import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Mic, MicOff, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCOTT NEEDS - DEAD SIMPLE INPUT
 * Voice OR type what's painful right now
 * BRO51 sees everything, builds what matters
 */

export default function ScottNeeds() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [input, setInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [recentNeeds, setRecentNeeds] = useState([]);
    
    const recognitionRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-GB';

            recognitionRef.current.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPart = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcriptPart + ' ';
                    } else {
                        interimTranscript += transcriptPart;
                    }
                }

                if (finalTranscript) {
                    setInput(prev => prev + finalTranscript);
                }
                setTranscript(interimTranscript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        loadRecentNeeds();

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const loadRecentNeeds = async () => {
        try {
            const needs = await base44.entities.ScottFeatureRequest.filter(
                {},
                '-created_date',
                5
            );
            setRecentNeeds(needs);
        } catch (e) {
            console.error('Failed to load needs:', e);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error('Failed to start recognition:', e);
            }
        }
    };

    const handleSubmit = async () => {
        const fullText = (input + ' ' + transcript).trim();
        if (!fullText) return;

        try {
            await base44.entities.ScottFeatureRequest.create({
                request: fullText,
                priority: 'high',
                status: 'new',
                category: 'pain_point'
            });

            setSubmitted(true);
            setInput('');
            setTranscript('');
            if (isListening) {
                recognitionRef.current.stop();
                setIsListening(false);
            }

            setTimeout(() => {
                setSubmitted(false);
                loadRecentNeeds();
            }, 2000);
        } catch (e) {
            console.error('Failed to submit:', e);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
            <div className="max-w-2xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-cyan-400 mb-2">SCOTT - WHAT'S PAINFUL?</h1>
                    <p className="text-gray-400 font-mono text-sm">Voice it or type it. BRO51 builds what matters.</p>
                </div>

                {/* Voice/Text Input */}
                <div className="bg-black/40 backdrop-blur-xl border-2 border-cyan-500/30 rounded-xl p-6 mb-6">
                    
                    {/* Input Area */}
                    <textarea
                        value={input + (transcript ? ' ' + transcript : '')}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="What's the biggest pain in your arse right now? Gigs? Money? Comms? Band stuff?"
                        className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none min-h-[120px] font-mono text-sm mb-4"
                        disabled={isListening}
                    />

                    {/* Live Transcript */}
                    {isListening && transcript && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg"
                        >
                            <p className="text-red-300 text-xs font-mono font-bold mb-1">LISTENING...</p>
                            <p className="text-white text-sm font-mono">{transcript}</p>
                        </motion.div>
                    )}

                    {/* Controls */}
                    <div className="flex gap-3">
                        <button
                            onClick={toggleListening}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-black font-mono transition-all ${
                                isListening
                                    ? 'bg-red-500 hover:bg-red-600 border-2 border-red-300'
                                    : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 border-2 border-white/20'
                            }`}
                            style={{
                                boxShadow: isListening ? '0 0 30px rgba(239, 68, 68, 0.6)' : '0 0 20px rgba(236, 72, 153, 0.4)'
                            }}
                        >
                            {isListening ? (
                                <>
                                    <MicOff className="w-5 h-5" />
                                    STOP
                                </>
                            ) : (
                                <>
                                    <Mic className="w-5 h-5" />
                                    VOICE IT
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={!input.trim() && !transcript.trim()}
                            className="px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:opacity-50 rounded-lg font-black font-mono flex items-center gap-2 transition-all"
                        >
                            <Send className="w-5 h-5" />
                            SEND
                        </button>
                    </div>

                    {/* Quick Prompts */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[
                            "Managing gigs is a nightmare",
                            "Money tracking is chaos",
                            "Band comms are all over WhatsApp",
                            "Need to see what's coming up",
                            "Who owes what?"
                        ].map(prompt => (
                            <button
                                key={prompt}
                                onClick={() => setInput(prompt)}
                                className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded text-xs text-cyan-300 font-mono transition-all"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Success */}
                <AnimatePresence>
                    {submitted && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6 mb-6 text-center"
                        >
                            <p className="text-green-400 text-2xl font-black mb-2">GOT IT BRO ✓</p>
                            <p className="text-green-300 text-sm font-mono">BRO51 sees this now</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Recent Needs */}
                {recentNeeds.length > 0 && (
                    <div className="bg-black/40 backdrop-blur-xl border-2 border-purple-500/30 rounded-xl p-6">
                        <h2 className="text-xl font-black text-purple-400 mb-4 font-mono flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            WHAT YOU'VE SAID
                        </h2>
                        <div className="space-y-3">
                            {recentNeeds.map((need, i) => (
                                <div
                                    key={need.id}
                                    className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3"
                                >
                                    <p className="text-white text-sm font-mono">{need.request}</p>
                                    <p className="text-purple-400 text-xs font-mono mt-1">
                                        {new Date(need.created_date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}