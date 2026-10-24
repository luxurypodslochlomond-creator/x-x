import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';

// ── ONE BAND OF THE BUTTONS PAGE ─────────────────────────────────────────────────
// A heading, a line saying why the band is there, then the buttons themselves.
// Each row states the button's own words and the one thing it does — no more, because
// the point of this page is that nobody has to read a manual. A row with a link IS the
// button: tapping it goes exactly where the button goes. A row behind the keeper's door
// is drawn dashed with a lock, so a reader can see it exists without being sent to it.
export default function GuideBand({ number, heading, note, items }) {
  return (
    <section className="mb-10">
      <div className="flex items-start gap-3 border-b-2 border-[#141210] pb-2 mb-3">
        <span className="text-[11px] font-black font-mono text-[#b3261e] pt-1.5">{number}</span>
        <h2
          className="font-display font-black uppercase text-[#141210] leading-tight"
          style={{ fontSize: 'clamp(20px, 5.4vw, 30px)', letterSpacing: '-0.01em' }}
        >
          {heading}
        </h2>
      </div>

      {note && <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-4">{note}</p>}

      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const body = (
            <>
              <div className="flex items-center gap-2">
                {item.door && <Lock className="w-3 h-3 text-[#b3261e] flex-shrink-0" />}
                {/* A row may carry the record's own mark for the thing it names — the tuning
                    fork for music — rather than a glyph borrowed from the platform it runs on. */}
                {item.icon}
                <span className="text-[11px] font-black font-mono uppercase tracking-wide text-[#141210] group-hover:text-[#b3261e] transition-colors">
                  {item.label}
                </span>
                {item.to && <ArrowRight className="w-3.5 h-3.5 text-[#b3261e] ml-auto flex-shrink-0" />}
              </div>
              <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mt-1.5">{item.what}</p>
            </>
          );

          return item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className="group block bg-[#f7f1e5] border-2 border-[#141210]/25 hover:border-[#e2602a] p-3.5 transition-colors"
            >
              {body}
            </Link>
          ) : (
            <div
              key={item.label}
              className="group block bg-[#efe7d6] border-2 border-dashed border-[#141210]/25 p-3.5"
            >
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}