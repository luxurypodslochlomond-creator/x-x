import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import ComicReader from '@/components/climate/cartoons/ComicReader';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonWall from '@/components/climate/cartoons/CartoonWall';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import '@/components/climate/cartoons/cartoon-room.css';

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
      <CartoonSessionBand />
      <ComicReader />
      <CartoonWhy />
      <CartoonRoomActions />
      <CartoonWall />
      <CartoonSources />
    </ClimateRecordShell>
  );
}