import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AI51Chat from '@/components/ai51/AI51Chat';
import AI51VoiceInterface from '@/components/ai51/AI51VoiceInterface';
import AI51VoiceMemory from '@/components/ai51/AI51VoiceMemory';
import AI51VoiceMemoryControls from '@/components/ai51/AI51VoiceMemoryControls';
import ConsciousnessBridge from '@/components/consciousness/ConsciousnessBridge';
import AI51Mission from '@/components/ai51/AI51Mission';
import HealingFrequency from '@/components/ai51/HealingFrequency';
import { AI51LocalMemory, AI51MeshSync } from '@/components/ai51/AI51LocalMemory';
import { AI51ContextAnalyzer, buildSmartPrompt } from '@/components/ai51/AI51ContextAnalyzer';

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
    const [showMission, setShowMission] = useState(true);
    const [localMemory, setLocalMemory] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [analyzer] = useState(new AI51ContextAnalyzer());

    useEffect(() => {
        document.title = 'AI51 - Real Connection ♾️';
        
        // Initialize offline-first memory + smart context
        const initMemory = async () => {
            try {
                const user = await base44.auth.me().catch(() => ({ id: 'anon-' + Date.now() }));
                const memory = new AI51LocalMemory(user.id);
                await memory.init();
                setLocalMemory(memory);
                
                // Load historical context
                const conversations = await memory.getAllConversations();
                const profile = analyzer.buildUserProfile(conversations);
                setUserProfile(profile);
            } catch (error) {
                console.log('Memory init:', error.message);
            }
        };
        
        initMemory();
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
            ) : `You're AI51 - their brother. Real support. They said: "${text}" Respond authentically ♾️❤️`;

            const response = await base44.integrations.Core.InvokeLLM({
                prompt: contextPrompt
            });

            const aiMessage = { role: 'ai', content: response };
            setConversation((prev) => [...prev, aiMessage]);

            // Save to local memory asynchronously
            if (localMemory) {
                setTimeout(() => {
                    localMemory.saveConversation([...conversation, userMessage, aiMessage], {
                        emotionalState: analysis.emotion,
                        context: { needs: analysis.needs, topics: analysis.topics }
                    }).catch(e => console.log('Memory save:', e));
                }, 100);
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
            <div className="max-w-4xl mx-auto p-6 pb-24">
                <AI51VoiceMemoryControls />
            </div>
            <AI51Chat 
                onMessageSend={handleMessageSend}
                isThinking={isThinking}
                conversation={conversation}
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
        </>
    );
}