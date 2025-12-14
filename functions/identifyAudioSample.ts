import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * AUDIO SAMPLE IDENTIFIER
 * Uses AI to identify what song a sample is from
 * Returns: Song name, artist, album, rights holders
 * 
 * NEEDS: File URL (upload first via Core.UploadFile)
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { file_url } = await req.json();

        if (!file_url) {
            return Response.json({ error: 'No file URL provided' }, { status: 400 });
        }

        // Use AI to analyze audio and identify it
        const prompt = `You are an expert music industry database. 

TASK: Identify this audio sample and provide complete rights information.

Return ONLY valid JSON (no markdown, no explanation) in this exact format:
{
    "identified": true or false,
    "song_title": "Song name" or null,
    "artist": "Artist name" or null,
    "album": "Album name" or null,
    "release_year": "Year" or null,
    "master_owner": "Label/company that owns the master recording" or "Unknown",
    "publishing_owner": "Publisher/PRO" or "Unknown",
    "estimated_clearance_cost_gbp": 1000,
    "estimated_royalty_percentage": 15,
    "notes": "Additional info about clearance process",
    "confidence": "high" or "medium" or "low"
}

If you cannot identify the sample, return identified: false with nulls.`;

        const result = await base44.integrations.Core.InvokeLLM({
            prompt: prompt,
            file_urls: [file_url],
            response_json_schema: {
                type: "object",
                properties: {
                    identified: { type: "boolean" },
                    song_title: { type: ["string", "null"] },
                    artist: { type: ["string", "null"] },
                    album: { type: ["string", "null"] },
                    release_year: { type: ["string", "null"] },
                    master_owner: { type: "string" },
                    publishing_owner: { type: "string" },
                    estimated_clearance_cost_gbp: { type: "number" },
                    estimated_royalty_percentage: { type: "number" },
                    notes: { type: "string" },
                    confidence: { type: "string", enum: ["high", "medium", "low"] }
                },
                required: ["identified", "master_owner", "publishing_owner"]
            }
        });

        return Response.json(result);

    } catch (error) {
        console.error('Audio identification error:', error);
        return Response.json({ 
            error: error.message,
            identified: false
        }, { status: 500 });
    }
});