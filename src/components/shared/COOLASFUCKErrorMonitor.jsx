import React, { useEffect } from 'react';

/**
 * COOLASFUCK ERROR MONITOR
 * Real-time issue detection + 8-bit "we're on it" screen
 * Not techy - just honest "fixing it now" vibes
 */

export default function COOLASFUCKErrorMonitor({ children }) {
    const [error, setError] = useState(null);
    const [isFixing, setIsFixing] = useState(false);

    useEffect(() => {
        // Catch unhandled errors - just log, don't interrupt the app
        const handleError = (event) => {
            console.error('Error caught:', event.error);
            // Don't show UI or reload - let the error boundaries handle it
        };

        // Catch promise rejections - just log, don't interrupt the app
        const handleRejection = (event) => {
            console.error('Promise rejected:', event.reason);
            // Don't show UI or reload - just log
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    return children;
}