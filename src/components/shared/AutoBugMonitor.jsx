import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

let lastErrorTime = 0;
let errorCount = 0;

export default function AutoBugMonitor() {
  useEffect(() => {
    // Sync offline bugs when back online
    const syncOfflineBugs = async () => {
      const offlineBugs = JSON.parse(localStorage.getItem('offlineBugs') || '[]');
      if (offlineBugs.length === 0) return;

      for (const bug of offlineBugs) {
        try {
          await base44.entities.AI51Feedback.create(bug);
        } catch (err) {
          console.error('Failed to sync bug:', err);
        }
      }

      localStorage.removeItem('offlineBugs');
      console.log(`✓ ${offlineBugs.length} bugs synced`);
    };

    const handleOnline = () => syncOfflineBugs();
    window.addEventListener('online', handleOnline);

    // Sync on mount if online
    if (navigator.onLine) {
      syncOfflineBugs();
    }

    // Prevent spam - max 1 error per 10 seconds
    const canLogError = () => {
      const now = Date.now();
      if (now - lastErrorTime < 10000 && errorCount > 3) return false;
      if (now - lastErrorTime > 60000) errorCount = 0;
      lastErrorTime = now;
      errorCount++;
      return true;
    };

    const logBug = async (errorData) => {
      if (!canLogError()) return;

      // Don't log network errors - they're expected when offline
      if (errorData.message?.includes('Network Error') || 
          errorData.message?.includes('Failed to fetch') ||
          errorData.message?.includes('network request failed')) {
        return;
      }

      try {
        const user = await base44.auth.me().catch(() => ({ email: 'anonymous', full_name: 'Anonymous' }));

        const bugData = {
          feedback_type: 'bug_report',
          description: `AUTO-DETECTED: ${errorData.message}\n\nStack: ${errorData.stack}\nURL: ${window.location.href}\nUserAgent: ${navigator.userAgent}\nTimestamp: ${new Date().toISOString()}`,
          page_context: window.location.pathname,
          status: 'new'
        };

        if (!navigator.onLine) {
          // Store offline
          const offlineBugs = JSON.parse(localStorage.getItem('offlineBugs') || '[]');
          offlineBugs.push({ ...bugData, offlineId: Date.now() });
          localStorage.setItem('offlineBugs', JSON.stringify(offlineBugs));
          console.log('🔴 Bug saved offline:', errorData.message);
        } else {
          await base44.entities.AI51Feedback.create(bugData);
          console.log('🔴 Auto-logged bug:', errorData.message);
        }
      } catch (err) {
        // Silently fail - don't spam console with bug logging errors
      }
    };

    // Global error handler
    const handleError = (event) => {
      logBug({
        message: event.message,
        stack: event.error?.stack || 'No stack trace',
        filename: event.filename,
        line: event.lineno,
        column: event.colno
      });
    };

    // Unhandled promise rejections
    const handleRejection = (event) => {
      logBug({
        message: `Unhandled Promise: ${event.reason}`,
        stack: event.reason?.stack || 'No stack trace'
      });
    };

    // Network errors - but don't log if we're offline (prevents loop)
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok && response.status >= 500 && navigator.onLine) {
          logBug({
            message: `Network Error: ${response.status} ${response.statusText}`,
            stack: `URL: ${args[0]}`
          });
        }
        return response;
      } catch (error) {
        // Only log fetch failures if we're actually online (prevents offline loop)
        if (navigator.onLine) {
          logBug({
            message: `Fetch Failed: ${error.message}`,
            stack: error.stack
          });
        }
        throw error;
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('online', handleOnline);
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}