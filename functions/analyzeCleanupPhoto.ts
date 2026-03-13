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
      prompt: `Analyze this cleanup photo for fraud detection and impact assessment. 
        Location: ${location || 'unknown'}
        User-reported weight: ${litter_weight || 'not provided'} kg
        
        Return ONLY valid JSON (no markdown, no code blocks):
        {
          "liveness_score": 0-100,
          "ai_weight_estimate_min": kg,
          "ai_weight_estimate_max": kg,
          "ai_items_detected": "list of items",
          "fraud_flags": ["flag1", "flag2"] or [],
          "confidence": "high/medium/low",
          "summary": "brief analysis"
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