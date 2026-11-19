import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SmartPaste from '@/components/climate/SmartPaste';
import Field, { fieldClass, hintClass } from '@/components/climate/submit/Field';

// Sending an entry to the wire. The source is not an optional extra here — it is the
// entry's reason for existing. A hidden bot trap sits alongside it, same as the record.

const PUBLISHER_TYPES = [
  { id: 'official_body', label: 'Official body' },
  { id: 'journal', label: 'Journal' },
  { id: 'news_media', label: 'News media' },
  { id: 'ngo', label: 'Organisation on the ground' },
  { id: 'field_dispatch', label: 'A dispatch from someone there' },
  { id: 'document', label: 'A document' },
];

/* ── FOUR SCREENS, NOT SIXTEEN BOXES ───────────────────────────────────────────────
   Same treatment as the record's own form, for the same reason: this one was a single
   black-headed page carrying sixteen boxes at once, so the first thing a person met was
   the size of the job. What changed. Where it is and what others can copy. Who says so.
   Who you are. The bar is paper, the action is the record's red, and the source screen
   still says the one thing that matters: no link, no entry. */
const STEPS = ['What changed', 'Where, and what others can copy', 'Who says so', 'Who you are'];

export default function NewsSubmitForm({ onClose, onSent }) {
  const [form, setForm] = useState({
    headline: '', what_changed: '', kind: 'initiative', when_label: '', where_label: '', country: '',
    publisher_type: 'news_media', source_name: '', source_url: '', source_author: '', corroborating_source: '',
    replicable: '', image_url: '', image_credit: '', submitter_name: '', submitter_email: '',
  });
  const [step, setStep] = useState(0);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [step]);

  const refuseHere = () => {
    if (step === 0) {
      if (!form.headline.trim() || !form.what_changed.trim() || !form.when_label.trim()) {
        return 'The entry in one line, what changed, and when.';
      }
    }
    if (step === 2 && !form.source_name.trim()) return 'Who says so — the body, journal or person behind it.';
    if (step === 3) {
      if (!form.submitter_name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitter_email.trim())) {
        return 'Your name and a valid email are needed.';
      }
    }
    return '';
  };

  const next = () => {
    const refusal = refuseHere();
    if (refusal) { setError(refusal); return; }
    setError('');
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => { setError(''); setStep(s => Math.max(s - 1, 0)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (honeypot) { setSent(true); return; }

    if (!form.headline.trim() || !form.what_changed.trim() || !form.when_label.trim() || !form.source_name.trim()) {
      setError('A headline, what changed, when, and who says so are all needed.');
      return;
    }
    if (!form.submitter_name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitter_email.trim())) {
      setError('Your name and a valid email are needed.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await base44.functions.invoke('climateSubmitReview', { type: 'news', data: form });
      setPublished(res?.data?.status === 'published');
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#efe7d6] flex flex-col items-center justify-start p-6 pt-[16vh] text-center overflow-y-auto" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="w-16 h-16 rounded-full bg-[#1e3a2b] flex items-center justify-center mb-5">
          <Check className="w-8 h-8 text-[#efe7d6]" />
        </div>
        <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '-0.02em' }}>Thank you</h2>
        <p className="text-[13px] font-mono text-[#141210] leading-relaxed max-w-[330px] mb-2">
          {published ? 'It is in climate news now.' : 'This one waits for a person before it appears.'}
        </p>
        <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[330px] mb-6">
          {published
            ? 'Every entry shows its source and how well it is known. If we get something wrong, we correct it in the open.'
            : 'Either a source needs checking, or the screener was unsure. We will email you either way.'}
        </p>
        <button onClick={() => { onSent?.(); onClose?.(); }} className="px-6 py-3 bg-[#b3261e] text-[#f7f1e5] text-[11px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#8f1e18] transition-colors">
          Back to news
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="sticky top-0 z-20 bg-[#efe7d6]/97 backdrop-blur border-b border-[#141210]/25">
        <div className="max-w-[500px] mx-auto px-4 pt-3 pb-2 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-black font-mono uppercase tracking-[0.22em] text-[#b3261e]">Send climate news</p>
            <p className="text-[12px] font-mono text-[#141210] mt-0.5 truncate">
              {step + 1} of {STEPS.length} · {STEPS[step]}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center border border-[#141210]/40 text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-w-[500px] mx-auto px-4 pb-2 flex gap-1">
          {STEPS.map((s, i) => (
            <span key={s} className={`h-[3px] flex-1 ${i <= step ? 'bg-[#b3261e]' : 'bg-[#141210]/15'}`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pt-4 pb-4 max-w-[500px] mx-auto">
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label>Website (leave empty)</label>
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} name="website" />
        </div>

        {/* ── 1 · WHAT CHANGED ──────────────────────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-3">
            <p className={hintClass}>
              Tell us what happened, where and when, and link to the source. Quote only a line or two, never somebody's whole article.
            </p>

            <SmartPaste
              kind="news"
              accept={['title', 'summary', 'details', 'source_name', 'source_url', 'source_author', 'source_date', 'country', 'region_rough', 'publisher_type', 'kind']}
              note="Been sent an email with a link in it? Paste the whole mail. We read it and fill the entry in — the origin link is copied across exactly as it arrived, never guessed."
              onParsed={(f) => setForm(prev => ({
                ...prev,
                headline: f.title || prev.headline,
                what_changed: f.details || f.summary || prev.what_changed,
                when_label: f.source_date || prev.when_label,
                where_label: f.region_rough || prev.where_label,
                country: f.country || prev.country,
                source_name: f.source_name || prev.source_name,
                source_url: f.source_url || prev.source_url,
                source_author: f.source_author || prev.source_author,
                publisher_type: f.publisher_type || prev.publisher_type,
                kind: f.kind || prev.kind,
              }))}
            />

            <Field label="Headline *">
              <input value={form.headline} onChange={e => set('headline', e.target.value)} placeholder="e.g. Eight hectares of seagrass restored in England" className={fieldClass} />
            </Field>

            <Field label="What changed *" hint="Two or three plain sentences. No spin, no opinion.">
              <textarea value={form.what_changed} onChange={e => set('what_changed', e.target.value)} placeholder="Two or three plain sentences — what happened, no spin" rows={5} className={`${fieldClass} resize-none leading-relaxed`} />
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field label="When *">
                <input value={form.when_label} onChange={e => set('when_label', e.target.value)} placeholder="e.g. 10 August 2026" className={fieldClass} />
              </Field>
              <Field label="What kind">
                <select value={form.kind} onChange={e => set('kind', e.target.value)} className={fieldClass}>
                  <option value="initiative">Initiative</option>
                  <option value="emergency">Emergency</option>
                  <option value="milestone">Milestone</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        {/* ── 2 · WHERE, AND WHAT OTHERS CAN COPY ───────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Where (rough)">
                <input value={form.where_label} onChange={e => set('where_label', e.target.value)} placeholder="e.g. Plymouth Sound, England" className={fieldClass} />
              </Field>
              <Field label="Country">
                <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. England" className={fieldClass} />
              </Field>
            </div>

            <Field label="What others can copy" hint="What another person or community can use, and where they could start.">
              <textarea value={form.replicable} onChange={e => set('replicable', e.target.value)} placeholder="e.g. The seed-bag method and the two permits they needed" rows={4} className={`${fieldClass} resize-none leading-relaxed`} />
            </Field>

            <Field label="Image URL">
              <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" className={fieldClass} />
            </Field>

            <Field label="Picture credit" hint="Copyright-free pictures only, and the credit stays with the picture — always.">
              <input value={form.image_credit} onChange={e => set('image_credit', e.target.value)} placeholder="Source · photographer" className={fieldClass} />
            </Field>
          </div>
        )}

        {/* ── 3 · WHO SAYS SO ───────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-3">
            <Field label="Who says so *" hint="The body, journal, publisher or person behind the news. A source is required.">
              <input value={form.source_name} onChange={e => set('source_name', e.target.value)} placeholder="e.g. World Meteorological Organization" className={fieldClass} />
            </Field>

            <Field label="Link to the origin" hint="No link, no entry. Without one it waits for a person to find it or leave it out.">
              <input value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://…" className={fieldClass} />
            </Field>

            <Field label="Who wrote it">
              <input value={form.source_author} onChange={e => set('source_author', e.target.value)} placeholder="e.g. Jack Leitzell" className={fieldClass} />
            </Field>

            <Field label="What kind of origin">
              <select value={form.publisher_type} onChange={e => set('publisher_type', e.target.value)} className={fieldClass}>
                {PUBLISHER_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </Field>

            <Field label="A second, independent origin (if any)">
              <input value={form.corroborating_source} onChange={e => set('corroborating_source', e.target.value)} placeholder="e.g. Reuters, 12 August 2026" className={fieldClass} />
            </Field>
          </div>
        )}

        {/* ── 4 · WHO YOU ARE ───────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Your name *">
                <input value={form.submitter_name} onChange={e => set('submitter_name', e.target.value)} placeholder="Your name" className={fieldClass} />
              </Field>
              <Field label="Your email *">
                <input type="email" value={form.submitter_email} onChange={e => set('submitter_email', e.target.value)} placeholder="you@example.org" className={fieldClass} />
              </Field>
            </div>

            <p className={hintClass}>
              Your email is used only to reach you about this entry, never published, never shared. Details are on the{' '}
              <a href={createPageUrl('ClimatePrivacy')} target="_blank" rel="noopener noreferrer" className="underline text-[#141210]">Privacy page</a>.
            </p>

            <div className="bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] px-3 py-2">
              <p className="text-[9.5px] font-black font-mono uppercase text-[#1e3a2b] mb-1">✓ Sourced · Screened · Never ranked</p>
              <p className="text-[10px] font-mono text-[#141210] leading-snug">
                Sourced entries go on at once; anything unclear, or without a source, waits for a person.
              </p>
            </div>
          </div>
        )}

        {error && <p className="text-[11px] font-mono text-[#b3261e] mt-3 leading-snug">{error}</p>}

        <div className="sticky bottom-0 z-10 -mx-4 mt-4 px-4 py-3 bg-[#efe7d6]/97 backdrop-blur border-t border-[#141210]/20 flex gap-2">
          {step > 0 && (
            <button type="button" onClick={back} className="flex items-center justify-center gap-1.5 px-3 py-3.5 min-h-[52px] border border-[#141210]/40 text-[#141210] text-[11px] font-black font-mono uppercase active:bg-[#141210]/5 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[52px] bg-[#b3261e] text-[#f7f1e5] text-[12px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#8f1e18] transition-colors">
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[52px] bg-[#b3261e] text-[#f7f1e5] text-[12px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#8f1e18] transition-colors disabled:opacity-50">
              <Send className="w-4 h-4" />
              {submitting ? 'Sending…' : 'Send news'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}