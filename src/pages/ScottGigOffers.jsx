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

    const statusColors = {
        pending_manager_review: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        sent_to_band: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
        accepted_by_band: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' },
        rejected_by_band: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' },
        confirmed: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-pink-500">
                <div className="flex items-center gap-3">
                    <Radio className="w-10 h-10 text-pink-400" />
                    <div>
                        <h1 className="text-3xl font-black text-pink-400 font-mono">GIG OFFERS</h1>
                        <p className="text-gray-500 text-xs font-mono">Paste email → AI fills everything</p>
                    </div>
                </div>
            </div>

            {/* PASTE EMAIL */}
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-pink-400" />
                    <h2 className="text-pink-400 font-black text-lg font-mono">PASTE GIG EMAIL</h2>
                </div>

                <Textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    className="bg-black border-2 border-gray-700 text-white min-h-[200px] font-mono text-sm mb-4"
                    placeholder="Paste the entire email here... AI will extract all the details."
                />

                <Button
                    onClick={parseEmail}
                    disabled={parsing || !emailText.trim()}
                    className="w-full bg-pink-500 hover:bg-pink-400 text-white font-black h-14 text-lg"
                >
                    {parsing ? (
                        <>
                            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                            AI PARSING...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            MAGIC PARSE
                        </>
                    )}
                </Button>
            </div>

            {/* PARSED DATA PREVIEW */}
            <AnimatePresence>
                {parsedData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-6 mb-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-green-400 font-black text-lg font-mono">EXTRACTED DATA</h3>
                            <Button
                                onClick={handleSave}
                                disabled={createMutation.isPending}
                                className="bg-green-500 hover:bg-green-400 text-black font-black"
                            >
                                {createMutation.isPending ? 'SAVING...' : 'SAVE OFFER'}
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {parsedData.venue && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-400" />
                                    <span className="text-white font-bold font-mono">{parsedData.venue}</span>
                                    {parsedData.city && <span className="text-gray-400 font-mono">• {parsedData.city}</span>}
                                </div>
                            )}
                            {parsedData.date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-green-400" />
                                    <span className="text-white font-mono">{parsedData.date}</span>
                                    {parsedData.time && <span className="text-gray-400 font-mono">• {parsedData.time}</span>}
                                </div>
                            )}
                            {parsedData.fee && (
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-green-400" />
                                    <span className="text-white font-bold font-mono">£{parsedData.fee?.toLocaleString()}</span>
                                </div>
                            )}
                            {parsedData.capacity && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-green-400" />
                                    <span className="text-white font-mono">{parsedData.capacity} capacity</span>
                                </div>
                            )}
                            {parsedData.promoter && (
                                <div className="bg-black/60 rounded p-3 mt-3">
                                    <p className="text-xs text-gray-500 font-mono mb-1">PROMOTER</p>
                                    <p className="text-white font-mono">{parsedData.promoter}</p>
                                    {parsedData.promoter_contact && (
                                        <p className="text-gray-400 text-sm font-mono mt-1">{parsedData.promoter_contact}</p>
                                    )}
                                </div>
                            )}
                            {parsedData.requirements && (
                                <div className="bg-black/60 rounded p-3 mt-3">
                                    <p className="text-xs text-gray-500 font-mono mb-1">REQUIREMENTS</p>
                                    <p className="text-white text-sm font-mono">{parsedData.requirements}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXISTING OFFERS */}
            <div className="space-y-3">
                <h2 className="text-white font-black font-mono text-xl mb-4">ALL OFFERS</h2>
                {isLoading ? (
                    <p className="text-gray-500 text-center py-8 font-mono">Loading...</p>
                ) : offers.length === 0 ? (
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-12 text-center">
                        <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono">No gig offers yet</p>
                    </div>
                ) : (
                    offers
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(offer => {
                            const colors = statusColors[offer.status] || statusColors.pending_manager_review;
                            return (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-gradient-to-r ${colors.bg} to-black border-2 ${colors.border} rounded-lg p-4`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-black text-lg font-mono mb-1">{offer.venue}</p>
                                            <p className="text-gray-400 text-sm font-mono">{offer.city}, {offer.country}</p>
                                            {!artistId && (
                                                <p className="text-gray-500 text-xs font-mono mt-1">{getArtistName(offer.artist_id)}</p>
                                            )}
                                        </div>
                                        <div className={`${colors.text} font-black text-xs font-mono px-3 py-1 border-2 ${colors.border} rounded-lg`}>
                                            {offer.status.replace(/_/g, ' ').toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="bg-black/60 rounded p-2">
                                            <p className="text-xs text-gray-500 font-mono">DATE</p>
                                            <p className="text-white text-sm font-bold font-mono">{format(new Date(offer.date), 'd MMM')}</p>
                                        </div>
                                        <div className="bg-black/60 rounded p-2">
                                            <p className="text-xs text-gray-500 font-mono">FEE</p>
                                            <p className="text-white text-sm font-bold font-mono">£{offer.fee?.toLocaleString()}</p>
                                        </div>
                                        {offer.capacity && (
                                            <div className="bg-black/60 rounded p-2">
                                                <p className="text-xs text-gray-500 font-mono">CAP</p>
                                                <p className="text-white text-sm font-bold font-mono">{offer.capacity}</p>
                                            </div>
                                        )}
                                    </div>

                                    {offer.promoter && (
                                        <p className="text-xs text-gray-500 font-mono">Promoter: {offer.promoter}</p>
                                    )}
                                </motion.div>
                            );
                        })
                )}
            </div>
        </div>
    );
}