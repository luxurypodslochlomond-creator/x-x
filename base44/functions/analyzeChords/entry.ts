import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Verify user is authenticated
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { trackTitle, artist, duration } = await req.json();

    if (!trackTitle || !artist) {
      return Response.json({ error: 'Track title and artist required' }, { status: 400 });
    }

    // Use LLM to analyze and return chord progression
    const prompt = `Analyze the song "${trackTitle}" by ${artist} and provide the complete chord progression with timing.

Return ONLY a JSON array with this structure:
[
  { "time": 0, "chord": "Am", "section": "Intro" },
  { "time": 8, "chord": "F", "section": "Intro" },
  { "time": 16, "chord": "C", "section": "Verse 1" },
  ...
]

Rules:
- "time" is seconds from start of song
- Include ALL chords throughout the entire song
- Mark sections: Intro, Verse 1, Verse 2, Chorus, Bridge, Solo, Outro
- Be accurate - this is for musicians playing along
- If you don't know the exact song, return common chords for that artist's style
- Return ONLY the JSON array, no explanation`;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: prompt,
      response_json_schema: {
        type: "object",
        properties: {
          chords: {
            type: "array",
            items: {
              type: "object",
              properties: {
                time: { type: "number" },
                chord: { type: "string" },
                section: { type: "string" }
              },
              required: ["time", "chord", "section"]
            }
          }
        },
        required: ["chords"]
      }
    });

    return Response.json({
      success: true,
      chords: response.chords || []
    });

  } catch (error) {
    console.error('Chord analysis error:', error);
    return Response.json({ 
      error: error.message || 'Failed to analyze chords'
    }, { status: 500 });
  }
});