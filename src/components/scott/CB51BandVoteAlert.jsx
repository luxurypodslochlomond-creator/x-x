import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell } from 'lucide-react';

export default function CB51BandVoteAlert({ userEmail }) {
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    // Real-time listener for band votes coming in
    const unsubscribe = base44.entities.ScottBandResponse.subscribe((event) => {
      if (event.type === 'create' || (event.type === 'update' && event.data?.decision !== 'pending')) {
        // New vote or vote changed
        setVoteCount(prev => prev + 1);
        
        // Send push notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
          const memberName = event.data?.band_member_name || 'Band member';
          const decision = event.data?.decision === 'yes' ? '✓ YES' : '✕ NO';
          new Notification('Band Vote Received', {
            body: `${memberName} voted ${decision}`,
            tag: 'band-vote',
            icon: '/icon-192x192.png',
            badge: '/icon-192x192.png'
          });
        }
      }
    });

    return unsubscribe;
  }, [userEmail]);

  if (voteCount === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-pulse">
      <div className="bg-green-600 text-white px-4 py-3 rounded-lg flex items-center gap-2 font-bold text-sm shadow-lg">
        <Bell className="w-4 h-4" />
        {voteCount} new vote{voteCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}