import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NetworkShield({ children }) {
  const [networkStatus, setNetworkStatus] = useState('online');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [lastError, setLastError] = useState(null);
  const [showRetryBanner, setShowRetryBanner] = useState(false);

  useEffect(() => {
    // Listen for network status changes
    const handleOnline = () => {
      setNetworkStatus('online');
      setRetryAttempts(0);
      setLastError(null);
      setShowRetryBanner(false);
    };
    
    const handleOffline = () => {
      setNetworkStatus('offline');
      setShowRetryBanner(true);
    };

    // Global error handler for network errors
    const handleError = (event) => {
      if (event.error && (
        event.error.message?.includes('Network Error') ||
        event.error.message?.includes('Failed to fetch') ||
        event.error.name === 'AxiosError' ||
        event.error.code === 'ERR_NETWORK'
      )) {
        setNetworkStatus('degraded');
        setLastError(event.error.message);
        setRetryAttempts(prev => prev + 1);
        setShowRetryBanner(true);
        
        // Auto-hide banner after 10 seconds
        setTimeout(() => setShowRetryBanner(false), 10000);
      }
    };

    // Enhanced error catching
    const handlePromiseRejection = (event) => {
      if (event.reason && (
        event.reason.message?.includes('Network Error') ||
        event.reason.message?.includes('Failed to fetch') ||
        event.reason.name === 'AxiosError'
      )) {
        setNetworkStatus('degraded');
        setLastError(event.reason.message);
        setRetryAttempts(prev => prev + 1);
        setShowRetryBanner(true);
        
        // Prevent the error from bubbling up and breaking the app
        event.preventDefault();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  const handleRetry = () => {
    setNetworkStatus('online');
    setRetryAttempts(0);
    setLastError(null);
    setShowRetryBanner(false);
    window.location.reload();
  };

  return (
    <>
      {/* Network Status Banner */}
      {showRetryBanner && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-yellow-500 text-yellow-900 border-yellow-400 shadow-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">
                {networkStatus === 'offline' ? 'You appear to be offline' : 'Connection unstable - your data is safe'}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRetry}
                className="text-yellow-900 hover:bg-yellow-400/20"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {children}
    </>
  );
}