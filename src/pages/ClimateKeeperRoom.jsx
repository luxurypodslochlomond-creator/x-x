import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Check, ExternalLink, Hand, RefreshCw } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

// ── THE KEEPER'S ROOM ────────────────────────────────────────────────────────
// Her page, not the builder's. Three things on it: what is waiting, where each one came
// from, and two buttons. Saying yes puts the entry on the record and seals it in the same
// breath; saying not-yet holds it without calling it a rejection. Both decisions carry her
// name into the audit trail, so "who allowed this" is answered by the record itself.
//
// Nothing here needs her to be an administrator of the app. The record checks her against
// its own guest list, on the server, so she holds the record's keys and nothing else.

const TONE = {
  Solution: 'bg-[#1e3a2b] text-[#f4efe4]',
  Crisis: 'bg-[#b3261e] text-[#f4efe4]',
  Action: 'bg-[#e2602a] text-[#141210]',
  Wire: 'bg-[#141210] text-[#f4efe4]',
  Gathering: 'bg-[#1e3a2b] text-[#f4efe4]',
  Music: 'bg-[#6b6258] text-[#f4efe4]',
  Comment: 'bg-[#efe7d6] text-[#141210] border border-[#141210]',
};

function Card({ item, onDecide, busy }) {
  return (
    <article className="border-2 border-[#141210] bg-[#f7f1e5] mb-3">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#141210]/20">
        <span className={`text-[9px] font-black font-mono uppercase tracking-[0.14em] px-1.5 py-0.5 ${TONE[item.label] || 'bg-[#efe7d6] text-[#141210]'}`}>
          {item.label}
        </span>
      </div>

      <div className="px-3 py-3">
        <h3 className="text-[13.5px] font-black leading-snug text-[#141210]">{item.title}</h3>
        {item.body ? (
          <p className="text-[12px] font-mono leading-relaxed text-[#3a342c] mt-2">{item.body}</p>
        ) : null}

        {item.source_url ? (
          <a
            href={item.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-black font-mono text-[#1e3a2b] underline decoration-2 underline-offset-2"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open the source
            {item.source_name ? <span className="font-normal text-[#5a5246]">· {item.source_name}</span> : null}
          </a>
        ) : (
          <p className="mt-2.5 text-[11px] font-mono text-[#b3261e]">
            {item.contact ? `Contact line given: ${item.contact}` : 'No link to an origin on this one.'}
          </p>
        )}

        {item.contact && item.source_url ? (
          <p className="mt-1.5 text-[11px] font-mono text-[#5a5246]">Contact line: {item.contact}</p>
        ) : null}

        {item.ai ? (
          <p className="mt-2.5 text-[10.5px] font-mono leading-snug text-[#8a8375] border-t border-[#141210]/15 pt-2">
            A note, not a decision: {item.ai}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 border-t-2 border-[#141210]">
        <button
          onClick={() => onDecide(item, 'hold')}
          disabled={busy}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 py-3 text-[11px] font-black font-mono uppercase tracking-wide text-[#141210] border-r-2 border-[#141210] active:bg-[#141210]/10 disabled:opacity-40 transition-colors"
        >
          <Hand className="w-4 h-4" /> Not yet
        </button>
        <button
          onClick={() => onDecide(item, 'publish')}
          disabled={busy}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 py-3 text-[11px] font-black font-mono uppercase tracking-wide bg-[#1e3a2b] text-[#f4efe4] active:bg-[#141210] disabled:opacity-40 transition-colors"
        >
          <Check className="w-4 h-4" /> On the record
        </button>
      </div>
    </article>
  );
}

export default function ClimateKeeperRoom() {
  const [state, setState] = useState('checking'); // checking | ready | denied | error
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(null);
  const [said, setSaid] = useState('');

  const load = useCallback(async () => {
    setState('checking');
    try {
      const res = await base44.functions.invoke('climateKeeperRoom', { action: 'queue' });
      if (res.data?.error) {
        setState(res.data.error === 'Unauthorized' ? 'denied' : 'denied');
        return;
      }
      setItems(res.data?.waiting || []);
      setName(res.data?.name || '');
      setState('ready');
    } catch (e) {
      setState(e?.status === 401 || e?.status === 403 ? 'denied' : 'error');
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

  return (
    <ClimateRecordShell
      eyebrow="The keeper's room"
      marker="What is waiting · where it came from · yes or not yet"
      title="Say yes, or say not yet"
      statement="Every entry that is waiting, the link it came from, and the two answers you can give. Saying yes puts it on the record and seals it. Saying not yet keeps it here, untouched, for as long as you like."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change."
    >
      {state === 'checking' && (
        <div className="flex items-center gap-2 py-10">
          <div className="w-5 h-5 rounded-full animate-spin" style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }} />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#5a5246]">Looking at the record</span>
        </div>
      )}

      {state === 'denied' && (
        <div className="border-2 border-[#141210] bg-[#efe7d6] p-4 lg:p-6">
          <p className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
            This room is the keeper's
          </p>
          <p className="text-[12px] font-mono leading-relaxed text-[#3a342c]">
            Only the person the record answers to can say yes or not yet. Sign in with the address the record
            already holds for you, and this page will open with everything that is waiting.
          </p>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="mt-4 w-full flex items-center justify-center gap-2 min-h-[52px] px-4 py-3 bg-[#b3261e] text-[#f4efe4] text-[11px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#141210] active:border-[#141210] transition-colors"
          >
            Sign in to the record <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {state === 'error' && (
        <div className="border-2 border-[#b3261e] bg-[#b3261e]/5 p-4">
          <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
            The room could not be opened just now. Nothing is lost — the entries are still waiting.
          </p>
          <button onClick={load} className="mt-3 flex items-center gap-2 text-[11px] font-black font-mono uppercase text-[#b3261e]">
            <RefreshCw className="w-3.5 h-3.5" /> Try again
          </button>
        </div>
      )}

      {state === 'ready' && (
        <>
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-[10px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
              {items.length === 0 ? 'Nothing is waiting' : `${items.length} waiting`}
              {name ? ` · ${name}` : ''}
            </p>
            <button onClick={load} className="flex items-center gap-1.5 text-[10px] font-black font-mono uppercase text-[#5a5246] hover:text-[#b3261e] transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Look again
            </button>
          </div>

          {said && (
            <p className="mb-3 px-3 py-2 border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 text-[11.5px] font-mono text-[#141210]">
              {said}
            </p>
          )}

          {items.length === 0 ? (
            <div className="border-2 border-[#141210] bg-[#efe7d6] px-4 py-8 text-center">
              <p className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
                The record is caught up
              </p>
              <p className="text-[11.5px] font-mono leading-relaxed text-[#5a5246] mt-2">
                Nothing has been sent in that needs you. This page is where it will appear when something does.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <Card key={`${item.type}-${item.id}`} item={item} onDecide={decide} busy={busy === item.id} />
            ))
          )}

          <p className="mt-5 text-[10.5px] font-mono leading-relaxed text-[#5a5246]">
            Every yes and every not-yet is written down with your name and the time, so a reader who asks who
            decided can be answered. The record does not ask you to explain yourself, and nothing expires:
            anything you hold stays exactly where it is.{' '}
            <Link to={createPageUrl('ClimateSeals')} className="underline decoration-2 underline-offset-2 hover:text-[#b3261e]">
              See the seals
            </Link>
          </p>

          {/* The way on from the deciding to the counting, so a keeper never has to remember an
              address to find out what state the record is in or who else holds the keys. */}
          <Link
            to={createPageUrl('AdminClimateDesk')}
            className="mt-4 flex items-center justify-between border-2 border-[#141210] bg-[#efe7d6] px-3 py-3"
          >
            <span>
              <span className="block text-[9px] font-mono font-black uppercase tracking-[0.2em] text-[#b3261e]">the desk</span>
              <span className="block text-[11px] font-mono text-[#5a5246] mt-1">What is waiting, who is checking, who else holds the keys.</span>
            </span>
            <ArrowRight className="w-4 h-4 text-[#141210] flex-shrink-0" />
          </Link>
        </>
      )}
    </ClimateRecordShell>
  );
}