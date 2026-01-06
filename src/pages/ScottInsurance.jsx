import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Shield, Plus, X, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format, isBefore, addDays } from 'date-fns';

export default function ScottInsurance() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const [showForm, setShowForm] = useState(false);
    const [newPolicy, setNewPolicy] = useState({
        policy_type: 'liability',
        provider: '',
        policy_number: '',
        coverage_amount: '',
        currency: 'GBP',
        annual_cost: '',
        start_date: '',
        renewal_date: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        notes: ''
    });

    const { data: policies = [] } = useQuery({
        queryKey: ['scottInsurance', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottInsurance.filter({ artist_id: artistId })
            : base44.entities.ScottInsurance.filter({})
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottInsurance.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottInsurance'] });
            setShowForm(false);
            setNewPolicy({
                policy_type: 'liability',
                provider: '',
                policy_number: '',
                coverage_amount: '',
                currency: 'GBP',
                annual_cost: '',
                start_date: '',
                renewal_date: '',
                contact_name: '',
                contact_phone: '',
                contact_email: '',
                notes: ''
            });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottInsurance.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottInsurance'] });
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => base44.entities.ScottInsurance.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottInsurance'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate({
            ...newPolicy,
            artist_id: artistId || undefined,
            coverage_amount: parseFloat(newPolicy.coverage_amount) || 0,
            annual_cost: parseFloat(newPolicy.annual_cost) || 0
        });
    };

    const isExpiringSoon = (renewalDate) => {
        const renewal = new Date(renewalDate);
        const thirtyDaysFromNow = addDays(new Date(), 30);
        return isBefore(renewal, thirtyDaysFromNow);
    };

    const policyTypeColors = {
        liability: 'text-red-400',
        equipment: 'text-amber-400',
        health: 'text-green-400',
        travel: 'text-cyan-400',
        cancellation: 'text-purple-400',
        vehicle: 'text-blue-400',
        other: 'text-gray-400'
    };

    return (
        <div className="min-h-screen bg-black text-white">
            
            {/* HEADER */}
            <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(createPageUrl(`ScottLiveAdmin${artistId ? `?id=${artistId}` : ''}`))}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Back</span>
                    </button>
                    <h1 className="text-base font-semibold text-white">Insurance</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* ADD FORM */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg p-6 border border-white/10 mb-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Policy Type</label>
                                    <select
                                        value={newPolicy.policy_type}
                                        onChange={(e) => setNewPolicy({...newPolicy, policy_type: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                                    >
                                        <option value="liability">Liability</option>
                                        <option value="equipment">Equipment</option>
                                        <option value="health">Health</option>
                                        <option value="travel">Travel</option>
                                        <option value="cancellation">Cancellation</option>
                                        <option value="vehicle">Vehicle</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Provider</label>
                                    <Input
                                        value={newPolicy.provider}
                                        onChange={(e) => setNewPolicy({...newPolicy, provider: e.target.value})}
                                        placeholder="Insurance company"
                                        className="bg-white/5 border-white/10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">Policy Number</label>
                                <Input
                                    value={newPolicy.policy_number}
                                    onChange={(e) => setNewPolicy({...newPolicy, policy_number: e.target.value})}
                                    placeholder="Policy reference"
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Coverage Amount</label>
                                    <Input
                                        type="number"
                                        value={newPolicy.coverage_amount}
                                        onChange={(e) => setNewPolicy({...newPolicy, coverage_amount: e.target.value})}
                                        placeholder="0"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Annual Cost</label>
                                    <Input
                                        type="number"
                                        value={newPolicy.annual_cost}
                                        onChange={(e) => setNewPolicy({...newPolicy, annual_cost: e.target.value})}
                                        placeholder="0"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Start Date</label>
                                    <Input
                                        type="date"
                                        value={newPolicy.start_date}
                                        onChange={(e) => setNewPolicy({...newPolicy, start_date: e.target.value})}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Renewal Date</label>
                                    <Input
                                        type="date"
                                        value={newPolicy.renewal_date}
                                        onChange={(e) => setNewPolicy({...newPolicy, renewal_date: e.target.value})}
                                        className="bg-white/5 border-white/10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Contact Name</label>
                                    <Input
                                        value={newPolicy.contact_name}
                                        onChange={(e) => setNewPolicy({...newPolicy, contact_name: e.target.value})}
                                        placeholder="Agent name"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Phone</label>
                                    <Input
                                        value={newPolicy.contact_phone}
                                        onChange={(e) => setNewPolicy({...newPolicy, contact_phone: e.target.value})}
                                        placeholder="Phone"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Email</label>
                                    <Input
                                        value={newPolicy.contact_email}
                                        onChange={(e) => setNewPolicy({...newPolicy, contact_email: e.target.value})}
                                        placeholder="Email"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">Notes</label>
                                <Textarea
                                    value={newPolicy.notes}
                                    onChange={(e) => setNewPolicy({...newPolicy, notes: e.target.value})}
                                    placeholder="Additional details..."
                                    className="bg-white/5 border-white/10"
                                    rows={3}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                                Add Policy
                            </Button>
                        </div>
                    </form>
                )}

                {/* POLICIES LIST */}
                <div className="space-y-2">
                    {policies.length === 0 ? (
                        <div className="text-center py-12">
                            <Shield className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">No insurance policies yet</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="text-cyan-400 text-sm mt-2 hover:text-cyan-300"
                            >
                                Add your first policy
                            </button>
                        </div>
                    ) : (
                        policies
                            .sort((a, b) => new Date(a.renewal_date) - new Date(b.renewal_date))
                            .map(policy => {
                                const expiringSoon = isExpiringSoon(policy.renewal_date);
                                
                                return (
                                    <div key={policy.id} className={`bg-white/5 rounded-lg p-4 border transition-all ${
                                        expiringSoon ? 'border-amber-500/50' : 'border-white/10 hover:border-white/20'
                                    }`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Shield className={`w-4 h-4 ${policyTypeColors[policy.policy_type]}`} />
                                                    <p className="text-sm font-medium text-white capitalize">{policy.policy_type}</p>
                                                    {expiringSoon && (
                                                        <AlertCircle className="w-4 h-4 text-amber-400" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mb-2">{policy.provider}</p>
                                                {policy.policy_number && (
                                                    <p className="text-xs text-gray-600 mb-2">#{policy.policy_number}</p>
                                                )}
                                                <div className="space-y-1">
                                                    {policy.coverage_amount > 0 && (
                                                        <p className="text-xs text-gray-500">
                                                            Coverage: {policy.currency} {policy.coverage_amount.toLocaleString()}
                                                        </p>
                                                    )}
                                                    {policy.annual_cost > 0 && (
                                                        <p className="text-xs text-gray-500">
                                                            Annual: {policy.currency} {policy.annual_cost.toLocaleString()}
                                                        </p>
                                                    )}
                                                    <p className={`text-xs ${expiringSoon ? 'text-amber-400' : 'text-gray-500'}`}>
                                                        Renews: {format(new Date(policy.renewal_date), 'dd MMM yyyy')}
                                                    </p>
                                                    {policy.contact_name && (
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Contact: {policy.contact_name}
                                                            {policy.contact_phone && ` • ${policy.contact_phone}`}
                                                        </p>
                                                    )}
                                                    {policy.notes && (
                                                        <p className="text-xs text-gray-600 mt-2">{policy.notes}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Delete this policy?')) {
                                                        deleteMutation.mutate(policy.id);
                                                    }
                                                }}
                                                className="text-gray-600 hover:text-red-400 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </div>
            </div>
        </div>
    );
}