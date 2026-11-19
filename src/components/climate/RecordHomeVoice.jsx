import React from 'react';
import PeaceBell from '@/components/climate/PeaceBell';

// ── A SMALL PLATE, NOT A SECOND MASTHEAD ───────────────────────────────────────
// Her words sit directly under the top navigation, against the red rule, because that is
// the first thing a reader should meet. But the band had grown to a full screen's worth of
// dark rectangle, and Brian saw what that cost the page: "make smaller rectangle bro might
// bring balance coolasfuck to art." The painting below it is the record's art, and a big
// dark block above it was eating the room the art needed. Same words, same bell, same
// attribution — set in a shallower plate, so the art gets the height back.
export default function RecordHomeVoice() {
  return (
    <section aria-label="A voice on the record" className="record-home-voice relative z-10 px-5 py-3.5 text-center record-header-type text-record-bone lg:px-10 lg:py-4">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-2">
        <p className="record-header-type text-[11px] uppercase text-record-bone/70">A voice on the record</p>
        <PeaceBell size={28} color="rgb(var(--cartoon-sun))" href="https://webtv.un.org/en/asset/k13/k13z7vjtvs" />
        <blockquote className="record-header-type uppercase not-italic text-cartoon-sun">
          “Every single day, we hold the power to shape the world around us.”
        </blockquote>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 bg-cartoon-sun px-3 py-1.5 record-header-type text-[11px] font-bold uppercase tracking-[0.08em] text-record-red">
          <p className="record-header-type text-[11px] font-bold uppercase">Dr. Jane Goodall</p>
          <span aria-hidden="true" className="text-record-red/60">·</span>
          <a href="https://janegoodall.org/" target="_blank" rel="noopener noreferrer" className="record-header-type font-bold underline decoration-dotted underline-offset-4">
            the Jane Goodall Institute
          </a>
        </div>
      </div>
    </section>
  );
}