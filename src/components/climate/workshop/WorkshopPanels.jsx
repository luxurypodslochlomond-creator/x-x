// ── THE STORY IN FIVE FRAMES ────────────────────────────────────────────────────
// The hour is about drawings, so it is shown as drawings rather than described. Each frame
// carries one line and one mark, drawn here in the record's own hand — a few strokes, no
// illustration of anybody, no borrowed picture, no machine image pretending to be a person's.
//
// That last part is the reason these are line marks and not pictures of a room full of
// young Nigerians drawing: we are not in that room, and an image of people who were never
// photographed would be the exact thing this record refuses everywhere else. A frame, a
// pencil and a wall are honest. A cast of invented faces would not be.

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const RED = 'rgb(var(--record-red))';

export const PANELS = [
  {
    n: '01',
    line: 'A hard thing, said simply.',
    note: 'no lecture, no slides',
    art: (
      <>
        <path {...S} d="M6 62c6-26 12-6 18-2s12-26 18 0 12 6 18-4" />
        <path {...S} d="M70 62h20" />
        <path {...S} d="M84 54l8 8-8 8" />
      </>
    ),
  },
  {
    n: '02',
    line: 'The drawing does the work.',
    note: 'you feel it before you agree',
    art: (
      <>
        <path {...S} strokeWidth={5} d="M26 96L74 48" />
        <path d="M74 48L92 26l-6 26z" fill="currentColor" stroke="none" />
        <path {...S} stroke={RED} d="M18 78l-6 6" />
      </>
    ),
  },
  {
    n: '03',
    line: 'The room draws.',
    note: 'nineteen minutes, on paper',
    art: (
      <>
        <path {...S} d="M16 20h58v58H16z" />
        <path {...S} strokeWidth={4} d="M70 94l24-24" />
        <path d="M94 70l8-8-2 12z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    n: '04',
    line: 'The last panel stays blank.',
    note: 'wordless, so it reads in any tongue',
    art: (
      <>
        <path {...S} d="M22 40V22h18M80 22h18v18M98 80v18H80M40 98H22V80" />
        <path {...S} opacity={0.45} strokeDasharray="3 7" d="M38 38h44v44H38z" />
        <circle cx="98" cy="22" r="3" fill={RED} stroke="none" />
      </>
    ),
  },
  {
    n: '05',
    line: 'What a room makes, the record keeps.',
    note: 'with the maker’s name on it, and nobody’s data',
    art: (
      <>
        <path {...S} d="M8 26h104" />
        <circle cx="31" cy="26" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="61" cy="26" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="91" cy="26" r="2.6" fill="currentColor" stroke="none" />
        <path {...S} d="M18 34h26v36H18zM48 34h26v36H48zM78 34h26v36H78z" />
        <path {...S} stroke={RED} d="M46 88c8-18 12 10 18-2s10 10 16 0" />
        <path {...S} d="M18 96h84" />
      </>
    ),
  },
];