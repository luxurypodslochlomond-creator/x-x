import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const LETTER_TYPES = [
  'Council tax', 'Energy bill', 'Rent / landlord', 'Debt collector',
  'NHS / medical', 'School / college', 'Employer / HR', 'Parking fine',
  'Benefits / DWP', 'Court / legal', 'Immigration', 'Other',
];

const SEVERITY_CONFIG = {
  'NOT URGENT':    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.3)' },
  'NEEDS ATTENTION': { color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
  'URGENT':        { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
  'VERY URGENT':   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)' },
};

export default function Family51LetterDecoder({ accentColor = '#f97316' }) {
  const [letterText, setLetterText] = useState('');
  const [letterType, setLetterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const decode = async () => {
    if (!letterText.trim() || loading) return;
    setLoading(true);
    setResult(null);

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a compassionate UK citizens advice expert. A person has received this official letter${letterType ? ` (type: ${letterType})` : ''} and needs help understanding it.

LETTER:
${letterText}

Return:
- what_this_means: Plain English, 2-3 sentences, zero jargon, warm tone
- severity: One of exactly: NOT URGENT / NEEDS ATTENTION / URGENT / VERY URGENT
- severity_explanation: One sentence on why that rating
- action_steps: Array of exactly 3 clear numbered actions to take
- key_deadline: Any date/deadline mentioned, or "No deadline mentioned"
- dont_panic: One honest, reassuring sentence`,
      response_json_schema: {
        type: 'object',
        properties: {
          what_this_means:    { type: 'string' },
          severity:           { type: 'string' },
          severity_explanation: { type: 'string' },
          action_steps:       { type: 'array', items: { type: 'string' } },
          key_deadline:       { type: 'string' },
          dont_panic:         { type: 'string' },
        },
      },
    });

    setResult(response);
    setLoading(false);
  };

  const copyAll = () => {
    if (!result) return;
    const text = `DECODED BY FAMILY51\n\n${result.what_this_means}\n\nSEVERITY: ${result.severity}\n${result.severity_explanation}\n\nACTIONS:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nDEADLINE: ${result.key_deadline}\n\nDON'T PANIC: ${result.dont_panic}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;

  return (
    <div className="space-y-5">

      {/* TYPE CHIPS */}
      <div className="space-y-2">
        <Label>TYPE OF LETTER (optional)</Label>
        <div className="flex flex-wrap gap-2">
          {LETTER_TYPES.map(type => (
            <Chip key={type} active={letterType === type} color={accentColor} onClick={() => setLetterType(letterType === type ? '' : type)}>
              {type}
            </Chip>
          ))}
        </div>
      </div>

      {/* PASTE AREA */}
      <div className="space-y-2">
        <Label>PASTE YOUR LETTER</Label>
        <textarea
          value={letterText}
          onChange={e => setLetterText(e.target.value)}
          placeholder="Paste the full letter here. Don't worry about formatting — just get it all in. The more you paste, the better we can help."
          style={{
            width: '100%', height: 180, background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${letterText ? accentColor + '50' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 12, color: '#fff', fontSize: 13, padding: '14px 16px',
            resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
            transition: 'border-color 0.2s', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = accentColor + '80'}
          onBlur={e => e.target.style.borderColor = letterText ? accentColor + '50' : 'rgba(255,255,255,0.1)'}
        />
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>Nothing stored. Nothing sent anywhere. Processed and gone.</p>
      </div>

      {/* DECODE BUTTON */}
      <motion.button
        onClick={decode}
        disabled={!letterText.trim() || loading}
        whileTap={!loading && letterText.trim() ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 13,
          fontWeight: 800, letterSpacing: '0.12em', cursor: letterText.trim() && !loading ? 'pointer' : 'not-allowed',
          border: `1px solid ${letterText.trim() ? accentColor : 'rgba(255,255,255,0.1)'}`,
          background: letterText.trim() ? `${accentColor}15` : 'transparent',
          color: letterText.trim() ? accentColor : 'rgba(255,255,255,0.2)',
          transition: 'all 0.2s',
        }}
      >
        {loading ? <Spinner color={accentColor} text="DECODING YOUR LETTER" /> : 'DECODE THIS LETTER'}
      </motion.button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

            {/* SEVERITY */}
            {sev && (
              <div style={{ background: sev.bg, border: `1px solid ${sev.border}`, borderRadius: 12, padding: '14px 18px' }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: sev.color }}>SEVERITY</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: sev.color, letterSpacing: '0.05em' }}>{result.severity}</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{result.severity_explanation}</p>
              </div>
            )}

            <ResultCard label="WHAT THIS MEANS" color={accentColor}>
              <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.65, margin: 0 }}>{result.what_this_means}</p>
            </ResultCard>

            <ResultCard label="WHAT TO DO" color="#06b6d4">
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.action_steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#06b6d4', minWidth: 18, paddingTop: 2 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </ResultCard>

            <ResultCard label="KEY DEADLINE" color="#eab308">
              <p style={{ fontSize: 13, color: '#fff', margin: 0 }}>{result.key_deadline}</p>
            </ResultCard>

            <ResultCard label="DON'T PANIC" color="#22c55e">
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>{result.dont_panic}</p>
            </ResultCard>

            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
              <motion.button onClick={copyAll} whileTap={{ scale: 0.95 }} style={secondaryBtn}>
                {copied ? 'COPIED' : 'COPY BREAKDOWN'}
              </motion.button>
              <motion.button onClick={() => { setResult(null); setLetterText(''); setLetterType(''); }} whileTap={{ scale: 0.95 }} style={{ ...secondaryBtn, color: accentColor, borderColor: accentColor + '40' }}>
                DECODE ANOTHER
              </motion.button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

function Label({ children }) {
  return <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 0 }}>{children}</p>;
}

function Chip({ active, color, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
      border: `1px solid ${active ? color : 'rgba(255,255,255,0.12)'}`,
      background: active ? `${color}15` : 'transparent',
      color: active ? color : 'rgba(255,255,255,0.4)',
      transition: 'all 0.15s',
    }}>
      {children}
    </button>
  );
}

function ResultCard({ label, color, children }) {
  return (
    <div style={{ border: `1px solid ${color}25`, borderRadius: 12, padding: '14px 18px', background: `${color}06` }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: color + 'cc', marginBottom: 10 }}>{label}</p>
      {children}
    </div>
  );
}

function Spinner({ color, text }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <motion.span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: color }}
        animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
      {text}
    </span>
  );
}

const secondaryBtn = {
  flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent', color: 'rgba(255,255,255,0.4)', transition: 'all 0.15s',
};