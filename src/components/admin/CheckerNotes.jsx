import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// What the people who agreed to look actually found, sitting beside the decision they inform.
// A keeper should never have to publish on their own word alone when someone else has already
// opened the link, and should never have to guess whether anyone did.
const TONE = {
  holds: 'text-[#1e3a2b] border-[#1e3a2b]/40',
  does_not_hold: 'text-[#b3261e] border-[#b3261e]/40',
  cannot_tell: 'text-[#b8860b] border-[#b8860b]/40',
};

const WORD = {
  holds: 'source says it',
  does_not_hold: 'it does not',
  cannot_tell: 'could not tell',
};

export default function CheckerNotes({ entryId }) {
  const [checks, setChecks] = useState(null);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateCheck
      .filter({ entry_id: entryId }, { sort: '-created_date', limit: 20 })
      .then((page) => { if (live) setChecks(page?.items || page || []); })
      .catch(() => { if (live) setChecks([]); });
    return () => { live = false; };
  }, [entryId]);

  if (checks === null) return null;

  if (!checks.length) {
    return (
      <p className="text-[9px] font-mono uppercase text-[#6b6258] mb-2">
        not checked by anyone yet
      </p>
    );
  }

  return (
    <div className="border-2 border-[#1a1612]/20 bg-[#efe7d6] p-2 mb-2">
      <p className="text-[9px] font-mono font-black uppercase text-[#1a1612] mb-1.5">
        checked by {checks.length} {checks.length === 1 ? 'person' : 'people'}
      </p>
      <div className="space-y-1.5">
        {checks.map((c) => (
          <div key={c.id} className="border-l-4 pl-2 border-l-current">
            <span className={`text-[9px] font-mono font-black uppercase ${TONE[c.verdict]?.split(' ')[0] || 'text-[#6b6258]'}`}>
              {WORD[c.verdict] || c.verdict} · {c.checker_name}
            </span>
            {c.note ? (
              <p className="text-[10px] font-mono text-[#1a1612] leading-relaxed whitespace-pre-wrap">{c.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}