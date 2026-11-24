import React from 'react';
import PeaceBell from '@/components/climate/PeaceBell';
import ArtworkShareButton from '@/components/climate/ArtworkShareButton';
import { IMAGES } from '@/components/climate/categoryImages';
import { RECORD_LINK } from '@/components/climate/shareRecordCard';
import '@/components/climate/record-home-opening.css';

// ── A VOICE, AND THEN THE SENTENCE, ON THE PAINTING ITSELF ─────────────────────
// The front page used to print the painting twice: once as a framed plate under the
// masthead, and once again, screened, behind Jane's voice — and the record's own sentence
// sat under the second copy, so a reader met the same picture twice before meeting the
// record. Brian, 24 November: "sentence together we can change is just below dr Jane and
// not another image of our coolasfuck recited image."
//
// So there is one painting now, and it is the ground of the whole page (see
// record-home-opening.css). Jane speaks on it, and the sentence that names the record
// comes directly under her, in the same room, with nothing printed between them.
export default function RecordHomeVoice({ copy }) {
  return (
    <section
      aria-labelledby="record-home-title"
      className="record-home-voice relative z-10 px-5 py-8 text-center record-header-type text-record-bone lg:px-10 lg:py-11"
    >
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
      </div>

      <div className="mx-auto mt-8 max-w-[900px] lg:mt-10">
        <h1 id="record-home-title" className="record-home-title record-opening-title">
          {copy.title_a}{' '}
          <span className="text-cartoon-sun">{copy.title_b}</span>{' '}
          {copy.title_c}
        </h1>
        <p className="record-header-type mt-4 text-xs uppercase tracking-[0.12em] text-record-bone/80">
          {copy.service}
        </p>
        {/* The painting is no longer printed in a frame, so the way to pass the painting on
            stands beside the sentence instead of under a second copy of it. */}
        <div className="mt-5 flex justify-center">
          <ArtworkShareButton
            imageUrl={IMAGES.cover}
            title="Together We Can Change Climate"
            credit="Cover · painted for the record"
            link={RECORD_LINK}
            id="cover-painting"
          />
        </div>
      </div>
    </section>
  );
}