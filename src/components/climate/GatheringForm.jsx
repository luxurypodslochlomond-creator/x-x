import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send, Check, Users } from 'lucide-react';
import { createPageUrl } from '@/utils';

// Janine's spec, item 10: people designing plastic shelters, plastic clothes, saving seagrasses —
// in an area or region — can share directly. The record carries the introduction, never the
// conversation: a name, a topic, a rough region, and the ONE contact line the organiser chooses
// to publish. Their own email is kept apart from it and is never shown.

function Done({ onClose, published }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] flex flex-col items-center justify-start p-6 pt-[16vh] text-center overflow-y-auto">
      <div className="w-16 h-16 rounded-full bg-[#1e3a2b] flex items-center justify-center mb-5">
        <Check className="w-8 h-8 text-[#efe7d6]" />
      </div>
      <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '-0.02em' }}>
        Thank you
      </h2>
      <p className="text-[13px] font-mono text-[#141210] leading-relaxed max-w-[320px] mb-2">
        {published ? 'Your group is on the record now.' : 'Your group is with us for a quick check.'}
      </p>
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[320px] mb-6">
        {published
          ? 'Anyone working on the same thing in your area can now find it and reach you directly. The record never sees or keeps your messages.'
          : 'The spam screen was unsure about this one, so a person will look before it appears. Nothing goes on the record without someone reading it.'}
      </p>
      <button onClick={onClose} className="px-6 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
        Back to the record
      </button>
    </div>
  );
}

export default function GatheringForm({ onClose }) {
  const [form, setForm] = useState({
    name: '', topic: '', region: '', description: '',
    contact_email: '', submitter_name: '', submitter_email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden bot trap — humans never see this

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const RATE_LIMIT_KEY = 'climate_gathering_times';
  const MAX_PER_HOUR = 3;

  const checkRateLimit = () => {
    try {
      const now = Date.now();
      const times = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]').filter(t => now - t < 3600000);
      if (times.length >= MAX_PER_HOUR) return false;
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([...times, now]));
      return true;
    } catch { return true; }
  };

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (honeypot) { setSubmitted(true); return; }

    if (!form.name.trim() || !form.topic.trim() || !form.region.trim() || !form.description.trim()) {
      setError('A name, a topic, your region, and a few words on what you are doing together are all needed.');
      return;
    }
    if (!form.submitter_name.trim() || !isEmail(form.submitter_email)) {
      setError('Your name and a valid email are needed — we use them only to reach you about this group.');
      return;
    }
    if (form.contact_email.trim() && !isEmail(form.contact_email)) {
      setError('The contact line must be an email address, or left empty.');
      return;
    }
    if (!checkRateLimit()) {
      setError('Too many submissions this hour. Please wait a bit and try again.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await base44.functions.invoke('climateSubmitReview', { type: 'group', data: { ...form } });
      setPublished(res?.data?.status === 'published');
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <Done onClose={onClose} published={published} />;

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <h2 className="font-black uppercase text-[#efe7d6] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
          <Users className="w-5 h-5" /> Start a group
        </h2>
        <button onClick={onClose} aria-label="Close" className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-[500px] mx-auto">
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label>Website (leave empty)</label>
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} name="website" />
        </div>

        <p className="text-[11px] font-mono text-[#5a5246] mb-4 leading-relaxed">
          For people working on the same thing in the same area — plastic shelters, plastic clothes, saving seagrasses, anything at all. The record carries the introduction, never the conversation: once someone reaches you, what you say to each other is yours, not the platform's.
        </p>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Group name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Seagrass Restorers — West Coast" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Topic *</label>
            <input value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="e.g. Saving seagrasses" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">What you and others are working on, in a few words. This is how someone finds you.</p>
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Region (rough) *</label>
            <input value={form.region} onChange={e => set('region', e.target.value)} placeholder="e.g. West coast, Scotland" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">Rough only — a coastline, a country, a city. Never a street or an exact place.</p>
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">What you are doing together *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Plain language — what you are working on, and what someone joining in would do" rows={4} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">The one contact line you want shown</label>
            <input value={form.contact_email} onChange={e => set('contact_email', e.target.value)} placeholder="you@example.org — or leave empty" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">
              This is the only line the record ever shows. Leave it empty and your group prints as an open one — "contact line being arranged" — never a made-up address. Your own email below is kept apart from it and is never published.
            </p>
          </div>

          <div className="border-t-2 border-[#141210]/20 pt-3 mt-2">
            <p className="text-[10px] font-mono text-[#5a5246] mb-3 leading-relaxed">
              Your email is required (marked *). We use it only to reach you about this group — to ask a question, or to tell you when it goes on the record. It is never published, never shared, never sold, and never shown as the contact line. Everything we hold, and everything we don't, is set out on the{' '}
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
          </div>
        </div>

        {error && <p className="text-[11px] font-mono text-[#b3261e] mt-4">{error}</p>}

        <div className="mt-4 bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] p-3">
          <p className="text-[10px] font-black font-mono uppercase text-[#1e3a2b] mb-1">✓ The same rule as every entry</p>
          <p className="text-[10px] font-mono text-[#141210] leading-relaxed">
            Screen for spam, let the good stuff through: clear ones go on at once, anything unclear waits for a person. Nothing here is ranked, boosted, or sold.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Sending…' : 'Start the group'}
        </button>
      </form>
    </div>
  );
}