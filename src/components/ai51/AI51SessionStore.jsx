import React from 'react';

/**
 * AI51 Session Store
 * Offline-first IndexedDB storage
 * Persistent learning across sessions
 */

class AI51SessionStore {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AI51Sessions', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Sessions store
        if (!db.objectStoreNames.contains('sessions')) {
          const store = db.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('stressLevel', 'stressLevel', { unique: false });
        }

        // Patterns store (learned data)
        if (!db.objectStoreNames.contains('patterns')) {
          const patterns = db.createObjectStore('patterns', { keyPath: 'id', autoIncrement: true });
          patterns.createIndex('timeOfDay', 'timeOfDay', { unique: false });
          patterns.createIndex('dayOfWeek', 'dayOfWeek', { unique: false });
        }

        // Frequency recommendations store
        if (!db.objectStoreNames.contains('recommendations')) {
          db.createObjectStore('recommendations', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  // Save a healing session
  async saveSession(sessionData) {
    const tx = this.db.transaction(['sessions'], 'readwrite');
    const store = tx.objectStore('sessions');
    
    const record = {
      ...sessionData,
      timestamp: new Date().toISOString(),
      synced: false
    };

    return new Promise((resolve, reject) => {
      const req = store.add(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  // Get sessions for pattern analysis
  async getSessionsByTimeWindow(hours = 24) {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    const tx = this.db.transaction(['sessions'], 'readonly');
    const store = tx.objectStore('sessions');
    const index = store.index('timestamp');

    return new Promise((resolve, reject) => {
      const req = index.getAll();
      req.onsuccess = () => {
        const filtered = req.result.filter(s => s.timestamp > cutoff);
        resolve(filtered);
      };
      req.onerror = () => reject(req.error);
    });
  }

  // Learn patterns: time of day stress levels
  async analyzePatterns() {
    const sessions = await this.getSessionsByTimeWindow(168); // 1 week
    
    const patterns = {};
    sessions.forEach(s => {
      const hour = new Date(s.timestamp).getHours();
      const day = new Date(s.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
      
      const key = `${day}_${hour}`;
      if (!patterns[key]) patterns[key] = [];
      patterns[key].push(s.stressLevel);
    });

    // Average stress by hour and day
    const analyzed = {};
    Object.entries(patterns).forEach(([key, values]) => {
      analyzed[key] = {
        avgStress: Math.round(values.reduce((a, b) => a + b) / values.length),
        samples: values.length
      };
    });

    return analyzed;
  }

  // Get recommended frequency based on learned patterns
  async getRecommendation(currentStress) {
    const now = new Date();
    const hour = now.getHours();
    const day = now.toLocaleDateString('en-US', { weekday: 'short' });
    const key = `${day}_${hour}`;

    const patterns = await this.analyzePatterns();
    const timePattern = patterns[key];

    if (timePattern && timePattern.avgStress > 60) {
      return { frequency: '528Hz', reason: 'Your typical stress peak - calming protocol' };
    } else if (currentStress > 70) {
      return { frequency: '528Hz', reason: 'Immediate calming needed' };
    } else if (currentStress > 40) {
      return { frequency: '432Hz', reason: 'Grounding protocol' };
    } else {
      return { frequency: '7.83Hz', reason: 'Baseline maintenance' };
    }
  }
}

// Singleton instance
let storeInstance = null;

export const useAI51Store = () => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      if (!storeInstance) {
        storeInstance = new AI51SessionStore();
        await storeInstance.init();
      }
      setReady(true);
    };
    init();
  }, []);

  return { store: storeInstance, ready };
};

export default AI51SessionStore;