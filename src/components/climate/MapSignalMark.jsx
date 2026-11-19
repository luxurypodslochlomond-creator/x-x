import React from 'react';
// Plain signals, not pictograms. The legend and accessible button name carry the meaning.
export default function MapSignalMark({ kind, className = '' }) {
  return <span aria-hidden="true" data-kind={kind} className={`record-map-symbol ${className}`} />;
}