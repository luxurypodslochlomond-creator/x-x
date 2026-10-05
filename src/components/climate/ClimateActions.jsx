import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, X, Users, Sprout, Trash2, FileText, Eye, Hand } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const ACTION_TYPES = [
  { id: 'cleanup', label: 'Cleanup', icon: Trash2 },
  { id: 'planting', label: 'Planting', icon: Sprout },
  { id: 'meeting', label: 'Meeting', icon: Users },
  { id: 'policy_submission', label: 'Policy', icon: FileText },
  { id: 'workshop', label: 'Workshop', icon: Hand },
  { id: 'monitoring', label: 'Monitoring', icon: Eye },
  { id: 'other', label: 'Other', icon: ArrowRight },
];

const TYPE_ICON = (type) => ACTION_TYPES.find(a => a.id === type)?.icon || ArrowRight;

const fmtDate = (d) => {
  if (!d) return '—';
  try {
    const date = new Date(d);
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return '—'; }
};

const isUpcoming = (d) => {
  if (!d) return false;
  return new Date(d) >= new Date(new Date().toDateString());
};

function ActionModal({ item, onClose }) {
  const Icon = TYPE_ICON(item.action_type);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const contactIsEmail = item.contact_link && item.contact_link.includes('@') && !item.contact_link.startsWith('http');
  const contactHref = item.contact_link
    ? (contactIsEmail ? `mailto:${item.contact_link}` : item.contact_link)
    : null;

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
        <div className="relative bg-[#1e3a2b] px-5 py-6">
          <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-[#e2602a]" />
            <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#e2602a]">{item.action_type?.replaceAll('_', ' ')}</span>
            {isUpcoming(item.date) && (
              <span className="text-[9px] font-black font-mono uppercase tracking-widest px-2 py-0.5 border border-[#e2602a] text-[#e2602a]">Upcoming</span>
            )}
          </div>
          <h2 className="text-2xl font-black uppercase text-[#efe7d6] leading-none pr-12" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', letterSpacing: '-0.02em' }}>{item.title}</h2>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-3 text-[11px] font-mono text-[#5a5246] mb-4">
            {item.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {fmtDate(item.date)}
              </span>
            )}
            {(item.country || item.region_rough) && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {item.country}{item.region_rough ? ` · ${item.region_rough}` : ''}
              </span>
            )}
          </div>
          <p className="text-[13px] font-mono text-[#141210] leading-relaxed">{item.description}</p>
          {item.source_url && (
            <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-[#1e3a2b] hover:text-[#e2602a] text-[12px] font-black font-mono uppercase transition-colors">
              More info <ArrowRight className="w-4 h-4" />
            </a>
          )}
          {contactHref && (
            <a
              href={contactHref}
              target={contactHref.startsWith('http') ? '_blank' : undefined}
              rel={contactHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#e2602a] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors"
            >
              Join in <ArrowRight className="w-4 h-4" />
            </a>
          )}
          {!contactHref && (
            <p className="mt-5 text-[10px] font-mono text-[#5a5246] italic text-center">Contact the organizing group to join.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ClimateActions({ t }) {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    base44.entities.ClimateAction.list('-date', 50)
      .then(r => { setActions(r || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? actions : actions.filter(a => a.action_type === filter);
  const upcoming = filtered.filter(a => isUpcoming(a.date));
  const past = filtered.filter(a => !isUpcoming(a.date));

  if (loading) {
    return (
      <div className="px-4 py-8 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
      </div>
    );
  }

  if (actions.length === 0) return null;

  const ActionCard = ({ item }) => {
    const Icon = TYPE_ICON(item.action_type);
    return (
      <motion.button
        onClick={() => setOpenItem(item)}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-full text-left bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#e2602a] p-3.5 active:border-[#e2602a]"
      >
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-[#1e3a2b]" />
            <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#1e3a2b]">{item.action_type?.replaceAll('_', ' ')}</span>
          </div>
          {isUpcoming(item.date) && (
            <span className="text-[8px] font-black font-mono uppercase tracking-widest px-1.5 py-0.5 bg-[#e2602a] text-[#141210]">Soon</span>
          )}
        </div>
        <h4 className="text-[12px] font-black font-mono uppercase text-[#141210] leading-tight line-clamp-2">{item.title}</h4>
        <div className="flex items-center gap-2 mt-2 text-[9px] font-mono text-[#5a5246]">
          {item.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDate(item.date)}</span>}
          {item.region_rough && <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3" />{item.region_rough}</span>}
        </div>
      </motion.button>
    );
  };

  return (
    <section className="px-4 py-5 border-b-2 border-[#141210] bg-[#efe7d6]">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.actions || 'Actions'}</h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{actions.length}</span>
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-3">{t.actions_sub || 'What people are doing, where, and how to join. Replicate what works.'}</p>

      {/* Filter chips */}
      <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain pb-2 -mx-4 px-4 snap-x mb-3" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        <button
          onClick={() => setFilter('all')}
          className={`flex-shrink-0 snap-start px-3 py-2 min-h-[36px] text-[10px] font-black font-mono uppercase border transition-colors active:scale-95 ${
            filter === 'all' ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210] active:bg-[#141210] active:text-[#efe7d6]'
          }`}
        >All</button>
        {ACTION_TYPES.map(a => (
          <button
            key={a.id}
            onClick={() => setFilter(a.id)}
            className={`flex-shrink-0 snap-start flex items-center gap-1 px-3 py-2 min-h-[36px] text-[10px] font-black font-mono uppercase border transition-colors active:scale-95 ${
              filter === a.id ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210] active:bg-[#141210] active:text-[#efe7d6]'
            }`}
          >
            <a.icon className="w-3 h-3" />{a.label}
          </button>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div className="mb-4">
          <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#e2602a] mb-2">↑ Upcoming</p>
          <div className="space-y-2">
            {upcoming.map(a => <ActionCard key={a.id} item={a} />)}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] mb-2">Past actions</p>
          <div className="space-y-2 opacity-70">
            {past.map(a => <ActionCard key={a.id} item={a} />)}
          </div>
        </div>
      )}

      <AnimatePresence>
        {openItem && <ActionModal item={openItem} onClose={() => setOpenItem(null)} />}
      </AnimatePresence>
    </section>
  );
}