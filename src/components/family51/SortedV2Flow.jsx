import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Camera, FileText, ArrowRight, Shield, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { SORTED_SOUL } from '@/utils/sortedSoul';
import { detectGeo } from '@/hooks/useSortedGeo';
import { buildSortedGeoPromptContext } from '@/utils/sortedGeoContext';
import { saveCaseToHistory } from './SortedCaseHistory';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';
import SortedThinkingSteps from './SortedThinkingSteps';
import SortedResultShell, { SortedResultSection, SortedSteps, SortedBullets } from './SortedResultShell';
import GeoSelector from './GeoSelector';

const GOLD = '#c6995c';
const INK = '#1c1c1e';
const MUTED = 'rgba(28,28,30,0.45)';
const BORDER = 'rgba(28,28,30,0.08)';

// Haptic feedback — native feel
const tap = () => { try { navigator.vibrate?.(8); } catch {} };
const tapStrong = () => { try { navigator.vibrate?.(15); } catch {} };

const SEVERITY = {
  urgent: { color: '#dc2626', label: 'URGENT — ACT NOW' },
  important: { color: '#d97706', label: 'IMPORTANT' },
  routine: { color: '#16a34a', label: 'ROUTINE' },
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
  const textareaRef = useRef(null);

  const hasContent = text.trim() || fileUrl;
  const ready = Boolean(hasContent) && !uploading;
  const journeyStep = result ? 3 : loading ? 2 : 1;

  // Auto-grow textarea — feels alive
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.max(120, ta.scrollHeight) + 'px';
  }, [text]);

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [result]);

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
    tapStrong();
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

  const reset = () => { tap(); setResult(null); setText(''); setFile(null); setFileUrl(null); setError(null); };

  const copyAll = () => {
    if (!result) return;
    tap();
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
    tap();
    const subject = encodeURIComponent(result.ready_reply.subject || 'Your reply');
    const body = encodeURIComponent(result.ready_reply.body || '');
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  // ── LOADING STATE ──
  if (loading) {
    return <SortedThinkingSteps tool="letter" accentColor={GOLD} isActive={loading} inputHint={text} geo={geo} />;
  }

  // ── RESULT STATE ──
  if (result) {
    const vs = SEVERITY[result.severity] || SEVERITY.routine;
    return (
      <div ref={resultRef}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <SortedResultShell
            verdict={{
              label: vs.label,
              color: vs.color,
              summary: result.summary,
              detail: result.what_it_means,
              badges: [{ text: result.document_type, color: GOLD }],
            }}
            accentColor={GOLD}
            tool={result.detected_tool || 'letter'}
            onCopy={copyAll}
            onShare={copyAll}
            onReset={reset}
            onEmail={result.ready_reply ? openEmail : null}
            flash={copied ? 'COPIED' : null}
          >
            {(result.key_intel?.sender || result.key_intel?.deadline || result.key_intel?.reference || result.key_intel?.contact_method) && (
              <SortedResultSection label="KEY INTEL" color={GOLD}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {result.key_intel.sender && <p style={{ fontSize: 13, color: 'rgba(28,28,30,0.7)', margin: 0 }}><strong>From:</strong> {result.key_intel.sender}</p>}
                  {result.key_intel.reference && <p style={{ fontSize: 13, color: 'rgba(28,28,30,0.7)', margin: 0 }}><strong>Ref:</strong> {result.key_intel.reference}</p>}
                  {result.key_intel.deadline && <p style={{ fontSize: 13, color: 'rgba(28,28,30,0.7)', margin: 0 }}><strong>Deadline:</strong> {result.key_intel.deadline}</p>}
                  {result.key_intel.contact_method && <p style={{ fontSize: 13, color: 'rgba(28,28,30,0.7)', margin: 0 }}><strong>Contact:</strong> {result.key_intel.contact_method}</p>}
                </div>
              </SortedResultSection>
            )}

            {result.action_steps?.length > 0 && (
              <SortedResultSection label="WHAT TO DO" color={GOLD} delay={0.15}>
                <SortedSteps steps={result.action_steps} color={GOLD} />
              </SortedResultSection>
            )}

            {result.what_not_to_do?.length > 0 && (
              <SortedResultSection label="DON'T DO THIS" color="#dc2626" delay={0.2}>
                <SortedBullets items={result.what_not_to_do} color="#dc2626" symbol="✕" />
              </SortedResultSection>
            )}

            {result.ready_reply && (
              <SortedResultSection label="READY-TO-SEND REPLY" color={GOLD} delay={0.25}>
                {result.ready_reply.subject && (
                  <div style={{ borderBottom: '1px solid rgba(28,28,30,0.08)', paddingBottom: 12, marginBottom: 14 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(28,28,30,0.35)', margin: '0 0 4px' }}>SUBJECT</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: INK, margin: 0 }}>{result.ready_reply.subject}</p>
                  </div>
                )}
                <pre style={{ fontSize: 13, color: 'rgba(28,28,30,0.8)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.7, margin: 0 }}>{result.ready_reply.body}</pre>
              </SortedResultSection>
            )}

            {result.tip && (
              <SortedResultSection label="BEFORE YOU GO" color="#d97706" delay={0.3}>
                <p style={{ fontSize: 13, color: 'rgba(28,28,30,0.6)', margin: 0, lineHeight: 1.5 }}>{result.tip}</p>
              </SortedResultSection>
            )}

            {result.helplines?.length > 0 && (
              <SortedResultSection label="REAL HELP NEAR YOU" color="#16a34a" delay={0.35}>
                <SortedBullets items={result.helplines} color="#16a34a" />
              </SortedResultSection>
            )}
          </SortedResultShell>
        </motion.div>
      </div>
    );
  }

  // ── INPUT STATE ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ marginBottom: 12, padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.04)' }}>
            <p style={{ fontSize: 13, color: '#dc2626', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INPUT — the hero surface. No harsh borders. Soft elevation like iOS. */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: ready
            ? '0 8px 28px rgba(198,153,92,0.12), 0 2px 6px rgba(0,0,0,0.03)'
            : '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
          border: ready ? `1px solid ${GOLD}40` : '1px solid transparent',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Textarea — auto-grows, feels alive */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste the letter here…"
          rows={4}
          style={{
            width: '100%', minHeight: 120, background: 'transparent',
            border: 'none', color: INK, fontSize: 16, padding: '18px 18px 10px',
            resize: 'none', outline: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
            lineHeight: 1.6, boxSizing: 'border-box',
            WebkitFontSmoothing: 'antialiased',
          }}
        />

        {/* File pill */}
        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                margin: '0 14px 8px', padding: '10px 12px', borderRadius: 10,
                background: uploading ? 'rgba(198,153,92,0.06)' : 'rgba(22,163,74,0.05)',
                border: `1px solid ${uploading ? 'rgba(198,153,92,0.15)' : 'rgba(22,163,74,0.2)'}`,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {uploading ? (
                  <Loader2 size={14} className="animate-spin" color={GOLD} style={{ flexShrink: 0 }} />
                ) : (
                  <CheckCircle2 size={14} color="#16a34a" style={{ flexShrink: 0 }} />
                )}
                <span style={{ fontSize: 13, color: uploading ? GOLD : '#16a34a', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {uploading ? 'Uploading…' : file.name}
                </span>
                {!uploading && (
                  <button onClick={() => { tap(); setFile(null); setFileUrl(null); }}
                    style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 12, fontWeight: 600, flexShrink: 0, padding: '4px 6px' }}>
                    REMOVE
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action row — generous touch targets, native feel */}
        <div style={{
          padding: '4px 10px 8px', borderTop: `1px solid ${BORDER}`,
          display: 'flex', alignItems: 'center', gap: 0,
        }}>
          <motion.button whileTap={{ scale: 0.94 }} onClick={() => { tap(); cameraInputRef.current?.click(); }}
            style={{
              padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              border: 'none', background: 'transparent', color: MUTED,
              display: 'flex', alignItems: 'center', gap: 6,
              WebkitTapHighlightColor: 'transparent',
            }}>
            <Camera size={17} color={GOLD} /> Photo
          </motion.button>
          <motion.button whileTap={{ scale: 0.94 }} onClick={() => { tap(); fileInputRef.current?.click(); }}
            style={{
              padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              border: 'none', background: 'transparent', color: MUTED,
              display: 'flex', alignItems: 'center', gap: 6,
              WebkitTapHighlightColor: 'transparent',
            }}>
            <FileText size={17} color={GOLD} /> File
          </motion.button>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: MUTED }}>
            <GeoSelector geo={geo} onChange={setGeo} accentColor={GOLD} />
          </div>
        </div>
      </motion.div>

      {/* CTA — spring physics, haptic, always right below input */}
      <motion.button
        onClick={analyse}
        disabled={!ready}
        whileTap={ready ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          width: '100%', padding: '16px', borderRadius: 14, fontSize: 16,
          fontWeight: 600, cursor: ready ? 'pointer' : 'default',
          border: 'none',
          background: ready ? GOLD : 'rgba(28,28,30,0.05)',
          color: ready ? '#fff' : MUTED,
          transition: 'background 0.2s, color 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginTop: 12,
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }}
      >
        {ready ? (
          <>
            Sort it
            <ArrowRight size={17} color="#fff" />
          </>
        ) : (
          'Ready when you are'
        )}
      </motion.button>

      {/* Trust */}
      <div style={{
        marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
        <Shield size={11} color={MUTED} style={{ opacity: 0.5 }} />
        <p style={{ fontSize: 11, color: MUTED, margin: 0, fontWeight: 400, opacity: 0.7 }}>
          Private to your device · 3 free · no signup
        </p>
      </div>

      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      <input ref={fileInputRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
}

// ── Journey components — clean, native, spring-animated ──
function JourneyDot({ num, label, active, gold, ink, muted }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <motion.div
        animate={{ scale: active ? 1 : 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 22, height: 22, borderRadius: '50%',
          background: active ? gold : 'transparent',
          border: `1.5px solid ${active ? gold : 'rgba(28,28,30,0.12)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: active ? '#fff' : muted,
        }}
      >{num}</motion.div>
      <span style={{ fontSize: 12, fontWeight: 500, color: active ? ink : muted }}>{label}</span>
    </div>
  );
}

function JourneyLine({ active, gold }) {
  return (
    <motion.div
      animate={{ backgroundColor: active ? gold : 'rgba(28,28,30,0.08)' }}
      transition={{ duration: 0.3 }}
      style={{ width: 20, height: 1.5, margin: '0 5px' }}
    />
  );
}