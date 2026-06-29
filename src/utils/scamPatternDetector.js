/**
 * ScamPatternDetector — pure logic, zero AI.
 *
 * Covers every major scam category that targets vulnerable people:
 * older people, broke people, people in debt, lonely people, people
 * who are stressed or mentally unwell.
 *
 * Each category has real-world keywords scammers actually use.
 * The detector also identifies the LIKELY SCAM TYPE so the user
 * immediately knows what they're dealing with.
 *
 * This is the "smart layer" — useful in <1 second, before AI loads.
 * Over time, new scam patterns can be added here as they emerge.
 */

// ── CONTACT EXTRACTION ──────────────────────────────────────────────────────

// UK phone patterns (07xxx mobiles, 0800/0845/0300, +44 variants)
const PHONE_REGEX = /(\+44\s?7\d{3}|\(?0\d{1,4}\)?\s?\d{3,4}\s?\d{3,4})/g;

// URLs — anything that looks like a link
const URL_REGEX = /(https?:\/\/[^\s]+|[a-z0-9-]+\.(?:com|co\.uk|org|net|gov\.uk|io|xyz|info|biz|me|cc|tk|ml|ga|cf)[/\S]*)/gi;

// Email addresses
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

// Sort code (UK bank)
const SORT_CODE_REGEX = /\b\d{2}[-\s]?\d{2}[-\s]?\d{2}\b/g;

// ── SCAM CATEGORIES ──────────────────────────────────────────────────────────
// Each category: keywords + what it means in plain language.
// These are the REAL words scammers use — updated from Action Fraud,
// Which?, Citizens Advice scam reports.

const SCAM_CATEGORIES = {
  // Someone pretends to be from a real organisation
  IMPERSONATION: {
    label: 'Impersonation scam',
    description: 'Someone is pretending to be from a real organisation to steal your trust.',
    keywords: [
      'hmrc', 'tax office', 'dwp', 'department for work', 'national insurance',
      'your bank', 'barclays', 'hsbc', 'natwest', 'lloyds', 'santander',
      'halifax', 'nationwide', 'tsb', 'royal mail', 'parcelforce',
      'nhs', 'gp surgery', 'hospital', 'police', 'hmrc officer',
      'fraud team', 'security team', 'investigation team',
      'amazon', 'apple', 'microsoft', 'google', 'netflix',
      'tv licensing', 'tv license', 'british gas', 'octopus energy',
      'hmrc refund', 'tax rebate', 'tax refund',
    ],
  },

  // "Your parcel is waiting" — the biggest scam in the UK right now
  DELIVERY: {
    label: 'Parcel / delivery scam',
    description: 'A fake "parcel waiting" or "delivery fee" message. Royal Mail, DPD, Evri, Yodel — they never text you for payment.',
    keywords: [
      'parcel', 'package', 'delivery', 'tracking', 'courier',
      'customs charge', 'customs fee', 'import fee', 'package held',
      'delivery fee', 'redelivery', 'parcel waiting', 'package waiting',
      'attempted delivery', 'we missed you', 'card left',
      'royal mail', 'dpd', 'evri', 'yodel', 'hermes', 'parcelforce',
    ],
  },

  // "You've won a prize" — the oldest scam there is
  PRIZE: {
    label: 'Prize / lottery scam',
    description: 'You haven\'t won anything. Real lotteries never ask you to pay a fee to claim a prize.',
    keywords: [
      'you have won', 'you\'ve won', 'congratulations', 'winner',
      'prize', 'lottery', 'sweepstake', 'raffle', 'claim your',
      'your reward', 'selected for', 'you are our', 'bonus prize',
      'cash prize', 'guaranteed winner',
    ],
  },

  // Romance scams — targets lonely people, devastating
  ROMANCE: {
    label: 'Romance scam',
    description: 'Someone is building a fake emotional connection to eventually ask for money. They will never meet you in person.',
    keywords: [
      'i love you', 'my darling', 'my love', 'my dearest',
      'i\'m a widow', 'i\'m a widower', 'my wife died', 'my husband died',
      'i need your help', 'i\'m stuck', 'can you send',
      'i want to meet you', 'come visit me', 'i\'ll visit you',
      'i\'m in the military', 'i\'m deployed', 'overseas',
      'i can\'t access my bank', 'my bank is frozen',
    ],
  },

  // Investment / "guaranteed returns"
  INVESTMENT: {
    label: 'Investment scam',
    description: 'No investment is guaranteed. If someone promises high returns with no risk, it\'s a scam.',
    keywords: [
      'guaranteed return', 'guaranteed profit', 'no risk',
      'too good to miss', 'once in a lifetime', 'opportunity',
      'cryptocurrency', 'bitcoin investment', 'forex', 'trading platform',
      'investment opportunity', 'get rich', 'financial freedom',
      'pension review', 'free pension', 'pension liberation', 'unlock your pension',
    ],
  },

  // "Your computer has a virus" — targets older people
  TECH_SUPPORT: {
    label: 'Tech support scam',
    description: 'Microsoft, Apple, and Google will NEVER call you about a virus. Your computer is not infected.',
    keywords: [
      'virus detected', 'your computer', 'malware', 'spyware',
      'microsoft support', 'apple support', 'windows expired',
      'your licence', 'computer infected', 'hacked',
      'remote access', 'let me fix', 'technical support',
      'error code', 'system warning', 'security alert',
    ],
  },

  // "You\'re owed a refund"
  REFUND: {
    label: 'Refund / rebate scam',
    description: 'Nobody is sending you a refund you didn\'t ask for. They\'ll ask for bank details to "process" it.',
    keywords: [
      'you are owed', 'you\'re owed', 'refund due', 'rebate',
      'overpayment', 'we owe you', 'council tax refund',
      'energy rebate', 'government rebate', 'warm home',
      'cost of living', 'government scheme', 'government grant',
    ],
  },

  // "Your subscription is expiring"
  SUBSCRIPTION: {
    label: 'Subscription scam',
    description: 'Your Amazon Prime, Netflix, or TV license isn\'t actually expiring. They want your card details.',
    keywords: [
      'subscription expiring', 'subscription expired', 'account suspended',
      'prime membership', 'netflix subscription', 'amazon prime',
      'auto-renewal', 'your subscription will', 'renewal required',
    ],
  },

  // "Easy money from home"
  JOB: {
    label: 'Job / work-from-home scam',
    description: 'Real jobs don\'t ask you to pay upfront. "Easy money" is always a scam.',
    keywords: [
      'work from home', 'earn money', 'easy money', 'mystery shopper',
      'data entry', 'envelope stuffing', 'assemble products',
      'pay upfront', 'registration fee', 'training fee',
      'be your own boss', 'financial independence',
    ],
  },

  // "Guaranteed loan, no credit check"
  LOAN: {
    label: 'Loan scam',
    description: 'No real lender guarantees a loan without checking your credit. They want an upfront "fee".',
    keywords: [
      'guaranteed loan', 'no credit check', 'loan approved',
      'pay upfront fee', 'arrangement fee', 'broker fee',
      'instant approval', 'bad credit ok', 'no checks',
    ],
  },

  // "You were in a car accident"
  INSURANCE: {
    label: 'Accident / insurance scam',
    description: 'They claim you were in an accident to get your insurance details. You weren\'t.',
    keywords: [
      'car accident', 'you were in an accident', 'recent accident',
      'whiplash', 'insurance claim', 'compensation claim',
      'road traffic', 'collision',
    ],
  },

  // "It\'s me, I changed my number" — cloned voice / family emergency
  FAMILY_EMERGENCY: {
    label: 'Family emergency scam',
    description: 'Someone pretends to be your child, grandchild, or family member in trouble. Always call them back on a number you already know.',
    keywords: [
      'it\'s me', 'i changed my number', 'new number', 'don\'t tell',
      'don\'t tell mum', 'don\'t tell dad', 'keep this between us',
      'i\'m in trouble', 'i need help', 'i\'ve been arrested',
      'i\'ve been in an accident', 'hospital', 'bail money',
      'emergency', 'please help me', 'can you send money',
    ],
  },

  // "Unpaid parking fine"
  PARKING_FINE: {
    label: 'Parking / fine scam',
    description: 'Fake penalty charge notices. Real councils use official letters, not text messages.',
    keywords: [
      'penalty charge', 'pcn', 'unpaid parking', 'parking fine',
      'parking violation', 'council fine', 'overdue fine',
      'enforcement notice', 'bailiff', 'court fine',
    ],
  },

  // Fake charity requests after disasters
  CHARITY: {
    label: 'Fake charity scam',
    description: 'Fake charities appear after disasters or holidays. Give to registered charities you know.',
    keywords: [
      'donate now', 'urgent appeal', 'disaster relief',
      'help the children', 'help the victims', 'every pound helps',
      'our appeal', 'fundraiser',
    ],
  },
};

// ── PAYMENT INDICATORS ────────────────────────────────────────────────────────

// Gift card / voucher — the #1 scam payment method for older people
const GIFT_CARD_KEYWORDS = [
  'gift card', 'itunes card', 'apple card', 'google play card', 'steam card',
  'amazon card', 'voucher', 'google play voucher', 'app store voucher',
];

// Bank transfer / money requests
const BANK_TRANSFER_KEYWORDS = [
  'bank transfer', 'wire transfer', 'western union', 'moneygram',
  'sort code', 'account number', 'transfer money', 'send money',
  'payment required', 'payment needed', 'pay now', 'pay immediately',
];

// Urgency / threat keywords — the language scammers use to panic people
const URGENCY_KEYWORDS = [
  'urgent', 'immediately', 'final notice', 'final warning', 'last chance',
  'action required', 'account suspended', 'account closed', 'account will be',
  'verify now', 'confirm now', 'within 24 hours', 'within 48 hours',
  'failure to', 'legal action', 'court action', 'bailiff', 'arrest',
  'penalty', 'fine pending', 'overdue', 'deadline',
];

// Legitimate UK domains — if a URL uses these, it's less suspicious
const LEGIT_DOMAINS = [
  'gov.uk', 'nhs.uk', 'hmrc.gov.uk', 'royalmail.com', 'dpd.co.uk',
  'evri.com', 'fedex.com', 'ups.com', 'dhl.com', 'barclays.co.uk',
  'hsbc.co.uk', 'natwest.com', 'lloydsbank.com', 'santander.co.uk',
  'halifax.co.uk', 'nationwide.co.uk', 'tescobank.com',
];

// ── MAIN DETECTION FUNCTION ──────────────────────────────────────────────────

export function detectScamPatterns(text) {
  if (!text || typeof text !== 'string') return null;

  const lowerText = text.toLowerCase();
  const findings = {
    phones: [],
    urls: [],
    emails: [],
    giftCardHits: [],
    bankTransferHits: [],
    sortCodes: [],
    urgencyHits: [],
    paymentHits: [],
    suspiciousUrls: [],
    scamTypes: [], // identified scam categories
    riskScore: 0,
  };

  let match;

  // Extract phone numbers
  while ((match = PHONE_REGEX.exec(text)) !== null) {
    const num = match[1].trim();
    if (!findings.phones.includes(num)) findings.phones.push(num);
  }

  // Extract URLs
  while ((match = URL_REGEX.exec(text)) !== null) {
    const url = match[1].trim().replace(/[.,;:)]$/, '');
    if (!findings.urls.includes(url)) {
      findings.urls.push(url);
      const domain = url.toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
      const isLegit = LEGIT_DOMAINS.some(d => domain === d || domain.endsWith('.' + d));
      if (!isLegit) {
        findings.suspiciousUrls.push(url);
        findings.riskScore += 15;
      }
    }
  }

  // Extract emails
  while ((match = EMAIL_REGEX.exec(text)) !== null) {
    const email = match[0].toLowerCase();
    if (!findings.emails.includes(email)) findings.emails.push(email);
  }

  // Extract sort codes
  while ((match = SORT_CODE_REGEX.exec(text)) !== null) {
    const code = match[0].trim();
    if (/\d{2}[-\s]\d{2}[-\s]\d{2}/.test(code)) {
      findings.sortCodes.push(code);
      findings.riskScore += 20;
    }
  }

  // Check gift card requests
  for (const keyword of GIFT_CARD_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.giftCardHits.push(keyword);
      findings.riskScore += 25;
    }
  }

  // Check bank transfer requests
  for (const keyword of BANK_TRANSFER_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.bankTransferHits.push(keyword);
      findings.riskScore += 15;
    }
  }

  // Check urgency keywords
  for (const keyword of URGENCY_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.urgencyHits.push(keyword);
      findings.riskScore += 5;
    }
  }

  // ── IDENTIFY SCAM TYPES ───────────────────────────────────────────────────
  // Check each category — if keywords match, we know what kind of scam this is.
  for (const [key, category] of Object.entries(SCAM_CATEGORIES)) {
    const hits = category.keywords.filter(kw => lowerText.includes(kw));
    if (hits.length > 0) {
      findings.scamTypes.push({
        key,
        label: category.label,
        description: category.description,
        matchCount: hits.length,
      });
      // More keyword matches = higher confidence this is that scam type
      findings.riskScore += Math.min(hits.length * 8, 25);
    }
  }

  // ── UNKNOWN RISK: suspicious combination without a known type ─────────────
  // If we detect payment + urgency but no specific scam type, flag as unknown.
  const hasPayment = findings.giftCardHits.length > 0 || findings.bankTransferHits.length > 0;
  const hasUrgency = findings.urgencyHits.length > 0;
  const hasContact = findings.phones.length > 0 || findings.suspiciousUrls.length > 0 || findings.emails.length > 0;

  if (hasPayment && hasUrgency && findings.scamTypes.length === 0) {
    findings.scamTypes.push({
      key: 'UNKNOWN',
      label: 'Suspicious payment request',
      description: 'This message asks for money and uses urgency language, but doesn\'t match a known scam type. Be very cautious.',
      matchCount: 0,
    });
  }

  if (hasContact && hasUrgency && findings.scamTypes.length === 0) {
    findings.scamTypes.push({
      key: 'SUSPICIOUS',
      label: 'Suspicious message',
      description: 'This message has contact details and urgency language. If you weren\'t expecting it, treat it as suspicious.',
      matchCount: 0,
    });
  }

  findings.riskScore = Math.min(findings.riskScore, 100);
  findings.hasFindings =
    findings.phones.length > 0 ||
    findings.urls.length > 0 ||
    findings.emails.length > 0 ||
    findings.giftCardHits.length > 0 ||
    findings.bankTransferHits.length > 0 ||
    findings.sortCodes.length > 0 ||
    findings.urgencyHits.length > 0 ||
    findings.scamTypes.length > 0;

  return findings;
}

// ── WARNINGS ─────────────────────────────────────────────────────────────────

export function getPatternWarnings(findings) {
  const warnings = [];
  if (!findings) return warnings;

  // Scam type identification — most useful warning for the user
  if (findings.scamTypes.length > 0) {
    const topType = findings.scamTypes[0];
    warnings.push({
      level: 'danger',
      text: `This looks like: ${topType.label}. ${topType.description}`,
    });
    if (findings.scamTypes.length > 1) {
      warnings.push({
        level: 'warning',
        text: `Also matches: ${findings.scamTypes.slice(1).map(s => s.label).join(', ')}.`,
      });
    }
  }

  if (findings.giftCardHits.length > 0) {
    warnings.push({
      level: 'danger',
      text: `Gift card / voucher requested — NO real organisation, bank, or government body EVER asks for gift cards. This is always a scam.`,
    });
  }
  if (findings.bankTransferHits.length > 0) {
    warnings.push({
      level: 'danger',
      text: `Bank transfer or money payment requested — your bank will never ask you to transfer money to "protect" your account. Hang up and call your bank on the number on your card.`,
    });
  }
  if (findings.sortCodes.length > 0) {
    warnings.push({
      level: 'danger',
      text: `Bank sort code found — never give bank details in response to an unexpected message.`,
    });
  }
  if (findings.suspiciousUrls.length > 0) {
    warnings.push({
      level: 'warning',
      text: `${findings.suspiciousUrls.length} link(s) don't match official organisation domains.`,
    });
  }
  if (findings.urgencyHits.length >= 3) {
    warnings.push({
      level: 'warning',
      text: `Heavy urgency language — scammers use panic to stop you thinking clearly.`,
    });
  }
  if (findings.phones.length > 0 && findings.urgencyHits.length > 0) {
    warnings.push({
      level: 'warning',
      text: `Phone number + urgency language — classic pressure tactic. Don't call numbers from unexpected messages.`,
    });
  }

  return warnings;
}