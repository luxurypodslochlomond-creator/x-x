import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { secrets } from 'base44:runtime';

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

    // A gathering is an introduction, not a conversation: the record carries a name, a topic,
    // a rough region, and the ONE contact line the organiser chose to publish. Without a name
    // and a topic there is nothing for anyone to find, so it waits for a person.
    if (type === 'group' && (!data.name || !data.topic)) {
      flagged = true;
      aiAssessment = `${aiAssessment} · Gathering with no name or topic — held for a human.`;
    }

    const status = flagged ? 'draft' : 'published';
    const recordData = { ...data, status, flagged, ai_assessment: aiAssessment };
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

    // 3. Email admin notification — only when a human is genuinely needed (non-critical)
    // The way back is built from the app's own public address as the server sets it, so the
    // link stays right on whatever domain the record is served from — never a stale host.
    // The sender name is the record's own name: a handler should never open a climate email
    // and find a different product's name on it.
    const appUrl = (req.headers.get('x-base44-app-url') || 'https://green-stride-d47e043c.base44.app').replace(/\/$/, '');
    const adminEmail = flagged ? secrets.get('CLIMATE_ADMIN_EMAIL') : null;
    if (adminEmail) {
      try {
        const title = data.title || data.headline || data.name || (data.content ? data.content.slice(0, 60) : 'Untitled');
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: adminEmail,
          from_name: 'Together We Can Change Climate',
          subject: `Climate submission held for a check: ${title}`,
          html: `<div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 20px; background: #f4efe4;">
            <div style="background: #b3261e; color: #fff; padding: 12px 20px; margin: -20px -20px 20px -20px;">
              <h2 style="margin: 0; font-size: 16px; letter-spacing: 0.1em;">TOGETHER WE CAN CHANGE CLIMATE</h2>
            </div>
            <p style="color: #6b6258;">A new ${type} submission was held for a human check.</p>
            <div style="background: #efe7d6; border: 2px solid #1a1612; padding: 16px; margin: 16px 0;">
              <p style="margin: 4px 0; color: #1a1612;"><strong>Title:</strong> ${title}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>AI Advisory Note:</strong> ${aiAssessment}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Flagged:</strong> ${flagged ? 'Yes — needs attention' : 'No — looks clean'}</p>
              <p style="margin: 4px 0; color: #6b6258; font-size: 11px;">Held for a human check — clean entries publish automatically.</p>
            </div>
            <a href="${appUrl}/AdminClimateReview" style="background: #b3261e; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block; font-weight: bold; font-family: monospace;">Review now</a>
          </div>`
        });
      } catch (emailError) {
        // Email failure never blocks a submission, but it must not be invisible either:
        // a held entry nobody is told about is the one failure that matters here.
        console.error('climateSubmitReview: held-entry email failed:', emailError.message);
      }
    }

    return Response.json({ success: true, id: record.id, status, flagged, ai_assessment: aiAssessment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}