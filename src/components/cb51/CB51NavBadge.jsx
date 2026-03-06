import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

/**
 * CB51NavBadge - Show action counts on nav shortcuts
 * Calendar: upcoming events
 * Finance: pending invoices
 * Tasks: incomplete tasks
 * Messages: unread messages
 */

export function useCB51NavBadges(artistId) {
  // Upcoming events (7 days)
  const { data: events = [] } = useQuery({
    queryKey: ['navBadgeEvents', artistId],
    queryFn: () => base44.entities.Event.filter({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    refetchInterval: 30000
  });

  // Pending invoices
  const { data: invoices = [] } = useQuery({
    queryKey: ['navBadgeInvoices', artistId],
    queryFn: () => base44.entities.ScottInvoice.filter({ artist_id: artistId, status: 'unpaid' }).catch(() => []),
    enabled: !!artistId,
    refetchInterval: 30000
  });

  // Incomplete tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ['navBadgeTasks', artistId],
    queryFn: () => base44.entities.ScottTask.filter({ artist_id: artistId, status: { $ne: 'done' } }).catch(() => []),
    enabled: !!artistId,
    refetchInterval: 30000
  });

  // Pending messages
  const { data: messages = [] } = useQuery({
    queryKey: ['navBadgeMessages', artistId],
    queryFn: () => base44.entities.ScottMessage.filter({ artist_id: artistId, status: 'pending' }).catch(() => []),
    enabled: !!artistId,
    refetchInterval: 30000
  });

  return useMemo(() => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
      calendar: events.filter(e => {
        const eDate = new Date(e.date);
        return eDate >= now && eDate <= weekFromNow;
      }).length,
      finance: invoices.length,
      tasks: tasks.length,
      messages: messages.length
    };
  }, [events, invoices, tasks, messages]);
}

export function CB51NavBadge({ count, color = 'red' }) {
  if (!count || count === 0) return null;

  const colorMap = {
    red: 'bg-red-600 text-white',
    amber: 'bg-amber-600 text-white',
    cyan: 'bg-cyan-600 text-black',
    green: 'bg-green-600 text-white'
  };

  return (
    <div className={`absolute -top-2 -right-2 ${colorMap[color]} w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black`}>
      {count > 9 ? '9+' : count}
    </div>
  );
}