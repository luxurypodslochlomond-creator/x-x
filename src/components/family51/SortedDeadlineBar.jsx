import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, AlertCircle, Clock, Hash, FileText, Mail, Phone, MapPin } from 'lucide-react';

/**
 * SortedDeadlineBar — unified "Key Intel" strip.
 * Shows sender, reference number, letter date, reply-to contact, and deadline
 * with live countdown. One tap saves a reminder to their phone calendar.
 */

function parseDeadline(dateStr) {
  if (!dateStr) return null;
  const cleaned = dateStr.trim().replace(/\s+/g, ' ');
  let d = new Date(cleaned);
  if (isNaN(d)) {
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

function isReal(value) {
  if (!value) return false;
  const v = String(value).trim();
  return v.length > 1 && !['unknown', 'n/a', 'not found', 'null', 'none', 'no deadline mentioned'].includes(v.toLowerCase());
}

function detectContactIcon(contact) {
  const c = (contact || '').toLowerCase();
  if (c.includes('@') || c.includes('email') || c.includes('mail:')) return Mail;
  if (/\b\d{3,}/.test(c) || c.includes('phone') || c.includes('call') || c.includes('tel')) return Phone;
  if (c.includes('address') || c.includes('street') || c.includes('st,') || c.includes('reply to')) return MapPin;
  return Mail;
}

function IntelRow({ icon: Icon, label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Icon size={13} color={color || 'rgba(26,18,8,0.4)'} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.4)', minWidth: 42 }}>{label}</span>
      <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1208', margin: 0, flex: 1, wordBreak: 'break-word' }}>{value}</p>
    </div>
  );
}

export default function SortedDeadlineBar({ result, accentColor = '#f97316' }) {
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  const sender = result?.sender;
  const refNumber = result?.reference_number;
  const letterDate = result?.letter_date;
  const replyTo = result?.reply_to_contact;
  const deadlineStr = result?.key_deadline;
  const deadlineDate = parseDeadline(deadlineStr);

  const hasSender = isReal(sender);
  const hasRef = isReal(refNumber);
  const hasLetterDate = isReal(letterDate);
  const hasReplyTo = isReal(replyTo);
  const hasDeadline = deadlineStr && deadlineStr !== 'No deadline mentioned' && deadlineStr !== 'null' && deadlineDate;

  if (!hasSender && !hasDeadline && !hasRef && !hasLetterDate && !hasReplyTo) return null;

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
    const descParts = [`Deadline: ${deadlineStr}`];
    if (hasSender) descParts.push(`From: ${sender}`);
    if (hasRef) descParts.push(`Ref: ${refNumber}`);
    if (hasReplyTo) descParts.push(`Reply to: ${replyTo}`);
    descParts.push('', 'Via SORTED — uf51.love/Sorted');
    const ics = buildICS(summary, deadlineDate, descParts.join('\n'));
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

  const ContactIcon = hasReplyTo ? detectContactIcon(replyTo) : Mail;

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
      {/* KEY INTEL header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 6, borderBottom: '1px solid rgba(26,18,8,0.06)' }}>
        <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: 'rgba(26,18,8,0.5)' }}>KEY INTEL</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,18,8,0.06)' }} />
      </div>

      {/* Sender */}
      {hasSender && <IntelRow icon={FileText} label="FROM" value={sender} />}

      {/* Reference number */}
      {hasRef && <IntelRow icon={Hash} label="REF" value={refNumber} color={accentColor} />}

      {/* Letter date */}
      {hasLetterDate && <IntelRow icon={FileText} label="DATED" value={letterDate} />}

      {/* Reply-to contact */}
      {hasReplyTo && <IntelRow icon={ContactIcon} label="REPLY TO" value={replyTo} color={accentColor} />}

      {/* Deadline row */}
      {hasDeadline && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: hasSender || hasRef || hasLetterDate || hasReplyTo ? 6 : 0 }}>
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