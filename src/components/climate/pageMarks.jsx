import {
  MarkBrief,
  MarkPlan,
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
  MarkPencil,
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
  // The room of cartoons, opened for the workshop on 29 November. A pencil of its own,
  // because it is the only door on the record that leads to something somebody drew by hand.
  '/ClimateCartoons': MarkPencil,

  // ── WHAT IS WRITTEN ABOUT IT, AND WHAT IT COSTS TO CARRY ──────────────────────
  // Two marks were doing double duty on the sheet, and that, not the arithmetic, is what
  // made it look wrong: the open folio was drawn for both the record and the project brief,
  // and the key was drawn for both the host and the keeper's room. A reader caught the same
  // picture twice under two different names in one glance and the page stopped reading as a
  // page. The folio belongs to the record itself, so the brief gets its own page drawn for
  // it; and the key belongs to whoever actually holds the record's keys, so the host takes
  // the mark of a thing changing hands, which was drawn for exactly that and was sitting
  // unused once the handover sheet came off the doors. One new drawing, one swap.
  '/ClimateBrief': MarkPlan,
  '/ClimateImpact': MarkReadership,
  '/ClimateHost': MarkHandover,
  '/ClimateKeeperRoom': MarkHost,
  '/ClimateSupport': MarkSupport,
  '/ExtractionProofCovenant': MarkCovenant,
};

export function markFor(to) {
  return MARKS[to] || MarkBrief;
}