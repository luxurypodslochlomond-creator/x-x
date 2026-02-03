import React, { useMemo } from 'react';
import { AlertCircle, Clock, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51PriorityInbox - Unified inbox of gig offers + band votes + tasks
 * Sorted by urgency: deadline creeping → no deadline
 */
export default function CB51PriorityInbox({ offers = [], votes = [], tasks = [], events = [] }) {
  const items = useMemo(() => {
    const all = [];

    // Add pending gig offers
    offers
      .filter(o => o.status === 'pending_manager_review')
      .forEach(offer => {
        all.push({
          id: offer.id,
          type: 'offer',
          priority: 1,
          icon: AlertCircle,
          title: `OFFER: ${offer.venue || 'Gig'}`,
          subtitle: offer.date || 'TBD',
          badge: `${offer.currency || 'GBP'}${offer.fee || '?'}`,
          color: 'cyan',
          data: offer
        });
      });

    // Add band votes (close to deadline)
    votes
      .filter(v => v.status === 'pending' && v.created_date)
      .forEach(vote => {
        const daysOld = Math.floor((Date.now() - new Date(vote.created_date)) / (1000 * 60 * 60 * 24));
        all.push({
          id: vote.id,
          type: 'vote',
          priority: daysOld > 2 ? 0 : 1, // Older = higher priority
          icon: Users,
          title: `BAND VOTE: ${vote.gig_venue || 'Gig'}`,
          subtitle: `${vote.yes_count || 0} YES • ${vote.no_count || 0} NO • ${vote.pending_count || 0} PENDING`,
          badge: daysOld > 0 ? `${daysOld}d old` : 'TODAY',
          color: daysOld > 2 ? 'red' : 'amber',
          data: vote
        });
      });

    // Add pending tasks (assigned to manager)
    tasks
      .filter(t => t.status !== 'done' && t.responsible_name === 'Manager')
      .forEach(task => {
        all.push({
          id: task.id,
          type: 'task',
          priority: task.urgency === 'urgent' ? 0 : 2,
          icon: CheckCircle,
          title: `TASK: ${task.title}`,
          subtitle: task.due_date || 'No deadline',
          badge: task.urgency === 'urgent' ? '🔥' : '',
          color: task.urgency === 'urgent' ? 'red' : 'green',
          data: task
        });
      });

    // Sort by priority (0 = top)
    return all.sort((a, b) => a.priority - b.priority);
  }, [offers, votes, tasks]);

  if (items.length === 0) {
    return (
      <div className="bg-black border border-cyan-500/30 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-xs font-mono">No urgent items</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-cyan-400 font-black font-mono text-sm mb-3 flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        PRIORITY INBOX ({items.length})
      </h3>

      {items.map((item, idx) => {
        const Icon = item.icon;
        const colorClasses = {
          cyan: 'border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/5 hover:bg-cyan-500/10',
          amber: 'border-amber-500/30 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/10',
          red: 'border-red-500/30 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10',
          green: 'border-green-500/30 hover:border-green-500 bg-green-500/5 hover:bg-green-500/10'
        };
        const textClasses = {
          cyan: 'text-cyan-400',
          amber: 'text-amber-400',
          red: 'text-red-400',
          green: 'text-green-400'
        };

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${colorClasses[item.color]}`}
          >
            <div className="flex items-start gap-2">
              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${textClasses[item.color]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`font-black font-mono text-xs ${textClasses[item.color]}`}>{item.title}</p>
                    <p className="text-gray-500 text-[10px] font-mono mt-0.5">{item.subtitle}</p>
                  </div>
                  {item.badge && (
                    <span className={`flex-shrink-0 text-[9px] font-black font-mono px-1.5 py-0.5 rounded ${textClasses[item.color]} border border-current`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}