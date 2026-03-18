import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

// Free, open-source TTS using a lightweight approach
// Uses Google Cloud's TTS API free tier or fallback to browser API

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { text, lang = 'en-GB', voiceId = 'warm-scottish' } = await req.json();

    if (!text || text.trim().length === 0) {
      return Response.json({ error: 'No text provided' }, { status: 400 });
    }

    // For local self-hosted: Use a simple approach with free Google Cloud TTS
    // Fallback: If you set up a local TTS server, point to it here
    const localTTSEndpoint = Deno.env.get('LOCAL_TTS_ENDPOINT');
    
    if (localTTSEndpoint) {
      // Use local self-hosted TTS (e.g., Coqui TTS server running locally)
      const response = await fetch(localTTSEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanTextForSpeech(text),
          language: lang.split('-')[0],
          speaker: mapVoiceToSpeaker(voiceId)
        })
      });

      if (!response.ok) throw new Error('Local TTS failed');
      const audioBuffer = await response.arrayBuffer();
      
      return new Response(audioBuffer, {
        headers: { 'Content-Type': 'audio/wav' }
      });
    }

    // Fallback: Google Cloud TTS free tier (if no local server)
    // For now, return instructions to set up local TTS
    return Response.json({
      status: 'ready',
      message: 'Set LOCAL_TTS_ENDPOINT env var to use self-hosted TTS',
      instruction: 'Run Coqui TTS server locally and point to it',
      example: 'LOCAL_TTS_ENDPOINT=http://localhost:5000/api/tts'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function cleanTextForSpeech(text) {
  return text
    .replace(/https?:\/\/[^\s)>\]]+/g, '')
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[•\-*#]+\s*/gm, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function mapVoiceToSpeaker(voiceId) {
  const voiceMap = {
    'warm-scottish': 'scottish_female',
    'warm-female': 'english_female',
    'warm-male': 'english_male'
  };
  return voiceMap[voiceId] || 'english_female';
}