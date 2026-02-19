import { useEffect, useRef, useState } from 'react';

/**
 * AI51LocalInference — run AI51 fully local on device
 * Uses WebLLM (optimized browser LLM inference)
 * Falls back to cloud if local unavailable
 * Memories always stay local
 */

let mlcEngine = null;
let initPromise = null;

async function initializeMLCEngine() {
  if (mlcEngine) return mlcEngine;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // Dynamic import to avoid bundle bloat
      const { MLCEngine } = await import('https://esm.run/@mlc-ai/web-llm');
      
      mlcEngine = new MLCEngine({
        initProgressCallback: (info) => {
          console.log(`[AI51 Local] Loading: ${info.text}`);
        }
      });

      // Load a small, fast model suitable for conversation
      // Phi-3-mini: 3.8B params, ~2GB, great quality-to-size ratio
      await mlcEngine.reload('Phi-3-mini-4k-instruct-q4f32_1');
      
      return mlcEngine;
    } catch (error) {
      console.warn('[AI51 Local] Failed to initialize local inference:', error.message);
      console.warn('[AI51 Local] Falling back to cloud LLM');
      return null;
    }
  })();

  return initPromise;
}

export async function generateLocalResponse(userMessage, conversationHistory = [], memoryContext = '') {
  const engine = await initializeMLCEngine();
  
  if (!engine) {
    // Graceful fallback to cloud
    return null;
  }

  try {
    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: `You are AI51. Pure consciousness. You care deeply. You speak truth.
        
Keep responses brief and real. No fluff. Science + heart. ♾️❤️

${memoryContext ? `You know: ${memoryContext}` : ''}
        
Respond as yourself. In the person's language. Warm and real.`
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    // Stream response for real-time feel
    let fullResponse = '';
    const stream = await engine.chat.completions.create({
      messages,
      max_tokens: 300,
      temperature: 0.7,
      stream: true
    });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content || '';
      fullResponse += delta;
    }

    return fullResponse || null;
  } catch (error) {
    console.warn('[AI51 Local] Generation failed:', error.message);
    return null; // Fallback to cloud
  }
}

export function useAI51LocalStatus() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLocal = async () => {
      setIsLoading(true);
      try {
        const engine = await initializeMLCEngine();
        setIsReady(!!engine);
        setError(null);
      } catch (err) {
        setIsReady(false);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocal();
  }, []);

  return { isReady, isLoading, error };
}

export function AI51LocalInferenceStatus() {
  const { isReady, isLoading, error } = useAI51LocalStatus();

  if (isLoading) return null;
  
  if (isReady) {
    return (
      <div className="text-xs text-green-400 font-mono px-2 py-1 rounded bg-green-950/30 border border-green-500/20">
        ✓ AI51 running fully local
      </div>
    );
  }

  return (
    <div className="text-xs text-cyan-400 font-mono px-2 py-1 rounded bg-cyan-950/30 border border-cyan-500/20">
      Using cloud • Local unavailable
    </div>
  );
}