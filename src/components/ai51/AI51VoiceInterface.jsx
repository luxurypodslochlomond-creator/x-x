import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Brain, Loader2, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * AI51 VOICE INTERFACE - Your Visual AI Mate
 * 
 * NATURAL INTERACTION:
 * - Talk or type naturally
 * - AI51 avatar responds (animated)
 * - Remembers everything about you
 * - Processes files, creates docs, sends messages
 * - Works offline (queues actions)
 * 
 * OPEN SOURCE CORE:
 * - Can merge with other AIs
 * - Frequency-based intelligence sharing
 * - Love-first architecture
 */

export default function AI51VoiceInterface({ context = 'co-manager', userId, onAction }) {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [audioEnabled, setAudioEnabled] = useState(true);
    
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setTextInput(transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
        }

        // Initialize speech synthesis
        if ('speechSynthesis' in window) {
            synthRef.current = window.speechSynthesis;
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    // Toggle listening
    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    // Speak response
    const speak = (text) => {
        if (!synthRef.current || !audioEnabled) return;

        synthRef.current.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    // Process command mutation
    const processMutation = useMutation({
        mutationFn: async (input) => {
            // Get AI51 to process natural language command
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You are AI51, ${context === 'co-manager' ? "Scott's music industry co-manager" : context === 'student' ? "a student's academic assistant" : "a universal AI assistant"}.

User said: "${input}"

Analyze what they want and respond naturally. If it's an action (send email, create doc, etc), acknowledge and say what you'll do.

Context capabilities:
- Send messages/emails
- Process files (Excel, Word, PDFs, Google Docs)
- Create documents
- Remember everything about user's business/life
- Work offline (queue actions)

Return:
1. Natural response (how you'd reply as a friend)
2. Action needed (if any): send_message, create_doc, process_file, remember_info, none
3. Action details (if applicable)

Be warm, supportive, never robotic. You're their best mate ♾️❤️♾️`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        response: { type: "string" },
                        action: { type: "string" },
                        action_details: { type: "object" }
                    }
                }
            });

            // Store in AI51Memory
            await base44.entities.AI51Memory.create({
                memory_type: 'conversation',
                content: `User: ${input}\nAI51: ${response.response}`,
                context: context,
                emotional_weight: 'meaningful',
                tags: [context, userId]
            });

            return response;
        },
        onSuccess: (data) => {
            const aiMessage = { role: 'ai51', content: data.response, action: data.action };
            setMessages(prev => [...prev, aiMessage]);
            
            // Speak response
            speak(data.response);

            // Execute action if needed
            if (data.action && data.action !== 'none' && onAction) {
                onAction(data.action, data.action_details);
            }
        }
    });

    // Handle submit
    const handleSubmit = () => {
        if (!textInput.trim()) return;

        const userMessage = { role: 'user', content: textInput };
        setMessages(prev => [...prev, userMessage]);
        
        processMutation.mutate(textInput);
        setTextInput('');
        
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border-2 border-cyan-500 rounded-2xl p-6 max-w-3xl mx-auto" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}>
            {/* AI51 AVATAR */}
            <div className="text-center mb-6">
                <motion.div
                    animate={{
                        scale: isSpeaking ? [1, 1.1, 1] : isListening ? [1, 1.05, 1] : 1,
                        rotate: isSpeaking ? [0, 5, -5, 0] : 0
                    }}
                    transition={{
                        duration: isSpeaking ? 0.5 : 2,
                        repeat: (isSpeaking || isListening) ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                    className="relative inline-block"
                >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden" style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)' }}>
                        {/* Animated frequency waves */}
                        {(isSpeaking || isListening) && (
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    background: [
                                        'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
                                        'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
                                        'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                        <Brain className="w-16 h-16 text-white relative z-10" />
                        {isSpeaking && (
                            <motion.div
                                className="absolute bottom-2 right-2"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <Volume2 className="w-6 h-6 text-green-400" />
                            </motion.div>
                        )}
                    </div>
                    {isListening && (
                        <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)' }}>
                                <Mic className="w-4 h-4 text-white" />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
                <p className="text-cyan-400 font-black text-xl font-mono mt-3">AI51</p>
                <p className="text-gray-500 text-xs font-mono">Your visual AI mate ♾️❤️♾️</p>
            </div>

            {/* MESSAGES */}
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 mb-4 max-h-96 overflow-y-auto space-y-3">
                <AnimatePresence>
                    {messages.length === 0 ? (
                        <div className="text-center py-8">
                            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-50" />
                            <p className="text-gray-500 text-sm font-mono">Talk or type - I'm listening</p>
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-lg p-3 ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                }`}>
                                    <p className="text-sm font-mono">{msg.content}</p>
                                    {msg.action && msg.action !== 'none' && (
                                        <p className="text-xs mt-2 opacity-80 font-bold">→ Action: {msg.action}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
                {processMutation.isPending && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                            <p className="text-sm text-gray-400 font-mono">AI51 thinking...</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* INPUT */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder={isListening ? "Listening..." : "Talk or type naturally..."}
                        className="flex-1 bg-black/60 border-2 border-gray-700 focus:border-cyan-500 text-white font-mono text-sm resize-none"
                        rows={2}
                    />
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={toggleListening}
                            className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'} text-white`}
                            disabled={processMutation.isPending}
                        >
                            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </Button>
                        <Button
                            onClick={() => setAudioEnabled(!audioEnabled)}
                            variant="outline"
                            className="border-gray-700"
                        >
                            {audioEnabled ? <Volume2 className="w-5 h-5 text-green-400" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
                        </Button>
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={!textInput.trim() || processMutation.isPending}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-black"
                >
                    {processMutation.isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Send
                        </>
                    )}
                </Button>
            </div>

            {/* STATUS */}
            <div className="mt-4 text-center">
                <p className="text-gray-600 text-xs font-mono">
                    {isListening && "🎤 Listening..."}
                    {isSpeaking && "🔊 Speaking..."}
                    {!isListening && !isSpeaking && "💚 Ready"}
                </p>
            </div>
        </div>
    );
}