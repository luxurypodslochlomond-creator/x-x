import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Receipt, WifiOff, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

function ScottExpensesInner() {
    const navigate = useNavigate();
    const scott = useScottOffline();

    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') navigate(createPageUrl('ScottManager'));
    }, [navigate]);

    const [expenses, setExpenses] = useState([]);
    const [artists, setArtists] = useState([]);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newExpense, setNewExpense] = useState({
        amount: '',
        category: 'other',
        description: '',
        date: new Date().toISOString().split('T')[0],
        artist_id: '',
        notes: ''
    });

    useEffect(() => {
        setLoading(true);
        setExpenses(scott.getExpenses());
        setArtists(scott.getArtists());
        setLoading(false);

        if (scott.isOnline) {
            scott.pullFromServer().then(() => {
                setExpenses(scott.getExpenses());
                setArtists(scott.getArtists());
            });
        }
    }, [scott.isOnline]);

    const handleAddExpense = () => {
        scott.createExpense({
            ...newExpense,
            amount: parseFloat(newExpense.amount)
        });
        setExpenses(scott.getExpenses());
        setNewExpense({
            amount: '',
            category: 'other',
            description: '',
            date: new Date().toISOString().split('T')[0],
            artist_id: '',
            notes: ''
        });
        setShowAddExpense(false);
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

    const categoryIcons = {
        travel: '🚗',
        accommodation: '🏨',
        studio: '🎵',
        equipment: '🎸',
        food: '🍕',
        other: '📋'
    };

    const exportCSV = () => {
        const headers = ['Date', 'Category', 'Description', 'Amount (£)', 'Artist', 'Notes'];
        const rows = expenses.map(exp => {
            const artist = artists.find(a => a.id === exp.artist_id);
            return [
                exp.date,
                exp.category,
                exp.description,
                exp.amount.toFixed(2),
                artist?.name || 'General',
                exp.notes || ''
            ];
        });
        
        const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kingdom-expenses-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    };

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold tracking-wider">BACK</span>
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

            <div className="flex items-center gap-3 mb-6">
                <Receipt className="w-6 h-6 text-green-400" />
                <h1 className="text-2xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>EXPENSES</h1>
            </div>

            {/* TOTAL */}
            <Card className="bg-black border border-green-500/30 p-6 mb-6 text-center">
                <p className="text-5xl font-black text-white mb-2" style={{ fontFamily: 'monospace' }}>
                    £{totalExpenses.toFixed(2)}
                </p>
                <p className="text-xs text-green-400 tracking-widest" style={{ fontFamily: 'monospace' }}>
                    TOTAL EXPENSES
                </p>
            </Card>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-2 mb-6">
                <Button
                    onClick={() => setShowAddExpense(!showAddExpense)}
                    className="bg-green-600 hover:bg-green-700 font-black"
                    style={{ fontFamily: 'monospace' }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    ADD
                </Button>
                <Button
                    onClick={exportCSV}
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 font-black"
                    style={{ fontFamily: 'monospace' }}
                >
                    <Download className="w-4 h-4 mr-2" />
                    EXPORT
                </Button>
            </div>

            {/* ADD FORM */}
            <AnimatePresence>
                {showAddExpense && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <Card className="bg-black border border-green-500/30 p-4 mb-6">
                            <div className="space-y-3">
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Amount (£)"
                                    value={newExpense.amount}
                                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                                    className="bg-black/60 border-green-500/50 text-white"
                                />
                                
                                <Select
                                    value={newExpense.category}
                                    onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                                >
                                    <SelectTrigger className="bg-black/60 border-green-500/50 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="travel">🚗 Travel</SelectItem>
                                        <SelectItem value="accommodation">🏨 Accommodation</SelectItem>
                                        <SelectItem value="studio">🎵 Studio</SelectItem>
                                        <SelectItem value="equipment">🎸 Equipment</SelectItem>
                                        <SelectItem value="food">🍕 Food</SelectItem>
                                        <SelectItem value="other">📋 Other</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input
                                    placeholder="Description"
                                    value={newExpense.description}
                                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                                    className="bg-black/60 border-green-500/50 text-white"
                                />

                                <Input
                                    type="date"
                                    value={newExpense.date}
                                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                                    className="bg-black/60 border-green-500/50 text-white"
                                />

                                <Select
                                    value={newExpense.artist_id}
                                    onValueChange={(value) => setNewExpense({...newExpense, artist_id: value})}
                                >
                                    <SelectTrigger className="bg-black/60 border-green-500/50 text-white">
                                        <SelectValue placeholder="Artist (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={null}>General Expense</SelectItem>
                                        {artists.map(artist => (
                                            <SelectItem key={artist.id} value={artist.id}>
                                                {artist.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Textarea
                                    placeholder="Notes (optional)"
                                    value={newExpense.notes}
                                    onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
                                    className="bg-black/60 border-green-500/50 text-white"
                                />

                                <Button
                                    onClick={handleAddExpense}
                                    disabled={!newExpense.amount || !newExpense.description}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    Save Expense
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXPENSES LIST */}
            <div className="space-y-2">
                {expenses.length === 0 ? (
                    <Card className="bg-black border border-gray-800 p-8 text-center">
                        <p className="text-gray-700 text-sm tracking-wider" style={{ fontFamily: 'monospace' }}>
                            NO EXPENSES YET
                        </p>
                    </Card>
                ) : (
                    expenses.map(expense => {
                        const artist = artists.find(a => a.id === expense.artist_id);
                        return (
                            <Card key={expense.id} className="bg-black border border-gray-800 p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl">{categoryIcons[expense.category]}</span>
                                            <p className="text-white font-bold" style={{ fontFamily: 'monospace' }}>
                                                {expense.description}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500" style={{ fontFamily: 'monospace' }}>
                                            {new Date(expense.date).toLocaleDateString()}
                                            {artist && ` • ${artist.name}`}
                                        </p>
                                        {expense.notes && (
                                            <p className="text-xs text-gray-600 mt-1">{expense.notes}</p>
                                        )}
                                    </div>
                                    <p className="text-xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                                        £{expense.amount.toFixed(2)}
                                    </p>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t border-gray-900 text-center">
                <KingdomCrown8Bit size={24} />
                <p className="text-gray-700 text-xs tracking-widest mt-2" style={{ fontFamily: 'monospace' }}>
                    FOR YOUR ACCOUNTANT
                </p>
            </div>
        </div>
    );
}

export default function ScottExpenses() {
    return (
        <ScottOfflineProvider>
            <ScottExpensesInner />
        </ScottOfflineProvider>
    );
}