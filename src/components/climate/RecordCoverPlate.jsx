import React from 'react';
import '@/components/climate/record-home.css';
import CoverPhotoPlates from '@/components/climate/CoverPhotoPlates';

// ── THE PAINTING IS THE GROUND NOW, NOT A PLATE ON THE PAGE ────────────────────
// This block used to open with the painting in a rounded frame, then the record's name
// under it — a second copy of the work the page was already standing on. The painting is
// the room (record-home-opening.css), Jane speaks on it, and the sentence that names the
// record sits directly under her. What is left here is what a reader needs next: the
// photographs, and the way to pass the record on.
export default function RecordCoverPlate() {
  return (
    <section aria-label="Photographs on the record" className="record-cover-plate record-home-opening w-full border-t-4 border-record-red text-record-ink">
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-5 lg:px-10">
        <CoverPhotoPlates />
        {/* The plate is a door, and a door nobody knows is a door is a picture. */}
        <p className="record-header-type mt-2 text-[11px] uppercase tracking-[0.1em] text-record-muted">Tap any photograph to open it</p>

      </div>
    </section>
  );
}