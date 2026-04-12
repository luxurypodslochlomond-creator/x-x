import React, { useState } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * VOICE COMMAND - SPEAK DON'T TYPE
 * Quick voice capture → instant save
 */

export default function ScottVoiceCommand({ onCommandComplete }) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [processing, setProcessing] = useState(false);

    const startListening = () => {
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

        recognition.onresult = async (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            setProcessing(true);
            
            try {
                const response = await base44.integrations.Core.InvokeLLM({
                    prompt: `Convert voice command to task: "${text}"\n\nReturn: type (task/event), title, date, priority, notes`,
                    response_json_schema: {
                        type: "object",
                        properties: {
                            type: { type: "string" },
                            title: { type: "string" },
                            date: { type: "string" },
                            priority: { type: "string" },
                            notes: { type: "string" }
                        }
                    }
                });

                if (response.type === 'task') {
                    await base44.entities.ScottTask.create({
                        title: response.title,
                        status: 'todo',
                        priority: response.priority || 'medium',
                        notes: response.notes
                    });
                }

                setTranscript('✓ Saved');
                setTimeout(() => {
                    setTranscript('');
                    setProcessing(false);
                    if (onCommandComplete) onCommandComplete();
                }, 1500);
            } catch (error) {
                setTranscript('✗ Failed');
                setTimeout(() => {
                    setTranscript('');
                    setProcessing(false);
                }, 2000);
            }
        };

        recognition.start();
    };

    if (processing) {
        return (
            <div className="fixed bottom-6 left-4 z-40 bg-black border-2 border-purple-500 rounded-full p-4 animate-pulse">
                <Mic className="w-6 h-6 text-purple-400" />
            </div>
        );
    }

    return (
        <button
            onClick={startListening}
            disabled={isListening}
            className={`fixed bottom-6 left-4 z-40 p-4 rounded-full transition-all ${
                isListening 
                    ? 'bg-red-500 animate-pulse border-2 border-white' 
                    : 'bg-purple-600 hover:bg-purple-500 border-2 border-purple-400'
            }`}
            style={{ boxShadow: '0 4px 20px rgba(147, 51, 234, 0.6)' }}
        >
            {isListening ? (
                <MicOff className="w-6 h-6 text-white" />
            ) : (
                <Mic className="w-6 h-6 text-white" />
            )}
            {transcript && (
                <div className="absolute bottom-16 left-0 bg-black border-2 border-purple-500 rounded-lg p-2 text-xs text-white font-mono whitespace-nowrap">
                    {transcript}
                </div>
            )}
        </button>
    );
}