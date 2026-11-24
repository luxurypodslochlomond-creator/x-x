import React from 'react';
import '@/components/climate/record-home.css';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildRecordShareCard } from '@/components/climate/shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from '@/components/climate/shareRecordCard';
import CoverPhotoPlates from '@/components/climate/CoverPhotoPlates';

const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

// ── THE PAINTING IS THE GROUND NOW, NOT A PLATE ON THE PAGE ────────────────────
// This block used to open with the painting in a rounded frame, then the record's name
// under it — a second copy of the work the page was already standing on. The painting is
// the room (record-home-opening.css), Jane speaks on it, and the sentence that names the
// record sits directly under her. What is left here is what a reader needs next: the
// photographs, and the way to pass the record on.
export default function RecordCoverPlate({ copy }) {
  return (
    <section aria-label="Photographs on the record" className="record-cover-plate record-home-opening w-full border-t-4 border-record-red text-record-ink">
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-5 lg:px-10">
        <CoverPhotoPlates />
        {/* One way to pass the record on, and it sits centred under the photographs on a
            phone instead of hanging off the right end of a hairline by itself. */}
        <div className="mt-4 flex justify-center border-t border-record-ink/15 py-3 lg:justify-end">
          <ShareCardButton entry={RECORD_CARD} build={buildRecordShareCard} link={RECORD_LINK} description={copy.sub} previewFirst inline />
        </div>
      </div>
    </section>
  );
}