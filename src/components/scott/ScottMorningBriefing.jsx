import React, { useState, useEffect } from 'react';
import { Sun, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * MORNING BRIEFING - WHAT MATTERS TODAY
 * 3 seconds, you know everything
 */

export default function ScottMorningBriefing() {
    const [briefing, setBriefing] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const lastBriefing = localStorage.getItem('scott_last_briefing');
        const today = new Date().toDateString();
        
        if (lastBriefing !== today) {
            loadBriefing();
            setShow(true);
        }
    }, []);

    const loadBriefing = async () => {
        try {
            const tasks = await base44.entities.ScottTask.list();
            const events = await base44.entities.ScottEvent.list();
            const invoices = await base44.entities.ScottInvoice.list();

            const urgent = tasks.filter(t => 
                t.status !== 'done' && (t.priority === 'high' || t.priority === 'urgent')
            ).length;

            const today = new Date();
            const todayEvents = events.filter(e => {
                if (!e.date) return false;
                const eventDate = new Date(e.date);
                return !isNaN(eventDate.getTime()) && eventDate.toDateString() === today.toDateString();
            }).length;

            const unpaid = invoices.filter(i => i.status === 'unpaid').length;

            setBriefing({ urgent, todayEvents, unpaid });
        } catch (error) {
            console.error('Briefing error:', error);
        }
    };

    const dismiss = () => {
        localStorage.setItem('scott_last_briefing', new Date().toDateString());
        setShow(false);
    };

    if (!show || !briefing) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-black border-4 border-amber-500 max-w-md w-full p-6">
                <div className="text-center mb-6">
                    <Sun className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <h2 className="text-2xl font-black text-amber-400 font-mono">MORNING BRIEFING</h2>
                    <p className="text-gray-500 text-xs font-mono">Today's priorities</p>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 bg-red-900/40 border-2 border-red-500 p-3">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                        <div>
                            <p className="text-3xl font-black text-red-400 font-mono">{briefing.urgent}</p>
                            <p className="text-xs text-red-300 font-mono">URGENT TASKS</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-cyan-900/40 border-2 border-cyan-500 p-3">
                        <Calendar className="w-8 h-8 text-cyan-400" />
                        <div>
                            <p className="text-3xl font-black text-cyan-400 font-mono">{briefing.todayEvents}</p>
                            <p className="text-xs text-cyan-300 font-mono">EVENTS TODAY</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-green-900/40 border-2 border-green-500 p-3">
                        <DollarSign className="w-8 h-8 text-green-400" />
                        <div>
                            <p className="text-3xl font-black text-green-400 font-mono">{briefing.unpaid}</p>
                            <p className="text-xs text-green-300 font-mono">UNPAID INVOICES</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={dismiss}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-mono font-bold"
                >
                    LET'S GO
                </button>
            </div>
        </div>
    );
}