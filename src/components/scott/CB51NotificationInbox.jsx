import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Clock, AlertCircle } from 'lucide-react';

/**
 * CB51 NOTIFICATION INBOX
 * Scott's spec: CLUTTER FREE. SIMPLE. STREAMLINED.
 * 
 * Manager: Gig offers (YES/NO)
 * Band members: Confirms (YES/NO with reason)
 * All documented
 */

export default function CB51NotificationInbox({ userEmail, userRole }) {
  const queryClient = useQueryClient();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [reason, setReason] = useState('');

  // Fetch pending notifications for this user
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['cb51Notifications', userEmail, userRole],
    queryFn: async () => {
      if (!userEmail || !userRole) return [];
      
      try {
        const allNotifs = await base44.entities.ScottNotification.filter({ 
          recipient_email: userEmail,
          status: 'pending'
        });
        return allNotifs;
      } catch (e) {
        console.log('Notification fetch error:', e);
        return [];
      }
    },
    enabled: !!userEmail && !!userRole,
  });

  // Manager approves/rejects offer
  const updateNotificationMutation = useMutation({
    mutationFn: async ({ notificationId, action, reason }) => {
      await base44.entities.ScottNotification.update(notificationId, {
        status: action === 'yes' ? 'approved_by_manager' : 'rejected_by_manager',
        manager_response: action,
        manager_reason: reason || null,
        responded_at: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cb51Notifications'] });
      setSelectedNotification(null);
      setReason('');
    },
  });

  if (isLoading) {
    return <div className="text-gray-400 text-sm font-mono">Loading notifications...</div>;
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-cyan-500/30 rounded-lg bg-black/40">
        <Clock className="w-12 h-12 text-cyan-400/30 mx-auto mb-3" />
        <p className="text-gray-400 font-mono">No pending notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border-2 border-cyan-500/50 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-black font-mono mb-1">{notif.title}</h3>
                <p className="text-cyan-300 text-sm mb-2">{notif.message}</p>
                
                {notif.type === 'gig_offer' && notif.gig_data && (
                  <div className="bg-black/40 p-3 rounded mt-2 text-xs text-gray-300 space-y-1">
                    <p><strong>Venue:</strong> {notif.gig_data.venue}</p>
                    {notif.gig_data.date && <p><strong>Date:</strong> {notif.gig_data.date}</p>}
                    {notif.gig_data.fee && <p><strong>Fee:</strong> £{notif.gig_data.fee}</p>}
                    {notif.gig_data.city && <p><strong>City:</strong> {notif.gig_data.city}</p>}
                  </div>
                )}
              </div>

              {!selectedNotification?.id === notif.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateNotificationMutation.mutate({ notificationId: notif.id, action: 'yes' })}
                    disabled={updateNotificationMutation.isPending}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black text-sm rounded font-mono"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => setSelectedNotification(notif)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded font-mono"
                  >
                    NO
                  </button>
                </div>
              ) : (
                <button onClick={() => setSelectedNotification(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {selectedNotification?.id === notif.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-cyan-500/30 space-y-3"
              >
                <div>
                  <label className="text-cyan-300 text-sm font-mono block mb-2">Why not? (one sentence)</label>
                  <input
                    type="text"
                    placeholder="e.g., Conflicting show, budget too low, scheduling issue"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-black border border-cyan-500/50 text-white p-2 rounded text-sm font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateNotificationMutation.mutate({ notificationId: notif.id, action: 'no', reason })}
                    disabled={updateNotificationMutation.isPending || !reason.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 font-black rounded font-mono text-sm"
                  >
                    SEND NO
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNotification(null);
                      setReason('');
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 font-black rounded font-mono text-sm"
                  >
                    CANCEL
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}