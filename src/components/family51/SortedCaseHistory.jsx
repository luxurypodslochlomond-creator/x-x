import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const TOOL_LABELS = {
  letter: { label: 'DECODED LETTER', color: '#f97316' },
  reply:  { label: 'WRITTEN REPLY',  color: '#06b6d4' },
  conflict: { label: 'DISPUTE PLAN', color: '#ef4444' },
};

const SEVERITY_COLORS = {
  urgent:    '#ef4444',
  important: '#f97316',
  routine:   '#22c55e',
  unknown:   'rgba(255,255,255,0.3)',
};

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="7" stroke="#f97316" strokeWidth="1.3" fill="none"/>
      <path d="M9 5v4l2.5 2.5" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 4.5l1 1.5M14.5 4.5l-1 1.5" stroke="#f97316" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
      <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function CaseCard({ caseItem }) {
  const [expanded, setExpanded] = useState(false);
  const tool = TOOL_LABELS[caseItem.tool] || TOOL_LABELS.letter;
  const sevColor = SEVERITY_COLORS[caseItem.severity] || SEVERITY_COLORS.unknown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        border: `1px solid ${tool.color}25`,
        borderRadius: 12,
        background: `${tool.color}07`,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        {/* Severity dot */}
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: sevColor, flexShrink: 0, boxShadow: `0 0 6px ${sevColor}` }} />
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: tool.color, border: `1px solid ${tool.color}40`, borderRadius: 4, padding: '2px 6px' }}>{tool.label}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>{formatDate(caseItem.created_date)}</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: expanded ? 'normal' : 'nowrap' }}>
            {caseItem.summary || 'View analysis →'}
          </p>
        </div>
        
        <ChevronIcon open={expanded} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${tool.color}15` }}>
              {caseItem.input_text && (
                <div style={{ marginTop: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>ORIGINAL INPUT</div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5, maxHeight: 80, overflow: 'hidden', fontStyle: 'italic' }}>
                    "{caseItem.input_text.slice(0, 200)}{caseItem.input_text.length > 200 ? '...' : ''}"
                  </p>
                </div>
              )}
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>AI ANALYSIS</div>
                <div style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6,
                  background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 12,
                  maxHeight: 300, overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                }}>
                  {caseItem.ai_result}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SortedCaseHistory() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me) {
          const results = await base44.entities.SortedCase.list('-created_date', 50);
          setCases(results || []);
        }
      } catch {
        // not logged in
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>LOADING YOUR CASES...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Your case history is saved when you're signed in.
        </div>
        <button
          onClick={() => base44.auth.redirectToLogin()}
          style={{
            marginTop: 16, padding: '12px 24px', borderRadius: 10,
            background: '#f97316', color: '#000', fontWeight: 900,
            fontSize: 13, letterSpacing: '0.06em', border: 'none', cursor: 'pointer',
          }}
        >
          SIGN IN TO SEE HISTORY
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '32px 20px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <HistoryIcon />
        <div>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>SUBSCRIBER FEATURE</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>MY CASE FILE</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
          {cases.length} {cases.length === 1 ? 'case' : 'cases'}
        </div>
      </div>

      {cases.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed rgba(249,115,22,0.2)', borderRadius: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            Your cases will appear here after your first analysis.
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cases.map(c => <CaseCard key={c.id} caseItem={c} />)}
        </div>
      )}
    </div>
  );
}