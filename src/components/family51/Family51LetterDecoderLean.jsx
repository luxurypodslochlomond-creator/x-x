import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import SortedShareButton from './SortedShareButton';

/**
 * ARCHITECTURE COMMENT 1: LEAN FLOW
 * This decoder follows a single, optimized path:
 * 1. User uploads/pastes a letter (no type selection, no geo picker)
 * 2. AI auto-detects letter type & severity from content
 * 3. Results flow directly to reply writer via onHandoff
 * All UI complexity stripped. AI does the thinking.
 */

const SEVERITY_CONFIG = {
  'NOT URGENT':    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.3)' },
  'NEEDS ATTENTION': { color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
  'URGENT':        { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
  'VERY URGENT':   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)' },
};

export default function Family51LetterDecoderLean({ accentColor = '#f97316', onResult, onHandoff }) {
  /**
   * ARCHITECTURE COMMENT 2: STATE FLOW
   * - letterText: raw input (file or paste)
   * - uploadedFileUrl: file reference for extraction
   * - result: AI response (maps to reply writer)
   * - loading/uploading: UI states (no intermediate states)
   * - caseId: links decode → reply → conflict chain
   */
  const [letterText, setLetterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [decodeError, setDecodeError] = useState(null);
  const [caseId, setCaseId] = useState(null);
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const runDecode = async (fileUrl, text) => {
    setLoading(true);
    setUploading(false);
    setResult(null);
    setDecodeError(null);
    
    try {
      const geo = detectGeo();
      const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const geoContext = `Today's date is ${today}. The person is in: ${geo.country}. Apply ${geo.jurisdiction} and locally relevant rights, bodies, and deadlines throughout your response.`;

      // Extract text from file if uploaded
      let letterContent = text;
      if (fileUrl) {
        const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
          file_url: fileUrl,
          json_schema: { type: 'object', properties: { full_text: { type: 'string' } } },
        });
        letterContent = extracted?.output?.full_text || extracted?.output || text || '';
        if (!letterContent) throw new Error('Could not read the file. Please try a clearer photo or paste the text instead.');
      }

      // Simple, direct prompt — no type selection. AI figures it out.
      const promptText = `You are SORTED — a straight-talking advisor who helps real people understand official letters. Sound like a knowledgeable friend — calm, clear, confident. ${geoContext}\n\nA person has received this letter and needs help understanding it. Don't guess at what it is — read it carefully and tell them exactly what it means.\n\nLETTER:\n${letterContent}`;

      const response = await base44.integrations.Core.InvokeLLM({
        model: 'claude_sonnet_4_6',
        prompt: promptText + `\n\nBe specific. Be human. Give REAL information that actually helps.\n\nReturn a JSON object with these EXACT fields:\n- letter_summary: Max 6 words. What IS this letter. E.g. "Council tax debt demand".\n- sender: Organisation name or "Unknown".\n- severity: EXACTLY one of: NOT URGENT / NEEDS ATTENTION / URGENT / VERY URGENT\n- severity_explanation: One sentence. Why did you pick that rating?\n- key_deadline: The exact date from the letter, or "No deadline mentioned".\n- quick_reassurance: 2-3 bullet points (use •). Lead with calm.\n- we_hear_you: ONE grounded human sentence. No melodrama.\n- what_this_means: 3-4 sentences. Plain English. What triggered this, what it means day-to-day.\n- if_you_ignore_this: 2-3 sentences. What happens next if they don't respond.\n- financial_impact: Specific amount at risk, or "No specific financial amount mentioned."\n- action_steps: Array of exactly 5 specific steps with real phone numbers or websites.\n- free_help: Array of 2-3 FREE services relevant to their jurisdiction.\n- dont_panic: One honest, direct reassuring sentence.\n- suggested_tone: firm, calm, urgent, or formal.`,
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

      if (!response?.letter_summary) {
        throw new Error('Response parsing failed.');
      }

      setResult(response);

      // Save case with auto-detected severity
      const severityMap = { 'NOT URGENT': 'routine', 'NEEDS ATTENTION': 'important', 'URGENT': 'urgent', 'VERY URGENT': 'urgent' };
      const newCaseId = saveCaseToHistory({
        tool: 'letter',
        input_text: text || '',
        ai_result: JSON.stringify(response),
        summary: response.letter_summary || 'Decoded letter',
        severity: severityMap[response.severity] || 'unknown',
      });
      setCaseId(newCaseId);
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
    setLoading(true);
    setDecodeError(null);
    setResult(null);
    
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedFileUrl(file_url);
      setLetterText('[File uploaded — AI will read it]');
      setUploading(false);
      await runDecode(file_url, null);
    } catch (err) {
      console.error('Upload error:', err);
      setDecodeError(`Upload failed: ${err?.message || 'Could not upload file'}.`);
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

  const reset = () => {
    setResult(null);
    setLetterText('');
    setUploadedFileUrl(null);
    setDecodeError(null);
  };

  const copyAll = () => {
    if (!result) return;
    const text = `DECODED BY SORTED\n\n${result.we_hear_you}\n\nWHAT THIS MEANS:\n${result.what_this_means}\n\nSEVERITY: ${result.severity} — ${result.severity_explanation}\n\n${result.financial_impact !== 'No specific financial amount mentioned.' ? `MONEY AT STAKE: ${result.financial_impact}\n\n` : ''}${result.if_you_ignore_this ? `IF YOU IGNORE THIS: ${result.if_you_ignore_this}\n\n` : ''}WHAT TO DO:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nDEADLINE: ${result.key_deadline}\n\nDON'T PANIC: ${result.dont_panic}`;
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke={accentColor} strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={accentColor} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>
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

      {/* FORM */}
      {!loading && !uploading && (
        <>
          <div>
            <input ref={fileInputRef} type="file" accept="image/*,application/pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: 'none' }} />

            {uploadedFileUrl ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.08)' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e', letterSpacing: '0.1em' }}>✓ FILE UPLOADED — READY TO DECODE</span>
                <button onClick={() => { setUploadedFileUrl(null); setLetterText(''); }} style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>REMOVE</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => cameraInputRef.current?.click()}
                  style={{
                    flex: 1,
                    padding: '14px 0',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    border: `1px solid ${accentColor}40`,
                    background: `${accentColor}10`,
                    color: accentColor,
                  }}
                >
                  📷 TAKE PHOTO
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    flex: 1,
                    padding: '14px 0',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    border: `1px solid ${accentColor}40`,
                    background: `${accentColor}10`,
                    color: accentColor,
                  }}
                >
                  📁 UPLOAD FILE
                </motion.button>
              </div>
            )}
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em', marginTop: 6, textAlign: 'center' }}>Photo, PDF, Word doc</p>
          </div>

          {!uploadedFileUrl && (
            <>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', marginBottom: 8, textAlign: 'center' }}>— or paste below —</p>
              <textarea
                value={letterText}
                onChange={e => setLetterText(e.target.value)}
                placeholder="Paste the full letter here."
                style={{
                  width: '100%',
                  height: 180,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${letterText ? accentColor + '50' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: 13,
                  padding: '14px 16px',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.6,
                  boxSizing: 'border-box',
                }}
              />

              <motion.button
                onClick={decode}
                disabled={!letterText.trim() || loading}
                whileTap={!loading && letterText.trim() ? { scale: 0.97 } : {}}
                style={{
                  width: '100%',
                  padding: '15px 0',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  cursor: letterText.trim() && !loading ? 'pointer' : 'not-allowed',
                  border: `1px solid ${letterText.trim() ? accentColor : 'rgba(255,255,255,0.1)'}`,
                  background: letterText.trim() ? `${accentColor}15` : 'transparent',
                  color: letterText.trim() ? accentColor : 'rgba(255,255,255,0.2)',
                }}
              >
                DECODE
              </motion.button>
            </>
          )}
        </>
      )}

      {/* ERROR */}
      <AnimatePresence>
        {decodeError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ padding: '16px 18px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.1)', textAlign: 'center' }}
          >
            <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 6px', fontWeight: 800 }}>⚠ ERROR</p>
            <p style={{ fontSize: 12, color: 'rgba(239,68,68,0.8)', margin: '0 0 10px' }}>{decodeError}</p>
            <button
              onClick={() => setDecodeError(null)}
              style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', background: 'none', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}
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
            {/* HANDOFF TO REPLY */}
            {onHandoff && (
              <motion.button
                onClick={() => onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, what_this_means: result.what_this_means, suggestedTone: result.suggested_tone, related_case_id: caseId })}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  padding: '18px 0',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  border: `2px solid ${accentColor}`,
                  background: accentColor,
                  color: '#000',
                }}
              >
                WRITE MY REPLY NOW →
              </motion.button>
            )}

            {/* QUICK REASSURANCE */}
            {result.quick_reassurance && (
              <div style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}>
                {result.quick_reassurance.split('\n').filter(Boolean).map((line, i) => (
                  <p key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: i === 0 ? 0 : '6px 0 0', fontWeight: 500 }}>{line}</p>
                ))}
              </div>
            )}

            {/* SUMMARY */}
            {sev && (
              <div style={{ borderRadius: 14, padding: '20px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: sev.color, boxShadow: `0 0 6px ${sev.color}80` }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: sev.color, letterSpacing: '0.14em' }}>{result.severity}</span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.25 }}>{result.letter_summary}</p>
                {result.dont_panic && (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>{result.dont_panic}</p>
                )}
              </div>
            )}

            {/* WHAT THIS MEANS */}
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 10px' }}>WHAT THIS MEANS</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>{result.what_this_means}</p>
            </div>

            {/* WHAT TO DO */}
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', margin: '0 0 12px' }}>WHAT TO DO</p>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {result.action_steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: accentColor, minWidth: 18, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* SECONDARY ACTIONS */}
            <div style={{ display: 'flex', gap: 8 }}>
              <motion.button onClick={copyAll} whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.4)' }}>
                {copied ? '✓ COPIED' : 'COPY ALL'}
              </motion.button>
              <motion.button onClick={reset} whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.4)' }}>
                DECODE ANOTHER
              </motion.button>
            </div>

            <SortedShareButton accentColor={accentColor} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}