/**
 * Anonymizes a case for pattern learning
 * Strips: names, emails, amounts, dates, addresses
 * Keeps: structure, advice, legal patterns
 */
export function anonymizeCase(aiResult, tool) {
  if (!aiResult) return null;
  
  let parsed = aiResult;
  if (typeof aiResult === 'string') {
    try { parsed = JSON.parse(aiResult); } catch { return null; }
  }

  // Helper to redact
  const redact = (text) => {
    if (!text) return text;
    return text
      .replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '[EMAIL]')
      .replace(/\b(?:\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{2}[\/\-]\d{2}|\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]?\s\d{4})\b/gi, '[DATE]')
      .replace(/\b(?:(?:\d{1,5}\s)?(?:pounds|pence|dollars|euros|GBP|USD|EUR|£|\$|€)[\s\w]*?(?:\d+(?:\.\d{2})?|[\d,]+)(?:[Kk]?)?)\b/g, '[AMOUNT]')
      .replace(/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2}\b/g, (match) => {
        // Keep common words, redact likely names
        const common = ['Council', 'Court', 'HMRC', 'NHS', 'DWP', 'Police', 'Bank', 'Company', 'Services', 'Authority', 'Office'];
        return common.some(c => match.includes(c)) ? match : '[NAME]';
      })
      .replace(/\b\d{2,6}\s[A-Z][a-z\s]+(?:Road|Street|Lane|Avenue|Close|Drive|Court|Square|Gate|Hill|Park|Place|Row)\b/g, '[ADDRESS]')
      .replace(/\b(?:\d{1,5}\s)?[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s(?:Road|Street|Lane|Avenue|Close|Drive|Court|Square)\b/g, '[ADDRESS]');
  };

  // Build anonymized summary based on tool
  const summary = {
    tool,
    letter_type: parsed.letter_summary ? parsed.letter_summary.replace(/[A-Za-z\d\.\-]+@[\w\.-]+\.\w+|[\w\.-]+/g, (m) => m.includes('@') ? '[EMAIL]' : m.replace(/\b[A-Z][a-z]+\b/g, '[X]')) : null,
    severity: parsed.severity || 'unknown',
    has_deadline: !!parsed.key_deadline && parsed.key_deadline !== 'No deadline mentioned',
    financial_impact: parsed.financial_impact && !parsed.financial_impact.includes('No specific') ? 'YES' : 'NO',
    action_steps_count: parsed.action_steps?.length || 0,
    key_patterns: {
      main_issue: redact(parsed.what_this_means?.substring(0, 100) || ''),
      primary_action: parsed.action_steps?.[0] ? redact(parsed.action_steps[0].substring(0, 80)) : null,
    },
  };

  return JSON.stringify(summary);
}