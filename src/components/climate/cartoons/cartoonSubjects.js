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
export default function cartoonSubject(cartoon) {
  return subjects[cartoon?.title] || 'A different way of seeing';
}