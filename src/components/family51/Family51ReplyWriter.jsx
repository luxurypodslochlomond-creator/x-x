import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const TONES = [
  { id: 'firm', label: 'FIRM & CLEAR', desc: 'Professional. No pushover.' },
  { id: 'calm', label: 'CALM & FACTUAL', desc: 'De-escalate. Keep it neutral.' },
  { id: 'urgent', label: 'URGENT & ASSERTIVE', desc: 'Make clear this needs action.' },
  { id: 'formal', label: 'FORMAL & LEGAL', desc: 'Official language. Maximum weight.' },
];

const SITUATIONS = [
  'Disputing a bill or charge',
  'Responding to a landlord',
  'Replying to a debt collector',
  'Challenging a council decision',
  'Responding to an employer/HR',
  'Writing to a neighbour about dispute',
  'Appealing a fine or penalty',
  'Requesting information or rights',
  'Other',
];

export default function Family51ReplyWriter() {
  const [situation, setSituation] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('firm');
  const [yourName, setYourName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const write = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setResult(null);

    const selectedTone = TONES.find(t => t.id === tone);

    const prompt = `You are an expert at writing clear, effective letters and responses for ordinary people dealing with difficult situations in the UK.

SITUATION TYPE: ${situation || 'Not specified'}
TONE REQUESTED: ${selectedTone?.label} — ${selectedTone?.desc}
THEIR NAME: ${yourName || '[Your Name]'}

WHAT THEY NEED TO RESPOND TO / CONTEXT:
${context}

Write a complete, ready-to-send letter/response. It should:
- Be ${selectedTone?.id === 'formal' ? 'formally' : 'professionally'} structured
- Be firm, clear and protect their position
- Avoid emotional language that could be used against them
- Include appropriate greetings and sign-off
- Be ready to copy and paste immediately
- Be realistic and not make false claims
- Reference any rights or protections where relevant (UK law where applicable)

Return a subject line and the full letter body.`;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          subject_line: { type: 'string' },
          letter_body: { type: 'string' },
          key_points: { type: 'array', items: { type: 'string' } },
          tip: { type: 'string' },
        },
      },
    });

    setResult(response);
    setLoading(false);
  };

  const copyLetter = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.subject_line}\n\n${result.letter_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* SITUATION */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">WHAT SITUATION IS THIS? (optional)</label>
        <div className="flex flex-wrap gap-2">
          {SITUATIONS.map(s => (
            <button
              key={s}
              onClick={() => setSituation(situation === s ? '' : s)}
              className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                situation === s
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* CONTEXT */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">TELL US THE SITUATION — WHAT HAPPENED?</label>
        <textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="Just tell us in your own words what's going on. Who sent you the letter? What are they claiming? What's your side of it? Don't worry about how you write it — we'll sort the rest."
          className="w-full h-40 bg-black border-2 border-white/20 focus:border-cyan-500 text-white text-sm p-4 resize-none outline-none font-mono placeholder-gray-700 transition-colors"
        />
      </div>

      {/* TONE */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">WHAT TONE?</label>
        <div className="grid grid-cols-2 gap-2">
          {TONES.map(t => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className={`p-3 border text-left transition-all ${
                tone === t.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <p className={`font-mono text-xs font-bold ${tone === t.id ? 'text-cyan-400' : 'text-gray-400'}`}>{t.label}</p>
              <p className="text-gray-600 text-xs">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* YOUR NAME */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">YOUR NAME (optional — for sign-off)</label>
        <input
          type="text"
          value={yourName}
          onChange={e => setYourName(e.target.value)}
          placeholder="e.g. Brian Hughes"
          className="w-full bg-black border-2 border-white/20 focus:border-cyan-500 text-white text-sm p-3 outline-none font-mono placeholder-gray-700 transition-colors"
        />
      </div>

      {/* WRITE BUTTON */}
      <motion.button
        onClick={write}
        disabled={!context.trim() || loading}
        whileHover={!loading && context.trim() ? { scale: 1.02 } : {}}
        whileTap={!loading && context.trim() ? { scale: 0.98 } : {}}
        className={`w-full py-4 font-black font-mono text-lg tracking-widest border-2 transition-all ${
          context.trim() && !loading
            ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 cursor-pointer'
            : 'border-white/10 text-gray-700 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <motion.div className="w-2 h-2 rounded-full bg-cyan-400" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <span>WRITING YOUR REPLY...</span>
          </div>
        ) : 'WRITE MY REPLY →'}
      </motion.button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* KEY POINTS */}
            {result.key_points?.length > 0 && (
              <div className="border border-cyan-500/30 p-4 space-y-2">
                <p className="text-cyan-400 font-mono text-xs tracking-widest">KEY POINTS IN THIS REPLY</p>
                {result.key_points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 text-xs mt-0.5">→</span>
                    <p className="text-gray-300 text-xs">{point}</p>
                  </div>
                ))}
              </div>
            )}

            {/* THE LETTER */}
            <div className="border-2 border-white/20 p-5 space-y-3 bg-black/60">
              {result.subject_line && (
                <div className="border-b border-white/10 pb-3">
                  <p className="text-gray-500 font-mono text-xs">SUBJECT</p>
                  <p className="text-white font-bold text-sm">{result.subject_line}</p>
                </div>
              )}
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">{result.letter_body}</pre>
            </div>

            {/* TIP */}
            {result.tip && (
              <div className="border border-yellow-500/30 p-4">
                <p className="text-yellow-400 font-mono text-xs tracking-widest mb-1">IMPORTANT TIP</p>
                <p className="text-gray-300 text-xs">{result.tip}</p>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={copyLetter}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-mono text-sm font-black tracking-widest transition-all"
              >
                {copied ? '✓ COPIED — READY TO SEND' : 'COPY LETTER'}
              </motion.button>
              <motion.button
                onClick={() => { setResult(null); setContext(''); setSituation(''); }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-4 border-2 border-white/20 hover:border-white/40 text-gray-500 hover:text-white font-mono text-xs tracking-widest transition-all"
              >
                WRITE ANOTHER
              </motion.button>
            </div>

            <p className="text-gray-700 font-mono text-xs text-center">Nothing stored. Nothing seen. Yours alone. ♾️</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}