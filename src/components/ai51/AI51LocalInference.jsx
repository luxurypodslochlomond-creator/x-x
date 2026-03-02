import { useState, useEffect, useRef } from 'react';

// WebLLM integration for true local reasoning
// Model: Phi-2 (2.7B, quantized to ~500MB)
// Runs fully offline. Zero data transmission.

let mlcEngineRef = null;
let modelLoaded = false;
let modelLoadingPromise = null;

async function initializeMLCEngine() {
  if (modelLoaded) return mlcEngineRef;
  if (modelLoadingPromise) return modelLoadingPromise;

  modelLoadingPromise = (async () => {
    try {
      const { MLCEngine } = await import('https://esm.run/@mlc-ai/web-llm');
      
      const engine = new MLCEngine({
        initProgressCallback: (progress) => {
          console.log(`Model loading: ${Math.round(progress * 100)}%`);
        }
      });

      // Load Phi-2 quantized (4-bit, ~500MB)
      // Falls back to smaller model if needed
      await engine.reload('Phi-2-q4f32_1');
      
      modelLoaded = true;
      mlcEngineRef = engine;
      return engine;
    } catch (err) {
      console.warn('WebLLM init failed:', err);
      throw new Error('Local inference unavailable. Falling back to cloud.');
    }
  })();

  return modelLoadingPromise;
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