import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Radio, ArrowLeft, Plus, Check, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function ScottInvoices() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        artist_id: artistId || '',
        amount: '',
        currency: 'GBP',
        description: '',
        date: new Date().toISOString().split('T')[0],
        status: 'unpaid',
        accountant_notes: ''
    });

    const { data: invoices = [], isLoading } = useQuery({
        queryKey: ['scottInvoices', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottInvoice.filter({ artist_id: artistId })
            : base44.entities.ScottInvoice.filter({})
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottInvoice.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottInvoices'] });
            setShowForm(false);
            setFormData({
                artist_id: artistId || '',
                amount: '',
                currency: 'GBP',
                description: '',
                date: new Date().toISOString().split('T')[0],
                status: 'unpaid',
                accountant_notes: ''
            });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, status }) => base44.entities.ScottInvoice.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottInvoices'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    const toggleStatus = (invoice) => {
        const newStatus = invoice.status === 'paid' ? 'unpaid' : 'paid';
        updateMutation.mutate({ id: invoice.id, status: newStatus });
    };

    const getArtistName = (id) => {
        const artist = artists.find(a => a.id === id);
        return artist?.name || 'Unknown';
    };

    const statusColors = {
        paid: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' },
        unpaid: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        overdue: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' }
    };

    const totals = invoices.reduce((acc, inv) => {
        acc[inv.status] = (acc[inv.status] || 0) + (inv.amount || 0);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-amber-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-amber-400" />
                        <div>
                            <h1 className="text-3xl font-black text-amber-400 font-mono">INVOICES</h1>
                            <p className="text-gray-500 text-xs font-mono">Track payments</p>
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

            {/* TOTALS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-amber-900/20 border-2 border-amber-500 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold font-mono mb-1">UNPAID</p>
                    <p className="text-white text-2xl font-black font-mono">£{(totals.unpaid || 0).toLocaleString()}</p>
                </div>
                <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                    <p className="text-green-400 text-xs font-bold font-mono mb-1">PAID</p>
                    <p className="text-white text-2xl font-black font-mono">£{(totals.paid || 0).toLocaleString()}</p>
                </div>
                <div className="bg-red-900/20 border-2 border-red-500 rounded-lg p-4">
                    <p className="text-red-400 text-xs font-bold font-mono mb-1">OVERDUE</p>
                    <p className="text-white text-2xl font-black font-mono">£{(totals.overdue || 0).toLocaleString()}</p>
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
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">AMOUNT</label>
                                    <Input
                                        type="number"
                                        required
                                        value={formData.amount}
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                        className="bg-black border-2 border-gray-700 text-white h-12"
                                        placeholder="1500"
                                    />
                                </div>
                                <div>
                                    <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">DATE</label>
                                    <Input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        className="bg-black border-2 border-gray-700 text-white h-12"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">DESCRIPTION</label>
                                <Input
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white h-12"
                                    placeholder="Gig fee, studio time..."
                                />
                            </div>

                            <div>
                                <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">NOTES FOR ACCOUNTANT</label>
                                <Textarea
                                    value={formData.accountant_notes}
                                    onChange={(e) => setFormData({...formData, accountant_notes: e.target.value})}
                                    className="bg-black border-2 border-gray-700 text-white"
                                    placeholder="Optional notes..."
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
                                    {createMutation.isPending ? 'SAVING...' : 'CREATE INVOICE'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* INVOICE LIST */}
            <div className="space-y-3">
                {isLoading ? (
                    <p className="text-gray-500 text-center py-8 font-mono">Loading...</p>
                ) : invoices.length === 0 ? (
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-12 text-center">
                        <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono">No invoices yet</p>
                    </div>
                ) : (
                    invoices
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(invoice => {
                            const colors = statusColors[invoice.status];
                            return (
                                <motion.div
                                    key={invoice.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-gradient-to-r ${colors.bg} to-black border-2 ${colors.border} rounded-lg p-4`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-white font-black text-lg font-mono mb-1">
                                                £{invoice.amount?.toLocaleString()} {invoice.currency}
                                            </p>
                                            <p className="text-gray-400 text-sm font-mono">{invoice.description}</p>
                                            {!artistId && (
                                                <p className="text-gray-500 text-xs font-mono mt-1">
                                                    {getArtistName(invoice.artist_id)}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => toggleStatus(invoice)}
                                            className={`${colors.text} font-black text-xs font-mono px-4 py-2 border-2 ${colors.border} rounded-lg hover:bg-white/10 transition-all`}
                                        >
                                            {invoice.status.toUpperCase()}
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {format(new Date(invoice.date), 'd MMM yyyy')}
                                        </div>
                                        {invoice.accountant_notes && (
                                            <div className="flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                Note
                                            </div>
                                        )}
                                    </div>

                                    {invoice.accountant_notes && (
                                        <div className="mt-3 pt-3 border-t border-gray-700">
                                            <p className="text-xs font-mono text-gray-400">{invoice.accountant_notes}</p>
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