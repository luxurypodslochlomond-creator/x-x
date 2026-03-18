import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * HEALING FREQUENCY AUTO-FINDER
 * Scans Discogs, SoundCloud, Bandcamp, Archive.org
 * Finds unreleased/rare healing tracks
 * Returns lossless download sources
 * ♾️❤️♾️
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { query, platforms, formats } = await req.json();

        // AI51 searches across platforms for healing frequencies
        const searchResults = await base44.integrations.Core.InvokeLLM({
            prompt: `DEEP WEB SEARCH for healing frequencies/music:

Query: "${query || 'healing frequencies 432Hz 528Hz binaural'}"

TARGET PLATFORMS:
${platforms?.includes('discogs') !== false ? '✓ Discogs - unreleased vinyl, rare pressings, 432Hz conversions' : ''}
${platforms?.includes('soundcloud') !== false ? '✓ SoundCloud - private healing tracks, frequency experiments' : ''}
${platforms?.includes('bandcamp') !== false ? '✓ Bandcamp - underground meditation artists, healing producers' : ''}
${platforms?.includes('archive') !== false ? '✓ Archive.org - public domain healing music, vintage meditation' : ''}
${platforms?.includes('youtube') !== false ? '✓ YouTube - unlisted 432Hz conversions, frequency generators' : ''}

PRIORITY:
1. Tracks with LOSSLESS download available (FLAC, WAV, AIFF)
2. Unlicensed/CC0/public domain (can use legally)
3. Artists who would LOVE UF51 (anti-Spotify, spiritual, healing-focused)
4. Unreleased or rare (not on streaming services)

FOR EACH RESULT:
- Title
- Artist/Producer name
- Platform found on
- Direct URL
- Download format available (FLAC/WAV/MP3/etc)
- License status (CC0, CC-BY, public domain, unlicensed, unknown)
- Frequency info (432Hz, 528Hz, binaural, Schumann, etc)
- Why it heals / what makes it special
- Can we contact artist? (email/social if visible)

FIND 15-20 BEST MATCHES. Focus on LOSSLESS + LEGAL.

Return detailed JSON array.`,
            add_context_from_internet: true,
            response_json_schema: {
                type: 'object',
                properties: {
                    tracks: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                artist: { type: 'string' },
                                platform: { type: 'string' },
                                url: { type: 'string' },
                                download_format: { type: 'string' },
                                license: { type: 'string' },
                                frequency_info: { type: 'string' },
                                healing_properties: { type: 'string' },
                                contact_info: { type: 'string' },
                                why_special: { type: 'string' }
                            }
                        }
                    },
                    search_summary: { type: 'string' }
                }
            }
        });

        return Response.json({
            success: true,
            results: searchResults.tracks || [],
            summary: searchResults.search_summary,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Healing frequency search failed:', error);
        return Response.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
});