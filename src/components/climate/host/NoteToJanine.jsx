import React from 'react';
import CopyLine from '@/components/climate/CopyLine';

// ── THE NOTE THAT GOES WITH THE LINK ──────────────────────────────────────────
// Written to be sent as it stands, by Janine, to one person. Short enough that
// somebody reads it on a phone; honest enough that nothing in it has to be taken
// back later. Every claim in it is checkable on the record itself, and the two
// things that are not finished are said out loud rather than left out.

const NOTE = `This is a public record of what is working on climate, and of the crises that need saying out loud. It is kept the way a record is kept, not run the way a feed is run.

Every entry names where it came from and says how well it is known: one source, two independent sources, or an official record. Corrections are made on the entry itself, with the date. Anyone can read it, in any language, without an account, and nothing on it can be paid into a better position.

It is not finished, and it says so where it is not. What it needs now is a host: someone to hold the domain, keep two named people on it, one to decide what goes on and one to keep it running, and about a thousand pounds a year to store it. The whole record exports, so nobody taking it on is trapped by it.

If that is you, or someone you know, the honest place to start is the method page, then the list for the next host.`;

export default function NoteToJanine() {
  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5] p-3 lg:p-4 my-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
          The note to send with the link
        </span>
        <CopyLine text={NOTE} label="Copy note" />
      </div>
      <div className="space-y-2.5">
        {NOTE.split('\n\n').map((para, i) => (
          <p key={i} className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">{para}</p>
        ))}
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-snug mt-3 pt-2 border-t border-[#141210]/15">
        No figures beyond the one cost, no adjectives, nothing that needs a second sentence to defend. Send it to one
        person at a time.
      </p>
    </div>
  );
}