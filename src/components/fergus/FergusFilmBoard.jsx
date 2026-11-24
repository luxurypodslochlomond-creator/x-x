import React from 'react';
import { SHOTS } from '@/components/fergus/videoScript';
import BoardHead from '@/components/fergus/BoardHead';

const PICTURES = ['Clippers close-up.', 'You, cutting hair.', 'The cut, start to finish.', 'Drawing. Piano. Football.', 'Back to the chair.', 'Look at the camera. Finish.'];

// A short picture cue and the spoken line. Full directions stay one tap away.
export default function FergusFilmBoard() {
  return <section className="fergus-board">
    <BoardHead kicker="60 seconds · Higgsfield" title="The film." line="Six shots. Say the line, cut, next." fullTo="/FergusHiggsfieldVideo" fullLabel="Full script" />
    <ol className="fergus-shots">
      {SHOTS.map((shot, index) => <li key={shot.at}>
        <div className="fergus-shot-top"><span className="fergus-shot-n">{String(index + 1).padStart(2, '0')}</span><time>{shot.at}</time></div>
        <p className="fergus-shot-picture">{PICTURES[index]}</p>
        <p className="fergus-shot-say">“{shot.say}”</p>
        <details className="fergus-more"><summary>Camera notes</summary><p>{shot.on}</p><p>{shot.note}</p></details>
      </li>)}
    </ol>
    <p className="fergus-board-note">Film it on your phone. Unlisted on YouTube. Send the link.</p>
  </section>;
}