import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileText, Scale, Shield } from 'lucide-react';

/**
 * ADMIN - CLEAN CYAN DESIGN
 * Matching Calendar's soul - simple, breathable, clear
 */

export default function ScottLiveAdmin() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    React.useEffect(() => {
        document.title = 'CB51 • Admin';
        
        // CB51 theme color
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        metaTheme.content = '#06b6d4';
    }, []);

    const { data: contracts = [] } = useQuery({
        queryKey: ['scottContracts', artistId],
        queryFn: () => base44.entities.ScottContract.filter(artistId ? { artist_id: artistId } : {}),
    });

    const active = contracts.filter(c => c.status === 'active').length;
    const pending = contracts.filter(c => c.status === 'pending').length;
    const expired = contracts.filter(c => c.status === 'expired').length;

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            {/* CLEAN HEADER */}
            <button
                onClick={() => navigate(createPageUrl(`ScottLive${artistId ? `?id=${artistId}` : ''}`))}
                className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider">Back</span>
            </button>

            {/* BIG CYAN TITLE */}
            <div className="mb-8">
                <h1 className="text-4xl font-black text-cyan-400 mb-2 font-mono tracking-tight">CONTRACTS & DOCS</h1>
                <p className="text-gray-600 text-sm font-mono">Legal • Contracts • Insurance</p>
            </div>

            {/* SIMPLE STATS */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-900/40 rounded-xl p-5 border border-gray-800">
                    <p className="text-3xl font-bold text-white mb-1 font-mono">{active}</p>
                    <p className="text-xs text-gray-600 font-mono uppercase tracking-wider">Active</p>
                </div>
                <div className="bg-gray-900/40 rounded-xl p-5 border border-gray-800">
                    <p className="text-3xl font-bold text-white mb-1 font-mono">{pending}</p>
                    <p className="text-xs text-gray-600 font-mono uppercase tracking-wider">Pending</p>
                </div>
                <div className="bg-gray-900/40 rounded-xl p-5 border border-gray-800">
                    <p className="text-3xl font-bold text-white mb-1 font-mono">{expired}</p>
                    <p className="text-xs text-gray-600 font-mono uppercase tracking-wider">Expired</p>
                </div>
            </div>

            {/* CLEAN NAVIGATION */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottLegalDocs${artistId ? `?id=${artistId}` : ''}`)}>
                    <div className="bg-gray-900/40 hover:bg-gray-900/60 border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <FileText className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                            <div>
                                <p className="text-white font-mono text-base">Legal & Contracts</p>
                                <p className="text-gray-600 text-xs font-mono mt-0.5">All legal docs + contracts</p>
                            </div>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-gray-500 rotate-180 transition-all" />
                    </div>
                </Link>

                <Link to={createPageUrl(`ScottInsurance${artistId ? `?id=${artistId}` : ''}`)}>
                    <div className="bg-gray-900/40 hover:bg-gray-900/60 border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <Shield className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                            <div>
                                <p className="text-white font-mono text-base">Insurance</p>
                                <p className="text-gray-600 text-xs font-mono mt-0.5">Policies and coverage</p>
                            </div>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-gray-500 rotate-180 transition-all" />
                    </div>
                </Link>

                <Link to={createPageUrl(`ScottInvoices${artistId ? `?id=${artistId}` : ''}`)}>
                    <div className="bg-gray-900/40 hover:bg-gray-900/60 border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <FileText className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                            <div>
                                <p className="text-white font-mono text-base">Live Invoices</p>
                                <p className="text-gray-600 text-xs font-mono mt-0.5">Gig invoices from promoters</p>
                            </div>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-gray-500 rotate-180 transition-all" />
                    </div>
                </Link>
            </div>

            {/* SUBTLE MARK */}
            <div className="mt-12 text-center">
                <p className="text-xs text-gray-800 font-mono">CB51 • Admin</p>
            </div>
        </div>
    );
}