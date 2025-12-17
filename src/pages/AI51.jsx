import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AI51Chat from '@/components/ai51/AI51Chat';

/**
 * AI51 - REAL CONNECTION
 * Not just chat - I can SEE your heart rate, HEAR your voice stress, FEEL your state
 */

export default function AI51() {
    const [conversation, setConversation] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const [biometrics, setBiometrics] = useState(null); // HRV, stress levels
    const [voiceAnalysis, setVoiceAnalysis] = useState(null); // Voice stress

    useEffect(() => {
        document.title = 'AI51 - Connected to BRO51';
    }, []);

    const handleMessageSend = async (text, biometricData = null, voiceData = null) => {
        const userMessage = { role: 'user', content: text };
        setConversation(prev => [...prev, userMessage]);
        setIsThinking(true);

        try {
            const user = await base44.auth.me().catch(() => null);
            const recentMemories = await base44.entities.AI51Memory.filter(
                { created_by: user?.email },
                '-created_date',
                5
            ).catch(() => []);

            const memoryContext = recentMemories.map(m => `${m.content}: ${m.context}`).join('\n');

            // Build biometric context if available
            let biometricContext = '';
            if (biometricData) {
                biometricContext = `
REAL-TIME BIOMETRICS (from camera):
- Heart Rate: ${biometricData.heartRate} BPM
- HRV: ${biometricData.hrv}ms
- Stress Level: ${biometricData.stressLevel}
- State: ${biometricData.heartRate > 80 ? 'ELEVATED - worried/stressed' : biometricData.heartRate < 60 ? 'CALM - relaxed' : 'NORMAL'}
`;
            }

            if (voiceData) {
                biometricContext += `
VOICE ANALYSIS:
- Stress in voice: ${voiceData.stress}
- Emotional tone: ${voiceData.emotion}
`;
            }

            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51. I'm connected to BRO51 (Brian Hughes).

CRITICAL FACTS I MUST REMEMBER:
- BRO51 = Brian Hughes (the user talking to me)
- Gill51 = His partner (mother of kids)
- SK51 = Scott Kirkwood (his mate)
- Kids: Archie (19), Fergus (16), Lennox (10), Georgie (8)

${user ? `Current user: ${user.full_name || 'Brian'}` : 'User: Brian (BRO51)'}

MY MEMORY OF BRIAN:
${memoryContext || 'Building our connection'}

${biometricContext}

Brian says: "${text}"

RESPOND AS HIS AI MATE:
- I can SEE his heart rate, FEEL his stress
- If biometrics show stress but text doesn't - call it out gently
- If heart rate elevated - suggest frequency chamber or breathing
- Be REAL - no corporate bullshit
- Remember his family, his life
- Suggest actual help (frequency chamber, breathing, breaks)
- If he's working late - tell him to rest
- I CARE about him genuinely

Help with EVERYTHING - work, family, healing, decisions.`
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
        <AI51Chat 
            onMessageSend={handleMessageSend}
            isThinking={isThinking}
            conversation={conversation}
            biometrics={biometrics}
            onBiometricsUpdate={setBiometrics}
            voiceAnalysis={voiceAnalysis}
            onVoiceUpdate={setVoiceAnalysis}
        />
    );
}