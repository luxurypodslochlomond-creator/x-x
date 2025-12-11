import React, { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * ONE-SENTENCE COMMAND MODE
 * "Dave confirmed Friday" → Event created, Dave notified, done
 * "Remind me call Sophie about PA" → Task created
 * "Yes and Maybe need visas by Jan 15" → Task + deadline
 * ADHD MAGIC - NO FORMS, JUST TALK
 */

export default function ScottOneSentence({ onCommandComplete }) {
    const [command, setCommand] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);

    const processCommand = async () => {
        if (!command.trim()) return;

        setIsProcessing(true);
        setResult(null);
        try {
            // AI interprets command
            const response = await base44.functions.invoke('scottAICoordinator', {
                input_text: command,
                input_type: 'text'
            });

            setResult(response);
            setCommand('');
            
            // Reload after short delay
            setTimeout(() => {
                if (onCommandComplete) onCommandComplete();
            }, 1500);
        } catch (error) {
            console.error('Command error:', error);
            setResult({ error: true, message: error.message || 'Something went wrong' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            processCommand();
        }
    };

    return (
        <div className="bg-black border-4 border-cyan-500 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-cyan-400 font-black font-mono text-sm">ONE-SENTENCE MODE</h3>
            </div>

            <p className="text-gray-400 text-xs font-mono mb-3">
                Just type what you need. AI handles the rest.
            </p>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Dave confirmed Friday gig..."
                    className="flex-1 bg-black border-2 border-cyan-500/50 text-white px-3 py-2 font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    disabled={isProcessing}
                />
                <button
                    onClick={processCommand}
                    disabled={isProcessing || !command.trim()}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 text-white font-mono text-sm"
                >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'GO'}
                </button>
            </div>

            {result && !result.error && (
                <div className="mt-3 bg-green-900/20 border-2 border-green-500 p-3">
                    <p className="text-green-400 font-mono text-sm mb-2">✓ DONE</p>
                    <div className="space-y-1">
                        {result.created?.map((item, i) => (
                            <p key={i} className="text-gray-300 text-xs">
                                • {item.type.replace(/_/g, ' ').toUpperCase()}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {result && result.error && (
                <div className="mt-3 bg-red-900/20 border-2 border-red-500 p-3">
                    <p className="text-red-400 font-mono text-xs">Error: {result.message}</p>
                </div>
            )}

            {/* EXAMPLES */}
            <div className="mt-3 space-y-1">
                <p className="text-gray-500 text-xs font-mono">Examples:</p>
                <button
                    onClick={() => setCommand("Dave confirmed Friday at Barras")}
                    className="block text-left text-xs text-cyan-400 hover:text-cyan-300"
                >
                    • "Dave confirmed Friday at Barras"
                </button>
                <button
                    onClick={() => setCommand("Remind me call Sophie about PA system")}
                    className="block text-left text-xs text-cyan-400 hover:text-cyan-300"
                >
                    • "Remind me call Sophie about PA system"
                </button>
                <button
                    onClick={() => setCommand("Yes and Maybe need LA visas by Jan 15")}
                    className="block text-left text-xs text-cyan-400 hover:text-cyan-300"
                >
                    • "Yes and Maybe need LA visas by Jan 15"
                </button>
            </div>
        </div>
    );
}