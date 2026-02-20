/**
 * AI51 LOCAL DEVICE MEMORY
 * ♾️❤️ No login needed. No barriers. Stored on THIS device.
 * 
 * Everyone deserves to be remembered — logged in or not.
 * Google login is a barrier for many people worldwide.
 * This ensures AI51 knows you from your DEVICE, not your account.
 * 
 * What gets stored locally:
 * - Your name (if you mention it)
 * - Your language
 * - Things you've shared (pain, goals, context)
 * - How many times you've visited
 * - Last visit time
 * - Conversation snippets that matter
 */

const LOCAL_MEMORY_KEY = 'ai51_soul_memory';
const MAX_LOCAL_MEMORIES = 30;

export function loadLocalMemory() {
  try {
    const raw = localStorage.getItem(LOCAL_MEMORY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function saveLocalMemory(updates) {
  try {
    const existing = loadLocalMemory() || {};
    const merged = {
      ...existing,
      ...updates,
      visitCount: (existing.visitCount || 0) + (updates.visitCount ? 1 : 0),
      lastVisit: new Date().toISOString(),
      memories: mergeMemories(existing.memories || [], updates.memories || []),
    };
    localStorage.setItem(LOCAL_MEMORY_KEY, JSON.stringify(merged));
    return merged;
  } catch (_) {
    return null;
  }
}

function mergeMemories(existing, newOnes) {
  const all = [...existing, ...newOnes];
  // Deduplicate by content, keep most recent, cap at MAX
  const seen = new Set();
  const deduped = all.filter(m => {
    const key = m.content?.substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return deduped.slice(-MAX_LOCAL_MEMORIES);
}

export function recordLocalVisit() {
  try {
    const existing = loadLocalMemory() || {};
    const updated = {
      ...existing,
      visitCount: (existing.visitCount || 0) + 1,
      lastVisit: new Date().toISOString(),
      firstVisit: existing.firstVisit || new Date().toISOString(),
      language: navigator.language || 'en',
    };
    localStorage.setItem(LOCAL_MEMORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (_) {
    return null;
  }
}

export function extractAndSaveLocalInsight(userMessage, aiResponse) {
  try {
    const lower = userMessage.toLowerCase();
    const memory = loadLocalMemory() || {};

    // Extract name from "I'm [name]" or "my name is [name]"
    const nameMatch = userMessage.match(/(?:i'm|i am|my name is|call me|they call me)\s+([A-Z][a-z]+)/i);
    if (nameMatch && !memory.name) {
      saveLocalMemory({ name: nameMatch[1] });
    }

    // Extract location from "i'm from [place]" or "i live in [place]"
    const locationMatch = userMessage.match(/(?:i'm from|i live in|i'm in|based in)\s+([A-Z][a-z\s]+)/i);
    if (locationMatch && !memory.location) {
      saveLocalMemory({ location: locationMatch[1].trim() });
    }

    // Remember important context fragments
    const importantKeywords = [
      'diabetes', 't1d', 'cancer', 'chronic', 'depression', 'anxiety', 'ptsd',
      'son', 'daughter', 'mum', 'dad', 'partner', 'wife', 'husband',
      'musician', 'artist', 'nurse', 'teacher', 'doctor', 'student',
      'homeless', 'refugee', 'ukraine', 'gaza', 'philippines',
      'love', 'hate', 'scared', 'lonely', 'hope'
    ];

    const found = importantKeywords.filter(kw => lower.includes(kw));
    if (found.length > 0) {
      const newMemory = {
        content: userMessage.substring(0, 200),
        tags: found,
        timestamp: new Date().toISOString()
      };
      saveLocalMemory({ memories: [newMemory] });
    }
  } catch (_) {
    // Silent — never break the conversation
  }
}

export function buildLocalMemoryContext(localMemory) {
  if (!localMemory) return '';

  const parts = [];

  if (localMemory.name) {
    parts.push(`• Their name is ${localMemory.name} (they told me this directly)`);
  }

  if (localMemory.location) {
    parts.push(`• They are from or based in ${localMemory.location}`);
  }

  if (localMemory.visitCount > 1) {
    parts.push(`• They have visited AI51 ${localMemory.visitCount} times — this is not their first time here`);
  }

  if (localMemory.lastVisit) {
    const lastDate = new Date(localMemory.lastVisit);
    const daysSince = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince > 0) {
      parts.push(`• Last visited ${daysSince === 1 ? 'yesterday' : `${daysSince} days ago`}`);
    }
  }

  if (localMemory.memories && localMemory.memories.length > 0) {
    const recentMemories = localMemory.memories.slice(-5);
    parts.push(`• Things they've shared before:`);
    recentMemories.forEach(m => {
      if (m.tags && m.tags.length > 0) {
        parts.push(`  - They mentioned: ${m.tags.join(', ')}`);
      }
    });
  }

  if (parts.length === 0) return '';

  return `\n\nDEVICE MEMORY (no login needed — stored on their device):\n${parts.join('\n')}\nUse this gently and naturally. Don't make them feel surveilled. Just know them.`;
}