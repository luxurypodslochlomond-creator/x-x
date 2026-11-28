import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import WallCoverViewer from '@/components/climate/cartoons/WallCoverViewer';
import { CARTOON_EVENT, CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';
import { buildWorkshopCard, WORKSHOP_CARD } from '@/components/climate/cartoons/workshopCard';
import { recordAddress } from '@/components/climate/recordAddress';

// ── THE INVITATION, SET AS A PLATE RATHER THAN A CARD ─────────────────────────
// It was a six-rem thumbnail in a cream box with a column of small grey lines beside it:
// a listing, not an invitation, and the cover — a real drawing by the man who edits the
// book — was the smallest thing in the room.
//
// So the cover is printed at the width a print deserves, the words are set as the record
// sets its own bands (red caps, a rule, then the name), and the one thing a person does
// with this — send it on — is a single line rather than a row of buttons. Nothing was
// added that the room could not already prove: the hour, the host, the place, the credit.
export default function WallEventNotice() {
  const [looking, setLooking] = useState(false);
  // The host's joining details, pasted once by whoever holds the Zoom. Printed on the card
  // they share; never sent to the record, never stored, gone when the page closes.
  const [join, setJoin] = useState('');

  return <aside className="wall-event-notice" aria-label="The biennial and Janine’s climate hour">
    <div className="wall-event-plate">
      <button type="button" className="wall-event-cover" onClick={() => setLooking(true)} aria-label="Open the catalogue cover full size">
        <img src={CARTOON_COVER} alt="CartoonAFRICA’s catalogue cover, drawn by Francis Umendu Odupute" decoding="async" />
        <span className="wall-art-mark" aria-hidden="true"><Maximize2 size={19} /></span>
      </button>
      <p className="wall-event-credit">{CARTOON_EVENT.coverArt}</p>
    </div>

    <div className="wall-event-band">
      <p className="wall-event-kicker">CartoonAFRICA · National Museum, Benin City · {CARTOON_EVENT.when}</p>
      <p className="wall-event-name">{CARTOON_EVENT.title}</p>
      <p className="wall-event-host">Online workshop led by Janine Selendy · Horizon International, Yale</p>
      <p className="wall-event-when">Sunday 29 November · 2pm UK · 9am EST · 3pm West Africa · one hour · free · no account</p>

      <div className="wall-event-actions">
        <ShareCardButton iconOnly entry={{ ...WORKSHOP_CARD, join }} build={buildWorkshopCard} label="Share the workshop invitation" includeMessage windowTitle="Workshop invitation" link={recordAddress('/ClimateWorkshop')} description={CARTOON_EVENT.shareLine} alt={`The CartoonAFRICA workshop invitation. ${CARTOON_EVENT.coverArt}.`} />
        <Link to="/ClimateCartoons/Share">Invitation text</Link>
      </div>

      <details className="wall-event-join">
        <summary>Workshop details</summary>
        <p className="wall-event-note"><Link to="/ClimateWorkshop#workshop-agenda">Janine’s draft agenda</Link> · subject to change.</p>
        <label className="wall-event-note" htmlFor="wall-host-joining">Host’s Zoom link and passcode</label>
        <p className="wall-event-note">Only on the invitation you make here. Not saved to the record.</p>
        <textarea id="wall-host-joining" value={join} onChange={(event) => setJoin(event.target.value)} rows={3} placeholder="Join here: https://… · passcode: …" aria-label="Joining link and passcode from the host" />
        <p className="wall-event-note">{join.trim() ? 'These words will be printed on the card.' : 'Left empty, the card says the joining details come from the host.'}</p>
      </details>
    </div>

    {looking && <WallCoverViewer onClose={() => setLooking(false)} />}
  </aside>;
}