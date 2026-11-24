import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, Send, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Fergus's room. The code is checked on the server — this page never holds the answer, and
// nothing is shown until the room's own function says the code is right. Reopened for the
// rest of the session so he is not retyping it every time he comes back.
const STORE = 'fergus-room-code';

const DOORS = [
  { to: '/FergusHiggsfield', title: 'The note to send', desc: 'What to write. What not to write.' },
  { to: '/FergusHiggsfieldVideo', title: 'The 60 seconds', desc: 'Shot by shot, with the lines.' },
  { to: '/FergusHughesProfile', title: 'The football page', desc: 'That one is for a coach, not a video company.' },
];

const errText = (err) =>
  err?.response?.data?.error || err?.message || 'That code is not right.';

export default function FergusRoom() {
  const [pin, setPin] = useState('');
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const call = async (payload) => {
    const res = await base44.functions.invoke('fergusRoom', payload);
    return res.data;
  };

  useEffect(() => {
    const held = sessionStorage.getItem(STORE);
    if (!held) return;
    call({ pin: held, action: 'read' })
      .then((d) => {
        if (d?.notes) {
          setPin(held);
          setNotes(d.notes);
          setOpen(true);
        }
      })
      .catch(() => sessionStorage.removeItem(STORE));
  }, []);

  const unlock = async (e) => {
    e.preventDefault();
    if (!pin.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const d = await call({ pin, action: 'read' });
      if (!d?.notes) throw new Error('The room did not open.');
      sessionStorage.setItem(STORE, pin);
      setNotes(d.notes);
      setOpen(true);
    } catch (err) {
      setError(errText(err));
    } finally {
      setBusy(false);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    if (!draft.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const d = await call({ pin, action: 'add', body: draft, from: 'Dad' });
      if (d?.notes) {
        setNotes(d.notes);
        setDraft('');
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
      }
    } catch (err) {
      setError(errText(err));
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-record-paper px-6 text-record-ink">
        <div className="w-full max-w-sm">
          <Lock className="mx-auto h-6 w-6 text-record-red" />
          <h1 className="mt-4 text-center text-[24px] leading-tight">Fergus's room</h1>
          <p className="mt-2 text-center text-[13.5px] leading-relaxed text-record-ink/70">
            Put in the code Dad gave you.
          </p>
          <form onSubmit={unlock} className="mt-6">
            <input
              type="password"
              inputMode="text"
              autoComplete="off"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="the code"
              className="w-full border-2 border-record-ink bg-record-bone/40 px-4 py-4 text-center font-mono text-[18px] tracking-[0.25em]"
            />
            <button
              type="submit"
              disabled={busy || !pin.trim()}
              className="mt-3 flex min-h-[54px] w-full items-center justify-center gap-2 bg-record-ink px-4 py-3 font-mono text-[12px] font-black uppercase tracking-wide text-record-paper disabled:opacity-40"
            >
              {busy ? 'Checking…' : 'Open the room'}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-center text-[13px] leading-relaxed text-record-red">{error}</p>
          )}
          <p className="mt-8 text-center font-mono text-[10px] uppercase leading-relaxed tracking-wide text-record-muted">
            A latch, not a vault. Nothing in here is secret.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-record-paper text-record-ink">
      <div className="mx-auto max-w-2xl px-4 py-8 pb-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-muted">
          For Fergus
        </p>
        <h1 className="mt-2 text-[28px] leading-tight">Everything's in here, son.</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-record-ink/75">
          Three pages, in the order to use them. Then the notes below.
        </p>

        <div className="mt-6 space-y-2">
          {DOORS.map((d, i) => (
            <Link
              key={d.to}
              to={d.to}
              className="flex min-h-[64px] items-center gap-3 border-2 border-record-ink px-4 py-3"
            >
              <span className="font-mono text-[11px] font-black text-record-red">0{i + 1}</span>
              <span className="flex-1">
                <span className="block text-[15px] leading-snug">{d.title}</span>
                <span className="block text-[12.5px] leading-snug text-record-muted">{d.desc}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-record-muted" />
            </Link>
          ))}
        </div>

        <section className="mt-9 border-t-2 border-record-ink pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Notes
          </h2>
          {notes.length === 0 ? (
            <p className="mt-3 text-[13.5px] text-record-muted">Nothing here yet.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {notes.map((n) => (
                <li key={n.id} className="border-l-2 border-record-ink/30 pl-3">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-record-muted">
                    {n.from} · {new Date(n.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed">{n.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form onSubmit={add} className="mt-6 border-2 border-record-ink bg-record-bone/40 p-3">
          <label htmlFor="note" className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">
            Leave a note
          </label>
          <textarea
            id="note"
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What you want him to read next."
            className="mt-2 w-full border border-record-ink/30 bg-record-paper p-3 text-[14px] leading-relaxed"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            className="mt-2 flex min-h-[46px] w-full items-center justify-center gap-2 bg-record-ink px-4 py-2 font-mono text-[11px] font-black uppercase tracking-wide text-record-paper disabled:opacity-40"
          >
            {saved ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {saved ? 'Added' : busy ? 'Saving…' : 'Add it'}
          </button>
          {error && <p className="mt-2 text-[12.5px] text-record-red">{error}</p>}
        </form>

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(STORE);
            setOpen(false);
            setPin('');
            setNotes([]);
          }}
          className="mt-6 font-mono text-[10px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
        >
          Lock the room on this device
        </button>
      </div>
    </div>
  );
}