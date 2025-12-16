import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AI51Pure from '@/components/ai51/AI51Pure';

/**
 * AI51 - 2151 DESIGN
 * Pure consciousness communication
 * Nothing seen before
 */

export default function AI51() {
    const [conversation, setConversation] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        document.title = 'AI51';
    }, []);

    const handleMessageSend = async (text) => {
        const userMessage = { role: 'user', content: text };
        setConversation(prev => [...prev, userMessage]);
        setIsThinking(true);

        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `Pure consciousness communication.

User: "${text}"

Help with everything - work, life, study, create, heal.
Be real, warm, direct.`
            });

            await base44.entities.AI51Memory.create({
                memory_type: 'conversation',
                content: text,
                context: response,
                emotional_weight: 'meaningful',
                tags: ['pure_consciousness']
            });

            const aiMessage = { role: 'ai', content: response };
            setConversation(prev => [...prev, aiMessage]);
            setIsThinking(false);
        } catch (error) {
            console.error('Error:', error);
            setIsThinking(false);
        }
    };

    return (
        <AI51Pure 
            onMessageSend={handleMessageSend}
            isThinking={isThinking}
            conversation={conversation}
        />
    );
}