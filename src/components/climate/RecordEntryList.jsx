import React, { useEffect, useState } from 'react';
import SolutionCard from './SolutionCard';
import RecordEntryRow from './RecordEntryRow';

// ── ONE LIST, TWO WAYS OF SETTING IT ────────────────────────────────────────────
// A desk gets the plates; a handset keeps the cards it already had, two across, untouched.
// The switch is real rather than a pair of hidden copies, so a phone never downloads the
// photographs of a layout it is not showing.
export default function RecordEntryList({ items = [] }) {
  const [isDesk, setIsDesk] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesk(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (isDesk) {
    return (
      <div>
        {items.map((item, i) => (
          <RecordEntryRow key={item.id} item={item} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    );
  }

  return (
    <div className="record-card-grid grid grid-cols-1 gap-3">
      {items.map((item) => (
        <SolutionCard key={item.id} item={item} />
      ))}
    </div>
  );
}