import React, { useState } from 'react';
import { goalColour, goalNumberInk } from '@/components/climate/cartoons/goalColours';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import GoalDrawings from '@/components/climate/cartoons/GoalDrawings';

export default function GoalRow({ goal, count, countFailed, open, onToggle }) {
  const [offering, setOffering] = useState(false);
  const panelId = `goal-panel-${goal.n}`;
  const buttonId = `goal-button-${goal.n}`;
  return <li className={`cartoon-goal${open ? ' is-open' : ''}`}>
    <button id={buttonId} type="button" className="cartoon-goal-head" aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={onToggle}>
      <span className="cartoon-goal-number" style={{ background: goalColour(goal.n), color: goalNumberInk(goal.n) }}>{String(goal.n).padStart(2, '0')}</span>
      <span className="cartoon-goal-name">{goal.name}</span>
      <span className="cartoon-goal-meta" aria-live="polite"><strong>{count === null ? '—' : count}</strong><span>{count === null ? (countFailed ? 'not checked' : 'counting…') : count === 1 ? 'drawing' : 'drawings'}</span></span>
      <span className="cartoon-goal-cue" aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    {open && <div className="cartoon-goal-panel" id={panelId} role="region" aria-labelledby={buttonId}>
      <div className="cartoon-goal-asks">
        <p className="cartoon-goal-label">In the UN’s own words</p>
        <p className="cartoon-goal-asks-text">{goal.asks}</p>
        <a className="cartoon-goal-link" href={goal.url} target="_blank" rel="noopener noreferrer">Goal {goal.n} · {goal.targets} targets · the UN’s own page ↗</a>
      </div>
      <GoalDrawings goal={goal} />
      <div className="cartoon-goal-door">
        {offering ? <CartoonSendIn goal={goal.n} /> : <>
          <button type="button" className="cartoon-goal-door-open" onClick={() => setOffering(true)}>Offer a drawing for goal {goal.n} · {goal.name}</button>
          <p className="cartoon-goal-door-note">Your choice of goal stays with the drawing. A custodian checks it before publication.</p>
        </>}
      </div>
    </div>}
  </li>;
}