import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, X, Users, Sprout, Recycle, FileText, Hammer, Eye, Hand } from 'lucide-react';
import RelatedTriangle from './RelatedTriangle';

const ACTION_TYPES = {
  cleanup: { label: 'Cleanup', icon: Recycle, color: '#1e3a2b' },
  planting: { label: 'Planting', icon: Sprout, color: '#1e3a2b' },
  meeting: { label: 'Meeting', icon: Users, color: '#0f5f7a' },
  policy_submission: { label: 'Policy Submission', icon: FileText, color: '#0f5f7a' },
  workshop: { label: 'Workshop', icon: Hammer, color: '#0f5f7a' },
  monitoring: { label: 'Monitoring', icon: Eye, color: '#1e3a2b' },
  other: { label: 'Action', icon: Hand, color: '#5a5246' },
};

function fmtDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return '';
    return dt.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
}

export default function ActionModal({ action, onClose, items = [], actions = [], onOpenItem, onOpenAction }) {
  const meta = ACTION_TYPES[action.action_type] || ACTION_TYPES.other;
  const Icon = meta.icon;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/90 p-0 sm:p-6" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
      <motion.div
        className="bg-[#efe7d6] border-2 border-[#141210] w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-none"
        onClick={e => e.stopPropagation()}
        initial={{ y: '100%', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }}
      >
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#efe7d6]">
          <div className="w-10 h-1 rounded-full bg-[#141210]/25" />
        </div>
        {/* Header band — action type colour */}
        <div className="relative px-5 py-6 border-b-2 border-[#141210]" style={{ background: meta.color }}>
          <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-[#efe7d6]" />
            <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#efe7d6]">{meta.label}</span>
          </div>
          <h2 className="text-2xl font-black uppercase text-[#efe7d6] leading-none" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {action.title}
          </h2>
        </div>

        <div className="p-5">
          {(action.date || action.country || action.region_rough) && (
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#5a5246] mb-4">
              {action.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />{fmtDate(action.date)}
                </span>
              )}
              {(action.country || action.region_rough) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />{action.region_rough ? `${action.region_rough}` : ''}{action.region_rough && action.country ? ' · ' : ''}{action.country || ''}
                </span>
              )}
            </div>
          )}

          <p className="text-[13px] font-mono text-[#141210] leading-relaxed">{action.description}</p>

          {action.source_url && (
            <a href={action.source_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-[#1e3a2b] hover:text-[#e2602a] text-[12px] font-black font-mono uppercase transition-colors">
              More info <ArrowRight className="w-4 h-4" />
            </a>
          )}

          {action.contact_link && (
            <a href={action.contact_link} target="_blank" rel="noopener noreferrer" className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-[#e2602a] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors">
              Join in — contact organiser <ArrowRight className="w-4 h-4" />
            </a>
          )}
          <p className="text-[9px] font-mono text-[#5a5246] mt-3 leading-relaxed">
            The platform never sees your messages — you contact the organiser directly.
          </p>
          <RelatedTriangle
            category={action.category}
            items={items}
            actions={actions}
            currentId={action.id}
            onOpenItem={onOpenItem}
            onOpenAction={onOpenAction}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}