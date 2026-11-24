import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Sprout, Recycle, FileText, Hammer, Eye, Hand } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// Action types from Janine's spec — each gets its own glyph so the card reads at a glance
const ACTION_TYPES = {
  cleanup: { label: 'Cleanup', icon: Recycle, color: '#1e3a2b' },
  planting: { label: 'Planting', icon: Sprout, color: '#1e3a2b' },
  meeting: { label: 'Meeting', icon: Users, color: '#0f5f7a' },
  policy_submission: { label: 'Policy', icon: FileText, color: '#0f5f7a' },
  workshop: { label: 'Workshop', icon: Hammer, color: '#0f5f7a' },
  monitoring: { label: 'Monitoring', icon: Eye, color: '#1e3a2b' },
  other: { label: 'Action', icon: Hand, color: '#5a5246' },
};

function fmtDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return '';
    return dt.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return ''; }
}

export default function ActionCard({ action }) {
  const meta = ACTION_TYPES[action.action_type] || ACTION_TYPES.other;
  const Icon = meta.icon;
  return (
    <Link
      to={`/ClimateDetail/action/${action.id}`}
      className="relative flex min-h-[110px] w-full flex-col border border-record-ink/30 border-t-4 border-t-record-ochre bg-record-paper text-left transition-transform duration-100 active:scale-95"
    >
      <div className="p-3 flex-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          {/* The record's own drawing of what the action is about, where a borrowed glyph
              used to sit: an action on water and a solution on water now wear the same mark. */}
          {action.category
            ? <SubjectMark subject={action.category} size={15} className="shrink-0" />
            : <Icon className="h-3.5 w-3.5 text-record-red" />}
          <span className="font-display text-xs font-bold uppercase tracking-wide text-record-clay">
            {meta.label}
          </span>
        </div>
        <h3 className="font-display text-base font-bold uppercase leading-tight text-record-ink">
          {action.title}
        </h3>
        <p className="record-meta record-action-copy mt-2 line-clamp-2 font-body text-record-muted">
          {action.description}
        </p>
      </div>
      <div className="px-3 pb-3 flex items-center gap-2 text-[9px] font-mono text-[#5a5246]">
        {action.date && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />{fmtDate(action.date)}
          </span>
        )}
        {(action.country || action.region_rough) && (
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3" />{action.region_rough || action.country}
          </span>
        )}
      </div>
    </Link>
  );
}