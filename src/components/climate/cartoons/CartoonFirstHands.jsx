import React from 'react';
import '@/components/climate/cartoons/cartoon-first-hands.css';

// ── THE HANDS THIS ROOM STANDS ON ────────────────────────────────────────────────
// Brian, 24 November: "are there any open source coolasfuck images of the first
// cartoonists and everyone mentioned bro, are we allowed visually to have something
// coolasfuck beside each of them?"
//
// Yes — for these five, and only for these five, because their makers have been dead
// long enough that the work belongs to everybody. Every plate is served from Wikimedia
// Commons and every credit links to the file page it came from, so a reader can check
// the licence in one tap instead of taking this record's word for it.
//
// The cartoonists drawing now, in the lineage above, are deliberately NOT reproduced
// here. That is not squeamishness about copyright: several of them are drawing under
// threat, and a room that prints a living hand without asking has become the thing it
// exists to argue against. The dead need no permission. The living need to be asked,
// and asking is the whole difference between a record and a scraper.
const FIRST_HANDS = [
  {
    name: 'William Hogarth',
    dates: '1697–1764',
    work: 'Gin Lane',
    year: '1751',
    line: 'Sold by subscription at a shilling, so that a picture of what gin was doing to a street could hang in the houses on that street. The first time a drawing was priced to reach the people it was about.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/William_Hogarth_-_Gin_Lane.jpg/960px-William_Hogarth_-_Gin_Lane.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg',
  },
  {
    name: 'Francisco Goya',
    dates: '1746–1828',
    work: 'The Sleep of Reason Produces Monsters',
    year: '1799',
    line: 'Reason asleep at a desk, and the owls of superstition over its shoulder. The man asleep is Goya. He put himself in the chair, which is the part nearly everybody leaves out.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Goya-Capricho-43.jpg/960px-Goya-Capricho-43.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Goya-Capricho-43.jpg',
  },
  {
    name: 'George Cruikshank',
    dates: '1792–1878',
    work: 'The Massacre of Peterloo',
    year: '1819',
    line: 'Cavalry into a crowd in a Manchester field: some eighteen killed, hundreds hurt, the crowd asking for the vote. The print went round while the authorities were still congratulating the magistrates.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/The_Massacre_of_Peterloo.jpg/960px-The_Massacre_of_Peterloo.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:The_Massacre_of_Peterloo.jpg',
  },
  {
    name: 'Honoré Daumier',
    dates: '1808–1879',
    work: 'Gargantua',
    year: '1831',
    line: 'The king as a giant, swallowing what is handed up to him by the poor. It earned Daumier a prison sentence and a fine. He drew for another forty-eight years.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Honor%C3%A9_Daumier_-_Gargantua.jpg/960px-Honor%C3%A9_Daumier_-_Gargantua.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg',
  },
  {
    name: 'John Tenniel',
    dates: '1820–1914',
    work: 'Dropping the Pilot',
    year: '1890',
    line: 'Bismarck down the gangway, the young Kaiser at the rail. It fixed the shape of every resignation cartoon since: the ship, the ladder, the man leaving.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Dropping_the_Pilot.jpg/960px-Dropping_the_Pilot.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Dropping_the_Pilot.jpg',
  },
];

export default function CartoonFirstHands() {
  return (
    <section className="cartoon-first-hands" id="cartoon-first-hands" aria-labelledby="first-hands-title">
      <header>
        <p className="first-hands-kicker">Out of copyright · out of anybody’s pocket</p>
        <h2 className="first-hands-title" id="first-hands-title">The hands this room stands on.</h2>
        <p className="first-hands-standfirst">
          Five plates, printed here because nobody owns them. Their makers have been dead long
          enough that the work belongs to everybody, and that is the only condition on which this
          record will print a picture it was not given. The cartoonists drawing now are above this
          band, named and not reproduced: their work is theirs, several of them are drawing under
          threat, and a room that prints a living hand without asking has become the thing it
          argues against.
        </p>
      </header>

      <div className="first-hands-grid">
        {FIRST_HANDS.map((hand) => (
          <figure className="first-hand" key={hand.name}>
            <img src={hand.image} alt={`${hand.work} by ${hand.name}, ${hand.year}`} loading="lazy" decoding="async" />
            <figcaption>
              <p className="first-hand-name">{hand.name} <span className="first-hand-dates">{hand.dates}</span></p>
              <p className="first-hand-work">{hand.work} · {hand.year}</p>
              <p className="first-hand-line">{hand.line}</p>
              <p className="first-hand-credit">
                Public domain ·{' '}
                <a href={hand.source} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="first-hands-note">
        Every plate is served from Wikimedia Commons and every credit opens the file page it came
        from, so the licence can be checked rather than believed. Dates are the plate’s own, not
        the span of a life. Nothing here is a ranking, and none of these five is claimed as a
        climate campaigner — they are the hands, not the argument.
      </p>
    </section>
  );
}