// Persist user's frequency + effectiveness across sessions
import { useEffect } from 'react';

export function useBuzzStopMemory() {
  const STORAGE_KEY = 'buzzstop_session';

  const saveSession = (sessionData) => {
    try {
      const stored = {
        ...sessionData,
        timestamp: Date.now(),
        userFrequency: sessionData.userFrequency || null,
        effectivenessScore: sessionData.effectivenessScore || 0,
        totalSessions: (JSON.parse(localStorage.getItem(STORAGE_KEY))?.totalSessions || 0) + 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      console.log('Session storage optional');
    }
  };

  const loadSession = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  };

  const clearSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.log('Clear storage optional');
    }
  };

  const recordEffectiveness = (score) => {
    const session = loadSession();
    if (session) {
      session.effectivenessScore = score;
      session.lastEffectiveFrequency = session.userFrequency;
      saveSession(session);
    }
  };

  return { saveSession, loadSession, clearSession, recordEffectiveness };
}