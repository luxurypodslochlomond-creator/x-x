import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, DollarSign, CheckCircle, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';

function ScottInvoicesInner() {
    const navigate = useNavigate();
    const scott = useScottOffline();
    
    const [invoices, setInvoices] = useState([]);
    const [artists, setArtists] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [newInvoice, setNewInvoice] = useState({
        artist_id: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        accountant_notes: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setInvoices(scott.getInvoices());
        setArtists(scott.getArtists());
        setLoading(false);
        
        if (scott.isOnline) {
            scott.pullFromServer().then(() => {
                setInvoices(scott.getInvoices());
                setArtists(scott.getArtists());
            });
        }
    }, [scott.isOnline]);

    const handleAddInvoice = () => {
        scott.createInvoice(newInvoice);
        setInvoices(scott.getInvoices());
        setNewInvoice({
            artist_id: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            accountant_notes: ''
        });
        setShowAdd(false);
    };

    const handleTogglePaid = (invoiceId, currentStatus) => {
        scott.updateInvoice(invoiceId, { status: currentStatus === 'paid' ? 'unpaid' : 'paid' });
        setInvoices(scott.getInvoices());
    };

    const getArtistName = (artistId) => {
        const artist = artists.find(a => a.id === artistId);
        return artist ? artist.name : 'Unknown';
    };

    const unpaidInvoices = invoices.filter(i => i.status === 'unpaid');
    const paidInvoices = invoices.filter(i => i.status === 'paid');
    const totalUnpaid = unpaidInvoices.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <DollarSign className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-pulse" />
                    <p className="text-gray-500 text-sm font-mono">Loading invoices...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm tracking-wider font-bold">BACK</span>
                </button>
                
                {!scott.isOnline && (
                    <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded">
                        <WifiOff className="w-3 h-3 text-amber-400" />
                        <span className="text-[10px] text-amber-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                            OFFLINE
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
                <KingdomCrown8Bit size={32} />
                <h1 className="text-2xl font-black text-amber-400 tracking-tight" style={{ fontFamily: 'monospace' }}>INVOICES</h1>
            </div>

            {/* TOTAL UNPAID */}
            <Card className="bg-black border-2 border-red-500/50 p-6 mb-6 text-center" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-6xl font-black text-white" style={{ fontFamily: 'monospace' }}>£</span>
                    <p className="text-6xl font-black text-white" style={{ fontFamily: 'monospace' }}>
                        {totalUnpaid.toFixed(0)}
                    </p>
                </div>
                <p className="text-red-400 text-sm tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>
                    UNPAID ({unpaidInvoices.length})
                </p>
            </Card>

            {/* ADD NEW */}
            <Button
                onClick={() => setShowAdd(!showAdd)}
                className="w-full mb-6 bg-amber-500 hover:bg-amber-600 text-black font-black py-3 tracking-wider transition-all"
                style={{ fontFamily: 'monospace', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)' }}
            >
                <Plus className="w-4 h-4 mr-2" />
                ADD INVOICE
            </Button>

            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-6"
                    >
                        <Card className="bg-black border border-amber-500/20 p-4 space-y-3">
                            <select
                                value={newInvoice.artist_id}
                                onChange={(e) => setNewInvoice({...newInvoice, artist_id: e.target.value})}
                                className="w-full bg-black border border-gray-800 text-white p-3"
                                style={{ fontFamily: 'monospace' }}
                            >
                                <option value="">Select artist...</option>
                                {artists.map(a => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </select>

                            <Input
                                type="number"
                                placeholder="Amount (£)"
                                value={newInvoice.amount}
                                onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                                className="bg-black border-gray-800 text-white"
                                style={{ fontFamily: 'monospace' }}
                            />

                            <Input
                                placeholder="What's it for?"
                                value={newInvoice.description}
                                onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                                className="bg-black border-gray-800 text-white"
                                style={{ fontFamily: 'monospace' }}
                            />

                            <Input
                                type="date"
                                value={newInvoice.date}
                                onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                                className="bg-black border-gray-800 text-white"
                                style={{ fontFamily: 'monospace' }}
                            />

                            <Textarea
                                placeholder="Accountant notes (optional)"
                                value={newInvoice.accountant_notes}
                                onChange={(e) => setNewInvoice({...newInvoice, accountant_notes: e.target.value})}
                                className="bg-black border-gray-800 text-white"
                                style={{ fontFamily: 'monospace' }}
                            />

                            <Button
                                onClick={handleAddInvoice}
                                disabled={!newInvoice.artist_id || !newInvoice.amount || !newInvoice.description}
                                className="w-full bg-amber-600 hover:bg-amber-700"
                            >
                                Save Invoice
                            </Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UNPAID */}
            {unpaidInvoices.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-black text-red-500 tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>
                        UNPAID
                    </h2>
                    <div className="space-y-2">
                        {unpaidInvoices.map(invoice => (
                            <Card key={invoice.id} className="bg-black border border-red-500/30 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <p className="text-white font-bold text-base mb-1" style={{ fontFamily: 'monospace' }}>
                                            {getArtistName(invoice.artist_id)}
                                        </p>
                                        <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>
                                            {invoice.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-red-400 mb-1" style={{ fontFamily: 'monospace' }}>
                                            £{Number(invoice.amount).toFixed(0)}
                                        </p>
                                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                                            {new Date(invoice.date).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                                {invoice.accountant_notes && (
                                    <div className="bg-purple-900/20 p-2 border border-purple-500/30 mb-2">
                                        <p className="text-gray-400 text-xs" style={{ fontFamily: 'monospace' }}>
                                            {invoice.accountant_notes}
                                        </p>
                                    </div>
                                )}
                                <Button
                                    onClick={() => handleTogglePaid(invoice.id, invoice.status)}
                                    className="w-full bg-green-600 hover:bg-green-700 mt-2"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Paid
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* PAID */}
            {paidInvoices.length > 0 && (
                <div>
                    <h2 className="text-sm font-black text-green-500 tracking-wider mb-3" style={{ fontFamily: 'monospace' }}>
                        PAID ({paidInvoices.length})
                    </h2>
                    <div className="space-y-2">
                        {paidInvoices.map(invoice => (
                            <Card key={invoice.id} className="bg-black border border-gray-800 p-4 opacity-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-white font-bold text-base mb-1" style={{ fontFamily: 'monospace' }}>
                                            {getArtistName(invoice.artist_id)}
                                        </p>
                                        <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>
                                            {invoice.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-green-400 mb-1" style={{ fontFamily: 'monospace' }}>
                                            £{Number(invoice.amount).toFixed(0)}
                                        </p>
                                        <div className="flex items-center gap-1 justify-end">
                                            <CheckCircle className="w-3 h-3 text-green-400" />
                                            <p className="text-green-400 text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                                                PAID
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {invoices.length === 0 && (
                <Card className="bg-black border border-gray-800 p-12 text-center">
                    <DollarSign className="w-16 h-16 text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-700 text-sm tracking-widest font-black" style={{ fontFamily: 'monospace' }}>
                        NO INVOICES YET
                    </p>
                </Card>
            )}

            <div className="mt-12 pt-6 border-t border-gray-900">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <KingdomCrown8Bit size={24} />
                    <p className="text-gray-700 text-xs tracking-widest" style={{ fontFamily: 'monospace' }}>KINGDOM</p>
                </div>
                <p className="text-center text-gray-800 text-[10px] tracking-widest" style={{ fontFamily: 'monospace' }}>EST 1888</p>
            </div>
        </div>
    );
}

export default function ScottInvoices() {
    return (
        <ScottOfflineProvider>
            <ScottInvoicesInner />
        </ScottOfflineProvider>
    );
}