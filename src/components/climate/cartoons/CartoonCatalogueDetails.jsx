import React from 'react';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

export default function CartoonCatalogueDetails() {
  return (
    <details className="comic-catalogue-details">
      <summary>About the cover and catalogue</summary>
      <p className="comic-catalogue-line record-meta">
        This is a sample of the catalogue cover that African Press Cartoon Services is
        preparing for the cartoons selected for the online workshop discussions on
        29 November.
      </p>
      <p className="comic-catalogue-line record-meta">
        Every African cartoonist who took part in those discussions has their work
        gathered into it, edited by {CARTOON_EVENT.editors}.
      </p>
      <a href="#cartoon-anthology" className="comic-catalogue-link">What the book is ↓</a>
    </details>
  );
}