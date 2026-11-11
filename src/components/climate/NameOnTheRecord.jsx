import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Check, X } from 'lucide-react';

// ── HER NAME ON WHAT IS ALREADY UP ───────────────────────────────────────────
// A signature on this record means one thing: this person put this here. So the only
// person who can settle whose name is on an entry is the one whose name it is. Everything
// that does not already carry her name is listed here — anything signed in someone else's
// name, or signed on her behalf, and anything still unsigned.
//
// Two answers, one tap each. "It's mine" writes her name. "Not mine" takes her name off,
// and the entry reads plainly "unsigned" — the words stay exactly where they are. Nothing
// is deleted, nothing is hidden, and the record shows what happened either way.

export default function NameOnTheRecord({ compact = false }) {
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(null);
  const [said, setSaid] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('climateKeeperRoom', { action: 'names' });
      setRows(res.data?.rows || []);
    } catch (e) {
      setRows([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const settle = async (row, isMine) => {
    setBusy(row.id);
    setSaid('');
    try {
      await base44.functions.invoke('climateKeeperRoom', {
        action: 'sign',
        type: row.type,
        id: row.id,
        isMine,
      });
      setRows((prev) => (prev || []).filter((r) => !(r.type === row.type && r.id === row.id)));
      setSaid(isMine ? 'Your name is on it.' : 'Taken off your name. It now reads unsigned.');
    } catch (e) {
      setSaid('That did not go through. Try once more.');
    } finally {
      setBusy(null);
    }
  };

  if (!rows || rows.length === 0) return null;

  return (
    <details className={`${compact ? 'room-signatures' : ''} mt-5 border-2 border-[#141210] bg-[#f7f1e5]`}>
      <summary className="list-none cursor-pointer px-3 py-3 flex items-center justify-between gap-3">
        <span>
          <span className="block text-[9px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e]">
            {compact ? 'Confirm signatures' : 'your name on the record'}
          </span>
          <span className="block text-[11.5px] font-mono text-[#5a5246] mt-1">
            {compact ? `${rows.length} to review` : `${rows.length} ${rows.length === 1 ? 'entry carries' : 'entries carry'} a name that is not yours, or no name at all.`}
          </span>
        </span>
        <span className="text-[10px] font-black font-mono uppercase text-[#141210] flex-shrink-0">Open</span>
      </summary>

      <div className="px-3 pb-3 border-t border-[#141210]/25 pt-3">
        <p className="text-[11px] font-mono leading-relaxed text-[#3a342c]">
          A signature here means one thing: this person put this here. If the entry is yours, put your name to
          it. If it is not, take your name off and it reads plainly as unsigned. The words stay exactly where
          they are either way — nothing is deleted.
        </p>

        {said ? (
          <p className="mt-3 px-3 py-2 border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 text-[11.5px] font-mono text-[#141210]">
            {said}
          </p>
        ) : null}

        <ul className="mt-3 space-y-2">
          {rows.map((row) => (
            <li key={`${row.type}-${row.id}`} className="border-2 border-[#141210]/25 bg-[#efe7d6]">
              <div className="px-3 py-2.5">
                <h4 className="text-[12.5px] font-black leading-snug text-[#141210]">{row.title}</h4>
                <p className="text-[10.5px] font-mono mt-1 text-[#b3261e]">
                  {row.editor ? `Signed: ${row.editor}` : 'No name on it'}
                </p>
              </div>
              <div className="grid grid-cols-2 border-t-2 border-[#141210]/25">
                <button
                  onClick={() => settle(row, false)}
                  disabled={busy === row.id}
                  className="flex items-center justify-center gap-1.5 min-h-[46px] px-2 py-2 text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] border-r-2 border-[#141210]/25 active:bg-[#141210]/10 disabled:opacity-40 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Not mine
                </button>
                <button
                  onClick={() => settle(row, true)}
                  disabled={busy === row.id}
                  className="flex items-center justify-center gap-1.5 min-h-[46px] px-2 py-2 text-[10px] font-black font-mono uppercase tracking-wide bg-[#1e3a2b] text-[#f4efe4] active:bg-[#141210] disabled:opacity-40 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> It's mine
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}