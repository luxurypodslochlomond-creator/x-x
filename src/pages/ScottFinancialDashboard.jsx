import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * FINANCIAL DASHBOARD
 * All money in one place
 * What's owed, what's paid, what's coming
 */

export default function ScottFinancialDashboard() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [finances, setFinances] = useState({
        unpaidInvoices: [],
        expenses: [],
        merchValue: 0,
        totalIn: 0,
        totalOut: 0
    });

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadFinances();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, []);

    const loadFinances = async () => {
        try {
            const invoices = await base44.entities.ScottInvoice.list();
            const expenses = await base44.entities.ScottExpense.list();
            const merch = await base44.entities.ScottMerch.list();

            const unpaid = invoices.filter(i => i.status === 'unpaid');
            const totalIn = unpaid.reduce((sum, i) => sum + i.amount, 0);
            const totalOut = expenses.reduce((sum, e) => sum + e.amount, 0);
            const merchValue = merch.reduce((sum, m) => sum + (m.stock_remaining * m.price), 0);

            setFinances({
                unpaidInvoices: unpaid,
                expenses,
                merchValue,
                totalIn,
                totalOut
            });
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    if (!pinEntered) return null;

    const netPosition = finances.totalIn - finances.totalOut + finances.merchValue;

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-400" />
                        <div>
                            <h1 className="text-3xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>MONEY</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>All finances at a glance</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* BIG NUMBERS */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className={`bg-gradient-to-r ${netPosition > 0 ? 'from-green-900/40 to-cyan-900/40' : 'from-red-900/40 to-amber-900/40'} border-4 ${netPosition > 0 ? 'border-green-500' : 'border-red-500'} p-8 text-center`}>
                        <p className="text-gray-400 text-sm font-mono mb-2">NET POSITION</p>
                        <p className={`text-7xl font-black ${netPosition > 0 ? 'text-green-400' : 'text-red-400'}`} style={{ fontFamily: 'monospace' }}>
                            £{netPosition.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* BREAKDOWN */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <Link to={createPageUrl('ScottInvoices')} className="bg-black border-2 border-green-500 p-4 text-center hover:border-green-400 transition-all">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 text-3xl font-black font-mono mb-1">
                            £{finances.totalIn.toLocaleString()}
                        </p>
                        <p className="text-green-500 text-xs font-mono">OWED TO US</p>
                    </Link>

                    <Link to={createPageUrl('ScottExpenses')} className="bg-black border-2 border-red-500 p-4 text-center hover:border-red-400 transition-all">
                        <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-red-400 text-3xl font-black font-mono mb-1">
                            £{finances.totalOut.toLocaleString()}
                        </p>
                        <p className="text-red-500 text-xs font-mono">SPENT</p>
                    </Link>

                    <Link to={createPageUrl('ScottMerch')} className="bg-black border-2 border-purple-500 p-4 text-center hover:border-purple-400 transition-all">
                        <DollarSign className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-purple-400 text-3xl font-black font-mono mb-1">
                            £{finances.merchValue.toLocaleString()}
                        </p>
                        <p className="text-purple-500 text-xs font-mono">MERCH VALUE</p>
                    </Link>
                </div>

                {/* UNPAID INVOICES */}
                <div className="bg-black border-2 border-amber-500 p-4 mb-4">
                    <h3 className="text-amber-400 font-mono font-bold mb-3">⚠️ OUTSTANDING INVOICES</h3>
                    {finances.unpaidInvoices.length === 0 ? (
                        <p className="text-gray-600 text-sm font-mono">All paid ✓</p>
                    ) : (
                        <div className="space-y-2">
                            {finances.unpaidInvoices.slice(0, 5).map(inv => (
                                <div key={inv.id} className="flex justify-between text-sm font-mono">
                                    <span className="text-gray-300">{inv.description}</span>
                                    <span className="text-green-400 font-bold">£{inv.amount}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to={createPageUrl('ScottManager')} className="text-gray-600 text-sm font-mono hover:text-gray-400">
                        ← Back to Kingdom
                    </Link>
                </div>

            </div>
        </div>
    );
}