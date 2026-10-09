import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send, Check, Leaf, AlertTriangle } from 'lucide-react';


const CATEGORIES = [
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'water', label: 'Water' },
  { id: 'heat', label: 'Heat' },
  { id: 'coastal_erosion_protection', label: 'Coastal Protection' },
  { id: 'seagrasses', label: 'Seagrasses' },
  { id: 'mangroves', label: 'Mangroves' },
  { id: 'oceans', label: 'Oceans' },
  { id: 'zooplankton', label: 'Zooplankton' },
  { id: 'phytoplankton', label: 'Phytoplankton' },
  { id: 'forest_preservation', label: 'Forests' },
  { id: 'rewilding', label: 'Rewilding' },
  { id: 'urban_geodesign', label: 'Urban Geodesign' },
  { id: 'transportation', label: 'Transport' },
  { id: 'electric_vehicles', label: 'Electric Vehicles' },
  { id: 'renewable_energy', label: 'Renewable Energy' },
  { id: 'solar_desalination', label: 'Solar Desalination' },
  { id: 'drought', label: 'Drought' },
  { id: 'flooding', label: 'Flooding' },
  { id: 'extreme_weather', label: 'Extreme Weather' },
  { id: 'other', label: 'Other' },
];

export default function ClimateSubmitForm({ onClose }) {
  const [entryType, setEntryType] = useState('solution');
  const [form, setForm] = useState({
    title: '', summary: '', details: '', category: 'agriculture',
    country: '', region_rough: '', image_url: '', source_name: '', source_url: '',
    submitter_name: '', submitter_email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.summary.trim() || !form.submitter_name.trim() || !form.submitter_email.trim()) {
      setError('Title, summary, your name, and your email are all needed.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitter_email.trim())) {
      setError('Please give a valid email.');
      return;
    }

    setSubmitting(true);
    try {
      await base44.functions.invoke('climateSubmitReview', {
        type: entryType,
        data: { ...form, entry_type: entryType }
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#efe7d6] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#1e3a2b] flex items-center justify-center mb-5">
          <Check className="w-8 h-8 text-[#efe7d6]" />
        </div>
        <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '28px', letterSpacing: '-0.02em' }}>
          Thank you
        </h2>
        <p className="text-[13px] font-mono text-[#141210] leading-relaxed max-w-[320px] mb-2">
          Your {entryType === 'solution' ? 'solution' : 'climate crisis report'} is under review.
        </p>
        <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[320px] mb-6">
          Every entry is read by a person before it appears on the record. This keeps the platform honest — a public service, not a firehose.
        </p>
        <button onClick={onClose} className="px-6 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
          Back to the record
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
          Submit to the record
        </h2>
        <button onClick={onClose} aria-label="Close" className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-[500px] mx-auto">
        {/* Type toggle */}
        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => setEntryType('solution')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-3.5 text-[11px] font-black font-mono uppercase border-2 transition-colors ${
              entryType === 'solution' ? 'bg-[#1e3a2b] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210]'
            }`}
          >
            <Leaf className="w-4 h-4" /> Solution
          </button>
          <button
            type="button"
            onClick={() => setEntryType('climate_crisis')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-3.5 text-[11px] font-black font-mono uppercase border-2 transition-colors ${
              entryType === 'climate_crisis' ? 'bg-[#e2602a] text-[#141210] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Crisis
          </button>
        </div>

        <p className="text-[10px] font-mono text-[#5a5246] mb-4 leading-relaxed">
          {entryType === 'solution'
            ? 'A positive action that others can replicate — at any scale, from individuals to whole countries.'
            : 'A climate emergency that the world needs to be alerted to.'}
        </p>

        {/* Fields */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Mangrove restoration, Cardigan Bay" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Summary *</label>
            <textarea value={form.summary} onChange={e => set('summary', e.target.value)} placeholder="One or two sentences — what and why" rows={2} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">More details</label>
            <textarea value={form.details} onChange={e => set('details', e.target.value)} placeholder="Full description — how it works, evidence, who's involved" rows={4} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] outline-none focus:border-[#e2602a]">
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Country</label>
              <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. Uruguay" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Region (rough)</label>
              <input value={form.region_rough} onChange={e => set('region_rough', e.target.value)} placeholder="e.g. West coast" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Image URL (copyright-free)</label>
            <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Source link</label>
            <input value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://…" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
          </div>

          <div className="border-t-2 border-[#141210]/20 pt-3 mt-2">
            <p className="text-[10px] font-mono text-[#5a5246] mb-3 leading-relaxed">
              Email required — per the platform's public-service covenant. Your email is never shown publicly. It's only used if we need to verify your submission.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Your name *</label>
                <input value={form.submitter_name} onChange={e => set('submitter_name', e.target.value)} placeholder="Your name" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
              <div>
                <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Your email *</label>
                <input type="email" value={form.submitter_email} onChange={e => set('submitter_email', e.target.value)} placeholder="you@example.org" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-[11px] font-mono text-[#b3261e] mt-4">{error}</p>}

        <div className="mt-4 bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] p-3">
          <p className="text-[9px] font-black font-mono uppercase text-[#1e3a2b] mb-1">✓ Human Review Promise</p>
          <p className="text-[10px] font-mono text-[#141210] leading-relaxed">
            Every submission is reviewed by a human. AI assists our reviewers — it never decides.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Sending…' : 'Submit for review'}
        </button>

        <p className="text-[9px] font-mono text-[#5a5246] mt-3 text-center leading-relaxed">
          Every submission is reviewed by a person before publication. No advertising. No fundraising. Public service.
        </p>
      </form>
    </div>
  );
}