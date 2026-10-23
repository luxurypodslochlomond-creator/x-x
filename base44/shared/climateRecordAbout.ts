// ── THE RECORD, ANSWERING FOR ITSELF ─────────────────────────────────────────────
//
// A reader, a journalist or a research panel asks the same first questions before they
// trust a single entry: who is behind this, who built it, how is it made, who decides,
// who pays, how do I cite it. Those answers already sit on pages of the record.
//
// This file only points at them, in the record's own words. It invents nothing, and it
// holds no claim that is not already published on the page it points to. A page returned
// from here is always shown as the record's own page — never mixed in with the wire or
// with the sourced entries, because the record's own account of itself is not evidence.

export interface RecordPage {
  path: string;
  label: string;
  title: string;
  line: string;
  keywords: string[];
}

export const RECORD_PAGES: RecordPage[] = [
  {
    path: '/ClimateFounder',
    label: 'The founder',
    title: 'Janine M. H. Selendy · Founder, Horizon International',
    line: 'Founder of Horizon International, at Yale University and formerly a Guest of Harvard University. Four decades of finding and advancing solutions to the interrelated concerns of global health, environment and poverty: two books with original chapters by 75 experts, 20 television documentaries she directed and produced, a National Science Foundation grant on oceans, and the Solutions Site built with UNEP, UNDP, UNFPA, UNICEF, the IDRC of Canada, Yale University and colleagues at Harvard.',
    keywords: ['founder', 'janine', 'selendy', 'horizon', 'international', 'yale', 'harvard', 'explorers', 'custodian', 'director', 'documentaries', 'films', 'books', 'wiley', 'oceans', 'beirut', 'started', 'began', 'her', 'she'],
  },
  {
    path: '/ClimateFounder',
    label: 'Who built it',
    title: 'Platform by Brian Hughes · UF51 CIC · Scotland',
    line: 'The record is built by us, in Scotland — UF51 CIC — and made in honour of Janine M. H. Selendy and Horizon International. Every page of the record names who built it.',
    keywords: ['built', 'build', 'builder', 'building', 'made', 'brian', 'hughes', 'uf51', 'cic', 'scotland', 'platform', 'developer', 'engineer', 'company', 'who', 'whos'],
  },
  {
    path: '/TogetherChangeClimate',
    label: 'The record itself',
    title: 'Together we can change the course of climate change — Record of the Time',
    line: 'A public record of climate emergencies and the positive actions that work — shared openly, internationally, in every language on Earth. A record, not a feed: entries are ordered by date, and nothing here counts likes, shares, views or reach.',
    keywords: ['record', 'about', 'purpose', 'mission', 'why', 'exists', 'together', 'change', 'climate', 'feed', 'ranking', 'ranked', 'likes', 'shares', 'views', 'reach', 'attention', 'home', 'front'],
  },
  {
    path: '/ClimateMethod',
    label: 'How this record is made',
    title: 'Method — sources, the ladder, who decides, corrections',
    line: 'If a claim cannot be traced to something outside the record, it does not belong here. Every entry prints its origin, and one of three labels: official record, corroborated, or single source. The screen is a machine; the decision is a person. Corrections are made in daylight, with the date. No advertising, no sponsorship, no paid placement of any kind.',
    keywords: ['method', 'made', 'source', 'sources', 'sourced', 'origin', 'origins', 'traceable', 'label', 'labels', 'ladder', 'corroborated', 'verify', 'verified', 'verification', 'check', 'checked', 'credible', 'trust', 'decides', 'decide', 'editor', 'human', 'machine', 'review', 'correction', 'corrections', 'rules', 'policy', 'money', 'fund', 'funded', 'sponsor', 'sponsorship', 'advertising', 'paid', 'placement', 'independence', 'independent', 'transparent', 'transparency', 'audit', 'panel', 'diligence', 'bullshit'],
  },
  {
    path: '/ClimateMethod',
    label: 'Citing the record',
    title: 'Every entry has its own permanent address',
    line: 'Every entry has its own permanent address, so a researcher can cite one entry rather than a front page that changes. The date, the origin and how well the claim is known all travel with the link.',
    keywords: ['cite', 'citation', 'citing', 'reference', 'research', 'researcher', 'academic', 'paper', 'study', 'permalink', 'link', 'stable', 'permanent', 'quote', 'attribution'],
  },
  {
    path: '/ClimateWire',
    label: 'The wire',
    title: "The record's wire — dated, sourced entries",
    line: 'What changed, where, who says so, and what others can copy from it. Every entry carries its source; no source, no entry.',
    keywords: ['wire', 'news', 'entry', 'entries', 'latest', 'recent', 'headline', 'headlines', 'dispatch', 'updates', 'changed', 'happening', 'today'],
  },
  {
    path: '/ClimateSupport',
    label: 'Support',
    title: 'Keeping the record running',
    line: 'Support keeps the record running and is declared in the open. Who gave, and whether they chose to be named, is recorded; amounts are never published and never influence what appears.',
    keywords: ['support', 'donate', 'donation', 'gift', 'give', 'giving', 'funding', 'keep', 'running', 'cost', 'costs', 'pays', 'subscription', 'wall', 'names', 'anonymous'],
  },
  {
    path: '/ClimatePrivacy',
    label: 'Privacy',
    title: 'What the record does with data',
    line: 'The record’s own statements on data, kept in the footer of every page of the record.',
    keywords: ['privacy', 'data', 'gdpr', 'cookies', 'tracking', 'personal', 'retention', 'store', 'stored', 'complaint'],
  },
  {
    path: '/ClimateTerms',
    label: 'Terms',
    title: 'The terms the record stands on',
    line: 'The terms of use for the record, kept in the footer of every page of the record.',
    keywords: ['terms', 'legal', 'rights', 'use', 'copyright', 'licence', 'license'],
  },
];

// Words are matched the way a person searches: a word the page is filed under counts for
// more than a word that merely appears inside it. Short words ("ai", "ad") only count as
// an exact filing — otherwise half the record would answer every question.
export function matchRecordPages(words: string[]): RecordPage[] {
  const scored = RECORD_PAGES.map((p) => {
    const haystack = `${p.label} ${p.title} ${p.keywords.join(' ')}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (p.keywords.includes(w)) score += 3;
      else if (w.length >= 4 && haystack.includes(w)) score += 1;
    }
    return { p, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((s) => s.p);
}