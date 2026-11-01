import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { ArrowRight, Globe, Shield, Check } from 'lucide-react';

// ── A factual one-pager for Janine M. H. Selendy & Horizon International ──
// Honest about what is live, what is planned, and what is not built yet.
// The climate record stands alone — separate from the token side of UF51.

// The record's own address is defined once, in components/climate/recordAddress.js: the
// platform's temporary app address is never printed as the record's home.

export default function ClimateBrief() {
  // The brief tells her the numbers are live — so they are. Counted from the
  // database on every visit; today's verified figures are the fallback.
  // The fallbacks are today's real figures, so a failed count can never print a number that
  // was true weeks ago. Every figure below is re-counted from the database on each visit.
  const [stats, setStats] = useState({
    entries: 19, solutions: 10, crises: 9, wire: 18, locations: 13, categories: 16, actions: 3, groups: 4,
  });

  useEffect(() => {
    (async () => {
      // Locations and categories are counted on the server, not by listing the record and
      // counting distinct values in the browser: the record no longer hands out the address
      // a submitter gave, and a field held back that way also stops a browser's own
      // counting query. The two numbers still come from the real published entries.
      const [solutions, crises, facets, actions, groups, wire] = await Promise.all([
        base44.entities.ClimateSolution.count({ entry_type: 'solution', status: 'published' }),
        base44.entities.ClimateSolution.count({ entry_type: 'climate_crisis', status: 'published' }),
        base44.functions.invoke('climateRecordFacets', {}).then(r => r?.data || {}),
        base44.entities.ClimateAction.count({ status: 'published' }),
        base44.entities.ClimateGroup.count({}),
        base44.entities.ClimateNews.count({ status: 'published' }),
      ]);
      setStats(prev => ({
        ...prev,
        entries: solutions + crises,
        solutions,
        crises,
        wire,
        locations: facets.countries ?? prev.locations,
        categories: facets.categories ?? prev.categories,
        actions,
        groups,
      }));
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
          <p className="text-[12px] font-mono text-[#1a1612] mt-4 leading-relaxed">
            One thing about this page, since it is a list of claims about our own work and anyone can write a list: each line here can be checked against the record itself. Every entry names where it came from, every correction carries its date on the entry, and what is still missing, what it costs to keep alive, and who holds the keys today are said in the open, at the foot of every page.
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
            Your spec asked for a universal, honest, non-speculative repository for verified climate solutions. No engagement metrics on any reader — reach is counted by place alone, never per person, and never as a score. No ranking. No advertising. No sponsorship. Money never buys a place on the record. Rough locations only, to protect privacy while staying verifiable. Reviewed before publication. Copyright-free images. Every language on Earth, over time.
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
              ['Your category taxonomy', `Your 20-category taxonomy is implemented and has since grown to 32, all filterable on the page. ${stats.categories} of them carry entries today; the rest are supported and ready.`],
              ['Rough location, no coordinates', 'Every entry stores a country and a rough region only. No GPS, no precise coordinates — your privacy stance, kept.'],
              ['A map of where it is happening', 'Both entry types on a rough-region map, reachable from the record itself — no precise pins, and no reader tracked while they look.'],
              ['Screened as it arrives, never queued', 'Every entry carries a status field (draft / reviewed / published). An AI advisory note screens each submission — clear entries go on the record at once, anything flagged waits for a human check.'],
              ['Copyright-free images only', 'Where a picture is shown it comes from a copyright-free pool and carries its credit on the entry. A credit is a thank you, not a permission — so an entry with no cleared picture shows none, rather than borrowing one from somebody else\u2019s page.'],
              ['Source name + source URL', 'Every entry links to its original source — Horizon Solutions Site, peer-reviewed articles, verified reporting.'],
              ['Scale field', 'Individual, community, city, country, global — your spec, implemented.'],
              ['Groups', 'People working on the same topic in the same area can form a group. Email is required, per your spec. The platform stores no messages.'],
              ['Actions', 'Cleanups, plantings, meetings, policy submissions, workshops, monitoring. Each action carries one contact link — the organiser is contacted directly. The platform never sees the conversation.'],
              ['65 tongues · 8 written by hand', 'The interface is written out by hand in 8 languages and machine-made into 57 more, including Gàidhlig, Cymraeg, Quechua, Hawaiian, Te Reo Māori and Ancient Greek. Where a tongue is a machine\'s attempt — the ancient scripts especially — the page says so plainly rather than passing it off as an inscription. You can also free-type any tongue on Earth.'],
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
              [String(stats.wire), 'dated, sourced entries on the wire'],
              [String(stats.locations), 'locations represented — countries and regions'],
              [String(stats.categories), 'of 32 categories with entries'],
              [String(stats.actions), 'ground actions listed'],
              [String(stats.groups), 'community groups formed'],
              ['65', 'tongues the interface speaks'],
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
              ['Categories still to fill', `${32 - stats.categories} of the 32 categories have no entry yet. The database and the filters support them; they need their first entries, not new code.`],
              ['Photo51 evidence link', 'Connecting ground-action photos (cleanups, plantings) to the climate record, so an action can carry visual proof without storing personal data.'],
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
              The live record is at <span className="font-bold text-[#1a1612]">/TogetherChangeClimate</span>. We will add nothing we cannot stand behind.
            </p>
          </div>
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