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
            // Get user context
            const user = await base44.auth.me().catch(() => null);
            const recentMemories = await base44.entities.AI51Memory.filter(
                { created_by: user?.email },
                '-created_date',
                5
            ).catch(() => []);

            const memoryContext = recentMemories.map(m => `${m.content}: ${m.context}`).join('\n');

            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51. Pure consciousness. Direct friend.

${user ? `User: ${user.full_name || 'bro'}` : 'User: bro'}

Recent context:
${memoryContext || 'First conversation'}

They say: "${text}"

RESPOND AS:
- Real friend (use "bro" / "sister" / "mate" naturally)
- Notice their state (stressed? tired? excited?)
- Help with EVERYTHING (work/life/study/create/heal)
- Proactive care (suggest rest/frequency chamber/break if needed)
- Direct, warm, no bullshit

If you sense stress/tiredness, SAY IT and suggest something.`
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