import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileText, Scale, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ADMIN - 2001 SPACE ODYSSEY INSPIRED
 * Monolithic clarity, cosmic depth, timeless precision
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
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
            
            {/* COSMIC HEADER */}
            <div className="border-b border-white/5 bg-black/80 backdrop-blur-2xl sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-8 py-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(createPageUrl(`ScottLive${artistId ? `?id=${artistId}` : ''}`))}
                        className="flex items-center gap-3 text-gray-600 hover:text-gray-400 transition-all duration-300"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono tracking-wider uppercase">Back</span>
                    </button>
                    <h1 className="text-sm font-mono tracking-[0.3em] text-gray-400 uppercase">Admin</h1>
                    <div className="w-20"></div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-8 py-16">

                {/* MONOLITHIC STATS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-3 gap-6 mb-20"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl p-8 border border-white/5 backdrop-blur-xl">
                            <p className="text-5xl font-light text-white mb-3 font-mono tracking-tight">{active}</p>
                            <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Active</p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl p-8 border border-white/5 backdrop-blur-xl">
                            <p className="text-5xl font-light text-white mb-3 font-mono tracking-tight">{pending}</p>
                            <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Pending</p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl p-8 border border-white/5 backdrop-blur-xl">
                            <p className="text-5xl font-light text-white mb-3 font-mono tracking-tight">{expired}</p>
                            <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Expired</p>
                        </div>
                    </div>
                </motion.div>

                {/* GEOMETRIC NAVIGATION */}
                <div className="space-y-4">
                    <Link to={createPageUrl(`ScottContracts${artistId ? `?id=${artistId}` : ''}`)}>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20">
                                            <FileText className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-base font-mono text-white mb-1">Contracts</p>
                                            <p className="text-[10px] text-gray-600 font-mono tracking-wider uppercase">View and manage</p>
                                        </div>
                                    </div>
                                    <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-gray-500 rotate-180 transition-all duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to={createPageUrl(`ScottLegalDocs${artistId ? `?id=${artistId}` : ''}`)}>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-500 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20">
                                            <Scale className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-base font-mono text-white mb-1">Legal Docs</p>
                                            <p className="text-[10px] text-gray-600 font-mono tracking-wider uppercase">View and manage</p>
                                        </div>
                                    </div>
                                    <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-gray-500 rotate-180 transition-all duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to={createPageUrl(`ScottInsurance${artistId ? `?id=${artistId}` : ''}`)}>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-green-500/30 transition-all duration-500 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20">
                                            <Shield className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-base font-mono text-white mb-1">Insurance</p>
                                            <p className="text-[10px] text-gray-600 font-mono tracking-wider uppercase">View and manage</p>
                                        </div>
                                    </div>
                                    <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-gray-500 rotate-180 transition-all duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>

                {/* VOID MARK */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-24 text-center"
                >
                    <p className="text-[8px] text-gray-800 font-mono tracking-[0.4em] uppercase">CB51</p>
                </motion.div>
            </div>
        </div>
    );
}