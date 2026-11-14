import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import useKeeper from '@/components/climate/useKeeper';

// The keeper's strip on the wall's own page. Nobody else ever sees it: the server refuses
// the list and the decision to anyone without the record's keys, and the component simply
// draws nothing for an ordinary reader.
const reading = { fontFamily: 'var(--font-reading)' };

export default function CartoonsWaiting() {
  const isKeeper = useKeeper();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await base44.functions.invoke('climateCartoon', { action: 'waiting' }).catch(() => null);
    setItems(res?.data?.items || []);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (isKeeper) load();
  }, [isKeeper, load]);

  const decide = async (id, publish) => {
    setBusy(true);
    try {
      await base44.functions.invoke('climateCartoon', { action: 'decide', id, publish });
      await load();
    } finally {
      setBusy(false);
    }
  };

  if (!isKeeper || !loaded || !items.length) return null;

  return (
    <section className="mt-10 border-t border-record-ink/20 pt-4">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-red">
        Waiting for a keeper · {items.length}
      </p>
      <p className="mt-1 text-[12.5px] leading-[1.6] text-record-muted" style={reading}>
        Only a keeper sees this strip. A drawing goes on the wall because a person said yes, never because a machine did.
      </p>

      <div className="mt-3 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border border-record-ink/20 bg-record-bone/50 p-3">
            <div className="flex gap-3">
              <img src={item.image_url} alt="" className="h-20 w-20 flex-shrink-0 border border-record-ink/15 object-cover" />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-tight text-record-ink" style={reading}>
                  {item.title || item.artist_name}
                </p>
                <p className="text-[12px] leading-[1.5] text-record-muted" style={reading}>
                  {item.artist_name}
                  {item.origin ? ` · ${item.origin}` : ''}
                </p>
                {item.for_line && (
                  <p className="mt-1 text-[13px] leading-[1.5] text-record-ink" style={reading}>{item.for_line}</p>
                )}
                {item.machine_line && item.machine_line !== item.for_line && (
                  <p className="mt-1 font-mono text-[10px] leading-[1.5] text-record-muted">machine: {item.machine_line}</p>
                )}
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => decide(item.id, true)}
                disabled={busy}
                className="min-h-[42px] flex-1 bg-record-ink text-[13px] font-semibold text-record-paper disabled:opacity-40"
                style={reading}
              >
                Put it up
              </button>
              <button
                onClick={() => decide(item.id, false)}
                disabled={busy}
                className="min-h-[42px] flex-1 border border-record-ink/35 text-[13px] text-record-ink disabled:opacity-40"
                style={reading}
              >
                Not yet
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}