import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── WHAT PEOPLE SAID, IN THEIR OWN HAND ────────────────────────────────────────
// The lines left under one track, drawn exactly as they were written. There is no count
// over them and none is kept in view: nothing here is a score for the artist, and no
// line stands above another. A line a keeper took down for breaking the law is not
// published, so it never reaches this list. An unnamed line is named as what it is,
// because a line is a person's either way.

export default function WordsList({ trackId, reloadKey }) {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { items } = await base44.entities.ClimateWord.filter(
          { track_id: trackId, status: 'published' },
          { sort: 'created_date', limit: 50 },
        );
        if (alive) setLines(items);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [trackId, reloadKey]);

  if (loading) {
    return <p className="mt-3 text-[10px] font-mono text-[#5a5246]">Bringing the lines through…</p>;
  }

  if (lines.length === 0) {
    return (
      <p className="mt-3 text-[11px] font-mono text-[#5a5246] leading-relaxed">
        No one has said anything about this one yet.
      </p>
    );
  }

  return (
    <ul className="mt-3 space-y-3">
      {lines.map((line) => (
        <li key={line.id} className="border-l-4 border-l-[#1a1612]/20 pl-3">
          <p className="text-[13px] font-mono text-[#141210] leading-relaxed whitespace-pre-wrap">{line.word}</p>
          <p className="mt-1 text-[9px] font-mono uppercase tracking-[0.18em] text-[#5a5246]">
            {line.listener_name ? `${line.listener_name}, a listener` : 'A listener'}
          </p>
        </li>
      ))}
    </ul>
  );
}