import React, { useMemo } from 'react';
import { GOALS, UNPLACED, GOALS_SOURCE } from '@/components/climate/cartoons/cartoonGoals';
import '@/components/climate/cartoons/cartoon-goals.css';

// ── SEVENTEEN GOALS, ONE WALL, AND THE GAPS PRINTED ───────────────────────────
// This is the room's answer to the campaign Francis has been running since 2012. It does
// not congratulate the wall. It counts it, reads each drawing against the goal its own line
// is about, and prints the goals nobody has drawn yet as open space — which is the only
// honest way to show a workshop what is still missing.
export default function CartoonGoals() {
  const { held, open, drawn } = useMemo(() => ({
    held: GOALS.filter((g) => g.drawings.length).length,
    open: GOALS.filter((g) => !g.drawings.length).length,
    drawn: new Set(GOALS.flatMap((g) => g.drawings)).size,
  }), []);

  return (
    <section className="cartoon-goals" id="cartoon-goals" aria-labelledby="cartoon-goals-title">
      <header className="cartoon-goals-head">
        <p className="cartoon-goals-eyebrow">The wall, read against the goals</p>
        <h2 id="cartoon-goals-title" className="cartoon-goals-title">Seventeen goals. One wall.</h2>
        <p className="cartoon-goals-lede">
          CartoonAFRICA has been carrying an SDG cartoon campaign since 2012, and it travelled
          to the UN SDG Global Festival of Action in Bonn in May 2019. So this room does not
          explain the goals to the people who have been drawing them for fourteen years. It
          does the thing paper cannot: it reads the wall as it stands today against all
          seventeen, and prints the ones still waiting for a pen.
        </p>
        <p className="cartoon-goals-method">
          This reading is the record’s own, made from each drawing’s published line — not the
          artist’s claim about their work, and not the United Nations’ reading of anything.
          The record does not speak for the UN, and the UN has not endorsed this room.
        </p>
      </header>

      <p className="cartoon-goals-count">
        <span><strong>{held}</strong> of 17 goals answered</span>
        <span><strong>{open}</strong> still waiting for a drawing</span>
        <span><strong>{drawn}</strong> drawings counted</span>
      </p>

      <ol className="cartoon-goals-list">
        {GOALS.map((goal) => {
          const has = goal.drawings.length > 0;
          return (
            <li key={goal.n} className={`cartoon-goal${has ? '' : ' cartoon-goal--open'}`}>
              <span className="cartoon-goal-number" aria-hidden="true">{String(goal.n).padStart(2, '0')}</span>
              <div>
                <h3 className="cartoon-goal-name">{goal.name}</h3>
                {has ? (
                  <p className="cartoon-goal-drawings">{goal.drawings.join(' · ')}</p>
                ) : (
                  <p className="cartoon-goal-open">No drawing yet</p>
                )}
              </div>
            </li>
          );
        })}
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