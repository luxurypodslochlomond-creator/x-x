import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Radio, ArrowLeft, Sparkles, Mail, MapPin, DollarSign, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import ScottGigWorkflow from '@/components/scott/ScottGigWorkflow';
import AI51GigFilter from '@/components/scott/AI51GigFilter';

export default function ScottGigOffers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    const [emailText, setEmailText] = useState('');
    const [parsing, setParsing] = useState(false);
    const [parsedData, setParsedData] = useState(null);

    const { data: offers = [], isLoading } = useQuery({
        queryKey: ['scottGigOffers', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottGigOffer.filter({ artist_id: artistId })
            : base44.entities.ScottGigOffer.filter({})
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const artist = artists.find(a => a.id === artistId);

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottGigOffer.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
            setEmailText('');
            setParsedData(null);
        }
    });

    const parseEmail = async () => {
        if (!emailText.trim()) return;
        
        setParsing(true);
        try {
            // AI parses the email
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract gig offer details from this email. Return JSON with: venue, city, county, country (default UK), date (YYYY-MM-DD), time, fee (number), capacity (number), promoter, promoter_contact, requirements, notes. If not found, use null.

Email:
${emailText}`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        venue: { type: "string" },
                        city: { type: "string" },
                        county: { type: "string" },
                        country: { type: "string" },
                        date: { type: "string" },
                        time: { type: "string" },
                        fee: { type: "number" },
                        capacity: { type: "number" },
                        promoter: { type: "string" },
                        promoter_contact: { type: "string" },
                        requirements: { type: "string" },
                        notes: { type: "string" }
                    }
                }
            });

            setParsedData({
                ...response,
                artist_id: artistId || '',
                raw_email: emailText,
                status: 'pending_manager_review',
                currency: 'GBP'
            });
        } catch (error) {
            alert('Error parsing: ' + error.message);
        }
        setParsing(false);
    };

    const handleSave = () => {
        if (parsedData) {
            createMutation.mutate(parsedData);
        }
    };

    const getArtistName = (id) => {
        const artist = artists.find(a => a.id === id);
        return artist?.name || 'Unknown';
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6">
                <h1 className="text-4xl font-black text-white font-mono mb-2">GIG OFFERS</h1>
                <p className="text-gray-600 text-xs font-mono">Paste email → AI parses</p>
            </div>

            {/* NEW OFFER */}
            <div className="bg-black border border-gray-800 rounded p-4 mb-6">
                <h2 className="text-white font-black font-mono text-lg mb-4">+ NEW OFFER</h2>
                <Textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    className="bg-black border-2 border-gray-900 text-white min-h-[150px] font-mono text-sm mb-3"
                    placeholder="Paste gig email here..."
                />

                <Button
                    onClick={parseEmail}
                    disabled={parsing || !emailText.trim()}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 font-mono"
                >
                    {parsing ? 'AI PARSING...' : 'PARSE EMAIL'}
                </Button>
            </div>

            {/* PARSED DATA PREVIEW */}
            <AnimatePresence>
                {parsedData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black border border-gray-800 rounded p-4 mb-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-black font-mono">PARSED DATA</h3>
                            <Button
                                onClick={handleSave}
                                disabled={createMutation.isPending}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black font-black font-mono"
                            >
                                {createMutation.isPending ? 'SAVING...' : 'SAVE'}
                            </Button>
                        </div>

                        <div className="space-y-2 text-sm font-mono">
                            {parsedData.venue && <p className="text-white">📍 {parsedData.venue}{parsedData.city ? `, ${parsedData.city}` : ''}</p>}
                            {parsedData.date && <p className="text-white">📅 {parsedData.date}{parsedData.time ? ` @ ${parsedData.time}` : ''}</p>}
                            {parsedData.fee && <p className="text-white">💰 £{parsedData.fee?.toLocaleString()}</p>}
                            {parsedData.capacity && <p className="text-gray-400">Cap: {parsedData.capacity}</p>}
                            {parsedData.promoter && (
                                <div className="bg-black border border-gray-900 rounded p-2 mt-2">
                                    <p className="text-gray-600 text-xs mb-1">PROMOTER</p>
                                    <p className="text-white">{parsedData.promoter}</p>
                                    {parsedData.promoter_contact && <p className="text-gray-400 text-xs">{parsedData.promoter_contact}</p>}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXISTING OFFERS WITH WORKFLOW */}
            <div className="space-y-4">
                <h2 className="text-white font-black font-mono text-lg mb-3">ALL OFFERS</h2>
                {isLoading ? (
                    <p className="text-gray-600 text-center py-8 font-mono text-sm">Loading...</p>
                ) : offers.length === 0 ? (
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-8 text-center">
                        <Mail className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-600 font-mono text-sm">No offers yet</p>
                    </div>
                ) : (
                    offers
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(offer => (
                            <div key={offer.id} className="space-y-3">
                                {/* AI51 SMART FILTER - FIRST */}
                                <AI51GigFilter 
                                    offer={offer} 
                                    artist={artists.find(a => a.id === offer.artist_id)}
                                />

                                {/* GIG DETAILS */}
                                <div className="bg-black border-2 border-gray-900 rounded-lg p-4">
                                    <p className="text-white font-black font-mono mb-2">{offer.venue}</p>
                                    <p className="text-cyan-400 font-mono text-sm mb-1">
                                        {format(new Date(offer.date), 'd MMM yyyy')} • £{offer.fee?.toLocaleString()}
                                    </p>
                                    <p className="text-gray-600 text-xs font-mono">{offer.city}, {offer.country}</p>
                                    {!artistId && (
                                        <p className="text-gray-600 text-xs font-mono mt-1">{getArtistName(offer.artist_id)}</p>
                                    )}

                                    {(offer.capacity || offer.promoter || offer.requirements) && (
                                        <div className="mt-3 pt-3 border-t border-gray-900 space-y-2">
                                            {offer.capacity && <p className="text-gray-600 text-xs font-mono">Cap: {offer.capacity}</p>}
                                            {offer.promoter && <p className="text-gray-600 text-xs font-mono">Promoter: {offer.promoter}</p>}
                                            {offer.requirements && <p className="text-gray-600 text-xs font-mono">{offer.requirements}</p>}
                                        </div>
                                    )}
                                </div>

                                {/* WORKFLOW */}
                                <ScottGigWorkflow offer={offer} />
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}