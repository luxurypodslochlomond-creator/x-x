import React, { useEffect, useRef } from 'react';
import CartoonGoals from '@/components/climate/cartoons/CartoonGoals';
import CartoonWorld from '@/components/climate/cartoons/CartoonWorld';
import '@/components/climate/cartoons/cartoon-longread.css';

// ── THE ARGUMENT, ONE TAP AWAY ─────────────────────────────────────────────────
// Brian, 26 November, at the end of a long night: "I just don't know anymore haha… help
// please make coolasfuck bro and zero bullshit please."
//
// So the decision was made rather than handed back to him. The room was carrying three
// arguments and a visitor came for one: the wall and the hands that made it. The other two
// — the seventeen goals counted against the wall, and the lineage of cartoonists who drew
// power before any of us — are the record's own argument. They are good. They are also
// three screens of apparatus standing between a person and the end of a room that is
// supposed to be a wall.
//
// So they are kept, whole and untouched, behind one honest drawer at the foot. Nothing is
// deleted, nothing is shortened, no drawing leaves the wall: the section a cartoonist
// scrolls past on Sunday is simply no longer in the middle of the room. If it reads wrong,
// it is one line in the page to put it back in the open.
//
// The drawer opens itself when something points inside it — the set list's "seventeen
// goals", a goal row's own link, an address somebody pasted to a colleague — because a
// door that silently refuses to open is worse than no door.
const INSIDE = ['#cartoon-goals', '#press-world'];

export default function CartoonLongRead() {
  const drawer = useRef(null);

  useEffect(() => {
    const openIfPointedAt = () => {
      const hash = window.location.hash;
      if (!INSIDE.includes(hash) || !drawer.current) return;
      drawer.current.open = true;
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    openIfPointedAt();
    window.addEventListener('hashchange', openIfPointedAt);
    return () => window.removeEventListener('hashchange', openIfPointedAt);
  }, []);

  return (
    <details className="cartoon-longread" ref={drawer}>
      <summary>
        <span>
          <span className="cartoon-longread-kicker">The record’s own argument</span>
          Seventeen goals, and the hands that drew before these
        </span>
      </summary>
      <p className="cartoon-longread-line">
        Two readings of the wall, for anyone who wants them: which of the seventeen goals the
        drawings actually answer — and which are still blank — and the longer line of
        cartoonists who made power visible before this room existed. Neither is needed to look
        at a drawing.
      </p>
      {/* ── THE HISTORY, MOVED DOWN FROM THE DOOR ────────────────────────────────
          This paragraph opened the room and it was the reason the room did not read as a
          wall: eighty-five words of Benin earthworks before a single drawing. It belongs
          here, with the record's argument, where a reader who wants it will find it and a
          visitor who came to look at drawings will not have to walk through it. */}
      <p className="cartoon-longread-line">
        <strong>Iya</strong> — the Walls of Benin — was the longest thing ever built before
        machines: ramparts and moats running some sixteen thousand kilometres, some of them
        twenty metres high, raised between roughly the seventh and fourteenth centuries.
        Nobody wrote down the names of the people who built it. They built it anyway, one
        basket of earth at a time, and it stood for six hundred years.
      </p>
      <CartoonGoals />
      <CartoonWorld />
    </details>
  );
}