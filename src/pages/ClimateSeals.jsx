import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import { sealOf, hashingAvailable } from '@/components/climate/sealHash';

// ── THE SEAL ──────────────────────────────────────────────────────────────────
// The one page a sceptic can open instead of taking our word for anything.
//
// Every published entry has a fingerprint of its words. That fingerprint is taken by
// the record's server, stored in a public table, and recomputed here in the reader's
// own browser from the entry as it stands right now. If the two disagree, the words
// moved after they were sealed, and this page says so out loud about our own record.
//
// It does not make anything true. Only the source does that. It only makes quiet
// editing impossible to hide, which is a smaller promise and a much stronger one.

const SOURCES = [
  { type: 'solution', label: 'Solution', load: () => base44.entities.ClimateSolution.filter({ status: 'published' }, { limit: 300 }), titleOf: (r) => r.title },
  { type: 'action', label: 'Action', load: () => base44.entities.ClimateAction.filter({ status: 'published' }, { limit: 300 }), titleOf: (r) => r.title },
  { type: 'news', label: 'Wire', load: () => base44.entities.ClimateNews.filter({ status: 'published' }, { limit: 300 }), titleOf: (r) => r.headline },
  { type: 'track', label: 'Music', load: () => base44.entities.ClimateTrack.filter({ status: 'published' }, { limit: 300 }), titleOf: (r) => r.title },
  { type: 'group', label: 'Groups', load: () => base44.entities.ClimateGroup.filter({ status: 'published' }, { limit: 300 }), titleOf: (r) => r.name },
];

const asList = (res) => (Array.isArray(res) ? res : res.items || []);

const STATE_COPY = {
  holds: { word: 'Holds', tone: 'text-[#1e3a2b]', rule: 'border-[#1e3a2b]' },
  moved: { word: 'Moved', tone: 'text-[#b3261e]', rule: 'border-[#b3261e]' },
  unsealed: { word: 'Not sealed', tone: 'text-[#8a8375]', rule: 'border-[#141210]/25' },
  unknown: { word: 'Unchecked', tone: 'text-[#8a8375]', rule: 'border-[#141210]/25' },
};

// ── WHAT AN ENTRY IS, AND WHERE IT OPENS ────────────────────────────────────────
// Brian, 25 November: "the solutions / seal wire gathering on seals they should have own
// colours right bro so separates them… shouldn't they be all clickable too."
//
// Five kinds stand in one list, and a list where every row looks the same makes a reader
// read every line to find the one they came for. So the kind carries its own colour, and
// it is not a new palette: these are the record's own pigments for the same five things,
// the ones the map and the entries already use — a solution is green, an action ochre, the
// wire blue, a track clay, a gathering the quiet brown. One record, one language of colour.
//
// The colour says WHAT a row is. The word on the right still says WHETHER it holds. They
// never argue, because they are answering different questions.
//
// And every row opens the thing it names. A fingerprint is only worth something if the
// reader can walk to the words and check them without asking us for permission.
const KIND_TONE = {
  solution: 'text-record-botanical',
  action: 'text-record-ochre',
  news: 'text-record-ocean',
  track: 'text-record-clay',
  group: 'text-record-muted',
};

// Each one lands where the thing actually is, not at the top of the room it lives in: a wire
// entry opens its own page, a track opens the deck it plays from, and a group opens the
// groups themselves rather than the record's front page. A row that says it opens something
// and then drops the reader at the top of a page has broken a small promise, and small
// promises are the whole of what this page is about.
//
// And it is "Groups", not "Gatherings". Brian, 25 November: "I was getting confused with
// groups and gatherings myself." The record already says Groups on the door, on the section
// and in the count; the seal was the only place that used the other word, so it was the one
// that changed. One thing, one name.
const entryHref = (type, rec) => {
  if (type === 'news') return `/ClimateWireEntry/${rec.id}`;
  if (type === 'track') return `/ClimateMusic?track=${rec.id}#music-deck`;
  if (type === 'group') return '/TogetherChangeClimate#record-room-groups';
  return `/ClimateDetail/${rec.entry_type || 'solution'}/${rec.id}`;
};

function Counter({ n, label, tone }) {
  return (
    <div className="px-3 py-3">
      <p className={`font-black leading-none ${tone}`} style={{ fontFamily: 'var(--font-display)', fontSize: '30px' }}>
        {n}
      </p>
      <p className="text-[9.5px] font-black font-mono uppercase tracking-wide text-[#141210] mt-1.5 leading-snug">{label}</p>
    </div>
  );
}

export default function ClimateSeals() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  const [isKeeper, setIsKeeper] = useState(false);
  const [sealing, setSealing] = useState(false);
  const [sealNote, setSealNote] = useState('');

  useEffect(() => {
    let alive = true;

    const run = async () => {
      base44.auth
        .me()
        .then((u) => { if (alive) setIsKeeper(u?.role === 'admin'); })
        .catch(() => { if (alive) setIsKeeper(false); });

      try {
        // These six reads are independent. Waiting for each section in turn made
        // a cold check pay six network round trips before any result could appear.
        const [sealRes, ...sections] = await Promise.all([
          base44.entities.ClimateSeal.list('-version', 2000),
          ...SOURCES.map((src) => src.load()),
        ]);
        const seals = asList(sealRes);
        const latest = new Map();
        for (const s of seals) {
          const current = latest.get(s.entry_id);
          if (!current || (s.version || 0) > (current.version || 0)) latest.set(s.entry_id, s);
        }

        const collected = sections.flatMap((section, index) =>
          asList(section).map((rec) => ({ src: SOURCES[index], rec, seal: latest.get(rec.id) }))
        );

        const checked = await Promise.all(
          collected.map(async (row) => {
            if (!hashingAvailable) return { ...row, state: 'unknown', title: row.src.titleOf(row.rec) };
            const hash = await sealOf(row.rec.id, row.src.type, row.rec);
            const state = !row.seal ? 'unsealed' : row.seal.hash === hash ? 'holds' : 'moved';
            return { ...row, state, hash, title: row.src.titleOf(row.rec) };
          })
        );

        const order = { moved: 0, unsealed: 1, unknown: 2, holds: 3 };
        checked.sort((a, b) => order[a.state] - order[b.state]);
        if (alive) setRows(checked);
      } catch (e) {
        if (alive) setError(e.message);
      }
    };

    run();
    return () => { alive = false; };
  }, []);

  const takeSeal = async () => {
    setSealing(true);
    setSealNote('');
    try {
      const res = await base44.functions.invoke('climateSealRecord', {});
      const d = res?.data || {};
      setSealNote(
        d.ok
          ? `Sealed ${d.sealed} · ${d.unchanged} already matched. Reload to see the chain.`
          : d.error || 'That did not work.'
      );
    } catch (e) {
      setSealNote(e.message);
    } finally {
      setSealing(false);
    }
  };

  const counts = (rows || []).reduce(
    (acc, r) => ({ ...acc, [r.state]: (acc[r.state] || 0) + 1 }),
    { holds: 0, moved: 0, unsealed: 0, unknown: 0 }
  );
  const allHold = rows && rows.length > 0 && counts.moved === 0 && counts.unsealed === 0;

  return (
    <ClimateRecordShell
      className="record-room-veiled"
      eyebrow="The seal"
      marker="Checked in your browser, not on our server"
      title="A fingerprint on every entry"
      statement="Every published entry has a fingerprint of its words. This page recomputes each one in your own browser and compares it with the seal the record kept. If they disagree, this page says so about our own record, in public."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International."
    >
      {!hashingAvailable && (
        <p className="text-[11px] font-mono leading-relaxed border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 mb-5">
          This browser will not let a page take a fingerprint, so nothing below could be checked here. The seals
          themselves are unaffected: open this page on an ordinary phone or laptop and the check runs.
        </p>
      )}

      {error && (
        <p className="text-[11px] font-mono leading-relaxed border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 mb-5">
          The check could not finish: {error}
        </p>
      )}

      {rows === null && !error && (
        <p className="text-[11px] font-mono text-[#5a5246] mb-6">Reading every entry and recomputing each fingerprint…</p>
      )}

      {rows && (
        <>
          <div className="grid grid-cols-3 border-2 border-[#141210] mb-2">
            <Counter n={counts.holds} label="hold as sealed" tone="text-[#1e3a2b]" />
            <Counter n={counts.moved} label="moved after sealing" tone="text-[#b3261e]" />
            <Counter n={counts.unsealed} label="not yet sealed" tone="text-[#8a8375]" />
          </div>

          <p className={`text-[11px] lg:text-[12px] font-mono leading-relaxed mb-6 ${allHold ? 'text-[#1e3a2b]' : 'text-[#5a5246]'}`}>
            {allHold
              ? `Every one of the ${rows.length} published entries still matches the fingerprint the record took of it. Nothing has moved since.`
              : `${rows.length} published entries checked just now, by this browser, against the fingerprint the record kept. Anything marked moved or not sealed is named below.`}
          </p>

          {isKeeper && (
            <div className="border-2 border-[#141210] bg-[#f7f1e5] px-3 py-3 mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10.5px] lg:text-[11.5px] font-mono leading-relaxed text-[#141210] max-w-md">
                A custodian may take the seal. Every unpublished entry gets its first fingerprint, and any entry changed
                since its last seal gets a new link pointing at the one it replaced.
              </p>
              <button
                onClick={takeSeal}
                disabled={sealing}
                className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors disabled:opacity-40"
              >
                {sealing ? 'Sealing…' : 'Take the seal'}
              </button>
              {sealNote && <p className="text-[10px] font-mono text-[#5a5246] w-full">{sealNote}</p>}
            </div>
          )}

          <div className="border-2 border-[#141210] divide-y divide-[#141210]/15">
            {rows.map((row) => {
              const state = STATE_COPY[row.state];
              return (
                <Link
                  key={`${row.src.type}-${row.rec.id}`}
                  to={entryHref(row.src.type, row.rec)}
                  className={`group block px-3 py-2.5 border-l-4 ${state.rule} hover:bg-[#141210]/[0.045] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b3261e]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[9px] font-black font-mono uppercase tracking-[0.16em]">
                        <span className={KIND_TONE[row.src.type] || 'text-[#8a8375]'}>{row.src.label}</span>
                        <span className="text-[#8a8375]">{row.seal ? ` · seal ${row.seal.version}` : ''}</span>
                      </p>
                      <p className="text-[11.5px] lg:text-[12.5px] font-mono font-bold text-[#141210] leading-snug mt-0.5 group-hover:text-[#b3261e]">
                        {row.title}
                      </p>
                    </div>
                    <span className={`text-[9px] font-black font-mono uppercase tracking-wide flex-shrink-0 ${state.tone}`}>
                      {state.word}
                    </span>
                  </div>
                  {row.seal?.hash && (
                    <p className="text-[8.5px] font-mono text-[#8a8375] break-all mt-1 leading-tight">
                      {row.seal.hash.slice(0, 32)}…
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-7 space-y-3 text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
        <p><strong>What a seal proves.</strong> That these were the words, on that day. A fingerprint covers the claim, the source it came from, how well it is known, any correction, and the name of whoever signed it. Move any of them after sealing and the fingerprint stops matching, whether the change was made by a person, a program, or something cleverer than both.</p>
        <p><strong>What a seal does not prove.</strong> That anything on the record is true. Only a source can do that, and only a person can be held to it. The seal is not a badge and not a score: it is a lock on a page, not an argument for what the page says.</p>
        <p><strong>Why it can be checked by anyone.</strong> The seals are public, the entries are public, and the fingerprint is taken in your browser from what you can see. You never have to trust this page, this platform, or us to know whether the words moved.</p>
        <p><strong>Where it starts.</strong> Sealing begins from the day this page first ran. Entries published before it are sealed exactly as they stand, and the record does not claim to know what they said before that. Later changes are a chain: every new seal names the one it replaced, so a correction is visible as a new link rather than an overwrite, and taking a link out leaves a hole where anyone can see it.</p>
        <p><strong>Who does the checking.</strong> A seal shows the words have not moved. It does not show that a person read them. The <Link to="/ClimateRoll" className="font-bold text-[#b3261e] underline decoration-2 underline-offset-2">roll</Link> names the people who did, and what they signed.</p>
      </div>

      <div className="flex flex-wrap gap-2 pt-5">
        <Link
          to={createPageUrl('ClimateMethod')}
          className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
        >
          How it is made
        </Link>
        <Link
          to={createPageUrl('ClimateCorrections')}
          className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
        >
          Corrections in the open
        </Link>
      </div>
    </ClimateRecordShell>
  );
}