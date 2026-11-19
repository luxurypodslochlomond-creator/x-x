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
  MarkContents,
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
} from '@/components/climate/RecordFootMarks';

// ── THE ALPHABET, IN THE ORDER A READER LEARNS IT ─────────────────────────────
// The marks can be joined at all because they are not illustrations of twenty-four different
// things: they are one hand, one forty-unit square, one weight of mass, and exactly one
// element in the record's red. That is a typeface, not a drawer of pictures, which is why
// laying them edge to edge makes a plate rather than a collage.
//
// The order is the order of the record's own index — the way in, then how it is kept, then
// what can be checked, then what is given — so a reader who has walked the drawer once can
// find any mark in the plate without a caption. Twenty-four, exactly, so the plate closes on
// all four sides with no hole in it.
export const MARKS_IN_ORDER = [
  { name: 'The record', Mark: MarkRecord },
  { name: 'Signals', Mark: MarkSignal },
  { name: 'The world', Mark: MarkHorizon },
  { name: 'The founder', Mark: MarkSignature },
  { name: 'Base 1', Mark: MarkBaseOne },
  { name: 'x = x', Mark: MarkXEqualsX },
  { name: 'Method', Mark: MarkMethod },
  { name: 'Corrections', Mark: MarkCorrection },
  { name: 'Contents', Mark: MarkContents },
  { name: 'Seals', Mark: MarkSeal },
  { name: 'Checkers', Mark: MarkCheckers },
  { name: 'The roll', Mark: MarkRoll },
  { name: 'Handover', Mark: MarkHandover },
  { name: 'Music', Mark: MarkMusic },
  { name: 'Studio', Mark: MarkStudio },
  { name: 'The wall', Mark: MarkWall },
  { name: 'The brief', Mark: MarkPlan },
  { name: 'Readership', Mark: MarkReadership },
  { name: 'The host', Mark: MarkHost },
  { name: 'Support', Mark: MarkSupport },
  { name: 'The covenant', Mark: MarkCovenant },
  { name: 'Terms', Mark: MarkTerms },
  { name: 'Privacy', Mark: MarkPrivacy },
  { name: 'The folio', Mark: MarkBrief },
];