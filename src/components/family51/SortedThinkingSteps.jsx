import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SortedThinkingSteps — the "expert working out loud" loader
 * Shows steps completing in real time, each one ticking off before the next starts.
 * Used across all 4 SORTED tools so users feel the intelligence, not just wait.
 */

const STEP_SETS = {
  letter: [
    { text: 'Reading your letter',       sub: 'Nothing is stored — this stays private' },
    { text: 'Identifying what type this is', sub: 'Matching to known letter patterns' },
    { text: 'Checking your jurisdiction', sub: 'Laws differ — getting yours right' },
    { text: 'Spotting deadlines',         sub: 'Dates that matter most' },
    { text: 'Finding your real options',  sub: 'What you can actually do' },
    { text: 'Writing plain English',      sub: 'No jargon. No nonsense.' },
  ],
  reply: [
    { text: 'Understanding your situation', sub: 'Reading what you told us' },
    { text: 'Checking your rights',       sub: 'In your jurisdiction specifically' },
    { text: 'Choosing the right tone',    sub: 'Firm but fair. Clear and effective.' },
    { text: 'Drafting your letter',       sub: 'Sharp, direct, ready to send' },
    { text: 'Final polish',               sub: 'Making sure it lands right' },
  ],
  conflict: [
    { text: 'Understanding the dispute',  sub: 'Reading your situation carefully' },
    { text: 'Identifying your position',  sub: 'What you\'re entitled to here' },
    { text: 'Checking relevant law',      sub: 'In your specific jurisdiction' },
    { text: 'Mapping the other side',     sub: 'What they can and can\'t do' },
    { text: 'Building your strategy',     sub: 'Step by step, what to do' },
    { text: 'Finding free help',          sub: 'Real services, real contacts' },
  ],
  scam: [
    { text: 'Reading the message',        sub: 'Checking every detail' },
    { text: 'Scanning known patterns',    sub: 'Matching against scam databases' },
    { text: 'Checking sender details',    sub: 'Numbers, links, language red flags' },
    { text: 'Assessing the risk',         sub: 'How serious is this?' },
    { text: 'Finding reporting routes',   sub: 'Who to tell and how' },
  ],
};

export default function SortedThinkingSteps({ tool = 'letter', accentColor = '#f97316', isActive = false }) {
  const steps = STEP_SETS[tool] || STEP_SETS.letter;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    // Each step takes between 2.5s and 4s — varied so it feels organic
    const durations = steps.map((_, i) => 2500 + (i % 3) * 600);

    let stepIndex = 0;
    const advance = () => {
      if (stepIndex < steps.length - 1) {
        setCompletedSteps(prev => [...prev, stepIndex]);
        stepIndex++;
        setCurrentStep(stepIndex);
        setTimeout(advance, durations[stepIndex]);
      }
    };

    const timer = setTimeout(advance, durations[0]);
    return () => clearTimeout(timer);
  }, [isActive, tool]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}
    >
      {/* Pulsing orb */}
      <div style={{ position: 'relative', width: 52, height: 52, marginBottom: 28 }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: accentColor }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: accentColor }}
        />
        {/* Brain/thinking icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1 }}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* Steps list */}
      <div style={{ width: '100%', maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((step, i) => {
          const isDone = completedSteps.includes(i);
          const isCurrent = i === currentStep;
          const isPending = !isDone && !isCurrent;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isPending ? 0.25 : 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              {/* Status icon */}
              <div style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
                {isDone ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: accentColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                ) : isCurrent ? (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                      animate={{ scale: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: accentColor }}
                    />
                  </div>
                ) : (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(26,18,8,0.12)' }} />
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: 13, fontWeight: isCurrent ? 900 : isDone ? 700 : 500,
                  color: isDone ? accentColor : isCurrent ? '#1a1208' : 'rgba(26,18,8,0.35)',
                  margin: '0 0 2px',
                  letterSpacing: isCurrent ? '0.02em' : '0',
                  transition: 'all 0.3s',
                }}>
                  {step.text}
                  {isDone && <span style={{ fontSize: 10, marginLeft: 6, opacity: 0.6 }}>✓</span>}
                </p>
                {isCurrent && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ fontSize: 10, color: 'rgba(26,18,8,0.45)', margin: 0, letterSpacing: '0.03em' }}
                  >
                    {step.sub}
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Privacy note */}
      <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.3)', marginTop: 24, textAlign: 'center', letterSpacing: '0.06em', fontWeight: 700 }}>
        NOTHING STORED · PROCESSED &amp; GONE
      </p>
    </motion.div>
  );
}