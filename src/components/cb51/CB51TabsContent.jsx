import React from 'react';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// INBOX TAB
export function CB51InboxTab({ artistId }) {
  const { data: messages = [] } = useQuery({
    queryKey: ['cb51Messages', artistId],
    queryFn: () => base44.entities.CB51Message?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000
  });

  return (
    <motion.div
      key="inbox"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-6 space-y-4"
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-white font-black text-xl">Messages</h2>
        <p className="text-gray-500 text-sm">{messages.length} unread</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <p className="text-cyan-400 font-bold">All caught up</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-colors cursor-pointer"
            >
              <p className="text-white font-bold text-sm">{msg.subject || 'Message'}</p>
              <p className="text-gray-400 text-xs mt-1 line-clamp-2">{msg.body}</p>
              <p className="text-gray-600 text-xs mt-2">
                {new Date(msg.created_date).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// TASKS TAB
export function CB51TasksTab({ artistId }) {
  const queryClient = useQueryClient();
  const { data: tasks = [] } = useQuery({
    queryKey: ['cb51Tasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000
  });

  const activeTasks = tasks.filter(t => t.status !== 'done');

  return (
    <motion.div
      key="tasks"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-6 space-y-4"
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-green-400 font-black text-xl">TO-DO</h2>
        <p className="text-gray-500 text-sm">
          {activeTasks.length} active, {tasks.filter(t => t.status === 'done').length} done
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-400 font-bold">No tasks</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activeTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{task.title}</p>
                  {task.deadline && (
                    <p className="text-gray-400 text-xs mt-1">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    task.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                    task.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => base44.entities.CB51Task.update(task.id, { status: 'done' }).then(() => queryClient.invalidateQueries({ queryKey: ['cb51Tasks', artistId] }))}
                    className="px-2 py-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs font-bold rounded transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// FINANCE TAB
export function CB51FinanceTab({ artistId }) {
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []);
      const seen = new Set();
      return gigs.filter(g => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });
    },
    enabled: !!artistId,
    staleTime: 30000
  });

  return (
    <motion.div
      key="finance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-6 space-y-6"
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-green-400 font-black text-xl">Finance</h2>
        <p className="text-gray-500 text-sm">Gig earnings summary</p>
      </div>

      {confirmedGigs.length === 0 ? (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 text-center">
          <DollarSign className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-400 font-bold">No confirmed gigs yet</p>
        </div>
      ) : (
        <>
          <div className="bg-green-950/30 border border-green-500/30 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Total Earned (Confirmed)</p>
            <p className="text-green-400 font-black text-3xl">
              £{confirmedGigs.reduce((sum, g) => sum + (g.fee || 0), 0).toLocaleString()}
            </p>
            <p className="text-gray-500 text-xs mt-2">From {confirmedGigs.length} gigs</p>
          </div>

          <div className="space-y-2">
            {confirmedGigs.map(gig => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-900 border border-white/10 rounded-lg p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{gig.venue || gig.title}</p>
                    <p className="text-gray-400 text-xs">{gig.date_start}</p>
                  </div>
                  <p className="text-green-400 font-black">£{gig.fee}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

// CALENDAR TAB
export function CB51CalendarTab({ artistId }) {
  const navigate = useNavigate();
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []);
      const seen = new Set();
      return gigs.filter(g => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });
    },
    enabled: !!artistId,
    staleTime: 30000
  });

  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-6 space-y-6"
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-amber-400 font-black text-xl">Calendar</h2>
        <p className="text-gray-500 text-sm">{confirmedGigs.length} confirmed shows</p>
      </div>

      {confirmedGigs.length === 0 ? (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 text-center">
          <Calendar className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-400 font-bold">No shows scheduled</p>
        </div>
      ) : (
        <div className="space-y-2">
          {confirmedGigs.sort((a, b) => new Date(a.date_start) - new Date(b.date_start)).map(gig => (
            <motion.button
              key={gig.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(`/ScottLive?gig=${gig.id}`)}
              className="w-full text-left bg-gray-900 border border-amber-500/20 rounded-lg p-4 hover:border-amber-500/60 hover:bg-gray-800/80 transition-all active:scale-95 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-4 py-3 text-center flex-shrink-0">
                  <p className="text-amber-400 font-black text-lg">{new Date(gig.date_start).getDate()}</p>
                  <p className="text-amber-600 text-xs font-bold">{new Date(gig.date_start).toLocaleDateString('en', { month: 'short' })}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base">{gig.venue || gig.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{gig.location}</p>
                  <p className="text-red-400 font-bold text-sm mt-2">£{gig.fee?.toLocaleString()}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-600/50 flex-shrink-0 mt-1" />
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}