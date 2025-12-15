import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, Plus, TrendingDown, TrendingUp, Coffee, Home, Book, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BudgetTracker() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('food');
    const [note, setNote] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('prof51_budget');
        if (saved) setTransactions(JSON.parse(saved));
    }, []);

    const addTransaction = () => {
        if (!amount) return;
        const newT = {
            id: Date.now(),
            amount: parseFloat(amount),
            category,
            note,
            date: new Date().toISOString(),
            type: amount > 0 ? 'income' : 'expense'
        };
        const updated = [newT, ...transactions];
        setTransactions(updated);
        localStorage.setItem('prof51_budget', JSON.stringify(updated));
        setAmount('');
        setNote('');
    };

    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const categoryIcons = {
        food: Coffee,
        rent: Home,
        books: Book,
        social: Heart,
        other: DollarSign
    };

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-10 h-10 text-green-400" />
                    <div>
                        <h2 className="text-green-400 font-black text-xl font-mono">BUDGET TRACKER</h2>
                        <p className="text-gray-400 text-xs font-mono">Track money offline • Syncs P2P</p>
                    </div>
                </div>

                {/* BALANCE */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-black border-2 border-green-500 rounded-lg p-3 text-center">
                        <p className="text-green-400 text-2xl font-black font-mono">£{total.toFixed(0)}</p>
                        <p className="text-gray-400 text-[10px] font-mono">Balance</p>
                    </div>
                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 text-center">
                        <p className="text-cyan-400 text-2xl font-black font-mono">£{income.toFixed(0)}</p>
                        <p className="text-gray-400 text-[10px] font-mono">Income</p>
                    </div>
                    <div className="bg-black border-2 border-red-500 rounded-lg p-3 text-center">
                        <p className="text-red-400 text-2xl font-black font-mono">£{expenses.toFixed(0)}</p>
                        <p className="text-gray-400 text-[10px] font-mono">Spent</p>
                    </div>
                </div>

                {/* ADD TRANSACTION */}
                <div className="space-y-2">
                    <Input
                        type="number"
                        placeholder="Amount (+ income, - expense)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-black border-green-500/30 text-white font-mono"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-black border border-green-500/30 rounded-lg px-4 py-2 text-white font-mono text-sm"
                    >
                        <option value="food">🍕 Food</option>
                        <option value="rent">🏠 Rent</option>
                        <option value="books">📚 Books</option>
                        <option value="social">💚 Social</option>
                        <option value="other">💰 Other</option>
                    </select>
                    <Input
                        placeholder="Note (optional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="bg-black border-green-500/30 text-white font-mono text-sm"
                    />
                    <Button
                        onClick={addTransaction}
                        className="w-full bg-green-500 hover:bg-green-600 text-black font-black py-3"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        ADD TRANSACTION
                    </Button>
                </div>
            </div>

            {/* TRANSACTIONS */}
            <div className="space-y-2">
                {transactions.map((t) => {
                    const Icon = categoryIcons[t.category] || DollarSign;
                    return (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-black border-2 border-gray-800 hover:border-green-500/50 rounded-lg p-3 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 text-green-400" />
                                    <div>
                                        <p className="text-white text-sm font-bold font-mono">{t.note || t.category}</p>
                                        <p className="text-gray-500 text-xs font-mono">
                                            {new Date(t.date).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                                <p className={`${t.amount > 0 ? 'text-green-400' : 'text-red-400'} text-lg font-black font-mono`}>
                                    {t.amount > 0 ? '+' : ''}£{Math.abs(t.amount).toFixed(2)}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}

                {transactions.length === 0 && (
                    <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-mono">No transactions yet</p>
                        <p className="text-gray-700 text-xs font-mono mt-1">Add your first one above ↑</p>
                    </div>
                )}
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 text-center">
                <p className="text-cyan-400 text-xs font-mono">Saved offline • Syncs when online ♾️</p>
            </div>
        </div>
    );
}