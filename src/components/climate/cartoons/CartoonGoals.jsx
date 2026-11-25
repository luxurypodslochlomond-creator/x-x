import React, { useMemo, useState } from 'react';
import { GOALS, GOALS_SOURCE } from '@/components/climate/cartoons/cartoonGoals';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';
import GoalRow from '@/components/climate/cartoons/GoalRow';
import '@/components/climate/cartoons/cartoon-goals.css';

// ── SEVENTEEN GOALS, ONE WALL, AND THE GAPS PRINTED ───────────────────────────
// The room's answer to the campaign Francis has been running since 2012. It does not
// congratulate the wall. It counts it, opens each goal to the goal's own words and the
// cartoonists' own words, and leaves the blank ones blank — because a workshop needs to see
// the empty space, not a tidy index that pretends the wall is finished.
export default function CartoonGoals() {
  const { cartoons } = useCartoonWall();
  const [openGoal, setOpenGoal] = useState(null);
  const [waitingOnly, setWaitingOnly] = useState(false);

  // The wall's real drawings, keyed by their real title, so every goal opens onto the
  // pictures themselves and every quoted sentence is the artist's own. Brian, 19 November:
  // "where are the drawings in like good health and well being bro got decryption but no
  // drawing bro" — right. The ledger was printing the goal's words and the artist's words
  // with the drawing left up the page, which is a citation of a picture rather than a
  // picture. A drawing is the thing; its line is the caption.
  const art = useMemo(() => {
    const map = {};
    cartoons.forEach((c) => { if (c.title) map[c.title] = c; });
    return map;
  }, [cartoons]);

  // Counted from the wall itself, not from the table above it. A goal is answered when a
  // drawing it names is actually standing on the wall today; a reading whose drawing has
  // been taken down does not get to keep answering the goal by itself.
  const answered = (g) => g.drawings.some((d) => art[d.title]);

  const held = GOALS.filter(answered).length;
  const open = GOALS.length - held;

  // ── THE DRAWINGS READ ONTO NO GOAL, COUNTED RATHER THAN REMEMBERED ────────────
  // This line used to name one drawing from a hand-written list, and on 25 November the
  // wall held four that no goal names: Francis's "Urbanisation and Sanitation…", "Heat's Got
  // Nowhere to Hide!", "The Game's Gone Green!" and "Hidden in Plain Sight". So the page was
  // telling a cartoonist his drawing had been read when it had not — and worse, it would go
  // stale again the moment a new drawing arrived, which is exactly what Sunday is for.
  //
  // Which drawings are unread is arithmetic, not an editorial judgement: it is the wall minus
  // the titles the goals name. So it is counted here from the wall itself, and it cannot drift.
  // What a drawing MEANS is still hand-written in cartoonGoals.js, and still has to earn its
  // place — that rule is untouched.
  const placedTitles = useMemo(
    () => new Set(GOALS.flatMap((g) => g.drawings.map((d) => d.title))),
    []
  );
  const unplaced = useMemo(
    () => cartoons.filter((c) => c.title && !placedTitles.has(c.title)).map((c) => c.title),
    [cartoons, placedTitles]
  );
  const shown = waitingOnly ? GOALS.filter((g) => !answered(g)) : GOALS;

  return (
    <section className="cartoon-goals" id="cartoon-goals" aria-labelledby="cartoon-goals-title">
      <header className="cartoon-goals-head">
        <p className="cartoon-goals-eyebrow">The wall, read against the goals</p>
        <h2 id="cartoon-goals-title" className="cartoon-goals-title">Seventeen goals. One wall.</h2>
        {/* ── THE LEDE, CUT TO THE TWO SENTENCES THAT ARE DOING WORK ────────────
            It used to open by explaining the campaign to the people who have been drawing it
            for fourteen years, and then explain the room's method in four clauses. Both are
            true and both belong in the record — but a reader standing at a wall of drawings
            does not need either to open a goal. What is kept is the promise the section
            actually makes: the goal's sentence, the cartoonists' sentences, and the page to
            check them on. */}
        <p className="cartoon-goals-lede">
          CartoonAFRICA has carried an SDG cartoon campaign since 2012, so this room does not
          explain the goals to the people who have been drawing them. Open any goal: the goal’s
          own sentence, the cartoonists’ own sentences, and the page where you can check both.
        </p>
        <p className="cartoon-goals-method">
          This reading is the record’s own, made from each drawing’s published line. It is not
          the United Nations’ reading, and the UN has not endorsed this room.
        </p>
      </header>

      <div className="cartoon-goals-bar">
        <p className="cartoon-goals-count">
          <span><strong>{held}</strong> of 17 goals answered</span>
          <span><strong>{open}</strong> still waiting for a drawing</span>
        </p>
        <button
          type="button"
          className="cartoon-goals-filter"
          aria-pressed={waitingOnly}
          onClick={() => setWaitingOnly((v) => !v)}
        >
          {waitingOnly ? 'Show all seventeen' : 'Show only the blank ones'}
        </button>
      </div>

      <ol className="cartoon-goals-list">
        {shown.map((goal) => (
          <GoalRow
            key={goal.n}
            goal={goal}
            art={art}
            open={openGoal === goal.n}
            onToggle={() => setOpenGoal((current) => (current === goal.n ? null : goal.n))}
          />
        ))}
      </ol>

      <div className="cartoon-goals-foot">
        {unplaced.length > 0 && (
          <p>
            {unplaced.length === 1 ? 'One drawing' : `${unplaced.length} drawings`} (
            {unplaced.length === 1
              ? unplaced[0]
              : `${unplaced.slice(0, -1).join(', ')} and ${unplaced[unplaced.length - 1]}`}
            ) {unplaced.length === 1 ? 'is' : 'are'} read onto no goal at all, and{' '}
            {unplaced.length === 1 ? 'is' : 'are'} left where they are. A room that puts every
            drawing somewhere has stopped looking at them.
          </p>
        )}
        <p>
          {GOALS_SOURCE.line}{' '}
          <a href={GOALS_SOURCE.url} target="_blank" rel="noopener noreferrer">{GOALS_SOURCE.name} ↗</a>
        </p>
        <p className="cartoon-goals-ask">
          {/* This said "it is the workshop's brief", which put a drawing exercise into an hour
              that has none — the same fault as the nineteen-minute slot, one paragraph down.
              A blank goal is not a task set for the room on Sunday. It is simply a place where
              a cartoonist could put something. */}
          {open} goals are still blank. Not a gap to be hidden — a place a cartoonist could put
          something. <a href="#cartoon-your-turn">Send one in →</a>
        </p>
      </div>
    </section>
  );
}