import React, { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { Undo2, Eraser, Sparkles, Loader2, Check, ArrowRight, Ruler } from 'lucide-react';
import InkCanvas from '@/components/climate/cartoons/ink/InkCanvas';
import { stampStroke } from '@/components/climate/cartoons/ink/inkStroke';

// ── THE CARTOON DESK ──────────────────────────────────────────────────────────
// Three panels, a pen that behaves like a pen, and the words the drawing says. A child draws,
// types what each panel says, and the desk puts the three of them together as one strip — a
// cartoon, not a picture. Then it is signed, and it is offered to the wall.
//
// What changed, and why. The pen used to lay down a line of one width from end to end, which
// is what every flat drawing surface does and why it felt like an old toy: nothing about the
// mark remembered a hand. Now every point of a stroke carries its own width, taken from how
// fast the hand moved and how hard the pen pressed, and the stroke thins as it lifts off the
// page. The screen and the printed strip are drawn by the same renderer, so the line on the
// paper is the line that was drawn — not a preview of it.
//
// Everything kept from the record's argument is kept because it is not decoration:
//
//   · The words in the strip are the child's. No model drafts them and no model is asked
//     what the drawing means — which is also why this costs nothing to run.
//   · The strip is finished on her own device. Nothing leaves the phone until she presses
//     the button at the end, so scribbling, undoing and starting again are free and private.
//   · A person looks at it before it goes on the wall, because a drawing cannot be checked
//     by a machine and a public wall is not a place to guess.

const SIZE = 640; // the drawn square, in its own pixels — scaled by the browser to fit
const PW = 380; // a panel in the finished strip
const GAP = 14;
const M = 18;
const CAP = 132;
const FOOT = 72;

const INKS = [
  { name: 'Ink', hex: '#1a1612' },
  { name: 'Red', hex: '#b3261e' },
  { name: 'Orange', hex: '#e2602a' },
  { name: 'Ocean', hex: '#0f5f7a' },
  { name: 'Leaf', hex: '#3f6b47' },
  { name: 'Sun', hex: '#e3aa2b' },
];

// Fine for a face, Pen for the drawing, Marker for a shape that has to read across a room.
const NIBS = [
  { label: 'Fine', w: 6 },
  { label: 'Pen', w: 14 },
  { label: 'Marker', w: 30 },
];

// A brief to start from, for the child who opens the page and says "draw what?". Rotates
// on a tap, never repeats itself twice running.
const BRIEFS = [
  'A bus that eats its own smoke.',
  'A fridge begging you to shut the door.',
  'A tree that keeps a bank account.',
  'Clouds queuing for a drink.',
  'A bin that says thank you.',
  'The last iceberg, in a deckchair.',
  'A river with a passport.',
  'A polar bear ordering iced tea.',
  'Your street in 2050 — draw it better.',
  'A sun with a customer service line.',
  'A seagull reviewing a plastic bag.',
  'A puddle that remembers the sea.',
];

const field =
  'w-full min-h-[48px] px-3 text-[15px] bg-record-paper border-2 border-record-ink/25 text-record-ink placeholder:text-record-muted focus:border-record-ink focus:outline-none';

const reading = { fontFamily: 'var(--font-reading)' };

const wrapText = (ctx, text, maxWidth) => {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
};

export default function CartoonMaker() {
  const [panels, setPanels] = useState([
    { strokes: [], caption: '' },
    { strokes: [], caption: '' },
    { strokes: [], caption: '' },
  ]);
  const [active, setActive] = useState(0);
  const [hex, setHex] = useState(INKS[0].hex);
  const [nib, setNib] = useState(NIBS[1].w);
  const [guide, setGuide] = useState(true);
  const [brief, setBrief] = useState(BRIEFS[0]);
  const [mode, setMode] = useState('make'); // make | sign | sent
  const [preview, setPreview] = useState('');
  const [strip, setStrip] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ artist_name: '', origin: '', title: '', for_line: '', submitter_email: '' });

  // Every stroke on the strip is numbered as it is made, whichever panel it lands in. That is
  // what lets Undo mean "the last thing I did" rather than "the last thing I did in this
  // panel" — a child who draws panel one, moves to panel two and wants the first mark gone
  // should not have to work out where it was.
  const seqRef = useRef(0);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const addStroke = (stroke) => {
    seqRef.current += 1;
    const numbered = { ...stroke, seq: seqRef.current };
    setPanels((list) =>
      list.map((panel, i) => (i === active ? { ...panel, strokes: [...panel.strokes, numbered] } : panel))
    );
  };

  const undo = () => {
    let latest = null;
    panels.forEach((panel) => {
      panel.strokes.forEach((stroke) => {
        if (!latest || (stroke.seq || 0) > (latest.seq || 0)) latest = stroke;
      });
    });
    if (!latest) return;
    setPanels((list) =>
      list.map((panel) => ({ ...panel, strokes: panel.strokes.filter((stroke) => stroke !== latest) }))
    );
  };

  const wipe = () =>
    setPanels((list) => list.map((panel, i) => (i === active ? { ...panel, strokes: [] } : panel)));

  const setCaption = (value) =>
    setPanels((list) => list.map((panel, i) => (i === active ? { ...panel, caption: value } : panel)));

  const switchTo = (index) => setActive(index);

  const used = panels.filter((panel) => panel.strokes.length || panel.caption.trim());
  const drawn = panels.some((panel) => panel.strokes.length);

  // ── THE STRIP ───────────────────────────────────────────────────────────────
  // The panels and the words are drawn into one picture on the device: the thing a child
  // gets to keep, share, or print for the fridge. Only the panels that were actually used
  // go in, so a one-panel cartoon is a one-panel cartoon rather than two blank frames.
  const compose = async (name, origin) => {
    const { DISPLAY, MONO } = await loadRecordCardFonts();
    const n = used.length;
    const W = M * 2 + PW * n + GAP * (n - 1);
    const H = M + PW + CAP + FOOT + M;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f4efe4';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#b3261e';
    ctx.fillRect(0, 0, W, 5);

    used.forEach((panel, i) => {
      const x = M + i * (PW + GAP);
      const y = M;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, PW, PW);
      ctx.strokeStyle = '#1a1612';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 1.5, y + 1.5, PW - 3, PW - 3);

      // The same nib that drew it, stamped at the panel's size.
      const scale = PW / SIZE;
      panel.strokes.forEach((stroke) => stampStroke(ctx, stroke, { x, y, scale }));

      if (panel.caption.trim()) {
        ctx.fillStyle = '#1a1612';
        ctx.font = `400 21px ${MONO}`;
        wrapText(ctx, panel.caption.trim(), PW - 14)
          .slice(0, 4)
          .forEach((line, k) => ctx.fillText(line, x, y + PW + 34 + k * 27));
      }
    });

    const fy = M + PW + CAP + 20;
    ctx.strokeStyle = 'rgba(26,22,18,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(M, fy - 14);
    ctx.lineTo(W - M, fy - 14);
    ctx.stroke();
    ctx.fillStyle = '#1a1612';
    ctx.font = `700 20px ${DISPLAY}`;
    ctx.fillText(name ? `Drawn by ${name}` : 'A cartoon for the climate', M, fy + 12);
    if (origin) {
      ctx.fillStyle = '#6b6258';
      ctx.font = `400 15px ${MONO}`;
      ctx.fillText(origin.slice(0, 58), M, fy + 36);
    }
    ctx.fillStyle = '#b3261e';
    ctx.font = `700 13px ${DISPLAY}`;
    ctx.textAlign = 'right';
    ctx.fillText('THE REAL PICTURE · x = x', W - M, fy + 12);
    ctx.textAlign = 'left';

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  };

  const toSign = async () => {
    if (!used.length) {
      setError('Nothing drawn yet — one panel is enough to start.');
      return;
    }
    setError('');
    const blob = await compose(form.artist_name, form.origin);
    if (!blob) {
      setError('The cartoon could not be put together. Try once more.');
      return;
    }
    setStrip(blob);
    setPreview(URL.createObjectURL(blob));
    setMode('sign');
  };

  const offer = async () => {
    if (!form.artist_name.trim()) {
      setError('Whose hand drew it? A name, please.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const blob = (await compose(form.artist_name, form.origin)) || strip;
      if (!blob) throw new Error('no image');
      const file = new File([blob], 'a-cartoon.png', { type: 'image/png' });
      const uploaded = await base44.integrations.Core.UploadPublicFile({ file });
      const image_url = uploaded?.file_url;
      if (!image_url) throw new Error('no url');
      await base44.functions.invoke('climateCartoon', {
        action: 'send',
        image_url,
        artist_name: form.artist_name,
        origin: form.origin,
        title: form.title,
        for_line: form.for_line,
        submitter_email: form.submitter_email,
      });
      setMode('sent');
    } catch (e) {
      setError(e?.response?.data?.error || 'That did not go through. Nothing was sent.');
    } finally {
      setBusy(false);
    }
  };

  const again = () => {
    setMode('make');
    setPanels([
      { strokes: [], caption: '' },
      { strokes: [], caption: '' },
      { strokes: [], caption: '' },
    ]);
    setActive(0);
    setPreview('');
    setStrip(null);
    setError('');
  };

  // ── DONE ────────────────────────────────────────────────────────────────────
  if (mode === 'sent') {
    return (
      <div className="border-2 border-record-ink bg-record-bone p-5 shadow-[6px_6px_0_rgb(26_22_18)]">
        <p className="inline-flex items-center gap-2 text-[19px] font-semibold leading-tight text-record-ink" style={reading}>
          <Check className="h-5 w-5 text-record-red" strokeWidth={3} /> It is with a person.
        </p>
        <p className="mt-2 text-[14px] leading-[1.6] text-record-muted" style={reading}>
          A custodian looks at every cartoon before it goes up. When they put yours up it appears on the wall below, with
          your name on it.
        </p>
        <button
          type="button"
          onClick={again}
          className="mt-4 inline-flex min-h-[48px] items-center gap-2 border-2 border-record-ink bg-record-ink px-4 text-[15px] font-bold text-record-paper"
          style={reading}
        >
          Make another <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    );
  }

  // ── SIGNING IT ──────────────────────────────────────────────────────────────
  if (mode === 'sign') {
    return (
      <div className="border-2 border-record-ink bg-record-bone p-3 shadow-[6px_6px_0_rgb(26_22_18)] lg:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-red">Your cartoon</p>
        {preview && (
          <img
            src={preview}
            alt="The cartoon you just made"
            className="mt-2 block w-full border-2 border-record-ink bg-record-paper"
          />
        )}
        <div className="mt-3 space-y-2">
          <input className={field} placeholder="Who drew it — the name for the wall" value={form.artist_name} onChange={set('artist_name')} />
          <input className={field} placeholder="Where it came from — school, class, country" value={form.origin} onChange={set('origin')} />
          <input className={field} placeholder="What is it called? (optional)" value={form.title} onChange={set('title')} />
          <textarea
            className={`${field} min-h-[76px] py-2`}
            placeholder="One line, your words: what is this cartoon for?"
            value={form.for_line}
            onChange={set('for_line')}
          />
          <input className={field} placeholder="A grown-up's email, if you want to hear about it (optional)" inputMode="email" value={form.submitter_email} onChange={set('submitter_email')} />
        </div>
        <p className="mt-2 font-mono text-[10px] leading-relaxed text-record-muted">
          Your cartoon is stored publicly — anyone with its link can open it.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setMode('make')}
            className="inline-flex min-h-[52px] items-center border-2 border-record-ink px-4 text-[15px] font-semibold text-record-ink"
            style={reading}
          >
            Keep drawing
          </button>
          <button
            type="button"
            onClick={offer}
            disabled={busy}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 border-2 border-record-ink bg-record-ink px-4 text-[15px] font-bold text-record-paper disabled:opacity-40"
            style={reading}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {busy ? 'Sending…' : 'Give it to the wall'}
          </button>
        </div>
        {error && (
          <p className="comic-error-note" role="alert" style={reading}>
            {error}
          </p>
        )}
      </div>
    );
  }

  // ── MAKING IT ───────────────────────────────────────────────────────────────
  return (
    <div className="border-2 border-record-ink bg-record-bone p-3 shadow-[6px_6px_0_rgb(26_22_18)] lg:p-5">
      {/* A brief, for the child who does not know where to start */}
      <button
        type="button"
        onClick={() => {
          const rest = BRIEFS.filter((item) => item !== brief);
          setBrief(rest[Math.floor(Math.random() * rest.length)]);
        }}
        className="flex w-full items-start gap-2 border-2 border-dashed border-record-ink/40 bg-record-paper px-3 py-2.5 text-left active:bg-record-bone"
      >
        <Sparkles className="mt-[3px] h-4 w-4 flex-shrink-0 text-record-red" strokeWidth={2.2} />
        <span className="flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-record-ink" style={reading}>{brief}</span>
          <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-record-muted">
            Tap for another idea
          </span>
        </span>
      </button>

      {/* Which panel you are on */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {panels.map((panel, index) => {
          const on = index === active;
          const hasMark = panel.strokes.length > 0 || panel.caption.trim();
          return (
            <button
              key={index}
              type="button"
              onClick={() => switchTo(index)}
              className={`flex min-h-[46px] items-center justify-center gap-1.5 border-2 text-[14px] font-bold transition-colors ${
                on ? 'border-record-ink bg-record-ink text-record-paper' : 'border-record-ink/25 bg-record-paper text-record-ink'
              }`}
              style={reading}
              aria-pressed={on}
            >
              Panel {index + 1}
              {hasMark && <span className={`h-2 w-2 rounded-full ${on ? 'bg-record-paper' : 'bg-record-red'}`} />}
            </button>
          );
        })}
      </div>

      <InkCanvas
        strokes={panels[active].strokes}
        onStroke={addStroke}
        hex={hex}
        nib={nib}
        guide={guide}
      />

      {/* The pen */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {INKS.map((ink) => (
          <button
            key={ink.name}
            type="button"
            onClick={() => setHex(ink.hex)}
            aria-label={ink.name}
            aria-pressed={hex === ink.hex}
            className={`h-9 w-9 rounded-full border-2 transition-transform active:scale-90 ${
              hex === ink.hex ? 'scale-110 border-record-ink' : 'border-record-ink/20'
            }`}
            style={{ backgroundColor: ink.hex }}
          />
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          {NIBS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setNib(item.w)}
              aria-pressed={nib === item.w}
              aria-label={item.label}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                nib === item.w ? 'border-record-ink bg-record-paper' : 'border-record-ink/20'
              }`}
            >
              <span
                className="rounded-full bg-record-ink"
                style={{ width: Math.max(4, item.w * 0.5), height: Math.max(4, item.w * 0.5) }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={undo}
          disabled={!drawn}
          className="inline-flex min-h-[46px] items-center gap-1.5 border-2 border-record-ink/25 px-3 text-[13px] font-semibold text-record-ink disabled:opacity-30"
          style={reading}
        >
          <Undo2 className="h-4 w-4" strokeWidth={2.2} /> Undo
        </button>
        <button
          type="button"
          onClick={wipe}
          disabled={!panels[active].strokes.length}
          className="inline-flex min-h-[46px] items-center gap-1.5 border-2 border-record-ink/25 px-3 text-[13px] font-semibold text-record-ink disabled:opacity-30"
          style={reading}
        >
          <Eraser className="h-4 w-4" strokeWidth={2.2} /> Clear panel
        </button>
        <button
          type="button"
          onClick={() => setGuide((on) => !on)}
          aria-pressed={guide}
          className={`ml-auto inline-flex min-h-[46px] items-center gap-1.5 border-2 px-3 text-[13px] font-semibold ${
            guide ? 'border-record-ink bg-record-paper text-record-ink' : 'border-record-ink/25 text-record-muted'
          }`}
          style={reading}
        >
          <Ruler className="h-4 w-4" strokeWidth={2.2} /> Guide
        </button>
      </div>

      {/* What it says */}
      <div className="mt-2 border-2 border-record-ink/25 bg-record-paper p-2">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-record-muted">Panel {active + 1} says</p>
        <textarea
          className="mt-1 min-h-[58px] w-full resize-none bg-transparent text-[16px] leading-snug text-record-ink placeholder:text-record-muted focus:outline-none"
          style={reading}
          placeholder="Type the words in this panel…"
          value={panels[active].caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={toSign}
        disabled={!used.length}
        className="mt-3 inline-flex min-h-[54px] w-full items-center justify-center gap-2 border-2 border-record-ink bg-record-ink px-4 text-[16px] font-bold text-record-paper disabled:opacity-30"
        style={reading}
      >
        Make my cartoon <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
      </button>
      <p className="mt-1.5 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-record-muted">
        Nothing leaves this phone until you say so
      </p>

      {error && (
        <p className="comic-error-note" role="alert" style={reading}>
          {error}
        </p>
      )}
    </div>
  );
}