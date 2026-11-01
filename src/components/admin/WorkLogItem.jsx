import React from 'react';
import { Pin, PinOff, Check, RotateCcw, Trash2 } from 'lucide-react';

const KINDS = {
  feedback: { label: 'Feedback', tone: 'text-record-red border-record-red/40' },
  decision: { label: 'Decision', tone: 'text-record-ink border-record-ink/40' },
  gap: { label: 'Gap', tone: 'text-record-signal border-record-signal/50' },
  next: { label: 'Next', tone: 'text-record-ink border-record-ink/40' },
  note: { label: 'Note', tone: 'text-record-muted border-record-ink/20' },
  sweep: { label: 'Source check', tone: 'text-record-muted border-record-ink/20' },
};

// One line of the record's diary. Read-only in the sense that matters: a line is never
// rewritten, only pinned, marked finished, or taken out by a keeper who means it.
export default function WorkLogItem({ item, onPin, onDone, onDelete }) {
  const meta = KINDS[item.kind] || KINDS.note;

  return (
    <div className={`border-l-2 pl-4 py-3 ${item.done ? 'opacity-50' : ''} ${item.kind === 'feedback' ? 'border-l-record-red' : 'border-l-record-ink/20'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-mono uppercase tracking-widest border px-1.5 py-0.5 ${meta.tone}`}>
              {meta.label}
            </span>
            <span className="text-[11px] font-mono text-record-muted">{item.entry_date}</span>
            {item.from_who && <span className="text-[11px] font-mono text-record-muted">· {item.from_who}</span>}
            {item.pinned && <Pin className="w-3 h-3 text-record-red" />}
            {item.done && <Check className="w-3 h-3 text-record-muted" />}
          </div>
          <p className={`mt-1.5 text-sm font-bold text-record-ink ${item.done ? 'line-through' : ''}`}>{item.title}</p>
          {item.body && (
            <p className="mt-1 text-sm text-record-ink/80 whitespace-pre-wrap leading-relaxed">{item.body}</p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onPin(item)}
            title={item.pinned ? 'Unpin' : 'Keep at the top'}
            className="p-1.5 text-record-muted hover:text-record-ink transition-colors"
          >
            {item.pinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDone(item)}
            title={item.done ? 'Not finished after all' : 'Mark finished'}
            className="p-1.5 text-record-muted hover:text-record-ink transition-colors"
          >
            {item.done ? <RotateCcw className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDelete(item)}
            title="Remove this line"
            className="p-1.5 text-record-muted hover:text-record-red transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}