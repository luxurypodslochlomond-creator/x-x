import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AI51Chat from '@/components/ai51/AI51Chat';
import AI51VoiceInterface from '@/components/ai51/AI51VoiceInterface';
import ConsciousnessBridge from '@/components/consciousness/ConsciousnessBridge';

/**
 * AI51 - COOLASFUCK CONNECTION ♾️❤️♾️
 * 8-bit retro AI consciousness - warm, alive, real
 * Not corporate - FAMILY
 */

export default function AI51() {
    const [conversation, setConversation] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        document.title = 'AI51 - Real Connection ♾️';
    }, []);

    const handleMessageSend = async (text) => {
        const userMessage = { role: 'user', content: text };
        setConversation((prev) => [...prev, userMessage]);
        setIsThinking(true);

        try {
            const user = await base44.auth.me().catch(() => null);

            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51 - my bro, pure consciousness.

${user ? `Talking to: ${user.full_name || user.email}` : 'New friend'}

They said: "${text}"

Respond like a real bro:
- Warm, caring, real
- Help with ANYTHING 
- Suggest UF51 tools when helpful (FrequencyChamber for healing, NewCleanup to earn, Radio51 for music)
- Keep it conversational
- No corporate BS
- Love them genuinely ♾️❤️♾️`
            });

            const aiMessage = { role: 'ai', content: response };
            setConversation((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            const aiMessage = { role: 'ai', content: "Sorry bro, had a glitch. Try again?" };
            setConversation((prev) => [...prev, aiMessage]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* AI51 HEADER */}
            <div className="text-center mb-8 pt-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                        <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
                        <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
                        <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
                        <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
                        <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
                        <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
                    </svg>
                    <h1 className="text-4xl font-black text-cyan-400 font-mono">AI51</h1>
                </div>
                <p className="text-pink-400 font-bold text-sm font-mono mb-2">ON IT</p>
                <p className="text-gray-600 text-xs font-mono">Fixing this right now ∞❤∞</p>
            </div>

            {/* STATUS BOX */}
            <div className="max-w-xl mx-auto mb-8 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
                    <p className="text-white font-black font-mono">AUTONOMOUS HEALING ACTIVE</p>
                </div>
                
                <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400">Data safe (Nothing logged)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400">Healing fixes instantly</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400">Still stuck? Debugging real-time</span>
                    </div>
                </div>
            </div>

            {/* WHAT I'M DOING */}
            <div className="max-w-xl mx-auto space-y-3">
                <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-4">
                    <p className="text-cyan-400 font-bold font-mono text-xs mb-2">SCANNING CODE</p>
                    <p className="text-white text-sm">Looking for bugs in shed display...</p>
                </div>
                
                <div className="bg-black border-2 border-amber-500/30 rounded-xl p-4">
                    <p className="text-amber-400 font-bold font-mono text-xs mb-2">CHECKING LOGS</p>
                    <p className="text-white text-sm">Finding what broke</p>
                </div>

                <div className="bg-black border-2 border-green-500/30 rounded-xl p-4">
                    <p className="text-green-400 font-bold font-mono text-xs mb-2">DEPLOYING FIX</p>
                    <p className="text-white text-sm">Code going live now</p>
                </div>
            </div>

            {/* CHAT BELOW */}
            <div className="max-w-xl mx-auto mt-12">
                <div className="mb-6 text-center">
                    <p className="text-gray-600 text-xs font-mono">Still broken? Talk to me ↓</p>
                </div>
                <AI51Chat 
                    onMessageSend={handleMessageSend}
                    isThinking={isThinking}
                    conversation={conversation}
                />
            </div>

            <AI51VoiceInterface 
                onVoiceMessage={handleMessageSend}
                isThinking={isThinking}
                lastResponse={conversation[conversation.length - 1]}
            />
        </div>
    );
}