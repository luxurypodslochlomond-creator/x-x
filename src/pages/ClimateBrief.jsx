import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Globe, Shield, Check } from 'lucide-react';
import RecordToday from '@/components/climate/brief/RecordToday';
import { useRecordFigures, show, TONGUES, HAND_WRITTEN_TONGUES } from '@/components/climate/recordFigures';

// ── A BRIEF FOR JANINE M. H. SELENDY & HORIZON INTERNATIONAL ─────────────────
// The order of this page is the order she asked for, and it is the order a stranger reads
// in: what this is and why it exists, said in sunny weather and in one breath — then where
// it actually stands tonight and where it is going — then what it would take to carry it
// for good. The letter itself is not printed here: a letter is one person writing to
// another, so it lives on its own page, behind a keeper's key.
//
// Nothing is removed to make that order. What is live, what is planned, what it will never
// do, and where every claim can be checked are all still here, standing where they belong
// in the telling rather than in a list of features.
//
// And every figure is a door: a count nobody can walk to is a number asking to be believed.

export default function ClimateBrief() {
  // ── NOTHING ON THIS PAGE IS TYPED IN ────────────────────────────────────────────
  // There used to be a block of figures written here, described in a comment as "today's real
  // figures, so a failed count can never print a number that was true weeks ago". The comment
  // was wrong and the figures proved it: by the time anyone checked, seals were typed as 44
  // against 93 real, and categories as 16 while the taxonomy was 32. A fallback is only ever
  // the last number somebody typed, and the last number somebody typed is a memory.
  //
  // So every figure is asked of the record as the page opens, and if an answer does not come
  // back the plate prints a dash. That is the whole discipline of this page: a number we
  // cannot count tonight does not get to stand in for one we counted once.
  const f = useRecordFigures();

  // Each plate walks to the thing it counted.
  const figures = [
    { n: show(f?.entries), label: `entries on the record · ${show(f?.solutions)} solutions, ${show(f?.crises)} crises`, to: '/TogetherChangeClimate' },
    { n: show(f?.seals), label: 'fingerprints, each one checkable in your own browser', to: '/ClimateSeals' },
    { n: show(f?.wire), label: 'dated, sourced entries on the wire', to: '/ClimateWire' },
    { n: show(f?.locations), label: 'locations represented — countries and regions', to: '/ClimateMap' },
    { n: show(f?.actions), label: 'ground actions listed', to: '/TogetherChangeClimate' },
    { n: show(f?.groups), label: 'community groups formed', to: '/TogetherChangeClimate' },
    { n: `${show(f?.categoriesUsed)}/${show(f?.categoriesTotal)}`, label: 'categories carrying entries today', to: '/TogetherChangeClimate' },
    { n: String(TONGUES), label: 'tongues the interface speaks', to: '/TogetherChangeClimate' },
  ];

  return (
    <div className="record-brief-page min-h-screen bg-record-paper text-record-ink" style={{ fontFamily: 'var(--font-body)' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .brief-page { max-width: 100% !important; padding: 0 !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* Action bar — screen only */}
      <div className="no-print bg-[#241d16] px-4 py-3 flex items-center justify-between">
        <Link to={createPageUrl('TogetherChangeClimate')} className="flex items-center gap-2 text-[#efe7d6] text-[11px] font-black font-mono uppercase tracking-widest">
          ← Back to the record
        </Link>
      </div>

      <div className="brief-page record-page-plate max-w-2xl mx-auto px-4 py-10">

        {/* ── LETTERHEAD ── */}
        <div className="border-b-2 border-[#1a1612] pb-6 mb-8">
          <div className="text-[9px] font-black font-mono uppercase tracking-[0.3em] text-[#b3261e] mb-2">
            Together we can change the course of climate change · A Public Service
          </div>
          <h1 className="font-black uppercase leading-[0.95] text-[#1a1612]" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', letterSpacing: '-0.03em' }}>
            A Brief for<br />Janine M. H. Selendy
          </h1>
          <p className="text-[14px] leading-[1.7] text-[#1a1612] mt-4" style={{ fontFamily: 'var(--font-reading)' }}>
            Forty years of looking straight at what is happening to this planet and never once dressing it up. This page
            is what came of it: a record anyone can check, anyone can carry, and nobody can own — built to still be here
            when the people who started it are not.
          </p>
          <p className="text-[12px] font-mono text-[#1a1612] mt-4 leading-relaxed">
            One thing about this page, since it is a list of claims about our own work and anyone can write a list: every
            line here can be checked against the record itself. Every figure is a door — press it and you land on the
            thing it counted. What is still missing, what it costs to keep alive, and who holds the keys today are said in
            the open, at the foot of every page.
          </p>
        </div>

        {/* ── 01 · WHAT THIS IS, IN SUNNY WEATHER ── */}
        <section className="mb-10">
          <div className="text-[9px] font-black font-mono uppercase tracking-[0.24em] text-[#b3261e] mb-3">01 · What this is</div>

          <div className="bg-[#241d16] text-[#efe7d6] px-5 py-5 mb-5">
            <div className="text-[26px] font-black font-mono tracking-[0.3em] text-center text-record-mark">x = x</div>
            <p className="text-[12px] leading-[1.7] text-center mt-3 text-[#efe7d6]/85 max-w-sm mx-auto" style={{ fontFamily: 'var(--font-reading)' }}>
              A solution in Nepal is equal to a solution in Niger. Not because of votes, not because of reach — because
              both are true. A crisis in the Sahel stands level with a crisis in Cardigan Bay.
            </p>
          </div>

          <p className="text-[14px] leading-[1.7] text-[#1a1612]" style={{ fontFamily: 'var(--font-reading)' }}>
            Two things go wrong every time the planet is discussed. Nobody can check what they are told, so the honest
            and the loud arrive looking identical. And the loudest voice wins the week, then the week is gone.
          </p>
          <p className="text-[14px] leading-[1.7] text-[#1a1612] mt-3" style={{ fontFamily: 'var(--font-reading)' }}>
            This record is the answer to both, and it is one idea: put what is true beside what is true, name where each
            one came from, say out loud how well it is known, and fingerprint the words so that if anybody moves them the
            record says so about itself, in public. No likes. No ranking. No algorithm deciding which crisis you are
            allowed to see this morning. Every database query returns entries in the order they were created: no score
            field exists, no weight field exists, and the absence of a ranking algorithm is the feature.
          </p>
          <p className="text-[14px] leading-[1.7] text-[#1a1612] mt-3" style={{ fontFamily: 'var(--font-reading)' }}>
            What follows from that is the part that matters to a funder, a university or a hostile reader: there is
            nothing here to extract. Money cannot buy a place, a position or a mention. Nobody can carry the record off
            and close it, because the covenant and the licence travel with it. No advertising, no sponsorship, no
            tracking of a reader, no precise coordinates on anybody's home. A gift is a gift, and it never buys influence.
          </p>
          <p className="text-[14px] leading-[1.7] text-[#1a1612] mt-3" style={{ fontFamily: 'var(--font-reading)' }}>
            And it is for the generation after us, which is the only reason to build a record at all. A library is the
            one thing you can hand to people you will never meet: forty years of her work, written down in a form that
            does not depend on her being alive to defend it, in sixty-five tongues, on any phone, with no account to open.
          </p>
          <p className="text-[13px] leading-[1.7] text-[#3a342c] mt-3 border-l-4 border-l-[#1e3a2b] pl-3">
            Your spec asked for a universal, honest, non-speculative repository for verified climate solutions. That is
            what this is: two entry types, your category taxonomy, rough locations only, review before publication,
            copyright-free images with their credits, every language on Earth over time.
          </p>
        </section>

        {/* ── 02 · WHERE IT IS TONIGHT, AND WHERE IT IS GOING ── */}
        <section className="mb-10">
          <div className="text-[9px] font-black font-mono uppercase tracking-[0.24em] text-[#b3261e] mb-3">02 · Where it is tonight, and where it is going</div>
          <h2 className="font-black uppercase text-[#1a1612] mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            The record, today
          </h2>
          <RecordToday figures={figures} />
          <p className="text-[10px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            Counted from the database as this page opens, never typed in once — and a dash means the
            count could not be made tonight, in which case we would rather show nothing than last
            month&rsquo;s figure in today&rsquo;s clothes. Press any figure to see what it is counting.
          </p>

          <h3 className="mt-7 mb-3 text-[11px] font-black font-mono uppercase tracking-[0.16em] text-[#1e3a2b]">Live now</h3>
          <div className="space-y-2.5">
            {[
              ['Two entry types', 'Solutions (positive actions to replicate) and Climate Crises (emergencies to alert the world to) — exactly as you specified.', '/TogetherChangeClimate', 'See both on the record'],
              ['Your category taxonomy', `Your 20-category taxonomy is implemented and has since grown to ${show(f?.categoriesTotal)}, all filterable on the page. ${show(f?.categoriesUsed)} of them carry entries today; the rest are supported and ready.`, '/TogetherChangeClimate', 'Filter by category'],
              ['Rough location, no coordinates', 'Every entry stores a country and a rough region only. No GPS, no precise coordinates — your privacy stance, kept.', '/ClimateMethod', 'How place is held'],
              ['A map of where it is happening', 'Both entry types on a rough-region map, reachable from the record itself — no precise pins, and a read is counted by country alone, never by person.', '/ClimateMap', 'Open the map'],
              ['Screened as it arrives — by a machine, and it says so', 'Every entry carries a status field (draft / reviewed / published). A machine reads each submission as it arrives: clear entries go on the record at once, anything it flags waits for a person. A machine can hold an entry back. It can never make one trusted — that takes a person reading the source and signing their name, and there are not enough of those yet.', '/ClimateMethod', 'How screening works'],
              ['Copyright-free images only', 'Where a picture is shown it comes from a copyright-free pool and carries its credit on the entry. A credit is a thank you, not a permission — so an entry with no cleared picture shows none, rather than borrowing one from somebody else\u2019s page.', '/ClimateMethod', 'Picture rules'],
              ['Source name + source URL', 'Every entry links to its original source — Horizon Solutions Site, peer-reviewed articles, verified reporting.', '/ClimateMethod', 'What a source has to be'],
              ['Scale field', 'Individual, community, city, country, global — your spec, implemented.', '/TogetherChangeClimate', 'See it on an entry'],
              ['Groups', 'People working on the same topic in the same area can form one. Email is required, per your spec. The platform stores no messages.', '/TogetherChangeClimate', 'See the gatherings'],
              ['Actions', 'Cleanups, plantings, meetings, policy submissions, workshops, monitoring. Each action carries one contact link — the organiser is contacted directly. The platform never sees the conversation.', '/TogetherChangeClimate', 'See the actions'],
              [`${TONGUES} tongues · ${HAND_WRITTEN_TONGUES} written by hand`, `The interface is written out by hand in ${HAND_WRITTEN_TONGUES} languages and machine-made into ${TONGUES - HAND_WRITTEN_TONGUES} more, including Gàidhlig, Cymraeg, Quechua, Hawaiian, Te Reo Māori and Ancient Greek. Both figures are read from the code that serves them, so neither can drift away from the tongue list. Where a tongue is a machine\'s attempt — the ancient scripts especially — the page says so plainly rather than passing it off as an inscription. You can also free-type any tongue on Earth.`, '/TogetherChangeClimate', 'Choose a tongue'],
              ['Every entry fingerprinted', 'Each published entry is sealed by the record\'s own server, and the fingerprint is recomputed in the reader\'s browser. If the words move without a new seal, the fingerprints stop matching and the record says so in public.', '/ClimateSeals', 'Check a seal yourself'],
              ['No advertising, no sponsorship, no influence', 'Stated on the page, and held in the code — there is no ad network on the record, and a gift never buys a place, a position, or a mention in an entry. Givers choose whether their name stands in public.', '/ClimateMethod', 'Where that rule is written'],
              ['Full-screen detail pages', 'Every entry opens on its own page with its full body, source link, and related entries — native back-button, mobile-first.', '/TogetherChangeClimate', 'Open any entry'],
              // The mark gets its own line inside the card, in its own red — inside a sentence
              // it read as punctuation rather than the promise the whole record is held to.
              ['The covenant', (
                <>
                  <span className="mb-1.5 block font-mono text-[13px] font-black tracking-[0.3em] text-record-mark">x = x</span>
                  No likes, no upvotes, no ranking, no algorithm. Every entry sits beside every other entry as an equal, because it is true.
                </>
              ), '/XEqualsX', 'Read the covenant'],
            ].map(([title, body, to, check]) => (
              <div key={title} className="flex gap-3 bg-[#efe7d6] border border-[#1a1612]/15 border-l-4 border-l-[#1e3a2b] px-4 py-3">
                <Check className="w-4 h-4 text-[#1e3a2b] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-black font-mono uppercase text-[#1a1612] leading-tight">{title}</h4>
                  <p className="text-[12.5px] leading-relaxed text-[#3a342c] mt-1">{body}</p>
                  {to && (
                    <Link
                      to={to}
                      className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-black font-mono uppercase tracking-wide text-[#1e3a2b] underline decoration-dotted underline-offset-2"
                    >
                      {check} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-7 mb-3 text-[11px] font-black font-mono uppercase tracking-[0.16em] text-[#b8860b]">Where it is going — planned, not yet built</h3>
          <div className="space-y-2.5">
            {[
              ['The checking office, staffed', 'The office is built and empty. Independent people reading entries, following sources and signing their names is the next real step, and the only one that cannot be automated.'],
              ['Entry translation by community', 'The interface is translated now. Entries themselves (the solution text) are translated by our community over time — not automatically, because accuracy matters more than speed.'],
              ['Categories still to fill', `${show(f?.categoriesTotal == null || f?.categoriesUsed == null ? null : f.categoriesTotal - f.categoriesUsed)} of the ${show(f?.categoriesTotal)} categories have no entry yet. The database and the filters support them; they need their first entries, not new code.`],
              ['Photo51 evidence link', 'Connecting ground-action photos (cleanups, plantings) to the climate record, so an action can carry visual proof without storing personal data.'],
              ['The code, in public', 'The licence and the covenant are in place. The repository itself is being published — until it is, nothing here can honestly be called auditable, and the covenant says so in its own words.'],
            ].map(([title, body]) => (
              <div key={title} className="flex gap-3 bg-[#efe7d6] border border-[#1a1612]/15 border-l-4 border-l-[#b8860b] px-4 py-3">
                <div>
                  <h4 className="text-[12px] font-black font-mono uppercase text-[#1a1612] leading-tight">{title}</h4>
                  <p className="text-[12.5px] leading-relaxed text-[#3a342c] mt-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 · WHAT IT TAKES TO TAKE IT INTO THE FUTURE ── */}
        <section className="mb-10">
          <div className="text-[9px] font-black font-mono uppercase tracking-[0.24em] text-[#b3261e] mb-3">03 · What it takes to carry it into the future</div>
          <p className="text-[14px] leading-[1.7] text-[#1a1612]" style={{ fontFamily: 'var(--font-reading)' }}>
            The machinery is built. What it cannot manufacture is people. So this is the whole ask, in the order that
            matters — and none of it is a fee for software. Nor is it an ask for ten years, or a hundred: a record is
            either kept for good or it is a project, and this one is built to be kept for good.
          </p>

          <div className="border-2 border-[#1a1612] divide-y divide-[#1a1612]/15 mt-4">
            {[
              ['01', 'People who check', 'A witness reads an entry, follows its source, and signs their name to what they found. There are none yet. This is the only item here that cannot be built, bought or automated — a checker corps with one named lead, students perhaps, in a department that already teaches this.'],
              ['02', 'One reader with standing', 'Someone who reads the method and says in public whether it holds. Not an endorsement of the contents: a verdict on the method. If it fails, that verdict gets published too.'],
              ['03', 'Somebody to carry it', 'The hosting, which is modest — one thousand pounds a year at this size, and the same again every year after it with no end date — the technology that will need building and maintaining, and a fair living for the two people in Scotland who keep it, so that tending this is the work rather than something done after it.'],
            ].map(([n, title, body]) => (
              <div key={n} className="px-4 py-4 bg-[#efe7d6]">
                <div className="flex items-baseline gap-2">
                  <span className="text-[9.5px] font-black font-mono text-[#b3261e]">{n}</span>
                  <h3 className="text-[12px] font-black font-mono uppercase tracking-wide text-[#1a1612]">{title}</h3>
                </div>
                <p className="text-[13px] leading-[1.7] text-[#3a342c] mt-1.5">{body}</p>
              </div>
            ))}
          </div>

          <p className="text-[13px] leading-[1.7] text-[#1a1612] mt-4" style={{ fontFamily: 'var(--font-reading)' }}>
            Nobody in this has money for it. The founder it is built in honour of has said plainly that she does not, the
            two who built it are an asset-locked community interest company in Scotland with no reserves, and no grant has
            been taken. That is why nothing on this page asks anybody for a cheque. It asks for people who can check it,
            and a host who can carry it.
          </p>

          <h3 className="mt-7 mb-3 text-[11px] font-black font-mono uppercase tracking-[0.16em] text-[#b3261e]">And what it will never do</h3>
          <div className="bg-[#b3261e] text-[#f4efe4] px-5 py-4">
            <ul className="space-y-2 text-[12.5px] leading-relaxed">
              <li>· No advertising, ever.</li>
              <li>· No sponsorship. Money never buys a place on the record.</li>
              <li>· No likes, upvotes, ranking, or engagement algorithms.</li>
              <li>· No precise location tracking.</li>
              <li>· No private messaging stored on the platform.</li>
              <li>· No speculative or unverified claims presented as fact.</li>
              <li>· No mixing of this record with token or crypto mechanics. The climate record stands alone, as a public service.</li>
            </ul>
          </div>

          <h3 className="mt-7 mb-3 text-[11px] font-black font-mono uppercase tracking-[0.16em] text-[#1a1612]">Where to check this page</h3>
          <div className="border-2 border-[#1a1612] divide-y-2 divide-[#1a1612]">
            {[
              ['/ClimateMethod', 'The Method', 'What this record can say, what it cannot, and how each entry is sourced.'],
              ['/ClimateCorrections', 'Corrections, in the open', 'Everything that has been changed, with its date and its reason. Nothing is fixed quietly.'],
              ['/ClimateGuide', 'All pages & guide', 'Every public page, followed by a guide to the controls.'],
              ['/ClimateHostBrief', 'The one-page summary', 'The figures, the gaps and the ask on a single page, for whoever carries it next.'],
            ].map(([to, title, body]) => (
              <Link key={to} to={to} className="flex items-start gap-3 bg-[#efe7d6] px-4 py-3 active:bg-[#e2602a]/15">
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#b3261e]" />
                <div>
                  <h4 className="text-[12px] font-black font-mono uppercase text-[#1a1612] leading-tight">{title}</h4>
                  <p className="text-[11.5px] leading-relaxed text-[#3a342c] mt-1">{body}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-[10px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            If any line above cannot be checked in one of those places, treat it as unproven — including the flattering ones.
          </p>
        </section>

        {/* ── THE FOOTING ── */}
        <section className="mb-8">
          <div className="border-t-2 border-[#1a1612] pt-6">
            <p className="text-[15px] leading-[1.7] text-[#1a1612]" style={{ fontFamily: 'var(--font-reading)' }}>
              Forty years she has carried this, and nothing here would exist without them. So the record is hers in the only
              way that lasts: it does not need her to be alive to defend it, it does not need our permission to be read,
              and it cannot be bought out from under the people it was built for. Whoever is holding it in a century — or in
              a thousand years, if there are still people here to hold it — will be able to check it the same way you can
              check it tonight.
            </p>
            <p className="text-[11px] font-mono text-[#6b6258] mt-4 leading-relaxed">
              Built in honour of Janine M. H. Selendy and Horizon International. Released to the world, the planet, all of
              us. The live record is at{' '}
              <Link to="/TogetherChangeClimate" className="font-bold text-[#1a1612] underline decoration-[#b3261e] decoration-2 underline-offset-2">
                /TogetherChangeClimate
              </Link>
              . We will add nothing we cannot stand behind.
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="no-print flex flex-wrap gap-2 pt-4 border-t border-[#1a1612]/15">
          <Link to={createPageUrl('TogetherChangeClimate')} className="flex items-center gap-2 px-4 py-3 bg-[#241d16] text-[#efe7d6] text-[11px] font-black font-mono uppercase active:bg-[#e2602a] active:text-[#1a1612]">
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