import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Radio, ArrowLeft, Plus, Globe, FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import AI51DocumentProcessor from '@/components/scott/AI51DocumentProcessor';

export default function ScottVisas() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        artist_id: artistId || '',
        visa_type: 'O-1',
        country: 'USA',
        status: 'not_started',
        application_deadline: '',
        tour_dates: '',
        agent_contact: '',
        cost: '',
        currency: 'GBP',
        notes: ''
    });

    const { data: visas = [], isLoading } = useQuery({
        queryKey: ['scottVisas', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottVisa.filter({ artist_id: artistId })
            : base44.entities.ScottVisa.filter({})
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottVisa.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottVisas'] });
            setShowForm(false);
            setFormData({
                artist_id: artistId || '',
                visa_type: 'O-1',
                country: 'USA',
                status: 'not_started',
                application_deadline: '',
                tour_dates: '',
                agent_contact: '',
                cost: '',
                currency: 'GBP',
                notes: ''
            });
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => base44.entities.ScottVisa.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottVisas'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    const getArtistName = (id) => {
        const artist = artists.find(a => a.id === id);
        return artist?.name || 'Unknown';
    };

    const statusColors = {
        not_started: { bg: 'bg-gray-500/20', border: 'border-gray-500', text: 'text-gray-400', icon: AlertCircle },
        documents_gathering: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', icon: FileText },
        submitted: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400', icon: Calendar },
        approved: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', icon: CheckCircle },
        denied: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', icon: AlertCircle },
        expired: { bg: 'bg-gray-700/20', border: 'border-gray-700', text: 'text-gray-500', icon: AlertCircle }
    };

    const visaTypes = ['O-1', 'P-1', 'P-2', 'P-3', 'B-1', 'other'];
    const countries = ['USA', 'Canada', 'Australia', 'Japan', 'South Korea', 'China', 'UK', 'EU'];
    const statuses = ['not_started', 'documents_gathering', 'submitted', 'approved', 'denied', 'expired'];

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-cyan-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400 font-mono">VISAS</h1>
                            <p className="text-gray-500 text-xs font-mono">Travel documents</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        NEW
                    </button>
                </div>
            </div>

            {/* ADD FORM */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-6 mb-6"
                    >
                        {/* AI51 DOCUMENT PROCESSOR */}
                        <div className="mb-6">
                            <AI51DocumentProcessor
                                label="📸 SCREENSHOT VISA LETTER"
                                extractionPrompt={`Extract visa application details from this document. Return JSON with: visa_type, country, application_deadline (YYYY-MM-DD format), tour_dates (as text), agent_contact (name and contact), cost (number only), notes (any important details).`}
                                jsonSchema={{
                                    type: "object",
                                    properties: {
                                        visa_type: { type: "string" },
                                        country: { type: "string" },
                                        application_deadline: { type: "string" },
                                        tour_dates: { type: "string" },
                                        agent_contact: { type: "string" },
                                        cost: { type: "number" },
                                        notes: { type: "string" }
                                    }
                                }}
                                onExtracted={(data, fileUrl) => {
                                    setFormData({
                                        ...formData,
                                        visa_type: data.visa_type || formData.visa_type,
                                        country: data.country || formData.country,
                                        application_deadline: data.application_deadline || formData.application_deadline,
                                        tour_dates: data.tour_dates || formData.tour_dates,
                                        agent_contact: data.agent_contact || formData.agent_contact,
                                        cost: data.cost || formData.cost,
                                        notes: data.notes || formData.notes
                                    });
                                }}
                            />
                            <p className="text-xs font-mono text-gray-600 text-center mt-2">
                                Or fill manually below ↓
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!artistId && (
                                <div>
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">ARTIST</label>
                                    <select
                                        required
                                        value={formData.artist_id}
                                        onChange={(e) => setFormData({...formData, artist_id: e.target.value})}
                                        className="w-full bg-black border-2 border-gray-700 text-white p-3 rounded-lg font-mono"
                                    >
                                        <option value="">Select artist...</option>
                                        {artists.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">VISA TYPE</label>
                                    <select
                                        value={formData.visa_type}
                                        onChange={(e) => setFormData({...formData, visa_type: e.target.value})}
                                        className="w-full bg-black border-2 border-gray-700 text-white p-3 rounded-lg font-mono"
                                    >
                                        {visaTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">COUNTRY</label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                                        className="w-full bg-black border-2 border-gray-700 text-white p-3 rounded-lg font-mono"
                                    >
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">DEADLINE</label>
                                    <Input
                                        type="date"
                                        value={formData.application_deadline}
                                        onChange={(e) => setFormData({...formData, application_deadline: e.target.value})}
                                        className="bg-black border-2 border-gray-700 text-white h-12"
                                    />
                                </div>
                                <div>
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">COST</label>
                                    <Input
                                        type="number"
                                        value={formData.cost}
                                        onChange={(e) => setFormData({...formData, cost: e.target.value})}
                                        className="bg-black border-2 border-gray-700 text-white h-12"
                                        placeholder="3000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">TOUR DATES</label>
                                <Input
                                    value={formData.tour_dates}
                                    onChange={(e) => setFormData({...formData, tour_dates: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white h-12"
                                    placeholder="Oct 15 - Nov 3, 2026"
                                />
                            </div>

                            <div>
                                <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">AGENT/LAWYER</label>
                                <Input
                                    value={formData.agent_contact}
                                    onChange={(e) => setFormData({...formData, agent_contact: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white h-12"
                                    placeholder="Name & contact..."
                                />
                            </div>

                            <div>
                                <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">NOTES</label>
                                <Textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white"
                                    placeholder="Documents needed, etc..."
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={createMutation.isPending}
                                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black"
                                >
                                    {createMutation.isPending ? 'SAVING...' : 'ADD VISA'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* VISA LIST */}
            <div className="space-y-3">
                {isLoading ? (
                    <p className="text-gray-500 text-center py-8 font-mono">Loading...</p>
                ) : visas.length === 0 ? (
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-12 text-center">
                        <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono">No visas tracked yet</p>
                    </div>
                ) : (
                    visas.map(visa => {
                        const colors = statusColors[visa.status];
                        const StatusIcon = colors.icon;
                        
                        return (
                            <motion.div
                                key={visa.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-gradient-to-r ${colors.bg} to-black border-2 ${colors.border} rounded-lg p-4`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <p className="text-white font-black text-lg font-mono mb-1">
                                            {visa.visa_type} • {visa.country}
                                        </p>
                                        {!artistId && (
                                            <p className="text-gray-400 text-sm font-mono">{getArtistName(visa.artist_id)}</p>
                                        )}
                                    </div>
                                    <select
                                        value={visa.status}
                                        onChange={(e) => updateStatusMutation.mutate({ id: visa.id, status: e.target.value })}
                                        className={`${colors.text} bg-black font-black text-xs font-mono px-3 py-2 border-2 ${colors.border} rounded-lg`}
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status.replace(/_/g, ' ').toUpperCase()}</option>
                                        ))}
                                    </select>
                                </div>

                                {visa.application_deadline && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-400 text-sm font-mono">
                                            Deadline: {format(new Date(visa.application_deadline), 'd MMM yyyy')}
                                        </span>
                                    </div>
                                )}

                                {visa.tour_dates && (
                                    <div className="bg-black/60 rounded p-2 mb-2">
                                        <p className="text-xs text-gray-500 font-mono mb-1">TOUR DATES</p>
                                        <p className="text-white text-sm font-mono">{visa.tour_dates}</p>
                                    </div>
                                )}

                                {visa.cost && (
                                    <p className="text-gray-400 text-sm font-mono mb-2">Cost: £{visa.cost?.toLocaleString()}</p>
                                )}

                                {visa.agent_contact && (
                                    <p className="text-gray-400 text-xs font-mono mb-2">Agent: {visa.agent_contact}</p>
                                )}

                                {visa.notes && (
                                    <div className="mt-3 pt-3 border-t border-gray-700">
                                        <p className="text-xs font-mono text-gray-400">{visa.notes}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}