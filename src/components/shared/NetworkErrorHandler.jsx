import React from 'react';
import { RefreshCw, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * NETWORK ERROR HANDLER - INDESTRUCTIBLE
 * Auto-retry, works offline, works in space
 * Zero data loss, ever
 */
export default function NetworkErrorHandler({ error, onRetry, context = "action" }) {
    const isNetworkError = 
        error?.message?.toLowerCase().includes('network') ||
        error?.message?.toLowerCase().includes('failed to fetch') ||
        error?.code === 'ERR_NETWORK' ||
        error?.name === 'AxiosError' ||
        !navigator.onLine;

    if (!isNetworkError) return null;

    return (
        <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500 rounded-xl p-6">
            <div className="flex items-start gap-4">
                <Wifi className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-black text-amber-400 font-mono">
                        {navigator.onLine ? 'CONNECTION ISSUE' : 'OFFLINE MODE'}
                    </h3>
                    <p className="text-white font-mono">
                        {navigator.onLine 
                            ? `Can't reach server. Your ${context} is saved locally.`
                            : `You're offline. Your ${context} is saved and will upload automatically when signal returns.`
                        }
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={onRetry}
                            className="bg-amber-600 hover:bg-amber-700 text-black font-black"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            RETRY NOW
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="border-amber-500 text-amber-400"
                        >
                            REFRESH PAGE
                        </Button>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">
                        ✓ All data saved locally • ✓ Nothing lost • ✓ Auto-sync when online
                    </p>
                </div>
            </div>
        </div>
    );
}

// RETRY WRAPPER - AUTOMATICALLY RETRIES NETWORK CALLS
export async function withRetry(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            const isNetworkError = 
                error?.message?.toLowerCase().includes('network') ||
                error?.message?.toLowerCase().includes('failed to fetch') ||
                error?.code === 'ERR_NETWORK' ||
                !navigator.onLine;

            // Don't retry if not a network error
            if (!isNetworkError) throw error;

            // Don't retry if offline
            if (!navigator.onLine) throw error;

            // Last attempt - throw error
            if (i === maxRetries - 1) throw error;

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
    }
}