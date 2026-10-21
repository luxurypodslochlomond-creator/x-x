import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';

// One entry on the wire. Dated, sourced, and honest about how well it is known —
// the badge tells the reader whether one origin says this, two agree, or the body
// itself has put it on the record. No likes, no counters, nothing to game.

const VERIFICATION = {
  official_record: { label: 'Official record', tone: 'bg-[#1e3a2b] text-[#efe7d6]' },
  corroborated: { label: 'Corroborated', tone: 'bg-[#e2602a] text-[#141210]' },
  single_source: { label: 'Single source', tone: 'bg-[#141210] text-[#efe7d6]' },
};

const KIND = {
  emergency: 'Emergency',
  milestone: 'Milestone',
  initiative: 'Initiative',
};

export default function NewsEntryCard({ entry, linked = true }) {
  const badge = VERIFICATION[entry.verification] || VERIFICATION.single_source;
  const headlineClass = 'font-black uppercase leading-[1.1] text-[#141210]';
  const headlineStyle = { fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.01em' };

  return (
    <article className="bg-[#f7f1e5] border-2 border-[#141210]">
      <div className="flex flex-wrap items-center gap-2 px-4 pt-4">
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">{entry.when_label}</span>
        <span className={`px-2 py-0.5 text-[9px] font-black font-mono uppercase tracking-wide ${badge.tone}`}>{badge.label}</span>
        {entry.kind && (
          <span className="px-2 py-0.5 text-[9px] font-black font-mono uppercase tracking-wide border border-[#141210]/40 text-[#5a5246]">
            {KIND[entry.kind] || entry.kind}
          </span>
        )}
        {entry.where_label && <span className="text-[10px] font-mono text-[#5a5246] uppercase tracking-wide">· {entry.where_label}</span>}
      </div>

      {linked ? (
        <Link to={`/ClimateWireEntry/${entry.id}`} className="block px-4 pt-3">
          <h2 className={headlineClass} style={headlineStyle}>{entry.headline}</h2>
        </Link>
      ) : (
        <div className="px-4 pt-3">
          <h2 className={headlineClass} style={headlineStyle}>{entry.headline}</h2>
        </div>
      )}

      <p className="px-4 pt-2 text-[12.5px] font-mono leading-relaxed text-[#141210]">{entry.what_changed}</p>

      {entry.image_url && (
        <figure className="mt-4">
          <img src={entry.image_url} alt={entry.headline} loading="lazy" className="w-full block border-y-2 border-[#141210] object-cover" style={{ maxHeight: 320 }} />
          {entry.image_credit && (
            <figcaption className="px-4 py-1.5 text-[9px] font-mono uppercase tracking-wide text-[#5a5246] border-b-2 border-[#141210]">{entry.image_credit}</figcaption>
          )}
        </figure>
      )}

      {entry.replicable && (
        <div className="mt-4 mx-4 bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] px-3 py-2.5">
          <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#1e3a2b] mb-1">What can be copied from this</p>
          <p className="text-[11.5px] font-mono leading-relaxed text-[#141210]">{entry.replicable}</p>
        </div>
      )}

      {entry.correction_note && (
        <div className="mt-3 mx-4 bg-[#b3261e]/5 border-l-4 border-l-[#b3261e] px-3 py-2.5">
          <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e] mb-1">Correction</p>
          <p className="text-[11.5px] font-mono leading-relaxed text-[#141210]">{entry.correction_note}</p>
        </div>
      )}

      <div className="mt-4 px-4 py-3 border-t-2 border-[#141210]/15 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246]">Who says so</span>
        <span className="text-[11px] font-mono text-[#141210]">{entry.source_name}</span>
        {entry.corroborating_source && (
          <span className="text-[10px] font-mono text-[#5a5246]">+ {entry.corroborating_source}</span>
        )}
        {entry.source_url && (
          <a
            href={entry.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-black font-mono uppercase tracking-wide text-[#e2602a] underline"
          >
            Read the source <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {linked && <div className="ml-auto self-center"><ShareCardButton entry={entry} compact /></div>}
      </div>
    </article>
  );
}