import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── ASK THE RECORD ────────────────────────────────────────────────────────────
// Brian, 15 November: "why never do nothing or have to send email to ask question on how
// best to use when you can deliver best experience… only truth… and avoiding the noise."
//
// The honest answer is that a question about *how this record works* never needed a person.
// It needs the manual, read back in one sentence, with the door you actually walk through.
//
// So this is deliberately narrow, and the narrowness is the feature:
//   · it answers from the record's own manual — the text below — and from nothing else.
//   · it may not invent a button, a page, a number or a promise. Every link it offers is
//     checked here against a fixed list, so it cannot send anybody to an address that is not
//     on the record, and no model can talk its way past that.
//   · it never names a person. A record that names its editors on entries does so with their
//     consent, on the entry; it does not gossip about people to a stranger typing in a box.
//   · when the question is not about this record, it says so plainly instead of improvising
//     an answer about the outside world. That refusal is what makes the rest worth reading.
//
// It runs on the default model on purpose: this is a lookup, not a research panel, and a
// keeper waiting at a door should not wait for the largest model on earth to clear its throat.

const MANUAL = `
WHAT THE RECORD IS
A public record of climate solutions, climate crises, actions, dated wire entries, gatherings,
music given to it, and drawings given to it. Anyone may read every page without an account.
Nothing is ranked, nothing is liked, nobody is followed, nothing is advertised, and nothing is
sold on the record itself.

HOW AN ENTRY CARRIES ITS PROOF
Every entry names the body, journal, document or person it came from, with a link. Every entry
says out loud how well it is known: one source, corroborated by a second independent origin, or
the body's own official record. A person reads every entry before it stands, and that person's
name is written on the entry as its editor. When an entry is corrected, the correction stays in
the open with the date it was made. Sealed entries carry a fingerprint any reader can recompute
in their own browser, so a reader never has to trust the record's word for it.

WHO MAY DO WHAT
A reader: no account, no email, every published page.
A sender: anyone may send an entry in. It is read by a person before it stands. The sender's
email is used only to reach them about that entry and is never shown to anybody.
A checker: invited by a keeper. A pair of eyes. They open the sources behind an entry and write
a note in their own name — it holds up, it does not, or they could not tell. They cannot publish,
change or delete anything, and their address is never shown.
A keeper: the person the record answers to. They decide, one entry at a time: on the record, or
not yet with a reason. "Not yet" is never counted as a rejection. They put people on the list and
take them off. Adding or removing a keeper needs two keepers: one proposes, a second agrees.

WHERE THE DOORS ARE
The Record: the front page and the entries. The Wire: dated, sourced entries. The Map and Reach:
where entries and readers are. Search: look up a country or subject. Why this record, and How we
check entries: the method, in the record's own words. Corrections: every correction, in the open.
The guide: every control on the record, in order. The fellows page: what checking is and how to
volunteer. The roll: the people who check, in their own words. The checking room: where a checker
works. The keeper's room: decide, check, people, counts. The seals: fingerprints a reader can
verify. Music and the room of cartoons: what was given to the record.

WHAT THE RECORD WILL NOT CLAIM
It does not hold everything: at global scale it holds a signed, verifiable fraction and says so
on its face. A machine drafts and fetches; a machine never publishes. A held entry is private
until a person decides. Nobody is asked to be on the roll; a person writes their own line or is
not shown at all.
`.trim();

// The only addresses this can ever offer. Anything a model writes that is not here is dropped.
const DOORS = [
  ['/TogetherChangeClimate', 'The record'],
  ['/ClimateWire', 'The Wire'],
  ['/ClimateMap', 'The map'],
  ['/ClimateImpact', 'Reach'],
  ['/ClimateSearch', 'Search'],
  ['/ClimateMethod', 'How we check entries'],
  ['/ClimateCorrections', 'Corrections'],
  ['/ClimateGuide', 'The guide'],
  ['/ClimateFellows', 'What checking is'],
  ['/ClimateRoll', 'The roll'],
  ['/ClimateChecking', 'The checking room'],
  ['/ClimateKeeperRoom', 'The keeper’s room'],
  ['/ClimateSeals', 'The seals'],
  ['/ClimateMusic', 'The music room'],
  ['/ClimateCartoons', 'The room of cartoons'],
  ['/ClimateSupport', 'Support'],
  ['/ClimatePrivacy', 'Privacy'],
  ['/ClimateTerms', 'Terms'],
  ['/ExtractionProofCovenant', 'The covenant'],
];

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const question = String(body?.question || '').trim().slice(0, 400);
    // The tongue the record is already set to, or "auto". It is only a hint for the reply —
    // the real ear is the model's: a question written in Sumerian, Latin or Lakota is read as
    // it stands, because a dictionary of ours would run out long before the tongues do.
    const lang = String(body?.lang || 'auto').slice(0, 16);

    if (question.length < 3) {
      return Response.json({ error: 'Ask a question first.' }, { status: 400 });
    }

    const prompt = `You answer questions about one thing only: how to use a public climate record called "Together We Change Climate".

THE RECORD'S OWN MANUAL
${MANUAL}

THE QUESTION
"${question}"

HOW TO ANSWER — these are rules, not preferences:
- Answer only from the manual above. It is the whole of what you know.
- At most 70 words. Plain words a busy person reads once. No lists, no headings, no emoji, no marketing, no exclamation marks.
- Never name a person. Speak of roles: a keeper, a checker, a sender, a reader.
- Never invent a button, page, feature, number, promise or timeline. If the manual does not say it, it does not exist.
- If the question is not about this record, say plainly that the record answers for itself only, and offer the nearest useful door.
- If the manual does not cover it, say so in one short sentence rather than guessing.
- Then choose the 1 to 3 doors below where this person would actually go next. Use the exact path.
- TONGUE: the reader's record is set to the tongue code "${lang}". If that is "auto" or "en", answer in the tongue the question itself is written in — read it from their own words, including a historical, indigenous or endangered tongue (Latin, Ancient Greek, Sumerian, Akkadian, Lakota, Cherokee, Rongorongo). Otherwise answer in that tongue, and if it genuinely has no word for something, keep that word as the manual has it rather than describing it at length. Door labels stay as given below; they are the record's own names for its rooms.

THE DOORS (path — label)
${DOORS.map(([path, label]) => `${path} — ${label}`).join('\n')}

Return the answer, the doors, and one short line naming what you could not answer, or an empty string if you answered fully.`;

    const reply = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          answer: { type: 'string' },
          doors: {
            type: 'array',
            items: {
              type: 'object',
              properties: { path: { type: 'string' }, label: { type: 'string' } },
              required: ['path', 'label'],
            },
          },
          not_covered: { type: 'string' },
        },
        required: ['answer', 'doors'],
      },
    });

    const answer = String(reply?.answer || '').trim();
    if (!answer) {
      return Response.json({ error: 'That did not come back. Ask again.' }, { status: 502 });
    }

    // Every path is looked up, never trusted: a model may only ever offer a door that is
    // really on the record, and the label shown is the record's own, not the model's.
    const allowed = new Map(DOORS);
    const doors = [];
    for (const door of Array.isArray(reply?.doors) ? reply.doors : []) {
      const path = String(door?.path || '').trim();
      if (allowed.has(path) && !doors.some((d) => d.path === path)) {
        doors.push({ path, label: allowed.get(path) });
      }
      if (doors.length === 3) break;
    }

    if (!doors.length) doors.push({ path: '/ClimateGuide', label: 'The guide' });

    return Response.json({
      answer,
      doors,
      not_covered: String(reply?.not_covered || '').trim(),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}