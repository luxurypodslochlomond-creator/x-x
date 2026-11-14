import React, { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Undo2, RotateCcw, Loader2, Check } from 'lucide-react';

// ── THE PAD ───────────────────────────────────────────────────────────────────
// A drawing pad that works with a thumb, because that is the hand a nine-year-old
// actually has. Everything else in this room asks a child to make it somewhere else and
// bring it here; this asks them to make it here. That is the whole idea of the room, so
// the pad is the first thing on the page and it takes no tapping to find.
//
// Three decisions worth keeping:
//
//   1. No machine sentence on a child's drawing. Everywhere else in the record a picture
//      gets one line from the machine, offered to the drawer to rewrite. Here the line is
//      the child's from the first word, and the machine is not asked at all — it costs
//      nothing, it is more honest, and no nine-year-old should have her sentence drafted
//      for her by something she cannot argue with.
//   2. The picture is drawn at one size (900 wide) and scaled down by the browser, so the
//      file that reaches the wall is the same on any phone and no canvas maths has to
//      guess at a screen density.
//   3. Nothing is stored until the drawing is finished, named and offered — so a child can
//      scribble, undo, start again, and nothing of that ever leaves the phone.

const W = 900;
const H = 675;

// The record's own ink, plus the three colours a climate drawing needs. Written as
// concrete values because a canvas cannot read a CSS token — this is paint, not styling.
const CRAYONS = [
  { name: 'Ink', hex: '#1a1612' },
  { name: 'Red', hex: '#b3261e' },
  { name: 'Orange', hex: '#e2602a' },
  { name: 'Ocean', hex: '#0f5f7a' },
  { name: 'Leaf', hex: '#3f6b47' },
  { name: 'Sun', hex: '#e3aa2b' },
];

const NIBS = [
  { label: 'Thin', w: 6 },
  { label: 'Fatter', w: 15 },
  { label: 'Fat', w: 28 },
];

const field =
  'w-full min-h-[46px] px-3 text-[15px] bg-record-paper border border-record-ink/25 text-record-ink placeholder:text-record-muted';

const reading = { fontFamily: 'var(--font-reading)' };

export default function DrawPad() {
  const canvasRef = useRef(null);
  const liveRef = useRef(null);
  const [strokes, setStrokes] = useState([]);
  const [hex, setHex] = useState(CRAYONS[0].hex);
  const [nib, setNib] = useState(NIBS[1].w);
  const [step, setStep] = useState('draw'); // draw | form | working | sent
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ artist_name: '', origin: '', title: '', for_line: '', submitter_email: '' });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const paint = (list) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    list.forEach((stroke) => {
      ctx.strokeStyle = stroke.hex;
      ctx.fillStyle = stroke.hex;
      ctx.lineWidth = stroke.w;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (stroke.pts.length === 1) {
        const [p] = stroke.pts;
        ctx.beginPath();
        ctx.arc(p.x, p.y, stroke.w / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.beginPath();
      stroke.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();
    });
  };

  useEffect(() => {
    paint(strokes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  const at = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * W,
      y: ((event.clientY - rect.top) / rect.height) * H,
    };
  };

  const down = (event) => {
    if (step !== 'draw') return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const stroke = { hex, w: nib, pts: [at(event)] };
    liveRef.current = stroke;
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.arc(stroke.pts[0].x, stroke.pts[0].y, nib / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const move = (event) => {
    const stroke = liveRef.current;
    if (!stroke) return;
    const point = at(event);
    const previous = stroke.pts[stroke.pts.length - 1];
    stroke.pts.push(point);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = stroke.hex;
    ctx.lineWidth = stroke.w;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const up = () => {
    const stroke = liveRef.current;
    if (!stroke) return;
    liveRef.current = null;
    setStrokes((list) => [...list, stroke]);
  };

  const undo = () => setStrokes((list) => list.slice(0, -1));
  const again = () => {
    liveRef.current = null;
    setStrokes([]);
  };

  const offer = async () => {
    if (!form.artist_name.trim()) {
      setError('Whose hand drew it? A name, please.');
      return;
    }
    if (!strokes.length) {
      setError('The page is still blank. Draw something first.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const blob = await new Promise((resolve) => canvasRef.current.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('no image');
      const file = new File([blob], 'a-drawing.png', { type: 'image/png' });
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
      setStep('sent');
    } catch (e) {
      setError(e?.response?.data?.error || 'That did not go through. Nothing was sent.');
    } finally {
      setBusy(false);
    }
  };

  if (step === 'sent') {
    return (
      <div className="border-2 border-record-ink/25 bg-record-bone p-4 lg:p-5">
        <p className="inline-flex items-center gap-2 text-[16px] font-semibold text-record-ink" style={reading}>
          <Check className="h-4 w-4 text-record-red" strokeWidth={2.6} /> It is on its way to the wall.
        </p>
        <p className="mt-2 text-[14px] leading-[1.65] text-record-muted" style={reading}>
          A person looks at every drawing before it goes up. When they put yours up it appears on this page, with your
          name on it and your line underneath.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-record-ink/25 bg-record-bone p-3 lg:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[17px] font-semibold leading-tight text-record-ink" style={reading}>
          Draw it here, with your thumb
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">No sign-up</p>
      </div>

      {/* THE SHEET ITSELF — white paper, a fat nib, and nothing else in the way */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
        className="mt-3 block w-full touch-none border border-record-ink/25 bg-white"
        style={{ aspectRatio: `${W} / ${H}`, cursor: step === 'draw' ? 'crosshair' : 'default' }}
        aria-label="A blank sheet to draw on"
      />

      {step === 'draw' && (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {CRAYONS.map((crayon) => (
              <button
                key={crayon.name}
                type="button"
                onClick={() => setHex(crayon.hex)}
                aria-label={crayon.name}
                aria-pressed={hex === crayon.hex}
                className={`h-10 w-10 rounded-full border-2 transition-transform active:scale-95 ${
                  hex === crayon.hex ? 'border-record-ink scale-105' : 'border-record-ink/25'
                }`}
                style={{ backgroundColor: crayon.hex }}
              />
            ))}
            <div className="ml-auto flex items-center gap-2">
              {NIBS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setNib(item.w)}
                  aria-pressed={nib === item.w}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    nib === item.w ? 'border-record-ink bg-record-paper' : 'border-record-ink/20'
                  }`}
                >
                  <span
                    className="rounded-full bg-record-ink"
                    style={{ width: Math.max(5, item.w * 0.55), height: Math.max(5, item.w * 0.55) }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={!strokes.length}
              className="inline-flex min-h-[44px] items-center gap-2 border border-record-ink/25 px-3 text-[13px] text-record-ink disabled:opacity-35"
              style={reading}
            >
              <Undo2 className="h-4 w-4" strokeWidth={1.9} /> Undo
            </button>
            <button
              type="button"
              onClick={again}
              disabled={!strokes.length}
              className="inline-flex min-h-[44px] items-center gap-2 border border-record-ink/25 px-3 text-[13px] text-record-ink disabled:opacity-35"
              style={reading}
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.9} /> Start again
            </button>
            <button
              type="button"
              onClick={() => setStep('form')}
              disabled={!strokes.length}
              className="ml-auto inline-flex min-h-[46px] items-center bg-record-ink px-4 text-[14px] font-semibold text-record-paper disabled:opacity-35"
              style={reading}
            >
              Finished — sign it
            </button>
          </div>
          <p className="mt-2 text-[12.5px] leading-[1.55] text-record-muted" style={reading}>
            Nothing leaves your phone until you press <span className="font-semibold text-record-ink">Finished</span>.
            Scribble, undo, start again — it costs nothing.
          </p>
        </>
      )}

      {step === 'form' && (
        <div className="mt-3">
          <div className="space-y-2">
            <input className={field} placeholder="Who drew it — your name, or the name you want on the wall" value={form.artist_name} onChange={set('artist_name')} />
            <input className={field} placeholder="Where it came from — a school, a class, a workshop, a country" value={form.origin} onChange={set('origin')} />
            <input className={field} placeholder="What is it called? (if it has a name)" value={form.title} onChange={set('title')} />
            <textarea
              className={`${field} min-h-[76px] py-2`}
              placeholder="One line, in your own words: what is this drawing for?"
              value={form.for_line}
              onChange={set('for_line')}
            />
            <input className={field} placeholder="A grown-up's email, only if you want to hear about it (optional)" inputMode="email" value={form.submitter_email} onChange={set('submitter_email')} />
          </div>
          <p className="mt-2 font-mono text-[10px] leading-relaxed text-record-muted">
            Your drawing is stored publicly — anyone with its link can open it.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setStep('draw')}
              className="inline-flex min-h-[48px] items-center border border-record-ink/25 px-4 text-[14px] text-record-ink"
              style={reading}
            >
              Back to the drawing
            </button>
            <button
              type="button"
              onClick={offer}
              disabled={busy}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-record-ink px-4 text-[14px] font-semibold text-record-paper disabled:opacity-40"
              style={reading}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {busy ? 'Sending…' : 'Give it to the wall'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 border-l-2 border-record-red pl-3 text-[13.5px] leading-[1.6] text-record-ink" style={reading}>
          {error}
        </p>
      )}
    </div>
  );
}