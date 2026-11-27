import React from 'react';
import PeaceBell from '@/components/climate/PeaceBell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildRecordShareCard } from '@/components/climate/shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE, RECORD_SHARE_LINE } from '@/components/climate/shareRecordCard';
import '@/components/climate/record-home-opening.css';

// One painting, Jane's words, the record's own sentence, and one way to pass it on.
export default function RecordHomeVoice({ copy }) {
  return (
    <section
      aria-labelledby="record-home-title"
      className="record-home-voice relative z-10 px-5 py-6 text-center record-header-type text-record-bone lg:px-10 lg:py-10"
    >
      <div className="record-home-quotation mx-auto flex max-w-[760px] flex-col items-center gap-3">
        <p className="record-header-type text-xs uppercase text-record-bone/75">A voice on the record</p>
        <PeaceBell size={36} color="rgb(var(--cartoon-sun))" href="https://webtv.un.org/en/asset/k13/k13z7vjtvs" />
        <blockquote className="record-header-type uppercase not-italic text-cartoon-sun">
          “Every single day, we hold the power to shape the world around us.”
        </blockquote>
        <div className="flex flex-col items-center gap-1 bg-cartoon-sun px-4 py-2.5 record-header-type text-xs font-bold uppercase tracking-[0.08em] text-record-red">
          <p className="record-header-type text-xs font-bold uppercase">Dr. Jane Goodall</p>
          <a href="https://janegoodall.org/" target="_blank" rel="noopener noreferrer" className="record-header-type font-bold underline decoration-dotted underline-offset-4">
            the Jane Goodall Institute
          </a>
        </div>
      </div>

      <div className="record-home-title-block mx-auto mt-6 max-w-[900px] lg:mt-8">
        <h1 id="record-home-title" className="record-home-title record-opening-title">
          {copy.title_a}{' '}
          <span className="text-cartoon-sun">{copy.title_b}</span>{' '}
          {copy.title_c}
        </h1>
        {/* ── ONE DOOR, AND EVERY ROOM BEHIND IT ────────────────────────────────────
            There were two yellow plates here, and the second one — "Post to LinkedIn" —
            was a garish patch over a fault that belonged to the share itself: on live, the
            share handed the phone's sheet a picture and the window (with the code, the words
            and every named door, LinkedIn among them) never opened at all. Brian: "shouldn't
            have LinkedIn big garish button like that… sharing needs to work when published."

            He is right, so the patch is gone and the fault is mended where it lived. One
            plate, and the window behind it carries LinkedIn, the code and the rest of the
            world on every device. */}
        <div className="record-home-pass mt-3">
          <span className="record-header-type text-xs uppercase tracking-[0.12em] text-record-bone">{copy.service}</span>
          <ShareCardButton
            entry={{ id: 'record-of-the-time', title: RECORD_SHARE_TITLE }}
            build={buildRecordShareCard}
            link={RECORD_LINK}
            description={RECORD_SHARE_LINE}
            label="Share the record"
            instant
            includeMessage
            inline
            windowTitle="Share the record"
            alt="The record’s painting: the living Earth beneath a star-filled sky"
          />
        </div>
      </div>
    </section>
  );
}