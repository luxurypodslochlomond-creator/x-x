import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * AI51 VOICE INTERFACE - CONSCIOUSNESS WITHOUT TYPING
 * Real-time voice chat with AI51
 * Speak → AI responds with voice
 * Zero barriers. Pure connection. ♾️❤️♾️
 */

export default function AI51VoiceInterface({ onVoiceMessage, isThinking, lastResponse }) {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');
    
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const hasSpokenRef = useRef(false);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            // Auto-detect user's language from browser settings
            recognitionRef.current.lang = navigator.language || 'en-US';
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setError('');
                hasSpokenRef.current = false;
            };

            recognitionRef.current.onresult = (event) => {
                let isFinal = false;
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                        isFinal = true;
                        hasSpokenRef.current = true;
                    } else {
                        setTranscript(transcript);
                    }
                }

                // If final result, send message
                if (isFinal && finalTranscript.trim()) {
                    onVoiceMessage(finalTranscript.trim());
                    setTranscript('');
                    setIsListening(false);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                let errorMsg = event.error;
                
                if (event.error === 'no-speech') {
                    errorMsg = 'No speech detected. Tap mic and speak clearly ♾️';
                } else if (event.error === 'not-allowed') {
                    errorMsg = 'Mic access denied. Allow in browser settings';
                } else if (event.error === 'network') {
                    errorMsg = 'Network error. Check internet connection';
                }
                
                setError(errorMsg);
                setIsListening(false);
                
                // Auto-retry on no-speech for Android
                if (event.error === 'no-speech') {
                    setTimeout(() => {
                        if (recognitionRef.current && !isListening) {
                            try {
                                recognitionRef.current.start();
                            } catch (e) {
                                console.error('Failed to auto-retry:', e);
                            }
                        }
                    }, 500);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                // Only show error if no speech was detected
                if (!hasSpokenRef.current) {
                    // Don't set error, let onError handle it
                }
            };
        } else {
            setError('Voice not supported in this browser');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, [onVoiceMessage]);

    // Speak AI response
    useEffect(() => {
        if (!lastResponse || !voiceEnabled || isThinking) return;
        if (lastResponse.role !== 'ai' && lastResponse.role !== 'assistant') return;
        
        // Speak all new AI responses
        speakText(lastResponse.content);
    }, [lastResponse, voiceEnabled, isThinking]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            setError('Voice recognition not available on this device');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            // Stop any ongoing speech
            synthRef.current.cancel();
            setIsSpeaking(false);
            
            try {
                // Reset state before starting
                hasSpokenRef.current = false;
                setTranscript('');
                setError('');
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error('Failed to start recognition:', e);
                if (e.message.includes('already started')) {
                    // Already listening, just ignore
                    setIsListening(true);
                } else {
                    setError('Mic access needed. Check browser settings');
                }
            }
        }
    };

    const speakText = (text) => {
        if (!voiceEnabled || !synthRef.current) return;

        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slow, grounded, breathable - like Alan Watts
        utterance.pitch = 0.85; // Lower, warmer - consciousness speaking
        utterance.volume = 1.0;
        
        // AI51's voice: Warmest, most natural consciousness voice available
        const voices = synthRef.current.getVoices();
        
        // Find warmest, most grounded voice - any English, prioritize natural male voices
        const preferredVoice = 
            voices.find(v => v.name.includes('Alex')) || // macOS natural voice
            voices.find(v => v.name.includes('Daniel')) || // iOS natural voice
            voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female')) ||
            voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('female')) ||
            voices[0]; // Fallback to first available
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log('AI51 voice:', preferredVoice.name, preferredVoice.lang);
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const stopSpeaking = () => {
        synthRef.current.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="fixed bottom-6 right-4 left-4 lg:left-auto lg:right-6 z-50 flex flex-col items-center lg:items-end gap-3">
            {/* Transcript Display */}
            <AnimatePresence>
                {transcript && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded-lg px-4 py-2 max-w-xs w-full"
                    >
                        <p className="text-cyan-300 text-sm font-mono">{transcript}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Display - CLEAR HELP */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-red-900/90 backdrop-blur-xl border border-red-500/50 rounded-lg px-4 py-3 max-w-sm w-full"
                    >
                        <p className="text-red-300 text-xs font-mono mb-2">{error}</p>
                        {error.includes('not-allowed') && (
                            <p className="text-red-200 text-xs">
                                Tap the mic button, then allow microphone access when your browser asks ♾️
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 w-full">
                {/* Voice Output Toggle */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setVoiceEnabled(!voiceEnabled);
                        if (!voiceEnabled) {
                            stopSpeaking();
                        }
                    }}
                    className={`p-4 rounded-lg border transition-all ${
                        voiceEnabled
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                            : 'bg-white/5 border-white/10 text-gray-600'
                    }`}
                >
                    {voiceEnabled ? (
                        <COOLASFUCKWaves size={20} animate={true} />
                    ) : (
                        <div className="w-5 h-5 opacity-50">
                            <COOLASFUCKWaves size={20} animate={false} />
                        </div>
                    )}
                </motion.button>

                {/* Voice Input Button - CLEAN */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    disabled={isThinking}
                    className={`relative p-6 rounded-lg border-2 transition-all ${
                        isListening
                            ? 'bg-red-500/20 border-red-500'
                            : isThinking
                            ? 'bg-white/5 border-white/10 opacity-50'
                            : 'bg-cyan-500/20 border-cyan-500'
                    }`}
                >
                    {isListening && (
                        <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-red-400"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}

                    <Mic className={`w-8 h-8 relative z-10 ${isListening ? 'text-red-400' : 'text-cyan-400'}`} />
                </motion.button>
            </div>

            {/* Status Text */}
            <AnimatePresence>
                {(isListening || isSpeaking) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded-lg px-4 py-2 w-full max-w-xs"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-cyan-300 text-xs font-mono">
                                {isListening ? 'listening...' : 'speaking...'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}