// ── Shared category image map — one source of truth for all climate pages ──
// Copyright-free Unsplash photos (verified working) + AI-generated permanent images.
// Both TogetherChangeClimate.jsx and ClimateDetail.jsx import from here
// so a broken URL only needs fixing in one place.

const IMAGES = {
  mangroves: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/0a7d2c9d2_generated_image.png', // AI-generated permanent
  renewable: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=70',
  seagrass: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=900&q=70',
  agriculture: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=70',
  plastic: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=70',
  global: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=70',
  heat: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=70',
  drought: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=70',
  flooding: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900&q=70',
  oceans: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=70',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=70',
  water: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70',
};

export const CATEGORY_IMAGE = (cat) => {
  const map = {
    mangroves: IMAGES.mangroves, coastal_erosion_protection: IMAGES.mangroves,
    renewable_energy: IMAGES.renewable, electric_vehicles: IMAGES.renewable, solar_desalination: IMAGES.renewable,
    seagrasses: IMAGES.seagrass, oceans: IMAGES.oceans, zooplankton: IMAGES.oceans, phytoplankton: IMAGES.oceans,
    agriculture: IMAGES.agriculture, water: IMAGES.water, drought: IMAGES.drought,
    urban_geodesign: IMAGES.plastic, transportation: IMAGES.global,
    extreme_weather: IMAGES.heat, heat: IMAGES.heat, flooding: IMAGES.flooding,
    forest_preservation: IMAGES.forest, rewilding: IMAGES.forest,
    other: IMAGES.global,
  };
  return map[cat] || IMAGES.global;
};

export { IMAGES };