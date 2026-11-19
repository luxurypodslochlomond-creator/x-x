import React from 'react';
import { Link } from 'react-router-dom';
import PeaceBell from '@/components/climate/PeaceBell';
import { MarkSignal, MarkWall } from '@/components/climate/RecordFootMarks';

export default function RecordHomeVoice() {
  return (
    <section aria-label="A voice on the record" className="record-home-voice relative z-10 border-t border-record-bone/25 px-5 py-7 text-center record-header-type text-record-bone lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
        <p className="record-header-type text-xs uppercase text-record-bone/75">A voice on the record</p>
        <PeaceBell size={40} color="rgb(var(--cartoon-sun))" href="https://webtv.un.org/en/asset/k13/k13z7vjtvs" />
        <blockquote className="record-header-type uppercase not-italic text-cartoon-sun">
          “Every single day, we hold the power to shape the world around us.”
        </blockquote>
        <div className="flex flex-col items-center gap-1.5 bg-cartoon-sun px-4 py-3 record-header-type text-xs font-bold uppercase tracking-[0.08em] text-record-red">
          <p className="record-header-type text-xs font-bold uppercase">Dr. Jane Goodall</p>
          <a href="https://janegoodall.org/" target="_blank" rel="noopener noreferrer" className="record-header-type font-bold underline decoration-dotted underline-offset-4">
            the Jane Goodall Institute
          </a>
        </div>
        <nav aria-label="Continue through the record" className="mt-1 flex flex-wrap items-center justify-center gap-3 border-t border-record-bone/25 px-4 pt-4">
          <Link to="/ClimateWire" className="inline-flex min-h-11 items-center gap-2 bg-record-paper px-4 py-2 text-sm text-record-ink hover:bg-record-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal">
            <MarkSignal size={26} /> Signals →
          </Link>
          <Link to="/ClimateCartoons" className="inline-flex min-h-11 items-center gap-2 bg-record-paper px-4 py-2 text-sm text-record-ink hover:bg-record-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal">
            <MarkWall size={26} /> The Wall →
          </Link>
        </nav>
        <div className="px-4 pt-1">
          <Link to="/XEqualsX" className="bg-cartoon-sun px-2 py-1 record-header-type text-xs font-bold tracking-[0.2em] text-record-red underline decoration-dotted underline-offset-4">x = x</Link>
        </div>
      </div>
    </section>
  );
}