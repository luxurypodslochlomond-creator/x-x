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
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import '@/components/climate/cartoons/cartoon-room.css';
import '@/components/climate/cartoons/cartoon-room-layout.css';
import '@/components/climate/cartoons/cartoon-gallery.css';
import '@/components/climate/cartoons/comic-page.css';

export default function ClimateCartoons() {
  return (
    <ClimateRecordShell
      compact
      className="cartoon-room"
      eyebrow="The record · the cartoon room"
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to real-world climate solutions"
      footer="Every contributed cartoon keeps its artist’s name, its origin and the drawer’s own words. A person looks before it goes up."
    >
      <div className="comic-event-opening">
        <CartoonCatalogueBand />
        <div className="comic-event-context">
          <ComicMasthead />
          <CartoonOpening />
        </div>
      </div>
      <CartoonWall />
      <ComicReader />
      <div className="cartoon-room-notes">
        <CartoonSessionBand />
        <CartoonAnthology />
      </div>
      <CartoonWhy />
      <CartoonRoomActions />
      <CartoonSources />
    </ClimateRecordShell>
  );
}