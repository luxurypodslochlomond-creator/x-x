import React, { useMemo, useState } from 'react';
import { GOALS, UNPLACED, GOALS_SOURCE } from '@/components/climate/cartoons/cartoonGoals';
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

  // The wall's real lines, keyed by the drawing's real title, so every quoted sentence in
  // this ledger is the artist's own and can be checked against the drawing above it.
  const lines = useMemo(() => {
    const map = {};
    cartoons.forEach((c) => { if (c.title && c.for_line) map[c.title] = c.for_line; });
    return map;
  }, [cartoons]);

  const held = GOALS.filter((g) => g.drawings.length).length;
  const open = GOALS.length - held;
  const shown = waitingOnly ? GOALS.filter((g) => !g.drawings.length) : GOALS;

  return (
    <section className="cartoon-goals" id="cartoon-goals" aria-labelledby="cartoon-goals-title">
      <header className="cartoon-goals-head">
        <p className="cartoon-goals-eyebrow">The wall, read against the goals</p>
        <h2 id="cartoon-goals-title" className="cartoon-goals-title">Seventeen goals. One wall.</h2>
        <p className="cartoon-goals-lede">
          CartoonAFRICA has been carrying an SDG cartoon campaign since 2012, and it travelled
          to the UN SDG Global Festival of Action in Bonn in May 2019. So this room does not
          explain the goals to the people who have been drawing them for fourteen years. Open
          any goal: it gives you the goal’s own sentence, the cartoonists’ own sentences, and
          the page where you can check both.
        </p>
        <p className="cartoon-goals-method">
          This reading is the record’s own, made from each drawing’s published line — not the
          artist’s claim about their work, and not the United Nations’ reading of anything. The
          record does not speak for the UN, and the UN has not endorsed this room.
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
            lines={lines}
            open={openGoal === goal.n}
            onToggle={() => setOpenGoal((current) => (current === goal.n ? null : goal.n))}
          />
        ))}
      </ol>

      <div className="cartoon-goals-foot">
        {UNPLACED.length > 0 && (
          <p>
            One drawing in the room, {UNPLACED.join(' and ')}, is read onto no goal at all. It
            is left where it is rather than forced onto one: a room that puts every drawing
            somewhere has stopped looking at them.
          </p>
        )}
        <p>
          {GOALS_SOURCE.line}{' '}
          <a href={GOALS_SOURCE.url} target="_blank" rel="noopener noreferrer">{GOALS_SOURCE.name} ↗</a>
        </p>
        <p className="cartoon-goals-ask">
          {open} goals are still blank. On 29 November that is not a gap in the record — it is
          the workshop’s brief. <a href="#cartoon-your-turn">Draw one →</a>
        </p>
      </div>
    </section>
  );
}