import React from 'react';
import { TriangleAlert, Flag, Sprout } from 'lucide-react';
const ICONS = { emergency: TriangleAlert, milestone: Flag, initiative: Sprout };
export default function NewsKindIcon({ kind, size = 24 }) {
  const Icon = ICONS[kind] || Sprout;
  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" />;
}