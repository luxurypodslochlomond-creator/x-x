import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ComicMasthead from '@/components/climate/cartoons/ComicMasthead';
import CartoonOpening from '@/components/climate/cartoons/CartoonOpening';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import ComicReader from '@/components/climate/cartoons/ComicReader';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonWall from '@/components/climate/cartoons/CartoonWall';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import { CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';
import '@/components/climate/cartoons/cartoon-room.css';
import '@/components/climate/cartoons/cartoon-room-layout.css';
import '@/components/climate/cartoons/cartoon-gallery.css';
import '@/components/climate/cartoons/comic-page.css';
import '@/components/climate/cartoons/cartoon-ink.css';
import '@/components/climate/cartoons/cartoon-spread.css';
// Final composition: one aligned desktop spread; the phone keeps its reading order.
import '@/components/climate/cartoons/cartoon-layers.css';

export default function ClimateCartoons() {
  return (
    <ClimateRecordShell compact className="cartoon-room" eyebrow="The record · the cartoon room"
      returnTo="/TogetherChangeClimate" returnLabel="Back to real-world climate solutions"
      footer="Every contributed cartoon keeps its artist’s name, its origin and the drawer’s own words. A person looks before it goes up.">
      <div className="cartoon-room-plate" style={{ '--comic-cover-layer': `url('${CARTOON_COVER}')` }}>
        <div className="cartoon-cover-spread" style={{ '--comic-opening-art': "url('https://media.base44.com/images/public/6889f31e76713b9cd47e043c/1bd9ee555_generated_image.png')" }}>
          <ComicMasthead />
          <CartoonSignal />
          <div className="comic-event-opening">
            <CartoonCatalogueBand />
            <div className="comic-event-context"><CartoonOpening /></div>
          </div>
        </div>
        <CartoonWall />
        <ComicReader />
        <div className="cartoon-room-notes"><CartoonSessionBand /><CartoonAnthology /></div>
        <div className="cartoon-editorial-foot"><CartoonWhy /><CartoonRoomActions /></div>
        <CartoonSources />
      </div>
    </ClimateRecordShell>
  );
}