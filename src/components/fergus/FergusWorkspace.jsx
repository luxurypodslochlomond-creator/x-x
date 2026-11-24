import React, { Suspense, lazy } from 'react';
import FergusOverview from '@/components/fergus/FergusOverview';
import FergusNotes from '@/components/fergus/FergusNotes';
const DOCUMENTS = {
  note: lazy(() => import('@/pages/FergusHiggsfield')),
  film: lazy(() => import('@/pages/FergusHiggsfieldVideo')),
  football: lazy(() => import('@/pages/FergusHughesProfile')),
  card: lazy(() => import('@/pages/FergusCard')),
};
export default function FergusWorkspace({ selected, onSelect, room }) {
  if (selected === 'home') return <FergusOverview onSelect={onSelect} />;
  if (selected === 'notes') return <FergusNotes {...room} />;
  const Document = DOCUMENTS[selected];
  return <Suspense fallback={<p role="status" className="fergus-empty">Opening…</p>}><Document embedded /></Suspense>;
}