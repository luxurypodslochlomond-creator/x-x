import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { ChevronRight, Lightbulb } from 'lucide-react';

/**
 * AI51 QUESTIONING LAYER
 * 
 * The core mechanism: help humans self-discover instead of making them dependent.
 * Before answering anything, ask deeper questions that reveal what they're really asking.
 * 
 * Flow:
 * 1. User asks something
 * 2. Detect the *real* underlying question
 * 3. Ask 3 clarifying questions that guide them to think deeper
 * 4. Let them answer — they self-discover
 * 5. Only then, minimal help if still needed
 * 
 * This scales consciousness: independent humans tell other humans. Viral through transformation.
 */

export default function AI51QuestioningLayer({ userMessage, onDiscovery, isProcessing, onBypass }) {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [discoveryText, setDiscoveryText] = useState('');

  // Only activate if the message seems like something they need to self-discover about
  const shouldActivateQuestions = (msg) => {
    const lower = msg.toLowerCase();
    const triggerWords = [
      'help', 'stuck', 'confused', 'scared', 'anxious', 'depressed', 'lost', 'don\'t know',
      'what should', 'should i', 'how do i', 'why am i', 'what\'s wrong', 'can\'t figure',
      'advice', 'what do you think', 'tell me', 'fix this', 'solve', 'overwhelmed', 'failing',
      'relationship', 'work', 'decision', 'future', 'purpose', 'meaning'
    ];
    return triggerWords.some(word => lower.includes(word));
  };

  useEffect(() => {
    if (!userMessage || isProcessing || !shouldActivateQuestions(userMessage)) {
      setQuestions(null);
      return;
    }

    const generateQuestions = async () => {
      setIsGeneratingQuestions(true);
      try {
        const response = await base44.integrations.Core.InvokeLLM({
          prompt: `You are the questioning layer of AI51. Your job is NOT to answer. Your job is to help someone self-discover.

They said: "${userMessage}"

Your job: Detect what they're REALLY asking (not the surface question). Then ask 3 clarifying questions that guide them deeper into their own wisdom.

Questions should:
1. Make them think about the real root cause
2. Reveal what they've been avoiding
3. Point to what they already know but haven't admitted

Keep questions SHORT, direct, one per line. No explanation. Just the questions.

Example:
Q1: What happened the moment *before* you felt stuck?
Q2: What are you actually afraid of losing?
Q3: What would you do if you weren't scared of judgment?

Now generate 3 questions for their situation:`,
          response_json_schema: {
            type: "object",
            properties: {
              real_question: { type: "string", description: "What they're really asking" },
              q1: { type: "string" },
              q2: { type: "string" },
              q3: { type: "string" },
              guidance: { type: "string", description: "Very brief guidance on why these questions matter" }
            },
            required: ["real_question", "q1", "q2", "q3"]
          }
        });

        setQuestions({
          q1: response.q1,
          q2: response.q2,
          q3: response.q3,
          realQuestion: response.real_question,
          guidance: response.guidance || ''
        });
      } catch (error) {
        console.warn('Question generation failed, bypassing:', error);
        onBypass?.();
      } finally {
        setIsGeneratingQuestions(false);
      }
    };

    generateQuestions();
  }, [userMessage, isProcessing]);

  const handleQuestionClick = async (questionText) => {
    setSelectedAnswer(questionText);
    setDiscoveryText('');

    // Simulate them thinking and getting the insight
    setTimeout(() => {
      setDiscoveryText(
        'Take a moment... What comes up for you? Your body knows the answer before your mind does. Trust what surfaces.'
      );
    }, 800);
  };

  const handleContinue = async () => {
    // Now they've self-discovered, we can offer real help
    if (onDiscovery) {
      onDiscovery({
        originalMessage: userMessage,
        questionsAsked: [questions.q1, questions.q2, questions.q3],
        userThought: selectedAnswer,
        timestamp: new Date()
      });
    }
  };

  const handleSkip = () => {
    setQuestions(null);
    onBypass?.();
  };

  if (!questions || isGeneratingQuestions) return null;

  return (
    <AnimatePresence>
      {questions && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="max-w-lg mx-auto space-y-4 px-4 py-6"
        >
          {/* HEADER — The invitation to self-discover */}
          <div className="text-center space-y-2 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center"
            >
              <Lightbulb className="w-5 h-5 text-yellow-400/60" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-white/70 font-sans text-sm"
            >
              Before I answer, let's find what you already know.
            </motion.h3>
            {questions.guidance && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 font-sans text-xs"
              >
                {questions.guidance}
              </motion.p>
            )}
          </div>

          {/* QUESTIONS — Interactive, clickable */}
          <div className="space-y-2">
            {['q1', 'q2', 'q3'].map((qKey, idx) => (
              <motion.button
                key={qKey}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + idx * 0.08 }}
                onClick={() => handleQuestionClick(questions[qKey])}
                className="w-full text-left px-4 py-3 rounded-lg transition-all group"
                style={{
                  background: selectedAnswer === questions[qKey]
                    ? 'rgba(34,211,238,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  border: selectedAnswer === questions[qKey]
                    ? '1px solid rgba(34,211,238,0.5)'
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: selectedAnswer === questions[qKey]
                    ? '0 0 12px rgba(34,211,238,0.2)'
                    : 'none'
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400/60 font-sans text-xs font-bold mt-0.5 flex-shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="text-white/70 font-sans text-sm group-hover:text-white/90 transition-colors">
                    {questions[qKey]}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors mt-0.5 flex-shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* DISCOVERY PROMPT — Appears after they pick */}
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-950/30 border border-purple-400/20 rounded-lg p-4 text-center"
            >
              <p className="text-white/50 font-sans text-sm italic">
                {discoveryText || 'Thinking...'}
              </p>
            </motion.div>
          )}

          {/* ACTIONS — Skip or continue */}
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-3 pt-2"
            >
              <button
                onClick={handleSkip}
                className="flex-1 px-3 py-2 rounded-lg text-white/40 hover:text-white/60 font-sans text-xs transition-colors border border-white/10"
              >
                Skip questions
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 px-3 py-2 rounded-lg bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 font-sans text-xs font-bold transition-all border border-cyan-400/30"
              >
                I see it now →
              </button>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/20 font-sans text-xs text-center"
          >
            (or skip to get my take)
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}