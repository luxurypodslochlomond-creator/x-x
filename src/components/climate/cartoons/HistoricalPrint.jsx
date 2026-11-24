import React from 'react';
import HistoricalPrintCaption from '@/components/climate/cartoons/HistoricalPrintCaption';

export default function HistoricalPrint({ work, onOpen }) {
  return <figure className="historical-print" id={`historical-${work.id}`}>
    <button type="button" className="historical-print-art" onClick={onOpen} aria-label={`Look closer at ${work.work} by ${work.name}`}>
      <img src={work.thumb} alt={`${work.work}, ${work.name}`} loading="lazy" decoding="async" />
      <span>Look closer ↗</span>
    </button>
    <figcaption><HistoricalPrintCaption work={work} /></figcaption>
  </figure>;
}