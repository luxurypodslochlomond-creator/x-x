import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Sprout, Recycle, FileText, Hammer, Eye, Hand } from 'lucide-react';

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
      className="relative text-left w-full bg-[#f7f1e5] border border-[#141210] border-t-4 min-h-[110px] flex flex-col active:scale-95 transition-transform duration-100"
      style={{ borderTopColor: meta.color }}
    >
      <div className="p-3 flex-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Icon className="w-3.5 h-3.5" style={{ color: meta.color }} />
          <span className="text-[8px] font-black font-mono uppercase tracking-widest" style={{ color: meta.color }}>
            {meta.label}
          </span>
        </div>
        <h3 className="text-[11px] font-black font-mono uppercase leading-tight text-[#141210] line-clamp-3">
          {action.title}
        </h3>
        <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-1.5 line-clamp-2">
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