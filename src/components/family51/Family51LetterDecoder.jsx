import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedThinkingSteps from './SortedThinkingSteps';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import { buildSortedGeoPromptContext } from '@/utils/sortedGeoContext';
import { buildPrompt } from '@/utils/sortedPrompts';
import { buildLearningContext } from '@/utils/sortedLearning';
import GeoSelector from './GeoSelector';
import SortedShareButton from './SortedShareButton';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';
import SortedStreamingResult from './SortedStreamingResult';
import SortedPatternShareToggle from './SortedPatternShareToggle';

const LETTER_TYPES = [
  'Council tax', 'Energy bill', 'Rent / landlord', 'Debt collector',
  'NHS / medical', 'School / college', 'Employer / HR', 'Parking fine',
  'Driving / traffic', 'Benefits / DWP', 'Court / legal', 'Tax / government', 'Immigration', 'Other',
];

const EXAMPLE_LETTERS = [
  { type: 'Council Tax', text: 'FINAL NOTICE\nCouncil Tax Arrears: £1,247\nPay within 7 days or bailiffs will be instructed.\nHackney Council' },
  { type: 'Energy Bill', text: 'URGENT: Your account is £347 in arrears. Your energy supply will be disconnected within 14 days unless payment is received.' },
  { type: 'Debt Collector', text: 'We have been instructed to collect £2,890. This is your final opportunity before legal action. Lowell Financial Ltd.' },
  { type: 'Parking Fine', text: 'Penalty Charge Notice: £130. Reduced to £65 if paid within 14 days. Contravention: parked outside designated bay.' },
  { type: 'Landlord', text: 'Section 21 Notice: You are required to vacate the property within 2 months. No fault eviction.' },
];

const SEVERITY_CONFIG = {
  'NOT URGENT':    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.3)' },
  'NEEDS ATTENTION': { color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
  'URGENT':        { color: '#d97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.3)' },
  'VERY URGENT':   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)' },
  'EXPIRED':       { color: '#22c55e', bg: 'rgba(34,197,94,0.06)',   border: 'rgba(34,197,94,0.25)' },
};

const LOADING_STEPS = [
  { text: 'Analyzing…',                  sub: 'This stays private — nothing is stored' },
  { text: 'Identifying what this is…',   sub: 'Matching to known letter types' },
  { text: 'Checking any deadlines…',     sub: 'Dates matter — we\'re looking' },
  { text: 'Finding your options…',       sub: 'What you can actually do' },
  { text: 'Almost there…',               sub: 'Plain English coming up' },
];

export default function Family51LetterDecoder({ accentColor = '#f97316', onResult, onHandoff, triggerPhoto, prefillFileUrl, onPhotoTriggered }) {
  const [letterText, setLetterText] = useState('');
  const [letterType, setLetterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);

  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [geo, setGeo] = useState(() => detectGeo());
  const [decodeError, setDecodeError] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const geoRef = useRef(geo);
  const letterTypeRef = useRef(letterType);
  const resultRef = useRef(null);

  // Keep refs in sync so handleFileUpload always has fresh values
  useEffect(() => { geoRef.current = geo; }, [geo]);
  useEffect(() => { letterTypeRef.current = letterType; }, [letterType]);

  // Scroll to result when it appears
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  // Auto-trigger camera when SNAP PHOTO is clicked on home screen
  useEffect(() => {
    if (triggerPhoto && cameraInputRef.current) {
      setTimeout(() => {
        cameraInputRef.current?.click();
        onPhotoTriggered && onPhotoTriggered();
      }, 400);
    }
  }, [triggerPhoto]);

  // Pre-fill with uploaded file URL from home screen photo button
  useEffect(() => {
    if (prefillFileUrl && !uploadedFileUrl) {
      setUploadedFileUrl(prefillFileUrl);
      setLetterText('[Photo uploaded — AI will read it directly]');
      // Auto-decode
      setTimeout(() => runDecode(prefillFileUrl, null), 300);
    }
  }, [prefillFileUrl]);

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
        setDecodeError('You\'ve used your 3 free uses. Subscribe for unlimited access.');
        setLoading(false);
        return;
      }
      const currentGeo = geoRef.current;
      const currentType = letterTypeRef.current;
      const geoContext = buildSortedGeoPromptContext(currentGeo);

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

      const learningContext = buildLearningContext(currentType || 'letter');
      const promptText = buildPrompt('LETTER_DECODER', geoContext, letterContent, currentType) + learningContext;

      const response = await base44.integrations.Core.InvokeLLM({
        model: 'claude_sonnet_4_6',
        ...(visionFileUrl ? { file_urls: [visionFileUrl] } : {}),
        prompt: promptText,
        response_json_schema: {
          type: 'object',
          properties: {
            letter_summary: { type: 'string' },
            severity: { type: 'string' },
            key_deadline: { type: 'string' },
            amount: { type: 'string' },
            we_hear_you: { type: 'string' },
            what_this_means: { type: 'string' },
            if_you_ignore_this: { type: 'string' },
            action_steps: { type: 'array', items: { type: 'string' } },
            free_help: { type: 'array', items: { type: 'string' } },
            expired: { type: 'boolean' },
          },
          required: ['letter_summary', 'severity', 'what_this_means', 'action_steps', 'free_help'],
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
      const STRING_FIELDS = ['letter_summary','sender','severity','key_deadline','amount','we_hear_you','what_this_means','if_you_ignore_this','one_sentence','financial_impact'];
      STRING_FIELDS.forEach(k => { if (raw[k] && typeof raw[k] === 'object') raw[k] = JSON.stringify(raw[k]); });
      // Backwards compat: map old field names to new ones
      if (raw.three_steps && !raw.action_steps) raw.action_steps = raw.three_steps;
      if (raw.one_sentence && !raw.what_this_means) raw.what_this_means = raw.one_sentence;
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

  // Read a .docx file client-side — no upload needed, works offline/poor signal
  const readDocxClientSide = (file) => new Promise((resolve, reject) => {
    console.log('[SORTED] readDocxClientSide starting for:', file.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        console.log('[SORTED] File loaded, size:', e.target.result.byteLength, 'bytes');
        const arrayBuffer = e.target.result;
        const uint8 = new Uint8Array(arrayBuffer);
        console.log('[SORTED] Uint8Array created, length:', uint8.length);
        
        // Use TextDecoder to extract text
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const text = decoder.decode(uint8);
        console.log('[SORTED] Decoded text length:', text.length);
        
        // Extract text between XML tags — handles most docx content
        const xmlMatches = text.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
        console.log('[SORTED] Found XML matches:', xmlMatches.length);
        
        const extracted = xmlMatches
          .map(m => m.replace(/<[^>]+>/g, ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        console.log('[SORTED] Extracted text length:', extracted.length);
        console.log('[SORTED] Extract preview:', extracted.slice(0, 200) + '...');
        
        if (extracted.length > 20) {
          resolve(extracted);
        } else {
          reject(new Error('Could not read document text - extracted only ' + extracted.length + ' chars'));
        }
      } catch (err) {
        console.error('[SORTED] DOCX extraction error:', err);
        reject(err);
      }
    };
    reader.onerror = (err) => {
      console.error('[SORTED] FileReader error:', err);
      reject(new Error('File read failed'));
    };
    reader.readAsArrayBuffer(file);
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('[SORTED] No file selected');
      return;
    }
    
    console.log('[SORTED] File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      extension: file.name.split('.').pop()?.toLowerCase()
    });
    
    if (file.size > 10 * 1024 * 1024) {
      setDecodeError('That file is too large. For best results, snap a photo of the relevant page instead.');
      e.target.value = '';
      return;
    }
    
    // Set uploading state BEFORE any async operations
    setUploading(true);
    setLoading(true);
    setDecodeError(null);
    setResult(null);
    setUploadedFileUrl(null);
    setLetterText('');

    const isDocx = file.name?.toLowerCase().endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isDoc = file.name?.toLowerCase().endsWith('.doc');

    try {
      // For Word docs — extract text client-side first (no upload needed, works on poor signal)
      if (isDocx) {
        console.log('[SORTED] DOCX detected, extracting client-side:', file.name, file.type);
        try {
          const extractedText = await readDocxClientSide(file);
          console.log('[SORTED] DOCX extracted, length:', extractedText.length);
          setUploading(false);
          setLetterText(extractedText);
          // Don't clear input yet - wait for decode to complete
          await runDecode(null, extractedText);
          e.target.value = '';
          return;
        } catch (docxErr) {
          console.error('[SORTED] Client-side docx extraction failed:', docxErr);
          setDecodeError(`Could not read .docx file. Please copy the text from your document and paste it instead.`);
          setUploading(false);
          setLoading(false);
          e.target.value = '';
          return;
        }
      }

      // For .doc files — not supported
      if (isDoc) {
        console.log('[SORTED] .doc file detected (old format)');
        setDecodeError('Old .doc format not supported. Please save as .docx or copy/paste the text.');
        setUploading(false);
        setLoading(false);
        e.target.value = '';
        return;
      }

      // For images and PDFs — upload then decode
      // Retry upload up to 2 times on network error
      let file_url;
      let lastErr;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          console.log('[SORTED] Uploading file:', file.name, file.type, file.size);
          const result = await base44.integrations.Core.UploadFile({ file });
          console.log('[SORTED] Upload successful:', result.file_url);
          file_url = result.file_url;
          break;
        } catch (err) {
          console.error(`[SORTED] Upload attempt ${attempt + 1} failed:`, err);
          lastErr = err;
          if (attempt < 1) await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
        }
      }
      if (!file_url) {
        console.error('[SORTED] Upload failed after retries:', lastErr);
        throw lastErr || new Error('Upload failed after retries');
      }

      setUploadedFileUrl(file_url);
      setLetterText('[File uploaded — AI will read it directly]');
      setUploading(false);
      await runDecode(file_url, null);
    } catch (err) {
      console.error('SORTED upload error:', err);
      const isNetwork = err?.message?.toLowerCase().includes('network') || err?.message?.toLowerCase().includes('fetch');
      setDecodeError(
        isNetwork
          ? 'Network error — poor signal? Try copying the text from your document and pasting it in instead.'
          : `Upload failed: ${err?.message || 'Unknown error'}. Try pasting the text instead.`
      );
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



  // sev used only by old inline result — now handled by SortedStreamingResult

  return (
    <div className="space-y-5">
      <style>{`textarea::placeholder { color: rgba(26,18,8,0.35) !important; } input::placeholder { color: rgba(26,18,8,0.35) !important; }`}</style>

      {/* THINKING STEPS LOADER */}
      <AnimatePresence>
        {(loading || uploading) && (
          <SortedThinkingSteps tool="letter" accentColor={accentColor} isActive={loading || uploading} inputHint={letterText} geo={geo} />
        )}
      </AnimatePresence>

      {/* UPLOADING FEEDBACK */}
      {uploading && (
        <div style={{ padding: '16px 18px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.06)', textAlign: 'center', marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: '#22c55e', fontWeight: 800, margin: '0 0 4px', letterSpacing: '0.08em' }}>
            READING YOUR PHOTO...
          </p>
          <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)', margin: 0 }}>
            This takes a few seconds — nothing is stored
          </p>
        </div>
      )}

      {/* FORM — hidden while loading */}
      {!loading && !uploading && (<>

      {/* Hidden inputs */}
      <input ref={fileInputRef} type="file" accept="image/*,.pdf,.doc,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword" onChange={handleFileUpload} style={{ display: 'none' }} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: 'none' }} />

      {/* STEP 1: MAIN INPUT — paste or snap, nothing else */}
      {!uploadedFileUrl && !result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* EXAMPLE LETTERS — reduce anxiety, show it works */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.45)', margin: '0 0 8px' }}>
              GOT ONE OF THESE? TAP TO SEE HOW SORTED HELPS →
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {EXAMPLE_LETTERS.map((ex, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setLetterText(ex.text);
                    // Just fill the text - let them choose when to decode
                  }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    fontSize: 10, fontWeight: 700, color: 'rgba(26,18,8,0.5)',
                    border: '1px solid rgba(26,18,8,0.12)', borderRadius: 8,
                    padding: '6px 10px', background: 'transparent', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = accentColor; e.target.style.color = accentColor; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(26,18,8,0.12)'; e.target.style.color = 'rgba(26,18,8,0.5)'; }}
                >
                  {ex.type}
                </motion.button>
              ))}
            </div>
          </div>

          {/* BIG PASTE AREA — first thing they see */}
          <textarea
            value={letterText}
            onChange={e => setLetterText(e.target.value)}
            placeholder="Paste your letter here — or take a photo below.

Don't worry about formatting. Just get it all in. If the law applies in a different country, just mention it."
            style={{
              width: '100%', height: 200, background: '#fff',
              border: `1.5px solid ${letterText ? accentColor + '90' : 'rgba(26,18,8,0.15)'}`,
              borderRadius: 14, color: '#1a1208', fontSize: 14, padding: '16px 18px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.65,
              transition: 'border-color 0.2s', boxSizing: 'border-box',
              caretColor: accentColor,
            }}
            onFocus={e => e.target.style.borderColor = accentColor}
            onBlur={e => e.target.style.borderColor = letterText ? accentColor + '90' : 'rgba(26,18,8,0.15)'}
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
                 background: accentColor, color: '#fff',
                }}
                >
                Decode this letter →
            </motion.button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => cameraInputRef.current?.click()}
                style={{
                  width: '100%', padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                  letterSpacing: '0.04em', cursor: 'pointer',
                  border: `2px solid ${accentColor}`,
                  background: accentColor, color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                Snap a photo
                </motion.button>
                <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  console.log('[SORTED] Upload button clicked, triggering file input');
                  fileInputRef.current?.click();
                }}
                style={{
                 width: '100%', padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                 letterSpacing: '0.02em', cursor: 'pointer',
                 border: `1px solid rgba(26,18,8,0.2)`,
                 background: 'transparent', color: 'rgba(26,18,8,0.55)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                }}
                >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                 <polyline points="17 8 12 3 7 8"/>
                 <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Upload a file
                </motion.button>
            </div>
          )}

          {/* SUBTLE TRUST LINE */}
          <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.4)', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
            Nothing is stored. For long documents, just snap the key page.
          </p>
        </div>
      )}

      {/* FILE UPLOADED STATE */}
      {uploadedFileUrl && !result && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.08)' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#22c55e', letterSpacing: '0.1em' }}>FILE READY — DECODING NOW</span>
          <button onClick={() => { setUploadedFileUrl(null); setLetterText(''); }} style={{ fontSize: 10, color: 'rgba(26,18,8,0.45)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.08em' }}>REMOVE</button>
        </div>
      )}

      {/* OPTIONAL EXTRAS — only shown after result or when they've started typing */}
      {letterText.trim() && !result && (
      <div style={{ paddingTop: 4 }}>
       {/* PATTERN SHARING - opt-in to help others */}
       <SortedPatternShareToggle accentColor={accentColor} />
       
       {/* GEO — always visible when typing */}
       <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '8px 12px', borderRadius: 10, background: '#fff', border: '1px solid rgba(26,18,8,0.1)' }}>
       <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(26,18,8,0.3)' }} />
       <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(26,18,8,0.5)' }}>LOCATION:</span>
            <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
          </div>
          {/* TYPE CHIPS — collapsible optional hint */}
          <details style={{ cursor: 'pointer' }}>
            <summary style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,18,8,0.45)', letterSpacing: '0.1em', listStyle: 'none', userSelect: 'none' }}>
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
            <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 6px', fontWeight: 800, letterSpacing: '0.08em' }}>SOMETHING WENT WRONG</p>
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

      {/* RESULT — streaming reveal */}
      <AnimatePresence>
        {result && (
          <motion.div ref={resultRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            {/* BACK BUTTON - top of result */}
            <button
              onClick={reset}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.45)',
                background: 'none', border: 'none', cursor: 'pointer',
                marginBottom: 12, letterSpacing: '0.06em',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Try another letter
            </button>
            
            <SortedStreamingResult
              result={result}
              accentColor={accentColor}
              onHandoff={onHandoff}
              onReset={reset}
              caseId={caseId}
              geo={geo}
            />
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
  return <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(26,18,8,0.35)', marginBottom: 0 }}>{children}</p>;
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

function ResultCard({ label, color, children }) {
  return (
    <div style={{ border: `1px solid ${color}40`, borderRadius: 12, padding: '14px 18px', background: '#1a1208' }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: color, marginBottom: 10 }}>{label}</p>
      {children}
    </div>
  );
}



const secondaryBtn = {
  flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(26,18,8,0.12)',
  background: 'transparent', color: 'rgba(26,18,8,0.4)', transition: 'all 0.15s',
};