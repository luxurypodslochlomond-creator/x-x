import React from 'react';
import { goToDrawing } from '@/components/climate/cartoons/goToDrawing';

export default function GoalDrawing({ piece, goal }) {
  const reading = goal.drawings.find(({ title }) => title === piece.title);
  return <li className="cartoon-goal-line">
    {piece.display_image_url && <button type="button" className="cartoon-goal-line-art" onClick={() => goToDrawing(piece.id)} aria-label={`See ${piece.title || 'the drawing'} by ${piece.artist_name} on the wall`}>
      <img src={piece.display_image_url} alt={piece.title || `Drawing by ${piece.artist_name}`} loading="lazy" />
    </button>}
    <span className="cartoon-goal-line-title">{piece.title || 'Untitled'} · {piece.artist_name}</span>
    {reading?.why ? <span className="cartoon-goal-line-why">The record’s reading: {reading.why}</span> : <span className="cartoon-goal-who">Offered for this goal by the sender. Not the record’s reading.</span>}
    {piece.for_line && <span className="cartoon-goal-line-text">{piece.for_line}</span>}
    <span className="cartoon-goal-line-credit">{piece.credit || piece.artist_name}{piece.origin ? ` · ${piece.origin}` : ''}</span>
  </li>;
}