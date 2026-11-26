// ── THE SEVENTEEN COLOURS ─────────────────────────────────────────────────────
// Brian, 26 November: "on the seventeen goals one wall … the colours they use for poverty,
// zero hunger, good health etc — all 17 have own colour bro, could bring this into this area
// on the wall, and feel connected like fuck too, visually."
//
// He is right, and it costs nothing to be exact. The United Nations publishes a colour for
// each goal, and it is the same colour on the goal's own page, in its icon and in every
// campaign that has ever carried it — which is why a reader who has met goal 13 anywhere in
// the world will recognise this green here. Using the UN's own values is the difference
// between a wall that is *connected* to the goals and a wall that has been decorated to look
// as though it is.
//
// These are the published hex values of the SDG colour wheel. They are used here as a visual
// link to each goal's own page and for nothing else: no UN logo is reproduced, no endorsement
// is implied, and the room already says in the open that the United Nations has not endorsed
// it and that the reading of the wall is the record's own.
//
// One deliberate exception: the record's own palette stays paper, ink and signal red, so the
// colours appear as a small solid block around the goal's number — a chip, not a repaint of
// the page. Seventeen colours down a printed index is a spectrum; seventeen coloured rows
// would be a carnival, and this room is a workshop.
export const GOAL_COLOURS = {
  1: '#E5243B',  // No Poverty
  2: '#DDA63A',  // Zero Hunger
  3: '#4C9F38',  // Good Health and Well-being
  4: '#C5192D',  // Quality Education
  5: '#FF3A21',  // Gender Equality
  6: '#26BDE2',  // Clean Water and Sanitation
  7: '#FCC30B',  // Affordable and Clean Energy
  8: '#A21942',  // Decent Work and Economic Growth
  9: '#FD6925',  // Industry, Innovation and Infrastructure
  10: '#DD1367', // Reduced Inequalities
  11: '#FD9D24', // Sustainable Cities and Communities
  12: '#BF8B2E', // Responsible Consumption and Production
  13: '#3F7E44', // Climate Action
  14: '#0A97D9', // Life Below Water
  15: '#56C02B', // Life on Land
  16: '#00689D', // Peace, Justice and Strong Institutions
  17: '#19486A', // Partnerships for the Goals
};

// A goal with no colour of its own falls back to the record's ink rather than to a guess.
export const goalColour = (n) => GOAL_COLOURS[Number(n)] || null;

// White on the UN's yellow (goal 7) or its pale blue (goal 6) is unreadable at this size, so
// the number takes the record's ink on the light colours and white on the dark ones — decided
// by the colour's own luminance, not by taste, so a new goal added tomorrow is handled too.
const luminance = (hex) => {
  const v = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(v.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const goalNumberInk = (n) => {
  const colour = goalColour(n);
  return colour && luminance(colour) > 0.42 ? '#1a1612' : '#ffffff';
};