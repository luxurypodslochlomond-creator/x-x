import {
  MarkRecord,
  MarkSignal,
  MarkHorizon,
  MarkWall,
  MarkMusic,
  MarkMethod,
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
// So a caption says the one thing that is true and useful at a door: where it goes.
//
// ── AND THERE ARE SIX OF THEM NOW, NOT TWENTY-FOUR ─────────────────────────────
// Brian, 27 November, opening this on a phone: "lots going on and symbols and marks not right,
// my brain hurts and eyes too, I don't understand it, it's confusing, doesn't feel like us."
//
// He was looking at twenty-four drawings in a four-by-six grid, each with a name underneath,
// and none of them saying anything until you pressed one. That is a puzzle, not a door. And it
// was a directory wearing pictures — every one of those twenty-four is already a line in the
// list behind this plate, and every one is written out in the guide at /ClimateGuide.
//
// So the plate is the six rooms of the record and nothing else: what is happening, where it
// happened, who drew it, what it sounds like, and how it is kept. Nothing was deleted from the
// record — every mark still exists in RecordFootMarks and every door still opens from the list.
export const MARKS_IN_ORDER = [
  { name: 'The record', Mark: MarkRecord, to: '/TogetherChangeClimate', door: 'The front page', means: 'Every entry, in four rooms.' },
  { name: 'The Wire', Mark: MarkSignal, to: '/ClimateWire', door: 'The Wire', means: 'What changed, where, and who says so.' },
  { name: 'The map', Mark: MarkHorizon, to: '/ClimateMap', door: 'The map', means: 'Where the entries happened.' },
  { name: 'The wall', Mark: MarkWall, to: '/ClimateCartoons', door: 'The cartoons room', means: 'Drawings given to the record, with the hand that made them.' },
  { name: 'The music room', Mark: MarkMusic, to: '/ClimateMusic', door: 'The music room', means: 'Music given to the record, pressed to play.' },
  { name: 'How it is kept', Mark: MarkMethod, to: '/ClimateMethod', door: 'The method', means: 'How an entry is checked, and what has been put right.' },
];