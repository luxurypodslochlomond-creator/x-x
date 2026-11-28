import React, { useState } from 'react';
import WallCoverViewer from '@/components/climate/cartoons/WallCoverViewer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { CARTOON_EVENT, CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';
import { buildWorkshopCard, WORKSHOP_CARD } from '@/components/climate/cartoons/workshopCard';
import { recordAddress } from '@/components/climate/recordAddress';

export default function WallEventNotice() {
  const [looking, setLooking] = useState(false);
  // ── THE HOST'S JOINING DETAILS, ON THE CARD ────────────────────────────────
  // The card said "joining link and passcode: supplied by the host" and there was nowhere
  // on the wall to supply them, so the card could never carry the thing Alina asked for.
  // Whoever holds the Zoom pastes it here; it is printed on the card they share and it is
  // never sent to the record — it lives in this box until the page is closed.
  const [join, setJoin] = useState('');
  return <aside className="wall-event-notice" aria-label="The biennial and Janine’s climate hour">
    <button type="button" className="wall-event-cover" onClick={() => setLooking(true)} aria-label="Enlarge the catalogue cover by Francis Umendu Odupute"><img src={CARTOON_COVER} alt="CartoonAFRICA’s catalogue cover, drawn by Francis Umendu Odupute" decoding="async" /><span>Enlarge</span></button>
    <div><p className="wall-event-kicker">CartoonAFRICA · Benin City · {CARTOON_EVENT.when}</p>
      <p className="wall-event-name">{CARTOON_EVENT.title}</p>
      <p className="wall-event-host">Online workshop led by Janine Selendy · part of CartoonAFRICA at the National Museum, Benin City</p>
      <p>Sunday 29 November · 9am EST · 2pm UK · 3pm West Africa · online</p>
      <p className="wall-event-note">The host supplies the joining link. Add it to your own invite before sharing.</p>
      <div className="wall-event-actions"><Link to="/ClimateWorkshop">The hour and the people</Link><Link to="/ClimateCartoons/Share">Add joining details</Link>
        <ShareCardButton compact entry={{ ...WORKSHOP_CARD, join }} build={buildWorkshopCard} label="Share the picture" icon={ArrowRight} includeMessage link={recordAddress('/ClimateWorkshop')} description={CARTOON_EVENT.shareLine} alt={`The CartoonAFRICA workshop invitation. ${CARTOON_EVENT.coverArt}.`} />
      </div>
      <details className="wall-event-join">
        <summary>Joining details for the invite</summary>
        <p className="wall-event-note">Paste the host’s Zoom link and passcode. They are printed on the card you share and are never sent to the record or stored.</p>
        <textarea value={join} onChange={(event) => setJoin(event.target.value)} rows={3} placeholder="Join here: https://… · passcode: …" aria-label="Joining link and passcode from the host" />
        <p className="wall-event-note">{join.trim() ? 'These words will be printed on the card.' : 'Empty, the card says the joining details come from the host.'}</p>
      </details>
      <p className="wall-event-credit">{CARTOON_EVENT.coverArt}</p>
    </div>
    {looking && <WallCoverViewer onClose={() => setLooking(false)} />}
  </aside>;
}