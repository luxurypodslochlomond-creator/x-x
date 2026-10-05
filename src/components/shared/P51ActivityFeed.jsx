import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Globe, Zap, X, Leaf } from 'lucide-react';

export default function P51ActivityFeed({ limit = 5 }) {
    const [selectedCleanup, setSelectedCleanup] = useState(null);
    const [imageError, setImageError] = useState(false);

    const { data: cleanups = [] } = useQuery({
        queryKey: ['recent-cleanups', limit],
        queryFn: () => base44.entities.Cleanup.list('-created_date', limit),
        refetchInterval: 30000
    });

    const getTimeAgo = (dateString) => {
        if (!dateString) return '';
        const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    const openModal = (cleanup) => {
        setImageError(false);
        setSelectedCleanup(cleanup);
    };

    const closeModal = () => {
        setSelectedCleanup(null);
    };

    // Don't render if no cleanups
    if (!cleanups || cleanups.length === 0) {
        return (
            <div className="bg-black border-4 border-cyan-500 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-black font-mono text-cyan-400">LIVE ACTIVITY</h3>
                </div>
                <div className="text-center py-8">
                    <Leaf className="w-12 h-12 text-green-400/50 mx-auto mb-3" />
                    <p className="text-gray-500 font-mono text-sm">No cleanups yet - be the first!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black border-4 border-cyan-500 p-6">
            <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-black font-mono text-cyan-400">LIVE ACTIVITY</h3>
            </div>

            <div className="space-y-3">
                {cleanups.map((cleanup) => (
                    <div
                        key={cleanup.id}
                        onClick={() => openModal(cleanup)}
                        className="bg-black/60 border-2 border-cyan-500/30 hover:border-cyan-500 p-3 cursor-pointer transition-all active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-mono truncate">
                                    {cleanup.litter_weight || 0}kg in {cleanup.county || cleanup.location || 'Earth'}
                                </p>
                                <p className="text-gray-500 text-xs font-mono">
                                    {getTimeAgo(cleanup.created_date)}
                                    {cleanup.photo_url && <span className="ml-2 text-cyan-400">• tap</span>}
                                </p>
                            </div>
                            <span className="text-green-400 font-mono text-xs font-bold">
                                +{cleanup.tokens_awarded || cleanup.litter_weight || 0}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t-2 border-cyan-500/30 mt-4">
                <p className="text-center text-cyan-400 text-xs font-mono">⚡ Real cleanups • Real P51</p>
            </div>

            {/* Modal - Full screen overlay */}
            {selectedCleanup && (
                <div 
                    className="fixed inset-0 bg-black/95 flex items-center justify-center p-4"
                    style={{ zIndex: 99999 }}
                    onClick={closeModal}
                >
                    <div 
                        className="bg-black border-4 border-green-500 max-w-md w-full p-6 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-black font-mono text-green-400">REAL CLEANUP</h3>
                            <button 
                                onClick={closeModal}
                                className="p-2 bg-white/10 rounded-lg"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Image */}
                        {selectedCleanup.photo_url && !imageError ? (
                            <img
                                src={selectedCleanup.photo_url}
                                alt="Cleanup photo"
                                className="w-full h-48 object-cover border-2 border-green-500/50 mb-4"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-48 bg-green-900/20 flex items-center justify-center border-2 border-green-500/50 mb-4">
                                <Globe className="w-16 h-16 text-green-400/50" />
                            </div>
                        )}

                        {/* Details */}
                        <div className="space-y-3 font-mono text-sm">
                            <p className="text-white">
                                <span className="text-green-400">Weight:</span> {selectedCleanup.litter_weight || 0}kg
                            </p>
                            <p className="text-white">
                                <span className="text-green-400">Location:</span> {selectedCleanup.county || selectedCleanup.location || 'Earth'}
                            </p>
                            {selectedCleanup.cleanup_type && (
                                <p className="text-white">
                                    <span className="text-green-400">Type:</span> {String(selectedCleanup.cleanup_type).replace(/_/g, ' ')}
                                </p>
                            )}
                            {selectedCleanup.notes && (
                                <p className="text-gray-300 italic border-l-2 border-green-500/50 pl-3">
                                    "{selectedCleanup.notes}"
                                </p>
                            )}
                        </div>

                        {/* Earnings */}
                        <div className="bg-green-900/40 border-2 border-green-500 p-4 text-center mt-4">
                            <p className="text-green-400 font-black font-mono text-lg">
                                {selectedCleanup.tokens_awarded || selectedCleanup.litter_weight || 0} P51 EARNED
                            </p>
                        </div>

                        {/* Close button */}
                        <button 
                            onClick={closeModal}
                            className="w-full mt-4 py-3 bg-green-500 text-black font-black font-mono text-lg"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}