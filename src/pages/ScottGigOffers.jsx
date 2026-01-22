import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Radio, ArrowLeft, Sparkles, Mail, MapPin, DollarSign, Calendar, Users, Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import ScottGigWorkflow from '@/components/scott/ScottGigWorkflow';
import toast from 'react-hot-toast';

export default function ScottGigOffers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    const [emailText, setEmailText] = useState('');
    const [parsing, setParsing] = useState(false);
    const [parsedData, setParsedData] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [newOfferIds, setNewOfferIds] = useState([]);

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
        mutationFn: (data) => {
            console.log('Creating gig offer:', data);
            return base44.entities.ScottGigOffer.create(data);
        },
        onSuccess: () => {
            console.log('Gig offer created successfully');
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
            setEmailText('');
            setParsedData(null);
        },
        onError: (error) => {
            console.error('Failed to create gig offer:', error);
            alert('Error saving offer: ' + (error.message || 'Unknown error'));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (offerId) => base44.entities.ScottGigOffer.delete(offerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
        },
        onError: (error) => {
            alert('Error deleting: ' + (error.message || 'Unknown error'));
        }
    });

    const handleDelete = (offerId, venueName) => {
        if (window.confirm(`Delete ${venueName}?`)) {
            deleteMutation.mutate(offerId);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setUploading(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setUploadedFile(file_url);
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const parseEmail = async () => {
        if (!emailText.trim() && !uploadedFile) return;
        
        setParsing(true);
        
        // Retry logic: 3 attempts with exponential backoff
        let attempt = 0;
        const maxAttempts = 3;
        
        while (attempt < maxAttempts) {
            try {
                attempt++;
                
                // AI parses the email/PDF - SIMPLE SCHEMA (no required fields)
                const response = await base44.integrations.Core.InvokeLLM({
                    prompt: `Extract gig offer details from this ${uploadedFile ? 'document/email' : 'email'}. Return JSON.

                Fields to extract (use null if not found):
                - venue: venue name
                - city: city
                - county: county/state  
                - country: country (default "UK")
                - date: YYYY-MM-DD format
                - time: performance time
                - fee: fee as number (no currency symbol)
                - capacity: venue capacity as number
                - promoter: promoter/agent name
                - promoter_contact: email or phone
                - requirements: tech/hospitality needs
                - notes: other details

                ${emailText ? `Email text:\n${emailText}` : 'See attached document.'}`,
                    file_urls: uploadedFile ? [uploadedFile] : undefined,
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

                // Success! Set parsed data
                setParsedData({
                    ...response,
                    artist_id: artistId || '',
                    raw_email: emailText,
                    status: 'pending_manager_review',
                    currency: 'GBP',
                    country: response.country || 'UK'
                });

                setParsing(false);
                setEmailText('');
                setUploadedFile(null);
                return; // Exit - success!
                
            } catch (error) {
                const errorMsg = error?.message || String(error);
                console.error(`Parse attempt ${attempt}/${maxAttempts} failed:`, errorMsg, error);
                
                // If last attempt, handle error
                if (attempt >= maxAttempts) {
                    // Queue for offline retry
                    const pendingParse = {
                        timestamp: new Date().toISOString(),
                        emailText: emailText,
                        artistId: artistId || '',
                        error: errorMsg
                    };
                    const pending = JSON.parse(localStorage.getItem('pending_gig_parses') || '[]');
                    pending.push(pendingParse);
                    localStorage.setItem('pending_gig_parses', JSON.stringify(pending));
                    
                    // Show detailed error for debugging
                    alert(`✓ SAVED OFFLINE (will retry when online)\n\nError: ${errorMsg}\n\nAttempted: ${maxAttempts} times\nYour email is saved securely.`);
                    setParsing(false);
                    return;
                }
                
                // Show retry indicator
                console.log(`Retrying in ${Math.pow(2, attempt - 1)}s...`);
                
                // Wait before retry (exponential backoff: 1s, 2s, 4s)
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
            }
        }
    };

    const handleSave = () => {
        if (parsedData) {
            // Validate artist_id is present (required for RLS)
            if (!parsedData.artist_id || parsedData.artist_id === '') {
                alert('Error: Artist ID missing. Please select an artist first.');
                return;
            }
            // Ensure required fields
            if (!parsedData.venue || !parsedData.date || !parsedData.fee) {
                alert('Error: Missing venue, date, or fee. Please check the parsed data.');
                return;
            }
            createMutation.mutate(parsedData);
        }
    };

    const getArtistName = (id) => {
        const artist = artists.find(a => a.id === id);
        return artist?.name || 'Unknown';
    };

    // Real-time subscription - NEW OFFERS GLOW + TOAST
    useEffect(() => {
        const unsubscribe = base44.entities.ScottGigOffer.subscribe((event) => {
            if (event.type === 'create' && event.data?.auto_extracted) {
                // Toast notification
                toast.custom((t) => (
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-white/20 font-mono">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 animate-pulse" />
                            <div>
                                <p className="font-black text-sm">NEW GIG DETECTED</p>
                                <p className="text-xs opacity-90">{event.data.venue} • £{event.data.fee?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ), { duration: 4000 });

                // Add to glow list
                setNewOfferIds(prev => [...prev, event.id]);
                
                // Remove glow after 10 seconds
                setTimeout(() => {
                    setNewOfferIds(prev => prev.filter(id => id !== event.id));
                }, 10000);

                // Refresh data
                queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
            }
        });

        return () => unsubscribe();
    }, [queryClient]);

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(artistId ? createPageUrl('ScottArtistHome') + `?id=${artistId}` : createPageUrl('CB51'))}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">{artistId ? 'BACK TO ARTIST' : 'BACK TO CB51'}</span>
            </button>

            <div className="mb-6">
                <h1 className="text-4xl font-black text-white font-mono mb-2">GIG OFFERS</h1>
                <p className="text-gray-600 text-xs font-mono">Paste email → AI parses</p>
                <button
                    onClick={() => navigate(createPageUrl('ScottAddShow') + (artistId ? `?id=${artistId}` : ''))}
                    className="mt-3 bg-cyan-500 hover:bg-cyan-600 text-black font-black py-2 px-4 rounded font-mono text-sm"
                >
                    + MANUAL ADD SHOW
                </button>
            </div>

            {/* NEW OFFER */}
            <div className="bg-black border border-gray-800 rounded p-4 mb-6">
                <h2 className="text-white font-black font-mono text-lg mb-4">+ NEW OFFER</h2>

                {/* FILE UPLOAD */}
                <div className="mb-3">
                    <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.eml,.txt,.xls,.xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="block w-full bg-black border-2 border-dashed border-gray-800 hover:border-cyan-500 rounded p-4 text-center cursor-pointer transition-all"
                    >
                        {uploading ? (
                            <p className="text-cyan-400 font-mono text-sm">UPLOADING...</p>
                        ) : uploadedFile ? (
                            <p className="text-green-400 font-mono text-sm">✓ FILE UPLOADED</p>
                        ) : (
                            <p className="text-gray-600 font-mono text-sm">UPLOAD FILE (PDF/IMAGE/EMAIL)</p>
                        )}
                    </label>
                </div>

                {/* TEXT INPUT */}
                <Textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    className="bg-black border-2 border-gray-900 text-white min-h-[150px] font-mono text-sm mb-3"
                    placeholder="Or paste gig email here..."
                />

                <Button
                    onClick={parseEmail}
                    disabled={parsing || (!emailText.trim() && !uploadedFile)}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 font-mono"
                >
                    {parsing ? 'AI PARSING...' : 'PARSE EMAIL/PDF'}
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
                        .map(offer => {
                            const isNew = newOfferIds.includes(offer.id);
                            
                            return (
                            <div key={offer.id} className="space-y-3">
                                {/* GIG DETAILS */}
                                <motion.div 
                                    initial={isNew ? { scale: 1.02 } : false}
                                    animate={isNew ? { 
                                        boxShadow: [
                                            '0 0 0px rgba(6, 182, 212, 0)',
                                            '0 0 30px rgba(6, 182, 212, 0.6)',
                                            '0 0 0px rgba(6, 182, 212, 0)'
                                        ]
                                    } : {}}
                                    transition={isNew ? { duration: 2, repeat: Infinity } : {}}
                                    className={`bg-black border-2 rounded-lg p-4 ${
                                        isNew ? 'border-cyan-500' : 'border-gray-900'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="text-white font-black font-mono flex-1">{offer.venue}</p>
                                        <button
                                            onClick={() => handleDelete(offer.id, offer.venue)}
                                            className="text-red-500 hover:text-red-400 p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
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
                                </motion.div>

                                {/* WORKFLOW */}
                                <ScottGigWorkflow offer={offer} />
                            </div>
                        );
                        })
                )}
            </div>
        </div>
    );
}