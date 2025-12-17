import React, { useEffect, useState } from 'react';
import { Zap, AlertTriangle } from 'lucide-react';

/**
 * PERFORMANCE MONITOR
 * Tracks page load, render times, network requests
 * Alerts if things get slow
 */

export default function PerformanceMonitor() {
    const [metrics, setMetrics] = useState({
        pageLoad: 0,
        renderTime: 0,
        slowRequests: 0
    });
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        // PAGE LOAD TIME
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            setMetrics(prev => ({ ...prev, pageLoad: loadTime }));

            if (loadTime > 3000) {
                setShowWarning(true);
            }
        }

        // MONITOR NETWORK REQUESTS
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const start = performance.now();
            try {
                const response = await originalFetch(...args);
                const duration = performance.now() - start;
                
                if (duration > 2000) {
                    setMetrics(prev => ({ 
                        ...prev, 
                        slowRequests: prev.slowRequests + 1 
                    }));
                    setShowWarning(true);
                }
                
                return response;
            } catch (error) {
                throw error;
            }
        };

        // RENDER TIME
        const renderStart = performance.now();
        requestAnimationFrame(() => {
            const renderTime = performance.now() - renderStart;
            setMetrics(prev => ({ ...prev, renderTime }));
        });

        // AUTO-CLEAR WARNING
        const timeout = setTimeout(() => setShowWarning(false), 5000);
        return () => clearTimeout(timeout);
    }, []);

    const isDev = window.location.hostname === 'localhost';
    if (!isDev && !showWarning) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[9999] max-w-xs">
            {showWarning ? (
                <div className="bg-amber-900/90 border-2 border-amber-500 rounded-lg p-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 font-bold text-xs font-mono">SLOW DETECTED</span>
                    </div>
                    <div className="space-y-1 text-xs font-mono text-amber-300">
                        {metrics.pageLoad > 3000 && <p>Page load: {Math.round(metrics.pageLoad)}ms</p>}
                        {metrics.slowRequests > 0 && <p>Slow requests: {metrics.slowRequests}</p>}
                    </div>
                </div>
            ) : isDev ? (
                <div className="bg-green-900/90 border border-green-500 rounded-lg p-2 backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold text-xs font-mono">
                            {Math.round(metrics.renderTime)}ms render
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}