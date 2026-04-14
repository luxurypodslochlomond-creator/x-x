import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const LETTER_TYPES = [
  'Council tax / rates',
  'Energy / utilities bill',
  'Rent / landlord notice',
  'Debt / debt collector',
  'NHS / medical letter',
  'School / college letter',
  'Employer / HR letter',
  'Parking / motoring fine',
  'Benefits / DWP letter',
  'Legal / court letter',
  'Immigration letter',
  'Other official letter',
];

export default function Family51LetterDecoder() {
  const [letterText, setLetterText] = useState('');
  const [letterType, setLetterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const decode = async () => {
    if (!letterText.trim()) return;
    setLoading(true);
    setResult(null);

    const prompt = `You are a compassionate but clear UK citizens advice expert. A person has received the following official letter${letterType ? ` (type: ${letterType})` : ''} and needs help understanding it.

LETTER CONTENT:
${letterText}

Please provide:
1. WHAT THIS MEANS - Plain English explanation (2-3 sentences max, no jargon)
2. HOW SERIOUS IS THIS - Rate it: NOT URGENT / NEEDS ATTENTION / URGENT / VERY URGENT
3. WHAT YOU SHOULD DO - Exactly 3 clear action steps numbered 1, 2, 3
4. KEY DEADLINE - Any dates or deadlines mentioned (say "No deadline mentioned" if none)
5. DON'T PANIC BECAUSE - One reassuring but honest sentence

Format clearly with these exact headers. Be warm but direct. This person may be scared.`;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          what_this_means: { type: 'string' },
          severity: { type: 'string', enum: ['NOT URGENT', 'NEEDS ATTENTION', 'URGENT', 'VERY URGENT'] },
          severity_explanation: { type: 'string' },
          action_steps: { type: 'array', items: { type: 'string' } },
          key_deadline: { type: 'string' },
          dont_panic: { type: 'string' },
        },
      },
    });

    setResult(response);
    setLoading(false);
  };

  const severityColor = {
    'NOT URGENT': 'text-green-400 border-green-500',
    'NEEDS ATTENTION': 'text-yellow-400 border-yellow-500',
    'URGENT': 'text-orange-400 border-orange-500',
    'VERY URGENT': 'text-red-400 border-red-500',
  };

  const copyAll = () => {
    if (!result) return;
    const text = `LETTER DECODED BY FAMILY51\n\nWHAT THIS MEANS:\n${result.what_this_means}\n\nSEVERITY: ${result.severity}\n${result.severity_explanation}\n\nACTION STEPS:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nKEY DEADLINE:\n${result.key_deadline}\n\nDON'T PANIC:\n${result.dont_panic}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* LETTER TYPE */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">WHAT TYPE OF LETTER IS THIS? (optional)</label>
        <div className="flex flex-wrap gap-2">
          {LETTER_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setLetterType(letterType === type ? '' : type)}
              className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                letterType === type
                  ? 'border-orange-500 text-orange-400 bg-orange-500/10'
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* PASTE AREA */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">PASTE YOUR LETTER HERE</label>
        <textarea
          value={letterText}
          onChange={e => setLetterText(e.target.value)}
          placeholder="Paste the full text of your letter here... Don't worry about formatting. Just paste everything."
          className="w-full h-48 bg-black border-2 border-white/20 focus:border-orange-500 text-white text-sm p-4 resize-none outline-none font-mono placeholder-gray-700 transition-colors"
        />
        <p className="text-gray-700 font-mono text-xs">Your text never leaves your device or gets stored anywhere. ♾️</p>
      </div>

      {/* DECODE BUTTON */}
      <motion.button
        onClick={decode}
        disabled={!letterText.trim() || loading}
        whileHover={!loading && letterText.trim() ? { scale: 1.02 } : {}}
        whileTap={!loading && letterText.trim() ? { scale: 0.98 } : {}}
        className={`w-full py-4 font-black font-mono text-lg tracking-widest border-2 transition-all ${
          letterText.trim() && !loading
            ? 'border-orange-500 text-orange-400 hover:bg-orange-500/10 cursor-pointer'
            : 'border-white/10 text-gray-700 cursor-not-allowed'
        }`}
      >
        {loading ? <LoadingPulse color="orange" text="DECODING YOUR LETTER..." /> : 'DECODE THIS LETTER →'}
      </motion.button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* SEVERITY BADGE */}
            <div className={`border-2 ${severityColor[result.severity] || 'text-gray-400 border-gray-500'} p-4 flex items-center justify-between`}>
              <div>
                <p className="font-mono text-xs tracking-widest opacity-60">SEVERITY</p>
                <p className={`font-black font-mono text-xl ${(severityColor[result.severity] || '').split(' ')[0]}`}>{result.severity}</p>
                {result.severity_explanation && <p className="text-gray-400 text-xs mt-1">{result.severity_explanation}</p>}
              </div>
            </div>

            {/* WHAT THIS MEANS */}
            <ResultBlock label="WHAT THIS MEANS" color="orange">
              <p className="text-white text-sm leading-relaxed">{result.what_this_means}</p>
            </ResultBlock>

            {/* ACTION STEPS */}
            <ResultBlock label="WHAT YOU SHOULD DO" color="cyan">
              <ol className="space-y-2">
                {result.action_steps?.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-black font-mono text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                    <p className="text-white text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </ResultBlock>

            {/* DEADLINE */}
            <ResultBlock label="KEY DEADLINE" color="yellow">
              <p className="text-white text-sm">{result.key_deadline}</p>
            </ResultBlock>

            {/* DON'T PANIC */}
            <ResultBlock label="DON'T PANIC BECAUSE..." color="green">
              <p className="text-white text-sm leading-relaxed">{result.dont_panic}</p>
            </ResultBlock>

            {/* COPY & ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                onClick={copyAll}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 border-2 border-white/20 hover:border-white/40 text-gray-400 hover:text-white font-mono text-xs tracking-widest transition-all"
              >
                {copied ? '✓ COPIED' : 'COPY FULL BREAKDOWN'}
              </motion.button>
              <motion.button
                onClick={() => { setResult(null); setLetterText(''); setLetterType(''); }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 border-2 border-orange-500/40 hover:border-orange-500 text-orange-500 hover:text-orange-400 font-mono text-xs tracking-widest transition-all"
              >
                DECODE ANOTHER LETTER
              </motion.button>
            </div>

            {/* WRITE REPLY CTA */}
            <div className="border border-cyan-500/30 p-5 text-center space-y-2 bg-cyan-500/5">
              <p className="text-cyan-400 font-mono text-xs tracking-widest">NEED TO RESPOND TO THIS LETTER?</p>
              <p className="text-gray-400 text-sm">We'll write the reply for you — clear, firm, and ready to send.</p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('family51-switch-tool', { detail: 'reply' }))}
                className="text-cyan-400 font-black font-mono text-sm hover:text-cyan-300 transition-colors underline"
              >
                WRITE MY REPLY →
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultBlock({ label, color, children }) {
  const colors = {
    orange: 'border-orange-500/40 text-orange-400',
    cyan: 'border-cyan-500/40 text-cyan-400',
    yellow: 'border-yellow-500/40 text-yellow-400',
    green: 'border-green-500/40 text-green-400',
    purple: 'border-purple-500/40 text-purple-400',
  };
  return (
    <div className={`border ${colors[color] || colors.orange} p-5 space-y-3`}>
      <p className={`font-mono text-xs tracking-widest ${colors[color]?.split(' ')[1] || 'text-orange-400'}`}>{label}</p>
      {children}
    </div>
  );
}

function LoadingPulse({ color = 'orange', text }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <motion.div
        className={`w-2 h-2 rounded-full bg-${color}-400`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <span>{text}</span>
    </div>
  );
}