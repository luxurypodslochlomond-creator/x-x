import React, { useState } from 'react';
import SortedResultShell, { SortedResultSection, SortedSteps } from './SortedResultShell';

const SEVERITY_CONFIG = {
  'NOT URGENT':      { color: '#22c55e' },
  'NEEDS ATTENTION': { color: '#d97706' },
  'URGENT':          { color: '#ea580c' },
  'VERY URGENT':     { color: '#dc2626' },
  'EXPIRED':         { color: '#22c55e' },
};

export default function SortedStreamingResult({ result, accentColor = '#f97316', onHandoff, onReset, caseId, geo }) {
  const [flash, setFlash] = useState(null);

  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;
  if (!result || !sev) return null;

  const hasDeadline = result.key_deadline && result.key_deadline !== 'No deadline mentioned';
  const hasMoney = result.amount && result.amount !== 'No specific financial amount mentioned.';
  const badges = [];
  if (hasDeadline) badges.push({ text: `Respond by ${result.key_deadline}`, color: sev.color });
  if (hasMoney) badges.push({ text: result.amount, color: 'rgba(26,18,8,0.7)' });

  const buildText = () =>
    `SORTED — Letter Breakdown\n\n` +
    `${result.letter_summary}\n` +
    `Severity: ${result.severity}\n\n` +
    (result.what_this_means ? `${result.what_this_means}\n\n` : '') +
    `WHAT TO DO:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
    (result.free_help?.length > 0 ? `FREE HELP:\n${result.free_help.join('\n')}\n\n` : '') +
    `Via SORTED — uf51.love/Sorted`;

  const handleShare = async () => {
    const text = buildText();
    if (navigator.share) {
      try {
        const file = new File([text], 'sorted-letter-breakdown.txt', { type: 'text/plain' });
        const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });
        if (canShareFile) await navigator.share({ title: 'SORTED — Letter Breakdown', files: [file] });
        else await navigator.share({ title: 'SORTED — Letter Breakdown', text });
        setFlash('SHARED'); setTimeout(() => setFlash(null), 1800); return;
      } catch (err) { if (err?.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(text); setFlash('SHARED'); setTimeout(() => setFlash(null), 1800); return; } catch (_) {}
    try {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'sorted-letter-breakdown.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setFlash('SHARED'); setTimeout(() => setFlash(null), 1800);
    } catch (_) {}
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(buildText()); setFlash('COPIED'); setTimeout(() => setFlash(null), 1800); } catch (_) {}
  };

  const handleHandoff = () => {
    onHandoff?.({
      summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline,
      what_this_means: result.what_this_means, suggested_tone: result.suggested_tone,
      related_case_id: caseId, action_steps: result.action_steps, severity: result.severity,
      financial_impact: result.amount,
    });
  };

  return (
    <SortedResultShell
      verdict={{
        label: result.severity,
        color: sev.color,
        summary: result.letter_summary,
        detail: result.what_this_means,
        badges,
      }}
      accentColor={accentColor}
      tool="letter"
      caseId={caseId}
      onCopy={handleCopy}
      onShare={handleShare}
      onReset={onReset}
      onHandoff={onHandoff ? handleHandoff : null}
      handoffLabel="CONTINUE → WRITE MY REPLY"
      flash={flash}
    >
      {result.action_steps?.length > 0 && (
        <SortedResultSection label="WHAT TO DO" color={accentColor}>
          <SortedSteps steps={result.action_steps} color={accentColor} />
        </SortedResultSection>
      )}

      {result.free_help?.length > 0 && (
        <SortedResultSection label="FREE EXPERT HELP" color="#22c55e" delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.free_help.slice(0, 2).map((help, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(34,197,94,0.6)', flexShrink: 0, marginTop: 5 }} />
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.5 }}>{help}</p>
              </div>
            ))}
          </div>
        </SortedResultSection>
      )}
    </SortedResultShell>
  );
}