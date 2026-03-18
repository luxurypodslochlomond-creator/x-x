import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    
    const { photoUrl, location, litter_weight } = payload;
    
    if (!photoUrl) {
      return Response.json({ error: 'Photo URL required' }, { status: 400 });
    }

    // Use Base44 InvokeLLM with vision to analyze the cleanup photo
    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a global environmental cleanup verifier. Analyze this photo to verify legitimate cleanup action that counts toward planetary healing.

WHAT COUNTS AS VALID CLEANUP (GLOBALLY):
✅ Street/park/beach litter removal
✅ Garden/yard cleanup (home residential property)
✅ Driveway/patio/balcony cleanup
✅ Waterway/river cleanup
✅ Emergency disaster response (flood debris, wildfire cleanup, etc)
✅ Community cleanup events
❌ Shelf/desk staging with arranged items
❌ Professional product photography
❌ Single item with studio lighting

Location reported: ${location || 'unknown'}
User reported weight: ${litter_weight || 'not provided'} kg

ANALYZE FOR:
1) **Setting & Authenticity**: Outdoor or outdoor-residential? Natural lighting or studio? Real depth and shadows indicate genuine cleanup.
2) **Liveness Detection**: Is this a real photo (0-100 score)? Check for natural imperfections, depth, realistic shadows. AI-gen or reused photos score lower.
3) **Weight Estimation**: Count visible items and estimate volume/weight. Compare to user claim.
4) **Fraud Flags**: Any red flags? (identical composition to known fakes, impossible physics, professional staging, single arranged item, etc)
5) **Global Legitimacy**: Is this real environmental action that helps the planet?

Return ONLY valid JSON (no markdown):
{
  "liveness_score": 0-100,
  "ai_weight_estimate_min": kg,
  "ai_weight_estimate_max": kg,
  "ai_items_detected": "item1, item2, ...",
  "fraud_flags": [],
  "confidence": "high/medium/low",
  "summary": "brief assessment"
}`,
      file_urls: [photoUrl],
      response_json_schema: {
        type: 'object',
        properties: {
          liveness_score: { type: 'number' },
          ai_weight_estimate_min: { type: 'number' },
          ai_weight_estimate_max: { type: 'number' },
          ai_items_detected: { type: 'string' },
          fraud_flags: { type: 'array', items: { type: 'string' } },
          confidence: { type: 'string' },
          summary: { type: 'string' }
        }
      }
    });

    return Response.json({
      status: 'success',
      analysis: analysis
    });

  } catch (error) {
    console.error('Photo analysis error:', error);
    return Response.json({ 
      error: error.message,
      status: 'failed'
    }, { status: 500 });
  }
});