import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ImagePlus, Loader2, Check } from 'lucide-react';

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

export default function CartoonSendIn() {
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
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onFile = async (file) => {
    if (!file) return;
    setError('');
    setStep('working');
    try {
      const smaller = await shrink(file);
      const uploaded = await base44.integrations.Core.UploadPublicFile({ file: smaller });
      const url = uploaded?.file_url;
      if (!url) throw new Error('no url');
      setImageUrl(url);

      const res = await base44.functions.invoke('climateCartoon', { action: 'read', image_url: url });
      const data = res?.data || {};
      const line = data.line || '';
      setMachineLine(line);
      setForm((f) => ({ ...f, for_line: f.for_line || line }));
      setStep('ready');
    } catch (e) {
      setError('That did not go through. Try the drawing once more.');
      setStep('idle');
    }
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
          The drawing is not on the wall yet, and will not be until a custodian has looked at it. When they put it up it
          appears above, with the name you gave and your line.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-record-ink/20 bg-record-bone/60 p-4 lg:p-5">
      <p className="text-[15px] font-semibold text-record-ink" style={reading}>
        Bring a drawing to the wall
      </p>
      <p className="mt-1 text-[13px] leading-[1.6] text-record-muted" style={reading}>
        A photograph of it is enough. The record will say what it can see, in one line — then you say it properly.
      </p>

      {step === 'idle' && (
        <label className="mt-3 flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 border border-dashed border-record-ink/40 bg-record-paper px-3 text-[14px] text-record-ink active:border-record-red">
          <ImagePlus className="h-4 w-4" strokeWidth={1.8} />
          Choose a photograph of the drawing
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      )}

      {step === 'working' && (
        <p className="mt-3 inline-flex items-center gap-2 text-[13.5px] text-record-muted" style={reading}>
          <Loader2 className="h-4 w-4 animate-spin" /> Storing it, then reading it…
        </p>
      )}

      {step === 'ready' && (
        <div className="mt-3">
          <img src={imageUrl} alt="The drawing you chose" className="block max-h-56 w-auto border border-record-ink/15" />

          {machineLine && (
            <div className="mt-3 border-l-2 border-record-red/50 pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-record-muted">
                The record’s machine saw this
              </p>
              <p className="mt-1 text-[13.5px] leading-[1.55] text-record-ink" style={reading}>{machineLine}</p>
              <p className="mt-1 text-[11.5px] leading-[1.5] text-record-muted" style={reading}>
                It is a machine’s sentence and it may be wrong. The box below is yours — put it in the drawer’s words.
              </p>
            </div>
          )}

          <div className="mt-3 space-y-2">
            <input className={field} placeholder="Who drew it — their name as it should appear" value={form.artist_name} onChange={set('artist_name')} />
            <input className={field} placeholder="Where it came from — the workshop, the school, the group" value={form.origin} onChange={set('origin')} />
            <input className={field} placeholder="What it is called (if it has a name)" value={form.title} onChange={set('title')} />
            <textarea
              className={`${field} min-h-[74px] py-2`}
              placeholder="One line on what it is for, in your own words"
              value={form.for_line}
              onChange={set('for_line')}
            />
            <input className={field} placeholder="Who holds the copyright, if that is not the artist (optional)" value={form.credit} onChange={set('credit')} />
            <input className={field} placeholder="Your email, so a custodian can reach you (optional)" inputMode="email" value={form.submitter_email} onChange={set('submitter_email')} />
          </div>

          <p className="mt-2 font-mono text-[10px] leading-relaxed text-record-muted">
            The drawing is stored publicly — anyone with its link can open it.
          </p>

          <button
            onClick={send}
            disabled={busy}
            className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-record-ink px-4 text-[14px] font-semibold text-record-paper disabled:opacity-40"
            style={reading}
          >
            {busy ? 'Sending it to a custodian…' : 'Offer it to the wall'}
          </button>
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