import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { secrets } from 'base44:runtime';

// ── A TRACK ARRIVES ─────────────────────────────────────────────────────────────
// Music is given to this record by the artist who made it, and it is read at once —
// not queued. A track the screener clears goes up the moment it is given, because an
// artist who has just handed over a master should not be left waiting on a person to
// be able to hear it. Only a flagged track waits, and then a keeper is told.
//
// The screener is deliberately narrow. It cannot hear the work, so it is told in plain
// terms never to judge it: no score, no taste, no genre, no style, no dialect, no
// opinion on whether the track is good. It reads only for the two things that would
// hurt the record — a submission that is not a track at all (advertising, a link with
// no work behind it), and words that are unlawful or abusive. Anything else goes up.
//
// The artist keeps everything: their name stays on the track, the master is stored as
// it was given, and nothing here is sold, licensed or counted.

const KINDS = ['song', 'instrumental', 'field_recording', 'spoken_word', 'score', 'other'];

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
      return Response.json({ success: true, id: 'rejected', flagged: false, ai_assessment: 'honeypot' });
    }

    const title = String(data.title || '').trim();
    const artistName = String(data.artist_name || '').trim();
    const audioUrl = String(data.audio_url || '').trim();

    if (!title || !artistName || !audioUrl) {
      return Response.json({ error: 'A track needs a title, an artist and its master file' }, { status: 400 });
    }
    if (!/^https?:\/\//i.test(audioUrl)) {
      return Response.json({ error: 'The master file has no usable address' }, { status: 400 });
    }

    // 1. The advisory note. It reads the words given — nothing else.
    let aiAssessment = 'Screener unavailable — a keeper will read this track.';
    let flagged = true;
    let kind = KINDS.includes(data.kind) ? data.kind : 'other';

    try {
      const aiResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are the advisory note for "Together We Can Change Climate" — a public record after Janine Selendy / Horizon International. Music is GIVEN to this record by the artists who made it. It is not judged here: no score, no ranking, no gate, no taste.

WHAT YOU MUST NEVER DO:
- Never assess the music itself: not its quality, genre, production, taste, or whether it is "good". You cannot hear it. An artist is never judged by a machine on this record.
- Never flag on style, language, dialect, accent, spelling, punctuation, subject matter, sadness, anger or profanity used as art.
- Never ask for a source: a track is not a claim about the world, and a musician needs no citation.

Assess ONLY these two things, from the words given below:
1. IS THIS A TRACK AT ALL? (spam: advertising, unrelated promotion, a link with no work behind it)
2. ARE THE WORDS GIVEN UNLAWFUL OR ABUSIVE? (incitement to real harm, sexual content involving minors, explicit threats to a person)

Then choose the kind that fits best from: song, instrumental, field_recording, spoken_word, score, other.

If you are unsure, say so in your reasons and choose "clean". Holding a track wrongly costs an artist more than a track a keeper removes later. Be strict about nothing else.

Title: ${title}
Artist: ${artistName}
The artist's own words: ${String(data.statement || '').slice(0, 1200) || '(none given)'}
Lyric: ${String(data.lyric || '').slice(0, 4000) || '(none given)'}`,
        response_json_schema: {
          type: 'object',
          properties: {
            kind: { type: 'string', enum: KINDS },
            verdict: { type: 'string', enum: ['clean', 'suspicious', 'reject'] },
            confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
            reasons: { type: 'string' },
          },
        },
      });

      flagged = aiResult.verdict !== 'clean';
      if (KINDS.includes(aiResult.kind)) kind = aiResult.kind;
      aiAssessment = `[${String(aiResult.verdict).toUpperCase()}] Read as: ${kind.replace(/_/g, ' ')} · Confidence: ${aiResult.confidence || 'unknown'} — ${aiResult.reasons}`;
    } catch (aiError) {
      // The screener failing never blocks a track — it holds it, in the open, and tells a keeper.
      console.error('climateMusicSubmit: screener failed:', aiError.message);
    }

    // 2. The track. Only the fields a track has are ever written — nothing a form posted
    //    beside them (a honeypot, a stray field) can reach the record.
    const status = flagged ? 'draft' : 'published';
    const recordData = {
      title: title.slice(0, 200),
      artist_name: artistName.slice(0, 120),
      artist_link: data.artist_link ? String(data.artist_link).slice(0, 300) : '',
      statement: data.statement ? String(data.statement).slice(0, 1200) : '',
      lyric: data.lyric ? String(data.lyric).slice(0, 6000) : '',
      audio_url: audioUrl,
      spec: data.spec ? String(data.spec).slice(0, 160) : '',
      seconds: typeof data.seconds === 'number' && isFinite(data.seconds) ? data.seconds : undefined,
      cover_url: data.cover_url ? String(data.cover_url) : '',
      submitter_email: data.submitter_email ? String(data.submitter_email).slice(0, 200) : '',
      kind,
      status,
      flagged,
      ai_assessment: aiAssessment,
    };

    const record = await base44.asServiceRole.entities.ClimateTrack.create(recordData);

    // 3. A keeper is told only when a person is actually needed, so "held" never means "forgotten".
    //    The way back is built from the app's own public address as the server sets it — never a
    //    temporary platform host, which must not stand in front of a review panel.
    const appUrl = (req.headers.get('x-base44-app-url') || 'https://uf51.love').replace(/\/$/, '');
    const adminEmail = flagged ? secrets.get('CLIMATE_ADMIN_EMAIL') : null;
    if (adminEmail) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: adminEmail,
          from_name: 'Together We Can Change Climate',
          subject: `Music held for a look: ${title} — ${artistName}`,
          html: `<div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 20px; background: #f4efe4;">
            <div style="background: #b3261e; color: #fff; padding: 12px 20px; margin: -20px -20px 20px -20px;">
              <h2 style="margin: 0; font-size: 16px; letter-spacing: 0.1em;">TOGETHER WE CAN CHANGE CLIMATE</h2>
            </div>
            <p style="color: #6b6258;">A track given to the record was held by the screener.</p>
            <div style="background: #efe7d6; border: 2px solid #1a1612; padding: 16px; margin: 16px 0;">
              <p style="margin: 4px 0; color: #1a1612;"><strong>Track:</strong> ${title}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Artist:</strong> ${artistName}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Master:</strong> ${recordData.spec || 'format not read'}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Advisory note:</strong> ${aiAssessment}</p>
              <p style="margin: 4px 0; color: #6b6258; font-size: 11px;">Clean tracks go up at once. This one waits until a person has read it — the artist keeps their name either way.</p>
            </div>
            <a href="${appUrl}/AdminClimateReview" style="background: #b3261e; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block; font-weight: bold; font-family: monospace;">Listen and decide</a>
          </div>`,
        });
      } catch (emailError) {
        console.error('climateMusicSubmit: held-track email failed:', emailError.message);
      }
    }

    return Response.json({ success: true, id: record.id, status, flagged, kind, ai_assessment: aiAssessment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}