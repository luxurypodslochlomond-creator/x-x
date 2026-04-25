import React, { useState, useRef } from 'react';
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

export default function Family51LetterDecoder({ accentColor = '#f97316' }) {
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
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setUploadedFileUrl(file_url);
    setLetterText('[Photo/file uploaded — AI will read it directly]');
    setUploading(false);
  };

  const [decodeError, setDecodeError] = useState(null);

  const decode = async () => {
    const hasInput = letterText.trim() || uploadedFileUrl;
    if (!hasInput || loading) return;
    setLoading(true);
    setResult(null);
    setDecodeError(null);

    try {
      let promptText;
      let fileUrls = [];
      const geoContext = `The person is in: ${geo.country}. Apply ${geo.jurisdiction} and locally relevant rights, bodies, and deadlines throughout your response.`;

      if (uploadedFileUrl) {
        promptText = `You are a compassionate plain-English advice expert specialising in ${geo.jurisdiction}. ${geoContext} A person has uploaded a photo or scan of an official letter${letterType ? ` (type: ${letterType})` : ''}. Read it carefully and help them understand it.`;
        fileUrls = [uploadedFileUrl];
      } else {
        promptText = `You are a compassionate plain-English advice expert specialising in ${geo.jurisdiction}. ${geoContext} A person has received this official letter${letterType ? ` (type: ${letterType})` : ''} and needs help understanding it.\n\nLETTER:\n${letterText}`;
      }

      const response = await base44.integrations.Core.InvokeLLM({
        model: 'gpt_5',
        prompt: promptText + `\n\nReturn:
- what_this_means: Plain English, 2-3 sentences, zero jargon, warm tone
- severity: One of exactly: NOT URGENT / NEEDS ATTENTION / URGENT / VERY URGENT
- severity_explanation: One sentence on why that rating
- action_steps: Array of exactly 3 clear numbered actions to take
- key_deadline: Any date/deadline mentioned, or "No deadline mentioned"
- dont_panic: One honest, reassuring sentence`,
        ...(fileUrls.length > 0 ? { file_urls: fileUrls } : {}),
        response_json_schema: {
          type: 'object',
          properties: {
            what_this_means:      { type: 'string' },
            severity:             { type: 'string' },
            severity_explanation: { type: 'string' },
            action_steps:         { type: 'array', items: { type: 'string' } },
            key_deadline:         { type: 'string' },
            dont_panic:           { type: 'string' },
          },
        },
      });

      setResult(response);
    } catch (err) {
      console.error('SORTED decode error:', err);
      setDecodeError('Something went wrong decoding your letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setLetterText(''); setLetterType(''); setUploadedFileUrl(null); setEmailSent(false); setEmailAddr(''); setDecodeError(null); };

  const sendEmail = async () => {
    if (!emailAddr.trim() || !result || emailing) return;
    setEmailing(true);
    const body = `SORTED decoded your letter.\n\n─────────────────────\nWHAT THIS MEANS\n─────────────────────\n${result.what_this_means}\n\nSEVERITY: ${result.severity}\n${result.severity_explanation}\n\n─────────────────────\nWHAT TO DO\n─────────────────────\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nKEY DEADLINE: ${result.key_deadline}\n\nDON'T PANIC: ${result.dont_panic}\n\n─────────────────────\nSORTED — sorted.family51.com\nNothing is stored. This email was sent at your request only.`;
    await base44.integrations.Core.SendEmail({ to: emailAddr.trim(), subject: `Your SORTED breakdown — ${result.severity}`, body });
    setEmailSent(true);
    setEmailing(false);
  };

  const copyAll = () => {
    if (!result) return;
    const text = `DECODED BY FAMILY51\n\n${result.what_this_means}\n\nSEVERITY: ${result.severity}\n${result.severity_explanation}\n\nACTIONS:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nDEADLINE: ${result.key_deadline}\n\nDON'T PANIC: ${result.dont_panic}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;

  return (
    <div className="space-y-5">

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
        ) : uploading ? (
          <div style={{ padding: '14px 0', textAlign: 'center' }}>
            <Spinner color={accentColor} text="READING YOUR FILE..." />
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
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', marginBottom: 8, textAlign: 'center' }}>— or type / paste below —</p>

      {/* PASTE AREA */}
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

      {/* DECODE BUTTON */}
      <motion.button
        onClick={decode}
        disabled={(!letterText.trim() && !uploadedFileUrl) || loading}
        whileTap={!loading && (letterText.trim() || uploadedFileUrl) ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 13,
          fontWeight: 800, letterSpacing: '0.12em',
          cursor: (letterText.trim() || uploadedFileUrl) && !loading ? 'pointer' : 'not-allowed',
          border: `1px solid ${(letterText.trim() || uploadedFileUrl) ? accentColor : 'rgba(255,255,255,0.1)'}`,
          background: (letterText.trim() || uploadedFileUrl) ? `${accentColor}15` : 'transparent',
          color: (letterText.trim() || uploadedFileUrl) ? accentColor : 'rgba(255,255,255,0.2)',
          transition: 'all 0.2s',
        }}
      >
        {loading ? <Spinner color={accentColor} text="DECODING YOUR LETTER — this takes 15-30 seconds" /> : 'DECODE THIS LETTER'}
      </motion.button>

      {/* ERROR */}
      {decodeError && (
        <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#ef4444', margin: 0, fontWeight: 700 }}>{decodeError}</p>
        </div>
      )}

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

            {/* SEVERITY */}
            {sev && (
              <div style={{ background: sev.bg, border: `1px solid ${sev.border}`, borderRadius: 12, padding: '14px 18px' }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: sev.color }}>SEVERITY</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: sev.color, letterSpacing: '0.05em' }}>{result.severity}</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{result.severity_explanation}</p>
              </div>
            )}

            <ResultCard label="WHAT THIS MEANS" color={accentColor}>
              <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.65, margin: 0 }}>{result.what_this_means}</p>
            </ResultCard>

            <ResultCard label="WHAT TO DO" color="#06b6d4">
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.action_steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#06b6d4', minWidth: 18, paddingTop: 2 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </ResultCard>

            <ResultCard label="KEY DEADLINE" color="#eab308">
              <p style={{ fontSize: 13, color: '#fff', margin: 0 }}>{result.key_deadline}</p>
            </ResultCard>

            <ResultCard label="DON'T PANIC" color="#22c55e">
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>{result.dont_panic}</p>
            </ResultCard>

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

function Spinner({ color, text }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <motion.span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: color }}
        animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
      {text}
    </span>
  );
}

const secondaryBtn = {
  flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
  letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent', color: 'rgba(255,255,255,0.4)', transition: 'all 0.15s',
};