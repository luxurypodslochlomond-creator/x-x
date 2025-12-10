import React, { useState, useEffect } from 'react';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { format, isAfter, isBefore, addDays } from 'date-fns';

/**
 * SCOTT'S VISUAL TIMELINE
 * Everything in one place - gigs, deadlines, visas, tasks
 * Color-coded by urgency
 * ADHD BRAIN HEAVEN - see the whole picture at a glance
 */

export default function ScottTimeline({ artistId = null }) {
    const [timelineItems, setTimelineItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTimeline();
    }, [artistId]);

    const loadTimeline = async () => {
        setIsLoading(true);
        try {
            const now = new Date();
            const nextMonth = addDays(now, 30);

            // Fetch all upcoming items
            let events = await base44.entities.ScottEvent.list();
            let tasks = await base44.entities.ScottTask.list();
            let visas = await base44.entities.ScottVisa.list();
            let invoices = await base44.entities.ScottInvoice.list();

            // Filter by artist if specified
            if (artistId) {
                events = events.filter(e => e.artist_id === artistId);
                tasks = tasks.filter(t => t.artist_id === artistId);
                visas = visas.filter(v => v.artist_id === artistId);
                invoices = invoices.filter(i => i.artist_id === artistId);
            }

            // Build timeline array
            const items = [];

            // Events
            events.forEach(e => {
                if (e.date) {
                    items.push({
                        type: 'event',
                        date: new Date(e.date),
                        title: e.title,
                        subtitle: e.location,
                        data: e,
                        urgency: getUrgency(new Date(e.date))
                    });
                }
            });

            // Tasks with due dates
            tasks.forEach(t => {
                if (t.due_date && t.status !== 'done') {
                    items.push({
                        type: 'task',
                        date: new Date(t.due_date),
                        title: t.title,
                        subtitle: t.priority,
                        data: t,
                        urgency: getUrgency(new Date(t.due_date))
                    });
                }
            });

            // Visa deadlines
            visas.forEach(v => {
                if (v.application_deadline) {
                    items.push({
                        type: 'visa',
                        date: new Date(v.application_deadline),
                        title: `${v.visa_type} visa deadline`,
                        subtitle: v.country,
                        data: v,
                        urgency: getUrgency(new Date(v.application_deadline))
                    });
                }
            });

            // Unpaid invoices
            invoices.forEach(i => {
                if (i.status === 'unpaid' && i.date) {
                    const invoiceDate = new Date(i.date);
                    const dueDate = addDays(invoiceDate, 30); // 30 days after invoice date
                    items.push({
                        type: 'invoice',
                        date: dueDate,
                        title: i.description,
                        subtitle: `£${i.amount}`,
                        data: i,
                        urgency: getUrgency(dueDate)
                    });
                }
            });

            // Sort by date
            items.sort((a, b) => a.date - b.date);

            setTimelineItems(items);
        } catch (error) {
            console.error('Timeline load error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getUrgency = (date) => {
        const now = new Date();
        const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

        if (daysUntil < 0) return 'overdue';
        if (daysUntil <= 3) return 'critical';
        if (daysUntil <= 7) return 'urgent';
        if (daysUntil <= 14) return 'soon';
        return 'upcoming';
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'overdue': return { bg: 'bg-red-900/40', border: 'border-red-500', text: 'text-red-400' };
            case 'critical': return { bg: 'bg-orange-900/40', border: 'border-orange-500', text: 'text-orange-400' };
            case 'urgent': return { bg: 'bg-amber-900/40', border: 'border-amber-500', text: 'text-amber-400' };
            case 'soon': return { bg: 'bg-cyan-900/40', border: 'border-cyan-500', text: 'text-cyan-400' };
            default: return { bg: 'bg-gray-900/40', border: 'border-gray-700', text: 'text-gray-400' };
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'event': return '🎸';
            case 'task': return '✓';
            case 'visa': return '✈️';
            case 'invoice': return '💰';
            default: return '•';
        }
    };

    if (isLoading) {
        return <div className="text-gray-500 text-sm font-mono">Loading timeline...</div>;
    }

    return (
        <div className="bg-black border-4 border-cyan-500 p-4">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="text-cyan-400 font-black font-mono text-sm">TIMELINE</h3>
            </div>

            {timelineItems.length === 0 ? (
                <p className="text-gray-600 text-sm font-mono text-center py-4">Nothing scheduled</p>
            ) : (
                <div className="space-y-3">
                    {timelineItems.map((item, index) => {
                        const colors = getUrgencyColor(item.urgency);
                        const daysUntil = Math.ceil((item.date - new Date()) / (1000 * 60 * 60 * 24));

                        return (
                            <div
                                key={index}
                                className={`${colors.bg} border-2 ${colors.border} p-3 relative`}
                            >
                                {/* URGENCY INDICATOR */}
                                {item.urgency === 'overdue' && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black px-2 py-1 font-mono">
                                        OVERDUE
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{getTypeIcon(item.type)}</span>
                                    <div className="flex-1">
                                        <p className={`${colors.text} font-mono text-sm font-bold mb-1`}>
                                            {item.title}
                                        </p>
                                        {item.subtitle && (
                                            <p className="text-gray-500 text-xs font-mono mb-1">
                                                {item.subtitle}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-3 text-xs font-mono">
                                            <span className={colors.text}>
                                                {format(item.date, 'EEE d MMM')}
                                            </span>
                                            <span className="text-gray-600">
                                                {daysUntil === 0 ? 'TODAY' :
                                                 daysUntil === 1 ? 'TOMORROW' :
                                                 daysUntil < 0 ? `${Math.abs(daysUntil)}d overdue` :
                                                 `${daysUntil}d`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* LEGEND */}
            <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500"></div>
                    <span className="text-gray-500">OVERDUE</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500"></div>
                    <span className="text-gray-500">0-3 DAYS</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500"></div>
                    <span className="text-gray-500">4-7 DAYS</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500"></div>
                    <span className="text-gray-500">1-2 WEEKS</span>
                </div>
            </div>
        </div>
    );
}