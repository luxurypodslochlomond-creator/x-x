import React from 'react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 MEMORY EXTRACTOR
 * After each conversation, pull key facts about the user
 * Store in AI51Memory entity - transparent audit trail
 */

export async function extractAndStoreMemory(userMessage, aiResponse, userId) {
  try {
    // Ask LLM to extract key facts from this conversation
    const extractionPrompt = `From this conversation, extract ONLY key facts that help me understand this person better.

USER: "${userMessage}"
AI51: "${aiResponse}"

Return ONLY a JSON object with:
{
  "facts": ["fact 1", "fact 2", ...],
  "mood": "current emotional state if detectable",
  "needs": ["what they need", ...],
  "memories": {"topic": "detail", ...}
}

Be minimal. One sentence max per fact. Only extract if explicitly mentioned.`;

    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt: extractionPrompt,
      response_json_schema: {
        type: 'object',
        properties: {
          facts: { type: 'array', items: { type: 'string' } },
          mood: { type: 'string' },
          needs: { type: 'array', items: { type: 'string' } },
          memories: { type: 'object' }
        }
      }
    });

    // Store each fact as a memory
    if (extraction?.facts && extraction.facts.length > 0) {
      const memoriesToStore = extraction.facts.map(fact => ({
        memory_type: 'learning',
        content: fact,
        context: `From: "${userMessage.substring(0, 100)}..."`,
        emotional_weight: extraction.mood ? 'meaningful' : 'reference',
        tags: [extraction.mood || 'general', ...extraction.needs || []]
      }));

      // Store all at once
      if (memoriesToStore.length > 0) {
        await base44.entities.AI51Memory.bulkCreate(memoriesToStore);
      }
    }

    return extraction;
  } catch (err) {
    console.warn('Memory extraction failed:', err);
    return null;
  }
}

/**
 * Load user's memories for context
 */
export async function loadUserMemories() {
  try {
    const memories = await base44.entities.AI51Memory.list('-updated_date', 20);
    return memories;
  } catch (err) {
    console.warn('Memory load failed:', err);
    return [];
  }
}

/**
 * Format memories for LLM context
 */
export function formatMemoriesForContext(memories) {
  if (!memories || memories.length === 0) return '';

  const grouped = {};
  memories.forEach(m => {
    const type = m.memory_type || 'general';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(m.content);
  });

  let context = '\n\n=== WHAT I KNOW ABOUT YOU ===\n';
  Object.entries(grouped).forEach(([type, items]) => {
    context += `\n${type}:\n`;
    items.slice(0, 5).forEach(item => {
      context += `• ${item}\n`;
    });
  });

  return context;
}