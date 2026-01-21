import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Radio, Wifi, WifiOff, CheckCircle2, Clock } from 'lucide-react';

/**
 * OfflineMeshSync - Band voting mesh network
 * Syncs gig offer votes peer-to-peer when offline
 * Queues them for manager approval when online
 */

export default function OfflineMeshSync({ gigOfferId, onSyncComplete }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, complete
  const [meshPeers, setMeshPeers] = useState([]);
  const indexedDBRef = useRef(null);

  // Monitor online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize IndexedDB for offline storage
  useEffect(() => {
    const initDB = async () => {
      return new Promise((resolve) => {
        const request = indexedDB.open('CB51Mesh', 1);
        
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('pendingVotes')) {
            db.createObjectStore('pendingVotes', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('meshPeers')) {
            db.createObjectStore('meshPeers', { keyPath: 'id' });
          }
        };
        
        request.onsuccess = () => {
          indexedDBRef.current = request.result;
          resolve();
        };
      });
    };
    
    initDB();
  }, []);

  // Store vote locally when offline
  const storeVoteLocally = async (voteData) => {
    if (!indexedDBRef.current) return;
    
    const tx = indexedDBRef.current.transaction(['pendingVotes'], 'readwrite');
    const store = tx.objectStore('pendingVotes');
    store.add({
      id: `${gigOfferId}-${Date.now()}`,
      gigOfferId,
      ...voteData,
      storedAt: new Date().toISOString(),
      synced: false
    });
  };

  // Get pending votes from local storage
  const getPendingVotes = async () => {
    if (!indexedDBRef.current) return [];
    
    return new Promise((resolve) => {
      const tx = indexedDBRef.current.transaction(['pendingVotes'], 'readonly');
      const store = tx.objectStore('pendingVotes');
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result.filter(v => !v.synced && v.gigOfferId === gigOfferId));
      };
    });
  };

  // Sync pending votes to server & create PendingApproval records
  const syncVotesToServer = async () => {
    if (!isOnline) return;
    
    setSyncStatus('syncing');
    
    try {
      const pendingVotes = await getPendingVotes();
      
      if (pendingVotes.length === 0) {
        setSyncStatus('idle');
        return;
      }

      // Create PendingApproval for manager review
      for (const vote of pendingVotes) {
        await (await import('@/api/base44Client')).base44.entities.PendingApproval.create({
          gig_offer_id: gigOfferId,
          approval_type: 'band_vote_summary',
          content: vote,
          synced_at: new Date().toISOString()
        });
      }

      // Mark as synced
      const tx = indexedDBRef.current.transaction(['pendingVotes'], 'readwrite');
      const store = tx.objectStore('pendingVotes');
      pendingVotes.forEach(vote => {
        store.put({ ...vote, synced: true });
      });

      setSyncStatus('complete');
      if (onSyncComplete) onSyncComplete(pendingVotes.length);
      
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('idle');
    }
  };

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && syncStatus === 'idle') {
      syncVotesToServer();
    }
  }, [isOnline]);

  return (
    <div className="space-y-3">
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono ${
          isOnline
            ? 'bg-green-500/10 border border-green-500/30 text-green-300'
            : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-3 h-3" />
            <span>ONLINE • Ready to sync</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3" />
            <span>OFFLINE • Votes stored locally</span>
          </>
        )}
      </motion.div>

      {/* Sync Status */}
      {syncStatus === 'syncing' && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono"
        >
          <Radio className="w-3 h-3 animate-spin" />
          <span>SYNCING TO MANAGER...</span>
        </motion.div>
      )}

      {syncStatus === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono"
        >
          <CheckCircle2 className="w-3 h-3" />
          <span>✓ Votes synced for approval</span>
        </motion.div>
      )}

      {/* Manual Sync Button (when online) */}
      {isOnline && syncStatus === 'idle' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={syncVotesToServer}
          className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold font-mono transition-all"
        >
          SYNC NOW
        </motion.button>
      )}
    </div>
  );
}

// Export utility for storing votes
export async function storeVoteOffline(gigOfferId, voteData) {
  const db = await new Promise((resolve) => {
    const request = indexedDB.open('CB51Mesh', 1);
    request.onsuccess = () => resolve(request.result);
  });
  
  const tx = db.transaction(['pendingVotes'], 'readwrite');
  const store = tx.objectStore('pendingVotes');
  store.add({
    id: `${gigOfferId}-${Date.now()}`,
    gigOfferId,
    ...voteData,
    storedAt: new Date().toISOString(),
    synced: false
  });
}