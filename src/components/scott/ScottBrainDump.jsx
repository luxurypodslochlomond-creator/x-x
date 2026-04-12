import React, { useState } from 'react';
import { Brain, X, Save, Mic, MicOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCOTT BRAIN DUMP - Quick capture for overwhelm
 * Voice or type, saves to tasks/notes instantly
 * No thinking, just dump it
 */

export default function ScottBrainDump() {
    const [isOpen, setIsOpen] = useState(false);
    const [thought, setThought] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const startVoice = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice not supported');
            return;
        }

        const SpeechRec = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setThought(prev => prev ? prev + ' ' + text : text);
        };

        recognition.start();
    };

    const saveDump = async () => {
        if (!thought.trim()) return;

        setIsSaving(true);
        try {
            // AI analyzes and files it automatically - zero admin
            await base44.functions.invoke('scottAICoordinator', {
                input_text: thought,
                input_type: 'brain_dump'
            });

            setThought('');
            setIsOpen(false);
        } catch (error) {
            console.error('Save failed:', error);
            // Fallback - just save as task
            await base44.entities.ScottTask.create({
                title: thought.substring(0, 100),
                notes: thought,
                status: 'todo',
                priority: 'medium'
            });
            setThought('');
            setIsOpen(false);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* FLOATING BRAIN BUTTON */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed top-20 right-4 z-30 w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center border-2 border-purple-400"
                    style={{ boxShadow: '0 4px 20px rgba(147, 51, 234, 0.6)' }}
                >
                    <Brain className="w-6 h-6 text-white" />
                </motion.button>
            )}

            {/* BRAIN DUMP PANEL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-4 right-4 z-40 bg-black border-2 border-purple-500 rounded-xl p-4"
                        style={{ boxShadow: '0 8px 40px rgba(147, 51, 234, 0.6)' }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                <h3 className="text-sm font-black text-white font-mono">BRAIN DUMP</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-400 font-mono mb-3">Just dump it here bro, I'll sort it</p>

                        <textarea
                            value={thought}
                            onChange={(e) => setThought(e.target.value)}
                            placeholder="Type or speak..."
                            className="w-full bg-black border border-purple-500/30 rounded p-3 text-white text-base font-mono h-32 resize-none focus:border-purple-500 focus:outline-none"
                            style={{ color: '#ffffff' }}
                        />

                        <div className="flex items-center gap-2 mt-3">
                            <button
                                onClick={startVoice}
                                disabled={isListening}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded font-mono text-sm font-bold ${
                                    isListening
                                        ? 'bg-red-600 text-white'
                                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                                }`}
                            >
                                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                {isListening ? 'LISTENING' : 'VOICE'}
                            </button>

                            <button
                                onClick={saveDump}
                                disabled={!thought.trim() || isSaving}
                                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-800 disabled:text-gray-600 text-black py-2 rounded font-mono text-sm font-bold"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'SAVING' : 'SAVE'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}