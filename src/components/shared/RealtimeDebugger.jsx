import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Wifi, WifiOff, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * REALTIME DEBUGGER
 * Catches errors before they break things
 * Auto-reports to AI51 for fixing
 */

export default function RealtimeDebugger() {
    const [errors, setErrors] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // CATCH ALL ERRORS
        const handleError = (event) => {
            // Skip Lock errors — they're browser internals
            if (event.message?.includes('Illegal constructor') || event.error?.toString?.().includes('Lock')) {
                return;
            }

            const error = {
                message: event.message || event.error?.message,
                stack: event.error?.stack,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            };

            setErrors(prev => [...prev, error]);

            // AUTO-REPORT TO DATABASE
            if (navigator.onLine) {
                reportError(error).catch(console.error);
            }
        };

        // CATCH UNHANDLED PROMISE REJECTIONS
        const handleRejection = (event) => {
            // Skip Lock errors
            if (event.reason?.toString?.().includes('Lock') || event.reason?.message?.includes('Illegal constructor')) {
                return;
            }

            const error = {
                message: event.reason?.message || String(event.reason),
                stack: event.reason?.stack,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                type: 'promise_rejection'
            };

            setErrors(prev => [...prev, error]);

            if (navigator.onLine) {
                reportError(error).catch(console.error);
            }
        };

        // NETWORK STATUS
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleRejection);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejection);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // REPORT ERROR TO BACKEND
    const reportError = async (error) => {
        try {
            const user = await base44.auth.me().catch(() => null);
            await base44.entities.AI51SecurityLog.create({
                event_type: 'unauthorized_access',
                threat_level: 'monitoring',
                details: `Error: ${error.message}\nStack: ${error.stack || 'No stack'}\nURL: ${error.url}`,
                source: user?.email || 'anonymous',
                blocked: false,
                action_taken: 'logged_for_review'
            });
        } catch (err) {
            console.error('Failed to report error:', err);
        }
    };

    // ONLY SHOW IN DEV OR IF ERRORS
    const isDev = window.location.hostname === 'localhost';
    if (!isDev && errors.length === 0) return null;

    return (
        <div className="fixed bottom-20 right-4 z-[9999] max-w-sm">
            {/* NETWORK STATUS */}
            <div className={`mb-2 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-mono ${
                isOnline 
                    ? 'bg-green-900/90 border border-green-500 text-green-400' 
                    : 'bg-red-900/90 border border-red-500 text-red-400'
            }`}>
                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </div>

            {/* ERROR LOG */}
            {errors.length > 0 && (
                <div className="bg-red-900/90 border-2 border-red-500 rounded-lg p-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-bold text-xs font-mono">
                            {errors.length} ERROR{errors.length > 1 ? 'S' : ''} CAUGHT
                        </span>
                    </div>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                        {errors.slice(-3).map((error, i) => (
                            <div key={i} className="text-xs font-mono text-red-300 bg-black/50 p-2 rounded">
                                {error.message?.substring(0, 100)}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setErrors([])}
                        className="mt-2 w-full bg-red-800 hover:bg-red-700 text-white text-xs font-bold py-1 rounded"
                    >
                        CLEAR
                    </button>
                </div>
            )}

            {/* HEALTH CHECK */}
            {isDev && errors.length === 0 && (
                <div className="bg-green-900/90 border border-green-500 rounded-lg p-2 backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold text-xs font-mono">ALL GOOD</span>
                    </div>
                </div>
            )}
        </div>
    );
}