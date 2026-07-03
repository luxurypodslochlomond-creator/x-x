import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SortedThinkingSteps from './SortedThinkingSteps';
import SortedTimeline from './SortedTimeline';
import SortedFeedback from './SortedFeedback';
import SortedResultShell, { SortedResultSection, SortedBullets } from './SortedResultShell';

const CONTRACT_TYPES = [
  { id: 'tenancy',    label: 'Tenancy / Lease' },
  { id: 'employment', label: 'Employment' },
  { id: 'settlement', label: 'Settlement / Redundancy' },
  { id: 'service',    label: 'Service / T&Cs' },
  { id: 'other',      label: 'Other contract' },
];

const LOADING_STEPS = [
  { text: 'Reading every clause…',        sub: 'Finding the traps' },
  { text: 'Finding the traps…',           sub: 'Unfair terms, hidden obligations' },
  { text: 'Spotting your leverage…',      sub: 'What you can push back on' },
  { text: 'Almost done…',                 sub: 'Building your analysis' },
];

const verdictStyle = {
  looks_ok:         { color: '#059669', bg: 'rgba(5,150,105,0.10)',  border: 'rgba(5,150,105,0.30)',  label: 'Looks OK', icon: 'check' },
  review_carefully: { color: '#f5a623', bg: 'rgba(245,166,35,0.10)', border: 'rgba(245,166,35,0.30)', label: 'Review Carefully', icon: 'warning' },
  serious_concerns: { color: '#ef4444', bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.30)',  label: 'Serious Concerns', icon: 'alert' },
};

function ContractVerdictIcon({ type, color }) {
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

import { recordSortedUse } from '@/hooks/useSortedRateLimit';
import { SORTED_SOUL } from '@/utils/sortedSoul';
import ContractInstantScan from './ContractInstantScan';
import SortedPrivacyStrip from './SortedPrivacyStrip';

export default function SortedContractChecker({ accentColor = '#7c3aed', onResult, onHandoff }) {
  const [contractType, setContractType] = useState('');
  const [inputText, setInputText]       = useState('');
  const [loading, setLoading]           = useState(false);
  const [uploading, setUploading]       = useState(false);
  const [loadingStep, setLoadingStep]   = useState(0);
  const [result, setResult]             = useState(null);
  const [error, setError]               = useState(null);
  const [copied, setCopied]             = useState(false);

  const fileInputRef   = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    if (!loading) { setLoadingStep(0); return; }
    const interval = setInterval(() => {
      setLoadingStep(s => s < LOADING_STEPS.length - 1 ? s + 1 : s);
    }, 3500);
    return () => clearInterval(interval);
  }, [loading]);

  const runAnalysis = async (fileUrl, text) => {
    setLoading(true);
    setLoadingStep(0);
    setResult(null);
    setError(null);

    try {
      const limitCheck = await recordSortedUse();
      if (!limitCheck.allowed) {
        setError('You\'ve used your 3 free uses. Subscribe for unlimited access.');
        setLoading(false);
        return;
      }
    } catch {}

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

    const res = await base44.integrations.Core.InvokeLLM({
      model: 'claude_sonnet_4_6',
      ...(visionFileUrl ? { file_urls: [visionFileUrl] } : {}),
      prompt: SORTED_SOUL + '\n' + `Analyse this contract in plain language so an ordinary person understands what they're signing.

Detect what type of contract this is and state it in document_type.

CONTRACT TEXT:
${content ? `\n---\n${content}\n---` : '(See attached image)'}

Analyse this contract and respond ONLY with valid JSON in this exact format:
{
  "document_type": "what type of contract this is — tenancy, employment, service, settlement, etc.",
  "summary": "2-3 sentence plain language summary of what this contract is and what it commits the person to",
  "red_flags": ["list of concerning clauses, unfair terms, or things that could harm the person — each as a short plain sentence"],
  "what_is_missing": ["list of standard protections or clauses that are absent from this contract and should be there — these silences can be the most important thing"],
  "negotiate": ["list of specific things they could try to negotiate or push back on — practical and actionable"],
  "questions": ["list of questions they should ask before signing"],
  "verdict": "one of: looks_ok | review_carefully | serious_concerns",
  "verdict_reason": "one sentence explaining the verdict"
}`,
      response_json_schema: {
        type: 'object',
        properties: {
          document_type:    { type: 'string', description: 'What type of contract this is' },
          summary:          { type: 'string' },
          red_flags:        { type: 'array', items: { type: 'string' } },
          what_is_missing:  { type: 'array', items: { type: 'string' } },
          negotiate:        { type: 'array', items: { type: 'string' } },
          questions:        { type: 'array', items: { type: 'string' } },
          verdict:          { type: 'string' },
          verdict_reason:   { type: 'string' },
        },
      },
    });

    // Save to case history
    try {
      const { saveCaseToHistory } = await import('@/components/family51/SortedCaseHistory');
      saveCaseToHistory({
        tool: 'contract',
        input_text: (content || '').slice(0, 300),
        ai_result: JSON.stringify(res),
        summary: res.verdict_reason || res.summary?.slice(0, 100),
        severity: res.verdict === 'serious_concerns' ? 'urgent' : res.verdict === 'review_carefully' ? 'important' : 'routine',
      });
    } catch {}

    setResult(res);
    setLoading(false);
    setUploading(false);
    onResult?.();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('That file is too large. For best results, snap a photo of the relevant page instead.');
      e.target.value = '';
      return;
    }
    setUploading(true);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Retry upload up to 2 times on network error
      let file_url;
      let lastErr;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const result = await base44.integrations.Core.UploadFile({ file });
          file_url = result.file_url;
          break;
        } catch (err) {
          lastErr = err;
          if (attempt < 1) await new Promise(r => setTimeout(r, 2000));
        }
      }
      if (!file_url) throw lastErr || new Error('Upload failed');
      setUploading(false);
      await runAnalysis(file_url, null);
    } catch (err) {
      const isNetwork = err?.message?.toLowerCase().includes('network') || err?.message?.toLowerCase().includes('fetch');
      setError(
        isNetwork
          ? 'Network error — poor signal? Try copying the text and pasting it in instead.'
          : 'Upload failed. Try again or paste the text instead.'
      );
      setUploading(false);
      setLoading(false);
    }
    e.target.value = '';
  };

  const analyse = async () => {
    if (!inputText.trim() || inputText.trim().length < 50) return;
    await runAnalysis(null, inputText);
  };

  const reset = () => {
    setResult(null);
    setInputText('');
    setContractType('');
    setError(null);
  };

  const copyAll = () => {
    if (!result) return;
    const txt = [
      `SORTED CONTRACT ANALYSIS`,
      ``,
      `VERDICT\n${result.verdict_reason}`,
      ``,
      `IN PLAIN ENGLISH\n${result.summary}`,
      result.red_flags?.length        ? `\nRED FLAGS\n${result.red_flags.map(f => `• ${f}`).join('\n')}` : '',
      result.what_is_missing?.length  ? `\nWHAT'S MISSING\n${result.what_is_missing.map(m => `• ${m}`).join('\n')}` : '',
      result.negotiate?.length        ? `\nWHAT TO NEGOTIATE\n${result.negotiate.map(n => `• ${n}`).join('\n')}` : '',
      result.questions?.length        ? `\nQUESTIONS TO ASK\n${result.questions.map(q => `• ${q}`).join('\n')}` : '',
      `\nAnalysed by SORTED`,
    ].join('\n');
    navigator.clipboard.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const vs = result ? (verdictStyle[result.verdict] || verdictStyle.review_carefully) : null;

  return (
    <div className="space-y-5">
      <style>{`textarea::placeholder { color: rgba(26,18,8,0.35) !important; }`}</style>

      {/* HIDDEN FILE INPUTS */}
      <input ref={fileInputRef}   type="file" accept="image/*,application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: 'none' }} />

      {/* THINKING STEPS LOADER */}
      <AnimatePresence>
        {loading && (
          <SortedThinkingSteps tool="contract" accentColor={accentColor} isActive={loading} inputHint={inputText} />
        )}
      </AnimatePresence>

      {/* FORM */}
      {!loading && !result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            autoFocus
            placeholder={`Paste your contract text here — or take a photo / upload a PDF.

Every clause matters. The more you give us, the better the analysis.`}
            style={{
              width: '100%', height: 200, background: '#fff',
              border: `1.5px solid ${inputText ? accentColor + '90' : 'rgba(26,18,8,0.15)'}`,
              borderRadius: 14, color: '#1a1208', fontSize: 14, padding: '16px 18px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.65,
              transition: 'border-color 0.2s', boxSizing: 'border-box',
              caretColor: accentColor,
            }}
          />

          {inputText.trim().length >= 50 ? (
            <motion.button onClick={analyse} whileTap={{ scale: 0.97 }} style={{
              width: '100%', padding: '17px 0', borderRadius: 14, fontSize: 15,
              fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer',
              border: 'none',
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}DD)`,
              color: '#fff',
              boxShadow: `0 4px 14px ${accentColor}40, 0 1px 3px ${accentColor}30`,
            }}>
              ANALYSE CONTRACT →
            </motion.button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => cameraInputRef.current?.click()} style={{
                width: '100%', padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                letterSpacing: '0.04em', cursor: 'pointer',
                border: 'none',
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}DD)`,
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                boxShadow: `0 4px 14px ${accentColor}40, 0 1px 3px ${accentColor}30`,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                Snap a photo
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => fileInputRef.current?.click()} style={{
                width: '100%', padding: '16px 0', borderRadius: 14, fontSize: 13, fontWeight: 800,
                letterSpacing: '0.02em', cursor: 'pointer',
                border: `1px solid rgba(26,18,8,0.2)`,
                background: 'transparent', color: 'rgba(26,18,8,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
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

          {inputText.trim().length >= 20 && (
            <ContractInstantScan text={inputText} accentColor={accentColor} onHandoff={onHandoff} />
          )}

          <SortedPrivacyStrip accentColor={accentColor} />
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

      {/* RESULT — unified shell, same look as every other tool */}
      <AnimatePresence>
        {result && vs && !loading && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <SortedResultShell
              verdict={{
                label: vs.label.toUpperCase(),
                color: vs.color,
                summary: result.document_type || 'Contract Analysis',
                detail: result.verdict_reason,
              }}
              accentColor={accentColor}
              tool="contract"
              onCopy={copyAll}
              onShare={copyAll}
              onReset={reset}
              onHandoff={onHandoff}
              handoffLabel="CONTINUE → WRITE MY REPLY"
              flash={copied ? 'COPIED' : null}
            >
              <SortedResultSection label="IN PLAIN ENGLISH" color={accentColor}>
                <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.6 }}>{result.summary}</p>
              </SortedResultSection>

              {result.red_flags?.length > 0 && (
                <SortedResultSection label={`RED FLAGS (${result.red_flags.length})`} color="#ef4444" delay={0.15}>
                  <SortedBullets items={result.red_flags} color="#ef4444" symbol="⚑" />
                </SortedResultSection>
              )}

              {result.what_is_missing?.length > 0 && (
                <SortedResultSection label="WHAT'S MISSING" color="#7c3aed" delay={0.2}>
                  <p style={{ fontSize: 11, color: 'rgba(124,58,237,0.7)', margin: '0 0 10px', lineHeight: 1.4 }}>
                    Standard protections that aren't in this contract — what they didn't write can matter as much as what they did.
                  </p>
                  <SortedBullets items={result.what_is_missing} color="#7c3aed" symbol="○" />
                </SortedResultSection>
              )}

              {result.negotiate?.length > 0 && (
                <SortedResultSection label="WHAT TO NEGOTIATE" color="#f5a623" delay={0.25}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {result.negotiate.map((n, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ minWidth: 22, height: 22, borderRadius: '50%', background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: 11, fontWeight: 900, color: '#f5a623' }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.7)', lineHeight: 1.5, margin: 0 }}>{n}</p>
                      </div>
                    ))}
                  </div>
                </SortedResultSection>
              )}

              {result.questions?.length > 0 && (
                <SortedResultSection label="QUESTIONS TO ASK" color={accentColor} delay={0.3}>
                  <SortedBullets items={result.questions} color={accentColor} />
                </SortedResultSection>
              )}

              <SortedTimeline analysisResult={result} tool="contract" accentColor={accentColor} />
            </SortedResultShell>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}