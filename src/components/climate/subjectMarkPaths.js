// Two closed shapes per mark: the object in ink, its defining part in red.
// Each fits the same forty-unit square as the record's navigation.
//
// ── DRAWN AS STRUCTURE, NOT AS PICTURES ────────────────────────────────────────
// Brian, 19 November: "are our icons trying too hard and literal, or art that will
// still be art in thousands of years?" The honest answer was: the rule is timeless, a
// third of the drawings were not. A droplet for water, a sun for heat, a fish for
// fisheries, a bus for transport are the four most-worn symbols in climate design. They
// are legible today and they will look like a 2020s icon set in fifty years, because they
// are pictures of objects rather than drawings of an idea.
//
// So those were redrawn from what the thing actually IS, not from what it looks like:
// water is a vessel part-filled (a level that is never level); heat is air widening as it
// rises; fisheries is a net with one cell taken; transport is direction; food security is
// a store closed on its last side; drought is ground with a seam through it; flooding is
// water standing between a fixed level and the ground; extreme weather is force arriving
// from above; a reef is a branch with one live tip. Same square, same weight, same single
// red part — no new style, and nothing borrowed from anybody's set.
//
// The rule that keeps these from being clip art, kept here so it survives us: solid
// masses only, nothing thinner than the mass, two shapes and no more, and exactly one red
// element — the point of the mark, never decoration.
const subjectMarkPaths = {
  all: ['M6 7h28v6H6zM6 17h28v6H6z', 'M6 27h19v6H6z'],
  agriculture: ['M17 16h6v18h-6zM7 12c8 0 13 4 13 11-8 0-13-4-13-11Z', 'M21 17c0-8 5-12 12-12 0 8-5 12-12 12Z'],
  // A vessel part-filled: the level is the red, and it sits off-centre because a level
  // that sits dead centre is a graphic, not a measurement.
  water: ['M4 18h32v18H4z', 'M4 18h18v6H4z'],
  // Air widening as it rises. The red is the hottest, smallest band, at the top.
  heat: ['M9 30h22v4H9zM14 22h12v4H14z', 'M17 14h6v4h-6z'],
  coastal_erosion_protection: ['M6 6h11v28H6z', 'M22 24c7-9 13-5 13 1v9H22Z'],
  seagrasses: ['M8 34C4 23 13 17 9 6c12 10 1 19 5 28ZM24 34c-4-10 6-17 4-27 10 12-1 19 2 27Z', 'M17 34c-5-15 5-22 3-31 11 14-1 23 3 31Z'],
  mangroves: ['M7 23C0 15 7 7 15 10c3-9 17-7 17 3 9 1 8 10 0 10Z', 'M17 23h6v3l9 9h-8l-4-5-4 5H8l9-9Z'],
  // Water in layers, one stratum in red — depth, not a wave.
  oceans: ['M4 22h32v8H4zM10 31h26v5H10z', 'M4 14h20v5H4z'],
  zooplankton: ['M20 6a14 14 0 1 1 0 28 14 14 0 0 1 0-28Zm0 7a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z', 'M16 16h8v8h-8z'],
  phytoplankton: ['M20 4 34 12v16l-14 8L6 28V12Zm0 8-7 4v8l7 4 7-4v-8Z', 'M17 15h6v10h-6z'],
  forest_preservation: ['M13 4 2 26h22ZM10 26h6v10h-6z', 'M28 7 17 29h22Z'],
  rewilding: ['M6 34V22C6 12 12 5 22 5c0 10-6 17-10 19v10Z', 'M18 32c0-10 5-16 16-16 0 11-5 16-16 16Z'],
  urban_geodesign: ['M5 14h10v22H5zM25 5h10v31H25z', 'M17 24h6v12h-6z'],
  // Direction, not a vehicle: two rules running, the leading one in red.
  transportation: ['M4 14h32v4H4zM4 22h24v4H4z', 'M4 30h16v4H4z'],
  // The road and what travels it.
  electric_vehicles: ['M4 28h32v6H4z', 'M22 4 13 19h6l-2 9 12-16h-8l3-8z'],
  renewable_energy: ['M17 17h6v19h-6zM20 16 6 8l-3 5 14 8ZM22 17l11 10 4-5-12-9Z', 'M18 3h6v14h-6z'],
  // Something leaving the water and being caught: a column rising out of a vessel.
  solar_desalination: ['M4 26h32v10H4z', 'M17 6h6v16h-6z'],
  // Ground with a seam through it — the crack is the red.
  drought: ['M4 24h13v12H4zM23 24h13v12H23z', 'M17 18h6v18h-6z'],
  // Water standing between a fixed level and the ground it is covering.
  flooding: ['M4 10h32v5H4zM4 31h32v5H4z', 'M4 20h32v6H4z'],
  // Force arriving from above into a base.
  extreme_weather: ['M4 30h32v6H4zM7 6h26v6H7z', 'M20 15 12 27h16z'],
  // Clean separated from not-clean, with the separation in red.
  sanitation_hygiene: ['M6 10h10v22H6zM24 10h10v22H24z', 'M17 4h6v32h-6z'],
  air_quality: ['M5 9h29v6H5zM5 20h22v6H5z', 'M5 31h15v6H5z'],
  biodiversity: ['M17 19h6v17h-6zM20 21C9 21 5 14 5 6c10 0 15 5 15 15Z', 'M22 17C22 8 27 4 35 4c0 9-5 13-13 13Z'],
  // A branch, with one live tip in red.
  coral_reefs: ['M17 10h6v26h-6zM5 18h12v5H5zM23 24h12v5H23z', 'M8 4h5v14H8z'],
  kelp_forests: ['M7 35C1 20 13 16 7 4h7c6 13-6 18 0 31Z', 'M24 35c-6-15 6-19 0-31h7c6 13-6 18 0 31Z'],
  // A net with one cell taken.
  fisheries: ['M6 6h4v28H6zM18 6h4v28h-4zM30 6h4v28h-4zM6 6h28v4H6zM6 18h28v4H6zM6 30h28v4H6z', 'M22 22h8v8h-8z'],
  wetlands: ['M8 5h6v20H8zM23 9h6v16h-6z', 'M4 29h32v7H4z'],
  peatlands: ['M5 18h30v7H5zM5 29h30v7H5z', 'M17 4h6v10h-6z'],
  soil_health: ['M4 26h32v10H4zM17 12h6v10h-6z', 'M20 16C10 16 7 11 7 5c9 0 13 4 13 11Z'],
  // A store closed on its last side — the side that makes it secure is the red.
  food_security: ['M6 6h4v28H6zM30 6h4v28h-4zM6 6h28v4H6z', 'M6 30h28v4H6z'],
  agroforestry: ['M4 30h32v6H4zM12 4 2 24h20Z', 'M25 11h7v14h-7z'],
  desertification: ['M3 32c9-15 24-15 34 0v4H3Z', 'M27 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z'],
  other: ['M6 7h28v6H6zM6 18h19v6H6z', 'M6 29h10v6H6z'],
};
export default subjectMarkPaths;