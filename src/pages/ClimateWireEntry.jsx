import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import NewsEntryCard from '@/components/climate/NewsEntryCard';
import RecordCitation from '@/components/climate/RecordCitation';
import SourceBlock from '@/components/climate/SourceBlock';
import ShareCardButton from '@/components/climate/ShareCardButton';
import TapToPlayFilm from '@/components/climate/TapToPlayFilm';

// One entry on its own permanent address. A researcher cites this page, not the front
// page, so the entry, its source and how well it is known all travel together in the link.

export default function ClimateWireEntry() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateNews.get(id)
      .then(record => { if (!cancelled) setEntry(record); })
      .catch(() => { if (!cancelled) setEntry(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const citation = entry
    ? `${entry.source_name}. "${entry.headline}" Together We Can Change Climate — the wire, ${entry.when_label}. ${window.location.href}`
    : '';

  return (
    <div className="twcc-scanlines min-h-screen bg-[#efe7d6] text-[#141210] relative" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 lg:px-10 py-3 border-b-2 border-[#141210] bg-[#efe7d6]">
        <Link to="/ClimateWire" aria-label="Back to the wire" className="w-11 h-11 flex items-center justify-center bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">One entry · permanent address</span>
        {entry && <div className="ml-auto"><ShareCardButton entry={entry} compact /></div>}
      </div>

      <div className="max-w-2xl lg:max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
        {loading && (
          <div className="py-16 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full animate-spin" style={{ border: '2px solid rgba(20,18,16,0.2)', borderTopColor: '#0f5f7a' }} />
          </div>
        )}

        {!loading && !entry && (
          <div className="bg-[#f7f1e5] border-2 border-[#141210]/30 p-6 text-center">
            <p className="text-[12px] font-mono text-[#141210] leading-relaxed mb-4">
              This entry is not on the record. Either it was taken down, or it is still waiting for a person to check its source.
            </p>
            <Link to="/ClimateWire" className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
              Back to the wire <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {entry && (
          <>
            <NewsEntryCard entry={entry} linked={false} />

            {/* Janine's films — a still frame that opens on tap, never on its own. */}
            <TapToPlayFilm
              url={entry.source_url}
              title={entry.headline}
              credit={entry.image_credit ? `Film · ${entry.image_credit}` : entry.source_name ? `Film · ${entry.source_name}` : null}
            />

            <div className="mt-6 bg-[#f7f1e5] border-2 border-[#141210] p-4 lg:p-6">
              <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-2">Pass it on</p>
              <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-3">
                The card carries the headline, the date, the place, who says so and how well it is known — so the story travels with its origin attached, not as a screenshot nobody can trace.
              </p>
              <ShareCardButton entry={entry} />
            </div>

            <SourceBlock
              sourceName={entry.source_name}
              sourceUrl={entry.source_url}
              sourceAuthor={entry.source_author}
              sourceDate={entry.when_label}
              publisherType={entry.publisher_type}
              kindLabel={entry.kind}
              accessed={entry.created_date}
            />

            <RecordCitation
              citation={citation}
              note="Copy the citation and it carries the source and the date with it. This page does not change: if the entry is corrected, the correction shows on it."
            />

            <div className="mt-4 bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] p-3">
              <p className="text-[11px] font-mono leading-relaxed text-[#141210]">
                Something here wrong? Tell us and it is corrected on the entry itself, with the date, in daylight — never quietly edited away. See{' '}
                <Link to="/ClimateMethod" className="underline text-[#141210]">how this record is made</Link>.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}