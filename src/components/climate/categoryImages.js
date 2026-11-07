// ── Shared category image map — one source of truth for all climate pages ──
// Copyright-free Unsplash photos (verified working) + AI-generated permanent images.
// Both TogetherChangeClimate.jsx and ClimateDetail.jsx import from here
// so a broken URL only needs fixing in one place.

const IMAGES = {
  // THE COVER — painted for the record, so it is credited to nobody and borrowed from
  // nobody. A photograph of the planet would have needed a photographer's name under it
  // and would have shown one moment of one place; a cover is allowed to be the whole idea
  // at once: the living earth, inside space, in colour. Nicolas said the record looked like
  // code and asked for natural colour and a news page instead of a black room. He was
  // right, and the answer was not grey — it was this: light, life, and the sky above it.
  // Rendered at 4096px, 16:9 — the file is the full-scale canvas, not a thumbnail that
  // happens to be stretched. Detail is the whole argument: a reader should be able to lean
  // into the atmosphere and find the air still glowing, and lean into the cloud and find
  // knife ridges catching light. Anything less and it is wallpaper pretending to be a painting.
  cover: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/b1ec3a31c_generated_3a4f3f99.png', // painted for the record, 4K
  mangroves: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/0a7d2c9d2_generated_image.png', // AI-generated permanent
  renewable: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=70&auto=format',
  seagrass: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=900&q=70&auto=format',
  agriculture: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=70&auto=format',
  plastic: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=70&auto=format',
  global: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=70&auto=format',
  heat: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=70&auto=format',
  drought: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=70&auto=format',
  flooding: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900&q=70&auto=format',
  oceans: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=70&auto=format',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=70&auto=format',
  water: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70&auto=format',
};

export const CATEGORY_IMAGE = (cat) => {
  const map = {
    mangroves: IMAGES.mangroves, coastal_erosion_protection: IMAGES.mangroves,
    renewable_energy: IMAGES.renewable, electric_vehicles: IMAGES.renewable, solar_desalination: IMAGES.renewable,
    seagrasses: IMAGES.seagrass, oceans: IMAGES.oceans, zooplankton: IMAGES.oceans, phytoplankton: IMAGES.oceans,
    agriculture: IMAGES.agriculture, water: IMAGES.water, drought: IMAGES.drought,
    /* Two designations were simply wrong and are gone: a plastic-waste photograph stood
       for urban design, and a photograph of the planet from orbit stood for transport.
       A picture that is not of the thing it sits on is a caption that lies, so both fall
       back to the record's own ground instead. Crises are not illustrated from this map at
       all — see SolutionCard: a crisis shows its own photograph or none. */

    extreme_weather: IMAGES.heat, heat: IMAGES.heat, flooding: IMAGES.flooding,
    forest_preservation: IMAGES.forest, rewilding: IMAGES.forest,
    other: IMAGES.global,
  };
  return map[cat] || IMAGES.global;
};

export { IMAGES };