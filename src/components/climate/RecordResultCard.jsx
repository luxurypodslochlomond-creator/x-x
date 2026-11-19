import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// One result, in the record's own voice: paper, ink, a fine rule, no hype.
// Each card carries the entry's own words rather than a teaser, says who it came from,
// and links only where the record really has a page for the thing. The origin is printed
// on every card, because on this record a claim without an origin does not exist.

const Tag = ({ children }) => (
  <span className="base-one-label font-mono uppercase inline-block bg-cartoon-sun px-2 py-1 text-record-ink">
    {children}
  </span>
);

const Place = ({ region, country }) =>
  region || country ? (
    <div className="flex items-center gap-1.5 text-record-muted mt-2">
      <MapPin className="w-3 h-3" />
      <span className="text-[10px] font-black font-mono uppercase tracking-widest">
        {[region, country].filter(Boolean).join(' · ')}
      </span>
    </div>
  ) : null;

// Who says so. Always labelled, never dropped — the whole method in one line.
const Origin = ({ name }) =>
  name ? (
    <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-black font-mono uppercase tracking-wide text-record-mark leading-relaxed">
      Source · {name}
    </p>
  ) : null;

export default function RecordResultCard({ kind, item }) {
  if (kind === 'solution' || kind === 'crisis') {
    const isCrisis = item.entry_type === 'climate_crisis';
    return (
      <Link
        to={`/ClimateDetail/${item.entry_type}/${item.id}`}
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>{isCrisis ? 'Climate crisis' : 'Solution'}</Tag>
        <h3 className="font-heading text-base font-bold text-record-ink leading-tight mt-2">{item.title}</h3>
        {item.summary && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-1.5">{item.summary}</p>}
        <Place region={item.region} country={item.country} />
        <Origin name={item.source_name} />
      </Link>
    );
  }

  if (kind === 'action') {
    return (
      <Link
        to={`/ClimateDetail/action/${item.id}`}
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>{String(item.action_type || 'action').replace(/_/g, ' ')}</Tag>
        <h3 className="font-heading text-base font-bold text-record-ink leading-tight mt-2">{item.title}</h3>
        {item.description && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-1.5">{item.description}</p>}
        <Place region={item.region} country={item.country} />
      </Link>
    );
  }

  if (kind === 'gathering') {
    return (
      <div className="record-search-result border-b border-record-ink/20 bg-transparent py-5">
        <h3 className="font-heading text-base font-bold text-record-ink leading-tight">{item.name}</h3>
        {item.topic && (
          <span className="base-one-label font-mono uppercase mt-2 inline-block bg-cartoon-sun px-2 py-1 text-record-ink">
            {item.topic}
          </span>
        )}
        <Place region={item.region} />
        {item.description && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-2">{item.description}</p>}
        {item.contact_email ? (
          <a
            href={`mailto:${item.contact_email}`}
            className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-black font-mono uppercase text-record-mark active:text-record-ink"
          >
            Contact organizer →
          </a>
        ) : (
          <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-mono uppercase tracking-wide text-record-muted leading-relaxed">
            Open group · contact line being arranged
          </p>
        )}
      </div>
    );
  }

  // A person on the roll — only ever findable because they wrote these words themselves.
  if (kind === 'person') {
    return (
      <Link
        to="/ClimateRoll"
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>{item.role === 'keeper' ? 'Custodian' : 'Witness'}</Tag>
        <h3 className="font-heading text-base font-bold text-record-ink leading-tight mt-2">{item.name}</h3>
        {item.line && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-1.5">{item.line}</p>}
        <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-black font-mono uppercase tracking-wide text-record-muted">
          In their own words · the roll →
        </p>
      </Link>
    );
  }

  // A track given to the record, heard on its own page and never counted or sold.
  if (kind === 'track') {
    return (
      <Link
        to="/ClimateMusic"
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>{String(item.kind || 'music').replace(/_/g, ' ')}</Tag>
        <h3 className="font-heading text-base font-bold text-record-ink leading-tight mt-2">{item.title}</h3>
        {item.artist_name && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-1.5">{item.artist_name}</p>}
        {item.spec && (
          <p className="text-[10px] font-mono text-record-muted uppercase tracking-wide mt-2">{item.spec}</p>
        )}
        <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-black font-mono uppercase tracking-wide text-record-muted">
          Given to the record · listen →
        </p>
      </Link>
    );
  }

  // A drawing on the wall — the drawer's own line, their own name, where it came from.
  if (kind === 'cartoon') {
    return (
      <Link
        to="/ClimateCartoons"
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>Drawing</Tag>
        <h3 className="font-heading text-base font-bold text-record-ink leading-tight mt-2">
          {item.title || item.artist_name}
        </h3>
        {item.for_line && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-1.5">{item.for_line}</p>}
        <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-black font-mono uppercase tracking-wide text-record-muted">
          {[item.artist_name, item.origin].filter(Boolean).join(' · ')}
        </p>
      </Link>
    );
  }

  // A credited picture from the record's crawl — the credit travels with it, here as
  // everywhere, and is searchable because a photographer's name is part of what it says.
  if (kind === 'photo') {
    return (
      <Link
        to="/TogetherChangeClimate"
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>Credited picture</Tag>
        <div className="record-search-picture record-media-mount mt-3">
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.caption || item.credit || 'A credited picture on the record'}
              loading="lazy"
              className="block aspect-[3/2] w-full object-cover"
            />
          )}
          {item.caption && (
            <p className="record-header-type bg-record-bone p-3 text-xs leading-relaxed text-record-ink">{item.caption}</p>
          )}
        </div>
        {item.credit && <Origin name={item.credit} />}
      </Link>
    );
  }

  // Something a reader said under an entry. Their words, the name they signed, and the
  // entry they stand under — never the address they typed.
  if (kind === 'comment') {
    const said = String(item.content || '');
    return (
      <Link
        to={`/ClimateDetail/${item.entry_type}/${item.entry_id}`}
        className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
      >
        <Tag>Said on the record</Tag>
        <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-2">
          “{said.length > 220 ? `${said.slice(0, 220)}…` : said}”
        </p>
        <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-black font-mono uppercase tracking-wide text-record-muted leading-relaxed">
          {item.author_name} · under the entry →
        </p>
      </Link>
    );
  }

  // On the wire — headline, what changed, when and where, and who says so.
  return (
    <Link
      to={`/ClimateWireEntry/${item.id}`}
      className="record-search-result block border-b border-record-ink/20 bg-transparent py-5 transition-colors hover:border-record-mark"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <Tag>Signal</Tag>
        {item.verification && (
          <span className="text-[9px] font-mono uppercase tracking-widest text-record-muted">
            {String(item.verification).replace(/_/g, ' ')}
          </span>
        )}
      </div>
      <h3 className="font-heading text-base font-bold text-record-ink leading-tight mt-2">{item.headline}</h3>
      {item.what_changed && <p className="text-[12px] font-mono text-record-ink leading-relaxed mt-1.5">{item.what_changed}</p>}
      {(item.when_label || item.where_label) && (
        <p className="text-[10px] font-mono text-record-muted uppercase tracking-wide mt-2">
          {[item.when_label, item.where_label].filter(Boolean).join(' · ')}
        </p>
      )}
      {item.source_name && (
        <p className="mt-2.5 pt-2.5 border-t border-record-ink/15 text-[10px] font-black font-mono uppercase tracking-wide text-record-mark leading-relaxed">
          Source · {item.source_name}
        </p>
      )}
    </Link>
  );
}