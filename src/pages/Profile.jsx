import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Send } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';
import { formatDistanceToNow } from 'date-fns';
import COOLASFUCKIcon from '@/components/shared/COOLASFUCKIcon';
// QRWallet removed - keeping it simple
import P2PTransfer from '@/components/shared/P2PTransfer';
import { BitGlobe, BitHeart, BitGift, BitSend } from '@/components/shared/ActivityIcons';
import { getAllBonuses, verifyBonusChain } from '@/components/cleanup/MicroLitterBonusTracker';

// 8-BIT BUTTON TAP FREQUENCY - COOLASFUCK
const playButtonTap = () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1320, audioContext.currentTime + 0.05);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialDecayTo = 0.01;
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported
    }
};

export default function ProfilePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const [showP2P, setShowP2P] = useState(false);
    const [showStatDetail, setShowStatDetail] = useState(null); // 'cleanups', 'weight', 'love', 'missions'

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['profileUser'],
        queryFn: () => base44.auth.me(),
        refetchInterval: 5000, // Real-time: refresh every 5s
    });

    const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
        queryKey: ['profileTransactions'],
        queryFn: async () => {
            if (!user) return [];
            return await base44.entities.Transaction.filter({
                $or: [
                    { from_user: user.email },
                    { to_user: user.email },
                    { created_by: user.email }
                ]
            }, '-created_date', 50);
        },
        enabled: !!user,
        refetchInterval: 10000, // Real-time: refresh every 10s
    });

    const { data: cleanups = [], isLoading: cleanupsLoading } = useQuery({
        queryKey: ['profileCleanups'],
        queryFn: async () => {
            if (!user) return [];
            // YOUR CLEANUPS ONLY (not everyone's)
            return await base44.entities.Cleanup.filter({ created_by: user.email }, '-created_date', 100);
        },
        enabled: !!user,
        refetchInterval: 10000,
    });

    const { data: proofs = [], isLoading: proofsLoading } = useQuery({
        queryKey: ['profileProofs'],
        queryFn: async () => {
            if (!user) return [];
            // YOUR PROOFS ONLY (not everyone's)
            return await base44.entities.ProofOfLove.filter({ created_by: user.email }, '-created_date', 100);
        },
        enabled: !!user,
        refetchInterval: 10000,
    });

    // MICRO-LITTER BONUS TRACKING
    const bonuses = getAllBonuses();
    const totalBonusTokens = bonuses.reduce((sum, b) => sum + (b.bonusTokens || 0), 0);
    const bonusChainValid = verifyBonusChain();
    const microLitterCount = bonuses.length;

    const combinedActivity = [
        ...transactions.map(t => ({
            ...t,
            id: `tx-${t.id}`, // Ensure unique IDs for combining
            type: 'transaction',
            date: new Date(t.created_date)
        })),
        ...cleanups.map(c => ({
            ...c,
            id: `cleanup-${c.id}`, // Ensure unique IDs
            type: 'cleanup',
            date: new Date(c.created_date)
        })),
        ...proofs.map(p => ({
            ...p,
            id: `proof-${p.id}`, // Ensure unique IDs
            type: 'proof',
            date: new Date(p.created_date)
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Use getTime() for date comparison

    const paginatedActivity = combinedActivity.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(combinedActivity.length / itemsPerPage);

    // AUTO BALANCE VERIFICATION - P51 from genesis (1:1 forever )
    useEffect(() => {
        const verifyBalance = async () => {
            if (!user || !transactions) return;
            
            try {
                // ALL YOUR CLEANUPS (from day 1 to now)
                const myCleanups = await base44.entities.Cleanup.filter({ created_by: user.email });
                const earned_cleanups = myCleanups.reduce((sum, c) => sum + (c.tokens_awarded || 0), 0);
                
                // ALL YOUR PROOFS
                const myProofs = await base44.entities.ProofOfLove.filter({ created_by: user.email });
                const earned_proofs = myProofs.reduce((sum, p) => sum + (p.p51_awarded || 0), 0);
                
                // ALL INCOMING (received, earned from others)
                const incoming = transactions.filter(t => 
                    t.to_user === user.email && t.from_user !== user.email
                ).reduce((sum, t) => sum + (t.p51_amount || 0), 0);
                
                // ALL OUTGOING (sent to others)
                const outgoing = transactions.filter(t => 
                    t.from_user === user.email && t.to_user !== user.email
                ).reduce((sum, t) => sum + (t.p51_amount || 0), 0);
                
                // TRUE BALANCE (P51 1:1, always has been )
                const trueBalance = earned_cleanups + earned_proofs + incoming - outgoing;
                
                // Auto-fix if wrong (silent, automatic)
                if (Math.abs(trueBalance - (user.p51_balance || 0)) > 0.01) {
                    console.log('Balance auto-corrected:', {
                        was: user.p51_balance,
                        now: trueBalance,
                        breakdown: { earned_cleanups, earned_proofs, incoming, outgoing }
                    });
                    
                    await base44.auth.updateMe({ p51_balance: trueBalance });
                }
            } catch (error) {
                console.error('Balance verification:', error);
            }
        };
        
        verifyBalance();
    }, [user?.email, transactions]);

    if (userLoading) {
        return <QuantumLoader />;
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white flex items-center justify-center p-6">
                <Card className="bg-black/60 border-2 border-red-500/50 max-w-md">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                        <p className="text-gray-300 mb-6">Please sign in to view your profile.</p>
                        <Button onClick={() => base44.auth.redirectToLogin()} className="bg-red-600 hover:bg-red-700">
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // ACCURATE NUMBERS - From YOUR data only
    const totalWeightCleaned = cleanups.reduce((sum, c) => sum + (c.litter_weight || 0), 0);
    const totalCleanups = cleanups.length;
    const totalLoveActs = proofs.length;
    const totalMissions = user.missions_funded || 0;

    const getTransactionStyle = (transaction) => {
        if (!transaction || !transaction.transaction_type) {
            return { bg: 'from-gray-800/40 to-gray-700/40', border: 'border-gray-500', text: 'text-gray-300' };
        }
        switch (transaction.transaction_type) {
            case 'earned':
                return { bg: 'from-green-900/40 to-emerald-900/40', border: 'border-green-500', text: 'text-green-300' };
            case 'sent':
                return { bg: 'from-orange-900/40 to-red-900/40', border: 'border-orange-500', text: 'text-orange-300' };
            case 'received':
                return { bg: 'from-cyan-900/40 to-blue-900/40', border: 'border-cyan-500', text: 'text-cyan-300' };
            default:
                return { bg: 'from-purple-900/40 to-pink-900/40', border: 'border-purple-500', text: 'text-purple-300' };
        }
    };

    const totalEarned = transactions.filter(t => t.transaction_type === 'earned' || t.to_user === user.email).reduce((sum, t) => sum + (t.p51_amount || 0), 0);
    const totalShared = transactions.filter(t => t.from_user === user.email).reduce((sum, t) => sum + (t.p51_amount || 0), 0);


    return (
            <div className="min-h-screen bg-black text-white p-6 pb-32">
                {/* QUANTUM FIELD BACKGROUND */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: `radial-gradient(circle, ${['#22d3ee', '#a855f7', '#ec4899'][Math.floor(Math.random() * 3)]}, transparent)`
                            }}
                            animate={{
                                scale: [0, 1.5, 0],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-6 relative z-10">

                    {/* WALLET - 8-BIT */}
                    <Card className="bg-black border-4 border-cyan-500">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-black font-mono text-cyan-400">YOUR BALANCE</h3>
                            </div>
                            
                            <div className="border-2 border-cyan-500/50 bg-black/60 p-4 space-y-3">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl md:text-5xl font-black font-mono text-cyan-400">
                                        {(user.p51_balance || 0).toFixed(1)}
                                    </p>
                                    <span className="text-base font-mono text-cyan-400">P51</span>
                                </div>
                                {microLitterCount > 0 && (
                                    <div className="border-t border-cyan-500/30 pt-3 space-y-1">
                                        <p className="text-amber-400 font-mono text-sm font-black">🌟 MICRO-LITTER BONUS</p>
                                        <p className="text-white/80 font-mono text-xs">
                                            {microLitterCount} cleanups • +{totalBonusTokens.toFixed(1)} P51 bonus
                                        </p>
                                        <p className={`text-xs font-mono ${bonusChainValid.valid ? 'text-green-400' : 'text-red-400'}`}>
                                            {bonusChainValid.valid ? '✓ Verified unfuckable' : '⚠️ Chain integrity check'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* ACTIONS - 8-BIT CLEAN */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { playButtonTap(); setShowP2P(true); }}
                                    className="bg-black border-2 border-amber-500 hover:border-amber-400 text-amber-400 py-4 font-black font-mono text-sm flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <Send className="w-6 h-6" />
                                    SEND
                                </button>
                                
                                <button
                                    onClick={() => { playButtonTap(); navigate(createPageUrl('NewCleanup')); }}
                                    className="bg-black border-2 border-green-500 hover:border-green-400 text-green-400 py-4 font-black font-mono text-sm flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <BitGlobe size={24} animate={false} />
                                    EARN
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                {/* SEND MODAL - SIMPLE 8-BIT */}
                <AnimatePresence>
                    {showP2P && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-black/95 flex items-start justify-center pt-16 px-4 overflow-y-auto"
                            onClick={() => setShowP2P(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: -20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: -20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-sm pb-8"
                            >
                                <div className="bg-black border-4 border-cyan-500 p-5 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-black font-mono text-cyan-400">SEND P51</h2>
                                        <button
                                            onClick={() => { playButtonTap(); setShowP2P(false); }}
                                            className="text-cyan-400 hover:text-white text-2xl font-black"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* YOUR QR - THEY SCAN THIS */}
                                    <div className="text-center">
                                        <p className="text-green-400 text-xs font-mono font-black mb-2">THEY SCAN YOU</p>
                                        <div className="bg-white p-2 rounded inline-block">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(user.email)}`}
                                                alt="Your QR" 
                                                className="w-28 h-28"
                                            />
                                        </div>
                                        <p className="text-white/60 text-xs font-mono mt-1">{user.full_name || user.email}</p>
                                    </div>

                                    <div className="border-t border-cyan-500/30 pt-4">
                                        <p className="text-amber-400 text-xs font-mono font-black mb-3">OR TYPE EMAIL</p>
                                        <P2PTransfer 
                                            userBalance={user.p51_balance || 0}
                                            onSuccess={() => setShowP2P(false)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* WHAT YOU'VE DONE - 8-BIT CLICKABLE */}
                <motion.div 
                    className="border-4 border-cyan-500 bg-black/80 p-6"
                    animate={{
                        boxShadow: [
                            '0 0 15px rgba(34, 211, 238, 0.3)',
                            '0 0 30px rgba(34, 211, 238, 0.5)',
                            '0 0 15px rgba(34, 211, 238, 0.3)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <p className="text-cyan-400 text-sm font-black font-mono mb-4">WHAT YOU'VE DONE</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                        <button 
                            onClick={() => { playButtonTap(); setShowStatDetail('weight'); }}
                            className="text-center bg-black/60 border-2 border-green-500/50 hover:border-green-500 p-4 transition-all active:scale-95"
                        >
                            <p className="text-4xl md:text-5xl font-black font-mono text-green-400"
                               style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}>
                                {totalWeightCleaned.toFixed(1)}
                            </p>
                            <p className="text-xs text-white/60 mt-2 font-mono">kg Cleaned</p>
                        </button>

                        <button 
                            onClick={() => { playButtonTap(); setShowStatDetail('cleanups'); }}
                            className="text-center bg-black/60 border-2 border-cyan-500/50 hover:border-cyan-500 p-4 transition-all active:scale-95"
                        >
                            <p className="text-4xl md:text-5xl font-black font-mono text-cyan-400"
                               style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}>
                                {totalCleanups}
                            </p>
                            <p className="text-xs text-white/60 mt-2 font-mono">Cleanups</p>
                        </button>

                        <button 
                            onClick={() => { playButtonTap(); setShowStatDetail('love'); }}
                            className="text-center bg-black/60 border-2 border-pink-500/50 hover:border-pink-500 p-4 transition-all active:scale-95"
                        >
                            <p className="text-4xl md:text-5xl font-black font-mono text-pink-400"
                               style={{ textShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}>
                                {totalLoveActs}
                            </p>
                            <p className="text-xs text-white/60 mt-2 font-mono">Love Acts</p>
                        </button>

                        <button 
                            onClick={() => { playButtonTap(); setShowStatDetail('missions'); }}
                            className="text-center bg-black/60 border-2 border-amber-500/50 hover:border-amber-500 p-4 transition-all active:scale-95"
                        >
                            <p className="text-4xl md:text-5xl font-black font-mono text-amber-400"
                               style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
                                {totalMissions}
                            </p>
                            <p className="text-xs text-white/60 mt-2 font-mono">Missions</p>
                        </button>
                    </div>
                </motion.div>

                {/* STAT DETAIL MODAL */}
                <AnimatePresence>
                    {showStatDetail && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
                            onClick={() => setShowStatDetail(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-2xl w-full max-h-[80vh] overflow-auto"
                            >
                                <Card className={`border-4 ${
                                    showStatDetail === 'weight' ? 'border-green-500 bg-gradient-to-br from-green-900/40 to-emerald-900/40' :
                                    showStatDetail === 'cleanups' ? 'border-cyan-500 bg-gradient-to-br from-cyan-900/40 to-blue-900/40' :
                                    showStatDetail === 'love' ? 'border-pink-500 bg-gradient-to-br from-pink-900/40 to-rose-900/40' :
                                    'border-amber-500 bg-gradient-to-br from-amber-900/40 to-orange-900/40'
                                }`}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className={`text-2xl font-black font-mono ${
                                                showStatDetail === 'weight' ? 'text-green-400' :
                                                showStatDetail === 'cleanups' ? 'text-cyan-400' :
                                                showStatDetail === 'love' ? 'text-pink-400' :
                                                'text-amber-400'
                                            }`}>
                                                {showStatDetail === 'weight' && 'WEIGHT CLEANED'}
                                                {showStatDetail === 'cleanups' && 'YOUR CLEANUPS'}
                                                {showStatDetail === 'love' && 'LOVE ACTS'}
                                                {showStatDetail === 'missions' && 'MISSIONS FUNDED'}
                                            </h3>
                                            <Button
                                                onClick={() => setShowStatDetail(null)}
                                                variant="ghost"
                                                className="text-white/60 hover:text-white"
                                            >
                                                ✕
                                            </Button>
                                        </div>

                                        {showStatDetail === 'weight' && (
                                            <div className="space-y-4">
                                                <p className="text-6xl font-black font-mono text-green-400 text-center mb-4">
                                                    {totalWeightCleaned.toFixed(1)} kg
                                                </p>
                                                <div className="space-y-2">
                                                    {cleanups.slice(0, 10).map(c => (
                                                        <div key={c.id} className="bg-black/60 border-2 border-green-500/30 p-3">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-white font-mono">{c.location || 'Earth'}</span>
                                                                <span className="text-green-400 font-black font-mono">{c.litter_weight}kg</span>
                                                            </div>
                                                            <p className="text-xs text-gray-400 font-mono">{new Date(c.created_date).toLocaleDateString()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {showStatDetail === 'cleanups' && (
                                            <div className="space-y-4">
                                                <p className="text-6xl font-black font-mono text-cyan-400 text-center mb-4">
                                                    {totalCleanups}
                                                </p>
                                                <div className="space-y-3">
                                                    {cleanups.slice(0, 10).map(c => (
                                                        <div key={c.id} className="bg-black/60 border-2 border-cyan-500/30 p-3 space-y-2">
                                                            {c.photo_url ? (
                                                                <img 
                                                                    src={c.photo_url} 
                                                                    alt="Cleanup photo" 
                                                                    className="w-full h-32 object-cover rounded border-2 border-cyan-500/50"
                                                                    loading="lazy"
                                                                    onError={(e) => {
                                                                        e.target.outerHTML = '<div class="w-full h-32 bg-gradient-to-br from-cyan-900/40 to-green-900/40 flex items-center justify-center rounded border-2 border-cyan-500/50"><svg class="w-12 h-12 text-cyan-500/40" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/></svg></div>';
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-white font-mono">{c.cleanup_type || 'Cleanup'}</span>
                                                                <span className="text-cyan-400 font-black font-mono">+{c.tokens_awarded} P51</span>
                                                            </div>
                                                            <p className="text-xs text-gray-400 font-mono">{c.location} • {new Date(c.created_date).toLocaleDateString()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {showStatDetail === 'love' && (
                                            <div className="space-y-4">
                                                <p className="text-6xl font-black font-mono text-pink-400 text-center mb-4">
                                                    {totalLoveActs}
                                                </p>
                                                <div className="space-y-2">
                                                    {proofs.slice(0, 10).map(p => (
                                                        <div key={p.id} className="bg-black/60 border-2 border-pink-500/30 p-3">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-white font-mono">{p.love_type?.replace(/_/g, ' ') || 'Love Act'}</span>
                                                                <span className="text-pink-400 font-black font-mono">+{p.p51_awarded} P51</span>
                                                            </div>
                                                            <p className="text-xs text-gray-400 font-mono truncate">{p.description}</p>
                                                            <p className="text-xs text-gray-400 font-mono">{new Date(p.created_date).toLocaleDateString()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {showStatDetail === 'missions' && (
                                            <div className="space-y-4">
                                                <p className="text-6xl font-black font-mono text-amber-400 text-center mb-4">
                                                    {totalMissions}
                                                </p>
                                                <div className="bg-black/60 border-2 border-amber-500/30 p-6 text-center">
                                                    <p className="text-white font-mono mb-2">
                                                        Missions coming soon
                                                    </p>
                                                    <p className="text-sm text-gray-400 font-mono">
                                                        Water, food, shelter for those who need it most
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* RECENT ACTIVITY - 8-BIT */}
                <motion.div 
                    className="border-4 border-cyan-500 bg-black/80 p-6"
                    animate={{
                        boxShadow: [
                            '0 0 15px rgba(34, 211, 238, 0.3)',
                            '0 0 30px rgba(34, 211, 238, 0.5)',
                            '0 0 15px rgba(34, 211, 238, 0.3)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <p className="text-cyan-400 text-sm font-black font-mono mb-4">RECENT ACTIVITY</p>
                    <div className="space-y-3">
                        {transactionsLoading || cleanupsLoading || proofsLoading ? (
                            <div className="text-center py-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <COOLASFUCKIcon size={60} />
                                </motion.div>
                            </div>
                        ) : paginatedActivity.length === 0 ? (
                            <div className="text-center py-12">
                                <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400">No activity yet. Start your journey!</p>
                            </div>
                        ) : (
                            <>
                                {paginatedActivity.map((activity, index) => {
                                    const isTransaction = activity.type === 'transaction';
                                    const isCleanup = activity.type === 'cleanup';
                                    const isProof = activity.type === 'proof';
                                    const isReceived = isTransaction && (activity.transaction_type === 'received' || activity.to_user === user.email);
                                    const isSent = isTransaction && (activity.transaction_type === 'sent' || activity.from_user === user.email);
                                    const isEarned = isTransaction && activity.transaction_type === 'earned';

                                    return (
                                        <motion.div
                                            key={`${activity.type}-${activity.id}-${index}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`relative overflow-hidden rounded-lg border-4 ${
                                                isCleanup ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500' :
                                                isProof ? 'bg-gradient-to-r from-pink-900/30 to-rose-900/30 border-pink-500' :
                                                isReceived || isEarned ? 'bg-gradient-to-r from-purple-900/30 to-violet-900/30 border-purple-500' :
                                                'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500'
                                            }`}
                                        >
                                            {/* 8-BIT SCANLINE EFFECT */}
                                            <div className="absolute inset-0 pointer-events-none">
                                                <div className="absolute inset-0 opacity-10" style={{
                                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                                                }} />
                                            </div>

                                            <div className="relative p-5">
                                               <div className="flex items-start justify-between gap-4">
                                                   <div className="flex items-start gap-4 flex-1 min-w-0">
                                                       {/* 8-BIT ICON */}
                                                       <div className="flex-shrink-0">
                                                           {isCleanup && <BitGlobe size={40} animate={true} />}
                                                           {isProof && <BitHeart size={40} animate={true} />}
                                                           {(isReceived || isEarned) && <BitGift size={40} animate={true} />}
                                                           {isSent && <BitSend size={40} animate={true} />}
                                                       </div>

                                                       <div className="space-y-1 flex-1 min-w-0 overflow-hidden">
                                                           <p className={`text-base md:text-lg font-black font-mono truncate ${
                                                               isCleanup ? 'text-green-300' :
                                                               isProof ? 'text-pink-300' :
                                                               isReceived || isEarned ? 'text-purple-300' :
                                                               'text-cyan-300'
                                                           }`}>
                                                               {isCleanup && `${activity.litter_weight}kg CLEANED`}
                                                               {isProof && (activity.love_type?.replace(/_/g, ' ')?.toUpperCase() || 'PROOF OF LOVE')}
                                                               {isEarned && 'EARNED'}
                                                               {isReceived && 'RECEIVED'}
                                                               {isSent && 'SENT'}
                                                           </p>

                                                           <p className="text-white/80 text-sm font-mono truncate">
                                                               {isCleanup && `${activity.location || 'Earth'}`}
                                                               {isProof && activity.description?.slice(0, 50)}
                                                               {isTransaction && (activity.reason || activity.transaction_type)}
                                                           </p>

                                                           <p className="text-white/50 text-xs font-mono truncate">
                                                               {formatDistanceToNow(activity.date, { addSuffix: true })}
                                                           </p>
                                                       </div>
                                                   </div>

                                                   {/* TOKEN AMOUNT - 8-BIT STYLE */}
                                                   <div className="flex-shrink-0">
                                                       <div className={`px-3 py-2 border-4 ${
                                                           isCleanup ? 'bg-green-500 border-green-400 text-black' :
                                                           isProof ? 'bg-pink-500 border-pink-400 text-black' :
                                                           isReceived || isEarned ? 'bg-purple-500 border-purple-400 text-black' :
                                                           'bg-cyan-500 border-cyan-400 text-black'
                                                       } font-black font-mono text-lg md:text-xl whitespace-nowrap`}>
                                                           {isCleanup && `+${activity.tokens_awarded || 0}`}
                                                           {isProof && `+${activity.p51_awarded || 0}`}
                                                           {isTransaction && `${isSent ? '-' : '+'}${activity.p51_amount || 0}`}
                                                       </div>
                                                       <p className="text-center text-xs text-white/60 font-mono mt-1">P51</p>
                                                   </div>
                                               </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </>
                        )}
                    </div>

                    {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <Button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    variant="outline"
                                    className="border-cyan-500/30"
                                >
                                    Previous
                                </Button>
                                <span className="text-gray-400 text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    variant="outline"
                                    className="border-cyan-500/30"
                                >
                                    Next
                                </Button>
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
}