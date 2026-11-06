import React, { useState } from 'react';
import { Play } from 'lucide-react';

// The record's films open when tapped, never by themselves. A still frame costs almost
// nothing on a phone with expensive data; a film that starts on its own spends money
// nobody agreed to spend and takes the choice away from the reader. So: a still,
// a tap, then the film. Nothing loads until the tap — neither a YouTube embed nor a
// master video file.

const youtubeId = (url = '') => {
  const match = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
};

// A film given to the record as its own file — Dillon's Stoneymollan film — plays
// natively: no third party in the middle, and the picture comes straight from us.
const fileVideo = (url = '') => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(String(url));

export default function TapToPlayFilm({ url, title, credit, poster, compact = false }) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(url);
  const isFile = !id && fileVideo(url);
  if (!id && !isFile) return null;

  return (
    <figure className={`mt-4 border-2 border-[#141210] bg-[#141210]${compact ? ' w-[190px] max-w-full sm:w-[240px]' : ''}`}>
      {playing ? (
        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
          {id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          ) : (
            <video
              src={url}
              poster={poster}
              title={title}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play the film: ${title}`}
          className="relative block w-full text-left"
          style={{ aspectRatio: '16 / 9' }}
        >
          {id || poster ? (
            <img
              src={id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(1.06) contrast(1.04)' }}
            />
          ) : null}
          <span className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,18,16,0.1), rgba(20,18,16,0.74))' }} />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
            <span className={`${compact ? 'w-9 h-9' : 'w-14 h-14'} flex items-center justify-center rounded-full bg-[#3fbf7f] border-2 border-[#141210]`}>
              <Play className={compact ? 'w-4 h-4 text-[#141210]' : 'w-6 h-6 text-[#141210]'} fill="#141210" />
            </span>
            {!compact && (
              <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#efe7d6] text-center">
                Tap to play · it never plays by itself
              </span>
            )}
          </span>
        </button>
      )}
      {credit && (
        <figcaption className="px-3 py-2 bg-[#efe7d6] border-t-2 border-[#141210] text-[10px] font-mono text-[#5a5246]">
          {credit}
        </figcaption>
      )}
    </figure>
  );
}