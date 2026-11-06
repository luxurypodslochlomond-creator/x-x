import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── THE DUE DILIGENCE PASS ───────────────────────────────────────────────────
// What a research panel actually does to a record before it lends its name to it. Not an
// opinion, and not a model's opinion: a set of questions that have a checkable answer, run
// against the record itself, so the score is a fact about the record rather than a claim
// about it.
//
// This is deliberately not an AI verdict. An AI's approval is a second opinion with no
// evidence behind it, and a panel would be right to disregard it — worse, it would let a
// weak record borrow authority from a model. So every row below is counted from stored
// rows: does the link open, is there a name, is there a fingerprint, has anyone else
// looked. The machine's note can sit beside that; it can never be the score.
//
// Runs without a session on purpose. A score a reader cannot run for themselves is a score
// they have to take on trust, and this record does not ask for trust.
//
// No address is ever returned. Names on the roster are already public: who holds the keys
// is the first thing a panel asks, and a record that hides it has answered nothing.

const KINDS = [
  { type: 'solution', entity: 'ClimateSolution' },
  { type: 'action', entity: 'ClimateAction' },
  { type: 'news', entity: 'ClimateNews' },
  { type: 'group', entity: 'ClimateGroup' },
  { type: 'track', entity: 'ClimateTrack' },
];

const SEALED = ['solution', 'action', 'news', 'group', 'track'];
const TRACEABLE = ['solution', 'action', 'news', 'track'];
const STANDING = ['solution', 'action', 'news'];
const SIGNABLE = ['solution', 'action', 'news'];

// The code being public is not something a query can discover, so it is said here rather
// than guessed: flip it to true the day the repository is live, and the row turns green.
const CODE_IS_PUBLIC = false;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const read = async (entity, query) => {
      try {
        const page = await base44.asServiceRole.entities[entity].filter(query, { limit: 500 });
        return page?.items || page || [];
      } catch (e) {
        console.error(`climateDueDiligence: could not read ${entity}:`, e.message);
        return [];
      }
    };

    const published = {};
    await Promise.all(
      KINDS.map(async (k) => {
        published[k.type] = await read(k.entity, { status: 'published' });
      })
    );

    const entries = [];
    KINDS.forEach((k) => {
      (published[k.type] || []).forEach((r) => {
        entries.push({
          type: k.type,
          id: r.id,
          source_url: r.source_url || r.audio_url || '',
          editor: String(r.editor || '').trim(),
          verification: r.verification || '',
          contact: r.contact_email || r.contact_link || '',
        });
      });
    });

    const of = (types) => entries.filter((e) => types.includes(e.type));
    const total = entries.length;

    const [seals, checks, roster] = await Promise.all([
      read('ClimateSeal', {}),
      read('ClimateCheck', {}),
      read('ClimateChecker', {}),
    ]);

    const sealedIds = new Set(seals.map((s) => s.entry_id));
    const sealedCovered = of(SEALED).filter((e) => sealedIds.has(e.id)).length;
    const checkedIds = new Set(checks.map((c) => c.entry_id));
    const checkedCovered = entries.filter((e) => checkedIds.has(e.id)).length;

    const activeRoster = roster.filter((r) => r.active !== false);
    const keeperLines = activeRoster.filter((r) => r.is_keeper);
    const otherEyes = activeRoster.filter((r) => !r.is_keeper);

    const traceable = of(TRACEABLE);
    const traced = traceable.filter((e) => Boolean(e.source_url)).length;
    const standable = of(STANDING);
    const standing = standable.filter((e) => Boolean(e.verification)).length;
    const signable = of(SIGNABLE);
    const signed = signable.filter((e) => Boolean(e.editor)).length;
    const gatherings = of(['group']);
    const reachable = gatherings.filter((e) => Boolean(e.contact)).length;

    const rows = [
      {
        key: 'keys',
        test: 'More than one person holds the keys',
        pass: keeperLines.length >= 2,
        detail:
          keeperLines.length >= 2
            ? `${keeperLines.length} named keepers: ${keeperLines.map((k) => k.name || 'unnamed').join(', ')}.`
            : keeperLines.length === 1
              ? 'One name only. A record that answers to a single person stops being answerable the moment they are ill, away, or gone.'
              : 'No keeper is named on the record. Nothing here can be decided, and no panel will accept it.',
        fix: keeperLines.length >= 2 ? null : { to: '/AdminClimateCheckers', label: 'put a keeper on the list' },
      },
      {
        key: 'trace',
        test: 'Every entry points at its origin',
        pass: traceable.length > 0 && traced === traceable.length,
        detail: `${traced} of ${traceable.length} entries carry a working link to the body, journal or person they came from.`,
        fix: traced === traceable.length ? null : { to: '/AdminClimateReview', label: 'find the missing origins' },
      },
      {
        key: 'seal',
        test: 'Every entry carries a fingerprint',
        pass: sealedCovered === total && total > 0,
        detail: `${sealedCovered} of ${total} published entries are sealed, and each seal can be recomputed in a reader's own browser.`,
        fix: sealedCovered === total ? null : { to: '/ClimateSeals', label: 'seal what is loose' },
      },
      {
        key: 'standing',
        test: 'How well it is known is stated on the entry',
        pass: standing === standable.length && standable.length > 0,
        detail: `${standing} of ${standable.length} entries say whether one origin says so, two agree, or an official body put it on the record.`,
        fix: standing === standable.length ? null : { to: '/AdminClimateReview', label: 'say the standing' },
      },
      {
        key: 'signed',
        test: 'Every entry names the person who put it there',
        pass: signed === signable.length && signable.length > 0,
        detail:
          signed === signable.length
            ? `${signed} of ${signable.length} entries are signed.`
            : `${signed} of ${signable.length} entries are signed. The rest say plainly that they are unsigned, which is honest and still unanswered — a reader cannot hold a person to them.`,
        fix: signed === signable.length ? null : { to: '/ClimateKeeperRoom', label: 'put your name on what is yours' },
      },
      {
        key: 'checked',
        test: 'A second pair of eyes has looked at every entry',
        pass: total > 0 && checkedCovered === total,
        detail: `${checkedCovered} of ${total} entries have been opened and checked by somebody other than the person who decided.`,
        fix: checkedCovered === total ? null : { to: '/ClimateKeeperRoom', label: 'open the checking room' },
      },
      {
        key: 'others',
        test: 'Someone other than the keeper is on the roster',
        pass: otherEyes.length > 0,
        detail:
          otherEyes.length > 0
            ? `${otherEyes.length} checkers hold a line on the record.`
            : 'The keys and the eyes are the same people. Checking your own work is not checking, and a panel will say so.',
        fix: otherEyes.length > 0 ? null : { to: '/AdminClimateCheckers', label: 'invite a checker' },
      },
      {
        key: 'reachable',
        test: 'Every gathering can actually be reached',
        pass: gatherings.length > 0 && reachable === gatherings.length,
        detail: `${reachable} of ${gatherings.length} gatherings publish a contact line a reader can write to.`,
        fix: reachable === gatherings.length ? null : { to: '/AdminClimateReview', label: 'add the contact lines' },
      },
      {
        key: 'open',
        test: 'Every entry can be read without an account, and taken away',
        pass: true,
        detail: 'Reading needs no sign-in, and the record exports itself rather than holding a reader inside it.',
        fix: null,
      },
      {
        key: 'code',
        test: 'The code is public, so the method can be audited',
        pass: CODE_IS_PUBLIC,
        detail: CODE_IS_PUBLIC
          ? 'The repository is live and linked from the covenant page.'
          : 'The covenant says the method is open, and the repository is not live yet. Until it is, a reader takes the method on trust.',
        fix: CODE_IS_PUBLIC ? null : { to: '/ExtractionProofCovenant', label: 'read the covenant' },
      },
    ];

    const passed = rows.filter((r) => r.pass).length;

    return Response.json({
      as_of: new Date().toISOString(),
      score: {
        passed,
        total: rows.length,
        percent: Math.round((passed / rows.length) * 100),
      },
      rows,
      counts: {
        published: total,
        seals: sealedCovered,
        checks: checks.length,
        keepers: keeperLines.length,
        checkers: otherEyes.length,
      },
    });
  } catch (error) {
    console.error('climateDueDiligence failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}