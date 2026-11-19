import React from 'react';
import { TriangleAlert, Sprout, Zap, Radio, PencilLine } from 'lucide-react';

const ICONS = { crisis: TriangleAlert, solution: Sprout, action: Zap, wire: Radio, cartoon: PencilLine };

export default function MapSignalMark({ kind, className = '' }) {
  const Icon = ICONS[kind] || Sprout;
  return (
    <span aria-hidden="true" data-kind={kind} className={`record-map-symbol ${className}`}>
      <Icon size="100%" strokeWidth={2.4} />
    </span>
  );
}