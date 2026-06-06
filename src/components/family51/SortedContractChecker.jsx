import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const CONTRACT_TYPES = [
  { id: 'tenancy', label: 'Tenancy / Lease' },
  { id: 'employment', label: 'Employment' },
  { id: 'settlement', label: 'Settlement / Redundancy' },
  { id: 'service', label: 'Service / T&Cs' },
  { id: 'other', label: 'Other contract' },
];

const STEPS = ['Reading it…', 'Finding the traps…', 'Spotting your leverage…', 'Almost done…'];

export default function SortedContractChecker({ accentColor = '#7c3aed' }) {
  const [contractType, setContractType] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const analyse = async () => {
    if (!text.trim() || text.trim().length < 50) return;
    setLoading(true);
    setStepIdx(0);
    setResult(null);

    const interval = setInterval(() => {
      setStepIdx(i => Math.min(i + 1, STEPS.length - 1));
    }, 2200);

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a plain-English contract expert helping ordinary people understand what they're signing.

Contract type: ${contractType || 'Not specified'}

CONTRACT TEXT:
${text}

Analyse this contract and respond ONLY with valid JSON in this exact format:
{
  "summary": "2-3 sentence plain English summary of what this contract is and what it commits the person to",
  "red_flags": ["list of concerning clauses, unfair terms, or things that could harm the person — each as a short plain sentence"],
  "negotiate": ["list of specific things they could try to negotiate or push back on — practical and actionable"],
  "questions": ["list of questions they should ask before signing"],
  "verdict": "one of: looks_ok | review_carefully | serious_concerns",
  "verdict_reason": "one sentence explaining the verdict"
}`,
      response_json_schema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          red_flags: { type: 'array', items: { type: 'string' } },
          negotiate: { type: 'array', items: { type: 'string' } },
          questions: { type: 'array', items: { type: 'string' } },
          verdict: { type: 'string' },
          verdict_reason: { type: 'string' },
        },
      },
    });

    clearInterval(interval);

    // Save to case history
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
      cases.unshift({
        id: Date.now(),
        tool: 'contract',
        input_text: text.slice(0, 300),
        ai_result: JSON.stringify(res),
        summary: res.verdict_reason || res.summary?.slice(0, 100),
        severity: res.verdict === 'serious_concerns' ? 'urgent' : res.verdict === 'review_carefully' ? 'important' : 'routine',
        created_date: new Date().toISOString(),
      });
      localStorage.setItem('sorted_case_history_v1', JSON.stringify(cases.slice(0, 20)));
    } catch {}

    setResult(res);
    setLoading(false);
  };

  const copyAll = () => {
    if (!result) return;
    const txt = [
      `SORTED CONTRACT ANALYSIS`,
      ``,
      `SUMMARY\n${result.summary}`,
      ``,
      `VERDICT\n${result.verdict_reason}`,
      result.red_flags?.length ? `\nRED FLAGS\n${result.red_flags.map(f => `• ${f}`).join('\n')}` : '',
      result.negotiate?.length ? `\nWHAT TO NEGOTIATE\n${result.negotiate.map(n => `• ${n}`).join('\n')}` : '',
      result.questions?.length ? `\nQUESTIONS TO ASK\n${result.questions.map(q => `• ${q}`).join('\n')}` : '',
      `\nAnalysed by SORTED — sorted.ai`,
    ].join('\n');
    navigator.clipboard.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const verdictStyle = {
    looks_ok:          { color: '#059669', bg: 'rgba(5,150,105,0.1)',  border: 'rgba(5,150,105,0.3)',  label: 'Looks OK' },
    review_carefully:  { color: '#f5a623', bg: 'rgba(245,166,35,0.1)', border: 'rgba(245,166,35,0.3)', label: 'Review Carefully' },
    serious_concerns:  { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  label: 'Serious Concerns' },
  };
  const vs = result ? (verdictStyle[result.verdict] || verdictStyle.review_carefully) : null;

  return (
    <div style={{ padding: '20px 0' }}>
      <AnimatePresence mode="wait">

        {/* ── INPUT ── */}
        {!loading && !result && (
          <motion.div key="input" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.55)', marginBottom: 14, lineHeight: 1.5 }}>
              Paste any contract — tenancy, employment, T&Cs. We decode it in plain English and flag anything dodgy.
            </p>

            {/* Contract type chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {CONTRACT_TYPES.map(t => (
                <button key={t.id} onClick={() => setContractType(t.id === contractType ? '' : t.id)}
                  style={{ fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20,
                    border: `1.5px solid ${contractType === t.id ? accentColor : 'rgba(26,18,8,0.15)'}`,
                    background: contractType === t.id ? `${accentColor}15` : 'transparent',
                    color: contractType === t.id ? accentColor : 'rgba(26,18,8,0.55)',
                    cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
                  {t.label}
                </button>
              ))}
            </div>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your contract text here…"
              rows={8}
              style={{ width: '100%', padding: '14px', borderRadius: 12, border: '1.5px solid rgba(26,18,8,0.15)',
                background: '#fff', fontSize: 14, lineHeight: 1.6, color: '#1a1208', resize: 'vertical',
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
            <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.35)', margin: '6px 0 16px' }}>
              Nothing is saved or shared. Processed and discarded.
            </p>

            <button onClick={analyse} disabled={text.trim().length < 50}
              style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none',
                background: text.trim().length >= 50 ? accentColor : 'rgba(26,18,8,0.1)',
                color: text.trim().length >= 50 ? '#fff' : 'rgba(26,18,8,0.3)',
                fontSize: 15, fontWeight: 800, cursor: text.trim().length >= 50 ? 'pointer' : 'default',
                letterSpacing: '-0.01em', transition: 'all 0.15s' }}>
              Analyse Contract
            </button>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${accentColor}30`,
              borderTop: `3px solid ${accentColor}`, margin: '0 auto 20px', animation: 'spin 0.9s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1208', margin: '0 0 6px' }}>{STEPS[stepIdx]}</p>
            <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.4)', margin: 0 }}>Reading every clause…</p>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {!loading && result && (
          <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>

            {/* Verdict badge */}
            <div style={{ padding: '12px 16px', borderRadius: 10, border: `1.5px solid ${vs.border}`,
              background: vs.bg, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: vs.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: vs.color }}>{vs.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(26,18,8,0.6)', lineHeight: 1.4 }}>{result.verdict_reason}</div>
              </div>
            </div>

            {/* Summary */}
            <Section title="In Plain English" color={accentColor}>
              <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.75)', lineHeight: 1.6, margin: 0 }}>{result.summary}</p>
            </Section>

            {/* Red flags */}
            {result.red_flags?.length > 0 && (
              <Section title={`Red Flags (${result.red_flags.length})`} color="#ef4444">
                {result.red_flags.map((f, i) => <BulletItem key={i} text={f} color="#ef4444" />)}
              </Section>
            )}

            {/* Negotiate */}
            {result.negotiate?.length > 0 && (
              <Section title="What to Negotiate" color="#f5a623">
                {result.negotiate.map((n, i) => <BulletItem key={i} text={n} color="#f5a623" />)}
              </Section>
            )}

            {/* Questions */}
            {result.questions?.length > 0 && (
              <Section title="Questions to Ask Before Signing" color={accentColor}>
                {result.questions.map((q, i) => <BulletItem key={i} text={q} color={accentColor} />)}
              </Section>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button onClick={copyAll}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: `1.5px solid ${accentColor}40`,
                  background: copied ? `${accentColor}15` : 'transparent', color: accentColor,
                  fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {copied ? '✓ Copied' : 'Copy Analysis'}
              </button>
              <button onClick={() => { setResult(null); setText(''); setContractType(''); }}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid rgba(26,18,8,0.15)',
                  background: 'transparent', color: 'rgba(26,18,8,0.55)',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                New Contract
              </button>
            </div>

            <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.3)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
              Not legal advice. Always consult a solicitor for important decisions.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 14, padding: '14px', borderRadius: 10,
      border: `1px solid ${color}25`, background: `${color}06` }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color, margin: '0 0 10px' }}>{title.toUpperCase()}</p>
      {children}
    </div>
  );
}

function BulletItem({ text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, marginTop: 6, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.7)', lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}