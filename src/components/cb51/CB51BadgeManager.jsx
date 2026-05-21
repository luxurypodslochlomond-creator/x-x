import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

/**
 * CB51 BADGE MANAGER
 * Shows unread count on app icon (PWA Badge API)
 */

export default function CB51BadgeManager({ artistId }) {
  const { data: pendingCount = 0 } = useQuery({
    queryKey: ['badgeCount', artistId],
    queryFn: async () => {
      if (!artistId) return 0;
      
      const pendingGigs = await base44.entities.GigOffer.filter({
        artist_id: artistId,
        status: 'manager_reviewing'
      });
      
      const votingGigs = await base44.entities.GigOffer.filter({
        artist_id: artistId,
        status: 'band_voting'
      });
      
      return pendingGigs.length + votingGigs.length;
    },
    enabled: !!artistId,
    refetchInterval: 60000
  });

  useEffect(() => {
    if ('setAppBadge' in navigator) {
      if (pendingCount > 0) {
        navigator.setAppBadge(pendingCount).catch(err => {
          console.log('Badge API failed:', err);
        });
      } else {
        navigator.clearAppBadge().catch(err => {
          console.log('Clear badge failed:', err);
        });
      }
    }
  }, [pendingCount]);

  // Auto-clear badge when user opens CB51
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && 'clearAppBadge' in navigator) {
        // Give user 2 seconds to see the page, then clear
        setTimeout(() => {
          navigator.clearAppBadge().catch(() => {});
        }, 2000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return null;
}