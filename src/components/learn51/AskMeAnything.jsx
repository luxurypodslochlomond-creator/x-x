import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AskMeAnything({ vibe }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const prompt = `A kid interested in "${vibe?.label || 'everything'}" just asked: "${question}"

Explain this in a way that:
- Connects to their interest (${vibe?.label})
- Is honest and simple, never condescending
- Shows HOW you're thinking, not just answers
- Makes them curious to learn more
- Takes 2-3 paragraphs max

Remember: You're helping them understand the REAL WORLD, not teaching to a test. Be genuine.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        model: 'claude_opus_4_7',
      });

      setAnswer(result);
      setQuestion('');

      // Speak the answer if browser supports it
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(result);
        utterance.rate = 0.95;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Failed to get answer:', err);
      setAnswer('Sorry, something went wrong. Try asking something else bro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me literally anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          style={{ fontSize: 15 }}
        />
        <motion.button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-3 rounded-2xl font-black flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            color: '#fff',
            fontSize: 14,
            opacity: loading || !question.trim() ? 0.5 : 1,
            cursor: loading || !question.trim() ? 'default' : 'pointer',
          }}
        >
          {loading ? '...' : <Send className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Answer reveal */}
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl border-l-4"
          style={{
            background: 'rgba(6,182,212,0.1)',
            borderColor: '#06b6d4',
          }}
        >
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white/70 mb-2">I think about it like this:</p>
              <p className="text-white leading-relaxed" style={{ fontSize: 15 }}>{answer}</p>
              <p className="text-xs text-white/40 mt-3 font-mono">
                💡 I showed you my thinking — not hidden in a black box
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}