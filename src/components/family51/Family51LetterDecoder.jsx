import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { detectGeo } from '@/hooks/useSortedGeo';
import GeoSelector from './GeoSelector';
import SortedShareButton from './SortedShareButton';

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

export default function Family51LetterDecoder({ accentColor = '#f97316', onResult, onHandoff }) {
  const [letterText, setLetterText] = useState('');
  const [letterType, setLetterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [geo, setGeo] = useState(() => detectGeo());
  const [emailAddr, setEmailAddr] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [decodeError, setDecodeError] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const geoRef = useRef(geo);
  const letterTypeRef = useRef(letterType);

  // Keep refs in sync so handleFileUpload always has fresh values
  useEffect(() => { geoRef.current = geo; }, [geo]);
  useEffect(() => { letterTypeRef.current = letterType; }, [letterType]);

  const runDecode = async (fileUrl, text) => {
    setLoading(true);
    setUploading(false); // ensure uploading clears when loading takes over
    setResult(null);
    setDecodeError(null);
    try {
      const currentGeo = geoRef.current;
      const currentType = letterTypeRef.current;
      const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const geoContext = `Today's date is ${today}. The person is in: ${currentGeo.country}. Apply ${currentGeo.jurisdiction} and locally relevant rights, bodies, and deadlines throughout your response. When calculating how urgent a deadline is, use today's date as your reference.`;
      const promptText = fileUrl
        ? `You are a compassionate plain-English advice expert specialising in ${currentGeo.jurisdiction}. ${geoContext} A person has uploaded a photo or scan of an official letter${currentType ? ` (type: ${currentType})` : ''}. Read it carefully and help them understand it.`
        : `You are a compassionate plain-English advice expert specialising in ${currentGeo.jurisdiction}. ${geoContext} A person has received this official letter${currentType ? ` (type: ${currentType})` : ''} and needs help understanding it.\n\nLETTER:\n${text}`;

      // Use gemini for image files (supports vision + JSON schema), claude for text
      const modelToUse = fileUrl ? 'gemini_3_1_pro' : 'claude_sonnet_4_6';
      const response = await base44.integrations.Core.InvokeLLM({
        model: modelToUse,
        prompt: promptText + `\n\nThis person may be stressed, scared, or overwhelmed. Your job is to be their brilliant, straight-talking friend who happens to know the law — not a robot, not a disclaimer machine. Be specific. Be human. Give REAL information that actually helps.

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
- we_hear_you: ONE warm, human sentence that acknowledges how stressful this kind of letter is. Not dismissive. Not corporate. Like a friend who gets it.
- what_this_means: 3-4 sentences. Zero jargon. Plain English. Explain exactly what this letter IS, what triggered it, and what it actually means for this person day-to-day. Include any amounts of money involved.
- if_you_ignore_this: 2-3 sentences. What ACTUALLY happens if they do nothing? Be honest but not scaremongering. E.g. "They can apply for a county court judgment (CCJ) which affects your credit score for 6 years and could lead to bailiffs." This is the most important field — it's what gets people to act.
- financial_impact: If there's a specific amount at risk (debt, fine, arrears, benefit cut), state it clearly. E.g. "£847 owed — this could increase to £1,100+ with added court costs if unpaid." If no financial amount, say "No specific financial amount mentioned."
- action_steps: Array of exactly 5 specific steps. Real actions, real phone numbers, real websites relevant to their jurisdiction. E.g. not "contact your local council" but "Call Hackney Council's debt team on 020 8356 3000 — open Mon-Fri 9am-5pm. Ask to set up a payment plan." Include one free advice service by name and contact details.
- free_help: Array of exactly 2-3 FREE services that can help with THIS specific type of letter in their jurisdiction. Each entry: the service name, what they do, and how to reach them. E.g. "Citizens Advice — free legal guidance on debt and council tax — visit citizensadvice.org.uk or call 0800 144 8848". Be specific to their country/region.
- dont_panic: One honest, direct reassuring sentence. Acknowledge the situation is real but that it's manageable. Don't be fake or corporate.`,
        ...(fileUrl ? { file_urls: [fileUrl] } : {}),
        response_json_schema: {
          type: 'object',
          properties: {
            letter_summary:       { type: 'string' },
            sender:               { type: 'string' },
            severity:             { type: 'string' },
            severity_explanation: { type: 'string' },
            key_deadline:         { type: 'string' },
            we_hear_you:          { type: 'string' },
            what_this_means:      { type: 'string' },
            if_you_ignore_this:   { type: 'string' },
            financial_impact:     { type: 'string' },
            action_steps:         { type: 'array', items: { type: 'string' } },
            free_help:            { type: 'array', items: { type: 'string' } },
            dont_panic:           { type: 'string' },
          },
        },
      });

      // Validate we actually got content back
      if (!response || !response.what_this_means) {
        setDecodeError('Something went wrong reading the response. Please try again.');
      } else {
        setResult(response);
      }
    } catch (err) {
      console.error('SORTED decode error:', err);
      setDecodeError(`Decode failed: ${err?.message || 'Unknown error'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
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

  const reset = () => { setResult(null); setLetterText(''); setLetterType(''); setUploadedFileUrl(null); setEmailSent(false); setEmailAddr(''); setDecodeError(null); };

  const sendEmail = async () => {
    if (!emailAddr.trim() || !result || emailing) return;
    setEmailing(true);
    const body = `SORTED decoded your letter.\n\n${result.we_hear_you ? result.we_hear_you + '\n\n' : ''}─────────────────────\nWHAT THIS MEANS\n─────────────────────\n${result.what_this_means}\n\nSEVERITY: ${result.severity}\n${result.severity_explanation}\n\n${result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' ? `─────────────────────\nMONEY AT STAKE\n─────────────────────\n${result.financial_impact}\n\n` : ''}${result.if_you_ignore_this ? `─────────────────────\nIF YOU IGNORE THIS\n─────────────────────\n${result.if_you_ignore_this}\n\n` : ''}─────────────────────\nWHAT TO DO\n─────────────────────\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${result.free_help?.length > 0 ? `─────────────────────\nFREE HELP AVAILABLE\n─────────────────────\n${result.free_help.join('\n\n')}\n\n` : ''}KEY DEADLINE: ${result.key_deadline}\n\nDON'T PANIC: ${result.dont_panic}\n\n─────────────────────\nSORTED — sorted.family51.com\nNothing is stored. This email was sent at your request only.`;
    await base44.integrations.Core.SendEmail({ to: emailAddr.trim(), subject: `Your SORTED breakdown — ${result.severity}`, body });
    setEmailSent(true);
    setEmailing(false);
  };

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

      {/* INLINE LOADER — no full screen takeover */}
      <AnimatePresence>
        {(loading || uploading) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '28px 20px',
              borderRadius: 16,
              background: 'rgba(0,0,0,0.4)',
              border: `1px solid ${accentColor}30`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
              <motion.path
                d="M2 16 L6 16 L8 8 L10 24 L12 12 L14 20 L16 6 L18 26 L20 10 L22 22 L24 14 L26 18 L30 16"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', color: accentColor, margin: '0 0 6px' }}>
                {uploading ? 'UPLOADING YOUR FILE…' : 'DECODING YOUR LETTER…'}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', margin: 0 }}>
                {uploading ? 'Sending securely — just a moment' : 'Reading every word with AI — 15–30 seconds'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, display: 'block', opacity: 0.4 }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORM — hidden while loading */}
      {!loading && !uploading && (<>

      {/* GEO — auto detected, tap to change */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>📍 Auto-detected:</span>
        <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
      </div>

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

      {/* UPLOAD OR PASTE — two separate buttons */}
      <div>
        {/* Hidden inputs */}
        <input ref={fileInputRef} type="file" accept="image/*,application/pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: 'none' }} />

        {uploadedFileUrl ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.08)' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e', letterSpacing: '0.1em' }}>✓ FILE UPLOADED — READY TO DECODE</span>
            <button onClick={() => { setUploadedFileUrl(null); setLetterText(''); }} style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.08em' }}>REMOVE</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => cameraInputRef.current?.click()}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 12, fontSize: 11, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: `1px solid ${accentColor}40`,
                background: `${accentColor}10`, color: accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              TAKE PHOTO
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => fileInputRef.current?.click()}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 12, fontSize: 11, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: `1px solid ${accentColor}40`,
                background: `${accentColor}10`, color: accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              UPLOAD FILE
            </motion.button>
          </div>
        )}
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em', marginTop: 6, textAlign: 'center' }}>Photo, PDF, Word doc — we read it all</p>
      </div>

      {/* PASTE AREA — only show if no file uploaded */}
      {!uploadedFileUrl && (
        <>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', marginBottom: 8, textAlign: 'center' }}>— or type / paste below —</p>
          <div className="space-y-2">
            <Label>OR PASTE YOUR LETTER</Label>
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

          {/* DECODE BUTTON — only for text input */}
          <motion.button
            onClick={decode}
            disabled={!letterText.trim() || loading}
            whileTap={!loading && letterText.trim() ? { scale: 0.97 } : {}}
            style={{
              width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 13,
              fontWeight: 800, letterSpacing: '0.12em',
              cursor: letterText.trim() && !loading ? 'pointer' : 'not-allowed',
              border: `1px solid ${letterText.trim() ? accentColor : 'rgba(255,255,255,0.1)'}`,
              background: letterText.trim() ? `${accentColor}15` : 'transparent',
              color: letterText.trim() ? accentColor : 'rgba(255,255,255,0.2)',
              transition: 'all 0.2s',
            }}
          >
            DECODE THIS LETTER
          </motion.button>
        </>
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

            {/* AT A GLANCE — top summary card */}
            {sev && (
              <div style={{ background: sev.bg, border: `2px solid ${sev.border}`, borderRadius: 14, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>AT A GLANCE</span>
                  <span style={{ fontSize: 11, fontWeight: 900, color: sev.color, letterSpacing: '0.1em', padding: '3px 10px', borderRadius: 20, border: `1px solid ${sev.color}50`, background: `${sev.color}15` }}>{result.severity}</span>
                </div>
                {/* What is it */}
                <div>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{result.letter_summary || 'Official letter'}</p>
                  {result.sender && result.sender !== 'Unknown' && (
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', letterSpacing: '0.04em' }}>From: {result.sender}</p>
                  )}
                </div>
                {/* Deadline row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 15 }}>📅</span>
                  <div>
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', display: 'block' }}>KEY DATE</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: result.key_deadline === 'No deadline mentioned' ? 'rgba(255,255,255,0.4)' : '#fff' }}>{result.key_deadline}</span>
                  </div>
                </div>
                {/* Why urgent */}
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{result.severity_explanation}</p>
              </div>
            )}

            {/* HONESTY BADGE — anti-hallucination trust signal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontSize: 13 }}>🛡️</span>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>
                SORTED flags anything it's unsure about. If you see <span style={{ color: 'rgba(255,165,0,0.7)', fontWeight: 700 }}>(verify this)</span> — double-check that specific detail before acting on it.
              </p>
            </div>

            {/* 1. REASSURANCE FIRST — for the scared person */}
            {result.we_hear_you && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>💙</span>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>{result.we_hear_you}</p>
              </div>
            )}

            {/* 2. PLAIN ENGLISH — what is this thing */}
            <ResultCard label="WHAT THIS MEANS" color={accentColor}>
              <p style={{ fontSize: 15, color: '#fff', lineHeight: 1.7, margin: 0 }}>{result.what_this_means}</p>
            </ResultCard>

            {/* 3. WHAT TO DO — the most important thing after understanding */}
            <ResultCard label="WHAT TO DO — STEP BY STEP" color={accentColor}>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result.action_steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < (result.action_steps.length - 1) ? 14 : 0, borderBottom: i < (result.action_steps.length - 1) ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: '#000', minWidth: 22, height: 22, background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.65 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </ResultCard>

            {/* 4. FREE HELP — right after steps, people need to know help exists */}
            {result.free_help?.length > 0 && (
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(34,197,94,0.7)', margin: '0 0 10px' }}>🆓 FREE HELP NEAR YOU</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {result.free_help.map((help, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0, paddingLeft: 4, borderLeft: '2px solid rgba(34,197,94,0.3)' }}>{help}</p>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CONSEQUENCES — collapse into a lower section so it informs without scaring upfront */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' && (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>💰</span>
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(239,68,68,0.5)', margin: '0 0 4px' }}>MONEY AT STAKE</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>{result.financial_impact}</p>
                  </div>
                </div>
              )}
              {result.if_you_ignore_this && (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(249,115,22,0.6)', margin: '0 0 4px' }}>IF YOU IGNORE THIS</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: 0 }}>{result.if_you_ignore_this}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 6. CLOSING REASSURANCE */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>✓ {result.dont_panic}</p>
            </div>

            {/* HANDOFF — write a reply to this letter */}
            {onHandoff && (
              <motion.button
                onClick={() => onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, what_this_means: result.what_this_means })}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 13,
                  fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer',
                  border: '1px solid rgba(6,182,212,0.5)',
                  background: 'rgba(6,182,212,0.1)', color: '#06b6d4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'all 0.15s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                WRITE A REPLY TO THIS LETTER
              </motion.button>
            )}

            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
              <motion.button onClick={copyAll} whileTap={{ scale: 0.95 }} style={secondaryBtn}>
                {copied ? 'COPIED' : 'COPY BREAKDOWN'}
              </motion.button>
              <motion.button onClick={reset} whileTap={{ scale: 0.95 }} style={{ ...secondaryBtn, color: accentColor, borderColor: accentColor + '40' }}>
                DECODE ANOTHER
              </motion.button>
            </div>

            {/* EMAIL TO SELF */}
            <EmailToSelf emailAddr={emailAddr} setEmailAddr={setEmailAddr} onSend={sendEmail} sent={emailSent} sending={emailing} accentColor={accentColor} />

            {/* SHARE THE TOOL */}
            <SortedShareButton accentColor={accentColor} />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

function EmailToSelf({ emailAddr, setEmailAddr, onSend, sent, sending, accentColor }) {
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
          onClick={onSend}
          disabled={!emailAddr.trim() || sending}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '9px 16px', borderRadius: 8, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: emailAddr.trim() && !sending ? 'pointer' : 'not-allowed', border: `1px solid ${accentColor}50`, background: `${accentColor}15`, color: accentColor, whiteSpace: 'nowrap' }}
        >
          {sending ? '...' : 'SEND'}
        </motion.button>
      </div>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', margin: '6px 0 0', letterSpacing: '0.04em' }}>One-time send. Never stored or reused.</p>
    </div>
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