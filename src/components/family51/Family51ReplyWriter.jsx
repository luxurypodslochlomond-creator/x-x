import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import GeoSelector from './GeoSelector';
import SortedShareButton from './SortedShareButton';

const SITUATIONS = [
  'Disputing a bill', 'Replying to landlord', 'Debt collector',
  'Council decision', 'Employer / HR', 'Neighbour dispute',
  'Appeal a fine', 'Request my rights', 'Other',
];

const TONES = [
  { id: 'firm',   label: 'FIRM',    desc: 'Professional. No pushover.' },
  { id: 'calm',   label: 'CALM',    desc: 'Neutral. De-escalate.' },
  { id: 'urgent', label: 'URGENT',  desc: 'Assert. Make them act.' },
  { id: 'formal', label: 'FORMAL',  desc: 'Legal weight.' },
];

export default function Family51ReplyWriter({ accentColor = '#06b6d4', onResult, prefillContext, onHandoff, suggestedTone, relatedCaseId }) {
  const [situation, setSituation] = useState('');
  const buildContext = (pc) => {
    if (!pc) return '';
    return `Replying to: ${pc.sender || 'unknown sender'}\nLetter summary: ${pc.summary || ''}\n${pc.deadline && pc.deadline !== 'No deadline mentioned' ? `Key deadline: ${pc.deadline}\n` : ''}${pc.what_this_means ? `\nBackground: ${pc.what_this_means}` : ''}`;
  };

  const [context, setContext] = useState(() => buildContext(prefillContext));

  // Sync context if prefillContext changes after mount (e.g. new decode handoff)
  useEffect(() => {
    if (prefillContext) {
      setContext(buildContext(prefillContext));
      setResult(null);
      setError(null);
    }
  }, [prefillContext]);
  const [tone, setTone]           = useState(() => suggestedTone || 'firm');
  const [name, setName]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [resultTone, setResultTone] = useState(null);
  const [copied, setCopied]       = useState(false);
  const [emailAddr, setEmailAddr] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailing, setEmailing]   = useState(false);
  const [geo, setGeo]             = useState(() => detectGeo());
  const [alternatives, setAlternatives] = useState([]);
  const [emailPreviewOpen, setEmailPreviewOpen] = useState(false);
  const [error, setError] = useState(null);

  const generateLetter = async (selectedTone) => {
    const t = TONES.find(x => x.id === selectedTone);
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    const prompt = `You write with precision, warmth, and power for ordinary people — no jargon, no fluff, just letters that work. Today's date is ${today}. The person is in: ${geo.country}. Apply ${geo.jurisdiction} — use locally correct rights, legal references, regulatory bodies, and exact terminology.

SITUATION: ${situation || 'Not specified'}
TONE: ${t?.label} — ${t?.desc}
NAME: ${name || '[Your Name]'}

CONTEXT:
${context}

Write a complete, ready-to-send letter. Must be:
- Structured with proper greeting, body paragraphs, and sign-off
- ${t?.id === 'formal' ? 'Formally' : 'Professionally'} worded — no fluff, no waffle
- Protecting their legal position with accuracy — cite actual rights, actual bodies, actual legislation where relevant to ${geo.jurisdiction}
- Specific — name the issue, name the deadline, name what you want
- Ready to copy and paste immediately with zero edits needed

Return subject line, full letter body, 2-3 key points it makes, and one important tip the person must know before sending.`;

    const schema = {
      type: 'object',
      properties: {
        subject_line: { type: 'string' },
        letter_body:  { type: 'string' },
        key_points:   { type: 'array', items: { type: 'string' } },
        tip:          { type: 'string' },
      },
    };

    const attemptGenerate = async (useModel) => {
      const opts = { prompt, response_json_schema: schema };
      if (useModel) opts.model = useModel;
      const response = await base44.integrations.Core.InvokeLLM(opts);
      console.log('[ReplyWriter] Raw LLM response:', JSON.stringify(response)?.slice(0, 300));
      // Normalise — some models nest under different keys
      if (response && typeof response === 'object') {
        const body = response.letter_body || response.body || response.letter || response.text || response.content;
        if (body) {
          return {
            subject_line: response.subject_line || response.subject || 'Your reply',
            letter_body: body,
            key_points: response.key_points || response.keyPoints || [],
            tip: response.tip || response.important_tip || '',
          };
        }
      }
      return null;
    };

    // Try claude first, then fall back to default
    let result = null;
    try {
      result = await attemptGenerate('claude_sonnet_4_6');
    } catch (err) {
      console.warn('SORTED: claude_sonnet_4_6 failed:', err?.message);
    }
    if (!result) {
      try {
        result = await attemptGenerate(null);
      } catch (err2) {
        console.error('SORTED: fallback also failed:', err2?.message);
        throw new Error('Could not generate your letter. Please check your connection and try again.');
      }
    }
    if (!result) {
      throw new Error('The AI returned an empty response. Please try again.');
    }
    return result;
  };

  const write = async () => {
    if (loading) return;
    if (!context.trim()) { setError('Please describe the situation first.'); return; }
    setLoading(true);
    setResult(null);
    setAlternatives([]);
    setError(null);
    console.log('[ReplyWriter] Writing reply, tone:', tone, 'context length:', context.length);

    try {
      const response = await generateLetter(tone);
      console.log('[ReplyWriter] Got response:', !!response);
      if (!response || !response.letter_body) {
        throw new Error('No letter was generated. Please try again.');
      }
      setResult(response);
      setResultTone(tone);
      onResult?.();
      // Save to local case history — no login needed
      saveCaseToHistory({
        tool: 'reply',
        input_text: context,
        ai_result: JSON.stringify(response),
        summary: response.subject_line || 'Written reply',
        severity: 'unknown',
        related_case_id: relatedCaseId || null,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const regenerateWithDifferentTone = async (newTone) => {
    if (!context.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await generateLetter(newTone);
      setAlternatives(prev => [...prev, response]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!emailAddr.trim() || !result || emailing) return;
    setEmailing(true);
    try {
      const body = `SORTED wrote your reply.\n\n─────────────────────\nSUBJECT: ${result.subject_line}\n─────────────────────\n\n${result.letter_body}\n\n─────────────────────\nKEY POINTS\n─────────────────────\n${result.key_points?.map(p => `— ${p}`).join('\n')}\n\nTIP: ${result.tip}\n\n─────────────────────\nSORTED — sorted.family51.com\nNothing is stored. This email was sent at your request only.`;
      await base44.integrations.Core.SendEmail({ to: emailAddr.trim(), subject: `Your SORTED reply — ${result.subject_line || 'Ready to send'}`, body });
      setEmailSent(true);
      setEmailPreviewOpen(false);
    } catch (err) {
      setError(`Email failed: ${err?.message || 'Could not send'}. Try again.`);
    } finally {
      setEmailing(false);
    }
  };

  const copyLetter = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.subject_line}\n\n${result.letter_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="space-y-5">

      {/* ERROR */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)' }}>
            <p style={{ fontSize: 12, color: '#ef4444', margin: '0 0 8px', fontWeight: 800 }}>⚠ {error}</p>
            <button onClick={() => setError(null)} style={{ fontSize: 10, color: '#ef4444', background: 'none', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 700 }}>Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREFILL BANNER — shown when handed off from decoder */}
      {prefillContext && (
        <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 16 }}>✓</span>
          <p style={{ fontSize: 12, color: 'rgba(6,182,212,0.9)', margin: 0, fontWeight: 700 }}>
            Letter loaded — pick a tone, add your name, hit write.
          </p>
        </div>
      )}

      {/* GEO SELECTOR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>YOUR LOCATION</span>
        <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
      </div>

      {/* SITUATION CHIPS — only show if no prefill */}
      {!prefillContext && (
        <div className="space-y-2">
          <Label>SITUATION TYPE (optional)</Label>
          <div className="flex flex-wrap gap-2">
            {SITUATIONS.map(s => (
              <Chip key={s} active={situation === s} color={accentColor} onClick={() => setSituation(situation === s ? '' : s)}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* TONE — moved above context so user picks vibe first */}
      <div className="space-y-2">
        <Label>TONE {suggestedTone && <span style={{ color: accentColor, marginLeft: 4 }}>★ AI suggested</span>}</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {TONES.map(t => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              style={{
                padding: '10px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                border: `1px solid ${tone === t.id ? accentColor + '70' : 'rgba(255,255,255,0.08)'}`,
                background: tone === t.id ? `${accentColor}12` : 'rgba(255,255,255,0.02)',
                transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              {suggestedTone === t.id && (
                <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: accentColor }}>★</span>
              )}
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: tone === t.id ? accentColor : 'rgba(255,255,255,0.5)', margin: 0 }}>{t.label}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CONTEXT */}
      <div className="space-y-2">
        <Label>TELL US THE SITUATION</Label>
        <textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="Who are you writing to? What happened? What do you want? Don't filter it — we'll handle the writing."
          style={{
            width: '100%', height: prefillContext ? 100 : 140, background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${context ? accentColor + '50' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 12, color: '#fff', fontSize: 13, padding: '12px 14px',
            resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
            transition: 'border-color 0.2s', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = accentColor + '80'}
          onBlur={e => e.target.style.borderColor = context ? accentColor + '50' : 'rgba(255,255,255,0.1)'}
        />
      </div>

      {/* NAME */}
      <div className="space-y-2">
        <Label>YOUR NAME (optional — for sign-off)</Label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Brian Hughes"
          style={{
            width: '100%', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
            color: '#fff', fontSize: 13, padding: '11px 14px',
            outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* WRITE BUTTON */}
      <motion.button
        onClick={write}
        disabled={loading}
        whileTap={!loading ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 13,
          fontWeight: 800, letterSpacing: '0.12em', cursor: !loading ? 'pointer' : 'not-allowed',
          border: `1px solid ${accentColor}50`,
          background: `${accentColor}15`,
          color: accentColor,
          transition: 'all 0.2s',
        }}
      >
        {loading ? <Spinner color={accentColor} text="WRITING YOUR REPLY" /> : 'WRITE MY REPLY'}
      </motion.button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

            {/* KEY POINTS */}
            {result.key_points?.length > 0 && (
              <div style={{ border: `1px solid ${accentColor}25`, borderRadius: 12, padding: '14px 18px', background: `${accentColor}06` }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: accentColor + 'cc', marginBottom: 10 }}>KEY POINTS</p>
                <div className="space-y-1.5">
                  {result.key_points.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: accentColor, fontSize: 10, paddingTop: 3 }}>—</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LETTER */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '18px 20px', background: 'rgba(255,255,255,0.02)' }}>
              {result.subject_line && (
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12, marginBottom: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: '0 0 4px' }}>SUBJECT</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{result.subject_line}</p>
                </div>
              )}
              <pre style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.7, margin: 0 }}>{result.letter_body}</pre>
            </div>

            {/* TIP */}
            {result.tip && (
              <div style={{ border: '1px solid rgba(234,179,8,0.25)', borderRadius: 10, padding: '12px 16px', background: 'rgba(234,179,8,0.06)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: '#eab308', marginBottom: 6 }}>IMPORTANT TIP</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{result.tip}</p>
              </div>
            )}

            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button onClick={copyLetter} whileTap={{ scale: 0.95 }} style={{ ...primaryBtn, borderColor: accentColor, color: accentColor, background: `${accentColor}15` }}>
                {copied ? 'COPIED — READY TO SEND' : 'COPY LETTER'}
              </motion.button>
              <motion.button onClick={() => { setResult(null); setContext(''); setSituation(''); setEmailSent(false); setEmailAddr(''); setAlternatives([]); }} whileTap={{ scale: 0.95 }} style={secondaryBtn}>
                WRITE ANOTHER
              </motion.button>
            </div>

            {/* SEND IN YOUR EMAIL APP */}
            <SendInEmailApp result={result} accentColor={accentColor} />

            {/* REGENERATE WITH DIFFERENT TONE */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: '0 0 10px' }}>SWAP TONE (GET ALTERNATIVE VERSION)</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {TONES.filter(t => t.id !== tone).map(t => (
                  <motion.button
                    key={t.id}
                    onClick={() => regenerateWithDifferentTone(t.id)}
                    disabled={loading}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                    style={{
                      padding: '10px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                      border: `1px solid rgba(255,255,255,0.12)`, background: 'rgba(255,255,255,0.02)',
                      color: 'rgba(255,255,255,0.4)', cursor: !loading ? 'pointer' : 'not-allowed',
                      transition: 'all 0.15s', opacity: loading ? 0.5 : 1,
                    }}
                  >
                    {loading ? '...' : `Try ${t.label}`}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* HANDOFF — escalate to dispute help */}
            {onHandoff && (
              <motion.button
                onClick={onHandoff}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '14px 0', borderRadius: 12, fontSize: 12,
                  fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer',
                  border: '1px solid rgba(239,68,68,0.4)',
                  background: 'rgba(239,68,68,0.08)', color: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'all 0.15s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                THEY IGNORED ME — GET DISPUTE HELP
              </motion.button>
            )}

            {/* EMAIL TO SELF */}
            <EmailToSelf emailAddr={emailAddr} setEmailAddr={setEmailAddr} onSendClick={() => setEmailPreviewOpen(true)} sent={emailSent} accentColor={accentColor} />

            {/* EMAIL PREVIEW SHEET */}
            <AnimatePresence>
              {emailPreviewOpen && (
                <>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEmailPreviewOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30 }} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '90vh', background: 'rgba(10,15,26,0.98)', backdropFilter: 'blur(10px)', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'auto', zIndex: 101 }}>
                    <div style={{ padding: '20px 18px 30px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', color: accentColor, margin: 0 }}>PREVIEW EMAIL</p>
                        <button onClick={() => setEmailPreviewOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 20, padding: 0 }}>×</button>
                      </div>
                    </div>
                    <div style={{ padding: '16px 18px', space: 'y-3' }}>
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', margin: '0 0 6px' }}>TO</p>
                        <p style={{ fontSize: 13, color: '#fff', margin: 0, wordBreak: 'break-all' }}>{emailAddr}</p>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', margin: '0 0 6px' }}>SUBJECT</p>
                        <p style={{ fontSize: 13, color: '#fff', margin: 0 }}>{`Your SORTED reply — ${result.subject_line || 'Ready to send'}`}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', margin: '0 0 6px' }}>MESSAGE</p>
                        <pre style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.5, margin: 0, background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', maxHeight: 300, overflow: 'auto' }}>
                          {`SORTED wrote your reply.\n\n─────────────────────\nSUBJECT: ${result.subject_line}\n─────────────────────\n\n${result.letter_body}\n\n─────────────────────\nKEY POINTS\n─────────────────────\n${result.key_points?.map(p => `— ${p}`).join('\n')}\n\nTIP: ${result.tip}\n\n─────────────────────\nSORTED — sorted.family51.com\nNothing is stored. This email was sent at your request only.`}
                        </pre>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <motion.button onClick={() => setEmailPreviewOpen(false)} whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                          CANCEL
                        </motion.button>
                        <motion.button onClick={sendEmail} disabled={emailing} whileTap={!emailing ? { scale: 0.95 } : {}} style={{ flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', border: `1px solid ${accentColor}50`, background: `${accentColor}15`, color: accentColor, cursor: !emailing ? 'pointer' : 'not-allowed', opacity: emailing ? 0.6 : 1 }}>
                          {emailing ? '...' : 'SEND'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* ALTERNATIVES CAROUSEL */}
            {alternatives.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: '0 0 12px' }}>ALTERNATIVES ({alternatives.length})</p>
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
                  {alternatives.map((alt, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setResult(alt)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        minWidth: 110, padding: '10px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                        border: `1px solid ${result === alt ? accentColor + '70' : 'rgba(255,255,255,0.12)'}`,
                        background: result === alt ? `${accentColor}12` : 'rgba(255,255,255,0.02)',
                        color: result === alt ? accentColor : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
                      }}
                    >
                      Alt {idx + 1}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* SHARE THE TOOL */}
            <SortedShareButton accentColor={accentColor} />

            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', textAlign: 'center', letterSpacing: '0.05em' }}>Nothing stored. Nothing seen. Yours alone.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SendInEmailApp({ result, accentColor }) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [open, setOpen] = useState(false);

  if (!result) return null;

  const handleOpen = () => {
    const subject = encodeURIComponent(result.subject_line || 'Your reply');
    const body = encodeURIComponent(result.letter_body || '');
    const to = encodeURIComponent(recipientEmail.trim());
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ border: `1px solid rgba(34,197,94,0.25)`, borderRadius: 12, padding: '14px 16px', background: 'rgba(34,197,94,0.05)' }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: '#22c55e', margin: '0 0 4px' }}>📨 SEND FROM YOUR EMAIL APP</p>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>Opens your email app (Proton Mail etc) with the reply pre-filled — you send it, not us.</p>
      {!open ? (
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.95 }}
          style={{ width: '100%', padding: '12px 0', borderRadius: 10, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}
        >
          OPEN IN MY EMAIL APP
        </motion.button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="email"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
            placeholder="Their email address (who you're sending TO)"
            autoFocus
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, color: '#fff', fontSize: 12, padding: '10px 12px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button
              onClick={handleOpen}
              disabled={!recipientEmail.trim()}
              whileTap={recipientEmail.trim() ? { scale: 0.95 } : {}}
              style={{ flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', cursor: recipientEmail.trim() ? 'pointer' : 'not-allowed', border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.1)', color: '#22c55e', opacity: recipientEmail.trim() ? 1 : 0.5 }}
            >
              OPEN EMAIL APP →
            </motion.button>
            <motion.button onClick={() => { setOpen(false); setRecipientEmail(''); }} whileTap={{ scale: 0.95 }} style={{ padding: '12px 16px', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.3)' }}>
              ✕
            </motion.button>
          </div>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: 0 }}>Leave blank to open with no recipient — you can fill it in before you hit send.</p>
        </div>
      )}
    </div>
  );
}

function EmailToSelf({ emailAddr, setEmailAddr, onSendClick, sent, accentColor }) {
  if (sent) return (
    <div style={{ border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '12px 16px', background: 'rgba(34,197,94,0.06)', textAlign: 'center' }}>
      <p style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, margin: 0 }}>✓ Sent — check your inbox</p>
    </div>
  );
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', background: 'rgba(255,255,255,0.02)' }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', margin: '0 0 8px' }}>EMAIL THIS TO YOURSELF</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="email"
          value={emailAddr}
          onChange={e => setEmailAddr(e.target.value)}
          placeholder="your@email.com"
          style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12, padding: '9px 12px', outline: 'none', fontFamily: 'inherit' }}
        />
        <motion.button
          onClick={onSendClick}
          disabled={!emailAddr.trim()}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '9px 16px', borderRadius: 8, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: emailAddr.trim() ? 'pointer' : 'not-allowed', border: `1px solid ${accentColor}50`, background: `${accentColor}15`, color: accentColor, whiteSpace: 'nowrap' }}
        >
          SEND
        </motion.button>
      </div>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', margin: '6px 0 0', letterSpacing: '0.04em' }}>Preview before sending.</p>
    </div>
  );
}

function Label({ children }) {
  return <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{children}</p>;
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

function Spinner({ color, text }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <motion.span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: color }}
        animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
      {text}
    </span>
  );
}

const primaryBtn = {
  flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
};

const secondaryBtn = {
  flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent', color: 'rgba(255,255,255,0.4)', transition: 'all 0.15s',
};