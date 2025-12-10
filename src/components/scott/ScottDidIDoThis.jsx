import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * "DID I DO THIS?" CHECKER
 * ADHD memory gaps → quick confirmation
 */

export default function ScottDidIDoThis() {
    const [recentActions, setRecentActions] = useState([]);

    useEffect(() => {
        loadRecentActions();
    }, []);

    const loadRecentActions = async () => {
        try {
            // Get tasks marked done in last 24 hours
            const tasks = await base44.entities.ScottTask.list();
            const recent = tasks
                .filter(t => t.status === 'done' && t.updated_date)
                .sort((a, b) => new Date(b.updated_date) - new Date(a.updated_date))
                .slice(0, 5);
            
            setRecentActions(recent);
        } catch (error) {
            console.error('Load actions error:', error);
        }
    };

    if (recentActions.length === 0) return null;

    return (
        <div className="bg-black border-2 border-green-500/50 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <h3 className="text-green-400 font-black font-mono text-sm">RECENT WINS</h3>
            </div>
            
            <div className="space-y-2">
                {recentActions.map(action => (
                    <div key={action.id} className="bg-green-900/20 border border-green-500/30 p-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <p className="text-white text-sm font-mono flex-1">{action.title}</p>
                        <p className="text-green-400 text-xs font-mono">✓</p>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-600 font-mono mt-3">
                Yes, you did these. Brain confirmed. ✓
            </p>
        </div>
    );
}