import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Trash2 } from 'lucide-react';

const TOOL_CONFIG = {
  letter:   { label: 'DECODED LETTER', color: '#f97316', short: 'Decode' },
  reply:    { label: 'WRITTEN REPLY',  color: '#06b6d4', short: 'Reply'  },
  conflict: { label: 'DISPUTE PLAN',   color: '#ef4444', short: 'Dispute' },
};

const SEVERITY_COLORS = {
  urgent:    '#ef4444',
  important: '#f97316',
  routine:   '#22c55e',
  unknown:   'rgba(255,255,255,0.25)',
};

function parseResult(ai_result, tool) {
  if (!ai_result) return null;
  try {
    return JSON.parse(ai_result);
  } catch {
    return null;
  }
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

function CaseCard({ caseItem, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const tool = TOOL_CONFIG[caseItem.tool] || TOOL_CONFIG.letter;
  const sevColor = SEVERITY_COLORS[caseItem.severity] || SEVERITY_COLORS.unknown;
  const parsed = parseResult(caseItem.ai_result, caseItem.tool);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    try {
      await base44.entities.SortedCase.delete(caseItem.id);
      onDelete(caseItem.id);
    } catch {}
    setDeleting(false);
  };

  // Render parsed content nicely based on tool type
  const renderContent = () => {
    if (!parsed) return (
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
        {caseItem.input_text ? `"${caseItem.input_text.slice(0, 300)}${caseItem.input_text.length > 300 ? '...' : ''}"` : 'No content.'}
      </p>
    );

    if (caseItem.tool === 'letter') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {parsed.we_hear_you && (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>{parsed.we_hear_you}</p>
          )}
          {parsed.what_this_means && (
            <Section label="WHAT IT MEANS" color={tool.color}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, margin: 0 }}>{parsed.what_this_means}</p>
            </Section>
          )}
          {parsed.if_you_ignore_this && (
            <Section label="IF YOU IGNORE THIS" color="#ef4444">
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{parsed.if_you_ignore_this}</p>
            </Section>
          )}
          {parsed.action_steps?.length > 0 && (
            <Section label="WHAT TO DO" color="#22c55e">
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {parsed.action_steps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: '#22c55e', minWidth: 16, paddingTop: 3 }}>{i+1}.</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}
          {parsed.key_deadline && parsed.key_deadline !== 'No deadline mentioned' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316' }}>Deadline: {parsed.key_deadline}</span>
            </div>
          )}
        </div>
      );
    }

    if (caseItem.tool === 'reply') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {parsed.subject_line && (
            <Section label="SUBJECT" color={tool.color}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>{parsed.subject_line}</p>
            </Section>
          )}
          {parsed.letter_body && (
            <Section label="LETTER" color={tool.color}>
              <pre style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.65, margin: 0, maxHeight: 200, overflowY: 'auto' }}>{parsed.letter_body}</pre>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigator.clipboard.writeText(`Subject: ${parsed.subject_line}\n\n${parsed.letter_body}`); }}
                style={{ marginTop: 10, padding: '7px 14px', borderRadius: 8, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', border: `1px solid ${tool.color}40`, background: `${tool.color}10`, color: tool.color }}
              >
                COPY LETTER
              </motion.button>
            </Section>
          )}
          {parsed.tip && (
            <Section label="TIP" color="#eab308">
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{parsed.tip}</p>
            </Section>
          )}
        </div>
      );
    }

    if (caseItem.tool === 'conflict') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {parsed.situation_assessment && (
            <Section label="ASSESSMENT" color={tool.color}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, margin: 0 }}>{parsed.situation_assessment}</p>
            </Section>
          )}
          {parsed.legal_position && (
            <Section label="YOUR LEGAL POSITION" color="#06b6d4">
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{parsed.legal_position}</p>
            </Section>
          )}
          {parsed.what_to_say && (
            <Section label="WHAT TO SAY" color="#22c55e">
              <pre style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6, margin: '0 0 10px' }}>{parsed.what_to_say}</pre>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigator.clipboard.writeText(parsed.what_to_say)}
                style={{ padding: '7px 14px', borderRadius: 8, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}
              >
                COPY THIS
              </motion.button>
            </Section>
          )}
          {parsed.recommended_steps?.length > 0 && (
            <Section label="WHAT TO DO" color="#22c55e">
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {parsed.recommended_steps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: '#22c55e', minWidth: 16, paddingTop: 3 }}>{i+1}.</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ border: `1px solid ${expanded ? tool.color + '40' : tool.color + '20'}`, borderRadius: 14, background: expanded ? `${tool.color}08` : 'rgba(255,255,255,0.02)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}
    >
      {/* HEADER ROW — always visible */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Severity dot */}
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: sevColor, flexShrink: 0, boxShadow: caseItem.severity !== 'unknown' ? `0 0 8px ${sevColor}` : 'none' }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: tool.color, border: `1px solid ${tool.color}40`, borderRadius: 4, padding: '2px 7px' }}>{tool.label}</span>
            {parsed?.severity && parsed.severity !== 'unknown' && (
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: sevColor, opacity: 0.8 }}>{parsed.severity}</span>
            )}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{formatDate(caseItem.created_date)}</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {caseItem.summary || 'View analysis →'}
          </p>
        </div>

        {/* Expand chevron */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                {renderContent()}
              </div>

              {/* DELETE */}
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button
                  onClick={handleDelete}
                  disabled={deleting}
                  whileTap={{ scale: 0.95 }}
                  onBlur={() => setConfirmDelete(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 8, fontSize: 11, fontWeight: 800,
                    letterSpacing: '0.08em', cursor: 'pointer',
                    border: confirmDelete ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    background: confirmDelete ? 'rgba(239,68,68,0.12)' : 'transparent',
                    color: confirmDelete ? '#ef4444' : 'rgba(255,255,255,0.25)',
                    transition: 'all 0.15s',
                  }}
                >
                  <Trash2 size={11} />
                  {deleting ? 'DELETING...' : confirmDelete ? 'CONFIRM DELETE' : 'DELETE'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Section({ label, color, children }) {
  return (
    <div style={{ border: `1px solid ${color}20`, borderRadius: 10, padding: '12px 14px', background: `${color}06` }}>
      <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: `${color}bb`, margin: '0 0 8px' }}>{label}</p>
      {children}
    </div>
  );
}

export default function SortedCaseHistory() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me) {
          const results = await base44.entities.SortedCase.list('-created_date', 50);
          setCases(results || []);
        }
      } catch {} finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = (id) => setCases(prev => prev.filter(c => c.id !== id));

  const filtered = filter === 'all' ? cases : cases.filter(c => c.tool === filter);

  if (loading) return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}>LOADING YOUR CASE FILE...</div>
      </motion.div>
    </div>
  );

  if (!user) return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Your case file is private</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
          Sign in to save and revisit every letter you've decoded, reply you've written, and dispute plan we've built for you.
        </p>
      </div>
      <motion.button
        onClick={() => base44.auth.redirectToLogin()}
        whileTap={{ scale: 0.97 }}
        style={{ padding: '14px 28px', borderRadius: 12, background: '#f97316', color: '#000', fontWeight: 900, fontSize: 13, letterSpacing: '0.08em', border: 'none', cursor: 'pointer' }}
      >
        SIGN IN TO SEE YOUR CASES
      </motion.button>
    </div>
  );

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 20px 60px' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>YOUR SORTED FILE</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>MY CASES</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{cases.length} total</div>
        </div>
      </div>

      {/* FILTER TABS */}
      {cases.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'ALL', color: '#fff' },
            { id: 'letter', label: 'DECODED', color: '#f97316' },
            { id: 'reply', label: 'REPLIES', color: '#06b6d4' },
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
        <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed rgba(249,115,22,0.15)', borderRadius: 14 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6 }}>
            {cases.length === 0
              ? 'Your cases will appear here after your first analysis. Go decode a letter!'
              : 'No cases of this type yet.'}
          </p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(c => (
              <CaseCard key={c.id} caseItem={c} onDelete={handleDelete} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}