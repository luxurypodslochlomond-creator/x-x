import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, MapPin, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { SORTED_SOUL } from '@/utils/sortedSoul';
import { detectGeo } from '@/hooks/useSortedGeo';
import { buildSortedGeoPromptContext } from '@/utils/sortedGeoContext';
import { saveCaseToHistory } from './SortedCaseHistory';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';
import SortedThinkingSteps from './SortedThinkingSteps';
import SortedResultShell, { SortedResultSection, SortedSteps, SortedBullets } from './SortedResultShell';
import GeoSelector from './GeoSelector';

const ACCENT = '#d97706';
const ACCENT_DARK = '#b45309';

const SEVERITY = {
  urgent: { color: '#ef4444', label: 'URGENT — ACT NOW' },
  important: { color: '#f59e0b', label: 'IMPORTANT' },
  routine: { color: '#10b981', label: 'ROUTINE' },
};

export default function SortedV2Flow() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [geo, setGeo] = useState(() => detectGeo());
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const resultRef = useRef(null);
  const ctaRef = useRef(null);

  const hasContent = text.trim() || fileUrl;
  const ready = Boolean(hasContent) && !uploading;

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [result]);

  // After file upload completes, gently scroll to the CTA so the user sees it
  useEffect(() => {
    if (fileUrl && ctaRef.current) {
      setTimeout(() => ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
    }
  }, [fileUrl]);

  const handleFile = async (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.size > 10 * 1024 * 1024) { setError('File too large. Max 10MB.'); return; }
    setFile(selectedFile);
    setUploading(true);
    setError(null);
    try {
      const res = await base44.integrations.Core.UploadFile({ file: selectedFile });
      setFileUrl(res.file_url);
    } catch (err) {
      setError('Could not upload. Try pasting the text instead.');
      setFile(null);
      setFileUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const analyse = async () => {
    if (loading || !hasContent) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const limitCheck = await recordSortedUse();
    if (!limitCheck.allowed) {
      setError("You've used your 3 free uses. Subscribe for unlimited access.");
      setLoading(false);
      return;
    }

    const geoContext = buildSortedGeoPromptContext(geo);
    const TODAY = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const prompt = SORTED_SOUL + '\n' + `The user has given you something — it might be a letter, a message, a contract, a description of a dispute, or a photo of a document. Whatever it is, figure out what it is and help them.

${geoContext}

USER INPUT (text):
${text || '(no text — see attached file/image)'}

${fileUrl ? `ATTACHED FILE: ${fileUrl}` : ''}

YOUR JOB — all in one response:
1. IDENTIFY what this is: official letter, scam attempt, contract, dispute/conflict, bill, notice, or something else.
2. EXTRACT key intel: who sent it, reference numbers, deadlines, contact details.
3. ASSESS severity: urgent, important, or routine. Compare any deadlines to TODAY (${TODAY}).
4. EXPLAIN in plain language what it means — 2-3 sentences max.
5. ADVISE what to do — specific, actionable steps they can take TODAY.
6. If a reply is needed or would help, WRITE a ready-to-send reply. No placeholders — ready to send.
7. Flag anything they should NOT do.

Return JSON:
{
  "document_type": "string — what kind of document/situation",
  "detected_tool": "letter | scam | contract | conflict | reply",
  "severity": "urgent | important | routine",
  "severity_reason": "string — why this severity",
  "summary": "string — one sentence plain language summary",
  "what_it_means": "string — 2-3 sentences",
  "key_intel": { "sender": "string or null", "reference": "string or null", "deadline": "string or null", "contact_method": "string or null" },
  "action_steps": ["array of specific things to do"],
  "ready_reply": { "subject": "string", "body": "string — ready to send" } or null,
  "what_not_to_do": ["array"] or [],
  "tip": "string — one practical tip",
  "helplines": ["array of real organizations for their country"]
}`;

    const schema = {
      type: 'object',
      properties: {
        document_type: { type: 'string' },
        detected_tool: { type: 'string', enum: ['letter', 'scam', 'contract', 'conflict', 'reply'] },
        severity: { type: 'string', enum: ['urgent', 'important', 'routine'] },
        severity_reason: { type: 'string' },
        summary: { type: 'string' },
        what_it_means: { type: 'string' },
        key_intel: { type: 'object', properties: { sender: { type: 'string' }, reference: { type: 'string' }, deadline: { type: 'string' }, contact_method: { type: 'string' } } },
        action_steps: { type: 'array', items: { type: 'string' } },
        ready_reply: { type: 'object', properties: { subject: { type: 'string' }, body: { type: 'string' } } },
        what_not_to_do: { type: 'array', items: { type: 'string' } },
        tip: { type: 'string' },
        helplines: { type: 'array', items: { type: 'string' } },
      },
    };

    try {
      const opts = {
        prompt, response_json_schema: schema, model: 'claude_sonnet_4_6',
        ...(fileUrl ? { file_urls: [fileUrl] } : {}),
      };
      const response = await base44.integrations.Core.InvokeLLM(opts);
      setResult(response);
      saveCaseToHistory({
        tool: response.detected_tool || 'letter',
        input_text: text || '(file uploaded)',
        ai_result: JSON.stringify(response),
        summary: response.summary || 'Analysis',
        severity: response.severity || 'unknown',
      });
    } catch (err) {
      setError('Could not analyse. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setText(''); setFile(null); setFileUrl(null); setError(null); };

  const copyAll = () => {
    if (!result) return;
    const parts = [`SORTED — ${result.summary}`, '', result.what_it_means, '', 'WHAT TO DO:',
      ...result.action_steps.map((s, i) => `${i + 1}. ${s}`)];
    if (result.ready_reply) parts.push('', 'READY REPLY:', `Subject: ${result.ready_reply.subject}`, '', result.ready_reply.body);
    if (result.tip) parts.push('', `TIP: ${result.tip}`);
    parts.push('', 'Via SORTED — uf51.love/Sorted', 'Guidance only, not legal advice.');
    navigator.clipboard.writeText(parts.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const openEmail = () => {
    if (!result?.ready_reply) return;
    const subject = encodeURIComponent(result.ready_reply.subject || 'Your reply');
    const body = encodeURIComponent(result.ready_reply.body || '');
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  // ── INPUT STATE ──
  if (!result && !loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginBottom: 12, padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }}>
              <p style={{ fontSize: 13, color: '#ef4444', margin: 0, fontWeight: 600, lineHeight: 1.5 }}>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THE INPUT CARD — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: ready
              ? `0 8px 32px ${ACCENT}18, 0 2px 8px rgba(26,18,8,0.06)`
              : '0 2px 12px rgba(26,18,8,0.05)',
            border: ready ? `1.5px solid ${ACCENT}40` : '1.5px solid rgba(26,18,8,0.08)',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s, border-color 0.3s',
          }}
        >
          {/* TEXTAREA */}
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your letter, describe what's happening, or snap a photo. Don't worry about formatting — just get it in."
            style={{
              width: '100%', minHeight: 130, background: 'transparent',
              border: 'none', color: '#1a1208', fontSize: 15, padding: '20px 22px 16px',
              resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.65,
              boxSizing: 'border-box',
            }}
          />

          {/* FILE PILL — shown when a file is attached */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  margin: '0 18px 12px', padding: '12px 16px', borderRadius: 12,
                  background: uploading ? 'rgba(217,119,6,0.06)' : 'rgba(34,197,94,0.08)',
                  border: `1px solid ${uploading ? 'rgba(217,119,6,0.2)' : 'rgba(34,197,94,0.25)'}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  {uploading ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" stroke={ACCENT} strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: 13, color: uploading ? ACCENT_DARK : '#16a34a', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {uploading ? 'Uploading…' : file.name}
                  </span>
                  {!uploading && (
                    <button onClick={() => { setFile(null); setFileUrl(null); }}
                      style={{ background: 'none', border: 'none', color: 'rgba(26,18,8,0.4)', cursor: 'pointer', fontSize: 12, fontWeight: 700, flexShrink: 0, padding: '4px 8px' }}>
                      REMOVE
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTION ROW — camera + upload + location */}
          <div style={{
            padding: '12px 18px 16px', borderTop: '1px solid rgba(26,18,8,0.05)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => cameraInputRef.current?.click()}
              style={{
                padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                border: '1px solid rgba(26,18,8,0.12)', background: 'rgba(26,18,8,0.02)', color: 'rgba(26,18,8,0.6)',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
              }}>
              <Camera size={15} /> Photo
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                border: '1px solid rgba(26,18,8,0.12)', background: 'rgba(26,18,8,0.02)', color: 'rgba(26,18,8,0.6)',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
              }}>
              <Upload size={14} /> File
            </motion.button>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'rgba(26,18,8,0.4)' }}>
              <MapPin size={12} color={ACCENT} />
              <GeoSelector geo={geo} onChange={setGeo} accentColor={ACCENT} />
            </div>
          </div>
        </motion.div>

        {/* THE CTA — pulsing when ready */}
        <motion.div ref={ctaRef} style={{ marginTop: 14, scrollMarginTop: 80 }}>
          <motion.button
            onClick={analyse}
            disabled={!ready}
            whileTap={ready ? { scale: 0.97 } : {}}
            animate={ready ? { boxShadow: [`0 4px 14px ${ACCENT}40, 0 1px 3px ${ACCENT}30`, `0 6px 24px ${ACCENT}55, 0 2px 6px ${ACCENT}40`, `0 4px 14px ${ACCENT}40, 0 1px 3px ${ACCENT}30`] } : {}}
            transition={ready ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
            style={{
              width: '100%', padding: '20px 0', borderRadius: 18, fontSize: 17,
              fontWeight: 900, letterSpacing: '0.08em', cursor: ready ? 'pointer' : 'not-allowed',
              border: 'none',
              background: ready ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` : 'rgba(26,18,8,0.04)',
              color: ready ? '#fff' : 'rgba(26,18,8,0.25)',
              transition: 'background 0.2s, color 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }}
          >
            {ready ? (
              <>
                {fileUrl && !text.trim() ? 'SORT IT' : 'SORT IT'}
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <Sparkles size={16} />
                READY WHEN YOU ARE
              </>
            )}
          </motion.button>

          {/* subtle hint when ready */}
          <AnimatePresence>
            {ready && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', fontSize: 11, color: 'rgba(26,18,8,0.35)', margin: '8px 0 0', fontWeight: 500 }}
              >
                Tap to decode — takes about 10 seconds
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
        <input ref={fileInputRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>
    );
  }

  // ── LOADING STATE ──
  if (loading) {
    return <SortedThinkingSteps tool="letter" accentColor={ACCENT} isActive={loading} inputHint={text} geo={geo} />;
  }

  // ── RESULT STATE ──
  const vs = result ? SEVERITY[result.severity] || SEVERITY.routine : null;

  return (
    <div ref={resultRef}>
      <AnimatePresence>
        {result && vs && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <SortedResultShell
              verdict={{
                label: vs.label,
                color: vs.color,
                summary: result.summary,
                detail: result.what_it_means,
                badges: [{ text: result.document_type, color: ACCENT }],
              }}
              accentColor={ACCENT}
              tool={result.detected_tool || 'letter'}
              onCopy={copyAll}
              onShare={copyAll}
              onReset={reset}
              onEmail={result.ready_reply ? openEmail : null}
              flash={copied ? 'COPIED' : null}
            >
              {(result.key_intel?.sender || result.key_intel?.deadline || result.key_intel?.reference || result.key_intel?.contact_method) && (
                <SortedResultSection label="KEY INTEL" color={ACCENT}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {result.key_intel.sender && <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0 }}><strong>From:</strong> {result.key_intel.sender}</p>}
                    {result.key_intel.reference && <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0 }}><strong>Ref:</strong> {result.key_intel.reference}</p>}
                    {result.key_intel.deadline && <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0 }}><strong>Deadline:</strong> {result.key_intel.deadline}</p>}
                    {result.key_intel.contact_method && <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0 }}><strong>Contact:</strong> {result.key_intel.contact_method}</p>}
                  </div>
                </SortedResultSection>
              )}

              {result.action_steps?.length > 0 && (
                <SortedResultSection label="WHAT TO DO" color={ACCENT} delay={0.15}>
                  <SortedSteps steps={result.action_steps} color={ACCENT} />
                </SortedResultSection>
              )}

              {result.what_not_to_do?.length > 0 && (
                <SortedResultSection label="DON'T DO THIS" color="#ef4444" delay={0.2}>
                  <SortedBullets items={result.what_not_to_do} color="#ef4444" symbol="✕" />
                </SortedResultSection>
              )}

              {result.ready_reply && (
                <SortedResultSection label="READY-TO-SEND REPLY" color={ACCENT} delay={0.25}>
                  {result.ready_reply.subject && (
                    <div style={{ borderBottom: '1px solid rgba(26,18,8,0.08)', paddingBottom: 12, marginBottom: 14 }}>
                      <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(26,18,8,0.35)', margin: '0 0 4px' }}>SUBJECT</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1208', margin: 0 }}>{result.ready_reply.subject}</p>
                    </div>
                  )}
                  <pre style={{ fontSize: 13, color: 'rgba(26,18,8,0.85)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.75, margin: 0 }}>{result.ready_reply.body}</pre>
                </SortedResultSection>
              )}

              {result.tip && (
                <SortedResultSection label="BEFORE YOU GO" color="#eab308" delay={0.3}>
                  <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.5 }}>{result.tip}</p>
                </SortedResultSection>
              )}

              {result.helplines?.length > 0 && (
                <SortedResultSection label="REAL HELP IN YOUR AREA" color="#10b981" delay={0.35}>
                  <SortedBullets items={result.helplines} color="#10b981" />
                </SortedResultSection>
              )}
            </SortedResultShell>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}