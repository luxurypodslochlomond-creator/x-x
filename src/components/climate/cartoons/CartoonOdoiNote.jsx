import React from 'react';
import { ODOI_URL } from '@/components/climate/cartoons/cartoonWorld';

export default function CartoonOdoiNote() {
  return (
    <aside className="cartoon-lineage-odoi">
      <p className="cartoon-lineage-kicker">A life kept in the room</p>
      <h3>Frank Odoi</h3>
      <p className="cartoon-lineage-place">Ghana → Kenya · died 21 April 2012</p>
      <p>Born in Tarkwa, Ghana, Odoi joined Kenya’s cartooning world and drew for the Daily Nation. His <em>Akokhan</em> placed an African superhero and African spiritual traditions at the centre of the story; <em>Golgoti</em> turned to encounters between Africa and the West. He also chaired Katuni, the East African association of cartoonists.</p>
      <p>He died in a road crash in Nairobi. The sources disagree on his birth year, so this record does not choose one.</p>
      <a href={ODOI_URL} target="_blank" rel="noopener noreferrer">Biography &amp; cited sources · Wikipedia ↗</a>
    </aside>
  );
}