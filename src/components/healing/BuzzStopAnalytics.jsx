// Offline-first analytics - NO tracking, just outcomes
import { useEffect } from 'react';

export function useBuzzStopAnalytics() {
  const ANALYTICS_KEY = 'buzzstop_analytics';

  const trackSessionStart = (frequency) => {
    try {
      const analytics = JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || {
        sessions: [],
        totalMinutes: 0,
        effectiveAttempts: 0,
      };

      analytics.sessions.push({
        startTime: Date.now(),
        startFrequency: frequency,
        endTime: null,
        effectiveness: null,
      });

      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
    } catch (e) {
      console.log('Analytics storage optional');
    }
  };

  const trackSessionEnd = (effectiveness) => {
    try {
      const analytics = JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || { sessions: [] };
      const lastSession = analytics.sessions[analytics.sessions.length - 1];

      if (lastSession) {
        lastSession.endTime = Date.now();
        lastSession.effectiveness = effectiveness; // 0-100 scale
        lastSession.durationMinutes = (lastSession.endTime - lastSession.startTime) / 60000;

        analytics.totalMinutes += lastSession.durationMinutes;
        if (effectiveness > 50) {
          analytics.effectiveAttempts += 1;
        }

        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
      }
    } catch (e) {
      console.log('Analytics tracking optional');
    }
  };

  const getAnalytics = () => {
    try {
      return JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || {
        sessions: [],
        totalMinutes: 0,
        effectiveAttempts: 0,
      };
    } catch (e) {
      return { sessions: [], totalMinutes: 0, effectiveAttempts: 0 };
    }
  };

  return { trackSessionStart, trackSessionEnd, getAnalytics };
}