import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, Check } from 'lucide-react';
import { factsFromFile } from '@/components/climate/cartoons/fileFacts';
import { goalByNumber } from '@/components/climate/cartoons/cartoonGoals';
import { goalColour, goalNumberInk } from '@/components/climate/cartoons/goalColours';
import DrawingFileChoice from '@/components/climate/cartoons/DrawingFileChoice';

// ── BRING A DRAWING ───────────────────────────────────────────────────────────
// A photograph of the drawing goes in; the record writes one line about what it can
// see. That line is offered, never imposed: it lands in the same box the drawer (or
// whoever is holding the drawing) can rewrite in their own words before it is sent.
// The machine's own sentence is kept separately, so nobody later reads it as theirs.
//
// The drawing is shrunk on the device first — a phone photograph straight off a camera
// is several megabytes, and a wall in a workshop is not the place to spend them.

const reading = { fontFamily: 'var(--font-reading)' };

async function shrink(file) {
  if (!file || !file.type?.startsWith('image/')) return file;
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const max = 1400;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    if (scale === 1 && file.size < 900000) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.88));
    if (!blob) return file;
    return new File([blob], 'drawing.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const field =
  'w-full min-h-[44px] px-3 text-[14px] bg-record-paper border border-record-ink/25 text-record-ink placeholder:text-record-muted';

// `goal` is passed only when the form was opened from a goal's own panel. Then the drawing is
// filed against that goal in the sender's own word, and it comes back to that goal when a
// keeper has seen it. Without it the form is the wall's own door and files nothing.
export default function CartoonSendIn({ goal = null }) {
  const goalEntry = goal ? goalByNumber(goal) : null;
  const goalInk = goal ? goalColour(goal) : null;
  const [step, setStep] = useState('idle'); // idle | working | ready | sent
  const [imageUrl, setImageUrl] = useState('');
  const [machineLine, setMachineLine] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    artist_name: '',
    origin: '',
    title: '',
    for_line: '',
    submitter_email: '',
    credit: '',
    crisis_id: '',
    source_url: '',
    country: '',
  });

  // ── WHAT ARRIVED WITH THE FILE, AND WHAT THE WALL ALREADY HOLDS ──────────────
  // facts: what the file said about itself — a title from its name, the author and the
  // copyright from its own metadata. looksLike: drawings the record already holds that
  // read like this one. Neither is a fact about the drawing; both are shown so that a
  // person decides, and both are only ever a suggestion.
  const [facts, setFacts] = useState(null);
  const [looksLike, setLooksLike] = useState([]);
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkNote, setLinkNote] = useState('');

  // ── A DRAWING CAN BE ABOUT SOMETHING ALREADY ON THE RECORD ──────────────────
  // The crises this drawing could answer: published entries only, newest first. A drawing
  // offered about an entry that has since been held back would point at nothing, so the
  // list is the record's own live list rather than anything the page remembers.
  const [crises, setCrises] = useState([]);
  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateSolution
      .filter({ entry_type: 'climate_crisis', status: 'published' }, { sort: '-created_date', limit: 40 })
      .then((page) => { if (!cancelled) setCrises(page?.items || []); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // ── A LINK IS CHEAPER THAN A FORM ──────────────────────────────────────────
  // If the drawing is already published somewhere, that page carries its title and its
  // copyright line. The record reads the page and fills those boxes; anything it cannot
  // find stays blank, and anything it fills can still be rewritten.
  const readLink = async () => {
    const url = form.source_url.trim();
    if (!/^https:\/\//i.test(url)) {
      setLinkNote(url ? 'A web address starting https://, please.' : '');
      return;
    }
    setLinkBusy(true);
    setLinkNote('');
    try {
      const res = await base44.functions.invoke('climateCartoon', { action: 'fromlink', url });
      const data = res?.data || {};
      setForm((f) => ({
        ...f,
        title: f.title || data.title || '',
        credit: f.credit || data.credit || '',
      }));
      setLinkNote(
        data.title || data.credit ? 'Read from the page.' : 'The page gave no title or credit — no matter.'
      );
    } catch {
      setLinkNote('That page could not be read — the drawing still goes.');
    } finally {
      setLinkBusy(false);
    }
  };

  const onFile = async (file) => {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/i.test(file.type) && !/\.(jpe?g|png|webp|gif)$/i.test(file.name)) {
      setError('Choose a JPG, PNG, WebP or GIF drawing file. Export other formats as one of these first.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) { setError('This file is over 20 MB. Please export a smaller copy.'); return; }
    setError('');
    setMachineLine('');
    setLooksLike([]);
    setStep('working');
    try {
      // Read the file's own paperwork before it is shrunk: shrinking re-encodes the
      // picture, and metadata does not survive that. Read from the original, offered to
      // the boxes, never written to the record until a person sends it.
      const said = await factsFromFile(file);
      setFacts(said);

      const smaller = await shrink(file);
      const uploaded = await base44.integrations.Core.UploadPublicFile({ file: smaller });
      const url = uploaded?.file_url;
      if (!url) throw new Error('no url');
      setImageUrl(url);

      setForm((f) => ({
        ...f,
        artist_name: f.artist_name || said.artist,
        title: f.title || said.title,
        credit: f.credit || said.credit,
      }));

      // The drawing is ready without waiting for a machine description. The sender's
      // own line stays theirs; a machine suggestion is available only if requested.
      setStep('ready');
    } catch (e) {
      setError('That did not go through. Try the drawing once more.');
      setStep('idle');
    }
  };

  const [readingBusy, setReadingBusy] = useState(false);
  const suggestLine = async () => {
    setReadingBusy(true);
    setError('');
    try {
      const res = await base44.functions.invoke('climateCartoon', { action: 'read', image_url: imageUrl });
      setMachineLine(res?.data?.line || '');
      setLooksLike(res?.data?.looks_like || []);
    } catch {
      setError('The machine could not read it. You can still send the drawing with your own words.');
    } finally { setReadingBusy(false); }
  };

  const send = async () => {
    if (!form.artist_name.trim()) {
      setError('Whose hand drew it? A name, please.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await base44.functions.invoke('climateCartoon', {
        action: 'send',
        image_url: imageUrl,
        machine_line: machineLine,
        ...form,
        ...(goal ? { goal } : {}),
      });
      setStep('sent');
    } catch (e) {
      setError(e?.response?.data?.error || 'That did not go through. Nothing was sent.');
    } finally {
      setBusy(false);
    }
  };

  if (step === 'sent') {
    return (
      <div className="border border-record-ink/20 bg-record-bone/60 p-4 lg:p-5">
        <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-record-ink" style={reading}>
          <Check className="h-4 w-4 text-record-red" strokeWidth={2.4} /> It is with a custodian.
        </p>
        <p className="mt-2 text-[14px] leading-[1.65] text-record-muted" style={reading}>
          It is not on the wall yet. A custodian looks at every drawing first. When it goes up, it appears above with the
          name you gave and your line.
        </p>
        {goalEntry && (
          <p className="mt-2 text-[13px] leading-[1.6] text-record-muted" style={reading}>
            It is filed against Goal {goal} · {goalEntry.name}, in your word — the record puts it
            back under that goal when it stands.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="border border-record-ink/20 bg-record-bone/60 p-4 lg:p-5">
      {/* ── WHICH GOAL IT IS BEING OFFERED FOR ───────────────────────────────────
          Said at the top, in the goal's own colour, because this is the one thing the sender
          is claiming about their drawing and it should be visible while they write the rest. */}
      {goalEntry && (
        <div className="mb-3 flex items-center gap-2 border-b border-record-ink/20 pb-3">
          <span
            className="inline-flex min-w-[2.15rem] items-center justify-center px-1.5 py-0.5 font-mono text-[15px] font-bold tabular-nums"
            style={{ background: goalInk, color: goalNumberInk(goal) }}
          >
            {String(goal).padStart(2, '0')}
          </span>
          <span className="text-[13px] leading-[1.4] text-record-ink" style={reading}>
            Being offered for <strong>Goal {goal} · {goalEntry.name}</strong>
          </span>
        </div>
      )}
      <p className="flex items-center gap-2 text-[15px] font-semibold text-record-ink" style={reading}>
        Your drawing, with your name
      </p>
      <p className="mt-1 text-[13px] leading-[1.6] text-record-muted" style={reading}>
        Choose your drawing file. Add the artist’s name. Send it for a person’s review.
      </p>

      {/* ── BEFORE ANYBODY HANDS ANYTHING OVER ────────────────────────────────────
          Brian, 24 November: "can cartoonists actually load their work and get credited
          easy peasy and never fuck with their stuff… and no fucking with artists rights no
          matter where they are in the world." Every one of those is already how the room
          works — the name is required, the picture is stored exactly as sent, a keeper has
          to say yes, and a drawing can be taken down. None of it was ever said here, at the
          one moment a person is deciding whether to trust the room with their work. So it is
          said here, in four lines, before the file picker rather than in a policy nobody
          opens. Nothing in the code changed; this is the promise the code already keeps. */}
      <p className="mt-3 border-y border-record-ink/25 py-3 text-sm leading-relaxed text-record-ink">
        You keep your rights. This record does not sell your drawing or license it to others. A smaller display copy is made for faster loading.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-record-muted">Uploads are public by link, even before a custodian approves the wall entry. Only send work you have permission to share.</p>

      {step === 'idle' && <DrawingFileChoice onFile={onFile} />}

      {step === 'working' && (
        <p className="mt-3 inline-flex items-center gap-2 text-[13.5px] text-record-muted" style={reading}>
          <Loader2 className="h-4 w-4 animate-spin" /> Preparing your drawing…
        </p>
      )}

      {step === 'ready' && (
        <div className="mt-3">
          <img src={imageUrl} alt="The drawing you chose" className="block max-h-56 w-auto border border-record-ink/15" />
          <button type="button" className="mt-2 min-h-[44px] text-sm underline text-record-red" disabled={readingBusy || busy} onClick={() => { setStep('idle'); setImageUrl(''); setMachineLine(''); setLooksLike([]); }}>Choose a different file</button>

          {/* ── THE WALL MAY ALREADY HAVE IT ────────────────────────────────────
              One drawing once hung twice under two names, because the two copies were
              different files of the same picture — so a check on the file would have waved
              it through. The record says what this one reads like instead. A question for
              the person sending it, never a refusal. */}
          {looksLike.length > 0 && (
            <div className="mt-2 border border-record-red/40 bg-record-red/5 px-3 py-2">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-record-red">
                This reads like something already on the wall
              </p>
              {looksLike.map((c) => (
                <p key={c.id} className="mt-1 text-[12.5px] leading-[1.5] text-record-ink" style={reading}>
                  “{c.title || 'Untitled'}” — {c.artist_name}. If it is the same drawing, there is nothing to send: it is already here.
                </p>
              ))}
            </div>
          )}

          {facts && (facts.artist || facts.credit) && (
            <p className="mt-2 text-[12px] leading-[1.5] text-record-muted" style={reading}>
              The file said this about itself:{' '}
              {[facts.artist && `drawn by ${facts.artist}`, facts.credit].filter(Boolean).join(' · ')}. It is in the
              boxes below — change anything it got wrong.
            </p>
          )}

          <button type="button" className="block min-h-[44px] text-sm underline text-record-muted" onClick={suggestLine} disabled={readingBusy}>{readingBusy ? 'Reading the drawing…' : 'Ask the machine for a description · optional'}</button>
          {machineLine && (
            <div className="mt-3 border-l-2 border-record-red/50 pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-record-muted">
                Machine suggestion, not the artist’s words
              </p>
              <p className="mt-1 text-[13.5px] leading-[1.55] text-record-ink" style={reading}>{machineLine}</p>
              <p className="mt-1 text-[11.5px] leading-[1.5] text-record-muted" style={reading}>
                A machine wrote that, and it may be wrong. It has not been put into your words below.
              </p>
            </div>
          )}

          {/* ── TWO THINGS, THEN EVERYTHING ELSE IF THEY WANT TO ────────────────────
              Seven boxes in a column is a form, and a form is what a records office sends
              you. What a cartoonist is actually being asked for is two things: the name on
              the drawing, and one line on what it is for. So those two stand open, and the
              rest — where it came from, the country, the title, the copyright line, the
              email — is folded away underneath, there for anyone who wants the drawing
              placed properly and out of the way for anyone at a workshop with a phone in one
              hand. Not one field is removed, and nothing is required that was not required
              before: the button still asks only for the hand. */}
          <div className="mt-3 space-y-2">
            <label className="block text-sm font-semibold text-record-ink">Artist’s name <span className="font-normal text-record-muted">· required</span><input className={`${field} mt-1`} placeholder="The name to carry with the drawing" value={form.artist_name} onChange={set('artist_name')} /></label>
            <textarea
              className={`${field} min-h-[74px] py-2`}
              aria-label="Your own words about the drawing, optional"
              placeholder="One line on what it is for, in your own words · optional"
              value={form.for_line}
              onChange={set('for_line')}
            />
            <details className="border-t border-record-ink/15 pt-2">
              <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.12em] text-record-muted">
                Where it came from, and who to reach — optional
              </summary>
              <div className="mt-2 space-y-2">
                <input
                  className={field}
                  placeholder="A link to where it was published — the record reads its title and credit"
                  inputMode="url"
                  value={form.source_url}
                  onChange={set('source_url')}
                  onBlur={readLink}
                />
                {(linkBusy || linkNote) && (
                  <p className="text-[11.5px] leading-[1.5] text-record-muted" style={reading}>
                    {linkBusy ? 'Reading the page…' : linkNote}
                  </p>
                )}
                <input className={field} placeholder="Where it came from — the workshop, the school, the group" value={form.origin} onChange={set('origin')} />
                <input className={field} placeholder="Which country it was drawn in (so it can stand on the map)" value={form.country} onChange={set('country')} />
                <input className={field} placeholder="What it is called (if it has a name)" value={form.title} onChange={set('title')} />
                {crises.length > 0 && (
                  <label className="block">
                    <span className="sr-only">Is the drawing about one entry on the record?</span>
                    <select className={field} value={form.crisis_id} onChange={set('crisis_id')}>
                      <option value="">Not about one particular entry</option>
                      {crises.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </label>
                )}
                <input className={field} placeholder="Who holds the copyright, if that is not the artist (optional)" value={form.credit} onChange={set('credit')} />
                <input className={field} placeholder="Your email, so a custodian can reach you (optional)" inputMode="email" value={form.submitter_email} onChange={set('submitter_email')} />
              </div>
            </details>
          </div>

          <p className="mt-2 font-mono text-[10px] leading-relaxed text-record-muted">
            The drawing is stored publicly — anyone with its link can open it.
          </p>

          <button
            onClick={send}
            disabled={busy || readingBusy}
            className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-record-ink px-4 text-[14px] font-semibold text-record-paper disabled:opacity-40"
            style={reading}
          >
            {busy ? 'Sending it to a custodian…' : 'Offer it to the wall'}
          </button>
        </div>
      )}

      {error && (
        <p className="comic-error-note" role="alert" style={reading}>
          {error}
        </p>
      )}
    </div>
  );
}