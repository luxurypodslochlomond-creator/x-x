import React from 'react';
import FergusOverview from '@/components/fergus/FergusOverview';
import FergusNotes from '@/components/fergus/FergusNotes';
import FergusNoteBoard from '@/components/fergus/FergusNoteBoard';
import FergusFilmBoard from '@/components/fergus/FergusFilmBoard';
import FergusFootballBoard from '@/components/fergus/FergusFootballBoard';
import FergusCardBoard from '@/components/fergus/FergusCardBoard';

const BOARDS = { note: FergusNoteBoard, film: FergusFilmBoard, football: FergusFootballBoard, card: FergusCardBoard };

export default function FergusWorkspace({ selected, onSelect, room }) {
  if (selected === 'home') return <FergusOverview onSelect={onSelect} />;
  if (selected === 'notes') return <FergusNotes {...room} />;
  const Board = BOARDS[selected] || FergusOverview;
  return <Board />;
}