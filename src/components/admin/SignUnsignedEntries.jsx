import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// ── SIGNING THE BACKLOG ───────────────────────────────────────────────────────
// Entries that went up before signing existed are unsigned, and the record says so
// on every one of them. This closes that gap honestly: a person types the name of
// the person who put those entries on the record, and it is written on them.
//
// It is deliberately not automatic. A signature is a person saying "I put this here",
// so a name can only come from someone who knows. Nothing here invents one, and
// nothing signs on a stranger's behalf — the machine has no name to sign with.
const ENTITIES = ['ClimateSolution', 'ClimateAction', 'ClimateNews'];

export default function SignUnsignedEntries({ onSigned }) {
  const [counts, setCounts] = useState(null);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const found = {};
    for (const n of ENTITIES) {
      const page = await base44.entities[n].filter({ status: 'published' }, { limit: 200 });
      found[n] = page.items.filter(i => !(i.editor || '').trim());
    }
    setCounts(found);
  };

  useEffect(() => { load(); }, []);

  const total = counts ? ENTITIES.reduce((sum, n) => sum + counts[n].length, 0) : 0;

  const sign = async () => {
    const signer = name.trim();
    if (!signer || !total) return;
    setBusy(true);
    try {
      for (const n of ENTITIES) {
        const ids = counts[n].map(i => i.id);
        if (ids.length) await base44.entities[n].bulkUpdate(ids.map(id => ({ id, editor: signer })));
      }
      await load();
      onSigned?.();
    } finally {
      setBusy(false);
    }
  };

  if (!counts) return null;

  return (
    <div className="mt-6 border-2 border-[#141210] bg-[#f7f1e5] p-4">
      <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-1">
        Unsigned entries · {total}
      </p>
      <p className="text-[11px] font-mono leading-relaxed text-[#5a5246] mb-3">
        {total === 0
          ? 'Every published entry carries a name. Nothing to sign.'
          : 'These went up before signing existed. Type the name of the person who put them on the record and they are signed in one go. Only a person can supply that name.'}
      </p>
      {total > 0 && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of the signer"
            className="flex-1 px-3 py-2.5 border-2 border-[#141210]/30 bg-white text-[12px] font-mono text-[#141210] focus:outline-none focus:border-[#141210]"
          />
          <button
            onClick={sign}
            disabled={!name.trim() || busy}
            className="px-4 py-2.5 border-2 border-[#141210] bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase tracking-widest disabled:opacity-40"
          >
            {busy ? 'Signing…' : `Sign ${total}`}
          </button>
        </div>
      )}
    </div>
  );
}