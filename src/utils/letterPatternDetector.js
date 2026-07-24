/**
 * LetterPatternDetector — pure logic, zero AI.
 *
 * Instantly identifies what TYPE of letter someone has pasted, extracts
 * deadlines and amounts, and flags urgency — all in <1 second, before
 * the AI analysis loads.
 *
 * This is the "smart layer" for the Letter Decoder, matching the pattern
 * from scamPatternDetector.js. The AI is still the authoritative analyser;
 * this just gives immediate reassurance and context to stressed users.
 *
 * Keyword detection is English-first. For non-English letters, the AI
 * layer (InvokeLLM) handles all 30+ languages natively.
 */

// ── EXTRACTION PATTERNS ──────────────────────────────────────────────────────

// UK money amounts — £1,247 or £1,247.00 or £130
const MONEY_REGEX = /£\s?[\d,]+(?:\.\d{2})?/g;

// "within 7 days" / "within 14 days" / "within 2 months"
const WITHIN_DAYS_REGEX = /within\s+(\d+)\s*(days?|weeks?|months?|hours?)/gi;

// "by 15th January" / "by 15 January 2026" / "by 15/01/2026"
const BY_DATE_REGEX = /\bby\s+(\d{1,2}(?:st|nd|rd|th)?\s+\w+(?:\s+\d{4})?|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2})/gi;

// "on or before [date]"
const ON_OR_BEFORE_REGEX = /on or before\s+(\d{1,2}(?:st|nd|rd|th)?\s+\w+(?:\s+\d{4})?|\d{1,2}\/\d{1,2}\/\d{2,4})/gi;

// "pay within" / "respond within"
const DEADLINE_VERB_REGEX = /(pay|respond|reply|contact|settle|clear|rectify)\s+within\s+(\d+)\s*(days?|weeks?|months?)/gi;

// ── LETTER CATEGORIES ────────────────────────────────────────────────────────
// Real keywords from the most common scary letters vulnerable people receive.

const LETTER_CATEGORIES = {
  DEBT_COLLECTION: {
    label: 'Debt collection letter',
    description: 'A debt collector or agency is chasing you for money. You have rights — they cannot threaten you or turn up without warning.',
    calmNote: 'You will not go to prison for debt. Most debts can be negotiated — contact them before it escalates.',
    keywords: [
      'debt collector', 'debt collection', 'arrears', 'outstanding balance',
      'final notice', 'final reminder', 'final opportunity',
      'lowell', 'm debt', 'capquest', 'mortimer clarke', 'overdales',
      'bw legal', 'ccs collection', 'fredrickson international',
      'robalas', 'newlyn', 'rossendales', 'collect', 'payplan',
      'account in arrears', 'balance outstanding', 'amount owed',
      'instructed to collect', 'recovery action', 'pre-action',
    ],
  },

  COURT_SUMMONS: {
    label: 'Court letter / summons',
    description: 'This is about a court hearing or legal claim. Do not ignore it — you can usually respond or get free help.',
    calmNote: 'A court letter is not a conviction. You have the right to respond. Free help is available — do not pay for advice yet.',
    keywords: [
      'court', 'summons', 'hearing', 'claim form', 'claimant', 'defendant',
      'ccj', 'county court judgment', 'default judgment', 'judgment',
      'magistrates', 'tribunal', 'n1', 'n9', 'directions questionnaire',
      'allocation', 'listing', 'case reference', 'case number',
      'statement of truth', 'particulars of claim',
    ],
  },

  BAILIFF_ENFORCEMENT: {
    label: 'Bailiff / enforcement letter',
    description: 'A bailiff or enforcement agent says they will visit. They have strict rules — they cannot force entry for most debts.',
    calmNote: 'Bailiffs cannot force entry to your home for most debts (council tax, credit debts). Keep your door locked. Do not let them in.',
    keywords: [
      'bailiff', 'enforcement agent', 'enforcement', 'warrant',
      'distress', 'walking possession', 'remove goods', 'visit your home',
      'visit your property', 'attend your premises', 'goods control',
      'certificated bailiff', 'high court enforcement', 'hceo',
      'notice of enforcement', 'enforcement notice',
    ],
  },

  EVICTION_HOUSING: {
    label: 'Eviction / housing letter',
    description: 'Your landlord wants you to leave. You have rights — you cannot be evicted without a court order.',
    calmNote: 'Your landlord cannot just change the locks. Only a court bailiff can evict you. Seek free housing advice immediately.',
    keywords: [
      'section 21', 'section 8', 'notice to quit', 'notice seeking possession',
      'possession order', 'eviction', 'vacate the property', 'leave the property',
      'possession proceedings', 'warrant of possession', 'bailiff eviction',
      'no fault eviction', 'section 21 notice', 'section 8 notice',
    ],
  },

  COUNCIL_TAX: {
    label: 'Council tax letter',
    description: 'The council is chasing council tax. They can use bailiffs but you can negotiate a payment plan.',
    calmNote: 'Council tax arrears are a priority debt but you will not go to prison for them. Contact the council — they prefer payment plans.',
    keywords: [
      'council tax', 'liability order', 'council tax arrears',
      'local authority', 'magistrates court', 'commitment to prison',
      'council tax summons', 'council tax liability',
    ],
  },

  ENERGY_UTILITY: {
    label: 'Energy / utility bill',
    description: 'Your energy supplier is threatening disconnection. They must follow rules and offer payment plans first.',
    calmNote: 'Energy suppliers cannot just disconnect you. They must offer a payment plan and alternatives first. Call them today.',
    keywords: [
      'energy supply', 'disconnection', 'disconnect', 'gas supply',
      'electricity supply', 'prepayment meter', 'arrears',
      'energy bill', 'utility bill', 'your supply will be',
      ' british gas', 'octopus', 'eon', 'edf', 'scottish power', 'ovo',
    ],
  },

  PARKING_FINE: {
    label: 'Parking fine / PCN',
    description: 'A penalty charge notice for parking. Usually reduced if you pay early, but you can appeal.',
    calmNote: 'You can appeal a parking fine. If you pay within 14 days the amount is usually halved. Do not panic.',
    keywords: [
      'penalty charge', 'pcn', 'parking fine', 'contravention',
      'parked without', 'parking violation', 'excess charge',
      'traffic management', 'civil enforcement',
    ],
  },

  BENEFITS_DWP: {
    label: 'Benefits / DWP letter',
    description: 'The DWP is writing about your benefits — could be an overpayment, review, or decision.',
    calmNote: 'You can challenge a DWP decision (called mandatory reconsideration). Get free help from Citizens Advice.',
    keywords: [
      'dwp', 'department for work', 'universal credit', 'benefit',
      'overpayment', 'esa', 'pip', 'personal independence',
      'employment support', 'jobcentre', 'mandatory reconsideration',
      'benefit decision', 'benefit decision letter', 'sanction',
    ],
  },

  HMRC_TAX: {
    label: 'HMRC / tax letter',
    description: 'HMRC is writing about tax — could be self assessment, underpayment, or a refund check.',
    calmNote: 'HMRC will never ask you to pay via gift card or threatening phone call. If it is a real letter, you can call them back on the official number.',
    keywords: [
      'hmrc', 'tax return', 'self assessment', 'self-assessment',
      'tax owed', 'underpayment', 'tax year', 'sa302',
      'national insurance', 'paye', 'tax code', 'corporation tax',
    ],
  },

  RENT_ARREARS: {
    label: 'Rent arrears letter',
    description: 'Your landlord or agent says you owe rent. Talk to them — most will agree a plan rather than evict.',
    calmNote: 'Rent arrears are a priority debt. Talk to your landlord or agent — most prefer a payment plan over eviction.',
    keywords: [
      'rent arrears', 'rent outstanding', 'rent owed', 'rent due',
      'tenancy', 'landlord', 'letting agent', 'managing agent',
      'rent payment', 'outstanding rent',
    ],
  },

  IMMIGRATION: {
    label: 'Immigration / Home Office letter',
    description: 'The Home Office is writing about your immigration status. Do not ignore — get specialist free help.',
    calmNote: 'Immigration letters have strict deadlines. Get free specialist advice immediately — do not pay for help until you have checked.',
    keywords: [
      'home office', 'immigration', 'visa', 'leave to remain',
      'indefinite leave', 'british citizenship', 'naturalisation',
      'deportation', 'removal', 'asylum', 'brp', 'biometric residence',
    ],
  },

  MEDICAL_NHS: {
    label: 'NHS / medical letter',
    description: 'A hospital or GP letter — appointment, referral, or results.',
    calmNote: 'If this is an appointment, call them if you cannot attend. If it is about charges, you may be exempt — check.',
    keywords: [
      'nhs', 'hospital', 'appointment', 'referral', 'outpatient',
      'gp surgery', 'consultant', 'clinic', 'department of',
      'medical records', 'waiting list',
    ],
  },
};

// ── URGENCY INDICATORS ────────────────────────────────────────────────────────

const URGENCY_HIGH = [
  'final notice', 'final warning', 'final reminder', 'final opportunity',
  'court action', 'legal action', 'bailiff', 'eviction',
  'disconnection', 'warrant', 'summons', 'enforcement',
  'within 7 days', 'within 24 hours', 'within 48 hours',
  'immediately', 'urgent', 'before court',
];

const URGENCY_MEDIUM = [
  'within 14 days', 'within 21 days', 'within 28 days',
  'within 30 days', 'within one month', 'by',
  'response required', 'action required', 'please contact',
  'reminder', 'second notice', 'overdue',
];

// ── MAIN DETECTION FUNCTION ──────────────────────────────────────────────────

export function detectLetterPatterns(text) {
  if (!text || typeof text !== 'string') return null;

  const lowerText = text.toLowerCase();
  const findings = {
    letterTypes: [],
    amounts: [],
    deadlines: [],
    urgencyLevel: 'unknown',
    urgencyHits: [],
    hasFindings: false,
  };

  let match;

  // Extract money amounts
  while ((match = MONEY_REGEX.exec(text)) !== null) {
    const amount = match[0].trim();
    if (!findings.amounts.includes(amount)) findings.amounts.push(amount);
  }

  // Extract "within X days/weeks/months" deadlines
  while ((match = WITHIN_DAYS_REGEX.exec(text)) !== null) {
    const deadline = match[0].trim();
    if (!findings.deadlines.includes(deadline)) {
      findings.deadlines.push(deadline);
    }
  }

  // Extract "by [date]" deadlines
  while ((match = BY_DATE_REGEX.exec(text)) !== null) {
    const deadline = match[0].trim();
    if (!findings.deadlines.includes(deadline)) {
      findings.deadlines.push(deadline);
    }
  }

  // Extract "on or before [date]"
  while ((match = ON_OR_BEFORE_REGEX.exec(text)) !== null) {
    const deadline = match[0].trim();
    if (!findings.deadlines.includes(deadline)) {
      findings.deadlines.push(deadline);
    }
  }

  // Identify letter types
  for (const [key, category] of Object.entries(LETTER_CATEGORIES)) {
    const hits = category.keywords.filter(kw => lowerText.includes(kw));
    if (hits.length > 0) {
      findings.letterTypes.push({
        key,
        label: category.label,
        description: category.description,
        calmNote: category.calmNote,
        matchCount: hits.length,
      });
    }
  }

  // Determine urgency level
  const highHits = URGENCY_HIGH.filter(kw => lowerText.includes(kw));
  const mediumHits = URGENCY_MEDIUM.filter(kw => lowerText.includes(kw));

  if (highHits.length > 0) {
    findings.urgencyLevel = 'urgent';
    findings.urgencyHits = [...highHits, ...mediumHits];
  } else if (mediumHits.length > 0) {
    findings.urgencyLevel = 'attention';
    findings.urgencyHits = mediumHits;
  } else if (findings.deadlines.length > 0) {
    findings.urgencyLevel = 'attention';
  }

  findings.hasFindings =
    findings.letterTypes.length > 0 ||
    findings.amounts.length > 0 ||
    findings.deadlines.length > 0 ||
    findings.urgencyHits.length > 0;

  return findings;
}

// ── WARNINGS / REASSURANCE ───────────────────────────────────────────────────

export function getLetterWarnings(findings) {
  const warnings = [];
  if (!findings) return warnings;

  // Deadline alert
  if (findings.deadlines.length > 0) {
    warnings.push({
      level: 'info',
      text: `Deadline detected: ${findings.deadlines.join(' · ')}. Don't ignore this — a deadline means you need to act.`,
    });
  }

  // Amount involved
  if (findings.amounts.length > 0) {
    warnings.push({
      level: 'info',
      text: `Amount mentioned: ${findings.amounts.join(' · ')}. If you can't pay in full, most creditors will accept a payment plan.`,
    });
  }

  // Urgency language
  if (findings.urgencyLevel === 'urgent') {
    warnings.push({
      level: 'danger',
      text: `This letter uses urgent language. That doesn't mean you're out of time — it means act soon. You have options.`,
    });
  }

  return warnings;
}