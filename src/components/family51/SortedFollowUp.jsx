import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ICONS = {
  sent_reply:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  they_responded: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/></svg>,
  ignored:        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  resolved:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  escalated:      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>,
  other:          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="17 10 12 5 7 10"/></svg>,
};
const FOLLOW_UP_OPTIONS = [
  { id: 'sent_reply',     label: 'I sent the reply',       color: '#06b6d4' },
  { id: 'they_responded', label: 'They responded',         color: '#22c55e' },
  { id: 'ignored',        label: 'Ignored / no reply',     color: '#f97316' },
  { id: 'resolved',       label: 'Sorted — resolved!',     color: '#22c55e' },
  { id: 'escalated',      label: 'Escalated / gone legal', color: '#ef4444' },
  { id: 'other',          label: 'Something else',         color: '#94a3b8' },
];

// Saves a follow-up note onto an existing case in localStorage
export function saveFollowUp(caseId, followUp) {
  try {
    const stored = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
    const updated = stored.map(c => {
      if (c.id !== caseId) return c;
      const followUps = c.follow_ups || [];
      return {
        ...c,
        follow_ups: [...followUps, { ...followUp, timestamp: new Date().toISOString() }],
        last_updated: new Date().toISOString(),
      };
    });
    localStorage.setItem('sorted_case_history_v1', JSON.stringify(updated));
    return true;
  } catch { return false; }
}

export default function SortedFollowUp({ caseId, existingFollowUps = [], accentColor = '#06b6d4', onSaved }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selected) return;
    const followUp = { type: selected, notes: notes.trim() };
    saveFollowUp(caseId, followUp);
    setSaved(true);
    setOpen(false);
    setSelected(null);
    setNotes('');
    setTimeout(() => setSaved(false), 3000);
    onSaved && onSaved(followUp);
  };

  

  return (
    <div>
      {/* EXISTING FOLLOW-UPS — mini timeline */}
      {existingFollowUps?.length > 0 && (
        <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {existingFollowUps.map((fu, i) => {
            const opt = FOLLOW_UP_OPTIONS.find(o => o.id === fu.type);
            const d = new Date(fu.timestamp);
            const label = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, background: `${opt?.color || '#94a3b8'}10`, border: `1px solid ${opt?.color || '#94a3b8'}25` }}>
                <span style={{ display: 'flex', alignItems: 'center', color: opt?.color || '#94a3b8' }}>{ICONS[opt?.id] || ICONS.other}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: opt?.color || '#94a3b8', flex: 1 }}>{opt?.label || fu.type}</span>
                {fu.notes && <span style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)', flex: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fu.notes}</span>}
                <span style={{ fontSize: 10, color: 'rgba(26,18,8,0.3)', fontFamily: 'monospace', flexShrink: 0 }}>{label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* SAVED FLASH */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', fontSize: 12, fontWeight: 800, color: '#22c55e', marginBottom: 8 }}
          >
            ✓ Update saved to your case file
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD FOLLOW-UP BUTTON */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '10px 0', borderRadius: 10, fontSize: 11,
            fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer',
            border: `1px dashed ${accentColor}50`, background: `${accentColor}06`,
            color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6.5 4v5M4 6.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          LOG WHAT HAPPENED
        </motion.button>
      )}

      {/* FOLLOW-UP SHEET */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(26,18,8,0.4)', margin: 0 }}>WHAT HAPPENED?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {FOLLOW_UP_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelected(opt.id)}
                    style={{
                      padding: '10px 8px', borderRadius: 10, fontSize: 11, fontWeight: 800,
                      cursor: 'pointer', letterSpacing: '0.04em', textAlign: 'left',
                      border: `1.5px solid ${selected === opt.id ? opt.color : opt.color + '30'}`,
                      background: selected === opt.id ? `${opt.color}15` : `${opt.color}06`,
                      color: opt.color, transition: 'all 0.12s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', color: opt.color }}>{ICONS[opt.id]}</span>
                    <span style={{ lineHeight: 1.3 }}>{opt.label}</span>
                  </button>
                ))}
              </div>

              {selected && (
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add a note (optional) — what did they say? What's next?"
                  style={{
                    width: '100%', height: 72, background: '#fff',
                    border: '1px solid rgba(26,18,8,0.15)', borderRadius: 10,
                    color: '#1a1208', fontSize: 12, padding: '10px 12px',
                    resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.55,
                    boxSizing: 'border-box',
                  }}
                />
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => { setOpen(false); setSelected(null); setNotes(''); }}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', border: '1px solid rgba(26,18,8,0.12)', background: 'transparent', color: 'rgba(26,18,8,0.4)' }}
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSave}
                  disabled={!selected}
                  style={{
                    flex: 2, padding: '10px 0', borderRadius: 10, fontSize: 12, fontWeight: 900,
                    cursor: selected ? 'pointer' : 'not-allowed', letterSpacing: '0.08em',
                    border: `1.5px solid ${selected ? accentColor : 'rgba(26,18,8,0.1)'}`,
                    background: selected ? accentColor : 'rgba(26,18,8,0.05)',
                    color: selected ? '#fff' : 'rgba(26,18,8,0.3)', transition: 'all 0.15s',
                  }}
                >
                  SAVE TO CASE FILE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}