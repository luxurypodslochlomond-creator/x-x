import React from 'react';
import { BurstMark } from '@/components/climate/cartoons/CartoonInkIcons';

// ── ONE PANEL OF A PRINTED COMIC ────────────────────────────────────────────────
// Number stamped on, the gesture in a box, the bird's question in a balloon over the
// drawing, the stone's answer in the caption box in the panel's own foot, and what the
// strip is for under a starburst. The drawing itself is untouched: every mark here is
// furniture on the paper around it.
export default function ComicPanel({ story, index }) {
  return (
    <article className={`comic-panel comic-panel-${story.id}`} aria-label={`Cartoon ${index + 1}: ${story.title}`}>
      <div className="comic-panel-heading">
        <span className="comic-number" aria-hidden="true">0{index + 1}</span>
        <h2>{story.title}</h2>
      </div>
      {story.gesture && (
        <p className="comic-gesture record-meta" dir="auto">Smallest gesture · {story.gesture}</p>
      )}
      <figure className="comic-frame">
        <div className="comic-stage">
          <p className="comic-speech record-meta" dir="auto">{story.question}</p>
          <img src={story.image} alt={story.alt} width="1024" height="1024" loading="eager" fetchPriority="high" draggable="false" />
        </div>
        <figcaption className="comic-ending">
          <p className="comic-reply record-meta" dir="auto">{story.reply}</p>
        </figcaption>
      </figure>
      <p className="comic-theme record-meta"><BurstMark size={18} /><span>{story.theme}</span></p>
    </article>
  );
}