import React from 'react';
import { Link } from 'react-router-dom';
import PeaceBell from '@/components/climate/PeaceBell';

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
        <div className="mt-1 border-t border-record-bone/25 px-4 pt-3">
          <Link to="/XEqualsX" className="bg-cartoon-sun px-2 py-1 record-header-type text-xs font-bold tracking-[0.2em] text-record-red underline decoration-dotted underline-offset-4">x = x</Link>
        </div>
      </div>
    </section>
  );
}