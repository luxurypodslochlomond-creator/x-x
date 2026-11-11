import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { RefreshCw } from 'lucide-react';
import DecisionCard from '@/components/climate/DecisionCard';
import NameOnTheRecord from '@/components/climate/NameOnTheRecord';
import useKeeperMobile from '@/components/climate/keeper/useKeeperMobile';

// What is waiting for a decision, and nothing else. Saying yes puts the entry on the record
// and seals it in the same breath; saying not-yet holds it without calling it a rejection.
// Both carry her name into the audit trail, so "who allowed this" is a row rather than a shrug.
export default function DecideQueue({ onChange, plain = false }) {
  const compact = useKeeperMobile() && plain;
  const RecordNote = compact ? 'details' : React.Fragment;
  const [state, setState] = useState('checking');
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(null);
  const [said, setSaid] = useState('');
  // One entry at a time, with the rest behind one line. Twenty-two open cards is a scroll a
  // keeper has to survive before she can start; one card and a count is a job she can finish.
  const [all, setAll] = useState(false);

  const load = useCallback(async () => {
    setState('checking');
    try {
      const res = await base44.functions.invoke('climateKeeperRoom', { action: 'queue' });
      if (res.data?.error) {
        setState('error');
        return;
      }
      setItems(res.data?.waiting || []);
      setName(res.data?.name || '');
      setState('ready');
    } catch (e) {
      setState('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const decide = async (item, decision) => {
    setBusy(item.id);
    setSaid('');
    try {
      const res = await base44.functions.invoke('climateKeeperRoom', {
        action: 'decide',
        type: item.type,
        id: item.id,
        decision,
      });
      setItems((prev) => prev.filter((i) => !(i.id === item.id && i.type === item.type)));
      // The row of doors above this room carries the same numbers. A yes taken here is one
      // fewer waiting up there, said immediately rather than at the next page load.
      onChange?.();
      setSaid(
        decision === 'publish'
          ? res.data?.sealed
            ? 'On the record, and sealed.'
            : 'On the record.'
          : 'Held back. Nothing lost — it will be here when you want it.'
      );
    } catch (e) {
      setSaid('That did not go through. Try once more.');
    } finally {
      setBusy(null);
    }
  };

  if (state === 'checking') {
    return (
      <div className="flex items-center gap-2 py-10">
        <div
          className="w-5 h-5 rounded-full animate-spin"
          style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }}
        />
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#5a5246]">Looking at the record</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="border-2 border-[#b3261e] bg-[#b3261e]/5 p-4">
        <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
          The queue could not be opened just now. Nothing is lost — the entries are still waiting.
        </p>
        <button onClick={load} className="mt-3 flex items-center gap-2 text-[11px] font-black font-mono uppercase text-[#b3261e]">
          <RefreshCw className="w-3.5 h-3.5" /> Try again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Inside the keeper's room the room has already said how many are waiting and already
          offers a count, so saying it twice makes the page feel like more work than it is. */}
      {!plain && (
        <div className="flex items-center justify-between gap-3 mb-4">
          <p className="text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
            {items.length === 0 ? 'Nothing is waiting' : `${items.length} waiting`}
            {name ? ` · ${name}` : ''}
          </p>
          <button
            onClick={load}
            className="flex min-h-[36px] items-center gap-1.5 text-[12px] text-[#5a5246] hover:text-[#b3261e] transition-colors"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Look again
          </button>
        </div>
      )}

      {said && (
        <p className="mb-3 px-3 py-2 border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 text-[11.5px] font-mono text-[#141210]">
          {said}
        </p>
      )}

      {items.length === 0 ? (
        <div className="room-empty border-2 border-[#141210] bg-[#efe7d6] px-4 py-8 text-center">
          <p className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
            The record is caught up
          </p>
          <p className="text-[11.5px] font-mono leading-relaxed text-[#5a5246] mt-2">
            {compact ? 'Nothing needs a decision.' : 'Nothing has been sent in that needs you. This is where it will appear when something does.'}
          </p>
        </div>
      ) : (
        <>
          {(all ? items : items.slice(0, 1)).map((item, i) => (
            <DecisionCard
              key={`${item.type}-${item.id}`}
              item={item}
              onDecide={decide}
              busy={busy === item.id}
              first={i === 0}
              compact={compact}
            />
          ))}

          {items.length > 1 && (
            <div className="room-queue-more flex items-center justify-between gap-3 border border-[#141210]/20 bg-[#f7f1e5] px-3 py-2.5">
              <p className="text-[12.5px] leading-snug text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>
                {all
                  ? `${items.length} waiting`
                  : compact ? `${items.length - 1} more` : `${items.length - 1} more waiting after this one`}
              </p>
              <button
                onClick={() => setAll((v) => !v)}
                className="min-h-[36px] text-[12px] font-semibold text-[#b3261e] underline decoration-2 underline-offset-2"
                style={{ fontFamily: 'var(--font-reading)' }}
              >
                {all ? 'one at a time' : 'see all'}
              </button>
            </div>
          )}
        </>
      )}

      <NameOnTheRecord compact={compact} />

      <RecordNote {...(compact ? { className: 'room-details mt-4' } : {})}>
        {compact && <summary>Decisions and seals</summary>}
        <p className="mt-5 text-[12.5px] leading-[1.7] text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>
          Every yes and every not-yet is written down with your name and the time, so a reader who asks who decided
          can be answered. Nothing expires: anything you hold stays exactly where it is.{' '}
          <Link to="/ClimateSeals" className="underline decoration-2 underline-offset-2 hover:text-[#b3261e]">See the seals</Link>
        </p>
      </RecordNote>
    </>
  );
}