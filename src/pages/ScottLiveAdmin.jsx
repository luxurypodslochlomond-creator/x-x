import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileText, Scale, Shield } from 'lucide-react';

/**
 * ADMIN - PROFESSIONAL MINIMAL DESIGN
 * Clean, spacious, industry-ready
 */

export default function ScottLiveAdmin() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: contracts = [] } = useQuery({
        queryKey: ['scottContracts', artistId],
        queryFn: () => base44.entities.ScottContract.filter(artistId ? { artist_id: artistId } : {}),
    });

    const active = contracts.filter(c => c.status === 'active').length;
    const pending = contracts.filter(c => c.status === 'pending').length;
    const expired = contracts.filter(c => c.status === 'expired').length;

    return (
        <div className="min-h-screen bg-black text-white">
            
            {/* CLEAN HEADER */}
            <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(createPageUrl(`ScottLive${artistId ? `?id=${artistId}` : ''}`))}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Back</span>
                    </button>
                    <h1 className="text-base font-semibold text-white">Admin</h1>
                    <div className="w-16"></div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* MINIMAL STATS */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                        <p className="text-2xl font-semibold text-white mb-1">{active}</p>
                        <p className="text-xs text-gray-500">Active</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                        <p className="text-2xl font-semibold text-white mb-1">{pending}</p>
                        <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                        <p className="text-2xl font-semibold text-white mb-1">{expired}</p>
                        <p className="text-xs text-gray-500">Expired</p>
                    </div>
                </div>

                {/* CLEAN SECTIONS */}
                <div className="space-y-2">
                    <Link to={createPageUrl(`ScottContracts${artistId ? `?id=${artistId}` : ''}`)}>
                        <div className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                <div>
                                    <p className="text-sm font-medium text-white">Contracts</p>
                                    <p className="text-xs text-gray-500 mt-0.5">View and manage</p>
                                </div>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-400 rotate-180 transition-colors" />
                        </div>
                    </Link>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 opacity-40">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Scale className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-white">Legal Docs</p>
                                    <p className="text-xs text-gray-600 mt-0.5">Coming soon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 opacity-40">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-white">Insurance</p>
                                    <p className="text-xs text-gray-600 mt-0.5">Coming soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SUBTLE CB51 MARK */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-700">CB51</p>
                </div>
            </div>
        </div>
    );
}