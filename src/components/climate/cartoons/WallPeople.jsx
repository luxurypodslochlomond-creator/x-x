import React from 'react';
import { Link } from 'react-router-dom';

// ── WHO IS ACTUALLY BEHIND THIS WALL ───────────────────────────────────────────
// Brian, 28 November: "people and sources, not sure right words bro and not sure what it's
// saying… make so it can explain to a stupid prick like me."
//
// He is right, and the fault was a heading that said "Credits and the cartoonists who came
// before" over a block of housekeeping. A reader could not tell who drew what, who gave
// permission, or why any of it was on the page. So the same facts are now set as what they
// are: a short list of the people and bodies this wall stands on, each with one line saying
// what they did, and a door to their own page. No new claim is made and no name is added
// that the record did not already hold.
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
  {
    name: 'The cartoonists',
    role: 'Every hand on the wall',
    line: 'Each drawing carries the name of the person who made it, where it came from, and their own line about it.',
    to: '/ClimateCartoons',
  },
];

export default function WallPeople() {
  return <section className="wall-people" aria-labelledby="wall-people-title">
    <h3 className="wall-people-title" id="wall-people-title">Who this wall stands on</h3>
    <p className="wall-people-lede">Four names, in plain words. Every drawing on this wall came from one of them.</p>
    <ol className="wall-people-list">
      {PEOPLE.map((person, index) => <li key={person.name}>
        <Link to={person.to} className="wall-person">
          <span className="wall-person-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="wall-person-name">{person.name}</span>
          <span className="wall-person-role">{person.role}</span>
          <span className="wall-person-line">{person.line}</span>
        </Link>
      </li>)}
    </ol>
  </section>;
}