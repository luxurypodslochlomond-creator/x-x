import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ScottGentleReward from './ScottGentleReward';

/**
 * VOICE COMMAND - SPEAK DON'T TYPE
 * ADHD brain → instant capture
 */

export default function ScottVoiceCommand({ onCommandComplete }) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [showReward, setShowReward] = useState(false);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice not supported in this browser');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = async (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            
            // Send to AI for processing
            try {
                const response = await base44.integrations.Core.InvokeLLM({
                    prompt: `Convert this voice command into a task or event for artist management: "${text}"\n\nReturn JSON with: type (task/event), title, date (if mentioned), priority, notes`,
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

                setTranscript('✓ Created');
                setShowReward(true);
                setTimeout(() => {
                    if (onCommandComplete) onCommandComplete();
                }, 2000);
            } catch (error) {
                console.error('Voice command error:', error);
            }
        };

        recognition.start();
    };

    return (
        <>
        <ScottGentleReward onComplete={showReward} />
        <button
            onClick={startListening}
            disabled={isListening}
            className={`fixed bottom-6 left-4 z-40 p-4 rounded-full shadow-2xl transition-all border-4 border-black ${
                isListening 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-110'
            }`}
        >
            {isListening ? (
                <MicOff className="w-6 h-6 text-white" />
            ) : (
                <Mic className="w-6 h-6 text-white" />
            )}
            {transcript && (
                <div className="absolute bottom-16 left-0 bg-black border border-purple-500 p-2 text-xs text-white font-mono whitespace-nowrap">
                    {transcript}
                </div>
            )}
        </button>
        </>
    );
}