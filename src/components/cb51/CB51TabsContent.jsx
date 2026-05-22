import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle, DollarSign, Calendar, ChevronRight, Plus, X } from 'lucide-react';
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
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('normal');
  const [saving, setSaving] = useState(false);

  const { data: tasks = [] } = useQuery({
    queryKey: ['cb51Tasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000
  });

  const activeTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    await base44.entities.CB51Task.create({ title: newTitle.trim(), artist_id: artistId, priority: newPriority, status: 'pending' });
    queryClient.invalidateQueries({ queryKey: ['cb51Tasks', artistId] });
    setNewTitle('');
    setNewPriority('normal');
    setShowAdd(false);
    setSaving(false);
  };

  const markDone = (taskId) => {
    base44.entities.CB51Task.update(taskId, { status: 'done' })
      .then(() => queryClient.invalidateQueries({ queryKey: ['cb51Tasks', artistId] }));
  };

  const deleteTask = (taskId) => {
    base44.entities.CB51Task.delete(taskId)
      .then(() => queryClient.invalidateQueries({ queryKey: ['cb51Tasks', artistId] }));
  };

  return (
    <motion.div
      key="tasks"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 px-4 space-y-4"
    >
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-red-400 font-black text-xl">TO-DO</h2>
          <p className="text-gray-500 text-xs">{activeTasks.length} open · {doneTasks.length} done</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-2 rounded-xl font-black text-xs active:scale-95 transition-all"
        >
          {showAdd ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          {showAdd ? 'CANCEL' : 'ADD TASK'}
        </button>
      </div>

      {/* Add task form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-950 border-2 border-red-500/40 rounded-2xl p-4 space-y-3">
              <input
                autoFocus
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                placeholder="What needs doing?"
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white font-bold text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/60"
              />
              <div className="flex gap-2">
                {['normal', 'high', 'urgent'].map(p => (
                  <button
                    key={p}
                    onClick={() => setNewPriority(p)}
                    className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                      newPriority === p
                        ? p === 'urgent' ? 'bg-red-500 text-white' : p === 'high' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-white'
                        : 'bg-gray-900 text-gray-500 border border-gray-800'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddTask}
                disabled={!newTitle.trim() || saving}
                className="w-full bg-red-500 hover:bg-red-400 active:scale-95 disabled:opacity-40 text-white font-black py-3 rounded-xl text-sm transition-all"
              >
                {saving ? 'SAVING…' : 'ADD TASK'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active tasks */}
      {activeTasks.length === 0 && !showAdd ? (
        <div className="bg-gray-950 border border-red-500/20 rounded-2xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-red-400/40 mx-auto mb-2" />
          <p className="text-gray-500 font-bold text-sm">Nothing on the list</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activeTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-gray-950 border border-gray-800 rounded-xl p-3.5 flex items-center gap-3"
            >
              <button
                onClick={() => markDone(task.id)}
                className="w-6 h-6 rounded-full border-2 border-gray-600 hover:border-green-500 flex-shrink-0 flex items-center justify-center transition-colors active:scale-90"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">{task.title}</p>
                {task.deadline && (
                  <p className="text-gray-500 text-xs mt-0.5">Due {new Date(task.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {task.priority && task.priority !== 'normal' && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                    task.priority === 'urgent' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>{task.priority.toUpperCase()}</span>
                )}
                <button onClick={() => deleteTask(task.id)} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Done tasks — collapsed */}
      {doneTasks.length > 0 && (
        <div className="mt-4">
          <p className="text-gray-700 text-xs font-mono tracking-widest mb-2">DONE ({doneTasks.length})</p>
          <div className="space-y-1.5">
            {doneTasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center gap-3 px-3 py-2 rounded-lg opacity-40">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <p className="text-gray-500 text-sm line-through">{task.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// FINANCE TAB
export function CB51FinanceTab({ artistId }) {
  const { data: allGigs = [] } = useQuery({
    queryKey: ['allGigsFinance', artistId],
    queryFn: async () => {
      const [confirmed, pending] = await Promise.all([
        base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
        base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
      ]);
      return { confirmed, pending };
    },
    enabled: !!artistId,
    staleTime: 30000
  });

  const { confirmed: confirmedGigs = [], pending: pendingGigs = [] } = allGigs;
  const totalConfirmed = confirmedGigs.reduce((sum, g) => sum + (g.fee || 0), 0);
  const totalPending = pendingGigs.reduce((sum, g) => sum + (g.fee || 0), 0);
  const now = new Date();
  const upcomingGigs = confirmedGigs.filter(g => g.date_start && new Date(g.date_start) >= now);
  const pastGigs = confirmedGigs.filter(g => g.date_start && new Date(g.date_start) < now);

  return (
    <motion.div
      key="finance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 px-4 space-y-4"
    >
      <h2 className="text-green-400 font-black text-xl">Finance</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4">
          <p className="text-gray-500 text-[10px] font-mono tracking-widest mb-1">CONFIRMED</p>
          <p className="text-green-400 font-black text-2xl">£{totalConfirmed.toLocaleString()}</p>
          <p className="text-gray-600 text-xs mt-1">{confirmedGigs.length} gigs</p>
        </div>
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-4">
          <p className="text-gray-500 text-[10px] font-mono tracking-widest mb-1">PIPELINE</p>
          <p className="text-cyan-400 font-black text-2xl">£{totalPending.toLocaleString()}</p>
          <p className="text-gray-600 text-xs mt-1">{pendingGigs.length} pending</p>
        </div>
      </div>

      {/* Upcoming */}
      {upcomingGigs.length > 0 && (
        <div>
          <p className="text-gray-600 text-[10px] font-mono tracking-widest mb-2">UPCOMING</p>
          <div className="space-y-2">
            {upcomingGigs.sort((a, b) => new Date(a.date_start) - new Date(b.date_start)).map(gig => (
              <div key={gig.id} className="bg-gray-950 border border-green-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">{gig.venue || gig.title}</p>
                  <p className="text-gray-500 text-xs">{gig.date_start}</p>
                </div>
                <p className="text-green-400 font-black">£{(gig.fee || 0).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {pastGigs.length > 0 && (
        <div>
          <p className="text-gray-700 text-[10px] font-mono tracking-widest mb-2">HISTORY</p>
          <div className="space-y-1.5">
            {pastGigs.sort((a, b) => new Date(b.date_start) - new Date(a.date_start)).slice(0, 8).map(gig => (
              <div key={gig.id} className="bg-black border border-gray-800 rounded-xl px-4 py-2.5 flex items-center justify-between opacity-70">
                <div>
                  <p className="text-gray-300 font-bold text-sm">{gig.venue || gig.title}</p>
                  <p className="text-gray-600 text-xs">{gig.date_start}</p>
                </div>
                <p className="text-gray-400 font-black">£{(gig.fee || 0).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {confirmedGigs.length === 0 && pendingGigs.length === 0 && (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 text-center">
          <DollarSign className="w-8 h-8 text-gray-700 mx-auto mb-2" />
          <p className="text-gray-500 font-bold text-sm">No gigs yet — add your first offer</p>
        </div>
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