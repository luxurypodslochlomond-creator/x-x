import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, X } from 'lucide-react';
import WorkLogItem from '@/components/admin/WorkLogItem';

// The keeper's log — the record's memory of itself.
// Every note, every word from Janine, every decision and every open gap, written down on
// the day it happened. Nothing here is on the record and nothing here reaches a reader: it
// is the answer to "why is this entry like this, and who said so", six months from now,
// when nobody remembers.
const KINDS = ['feedback', 'decision', 'gap', 'next', 'note', 'sweep'];

const today = () => new Date().toISOString().slice(0, 10);

const empty = () => ({ kind: 'feedback', title: '', body: '', from_who: '', entry_date: today() });

export default function AdminClimateLog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    base44.entities.ClimateWorkLog.filter({}, { sort: '-entry_date', limit: 200 })
      .then((r) => setItems(r?.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) { setError('Give it a title so it can be found again.'); return; }
    setSaving(true);
    try {
      await base44.entities.ClimateWorkLog.create({
        kind: form.kind,
        title: form.title.trim(),
        body: form.body.trim(),
        from_who: form.from_who.trim(),
        entry_date: form.entry_date || today(),
      });
      setForm(empty());
      setShowForm(false);
      load();
    } catch (err) {
      setError('Could not save. ' + (err?.message || ''));
    } finally {
      setSaving(false);
    }
  };

  const onPin = (item) => {
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, pinned: !i.pinned } : i)));
    base44.entities.ClimateWorkLog.update(item.id, { pinned: !item.pinned }).catch(load);
  };

  const onDone = (item) => {
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, done: !i.done } : i)));
    base44.entities.ClimateWorkLog.update(item.id, { done: !item.done }).catch(load);
  };

  const onDelete = async (item) => {
    if (!confirm(`Remove "${item.title}" from the log? A log you can quietly delete is not a record of anything — only do this if it is genuinely wrong.`)) return;
    setItems((list) => list.filter((i) => i.id !== item.id));
    base44.entities.ClimateWorkLog.delete(item.id).catch(load);
  };

  const shown = items
    .filter((i) => filter === 'all' || i.kind === filter)
    .sort((a, b) => (Number(b.pinned) - Number(a.pinned)) || String(b.entry_date).localeCompare(String(a.entry_date)));

  return (
    <div className="min-h-screen bg-record-paper px-5 py-10 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-record-muted">Together We Can Change Climate</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-record-ink mt-2">
          The keeper's log
        </h1>
        <p className="mt-3 text-sm text-record-ink/80 leading-relaxed max-w-xl">
          What was said, what was decided, and what is still missing — written on the day it happened.
          Nothing here is on the record and nothing here reaches a reader. It is here so that none of it
          depends on anyone remembering.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setForm(empty()); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-record-red text-record-paper px-4 py-2 text-xs font-black font-mono uppercase tracking-wider hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Write a line
          </button>
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {['all', ...KINDS].map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border transition-colors ${
                  filter === k
                    ? 'bg-record-ink text-record-paper border-record-ink'
                    : 'border-record-ink/20 text-record-muted hover:border-record-ink/50'
                }`}
              >
                {k === 'all' ? `All ${items.length}` : k}
              </button>
            ))}
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-5 border-2 border-record-ink/20 bg-record-bone p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-record-muted">What it is</span>
                <select
                  value={form.kind}
                  onChange={(e) => set('kind', e.target.value)}
                  className="mt-1 w-full bg-record-paper border border-record-ink/25 px-2 py-1.5 text-sm text-record-ink"
                >
                  {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-record-muted">The day</span>
                <input
                  type="date"
                  value={form.entry_date}
                  onChange={(e) => set('entry_date', e.target.value)}
                  className="mt-1 w-full bg-record-paper border border-record-ink/25 px-2 py-1.5 text-sm text-record-ink"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-record-muted">In a few words</span>
              <input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Janine wants the music page to lead with the theme"
                className="mt-1 w-full bg-record-paper border border-record-ink/25 px-2 py-1.5 text-sm text-record-ink"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-record-muted">From</span>
              <input
                value={form.from_who}
                onChange={(e) => set('from_who', e.target.value)}
                placeholder="Leave empty for your own note"
                className="mt-1 w-full bg-record-paper border border-record-ink/25 px-2 py-1.5 text-sm text-record-ink"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-record-muted">In their words</span>
              <textarea
                value={form.body}
                onChange={(e) => set('body', e.target.value)}
                rows={4}
                placeholder="What was said or decided, and why."
                className="mt-1 w-full bg-record-paper border border-record-ink/25 px-2 py-1.5 text-sm text-record-ink"
              />
            </label>
            {error && <p className="text-xs text-record-red font-mono">{error}</p>}
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-record-ink text-record-paper px-4 py-2 text-xs font-black font-mono uppercase tracking-wider disabled:opacity-40"
              >
                {saving ? 'Saving' : 'Keep it'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono uppercase tracking-wider text-record-muted hover:text-record-ink"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-6">
          {loading ? (
            <p className="font-mono text-xs text-record-muted py-8">Reading the log…</p>
          ) : shown.length === 0 ? (
            <div className="border border-dashed border-record-ink/25 p-8 text-center">
              <p className="text-sm text-record-ink/70">Nothing written down yet.</p>
              <p className="mt-1 text-xs text-record-muted">
                The first line is usually something Janine said.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-record-ink/10">
              {shown.map((item) => (
                <WorkLogItem key={item.id} item={item} onPin={onPin} onDone={onDone} onDelete={onDelete} />
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-[11px] font-mono text-record-muted leading-relaxed">
          A line written here is never rewritten. If something changes, write a second line — a log that can be
          quietly edited is worth nothing as a record. Nothing on this page is visible to a reader of the record.
        </p>
      </div>
    </div>
  );
}