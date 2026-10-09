// Climate platform spam filter — Janine's "spam filter: additional oversight"
// Basic checks for common spam patterns. The main filter is the draft→review→publish workflow.

const SPAM_KEYWORDS = [
  'viagra', 'casino', 'crypto', 'bitcoin', 'lottery', 'winner', 'congratulations',
  'click here to', 'buy now', 'free money', 'make money fast', 'work from home',
  'weight loss pill', 'diet pill', 'investment opportunity', 'double your',
  'limited time offer', 'act now', 'urgent reply',
];

export function checkClimateSpam(content) {
  if (!content || typeof content !== 'string') return { flagged: false, reasons: [] };
  const lower = content.toLowerCase();
  const reasons = [];

  // Too many URLs
  const urlCount = (content.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) reasons.push('too many links');

  // Spam keywords
  for (const kw of SPAM_KEYWORDS) {
    if (lower.includes(kw)) { reasons.push(`spam keyword detected`); break; }
  }

  // Very short content
  if (content.trim().length < 10) reasons.push('too short');

  // Repetitive characters (e.g. "aaaaaaaaaaa")
  if (/(.)\1{10,}/.test(content)) reasons.push('repetitive characters');

  // All caps (shouting)
  const letters = content.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 20 && letters === letters.toUpperCase()) reasons.push('all caps');

  return { flagged: reasons.length > 0, reasons };
}