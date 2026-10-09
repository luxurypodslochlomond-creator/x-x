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

    // Build content for AI assessment
    const contentParts = [data.title, data.summary, data.details, data.description, data.content].filter(Boolean);
    const fullContent = contentParts.join('\n\n');

    // 1. AI pre-screen
    let aiAssessment = 'AI assessment unavailable';
    let flagged = false;

    try {
      const aiResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are reviewing a submission for "Together We Change Climate" — a public-service climate platform after Janine Selendy / Horizon International. This is NOT social media. It is an institutional record of verified climate solutions and crises. Every entry is reviewed by a human before publication.

Assess this submission honestly:
1. SPAM: Is this promotional content, advertising, or link spam unrelated to climate?
2. RELEVANCE: Is it genuinely about climate change, environmental action, sustainability, or a related crisis?
3. HARM: Does it contain harmful misinformation, dangerous advice, or misleading claims?
4. QUALITY: Is it substantive enough for a public institutional platform?

Be fair. Do not reject legitimate climate content. Be strict about spam and misinformation.

Submission type: ${type}
${data.title ? `Title: ${data.title}` : ''}
Content: ${fullContent.slice(0, 2000)}`,
        response_json_schema: {
          type: 'object',
          properties: {
            verdict: { type: 'string', enum: ['clean', 'suspicious', 'reject'] },
            relevance: { type: 'string', enum: ['relevant', 'off_topic', 'unclear'] },
            reasons: { type: 'string' }
          }
        }
      });

      flagged = aiResult.verdict !== 'clean';
      aiAssessment = `[${aiResult.verdict.toUpperCase()}] Relevance: ${aiResult.relevance} — ${aiResult.reasons}`;
    } catch (aiError) {
      aiAssessment = 'AI assessment failed — manual review needed';
      flagged = true;
    }

    // 2. Create entity with AI assessment
    const recordData = { ...data, status: 'draft', flagged, ai_assessment: aiAssessment };
    let record;

    if (type === 'comment') {
      record = await base44.asServiceRole.entities.ClimateComment.create(recordData);
    } else if (type === 'action') {
      record = await base44.asServiceRole.entities.ClimateAction.create(recordData);
    } else {
      record = await base44.asServiceRole.entities.ClimateSolution.create(recordData);
    }

    // 3. Email admin notification (non-critical)
    const adminEmail = secrets.get('CLIMATE_ADMIN_EMAIL');
    if (adminEmail) {
      try {
        const title = data.title || (data.content ? data.content.slice(0, 60) : 'Untitled');
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: adminEmail,
          subject: `Climate submission awaiting review: ${title}`,
          html: `<div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 20px; background: #f4efe4;">
            <div style="background: #b3261e; color: #fff; padding: 12px 20px; margin: -20px -20px 20px -20px;">
              <h2 style="margin: 0; font-size: 16px; letter-spacing: 0.1em;">TOGETHER WE CHANGE CLIMATE</h2>
            </div>
            <p style="color: #6b6258;">A new ${type} submission is awaiting your review.</p>
            <div style="background: #efe7d6; border: 2px solid #1a1612; padding: 16px; margin: 16px 0;">
              <p style="margin: 4px 0; color: #1a1612;"><strong>Title:</strong> ${title}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>AI Advisory Note:</strong> ${aiAssessment}</p>
              <p style="margin: 4px 0; color: #1a1612;"><strong>Flagged:</strong> ${flagged ? 'Yes — needs attention' : 'No — looks clean'}</p>
              <p style="margin: 4px 0; color: #6b6258; font-size: 11px;">A human reviews every submission before publication. The AI advises — the human decides.</p>
            </div>
            <a href="https://green-stride-d47e043c.base44.app/AdminClimateReview" style="background: #b3261e; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block; font-weight: bold; font-family: monospace;">Review now</a>
          </div>`
        });
      } catch (emailError) {
        // Email failure is non-critical
      }
    }

    return Response.json({ success: true, id: record.id, flagged, ai_assessment: aiAssessment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}