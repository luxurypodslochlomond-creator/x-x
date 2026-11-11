import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

/* ── THE WAY IN, WORKED OUT ─────────────────────────────────────────────────────
   A traveller says where they are coming from and when, and this works out how they
   should arrive. It is not a timetable: it looks today's up, and where it cannot be
   sure it names the operator to check instead of inventing a departure.

   What it is told about the place is the part a general journey planner gets wrong —
   that Balloch is the end of the line, that the last mile and a half climbs a narrow
   road with no pavement, that the walking route comes in over open muir. Those are
   facts about this hill, so they are given, not guessed at.

   The public page calls this with no account, so the input is capped hard and the
   answer is a fixed shape. */

const PLACE = `Stoneymollan: two hillside cabins on the hill above Balloch, at the south end of Loch Lomond in Scotland.

Facts about the place, to be treated as true:
- Balloch sits at the south end of Loch Lomond, on the A82, and is the terminus of the North Clyde railway line from Glasgow.
- The cabins are up a single road that climbs from Balloch village, roughly a mile and a half. The last stretch is narrow, unlit in places, with no pavement.
- The John Muir Way (Section 1, Helensburgh to Balloch) and the Three Lochs Way cross the muir above the cabins, arriving by the old coffin road. Helensburgh to Balloch on that path is about nine miles, roughly four hours on foot, over open hill.
- Glasgow airport is about 25 minutes away by car; Edinburgh airport about an hour and a quarter.
- The village is small. Late arrivals should not plan to walk the hill road in the dark, and a taxi is worth booking ahead.`;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const from = typeof body?.from === 'string' ? body.from.trim().slice(0, 160) : '';
    const when = typeof body?.when === 'string' ? body.when.trim().slice(0, 80) : '';

    if (!from) {
      return Response.json({ error: 'Say where you are coming from.' }, { status: 400 });
    }

    const prompt = `You are working out how a traveller should reach ${PLACE}

They said they are coming from: "${from}"
They said about timing: "${when || 'not given'}"

Work out two to four genuinely different ways to arrive — public transport, driving, walking, or a combination — using what you can find about current services. For each one give the honest door-to-door time, the steps in order, a rough cost, whether it is the scenic way, and anything they must check themselves.

Rules:
- Never invent a departure time, platform number, fare or timetable you are not sure of. If you do not know today's timetable, say plainly which operator or site to check.
- If they are arriving late, coming with luggage, or walking, say what that means for the last mile up the hill.
- If a plane or train lands at a specific time they gave, allow real time for baggage, transfers and the drive.
- Name the scenic option honestly, including the walking route over the muir, but do not romanticise it: it is nine miles of open hill.
- British English, plain sentences, no hype, no exclamation marks.
- If what they gave is too vague to work with, say so in the headline and give the general shape anyway.`;

    const answer = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      model: 'gemini_3_8_flash',
      add_context_from_internet: true,
      response_json_schema: {
        type: 'object',
        properties: {
          headline: {
            type: 'string',
            description: 'One or two sentences: the honest short answer for this traveller.',
          },
          options: {
            type: 'array',
            description: 'Two to four different ways to arrive, best first.',
            items: {
              type: 'object',
              properties: {
                mode: { type: 'string', description: 'e.g. "Train, then taxi"' },
                total_time: { type: 'string', description: 'Door to door, e.g. "2 h 10"' },
                summary: { type: 'string', description: 'One or two sentences on how it goes.' },
                steps: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'The journey in order, one instruction per step.',
                },
                cost_note: { type: 'string', description: 'Rough cost, or empty if unknown.' },
                scenic: { type: 'string', description: 'What you see, honestly.' },
                check: { type: 'string', description: 'What the traveller must verify themselves.' },
              },
              required: ['mode', 'summary', 'steps'],
            },
          },
          cautions: {
            type: 'string',
            description: 'One short warning that matters for this place or this arrival.',
          },
          sources: {
            type: 'array',
            items: { type: 'string' },
            description: 'Names of the operators or sites the answer leaned on.',
          },
        },
        required: ['headline', 'options'],
      },
    });

    return Response.json(answer);
  } catch (error) {
    console.error('stoneymollanWayIn failed:', error?.message || error);
    return Response.json(
      { error: 'Could not work the journey out just now. Try again in a moment.' },
      { status: 500 }
    );
  }
}