import React from 'react';
import { SHOTS } from '@/components/fergus/videoScript';
import BoardHead from '@/components/fergus/BoardHead';

// The film as six cards: the time, what he says, nothing else.
export default function FergusFilmBoard() {
  return <section className="fergus-board">
    <BoardHead kicker="60 seconds · Higgsfield" title="The film." line="Six shots. Say the line, cut, next." fullTo="/FergusHiggsfieldVideo" fullLabel="Full script" />
    <ol className="fergus-shots">
      {SHOTS.map((shot, index) => <li key={shot.at}>
        <div className="fergus-shot-top"><span className="fergus-shot-n">{String(index + 1).padStart(2, '0')}</span><time>{shot.at}</time></div>
        <p className="fergus-shot-say">“{shot.say}”</p>
      </li>)}
    </ol>
    <p className="fergus-board-note">Film it on your phone. Unlisted on YouTube. Send the link.</p>
  </section>;
}