import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import goalQuery from '@/components/climate/cartoons/goalQuery';
import { GOALS, GOALS_SOURCE } from '@/components/climate/cartoons/cartoonGoals';
import GoalRow from '@/components/climate/cartoons/GoalRow';
import '@/components/climate/cartoons/cartoon-goals.css';

export default function CartoonGoals({ visible = true }) {
  const [openGoal, setOpenGoal] = useState(null);
  const counts = useQuery({
    queryKey: ['cartoon-wall', 'goal-counts', GOALS.map(goal => [goal.n, goal.drawings.map(drawing => drawing.title)])], enabled: visible, staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      // Field-level privacy rules prevent aggregation on this table. Use exact server
      // counts in bounded batches, never infer totals from the first page of drawings.
      const totals = {};
      for (let start = 0; start < GOALS.length; start += 4) {
        await Promise.all(GOALS.slice(start, start + 4).map(async goal => { totals[goal.n] = await base44.entities.ClimateCartoon.count(goalQuery(goal)); }));
      }
      return totals;
    },
  });
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
      <p className="cartoon-goals-eyebrow">The wall against the promises</p>
      <h2 id="cartoon-goals-title" className="cartoon-goals-title">17 goals. Where do we stand?</h2>
      <p className="cartoon-goals-lede">The number beside each goal is the published drawings behind it. Zero means none yet, not that the issue does not matter.</p>
      <p className="cartoon-goals-method">One drawing can speak to several goals. These are the record’s readings or the sender’s choices, not UN approval. Open one to see the work and the reason.</p>
    </header>
    {counts.isError && <p role="alert">The drawing counts could not be checked. <button type="button" className="underline" onClick={() => counts.refetch()}>Try again</button></p>}
    <ol className="cartoon-goals-list">{GOALS.map((goal) => <GoalRow key={goal.n} goal={goal} count={counts.isSuccess ? counts.data[goal.n] : null} countFailed={counts.isError} open={openGoal === goal.n} onToggle={() => setOpenGoal((current) => current === goal.n ? null : goal.n)} />)}</ol>
    <div className="cartoon-goals-foot">
      <p>Connection review · 28 November 2026: the ozone cartoon and “Earth Day” remain on the wall, but their Goal 13 placements have been withdrawn. Ozone depletion alone and a title alone were not sufficient reasons. <a href="https://science.nasa.gov/climate-change/faq/is-the-ozone-hole-causing-climate-change/" target="_blank" rel="noopener noreferrer">NASA on ozone and climate ↗</a></p>
      <p>{GOALS_SOURCE.line} <a href={GOALS_SOURCE.url} target="_blank" rel="noopener noreferrer">{GOALS_SOURCE.name} ↗</a></p>
      <p><a href="#press-wall">Back to the drawings</a> · <a href="#cartoon-your-turn">Send a drawing without choosing a goal</a></p>
    </div>
  </section>;
}