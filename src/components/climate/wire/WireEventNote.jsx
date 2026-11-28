import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCartoonShareCard, CARTOON_CARD } from '@/components/climate/cartoons/cartoonCard';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { recordOrigin } from '@/components/climate/recordAddress';
import '@/components/climate/wire/wire-event.css';

// ── THE HOUR, ON THE WIRE, WHERE IT CAN BE PASSED ON ──────────────────────────
// The wire carried every dated thing except the one thing it was asked to carry: the
// climate hour at the biennial. A reader could not tell from this page that Janine
// Selendy was taking the wall into an hour online, what time it is, or that it is online
// at all — and the door to the wall said only "cartoons and the people who draw them",
// which is true of any gallery.
//
// So the hour stands here in its own band, with the facts that make it usable, and the
// card that already exists for it. The joining link is deliberately absent: it is
// Janine's to send, and this record does not publish an address it was not given.
export default function WireEventNote() {
  return <section className="wire-event" aria-labelledby="wire-event-title">
    <p className="wire-event-kicker">Sunday 29 November · 3pm West Africa · 2pm UK · online</p>
    <h2 id="wire-event-title" className="wire-event-title">Janine Selendy takes the wall into an hour.</h2>
    <p className="wire-event-line">
      The founder of Horizon International at Yale leads the climate hour of the 8th CartoonAFRICA
      Biennial in Benin City: the drawings on the wall, the people who made them, and what a cartoon
      can do that a figure cannot. Online. The joining link is hers to send.
    </p>
    <div className="wire-event-doors">
      <ShareCardButton
        compact
        entry={CARTOON_CARD}
        build={buildCartoonShareCard}
        label="Pass the hour on"
        link={`${recordOrigin()}/ClimateCartoons`}
        description={CARTOON_EVENT.shareLine}
        previewFirst
        includeMessage
        windowTitle="Pass the hour on"
        alt="The cover of the CartoonAFRICA 2026 anthology, drawn by Francis Umendu Odupute"
      />
      <Link to="/ClimateWorkshop">The hour, written down</Link>
      <Link to="/ClimateCartoons">The wall of drawings</Link>
    </div>
  </section>;
}