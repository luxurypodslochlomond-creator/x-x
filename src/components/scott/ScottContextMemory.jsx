import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

/**
 * CONTEXT MEMORY - "WHERE WAS I?"
 * ADHD brain loses thread → AI reminds you
 */

export default function ScottContextMemory() {
    const [lastContext, setLastContext] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if user left mid-task
        const savedContext = localStorage.getItem('scott_context');
        if (savedContext) {
            const context = JSON.parse(savedContext);
            const timeSince = Date.now() - context.timestamp;
            
            // If more than 30 mins ago, remind them
            if (timeSince > 30 * 60 * 1000) {
                setLastContext(context);
                setShow(true);
            }
        }
    }, []);

    const saveContext = (activity) => {
        localStorage.setItem('scott_context', JSON.stringify({
            activity,
            timestamp: Date.now()
        }));
    };

    const dismiss = () => {
        setShow(false);
        localStorage.removeItem('scott_context');
    };

    if (!show || !lastContext) return null;

    return (
        <div className="fixed bottom-24 right-6 z-40 bg-black border-2 border-cyan-500 p-4 max-w-xs shadow-2xl">
            <div className="flex items-start gap-3 mb-3">
                <Brain className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                    <p className="text-cyan-400 font-mono text-xs font-bold mb-1">MEMORY RESTORED</p>
                    <p className="text-white text-sm font-mono">
                        You were: {lastContext.activity}
                    </p>
                </div>
            </div>
            <button
                onClick={dismiss}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-mono text-xs"
            >
                GOT IT
            </button>
        </div>
    );
}