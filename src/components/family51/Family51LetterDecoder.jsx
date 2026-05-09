import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import GeoSelector from './GeoSelector';
import SortedShareButton from './SortedShareButton';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';

const LETTER_TYPES = [
  'Council tax', 'Energy bill', 'Rent / landlord', 'Debt collector',
  'NHS / medical', 'School / college', 'Employer / HR', 'Parking fine',
  'Driving / traffic', 'Benefits / DWP', 'Court / legal', 'Tax / government', 'Immigration', 'Other',
];

const SEVERITY_CONFIG = {
  'NOT URGENT':    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.3)' },
  'NEEDS ATTENTION': { color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
  'URGENT':        { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
  'VERY URGENT':   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)' },
};

const LOADING_STEPS = [
  'Decoding your letter…',
  'Identifying key details…',
  'Checking deadlines…',
  'Finding what matters…',
  'Almost there…',
];

export default function Family51LetterDecoder({ accentColor = '#f97316', onResult, onHandoff }) {
  const [letterText, setLetterText] = useState('');
  const [letterType, setLetterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [geo, setGeo] = useState(() => detectGeo());
  const [decodeError, setDecodeError] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const geoRef = useRef(geo);
  const letterTypeRef = useRef(letterType);

  // Keep refs in sync so handleFileUpload always has fresh values
  useEffect(() => { geoRef.current = geo; }, [geo]);
  useEffect(() => { letterTypeRef.current = letterType; }, [letterType]);

  // Progress through loading steps while waiting
  useEffect(() => {
    if (!loading) { setLoadingStep(0); return; }
    const interval = setInterval(() => {
      setLoadingStep(s => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 4000);
    return () => clearInterval(interval);
  }, [loading]);

  const runDecode = async (fileUrl, text) => {
    setLoading(true);
    setLoadingStep(0);
    setUploading(false);
    setResult(null);
    setDecodeError(null);
    try {
      // Server-side rate limit check — not bypassable via browser storage
      const limitCheck = await recordSortedUse();
      if (!limitCheck.allowed) {
        setDecodeError('You\'ve used your 5 free decodes. Subscribe for unlimited access.');
        setLoading(false);
        return;
      }
      const currentGeo = geoRef.current;
      const currentType = letterTypeRef.current;
      const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      
      const countrySpecific = currentGeo.code === 'PH'
        ? `For Philippines: reference relevant laws (Civil Code RA 386, Labor Code PD 442, Consumer Act RA 7394, RA 9285 ADR). Name real bodies: DTI (1-384), DOLE (1349), NLRC, SEC, BSP, NBI, PAO (free legal aid 02-8928-9019). Small Claims Court handles up to PHP 400,000 without a lawyer. Barangay conciliation is required first for neighbour disputes.`
        : `Reference specific legislation, named regulatory bodies, and real contact details for ${currentGeo.country}.`;
      
      const geoContext = `Today's date is ${today}. The person is in: ${currentGeo.country}. Apply ${currentGeo.jurisdiction} precisely. ${countrySpecific} When calculating urgency, use today's date.`;

      // Route by file type: images → vision model directly; docs/PDFs → extract text first
      let letterContent = text;
      let visionFileUrl = null;

      if (fileUrl) {
        const lowerUrl = fileUrl.toLowerCase();
        const isImage = lowerUrl.match(/\.(jpg|jpeg|png|gif|webp|heic|heif)/) || lowerUrl.includes('image/');
        if (isImage) {
          // Images: pass directly to vision model — no extraction needed
          visionFileUrl = fileUrl;
        } else {
          // PDFs, Word docs, etc: extract text first
          const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
            file_url: fileUrl,
            json_schema: { type: 'object', properties: { full_text: { type: 'string' } } },
          });
          letterContent = extracted?.output?.full_text || (typeof extracted?.output === 'string' ? extracted.output : null) || text || '';
          if (!letterContent || letterContent.trim().length < 10) {
            throw new Error('Could not read the document. Please try a clearer photo or paste the text instead.');
          }
        }
      }

      const promptText = `You are SORTED — a straight-talking advisor who helps real people understand documents and letters. You sound like a knowledgeable friend — calm, clear, confident. Not dramatic. Not corporate. Not trying too hard to be relatable. Just genuinely useful. ${geoContext} A person has received this official letter${currentType ? ` (type: ${currentType})` : ''} and needs help understanding it.${letterContent ? `\n\nDOCUMENT:\n${letterContent}` : ''}

CRITICAL TONE INSTRUCTION: Focus on what is LIKELY TO ACTUALLY HAPPEN in practice — not just what the law says. People don't need a lecture on their legal rights. They need to know: will a bailiff actually come? Will I actually go to prison? What really happens if I ignore this? Be realistic and practical. A 20-year debt adviser would say "in reality, at this stage, they almost never..." — that's the voice. Calm, experienced, honest about real-world probabilities.

EXPERT DEBT ADVICE RULES — ALWAYS APPLY THESE:
1. CHALLENGE THE DEBT FIRST: Before suggesting any action, flag that the person should verify the debt is correct and the amount is right. Has there been a formal Notice of Assessment for council tax? Is the figure disputed? Always include this as a first check.
2. BIGGER PICTURE: If this is a debt letter, acknowledge it may be part of a wider debt situation. Recommend holistic debt advice — seeing the full picture first before tackling individual letters.
3. BAILIFF SIGNPOSTING — CRITICAL: StepChange does NOT negotiate with bailiffs or creditors. For bailiff/enforcement situations, signpost to Citizens Advice (they coach people through it) or National Debtline (0808 808 4000). NOT StepChange for bailiff situations.
4. ASSET PROTECTION: If council tax enforcement, bailiffs, or court action is involved, always flag whether a car or household goods could be at risk and what steps to take immediately.
5. SCOTLAND + COUNCIL TAX BAILIFF — CRITICAL RULE: NEVER suggest DAS (Debt Arrangement Scheme) to someone in Scotland who has already received a council tax letter from a bailiff. A summary warrant has likely already been granted — DAS CANNOT stop enforcement at this stage. It would give false hope and cause dangerous delay. Instead, signpost urgently to Citizens Advice Scotland (0800 028 1456) or Money Advice Scotland immediately.
6. JURISDICTION ACCURACY: Never apply Scotland-only debt solutions (DAS, Scottish Debt Solutions, Trust Deed) to people outside Scotland. Never apply England/Wales solutions (IVA, DRO, CCJ processes) to people in Scotland. Always check location first.
7. NATIONAL DEBTLINE: For any UK debt letter, always include National Debtline (0808 808 4000 / nationaldebtline.org) — free, expert coaches for self-help through debt processes.`;

      const response = await base44.integrations.Core.InvokeLLM({
        model: 'claude_sonnet_4_6',
        ...(visionFileUrl ? { file_urls: [visionFileUrl] } : {}),
        prompt: promptText + `\n\nBe specific. Be human. Give REAL information that actually helps. Don't over-reassure or be preachy. Don't be cold either. Just tell them what's going on and what to do — like someone who's seen this before and knows it's manageable.

CRITICAL ANTI-HALLUCINATION RULES:
- NEVER invent phone numbers — only use numbers you are highly confident exist for this organisation
- NEVER invent legislation references — only cite laws you are certain apply
- If you cannot read part of a photo clearly, say so honestly rather than guessing
- If a deadline is unclear, say "Check letter for exact date" not a guess
- If you are uncertain about any specific fact, flag it with "(verify this)" at the end of that sentence
- It is better to say "I'm not certain of the exact number — search [Organisation] contact on Google" than to give a wrong number

Return a JSON object with these EXACT fields:
- letter_summary: Max 6 words. What IS this letter. E.g. "Council tax debt demand" or "HMRC self-assessment penalty notice". Be blunt and specific.
- sender: Organisation name, e.g. "HMRC", "Barclays", "Hackney Council". Or "Unknown".
- severity: EXACTLY one of: NOT URGENT / NEEDS ATTENTION / URGENT / VERY URGENT
- severity_explanation: One sentence. Why did you pick that rating? What is at stake?
- key_deadline: The exact date from the letter, or "No deadline mentioned". If there are multiple dates, give the soonest.
- quick_reassurance: 2-3 short bullet points (use • character). Lead with calm. E.g. "• This is a standard reminder — nothing has gone wrong yet\n• You have time to respond — no immediate action needed today\n• There are free services that can help with this". Keep it warm, grounded, honest. This is the FIRST thing the user reads — make them feel steady, not scared.
- we_hear_you: ONE grounded, human sentence — acknowledge the situation without overdoing it. Calm and real, like a friend who's seen this before. No melodrama, no hollow reassurance.
- what_this_means: 3-4 sentences. Zero jargon. Plain English. Explain exactly what this letter IS, what triggered it, and what it actually means for this person day-to-day. Include any amounts of money involved.
- if_you_ignore_this: 2-3 sentences. Helpful context about timing — what usually happens next if they don't respond, and why acting sooner is better. Calm and informative, never alarming. E.g. "If no response is received by the deadline, the next step is usually a follow-up letter or referral to a debt collection agency. It's worth responding quickly even if you can't pay in full — most organisations will work with you if you reach out first."
- financial_impact: If there's a specific amount at risk (debt, fine, arrears, benefit cut), state it clearly. E.g. "£847 owed — this could increase to £1,100+ with added court costs if unpaid." If no financial amount, say "No specific financial amount mentioned."
- action_steps: Array of exactly 5 specific steps. Real actions, real phone numbers, real websites relevant to their jurisdiction. E.g. not "contact your local council" but "Call Hackney Council's debt team on 020 8356 3000 — open Mon-Fri 9am-5pm. Ask to set up a payment plan." Include one free advice service by name and contact details.
- free_help: Array of exactly 2-3 FREE services that can help with THIS specific type of letter in their jurisdiction. Each entry: the service name, what they do, and how to reach them. E.g. "Citizens Advice — free legal guidance on debt and council tax — visit citizensadvice.org.uk or call 0800 144 8848". Be specific to their country/region.
- dont_panic: One honest, direct reassuring sentence. Acknowledge the situation is real but that it's manageable. Don't be fake or corporate.
- suggested_tone: Based on the letter type & severity, suggest which reply tone would work best: FIRM (for authoritative demands), CALM (for de-escalation), URGENT (for time-critical), or FORMAL (for legal weight). Return the tone ID: firm, calm, urgent, or formal.`,
        response_json_schema: {
          type: 'object',
          properties: {
            letter_summary:       { type: 'string' },
            sender:               { type: 'string' },
            severity:             { type: 'string' },
            severity_explanation: { type: 'string' },
            key_deadline:         { type: 'string' },
            quick_reassurance:    { type: 'string' },
            we_hear_you:          { type: 'string' },
            what_this_means:      { type: 'string' },
            if_you_ignore_this:   { type: 'string' },
            financial_impact:     { type: 'string' },
            action_steps:         { type: 'array', items: { type: 'string' } },
            free_help:            { type: 'array', items: { type: 'string' } },
            dont_panic:           { type: 'string' },
            suggested_tone:       { type: 'string' },
          },
        },
      });

      // Parse + unwrap response regardless of whether it's a string or object
      let raw = response;
      if (typeof raw === 'string') {
        try { raw = JSON.parse(raw); } catch { raw = null; }
      }
      // Unwrap nested { response: {...} } envelope
      if (raw?.response && typeof raw.response === 'object') raw = raw.response;

      if (!raw || typeof raw !== 'object' || Object.keys(raw).length === 0) {
        setDecodeError('Could not decode this letter. Try uploading a clearer photo or paste the text instead.');
        return;
      }

      // Sanitize: coerce any accidental nested objects to strings
      const STRING_FIELDS = ['letter_summary','sender','severity','severity_explanation','key_deadline','quick_reassurance','we_hear_you','what_this_means','if_you_ignore_this','financial_impact','dont_panic','suggested_tone'];
      STRING_FIELDS.forEach(k => { if (raw[k] && typeof raw[k] === 'object') raw[k] = JSON.stringify(raw[k]); });
      if (raw.action_steps && !Array.isArray(raw.action_steps)) raw.action_steps = [String(raw.action_steps)];
      if (raw.free_help && !Array.isArray(raw.free_help)) raw.free_help = [String(raw.free_help)];

      setResult(raw);
      const SEVERITY_MAP = { 'NOT URGENT': 'routine', 'NEEDS ATTENTION': 'important', 'URGENT': 'urgent', 'VERY URGENT': 'urgent' };
      setCaseId(saveCaseToHistory({
        tool: 'letter',
        input_text: text || '',
        ai_result: JSON.stringify(raw),
        summary: raw.letter_summary || raw.summary || 'Decoded letter',
        severity: SEVERITY_MAP[raw.severity] || 'unknown',
      }));
    } catch (err) {
      console.error('SORTED decode error:', err);
      console.error('Error details:', { message: err?.message, status: err?.status, response: err?.response });
      setDecodeError(`Decode failed: ${err?.message || 'Unknown error'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Warn on large files — PDFs over 5MB likely won't read well
    if (file.size > 5 * 1024 * 1024) {
      setDecodeError('That file is too large. For best results, snap a photo of the relevant page instead of uploading a full document.');
      e.target.value = '';
      return;
    }
    setUploading(true);
    setLoading(true); // set both immediately so there's no gap in the loader
    setDecodeError(null);
    setResult(null);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedFileUrl(file_url);
      setLetterText('[Photo/file uploaded — AI will read it directly]');
      setUploading(false); // file uploaded, now just decoding
      await runDecode(file_url, null);
    } catch (err) {
      console.error('SORTED upload error:', err);
      setDecodeError(`Upload failed: ${err?.message || 'Could not upload file'}. Please try again.`);
      setUploading(false);
      setLoading(false);
    }
    e.target.value = '';
  };

  const decode = async () => {
    const hasInput = letterText.trim() || uploadedFileUrl;
    if (!hasInput || loading) return;
    await runDecode(uploadedFileUrl || null, letterText);
  };

  const reset = () => { setResult(null); setLetterText(''); setLetterType(''); setUploadedFileUrl(null); setDecodeError(null); };

  const copyAll = () => {
    if (!result) return;
    const text = `DECODED BY SORTED\n\n${result.we_hear_you ? result.we_hear_you + '\n\n' : ''}WHAT THIS MEANS:\n${result.what_this_means}\n\nSEVERITY: ${result.severity} — ${result.severity_explanation}\n\n${result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' ? `MONEY AT STAKE: ${result.financial_impact}\n\n` : ''}${result.if_you_ignore_this ? `IF YOU IGNORE THIS: ${result.if_you_ignore_this}\n\n` : ''}WHAT TO DO:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${result.free_help?.length > 0 ? `FREE HELP:\n${result.free_help.join('\n')}\n\n` : ''}DEADLINE: ${result.key_deadline}\n\nDON'T PANIC: ${result.dont_panic}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;

  return (
    <div className="space-y-5">

      {/* LOADER */}
      <AnimatePresence>
        {(loading || uploading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '40px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
            }}
          >
            {/* Lock icon pulsing */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke={accentColor} strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={accentColor} strokeWidth="2" strokeLinecap="round"/>
                <motion.circle
                  cx="12" cy="16" r="1.5" fill={accentColor}
                  animate={{ r: [1.5, 2.5, 1.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </svg>
            </motion.div>

            {/* Scanning document lines */}
            <div style={{ width: '100%', maxWidth: 220, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[0.9, 0.7, 1, 0.5, 0.8].map((w, i) => (
                <div key={i} style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', width: `${w * 100}%` }}>
                  <motion.div
                    style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, borderRadius: 3 }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                  />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.15em', color: '#fff', margin: '0 0 6px' }}>
                DECODING YOUR LETTER
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingStep}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', margin: 0 }}
                >
                  {LOADING_STEPS[loadingStep]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORM — hidden while loading */}
      {!loading && !uploading && (<>

      {/* Hidden inputs */}
      <input ref={fileInputRef} type="file" accept="image/*,application/pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: 'none' }} />

      {/* STEP 1: MAIN INPUT — paste or snap, nothing else */}
      {!uploadedFileUrl && !result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* BIG PASTE AREA — first thing they see */}
          <textarea
            value={letterText}
            onChange={e => setLetterText(e.target.value)}
            autoFocus
            placeholder="Paste your letter here — or take a photo below.

Don't worry about formatting. Just get it all in."
            style={{
              width: '100%', height: 200, background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${letterText ? accentColor + '60' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 14, color: '#fff', fontSize: 14, padding: '16px 18px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.65,
              transition: 'border-color 0.2s', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = accentColor + '80'}
            onBlur={e => e.target.style.borderColor = letterText ? accentColor + '60' : 'rgba(255,255,255,0.12)'}
          />

          {/* PRIMARY ACTION — decode if text, else two photo buttons */}
          {letterText.trim() ? (
            <motion.button
              onClick={decode}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '17px 0', borderRadius: 14, fontSize: 15,
                fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer',
                border: `2px solid ${accentColor}`,
                background: accentColor, color: '#000',
              }}
            >
              DECODE THIS LETTER →
            </motion.button>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => cameraInputRef.current?.click()}
                style={{
                  flex: 2, padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                  letterSpacing: '0.06em', cursor: 'pointer',
                  border: `2px solid ${accentColor}`,
                  background: accentColor, color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                SNAP A PHOTO
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  flex: 1, padding: '16px 0', borderRadius: 14, fontSize: 11, fontWeight: 800,
                  letterSpacing: '0.06em', cursor: 'pointer',
                  border: `1px solid rgba(255,255,255,0.15)`,
                  background: 'transparent', color: 'rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                UPLOAD
              </motion.button>
            </div>
          )}

          {/* SUBTLE TRUST LINE */}
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', margin: 0, letterSpacing: '0.03em' }}>
            Nothing stored. Processed and gone. For long documents, snap just the key page.
          </p>
        </div>
      )}

      {/* FILE UPLOADED STATE */}
      {uploadedFileUrl && !result && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.08)' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e', letterSpacing: '0.1em' }}>✓ FILE READY — DECODING NOW</span>
          <button onClick={() => { setUploadedFileUrl(null); setLetterText(''); }} style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.08em' }}>REMOVE</button>
        </div>
      )}

      {/* OPTIONAL EXTRAS — only shown after result or when they've started typing */}
      {letterText.trim() && !result && (
        <div style={{ paddingTop: 4 }}>
          {/* GEO — always visible when typing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: 12 }}>📍</span>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)' }}>LOCATION:</span>
            <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
          </div>
          {/* TYPE CHIPS — collapsible optional hint */}
          <details style={{ cursor: 'pointer' }}>
            <summary style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', listStyle: 'none', userSelect: 'none' }}>
              + OPTIONAL: what type of letter? (helps accuracy)
            </summary>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {LETTER_TYPES.map(type => (
                <Chip key={type} active={letterType === type} color={accentColor} onClick={() => setLetterType(letterType === type ? '' : type)}>
                  {type}
                </Chip>
              ))}
            </div>
          </details>
        </div>
      )}

      </>)} {/* end !loading form */}

      {/* ERROR */}
      <AnimatePresence>
        {decodeError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: '16px 18px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.1)', textAlign: 'center' }}
          >
            <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 6px', fontWeight: 800, letterSpacing: '0.08em' }}>⚠ SOMETHING WENT WRONG</p>
            <p style={{ fontSize: 12, color: 'rgba(239,68,68,0.8)', margin: '0 0 10px', lineHeight: 1.5 }}>{decodeError}</p>
            <button
              onClick={() => setDecodeError(null)}
              style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', background: 'none', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', letterSpacing: '0.08em' }}
            >
              DISMISS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* WHAT NOW — primary CTA immediately at top */}
            {onHandoff && (
              <motion.button
                onClick={() => onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, what_this_means: result.what_this_means, suggestedTone: result.suggested_tone, related_case_id: caseId })}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  width: '100%', padding: '18px 0', borderRadius: 14, fontSize: 14,
                  fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer',
                  border: `2px solid ${accentColor}`,
                  background: accentColor, color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                WRITE MY REPLY NOW
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
            )}

            {/* QUICK REASSURANCE */}
            {result.quick_reassurance && (
              <div style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(34,197,94,0.6)', margin: '0 0 10px' }}>AT A GLANCE</p>
                {result.quick_reassurance.split('\n').filter(Boolean).map((line, i) => (
                  <p key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: i === 0 ? 0 : '6px 0 0', fontWeight: 500 }}>{line}</p>
                ))}
              </div>
            )}

            {/* TOP — calm summary header */}
            {sev && (
              <div style={{ borderRadius: 14, padding: '20px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Severity dot + label — subtle, not alarming */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: sev.color, flexShrink: 0, boxShadow: `0 0 6px ${sev.color}80` }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: sev.color, letterSpacing: '0.14em' }}>{result.severity}</span>
                  {result.sender && result.sender !== 'Unknown' && (
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto', letterSpacing: '0.04em' }}>{result.sender}</span>
                  )}
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.25 }}>{result.letter_summary || 'Official letter'}</p>
                {/* Reassurance line — always calm */}
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
            )}

            {/* PLAIN ENGLISH */}
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 10px' }}>WHAT THIS MEANS</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>{result.what_this_means}</p>
            </div>

            {/* WHAT TO DO — calm numbered list */}
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 12px' }}>WHAT TO DO</p>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {result.action_steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: accentColor, minWidth: 18, paddingTop: 3, flexShrink: 0, letterSpacing: '0.05em' }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* MONEY — only if real, kept calm */}
            {(result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.') && (
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 6px' }}>AMOUNT INVOLVED</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>{result.financial_impact}</p>
              </div>
            )}

            {/* GOOD TO KNOW — calm, not scary */}
            {result.if_you_ignore_this && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(234,179,8,0.04)', border: '1px solid rgba(234,179,8,0.12)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(234,179,8,0.5)', margin: '0 0 8px' }}>GOOD TO KNOW</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{result.if_you_ignore_this}</p>
              </div>
            )}

            {/* FREE HELP — warm green, calm */}
            {result.free_help?.length > 0 && (
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(34,197,94,0.5)', margin: '0 0 10px' }}>FREE HELP AVAILABLE</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.free_help.map((help, i) => (
                    <p key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, paddingLeft: 12, borderLeft: '1px solid rgba(34,197,94,0.2)' }}>{help}</p>
                  ))}
                </div>
              </div>
            )}

            {/* SECONDARY ACTIONS */}
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <motion.button onClick={copyAll} whileTap={{ scale: 0.95 }} style={secondaryBtn}>
                {copied ? '✓ COPIED' : 'COPY ALL'}
              </motion.button>
              <motion.button onClick={reset} whileTap={{ scale: 0.95 }} style={{ ...secondaryBtn, color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)' }}>
                DECODE ANOTHER
              </motion.button>
            </div>

            {/* OPEN IN EMAIL APP — pre-fills their mail app with the full breakdown */}
            <SendBreakdownByEmail result={result} accentColor={accentColor} />

            <SortedShareButton accentColor={accentColor} />

            {/* GET MORE HELP — Sara's ask */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(6,182,212,0.6)', margin: '0 0 10px' }}>WANT TO TALK TO A REAL PERSON?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                  <span><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Citizens Advice</strong> — free, confidential advice on debt, benefits & legal issues · citizensadvice.org.uk</span>
                </a>
                <a href="https://www.stepchange.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                  <span><strong style={{ color: 'rgba(255,255,255,0.85)' }}>StepChange</strong> — free debt advice & repayment plans · stepchange.org · 0800 138 1111</span>
                </a>
                <a href="https://debtcamel.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', flexShrink: 0, display: 'inline-block' }} />
                  <span><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Debt Camel</strong> — plain English debt guides by Sara Williams · debtcamel.co.uk</span>
                </a>
              </div>
            </div>

            {/* DISCLAIMER */}
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6, margin: '4px 0 0', padding: '0 8px' }}>
              This is guidance to help you understand your situation — not legal advice. For serious matters, always verify with <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>Citizens Advice</a> or a solicitor.
            </p>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

// Opens the user's own email app pre-filled — no email address needed, no data sent anywhere
function SendBreakdownByEmail({ result, accentColor }) {
  if (!result) return null;
  const handleOpen = () => {
    const subject = encodeURIComponent(`SORTED breakdown — ${result.letter_summary || result.severity || 'Your letter'}`);
    const body = encodeURIComponent(
      `SORTED decoded your letter.\n\n` +
      `${result.we_hear_you ? result.we_hear_you + '\n\n' : ''}` +
      `WHAT THIS MEANS\n${result.what_this_means}\n\n` +
      `SEVERITY: ${result.severity} — ${result.severity_explanation}\n\n` +
      (result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' ? `AMOUNT INVOLVED: ${result.financial_impact}\n\n` : '') +
      `WHAT TO DO\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
      (result.free_help?.length > 0 ? `FREE HELP\n${result.free_help.join('\n')}\n\n` : '') +
      `DEADLINE: ${result.key_deadline}\n\n` +
      `Generated by SORTED — sorted.uf51.love\nNothing stored. Nothing logged.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <motion.button
      onClick={handleOpen}
      whileTap={{ scale: 0.97 }}
      style={{
        width: '100%', padding: '13px 0', borderRadius: 12, fontSize: 12,
        fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer',
        border: '1px solid rgba(34,197,94,0.35)',
        background: 'rgba(34,197,94,0.07)', color: '#22c55e',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="9" rx="1.2" stroke="#22c55e" strokeWidth="1.2"/><path d="M1.5 3L7 7.5L12.5 3" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round"/></svg>
      EMAIL THIS TO MYSELF
    </motion.button>
  );
}

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



const secondaryBtn = {
  flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent', color: 'rgba(255,255,255,0.4)', transition: 'all 0.15s',
};