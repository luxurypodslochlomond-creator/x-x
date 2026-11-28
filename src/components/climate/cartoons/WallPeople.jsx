import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

// ── WHO IS ACTUALLY BEHIND THIS WALL ───────────────────────────────────────────
// Brian, 28 November: "people and sources, not sure right words bro and not sure what it's
// saying… make so it can explain to a stupid prick like me."
//
// He is right, and the fault was a heading that said "Credits and the cartoonists who came
// before" over a block of housekeeping. A reader could not tell who drew what, who gave
// permission, or why any of it was on the page. So the same facts are now set as what they
// are: a short list of the people and bodies this wall stands on, each with one line saying
// what they did, and a door to their own page.
//
// ── AND THEN THE HANDS, ONE BY ONE ────────────────────────────────────────────
// "The cartoonists" used to be a single lumped line with a door back to the wall itself,
// which recognised nobody: a cartoonist looking for their own page found the front door.
// Brian, the same day: "they deserve to be recognised." So every hand named on the wall is
// now printed by name, read live from the wall as it stands, each with the address of the
// page that holds everything they have given the record. Add a drawing and a new name
// appears here without anybody editing this file.
const PLACEHOLDER = /hand not yet named/i;

const PEOPLE = [
  {
    name: 'Janine Selendy',
    role: 'Horizon International at Yale',
    line: 'Brought the climate record together and hosts the workshop that opens this wall.',
    to: '/ClimateFounder',
  },
  {
    name: 'Francis Umendu Odupute',
    role: 'CartoonAFRICA International Biennial, since 2012',
    line: 'Curates the biennial, edits its book, and drew the cover hanging at the top of this room.',
    to: '/ClimateCartoons/Francis',
  },
  {
    name: 'Alina Sen · CEEW India',
    role: 'What On Earth!®',
    line: 'The climate cartoons from India, shown here with CEEW’s permission and credited to them.',
    to: '/ClimateCartoons/CAIB',
  },
];

export default function WallPeople() {
  const [hands, setHands] = useState(null);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateCartoon
      .filter({ status: 'published' }, { limit: 200 })
      .then(({ items }) => {
        if (!live) return;
        const named = items.map((drawing) => (drawing.artist_name || '').trim()).filter((name) => name && !PLACEHOLDER.test(name));
        setHands([...new Set(named)].sort((a, b) => a.localeCompare(b)));
      })
      .catch(() => { if (live) setHands([]); });
    return () => { live = false; };
  }, []);

  return <section className="wall-people" aria-labelledby="wall-people-title">
    <h3 className="wall-people-title" id="wall-people-title">Who this wall stands on</h3>
    <p className="wall-people-lede">Three names behind the room, and then every hand that drew what hangs in it.</p>
    <ol className="wall-people-list">
      {PEOPLE.map((person, index) => <li key={person.name}>
        <Link to={person.to} className="wall-person">
          <span className="wall-person-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="wall-person-name">{person.name}</span>
          <span className="wall-person-role">{person.role}</span>
          <span className="wall-person-line">{person.line}</span>
        </Link>
      </li>)}
      {(hands || []).map((hand, index) => <li key={hand}>
        <Link to={`/ClimateCartoons/Artist/${encodeURIComponent(hand)}`} className="wall-person">
          <span className="wall-person-number" aria-hidden="true">{String(index + 4).padStart(2, '0')}</span>
          <span className="wall-person-name">{hand}</span>
          <span className="wall-person-role">Drew what is on this wall</span>
          <span className="wall-person-line">Everything they have given the record, on one page in their own name.</span>
        </Link>
      </li>)}
    </ol>
    {hands === null && <p className="wall-people-lede">Reading the wall for every name…</p>}
    {hands && hands.length === 0 && <p className="wall-people-lede">No drawing on the wall carries a name yet.</p>}
    <p className="wall-people-lede">A few drawings are still waiting for the name of the hand that made them. The wall leaves the gap rather than filling it with a guess.</p>
  </section>;
}