// SORTED Silent Learning - Local + Anonymous Pattern Sharing
// Privacy-first: personal data stays local, only anonymized patterns shared

const STORAGE_KEY = 'sorted_learning_v1';
const PATTERN_SHARE_KEY = 'sorted_pattern_share_enabled';

// Get user's learning data (stays on device)
export function getSortedLearning() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { corrections: [], outcomes: [], patterns: [] };
  } catch {
    return { corrections: [], outcomes: [], patterns: [] };
  }
}

// Save correction locally (never sent to server)
export function saveCorrection(inputHash, originalAdvice, userCorrection, tool) {
  const learning = getSortedLearning();
  learning.corrections.push({
    inputHash, // anonymized hash of what they uploaded
    originalAdvice,
    userCorrection,
    tool,
    timestamp: Date.now(),
  });
  // Keep last 50 corrections max
  if (learning.corrections.length > 50) learning.corrections = learning.corrections.slice(-50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(learning));
}

// Save outcome (did the advice work?)
export function saveOutcome(inputHash, worked, notes = '') {
  const learning = getSortedLearning();
  learning.outcomes.push({
    inputHash,
    worked,
    notes,
    timestamp: Date.now(),
  });
  if (learning.outcomes.length > 50) learning.outcomes = learning.outcomes.slice(-50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(learning));
}

// Check if user enabled anonymous pattern sharing
export function isPatternSharingEnabled() {
  return localStorage.getItem(PATTERN_SHARE_KEY) === 'true';
}

// Toggle pattern sharing
export function togglePatternSharing(enabled) {
  localStorage.setItem(PATTERN_SHARE_KEY, enabled ? 'true' : 'false');
}

// Extract anonymized pattern from letter (for sharing if enabled)
export function extractPattern(result, inputText) {
  // Hash the input (simple, not crypto - just for anonymity)
  const hash = inputText.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  
  return {
    patternHash: hash.toString(),
    letterType: detectLetterType(result),
    severity: result.severity,
    scamIndicators: extractScamIndicators(result),
    senderPattern: extractSenderPattern(result),
    outcome: 'unknown', // user can update later
    timestamp: Date.now(),
    country: new Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1] || 'GB',
  };
}

function detectLetterType(result) {
  const summary = (result.letter_summary || '').toLowerCase();
  if (summary.includes('council tax')) return 'council_tax';
  if (summary.includes('parking')) return 'parking_fine';
  if (summary.includes('debt')) return 'debt_collector';
  if (summary.includes('energy') || summary.includes('gas') || summary.includes('electric')) return 'energy_bill';
  if (summary.includes('rent') || summary.includes('eviction')) return 'rent_landlord';
  return 'other';
}

function extractScamIndicators(result) {
  const indicators = [];
  const steps = (result.three_steps || []).join(' ').toLowerCase();
  const summary = (result.letter_summary || '').toLowerCase();
  
  if (steps.includes('dispute') || steps.includes('prove you owe')) indicators.push('disputed_debt');
  if (steps.includes('private company')) indicators.push('private_parking');
  if (steps.includes('bailiff') || steps.includes('enforcement')) indicators.push('bailiff_threat');
  if (summary.includes('final notice') || summary.includes('urgent')) indicators.push('urgency_pressure');
  
  return indicators;
}

function extractSenderPattern(result) {
  // Extract sender name/company if present (anonymized)
  const summary = result.letter_summary || '';
  const matches = summary.match(/from ([A-Za-z0-9\s&,.]+)/i);
  if (matches && matches[1]) {
    return {
      nameHash: matches[1].split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0).toString(),
      type: matches[1].includes('Council') ? 'council' : matches[1].includes('Limited') || matches[1].includes('Ltd') ? 'company' : 'other',
    };
  }
  return null;
}

// Get relevant corrections for current letter type
export function getRelevantCorrections(currentLetterType) {
  const learning = getSortedLearning();
  return learning.corrections.filter(c => {
    // Match by tool or letter type mentioned in correction
    const matches = c.userCorrection.toLowerCase().includes(currentLetterType.toLowerCase());
    return matches && c.timestamp > Date.now() - (30 * 24 * 60 * 60 * 1000); // last 30 days
  }).slice(-5); // last 5 relevant corrections
}

// Build learning context for prompt
export function buildLearningContext(currentLetterType) {
  const corrections = getRelevantCorrections(currentLetterType);
  if (corrections.length === 0) return '';
  
  const context = corrections.map(c => {
    return `User previously corrected similar ${currentLetterType} advice to: "${c.userCorrection}"`;
  }).join('\n');
  
  return `\n\nLEARNING FROM YOUR PREVIOUS CORRECTIONS:\n${context}\n\nUse this learning to be more accurate.`;
}