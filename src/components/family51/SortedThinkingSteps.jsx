import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SortedThinkingSteps — the "expert working out loud" loader
 * Steps are contextual to what the user actually typed/uploaded.
 * Each tool generates its own relevant step set based on input.
 */

// Generate contextual steps based on what the user described
function buildContextualSteps(tool, inputHint = '') {
  const hint = (inputHint || '').toLowerCase();

  // Detect key themes in the input
  const isDebt = /debt|bailiff|ccj|county court|arrears|overdue|owe|payment|balance due/.test(hint);
  const isEviction = /evict|section 21|notice to quit|landlord|tenancy|rent|deposit/.test(hint);
  const isEmployment = /dismiss|redundan|workplace|employer|hr|disciplinary|unfair/.test(hint);
  const isHMRC = /hmrc|tax|self.?assess|vat|national insurance|fine|penalty/.test(hint);
  const isCouncil = /council|local authority|planning|enforcement|parking|rates/.test(hint);
  const isCourt = /court|claim|summons|judgment|hearing|solicitor|legal/.test(hint);
  const isScam = /scam|phish|fraud|suspicious|bitcoin|crypto|prize|won|lottery|bank/.test(hint);
  const isNeighbour = /neighbour|noise|boundary|fence|garden|shared/.test(hint);
  const isInsurance = /insurance|claim|policy|premium|damage/.test(hint);
  const isConsumer = /refund|return|faulty|broken|consumer|trading standards|chargeback/.test(hint);

  if (tool === 'letter') {
    if (isDebt) return [
      { text: 'Reading your debt letter',        sub: 'Checking who it\'s from and why' },
      { text: 'Verifying the debt is real',       sub: 'Bailiff letters are often bluffs' },
      { text: 'Checking your rights on this',     sub: 'Debt collection rules in your jurisdiction' },
      { text: 'Finding deadlines that matter',    sub: 'Some of these are strict — some aren\'t' },
      { text: 'Working out your options',         sub: 'Dispute, negotiate, or ignore safely' },
      { text: 'Writing it in plain English',      sub: 'No jargon. What it actually means.' },
    ];
    if (isEviction) return [
      { text: 'Reading your eviction notice',     sub: 'Checking the type and validity' },
      { text: 'Checking the notice period',       sub: 'Legal minimums in your area' },
      { text: 'Looking at your tenancy rights',   sub: 'Section 21, Section 8 — what applies here' },
      { text: 'Spotting any errors in the notice',sub: 'Invalid notices are surprisingly common' },
      { text: 'Finding your real options',        sub: 'You have more time than you think' },
      { text: 'Plain English summary',            sub: 'What this means and what to do' },
    ];
    if (isHMRC) return [
      { text: 'Reading your HMRC letter',         sub: 'These can look scarier than they are' },
      { text: 'Identifying what HMRC wants',      sub: 'Tax owed, info request, or penalty?' },
      { text: 'Checking your rights',             sub: 'You can always appeal — here\'s how' },
      { text: 'Looking at deadlines',             sub: 'HMRC deadlines are real — finding yours' },
      { text: 'Finding your options',             sub: 'Payment plans, appeals, disputes' },
      { text: 'Plain English summary',            sub: 'What this actually means for you' },
    ];
    if (isEmployment) return [
      { text: 'Reading your employment letter',   sub: 'Disciplinary, dismissal, or redundancy?' },
      { text: 'Checking employment law',          sub: 'Your rights in this jurisdiction' },
      { text: 'Looking at process followed',      sub: 'Procedural failures can be your strongest card' },
      { text: 'Spotting deadlines',               sub: 'Employment tribunal windows are short' },
      { text: 'Finding your options',             sub: 'Appeal, grievance, or tribunal?' },
      { text: 'Plain English summary',            sub: 'What this means and what to do next' },
    ];
    if (isCourt) return [
      { text: 'Reading your court document',      sub: 'Claim, summons, or judgment?' },
      { text: 'Understanding what\'s being claimed', sub: 'Exact nature and amount' },
      { text: 'Checking your response window',    sub: 'Court deadlines are strict' },
      { text: 'Looking at your defence options',  sub: 'You have more options than you think' },
      { text: 'Finding free legal help',          sub: 'Real services for your situation' },
      { text: 'Plain English summary',            sub: 'Step by step what happens next' },
    ];
    // Default letter steps
    return [
      { text: 'Reading your letter',              sub: 'Nothing stored — this stays private' },
      { text: 'Identifying what type this is',    sub: 'Matching to known letter patterns' },
      { text: 'Checking your jurisdiction',       sub: 'Laws differ — getting yours right' },
      { text: 'Spotting deadlines',               sub: 'Dates that matter most' },
      { text: 'Finding your real options',        sub: 'What you can actually do' },
      { text: 'Writing plain English',            sub: 'No jargon. No nonsense.' },
    ];
  }

  if (tool === 'reply') {
    if (isDebt) return [
      { text: 'Understanding your debt situation', sub: 'Reading exactly what you told us' },
      { text: 'Checking what you legally owe',    sub: 'Not all claimed debts are valid' },
      { text: 'Finding the right response',       sub: 'Dispute, request proof, or negotiate' },
      { text: 'Drafting your letter',             sub: 'Firm, factual, and effective' },
      { text: 'Adding the right legal references',sub: 'Makes them take you seriously' },
    ];
    if (isEviction) return [
      { text: 'Understanding your situation',     sub: 'Reading what you told us' },
      { text: 'Checking tenancy law here',        sub: 'Your specific rights as a tenant' },
      { text: 'Finding the strongest response',   sub: 'Challenge the notice if it\'s flawed' },
      { text: 'Drafting your reply',              sub: 'Clear, confident, professional' },
      { text: 'Final review',                     sub: 'Making sure it lands right' },
    ];
    if (isConsumer) return [
      { text: 'Understanding your complaint',     sub: 'What happened and what you want' },
      { text: 'Checking consumer law',            sub: 'Consumer Rights Act / local equivalent' },
      { text: 'Building your case',               sub: 'What you\'re entitled to and why' },
      { text: 'Drafting your letter',             sub: 'Formal, firm, and impossible to ignore' },
      { text: 'Final polish',                     sub: 'Clear ask, clear deadline, clear consequences' },
    ];
    // Default reply steps
    return [
      { text: 'Understanding your situation',     sub: 'Reading what you told us' },
      { text: 'Checking your rights',             sub: 'In your jurisdiction specifically' },
      { text: 'Choosing the right tone',          sub: 'Firm but fair. Clear and effective.' },
      { text: 'Drafting your letter',             sub: 'Sharp, direct, ready to send' },
      { text: 'Final polish',                     sub: 'Making sure it lands right' },
    ];
  }

  if (tool === 'conflict') {
    if (isNeighbour) return [
      { text: 'Reading your neighbour situation', sub: 'Noise, boundaries, shared areas?' },
      { text: 'Checking property and nuisance law', sub: 'What\'s legally actionable here' },
      { text: 'Looking at council powers',        sub: 'Environmental health, mediation routes' },
      { text: 'Building your approach',           sub: 'Firm but neighbourly if possible' },
      { text: 'Finding escalation routes',        sub: 'If talking doesn\'t work' },
      { text: 'Writing what to say',              sub: 'Exact words for the conversation' },
    ];
    if (isEmployment) return [
      { text: 'Reading your workplace dispute',   sub: 'What happened and who\'s involved' },
      { text: 'Checking employment rights',       sub: 'Grievance, disciplinary, or both?' },
      { text: 'Looking at ACAS process',          sub: 'The right procedure protects you' },
      { text: 'Building your position',           sub: 'What you can reasonably ask for' },
      { text: 'Drafting your approach',           sub: 'What to say and how to say it' },
      { text: 'Finding support',                  sub: 'Free help available to you' },
    ];
    if (isEviction) return [
      { text: 'Reading your landlord dispute',    sub: 'Deposit, repairs, or eviction?' },
      { text: 'Checking tenant rights',           sub: 'What your landlord can and can\'t do' },
      { text: 'Looking at housing law',           sub: 'Specific to your jurisdiction' },
      { text: 'Building your position',           sub: 'Evidence, letters, timelines' },
      { text: 'Finding your leverage',            sub: 'You have more than you think' },
      { text: 'What to say and do next',          sub: 'Exact steps from here' },
    ];
    // Default conflict steps
    return [
      { text: 'Understanding the dispute',        sub: 'Reading your situation carefully' },
      { text: 'Identifying your position',        sub: 'What you\'re entitled to here' },
      { text: 'Checking relevant law',            sub: 'In your specific jurisdiction' },
      { text: 'Mapping the other side',           sub: 'What they can and can\'t do' },
      { text: 'Building your strategy',           sub: 'Step by step, what to do' },
      { text: 'Finding free help',                sub: 'Real services, real contacts' },
    ];
  }

  if (tool === 'scam') {
    if (isDebt) return [
      { text: 'Reading this debt message',        sub: 'Checking every claim they make' },
      { text: 'Verifying if this company is real',sub: 'Fake debt collectors are very common' },
      { text: 'Checking the numbers add up',      sub: 'Inflated fees are a red flag' },
      { text: 'Assessing the risk level',         sub: 'Real threat or bluff?' },
      { text: 'Finding who to report this to',    sub: 'FCA, Trading Standards, Action Fraud' },
    ];
    // Detect specific scam types
    const isParcel = /parcel|delivery|royal mail|dpd|evri|fedex|ups|tracking/.test(hint);
    const isBank = /bank|account|suspended|blocked|verify|barclays|natwest|hsbc|lloyds/.test(hint);
    const isTax = /hmrc|tax refund|rebate|owed|government/.test(hint);
    const isTech = /microsoft|apple|virus|computer|tech support|bt|broadband/.test(hint);
    if (isParcel) return [
      { text: 'Reading this delivery message',    sub: 'Parcel scams are the #1 fraud right now' },
      { text: 'Checking the sender details',      sub: 'Real couriers never ask for card details' },
      { text: 'Scanning the link if any',         sub: 'Does it go to the real site?' },
      { text: 'Assessing the risk',               sub: 'Have you clicked or paid anything?' },
      { text: 'Finding how to report it',         sub: 'Specific reporting route for you' },
    ];
    if (isBank) return [
      { text: 'Reading this banking message',     sub: 'These are designed to panic you' },
      { text: 'Checking sender authenticity',     sub: 'Real banks never text asking for passwords' },
      { text: 'Looking for social engineering',   sub: 'Urgency, fear, pressure — classic signs' },
      { text: 'Assessing what they want',         sub: 'Credentials, money, or access?' },
      { text: 'Finding how to report it',         sub: 'Your bank\'s fraud line + Action Fraud' },
    ];
    if (isTax) return [
      { text: 'Reading this HMRC message',        sub: 'Tax refund scams are extremely common' },
      { text: 'Checking if HMRC contacts this way', sub: 'Hint: HMRC never texts about refunds' },
      { text: 'Checking the sender details',      sub: 'Email address, phone number analysis' },
      { text: 'Assessing the risk',               sub: 'Have you entered any details?' },
      { text: 'Finding how to report it',         sub: 'HMRC phishing team + Action Fraud' },
    ];
    // Default scam steps
    return [
      { text: 'Reading the message',              sub: 'Checking every detail' },
      { text: 'Scanning known scam patterns',     sub: 'Matching against fraud databases' },
      { text: 'Checking sender details',          sub: 'Numbers, links, language red flags' },
      { text: 'Assessing the risk',               sub: 'How serious is this?' },
      { text: 'Finding reporting routes',         sub: 'Who to tell and how' },
    ];
  }

  // Fallback
  return [
    { text: 'Reading your submission',            sub: 'Nothing stored — gone when done' },
    { text: 'Checking the details',               sub: 'Every word matters' },
    { text: 'Finding what applies to you',        sub: 'Your jurisdiction, your rights' },
    { text: 'Building your answer',               sub: 'Almost there' },
  ];
}

export default function SortedThinkingSteps({ tool = 'letter', accentColor = '#f97316', isActive = false, inputHint = '' }) {
  const steps = buildContextualSteps(tool, inputHint);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Reset when activated
  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    setCurrentStep(0);
    setCompletedSteps([]);

    // Each step: varied timing so it feels organic, not mechanical
    const durations = steps.map((_, i) => 2400 + (i % 3) * 700 + (i % 2) * 300);

    let stepIndex = 0;
    let cancelled = false;

    const advance = () => {
      if (cancelled) return;
      if (stepIndex < steps.length - 1) {
        setCompletedSteps(prev => [...prev, stepIndex]);
        stepIndex++;
        setCurrentStep(stepIndex);
        setTimeout(advance, durations[stepIndex]);
      }
    };

    const timer = setTimeout(advance, durations[0]);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isActive, tool, inputHint]);

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
      {/* Pulsing brain orb */}
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1 }}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
            stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
            stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* Steps list */}
      <div style={{ width: '100%', maxWidth: 290, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {steps.map((step, i) => {
          const isDone = completedSteps.includes(i);
          const isCurrent = i === currentStep;
          const isPending = !isDone && !isCurrent;

          return (
            <motion.div
              key={`${tool}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isPending ? 0.22 : 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
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
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: `2px solid ${accentColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <motion.div
                      animate={{ scale: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: accentColor }}
                    />
                  </div>
                ) : (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(26,18,8,0.1)' }} />
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: 13,
                  fontWeight: isCurrent ? 900 : isDone ? 700 : 500,
                  color: isDone ? accentColor : isCurrent ? '#1a1208' : 'rgba(26,18,8,0.3)',
                  margin: '0 0 2px',
                  letterSpacing: isCurrent ? '0.01em' : '0',
                  transition: 'all 0.3s',
                }}>
                  {step.text}
                </p>
                {isCurrent && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ fontSize: 11, color: 'rgba(26,18,8,0.42)', margin: 0, letterSpacing: '0.02em' }}
                  >
                    {step.sub}
                  </motion.p>
                )}
                {isDone && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.45 }}
                    style={{ fontSize: 10, color: accentColor, margin: 0 }}
                  >
                    ✓ done
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Privacy note */}
      <p style={{
        fontSize: 10, color: 'rgba(26,18,8,0.28)', marginTop: 26,
        textAlign: 'center', letterSpacing: '0.06em', fontWeight: 700
      }}>
        NOTHING STORED · PROCESSED &amp; GONE
      </p>
    </motion.div>
  );
}