/**
 * REDACT IDENTITY — NOT SUBSTANCE
 * ─────────────────────────────────────────────────────────────
 * Philosophy (BRO51 + Brian, 23 July 2026, ~01:30am):
 *
 * Two kinds of hiding exist, and they are opposites:
 *   1. Hiding WHO someone is  → protecting a vulnerable person.  ✓ DO THIS.
 *   2. Hiding WHAT happened   → covering up for the powerful.    ✗ NEVER THIS.
 *
 * This module strips IDENTITY only:
 *   - Person names (not institution names: Council, Court, HMRC, NHS, DWP, Bank…)
 *   - Email addresses, phone numbers, National Insurance numbers, NHS numbers
 *   - Account/reference numbers, home addresses, postcodes, dates of birth
 *
 * It PRESERVES SUBSTANCE — everything the AI needs to actually help:
 *   - The demand, the threat, the deadline, the amount owed
 *   - The institution's behaviour, the legal situation, event dates
 *   - Dates of deadlines (kept — they're substance, not identity)
 *   - Money amounts (kept — they're the crux, not a name)
 *
 * The AI sees the full legal picture but cannot point it back to a human.
 * That is protection, not cover-up. The Epstein line, held firm.
 *
 * Honest limits (do not over-promise):
 *   - Regex-based. Catches standard UK formats reliably.
 *   - May miss: a child's name buried mid-sentence, unusual ID formats,
 *     unique phrasing identifiable without a name. This is a STRONG first
 *     layer, not a guarantee. The privacy statement must say so honestly.
 *   - Returns a reattachment map so Step 3 (browser re-attaches real
 *     identity for replies) can work later without re-typing.
 */

// Institution / organisation words — KEEP these (they're substance, not identity)
const KEEP_WORDS = new Set([
  'Council', 'Court', 'Tribunal', 'HMRC', 'NHS', 'DWP', 'DWP ', 'Police', 'Bank',
  'NatWest', 'Barclays', 'Lloyds', 'Santander', 'HSBC', 'Halifax', 'RBS',
  'Company', 'Companies', 'Services', 'Authority', 'Office', 'Department',
  'Agency', 'Ministry', 'Government', 'United', 'Kingdom', 'Scotland',
  'England', 'Wales', 'Ireland', 'British', 'Scottish', 'Lord', 'Lady',
  'Sheriff', 'Magistrate', 'Judge', 'Officer', 'Manager', 'Director',
  'Claimant', 'Defendant', 'Applicant', 'Respondent', 'Tenant', 'Landlord',
  'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Sir', 'Madam',
]);

/**
 * Redact identity from text, preserving substance.
 * @param {string} text - the original letter/message
 * @returns {{ redacted: string, map: Record<string,string> }}
 *   redacted — safe to send to AI (identity stripped, substance intact)
 *   map      — placeholder → original, kept in browser ONLY for reattaching later
 */
export function redactIdentity(text) {
  if (!text || typeof text !== 'string') return { redacted: text || '', map: {} };

  let redacted = text;
  const map = {};
  let counter = 0;

  // Helper: register a redaction and return the placeholder
  const placeholder = (original, prefix = 'P') => {
    counter += 1;
    const tag = `[${prefix}${counter}]`;
    map[tag] = original;
    return tag;
  };

  // ── 1. EMAIL ADDRESSES ────────────────────────────────────────────
  redacted = redacted.replace(/[\w.+-]+@[\w.-]+\.\w{2,}/g, (m) => placeholder(m, 'EMAIL'));

  // ── 2. UK PHONE NUMBERS (landline + mobile) ───────────────────────
  redacted = redacted.replace(
    /\b(?:\+44\s?7\d{3}|\(?0\d{2,4}\)?\s?\d{3,4}\s?\d{3,4})\b/g,
    (m) => placeholder(m, 'PHONE')
  );

  // ── 3. NATIONAL INSURANCE NUMBER (UK) ─────────────────────────────
  // Format: 2 letters, 6 digits, 1 letter — e.g. AB 12 34 56 C
  redacted = redacted.replace(
    /\b[A-CEGHJ-PR-TW-Z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-DFM]/g,
    (m) => placeholder(m, 'NINO')
  );

  // ── 4. NHS NUMBER (10 digits, UK) ─────────────────────────────────
  redacted = redacted.replace(/\b\d{3}\s?\d{3}\s?\d{4}\b/g, (m) => {
    // Only redact if it looks like an NHS number (10 digits), not a money amount
    if (/^\d{10}$/.test(m.replace(/\s/g, ''))) return placeholder(m, 'NHS');
    return m;
  });

  // ── 5. ACCOUNT / REFERENCE NUMBERS ───────────────────────────────
  // "Account No: 12345678", "Ref: ABC123456", "A/C 12345678"
  redacted = redacted.replace(
    /\b(?:account|acct|a\/c|ref|reference|case|claim|policy|customer)\s*(?:no\.?|number|#|:)?\s*([A-Z0-9]{6,12})\b/gi,
    (m, num) => m.replace(num, placeholder(num, 'REF'))
  );
  // Bare 8-digit account numbers after a colon
  redacted = redacted.replace(/[:#]\s*(\d{8})\b/g, (m, num) => m.replace(num, placeholder(num, 'ACCT')));

  // ── 6. UK POSTCODES ───────────────────────────────────────────────
  redacted = redacted.replace(
    /\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/g,
    (m) => placeholder(m, 'POSTCODE')
  );

  // ── 7. UK ADDRESSES (number + street name) ───────────────────────
  // "12 Main Street", "144 Oxford Road" — redact the number+street, keep the town
  redacted = redacted.replace(
    /\b\d{1,5}[A-Z]?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s+(?:Road|Street|Lane|Avenue|Close|Drive|Court|Square|Gate|Hill|Park|Place|Row|Crescent|Terrace|Way|Mews|Gardens)\b/g,
    (m) => placeholder(m, 'ADDRESS')
  );

  // ── 8. DATES OF BIRTH (keep deadline dates — those are substance) ─
  // "DOB: 12/03/1975", "Date of Birth: 12 March 1975", "born 12/03/75"
  redacted = redacted.replace(
    /\b(?:dob|date of birth|born)\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}|\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{4})\b/gi,
    (m) => placeholder(m, 'DOB')
  );

  // ── 9. PERSON NAMES (Title + Capitalised) — but KEEP institutions ─
  // "Mr Brian Hughes" → [NAME], "Mrs Smith" → [NAME]
  // Only redact when preceded by a title (safer than guessing all Capitalised pairs)
  redacted = redacted.replace(
    /\b(?:Mr|Mrs|Ms|Miss|Dr|Sir|Madam)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\b/g,
    (m) => placeholder(m, 'NAME')
  );

  // ── 10. STANDALONE PERSON NAMES — DISABLED (honest limitation) ─────
  // We do NOT guess two-capitalised-words as names. Regex cannot reliably tell
  // "Brian Hughes" (a name) from "Account No" / "Dear Sir" / "NatWest Bank"
  // (not names). A false positive here strips SUBSTANCE, which we never do.
  // Names are caught reliably when preceded by a title (Mr/Mrs/Ms/Dr/Sir…).
  // Honest limit: a bare name mid-sentence without a title is NOT redacted.
  // This is the safer failure — we'd rather miss a name than hide substance.

  return { redacted, map };
}

/**
 * Re-attach original identity back into AI-generated text (Step 3 — future use).
 * Used in the BROWSER ONLY when generating a reply, so the user's real name,
 * address, etc. are filled back in locally without re-typing.
 *
 * @param {string} aiText — AI output containing placeholders like [NAME1]
 * @param {Record<string,string>} map — the map returned by redactIdentity
 * @returns {string} — text with real identity re-inserted
 */
export function reattachIdentity(aiText, map) {
  if (!aiText || !map) return aiText;
  let result = aiText;
  // Replace longest placeholders first to avoid partial matches
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    result = result.split(key).join(map[key]);
  }
  return result;
}

/**
 * Quick self-test — run in console to verify behaviour.
 * Kept here so the philosophy is documented and checkable.
 */
export function selfTest() {
  const sample = `Dear Mr Brian Hughes,
Re: Account No 12345678, Ref ABC123456.
You owe £2,400 by 12 August 2026 to NatWest Bank.
Please contact us on 0141 555 1234 or brian.hughes@example.com.
Your NI number is AB 12 34 56 C. NHS: 485 777 3456.
Visit us at 144 Oxford Road, Glasgow G12 9QQ.
Born 12/03/1975. Yours sincerely, Mrs Smith.`;

  const { redacted, map } = redactIdentity(sample);
  // Identity should be gone
  const leaks = redacted.match(/Brian|Hughes|brian\.hughes@example|0141 555|AB 12 34|485 777|144 Oxford|G12 9QQ|12\/03\/1975|Mrs Smith|12345678|ABC123456/i);
  // Substance should remain
  const keeps = redacted.match(/£2,400|12 August 2026|NatWest|owe/i);
  return {
    identity_leaked: leaks ? `FAIL — leaked: ${leaks.join(', ')}` : 'PASS — no identity leaked',
    substance_kept: keeps ? 'PASS — substance preserved' : 'FAIL — substance was stripped',
    redacted,
    map,
  };
}