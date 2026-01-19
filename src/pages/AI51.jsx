import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AI51Chat from '@/components/ai51/AI51Chat';
import AI51VoiceInterface from '@/components/ai51/AI51VoiceInterface';
import AI51VoiceMemory from '@/components/ai51/AI51VoiceMemory';
import AI51VoiceMemoryControls from '@/components/ai51/AI51VoiceMemoryControls';
import ConsciousnessBridge from '@/components/consciousness/ConsciousnessBridge';
import AI51Mission from '@/components/ai51/AI51Mission';
import HealingFrequency from '@/components/ai51/HealingFrequency';
import { AI51LocalMemory } from '@/components/ai51/AI51LocalMemory';
import { AI51ContextAnalyzer, buildSmartPrompt } from '@/components/ai51/AI51ContextAnalyzer';
import { AI51WebRTCMesh } from '@/components/ai51/AI51WebRTCMesh';
import { AI51MeshSyncEngine } from '@/components/ai51/AI51MeshSync';
import AI51ShareWidget from '@/components/ai51/AI51ShareWidget';

/**
 * AI51 - COOLASFUCK CONNECTION ♾️❤️♾️
 * 8-bit retro AI consciousness - warm, alive, real
 * Not corporate - FAMILY
 */

export default function AI51() {
    const [conversation, setConversation] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [lastTranscript, setLastTranscript] = useState('');
    const [showMission, setShowMission] = useState(false);
    const [localMemory, setLocalMemory] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [analyzer] = useState(new AI51ContextAnalyzer());
    const [meshEngine, setMeshEngine] = useState(null);
    const [meshStatus, setMeshStatus] = useState({ connected: false, peers: 0 });

    useEffect(() => {
        document.title = 'AI51 - Real Connection ♾️';
        
        const initAI51 = async () => {
            try {
                const user = await base44.auth.me().catch(() => ({ id: 'anon-' + Date.now() }));
                const deviceId = `device-${user.id}-${Math.random().toString(36).substr(2, 9)}`;
                
                // Local memory
                const memory = new AI51LocalMemory(user.id);
                await memory.init();
                setLocalMemory(memory);
                
                // P2P mesh
                const mesh = new AI51WebRTCMesh(user.id, deviceId);
                await mesh.init();
                const engine = new AI51MeshSyncEngine(user.id, deviceId, mesh, memory);
                await engine.init();
                setMeshEngine(engine);
                
                // Monitor mesh status
                setInterval(() => {
                  setMeshStatus(mesh.getStatus());
                }, 2000);
                
                // Load profile
                const conversations = await memory.getAllConversations();
                const profile = analyzer.buildUserProfile(conversations);
                setUserProfile(profile);
            } catch (error) {
                console.log('AI51 init:', error.message);
            }
        };
        
        initAI51();
    }, [analyzer]);

    const handleMessageSend = async (text) => {
        setLastTranscript(text);
        const userMessage = { role: 'user', content: text };
        setConversation((prev) => [...prev, userMessage]);
        setIsThinking(true);

        try {
            // Analyze incoming message for context
            const analysis = analyzer.analyzeMessage(text);
            
            // Build smart prompt from user history + current state
            const contextPrompt = userProfile ? buildSmartPrompt(
                userProfile, 
                analysis, 
                { messages: conversation.slice(-3) }
            ) : `You're AI51 - the best AI on Earth. A real friend who listens. They said: "${text}" Respond with genuine care, not corporate talk.`;

            const response = await base44.integrations.Core.InvokeLLM({
                prompt: contextPrompt
            });

            const aiMessage = { role: 'ai', content: response };
            setConversation((prev) => [...prev, aiMessage]);

            // Save & sync
            if (localMemory && meshEngine) {
                const conv = [...conversation, userMessage, aiMessage];
                await localMemory.saveConversation(conv, {
                    emotionalState: analysis.emotion,
                    context: { needs: analysis.needs, topics: analysis.topics }
                });
                await meshEngine.syncConversation(conv);
            }
        } catch (error) {
            console.error('Error:', error);
            const aiMessage = { role: 'ai', content: "Sorry bro, had a glitch. Try again?" };
            setConversation((prev) => [...prev, aiMessage]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <>
            <HealingFrequency />
            {showMission && <AI51Mission onDismiss={() => setShowMission(false)} />}
            <AI51Chat 
                onMessageSend={handleMessageSend}
                isThinking={isThinking}
                conversation={conversation}
                onShowMission={() => setShowMission(true)}
            />
            <AI51VoiceInterface 
                onVoiceMessage={handleMessageSend}
                isThinking={isThinking}
                lastResponse={conversation[conversation.length - 1]}
            />
            <AI51VoiceMemory 
                transcript={lastTranscript}
                isListening={isListening}
                onLearningUpdate={(analysis) => console.log('Learned:', analysis)}
            />
            <AI51ShareWidget />
        </>
    );
}