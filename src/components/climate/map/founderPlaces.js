import { CHINA_INDIA_EVIDENCE, HUMANITARIAN_EVIDENCE, POVERTY_EVIDENCE } from '@/components/climate/founder/founderEvidence';
import { resolveCoords } from '@/components/climate/countryCentroids';

// ── WHICH FIGURE BELONGS TO WHICH GROUND ──────────────────────────────────────────
// The founder's ledgers say a place in their own words ("Sudan · the largest caseload in
// the world"), which is right for reading and useless for a map. This is the one place
// that translation is made, by hand and once, so a figure is never guessed onto a country
// by a string match: a global total has no place, and nothing here gives it one.
//
// The figures themselves are not copied. They are read from the ledger the founder page
// prints, so a corrected figure is corrected on both pages at the same time.
const PLACES = {
  china: 'China',
  india: 'India',
  sudan: 'Sudan',
  yemen: 'Yemen',
  afghanistan: 'Afghanistan',
  syria: 'Syria',
  congo: 'DR Congo',
  ukraine: 'Ukraine',
  palestine: 'Palestine',
  'us-poverty': 'United States',
  'us-food': 'United States',
};

export function founderPlaces() {
  const ledger = [...CHINA_INDIA_EVIDENCE, ...HUMANITARIAN_EVIDENCE, ...POVERTY_EVIDENCE];
  const byPlace = new Map();

  ledger.forEach((item) => {
    const place = PLACES[item.id];
    if (!place) return;
    const coords = resolveCoords(place);
    if (!coords) return;
    if (!byPlace.has(place)) byPlace.set(place, { place, lat: coords[0], lng: coords[1], figures: [] });
    byPlace.get(place).figures.push(item);
  });

  return [...byPlace.values()];
}

// The same places, shaped as marks for the record's one plate. The founder's figures are a
// reading of the world, not a second map: they are handed to the same plate as the entries
// and the reach, and chosen by the reader rather than layered on top of them.
export function founderMarks() {
  return founderPlaces().map((p) => {
    const one = p.figures[0];
    return {
      id: p.place,
      lat: p.lat,
      lng: p.lng,
      tone: 'crisis',
      count: p.figures.length,
      aria: p.figures.length === 1 ? `${p.place}: ${one.value} ${one.unit}` : `${p.place}: ${p.figures.length} figures`,
      title: p.figures.length === 1 ? `${p.place} · ${one.value} ${one.unit}` : `${p.place} · ${p.figures.length} figures`,
    };
  });
}