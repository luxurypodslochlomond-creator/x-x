import React from 'react';
import { MarkWall, MarkStudio, MarkRoll } from '@/components/climate/RecordFootMarks';

export default function WallChapterMark({ kind, size = 34 }) {
  if (kind === 'goals') return <span className="wall-seventeen" aria-hidden="true">17<span>UN</span></span>;
  const Symbol = kind === 'send' ? MarkStudio : kind === 'about' ? MarkRoll : MarkWall;
  return <Symbol size={size} />;
}