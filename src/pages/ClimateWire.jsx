import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Plus } from 'lucide-react';
import SignalBeacon from '@/components/climate/SignalBeacon';
import NewsEntryCard from '@/components/climate/NewsEntryCard';
import NewsSubmitForm from '@/components/climate/NewsSubmitForm';

// The wire — the record's front page. What changed, where, who says so, and what can be
// copied from it. Ordered by date, never by attention. Nothing counts here: no likes,
// no views, no ranking. Every entry shows how well it is known.

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'official_record', label: 'Official record' },
  { id: 'corroborated', label: 'Corroborated' },
  { id: 'single_source', label: 'Single source' },
];

export default function ClimateWire() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const query = filter === 'all' ? { status: 'published' } : { status: 'published', verification: filter };
    base44.entities.ClimateNews.filter(query, { sort: '-when_date', limit: 50 })
      .then(page => { if (!cancelled) setEntries(page.items || []); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [filter, reload]);

  return (
    <div className="twcc-scanlines min-h-screen bg-[#efe7d6] text-[#141210] relative" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>

      {/* Cold epigraph band — same mark the rest of the record wears */}
      <div className="bg-[#141210] px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-[#e2602a]/20" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">The wire · a public record, not a feed</span>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
        </div>
        <div className="text-[10px] font-black font-mono text-[#e2602a] tracking-[0.2em] leading-none">x = x</div>
      </div>

      {/* Hero — cold ink, the beacon, the page says exactly what it is */}
      <div className="relative bg-[#141210] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #e9eeec 2px, #e9eeec 3px)', animation: 'twcc-scan 3s linear infinite' }} />
        <div className="relative z-10 px-6 lg:px-10 py-10 lg:py-16 flex flex-col items-center justify-center gap-4 text-center min-h-[220px] lg:min-h-[320px]">
          <SignalBeacon size={44} color="#7fc9e4" />
          <h1
            className="font-black uppercase text-[#efe7d6] leading-[1.05] max-w-md lg:max-w-3xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 4vw, 58px)', letterSpacing: '-0.02em', animation: 'twcc-epigraph 1.4s ease-out .2s both' }}
          >
            The Wire
          </h1>
          <p className="text-[12px] lg:text-[14px] font-mono leading-relaxed text-[#efe7d6]/70 max-w-sm lg:max-w-2xl" style={{ animation: 'twcc-epigraph 1.4s ease-out .4s both' }}>
            What changed, where, and who says so — every entry carrying its source, and what others can copy from it. No likes. No ranking. No volume.
          </p>
        </div>
      </div>

      <div className="max-w-2xl lg:max-w-3xl mx-auto px-4 py-8 lg:py-12">

        {/* Send an entry, and how well a claim is known. On a desktop these are one
            toolbar; on a phone they stack exactly as they did before. */}
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-6">
          <div className="lg:flex-shrink-0">
            <button
              onClick={() => setFormOpen(true)}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 lg:px-6 py-4 min-h-[52px] bg-[#e2602a] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
            >
              <Plus className="w-4 h-4" /> Send an entry to the wire
            </button>
            <p className="text-[10px] font-mono text-[#5a5246] mt-2 text-center lg:text-left leading-relaxed lg:max-w-[340px]">
              Sourced and screened. No source, no entry — anything without one waits for a person.
            </p>
          </div>

          {/* How well it is known */}
          <div className="mt-6 lg:mt-0 flex flex-wrap gap-2 lg:justify-end">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-2 text-[10px] font-black font-mono uppercase border-2 transition-colors ${
                  filter === f.id ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#f7f1e5] text-[#141210] border-[#141210]/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#5a5246]">
            {loading ? 'Reading the wire…' : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`}
          </p>
          <Link to="/ClimateMethod" className="text-[10px] font-black font-mono uppercase tracking-wide text-[#e2602a] underline">How this record is made</Link>
        </div>

        {/* The wire itself */}
        <div className="mt-4 lg:mt-6 space-y-5 lg:space-y-6">
          {loading && (
            <div className="py-14 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full animate-spin" style={{ border: '2px solid rgba(20,18,16,0.2)', borderTopColor: '#0f5f7a' }} />
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="bg-[#f7f1e5] border-2 border-[#141210]/30 p-6 text-center">
              <p className="text-[12px] font-mono text-[#141210] leading-relaxed">
                Nothing on the wire under this heading yet. The record opens with the founder's own words — send the first entry and it goes up with its source.
              </p>
            </div>
          )}

          {!loading && entries.map(entry => <NewsEntryCard key={entry.id} entry={entry} />)}
        </div>

        {/* Why it looks like this */}
        <div className="mt-8 lg:mt-12 bg-[#141210]/5 border-l-4 border-l-[#141210] p-4 lg:p-6">
          <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-2">Why there is nothing to click</p>
          <p className="text-[11px] font-mono leading-relaxed text-[#141210]">
            No likes, no counters, no most-read. Attention is the thing that turns a news page into noise, so the wire does not measure it. Passing an entry on is not a counter — it is what the wire is for. Entries sit in date order and are read or not read. What a reader gets instead is the source, how well the claim is known, and one plain line on what can be copied.
          </p>
        </div>
      </div>

      {/* Signal band — the way back to the record */}
      <div className="bg-[#e2602a] px-5 lg:px-10 py-5 lg:py-8 text-center">
        <Link to="/TogetherChangeClimate" className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#efe7d6] active:text-[#141210] transition-colors">
          Back to the record <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="px-5 py-6 lg:py-8 text-center text-[9px] lg:text-[10px] font-mono text-[#5a5246]/60 leading-relaxed max-w-md lg:max-w-2xl mx-auto">
        The wire is part of Together We Can Change Climate — a public service record built in honour of Janine M. H. Selendy and Horizon International. No advertising, no sponsorship, and money never buys a place on it.
      </p>
      <p className="px-5 pb-9 text-center text-[11px] font-mono text-[#5a5246] leading-relaxed">
        Platform built by Brian Hughes ·{' '}
        <Link to="/Welcome" className="hover:text-[#b3261e] underline decoration-dotted underline-offset-2 transition-colors">UF51 CIC</Link>
        {' '}· Scotland
      </p>

      {formOpen && <NewsSubmitForm onClose={() => setFormOpen(false)} onSent={() => setReload(r => r + 1)} />}
    </div>
  );
}