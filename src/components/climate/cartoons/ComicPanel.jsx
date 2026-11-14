import React from 'react';

export default function ComicPanel({ story, index }) {
  return (
    <article className={`comic-panel comic-panel-${story.id}`} aria-label={`Cartoon ${index + 1}: ${story.title}`}>
      <div className="comic-panel-heading">
        <span className="comic-number" aria-hidden="true">0{index + 1}</span>
        <h2>{story.title}</h2>
      </div>
      <figure className="comic-frame">
        <div className="comic-stage">
          <p className="comic-speech record-meta" dir="auto">{story.question}</p>
          <img src={story.image} alt={story.alt} width="1024" height="1024" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" />
        </div>
        <figcaption className="comic-ending">
          <p className="comic-reply record-meta" dir="auto">{story.reply}</p>
        </figcaption>
      </figure>
      <p className="comic-theme record-meta">{story.theme}</p>
    </article>
  );
}