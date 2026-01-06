import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileText, Scale, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ADMIN DASHBOARD - CONTRACTS & LEGAL
 * Shows contract status, legal docs, quick access
 */

export default function ScottLiveAdmin() {
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
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-amber-500">
                <Link to={createPageUrl(`ScottLive?id=${artistId}`)} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">BACK TO LIVE</span>
                </Link>
                <h1 className="text-3xl font-black text-amber-400 font-mono">ADMIN</h1>
                <p className="text-gray-500 text-sm font-mono">Contracts • Legal • Documents</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4"
                >
                    <Shield className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-green-400 font-black text-2xl font-mono">{active}</p>
                    <p className="text-green-300 text-xs font-mono">ACTIVE</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500 rounded-lg p-4"
                >
                    <TrendingUp className="w-6 h-6 text-amber-400 mb-2" />
                    <p className="text-amber-400 font-black text-2xl font-mono">{pending}</p>
                    <p className="text-amber-300 text-xs font-mono">PENDING</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-gray-500/20 to-slate-500/20 border-2 border-gray-500 rounded-lg p-4"
                >
                    <FileText className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-gray-400 font-black text-2xl font-mono">{expired}</p>
                    <p className="text-gray-300 text-xs font-mono">EXPIRED</p>
                </motion.div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottContracts?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        VIEW CONTRACTS
                    </motion.button>
                </Link>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    <Scale className="w-5 h-5" />
                    LEGAL DOCS
                    <span className="text-xs bg-amber-500 px-2 py-1 rounded">COMING SOON</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    <Shield className="w-5 h-5" />
                    INSURANCE
                    <span className="text-xs bg-amber-500 px-2 py-1 rounded">COMING SOON</span>
                </motion.button>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Admin</p>
            </div>
        </div>
    );
}