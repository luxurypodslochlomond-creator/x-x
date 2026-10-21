import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, Check, ArrowUp, ArrowDown, X } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';

// Admin page for managing climate categories.
// Janine can add, edit, reorder, and delete categories herself — no developer needed.
export default function AdminClimateCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', icon: '', description: '', sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    base44.entities.ClimateCategory.filter({}, { sort: 'sort_order', limit: 100 })
      .then((r) => setCategories(r?.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startAdd = () => {
    setEditing(null);
    setForm({ name: '', slug: '', icon: '', description: '', sort_order: categories.length });
    setShowForm(true);
  };

  const startEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, icon: cat.icon || '', description: cat.description || '', sort_order: cat.sort_order || 0 });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.slug.trim()) {
      setError('Name and slug are required.');
      return;
    }
    const slug = form.slug.trim().toLowerCase().replace(/\s+/g, '_');
    setSaving(true);
    try {
      if (editing) {
        await base44.entities.ClimateCategory.update(editing.id, {
          name: form.name.trim(),
          slug,
          icon: form.icon.trim().toUpperCase() || 'OT',
          description: form.description.trim(),
          sort_order: Number(form.sort_order) || 0,
        });
      } else {
        await base44.entities.ClimateCategory.create({
          name: form.name.trim(),
          slug,
          icon: form.icon.trim().toUpperCase() || 'OT',
          description: form.description.trim(),
          sort_order: Number(form.sort_order) || 0,
          status: 'published',
        });
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError('Could not save. ' + (err?.message || ''));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!confirm(`Delete "${cat.name}"? Existing entries with this category will keep their value but won't show a label.`)) return;
    try {
      await base44.entities.ClimateCategory.delete(cat.id);
      load();
    } catch (err) {
      alert('Could not delete: ' + (err?.message || ''));
    }
  };

  const moveCategory = async (cat, direction) => {
    const idx = categories.findIndex((c) => c.id === cat.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= categories.length) return;
    const other = categories[swapIdx];
    try {
      await base44.entities.ClimateCategory.bulkUpdate([
        { id: cat.id, sort_order: other.sort_order },
        { id: other.id, sort_order: cat.sort_order },
      ]);
      load();
    } catch (err) {
      alert('Could not reorder: ' + (err?.message || ''));
    }
  };

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-5" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="max-w-[600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', letterSpacing: '-0.02em' }}>
              Categories
            </h1>
            <p className="text-[10px] font-mono text-[#5a5246] mt-1">Add, edit, and reorder the platform's categories. Changes appear instantly.</p>
          </div>
          <button onClick={startAdd} className="flex items-center gap-2 px-4 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[12px] font-mono text-[#5a5246] mb-4">No categories yet. The platform is using the built-in taxonomy. Add your own to take control.</p>
            <button onClick={startAdd} className="px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
              Add first category
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((cat, i) => (
              <div key={cat.id} className="flex items-center gap-3 px-3 py-3 bg-[#f7f1e5] border border-[#141210]/15">
                <SignalCode code={cat.icon} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-black font-mono text-[#141210] truncate">{cat.name}</p>
                  <p className="text-[10px] font-mono text-[#5a5246] truncate">{cat.slug}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => moveCategory(cat, 'up')} disabled={i === 0} className="w-8 h-8 flex items-center justify-center border border-[#141210]/20 active:bg-[#141210] active:text-[#efe7d6] disabled:opacity-30 transition-colors">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => moveCategory(cat, 'down')} disabled={i === categories.length - 1} className="w-8 h-8 flex items-center justify-center border border-[#141210]/20 active:bg-[#141210] active:text-[#efe7d6] disabled:opacity-30 transition-colors">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => startEdit(cat)} className="px-3 h-8 flex items-center text-[10px] font-black font-mono uppercase border border-[#141210]/20 active:bg-[#141210] active:text-[#efe7d6] transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cat)} className="w-8 h-8 flex items-center justify-center border border-[#b3261e]/30 text-[#b3261e] active:bg-[#b3261e] active:text-[#efe7d6] transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
            <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
              {editing ? 'Edit category' : 'New category'}
            </h2>
            <button onClick={() => setShowForm(false)} className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-5 max-w-[500px] mx-auto space-y-3">
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Name *</label>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Mangroves" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Slug * (URL-safe, e.g. mangroves)</label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="mangroves" className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Code (2-letter, e.g. AG)</label>
              <input value={form.icon} onChange={(e) => set('icon', e.target.value.toUpperCase())} placeholder="AG" maxLength={3} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono uppercase tracking-widest text-[#141210] outline-none focus:border-[#e2602a]" />
            </div>
            <div>
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="What this category covers" rows={2} className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none" />
            </div>
            {error && <p className="text-[11px] font-mono text-[#b3261e]">{error}</p>}
            <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50">
              <Check className="w-4 h-4" />
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create category'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}