import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ANONYMOUS AUTHENTICATION
 * Use UF51 without email. Zero barriers. Pure freedom.
 * Data stored locally. Upgrade to real account anytime.
 */

// Simple UUID generator using browser crypto API
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const AnonymousAuthContext = createContext();

export const useAnonymousAuth = () => {
  const context = useContext(AnonymousAuthContext);
  if (!context) {
    throw new Error('useAnonymousAuth must be used within AnonymousAuthProvider');
  }
  return context;
};

export const AnonymousAuthProvider = ({ children }) => {
  const [anonymousId, setAnonymousId] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [localData, setLocalData] = useState({
    cleanups: [],
    p51Balance: 0,
    musicPlays: [],
    likedTracks: []
  });

  // Initialize anonymous session
  useEffect(() => {
    const storedId = localStorage.getItem('uf51_anonymous_id');
    const storedData = localStorage.getItem('uf51_anonymous_data');

    if (storedId) {
      setAnonymousId(storedId);
      setIsAnonymous(true);
      if (storedData) {
        setLocalData(JSON.parse(storedData));
      }
    }
  }, []);

  // Create anonymous session
  const createAnonymousSession = () => {
    const newId = `anon_${generateId()}`;
    localStorage.setItem('uf51_anonymous_id', newId);
    setAnonymousId(newId);
    setIsAnonymous(true);
    
    const initialData = {
      cleanups: [],
      p51Balance: 0,
      musicPlays: [],
      likedTracks: [],
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('uf51_anonymous_data', JSON.stringify(initialData));
    setLocalData(initialData);
    
    return newId;
  };

  // Store action offline
  const storeOfflineAction = (actionType, data) => {
    const action = {
      id: generateId(),
      type: actionType,
      data: data,
      timestamp: new Date().toISOString(),
      synced: false
    };

    const offlineQueue = JSON.parse(localStorage.getItem('uf51_offline_queue') || '[]');
    offlineQueue.push(action);
    localStorage.setItem('uf51_offline_queue', JSON.stringify(offlineQueue));

    return action;
  };

  // Get offline queue
  const getOfflineQueue = () => {
    return JSON.parse(localStorage.getItem('uf51_offline_queue') || '[]');
  };

  // Clear synced actions
  const clearSyncedActions = () => {
    const queue = getOfflineQueue();
    const remaining = queue.filter(action => !action.synced);
    localStorage.setItem('uf51_offline_queue', JSON.stringify(remaining));
  };

  // Update local data
  const updateLocalData = (updates) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    localStorage.setItem('uf51_anonymous_data', JSON.stringify(newData));
  };

  // Convert to real account (future feature)
  const convertToRealAccount = async (email, password) => {
    // This will upload all offline data to real account
    const offlineQueue = getOfflineQueue();
    return {
      anonymousId,
      offlineQueue,
      localData
    };
  };

  const value = {
    anonymousId,
    isAnonymous,
    localData,
    createAnonymousSession,
    storeOfflineAction,
    getOfflineQueue,
    clearSyncedActions,
    updateLocalData,
    convertToRealAccount
  };

  return (
    <AnonymousAuthContext.Provider value={value}>
      {children}
    </AnonymousAuthContext.Provider>
  );
};