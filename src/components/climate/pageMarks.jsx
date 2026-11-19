import {
  MarkBrief,
  MarkRecord,
  MarkPlan,
  MarkSignal,
  MarkHorizon,
  MarkSignature,
  MarkBaseOne,
  MarkMethod,
  MarkCorrection,
  MarkCheckers,
  MarkRoll,
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
  MarkWall,
} from './RecordFootMarks';

// ── ONE HAND FOR EVERY DOOR ────────────────────────────────────────────────────
// The masthead had five drawn marks and the rest of the record had a typed list, which
// is why the back of the book looked like it belonged to a different book. The map lives
// here, in one place, so the masthead, the foot and the contents page can never drift
// apart: a door with no mark in this map falls back to the sheet, and every door in the
// record's own index has one.
const MARKS = {
  // The way in, at the top of every page. It wore the brief's open folio until 19 November,
  // which meant the record and a page about the record wore one drawing: the first door on
  // the rail was the only door with no mark of its own. It is a bound register now, and the
  // folio is the brief's alone.
  '/TogetherChangeClimate': MarkRecord,
  '/ClimateWire': MarkSignal,
  '/ClimateMap': MarkHorizon,
  // The founder's door wears a nib laid to the line, not a portrait of a person: what this
  // door says is that somebody signed the record into being, and a pictogram of "person"
  // says the same thing about everybody and therefore nothing about her.
  '/ClimateFounder': MarkSignature,
  // BASE 1 wears its own mark — a printed one on its base — not a search glass borrowed
  // from every other product on earth.
  '/ClimateSearch': MarkBaseOne,

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
  // The roll is the list of names, which is a different thing from the pair of eyes doing
  // the work: the fellows page asks what checking involves, the roll says who is already on
  // it. It was falling back to the record's own folio, so the drawer showed one sheet twice.
  '/ClimateRoll': MarkRoll,
  '/ClimateHandover': MarkHandover,
  '/ClimateMusic': MarkMusic,
  '/Studio': MarkStudio,
  // The room of cartoons, opened for the workshop on 29 November, and called The Wall on
  // every door it stands on. It wore a pencil first — the mark of making a drawing rather
  // than of the drawings themselves — then a speech balloon with a face in it. The balloon
  // said "cartoon", which is the medium; the door says "wall", which is the place. So the
  // mark is the place: a line with drawings pegged to it and one empty place still asking.
  '/ClimateCartoons': MarkWall,

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