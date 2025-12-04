/**
 * OFFLINE STORAGE UTILITIES
 * IndexedDB for zero-loss offline storage
 * Works in North Korea, Palestine, anywhere with spotty internet
 */

const DB_NAME = 'UF51_Offline';
const DB_VERSION = 1;

// Cache the DB connection
let dbInstance = null;
let dbInitializing = null;

// Check if IndexedDB is available
const isIndexedDBAvailable = () => {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
};

// Initialize IndexedDB with proper error handling
export const initDB = () => {
  // Return cached instance if available
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  // Return existing initialization promise if in progress
  if (dbInitializing) {
    return dbInitializing;
  }

  // Check if IndexedDB is available
  if (!isIndexedDBAvailable()) {
    console.warn('IndexedDB not available - using fallback');
    return Promise.resolve(null);
  }

  dbInitializing = new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        console.warn('IndexedDB open timed out');
        resolve(null);
      }, 5000);

      request.onerror = () => {
        clearTimeout(timeout);
        console.warn('IndexedDB error:', request.error);
        resolve(null); // Resolve with null instead of rejecting
      };

      request.onsuccess = () => {
        clearTimeout(timeout);
        dbInstance = request.result;
        resolve(dbInstance);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db) return;

        // Store offline cleanups
        if (!db.objectStoreNames.contains('cleanups')) {
          const cleanupStore = db.createObjectStore('cleanups', { keyPath: 'id' });
          cleanupStore.createIndex('timestamp', 'timestamp', { unique: false });
          cleanupStore.createIndex('synced', 'synced', { unique: false });
        }

        // Store offline music plays
        if (!db.objectStoreNames.contains('musicPlays')) {
          const musicStore = db.createObjectStore('musicPlays', { keyPath: 'id' });
          musicStore.createIndex('timestamp', 'timestamp', { unique: false });
          musicStore.createIndex('synced', 'synced', { unique: false });
        }

        // Store cached information articles
        if (!db.objectStoreNames.contains('information')) {
          const infoStore = db.createObjectStore('information', { keyPath: 'id' });
          infoStore.createIndex('content_type', 'content_type', { unique: false });
          infoStore.createIndex('language', 'language', { unique: false });
        }

        // Store cached music tracks
        if (!db.objectStoreNames.contains('tracks')) {
          const trackStore = db.createObjectStore('tracks', { keyPath: 'id' });
          trackStore.createIndex('artist', 'artist', { unique: false });
        }
      };

      request.onblocked = () => {
        clearTimeout(timeout);
        console.warn('IndexedDB blocked');
        resolve(null);
      };
    } catch (error) {
      console.warn('IndexedDB initialization error:', error);
      resolve(null);
    }
  }).finally(() => {
    dbInitializing = null;
  });

  return dbInitializing;
};

// Add item to store
export const addToStore = async (storeName, data) => {
  const db = await initDB();
  if (!db) {
    console.warn('IndexedDB not available, using localStorage fallback');
    const key = `uf51_${storeName}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));
    return data.id;
  }
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (error) {
      console.warn('addToStore error:', error);
      resolve(null);
    }
  });
};

// Get all items from store
export const getAllFromStore = async (storeName) => {
  const db = await initDB();
  if (!db) {
    const key = `uf51_${storeName}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => {
        console.warn('getAllFromStore error:', request.error);
        resolve([]);
      };
    } catch (error) {
      console.warn('getAllFromStore error:', error);
      resolve([]);
    }
  });
};

// Get unsynced items - SAFE VERSION
export const getUnsyncedItems = async (storeName) => {
  const db = await initDB();
  if (!db) {
    const key = `uf51_${storeName}`;
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    return items.filter(item => item.synced === false);
  }
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index('synced');
      
      const unsyncedItems = [];
      const request = index.openCursor();

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.synced === false) {
            unsyncedItems.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(unsyncedItems);
        }
      };

      request.onerror = () => {
        console.warn('getUnsyncedItems error:', request.error);
        resolve([]);
      };
    } catch (error) {
      console.warn('getUnsyncedItems error:', error);
      resolve([]);
    }
  });
};

// Mark item as synced
export const markAsSynced = async (storeName, id) => {
  const db = await initDB();
  if (!db) {
    const key = `uf51_${storeName}`;
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = items.findIndex(item => item.id === id);
    if (idx !== -1) {
      items[idx].synced = true;
      items[idx].syncedAt = new Date().toISOString();
      localStorage.setItem(key, JSON.stringify(items));
    }
    return null;
  }
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        const item = request.result;
        if (item) {
          item.synced = true;
          item.syncedAt = new Date().toISOString();
          const updateRequest = store.put(item);
          updateRequest.onsuccess = () => resolve(updateRequest.result);
          updateRequest.onerror = () => resolve(null);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    } catch (error) {
      console.warn('markAsSynced error:', error);
      resolve(null);
    }
  });
};

// Delete synced items (cleanup old data)
export const deleteSyncedItems = async (storeName) => {
  const db = await initDB();
  if (!db) {
    const key = `uf51_${storeName}`;
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    const unsynced = items.filter(item => item.synced !== true);
    localStorage.setItem(key, JSON.stringify(unsynced));
    return;
  }
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const index = store.index('synced');
      const request = index.openCursor();

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.synced === true) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = () => resolve();
    } catch (error) {
      console.warn('deleteSyncedItems error:', error);
      resolve();
    }
  });
};

// Get storage usage
export const getStorageInfo = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage,
      quota: estimate.quota,
      percentage: (estimate.usage / estimate.quota) * 100
    };
  }
  return null;
};

// Clear all offline data (nuclear option)
export const clearAllOfflineData = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};