// Pigment sits inside the drawing: water blue, living green, sun yellow, heat clay.
// These are small colour plates, not coloured button backgrounds.
//
// The sun accent is the record's own yellow — the one in the foot, in the gathering
// door, on the topic stamps. Ochre was the honest attempt at it and it read as brown
// on warm paper, which is the very thing thirty marks in a row must not do. Yellow at
// this weight would disappear instead, so SubjectMark draws an ink edge under this
// one accent: the mark keeps the yellow, and the yellow keeps its edge.
const blue = 'text-record-ocean';
const green = 'text-record-botanical';
const sun = 'text-[#ffd447]';
const clay = 'text-record-clay';
const subjectMarkPigments = {
  all: [green, 'M7 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0M17 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0M28 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0'],
  agriculture: [green, 'M20 21C9 21 8 14 8 12c8-1 12 4 12 9ZM20 16c9 0 11-6 11-10-8 0-11 4-11 10Z'],
  water: [blue, 'M9 25c0 7 5 10 11 10s11-3 11-10c-7 4-15-4-22 0Z'],
  heat: [clay, 'M12 19a8 8 0 0 1 16 0Z'],
  coastal_erosion_protection: [blue, 'M18 18c6-8 15-6 17 0-5-2-7 1-7 4h7v5c-7-5-11 2-17 0Z'],
  seagrasses: [green, 'M14 33C4 24 17 19 10 7c12 5 4 17 10 26ZM21 33c-4-11 10-17 9-28 9 12-7 20-3 28Z'],
  mangroves: [green, 'M10 17C1 14 8 5 15 8 18-1 29 3 29 9c11-1 11 13 2 13H12Z'],
  oceans: [blue, 'M4 17c6-2 8-9 15-9 9 0 15 9 12 16-1-7-10-10-14-2 5-1 9 2 9 7-8-6-15-4-22-3Z'],
  zooplankton: [clay, 'M20 9c-8-2-13 5-13 11s5 12 13 11c8-1 13-6 13-12S27 8 20 9Z'],
  phytoplankton: [green, 'M20 5 31 12v16l-11 8-11-8V12Z'],
  forest_preservation: [green, 'M4 28 12 9l8 19ZM20 24 28 4l9 20Z'],
  rewilding: [green, 'M15 30C3 30 2 20 4 16c10-1 14 5 11 14ZM23 19c-1-11 6-15 12-15 2 10-3 16-12 15Z'],
  urban_geodesign: [green, 'M17 25c-6-3-3-10 1-13 6 5 8 11-1 13Z'],
  transportation: [blue, 'M5 11h21c6 0 9 3 9 9H5Z'],
  electric_vehicles: [sun, 'M21 3l-5 7h6l-3 7 7-10h-6Z'],
  renewable_energy: [sun, 'M20 14 13 3c-5 8-3 13 4 15ZM23 17l13-1c-4-8-8-9-13-3ZM18 21l-6 12c9 0 13-4 10-12Z'],
  solar_desalination: [sun, 'M4 19h27l5 14H8ZM5 13a3 3 0 1 1 6 0Z'],
  drought: [sun, 'M3 26l10-2 7 4 9-6 8 2v13H3Z'],
  flooding: [blue, 'M3 25c5-4 8 4 13 0s8 4 13 0l8-1v11H3Z'],
  extreme_weather: [clay, 'M21 15l-8 13h8l-5 10 13-18h-8l5-9Z'],
  sanitation_hygiene: [blue, 'M33 18c-1 3-4 5-4 7a4 4 0 0 0 8 0c0-2-3-4-4-7Z'],
  air_quality: [blue, 'M4 17h24c4 0 4 5 0 5H4Z'],
  biodiversity: [green, 'M20 24C8 24 5 15 6 9c10-1 15 5 14 15ZM20 18C20 7 27 4 35 6c1 8-5 14-15 12Z'],
  coral_reefs: [clay, 'M17 35V18l-10 5V9h4v10l6-3V7h5v11l10-6V5h4v10l-14 8v12Z'],
  kelp_forests: [green, 'M9 23c-7-2-7-6-6-9 6 0 8 4 6 9ZM23 18c-2-7 3-11 8-10-1 6-3 9-8 10Z'],
  fisheries: [blue, 'M5 22c8-12 18-12 25 0-7 12-17 12-25 0Z'],
  wetlands: [green, 'M9 8V3h4v8H9ZM23 14V7h4v9h-4Z'],
  peatlands: [sun, 'M4 24c11-4 20 5 32 0v12H4Z'],
  soil_health: [sun, 'M4 21h32v15H4Z'],
  food_security: [sun, 'M5 25h30c-1 8-8 12-15 12S6 33 5 25Z'],
  agroforestry: [green, 'M12 6 4 20h16ZM28 20c-8-1-9-6-9-9 7-1 10 3 9 9ZM28 14c7 0 8-5 8-8-6 0-9 3-8 8Z'],
  desertification: [sun, 'M3 30c7-10 16-9 23 0l11 0v8H3Z'],
  other: [blue, 'M6 9h28v6H6Z'],
};
export default subjectMarkPigments;