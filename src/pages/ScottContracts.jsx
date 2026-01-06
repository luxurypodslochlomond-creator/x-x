import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Radio, ArrowLeft, Plus, Scale, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function ScottContracts() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        artist_id: artistId || '',
        contract_type: 'venue_contract',
        title: '',
        signed_date: '',
        expiry_date: '',
        status: 'pending',
        key_terms: '',
        notes: ''
    });

    const { data: contracts = [], isLoading } = useQuery({
        queryKey: ['scottContracts', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottContract.filter({ artist_id: artistId })
            : base44.entities.ScottContract.filter({})
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottContract.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottContracts'] });
            setShowForm(false);
            setFormData({
                artist_id: artistId || '',
                contract_type: 'venue_contract',
                title: '',
                signed_date: '',
                expiry_date: '',
                status: 'pending',
                key_terms: '',
                notes: ''
            });
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => base44.entities.ScottContract.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottContracts'] });
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
        pending: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', icon: AlertCircle },
        signed: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', icon: CheckCircle },
        expired: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', icon: AlertCircle },
        cancelled: { bg: 'bg-gray-500/20', border: 'border-gray-500', text: 'text-gray-400', icon: AlertCircle }
    };

    const contractTypes = [
        'venue_contract',
        'label_deal',
        'publishing_deal',
        'management_agreement',
        'producer_agreement',
        'collaboration_agreement',
        'other'
    ];

    const statuses = ['pending', 'signed', 'expired', 'cancelled'];

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-purple-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-purple-400" />
                        <div>
                            <h1 className="text-3xl font-black text-purple-400 font-mono">CONTRACTS</h1>
                            <p className="text-gray-500 text-xs font-mono">Legal documents</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-purple-500 hover:bg-purple-400 text-white font-black px-6 py-3 rounded-xl flex items-center gap-2"
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
                        className="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 mb-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!artistId && (
                                <div>
                                    <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">ARTIST</label>
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

                            <div>
                                <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">CONTRACT TYPE</label>
                                <select
                                    value={formData.contract_type}
                                    onChange={(e) => setFormData({...formData, contract_type: e.target.value})}
                                    className="w-full bg-black border-2 border-gray-700 text-white p-3 rounded-lg font-mono"
                                >
                                    {contractTypes.map(type => (
                                        <option key={type} value={type}>{type.replace(/_/g, ' ').toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">TITLE</label>
                                <Input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white h-12"
                                    placeholder="O2 Academy Glasgow - Sept 2026"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">SIGNED DATE</label>
                                    <Input
                                        type="date"
                                        value={formData.signed_date}
                                        onChange={(e) => setFormData({...formData, signed_date: e.target.value})}
                                        className="bg-black border-2 border-gray-700 text-white h-12"
                                    />
                                </div>
                                <div>
                                    <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">EXPIRY DATE</label>
                                    <Input
                                        type="date"
                                        value={formData.expiry_date}
                                        onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                                        className="bg-black border-2 border-gray-700 text-white h-12"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">KEY TERMS</label>
                                <Textarea
                                    value={formData.key_terms}
                                    onChange={(e) => setFormData({...formData, key_terms: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white"
                                    placeholder="£5k fee, 90/10 split, 500 capacity..."
                                />
                            </div>

                            <div>
                                <label className="text-purple-400 text-xs font-bold font-mono mb-2 block">NOTES</label>
                                <Textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white"
                                    placeholder="Additional notes..."
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
                                    className="flex-1 bg-purple-500 hover:bg-purple-400 text-white font-black"
                                >
                                    {createMutation.isPending ? 'SAVING...' : 'ADD CONTRACT'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CONTRACT LIST */}
            <div className="space-y-3">
                {isLoading ? (
                    <p className="text-gray-500 text-center py-8 font-mono">Loading...</p>
                ) : contracts.length === 0 ? (
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-12 text-center">
                        <Scale className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono">No contracts yet</p>
                    </div>
                ) : (
                    contracts
                        .sort((a, b) => new Date(b.signed_date || b.created_date) - new Date(a.signed_date || a.created_date))
                        .map(contract => {
                            const colors = statusColors[contract.status] || statusColors.pending;
                            const StatusIcon = colors.icon;
                            
                            return (
                                <motion.div
                                    key={contract.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-gradient-to-r ${colors.bg} to-black border-2 ${colors.border} rounded-lg p-4`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-black text-lg font-mono mb-1">{contract.title}</p>
                                            <p className="text-gray-400 text-sm font-mono">
                                                {contract.contract_type?.replace(/_/g, ' ').toUpperCase()}
                                            </p>
                                            {!artistId && (
                                                <p className="text-gray-500 text-xs font-mono mt-1">
                                                    {getArtistName(contract.artist_id)}
                                                </p>
                                            )}
                                        </div>
                                        <select
                                            value={contract.status}
                                            onChange={(e) => updateStatusMutation.mutate({ id: contract.id, status: e.target.value })}
                                            className={`${colors.text} bg-black font-black text-xs font-mono px-3 py-2 border-2 ${colors.border} rounded-lg`}
                                        >
                                            {statuses.map(status => (
                                                <option key={status} value={status}>{status.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        {contract.signed_date && (
                                            <div className="bg-black/60 rounded p-2">
                                                <p className="text-xs text-gray-500 font-mono">SIGNED</p>
                                                <p className="text-white text-sm font-mono">
                                                    {format(new Date(contract.signed_date), 'd MMM yyyy')}
                                                </p>
                                            </div>
                                        )}
                                        {contract.expiry_date && (
                                            <div className="bg-black/60 rounded p-2">
                                                <p className="text-xs text-gray-500 font-mono">EXPIRES</p>
                                                <p className="text-white text-sm font-mono">
                                                    {format(new Date(contract.expiry_date), 'd MMM yyyy')}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {contract.key_terms && (
                                        <div className="bg-black/60 rounded p-3 mb-2">
                                            <p className="text-xs text-gray-500 font-mono mb-1">KEY TERMS</p>
                                            <p className="text-white text-sm font-mono whitespace-pre-wrap">{contract.key_terms}</p>
                                        </div>
                                    )}

                                    {contract.notes && (
                                        <div className="mt-3 pt-3 border-t border-gray-700">
                                            <p className="text-xs font-mono text-gray-400">{contract.notes}</p>
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