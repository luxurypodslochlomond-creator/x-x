import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { secrets } from 'base44:runtime';
import { keeperInbox } from '../../shared/keeperInbox.ts';
import { pushKeepers } from '../../shared/keeperPush.ts';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return Response.json({ error: 'Missing type or data' }, { status: 400 });
    }

    // Honeypot — if a bot filled the hidden field, silently pretend success.
    // No record created. Bot doesn't know it was caught.
    if (data.website) {
      return Response.json({ success: true, id: 'rejected', flagged: false, ai_assessment: 'honeypot' });
    }

    // Build content for AI assessment
    const contentParts = [data.title, data.headline, data.name, data.topic, data.region, data.summary, data.details, data.description, data.content, data.what_changed, data.replicable].filter(Boolean);
    const fullContent = contentParts.join('\n\n');

    // 1. AI advisory note
    let aiAssessment = 'AI assessment unavailable';
    let flagged = false;

    try {
      const aiResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are an AI advisory note for "Together We Can Change Climate" — a public-service climate platform after Janine Selendy / Horizon International. This is NOT social media. It is an institutional record. Spam is screened automatically: clean entries go on the record at once, and only what you flag waits for a human. Your role is advisory only — you never decide.

CRITICAL — DO NOT HALLUCINATE:
- Assess ONLY based on the text provided below. Do not invent facts, claims, or context not in the text.
- Do NOT assess scientific accuracy — that is the human reviewer's job, not yours. You do not have the expertise to verify climate science.
- If you are unsure about something, say so explicitly. Uncertainty is honest and useful.
- Do not speculate about the submitter's intentions. Assess the text, not the person.

Assess ONLY these three things:
1. SPAM: Is this promotional content, advertising, or link spam unrelated to climate?
2. RELEVANCE: Is it genuinely about climate change, environmental action, sustainability, or a related crisis?
3. HARM: Does it contain dangerous advice (e.g., telling people to drink chemicals, ignore evacuation orders)?

Do NOT assess: scientific accuracy, quality, writing style, or whether the solution "works." Those are human judgments.

Be fair. Do not flag legitimate climate content. Be strict only about clear spam and dangerous advice.

A flag holds a real person's initiative back for a human check, so never flag on style, quality, spelling, or whether a solution "works" — only on clear spam, off-topic promotion, or dangerous advice. Small everyday acts belong here: saving a jumper, buying less, building a dog house from stuffed used plastic. The purpose of this platform is to inspire and encourage the sharing of initiatives, no matter how small.

Submission type: ${type}
${data.title ? `Title: ${data.title}` : ''}
Content: ${fullContent.slice(0, 2000)}`,
        response_json_schema: {
          type: 'object',
          properties: {
            verdict: { type: 'string', enum: ['clean', 'suspicious', 'reject'] },
            relevance: { type: 'string', enum: ['relevant', 'off_topic', 'unclear'] },
            confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
            reasons: { type: 'string' }
          }
        }
      });

      flagged = aiResult.verdict !== 'clean';
      aiAssessment = `[${aiResult.verdict.toUpperCase()}] Relevance: ${aiResult.relevance} · Confidence: ${aiResult.confidence || 'unknown'} — ${aiResult.reasons}`;
    } catch (aiError) {
      aiAssessment = 'AI assessment failed — manual review needed';
      flagged = true;
    }

    // 2. Create the entry. Janine's instruction: clear out spam and let the information
    // flow — the record exists to encourage sharing, not to peer-review everything the way
    // the Solutions Site did. Clean entries publish at once; only flagged ones wait for a human.
    // A wire entry with no traceable origin never goes up on the record. It waits for a
    // person, who either finds the source or leaves the entry out.
    if (type === 'news' && (!data.source_name || !data.source_url)) {
      flagged = true;
      aiAssessment = `${aiAssessment} · No traceable source given — held for a human.`;
    }

    // A solution or a climate crisis is a claim about the world, and Janine's spec is exact:
    // every entry carries a link to the original source body. An entry whose origin cannot be
    // opened is the one thing that would cost this record its credibility with a research
    // panel — one entry like that and the rest look unchecked too. So it waits for a person,
    // who either finds the source or leaves the entry out. Nothing is lost: the whole
    // submission is held with its text, and one tap publishes it once the link is in.
    if (type === 'solution' && !data.source_url) {
      flagged = true;
      aiAssessment = `${aiAssessment} · No link to the source body — held for a person to find it.`;
    }

    // A gathering is an introduction, not a conversation: the record carries a name, a topic,
    // a rough region, and the ONE contact line the organiser chose to publish. Without a name
    // and a topic there is nothing for anyone to find, so it waits for a person.
    if (type === 'group' && (!data.name || !data.topic)) {
      flagged = true;
      aiAssessment = `${aiAssessment} · Gathering with no name or topic — held for a human.`;
    }

    const status = flagged ? 'draft' : 'published';

    // ── WHAT A SUBMITTER MAY NOT SAY ABOUT THEMSELVES ──
    // This payload arrives from a public form, so it can never be allowed to set the
    // things the record uses to say how well an entry is known, or who signed it on.
    // An entry that could arrive already marked "official record", already carrying a
    // corroborating source, or already signed with someone else's name would make every
    // honest entry on the record unverifiable by association — one of those and a panel
    // is entitled to doubt the other ten thousand. Stripped here, so these fields can
    // only ever be written by a person afterwards, in the review room, under their name.
    const {
      verification, corroborating_source, correction_note, editor, reviewed_date,
      featured, id, created_date, updated_date, created_by_id,
      ...submitted
    } = data;

    const recordData = { ...submitted, status, flagged, ai_assessment: aiAssessment };
    let record;

    if (type === 'comment') {
      record = await base44.asServiceRole.entities.ClimateComment.create(recordData);
    } else if (type === 'action') {
      record = await base44.asServiceRole.entities.ClimateAction.create(recordData);
    } else if (type === 'news') {
      record = await base44.asServiceRole.entities.ClimateNews.create(recordData);
    } else if (type === 'group') {
      record = await base44.asServiceRole.entities.ClimateGroup.create(recordData);
    } else {
      record = await base44.asServiceRole.entities.ClimateSolution.create(recordData);
    }

    // 3. The keeper's letter — sent whether the entry was held or went up clean (non-critical)
    // The way back is built from the app's own public address as the server sets it, so the
    // link stays right on whatever domain the record is served from — never a stale host.
    // The sender name is the record's own name: a handler should never open a climate email
    // and find a different product's name on it.
    // The record's real home is the fallback — never the platform's temporary app address,
    // which must not travel out in an email or stand in front of a review panel.
    const appUrl = (req.headers.get('x-base44-app-url') || 'https://uf51.love').replace(/\/$/, '');
    // ── A KEEPER HEARS IT EITHER WAY ─────────────────────────────────────────────
    // This used to write only when an entry was held, so a clean entry went up in silence
    // and the one person who had invited the author never heard that they had arrived. The
    // founder noticed before anyone else did: she sent an invitation, then had to go looking
    // to find out whether it had worked. Clean or held, the keeper is told — the letter is
    // only louder when a person is genuinely needed.
    // ── A TAP, NOT A LETTER ───────────────────────────────────────────────────────
    // Something has just arrived and a keeper is the only one who can decide about it. That
    // belongs on a phone, not in an inbox nobody reads. If a device took it, the letters are
    // skipped entirely; if nobody's phone answered, every address is written to exactly as
    // before, so this can never become the change that made a held entry go unnoticed.
    const arrivedTitle = data.title || data.headline || data.name || (data.content ? data.content.slice(0, 60) : 'Untitled');
    const tapped = await pushKeepers(
      base44,
      {
        title: flagged ? `Waiting for you: ${arrivedTitle}` : `On the record: ${arrivedTitle}`,
        body: flagged
          ? `A new ${type} is held until a person looks at it.`
          : `A new ${type} went up. Nothing is asked of you.`,
        url: flagged ? '/ClimateKeeperRoom?tab=decide' : '/TogetherChangeClimate',
        tag: flagged ? 'record-waiting' : 'record-arrived',
      },
      secrets
    ).catch(() => 0);

    const keepers = tapped > 0 ? [] : keeperInbox(secrets);
    for (const keeper of keepers) {
      try {
        const title = data.title || data.headline || data.name || (data.content ? data.content.slice(0, 60) : 'Untitled');
        // A name typed into a public form goes into an email, so it is escaped here: the
        // only markup in a keeper's letter should be the record's own.
        const typedName = String(data.submitter_name || '').replace(/[&<>"]/g, (c: string) =>
          ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string)
        );
        const who = typedName ? ` by ${typedName}` : '';
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: keeper,
          from_name: 'Together We Can Change Climate',
          subject: flagged
            ? `Held for your check: ${title}`
            : `On the record: ${title}`,
          html: `<div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 20px; background: #f4efe4;">
            <div style="background: #b3261e; color: #fff; padding: 12px 20px; margin: -20px -20px 20px -20px;">
              <h2 style="margin: 0; font-size: 16px; letter-spacing: 0.1em;">TOGETHER WE CAN CHANGE CLIMATE</h2>
            </div>
            <p style="color: #6b6258;">${flagged ? `A new ${type} submission${who} was held for a human check.` : `A new ${type}${who} has gone on the record. Nothing is asked of you — this is the record telling you that it happened.`}</p>
            <div style="background: #efe7d6; border: 2px solid #1a1612; padding: 16px; margin: 16px 0;">
              <p style="margin: 4px 0; color: #1a1612;"><strong>Title:</strong> ${title}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>What the screen made of it:</strong> ${aiAssessment}</p>
              <p style="margin: 4px 0; color: #6b6258; font-size: 11px;">${flagged ? 'Held back until a person looks. Nothing is on the record yet.' : 'Live now. If you would not keep it, say so in the room and it comes off.'}</p>
            </div>
            <a href="${flagged ? `${appUrl}/AdminClimateReview` : `${appUrl}/TogetherChangeClimate`}" style="background: #b3261e; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block; font-weight: bold; font-family: monospace;">${flagged ? 'Look at it now' : 'See it on the record'}</a>
          </div>`
        });
      } catch (emailError) {
        // Email failure never blocks a submission, but it must not be invisible either:
        // a held entry nobody is told about is the one failure that matters here.
        console.error(`climateSubmitReview: held-entry email to ${keeper} failed:`, emailError.message);
      }
    }

    return Response.json({ success: true, id: record.id, status, flagged, ai_assessment: aiAssessment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}