import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedThinkingSteps from './SortedThinkingSteps';
import { base44 } from '@/api/base44Client';
import { detectGeo } from '@/hooks/useSortedGeo';
import { getScamReportingBody } from '@/utils/sortedGeoContext';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';
import SortedShareMomentScam from './SortedShareMomentScam';
import { SORTED_SOUL } from '@/utils/sortedSoul';
import SortedFeedback from './SortedFeedback';
import ScamInstantScan from './ScamInstantScan';

const LOADING_STEPS = [
  { text: 'Reading your message…',      sub: 'Analysing carefully' },
  { text: 'Checking known scam patterns…', sub: 'We\'ve seen thousands of these' },
  { text: 'Checking sender details…',    sub: 'Numbers, links, addresses' },
  { text: 'Working out the verdict…',   sub: 'Almost there' },
];

const VERDICT = {
  safe:    { color: '#22c55e', bg: 'rgba(34,197,94,0.10)',  border: 'rgba(34,197,94,0.35)',  label: 'Looks Legitimate', icon: 'check' },
  warning: { color: '#eab308', bg: 'rgba(234,179,8,0.10)', border: 'rgba(234,179,8,0.35)',  label: 'Be Careful', icon: 'warning' },
  scam:    { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.35)',  label: 'Almost Certainly a Scam', icon: 'scam' },
};

function VerdictIcon({ type, color }) {
  if (type === 'check') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5"/>
      <path d="M15 24l6 6 12-12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (type === 'warning') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 4L2 42h44L24 4z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
      <line x1="24" y1="18" x2="24" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="24" cy="34" r="1.5" fill={color}/>
    </svg>
  );
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5"/>
      <line x1="24" y1="14" x2="24" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="24" cy="34" r="1.5" fill={color}/>
    </svg>
  );
}

export default function Family51ScamChecker({ accentColor = '#ef4444', onResult }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const geo = detectGeo();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    if (!loading) { setLoadingStep(0); return; }
    const interval = setInterval(() => {
      setLoadingStep(s => s < LOADING_STEPS.length - 1 ? s + 1 : s);
    }, 3500);
    return () => clearInterval(interval);
  }, [loading]);

  const runCheck = async (fileUrl, text) => {
    setLoading(true);
    setLoadingStep(0);
    setResult(null);
    setError(null);

    // Check rate limit BEFORE running the LLM — don't waste credits on blocked users
    try {
      const limitCheck = await recordSortedUse();
      if (!limitCheck.allowed) {
        setError('You\'ve used your 3 free uses. Subscribe for unlimited access.');
        setLoading(false);
        return;
      }
    } catch {}

    try {
      let visionFileUrl = null;
      let content = text;

      if (fileUrl) {
        const lowerUrl = fileUrl.toLowerCase();
        const isImage = lowerUrl.match(/\.(jpg|jpeg|png|gif|webp|heic|heif)/) || lowerUrl.includes('image/');
        if (isImage) {
          visionFileUrl = fileUrl;
        } else {
          const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
            file_url: fileUrl,
            json_schema: { type: 'object', properties: { full_text: { type: 'string' } } },
          });
          content = extracted?.output?.full_text || text || '';
        }
      }

      const response = await base44.integrations.Core.InvokeLLM({
        model: 'claude_sonnet_4_6',
        ...(visionFileUrl ? { file_urls: [visionFileUrl] } : {}),
        prompt: SORTED_SOUL + '\n' + `Check if this message is a scam. The person may be elderly or vulnerable — be warm, clear, never scary.

The person is in: ${geo.country}.

They have shared this message/letter/email/text:
${content ? `\n---\n${content}\n---` : '(See attached image)'}

Analyse it carefully. Common scam types include:
- Parcel delivery scams (Royal Mail, DPD, Evri, FedEx, UPS)
- HMRC / tax refund scams
- Bank security alert scams
- Prize / lottery scams
- Tech support scams (Microsoft, Apple, BT)
- Investment / crypto scams
- Romance scams
- Utility company scams
- Government impersonation (DVLA, DWP, NHS)
- Solicitor / inheritance scams
- Threatening debt scams from non-existent companies

Key scam red flags:
- Urgency / panic language
- Request to click a link, call a number, or pay immediately
- Typos, odd grammar, generic greetings
- Request for personal details, bank details, or gift cards
- Too-good-to-be-true offers
- Threats of arrest, fines, account closure
- Links that don't match the official domain

Return JSON with these exact fields:
- verdict: exactly one of: safe / warning / scam
- confidence: a percentage string e.g. "94% likely a scam"
- scam_type: short name for the type of scam (or "Not a scam" / "Unknown")
- what_this_is: 2-3 sentences. Plain English. What IS this? What's the scammer trying to do or get?
- red_flags: array of 2-5 specific red flags found in this message. Be specific to what's actually in the text — don't be generic.
- what_to_do: array of exactly 3 clear, calm action steps. No jargon. E.g. "Do not click any links in this message", "Forward it to report@phishing.gov.uk", "Block this number"
- report_to: use this exact string for their country: "${getScamReportingBody(geo)}"
- reassurance: one warm, calm sentence. E.g. "You did the right thing checking — this is a very common scam and you haven't lost anything by looking."`,
        response_json_schema: {
          type: 'object',
          properties: {
            verdict:      { type: 'string' },
            confidence:   { type: 'string' },
            scam_type:    { type: 'string' },
            what_this_is: { type: 'string' },
            red_flags:    { type: 'array', items: { type: 'string' } },
            what_to_do:   { type: 'array', items: { type: 'string' } },
            report_to:    { type: 'string' },
            reassurance:  { type: 'string' },
          },
        },
      });

      let raw = response;
      if (typeof raw === 'string') { try { raw = JSON.parse(raw); } catch { raw = null; } }
      if (raw?.response && typeof raw.response === 'object') raw = raw.response;
      if (!raw || !raw.verdict) throw new Error('Could not analyse this. Please try again.');

      setResult(raw);
      // Save to case history
      saveCaseToHistory({
        tool: 'scam',
        input_text: text,
        ai_result: JSON.stringify(raw),
        summary: `${raw.scam_type || 'Scam check'} — ${raw.confidence}`,
        severity: raw.verdict === 'scam' ? 'urgent' : raw.verdict === 'warning' ? 'important' : 'routine',
      });
      onResult?.();
      } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      } finally {
      setLoading(false);
      setUploading(false);
      }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedFileUrl(file_url);
      setUploading(false);
      await runCheck(file_url, null);
    } catch (err) {
      setError('Upload failed. Try again or paste the text instead.');
      setUploading(false);
      setLoading(false);
    }
    e.target.value = '';
  };

  const check = async () => {
    if (!inputText.trim() && !uploadedFileUrl) return;
    await runCheck(uploadedFileUrl || null, inputText);
  };

  const reset = () => {
    setResult(null);
    setInputText('');
    setUploadedFileUrl(null);
    setError(null);
  };

  const v = result ? (VERDICT[result.verdict] || VERDICT.warning) : null;

  return (
    <div className="space-y-5">
      <style>{`textarea::placeholder { color: rgba(26,18,8,0.35) !important; } input::placeholder { color: rgba(26,18,8,0.35) !important; }`}</style>

      {/* HIDDEN FILE INPUTS */}
      <input ref={fileInputRef} type="file" accept="image/*,application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: 'none' }} />

      {/* THINKING STEPS LOADER */}
      <AnimatePresence>
        {loading && (
          <SortedThinkingSteps tool="scam" accentColor={accentColor} isActive={loading} inputHint={inputText} geo={geo} />
        )}
      </AnimatePresence>

      {/* FORM */}
      {!loading && !result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Paste the message, email, or text here — or take a photo of the letter.

Copy exactly what it says — every word helps us check it.`}
            style={{
              width: '100%', height: 200, background: '#fff',
              border: `1.5px solid ${inputText ? accentColor + '90' : 'rgba(26,18,8,0.15)'}`,
              borderRadius: 14, color: '#1a1208', fontSize: 14, padding: '16px 18px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.65,
              transition: 'border-color 0.2s', boxSizing: 'border-box',
              caretColor: accentColor,
            }}
          />

          {inputText.trim() ? (
            <>
              <ScamInstantScan text={inputText} accentColor={accentColor} />
              <motion.button onClick={check} whileTap={{ scale: 0.97 }} style={{
                width: '100%', padding: '17px 0', borderRadius: 14, fontSize: 15,
                fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer',
                border: `2px solid ${accentColor}`, background: accentColor, color: '#fff',
              }}>
                Check this now →
              </motion.button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
               <motion.button whileTap={{ scale: 0.96 }} onClick={() => cameraInputRef.current?.click()} style={{
                 flex: 2, padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                 letterSpacing: '0.06em', cursor: 'pointer',
                 border: `2px solid ${accentColor}`, background: accentColor, color: '#fff',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
               }}>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                   <circle cx="12" cy="13" r="4"/>
                 </svg>
                 Snap a photo
                 </motion.button>
                 <motion.button whileTap={{ scale: 0.96 }} onClick={() => fileInputRef.current?.click()} style={{
                   flex: 1, padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                   letterSpacing: '0.02em', cursor: 'pointer',
                   border: `1px solid rgba(26,18,8,0.15)`, background: 'transparent', color: 'rgba(26,18,8,0.5)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                   Upload a file
                 </motion.button>
            </div>
          )}

          <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.4)', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
            Free. Your message is analysed by AI and saved to your case vault.
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ padding: '16px 18px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 8px', fontWeight: 800 }}>Something went wrong</p>
          <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.55)', margin: '0 0 10px' }}>{error}</p>
          <button onClick={() => setError(null)} style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', background: 'none', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}>DISMISS</button>
        </motion.div>
      )}

      {/* RESULT */}
      <AnimatePresence>
        {result && v && !loading && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* BIG VERDICT */}
            <div style={{ borderRadius: 16, border: `2px solid ${v.border}`, background: v.bg, padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><VerdictIcon type={v.icon} color={v.color} /></div>
              <div style={{ fontSize: 22, fontWeight: 900, color: v.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{v.label}</div>
              <div style={{ fontSize: 13, color: 'rgba(26,18,8,0.55)', fontWeight: 600 }}>{result.confidence}</div>
              {result.scam_type && result.scam_type !== 'Not a scam' && (
                <div style={{ marginTop: 10, display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: v.color, border: `1px solid ${v.border}`, borderRadius: 20, padding: '4px 12px' }}>
                  {result.scam_type.toUpperCase()}
                </div>
              )}
            </div>

            {/* REASSURANCE */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.08)' }}>
              <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.6 }}>{result.reassurance}</p>
            </div>

            {/* WHAT THIS IS */}
            {result.what_this_is && (
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(26,18,8,0.02)', border: '1px solid rgba(26,18,8,0.08)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(26,18,8,0.4)', margin: '0 0 8px' }}>WHAT THIS IS</p>
                <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.6 }}>{result.what_this_is}</p>
              </div>
            )}

            {/* RED FLAGS */}
            {result.red_flags?.length > 0 && (
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(239,68,68,0.7)', margin: '0 0 10px' }}>RED FLAGS WE SPOTTED</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.red_flags.map((flag, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                        <path d="M5 3v18M5 4h11l-2 4 2 4H5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.7)', lineHeight: 1.5 }}>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHAT TO DO */}
            {result.what_to_do?.length > 0 && (
              <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(34,197,94,0.7)', margin: '0 0 10px' }}>WHAT TO DO</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {result.what_to_do.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: '#22c55e' }}>{i + 1}</span>
                      </div>
                      <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.8)', lineHeight: 1.5 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REPORT TO — one-tap report button */}
            {result.report_to && (() => {
              const domainMatch = result.report_to.match(/[a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?/i);
              const reportUrl = domainMatch ? `https://${domainMatch[0].replace(/\.$/, '')}` : null;
              return (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(26,18,8,0.02)', border: '1px solid rgba(26,18,8,0.08)' }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.4)', margin: '0 0 5px' }}>REPORT IT</p>
                  <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', margin: '0 0 8px', lineHeight: 1.5 }}>{result.report_to}</p>
                  {reportUrl && (
                    <a href={reportUrl} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em',
                      color: '#fff', background: accentColor, borderRadius: 8, padding: '8px 16px',
                      textDecoration: 'none', cursor: 'pointer',
                    }}>
                      REPORT NOW →
                    </a>
                  )}
                </div>
              );
            })()}

            {/* SHARE + RESET */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <div style={{ flex: 1 }}>
                <SortedShareMomentScam result={result} accentColor={accentColor} />
              </div>
              <button onClick={reset} style={{ flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', border: `1px solid ${accentColor}40`, background: 'transparent', color: accentColor }}>
                CHECK ANOTHER
              </button>
            </div>

            <SortedFeedback tool="scam" accentColor={accentColor} />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}