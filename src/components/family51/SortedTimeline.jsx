import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SORTED TIMELINE ─────────────────────────────────────────────────────────
// Calm, animated timeline visualiser — shows the path forward after analysis.
// Each step is tap-expandable. The dot animates along the line as steps complete.
// ─────────────────────────────────────────────────────────────────────────────

const URGENCY_COLORS = {
  urgent:    { line: '#ef4444', dot: '#ef4444', glow: 'rgba(239,68,68,0.25)',  label: 'ACT TODAY',   bg: 'rgba(239,68,68,0.06)'  },
  important: { line: '#f5a623', dot: '#f5a623', glow: 'rgba(245,166,35,0.25)', label: 'THIS WEEK',   bg: 'rgba(245,166,35,0.06)' },
  routine:   { line: '#059669', dot: '#059669', glow: 'rgba(5,150,105,0.25)',  label: 'NO RUSH',     bg: 'rgba(5,150,105,0.06)'  },
};

function TravellingDot({ activeStep, totalSteps, color }) {
  const pct = totalSteps <= 1 ? 0 : (activeStep / (totalSteps - 1)) * 100;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%', pointerEvents: 'none', zIndex: 2 }}>
      <div style={{
        position: 'absolute', left: `${pct}%`, top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 14, height: 14, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 0 4px ${color}40, 0 0 16px ${color}60`,
        transition: 'left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }} />
    </div>
  );
}

function TimelineStep({ step, index, isActive, isDone, isLast, color, onClick }) {
  const [open, setOpen] = useState(false);

  const handleTap = () => {
    if (navigator.vibrate) navigator.vibrate(8);
    setOpen(o => !o);
    onClick(index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: isLast ? 0 : 1, minWidth: 0 }}>
      {/* NODE */}
      <button
        onClick={handleTap}
        style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${isDone || isActive ? color : 'rgba(26,18,8,0.15)'}`,
          background: isDone ? color : isActive ? `${color}20` : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isActive ? `0 0 0 6px ${color}20` : 'none',
          position: 'relative', zIndex: 3,
        }}
      >
        {isDone ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span style={{ fontSize: 11, fontWeight: 900, color: isActive ? color : 'rgba(26,18,8,0.3)', fontVariantNumeric: 'tabular-nums' }}>
            {index + 1}
          </span>
        )}
      </button>

      {/* LABEL */}
      <div style={{ marginTop: 8, textAlign: 'center', maxWidth: 80, padding: '0 4px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', color: isActive ? '#1a1208' : isDone ? color : 'rgba(26,18,8,0.4)', lineHeight: 1.3, transition: 'color 0.3s' }}>
          {step.when}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? '#1a1208' : isDone ? 'rgba(26,18,8,0.6)' : 'rgba(26,18,8,0.35)', lineHeight: 1.3, marginTop: 2, transition: 'color 0.3s' }}>
          {step.title}
        </div>
      </div>

      {/* EXPAND DETAIL — below label, only for active */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden', width: '100%', maxWidth: 200 }}
          >
            <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 10, background: `${color}0d`, border: `1px solid ${color}30`, textAlign: 'left' }}>
              <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.55 }}>{step.detail}</p>
              {step.action && (
                <div style={{ marginTop: 8, fontSize: 10, fontWeight: 800, color, letterSpacing: '0.06em' }}>
                  → {step.action}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SortedTimeline({ analysisResult, tool = 'letter', accentColor = '#f5a623' }) {
  const [steps, setSteps] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [severity, setSeverity] = useState('routine');
  const [doneSteps, setDoneSteps] = useState(new Set());

  useEffect(() => {
    if (!analysisResult) return;
    buildTimelineFromResult();
  }, [analysisResult]);

  // Animate the active dot along automatically every 2.5s
  useEffect(() => {
    if (!steps) return;
    const t = setTimeout(() => {
      setActiveStep(s => s < steps.length - 1 ? s + 1 : s);
    }, 2500);
    return () => clearTimeout(t);
  }, [steps, activeStep]);

  const buildTimelineFromResult = () => {
    setLoading(true);
    let derivedSteps = [];
    let derivedSeverity = 'routine';

    if (tool === 'letter') {
      // Build from letter decode result — no extra LLM call needed
      const r = analysisResult;
      const sev = r?.severity || 'NOT URGENT';
      if (sev === 'VERY URGENT' || sev === 'URGENT') derivedSeverity = 'urgent';
      else if (sev === 'NEEDS ATTENTION') derivedSeverity = 'important';
      else derivedSeverity = 'routine';

      const timeLabels = ['TODAY', 'DAY 2', 'THIS WEEK', 'DEADLINE', 'DONE'];
      const actionSteps = r?.action_steps || [];
      derivedSteps = actionSteps.slice(0, 5).map((step, i) => ({
        when: timeLabels[i] || `STEP ${i + 1}`,
        title: step.length > 30 ? step.slice(0, 28) + '…' : step,
        detail: step,
        action: i === 0 ? 'Start now' : i === actionSteps.length - 1 ? 'Done' : 'Next step',
      }));

      // fallback if no action steps
      if (derivedSteps.length === 0 && r?.what_this_means) {
        derivedSteps = [
          { when: 'TODAY',     title: 'Read carefully',   detail: 'Read the full breakdown above and understand what this letter means.', action: 'Done' },
          { when: 'TODAY',     title: 'Take a photo',     detail: 'Photograph the letter — front and back — and email it to yourself.', action: 'Photographed' },
          { when: 'THIS WEEK', title: 'Get advice',       detail: r.free_help?.[0] || 'Contact Citizens Advice for free guidance.', action: 'Called' },
          { when: 'DEADLINE',  title: 'Respond',          detail: r.key_deadline && r.key_deadline !== 'No deadline mentioned' ? `Respond by ${r.key_deadline}.` : 'Reply when you\'re ready.', action: 'Replied' },
        ];
      }

    } else if (tool === 'contract') {
      // Build from contract analysis — no extra LLM call needed
      const r = analysisResult;
      const verdict = r?.verdict || 'review_carefully';
      if (verdict === 'serious_concerns') derivedSeverity = 'urgent';
      else if (verdict === 'review_carefully') derivedSeverity = 'important';
      else derivedSeverity = 'routine';

      derivedSteps = [
        { when: 'TODAY',     title: 'Read verdict',      detail: r.verdict_reason || 'Review the full analysis above.', action: 'Read' },
        r.red_flags?.length  ? { when: 'TODAY',     title: 'Note red flags',    detail: `${r.red_flags.length} concern${r.red_flags.length > 1 ? 's' : ''} found — don't sign until you understand each one.`, action: 'Noted' } : null,
        r.negotiate?.length  ? { when: 'THIS WEEK', title: 'Negotiate terms',   detail: r.negotiate[0] || 'Push back on the key terms before signing.', action: 'Asked' } : null,
        r.questions?.length  ? { when: 'THIS WEEK', title: 'Ask questions',     detail: `Ask: "${r.questions[0]}"`, action: 'Asked' } : null,
        { when: 'DONE',      title: 'Sign or walk',      detail: verdict === 'looks_ok' ? 'This looks reasonable — sign with confidence.' : 'Only sign when you\'re satisfied with every clause.', action: 'Decided' },
      ].filter(Boolean);
    }

    setSeverity(derivedSeverity);
    setSteps(derivedSteps);
    setActiveStep(0);
    setLoading(false);
  };

  const markDone = (idx) => {
    setDoneSteps(prev => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });
    setActiveStep(idx);
  };

  const uc = URGENCY_COLORS[severity] || URGENCY_COLORS.routine;
  const color = uc.dot;

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, animation: 'tlpulse 1.2s ease-in-out infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.45)', letterSpacing: '0.1em' }}>MAPPING YOUR PATH FORWARD…</span>
        </div>
        <style>{`@keyframes tlpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }`}</style>
        {/* Skeleton */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative', overflow: 'visible' }}>
          {[0,1,2,3].map((i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(26,18,8,0.06)', animation: `tlpulse ${1.2 + i * 0.15}s ease-in-out infinite` }} />
                <div style={{ marginTop: 8, width: 50, height: 8, borderRadius: 4, background: 'rgba(26,18,8,0.06)' }} />
                <div style={{ marginTop: 4, width: 60, height: 10, borderRadius: 4, background: 'rgba(26,18,8,0.04)' }} />
              </div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: 'rgba(26,18,8,0.06)', marginTop: 17, borderRadius: 1 }} />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    );
  }

  if (!steps || steps.length === 0) return null;

  const doneCount = doneSteps.size;
  const progress = Math.round((doneCount / steps.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      style={{ marginTop: 20 }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.4)', marginBottom: 3 }}>WHAT HAPPENS NEXT</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.01em' }}>Your path forward</div>
        </div>
        <div style={{ display: 'flex', flex: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', color, padding: '3px 8px', borderRadius: 20, background: `${color}15`, border: `1px solid ${color}40` }}>
            {uc.label}
          </div>
          {doneCount > 0 && (
            <div style={{ fontSize: 10, color: 'rgba(26,18,8,0.4)', fontWeight: 700, marginTop: 4 }}>
              {doneCount}/{steps.length} done
            </div>
          )}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ height: 3, borderRadius: 2, background: 'rgba(26,18,8,0.07)', marginBottom: 20, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: color, borderRadius: 2 }}
        />
      </div>

      {/* TIMELINE TRACK */}
      <div style={{ position: 'relative', padding: '0 8px' }}>

        {/* CONNECTING LINE — sits behind nodes */}
        <div style={{
          position: 'absolute', left: '5%', right: '5%', top: 17, height: 2,
          background: `linear-gradient(to right, ${color}60, ${color}20)`,
          borderRadius: 1, zIndex: 1,
        }} />

        {/* FILLED LINE — shows progress */}
        <motion.div
          style={{
            position: 'absolute', left: '5%', top: 17, height: 2,
            background: color, borderRadius: 1, zIndex: 2,
            width: steps.length <= 1 ? '0%' : `${(activeStep / (steps.length - 1)) * 90}%`,
            transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        {/* STEPS ROW */}
        <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', zIndex: 3 }}>
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <TimelineStep
                step={step}
                index={i}
                isActive={activeStep === i}
                isDone={doneSteps.has(i)}
                isLast={i === steps.length - 1}
                color={color}
                onClick={markDone}
              />
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, marginTop: 17, background: 'transparent', zIndex: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ACTIVE STEP DETAIL CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{ marginTop: 20, padding: '14px 16px', borderRadius: 14, background: `${color}08`, border: `1.5px solid ${color}25` }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${color}20`, border: `1.5px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 900, color }}>{activeStep + 1}</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color, marginBottom: 3 }}>{steps[activeStep]?.when}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', marginBottom: 4 }}>{steps[activeStep]?.title}</div>
              <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.55 }}>{steps[activeStep]?.detail}</p>
              {steps[activeStep]?.action && (
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, background: color, cursor: 'pointer' }}
                  onClick={() => { setDoneSteps(prev => { const n = new Set(prev); n.add(activeStep); return n; }); setActiveStep(s => Math.min(s + 1, steps.length - 1)); }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>✓ {steps[activeStep].action}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* COMPLETION */}
      <AnimatePresence>
        {doneCount === steps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ marginTop: 16, padding: '16px', borderRadius: 14, background: 'rgba(5,150,105,0.08)', border: '1.5px solid rgba(5,150,105,0.3)', textAlign: 'center' }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>✓</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#059669', marginBottom: 4 }}>You're sorted.</div>
            <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.55)', margin: 0 }}>You've worked through every step. Well done.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.25)', textAlign: 'center', marginTop: 14, margin: '14px 0 0' }}>
        Tap each step to expand · tap action button to mark done
      </p>
    </motion.div>
  );
}