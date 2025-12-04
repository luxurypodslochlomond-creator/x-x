import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { track_id } = await req.json();

        if (!track_id) {
            return Response.json({ error: 'track_id required' }, { status: 400 });
        }

        // Get the track
        const tracks = await base44.entities.Soundtrack.filter({ id: track_id });
        if (tracks.length === 0) {
            return Response.json({ error: 'Track not found' }, { status: 404 });
        }

        const track = tracks[0];

        // Use LLM to analyze the track metadata and generate frequency fingerprint
        const analysisPrompt = `
You are a music frequency analyst. Analyze this track and identify healing frequencies present:

Track: ${track.title}
Artist: ${track.artist}
Description: ${track.description || 'N/A'}
Frequency Type: ${track.frequency_type || 'Unknown'}
Key: ${track.key_signature || 'Unknown'}
BPM: ${track.bpm || 'Unknown'}

Based on the track's purpose, genre, and characteristics, identify:
1. Which sacred healing frequencies (432Hz, 528Hz, 639Hz, 741Hz, 852Hz, 963Hz) are likely present
2. Their approximate strength (0-100%)
3. The primary healing properties (Love, Focus, Healing, Calm, Energy, Joy)

Return ONLY a JSON object with this structure (no markdown):
{
    "sacred_frequencies": {
        "432Hz": {"strength": 85, "healing_property": "Natural harmony, grounding"},
        "528Hz": {"strength": 70, "healing_property": "DNA repair, love frequency"}
    },
    "simple_summary": {
        "dominant_frequencies": ["Healing", "Love"],
        "overall_effect": "Calming and restorative"
    }
}
`;

        const analysis = await base44.integrations.Core.InvokeLLM({
            prompt: analysisPrompt,
            response_json_schema: {
                type: "object",
                properties: {
                    sacred_frequencies: {
                        type: "object",
                        additionalProperties: {
                            type: "object",
                            properties: {
                                strength: { type: "number" },
                                healing_property: { type: "string" }
                            }
                        }
                    },
                    simple_summary: {
                        type: "object",
                        properties: {
                            dominant_frequencies: {
                                type: "array",
                                items: { type: "string" }
                            },
                            overall_effect: { type: "string" }
                        }
                    }
                }
            }
        });

        // Update the track with frequency fingerprint
        await base44.asServiceRole.entities.Soundtrack.update(track_id, {
            frequency_fingerprint: analysis
        });

        return Response.json({
            success: true,
            fingerprint: analysis
        });

    } catch (error) {
        console.error('Frequency analysis error:', error);
        return Response.json({ 
            error: error.message || 'Analysis failed' 
        }, { status: 500 });
    }
});