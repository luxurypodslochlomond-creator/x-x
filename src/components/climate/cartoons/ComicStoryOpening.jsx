import React from 'react';
import { comicStories } from '@/components/climate/cartoons/comicStories';

export default function ComicStoryOpening({ active, onSelect }) {
  return (
    <>
      <header className="cartoon-fiction-head">
        <p className="comic-opening-eyebrow record-meta">A little fiction. A real-world nudge.</p>
        <h2 className="comic-section-title">The little things.</h2>
        <p className="record-meta">A blackbird, a stone, and another way to look at what we already have. AI-illustrated fiction, separate from the human wall.</p>
      </header>
      <nav className="cartoon-story-reel" aria-label="Choose one of the seven illustrated stories">
        {comicStories.map((story, index) => <button key={story.id} type="button" aria-current={active === index ? 'true' : undefined} onClick={() => onSelect(index)}>
          <img src={story.image} alt="" loading="lazy" decoding="async" /><span>{story.gesture || story.title}</span>
        </button>)}
      </nav>
    </>
  );
}