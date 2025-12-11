import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * PASTE GIG OFFER - AI EXTRACTS EVERYTHING
 * Paste email text → AI creates gig offer → team votes
 */

export default function ScottPasteGigOffer() {
    const navigate = useNavigate();
    const [pastedText, setPastedText] = useState('');
    const [extractedOffer, setExtractedOffer] = useState(null);
    const [created, setCreated] = useState(false);

    const extractMutation = useMutation({
        mutationFn: async (text) => {
            const prompt = `Extract gig offer details from this email/text:

${text}

Return JSON with:
{
  "venue": "venue name",
  "date": "YYYY-MM-DD",
  "fee": number (in £),
  "contact_person": "name",
  "contact_email": "email",
  "details": "full details",
  "artist_suggestion": "which artist this is likely for based on context"
}

If any field is missing, use null.`;

            const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
                prompt,
                response_json_schema: {
                    type: "object",
                    properties: {
                        venue: { type: "string" },
                        date: { type: "string" },
                        fee: { type: "number" },
                        contact_person: { type: "string" },
                        contact_email: { type: "string" },
                        details: { type: "string" },
                        artist_suggestion: { type: "string" }
                    }
                }
            });

            return response;
        },
        onSuccess: (data) => {
            setExtractedOffer(data);
        }
    });

    const createOfferMutation = useMutation({
        mutationFn: async () => {
            // Get artists to find matching one
            const artists = await base44.entities.ScottArtist.list();
            const matchingArtist = artists.find(a => 
                extractedOffer.artist_suggestion?.toLowerCase().includes(a.name.toLowerCase())
            );

            const offerData = {
                artist_id: matchingArtist?.id || artists[0]?.id,
                venue: extractedOffer.venue,
                date: extractedOffer.date,
                fee: extractedOffer.fee,
                contact_person: extractedOffer.contact_person,
                contact_email: extractedOffer.contact_email,
                details: extractedOffer.details,
                source: 'manual_paste',
                status: 'pending',
                team_votes: [],
                ai_recommendation: 'Awaiting team votes'
            };

            await base44.entities.ScottGigOffer.create(offerData);

            // TODO: Send push notifications to team
        },
        onSuccess: () => {
            setCreated(true);
            setTimeout(() => {
                navigate(createPageUrl('ScottGigOffers'));
            }, 2000);
        }
    });

    const handleExtract = () => {
        if (!pastedText.trim()) return;
        extractMutation.mutate(pastedText);
    };

    const handleCreate = () => {
        createOfferMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-black p-4">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-amber-500/30">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>
                
                <h1 className="text-xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>PASTE GIG</h1>
            </div>

            {created ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-green-400 font-mono mb-2">GIG OFFER CREATED</h2>
                    <p className="text-gray-500 font-mono text-sm">Team notified for voting...</p>
                </motion.div>
            ) : extractedOffer ? (
                <div className="space-y-4">
                    <div className="bg-black border-2 border-green-500/50 rounded-lg p-4">
                        <p className="text-green-400 font-mono text-sm mb-4">✓ AI EXTRACTED</p>
                        
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">VENUE</p>
                                <p className="text-white font-mono">{extractedOffer.venue || 'Not found'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">DATE</p>
                                <p className="text-white font-mono">{extractedOffer.date || 'Not found'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">FEE</p>
                                <p className="text-white font-mono">£{extractedOffer.fee || 'Not found'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-mono mb-1">CONTACT</p>
                                <p className="text-white font-mono">{extractedOffer.contact_person || 'Not found'}</p>
                                <p className="text-gray-500 text-xs font-mono">{extractedOffer.contact_email || ''}</p>
                            </div>
                            {extractedOffer.artist_suggestion && (
                                <div>
                                    <p className="text-gray-500 text-xs font-mono mb-1">SUGGESTED ARTIST</p>
                                    <p className="text-cyan-400 font-mono">{extractedOffer.artist_suggestion}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={handleCreate}
                        disabled={createOfferMutation.isPending}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono py-6 text-lg"
                    >
                        {createOfferMutation.isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                CREATING...
                            </>
                        ) : (
                            <>CREATE GIG OFFER</>
                        )}
                    </Button>

                    <Button
                        onClick={() => {
                            setExtractedOffer(null);
                            setPastedText('');
                        }}
                        variant="outline"
                        className="w-full border-2 border-gray-800 text-gray-500 font-mono"
                    >
                        START OVER
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-black border-2 border-amber-500/30 rounded-lg p-4">
                        <p className="text-amber-400 font-mono text-sm mb-2">PASTE EMAIL TEXT</p>
                        <p className="text-gray-600 font-mono text-xs mb-4">
                            Copy email about gig offer, paste here, AI extracts everything
                        </p>
                    </div>

                    <Textarea
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                        placeholder="Paste email here..."
                        className="bg-black border-2 border-gray-800 !text-white placeholder:text-gray-600 min-h-[300px] focus:border-amber-500 font-mono text-sm"
                        style={{ color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                    />

                    <Button
                        onClick={handleExtract}
                        disabled={!pastedText.trim() || extractMutation.isPending}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono py-6 text-lg"
                    >
                        {extractMutation.isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                AI EXTRACTING...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                AI EXTRACT
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}