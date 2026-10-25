import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send, Check, Leaf, AlertTriangle, Sprout } from 'lucide-react';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import { createPageUrl } from '@/utils';
import SmartPaste from '@/components/climate/SmartPaste';

function SuccessScreen({ entryType, onClose, published }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const what = entryType === 'solution' ? 'solution' : entryType === 'climate_crisis' ? 'climate crisis report' : 'action';
  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] flex flex-col items-center justify-start p-6 pt-[16vh] text-center overflow-y-auto">
      <div className="w-16 h-16 rounded-full bg-[#1e3a2b] flex items-center justify-center mb-5">
        <Check className="w-8 h-8 text-[#efe7d6]" />
      </div>
      <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '-0.02em' }}>
        Thank you
      </h2>
      <p className="text-[13px] font-mono text-[#141210] leading-relaxed max-w-[320px] mb-2">
        {published ? `Your ${what} is on the record now.` : `Your ${what} is with us for a quick check.`}
      </p>
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[320px] mb-6">
        {published
          ? 'It went up straight away — sharing something small counts, that is the whole point of this record. A reviewer can take it down, and we would email you first.'
          : 'The spam screen was unsure about this one, so a person will look before it appears. We will email you either way.'}
      </p>
      <button onClick={onClose} className="px-6 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
        Back to the record
      </button>
    </div>
  );
}

export default function ClimateSubmitForm({ onClose }) {
  const { categories } = useClimateCategories();
  const [entryType, setEntryType] = useState('solution');
  const [form, setForm] = useState({
    title: '', summary: '', details: '', category: 'agriculture',
    country: '', region_rough: '', image_url: '', source_name: '', source_url: '',
    source_author: '', source_date: '',
    submitter_name: '', submitter_email: '',
    // Action-specific fields
    action_type: 'cleanup', date: '', contact_link: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden bot trap — humans never see this

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const RATE_LIMIT_KEY = 'climate_submit_times';
  const MAX_PER_HOUR = 3;

  const checkRateLimit = () => {
    try {
      const now = Date.now();
      const times = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]')
        .filter(t => now - t < 3600000); // keep only last hour
      if (times.length >= MAX_PER_HOUR) return false;
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([...times, now]));
      return true;
    } catch { return true; } // if localStorage fails, don't block real users
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Honeypot — if filled, a bot did it. Silently pretend success.
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const isAction = entryType === 'action';
    if (isAction) {
      if (!form.title.trim() || !form.description?.trim() || !form.contact_link.trim() || !form.submitter_name.trim() || !form.submitter_email.trim()) {
        setError("Title, what's happening, a contact link, your name, and your email are all needed.");
        return;
      }
    } else {
      if (!form.title.trim() || !form.summary.trim() || !form.submitter_name.trim() || !form.submitter_email.trim()) {
        setError('Title, summary, your name, and your email are all needed.');
        return;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitter_email.trim())) {
      setError('Please give a valid email.');
      return;
    }
    if (!checkRateLimit()) {
      setError('Too many submissions this hour. Please wait a bit and try again.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await base44.functions.invoke('climateSubmitReview', {
        type: entryType,
        data: { ...form, entry_type: entryType }
      });
      setPublished(res?.data?.status === 'published');
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen entryType={entryType} onClose={onClose} published={published} />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
          Submit to the record
        </h2>
        <button onClick={onClose} aria-label="Close" className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-[500px] mx-auto">
        {/* Honeypot — hidden from humans, bots auto-fill it */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label>Website (leave empty)</label>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            name="website"
          />
        </div>
        {/* Sent an email? The machine reads it and fills the form in. */}
        <SmartPaste
          kind={entryType === 'action' ? 'action' : entryType}
          categories={categories.map(c => ({ id: c.id, label: c.label }))}
          accept={['title', 'summary', 'details', 'source_name', 'source_url', 'source_author', 'source_date', 'category', 'country', 'region_rough']}
          note="Been sent an email about this? Paste the whole mail — heading, link, quote and all. We read it and fill the form in."
          onParsed={(f) => setForm(prev => entryType === 'action'
            ? { ...prev, title: f.title || prev.title, description: f.details || f.summary || prev.description, country: f.country || prev.country }
            : {
                ...prev,
                title: f.title || prev.title,
                summary: f.summary || prev.summary,
                details: f.details || prev.details,
                source_name: f.source_name || prev.source_name,
                source_url: f.source_url || prev.source_url,
                source_author: f.source_author || prev.source_author,
                source_date: f.source_date || prev.source_date,
                category: f.category || prev.category,
                country: f.country || prev.country,
                region_rough: f.region_rough || prev.region_rough,
              })}
        />

        {/* Type toggle */}
        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => setEntryType('solution')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-3.5 text-[10px] font-black font-mono uppercase border-2 transition-colors ${
              entryType === 'solution' ? 'bg-[#1e3a2b] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210]'
            }`}
          >
            <Leaf className="w-4 h-4" /> Solution
          </button>
          <button
            type="button"
            onClick={() => setEntryType('climate_crisis')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-3.5 text-[10px] font-black font-mono uppercase border-2 transition-colors ${
              entryType === 'climate_crisis' ? 'bg-[#b3261e] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Crisis
          </button>
          <button
            type="button"
            onClick={() => setEntryType('action')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-3.5 text-[10px] font-black font-mono uppercase border-2 transition-colors ${
              entryType === 'action' ? 'bg-[#1e3a2b] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210]'
            }`}
          >
            <Sprout className="w-4 h-4" /> Action
          </button>
        </div>

        <p className="text-[10px] font-mono text-[#5a5246] mb-4 leading-relaxed">
          {entryType === 'solution'
            ? 'A positive action that others can replicate — at any scale, from individuals to whole countries.'
            : entryType === 'climate_crisis'
            ? 'A climate emergency that the world needs to be alerted to.'
            : 'Something happening on the ground — a cleanup, planting, meeting, or policy push. One contact link. The platform never sees the messages.'}
        </p>

        {/* Fields */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder={entryType === 'action' ? "e.g. Mangrove planting day, Cardigan Bay" : "e.g. Mangrove restoration, Cardigan Bay"} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
          </div>

          {entryType === 'action' ? (
            <>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Action type *</label>
                <select value={form.action_type} onChange={e => set('action_type', e.target.value)} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] outline-none focus:border-[#e2602a]">
                  <option value="cleanup">Cleanup</option>
                  <option value="planting">Planting</option>
                  <option value="meeting">Meeting</option>
                  <option value="policy_submission">Policy submission</option>
                  <option value="workshop">Workshop</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">When *</label>
                <input type="datetime-local" value={form.date} onChange={e => set('date', e.target.value)} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] outline-none focus:border-[#e2602a]" />
              </div>

              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">What's happening *</label>
                <textarea value={form.description || ''} onChange={e => set('description', e.target.value)} placeholder="What, why, and how to join — plain language" rows={4} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
              </div>

              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">One contact link *</label>
                <input value={form.contact_link} onChange={e => set('contact_link', e.target.value)} placeholder="Email, WhatsApp, Signal, or signup URL" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
                <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">The platform never sees the messages. One link only — people contact you directly.</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Summary *</label>
                <textarea value={form.summary} onChange={e => set('summary', e.target.value)} placeholder="One or two sentences — what and why" rows={2} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
              </div>

              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">More details</label>
                <textarea value={form.details} onChange={e => set('details', e.target.value)} placeholder="Full description — how it works, evidence, who's involved" rows={4} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
              </div>

              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Image URL (copyright-free)</label>
                <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] outline-none focus:border-[#e2602a]">
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Country</label>
              <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. Uruguay" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Region (rough)</label>
              <input value={form.region_rough} onChange={e => set('region_rough', e.target.value)} placeholder="e.g. West coast" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Source link</label>
            <input value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://…" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">Every entry on the record carries a link to its origin. Without one it waits for a person to find it — or it is left out.</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Source author</label>
              <input value={form.source_author} onChange={e => set('source_author', e.target.value)} placeholder="e.g. Jack Leitzell" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Source date</label>
              <input value={form.source_date} onChange={e => set('source_date', e.target.value)} placeholder="e.g. 21 April 2025" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
          </div>

          <div className="border-t-2 border-[#141210]/20 pt-3 mt-2">
            <p className="text-[10px] font-mono text-[#5a5246] mb-3 leading-relaxed">
              Your email is required (marked *). We use it only to reach you about this submission — to ask a question about it, or to tell you when it goes on the record. It is never published, never shared, never sold. Everything we hold, and everything we don't, is set out on the{' '}
              <a href={createPageUrl('ClimatePrivacy')} target="_blank" rel="noopener noreferrer" className="underline text-[#141210]">Privacy page</a>.
            </p>
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
              By submitting, your words stay yours — you give the record permission to publish and translate them, and you can ask us to take them down at any time.
            </p>
          </div>
        </div>

        {error && <p className="text-[11px] font-mono text-[#b3261e] mt-4">{error}</p>}

        <div className="mt-4 bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] p-3">
          <p className="text-[10px] font-black font-mono uppercase text-[#1e3a2b] mb-1">✓ Spam screened · Information flows</p>
          <p className="text-[10px] font-mono text-[#141210] leading-relaxed">
            Every submission is screened for spam and harmful advice. Clear ones go on the record at once; anything unclear waits for a person.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Sending…' : 'Submit to the record'}
        </button>

        <p className="text-[10px] font-mono text-[#5a5246] mt-3 text-center leading-relaxed">
          Spam is screened automatically. Clear entries appear at once — anything unclear waits for a person. No advertising, no sponsorship. Public service — money never buys a place on this record.
        </p>
      </form>
    </div>
  );
}