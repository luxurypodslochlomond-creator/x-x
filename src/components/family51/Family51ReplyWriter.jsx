import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import GeoSelector from './GeoSelector';
import SortedShareButton from './SortedShareButton';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';

const SITUATIONS = [
  'Disputing a bill', 'Replying to landlord', 'Debt collector',
  'Council decision', 'Employer / HR', 'Employment contract',
  'Artist / music contract', 'Unfair dismissal', 'Neighbour dispute',
  'Appeal a fine', 'Request my rights', 'Immigration / visa', 'Other',
];

const TONES = [
  { id: 'calm',   label: 'CALM',    desc: 'De-escalate. Resolve.' },
  { id: 'firm',   label: 'FIRM',    desc: 'Professional. No pushover.' },
  { id: 'formal', label: 'FORMAL',  desc: 'Legal weight.' },
  { id: 'urgent', label: 'URGENT',  desc: 'Assert. Make them act.' },
];

export default function Family51ReplyWriter({ accentColor = '#06b6d4', onResult, prefillContext, onHandoff, suggestedTone, relatedCaseId }) {
  const [saved, setSaved] = useState(false);
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
  const [tone, setTone]           = useState(() => suggestedTone || 'calm');
  const [name, setName]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [resultTone, setResultTone] = useState(null);
  const [copied, setCopied]       = useState(false);
  const [geo, setGeo]             = useState(() => detectGeo());
  const [error, setError] = useState(null);

  const generateLetter = async (selectedTone = tone) => {
    const t = TONES.find(x => x.id === selectedTone);
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    const prompt = `You are SORTED — a straight-talking advisor who writes letters for real people. You're like a knowledgeable friend — calm, direct, confident. Not dramatic. Not preachy. Not trying to sound impressive. Just clear and effective. Today's date is ${today}. The person is in: ${geo.country}. Apply ${geo.jurisdiction} law — cite real rights, real regulatory bodies (e.g. ACAS, ICO, Ofgem, Citizens Advice, Employment Tribunal, etc.), and exact legislation where it matters.

SITUATION: ${situation || 'Not specified'}
TONE: ${t?.label} — ${t?.desc}
NAME: ${name || '[Your Name]'}

CONTEXT:
${context}

Write a complete, ready-to-send letter. Rules:
- Sound like a sharp, informed human — not a corporate robot. Direct, clear, confident.
- No waffle, no padding, no "I hope this letter finds you well" nonsense.
- State the issue fast. State what you want. State consequences if ignored.
- Cite specific rights / legislation / bodies relevant to ${geo.jurisdiction} where it strengthens the case.
- MAXIMUM 350 words for the letter body — tight, punchy, effective. Shorter is stronger.
- Proper greeting and sign-off, but no fluff in between.
- Ready to copy and paste with zero edits needed.
- CRITICAL: The tip should focus on what is LIKELY TO ACTUALLY HAPPEN in practice — not just legal theory. What does this organisation usually do when they receive this kind of letter? What's the realistic outcome?

Return: subject line, full letter body (MAX 350 words), 2-3 key points it makes, and one critical tip before sending.`;

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
    setError(null);
    // Server-side rate limit check
    const limitCheck = await recordSortedUse();
    if (!limitCheck.allowed) {
      setError('You\'ve used your 5 free uses. Subscribe for unlimited access.');
      setLoading(false);
      return;
    }
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

  const handleSave = async () => {
    if (!result) return;
    const text = `SORTED — Your Reply Letter\n\nSubject: ${result.subject_line}\n\n${result.letter_body}\n\n` +
      (result.key_points?.length ? `KEY POINTS:\n${result.key_points.map(p => `• ${p}`).join('\n')}\n\n` : '') +
      (result.tip ? `TIP: ${result.tip}\n\n` : '') +
      `Via SORTED — uf51.love/Sorted\nGuidance only, not legal advice.`;

    if (navigator.share) {
      try { await navigator.share({ title: `SORTED Reply — ${result.subject_line || 'Your letter'}`, text }); setSaved(true); setTimeout(() => setSaved(false), 2500); return; } catch (_) {}
    }
    try { await navigator.clipboard.writeText(text); } catch (_) {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const copyLetter = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.subject_line}\n\n${result.letter_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const openInEmailApp = (recipientEmail = '') => {
    if (!result) return;
    const subject = encodeURIComponent(result.subject_line || 'Your reply');
    const body = encodeURIComponent(result.letter_body || '');
    const to = encodeURIComponent(recipientEmail.trim());
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleToneChange = async (newTone) => {
    setTone(newTone);
    // If we already have a result, regenerate instantly with the new tone
    if (result && context.trim()) {
      setLoading(true);
      setError(null);
      try {
        const response = await generateLetter(newTone);
        setResult(response);
        setResultTone(newTone);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!result) {
    // STEP 1 & 2: TONE PICKER + CONTEXT FORM
    return (
      <div className="space-y-5">
        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.07)' }}>
              <p style={{ fontSize: 11, color: '#ef4444', margin: '0 0 8px', fontWeight: 800, letterSpacing: '0.05em' }}>{error}</p>
              <button onClick={() => setError(null)} style={{ fontSize: 10, color: '#ef4444', background: 'none', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.08em' }}>DISMISS</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONNECTED CASE BANNER */}
        {prefillContext && (
          <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.25)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, marginTop: 4 }} />
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: '#06b6d4', margin: '0 0 3px' }}>CONNECTED TO YOUR DECODED LETTER</p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', margin: 0, lineHeight: 1.4 }}>
                {prefillContext.sender && prefillContext.sender !== 'Unknown' ? `From: ${prefillContext.sender}` : ''}{prefillContext.summary ? ` — ${prefillContext.summary}` : ''}
              </p>
            </div>
          </div>
        )}

        {/* CONTEXT — minimal, clear */}
        <div>
           <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', margin: '0 0 8px' }}>WHAT'S THE SITUATION?</p>
          <textarea
            value={context}
            onChange={e => setContext(e.target.value)}
            autoFocus={!prefillContext}
            placeholder="Who are you writing to? What happened? What do you want?"
            style={{
              width: '100%', height: prefillContext ? 80 : 120, background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${context ? accentColor + '60' : 'rgba(255,255,255,0.15)'}`,
              borderRadius: 12, color: '#fff', fontSize: 13, padding: '14px 16px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
              transition: 'border-color 0.2s', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = accentColor + '80'}
            onBlur={e => e.target.style.borderColor = context ? accentColor + '60' : 'rgba(255,255,255,0.15)'}
          />
        </div>

        {/* LOCATION — always visible */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: 13 }}>📍</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', margin: '0 0 2px' }}>LOCATION — for accurate legal references</p>
            <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
          </div>
        </div>

        {/* OPTIONAL EXTRAS — collapsed */}
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', listStyle: 'none', userSelect: 'none' }}>
            ⚙️ YOUR NAME &amp; SITUATION TYPE (optional)
          </summary>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name (for sign-off)"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10,
                color: '#fff', fontSize: 13, padding: '11px 14px',
                outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
            {!prefillContext && (
              <div className="flex flex-wrap gap-2">
                {SITUATIONS.map(s => (
                  <Chip key={s} active={situation === s} color={accentColor} onClick={() => setSituation(situation === s ? '' : s)}>
                    {s}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        </details>

        {/* WRITE BUTTON */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, borderRadius: 14, border: `1px solid ${accentColor}30`, background: `${accentColor}06` }}>
              <motion.div style={{ display: 'flex', gap: 6 }}>
                {[0,1,2].map(i => (
                  <motion.div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor }}
                    animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </motion.div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.12em', color: '#fff', margin: '0 0 6px' }}>WRITING YOUR REPLY</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Composing a {tone} letter in {geo.country} legal context…</p>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              onClick={write}
              disabled={!context.trim()}
              whileTap={context.trim() ? { scale: 0.97 } : {}}
              style={{
                width: '100%', padding: '17px 0', borderRadius: 14, fontSize: 15,
                fontWeight: 900, letterSpacing: '0.1em',
                cursor: context.trim() ? 'pointer' : 'not-allowed',
                border: `2px solid ${context.trim() ? accentColor : 'rgba(255,255,255,0.15)'}`,
                background: context.trim() ? accentColor : 'rgba(255,255,255,0.04)',
                color: context.trim() ? '#000' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.2s',
              }}
            >
              WRITE MY REPLY →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // STEP 3: RESULT VIEW — CLEAN, REAL-TIME TONE SWITCHING
  return (
    <div className="space-y-5">
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

            {/* LOADING STATE */}
            {loading && !result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  marginTop: 20,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: 48,
                    height: 48,
                    border: '2px solid rgba(6, 182, 212, 0.2)',
                    borderTop: '2px solid #06b6d4',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                  }}
                />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', margin: 0, letterSpacing: '0.05em' }}>
                  ✨ Writing your reply…
                </p>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)', margin: '8px 0 0', letterSpacing: '0.03em' }}>
                  AI is composing your message in {tone.toLowerCase()} tone
                </p>
              </motion.div>
            )}

            {/* TONE SWITCHER — visible, real-time */}
            <div style={{ background: accentColor + '08', border: `1px solid ${accentColor}30`, borderRadius: 12, padding: '14px 16px' }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: accentColor, margin: '0 0 4px' }}>NEED A DIFFERENT TONE?</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '0 0 10px', lineHeight: 1.4 }}>Calm usually works best — but if they've already ignored you, try Firm or Formal.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {TONES.map(t => (
                  <motion.button
                    key={t.id}
                    onClick={() => handleToneChange(t.id)}
                    disabled={loading}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                    style={{
                      padding: '10px 12px', borderRadius: 8, textAlign: 'center', fontSize: 11, fontWeight: 800,
                      border: `2px solid ${resultTone === t.id ? accentColor : 'rgba(255,255,255,0.15)'}`,
                      background: resultTone === t.id ? accentColor + '20' : 'rgba(255,255,255,0.04)',
                      color: resultTone === t.id ? accentColor : 'rgba(255,255,255,0.5)',
                      cursor: !loading ? 'pointer' : 'not-allowed',
                      transition: 'all 0.15s', opacity: loading ? 0.5 : 1,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {loading ? '...' : t.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* KEY POINTS */}
            {result.key_points?.length > 0 && (
              <div style={{ border: `1px solid ${accentColor}20`, borderRadius: 8, padding: '14px 18px', background: `${accentColor}05` }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: accentColor + 'aa', marginBottom: 10 }}>THIS LETTER MAKES THESE POINTS</p>
                <div className="space-y-2">
                  {result.key_points.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: accentColor, fontSize: 9, paddingTop: 4, fontWeight: 800 }}>{String(i+1).padStart(2,'0')}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LETTER */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '20px 22px', background: 'rgba(255,255,255,0.04)' }}>
              {result.subject_line && (
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 14, marginBottom: 18 }}>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', margin: '0 0 5px' }}>SUBJECT LINE</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>{result.subject_line}</p>
                </div>
              )}
              <pre style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.75, margin: 0 }}>{result.letter_body}</pre>
            </div>

            {/* TIP */}
            {result.tip && (
              <div style={{ border: '1px solid rgba(234,179,8,0.2)', borderRadius: 8, padding: '12px 16px', background: 'rgba(234,179,8,0.04)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 3, borderRadius: 2, background: '#eab308', alignSelf: 'stretch', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', color: '#eab308', marginBottom: 5 }}>BEFORE YOU SEND</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{result.tip}</p>
                </div>
              </div>
            )}

            {/* ACTIONS — clean, two buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <motion.button onClick={copyLetter} whileTap={{ scale: 0.95 }} style={{ ...primaryBtn, borderColor: copied ? 'rgba(34,197,94,0.6)' : accentColor + '60', color: copied ? '#22c55e' : accentColor, background: copied ? 'rgba(34,197,94,0.08)' : `${accentColor}10` }}>
                {copied ? '✓ COPIED' : 'COPY LETTER'}
              </motion.button>
              <motion.button onClick={() => openInEmailApp()} whileTap={{ scale: 0.95 }} style={{ ...primaryBtn, borderColor: 'rgba(34,197,94,0.4)', color: '#22c55e', background: 'rgba(34,197,94,0.07)' }}>
                OPEN IN EMAIL APP
              </motion.button>
            </div>

            {/* SAVE / SHARE — native share sheet */}
            <button
              onClick={handleSave}
              style={{
                width: '100%', padding: '13px 0', borderRadius: 10, fontSize: 12, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.12)',
                background: saved ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                color: saved ? '#22c55e' : 'rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', transition: 'all 0.2s',
              }}
            >
              {saved ? '✓ SAVED' : (navigator.share ? 'SHARE / SAVE TO NOTES' : 'SAVE TO CLIPBOARD')}
            </button>

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
                THEY IGNORED ME — GET DISPUTE HELP →
              </motion.button>
            )}

            {/* GET MORE HELP — Sara's ask */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(6,182,212,0.6)', margin: '0 0 10px' }}>WANT TO TALK TO A REAL PERSON?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                     <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                     <span><strong style={{ color: '#1a1208' }}>Citizens Advice</strong> — free, confidential advice on debt, benefits & legal issues · citizensadvice.org.uk</span>
                   </a>
                   <a href="https://www.stepchange.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                     <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                     <span><strong style={{ color: '#1a1208' }}>StepChange</strong> — free debt advice & repayment plans · stepchange.org · 0800 138 1111</span>
                   </a>
                   <a href="https://debtcamel.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                     <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                     <span><strong style={{ color: '#1a1208' }}>Debt Camel</strong> — plain English debt guides by Sara Williams · debtcamel.co.uk</span>
                </a>
              </div>
            </div>

            <motion.button onClick={() => { setResult(null); setContext(''); setSituation(''); setSaved(false); }} whileTap={{ scale: 0.95 }} style={{ width: '100%', padding: '12px 0', borderRadius: 10, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.45)' }}>
              WRITE ANOTHER
            </motion.button>

            {/* SHARE THE TOOL */}
            <SortedShareButton accentColor={accentColor} />

            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6, margin: '4px 0 0' }}>
              SORTED provides guidance only — not legal advice.{' '}
              <a href="/SortedTerms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Terms</a>
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', letterSpacing: '0.1em', fontWeight: 700 }}>NOTHING STORED. NOTHING SEEN. YOURS ALONE.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Label({ children }) {
   return <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(26,18,8,0.65)', margin: 0 }}>{children}</p>;
}

function Chip({ active, color, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
      border: `1px solid ${active ? color : 'rgba(255,255,255,0.15)'}`,
      background: active ? `${color}15` : 'transparent',
      color: active ? color : 'rgba(255,255,255,0.45)',
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
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(26,18,8,0.12)',
  background: 'transparent', color: 'rgba(26,18,8,0.45)', transition: 'all 0.15s',
};