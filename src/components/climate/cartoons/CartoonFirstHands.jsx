import React from 'react';
import '@/components/climate/cartoons/cartoon-first-hands.css';

// ── THE HANDS THIS ROOM STANDS ON ────────────────────────────────────────────────
// Brian, 24 November: "are there any open source coolasfuck images of the first
// cartoonists ... and bro you sure cant get the first one."
//
// He was right, and it was the oldest one that was missing. The Alexamenos graffito is
// about eighteen hundred years older than Hogarth, and Commons holds a public-domain
// file of it — so it goes first, and the band stops being a shelf of eighteenth-century
// engravers and becomes a line of time.
//
// "And why does it look old and squashed" — because it was built like a museum caption
// sheet: every plate forced to one column width, so a landscape engraving sat beside a
// tall one looking pressed flat, all of them given equal authority, under a row of tiny
// capital letters. That is what an information panel looks like. This is a wall.
//
// So the plates now share a HEIGHT and never a width, which is how prints have always
// been hung: a wide plate runs wide, a tall plate stands tall, and nothing is stretched
// into a column. They run oldest to newest, left to right, because that is the only
// honest order for a line of time — and because it means the wall opens with a jeer
// scratched into plaster by somebody whose name we will never have.
const FIRST_HANDS = [
  {
    name: 'The Alexamenos graffito',
    dates: 'Rome · around AD 200',
    work: 'Scratched into plaster, Palatine Hill',
    line: 'A donkey’s head on a cross, captioned in Greek: “Alexamenos worships his god.” Nearly two thousand years old, and drawn to jeer. It is the plainest warning on this wall: mockery is very old, it points in every direction, and the hand holding the chalk is not always the good one.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Alexorig.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Alexorig.jpg',
  },
  {
    name: 'William Hogarth',
    dates: '1697–1764',
    work: 'Gin Lane · 1751',
    line: 'Sold by subscription at a shilling, so that a picture of what gin was doing to a street could hang in the houses on that street. The first time a drawing was priced to reach the people it was about.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/William_Hogarth_-_Gin_Lane.jpg/960px-William_Hogarth_-_Gin_Lane.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg',
  },
  {
    name: 'Francisco Goya',
    dates: '1746–1828',
    work: 'The Sleep of Reason Produces Monsters · 1799',
    line: 'Reason asleep at a desk, and the owls of superstition over its shoulder. The man asleep is Goya. He put himself in the chair, which is the part nearly everybody leaves out.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Goya-Capricho-43.jpg/960px-Goya-Capricho-43.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Goya-Capricho-43.jpg',
  },
  {
    name: 'George Cruikshank',
    dates: '1792–1878',
    work: 'The Massacre of Peterloo · 1819',
    line: 'Cavalry into a crowd in a Manchester field: some eighteen killed, hundreds hurt, the crowd asking for the vote. The print went round while the authorities were still congratulating the magistrates.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/The_Massacre_of_Peterloo.jpg/960px-The_Massacre_of_Peterloo.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:The_Massacre_of_Peterloo.jpg',
  },
  {
    name: 'Honoré Daumier',
    dates: '1808–1879',
    work: 'Gargantua · 1831',
    line: 'The king as a giant, swallowing what is handed up to him by the poor. It earned Daumier a prison sentence and a fine. He drew for another forty-eight years.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Honor%C3%A9_Daumier_-_Gargantua.jpg/960px-Honor%C3%A9_Daumier_-_Gargantua.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg',
  },
  {
    name: 'John Tenniel',
    dates: '1820–1914',
    work: 'Dropping the Pilot · 1890',
    line: 'Bismarck down the gangway, the young Kaiser at the rail. It fixed the shape of every resignation cartoon since: the ship, the ladder, the man leaving.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Dropping_the_Pilot.jpg/960px-Dropping_the_Pilot.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Dropping_the_Pilot.jpg',
  },
];

export default function CartoonFirstHands() {
  return (
    <section className="cartoon-first-hands" id="cartoon-first-hands" aria-labelledby="first-hands-title">
      <header>
        <p className="first-hands-kicker">Public domain · oldest first</p>
        <h2 className="first-hands-title" id="first-hands-title">The hands this room stands on.</h2>
        <p className="first-hands-standfirst">
          Six plates, printed here because nobody owns them: the drawings are older than
          copyright and every file is public domain. Their makers have been dead long enough that
          the work belongs to everybody, and that is the only condition on which this record will
          print a picture it was not given. The cartoonists drawing now are above this band, named
          and not reproduced — their work is theirs, several of them are drawing under threat, and
          a room that prints a living hand without asking has become the thing it argues against.
        </p>
      </header>

      <div className="first-hands-frieze">
        {FIRST_HANDS.map((hand) => (
          <figure className="first-hand" key={hand.name}>
            <div className="first-hand-frame">
              <img src={hand.image} alt={`${hand.work} — ${hand.name}`} loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <p className="first-hand-name">{hand.name}</p>
              <p className="first-hand-when">{hand.dates}</p>
              <p className="first-hand-work">{hand.work}</p>
              <p className="first-hand-line">{hand.line}</p>
              <p className="first-hand-credit">
                Public domain ·{' '}
                <a href={hand.source} target="_blank" rel="noopener noreferrer">the file itself</a>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="first-hands-note">
        The line runs by the age of the thing drawn, not by fame: about AD 200 at the left, 1890 at
        the right. Every credit opens the file page it came from, so the licence can be checked
        rather than believed. None of these six is claimed as a climate campaigner — they are the
        hands, not the argument. And the band is still mostly European, which is a gap it does not
        close: the shelf above is the beginning of that answer, and the rest is being filled by
        asking people who know their own rooms.
      </p>
    </section>
  );
}