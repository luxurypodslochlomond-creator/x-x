import React from 'react';
import { Link } from 'react-router-dom';
import { stripHref } from '@/components/climate/cartoons/comicStories';

// Janine's list of the smallest gestures. Not advice, not a campaign — the things a
// person can start today with nothing bought and nothing asked of anyone. x = x.

// Mangrove planting was on this list. Janine asked for it to stand on its own — it is a
// major item on the record, not a small gesture. It now lives under the Mangroves
// category and its own entries, the Bonaire film among them.

// Every line here has a cartoon of its own in the room, and tapping it opens that strip:
// the gestures and the drawings are one thing on this record, not two lists that agree.
const GESTURES = [
  'Repairing a sweater / cardigan',
  'Buying less',
  'Walking',
  'Using mass transportation',
  'Not wasting food',
];

export default function SmallGesturesBand() {
  return (
    <section className="px-4 py-7">
      <div className="flex items-baseline gap-2.5 mb-2">
        <h2
          className="text-[#141210]"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(26px, 6.8vw, 40px)', lineHeight: 1.02, letterSpacing: '-0.02em', fontWeight: 400 }}
        >
          The smallest gestures
        </h2>
      </div>
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
        Small enough to start today, and free.
      </p>
      <div className="flex flex-wrap gap-2">
        {GESTURES.map(gesture => (
          <Link
            key={gesture}
            to={stripHref(gesture)}
            className="px-3 py-2 bg-[#f7f1e5] border-2 border-[#141210] text-[11px] font-black font-mono uppercase tracking-wide text-[#141210] underline decoration-transparent hover:decoration-[#141210] hover:bg-[#efe7d6] active:translate-y-px active:bg-[#141210] active:text-[#f7f1e5] transition-colors"
          >
            {gesture}
          </Link>
        ))}
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-3">
        Tap one to see its cartoon. From Janine Selendy's own list for the record.
      </p>
    </section>
  );
}