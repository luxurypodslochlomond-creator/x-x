import React from 'react';
import { Link } from 'react-router-dom';

// ── A GROUP IS NOT AN ISLAND ───────────────────────────────────────────────────────
// Groups sat beside the record without touching it: a reader found people working on
// seagrasses and, one screen away, the solutions about seagrasses, and nothing joined the
// two. This is the join, and it is deliberately the smallest one possible.
//
// It is made by the organiser, not by a machine. The group names the subject it works on
// when it is started, and that is the only thing this reads. The free-text topic above it
// is a person's own words — "Mangrove protection" against a subject called "mangroves" is
// a guess, and a guess here would put somebody's work under the wrong heading, which is
// the one thing this record cannot do. No subject chosen, no links, and nothing invented.
//
// No new page: every line below is an existing entry, on the address it already has.
export default function GroupSubjectLinks({ category, items = [], actions = [], groupId }) {
  if (!category) return null;

  const inSubject = items.filter(i => i.category === category);
  const solutions = inSubject.filter(i => i.entry_type !== 'climate_crisis').slice(0, 3);
  const emergencies = inSubject.filter(i => i.entry_type === 'climate_crisis');
  // An action belongs to a group only when the action itself says so.
  const ownActions = actions.filter(a => a.group_id && a.group_id === groupId);

  if (!solutions.length && !emergencies.length && !ownActions.length) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-[#141210]/20">
      <span className="block text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] mb-1.5">
        In this subject on the record
      </span>
      <ul className="space-y-1">
        {solutions.map(s => (
          <li key={s.id}>
            <Link
              to={`/ClimateDetail/solution/${s.id}`}
              className="flex items-baseline gap-1.5 text-[12px] leading-snug text-[#1e3a2b] font-bold underline decoration-[#1e3a2b]/30 underline-offset-2 active:text-[#b3261e]"
            >
              <span className="text-[8.5px] font-black font-mono uppercase tracking-widest text-[#5a5246] shrink-0">Sol</span>
              {s.title}
            </Link>
          </li>
        ))}
        {emergencies.length > 0 && (
          <li>
            <Link
              to={`/ClimateDetail/climate_crisis/${emergencies[0].id}`}
              className="flex items-baseline gap-1.5 text-[12px] leading-snug text-[#b3261e] font-bold underline decoration-[#b3261e]/30 underline-offset-2 active:text-[#8f1e18]"
            >
              <span className="text-[8.5px] font-black font-mono uppercase tracking-widest text-[#5a5246] shrink-0">Emg</span>
              {emergencies.length === 1 ? emergencies[0].title : `${emergencies.length} crises in this subject`}
            </Link>
          </li>
        )}
        {ownActions.map(a => (
          <li key={a.id}>
            <Link
              to={`/ClimateDetail/action/${a.id}`}
              className="flex items-baseline gap-1.5 text-[12px] leading-snug text-[#141210] font-bold underline decoration-[#141210]/30 underline-offset-2 active:text-[#b3261e]"
            >
              <span className="text-[8.5px] font-black font-mono uppercase tracking-widest text-[#5a5246] shrink-0">Act</span>
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}