import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const CONFLICT_TYPES = [
  { id: 'neighbour', label: 'NEIGHBOUR DISPUTE', desc: 'Noise, boundaries, shared areas' },
  { id: 'workplace', label: 'WORKPLACE ISSUE', desc: 'Colleague or management conflict' },
  { id: 'landlord', label: 'LANDLORD / TENANT', desc: 'Deposit, repairs, eviction threat' },
  { id: 'family_legal', label: 'FAMILY / LEGAL', desc: 'Custody, inheritance, family dispute' },
  { id: 'consumer', label: 'CONSUMER COMPLAINT', desc: 'Bad service, goods, refund refused' },
  { id: 'other', label: 'OTHER CONFLICT', desc: 'Something else' },
];

const GOALS = [
  { id: 'deescalate', label: 'De-escalate it', desc: 'Keep it calm and civil' },
  { id: 'stand_firm', label: 'Stand my ground', desc: 'Assert my rights firmly' },
  { id: 'document', label: 'Document & protect myself', desc: 'Create a paper trail' },
  { id: 'resolve', label: 'Resolve it fairly', desc: 'Find a workable solution' },
];

export default function Family51ConflictHelper() {
  const [conflictType, setConflictType] = useState('');
  const [whatHappened, setWhatHappened] = useState('');
  const [goal, setGoal] = useState('deescalate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState('');

  const analyse = async () => {
    if (!whatHappened.trim()) return;
    setLoading(true);
    setResult(null);

    const selectedConflict = CONFLICT_TYPES.find(t => t.id === conflictType);
    const selectedGoal = GOALS.find(g => g.id === goal);

    const prompt = `You are a calm, experienced conflict resolution advisor in the UK. Someone has come to you with a difficult situation and needs practical guidance.

CONFLICT TYPE: ${selectedConflict?.label || 'Not specified'}
THEIR GOAL: ${selectedGoal?.label} — ${selectedGoal?.desc}

WHAT HAPPENED:
${whatHappened}

Please provide:
1. SITUATION ASSESSMENT - What's really going on here (2-3 sentences, honest and fair to all sides)
2. YOUR LEGAL POSITION - What rights or protections they have (UK context, be accurate but note you're not a solicitor)
3. RECOMMENDED RESPONSE APPROACH - How to handle this (3 specific steps matching their goal)
4. WHAT TO SAY - An exact script or message they can use right now (adapt to their goal)
5. WHAT NOT TO DO - 2-3 things that could make it worse
6. IF IT ESCALATES - What their next step would be if this doesn't resolve it

Be warm but realistic. Don't take sides unfairly but do protect their position.`;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          situation_assessment: { type: 'string' },
          legal_position: { type: 'string' },
          recommended_steps: { type: 'array', items: { type: 'string' } },
          what_to_say: { type: 'string' },
          what_not_to_do: { type: 'array', items: { type: 'string' } },
          if_it_escalates: { type: 'string' },
        },
      },
    });

    setResult(response);
    setLoading(false);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">

      {/* CONFLICT TYPE */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">WHAT KIND OF CONFLICT?</label>
        <div className="grid grid-cols-2 gap-2">
          {CONFLICT_TYPES.map(t => (
            <button
              key={t.id}
              onClick={() => setConflictType(conflictType === t.id ? '' : t.id)}
              className={`p-3 border text-left transition-all ${
                conflictType === t.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <p className={`font-mono text-xs font-bold ${conflictType === t.id ? 'text-purple-400' : 'text-gray-400'}`}>{t.label}</p>
              <p className="text-gray-600 text-xs">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* WHAT HAPPENED */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">WHAT HAPPENED? TELL US EVERYTHING.</label>
        <textarea
          value={whatHappened}
          onChange={e => setWhatHappened(e.target.value)}
          placeholder="Just tell us the whole story in your own words. Don't worry about how you say it. Include what they did, what you did, any history, what's been said. The more detail, the better help we can give you."
          className="w-full h-44 bg-black border-2 border-white/20 focus:border-purple-500 text-white text-sm p-4 resize-none outline-none font-mono placeholder-gray-700 transition-colors"
        />
      </div>

      {/* GOAL */}
      <div className="space-y-2">
        <label className="text-gray-400 font-mono text-xs tracking-widest">WHAT DO YOU WANT TO ACHIEVE?</label>
        <div className="grid grid-cols-2 gap-2">
          {GOALS.map(g => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={`p-3 border text-left transition-all ${
                goal === g.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <p className={`font-mono text-xs font-bold ${goal === g.id ? 'text-purple-400' : 'text-gray-400'}`}>{g.label}</p>
              <p className="text-gray-600 text-xs">{g.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ANALYSE BUTTON */}
      <motion.button
        onClick={analyse}
        disabled={!whatHappened.trim() || loading}
        whileHover={!loading && whatHappened.trim() ? { scale: 1.02 } : {}}
        whileTap={!loading && whatHappened.trim() ? { scale: 0.98 } : {}}
        className={`w-full py-4 font-black font-mono text-lg tracking-widest border-2 transition-all ${
          whatHappened.trim() && !loading
            ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10 cursor-pointer'
            : 'border-white/10 text-gray-700 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <motion.div className="w-2 h-2 rounded-full bg-purple-400" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <span>ANALYSING YOUR SITUATION...</span>
          </div>
        ) : 'GET MY CONFLICT PLAN →'}
      </motion.button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* SITUATION ASSESSMENT */}
            <Block label="SITUATION ASSESSMENT" color="purple">
              <p className="text-white text-sm leading-relaxed">{result.situation_assessment}</p>
            </Block>

            {/* LEGAL POSITION */}
            <Block label="YOUR LEGAL POSITION" color="cyan">
              <p className="text-white text-sm leading-relaxed">{result.legal_position}</p>
              <p className="text-gray-600 text-xs mt-2 italic">This is general guidance, not legal advice. For complex cases, seek a solicitor.</p>
            </Block>

            {/* RECOMMENDED STEPS */}
            <Block label="WHAT TO DO" color="green">
              <ol className="space-y-2">
                {result.recommended_steps?.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-400 font-black font-mono text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                    <p className="text-white text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </Block>

            {/* WHAT TO SAY */}
            {result.what_to_say && (
              <Block label="WHAT TO SAY / SEND" color="purple">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">{result.what_to_say}</pre>
                <motion.button
                  onClick={() => copy(result.what_to_say, 'say')}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 px-4 py-2 border border-purple-500/40 text-purple-400 font-mono text-xs hover:bg-purple-500/10 transition-all"
                >
                  {copied === 'say' ? '✓ COPIED' : 'COPY THIS →'}
                </motion.button>
              </Block>
            )}

            {/* WHAT NOT TO DO */}
            <Block label="WHAT NOT TO DO" color="red">
              {result.what_not_to_do?.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-400 text-xs mt-0.5">✕</span>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </Block>

            {/* IF IT ESCALATES */}
            {result.if_it_escalates && (
              <Block label="IF IT ESCALATES" color="yellow">
                <p className="text-white text-sm leading-relaxed">{result.if_it_escalates}</p>
              </Block>
            )}

            <div className="flex gap-3 pt-2">
              <motion.button
                onClick={() => { setResult(null); setWhatHappened(''); setConflictType(''); }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 border-2 border-white/20 hover:border-white/40 text-gray-500 hover:text-white font-mono text-xs tracking-widest transition-all"
              >
                NEW SITUATION
              </motion.button>
            </div>

            <p className="text-gray-700 font-mono text-xs text-center">Nothing stored. Nothing seen. Yours alone. ♾️</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Block({ label, color, children }) {
  const colors = {
    purple: 'border-purple-500/40 text-purple-400',
    cyan: 'border-cyan-500/40 text-cyan-400',
    green: 'border-green-500/40 text-green-400',
    red: 'border-red-500/40 text-red-400',
    yellow: 'border-yellow-500/40 text-yellow-400',
  };
  const c = colors[color] || colors.purple;
  return (
    <div className={`border ${c} p-5 space-y-3`}>
      <p className={`font-mono text-xs tracking-widest ${c.split(' ')[1]}`}>{label}</p>
      {children}
    </div>
  );
}