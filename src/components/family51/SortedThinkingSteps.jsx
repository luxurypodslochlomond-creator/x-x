import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SortedThinkingSteps — best in world "expert thinking out loud" loader
 * 
 * Two layers of personalisation:
 * 1. Steps are contextual to the detected topic (debt, eviction, HMRC, scam type, etc.)
 * 2. The active step subtitle references specifics extracted from their actual text
 *    (amount, company name, sender, deadline) so it feels like a real expert reading their document
 */

// ─── Extract specifics from raw input ─────────────────────────────────────────
function extractSpecifics(input = '') {
  const text = input.slice(0, 600); // only need the opening

  // Amount: £1,234 or $500 or 1234.00
  const amountMatch = text.match(/[£$€]\s?[\d,]+(?:\.\d{1,2})?|\b\d{1,6}(?:\.\d{2})?\s*(?:pounds?|dollars?|euros?)/i);
  const amount = amountMatch?.[0]?.trim();

  // Deadline / date: by 14 May, within 7 days, before 01/06/2026
  const dateMatch = text.match(/(?:by|before|within|no later than)\s+[\w\s,\/]+(?:\d{4}|\d+ days?)/i);
  const deadline = dateMatch?.[0]?.replace(/^(?:by|before|within|no later than)\s+/i, '').trim();

  // Sender: "from X" or "Dear X" reversed — look for company/org names
  const senderMatch = text.match(/(?:from|by|signed|regards,?)\s+([A-Z][a-zA-Z &]+(?:Ltd|LLC|PLC|Council|HMRC|Court|Bank|Insurance|Services|Finance|Recoveries|Solutions)?)/);
  const sender = senderMatch?.[1]?.trim();

  // Reference number
  const refMatch = text.match(/(?:ref(?:erence)?(?:\s*no\.?)?|case\s*(?:no\.?)?|account\s*(?:no\.?)?)[:\s#]*([A-Z0-9\-\/]{5,20})/i);
  const ref = refMatch?.[1]?.trim();

  return { amount, deadline, sender, ref };
}

// ─── Build contextual steps ────────────────────────────────────────────────────
function buildSteps(tool, input = '', geo = null) {
  const hint = input.toLowerCase();
  const specifics = extractSpecifics(input);

  // Geo-specific legal terms
  const geoName = geo?.country || geo?.label || null;
  const isScotland = geoName && /scotland/i.test(geoName);
  const isIreland  = geoName && /ireland/i.test(geoName);
  const isWales    = geoName && /wales/i.test(geoName);
  const jurisdictionLabel = isScotland ? 'Scottish law' : isIreland ? 'Irish law' : isWales ? 'Welsh law' : geoName ? `${geoName} law` : null;
  const debtScheme = isScotland ? 'Debt Arrangement Scheme (Scotland)' : isIreland ? 'MABS debt support' : 'debt management options';
  const tenantLaw  = isScotland ? 'Private Housing (Tenancies) (Scotland) Act' : isIreland ? 'Residential Tenancies Act' : 'Housing Act';
  const consumerBody = isScotland ? 'Citizens Advice Scotland' : isIreland ? 'CCPC' : 'Citizens Advice';
  const geoJurisdictionNote = jurisdictionLabel ? `Applying ${jurisdictionLabel}` : 'Laws differ — getting yours exactly right';

  const amountNote  = specifics.amount  ? `Checking the ${specifics.amount} claim`        : null;
  const deadlineNote= specifics.deadline? `Deadline spotted: ${specifics.deadline}`        : null;
  const senderNote  = specifics.sender  ? `Sent by: ${specifics.sender}`                  : null;
  const refNote     = specifics.ref     ? `Reference ${specifics.ref} logged`              : null;

  // Topic detection
  const isDebt       = /debt|bailiff|ccj|county court|arrears|overdue|owe\b|balance due|debt collection|notice of|amount outstanding|final demand|default notice|lowell|cabot|intrum|overdales|pas\b/.test(hint);
  const isEviction   = /evict|section 21|s21|notice to quit|landlord|tenancy|rent\b|deposit|possession|leave the property|housing association|social housing|letting agent/.test(hint);
  const isEmployment = /dismiss|redundan|workplace|employer|\bhr\b|disciplinary|unfair|capability|grievance|termination/.test(hint);
  const isHMRC       = /hmrc|self.?assess|vat\b|national insurance|tax return|underpayment|tax credit|penalty notice/.test(hint);
  const isCouncil    = /council tax|local authority|planning|enforcement notice|parking fine|rates\b|benefit overpayment/.test(hint);
  const isCourt      = /county court|claim form|summons|judgment|hearing|ccj|legal proceedings|court order|solicitor/.test(hint);
  const isInsurance  = /insurance|claim\b|policy|premium|damage|liability|underwriter|settlement/.test(hint);
  const isConsumer   = /refund|faulty|broken|consumer rights|trading standards|chargeback|not as described|repair|replace/.test(hint);
  const isNeighbour  = /neighbour|neighbor|noise complaint|boundary|fence|garden|shared area|anti.?social|land dispute|over land|trespass|right of way|hedge|encroach|overhang|party wall/.test(hint);
  const isParcelScam = /parcel|delivery|royal mail|dpd|evri|fedex|ups|tracking|redelivery fee/.test(hint);
  const isBankScam   = /account.*suspend|verify.*account|bank.*alert|unusual.*activity|barclays|natwest|hsbc|lloyds|santander/.test(hint);
  const isTaxScam    = /tax refund|rebate|owed by hmrc|government.*gateway|tax.*overpayment/.test(hint);
  const isTechScam   = /microsoft|apple support|virus.*detected|tech support|bt internet|broadband.*suspend/.test(hint);
  const isInvestScam = /investment|crypto|bitcoin|returns|profit|trading platform|broker|forex/.test(hint);
  const isRomanceScam= /met online|dating|love you|send money|western union|gift card|itunes|stranded|emergency/.test(hint);

  // ── LETTER TOOL ──────────────────────────────────────────────────────────────
  // Honest steps — we don't guess the document type before the AI has read it.
  // We only surface specifics we can see (amount, deadline, sender) without claiming
  // to know what kind of letter it is. The AI delivers the verdict, not the loader.
  if (tool === 'letter') {
    return [
      { text: 'Reading your letter',                   sub: senderNote || 'Every word — carefully' },
      { text: 'Working out what this actually is',     sub: amountNote || 'Official letter, notice, or something else?' },
      { text: jurisdictionLabel ? `Checking ${jurisdictionLabel}` : 'Checking what law applies', sub: jurisdictionLabel ? `Applying ${jurisdictionLabel}` : 'Your rights, your country' },
      { text: 'Spotting deadlines',                    sub: deadlineNote || 'Dates that actually matter' },
      { text: 'Finding your real options',             sub: amountNote || 'What you can actually do' },
      { text: 'Writing it in plain English',           sub: 'No jargon. No nonsense.' },
    ];
  }

  // ── REPLY TOOL ───────────────────────────────────────────────────────────────
  if (tool === 'reply') {
    if (isDebt) return [
      { text: 'Understanding your debt situation',     sub: 'Reading exactly what you told us' },
      { text: 'Checking what you legally owe',         sub: amountNote || 'Not all claimed debts are valid' },
      { text: 'Finding the right response strategy',   sub: 'Dispute, request proof, or negotiate' },
      { text: 'Drafting your letter',                  sub: senderNote || 'Firm, factual, and hard to ignore' },
      { text: 'Adding the right legal weight',         sub: 'References that make them take you seriously' },
    ];
    if (isEviction) return [
      { text: 'Understanding your situation',          sub: 'Reading what you told us' },
      { text: 'Checking tenancy law',                  sub: 'Your specific rights as a tenant here' },
      { text: 'Finding the strongest response',        sub: 'Challenge the notice if it\'s flawed' },
      { text: 'Drafting your reply',                   sub: senderNote || 'Clear, confident, professional' },
      { text: 'Final review',                          sub: deadlineNote || 'Making sure it lands right' },
    ];
    if (isConsumer) return [
      { text: 'Understanding your complaint',          sub: 'What happened and what you\'re owed' },
      { text: 'Checking consumer law',                 sub: amountNote || 'Consumer Rights Act / local equivalent' },
      { text: 'Building your case',                    sub: 'What you\'re entitled to and why' },
      { text: 'Drafting your letter',                  sub: senderNote || 'Formal, firm, impossible to ignore' },
      { text: 'Final polish',                          sub: 'Clear ask, clear deadline, clear consequences' },
    ];
    if (isEmployment) return [
      { text: 'Understanding your workplace situation',sub: 'Reading exactly what happened' },
      { text: 'Checking your employment rights',       sub: 'Grievance, appeal, or formal complaint?' },
      { text: 'Choosing the right approach',           sub: 'ACAS process protects you if followed' },
      { text: 'Drafting your response',                sub: senderNote || 'Professional, evidenced, effective' },
      { text: 'Final review',                          sub: deadlineNote || 'Timing matters here' },
    ];
    return [
      { text: 'Understanding your situation',          sub: 'Reading what you told us' },
      { text: 'Checking your rights',                  sub: jurisdictionLabel ? `Your rights under ${jurisdictionLabel}` : 'What you\'re entitled to here' },
      { text: 'Choosing the right tone',               sub: 'Firm but fair. Clear and effective.' },
      { text: 'Drafting your letter',                  sub: senderNote || 'Sharp, direct, ready to send' },
      { text: 'Final polish',                          sub: deadlineNote || 'Making sure it lands right' },
    ];
  }

  // ── CONFLICT TOOL ────────────────────────────────────────────────────────────
  if (tool === 'conflict') {
    if (isNeighbour) return [
      { text: 'Reading your neighbour situation',      sub: 'Noise, boundaries, or shared areas?' },
      { text: 'Checking nuisance and property law',    sub: 'What\'s legally actionable here' },
      { text: 'Looking at council powers',             sub: 'Environmental health and mediation routes' },
      { text: 'Building your approach',                sub: 'Firm but neighbourly if possible' },
      { text: 'Mapping escalation routes',             sub: 'If talking doesn\'t work' },
      { text: 'Writing what to say',                   sub: 'Exact words for the conversation' },
    ];
    if (isEmployment) return [
      { text: 'Reading your workplace dispute',        sub: 'What happened and who\'s involved' },
      { text: 'Checking employment rights',            sub: 'Grievance, disciplinary, or both?' },
      { text: 'Looking at correct procedure',          sub: 'ACAS process — following it protects you' },
      { text: 'Building your position',                sub: 'What you can reasonably ask for' },
      { text: 'Drafting your approach',                sub: 'What to say and how to say it' },
      { text: 'Finding free support',                  sub: 'ACAS, Citizens Advice, union help' },
    ];
    if (isEviction) return [
      { text: 'Reading your landlord dispute',         sub: 'Deposit, repairs, or eviction?' },
      { text: 'Checking your tenant rights',           sub: amountNote || 'What your landlord can and can\'t do' },
      { text: 'Looking at housing law',                sub: 'Specific to your jurisdiction' },
      { text: 'Building your position',                sub: 'Evidence, letters, and timelines' },
      { text: 'Finding your leverage',                 sub: 'You have more than you think' },
      { text: 'What to say and do next',               sub: 'Exact steps from here' },
    ];
    return [
      { text: 'Understanding the dispute',             sub: 'Reading your situation carefully' },
      { text: 'Identifying your position',             sub: amountNote || 'What you\'re entitled to here' },
      { text: 'Checking relevant law',                 sub: jurisdictionLabel ? `Applying ${jurisdictionLabel}` : 'What applies in your country' },
      { text: 'Mapping the other side',                sub: 'What they can and can\'t do' },
      { text: 'Building your strategy',                sub: 'Step by step, what to do' },
      { text: 'Finding free help',                     sub: `Real contacts — ${consumerBody}` },
    ];
  }

  // ── SCAM TOOL ────────────────────────────────────────────────────────────────
  if (tool === 'scam') {
    if (isParcelScam) return [
      { text: 'Reading this delivery message',         sub: 'Parcel scams are the #1 fraud right now' },
      { text: 'Checking the sender details',           sub: senderNote || 'Real couriers never charge for redelivery this way' },
      { text: 'Analysing any links',                   sub: 'Does the URL match the real company?' },
      { text: 'Checking for pressure tactics',         sub: 'Urgency and fees are classic red flags' },
      { text: 'Finding how to report it',              sub: 'Specific reporting route for you' },
    ];
    if (isBankScam) return [
      { text: 'Reading this banking message',          sub: senderNote || 'These are designed to panic you' },
      { text: 'Checking sender authenticity',          sub: 'Real banks never text asking for passwords' },
      { text: 'Looking for social engineering',        sub: 'Urgency, fear, access requests — classic signs' },
      { text: 'Assessing what they\'re after',         sub: 'Credentials, money transfer, or account access?' },
      { text: 'Finding how to report it',              sub: 'Your bank\'s fraud line + Action Fraud' },
    ];
    if (isTaxScam) return [
      { text: 'Reading this tax refund message',       sub: senderNote || 'HMRC tax refund scams are extremely common' },
      { text: 'Checking if HMRC contacts this way',    sub: 'Hint: HMRC never texts about refunds' },
      { text: 'Checking sender details',               sub: 'Email address and phone number analysis' },
      { text: 'Assessing the risk',                    sub: amountNote || 'Have you entered any details yet?' },
      { text: 'Finding how to report it',              sub: 'HMRC phishing team + Action Fraud' },
    ];
    if (isTechScam) return [
      { text: 'Reading this tech support message',     sub: senderNote || 'Microsoft/Apple never call you unsolicited' },
      { text: 'Checking the real sender',              sub: 'Pop-ups and calls claiming virus detection' },
      { text: 'Looking for remote access requests',    sub: 'This is what makes tech scams dangerous' },
      { text: 'Assessing what\'s at risk',             sub: 'Your device, your accounts, your money' },
      { text: 'Finding how to report it',              sub: 'Action Fraud + the company being impersonated' },
    ];
    if (isInvestScam) return [
      { text: 'Reading this investment offer',         sub: senderNote || 'Investment scams are the highest-loss fraud' },
      { text: 'Checking FCA registration',             sub: 'Unregistered firms are illegal in the UK' },
      { text: 'Looking for guaranteed return promises',sub: amountNote || 'No legitimate investment guarantees returns' },
      { text: 'Checking pressure and urgency tactics', sub: 'Scarcity and time pressure are engineered' },
      { text: 'Finding how to report it',              sub: 'FCA ScamSmart + Action Fraud' },
    ];
    if (isRomanceScam) return [
      { text: 'Reading this message carefully',        sub: 'Romance scams cause real emotional harm too' },
      { text: 'Checking for engineered connection',    sub: 'Moving fast, very complimentary, can\'t meet' },
      { text: 'Looking at the money request',          sub: amountNote || 'Emergency, gift cards, wire transfer?' },
      { text: 'Assessing the situation honestly',      sub: 'This is hard — but you deserve the truth' },
      { text: 'Finding support and reporting routes',  sub: 'You\'re not alone — help exists' },
    ];
    if (isDebt) return [
      { text: 'Reading this debt collection message',  sub: senderNote || 'Fake debt collectors are very common' },
      { text: 'Verifying if this company is real',     sub: 'FCA register check + Companies House' },
      { text: 'Checking the claimed amount',           sub: amountNote || 'Inflated fees are a major red flag' },
      { text: 'Assessing threat vs reality',           sub: 'Real threat, bluff, or outright scam?' },
      { text: 'Finding who to report this to',         sub: 'FCA, Trading Standards, Action Fraud' },
    ];
    return [
      { text: 'Reading the message',                   sub: senderNote || 'Checking every detail carefully' },
      { text: 'Scanning known scam patterns',          sub: 'Matching against fraud databases' },
      { text: 'Checking sender details',               sub: 'Numbers, links, language red flags' },
      { text: 'Assessing the risk level',              sub: amountNote || 'How serious is this?' },
      { text: 'Finding your reporting routes',         sub: 'Who to tell and exactly how' },
    ];
  }

  return [
    { text: 'Reading your submission',               sub: 'Nothing stored — gone when done' },
    { text: 'Checking the details',                  sub: 'Every word matters' },
    { text: 'Finding what applies',                  sub: 'Your jurisdiction, your rights' },
    { text: 'Building your answer',                  sub: 'Almost there' },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SortedThinkingSteps({ tool = 'letter', accentColor = '#f97316', isActive = false, inputHint = '', geo = null }) {
  const steps = useMemo(() => buildSteps(tool, inputHint, geo), [tool, inputHint, geo]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    setCurrentStep(0);
    setCompletedSteps([]);

    // Organic timing: 2.2s – 3.8s per step, varied so it never feels mechanical
    const durations = steps.map((_, i) => 2200 + (i % 3) * 500 + (i % 2) * 400);

    let stepIndex = 0;
    let cancelled = false;

    const advance = () => {
      if (cancelled || stepIndex >= steps.length - 1) return;
      setCompletedSteps(prev => [...prev, stepIndex]);
      stepIndex++;
      setCurrentStep(stepIndex);
      setTimeout(advance, durations[stepIndex]);
    };

    const t = setTimeout(advance, durations[0]);
    return () => { cancelled = true; clearTimeout(t); };
  }, [isActive, tool, inputHint]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Pulsing brain orb */}
      <div style={{ position: 'relative', width: 50, height: 50, marginBottom: 26 }}>
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.22, 0.08] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: accentColor }} />
        <motion.div animate={{ scale: [1, 1.14, 1], opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: accentColor }} />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1 }}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
            stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
            stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* Steps */}
      <div style={{ width: '100%', maxWidth: 295, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {steps.map((step, i) => {
          const isDone    = completedSteps.includes(i);
          const isCurrent = i === currentStep;
          const isPending = !isDone && !isCurrent;

          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: isPending ? 0.2 : 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}
            >
              {/* Icon */}
              <div style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
                {isDone ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                    style={{ width: 20, height: 20, borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                ) : isCurrent ? (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div animate={{ scale: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: accentColor }} />
                  </div>
                ) : (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(26,18,8,0.1)' }} />
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: 13,
                  fontWeight: isCurrent ? 900 : isDone ? 700 : 400,
                  color: isCurrent ? '#1a1208' : isDone ? accentColor : 'rgba(26,18,8,0.28)',
                  margin: '0 0 2px',
                  transition: 'all 0.25s',
                }}>
                  {step.text}
                </p>
                <AnimatePresence mode="wait">
                  {isCurrent && (
                    <motion.p key="sub-current"
                      initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ fontSize: 11, color: 'rgba(26,18,8,0.42)', margin: 0 }}>
                      {step.sub}
                    </motion.p>
                  )}
                  {isDone && (
                    <motion.p key="sub-done"
                      initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                      style={{ fontSize: 10, color: accentColor, margin: 0, fontWeight: 600 }}>
                      ✓ done
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.25)', marginTop: 24, textAlign: 'center', letterSpacing: '0.06em', fontWeight: 700 }}>
        NOTHING STORED · PROCESSED &amp; GONE
      </p>
    </motion.div>
  );
}