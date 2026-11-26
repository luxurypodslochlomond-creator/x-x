import React from 'react';
import { ArrowRight, Sprout, AlertTriangle, Hand } from 'lucide-react';

// Connects the triangle: when you open any entry, shows related entries
// from the other two types in the same category — Janine's vision made intelligent.
// "Here's the problem, here's what works, here's what you can do" — all linked. x = x.

export default function RelatedTriangle({ category, items = [], actions = [], currentId, onOpenItem, onOpenAction }) {
  if (!category) return null;

  const catItems = items.filter(i => i.category === category && i.id !== currentId);
  const catActions = actions.filter(a => a.category === category && a.id !== currentId);

  const relatedSolutions = catItems.filter(i => i.entry_type === 'solution').slice(0, 2);
  const relatedCrises = catItems.filter(i => i.entry_type === 'climate_crisis').slice(0, 2);
  const relatedActions = catActions.slice(0, 2);

  const hasAny = relatedSolutions.length + relatedCrises.length + relatedActions.length > 0;
  if (!hasAny) return null;

  const catLabel = category.replaceAll('_', ' ');

  return (
    <div className="mt-6 pt-5 border-t-2 border-[#141210]/20">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246]">
          {catLabel} — connected
        </span>
        <div className="flex-1 h-px bg-[#141210]/15" />
      </div>
      <div className="space-y-2">
        {relatedSolutions.map(s => (
          <button
            key={s.id}
            onClick={() => onOpenItem?.(s)}
            className="w-full flex items-center gap-2.5 p-2.5 bg-record-paper border border-record-botanical/40 hover:border-record-botanical active:scale-[0.98] transition-all text-left"
          >
            <Sprout className="w-4 h-4 text-record-botanical flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-black font-mono uppercase tracking-widest text-record-botanical block">Solution</span>
              <span className="text-[11px] font-mono font-bold text-[#141210] block truncate">{s.title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5a5246] flex-shrink-0" />
          </button>
        ))}
        {relatedCrises.map(c => (
          <button
            key={c.id}
            onClick={() => onOpenItem?.(c)}
            className="w-full flex items-center gap-2.5 p-2.5 bg-[#f7f1e5] border border-[#b3261e]/40 hover:border-[#b3261e] active:scale-[0.98] transition-all text-left"
          >
            <AlertTriangle className="w-4 h-4 text-[#b3261e] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e] block">Crisis</span>
              <span className="text-[11px] font-mono font-bold text-[#141210] block truncate">{c.title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5a5246] flex-shrink-0" />
          </button>
        ))}
        {relatedActions.map(a => (
          <button
            key={a.id}
            onClick={() => onOpenAction?.(a)}
            className="w-full flex items-center gap-2.5 p-2.5 bg-record-paper border border-record-action/40 hover:border-record-action active:scale-[0.98] transition-all text-left"
          >
            <Hand className="w-4 h-4 text-record-action flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-black font-mono uppercase tracking-widest text-record-action block">Action</span>
              <span className="text-[11px] font-mono font-bold text-[#141210] block truncate">{a.title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5a5246] flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}