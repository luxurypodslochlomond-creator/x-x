import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Calendar, CheckCircle, Loader, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 CALENDAR SYNC TOGGLE
 * Enable/disable automatic Google Calendar sync for confirmed gigs
 */

export default function CB51CalendarSync({ gigId, isConfirmed, hasCalendarEvent }) {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(hasCalendarEvent);

  const handleSync = async () => {
    if (!isConfirmed) {
      alert('Gig must be confirmed before syncing to calendar');
      return;
    }

    setSyncing(true);
    try {
      const res = await base44.functions.invoke('syncGigToGoogleCalendar', {
        gigId: gigId,
        action: synced ? 'delete' : 'create'
      });

      if (res.data?.status || res.status) {
        setSynced(!synced);
      }
    } catch (err) {
      console.error('Calendar sync failed:', err);
      alert('Failed to sync with Google Calendar. Make sure you\'ve authorized calendar access.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={syncing}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
        synced
          ? 'bg-green-900/30 border border-green-500/40 text-green-400'
          : 'bg-gray-900/30 border border-gray-500/40 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
      } disabled:opacity-50`}
    >
      {syncing ? (
        <Loader className="w-3 h-3 animate-spin" />
      ) : synced ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <Calendar className="w-3 h-3" />
      )}
      {syncing ? 'SYNCING...' : synced ? 'SYNCED' : 'SYNC TO GOOGLE'}
    </button>
  );
}