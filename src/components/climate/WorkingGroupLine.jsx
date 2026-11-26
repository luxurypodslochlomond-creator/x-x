import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

// ── THE OTHER HALF OF THE JOIN ─────────────────────────────────────────────────────
// GroupSubjectLinks shows the entries in a group's subject from the group's own card. This
// is the same join read the other way: standing on a solution or an emergency, who is
// already working on this?
//
// It matches on the subject the organiser chose, never on the free-text topic — the same
// reason as the other side, said once and not twice. Nothing found means nothing shown,
// rather than a heading with an empty space under it.
export default function WorkingGroupLine({ category }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!category) { setGroups([]); return; }
    let cancelled = false;
    base44.entities.ClimateGroup
      .filter({ category, status: 'published' }, { limit: 4 })
      .then(r => { if (!cancelled) setGroups(Array.isArray(r) ? r : (r?.items || [])); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [category]);

  if (!groups.length) return null;

  return (
    <div className="mt-6 pt-5 border-t-2 border-[#141210]/20">
      <span className="block text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] mb-2">
        {groups.length === 1 ? 'Who is working on this' : 'Who is working on this'}
      </span>
      <div className="space-y-1.5">
        {groups.map(g => (
          <Link
            key={g.id}
            to="/TogetherChangeClimate#record-room-groups"
            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 active:opacity-70"
          >
            <span className="text-[13px] font-bold text-[#141210] underline decoration-[#141210]/30 underline-offset-2">{g.name}</span>
            {g.region && (
              <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246]">{g.region}</span>
            )}
          </Link>
        ))}
      </div>
      <p className="mt-1.5 text-[10px] font-mono uppercase tracking-wide text-[#5a5246]">
        Groups put themselves beside a subject. The record never guesses.
      </p>
    </div>
  );
}