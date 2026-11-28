import React from 'react';
import { Loader2 } from 'lucide-react';
import useGoalDrawings from '@/components/climate/cartoons/useGoalDrawings';
import GoalDrawing from '@/components/climate/cartoons/GoalDrawing';

export default function GoalDrawings({ goal }) {
  const wall = useGoalDrawings(goal, true);
  if (wall.fetchStatus === 'paused') return <p className="cartoon-goal-empty" role="status">Connect to open this goal. Saved drawings can still be read in <a href="#press-wall">Drawings</a>.</p>;
  if (wall.isPending) return <p role="status"><Loader2 size={18} className="inline animate-spin" /> Opening the drawings for this goal…</p>;
  if (wall.isError) return <div role="alert"><p>This goal’s drawings could not be opened.</p><button type="button" className="cartoon-goal-door-open" onClick={() => wall.refetch()}>Try again</button></div>;
  return <div className="cartoon-goal-said">
    <p className="cartoon-goal-label">The drawings connected to this goal</p>
    {wall.drawings.length ? <>
      <p className="cartoon-goal-note">Each note says whether the connection is the record’s reading or the sender’s choice. Select a drawing to see its place on the wall.</p>
      <ul className="cartoon-goal-lines">{wall.drawings.map((piece) => <GoalDrawing key={piece.id} piece={piece} goal={goal} />)}</ul>
    </> : <p className="cartoon-goal-empty">No published drawing is connected to this goal yet. You can offer one below.</p>}
    {wall.hasNextPage && <button type="button" className="cartoon-goal-door-open" disabled={wall.isFetchingNextPage} onClick={() => wall.fetchNextPage()}>{wall.isFetchingNextPage ? 'Opening more…' : 'More drawings for this goal'}</button>}
    {wall.isFetchNextPageError && <p role="alert">More drawings could not be opened. Use “More drawings for this goal” to try again.</p>}
  </div>;
}