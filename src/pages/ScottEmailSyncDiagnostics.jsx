import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, Clock, Zap, Bug } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation } from '@tanstack/react-query';

/**
 * SCOTT EMAIL SYNC DIAGNOSTICS
 * Live monitoring: see exactly why emails aren't converting
 */

export default function ScottEmailSyncDiagnostics() {
    const navigate = useNavigate();
    const [manualSyncRunning, setManualSyncRunning] = useState(false);

    // Fetch pending emails (waiting to sync)
    const { data: pendingEmails = [], refetch: refetchPending } = useQuery({
        queryKey: ['scottPendingEmails'],
        queryFn: () => base44.entities.ScottMessage.filter({ status: 'pending' }),
        refetchInterval: 3000 // Auto-refresh every 3 seconds
    });

    // Fetch synced emails (successfully converted)
    const { data: syncedEmails = [] } = useQuery({
        queryKey: ['scottSyncedEmails'],
        queryFn: () => base44.entities.ScottMessage.filter({ status: 'synced' }),
        refetchInterval: 5000
    });

    // Fetch error emails (failed conversion)
    const { data: errorEmails = [] } = useQuery({
        queryKey: ['scottErrorEmails'],
        queryFn: () => base44.entities.ScottMessage.filter({ status: 'error' }),
        refetchInterval: 5000
    });

    // Fetch gig offers to see what was created
    const { data: recentOffers = [] } = useQuery({
        queryKey: ['scottRecentOffers'],
        queryFn: async () => {
            const offers = await base44.entities.ScottGigOffer.list('-created_date', 20);
            return offers;
        },
        refetchInterval: 5000
    });

    // Manual sync trigger
    const manualSync = async () => {
        setManualSyncRunning(true);
        try {
            await base44.functions.invoke('syncScottInbox', {});
            await refetchPending();
        } catch (error) {
            alert('Sync error: ' + error.message);
        }
        setManualSyncRunning(false);
    };

    const syncRate = syncedEmails.length > 0 
        ? Math.round((syncedEmails.length / (syncedEmails.length + errorEmails.length)) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-black text-cyan-400 font-mono mb-2">EMAIL SYNC DIAGNOSTICS</h1>
                <p className="text-gray-600 text-sm font-mono">Live monitoring • Auto-refresh</p>
            </div>

            {/* STATUS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 text-center">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-xs font-mono mb-1">PENDING</p>
                    <p className="text-white text-2xl font-black font-mono">{pendingEmails.length}</p>
                </div>
                <div className="bg-black border-2 border-green-500 rounded-lg p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-xs font-mono mb-1">SYNCED</p>
                    <p className="text-white text-2xl font-black font-mono">{syncedEmails.length}</p>
                </div>
                <div className="bg-black border-2 border-red-500 rounded-lg p-4 text-center">
                    <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-xs font-mono mb-1">ERRORS</p>
                    <p className="text-white text-2xl font-black font-mono">{errorEmails.length}</p>
                </div>
                <div className="bg-black border-2 border-purple-500 rounded-lg p-4 text-center">
                    <Zap className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-xs font-mono mb-1">SUCCESS RATE</p>
                    <p className="text-white text-2xl font-black font-mono">{syncRate}%</p>
                </div>
            </div>

            {/* MANUAL SYNC BUTTON */}
            <button
                onClick={manualSync}
                disabled={manualSyncRunning}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-black py-4 rounded-lg mb-8 flex items-center justify-center gap-2 font-mono"
            >
                <RefreshCw className={`w-5 h-5 ${manualSyncRunning ? 'animate-spin' : ''}`} />
                {manualSyncRunning ? 'SYNCING...' : 'SYNC NOW'}
            </button>

            {/* PENDING EMAILS - WHAT'S WAITING */}
            <div className="mb-8">
                <h2 className="text-cyan-400 font-black font-mono mb-3">PENDING ({pendingEmails.length})</h2>
                {pendingEmails.length === 0 ? (
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-mono">All clear ✓</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {pendingEmails.map(email => (
                            <div key={email.id} className="bg-black border-2 border-cyan-500/50 rounded-lg p-3">
                                <p className="text-white font-bold text-sm mb-1 font-mono">{email.subject}</p>
                                <p className="text-gray-600 text-xs font-mono">
                                    From: {email.from} • {new Date(email.created_date).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ERROR EMAILS - WHY THEY FAILED */}
            {errorEmails.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-red-400 font-black font-mono mb-3">ERRORS ({errorEmails.length})</h2>
                    <div className="space-y-2">
                        {errorEmails.map(email => (
                            <div key={email.id} className="bg-black border-2 border-red-500/50 rounded-lg p-3">
                                <p className="text-white font-bold text-sm mb-1 font-mono">{email.subject}</p>
                                <p className="text-red-400 text-xs font-mono mb-1">
                                    <Bug className="w-3 h-3 inline mr-1" />
                                    {email.error_details || 'Unknown error'}
                                </p>
                                <p className="text-gray-600 text-xs font-mono">
                                    {new Date(email.updated_date).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* RECENT OFFERS CREATED */}
            <div>
                <h2 className="text-green-400 font-black font-mono mb-3">RECENT OFFERS CREATED ({recentOffers.length})</h2>
                {recentOffers.length === 0 ? (
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-mono">No offers yet</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {recentOffers.slice(0, 10).map(offer => (
                            <div key={offer.id} className="bg-black border-2 border-green-500/50 rounded-lg p-3">
                                <p className="text-white font-bold text-sm font-mono">{offer.venue}</p>
                                <p className="text-green-400 text-xs font-mono">
                                    {offer.date} • £{offer.fee?.toLocaleString()}
                                </p>
                                <p className="text-gray-600 text-xs font-mono">
                                    {offer.city}, {offer.country}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}