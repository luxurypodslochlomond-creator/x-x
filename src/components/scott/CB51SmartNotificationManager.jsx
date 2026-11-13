import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Bell, Zap, Users, DollarSign, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * CB51 SMART NOTIFICATION MANAGER
 * Intelligent push notifications for Scott - fires at right moments
 * No spam, no ads, just what matters
 */

export default function CB51SmartNotificationManager({ artistId }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [batchMode, setBatchMode] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(Date.now());

  // Fetch pending gigs (shows as notifications)
  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ artist_id: artistId, status: 'manager_reviewing' }),
    refetchInterval: 30000 // Check every 30s
  });

  // Fetch band votes needed
  const { data: pendingVotes = [] } = useQuery({
    queryKey: ['pendingVotes', artistId],
    queryFn: () => base44.entities.GigOffer.filter({ artist_id: artistId, status: 'band_voting' }),
    refetchInterval: 30000
  });

  // Fetch upcoming gigs (next 7 days)
  const { data: upcomingGigs = [] } = useQuery({
    queryKey: ['upcomingGigs', artistId],
    queryFn: async () => {
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      const results = await base44.entities.Event.filter({
        artist_id: artistId
      });
      return results.filter(e => new Date(e.date) <= sevenDaysFromNow);
    },
    refetchInterval: 60000
  });

  // SMART NOTIFICATION LOGIC
  useEffect(() => {
    const newNotifications = [];
    const now = Date.now();

    // 🔥 URGENT: Gigs awaiting manager review
    if (pendingGigs.length > 0) {
      newNotifications.push({
        id: 'pending-gigs',
        type: 'gig-pending',
        title: `${pendingGigs.length} gig${pendingGigs.length > 1 ? 's' : ''} need your YES/NO`,
        message: `${pendingGigs[0]?.promoter_name || 'Promoter'} is waiting`,
        icon: Zap,
        color: '#ec4899',
        priority: 'urgent',
        timestamp: now,
        action: () => window.location.href = `/CB51?tab=gigs`
      });
    }

    // 👥 IMPORTANT: Band votes IN PROGRESS (with live count)
    if (pendingVotes.length > 0) {
      pendingVotes.forEach(gig => {
        newNotifications.push({
          id: `band-vote-${gig.id}`,
          type: 'band-vote',
          title: `${gig.venue || 'Gig'} - Band voting`,
          message: 'Live votes coming in...',
          icon: Users,
          color: '#10b981',
          priority: 'high',
          timestamp: now,
          gigId: gig.id,
          action: () => navigate(createPageUrl(`CB51VotingTracker?gigId=${gig.id}`))
        });
      });
    }

    // ⏰ HEADS UP: Gigs in next 3 days (reminders)
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    const imminentGigs = upcomingGigs.filter(g => new Date(g.date) <= threeDaysFromNow);
    
    if (imminentGigs.length > 0 && imminentGigs.length <= 3) {
      newNotifications.push({
        id: 'imminent-gigs',
        type: 'gig-reminder',
        title: `${imminentGigs.length} show${imminentGigs.length > 1 ? 's' : ''} coming up`,
        message: `Next: ${imminentGigs[0]?.title || 'Show'} in 3 days`,
        icon: AlertCircle,
        color: '#f59e0b',
        priority: 'medium',
        timestamp: now,
        action: () => window.location.href = `/CB51?tab=calendar`
      });
    }

    setNotifications(newNotifications);

    // BATCH NOTIFICATIONS if multiple - show them together
    if (newNotifications.length > 2) {
      setBatchMode(true);
    } else {
      setBatchMode(false);
    }

    setLastCheckTime(now);
  }, [pendingGigs, pendingVotes, upcomingGigs]);

  // SEND PUSH NOTIFICATION
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted' && notifications.length > 0) {
      const notif = notifications[0]; // Show highest priority first
      
      // Don't spam - only notify if this is new
      if (notif.timestamp - lastCheckTime < 5000) {
        new Notification(notif.title, {
          body: notif.message,
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          tag: notif.id,
          requireInteraction: notif.priority === 'urgent',
          vibrate: notif.priority === 'urgent' ? [200, 100, 200] : [100]
        });
      }
    }
  }, [notifications, lastCheckTime]);

  if (notifications.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-24 right-4 z-40 max-w-xs"
    >
      <AnimatePresence mode="wait">
        {batchMode ? (
          // BATCH VIEW - show count
          <motion.div
            key="batch"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-pink-900 to-cyan-900 border-2 border-pink-500 rounded-xl p-4 backdrop-blur-xl"
            style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-pink-400 animate-bounce" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-sm">You've got stuff</p>
                <p className="text-pink-200 text-xs">{notifications.map(n => n.title).join(', ')}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/CB51'}
              className="mt-3 w-full bg-white text-black py-2 rounded font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Check now
            </button>
          </motion.div>
        ) : (
          // SINGLE NOTIFICATION
          notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                onClick={notif.action}
                className="bg-black border-2 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
                style={{
                  borderColor: notif.color,
                  boxShadow: `0 0 30px ${notif.color}40`
                }}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 p-2 rounded-lg" style={{ backgroundColor: `${notif.color}20` }}>
                    <Icon className="w-5 h-5" style={{ color: notif.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-white text-sm">{notif.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{notif.message}</p>
                    <p className="text-[10px] text-gray-600 mt-2 font-mono">tap to view</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </motion.div>
  );
}