import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import VerificationBadge from '@/components/climate/VerificationBadge';

// One result, in the record's own voice: paper, ink, a fine rule, no hype.
// Each card carries the entry's own words rather than a teaser, says who it came from,
// and links only where the record really has a page for the thing. The origin is printed
// on every card, because on this record a claim without an origin does not exist.

const Tag = ({ children, tone = '#1e3a2b' }) => (
  <span
    className="inline-block text-[9px] font-black font-mono uppercase tracking-widest px-1.5 py-0.5 border"
    style={{ color: tone, borderColor: tone }}
  >
    {children}
  </span>
);

const Place = ({ region, country }) =>
  region || country ? (
    <div className="flex items-center gap-1.5 text-[#1e3a2b] mt-2">
      <MapPin className="w-3 h-3" />
      <span className="text-[10px] font-black font-mono uppercase tracking-widest">
        {[region, country].filter(Boolean).join(' · ')}
      </span>
    </div>
  ) : null;

// Who says so. Always labelled, never dropped — the whole method in one line.
const Origin = ({ name }) =>
  name ? (
    <p className="mt-2.5 pt-2.5 border-t border-[#141210]/15 text-[10px] font-black font-mono uppercase tracking-wide text-[#b3261e] leading-relaxed">
      Source · {name}
    </p>
  ) : null;

export default function RecordResultCard({ kind, item }) {
  if (kind === 'solution' || kind === 'crisis') {
    const isCrisis = item.entry_type === 'climate_crisis';
    return (
      <Link
        to={`/ClimateDetail/${item.entry_type}/${item.id}`}
        className="block bg-[#f7f1e5] border border-[#141210] border-t-4 p-3.5 active:bg-[#efe7d6] transition-colors"
        style={{ borderTopColor: isCrisis ? '#b3261e' : '#1e3a2b' }}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag tone={isCrisis ? '#b3261e' : '#1e3a2b'}>{isCrisis ? 'Climate crisis' : 'Solution'}</Tag>
          <VerificationBadge entry={item} />
        </div>
        <h3 className="text-[13px] font-black font-mono uppercase text-[#141210] leading-tight mt-2">{item.title}</h3>
        {item.summary && <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-1.5">{item.summary}</p>}
        <Place region={item.region} country={item.country} />
        <Origin name={item.source_name} />
      </Link>
    );
  }

  if (kind === 'action') {
    return (
      <Link
        to={`/ClimateDetail/action/${item.id}`}
        className="block bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#e2602a] p-3.5 active:bg-[#efe7d6] transition-colors"
      >
        <Tag tone="#e2602a">{String(item.action_type || 'action').replace(/_/g, ' ')}</Tag>
        <h3 className="text-[13px] font-black font-mono uppercase text-[#141210] leading-tight mt-2">{item.title}</h3>
        {item.description && <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-1.5">{item.description}</p>}
        <Place region={item.region} country={item.country} />
      </Link>
    );
  }

  if (kind === 'gathering') {
    return (
      <div className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-3.5">
        <h3 className="text-[13px] font-black font-mono uppercase text-[#141210] leading-tight">{item.name}</h3>
        {item.topic && (
          <span className="inline-block text-[9px] font-black font-mono uppercase tracking-widest text-[#1e3a2b] border border-[#1e3a2b] px-1.5 py-0.5 mt-1.5">
            {item.topic}
          </span>
        )}
        <Place region={item.region} />
        {item.description && <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-2">{item.description}</p>}
        {item.contact_email ? (
          <a
            href={`mailto:${item.contact_email}`}
            className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-black font-mono uppercase text-[#b3261e] active:text-[#e2602a]"
          >
            Contact organizer →
          </a>
        ) : (
          <p className="mt-2.5 pt-2.5 border-t border-[#141210]/15 text-[10px] font-mono uppercase tracking-wide text-[#5a5246] leading-relaxed">
            Open gathering · contact line being arranged
          </p>
        )}
      </div>
    );
  }

  // On the wire — headline, what changed, when and where, and who says so.
  return (
    <Link
      to={`/ClimateWireEntry/${item.id}`}
      className="block bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#141210] p-3.5 active:bg-[#efe7d6] transition-colors"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <Tag tone="#141210">Wire</Tag>
        {item.verification && (
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#5a5246]">
            {String(item.verification).replace(/_/g, ' ')}
          </span>
        )}
      </div>
      <h3 className="text-[13px] font-black font-mono uppercase text-[#141210] leading-tight mt-2">{item.headline}</h3>
      {item.what_changed && <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-1.5">{item.what_changed}</p>}
      {(item.when_label || item.where_label) && (
        <p className="text-[10px] font-mono text-[#5a5246] uppercase tracking-wide mt-2">
          {[item.when_label, item.where_label].filter(Boolean).join(' · ')}
        </p>
      )}
      {item.source_name && (
        <p className="mt-2.5 pt-2.5 border-t border-[#141210]/15 text-[10px] font-black font-mono uppercase tracking-wide text-[#b3261e] leading-relaxed">
          Source · {item.source_name}
        </p>
      )}
    </Link>
  );
}