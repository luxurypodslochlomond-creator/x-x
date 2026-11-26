import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import ShareWord from '@/components/climate/cartoons/share/ShareWord';
import { shareLines, eventLines, descriptionLine, ROOM_ADDRESS, ONE_LINE } from '@/components/climate/cartoons/share/shareLines';

// A heading between the three groups on this page: the description, the event, the room.
const GroupHead = ({ title, note }) => (
  <div className="mt-9 border-t-2 border-record-ink/25 pt-3">
    <h2 className="text-[15px] leading-snug lg:text-[17px]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
    {note && <p className="mt-1 text-[11.5px] leading-snug text-record-muted">{note}</p>}
  </div>
);

// ── CARRYING THE ROOM OUT OF THE CHAT ──────────────────────────────────────────
// The drawings travel hand to hand, and the hand-over is already one tap on the room's own
// page. What was missing was the words: a link dropped into a feed with nothing around it
// says nothing, so the room looked like a poster for something nobody could name.
//
// This page is the words, written for the five places a person actually posts, with the
// count read live from the wall so it can never say a number the room does not hold. It is
// not a marketing page: there is no ask on it beyond looking, and the last line is the
// plainest description of the room there is, for anybody who wants one sentence only.
export default function ClimateCartoonsShare() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const n = await base44.entities.ClimateCartoon.count({ status: 'published' });
        if (live) setCount(n);
      } catch {
        // The words still work without a number; the page never says a figure it cannot read.
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  const description = descriptionLine();
  const event = eventLines();
  const room = shareLines(count);

  return (
    <ClimateRecordShell
      eyebrow="The cartoon room · words to carry it"
      marker="Five places, five sets of words, one address"
      title="Words for wherever you post it"
      statement="The drawings travel hand to hand, and a link on its own says nothing. So here is the room described for the place it is going — a group chat, a caption, a professional feed, a short post, one email — each with the address on the end. It opens with the initiative in Janine Selendy’s own words, because that is the shortest true description of what this room is part of."
      returnTo="/ClimateCartoons"
      returnLabel="The room"
      footer="Every figure on this page is read from the wall itself when the page opens. Nothing here is a claim the room cannot show."
      mobileCompact
      wide
    >
      <div className="flex items-start justify-between gap-3 border-b border-record-ink/15 pb-3">
        <p className="font-mono text-[11px] break-all text-record-ink/80">{ROOM_ADDRESS}</p>
        <CopyLine text={ROOM_ADDRESS} label="Copy address" />
      </div>

      <p className="mt-3 text-[13.5px] leading-relaxed text-record-ink/90 lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
        Copy whichever one fits, and change the words to your own if you would rather. They are written
        plainly on purpose: what the wall is, whose hands are on it, and where to look.
      </p>

      <GroupHead title="What this is · Janine Selendy’s description" note="Her words, unchanged, with her name on them." />
      <ShareWord where={description.where} note={description.note} text={description.text} />

      <GroupHead
        title="The event · 28–30 November, Benin City"
        note="For CEEW and anyone carrying the three days, and the hour on Sunday that is open online."
      />
      {event.map((line) => (
        <ShareWord key={line.id} where={line.where} note={line.note} text={line.text} />
      ))}

      <GroupHead title="The room · the wall itself" note="For anyone you would rather send straight to the drawings." />
      {room.map((line) => (
        <ShareWord key={line.id} where={line.where} note={line.note} text={line.text} />
      ))}

      <section className="mt-7 border-t-2 border-record-ink/25 pt-4">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-red">If you only have one line</p>
          <CopyLine text={ONE_LINE} label="Copy" />
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/90 lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
          {ONE_LINE}
        </p>
      </section>
    </ClimateRecordShell>
  );
}