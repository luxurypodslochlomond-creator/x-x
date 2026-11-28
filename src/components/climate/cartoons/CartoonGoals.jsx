import React, { useEffect, useState } from 'react';
import { GOALS, GOALS_SOURCE } from '@/components/climate/cartoons/cartoonGoals';
import GoalRow from '@/components/climate/cartoons/GoalRow';
import '@/components/climate/cartoons/cartoon-goals.css';

export default function CartoonGoals() {
  const [openGoal, setOpenGoal] = useState(null);
  useEffect(() => {
    const openFromAddress = () => {
      const match = window.location.hash.match(/^#goal-(?:button|panel)-(\d+)$/);
      if (match) setOpenGoal(Number(match[1]));
    };
    openFromAddress();
    window.addEventListener('hashchange', openFromAddress);
    return () => window.removeEventListener('hashchange', openFromAddress);
  }, []);
  return <section className="cartoon-goals" id="cartoon-goals" aria-labelledby="cartoon-goals-title">
    <header className="cartoon-goals-head">
      <p className="cartoon-goals-eyebrow">A way into the same drawings</p>
      <h2 id="cartoon-goals-title" className="cartoon-goals-title">The same wall. Seventeen connections.</h2>
      <p className="cartoon-goals-lede">Choose a goal to follow its drawings. Each connection names whose reading it is; an empty goal stays empty.</p>
      <p className="cartoon-goals-method">Connections are labelled as the record’s reading or the sender’s choice. Neither is a UN endorsement.</p>
    </header>
    <ol className="cartoon-goals-list">{GOALS.map((goal) => <GoalRow key={goal.n} goal={goal} open={openGoal === goal.n} onToggle={() => setOpenGoal((current) => current === goal.n ? null : goal.n)} />)}</ol>
    <div className="cartoon-goals-foot">
      <p>{GOALS_SOURCE.line} <a href={GOALS_SOURCE.url} target="_blank" rel="noopener noreferrer">{GOALS_SOURCE.name} ↗</a></p>
      <p><a href="#press-wall">Back to the drawings</a> · <a href="#cartoon-your-turn">Send a drawing without choosing a goal</a></p>
    </div>
  </section>;
}