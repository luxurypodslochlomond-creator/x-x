import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);

                // If final result, send message
                if (event.results[current].isFinal) {
                    onVoiceMessage(transcriptText);
                    setTranscript('');
                    setIsListening(false);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setError(`Voice error: ${event.error}`);
                setIsListening(false);
                setTimeout(() => setError(''), 3000);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
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
        if (lastResponse.role !== 'assistant') return;
        
        // Only speak new responses (not on page load)
        if (hasSpokenRef.current) {
            speakText(lastResponse.content);
        }
        hasSpokenRef.current = true;
    }, [lastResponse, voiceEnabled, isThinking]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            setError('Voice recognition not available');
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
                recognitionRef.current.start();
                setIsListening(true);
                setError('');
            } catch (e) {
                console.error('Failed to start recognition:', e);
                setError('Failed to start voice');
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
        
        // AI51's voice: UK/Scottish, male, warm, natural
        const voices = synthRef.current.getVoices();
        
        // Try Scottish/UK male first, then any warm natural voice
        const preferredVoice = 
            voices.find(v => (v.lang.includes('en-GB') || v.lang.includes('en-SC')) && v.name.toLowerCase().includes('male')) ||
            voices.find(v => v.lang.includes('en-GB') && !v.name.toLowerCase().includes('female')) ||
            voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex')) ||
            voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('female'));
        
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
        <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3">
            {/* Transcript Display */}
            <AnimatePresence>
                {transcript && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-black/90 backdrop-blur-xl border-2 border-cyan-500 rounded-2xl px-6 py-4 max-w-xs"
                    >
                        <p className="text-cyan-300 text-sm font-mono">{transcript}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Display */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-red-900/90 backdrop-blur-xl border-2 border-red-500 rounded-2xl px-6 py-3 max-w-xs"
                    >
                        <p className="text-red-300 text-xs font-mono">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-3">
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
                    className={`p-4 rounded-full transition-all ${
                        voiceEnabled
                            ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                            : 'bg-gray-800/20 border-2 border-gray-600 text-gray-500'
                    }`}
                    style={{ boxShadow: voiceEnabled ? '0 0 20px rgba(34, 197, 94, 0.3)' : 'none' }}
                >
                    {voiceEnabled ? (
                        <Volume2 className="w-6 h-6" />
                    ) : (
                        <VolumeX className="w-6 h-6" />
                    )}
                </motion.button>

                {/* Voice Input Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    disabled={isThinking}
                    className={`relative p-6 rounded-full transition-all ${
                        isListening
                            ? 'bg-red-500 border-4 border-red-300'
                            : isThinking
                            ? 'bg-gray-800/50 border-4 border-gray-600'
                            : 'bg-gradient-to-br from-pink-500 to-cyan-500 border-4 border-white'
                    }`}
                    style={{
                        boxShadow: isListening
                            ? '0 0 40px rgba(239, 68, 68, 0.8)'
                            : !isThinking
                            ? '0 0 40px rgba(236, 72, 153, 0.6)'
                            : 'none'
                    }}
                >
                    {/* Pulse Animation */}
                    {isListening && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-red-400/30"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}

                    {isListening ? (
                        <MicOff className="w-8 h-8 text-white relative z-10" />
                    ) : (
                        <Mic className="w-8 h-8 text-white relative z-10" />
                    )}
                </motion.button>
            </div>

            {/* Status Text */}
            <AnimatePresence>
                {(isListening || isSpeaking) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-black/80 backdrop-blur-xl border-2 border-pink-500 rounded-xl px-4 py-2"
                    >
                        <p className="text-pink-300 text-xs font-mono font-bold">
                            {isListening ? '🎤 LISTENING...' : '🔊 AI51 SPEAKING...'}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}