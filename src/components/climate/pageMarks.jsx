import {
  MarkBrief,
  MarkSignal,
  MarkHorizon,
  MarkPortrait,
  MarkLens,
  MarkMethod,
  MarkCorrection,
  MarkCheckers,
  MarkHandover,
  MarkMusic,
  MarkStudio,
  MarkEqual,
  MarkContents,
  MarkReadership,
  MarkSeal,
  MarkHost,
  MarkSupport,
  MarkCovenant,
  MarkTerms,
  MarkPrivacy,
} from './RecordFootMarks';

// ── ONE HAND FOR EVERY DOOR ────────────────────────────────────────────────────
// The masthead had five drawn marks and the rest of the record had a typed list, which
// is why the back of the book looked like it belonged to a different book. The map lives
// here, in one place, so the masthead, the foot and the contents page can never drift
// apart: a door with no mark in this map falls back to the sheet, and every door in the
// record's own index has one.
const MARKS = {
  // The way in, at the top of every page.
  '/TogetherChangeClimate': MarkBrief,
  '/ClimateWire': MarkSignal,
  '/ClimateMap': MarkHorizon,
  '/ClimateFounder': MarkPortrait,
  '/ClimateSearch': MarkLens,

  // How the record is kept.
  '/XEqualsX': MarkEqual,
  '/ClimateMethod': MarkMethod,
  '/ClimateCorrections': MarkCorrection,
  '/ClimateGuide': MarkContents,
  '/ClimateTerms': MarkTerms,
  '/ClimatePrivacy': MarkPrivacy,

  // What can be checked, and what is given.
  '/ClimateSeals': MarkSeal,
  '/ClimateFellows': MarkCheckers,
  '/ClimateHandover': MarkHandover,
  '/ClimateMusic': MarkMusic,
  '/Studio': MarkStudio,

  // What is written about it, and what it costs to carry.
  '/ClimateBrief': MarkBrief,
  '/ClimateImpact': MarkReadership,
  '/ClimateHost': MarkHost,
  '/ClimateKeeperRoom': MarkHost,
  '/ClimateSupport': MarkSupport,
  '/ExtractionProofCovenant': MarkCovenant,
};

export function markFor(to) {
  return MARKS[to] || MarkBrief;
}