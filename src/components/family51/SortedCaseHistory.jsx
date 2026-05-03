import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { anonymizeCase } from '@/utils/anonymizeCase';

// Case history is stored in localStorage — no login ever needed
const STORAGE_KEY = 'sorted_case_history_v1';
const FREE_CASE_LIMIT = 5;

const TOOL_CONFIG = {
  letter:   { label: 'DECODED LETTER', color: '#f97316' },
  reply:    { label: 'WRITTEN REPLY',  color: '#06b6d4' },
  conflict: { label: 'DISPUTE PLAN',   color: '#ef4444' },
};

const SEVERITY_COLORS = {
  urgent:    '#ef4444',
  important: '#f97316',
  routine:   '#22c55e',
  unknown:   'rgba(255,255,255,0.25)',
};

// Session ID — stays the same for the whole browser session so related cases are linked
function getSessionId() {
  let sid = sessionStorage.getItem('sorted_session_id');
  if (!sid) { sid = Date.now().toString(36); sessionStorage.setItem('sorted_session_id', sid); }
  return sid;
}

// Public API — call this from the tool components after a result
// Pass related_case_id when handing off between tools so cases are linked
export function saveCaseToHistory({ tool, input_text, ai_result, summary, severity, related_case_id }) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const id = Date.now().toString();
    // Anonymize for pattern learning
    const anonymized = anonymizeCase(ai_result, tool);
    const newCase = {
      id,
      session_id: getSessionId(),
      related_case_id: related_case_id || null,
      tool,
      input_text: (input_text || '').slice(0, 2000),
      ai_result,
      summary,
      severity: severity || 'unknown',
      anonymized_version: anonymized,
      created_date: new Date().toISOString(),
    };
    // Prepend, keep max FREE_CASE_LIMIT (free users get 3 saved)
    const updated = [newCase, ...existing].slice(0, FREE_CASE_LIMIT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return id; // return so callers can pass it forward as related_case_id
  } catch { return null; }
}

function parseResult(ai_result) {
  if (!ai_result) return null;
  try { return JSON.parse(ai_result); } catch { return null; }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - d) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function Section({ label, color, children }) {
  return (
    <div style={{ border: `1px solid ${color}20`, borderRadius: 10, padding: '12px 14px', background: `${color}06`, marginBottom: 10 }}>
      <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: `${color}bb`, margin: '0 0 8px' }}>{label}</p>
      {children}
    </div>
  );
}

function CopyButton({ text, color }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handle}
      style={{ marginTop: 10, padding: '7px 14px', borderRadius: 8, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', border: `1px solid ${color}40`, background: `${color}10`, color: copied ? '#22c55e' : color }}
    >
      {copied ? '✓ COPIED' : 'COPY'}
    </motion.button>
  );
}

function safeStr(val) {
  if (!val) return val;
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

function renderContent(caseItem) {
  const parsed = parseResult(caseItem.ai_result);
  const tool = TOOL_CONFIG[caseItem.tool] || TOOL_CONFIG.letter;

  if (!parsed) {
    return caseItem.input_text ? (
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
        "{caseItem.input_text.slice(0, 300)}{caseItem.input_text.length > 300 ? '...' : ''}"
      </p>
    ) : null;
  }

  if (caseItem.tool === 'letter') return (
    <>
      {parsed.we_hear_you && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.5 }}>{safeStr(parsed.we_hear_you)}</p>}
      {parsed.what_this_means && <Section label="WHAT IT MEANS" color={tool.color}><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, margin: 0 }}>{safeStr(parsed.what_this_means)}</p></Section>}
      {parsed.if_you_ignore_this && <Section label="IF YOU IGNORE THIS" color="#ef4444"><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{safeStr(parsed.if_you_ignore_this)}</p></Section>}
      {parsed.action_steps?.length > 0 && (
        <Section label="WHAT TO DO" color="#22c55e">
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {parsed.action_steps.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#22c55e', minWidth: 16, paddingTop: 3 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{safeStr(s)}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}
      {parsed.key_deadline && parsed.key_deadline !== 'No deadline mentioned' && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316' }}>Deadline: {safeStr(parsed.key_deadline)}</span>
        </div>
      )}
    </>
  );

  if (caseItem.tool === 'reply') {
    const fullLetter = parsed.subject_line
      ? `Subject: ${parsed.subject_line}\n\n${parsed.letter_body || ''}`
      : (parsed.letter_body || '');
    return (
      <>
        {parsed.subject_line && <Section label="SUBJECT" color={tool.color}><p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>{safeStr(parsed.subject_line)}</p></Section>}
        {parsed.letter_body && (
          <Section label="LETTER" color={tool.color}>
            <pre style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.65, margin: 0, maxHeight: 200, overflowY: 'auto' }}>{safeStr(parsed.letter_body)}</pre>
            <CopyButton text={fullLetter} color={tool.color} />
          </Section>
        )}
        {parsed.tip && <Section label="TIP" color="#eab308"><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{safeStr(parsed.tip)}</p></Section>}
      </>
    );
  }

  if (caseItem.tool === 'conflict') return (
    <>
      {parsed.situation_assessment && <Section label="ASSESSMENT" color={tool.color}><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, margin: 0 }}>{safeStr(parsed.situation_assessment)}</p></Section>}
      {parsed.legal_position && <Section label="YOUR LEGAL POSITION" color="#06b6d4"><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{safeStr(parsed.legal_position)}</p></Section>}
      {parsed.what_to_say && (
        <Section label="WHAT TO SAY" color="#22c55e">
          <pre style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6, margin: 0 }}>{safeStr(parsed.what_to_say)}</pre>
          <CopyButton text={parsed.what_to_say} color="#22c55e" />
        </Section>
      )}
      {parsed.recommended_steps?.length > 0 && (
        <Section label="WHAT TO DO" color="#22c55e">
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {parsed.recommended_steps.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#22c55e', minWidth: 16, paddingTop: 3 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{safeStr(s)}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}
    </>
  );

  return null;
}

function CaseCard({ caseItem, onDelete, onContinue, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(caseItem.summary || '');
  const tool = TOOL_CONFIG[caseItem.tool] || TOOL_CONFIG.letter;
  const sevColor = SEVERITY_COLORS[caseItem.severity] || SEVERITY_COLORS.unknown;

  const handleSaveEdit = () => {
    onEdit(caseItem.id, editValue.trim());
    setEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!confirmDelete) { setConfirmDelete(true); return; }
    onDelete(caseItem.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ border: `1px solid ${expanded ? tool.color + '45' : tool.color + '20'}`, borderRadius: 14, background: expanded ? `${tool.color}08` : 'rgba(255,255,255,0.02)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}
    >
      {/* HEADER */}
      <div onClick={() => setExpanded(!expanded)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', userSelect: 'none' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: sevColor, flexShrink: 0, boxShadow: caseItem.severity !== 'unknown' ? `0 0 8px ${sevColor}` : 'none' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: tool.color, border: `1px solid ${tool.color}40`, borderRadius: 4, padding: '2px 7px' }}>{tool.label}</span>
            {caseItem.related_case_id && (
              <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.08em' }}>↩ LINKED CASE</span>
            )}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{formatDate(caseItem.created_date)}</span>
          </div>
          {editing ? (
            <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input
                autoFocus
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') setEditing(false); }}
                style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '5px 9px', fontSize: 13, color: '#fff', outline: 'none', fontFamily: 'inherit' }}
              />
              <button onClick={handleSaveEdit} style={{ fontSize: 10, fontWeight: 900, color: '#22c55e', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 5, padding: '4px 9px', cursor: 'pointer' }}>SAVE</button>
              <button onClick={() => setEditing(false)} style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, padding: '4px 8px', cursor: 'pointer' }}>✕</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {caseItem.summary || 'Tap to view analysis'}
              </p>
              <button
                onClick={e => { e.stopPropagation(); setEditing(true); setEditValue(caseItem.summary || ''); }}
                style={{ flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px', color: 'rgba(255,255,255,0.2)', fontSize: 10 }}
                title="Edit note"
              >✎</button>
            </div>
          )}
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* EXPANDED CONTENT */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${tool.color}15` }}>
              <div style={{ marginTop: 16 }}>
                {renderContent(caseItem)}
              </div>
              {/* CONTINUE + DELETE */}
              <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                {onContinue && (
                  <motion.button
                    onClick={() => onContinue(caseItem)}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      flex: 1, padding: '11px 0', borderRadius: 10,
                      fontSize: 12, fontWeight: 900, letterSpacing: '0.08em', cursor: 'pointer',
                      border: `2px solid ${tool.color}`,
                      background: tool.color,
                      color: '#000',
                      transition: 'all 0.15s',
                    }}
                  >
                    {caseItem.tool === 'letter' ? 'CONTINUE → WRITE REPLY' : caseItem.tool === 'reply' ? 'CONTINUE → DISPUTE HELP' : 'OPEN THIS CASE'}
                  </motion.button>
                )}
                <motion.button
                  onClick={handleDelete}
                  whileTap={{ scale: 0.95 }}
                  onBlur={() => setConfirmDelete(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderRadius: 10,
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer',
                    border: confirmDelete ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    background: confirmDelete ? 'rgba(239,68,68,0.12)' : 'transparent',
                    color: confirmDelete ? '#ef4444' : 'rgba(255,255,255,0.25)',
                    transition: 'all 0.15s',
                  }}
                >
                  <Trash2 size={11} />
                  {confirmDelete ? 'CONFIRM' : ''}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SortedCaseHistory({ onContinue }) {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setCases(stored);
    } catch { setCases([]); }
  }, []);

  const handleDelete = (id) => {
    const updated = cases.filter(c => c.id !== id);
    setCases(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  const handleEdit = (id, newSummary) => {
    const updated = cases.map(c => c.id === id ? { ...c, summary: newSummary } : c);
    setCases(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  const filtered = filter === 'all' ? cases : cases.filter(c => c.tool === filter);

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 20px 60px' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>ON THIS DEVICE</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>MY CASES</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{cases.length} / {FREE_CASE_LIMIT} saved</div>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: '6px 0 0', lineHeight: 1.5 }}>
          Saved locally on this device. Nothing leaves your phone.
        </p>
        {cases.length >= FREE_CASE_LIMIT && (
          <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            <span style={{ color: '#f97316', fontWeight: 800 }}>3 cases saved</span> — newest replaces oldest. Subscribe for unlimited storage.
          </div>
        )}
      </div>

      {/* FILTER TABS */}
      {cases.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { id: 'all',      label: 'ALL',      color: '#fff' },
            { id: 'letter',   label: 'DECODED',  color: '#f97316' },
            { id: 'reply',    label: 'REPLIES',  color: '#06b6d4' },
            { id: 'conflict', label: 'DISPUTES', color: '#ef4444' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer',
                border: `1px solid ${filter === tab.id ? tab.color + '70' : 'rgba(255,255,255,0.1)'}`,
                background: filter === tab.id ? `${tab.color}15` : 'transparent',
                color: filter === tab.id ? tab.color : 'rgba(255,255,255,0.35)',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* CASES */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed rgba(249,115,22,0.15)', borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="4" width="22" height="24" rx="3" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" fill="none"/>
              <path d="M10 11h12M10 15h12M10 19h8" stroke="rgba(249,115,22,0.3)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)', margin: '0 0 6px' }}>
            {cases.length === 0 ? 'No cases yet' : 'No cases of this type'}
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0, lineHeight: 1.6 }}>
            {cases.length === 0 ? 'Decode a letter — it\'ll appear here automatically.' : 'Try a different filter.'}
          </p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(c => <CaseCard key={c.id} caseItem={c} onDelete={handleDelete} onContinue={onContinue} onEdit={handleEdit} />)}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}