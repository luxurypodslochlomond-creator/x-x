import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { secrets } from 'base44:runtime';
import { keeperInbox } from '../../shared/keeperInbox.ts';

// ── A LISTENER LEAVES A LINE ────────────────────────────────────────────────────
// Why a piece lands cannot be read out of a file, and this record does not ask a
// machine to guess at it. So the only thing written here is what a person actually
// said, as they said it — and it goes up at once, so they are not left waiting on a
// person either.
//
// The screener is deliberately narrow, and narrower than the one for the wire. A
// listener's line makes no claim about the world, so it needs no source and no
// evidence; and disagreement is not abuse. It reads for three things only: spam,
// something unlawful or abusive, and private details about somebody who did not put
// them here. Everything else goes up exactly as written.
//
// Nothing is asked of the listener in return: no email, no account, and no name unless
// they want one. Nothing here is counted, scored, ranked or replied to — and the artist
// is never graded by it. A line is kept as a person wrote it, and only a keeper can take
// one down, and only for something unlawful.

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { data } = body;

    if (!data) {
      return Response.json({ error: 'Missing data' }, { status: 400 });
    }

    // Honeypot — a bot that fills the hidden field is told it worked, and nothing is created.
    if (data.website) {
      return Response.json({ success: true, id: 'rejected', status: 'published', flagged: false });
    }

    const trackId = String(data.track_id || '').trim();
    const word = String(data.word || '').trim();
    const listenerName = String(data.listener_name || '').trim();

    if (!trackId) {
      return Response.json({ error: 'That line has no track to sit under.' }, { status: 400 });
    }
    if (word.length < 2) {
      return Response.json({ error: 'Write your line first, even a short one.' }, { status: 400 });
    }
    if (word.length > 600) {
      return Response.json({ error: 'One line, please — six hundred characters at most.' }, { status: 400 });
    }

    // The track has to be standing on the record: a line is left under a work, never in mid-air.
    let track = null;
    try {
      track = await base44.asServiceRole.entities.ClimateTrack.get(trackId);
    } catch {
      track = null;
    }
    if (!track || track.status !== 'published') {
      return Response.json({ error: 'That track is not standing on the record.' }, { status: 404 });
    }

    // 1. The advisory note. It reads the line given — nothing else, and nobody behind it.
    let aiAssessment = 'Screener unavailable — a keeper will read this line.';
    let flagged = true;

    try {
      const aiResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are the advisory note for "Together We Can Change Climate" — a public record after Janine Selendy / Horizon International. A listener has left ONE LINE about a track on the record. The line is their own response to the work, and it is kept exactly as they wrote it.

WHAT YOU MUST NEVER DO:
- Never judge, score, grade, rank or rewrite the line. It makes no claim about the world, so it needs no source, no evidence and no citation.
- Never mind whether the line praises or criticises the track, the artist or the record. Disagreement, dislike and blunt criticism of the work are NOT abuse, and must never be flagged.
- Never flag on spelling, grammar, punctuation, dialect, accent, slang, brevity, sadness, anger or swearing used as feeling.
- Never ask who the listener is, and never mind whether they gave a name.

Assess ONLY these three things, from the line below:
1. IS IT SPAM OR ADVERTISING? (a link, a promotion, a pitch, words with no response to the work behind them)
2. ARE THE WORDS UNLAWFUL OR ABUSIVE? (incitement to real harm, sexual content involving minors, an explicit threat to a person, hate against a group of people)
3. DOES IT CARRY PRIVATE DETAILS ABOUT SOMEBODY WHO DID NOT PUT THEM HERE? (a home address, a phone number, or the full name and contact of a third party)

If you are unsure, answer "clean" in your reasons and choose "clean". Holding a listener's line wrongly silences a person; a line a keeper takes down later costs nothing.

The track: ${String(track.title || '')} by ${String(track.artist_name || '')}
The listener's line: ${word.slice(0, 600)}`,
        response_json_schema: {
          type: 'object',
          properties: {
            verdict: { type: 'string', enum: ['clean', 'suspicious', 'reject'] },
            confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
            reasons: { type: 'string' },
          },
        },
      });

      flagged = aiResult.verdict !== 'clean';
      aiAssessment = `[${String(aiResult.verdict).toUpperCase()}] Confidence: ${aiResult.confidence || 'unknown'} — ${aiResult.reasons}`;
    } catch (aiError) {
      // The screener failing never loses a line — it holds it, in the open, and tells a keeper.
      console.error('climateWordSubmit: screener failed:', aiError.message);
    }

    // 2. The line. Only the fields a line has are ever written — nothing a form posted
    //    beside them (a honeypot, a stray field) can reach the record.
    const status = flagged ? 'draft' : 'published';
    const record = await base44.asServiceRole.entities.ClimateWord.create({
      track_id: track.id,
      word: word.slice(0, 600),
      listener_name: listenerName.slice(0, 80),
      status,
      flagged,
      ai_assessment: aiAssessment,
    });

    // 3. A keeper is told only when a person is actually needed, so "held" never means "forgotten".
    const appUrl = (req.headers.get('x-base44-app-url') || 'https://uf51.love').replace(/\/$/, '');
    const keepers = flagged ? keeperInbox(secrets) : [];
    for (const keeper of keepers) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: keeper,
          from_name: 'Together We Can Change Climate',
          subject: `A listener's line held for a look: ${String(track.title || 'a track')}`,
          html: `<div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 20px; background: #f4efe4;">
            <div style="background: #b3261e; color: #fff; padding: 12px 20px; margin: -20px -20px 20px -20px;">
              <h2 style="margin: 0; font-size: 16px; letter-spacing: 0.1em;">TOGETHER WE CAN CHANGE CLIMATE</h2>
            </div>
            <p style="color: #6b6258;">A line left by a listener was held by the screener.</p>
            <div style="background: #efe7d6; border: 2px solid #1a1612; padding: 16px; margin: 16px 0;">
              <p style="margin: 4px 0; color: #1a1612;"><strong>Track:</strong> ${String(track.title || '')} — ${String(track.artist_name || '')}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Left by:</strong> ${listenerName || 'a listener, unnamed'}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>The line:</strong> ${word.slice(0, 600)}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Advisory note:</strong> ${aiAssessment}</p>
              <p style="margin: 4px 0; color: #6b6258; font-size: 11px;">Clean lines go up at once. This one waits until a person has read it. Disagreement with the work is not a reason to hold a line.</p>
            </div>
            <a href="${appUrl}/ClimateMusic" style="background: #b3261e; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block; font-weight: bold; font-family: monospace;">Read it and decide</a>
          </div>`,
        });
      } catch (emailError) {
        console.error(`climateWordSubmit: held-line email to ${keeper} failed:`, emailError.message);
      }
    }

    return Response.json({ success: true, id: record.id, status, flagged });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}