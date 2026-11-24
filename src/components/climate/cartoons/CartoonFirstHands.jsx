import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import '@/components/climate/cartoons/cartoon-first-hands.css';

// ── THE HANDS THIS ROOM STANDS ON ────────────────────────────────────────────────
// Brian, 24 November: "bet coolasfuck Japanese ones too bro … how we categorise the
// old ones but coolasfuck style bro … why is font old and feels like magazine bro."
//
// Three answers, and they are the same answer.
//
// 1. CATEGORISE BY THE MOVE, NOT THE PASSPORT. The word on each plate is not a country
//    and not a century — it is what the hand did: jeer, price, self, witness, prison,
//    reverse, mirror, shape. The move is the only thing that repeats across eighteen
//    hundred years; the flag is the thing that changes. So the line still runs oldest
//    to newest, but each plate says out loud which move it made.
//
// 2. THE JAPANESE AND INDIAN ONES WERE MISSING, AND NOW THEY ARE NOT. The catfish print
//    (Japan, 1855) and the Kalighat babu (Calcutta, 19th century) are both here, and
//    both are anonymous — which is the point of them: mockery with no author is the
//    hardest kind to arrest.
//
// 3. WHY IT READ AS A MAGAZINE. Not the face — the italics on every title and the
//    letterspaced capitals on every credit. That pairing is the typographic grammar of
//    a printed magazine feature, and it was doing more to date the band than the
//    engravings were. Both are gone: titles are set upright in the record's own
//    grotesque, credits are sentence case, and the only letterspaced thing left is the
//    one kicker that the lineage heading above already uses.
//
// AND THE ENLARGEMENT, WHICH IS THE PART THAT COULD HAVE BEEN A LIE. Two of these files
// are small — the graffito is 394 pixels across, the catfish 450. Opening those "larger"
// would invent detail that is not in the file, which is the exact thing this record
// spends its whole life refusing to do. So the viewer is capped at the width of the copy
// actually held, the real pixel size is printed on every plate, and the caption says so.
// A record that will not overstate a fact will not overstate a photograph either.
const FIRST_HANDS = [
  {
    move: 'jeer',
    name: 'The Alexamenos graffito',
    dates: 'Rome · around AD 200',
    work: 'Scratched into plaster, Palatine Hill',
    line: 'A donkey’s head on a cross, captioned in Greek: “Alexamenos worships his god.” Nearly two thousand years old, and drawn to jeer. It is the plainest warning on this wall: mockery is very old, it points in every direction, and the hand holding the chalk is not always the good one.',
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Alexorig.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Alexorig.jpg',
    w: 394, h: 450, cap: 394,
    source: 'https://commons.wikimedia.org/wiki/File:Alexorig.jpg',
  },
  {
    move: 'price',
    name: 'William Hogarth',
    dates: '1697–1764',
    work: 'Gin Lane · 1751',
    line: 'Sold by subscription at a shilling, so that a picture of what gin was doing to a street could hang in the houses on that street. The first time a drawing was priced to reach the people it was about.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/William_Hogarth_-_Gin_Lane.jpg/960px-William_Hogarth_-_Gin_Lane.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/William_Hogarth_-_Gin_Lane.jpg',
    w: 4000, h: 4638, cap: 1600,
    source: 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg',
  },
  {
    move: 'self',
    name: 'Francisco Goya',
    dates: '1746–1828',
    work: 'The Sleep of Reason Produces Monsters · 1799',
    line: 'Reason asleep at a desk, and the owls of superstition over its shoulder. The man asleep is Goya. He put himself in the chair, which is the part nearly everybody leaves out.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Goya-Capricho-43.jpg/960px-Goya-Capricho-43.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Goya-Capricho-43.jpg',
    w: 2391, h: 3510, cap: 1600,
    source: 'https://commons.wikimedia.org/wiki/File:Goya-Capricho-43.jpg',
  },
  {
    move: 'witness',
    name: 'George Cruikshank',
    dates: '1792–1878',
    work: 'The Massacre of Peterloo · 1819',
    line: 'Cavalry into a crowd in a Manchester field: some eighteen killed, hundreds hurt, the crowd asking for the vote. The print went round while the authorities were still congratulating the magistrates.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/The_Massacre_of_Peterloo.jpg/960px-The_Massacre_of_Peterloo.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/The_Massacre_of_Peterloo.jpg',
    w: 2594, h: 1722, cap: 1600,
    source: 'https://commons.wikimedia.org/wiki/File:The_Massacre_of_Peterloo.jpg',
  },
  {
    move: 'prison',
    name: 'Honoré Daumier',
    dates: '1808–1879',
    work: 'Gargantua · 1831',
    line: 'The king as a giant, swallowing what is handed up to him by the poor. It earned Daumier a prison sentence and a fine. He drew for another forty-eight years.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Honor%C3%A9_Daumier_-_Gargantua.jpg/960px-Honor%C3%A9_Daumier_-_Gargantua.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Honor%C3%A9_Daumier_-_Gargantua.jpg',
    w: 3643, h: 2726, cap: 1600,
    source: 'https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg',
  },
  {
    move: 'reverse',
    name: 'A namazu-e, unsigned',
    dates: 'Japan · 1855 · nobody put a name to it',
    work: 'Woodblock print, made in the weeks after the Ansei earthquake',
    line: 'A giant catfish under the islands, and the earthquake it causes turned round: the disaster as the poor finally getting one over on the men profiting from the rebuilding. Printed by the thousand, sold for almost nothing, signed by nobody — so there was nobody to arrest for it.',
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Namazu-e_-_Namazu_the_saviour.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Namazu-e_-_Namazu_the_saviour.jpg',
    w: 450, h: 641, cap: 450,
    source: 'https://commons.wikimedia.org/wiki/File:Namazu-e_-_Namazu_the_saviour.jpg',
  },
  {
    move: 'mirror',
    name: 'A Kalighat painter, unsigned',
    dates: 'Calcutta · 19th century · nobody put a name to it',
    work: 'English babu with a hookah · watercolour on mill paper',
    line: 'A Bengali hand drawing the man who dressed like his rulers: the borrowed coat, the hookah, the clerk halfway between two rooms. Sold for a few coins on the temple road, and turned into a type the whole street could laugh at.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/India%2C_Calcutta%2C_Kalighat_painting%2C_19th_century_-_English_Babu_%28Native_Indian_Clerk%29_Holding_a_Hookah_-_2003.145_-_Cleveland_Museum_of_Art.tif/lossy-page1-960px-India%2C_Calcutta%2C_Kalighat_painting%2C_19th_century_-_English_Babu_%28Native_Indian_Clerk%29_Holding_a_Hookah_-_2003.145_-_Cleveland_Museum_of_Art.tif.jpg',
    full: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/India%2C_Calcutta%2C_Kalighat_painting%2C_19th_century_-_English_Babu_%28Native_Indian_Clerk%29_Holding_a_Hookah_-_2003.145_-_Cleveland_Museum_of_Art.tif/lossy-page1-960px-India%2C_Calcutta%2C_Kalighat_painting%2C_19th_century_-_English_Babu_%28Native_Indian_Clerk%29_Holding_a_Hookah_-_2003.145_-_Cleveland_Museum_of_Art.tif.jpg',
    w: 3908, h: 6688, cap: 960,
    source: 'https://commons.wikimedia.org/wiki/File:India,_Calcutta,_Kalighat_painting,_19th_century_-_English_Babu_(Native_Indian_Clerk)_Holding_a_Hookah_-_2003.145_-_Cleveland_Museum_of_Art.tif',
  },
  {
    move: 'shape',
    name: 'John Tenniel',
    dates: '1820–1914',
    work: 'Dropping the Pilot · 1890',
    line: 'Bismarck down the gangway, the young Kaiser at the rail. It fixed the shape of every resignation cartoon since: the ship, the ladder, the man leaving.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Dropping_the_Pilot.jpg/960px-Dropping_the_Pilot.jpg',
    full: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Dropping_the_Pilot.jpg',
    w: 2429, h: 3805, cap: 1600,
    source: 'https://commons.wikimedia.org/wiki/File:Dropping_the_Pilot.jpg',
  },
];

export default function CartoonFirstHands() {
  const [open, setOpen] = useState(null);

  return (
    <section className="cartoon-first-hands" id="cartoon-first-hands" aria-labelledby="first-hands-title">
      <header>
        <p className="first-hands-kicker">Public domain · oldest first</p>
        <h2 className="first-hands-title" id="first-hands-title">The hands this room stands on.</h2>
        <p className="first-hands-standfirst">
          Eight plates, printed here because nobody owns them: the drawings are older than
          copyright and every file is public domain. Their makers have been dead long enough that
          the work belongs to everybody, and that is the only condition on which this record will
          print a picture it was not given. The cartoonists drawing now are above this band, named
          and not reproduced — their work is theirs, several of them are drawing under threat, and
          a room that prints a living hand without asking has become the thing it argues against.
        </p>
        <p className="first-hands-key">
          The word on each plate is not a country and not a century. It is the move the hand made
          — <b>jeer, price, self, witness, prison, reverse, mirror, shape</b> — because the move is
          the only thing that repeats across eighteen hundred years, and the passport is the thing
          that keeps changing.
        </p>
      </header>

      <div className="first-hands-frieze">
        {FIRST_HANDS.map((hand) => (
          <figure className="first-hand" key={hand.name}>
            <button
              type="button"
              className="first-hand-open"
              onClick={() => setOpen(hand)}
              aria-label={`Open ${hand.work} larger`}
            >
              <span className="first-hand-frame">
                <img src={hand.thumb} alt={`${hand.work} — ${hand.name}`} loading="lazy" decoding="async" />
              </span>
            </button>
            <figcaption>
              <p className="first-hand-move">{hand.move}</p>
              <p className="first-hand-name">{hand.name}</p>
              <p className="first-hand-when">{hand.dates}</p>
              <p className="first-hand-work">{hand.work}</p>
              <p className="first-hand-line">{hand.line}</p>
              <p className="first-hand-credit">
                Public domain · <a href={hand.source} target="_blank" rel="noopener noreferrer">the file itself</a> · {hand.w} × {hand.h} px
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="first-hands-note">
        The line runs by the age of the thing drawn, not by fame: about AD 200 at the left, 1890 at
        the right, and two of the eight have no author at all — the catfish print and the Kalighat
        sheet were passed round by hands nobody recorded, which is why nobody could be charged for
        them. Every credit opens the file page it came from, so the licence can be checked rather
        than believed. None of these eight is claimed as a climate campaigner: they are the hands,
        not the argument. And the band is still mostly European and Japanese, which is a gap it
        narrows without closing — the shelf above is the rest of that answer, and it is being
        filled by asking people who know their own rooms.
      </p>

      <Dialog open={!!open} onOpenChange={(isOpen) => { if (!isOpen) setOpen(null); }}>
        <DialogContent className="max-w-5xl">
          {open && (
            <>
              <DialogTitle>{open.work}</DialogTitle>
              <DialogDescription>{open.name} · {open.dates}</DialogDescription>
              <img
                className="first-hands-viewer-img"
                src={open.full}
                alt={`${open.work} — ${open.name}`}
                style={{ maxWidth: `${open.cap}px` }}
              />
              <p className="first-hands-honest">
                Shown at the size of the copy this record holds — {open.cap} pixels across, from a
                file of {open.w} × {open.h}. Nothing here is sharpened, cropped or stretched: the
                plate stops where the file stops, because enlarging past that would draw detail that
                nobody ever drew.{' '}
                <a href={open.source} target="_blank" rel="noopener noreferrer">Check it against the original ↗</a>
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}