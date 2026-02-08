import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 NOTIFICATION BELL - Shows notification status
 * Pulses when notifications are active
 */

export default function CB51NotificationBell({ isActive, hasUnread, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Bell className={`w-5 h-5 ${
          isActive ? 'text-cyan-400' : 'text-gray-500'
        }`} />
      </motion.div>

      {/* UNREAD BADGE */}
      {hasUnread && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      )}
    </motion.button>
  );
}