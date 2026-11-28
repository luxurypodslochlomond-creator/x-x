import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { CARTOON_EVENT, CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';
import { buildWorkshopCard, WORKSHOP_CARD } from '@/components/climate/cartoons/workshopCard';
import { recordAddress } from '@/components/climate/recordAddress';

export default function WallEventNotice() {
  return <aside className="wall-event-notice" aria-label="The biennial and Janine’s climate hour">
    <Link to="/ClimateWorkshop" className="wall-event-cover"><img src={CARTOON_COVER} alt="CartoonAFRICA’s catalogue cover, drawn by Francis Umendu Odupute" decoding="async" /></Link>
    <div><p className="wall-event-kicker">CartoonAFRICA · Benin City · {CARTOON_EVENT.when}</p>
      <p className="wall-event-name">Janine Selendy’s climate hour</p>
      <p>Sunday 29 November · 9am EST · 2pm UK · 3pm West Africa · online</p>
      <p className="wall-event-note">The host supplies the joining link. Add it to your own invite before sharing.</p>
      <div className="wall-event-actions"><Link to="/ClimateWorkshop">The hour and the people</Link><Link to="/ClimateCartoons/Share">Add joining details</Link>
        <ShareCardButton compact entry={WORKSHOP_CARD} build={buildWorkshopCard} label="Share the picture" icon={ArrowRight} includeMessage link={recordAddress('/ClimateWorkshop')} description={CARTOON_EVENT.shareLine} alt={`The CartoonAFRICA workshop invitation. ${CARTOON_EVENT.coverArt}.`} />
      </div>
      <p className="wall-event-credit">{CARTOON_EVENT.coverArt}</p>
    </div>
  </aside>;
}