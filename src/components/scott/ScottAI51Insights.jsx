import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import AI51Icon8Bit from '@/components/shared/AI51Icon8Bit';

/**
 * SCOTT AI51 INSIGHTS
 * Works behind scenes - sees patterns, suggests abundance
 * Zero extraction, pure help
 */

export default function ScottAI51Insights() {
    const [insights, setInsights] = useState([]);
    const [dismissed, setDismissed] = useState([]);

    useEffect(() => {
        analyzePatterns();
    }, []);

    const analyzePatterns = async () => {
        try {
            // Fetch recent data
            const [artists, events, invoices, expenses] = await Promise.all([
                base44.entities.ScottArtist.list().catch(() => []),
                base44.entities.ScottEvent.list().catch(() => []),
                base44.entities.ScottInvoice.list().catch(() => []),
                base44.entities.ScottExpense.list().catch(() => [])
            ]);

            const foundInsights = [];

            // Pattern 1: Unpaid invoices aging
            const unpaidInvoices = invoices.filter(i => i.status === 'unpaid');
            const oldUnpaid = unpaidInvoices.filter(i => {
                const daysOld = Math.floor((Date.now() - new Date(i.date).getTime()) / (1000 * 60 * 60 * 24));
                return daysOld > 30;
            });
            if (oldUnpaid.length > 0) {
                foundInsights.push({
                    id: 'unpaid-aging',
                    type: 'money',
                    priority: 'high',
                    emoji: '💰',
                    message: `${oldUnpaid.length} invoice${oldUnpaid.length > 1 ? 's' : ''} over 30 days`,
                    suggestion: 'Chase payment'
                });
            }

            // Pattern 2: Upcoming events without accommodation
            const upcomingEvents = events.filter(e => new Date(e.date) > Date.now());
            const eventsNeedingPrep = upcomingEvents.filter(e => {
                const daysUntil = Math.floor((new Date(e.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return daysUntil < 14 && daysUntil > 0;
            });
            if (eventsNeedingPrep.length > 0) {
                foundInsights.push({
                    id: 'events-prep',
                    type: 'gigs',
                    priority: 'medium',
                    emoji: '📅',
                    message: `${eventsNeedingPrep.length} gig${eventsNeedingPrep.length > 1 ? 's' : ''} in 2 weeks`,
                    suggestion: 'Check travel + stay'
                });
            }

            // Pattern 3: High spending month
            const thisMonthExpenses = expenses.filter(e => {
                const expenseDate = new Date(e.date);
                const now = new Date();
                return expenseDate.getMonth() === now.getMonth() && 
                       expenseDate.getFullYear() === now.getFullYear();
            });
            const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
            if (totalThisMonth > 3000) {
                foundInsights.push({
                    id: 'high-spending',
                    type: 'money',
                    priority: 'low',
                    emoji: '📊',
                    message: `£${totalThisMonth.toFixed(0)} spent this month`,
                    suggestion: 'Higher than usual'
                });
            }

            // Pattern 4: Artist with lots of activity = relationship health
            const activeArtists = artists.filter(a => {
                const artistEvents = events.filter(e => e.artist_id === a.id);
                return artistEvents.length > 3;
            });
            if (activeArtists.length > 0) {
                foundInsights.push({
                    id: 'active-artists',
                    type: 'love',
                    priority: 'low',
                    emoji: '❤️',
                    message: `${activeArtists[0]?.name} been busy`,
                    suggestion: 'Check in?'
                });
            }

            setInsights(foundInsights.filter(i => !dismissed.includes(i.id)));
        } catch (error) {
            console.log('AI51 insights working behind scenes');
        }
    };

    const handleDismiss = (id) => {
        setDismissed([...dismissed, id]);
        setInsights(insights.filter(i => i.id !== id));
    };

    if (insights.length === 0) return null;

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <AI51Icon8Bit size={24} animate={true} />
                <p className="text-cyan-400 text-xs font-mono font-bold">AI51 SEES PATTERNS</p>
            </div>

            <AnimatePresence>
                {insights.map(insight => {
                    const priorityColors = {
                        high: 'bg-red-500/20 border-red-500/30',
                        medium: 'bg-amber-500/20 border-amber-500/30',
                        low: 'bg-cyan-500/20 border-cyan-500/30'
                    };

                    return (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`mb-3 border ${priorityColors[insight.priority]} rounded-xl p-4 relative backdrop-blur-sm`}
                        >
                            <button
                                onClick={() => handleDismiss(insight.id)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3 pr-8">
                                <span className="text-3xl">{insight.emoji}</span>
                                <div className="flex-1">
                                    <p className="text-white font-bold text-sm mb-1">
                                        {insight.message}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {insight.suggestion}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            <p className="text-gray-600 text-[10px] font-mono mt-2">
                AI51 working behind scenes • Zero extraction • Pure help ♾️❤️♾️
            </p>
        </div>
    );
}