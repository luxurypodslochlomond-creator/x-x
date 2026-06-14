import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedThinkingSteps from './SortedThinkingSteps';
import { base44 } from '@/api/base44Client';
import { saveCaseToHistory } from '@/components/family51/SortedCaseHistory';
import { detectGeo } from '@/hooks/useSortedGeo';
import { buildSortedGeoPromptContext } from '@/utils/sortedGeoContext';
import GeoSelector from './GeoSelector';
import { Upload, X, FileIcon, ImageIcon, Video } from 'lucide-react';
import SortedShareButton from './SortedShareButton';
import { recordSortedUse } from '@/hooks/useSortedRateLimit';

const CONFLICT_TYPES = [
  { id: 'neighbour',  label: 'NEIGHBOUR',   desc: 'Noise, boundaries, shared areas' },
  { id: 'workplace',  label: 'WORKPLACE',   desc: 'Colleague or management' },
  { id: 'landlord',   label: 'LANDLORD',    desc: 'Deposit, repairs, eviction' },
  { id: 'contract',   label: 'CONTRACT',    desc: 'Unfair terms, rights grabs, bad deal' },
  { id: 'dismissal',  label: 'DISMISSAL',   desc: 'Unfair or wrongful termination' },
  { id: 'family',     label: 'FAMILY',      desc: 'Custody, inheritance, dispute' },
  { id: 'consumer',   label: 'CONSUMER',    desc: 'Bad service, refund refused' },
  { id: 'other',      label: 'OTHER',       desc: 'Something else' },
];

const GOALS = [
  { id: 'deescalate', label: 'DE-ESCALATE',    desc: 'Keep it calm and civil' },
  { id: 'stand_firm', label: 'STAND MY GROUND', desc: 'Assert my rights firmly' },
  { id: 'document',   label: 'DOCUMENT IT',     desc: 'Create a paper trail' },
  { id: 'resolve',    label: 'RESOLVE IT',      desc: 'Find a fair solution' },
];

export default function Family51ConflictHelper({ accentColor = '#ef4444', onResult, prefillContext }) {
  const [conflictType, setConflictType] = useState('');
  const [what, setWhat]                 = useState('');
  const [goal, setGoal]                 = useState('deescalate');
  const [loading, setLoading]           = useState(false);
  const [result, setResult]             = useState(null);
  const [resultGoal, setResultGoal]     = useState(null);
  const [copied, setCopied]             = useState('');
  const [emailAddr, setEmailAddr]       = useState('');
  const [emailSent, setEmailSent]       = useState(false);
  const [emailing, setEmailing]         = useState(false);
  const [geo, setGeo]                   = useState(() => detectGeo());
  const [attachments, setAttachments]   = useState([]);
  const [uploading, setUploading]       = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || uploading) return;

    setUploading(true);
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setAttachments(prev => [...prev, { name: file.name, url: file_url, type: file.type }]);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
    setUploading(false);
  };

  const removeAttachment = (idx) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileIcon className="w-4 h-4" />;
  };

  const analyse = async () => {
    if (!what.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      // Server-side rate limit check
      const limitCheck = await recordSortedUse();
      if (!limitCheck.allowed) {
        setResult({ _error: 'You\'ve used your 5 free uses. Subscribe for unlimited access.' });
        setLoading(false);
        return;
      }
      const ct = CONFLICT_TYPES.find(t => t.id === conflictType);
      const gt = GOALS.find(g => g.id === goal);

      // Extract text from doc/pdf attachments; pass image URLs directly to vision
      let fileContext = '';
      const imageUrls = [];
      if (attachments.length > 0) {
        const parts = [];
        for (const a of attachments) {
          const isImage = a.type.startsWith('image/');
          if (isImage) {
            imageUrls.push(a.url);
            parts.push(`- ${a.name} (image — analysed visually)`);
          } else {
            try {
              const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
                file_url: a.url,
                json_schema: { type: 'object', properties: { full_text: { type: 'string' } } },
              });
              const text = extracted?.output?.full_text || (typeof extracted?.output === 'string' ? extracted.output : '');
              if (text) parts.push(`- ${a.name}:\n${text}`);
            } catch (e) {
              parts.push(`- ${a.name} (could not read)`);
            }
          }
        }
        if (parts.length > 0) fileContext = `\n\nATTACHED EVIDENCE:\n${parts.join('\n')}`;
      }

      const countryContext = buildSortedGeoPromptContext(geo);

      // Detect if this is a personal/relationship situation
      const lowerWhat = what.toLowerCase();
      const isPersonalRelationship = (
        lowerWhat.includes('partner') || lowerWhat.includes('husband') || lowerWhat.includes('wife') ||
        lowerWhat.includes('boyfriend') || lowerWhat.includes('girlfriend') || lowerWhat.includes('spouse') ||
        lowerWhat.includes('called me') || lowerWhat.includes('shouted') || lowerWhat.includes('argument') ||
        lowerWhat.includes('fight') || lowerWhat.includes('said to me') || lowerWhat.includes('relationship') ||
        (ct?.id === 'relationship') || (!ct?.id && !lowerWhat.includes('landlord') && !lowerWhat.includes('employer') && !lowerWhat.includes('council') && !lowerWhat.includes('court'))
      );

      const systemPrompt = isPersonalRelationship
        ? `You are a calm, warm, wise friend. Someone who genuinely cares. You are NOT a lawyer, NOT a legal advisor, and this is NOT a court case — this is a real human moment in someone's life. Your job is to help them feel heard, calm, and clear — not scared or overwhelmed.

CRITICAL RULES:
- DO NOT mention police, 999, 101, DVPNs, court orders, or criminal legislation UNLESS the person has explicitly described physical violence or genuine fear for their safety. A verbal argument or name-calling is NOT grounds for this.
- DO NOT cite criminal statutes or imprisonment terms for a domestic argument — this is catastrophically unhelpful and frightening.
- Keep your language warm, short, and human. No walls of text. No legal jargon.
- Be like that brilliant friend who has been through it themselves and just gets it.
- Focus on: what they're feeling, how to handle the immediate moment, one calm conversation to have.

GOAL: ${gt?.label}
THEIR SITUATION: ${what}${fileContext}

- situation_assessment: 1-2 warm, honest sentences. Validate what happened. Help them see it clearly without catastrophising.
- legal_position: Keep this VERY brief and only relevant. For a personal argument, this might just be "Nothing legal here — this is a relationship matter. Focus on the conversation, not the courtroom." Only bring in law if it is genuinely relevant.
- recommended_steps: Array of exactly 2-3 simple, human steps. Things like: take a breath, give it a few hours, then have a calm conversation. NOT legal filings.
- what_to_say: A short, calm, real script they could actually say out loud. Human tone. Not formal. Not aggressive. Something that opens a door rather than closes one.
- what_not_to_do: Array of 2 things — keep it gentle and practical, not scary.
- if_it_escalates: Only include this if truly relevant. For a single verbal argument, say something like "If this becomes a regular pattern, that's worth talking to someone about — a counsellor, a trusted friend, or a helpline like Relate (0300 100 1234)." NO police numbers for a single argument.`
        : `You are a sharp, calm conflict and legal expert. You are entirely on their side. Direct, confident, real — not preachy, not corporate. You sound like the smartest friend they have.

${countryContext}


CONFLICT TYPE: ${ct?.label || 'General'}
GOAL: ${gt?.label} — ${gt?.desc}
THEIR SITUATION: ${what}${fileContext}

Give them a plan that actually works in ${geo.country}. Use real law. Real bodies. Real steps. Real contact details.

- situation_assessment: 2-3 honest sentences. Who has the stronger position and why.
- legal_position: Their actual rights under ${geo.jurisdiction} — cite specific legislation. Keep it concise.
- recommended_steps: Array of exactly 3 steps — specific, actionable, named. Include timing.
- what_to_say: Complete, word-for-word message or script they can use RIGHT NOW.
- what_not_to_do: Array of 2-3 specific things that would genuinely harm their position.
- if_it_escalates: The next step, process, and how to reach them.`;

      const response = await base44.integrations.Core.InvokeLLM({
      model: 'claude_sonnet_4_6',
      ...(imageUrls.length > 0 ? { file_urls: imageUrls } : {}),
      prompt: systemPrompt,
      response_json_schema: {
        type: 'object',
        properties: {
          situation_assessment: { type: 'string' },
          legal_position:       { type: 'string' },
          recommended_steps:    { type: 'array', items: { type: 'string' } },
          what_to_say:          { type: 'string' },
          what_not_to_do:       { type: 'array', items: { type: 'string' } },
          if_it_escalates:      { type: 'string' },
        },
      },
    });

      // Unwrap nested response if needed
      let raw = response;
      if (typeof raw === 'string') { try { raw = JSON.parse(raw); } catch { raw = null; } }
      if (raw?.response && typeof raw.response === 'object') raw = raw.response;

      // Validate we got actual content back
      if (!raw || typeof raw !== 'object' || Object.keys(raw).length === 0) {
        setResult({ _error: 'Sorry — the analysis came back empty. Please try again.' });
        setLoading(false);
        return;
      }
      setResult(raw);
      setResultGoal(goal);
      // Save to local case history — no login needed
      saveCaseToHistory({
        tool: 'conflict',
        input_text: what,
        ai_result: JSON.stringify(response),
        summary: raw.situation_assessment?.slice(0, 80) || 'Dispute plan',
        severity: 'unknown',
        related_case_id: prefillContext?.related_case_id || null,
      });
    } catch (err) {
      console.error('SORTED conflict analysis error:', err);
      setResult({ _error: err?.message || 'Analysis failed. Please try again.' });
    } finally {
      setLoading(false);
      onResult?.();
    }
  };

  const handleSave = async () => {
    const text =
      `SORTED — Your Plan\n\n` +
      `${result.situation_assessment}\n\n` +
      `YOUR POSITION:\n${result.legal_position}\n\n` +
      `WHAT TO DO:\n${result.recommended_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
      (result.what_to_say ? `WHAT TO SAY:\n${result.what_to_say}\n\n` : '') +
      (result.what_not_to_do?.length ? `DON'T:\n${result.what_not_to_do.map(x => `• ${x}`).join('\n')}\n\n` : '') +
      `Via SORTED — uf51.love/Sorted\nGuidance only, not legal advice.`;

    if (navigator.share) {
      try { await navigator.share({ title: 'SORTED — Your Plan', text }); return; } catch (_) {}
    }
    try { await navigator.clipboard.writeText(text); } catch (_) {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setEmailSent(true); // reuse state as "saved" confirmation
    setTimeout(() => setEmailSent(false), 2500);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2200);
  };

  // Auto-regenerate if goal changes after generating (only when result exists and goal changes)
  useEffect(() => {
    if (result && !result._error && resultGoal && goal !== resultGoal && !loading && what.trim()) {
      analyse();
    }
  }, [goal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-5">
      <style>{`textarea::placeholder { color: rgba(26,18,8,0.35) !important; } input::placeholder { color: rgba(26,18,8,0.35) !important; }`}</style>

      {/* CONNECTED CASE BANNER */}
      {prefillContext?.related_case_id && (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: accentColor, margin: 0 }}>CONNECTED TO YOUR CASE — continuing your thread</p>
        </div>
      )}

      {/* WHAT HAPPENED */}
      <textarea
        value={what}
        onChange={e => setWhat(e.target.value)}
        autoFocus
        placeholder="Just tell us what's going on. Who's involved, what happened, what's been said. Don't filter it."
        style={{
          width: '100%', height: 130, background: '#fff',
          border: `1.5px solid ${what ? accentColor + '90' : 'rgba(26,18,8,0.15)'}`,
          borderRadius: 12, color: '#1a1208', fontSize: 14, padding: '14px 16px',
          resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
          transition: 'border-color 0.2s', boxSizing: 'border-box',
          caretColor: accentColor,
        }}
        onFocus={e => e.target.style.borderColor = accentColor}
        onBlur={e => e.target.style.borderColor = what ? accentColor + '90' : 'rgba(26,18,8,0.15)'}
      />

      {/* LOCATION — inline, compact */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: '#fff', border: '1px solid rgba(26,18,8,0.1)' }}>
        <span style={{ fontSize: 12, opacity: 0.6 }}>📍</span>
        <GeoSelector geo={geo} onChange={setGeo} accentColor={accentColor} />
      </div>

      {/* GOAL — pill chips, light */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.55)', margin: '0 0 8px' }}>WHAT DO YOU WANT?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {GOALS.map(g => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              style={{
                padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
                border: `1px solid ${goal === g.id ? accentColor : 'rgba(26,18,8,0.15)'}`,
                background: goal === g.id ? accentColor + '15' : 'transparent',
                color: goal === g.id ? accentColor : 'rgba(26,18,8,0.6)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                transition: 'all 0.12s',
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* OPTIONAL — conflict type & evidence */}
      <details style={{ cursor: 'pointer' }}>
        <summary style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,18,8,0.45)', letterSpacing: '0.1em', listStyle: 'none', userSelect: 'none' }}>
         + OPTIONAL: conflict type &amp; evidence
        </summary>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Conflict type grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {CONFLICT_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setConflictType(conflictType === t.id ? '' : t.id)}
                style={{
                  padding: '10px 12px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: `1px solid ${conflictType === t.id ? accentColor : 'rgba(26,18,8,0.12)'}`,
                  background: conflictType === t.id ? `${accentColor}15` : '#fff',
                  transition: 'all 0.15s',
                }}
              >
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: conflictType === t.id ? accentColor : 'rgba(26,18,8,0.6)', margin: 0 }}>{t.label}</p>
                <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.4)', margin: '2px 0 0', lineHeight: 1.3 }}>{t.desc}</p>
              </button>
            ))}
          </div>
          {/* File upload */}
          <label style={{ cursor: uploading ? 'not-allowed' : 'pointer', display: 'block' }}>
            <input type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
            <div style={{ border: `1px dashed ${accentColor}40`, borderRadius: 10, padding: '12px 14px', textAlign: 'center', background: `${accentColor}06`, opacity: uploading ? 0.6 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: accentColor + 'cc', fontSize: 12, fontWeight: 600 }}>
                <Upload className="w-4 h-4" />
                {uploading ? 'UPLOADING...' : 'Add photos, videos, documents'}
              </div>
            </div>
          </label>
          {attachments.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {attachments.map((att, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: `${accentColor}15`, border: `1px solid ${accentColor}40`, borderRadius: 6, fontSize: 11, color: accentColor }}>
                  {getFileIcon(att.type)}
                  <span style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{att.name}</span>
                  <button onClick={() => removeAttachment(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: accentColor }}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </details>

      {/* ANALYSE — solid, confident */}
      <AnimatePresence mode="wait">
        {loading ? (
          <SortedThinkingSteps tool="conflict" accentColor={accentColor} isActive={loading} inputHint={what} geo={geo} />
        ) : (
          <motion.button
            key="btn"
            onClick={analyse}
            disabled={!what.trim()}
            whileTap={what.trim() ? { scale: 0.97 } : {}}
            style={{
              width: '100%', padding: '16px 0', borderRadius: 12, fontSize: 14,
              fontWeight: 800, letterSpacing: '0.06em',
              cursor: what.trim() ? 'pointer' : 'not-allowed',
              border: `1px solid ${what.trim() ? accentColor : 'rgba(26,18,8,0.15)'}`,
              background: what.trim() ? accentColor : 'rgba(26,18,8,0.04)',
              color: what.trim() ? '#fff' : 'rgba(26,18,8,0.3)',
              transition: 'all 0.2s',
            }}
          >
            GET MY PLAN →
          </motion.button>
        )}
      </AnimatePresence>

      {/* ERROR FROM RESULT */}
      <AnimatePresence>
        {result?._error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)' }}>
            <p style={{ fontSize: 12, color: '#ef4444', margin: '0 0 8px', fontWeight: 800 }}>⚠ {result._error}</p>
            <button onClick={() => setResult(null)} style={{ fontSize: 10, color: '#ef4444', background: 'none', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 700 }}>Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULT */}
      <AnimatePresence>
        {result && !result._error && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

            <Card label="SITUATION ASSESSMENT" color={accentColor}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, margin: 0 }}>{result.situation_assessment}</p>
            </Card>

            <Card label="YOUR POSITION" color="#06b6d4">
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, margin: 0 }}>{result.legal_position}</p>
            </Card>

            <Card label="WHAT TO DO" color="#22c55e">
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.recommended_steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#22c55e', minWidth: 18, paddingTop: 2 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </Card>

            {result.what_to_say && (
              <Card label="WHAT TO SAY / SEND" color={accentColor}>
                <pre style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.65, margin: '0 0 12px' }}>{result.what_to_say}</pre>
                <motion.button onClick={() => copy(result.what_to_say, 'say')} whileTap={{ scale: 0.95 }} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', border: `1px solid ${accentColor}40`, background: 'transparent', color: accentColor }}>
                  {copied === 'say' ? 'COPIED' : 'COPY THIS'}
                </motion.button>
              </Card>
            )}

            <Card label="WHAT NOT TO DO" color="#ef4444">
              <div className="space-y-2">
                {result.what_not_to_do?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontSize: 10, paddingTop: 3 }}>X</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.if_it_escalates && (
              <Card label="IF IT ESCALATES" color="#eab308">
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{result.if_it_escalates}</p>
              </Card>
            )}

            {/* SAVE / SHARE */}
            <button
              onClick={handleSave}
              style={{
                width: '100%', padding: '13px 0', borderRadius: 10, fontSize: 12, fontWeight: 800,
                letterSpacing: '0.08em', cursor: 'pointer',
                border: '1px solid rgba(34,197,94,0.4)',
                background: emailSent ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.07)',
                color: '#22c55e',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', transition: 'all 0.2s',
              }}
            >
              {emailSent ? '✓ SAVED' : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {navigator.share
                      ? <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></>
                      : <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>
                    }
                  </svg>
                  {navigator.share ? 'SHARE / SAVE' : 'COPY TO CLIPBOARD'}
                </>
              )}
            </button>

            {/* SHARE THE TOOL */}
            <SortedShareButton accentColor={accentColor} />

            <motion.button onClick={() => { setResult(null); setWhat(''); setConflictType(''); setEmailSent(false); setEmailAddr(''); }} whileTap={{ scale: 0.95 }} style={{ width: '100%', padding: '12px 0', borderRadius: 10, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.45)' }}>
              NEW SITUATION
            </motion.button>

            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6, margin: '4px 0 0' }}>
              SORTED provides guidance only — not legal advice. For serious matters, speak to a qualified solicitor. <a href="/SortedTerms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Terms</a>
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', letterSpacing: '0.05em', marginTop: 4 }}>Nothing stored. Nothing seen. Yours alone.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const THINKING_STEPS = [
  "Reading your situation…",
  "Understanding what happened…",
  "Working out the best approach…",
  "Thinking about your options…",
  "Drafting something useful…",
  "Putting it together…",
];

function ConflictThinkingLoader({ accentColor, country }) {
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(i => Math.min(i + 1, THINKING_STEPS.length - 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div key="loading" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 6v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6l-8-4z" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={`${accentColor}15`} />
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
        <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.12em', color: '#fff', margin: '0 0 10px' }}>BUILDING YOUR PLAN</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            style={{ fontSize: 12, color: accentColor, margin: '0 0 4px', fontWeight: 700, letterSpacing: '0.04em' }}
          >
            ▸ {THINKING_STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Analysing against {country} law…</p>
      </div>
    </motion.div>
  );
}

function EmailToSelf({ emailAddr, setEmailAddr, onSend, sent, sending, accentColor }) {
  if (sent) return (
    <div style={{ border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '12px 16px', background: 'rgba(34,197,94,0.06)', textAlign: 'center' }}>
      <p style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, margin: 0 }}>✓ Sent — check your inbox</p>
    </div>
  );
  return (
    <div style={{ border: '1px solid rgba(26,18,8,0.1)', borderRadius: 10, padding: '12px 14px', background: 'rgba(26,18,8,0.02)' }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.4)', margin: '0 0 8px' }}>EMAIL THIS TO YOURSELF</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="email"
          value={emailAddr}
          onChange={e => setEmailAddr(e.target.value)}
          placeholder="your@email.com"
          style={{ flex: 1, background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.12)', borderRadius: 8, color: '#1a1208', fontSize: 12, padding: '9px 12px', outline: 'none', fontFamily: 'inherit' }}
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
      <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', margin: '6px 0 0', letterSpacing: '0.04em' }}>One-time send. Never stored or reused.</p>
    </div>
  );
}

function Label({ children }) {
  return <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(26,18,8,0.4)', margin: 0 }}>{children}</p>;
}

function Card({ label, color, children }) {
  return (
    <div style={{ border: `1px solid ${color}40`, borderRadius: 12, padding: '14px 18px', background: '#1a1208' }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: color, marginBottom: 10 }}>{label}</p>
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