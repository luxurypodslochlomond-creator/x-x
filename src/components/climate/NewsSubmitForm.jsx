import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send, Check } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SmartPaste from '@/components/climate/SmartPaste';

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

export default function NewsSubmitForm({ onClose, onSent }) {
  const [form, setForm] = useState({
    headline: '', what_changed: '', kind: 'initiative', when_label: '', where_label: '', country: '',
    publisher_type: 'news_media', source_name: '', source_url: '', source_author: '', corroborating_source: '',
    replicable: '', image_url: '', image_credit: '', submitter_name: '', submitter_email: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

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
      <div className="fixed inset-0 z-[100] bg-[#efe7d6] flex flex-col items-center justify-start p-6 pt-[16vh] text-center overflow-y-auto" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
        <div className="w-16 h-16 rounded-full bg-[#1e3a2b] flex items-center justify-center mb-5">
          <Check className="w-8 h-8 text-[#efe7d6]" />
        </div>
        <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '-0.02em' }}>Thank you</h2>
        <p className="text-[13px] font-mono text-[#141210] leading-relaxed max-w-[330px] mb-2">
          {published ? 'It is on the wire now.' : 'This one waits for a person before it appears.'}
        </p>
        <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[330px] mb-6">
          {published
            ? 'Every entry shows its source and how well it is known. If we get something wrong, we correct it in the open.'
            : 'Either a source needs checking, or the screener was unsure. We will email you either way.'}
        </p>
        <button onClick={() => { onSent?.(); onClose?.(); }} className="px-6 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
          Back to the wire
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>Send an entry</h2>
        <button onClick={onClose} aria-label="Close" className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-[500px] mx-auto">
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label>Website (leave empty)</label>
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} name="website" />
        </div>

        <p className="text-[10px] font-mono text-[#5a5246] mb-4 leading-relaxed">
          An entry is a fact with a traceable origin. What changed, where, when, and who says so. Point at the origin and quote only a line or two — never paste somebody's article in full.
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

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">The entry in one line *</label>
            <input value={form.headline} onChange={e => set('headline', e.target.value)} placeholder="e.g. Eight hectares of seagrass restored in England" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">What changed *</label>
            <textarea value={form.what_changed} onChange={e => set('what_changed', e.target.value)} placeholder="Two or three plain sentences — what happened, no spin" rows={4} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">When *</label>
              <input value={form.when_label} onChange={e => set('when_label', e.target.value)} placeholder="e.g. 10 August 2026" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Where (rough)</label>
              <input value={form.where_label} onChange={e => set('where_label', e.target.value)} placeholder="e.g. Plymouth Sound, England" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">What kind</label>
            <select value={form.kind} onChange={e => set('kind', e.target.value)} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] outline-none focus:border-[#e2602a]">
              <option value="initiative">Initiative — something working that others can copy</option>
              <option value="emergency">Emergency — the world needs to know</option>
              <option value="milestone">Milestone — a report, warning or decision</option>
            </select>
          </div>

          <div className="border-t-2 border-[#141210]/20 pt-3">
            <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-3">The origin — this is the entry</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Who says so *</label>
                <input value={form.source_name} onChange={e => set('source_name', e.target.value)} placeholder="e.g. World Meteorological Organization" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Who wrote it</label>
                <input value={form.source_author} onChange={e => set('source_author', e.target.value)} placeholder="e.g. Jack Leitzell" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Link to the origin</label>
                <input value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://…" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
                <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">No link, no entry. Without one it waits for a person to find it or leave it out.</p>
              </div>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">What kind of origin</label>
                <select value={form.publisher_type} onChange={e => set('publisher_type', e.target.value)} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] outline-none focus:border-[#e2602a]">
                  {PUBLISHER_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">A second, independent origin (if any)</label>
                <input value={form.corroborating_source} onChange={e => set('corroborating_source', e.target.value)} placeholder="e.g. Reuters, 12 August 2026" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">What can be copied from this</label>
            <textarea value={form.replicable} onChange={e => set('replicable', e.target.value)} placeholder="What could another person or community do the same way, and where would they start?" rows={3} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Picture URL</label>
              <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Picture credit</label>
              <input value={form.image_credit} onChange={e => set('image_credit', e.target.value)} placeholder="Source · photographer" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
          </div>
          <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed">Copyright-free pictures only, and the credit stays with the picture — always.</p>

          <div className="border-t-2 border-[#141210]/20 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Your name *</label>
                <input value={form.submitter_name} onChange={e => set('submitter_name', e.target.value)} placeholder="Your name" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Your email *</label>
                <input type="email" value={form.submitter_email} onChange={e => set('submitter_email', e.target.value)} placeholder="you@example.org" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
            </div>
            <p className="text-[10px] font-mono text-[#5a5246] mt-3 leading-relaxed">
              Your email is used only to reach you about this entry, never published, never shared. Details are on the{' '}
              <a href={createPageUrl('ClimatePrivacy')} target="_blank" rel="noopener noreferrer" className="underline text-[#141210]">Privacy page</a>.
            </p>
          </div>
        </div>

        {error && <p className="text-[11px] font-mono text-[#b3261e] mt-4">{error}</p>}

        <div className="mt-4 bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] p-3">
          <p className="text-[10px] font-black font-mono uppercase text-[#1e3a2b] mb-1">✓ Sourced · Screened · Never ranked</p>
          <p className="text-[10px] font-mono text-[#141210] leading-relaxed">
            Every entry is screened for spam and dangerous advice. Sourced entries go on at once; anything unclear, or without a source, waits for a person.
          </p>
        </div>

        <button type="submit" disabled={submitting} className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50">
          <Send className="w-4 h-4" />
          {submitting ? 'Sending…' : 'Send to the wire'}
        </button>
      </form>
    </div>
  );
}