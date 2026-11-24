import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import '@/components/climate/cartoons/cartoon-first-hands.css';

// ── THE HANDS THIS ROOM STANDS ON ────────────────────────────────────────────────
// Brian, 24 November, four things in one breath: "are you sure they look squashed to
// me … are drawings the same as cartoons … will the cartoonist presenting this on the
// 29th in Nigeria get this … and no living cartoonist lets us show their work, that
// surprises me, can you check the whole internet."
//
// 1. SQUASHED — he was right, and it was the mount. Every plate was given a fixed-height
//    grey box to sit in, so a wide engraving was letterboxed into a tall frame with bands
//    of grey above and below it. Nothing was actually distorted, but it looked pressed
//    flat, and looking pressed flat is the same as being pressed flat to a reader. The
//    box is gone. Each picture now runs at its own true proportion, one hairline round it
//    as a plate mark, all of them pinned to the same width. Ragged and honest beats tidy
//    and wrong.
//
// 2. DRAWINGS AND CARTOONS ARE NOT THE SAME WORD. A drawing is what is on the paper; a
//    cartoon is a drawing with an argument in it. The room is called the wall of drawings
//    because anyone's hand is welcome there; this band is the cartooning tradition,
//    because every plate in it is making an argument about power. Same room, two words,
//    and each one doing a different job.
//
// 3. THE NINTH PLATE IS THE ANSWER TO THE NIGERIA QUESTION. He asked whether a living
//    cartoonist ever lets a record show their work. They do — the check found cartoonists
//    publishing on Commons under CC BY 4.0, which is a licence that says take it, credit
//    me, keep it open. Kartick Dutta's 2025 cartoon is here as the proof, credited and
//    linked, and it is the only plate on this wall that nobody had to die for.
//
// 4. AND THE BAND STILL DOES NOT PRETEND. Eight out of copyright, one published open, and
//    the note at the foot says plainly that this is still mostly Europe and Japan — which
//    is exactly what a Nigerian cartoonist will see first, and exactly why the living
//    hands above this band are the argument and this band is the footnote.
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
    licence: 'Public domain',
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
    licence: 'Public domain',
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
    licence: 'Public domain',
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
    licence: 'Public domain',
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
    licence: 'Public domain',
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
    licence: 'Public domain',
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
    licence: 'Public domain',
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
    licence: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Dropping_the_Pilot.jpg',
  },
  {
    // The one living hand. Not out of copyright, not asked in private: published open,
    // on purpose, under a licence that already says yes.
    move: 'open',
    name: 'Kartick Dutta',
    dates: 'India · drawing now',
    work: 'BRICS currency breaking American tariffs · 2025',
    line: 'A living hand, and the only plate here that nobody had to die for. Dutta put this on Commons under a licence that says: take it, keep my name on it, keep it open. That is a decision about the future of the work rather than about the drawing — and it is the move this whole record is trying to make.',
    thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Ruskov_Cartoon_%E2%80%93_BRICS_Currency_Breaking_American_Tariffs_%28by_Kartick_Dutta%29.jpg/960px-Ruskov_Cartoon_%E2%80%93_BRICS_Currency_Breaking_American_Tariffs_%28by_Kartick_Dutta%29.jpg',
    full: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Ruskov_Cartoon_%E2%80%93_BRICS_Currency_Breaking_American_Tariffs_%28by_Kartick_Dutta%29.jpg/960px-Ruskov_Cartoon_%E2%80%93_BRICS_Currency_Breaking_American_Tariffs_%28by_Kartick_Dutta%29.jpg',
    w: 4267, h: 6400, cap: 960,
    licence: 'CC BY 4.0 · published open by the artist',
    source: 'https://commons.wikimedia.org/wiki/File:Ruskov_Cartoon_%E2%80%93_BRICS_Currency_Breaking_American_Tariffs_%28by_Kartick_Dutta%29.jpg',
  },
];

export default function CartoonFirstHands() {
  const [open, setOpen] = useState(null);

  return (
    <section className="cartoon-first-hands" id="cartoon-first-hands" aria-labelledby="first-hands-title">
      <header>
        <p className="first-hands-kicker">Oldest first · every credit kept</p>
        <h2 className="first-hands-title" id="first-hands-title">The hands this room stands on.</h2>
        <p className="first-hands-standfirst">
          Nine plates. Eight are out of copyright — their makers have been dead long enough that
          the work belongs to everybody, which is the only condition on which this record will
          print a picture it was not given. The ninth is a living cartoonist who published his own
          work under a licence that already says yes. Everyone else drawing now is named above this
          band and not reproduced: their work is theirs, several of them are drawing under threat,
          and a room that prints a living hand without asking has become the thing it argues
          against.
        </p>
        <p className="first-hands-key">
          The word on each plate is not a country and not a century. It is the move the hand made
          — <b>jeer, price, self, witness, prison, reverse, mirror, shape, open</b> — because the
          move is the only thing that repeats across eighteen hundred years, and the passport is
          the thing that keeps changing.
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
              <img src={hand.thumb} alt={`${hand.work} — ${hand.name}`} loading="lazy" decoding="async" />
            </button>
            <figcaption>
              <p className="first-hand-move">{hand.move}</p>
              <p className="first-hand-name">{hand.name}</p>
              <p className="first-hand-when">{hand.dates}</p>
              <p className="first-hand-work">{hand.work}</p>
              <p className="first-hand-line">{hand.line}</p>
              <p className="first-hand-credit">
                {hand.licence} · <a href={hand.source} target="_blank" rel="noopener noreferrer">the file itself</a> · {hand.w} × {hand.h} px
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="first-hands-note">
        A drawing is what is on the paper; a cartoon is a drawing with an argument in it. Everything
        here is making an argument about power, which is why the room says drawings on the wall and
        cartoons on the shelf. The line runs by the age of the thing drawn, not by fame: about AD 200
        at the left, last year at the right. Two of the nine have no author at all — the catfish
        print and the Kalighat sheet went round in hands nobody recorded, which is why nobody could
        be charged for them. Every credit opens the file page it came from, so the licence can be
        checked rather than believed. And the band is still mostly Europe and Japan: that is the gap
        a cartoonist in Lagos will see first, it is not closed here, and the hands above are the
        argument while this band is only the footnote.
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