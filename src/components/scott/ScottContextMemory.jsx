import React, { useState, useEffect } from 'react';
import { Brain, Zap, Users, Music } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * CONTEXT MEMORY - AI REMEMBERS EVERYTHING
 * "Dave needs PA" → AI knows Dave = Dave Smith, Barras regular, specific PA needs
 * "Book Rory for Yes and Maybe" → AI knows Rory produces them
 * NO RE-EXPLAINING. EVER.
 */

export default function ScottContextMemory({ artistId }) {
    const [context, setContext] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadContext();
    }, [artistId]);

    const loadContext = async () => {
        if (!artistId) return;
        
        setIsLoading(true);
        try {
            // Get ALL data about this artist
            const artist = await base44.entities.ScottArtist.filter({ id: artistId });
            const events = await base44.entities.ScottEvent.filter({ artist_id: artistId });
            const tasks = await base44.entities.ScottTask.filter({ artist_id: artistId });
            const messages = await base44.entities.ScottMessage.filter({ artist_id: artistId });
            const gigpacks = await base44.entities.ScottGigPack.filter({ artist_id: artistId });

            // Build AI context
            const contextPrompt = `Build a complete memory profile for this artist/client:

Artist: ${JSON.stringify(artist[0])}
Past Events: ${JSON.stringify(events.slice(0, 10))}
Tasks: ${JSON.stringify(tasks.slice(0, 10))}
Messages: ${JSON.stringify(messages.slice(0, 20))}
Gig Packs: ${JSON.stringify(gigpacks)}

Extract:
1. Common venues they play
2. Typical technical requirements (PA, monitors, stage size)
3. Relationship quality (reliable? last-minute? professional?)
4. Money patterns (typical fees, payment speed)
5. Who they work with (producers, other artists, venues)
6. Special needs/preferences
7. Communication style

Return structured context that Scott can use for instant decisions.`;

            const contextData = await base44.integrations.Core.InvokeLLM({
                prompt: contextPrompt,
                response_json_schema: {
                    type: "object",
                    properties: {
                        common_venues: { type: "array", items: { type: "string" } },
                        tech_requirements: { type: "string" },
                        relationship_quality: { type: "string" },
                        typical_fee_range: { type: "string" },
                        works_with: { type: "array", items: { type: "string" } },
                        special_preferences: { type: "string" },
                        communication_style: { type: "string" },
                        quick_summary: { type: "string" }
                    }
                }
            });

            setContext(contextData);
        } catch (error) {
            console.error('Context load error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="text-gray-400 text-sm">Loading context...</div>;
    if (!context) return null;

    return (
        <div className="bg-purple-900/20 border-2 border-purple-500 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-purple-400 font-black font-mono text-sm">AI CONTEXT MEMORY</h3>
            </div>

            <div className="space-y-3 text-sm">
                <div className="bg-black/40 p-2">
                    <p className="text-purple-300 font-bold mb-1">Quick Summary:</p>
                    <p className="text-gray-300">{context.quick_summary}</p>
                </div>

                {context.common_venues?.length > 0 && (
                    <div>
                        <p className="text-purple-400 font-mono text-xs mb-1">USUAL VENUES:</p>
                        <p className="text-gray-400 text-xs">{context.common_venues.join(', ')}</p>
                    </div>
                )}

                {context.tech_requirements && (
                    <div>
                        <p className="text-purple-400 font-mono text-xs mb-1">TECH:</p>
                        <p className="text-gray-400 text-xs">{context.tech_requirements}</p>
                    </div>
                )}

                {context.works_with?.length > 0 && (
                    <div>
                        <p className="text-purple-400 font-mono text-xs mb-1">WORKS WITH:</p>
                        <p className="text-gray-400 text-xs">{context.works_with.join(', ')}</p>
                    </div>
                )}

                {context.typical_fee_range && (
                    <div>
                        <p className="text-purple-400 font-mono text-xs mb-1">MONEY:</p>
                        <p className="text-gray-400 text-xs">{context.typical_fee_range}</p>
                    </div>
                )}
            </div>
        </div>
    );
}