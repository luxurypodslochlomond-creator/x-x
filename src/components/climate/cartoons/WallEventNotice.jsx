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
  return <aside className="wall-event-notice" aria-label="The biennial and Janine’s climate hour">
    <button type="button" className="wall-event-cover" onClick={() => setLooking(true)} aria-label="Enlarge the catalogue cover by Francis Umendu Odupute"><img src={CARTOON_COVER} alt="CartoonAFRICA’s catalogue cover, drawn by Francis Umendu Odupute" decoding="async" /><span>Enlarge</span></button>
    <div><p className="wall-event-kicker">CartoonAFRICA · Benin City · {CARTOON_EVENT.when}</p>
      <p className="wall-event-name">{CARTOON_EVENT.title}</p>
      <p className="wall-event-host">Online workshop led by Janine Selendy · part of CartoonAFRICA at the National Museum, Benin City</p>
      <p>Sunday 29 November · 9am EST · 2pm UK · 3pm West Africa · online</p>
      <p className="wall-event-note">The host supplies the joining link. Add it to your own invite before sharing.</p>
      <div className="wall-event-actions"><Link to="/ClimateWorkshop">The hour and the people</Link><Link to="/ClimateCartoons/Share">Add joining details</Link>
        <ShareCardButton compact entry={WORKSHOP_CARD} build={buildWorkshopCard} label="Share the picture" icon={ArrowRight} includeMessage link={recordAddress('/ClimateWorkshop')} description={CARTOON_EVENT.shareLine} alt={`The CartoonAFRICA workshop invitation. ${CARTOON_EVENT.coverArt}.`} />
      </div>
      <p className="wall-event-credit">{CARTOON_EVENT.coverArt}</p>
    </div>
    {looking && <WallCoverViewer onClose={() => setLooking(false)} />}
  </aside>;
}