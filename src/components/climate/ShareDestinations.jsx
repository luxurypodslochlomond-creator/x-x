import React from 'react';
import { SHARE_GROUPS } from '@/components/climate/shareDestinations';

// ── THE LIST, NOT THE GRID ────────────────────────────────────────────────────
// Three short lines of names. Nothing is drawn, nothing competes with the painting above
// it, and the whole planet is on it. A door that cannot be opened by a web address says so
// in words beside its name rather than pretending to be a button that does nothing.
export default function ShareDestinations({ link, title, message }) {
  return (
    <div className="space-y-3 border-t border-record-ink/15 pt-3">
      {SHARE_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-record-muted">{group.label}</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {group.doors.map((door) => door.href ? (
              <a
                key={door.name}
                href={door.href({ link, title, message })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-record-ink underline decoration-record-ink/25 underline-offset-4 hover:decoration-record-ink"
              >
                {door.name}
              </a>
            ) : (
              <span key={door.name} className="text-xs text-record-muted">
                <span className="font-bold text-record-ink/70">{door.name}</span> · {door.how}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}