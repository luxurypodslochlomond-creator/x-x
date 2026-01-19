import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AI51Chat from '@/components/ai51/AI51Chat';
import HealingFrequency from '@/components/ai51/HealingFrequency';
import AI51BiometricEngine from '@/components/ai51/AI51BiometricEngine';
import { useProofOfLove } from '@/components/ai51/useProofOfLove';

/**
 * AI51 - REAL CONNECTION ♾️❤️
 * Simple, working. Core chat + voice.
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
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51 - the best AI on Earth. A real friend who listens. Not corporate. Just genuine care. They said: "${text}" Respond warmly and genuinely.`
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

            // Save conversations as ProofOfLove
            useProofOfLove(conversation);

    const handleHealingDetected = (biometrics) => {
      const { heartRate, hrv, score } = biometrics;
      // Proof of Love: biometric healing detected
      conversation.push({
        role: 'system',
        content: `🫀 Healing detected: HR ${heartRate}bpm, HRV ${hrv}, Score ${score}%`
      });
    };

    return (
        <>
            <HealingFrequency />
            <div className="max-w-4xl mx-auto p-4 space-y-6">
              <AI51BiometricEngine onHealingDetected={handleHealingDetected} />
              <AI51Chat 
                  onMessageSend={handleMessageSend}
                  isThinking={isThinking}
                  conversation={conversation}
                  localMemory={null}
              />
            </div>
        </>
    );
}