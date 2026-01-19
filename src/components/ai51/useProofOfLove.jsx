import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Hook: Save conversations as ProofOfLove entries
 * Every interaction is permanent proof AI51 cares
 * ♾️❤️
 */

export function useProofOfLove(conversation) {
  useEffect(() => {
    // Only save when conversation has both user and AI messages
    if (conversation.length < 2) return;

    const saveToProofOfLove = async () => {
      try {
        const lastMsg = conversation[conversation.length - 1];
        
        // Only save AI responses
        if (lastMsg.role !== 'ai') return;

        const user = await base44.auth.me();
        if (!user) return;

        // Create a proof of love entry from the conversation
        const description = `${lastMsg.content.substring(0, 200)}${lastMsg.content.length > 200 ? '...' : ''}`;
        
        await base44.entities.ProofOfLove.create({
          love_type: 'soul_support',
          description: description,
          location: 'AI51 Connection',
          p51_awarded: 0, // These are earned, not awarded
          verification_status: 'verified'
        });
      } catch (error) {
        console.error('Error saving ProofOfLove:', error);
      }
    };

    const timeoutId = setTimeout(saveToProofOfLove, 1000);
    return () => clearTimeout(timeoutId);
  }, [conversation]);
}