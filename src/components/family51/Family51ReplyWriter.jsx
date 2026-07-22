import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedThinkingSteps from './SortedThinkingSteps';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import { buildSortedGeoPromptContext } from '@/utils/sortedGeoContext';
import GeoSelector from './GeoSelector';
import SortedShareButton from './SortedShareButton';
import SortedHelpLinks from './SortedHelpLinks';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';
import { SORTED_SOUL } from '@/utils/sortedSoul';
import SortedFeedback from './SortedFeedback';
import SortedResultShell, { SortedResultSection } from './SortedResultShell';

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

const SENDER_KEY = 'sorted_sender_profile_v1';

const inputStyle = {
  width: '100%', background: '#fff',
  border: '1px solid rgba(26,18,8,0.15)', borderRadius: 10,
  color: '#1a1208', fontSize: 13, padding: '11px 14px',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
};

function loadSenderProfile() {
  try {
    const raw = localStorage.getItem(SENDER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { name: '', email: '', address: '', phone: '' };
}

export default function Family51ReplyWriter({ accentColor = '#06b6d4', onResult, prefillContext, onHandoff, suggestedTone, relatedCaseId }) {
  const [saved, setSaved] = useState(false);
  const [situation, setSituation] = useState('');
  // SENDER PROFILE — persisted, so you never re-type your details
  const [sender, setSender] = useState(() => loadSenderProfile());
  const [recipient, setRecipient] = useState({ name: '', email: '', organisation: '', address: '' });
  const buildContext = (pc) => {
    if (!pc) return '';
    const parts = [];
    if (pc.sender && pc.sender !== 'Unknown') parts.push(`Replying to: ${pc.sender}`);
    if (pc.summary) parts.push(`Letter summary: ${pc.summary}`);
    if (pc.deadline && pc.deadline !== 'No deadline mentioned') parts.push(`Key deadline: ${pc.deadline}`);
    if (pc.what_this_means) parts.push(`Background: ${pc.what_this_means}`);
    if (pc.action_steps?.length) parts.push(`Recommended steps:\n${pc.action_steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
    if (pc.severity) parts.push(`Severity: ${pc.severity}`);
    if (pc.financial_impact && pc.financial_impact !== 'No specific financial amount mentioned.') parts.push(`Financial impact: ${pc.financial_impact}`);
    return parts.join('\n');
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
  const [name, setName]           = useState(() => loadSenderProfile().name || '');
  // Keep sender profile in sync with the name field + persist
  const updateSender = (field, value) => {
    setSender(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'name') setName(value);
      try { localStorage.setItem(SENDER_KEY, JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [resultTone, setResultTone] = useState(null);
  const [copied, setCopied]       = useState(false);
  const [geo, setGeo]             = useState(() => detectGeo());
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  // Scroll to result when it appears — small delay so content has rendered
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [result]);

  const generateLetter = async (selectedTone = tone) => {
    const t = TONES.find(x => x.id === selectedTone);
    const geoContext = buildSortedGeoPromptContext(geo);
    
    const prompt = SORTED_SOUL + '\n' + `You are helping someone write a reply. ${geoContext}

SITUATION: ${situation || 'Not specified'}
TONE REQUESTED: ${t?.label} — ${t?.desc}

WHO IS WRITING (sender — use these exact details in the letter, no placeholders):
- Name: ${sender.name || '[Your Name]'}
${sender.email ? `- Email: ${sender.email}\n` : ''}${sender.address ? `- Address: ${sender.address}\n` : ''}${sender.phone ? `- Phone: ${sender.phone}\n` : ''}
WHO THE LETTER IS TO (recipient — address them by name if provided):
- Recipient: ${recipient.name || (prefillContext?.sender && prefillContext.sender !== 'Unknown' ? prefillContext.sender : '[Recipient name]')}
${recipient.organisation ? `- Organisation: ${recipient.organisation}\n` : ''}${recipient.email ? `- Their email: ${recipient.email}\n` : ''}${recipient.address ? `- Their address: ${recipient.address}\n` : ''}
CONTEXT:
${context}

STEP 1 — IDENTIFY WHAT THIS ACTUALLY IS.
Is this:
A) An official letter, demand, invoice, or notice requiring a formal reply?
B) A personal, academic, or creative document (essay, journal, PhD research, story, newsletter) that does NOT require a legal or formal reply?

STEP 2 — RESPOND APPROPRIATELY.

If (B) — non-official document like an academic essay or personal writing:
- Do NOT write a defensive legal letter. That is wrong and useless.
- Write a warm, genuine, engaged response matching the document type.
- For academic work: respond as a thoughtful peer. Acknowledge key ideas, ask a question, share a real reaction.
- subject_line: a natural, human reply subject line (e.g. "Re: A Chat with Granny — some thoughts")
- letter_body: warm, human, 2-4 paragraphs. No "Dear Sir/Madam", no legal language.
- key_points: 2-3 central themes or ideas in the document
- tip: what kind of reply would genuinely land well for this type of document

If (A) — official letter or demand:
- Write a complete, ready-to-send formal letter.
- Address the recipient by their name if provided. If no recipient name, use their organisation name or "Dear Sir/Madam".
- If the recipient's address is provided, include it in the letterhead / "Dear" block so the letter is fully addressed and ready to post with zero edits.
- Sign off with the sender's name (not "[Your Name]") — the letter must be ready to send with zero edits.
- Include the sender's address, email, and phone at the top or bottom if provided.
- State the issue fast. State what you want. Consequences if ignored.
- Cite specific rights / legislation relevant to ${geo.country}.
- MAXIMUM 350 words. Tight, no fluff.
- tip: what will ACTUALLY happen in practice when they receive this.

Return JSON: document_type (string — what type of document/situation this is), subject_line (string), letter_body (string), key_points (array of 2-3 strings), tip (string).`;

    const schema = {
      type: 'object',
      properties: {
        document_type: { type: 'string', description: 'What type of document/situation this is — official letter, personal, academic, etc.' },
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

    // Claude for quality — single call, no slow double-fallback chain
    let result = null;
    try {
      result = await attemptGenerate('claude_sonnet_4_6');
    } catch (err) {
      console.error('SORTED: generation failed:', err?.message);
      throw new Error('Could not generate your letter. Please check your connection and try again.');
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

  const openInEmailApp = () => {
    if (!result) return;
    const to = recipient.email || prefillContext?.senderEmail || '';
    const subject = encodeURIComponent(result.subject_line || 'Your reply');
    const body = encodeURIComponent(result.letter_body || '');
    window.open(`mailto:${encodeURIComponent(to.trim())}?subject=${subject}&body=${body}`, '_blank');
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
           <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.55)', margin: '0 0 8px' }}>WHAT'S THE SITUATION?</p>
          <textarea
            value={context}
            onChange={e => setContext(e.target.value)}
            autoFocus={false}
            placeholder="Who are you writing to? What happened? What do you want?"
            style={{
              width: '100%', height: prefillContext ? 80 : 120, background: '#fff',
              border: `1.5px solid ${context ? accentColor + '90' : 'rgba(26,18,8,0.15)'}`,
              borderRadius: 12, color: '#1a1208', fontSize: 13, padding: '14px 16px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
              transition: 'border-color 0.2s', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = accentColor}
            onBlur={e => e.target.style.borderColor = context ? accentColor + '90' : 'rgba(26,18,8,0.15)'}
          />
        </div>

        {/* LOCATION — always visible */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#fff', border: '1px solid rgba(26,18,8,0.1)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke={accentColor} strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="12" cy="9" r="2.5" stroke={accentColor} strokeWidth="2"/>
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.5)', margin: '0 0 2px' }}>LOCATION — for accurate legal references</p>
            <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
          </div>
        </div>

        {/* WHO TO SEND TO — just the name, keep it simple */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.55)', margin: '0 0 8px' }}>WHO IS THIS GOING TO?</p>
          <input
            type="text"
            value={recipient.name}
            onChange={e => setRecipient(r => ({ ...r, name: e.target.value }))}
            placeholder="Recipient name (e.g. John Smith)"
            style={{
              ...inputStyle,
              border: `1.5px solid ${recipient.name ? accentColor + '90' : 'rgba(26,18,8,0.15)'}`,
              borderRadius: 12, padding: '14px 16px',
            }}
            onFocus={e => e.target.style.borderColor = accentColor}
            onBlur={e => e.target.style.borderColor = recipient.name ? accentColor + '90' : 'rgba(26,18,8,0.15)'}
          />
        </div>

        {/* WRITE BUTTON */}
        <AnimatePresence mode="wait">
          {loading ? (
            <SortedThinkingSteps tool="reply" accentColor={accentColor} isActive={loading} inputHint={situation} geo={geo} />
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
                border: 'none',
                background: context.trim() ? `linear-gradient(135deg, ${accentColor}, ${accentColor}DD)` : 'rgba(26,18,8,0.04)',
                color: context.trim() ? '#fff' : 'rgba(26,18,8,0.3)',
                transition: 'all 0.2s',
                boxShadow: context.trim() ? `0 4px 14px ${accentColor}40, 0 1px 3px ${accentColor}30` : 'none',
              }}
            >
              Write my reply →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Detect if this is a non-formal/non-legal response (academic, creative, personal)
  const isNonLetter = result && (
    !result.subject_line?.match(/re:|urgent|notice|complaint|demand|formal|invoice/i) &&
    result.key_points?.some(p => /theme|essay|research|idea|question|reflect|wonder|play|journal|PhD/i.test(p))
  );

  // STEP 3: RESULT VIEW — unified shell, same look as every other tool
  const resetResult = () => { setResult(null); setContext(''); setSituation(''); setRecipient({ name: '', email: '', organisation: '' }); setSaved(false); };

  const handleShareUnified = async () => {
    await handleSave();
  };

  const handleCopyUnified = async () => {
    await copyLetter();
  };

  const handleHandoffUnified = () => {
    if (!onHandoff || isNonLetter) return null;
    onHandoff({
      subject_line: result?.subject_line,
      letter_body: result?.letter_body,
      situation_hint: `I sent a reply (${resultTone || tone} tone) to ${prefillContext?.sender || 'them'} about ${prefillContext?.summary || 'my situation'}. They ignored it.`,
    });
  };

  return (
    <div className="space-y-5">
      <AnimatePresence>
        {result && (
          <motion.div ref={resultRef} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <SortedResultShell
              accentColor={accentColor}
              tool="reply"
              onCopy={handleCopyUnified}
              onShare={handleShareUnified}
              onReset={resetResult}
              onEmail={openInEmailApp}
              onHandoff={onHandoff && !isNonLetter ? handleHandoffUnified : null}
              handoffLabel="THEY IGNORED ME — GET DISPUTE HELP →"
              flash={copied ? 'COPIED' : saved ? 'SAVED' : null}
            >
              {/* TONE SWITCHER — only for formal letters */}
              {!isNonLetter && (
                <SortedResultSection label="NEED A DIFFERENT TONE?" color={accentColor}>
                  <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)', margin: '0 0 10px', lineHeight: 1.4 }}>Calm usually works best — but if they've already ignored you, try Firm or Formal.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {TONES.map(t => (
                      <motion.button
                        key={t.id}
                        onClick={() => handleToneChange(t.id)}
                        disabled={loading}
                        whileTap={!loading ? { scale: 0.95 } : {}}
                        style={{
                          padding: '10px 12px', borderRadius: 8, textAlign: 'center', fontSize: 11, fontWeight: 800,
                          border: `2px solid ${resultTone === t.id ? accentColor : 'rgba(26,18,8,0.15)'}`,
                          background: resultTone === t.id ? accentColor + '20' : 'rgba(26,18,8,0.03)',
                          color: resultTone === t.id ? accentColor : 'rgba(26,18,8,0.55)',
                          cursor: !loading ? 'pointer' : 'not-allowed',
                          transition: 'all 0.15s', opacity: loading ? 0.5 : 1,
                          letterSpacing: '0.08em',
                        }}
                      >
                        {loading ? '...' : t.label}
                      </motion.button>
                    ))}
                  </div>
                </SortedResultSection>
              )}

              {/* KEY POINTS */}
              {result.key_points?.length > 0 && (
                <SortedResultSection label={isNonLetter ? 'WHAT THIS IS REALLY ABOUT' : 'THIS LETTER MAKES THESE POINTS'} color={accentColor}>
                  <div className="space-y-2">
                    {result.key_points.map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ color: accentColor, fontSize: 9, paddingTop: 4, fontWeight: 800 }}>{String(i+1).padStart(2,'0')}</span>
                        <span style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', lineHeight: 1.5 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </SortedResultSection>
              )}

              {/* LETTER */}
              <SortedResultSection color={accentColor}>
                {result.subject_line && (
                  <div style={{ borderBottom: '1px solid rgba(26,18,8,0.08)', paddingBottom: 14, marginBottom: 18 }}>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(26,18,8,0.35)', margin: '0 0 5px' }}>SUBJECT LINE</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1208', margin: 0, lineHeight: 1.4 }}>{result.subject_line}</p>
                  </div>
                )}
                <pre style={{ fontSize: 13, color: 'rgba(26,18,8,0.85)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.75, margin: 0 }}>{result.letter_body}</pre>
              </SortedResultSection>

              {/* TIP */}
              {result.tip && (
                <SortedResultSection label="BEFORE YOU SEND" color="#eab308">
                  <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.5 }}>{result.tip}</p>
                </SortedResultSection>
              )}
            </SortedResultShell>
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
      border: `1px solid ${active ? color : 'rgba(26,18,8,0.15)'}`,
      background: active ? `${color}15` : 'transparent',
      color: active ? color : 'rgba(26,18,8,0.5)',
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