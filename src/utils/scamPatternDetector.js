/**
 * ScamPatternDetector — pure logic, zero AI.
 *
 * Runs instantly on pasted text. Extracts phone numbers, URLs, email
 * addresses, payment requests (gift cards, crypto, bank details), and
 * urgency/threat language — all things that can be detected with regex
 * and keyword matching, no LLM needed.
 *
 * This is the "smart layer" that makes the Scam Checker useful BEFORE
 * the AI even runs, and gives the AI result something to build on.
 */

// UK phone patterns (07xxx mobiles, 0800/0845/0300, +44 variants)
const PHONE_REGEX = /(\+44\s?7\d{3}|\(?0\d{1,4}\)?\s?\d{3,4}\s?\d{3,4})/g;

// URLs — anything that looks like a link
const URL_REGEX = /(https?:\/\/[^\s]+|[a-z0-9-]+\.(?:com|co\.uk|org|net|gov\.uk|io|xyz|info|biz|me|cc|tk|ml|ga|cf)[/\S]*)/gi;

// Email addresses
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

// Sort code (UK bank)
const SORT_CODE_REGEX = /\b\d{2}[-\s]?\d{2}[-\s]?\d{2}\b/g;

// Gift card / voucher request keywords — the #1 scam targeting older & vulnerable people
const GIFT_CARD_KEYWORDS = [
  'gift card', 'itunes card', 'apple card', 'google play card', 'steam card',
  'amazon card', 'voucher', 'google play voucher', 'app store voucher',
];

// Bank transfer / money request keywords
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

// Payment / info request keywords
const PAYMENT_KEYWORDS = [
  'gift card', 'itunes card', 'apple card', 'google play card', 'steam card',
  'wire transfer', 'western union', 'moneygram', 'bitcoin', 'crypto',
  'bank transfer', 'sort code', 'account number', 'pin code',
  'password', 'mother\'s maiden name', 'national insurance',
  'passport', 'driving licence', 'card details', 'cvv', 'cvc',
];

// Legitimate UK domains — if a URL uses these, it's less suspicious
const LEGIT_DOMAINS = [
  'gov.uk', 'nhs.uk', 'hmrc.gov.uk', 'royalmail.com', 'dpd.co.uk',
  'evri.com', 'fedex.com', 'ups.com', 'dhl.com', 'barclays.co.uk',
  'hsbc.co.uk', 'natwest.com', 'lloydsbank.com', 'santander.co.uk',
  'halifax.co.uk', 'nationwide.co.uk', 'tescobank.com',
];

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
    riskScore: 0,
  };

  // Extract phone numbers
  let match;
  while ((match = PHONE_REGEX.exec(text)) !== null) {
    const num = match[1].trim();
    if (!findings.phones.includes(num)) findings.phones.push(num);
  }

  // Extract URLs
  while ((match = URL_REGEX.exec(text)) !== null) {
    const url = match[1].trim().replace(/[.,;:)]$/, '');
    if (!findings.urls.includes(url)) {
      findings.urls.push(url);
      // Check if it's suspicious (doesn't match a legit domain)
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

  // Check gift card / voucher requests
  for (const keyword of GIFT_CARD_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.giftCardHits.push(keyword);
      findings.riskScore += 25;
    }
  }

  // Check bank transfer / money requests
  for (const keyword of BANK_TRANSFER_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.bankTransferHits.push(keyword);
      findings.riskScore += 15;
    }
  }

  // Extract sort codes
  while ((match = SORT_CODE_REGEX.exec(text)) !== null) {
    const code = match[0].trim();
    // Avoid false positives — sort codes are usually 6 digits in xx-xx-xx format
    if (/\d{2}[-\s]\d{2}[-\s]\d{2}/.test(code)) {
      findings.sortCodes.push(code);
      findings.riskScore += 20;
    }
  }

  // Check urgency keywords
  for (const keyword of URGENCY_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.urgencyHits.push(keyword);
      findings.riskScore += 5;
    }
  }

  // Check payment keywords
  for (const keyword of PAYMENT_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      findings.paymentHits.push(keyword);
      findings.riskScore += 10;
    }
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
    findings.paymentHits.length > 0;

  return findings;
}

// Map detected patterns to human-readable warnings
export function getPatternWarnings(findings) {
  const warnings = [];
  if (!findings) return warnings;

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
  if (findings.paymentHits.length > 0) {
    const unique = [...new Set(findings.paymentHits)];
    warnings.push({
      level: 'danger',
      text: `Asks for: ${unique.join(', ')} — legitimate organisations don't request these via text or email.`,
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