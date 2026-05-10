import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Typewriter hook — reveals text character by character
function useTypewriter(text, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled || !text) { setDisplayed(text || ''); setDone(true); return; }
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    let last = 0;
    const tick = (now) => {
      if (now - last >= speed) {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        last = now;
        if (indexRef.current >= text.length) { setDone(true); return; }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, speed, enabled]);

  return { displayed, done };
}

// Section that fades in after a delay
function FadeSection({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const SEVERITY_CONFIG = {
  'NOT URGENT':      { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)' },
  'NEEDS ATTENTION': { color: '#eab308', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.25)' },
  'URGENT':          { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)' },
  'VERY URGENT':     { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)' },
};

export default function SortedStreamingResult({ result, accentColor = '#f97316', onHandoff, onReset, caseId }) {
  const [saved, setSaved] = useState(false);
  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;

  // Typewriter on the key human-facing field — what_this_means
  const { displayed: displayedMeans, done: meansDone } = useTypewriter(result?.what_this_means || '', 12, true);

  const buildText = () =>
    `SORTED — Your Letter Breakdown\n\n` +
    (result.we_hear_you ? result.we_hear_you + '\n\n' : '') +
    `WHAT THIS MEANS:\n${result.what_this_means}\n\n` +
    `URGENCY: ${result.severity}\n` +
    (result.key_deadline && result.key_deadline !== 'No deadline mentioned' ? `DEADLINE: ${result.key_deadline}\n\n` : '\n') +
    (result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' ? `AMOUNT: ${result.financial_impact}\n\n` : '') +
    `WHAT TO DO:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
    (result.free_help?.length > 0 ? `FREE HELP:\n${result.free_help.join('\n')}\n\n` : '') +
    `Via SORTED — uf51.love/Sorted\nGuidance only, not legal advice.`;

  const handleSave = async () => {
    const text = buildText();
    // Try native share first (iOS/Android share sheet — best UX)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SORTED — Letter Breakdown', text });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        return;
      } catch (_) { /* user cancelled or share failed — fall through */ }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      // Last resort: select a textarea
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!result || !sev) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* WRITE REPLY CTA — top, immediately */}
      {onHandoff && (
        <FadeSection delay={0}>
          <motion.button
            onClick={() => onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, what_this_means: result.what_this_means, suggestedTone: result.suggested_tone, related_case_id: caseId })}
            whileTap={{ opacity: 0.7 }}
            style={{
              width: '100%', padding: '18px 0', borderRadius: 14, fontSize: 14,
              fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer',
              border: `2px solid ${accentColor}`,
              background: accentColor, color: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }}
          >
            WRITE MY REPLY NOW
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </FadeSection>
      )}

      {/* QUICK REASSURANCE — first content block */}
      {result.quick_reassurance && (
        <FadeSection delay={0.1}>
          <div style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(34,197,94,0.6)', margin: '0 0 10px' }}>AT A GLANCE</p>
            {result.quick_reassurance.split('\n').filter(Boolean).map((line, i) => (
              <p key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: i === 0 ? 0 : '6px 0 0', fontWeight: 500 }}>{line}</p>
            ))}
          </div>
        </FadeSection>
      )}

      {/* SEVERITY HEADER */}
      <FadeSection delay={0.2}>
        <div style={{ borderRadius: 14, padding: '20px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: 2, ease: 'easeInOut' }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: sev.color, flexShrink: 0, boxShadow: `0 0 8px ${sev.color}` }}
            />
            <span style={{ fontSize: 10, fontWeight: 800, color: sev.color, letterSpacing: '0.14em' }}>{result.severity}</span>
            {result.sender && result.sender !== 'Unknown' && (
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto', letterSpacing: '0.04em' }}>{result.sender}</span>
            )}
          </div>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.25 }}>{result.letter_summary || 'Official letter'}</p>
          {result.dont_panic && (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 10px', lineHeight: 1.55, fontStyle: 'italic' }}>{result.dont_panic}</p>
          )}
          {result.key_deadline && result.key_deadline !== 'No deadline mentioned' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, background: `${sev.color}12`, border: `1px solid ${sev.color}30` }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: sev.color }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: sev.color }}>Respond by: {result.key_deadline}</span>
            </div>
          )}
        </div>
      </FadeSection>

      {/* WHAT THIS MEANS — typewriter reveal */}
      <FadeSection delay={0.3}>
        <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 10px' }}>WHAT THIS MEANS</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
            {displayedMeans}
            {!meansDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block', width: 2, height: 16, background: accentColor, marginLeft: 2, borderRadius: 1, verticalAlign: 'middle' }}
              />
            )}
          </p>
        </div>
      </FadeSection>

      {/* WHAT TO DO — staggered steps */}
      {meansDone && (
        <FadeSection delay={0.05}>
          <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 12px' }}>WHAT TO DO</p>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.action_steps?.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                >
                  <span style={{ fontSize: 10, fontWeight: 900, color: accentColor, minWidth: 18, paddingTop: 3, flexShrink: 0, letterSpacing: '0.05em' }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </FadeSection>
      )}

      {/* MONEY — only if real */}
      {meansDone && result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' && (
        <FadeSection delay={0.1}>
          <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 6px' }}>AMOUNT INVOLVED</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>{result.financial_impact}</p>
          </div>
        </FadeSection>
      )}

      {/* GOOD TO KNOW */}
      {meansDone && result.if_you_ignore_this && (
        <FadeSection delay={0.15}>
          <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(234,179,8,0.04)', border: '1px solid rgba(234,179,8,0.12)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(234,179,8,0.5)', margin: '0 0 8px' }}>GOOD TO KNOW</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{result.if_you_ignore_this}</p>
          </div>
        </FadeSection>
      )}

      {/* FREE HELP */}
      {meansDone && result.free_help?.length > 0 && (
        <FadeSection delay={0.2}>
          <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(34,197,94,0.5)', margin: '0 0 10px' }}>FREE HELP AVAILABLE</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.free_help.map((help, i) => (
                <p key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, paddingLeft: 12, borderLeft: '1px solid rgba(34,197,94,0.2)' }}>{help}</p>
              ))}
            </div>
          </div>
        </FadeSection>
      )}

      {/* ACTIONS */}
      {meansDone && (
        <FadeSection delay={0.25}>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* SAVE / SHARE — native share sheet on mobile, clipboard fallback */}
            <button
              onClick={handleSave}
              style={{
                flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 12, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: '1px solid rgba(34,197,94,0.4)',
                background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.07)',
                color: '#22c55e',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                transition: 'all 0.2s',
              }}
            >
              {saved ? (
                <span>✓ SAVED</span>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {navigator.share
                      ? <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></>
                      : <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>
                    }
                  </svg>
                  {navigator.share ? 'SHARE / SAVE' : 'COPY TO CLIPBOARD'}
                </>
              )}
            </button>
            <button
              onClick={onReset}
              style={{ flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.4)', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              NEW LETTER
            </button>
          </div>
        </FadeSection>
      )}

      {/* REAL PEOPLE */}
      {meansDone && (
        <FadeSection delay={0.3}>
          <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(6,182,212,0.6)', margin: '0 0 10px' }}>WANT TO TALK TO A REAL PERSON?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'Citizens Advice', desc: 'free, confidential advice on debt, benefits & legal issues', url: 'https://www.citizensadvice.org.uk' },
                { name: 'StepChange', desc: 'free debt advice & repayment plans · 0800 138 1111', url: 'https://www.stepchange.org' },
                { name: 'Debt Camel', desc: 'plain English debt guides by Sara Williams', url: 'https://debtcamel.co.uk' },
              ].map(({ name, desc, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                  <span><strong style={{ color: 'rgba(255,255,255,0.85)' }}>{name}</strong> — {desc}</span>
                </a>
              ))}
            </div>
          </div>
        </FadeSection>
      )}

      {/* DISCLAIMER */}
      {meansDone && (
        <FadeSection delay={0.35}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6, margin: '4px 0 0', padding: '0 8px' }}>
            SORTED provides general information to help you understand letters — not regulated legal or financial advice. Always seek free expert guidance from{' '}
            <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>Citizens Advice</a> or{' '}
            <a href="https://www.nationaldebtline.org" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>National Debtline</a> before taking action.
          </p>
        </FadeSection>
      )}

    </div>
  );
}