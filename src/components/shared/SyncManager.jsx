import React, { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { getUnsyncedItems, markAsSynced } from './OfflineStorage';
import { WifiOff, Loader2 } from 'lucide-react';

/**
 * SYNC MANAGER
 * Automatically syncs offline actions when internet returns
 * Shows sync status to user
 * Quantum speed, zero loss
 */

const SyncContext = createContext();

export const useSyncManager = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSyncManager must be used within SyncManagerProvider');
  }
  return context;
};

export const SyncManagerProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0 });
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [offlineOptimized, setOfflineOptimized] = useState(false);

  // Monitor online/offline status (OPTIMIZED)
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Delay sync to not block UI
      setTimeout(() => syncAllData(), 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      // Optimize for offline immediately
      optimizeOfflineMode();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Try to sync on mount if online
    if (navigator.onLine) {
      setTimeout(() => syncAllData(), 2000); // Delay initial sync
    } else {
      optimizeOfflineMode();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // OPTIMIZE OFFLINE MODE (FASTER THAN ONLINE)
  const optimizeOfflineMode = () => {
    if (offlineOptimized) return;
    
    // Disable animations for better performance
    document.body.style.setProperty('--animation-duration', '0s');
    
    // Mark optimized
    setOfflineOptimized(true);
  };

  // Sync offline cleanups
  const syncCleanups = async () => {
    const unsyncedCleanups = await getUnsyncedItems('cleanups');
    
    for (let i = 0; i < unsyncedCleanups.length; i++) {
      const cleanup = unsyncedCleanups[i];
      setSyncProgress({ current: i + 1, total: unsyncedCleanups.length });

      try {
        // Upload to server
        const newCleanup = await base44.entities.Cleanup.create({
          location: cleanup.location,
          county: cleanup.county,
          litter_weight: cleanup.litter_weight,
          photo_url: cleanup.photo_url,
          cleanup_type: cleanup.cleanup_type,
          notes: cleanup.notes
        });

        // Award tokens
        await base44.functions.invoke('awardCleanupTokens', {
          cleanup_id: newCleanup.id
        });

        // Mark as synced
        await markAsSynced('cleanups', cleanup.id);
      } catch (error) {
        console.error('Failed to sync cleanup:', cleanup.id, error);
        // Don't throw - continue syncing other items
      }
    }

    return unsyncedCleanups.length;
  };

  // Sync offline music plays (for artist payment)
  const syncMusicPlays = async () => {
    const unsyncedPlays = await getUnsyncedItems('musicPlays');

    for (let i = 0; i < unsyncedPlays.length; i++) {
      const play = unsyncedPlays[i];
      setSyncProgress({ current: i + 1, total: unsyncedPlays.length });

      try {
        // Log play for artist payment
        await base44.entities.FrequencyPlay.create({
          track_id: play.track_id,
          track_title: play.track_title,
          artist: play.artist,
          frequency_type: play.frequency_type,
          coordinates: play.coordinates,
          listener_location: play.listener_location
        });

        await markAsSynced('musicPlays', play.id);
      } catch (error) {
        console.error('Failed to sync music play:', play.id, error);
      }
    }

    return unsyncedPlays.length;
  };

  // Sync all offline data
  const syncAllData = async () => {
    if (!navigator.onLine || isSyncing) return;

    setIsSyncing(true);
    setSyncProgress({ current: 0, total: 0 });

    // Use AbortController with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const cleanupCount = await syncCleanups();
      const musicCount = await syncMusicPlays();

      setLastSyncTime(new Date());
      
      return {
        success: true,
        cleanupsSynced: cleanupCount,
        musicPlaysSynced: musicCount
      };
    } catch (error) {
      // Silently handle aborted syncs
      if (error.name === 'AbortError' || error.message?.includes('aborted')) {
        console.log('Sync aborted - will retry later');
        return { success: false, error: 'Sync interrupted' };
      }
      console.error('Sync failed:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      clearTimeout(timeout);
      setIsSyncing(false);
      setSyncProgress({ current: 0, total: 0 });
    }
  };

  const value = {
    isOnline,
    isSyncing,
    syncProgress,
    lastSyncTime,
    syncAllData,
    offlineOptimized
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
};

// Sync Status Indicator Component
export const SyncStatusIndicator = () => {
  const { isOnline, isSyncing, syncProgress } = useSyncManager();

  if (isSyncing) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-cyan-900/90 backdrop-blur-lg border-2 border-cyan-500 rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
          <div>
            <p className="text-white font-bold text-sm">Syncing...</p>
            {syncProgress.total > 0 && (
              <p className="text-cyan-300 text-xs">
                {syncProgress.current} of {syncProgress.total}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-yellow-900/90 backdrop-blur-lg border-2 border-yellow-500 rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <WifiOff className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="text-white font-bold text-sm">Offline Mode</p>
            <p className="text-yellow-300 text-xs">Actions saved locally</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};