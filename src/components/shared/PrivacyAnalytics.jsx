import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

/**
 * PRIVACY-FIRST ANALYTICS
 * 
 * Tracks WHAT works, not WHO uses it
 * - No individual tracking
 * - No cookies
 * - No third parties
 * - Aggregate patterns only
 * - Stored in OUR database (zero extraction)
 */

const trackEvent = async (eventType, data = {}) => {
    try {
        const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop';
        const isOffline = !navigator.onLine;
        const timestamp_hour = new Date().getHours();

        await base44.entities.PrivacyAnalytics.create({
            event_type: eventType,
            device_type: deviceType,
            is_offline: isOffline,
            timestamp_hour,
            ...data
        });
    } catch (error) {
        // Silent fail - analytics shouldn't break the app
        console.log('Analytics skip:', error.message);
    }
};

export default function PrivacyAnalytics() {
    const location = useLocation();

    // Track page views (aggregate only)
    useEffect(() => {
        const pageName = location.pathname.split('/').pop() || 'Home';
        trackEvent('page_view', { page_name: pageName });
    }, [location.pathname]);

    // Track errors globally
    useEffect(() => {
        const handleError = (event) => {
            trackEvent('error', {
                error_message: event.message || 'Unknown error',
                page_name: location.pathname.split('/').pop()
            });
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, [location.pathname]);

    return null; // Silent component
}

// Export tracking function for manual use
export { trackEvent };