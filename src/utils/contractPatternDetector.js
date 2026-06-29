/**
 * ContractPatternDetector — pure logic, zero AI.
 *
 * Instantly identifies contract type, flags risky clauses, and spots
 * missing standard protections — all in <1 second, before the AI
 * analysis loads.
 */

// ── CONTRACT TYPE DETECTION ──────────────────────────────────────────────────

const CONTRACT_TYPES = {
  TENANCY: {
    label: 'Tenancy / lease agreement',
    keywords: [
      'tenancy', 'tenant', 'landlord', 'lease', 'rent',
      'deposit protection', 'section 21', 'section 8',
      'assured shorthold', 'ast', 'possession', 'fixed term',
    ],
  },
  EMPLOYMENT: {
    label: 'Employment contract',
    keywords: [
      'employer', 'employee', 'salary', 'wage', 'notice period',
      'probation', 'termination', 'garden leave', 'redundancy',
      'non-compete', 'restrictive covenant', 'confidentiality',
      'working hours', 'annual leave', 'pension',
    ],
  },
  SETTLEMENT: {
    label: 'Settlement / redundancy agreement',
    keywords: [
      'settlement agreement', 'redundancy', 'severance',
      'without prejudice', 'subject to contract',
      'ex gratia', 'termination payment', 'release of claims',
      'acas', 'cot3', 'compromise agreement',
    ],
  },
  SERVICE: {
    label: 'Service agreement / T&Cs',
    keywords: [
      'terms and conditions', 'terms of service', 't&cs',
      'service agreement', 'service provider', 'subscription',
      'monthly fee', 'recurring payment', 'auto-renewal',
      'slate', 'service level', 'sla',
    ],
  },
  SUBCONTRACTOR: {
    label: 'Subcontractor / freelancer agreement',
    keywords: [
      'subcontractor', 'consultant', 'freelancer',
      'self-employed', 'ir35', 'inside ir35', 'outside ir35',
      'day rate', 'deliverables', 'milestone',
    ],
  },
};

// ── RISKY CLAUSE DETECTION ────────────────────────────────────────────────────

const RISKY_CLAUSES = {
  AUTO_RENEWAL: {
    label: 'Auto-renewal clause',
    description: 'This contract renews automatically. You must cancel in writing or it keeps charging you.',
    keywords: ['auto-renewal', 'auto renewal', 'automatically renew', 'automatic renewal', 'rolls over'],
  },
  EARLY_TERMINATION_PENALTY: {
    label: 'Early termination penalty',
    description: 'You may face a penalty or fee if you end this early. Check what that costs you.',
    keywords: ['early termination', 'termination fee', 'exit fee', 'cancellation fee', 'break fee', 'early exit'],
  },
  UNLIMITED_LIABILITY: {
    label: 'Unlimited liability',
    description: 'You could be on the hook for unlimited costs. Negotiate a cap on your liability.',
    keywords: ['unlimited liability', 'no cap on liability', 'full indemnity', 'shall indemnify'],
  },
  NON_COMPETE: {
    label: 'Non-compete / restrictive covenant',
    description: 'This restricts you from working for competitors or starting your own business. Check how long and how wide it applies.',
    keywords: ['non-compete', 'non compete', 'restrictive covenant', 'shall not engage', 'shall not work for', 'shall not solicit'],
  },
  INDEMNITY: {
    label: 'Indemnity clause',
    description: 'You are agreeing to cover the other party\'s losses. Make sure this is fair and capped.',
    keywords: ['indemnify', 'indemnity', 'hold harmless', 'shall indemnify and hold harmless'],
  },
  ARBITRATION: {
    label: 'Mandatory arbitration / dispute clause',
    description: 'Disputes may go to private arbitration instead of court. This can limit your rights.',
    keywords: ['arbitration', 'arbitrator', 'binding arbitration', 'ADR', 'alternative dispute resolution'],
  },
  IP_ASSIGNMENT: {
    label: 'IP / copyright assignment',
    description: 'You may be giving away rights to your own work or ideas. Check what you\'re signing away.',
    keywords: ['intellectual property', 'assign all rights', 'work for hire', 'work made for hire', 'copyright shall vest', 'all IP'],
  },
  EXCLUSIVITY: {
    label: 'Exclusivity clause',
    description: 'You may be locked into working only with this party. This limits your freedom to earn elsewhere.',
    keywords: ['exclusivity', 'exclusive', 'shall not provide services to', 'sole and exclusive'],
  },
  DEPOSIT_FORFEITURE: {
    label: 'Deposit forfeiture risk',
    description: 'Your deposit could be at risk. Make sure the conditions for keeping it are clear and fair.',
    keywords: ['deposit', 'forfeit', 'forfeiture', 'retention of deposit'],
  },
  PERSONAL_GUARANTEE: {
    label: 'Personal guarantee',
    description: 'You are personally guaranteeing this. Your personal assets could be at risk — not just the business.',
    keywords: ['personal guarantee', 'guarantor', 'personally liable', 'personal assets'],
  },
  NO_VERBAL_AMENDMENT: {
    label: 'Entire agreement / no verbal amendments',
    description: 'Only written changes count. Verbal promises made to you before signing may be meaningless.',
    keywords: ['entire agreement', 'no verbal', 'no amendment except in writing', 'supersedes all prior'],
  },
  CHANGE_AT_ANY_TIME: {
    label: 'Terms can change at any time',
    description: 'They can change the terms without asking you. This is a significant risk — your deal could shift.',
    keywords: ['change at any time', 'modify these terms', 'amend these terms', 'at our discretion', 'right to modify'],
  },
};

// ── MISSING CLAUSE DETECTION ──────────────────────────────────────────────────

const STANDARD_CLAUSES = [
  {
    label: 'Notice period',
    keywords: ['notice period', 'days notice', 'written notice', 'notice in writing'],
  },
  {
    label: 'Dispute resolution process',
    keywords: ['dispute', 'mediation', 'arbitration', 'governing law', 'jurisdiction'],
  },
  {
    label: 'Confidentiality / data protection',
    keywords: ['confidentiality', 'data protection', 'gdpr', 'personal data', 'privacy'],
  },
  {
    label: 'Termination rights',
    keywords: ['termination', 'terminate', 'end this agreement', 'right to terminate'],
  },
  {
    label: 'Limitation of liability',
    keywords: ['limitation of liability', 'liability shall be limited', 'capped at', 'aggregate liability'],
  },
  {
    label: 'Payment terms',
    keywords: ['payment', 'invoice', 'fee', 'remuneration', 'consideration'],
  },
  {
    label: 'Governing law / jurisdiction',
    keywords: ['governing law', 'jurisdiction', 'courts of', 'laws of'],
  },
];

// ── MAIN DETECTION FUNCTION ──────────────────────────────────────────────────

export function detectContractPatterns(text) {
  if (!text || typeof text !== 'string') return null;

  const lowerText = text.toLowerCase();
  const findings = {
    contractTypes: [],
    riskyClauses: [],
    missingClauses: [],
    wordCount: 0,
    hasFindings: false,
  };

  findings.wordCount = text.trim().split(/\s+/).length;

  // Identify contract type
  for (const [key, type] of Object.entries(CONTRACT_TYPES)) {
    const hits = type.keywords.filter(kw => lowerText.includes(kw));
    if (hits.length > 0) {
      findings.contractTypes.push({
        key,
        label: type.label,
        matchCount: hits.length,
      });
    }
  }

  // Detect risky clauses
  for (const [key, clause] of Object.entries(RISKY_CLAUSES)) {
    const hits = clause.keywords.filter(kw => lowerText.includes(kw));
    if (hits.length > 0) {
      findings.riskyClauses.push({
        key,
        label: clause.label,
        description: clause.description,
        matchCount: hits.length,
      });
    }
  }

  // Detect missing standard clauses (only if text is long enough to be a real contract)
  if (findings.wordCount >= 50) {
    for (const standard of STANDARD_CLAUSES) {
      const hits = standard.keywords.filter(kw => lowerText.includes(kw));
      if (hits.length === 0) {
        findings.missingClauses.push({
          label: standard.label,
        });
      }
    }
  }

  findings.hasFindings =
    findings.contractTypes.length > 0 ||
    findings.riskyClauses.length > 0 ||
    findings.missingClauses.length > 0;

  return findings;
}

// ── WARNINGS ─────────────────────────────────────────────────────────────────

export function getContractWarnings(findings) {
  const warnings = [];
  if (!findings) return warnings;

  if (findings.contractTypes.length > 0) {
    const topType = findings.contractTypes[0];
    warnings.push({
      level: 'info',
      text: `This looks like: ${topType.label}. The full AI analysis is on its way.`,
    });
  }

  if (findings.riskyClauses.length > 0) {
    findings.riskyClauses.forEach(clause => {
      warnings.push({
        level: 'danger',
        text: `${clause.label} detected. ${clause.description}`,
      });
    });
  }

  if (findings.missingClauses.length > 0) {
    warnings.push({
      level: 'warning',
      text: `Not found in this contract: ${findings.missingClauses.map(m => m.label).join(', ')}. Missing standard protections can be just as important as the clauses that are there.`,
    });
  }

  return warnings;
}