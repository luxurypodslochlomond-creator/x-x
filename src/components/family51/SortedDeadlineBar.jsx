import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, AlertCircle, Clock } from 'lucide-react';

/**
 * SortedDeadlineBar — shows sender + deadline with live countdown.
 * One tap saves a reminder to their phone calendar. Zero headache.
 */
function parseDeadline(dateStr) {
  if (!dateStr) return null;
  // Try common formats
  const cleaned = dateStr.trim().replace(/\s+/g, ' ');
  // Try ISO first
  let d = new Date(cleaned);
  if (isNaN(d)) {
    // Try "14 May 2026", "14 May", "May 14, 2026", etc
    const formats = [
      /^\d{1,2}\s+\w+\s+\d{4}$/,
      /^\d{1,2}\s+\w+$/,
      /^\w+\s+\d{1,2},?\s*\d{4}$/,
      /^\d{1,2}\/\d{1,2}\/\d{2,4}$/,
      /^\d{4}-\d{2}-\d{2}$/,
    ];
    for (const f of formats) {
      if (f.test(cleaned)) { d = new Date(cleaned); break; }
    }
    // Add current year if only day+month
    if (isNaN(d) && /^\d{1,2}\s+\w+$/.test(cleaned)) {
      d = new Date(cleaned + ' ' + new Date().getFullYear());
    }
  }
  return isNaN(d) ? null : d;
}

function buildICS(summary, deadline, description) {
  const pad = (n) => String(n).padStart(2, '0');
  const toICSDate = (d) => {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
      'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
  };
  const start = new Date(deadline);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);
  // Reminder 2 days before
  const alarmStart = new Date(start);
  alarmStart.setDate(alarmStart.getDate() - 2);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SORTED//UF51//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@sorted.uf51.love`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'BEGIN:VALARM',
    'TRIGGER:-P2D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${summary}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export default function SortedDeadlineBar({ result, accentColor = '#f97316' }) {
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Live countdown — ticks every minute
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  const sender = result?.sender;
  const deadlineStr = result?.key_deadline;
  const deadlineDate = parseDeadline(deadlineStr);

  const hasSender = sender && sender !== 'Unknown' && sender !== 'N/A' && sender.length > 1;
  const hasDeadline = deadlineStr && deadlineStr !== 'No deadline mentioned' && deadlineStr !== 'null' && deadlineDate;

  if (!hasSender && !hasDeadline) return null;

  // Calculate countdown
  let countdown = null;
  let isOverdue = false;
  let countdownColor = accentColor;
  let countdownText = '';

  if (hasDeadline) {
    const diff = deadlineDate.getTime() - now;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);

    if (diff < 0) {
      isOverdue = true;
      countdownText = 'OVERDUE';
      countdownColor = '#dc2626';
    } else if (days === 0 && hours > 0) {
      countdownText = `${hours} hour${hours > 1 ? 's' : ''} left`;
      countdownColor = '#dc2626';
    } else if (days === 0) {
      countdownText = 'TODAY';
      countdownColor = '#dc2626';
    } else if (days <= 3) {
      countdownText = `${days} day${days > 1 ? 's' : ''} left`;
      countdownColor = '#ea580c';
    } else if (days <= 7) {
      countdownText = `${days} days left`;
      countdownColor = '#d97706';
    } else {
      countdownText = `${days} days left`;
      countdownColor = '#22c55e';
    }
  }

  const handleSaveReminder = () => {
    const summary = `SORTED — ${result?.letter_summary || 'Letter deadline'}`;
    const description = `Deadline: ${deadlineStr}\nFrom: ${sender || 'Unknown'}\n\nVia SORTED — uf51.love/Sorted`;
    const ics = buildICS(summary, deadlineDate, description);
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sorted-reminder.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      style={{
        borderRadius: 14, padding: '14px 18px',
        background: '#fff', border: `1px solid ${countdownColor}30`,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      {/* Sender row */}
      {hasSender && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.4)' }}>FROM</span>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1208', margin: 0, flex: 1 }}>{sender}</p>
        </div>
      )}

      {/* Deadline row */}
      {hasDeadline && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.4)' }}>DEADLINE</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} color={countdownColor} />
            <p style={{ fontSize: 13, fontWeight: 700, color: countdownColor, margin: 0 }}>{deadlineStr}</p>
          </div>
          {!isOverdue && (
            <span style={{
              fontSize: 10, fontWeight: 800, color: '#fff',
              background: countdownColor, padding: '3px 8px', borderRadius: 20,
              letterSpacing: '0.06em',
            }}>
              {countdownText}
            </span>
          )}
          {isOverdue && (
            <span style={{
              fontSize: 10, fontWeight: 800, color: '#fff',
              background: countdownColor, padding: '3px 8px', borderRadius: 20,
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
              <AlertCircle size={11} /> {countdownText}
            </span>
          )}
        </div>
      )}

      {/* Save reminder button */}
      {hasDeadline && !isOverdue && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSaveReminder}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            width: '100%', padding: '11px 0', borderRadius: 10, fontSize: 12,
            fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer',
            border: `1px solid ${accentColor}40`,
            background: saved ? 'rgba(34,197,94,0.08)' : 'transparent',
            color: saved ? '#22c55e' : accentColor,
            transition: 'all 0.2s',
          }}
        >
          {saved ? (
            <>SAVED TO CALENDAR</>
          ) : (
            <>
              <CalendarPlus size={14} /> SAVE DEADLINE TO MY CALENDAR
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}