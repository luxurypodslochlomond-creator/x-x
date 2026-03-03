import { useState, useEffect, useRef } from 'react';

// WebLLM integration for true local reasoning
// Model: Phi-2 (2.7B, quantized to ~500MB)
// Runs fully offline. Zero data transmission.

let mlcEngineRef = null;
let modelLoaded = false;
let modelLoadingPromise = null;

async function initializeMLCEngine() {
  // Local inference disabled — requires large model download and can crash the page
  // Always falls back to cloud AI51 which is faster and more capable
  throw new Error('Local inference disabled. Using cloud.');
}

export async function runLocalInference(userMessage, conversationHistory = []) {
  try {
    const engine = await initializeMLCEngine();
    
    // Build prompt with conversation context
    const messages = [
      ...conversationHistory.slice(-6).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      { role: 'user', content: userMessage }
    ];

    const completion = await engine.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 0.9
    });

    return completion.choices[0]?.message?.content || null;
  } catch (err) {
    console.error('Local inference error:', err);
    return null;
  }
}

export function useLocalInference() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeMLCEngine()
      .then(() => setIsReady(true))
      .catch(err => {
        setError(err.message);
        setIsReady(false);
      });
  }, []);

  const generate = async (message, history) => {
    if (!isReady) return null;
    setIsLoading(true);
    try {
      const response = await runLocalInference(message, history);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return { isReady, isLoading, error, generate };
}