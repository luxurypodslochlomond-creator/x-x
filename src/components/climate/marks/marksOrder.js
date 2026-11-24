import {
  MarkBrief,
  MarkRecord,
  MarkSignal,
  MarkHorizon,
  MarkSignature,
  MarkBaseOne,
  MarkXEqualsX,
  MarkMethod,
  MarkCorrection,
  MarkSeal,
  MarkCheckers,
  MarkRoll,
  MarkHandover,
  MarkMusic,
  MarkStudio,
  MarkWall,
  MarkPlan,
  MarkReadership,
  MarkHost,
  MarkSupport,
  MarkCovenant,
  MarkTerms,
  MarkPrivacy,
  MarkExplore,
} from '@/components/climate/RecordFootMarks';

// ── A CAPTION SAYS WHAT THE DOOR OPENS ─────────────────────────────────────────
// Brian, 19 November: "the descriptions for our symbols and marks aren't truth."
//
// Every caption here used to read the drawing back to the reader — "an ink cover beside a red
// spine. The book the rest of it is kept in." That is an interpretation, and an interpretation
// printed under a mark is a claim: it says the drawing means something, and it says the record
// knows what. Nobody drew it with that sentence in mind, and the sentence cannot be checked by
// the reader standing in front of it.
//
// So a caption now says the one thing that is true and useful at a door: where it goes. The
// drawing is left to be looked at. Where a mark is not a door at all, it says so.
export const MARKS_IN_ORDER = [
  { name: 'The record', Mark: MarkRecord, to: '/TogetherChangeClimate', door: 'The register', means: 'Opens the front page: every entry, in four rooms.' },
  { name: 'The Wire', Mark: MarkSignal, to: '/ClimateWire', door: 'The Wire', means: 'Opens sourced updates: what changed, where, and who says so.' },
  { name: 'The map', Mark: MarkHorizon, to: '/ClimateMap', door: 'The map', means: 'Opens the map: where entries happened, and where the record has been read.' },
  { name: 'The founder', Mark: MarkSignature, to: '/ClimateFounder', door: 'Who began it', means: 'Opens the page on Janine M. H. Selendy, who asked for the record.' },
  { name: 'Base 1', Mark: MarkBaseOne, to: '/ClimateSearch', door: 'Ask the record', means: 'Opens the search: ask for a place, a subject or a source.' },
  { name: 'x = x', Mark: MarkXEqualsX, to: '/XEqualsX', door: 'The principle', means: 'Opens the page on the record’s principle: equal worth, drawn rather than argued.' },
  { name: 'Method', Mark: MarkMethod, to: '/ClimateMethod', door: 'How it is kept', means: 'Opens the method: how an entry is checked, and what has been put right.' },
  { name: 'Corrections', Mark: MarkCorrection, to: '/ClimateMethod#corrections', door: 'What was put right', means: 'Opens the corrections listed on the method page.' },
  { name: 'Seals', Mark: MarkSeal, to: '/ClimateSeals', door: 'Check the words', means: 'Opens the seals: the fingerprint taken of each entry, checked in your own browser.' },
  { name: 'Witnesses', Mark: MarkCheckers, to: '/ClimateFellows', door: 'Take a look', means: 'Opens the page on what reading for the record involves, and how to ask to take part.' },
  { name: 'The roll', Mark: MarkRoll, to: '/ClimateRoll', door: 'The roll', means: 'Opens the roll: the people who check the record, in their own words.' },
  { name: 'Handover', Mark: MarkHandover, to: '/ClimateHost', door: 'Hosting the record', means: 'Opens the page on what carrying the record involves.' },
  { name: 'Music', Mark: MarkMusic, to: '/ClimateMusic', door: 'The music room', means: 'Opens the music room: the record’s theme, pressed to play.' },
  { name: 'Studio', Mark: MarkStudio, to: '/Studio', door: 'The studio', means: 'Opens the studio.' },
  { name: 'The wall', Mark: MarkWall, to: '/ClimateCartoons', door: 'The cartoons room', means: 'Opens the wall: drawings given to the record, with the hand that made them.' },
  { name: 'The plan', Mark: MarkPlan, to: '/ClimateBrief', door: 'The short version', means: 'Opens the project brief: what is live, what is planned, and what is missing.' },
  { name: 'Readership', Mark: MarkReadership, to: '/ClimateMap#reach', door: 'How far it went', means: 'Opens the reach figures: reads, and the countries they came from.' },
  { name: 'Custodians', Mark: MarkHost, to: '/CustodianRoom', door: 'The working room', means: 'Opens the working room, for the people who look after the record.' },
  { name: 'Support', Mark: MarkSupport, to: '/ClimateSupport', door: 'Keep it free', means: 'Opens the page on keeping the record free.' },
  { name: 'The covenant', Mark: MarkCovenant, to: '/ExtractionProofCovenant', door: 'The promise', means: 'Opens the extraction-proof covenant: the terms the record is shared under.' },
  { name: 'Terms', Mark: MarkTerms, to: '/ClimateTerms', door: 'The terms', means: 'Opens the terms the record is offered under.' },
  { name: 'Privacy', Mark: MarkPrivacy, to: '/ClimatePrivacy', door: 'What stays private', means: 'Opens what the record collects, and what it refuses to.' },
  { name: 'The brief', Mark: MarkBrief, to: null, door: null, means: 'Not a door: the mark for the record’s own summary.' },
  { name: 'Every door', Mark: MarkExplore, to: '/ClimateGuide', door: 'The written guide', means: 'Opens the written guide: every control on the record, and where each one leads.' },
];