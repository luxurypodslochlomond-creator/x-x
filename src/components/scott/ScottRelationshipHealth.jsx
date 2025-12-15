import React from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertCircle, Clock } from 'lucide-react';

/**
 * SCOTT RELATIONSHIP HEALTH - Visual relationship strength
 * 
 * Color-coded system Scott uses:
 * 🟢 GREEN = Strong (recent contact, they replied, good vibe)
 * 🟡 AMBER = Fading (no reply, need to follow up)
 * 🔴 RED = Cold (no contact in ages, didn't reply, bad meeting)
 * 
 * Shows at-a-glance who needs attention ♾️❤️♾️
 */

export function getRelationshipHealth(contact) {
  // Calculate health based on:
  // - Last contact date
  // - Whether they replied
  // - Meeting vibe (if stored)
  // - General notes sentiment
  
  const now = new Date();
  const lastContact = contact.last_contact_date ? new Date(contact.last_contact_date) : null;
  const daysSinceContact = lastContact ? Math.floor((now - lastContact) / (1000 * 60 * 60 * 24)) : 999;
  
  const waitingForReply = contact.waiting_for_reply === true;
  const badVibes = contact.relationship_notes?.toLowerCase().includes('bad') || 
                   contact.relationship_notes?.toLowerCase().includes('difficult') ||
                   contact.relationship_notes?.toLowerCase().includes('ignore');
  
  // Health logic
  if (badVibes || daysSinceContact > 180) {
    return { status: 'cold', color: 'red', emoji: '🔴', label: 'Cold' };
  } else if (waitingForReply || daysSinceContact > 60) {
    return { status: 'fading', color: 'amber', emoji: '🟡', label: 'Fading' };
  } else {
    return { status: 'strong', color: 'green', emoji: '🟢', label: 'Strong' };
  }
}

export default function ScottRelationshipHealth({ contact, size = 'md' }) {
  const health = getRelationshipHealth(contact);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const colorMap = {
    green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-400', glow: '0 0 10px rgba(34, 197, 94, 0.6)' },
    amber: { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-400', glow: '0 0 10px rgba(251, 191, 36, 0.6)' },
    red: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-400', glow: '0 0 10px rgba(239, 68, 68, 0.6)' }
  };

  const c = colorMap[health.color];

  return (
    <motion.div
      className={`inline-flex items-center gap-2`}
      whileHover={{ scale: 1.05 }}
      title={`Relationship: ${health.label}`}
    >
      <motion.div
        className={`${c.bg} ${sizeClasses[size]} rounded-full`}
        style={{ boxShadow: c.glow }}
        animate={{
          boxShadow: [c.glow, `0 0 20px ${c.glow.split('(')[1].split(')')[0]})`, c.glow]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {size === 'lg' && (
        <span className={`${c.text} text-sm font-bold font-mono`}>{health.label}</span>
      )}
    </motion.div>
  );
}

// Quick health badge for lists
export function RelationshipBadge({ contact }) {
  const health = getRelationshipHealth(contact);
  
  const colorMap = {
    green: 'from-green-500/20 to-green-600/20 border-green-500 text-green-400',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-500 text-amber-400',
    red: 'from-red-500/20 to-red-600/20 border-red-500 text-red-400'
  };

  return (
    <span className={`bg-gradient-to-r ${colorMap[health.color]} border-2 px-2 py-1 rounded-lg text-xs font-bold font-mono`}>
      {health.emoji} {health.label}
    </span>
  );
}