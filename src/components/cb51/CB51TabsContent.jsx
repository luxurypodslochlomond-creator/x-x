import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle, DollarSign, Calendar, Plus, X } from 'lucide-react';

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

// ─── SAFE DATE PARSE ───────────────────────────────────────────────────────────
const parseTabDate = (d) => {
  if (!d) return null;
  if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day);
  }
  return new Date(d);
};

// CALENDAR TAB
export function CB51CalendarTab({ artistId }) {
  const [openId, setOpenId] = useState(null);

  const { data: gigsRaw = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Dedupe then sort
  const gigs = gigsRaw
    .filter((g, i, arr) => arr.findIndex(x => x.id === g.id) === i)
    .sort((a, b) => (parseTabDate(a.date_start || a.date) || 0) - (parseTabDate(b.date_start || b.date) || 0));

  const upcoming = gigs.filter(g => {
    const d = parseTabDate(g.date_start || g.date);
    return d && d >= today;
  });
  const past = gigs.filter(g => {
    const d = parseTabDate(g.date_start || g.date);
    return d && d < today;
  }).reverse();

  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-4 px-4 space-y-3"
    >
      <div className="mb-4">
        <h2 className="font-black text-xl" style={{ color: '#f59e0b' }}>Shows</h2>
        <p className="text-xs font-mono mt-0.5" style={{ color: '#334155' }}>
          {upcoming.length} ahead{past.length > 0 ? ` · ${past.length} played` : ''}
        </p>
      </div>

      {gigs.length === 0 ? (
        <div className="rounded-2xl p-6 text-center" style={{ background: '#0e1420', border: '1px solid rgba(255,255,255,0.04)' }}>
          <Calendar className="w-7 h-7 mx-auto mb-2" style={{ color: '#1e293b' }} />
          <p className="font-bold text-sm" style={{ color: '#334155' }}>No shows confirmed yet</p>
        </div>
      ) : (
        <>
          {upcoming.map(gig => {
            const dateStr = gig.date_start || gig.date;
            const d = parseTabDate(dateStr);
            const days = d ? Math.ceil((d - today) / 86400000) : null;
            const isSoon = days !== null && days <= 7;
            const isOpen = openId === gig.id;
            return (
              <motion.div
                key={gig.id}
                layout
                className="rounded-2xl overflow-hidden"
                style={{ background: '#0e1420', border: `1px solid ${isSoon ? 'rgba(245,158,11,0.3)' : 'rgba(6,182,212,0.12)'}` }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : gig.id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:opacity-60 transition-opacity"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Date chip */}
                  <div className="flex-shrink-0 w-12 h-14 rounded-xl flex flex-col items-center justify-center"
                    style={{
                      background: isSoon ? 'rgba(245,158,11,0.08)' : 'rgba(6,182,212,0.06)',
                      border: `1px solid ${isSoon ? 'rgba(245,158,11,0.25)' : 'rgba(6,182,212,0.15)'}`,
                    }}>
                    <span className="font-black text-xl leading-none" style={{ color: isSoon ? '#f59e0b' : '#06b6d4' }}>
                      {d ? d.getDate() : '?'}
                    </span>
                    <span className="text-[9px] font-bold tracking-widest mt-0.5" style={{ color: '#334155' }}>
                      {d ? d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase() : ''}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-snug" style={{ color: '#f0f4ff' }}>{gig.venue}</p>
                    {gig.city && <p className="text-xs mt-0.5" style={{ color: '#334155' }}>{gig.city}</p>}
                    {gig.fee > 0 && <p className="text-xs font-black mt-1" style={{ color: '#10b981' }}>£{gig.fee.toLocaleString()}</p>}
                  </div>
                  {/* Days pill */}
                  {days !== null && (
                    <span className="text-xs font-black tabular-nums px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: isSoon ? 'rgba(245,158,11,0.1)' : 'rgba(6,182,212,0.06)',
                        color: isSoon ? '#f59e0b' : '#475569'
                      }}>
                      {days === 0 ? 'TODAY' : `${days}d`}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                      style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}
                    >
                      <div className="px-4 py-3 space-y-2 text-xs" style={{ color: '#94a3b8' }}>
                        {gig.time && <p><span style={{ color: '#334155' }}>Time:</span> {gig.time}</p>}
                        {gig.location && <p><span style={{ color: '#334155' }}>Address:</span> {gig.location}</p>}
                        {gig.promoter && <p><span style={{ color: '#334155' }}>Promoter:</span> {gig.promoter}</p>}
                        {gig.promoter_email && (
                          <a href={`mailto:${gig.promoter_email}`} className="block" style={{ color: '#06b6d4' }}>
                            {gig.promoter_email}
                          </a>
                        )}
                        {gig.promoter_phone && (
                          <a href={`tel:${gig.promoter_phone}`} className="block" style={{ color: '#06b6d4' }}>
                            {gig.promoter_phone}
                          </a>
                        )}
                        {gig.notes && <p style={{ color: '#475569' }}>{gig.notes}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {past.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] font-mono tracking-widest mb-2" style={{ color: '#1e293b' }}>
                PLAYED ({past.length})
              </p>
              <div className="space-y-1.5">
                {past.slice(0, 5).map(gig => {
                  const d = parseTabDate(gig.date_start || gig.date);
                  return (
                    <div key={gig.id} className="flex items-center gap-3 px-3 py-2 rounded-xl opacity-30"
                      style={{ background: '#0e1420' }}>
                      <span className="text-xs font-mono" style={{ color: '#475569' }}>
                        {d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
                      </span>
                      <p className="text-sm font-semibold flex-1 truncate" style={{ color: '#64748b' }}>{gig.venue}</p>
                      {gig.fee > 0 && <span className="text-xs" style={{ color: '#334155' }}>£{gig.fee.toLocaleString()}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}