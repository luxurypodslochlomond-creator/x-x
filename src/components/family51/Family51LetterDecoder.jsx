import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
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
  const [decodeError, setDecodeError] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const geoRef = useRef(geo);
  const letterTypeRef = useRef(letterType);

  // Keep refs in sync so handleFileUpload always has fresh values
  useEffect(() => { geoRef.current = geo; }, [geo]);
  useEffect(() => { letterTypeRef.current = letterType; }, [letterType]);

  const runDecode = async (fileUrl, text) => {
    setLoading(true);
    setUploading(false);
    setResult(null);
    setDecodeError(null);
    try {
      const currentGeo = geoRef.current;
      const currentType = letterTypeRef.current;
      const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const geoContext = `Today's date is ${today}. The person is in: ${currentGeo.country}. Apply ${currentGeo.jurisdiction} and locally relevant rights, bodies, and deadlines throughout your response. When calculating how urgent a deadline is, use today's date as your reference.`;

      // If file uploaded: extract text first, then decode as plain text — no file_urls needed
      let letterContent = text;
      if (fileUrl) {
        const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
          file_url: fileUrl,
          json_schema: { type: 'object', properties: { full_text: { type: 'string' } } },
        });
        letterContent = extracted?.output?.full_text || extracted?.output || text || '';
        if (!letterContent) throw new Error('Could not read the file. Please try a clearer photo or paste the text instead.');
      }

      const promptText = `You are SORTED — a straight-talking advisor who helps real people understand documents and letters. You sound like a knowledgeable friend — calm, clear, confident. Not dramatic. Not corporate. Not trying too hard to be relatable. Just genuinely useful. ${geoContext} A person has received this official letter${currentType ? ` (type: ${currentType})` : ''} and needs help understanding it.\n\nDOCUMENT:\n${letterContent}`;

      const response = await base44.integrations.Core.InvokeLLM({
        model: 'claude_sonnet_4_6',
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

      // Validate we actually got content back
      console.log('Raw response from API:', response, 'Type:', typeof response);
      
      if (!response) {
        console.error('No response from API');
        setDecodeError('No response received. Please try again.');
      } else if (typeof response === 'string') {
        // Claude sometimes returns a string instead of parsed JSON
        try {
          const parsed = JSON.parse(response);
          console.log('Parsed string response:', parsed);
          if (parsed.letter_summary || Object.keys(parsed).length > 0) {
            setResult(parsed);
            const severityMap = { 'NOT URGENT': 'routine', 'NEEDS ATTENTION': 'important', 'URGENT': 'urgent', 'VERY URGENT': 'urgent' };
            const caseId = saveCaseToHistory({
              tool: 'letter',
              input_text: text || '',
              ai_result: JSON.stringify(parsed),
              summary: parsed.letter_summary || parsed.summary || 'Decoded letter',
              severity: severityMap[parsed.severity] || 'unknown',
            });
            setCaseId(caseId);
            return;
          }
        } catch (e) {
          console.error('Failed to parse response as JSON:', response);
          setDecodeError('Could not understand response. Please try again.');
          return;
        }
      } else if (response && typeof response === 'object' && Object.keys(response).length > 0) {
        // Accept any object with content, be more forgiving with field names
        console.log('Object response accepted:', response);
        setResult(response);
        const severityMap = { 'NOT URGENT': 'routine', 'NEEDS ATTENTION': 'important', 'URGENT': 'urgent', 'VERY URGENT': 'urgent' };
        const caseId = saveCaseToHistory({
          tool: 'letter',
          input_text: text || '',
          ai_result: JSON.stringify(response),
          summary: response.letter_summary || response.summary || Object.values(response)[0] || 'Decoded letter',
          severity: severityMap[response.severity] || 'unknown',
        });
        setCaseId(caseId);
      } else {
        console.error('Invalid response structure. Got:', response);
        setDecodeError('Could not decode this letter. Try uploading a clearer photo or paste the text instead.');
      }
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
              <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.15em', color: '#fff', margin: '0 0 4px' }}>
                {uploading ? 'READING YOUR FILE' : 'DECODING'}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', margin: 0 }}>
                {uploading ? 'Uploading securely' : 'AI reading every word — 15–30 sec'}
              </p>
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
        <Label>WHAT ARE YOU UPLOADING? (optional — helps us give better advice)</Label>
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