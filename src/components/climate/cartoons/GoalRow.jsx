import React from 'react';
import { goToDrawing } from '@/components/climate/cartoons/goToDrawing';

// One goal, closed and open. Closed it is a line of a printed index: number, name, and how
// many drawings stand against it. Open it gives the goal's own words from the UN, then the
// cartoonists' own words from the wall — the two side by side, so nobody has to take the
// record's word for what either of them said.
export default function GoalRow({ goal, open, onToggle, art }) {
  // Only the readings whose drawing is standing on the wall today. A goal cannot be
  // answered by a line in a file: the picture itself has to be there.
  const onWall = goal.drawings.filter((d) => art[d.title]);
  const has = onWall.length > 0;
  const panelId = `goal-panel-${goal.n}`;
  const buttonId = `goal-button-${goal.n}`;

  return (
    <li className={`cartoon-goal${has ? '' : ' cartoon-goal--open'}${open ? ' is-open' : ''}`}>
      <button
        id={buttonId}
        type="button"
        className="cartoon-goal-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="cartoon-goal-number">{String(goal.n).padStart(2, '0')}</span>
        <span className="cartoon-goal-name">{goal.name}</span>
        <span className="cartoon-goal-meta">
          {has
            ? `${onWall.length} drawing${onWall.length === 1 ? '' : 's'}`
            : 'No drawing yet'}
        </span>
        <span className="cartoon-goal-cue" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="cartoon-goal-panel" id={panelId} role="region" aria-labelledby={buttonId}>
          <div className="cartoon-goal-asks">
            <p className="cartoon-goal-label">What the goal asks, in the UN’s own words</p>
            <p className="cartoon-goal-asks-text">{goal.asks}</p>
            <a className="cartoon-goal-link" href={goal.url} target="_blank" rel="noopener noreferrer">
              Goal {goal.n} · {goal.targets} targets · how the world is doing ↗
            </a>
          </div>

          <div className="cartoon-goal-said">
            <p className="cartoon-goal-label">
              {has ? 'What the drawings say, in the artists’ own words' : 'What is missing here'}
            </p>
            {has && (
              <p className="cartoon-goal-note">
                The line in red under each title is the record’s own reason for reading that
                drawing onto this goal. It is not the artist’s claim and not the UN’s reading:
                the drawing opens onto its own place on the wall, where the artist’s line sits
                beside it, and you can judge the reading yourself.
              </p>
            )}
            {has ? (
              <ul className="cartoon-goal-lines">
                {onWall.map(({ title, why }) => {
                  const piece = art[title];
                  return (
                    <li key={title} className="cartoon-goal-line">
                      {piece?.display_image_url && (
                        // The drawing is the door, and it opens onto the drawing itself: the
                        // reader is taken to this picture's own place on the wall, where its
                        // artist, its origin and its line already stand around it.
                        <button
                          type="button"
                          className="cartoon-goal-line-art"
                          onClick={() => goToDrawing(piece.id)}
                          title={`Go to “${title}” on the wall`}
                          aria-label={`Go to “${title}” by ${piece.artist_name} on the wall`}
                        >
                          <img src={piece.display_image_url} alt="" loading="lazy" />
                        </button>
                      )}
                      <span className="cartoon-goal-line-title">{title}</span>
                      {/* The reason, printed before the artist's line on purpose: the claim
                          first, so the claim can be checked against their words underneath. */}
                      {why && <span className="cartoon-goal-line-why">{why}</span>}
                      {piece?.for_line && <span className="cartoon-goal-line-text">{piece.for_line}</span>}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="cartoon-goal-line-text">
                Nothing has been drawn against this goal on this wall. Not a gap in the record —
                the space a cartoonist fills. If you have one, the room takes it.
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}