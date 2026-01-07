import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, X, DollarSign, Heart, AlertCircle } from 'lucide-react';

/**
 * ADMIN PAYMENT DASHBOARD
 * Verify cash payments + charity applications
 * Track revenue
 */

export default function AdminPetSoundsPayments() {
    const queryClient = useQueryClient();

    const { data: cashPayments = [] } = useQuery({
        queryKey: ['petsounds_cash_payments'],
        queryFn: () => base44.entities.PetSounds51Payment.filter({ payment_method: 'cash' })
    });

    const { data: charityApplications = [] } = useQuery({
        queryKey: ['petsounds_charity_apps'],
        queryFn: () => base44.entities.PetSounds51CharityVerification.filter({})
    });

    const verifyPaymentMutation = useMutation({
        mutationFn: ({ paymentId, verified }) => 
            base44.entities.PetSounds51Payment.update(paymentId, {
                status: verified ? 'verified' : 'rejected',
                verified_at: new Date().toISOString()
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['petsounds_cash_payments'] });
        }
    });

    const verifyCharityMutation = useMutation({
        mutationFn: ({ charityId, verified }) =>
            base44.entities.PetSounds51CharityVerification.update(charityId, {
                status: verified ? 'verified' : 'rejected',
                verified_at: new Date().toISOString(),
                access_granted: verified
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['petsounds_charity_apps'] });
        }
    });

    const pendingCash = cashPayments.filter(p => p.status === 'pending_verification');
    const pendingCharities = charityApplications.filter(c => c.status === 'pending_verification');

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-3xl font-black mb-8">PetSounds51 Payments Admin</h1>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                        <DollarSign className="w-8 h-8 text-cyan-400 mb-3" />
                        <p className="text-3xl font-black text-white">{pendingCash.length}</p>
                        <p className="text-sm text-gray-400">Pending Cash Verifications</p>
                    </div>
                    <div className="bg-gray-900/60 border border-pink-500/30 rounded-xl p-6">
                        <Heart className="w-8 h-8 text-pink-400 mb-3" />
                        <p className="text-3xl font-black text-white">{pendingCharities.length}</p>
                        <p className="text-sm text-gray-400">Pending Charity Applications</p>
                    </div>
                    <div className="bg-gray-900/60 border border-green-500/30 rounded-xl p-6">
                        <Check className="w-8 h-8 text-green-400 mb-3" />
                        <p className="text-3xl font-black text-white">
                            {charityApplications.filter(c => c.status === 'verified').length}
                        </p>
                        <p className="text-sm text-gray-400">Verified Charities (Free Access)</p>
                    </div>
                </div>

                {/* Pending Cash Payments */}
                {pendingCash.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">Cash Payments To Verify</h2>
                        <div className="space-y-4">
                            {pendingCash.map(payment => (
                                <div key={payment.id} className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-lg mb-2">{payment.email}</p>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                                                <div>
                                                    <span className="text-gray-500">Tier:</span>
                                                    <span className="text-white ml-2 font-bold">{payment.tier}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Amount:</span>
                                                    <span className="text-white ml-2 font-bold">{payment.currency}{payment.price}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Region:</span>
                                                    <span className="text-white ml-2">{payment.region}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Reference:</span>
                                                    <span className="text-white ml-2 font-mono text-xs">{payment.reference}</span>
                                                </div>
                                            </div>
                                            <a 
                                                href={payment.proof_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-cyan-400 hover:text-cyan-300 text-sm"
                                            >
                                                View Proof Image →
                                            </a>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => verifyPaymentMutation.mutate({ paymentId: payment.id, verified: true })}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                                            >
                                                <Check className="w-4 h-4" />
                                                Verify
                                            </button>
                                            <button
                                                onClick={() => verifyPaymentMutation.mutate({ paymentId: payment.id, verified: false })}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pending Charity Applications */}
                {pendingCharities.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-black text-pink-400 mb-4">Charity Applications</h2>
                        <div className="space-y-4">
                            {pendingCharities.map(charity => (
                                <div key={charity.id} className="bg-gray-900/60 border border-pink-500/30 rounded-xl p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Heart className="w-5 h-5 text-pink-400" />
                                                <p className="text-white font-bold text-lg">{charity.charity_name}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                                                <div>
                                                    <span className="text-gray-500">Type:</span>
                                                    <span className="text-white ml-2 capitalize">{charity.charity_type.replace('_', ' ')}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Country:</span>
                                                    <span className="text-white ml-2">{charity.country}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Email:</span>
                                                    <span className="text-white ml-2">{charity.email}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Reg Number:</span>
                                                    <span className="text-white ml-2">{charity.registration_number || 'N/A'}</span>
                                                </div>
                                            </div>
                                            {charity.description && (
                                                <p className="text-gray-400 text-sm mb-3">{charity.description}</p>
                                            )}
                                            <a 
                                                href={charity.proof_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-pink-400 hover:text-pink-300 text-sm"
                                            >
                                                View Registration Proof →
                                            </a>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => verifyCharityMutation.mutate({ charityId: charity.id, verified: true })}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                                            >
                                                <Check className="w-4 h-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => verifyCharityMutation.mutate({ charityId: charity.id, verified: false })}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pendingCash.length === 0 && pendingCharities.length === 0 && (
                    <div className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500">No pending verifications</p>
                    </div>
                )}

            </div>
        </div>
    );
}