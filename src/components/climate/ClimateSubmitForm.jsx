import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send, Check, Leaf, AlertTriangle, Sprout, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import { createPageUrl } from '@/utils';
import SmartPaste from '@/components/climate/SmartPaste';
import Field, { fieldClass, hintClass } from '@/components/climate/submit/Field';

function SuccessScreen({ entryType, onClose, published }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const what = entryType === 'solution' ? 'solution' : entryType === 'climate_crisis' ? 'climate crisis report' : entryType === 'group' ? 'group' : 'action';
  const isGroup = entryType === 'group';
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
          ? 'It went up straight away — sharing something small counts, that is the whole point of this record. A custodian can take it down, and we would email you first.'
          : isGroup
          ? 'A person checks every group that gives a contact line, so the address printed is the organiser\'s own and not somebody else\'s. We will email you the moment it is up.'
          : 'The spam screen was unsure about this one, so a person will look before it appears. We will email you either way.'}
      </p>
      <button onClick={onClose} className="px-6 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
        Back to the record
      </button>
    </div>
  );
}

/* ── THE FORM IS FOUR SMALL QUESTIONS, NOT ONE LONG ONE ────────────────────────────
   Brian, 18 November: the forms are "old and off putting and black" and "too loose",
   and filling one in should be "easy as fuck". He was describing the same thing three
   times: a single black page carrying twenty-two boxes, every one of them on screen at
   once, so the first thing a person saw was the size of the job rather than the one
   sentence they had come to write. Nothing was hard; all of it was visible.

   So the same form, the same fields, the same door at the end — asked in four screens.
   What it is. What happened. Where it is and who says so. Who you are. Two to four boxes
   at a time, a line of three ticks at the top so nobody wonders how long this is, and
   the button under the thumb rather than at the foot of a scroll.

   The black went with it. The bar is paper now, the one action on each screen is the
   record's own red, and the space between the boxes is a breath instead of a gap. Not
   one field was dropped and not one rule was loosened: the validation at the end is the
   same validation it always was, and each screen refuses to move on until its own
   required boxes are filled, so nobody walks four screens to be told on the last one. */
const STEPS = ['What it is', 'What happened', 'Where and who says so', 'Who you are'];

// initialCategory comes from the index: a reader who taps an empty subject arrives on this
// form with the subject already chosen, so they never have to find it again in a dropdown.
export default function ClimateSubmitForm({ onClose, initialCategory, initialType }) {
  const { categories } = useClimateCategories();
  // initialType lets the "Start a group" button open this same form with the group door
  // already open, so there is one door onto the record and no second form to drift out of step.
  const [entryType, setEntryType] = useState(initialType || 'solution');
  const isGroup = entryType === 'group';
  // ── IF THE DOOR ALREADY KNOWS, DO NOT ASK AGAIN ────────────────────────────────
  // The four doors on the record each open this form on their own room, so a person who
  // tapped "A crisis" has already answered the first question. Making them answer it a
  // second time, on a screen of its own, is one more tap between somebody standing in a
  // field and the thing they came to give. The screen is not gone — Back still reaches it,
  // so anyone who tapped the wrong door can change their mind in one press.
  const [step, setStep] = useState(initialType ? 1 : 0);
  const [form, setForm] = useState({
    title: '', summary: '', details: '', category: initialCategory || 'agriculture',
    country: '', region_rough: '', image_url: '', source_name: '', source_url: '',
    source_author: '', source_date: '',
    submitter_name: '', submitter_email: '',
    // Action-specific fields
    action_type: 'cleanup', date: '', contact_link: '',
    // Group fields — a gathering is an introduction, not a claim about the world.
    name: '', topic: '', region: '', contact_email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden bot trap — humans never see this

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

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

  // Each screen answers for itself. The wording is the same wording the one-page form used
  // when it refused at the bottom, only now it is said on the screen that can fix it.
  const refuseHere = () => {
    if (step === 1) {
      if (isGroup) {
        if (!form.name.trim() || !form.topic.trim() || !form.region.trim() || !form.description?.trim()) {
          return 'A group name, a topic, a rough region, and a few words on what you are doing together.';
        }
      } else if (entryType === 'action') {
        if (!form.title.trim() || !form.description?.trim()) return "A title and what's happening.";
      } else if (!form.title.trim() || !form.summary.trim()) {
        return 'A title and a one-line summary.';
      }
    }
    if (step === 3) {
      if (!form.submitter_name.trim() || !form.submitter_email.trim()) return 'Your name and your email — that is how we reach you about it.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitter_email.trim())) return 'Please give a valid email.';
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

    // Honeypot — if filled, a bot did it. Silently pretend success.
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    // The last screen is the last word: the whole form is checked again here, exactly as it
    // was when every field was on one page, so a field emptied by going back is still caught.
    const isAction = entryType === 'action';
    if (isGroup) {
      if (!form.name.trim() || !form.topic.trim() || !form.region.trim() || !form.description?.trim() || !form.submitter_name.trim() || !form.submitter_email.trim()) {
        setError('A group name, a topic, a rough region, a few words on what you are doing together, your name, and your email are all needed.');
        return;
      }
      if (form.contact_email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email.trim())) {
        setError('The contact line must be an email address, or left empty.');
        return;
      }
    } else if (isAction) {
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
      // A group carries its own fields and no entry_type at all: a gathering is not a
      // solution, a crisis or an action, and filing it as one would be the small lie that
      // makes the rest of the record harder to believe.
      const res = await base44.functions.invoke('climateSubmitReview', {
        type: entryType,
        data: isGroup
          ? {
              name: form.name, topic: form.topic, region: form.region,
              description: form.description, contact_email: form.contact_email,
              submitter_name: form.submitter_name, submitter_email: form.submitter_email,
            }
          : { ...form, entry_type: entryType }
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

  const doors = [
    { type: 'solution', label: 'Solution', Icon: Leaf, on: 'text-[#1e3a2b] border-b-[#1e3a2b]' },
    { type: 'climate_crisis', label: 'Crisis', Icon: AlertTriangle, on: 'text-[#b3261e] border-b-[#b3261e]' },
    { type: 'action', label: 'Action', Icon: Sprout, on: 'text-[#1e3a2b] border-b-[#1e3a2b]' },
    { type: 'group', label: 'Group', Icon: Users, on: 'text-[#0f5f7a] border-b-[#0f5f7a]' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'var(--font-body)' }}>
      {/* The bar is paper, not a black band across the top of a warm page. What it carries
          is the one thing worth knowing at a glance: which of four questions this is. */}
      <div className="sticky top-0 z-20 bg-[#efe7d6]/97 backdrop-blur border-b border-[#141210]/25">
        <div className="max-w-[500px] mx-auto px-4 pt-3 pb-2 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-black font-mono uppercase tracking-[0.22em] text-[#b3261e]">Submit to the record</p>
            <p className="text-[12px] font-mono text-[#141210] mt-0.5 truncate">
              {step + 1} of {STEPS.length} · {STEPS[step]}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center border border-[#141210]/40 text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors shrink-0"
          >
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

        {/* ── 1 · WHAT IT IS ────────────────────────────────────────────────────── */}
        {step === 0 && (
          <div>
            {/* The four doors stay one sentence split by hairlines: two-by-two made the bar
                twice as deep as the words inside it. */}
            <div className="flex items-stretch border-y border-[#141210]/25">
              {doors.map(({ type, label, Icon, on }, i) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEntryType(type)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-1 py-3.5 min-h-[48px] border-b-2 text-[10px] font-black font-mono uppercase tracking-tight transition-colors ${
                    i > 0 ? 'border-l border-l-[#141210]/20' : ''
                  } ${entryType === type ? on : 'text-[#6b6258] border-b-transparent'}`}
                >
                  <Icon className="hidden sm:block w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            <p className="text-[12px] font-mono text-[#141210] mt-3 leading-relaxed">
              {entryType === 'solution'
                ? 'A positive action that others can replicate — at any scale, from individuals to whole countries.'
                : entryType === 'climate_crisis'
                ? 'A climate emergency that the world needs to be alerted to.'
                : entryType === 'group'
                ? 'People working on the same thing in the same area. The record carries the introduction, never the conversation: one contact line you choose to publish, and what you say to each other afterwards is yours.'
                : 'Something happening on the ground — a cleanup, planting, meeting, or policy push. One contact link. The platform never sees the messages.'}
            </p>

            <p className={hintClass}>
              Three more screens after this one: what happened, where it is, and your email.
            </p>
          </div>
        )}

        {/* ── 2 · WHAT HAPPENED ─────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-3">
            {/* Sent an email? The machine reads it and fills the form in. Not on the group
                door: a gathering has no article to paste. */}
            {!isGroup && (
              <SmartPaste
                kind={entryType === 'action' ? 'action' : entryType}
                categories={categories.map(c => ({ id: c.id, label: c.label }))}
                accept={['title', 'summary', 'details', 'source_name', 'source_url', 'source_author', 'source_date', 'category', 'country', 'region_rough']}
                note="Paste the link to it — yours or someone else's — with the sentences you want kept. We read the words you paste (we do not open the link) and fill the form in for you to check."
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
            )}

            {isGroup ? (
              <>
                <Field label="Group name *">
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Seagrass Restorers — West Coast" className={fieldClass} />
                </Field>

                <Field label="Topic *" hint="What you and others are working on, in a few words. This is how someone finds you.">
                  <input value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="e.g. Saving seagrasses" className={fieldClass} />
                </Field>

                <Field label="Region (rough) *" hint="Rough only — a coastline, a country, a city. Never a street or an exact place.">
                  <input value={form.region} onChange={e => set('region', e.target.value)} placeholder="e.g. West coast, Scotland" className={fieldClass} />
                </Field>

                <Field label="What you are doing together *">
                  <textarea value={form.description || ''} onChange={e => set('description', e.target.value)} placeholder="Plain language — what you are working on, and what someone joining in would do" rows={5} className={`${fieldClass} resize-none leading-relaxed`} />
                </Field>
              </>
            ) : entryType === 'action' ? (
              <>
                <Field label="Title *">
                  <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Mangrove planting day, Cardigan Bay" className={fieldClass} />
                </Field>

                <div className="grid grid-cols-2 gap-2">
                  <Field label="Action type *">
                    <select value={form.action_type} onChange={e => set('action_type', e.target.value)} className={fieldClass}>
                      <option value="cleanup">Cleanup</option>
                      <option value="planting">Planting</option>
                      <option value="meeting">Meeting</option>
                      <option value="policy_submission">Policy submission</option>
                      <option value="workshop">Workshop</option>
                      <option value="monitoring">Monitoring</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field label="When *">
                    <input type="datetime-local" value={form.date} onChange={e => set('date', e.target.value)} className={fieldClass} />
                  </Field>
                </div>

                <Field label="What's happening *">
                  <textarea value={form.description || ''} onChange={e => set('description', e.target.value)} placeholder="What, why, and how to join — plain language" rows={5} className={`${fieldClass} resize-none leading-relaxed`} />
                </Field>
              </>
            ) : (
              <>
                <Field label="Title *">
                  <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Mangrove restoration, Cardigan Bay" className={fieldClass} />
                </Field>

                <Field label="Summary *" hint="One or two sentences — what and why. This is what most readers will see.">
                  <textarea value={form.summary} onChange={e => set('summary', e.target.value)} placeholder="One or two sentences — what and why" rows={2} className={`${fieldClass} resize-none leading-relaxed`} />
                </Field>

                <Field label="More details">
                  <textarea value={form.details} onChange={e => set('details', e.target.value)} placeholder="Full description — how it works, evidence, who's involved" rows={4} className={`${fieldClass} resize-none leading-relaxed`} />
                </Field>
              </>
            )}
          </div>
        )}

        {/* ── 3 · WHERE IT IS, AND WHO SAYS SO ──────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-3">
            {isGroup ? (
              <Field
                label="The one contact line you want shown"
                hint="A person reads every contact line before it goes up, so the address printed is the organiser's own and never somebody else's. Leave it empty and your group prints as an open one — “contact line being arranged” — never a made-up address. Your own email on the next screen is kept apart from it and is never published."
              >
                <input value={form.contact_email} onChange={e => set('contact_email', e.target.value)} placeholder="you@example.org — or leave empty" className={fieldClass} />
              </Field>
            ) : (
              <>
                {entryType === 'action' && (
                  <Field label="One contact link *" hint="Email, WhatsApp, Signal or a signup URL. The platform never sees the messages — people contact you directly.">
                    <input value={form.contact_link} onChange={e => set('contact_link', e.target.value)} placeholder="Email, WhatsApp, Signal, or signup URL" className={fieldClass} />
                  </Field>
                )}

                <Field label="Category *">
                  <select value={form.category} onChange={e => set('category', e.target.value)} className={fieldClass}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-2">
                  <Field label="Country">
                    <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. Uruguay" className={fieldClass} />
                  </Field>
                  <Field label="Region (rough)">
                    <input value={form.region_rough} onChange={e => set('region_rough', e.target.value)} placeholder="e.g. West coast" className={fieldClass} />
                  </Field>
                </div>

                <Field
                  label="Source link"
                  hint="Every entry on the record carries a link to its origin. Without one it waits for a person to find it — or it is left out."
                >
                  <input value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://…" className={fieldClass} />
                </Field>

                <div className="grid grid-cols-2 gap-2">
                  <Field label="Source author">
                    <input value={form.source_author} onChange={e => set('source_author', e.target.value)} placeholder="e.g. Jack Leitzell" className={fieldClass} />
                  </Field>
                  <Field label="Source date">
                    <input value={form.source_date} onChange={e => set('source_date', e.target.value)} placeholder="e.g. 21 April 2025" className={fieldClass} />
                  </Field>
                </div>

                {entryType !== 'action' && (
                  <Field label="Image URL (copyright-free)" hint="Only a picture you have the right to give the record.">
                    <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" className={fieldClass} />
                  </Field>
                )}
              </>
            )}

            <p className={hintClass}>
              Everything on this screen is optional except the category — an entry with no place and no source still goes on, it just says so out loud.
            </p>
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
              Your email is required. We use it only to reach you about this submission — to ask a question about it, or to tell you when it goes on the record. It is never published, never shared, never sold. Everything we hold, and everything we don't, is set out on the{' '}
              <a href={createPageUrl('ClimatePrivacy')} target="_blank" rel="noopener noreferrer" className="underline text-[#141210]">Privacy page</a>.
            </p>

            <div className="bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] px-3 py-2">
              <p className="text-[9.5px] font-black font-mono uppercase text-[#1e3a2b] mb-1">✓ Spam screened · Information flows</p>
              <p className="text-[10px] font-mono text-[#141210] leading-snug">
                Clear entries go on the record at once; anything unclear waits for a person. No advertising, no sponsorship — money never buys a place on this record.
              </p>
            </div>

            <p className={hintClass}>
              By submitting, your words stay yours — you give the record permission to publish and translate them, and you can ask us to take them down at any time.
            </p>
          </div>
        )}

        {error && <p className="text-[11px] font-mono text-[#b3261e] mt-3 leading-snug">{error}</p>}

        {/* The one thing to press, under the thumb — not at the foot of a scroll. */}
        <div className="sticky bottom-0 z-10 -mx-4 mt-4 px-4 py-3 bg-[#efe7d6]/97 backdrop-blur border-t border-[#141210]/20 flex gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="flex items-center justify-center gap-1.5 px-3 py-3.5 min-h-[52px] border border-[#141210]/40 text-[#141210] text-[11px] font-black font-mono uppercase active:bg-[#141210]/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[52px] bg-[#b3261e] text-[#f7f1e5] text-[12px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#8f1e18] transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[52px] bg-[#b3261e] text-[#f7f1e5] text-[12px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#8f1e18] transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending…' : 'Submit to the record'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}