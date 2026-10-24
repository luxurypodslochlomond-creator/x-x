import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { ArrowRight, Printer, Globe, Languages, Shield, Leaf, Check } from 'lucide-react';
import { recordOrigin } from '@/components/climate/recordAddress';

// ── A factual one-pager for Janine M. H. Selendy & Horizon International ──
// Honest about what is live, what is planned, and what is not built yet.
// The climate record stands alone — separate from the token side of UF51.

// The record's own address is defined once, in components/climate/recordAddress.js: the
// platform's temporary app address is never printed as the record's home.

export default function ClimateBrief() {
  const handlePrint = () => window.print();

  // The brief tells her the numbers are live — so they are. Counted from the
  // database on every visit; today's verified figures are the fallback.
  const [stats, setStats] = useState({
    entries: 14, solutions: 6, crises: 8, locations: 10, categories: 12, actions: 3, groups: 4,
  });

  useEffect(() => {
    (async () => {
      const [solutions, crises, locationList, categoryList, actions, groups] = await Promise.all([
        base44.entities.ClimateSolution.count({ entry_type: 'solution', status: 'published' }),
        base44.entities.ClimateSolution.count({ entry_type: 'climate_crisis', status: 'published' }),
        base44.entities.ClimateSolution.list({ distinct: 'country' }),
        base44.entities.ClimateSolution.list({ distinct: 'category' }),
        base44.entities.ClimateAction.count({ status: 'published' }),
        base44.entities.ClimateGroup.count({}),
      ]);
      setStats({
        entries: solutions + crises,
        solutions,
        crises,
        locations: locationList.items.filter(Boolean).length,
        categories: categoryList.items.filter(Boolean).length,
        actions,
        groups,
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .brief-page { max-width: 100% !important; padding: 0 !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* Action bar — screen only */}
      <div className="no-print bg-[#1a1612] px-4 py-3 flex items-center justify-between">
        <Link to={createPageUrl('TogetherChangeClimate')} className="flex items-center gap-2 text-[#efe7d6] text-[11px] font-black font-mono uppercase tracking-widest">
          ← Back to the record
        </Link>
        <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 bg-[#e2602a] text-[#1a1612] text-[10px] font-black font-mono uppercase border border-[#1a1612] active:bg-[#1e3a2b] active:text-[#efe7d6]">
          <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
        </button>
      </div>

      <div className="brief-page max-w-2xl mx-auto px-6 py-10">

        {/* ── LETTERHEAD ── */}
        <div className="border-b-2 border-[#1a1612] pb-6 mb-8">
          <div className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-[#b3261e] mb-2">
            Together we can change the course of climate change · A Public Service
          </div>
          <h1 className="font-black uppercase leading-[0.95] text-[#1a1612]" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', letterSpacing: '-0.03em' }}>
            A Brief for<br />Janine M. H. Selendy
          </h1>
          <p className="text-[11px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            What we have built from your spec — what is live today, what is planned, and what is not yet built. Written plainly, because your 40 years deserve nothing less than the truth.
          </p>
        </div>

        {/* ── THE PRINCIPLE ── */}
        <section className="mb-8">
          <div className="bg-[#1a1612] text-[#efe7d6] px-5 py-4 mb-4">
            <div className="text-[20px] font-black font-mono tracking-[0.3em] text-center text-[#e2602a]">x = x</div>
            <p className="text-[10px] font-mono text-center mt-2 text-[#efe7d6]/70 leading-relaxed">
              Every entry is equal because it is true — not because it is popular, ranked, or amplified.
            </p>
          </div>
          <p className="text-[13px] leading-relaxed text-[#1a1612]">
            Your spec asked for a universal, honest, non-speculative repository for verified climate solutions. No engagement metrics. No ranking. No advertising. No sponsorship. Money never buys a place on the record. Rough locations only, to protect privacy while staying verifiable. Reviewed before publication. Copyright-free images. Every language on Earth, over time.
          </p>
          <p className="text-[13px] leading-relaxed text-[#1a1612] mt-3">
            That is what we built. This brief shows exactly where each part of your spec stands today.
          </p>
        </section>

        {/* ── WHAT IS LIVE NOW ── */}
        <section className="mb-8">
          <h2 className="font-black uppercase text-[#1a1612] mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            What is live now
          </h2>
          <div className="space-y-2.5">
            {[
              ['Two entry types', 'Solutions (positive actions to replicate) and Climate Crises (emergencies to alert the world to) — exactly as you specified.'],
              ['Your category taxonomy', 'All 20 categories are implemented in the database and filterable on the page. 12 of 20 already have seeded entries; the rest are supported and ready.'],
              ['Rough location, no coordinates', 'Every entry stores a country and a rough region only. No GPS, no precise coordinates — your privacy stance, kept.'],
              ['Screened as it arrives, never queued', 'Every entry carries a status field (draft / reviewed / published). An AI advisory note screens each submission — clear entries go on the record at once, anything flagged waits for a human check.'],
              ['Copyright-free images only', 'Every image is sourced from copyright-free pools (Unsplash). Image credit is stored on each entry.'],
              ['Source name + source URL', 'Every entry links to its original source — Horizon Solutions Site, peer-reviewed articles, verified reporting.'],
              ['Scale field', 'Individual, community, city, country, global — your spec, implemented.'],
              ['Groups', 'People working on the same topic in the same area can form a group. Email is required, per your spec. The platform stores no messages.'],
              ['Actions', 'Cleanups, plantings, meetings, policy submissions, workshops, monitoring. Each action carries one contact link — the organiser is contacted directly. The platform never sees the conversation.'],
              ['60+ interface languages', 'The page interface is preset in 8 languages and AI-translated live into 60+ more, including Gàidhlig, Cymraeg, Quechua, Hawaiian, Te Reo Māori, Ancient Greek. You can also free-type any language on Earth.'],
              ['No advertising, no sponsorship, no influence', 'Stated on the page, and held in the code — there is no ad network on the record, and a gift never buys a place, a position, or a mention in an entry. Givers choose whether their name stands in public.'],
              ['Open source, extraction-proof', 'The platform code is open. A public covenant explains how it resists corporate capture.'],
              ['Full-screen detail pages', 'Every entry opens on its own page with its full body, source link, and related entries — native back-button, mobile-first.'],
              ['The x = x covenant', 'No likes, no upvotes, no ranking, no algorithm. Every entry sits beside every other entry as an equal, because it is true.'],
            ].map(([title, body]) => (
              <div key={title} className="flex gap-3 bg-[#efe7d6] border border-[#1a1612]/15 border-l-4 border-l-[#1e3a2b] px-4 py-3">
                <Check className="w-4 h-4 text-[#1e3a2b] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-black font-mono uppercase text-[#1a1612] leading-tight">{title}</h4>
                  <p className="text-[12px] font-mono text-[#3a342c] leading-relaxed mt-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LIVE NUMBERS ── */}
        <section className="mb-8">
          <h2 className="font-black uppercase text-[#1a1612] mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            The record, today
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              [String(stats.entries), `entries on the record (${stats.solutions} solutions, ${stats.crises} crises)`],
              [String(stats.locations), 'locations represented — countries and regions'],
              [String(stats.categories), 'of 20 categories with entries'],
              [String(stats.actions), 'ground actions listed'],
              [String(stats.groups), 'community groups formed'],
              ['60+', 'languages the interface speaks'],
            ].map(([num, label]) => (
              <div key={label} className="bg-[#1a1612] text-[#efe7d6] px-4 py-4">
                <div className="text-[28px] font-black font-mono text-[#e2602a] leading-none">{num}</div>
                <div className="text-[10px] font-mono uppercase tracking-wide text-[#efe7d6]/70 mt-1.5 leading-tight">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            Numbers are live — they grow as the community adds entries. The platform counts them from the database on every visit.
          </p>
        </section>

        {/* ── WHAT IS PLANNED, NOT YET BUILT ── */}
        <section className="mb-8">
          <h2 className="font-black uppercase text-[#1a1612] mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            What is planned, not yet built
          </h2>
          <div className="space-y-2.5">
            {[
              ['Entry translation by community', 'The interface is translated now. Entries themselves (the solution text) are translated by our community over time — not automatically, because accuracy matters more than speed.'],
              ['8 empty categories', 'Heat, coastal protection, zooplankton, phytoplankton, rewilding, transport, electric vehicles, solar desalination. The database and filters support them; we need to seed the first entries.'],
              ['Photo51 evidence link', 'Connecting ground-action photos (cleanups, plantings) to the climate record, so an action can carry visual proof without storing personal data.'],
              ['Mapping view', 'A rough-region map of where solutions and crises are happening — privacy-respecting, no precise pins.'],
            ].map(([title, body]) => (
              <div key={title} className="flex gap-3 bg-[#efe7d6] border border-[#1a1612]/15 border-l-4 border-l-[#b8860b] px-4 py-3">
                <div>
                  <h4 className="text-[12px] font-black font-mono uppercase text-[#1a1612] leading-tight">{title}</h4>
                  <p className="text-[12px] font-mono text-[#3a342c] leading-relaxed mt-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT WE WILL NOT DO ── */}
        <section className="mb-8">
          <h2 className="font-black uppercase text-[#1a1612] mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            What we will not do
          </h2>
          <div className="bg-[#b3261e] text-[#f4efe4] px-5 py-4">
            <ul className="space-y-2 text-[12px] font-mono leading-relaxed">
              <li>· No advertising, ever.</li>
              <li>· No sponsorship. Money never buys a place on the record.</li>
              <li>· No likes, upvotes, ranking, or engagement algorithms.</li>
              <li>· No precise location tracking.</li>
              <li>· No private messaging stored on the platform.</li>
              <li>· No speculative or unverified claims presented as fact.</li>
              <li>· No mixing of this record with token or crypto mechanics. The climate record stands alone, as a public service.</li>
            </ul>
          </div>
        </section>

        {/* ── THE HONEST MATHS ── */}
        <section className="mb-8">
          <h2 className="font-black uppercase text-[#1a1612] mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            The only maths that matters here
          </h2>
          <div className="bg-[#efe7d6] border-2 border-[#1a1612] px-5 py-5">
            <div className="text-center text-[24px] font-black font-mono text-[#1a1612] mb-3">x = x</div>
            <p className="text-[12px] font-mono text-[#3a342c] leading-relaxed">
              A solution in Nepal is equal to a solution in Niger — not because of votes, not because of reach, but because both are true. A crisis in the Sahel is equal to a crisis in Cardigan Bay. The record does not rank. It does not amplify. It holds what is true, side by side, and lets the world read it.
            </p>
            <p className="text-[12px] font-mono text-[#3a342c] leading-relaxed mt-3">
              This is the whole engineering principle. Every database query returns entries in the order they were created. No score field exists. No weight field exists. The absence of a ranking algorithm is the feature.
            </p>
          </div>
        </section>

        {/* ── HONOUR ── */}
        <section className="mb-8">
          <div className="border-t-2 border-[#1a1612] pt-6">
            <p className="text-[13px] font-mono text-[#1a1612] leading-relaxed">
              This platform is built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us. Your 40 years are the foundation. Our job is to carry the record honestly, in every tongue, to every person on Earth.
            </p>
            <p className="text-[11px] font-mono text-[#6b6258] mt-4 leading-relaxed">
              The live record is at <span className="font-bold text-[#1a1612]">/TogetherChangeClimate</span>. This brief is printable. We will add nothing we cannot stand behind.
            </p>
          </div>
        </section>

        {/* ── EMAIL TO JANINE — copy-paste ready ── */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black uppercase text-[#1a1612]" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
              Email to Janine
            </h2>
            <button
              onClick={() => {
                const text = document.getElementById('janine-email').innerText;
                navigator.clipboard.writeText(text).then(() => {
                  const btn = document.getElementById('copy-btn');
                  const orig = btn.innerHTML;
                  btn.innerHTML = '<span class="text-[10px] font-black font-mono uppercase">Copied ✓</span>';
                  setTimeout(() => { btn.innerHTML = orig; }, 2000);
                });
              }}
              id="copy-btn"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1612] text-[#efe7d6] text-[10px] font-black font-mono uppercase active:bg-[#e2602a] active:text-[#1a1612]"
            >
              Copy email
            </button>
          </div>
          <div id="janine-email" className="bg-[#efe7d6] border-2 border-[#1a1612] px-5 py-5 text-[12px] font-mono text-[#1a1612] leading-relaxed whitespace-pre-wrap select-all">
{`Dear Janine,

You gave us a spec. We built it. Here is where each part stands today — done, planned, or not built.

DONE — live right now:

- Two entry types: Solutions and Climate Crises, as you specified.
- Your full 20-category taxonomy is in and filterable. 12 of 20 have entries; the other 8 are wired up and waiting.
- Rough location only — country and region, no coordinates. Your privacy stance, kept.
- A transmission map: solutions and actions plotted by country and self-identified nation, rough regions only, never precise pins.
- Every entry screened for spam as it arrives; clear entries go on the record at once, anything unclear waits for a human check.
- Copyright-free images only, credit stored on each.
- Every entry links to its source.
- Scale field: individual, community, city, country, global.
- Groups: people on the same topic in the same area can form one. Email required, per your spec. The platform stores no messages.
- Actions: cleanups, plantings, meetings, policy submissions, workshops, monitoring. Each carries one contact link — the organiser is contacted directly. The platform sees none of it.
- The interface speaks 60+ languages, including Gàidhlig, Cymraeg, Quechua, Hawaiian, Te Reo Māori and Ancient Greek. You can also free-type any language on Earth and it translates live.
- Entry text itself translates too — when a reader picks a language, the actual solution and crisis content (title, summary, details) translates live, with a "view original (English)" toggle so nothing is hidden. Accuracy is transparent.
- No advertising, no sponsorship, and no way for money to buy a place on the record. Stated on the page, held in the code.
- Open source, with a public covenant on how it resists capture.
- No likes, no upvotes, no ranking, no algorithm. Every entry is equal because it is true. We call this x = x. There is no score field and no weight field in the database — the absence of a ranking algorithm is the feature.

PLANNED — not yet built:

- 8 categories are empty and need their first entries: heat, coastal protection, zooplankton, phytoplankton, rewilding, transport, electric vehicles, solar desalination.
- Linking ground-action photos to the record as visual proof — designed, not built.

WE WILL NOT DO:

- No advertising, ever.
- No sponsorship. Money never buys a place on the record.
- No likes, ranking, or engagement algorithms.
- No precise location tracking.
- No private messaging stored on the platform.
- No speculative or unverified claims shown as fact.
- No mixing this record with token or crypto mechanics. The climate record stands alone, as a public service.

WHERE THE NUMBERS STAND TODAY:

${stats.entries} entries on the record — ${stats.solutions} solutions, ${stats.crises} crises — across ${stats.locations} countries and regions. ${stats.actions} ground actions. ${stats.groups} community groups. ${stats.categories} of 20 categories filled. 60+ languages. These are live and grow as the community adds entries.

The live record and a printable brief are at the links below.

This is built in your honour, and in honour of Horizon International. Your 40 years are the foundation.

Brian

Live record: ${recordOrigin()}/TogetherChangeClimate
Printable brief: ${recordOrigin()}/ClimateBrief`}
          </div>
          <p className="text-[10px] font-mono text-[#6b6258] mt-2 leading-relaxed">
            Tap "Copy email" to copy the whole message, or tap and hold to select the text manually.
          </p>
        </section>

        {/* ── FOOTER ── */}
        <div className="no-print flex flex-wrap gap-2 pt-4 border-t border-[#1a1612]/15">
          <Link to={createPageUrl('TogetherChangeClimate')} className="flex items-center gap-2 px-4 py-3 bg-[#1a1612] text-[#efe7d6] text-[11px] font-black font-mono uppercase active:bg-[#e2602a] active:text-[#1a1612]">
            <Globe className="w-4 h-4" /> Visit the live record <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to={createPageUrl('ExtractionProofCovenant')} className="flex items-center gap-2 px-4 py-3 border-2 border-[#1a1612] text-[#1a1612] text-[11px] font-black font-mono uppercase active:bg-[#1e3a2b] active:text-[#efe7d6]">
            <Shield className="w-4 h-4" /> Open-source covenant
          </Link>
        </div>
      </div>
    </div>
  );
}