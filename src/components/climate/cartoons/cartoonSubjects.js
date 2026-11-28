// Editorial signposts, separate from the artists' own titles and words.
const subjects = {
  'A Tale of Two Cities': 'Cities & the choices we make',
  'The Way to Live Longer!': 'Cleaner journeys',
  'Keeping It Cool!': 'Heat & everyday safety',
  'Solar Thriller': 'Looking after solar',
  'The Cooler Influencer': 'Heat, power & influence',
  'The Transformation Nobody Saw Coming': 'AI & resources',
  "The Game's Gone Green!": 'Skills for a greener future',
  'Hidden in Plain Sight': 'Water we cannot see',
  "Heat's Got Nowhere to Hide!": 'Living through heatwaves',
  'Rain Check!': 'Rain & resilient cities',
  'Revolution EV-olution!': 'A cleaner commute',
  'Love At First Light': 'Sunlight & household bills',
  'The Energy Relay': 'The energy transition',
};
// ── THE LINE THAT SAID NOTHING, THIRTY TIMES ─────────────────────────────────
// This returned 'A different way of seeing' for every drawing that had no signpost, which on
// the wall is nearly all of them — the CAIB drawings, Francis's, Mushi's, Hanan's, Odiase's,
// Platini's. So a reader scrolling a phone met the same sentence under drawing after drawing
// and learned nothing from any of them. Brian, 28 November: "looks like repeating."
//
// A signpost that is the same for everything is not a signpost. Where there is no real
// subject the line is now simply absent, and the drawing stands on its own title, its hand
// and its origin — which is all it ever had to say.
export default function cartoonSubject(cartoon) {
  return subjects[cartoon?.title] || '';
}