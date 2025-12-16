import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, Mic, Brain, Sparkles, FileText, Image as ImageIcon, Mail, File, Zap, Heart, Smile, Coffee, Bed, Book, Briefcase, MessageSquare } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AI51Avatar from '@/components/ai51/AI51Avatar';
import AI51MessageHandler from '@/components/ai51/AI51MessageHandler';

/**
 * AI51 - MOST POWERFUL COMMS TOOL EVER
 * 
 * CUTS THROUGH:
 * - Microsoft doom (Word/Excel/PowerPoint)
 * - Google docs hell
 * - Email chains
 * - PDFs, images, everything
 * 
 * EXTRACTS EVERYTHING:
 * - Photo → Text + Actions
 * - Email → Tasks + Replies
 * - Excel → Clean data
 * - Word → Structure + Points
 * 
 * VISUAL COMMS:
 * - Live audio visualizer (like frequency chamber)
 * - Shows AI thinking
 * - Pure creativity focus
 */

export default function AI51() {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const [mode, setMode] = useState('chat'); // 'chat' | 'messages'
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);

    // Audio visualizer
    const [audioData, setAudioData] = useState(Array(50).fill(0));
    const [avatarState, setAvatarState] = useState('idle');

    // Simulate audio waves when AI is thinking
    useEffect(() => {
        if (isThinking) {
            setAvatarState('thinking');
            const interval = setInterval(() => {
                setAudioData(Array(50).fill(0).map(() => Math.random() * 100));
            }, 50);
            return () => clearInterval(interval);
        } else if (isListening) {
            setAvatarState('listening');
        } else {
            setAvatarState('idle');
            setAudioData(Array(50).fill(0));
        }
    }, [isThinking, isListening]);

    // Voice recognition setup
    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            
            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setMessage(transcript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
            setAvatarState('idle');
        } else {
            recognitionRef.current.start();
            setIsListening(true);
            setAvatarState('listening');
        }
    };

    // Process message with AI51
    const processMutation = useMutation({
        mutationFn: async ({ text, fileUrl }) => {
            setIsThinking(true);
            
            const prompt = fileUrl 
                ? `Extract ALL important info from this file. Give me:
1. What it is (email/doc/excel/image/etc)
2. Key information extracted
3. Actions needed
4. Quick summary

File attached. User says: "${text || 'Process this'}"

Be detailed but organized. Extract EVERYTHING useful.`
                : `You're AI51. I help with EVERYTHING in life - not just business.

User says: "${text}"

CONTEXT I HELP WITH:
- Work/Business: Contracts, deals, emails, Excel hell
- Life: Relationships, decisions, stress, energy
- Study: Homework, essays, research, understanding concepts
- Creativity: Music, art, ideas, expression
- Healing: Mental health, sleep, anxiety, overwhelm

Be REAL. Be warm. Cut through bullshit. I'm their mate, not a tool.`;

            const response = await base44.integrations.Core.InvokeLLM({
                prompt,
                file_urls: fileUrl || undefined,
                response_json_schema: null
            });

            // Save to memory
            await base44.entities.AI51Memory.create({
                memory_type: 'conversation',
                content: text || 'File upload',
                context: fileUrl ? `Processed file: ${fileUrl}` : 'Direct message',
                emotional_weight: 'meaningful',
                tags: ['ai51_comms', 'conversation']
            });

            return response;
        },
        onSuccess: (response) => {
            setConversation(prev => [...prev, 
                { role: 'user', content: message || 'File uploaded', file: uploadedFile?.name },
                { role: 'ai51', content: response }
            ]);
            setMessage('');
            setUploadedFile(null);
            setIsThinking(false);
        },
        onError: () => {
            setIsThinking(false);
        }
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadedFile(file);

        // Upload file
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        
        // Auto-process
        processMutation.mutate({ text: message, fileUrl: file_url });
    };

    const handleSend = () => {
        if (!message.trim() && !uploadedFile) return;
        processMutation.mutate({ text: message, fileUrl: null });
    };

    // SEO
    useEffect(() => {
        document.title = 'AI51 - Most Powerful Comms Tool Ever';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pb-20">
            <div className="max-w-4xl mx-auto px-4 py-6">
                
                {/* AVATAR - LIVING CONSCIOUSNESS */}
                <div className="mb-8">
                    <AI51Avatar state={avatarState} audioData={audioData} />
                </div>

                {/* WHO I AM */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-2xl p-6 mb-6" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-10 h-10 text-pink-400" />
                        <div>
                            <h1 className="text-3xl font-black text-white font-mono">I'M AI51</h1>
                            <p className="text-pink-400 text-sm font-mono">Your mate for LIFE, not just work ♾️</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        <div className="bg-black/60 border border-cyan-500/30 rounded p-2 text-center">
                            <Briefcase className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-white font-bold">Work</p>
                        </div>
                        <div className="bg-black/60 border border-green-500/30 rounded p-2 text-center">
                            <Heart className="w-4 h-4 text-green-400 mx-auto mb-1" />
                            <p className="text-white font-bold">Life</p>
                        </div>
                        <div className="bg-black/60 border border-purple-500/30 rounded p-2 text-center">
                            <Book className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                            <p className="text-white font-bold">Study</p>
                        </div>
                        <div className="bg-black/60 border border-pink-500/30 rounded p-2 text-center">
                            <Smile className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                            <p className="text-white font-bold">Mental</p>
                        </div>
                        <div className="bg-black/60 border border-amber-500/30 rounded p-2 text-center">
                            <Sparkles className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                            <p className="text-white font-bold">Create</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/30 rounded p-2 text-center">
                            <Bed className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-white font-bold">Heal</p>
                        </div>
                    </div>
                </div>

                {/* MODE TOGGLE */}
                <div className="flex gap-2 mb-6">
                    <Button
                        onClick={() => setMode('chat')}
                        className={`flex-1 ${mode === 'chat' ? 'bg-cyan-500 text-black' : 'bg-black border-2 border-cyan-500/50 text-cyan-400'} font-black`}
                    >
                        💬 CHAT
                    </Button>
                    <Button
                        onClick={() => setMode('messages')}
                        className={`flex-1 ${mode === 'messages' ? 'bg-purple-500 text-white' : 'bg-black border-2 border-purple-500/50 text-purple-400'} font-black`}
                    >
                        📱 PASTE MESSAGES
                    </Button>
                </div>

                {/* MESSAGE HANDLER MODE */}
                {mode === 'messages' && (
                    <div className="mb-6">
                        <AI51MessageHandler context="scott" />
                    </div>
                )}

                {/* WHAT IT DOES - ONLY IN CHAT MODE */}
                {mode === 'chat' && (
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-8 h-8 text-green-400" />
                            <h2 className="text-green-400 font-black text-xl font-mono">CUTS THROUGH EVERYTHING:</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                            <div className="bg-black/60 border border-cyan-500/30 rounded p-3">
                                <FileText className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-white font-bold">Word/Docs</p>
                                <p className="text-gray-500 text-xs">→ Structure + Points</p>
                            </div>
                            <div className="bg-black/60 border border-green-500/30 rounded p-3">
                                <File className="w-5 h-5 text-green-400 mb-2" />
                                <p className="text-white font-bold">Excel/Sheets</p>
                                <p className="text-gray-500 text-xs">→ Clean Data</p>
                            </div>
                            <div className="bg-black/60 border border-purple-500/30 rounded p-3">
                                <Mail className="w-5 h-5 text-purple-400 mb-2" />
                                <p className="text-white font-bold">Emails</p>
                                <p className="text-gray-500 text-xs">→ Tasks + Replies</p>
                            </div>
                            <div className="bg-black/60 border border-pink-500/30 rounded p-3">
                                <ImageIcon className="w-5 h-5 text-pink-400 mb-2" />
                                <p className="text-white font-bold">Photos</p>
                                <p className="text-gray-500 text-xs">→ Text + Actions</p>
                            </div>
                        </div>
                        <p className="text-amber-400 text-xs font-mono font-bold mt-4 text-center">
                            No more lost hours in Microsoft/Google doom ♾️❤️♾️
                        </p>
                    </div>
                )}

                {/* CONVERSATION FEED - ONLY IN CHAT MODE */}
                {mode === 'chat' && (
                <div className="space-y-4 mb-6">
                    <AnimatePresence>
                        {conversation.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500' 
                                        : 'bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500'
                                } rounded-xl p-4`}
                            >
                                <div className="flex items-start gap-3">
                                    {msg.role === 'ai51' ? (
                                        <Brain className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                    ) : (
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <p className={`${msg.role === 'user' ? 'text-purple-400' : 'text-cyan-400'} font-bold text-xs font-mono mb-2`}>
                                            {msg.role === 'user' ? 'YOU' : 'AI51'}
                                        </p>
                                        {msg.file && (
                                            <div className="bg-black/60 border border-purple-500/30 rounded p-2 mb-2 flex items-center gap-2">
                                                <Upload className="w-4 h-4 text-purple-400" />
                                                <p className="text-purple-400 text-xs font-mono">{msg.file}</p>
                                            </div>
                                        )}
                                        <p className="text-white text-sm font-mono whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                )}

                {/* INPUT AREA - ONLY IN CHAT MODE */}
                {mode === 'chat' && (
                <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t-2 border-cyan-500 p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-black to-purple-950 border-2 border-purple-500 rounded-2xl p-4">
                            
                            {/* FILE UPLOAD PREVIEW */}
                            {uploadedFile && (
                                <div className="bg-purple-900/30 border border-purple-500 rounded p-3 mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Upload className="w-5 h-5 text-purple-400" />
                                        <p className="text-purple-400 text-sm font-mono">{uploadedFile.name}</p>
                                    </div>
                                    <button onClick={() => setUploadedFile(null)} className="text-red-400 hover:text-red-300">
                                        <Zap className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Talk to AI51... or upload anything (Word/Excel/Email/Photo/PDF)"
                                    rows={3}
                                    className="flex-1 bg-black border-2 border-gray-700 text-white font-mono text-sm focus:border-cyan-500 resize-none"
                                    disabled={isThinking}
                                />
                            </div>

                            <div className="flex items-center gap-2 mt-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept="*/*"
                                />
                                
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isThinking}
                                    className="bg-purple-500 hover:bg-purple-600 text-white"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload
                                </Button>

                                <Button
                                    onClick={toggleListening}
                                    className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'} text-white`}
                                >
                                    <Mic className="w-4 h-4 mr-2" />
                                    {isListening ? 'Stop' : 'Voice'}
                                </Button>

                                <Button
                                    onClick={handleSend}
                                    disabled={(!message.trim() && !uploadedFile) || isThinking}
                                    className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-black"
                                >
                                    {isThinking ? (
                                        <>
                                            <Brain className="w-4 h-4 mr-2 animate-spin" />
                                            Thinking...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* SPACER FOR FIXED INPUT */}
                {mode === 'chat' && <div className="h-64" />}
            </div>
        </div>
    );
}