import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Home, Mail, CheckCircle, DollarSign, Calendar, Users, ChevronRight,
  Zap, AlertCircle, ArrowUp
} from 'lucide-react';
import CB51GigDecisionEngine from './CB51GigDecisionEngine';
import CB51ConfirmedGigDraftEmail from './CB51ConfirmedGigDraftEmail';
import CB51GigUploadParser from './CB51GigUploadParser';

/**
 * CB51 UNIFIED DASHBOARD
 * Single screen, native app feel
 * Tabs: Gigs, Inbox, Tasks, Finance, Calendar
 * Everything scrolls inline, no page jumps ♾️❤️
 */

export default function CB51UnifiedDashboard({ artistId }) {
  const [activeTab, setActiveTab] = useState('gigs');
  const [scrollY, setScrollY] = useState(0);
  const [reviewingGig, setReviewingGig] = useState(null);
  const [confirmingGig, setConfirmingGig] = useState(false);
  const scrollContainerRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch all data in parallel
  const { data: messages = [] } = useQuery({
    queryKey: ['cb51Messages', artistId],
    queryFn: () => base44.entities.CB51Message?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['cb51Tasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId
  });

  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
    enabled: !!artistId
  });

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId
  });

  const { data: artist = {} } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => base44.entities.Artist?.get?.(artistId).catch(() => ({})),
    enabled: !!artistId
  });

  // Handle scroll for sticky header effect
  const handleScroll = (e) => {
    setScrollY(e.target.scrollLeft);
  };

  const handleConfirmGig = async (gig) => {
    setConfirmingGig(true);
    try {
      // Update gig status to confirmed
      await base44.entities.GigOffer.update(gig.id, { status: 'confirmed', manager_approved: true });
      
      // Send push notification to artist
      await base44.functions.invoke('sendGigConfirmationPush', {
        artistId: artistId,
        gigId: gig.id,
        gigVenue: gig.venue,
        gigDate: gig.date_start,
        gigFee: gig.fee
      });

      // Invalidate queries to refresh
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      queryClient.invalidateQueries({ queryKey: ['confirmedGigs', artistId] });
      setReviewingGig(null);
    } catch (error) {
      console.error('Error confirming gig:', error);
    } finally {
      setConfirmingGig(false);
    }
  };

  const toggleReviewGig = (gig) => {
    setReviewingGig(reviewingGig?.id === gig.id ? null : gig);
  };

  // Tab config with colour system
  const tabs = [
    { id: 'gigs', label: 'Gigs', icon: Zap, badge: 0, color: 'cyan' },
    { id: 'inbox', label: 'Inbox', icon: Mail, badge: messages.length, color: 'cyan' },
    { id: 'tasks', label: 'TO-DO', icon: CheckCircle, badge: tasks.filter(t => t.status !== 'done').length, color: 'green' },
    { id: 'finance', label: 'Finance', icon: DollarSign, badge: 0, color: 'red' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: confirmedGigs.length, color: 'amber' }
  ];

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* ── STICKY TAB BAR ── */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        {/* SCROLL TABS */}
        <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-2 px-4 py-4" onScroll={handleScroll}>
          {tabs.map(tab => {
           const Icon = tab.icon;
           const isActive = activeTab === tab.id;
           const colorMap = {
              cyan: { active: 'border-cyan-400 text-cyan-400 bg-cyan-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              orange: { active: 'border-orange-500 text-orange-400 bg-orange-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              green: { active: 'border-green-500 text-green-400 bg-green-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              red: { active: 'border-red-500 text-red-400 bg-red-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              amber: { active: 'border-amber-400 text-amber-400 bg-amber-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' }
            };
            const colors = colorMap[tab.color] || colorMap.cyan;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 font-black text-xs whitespace-nowrap transition-all border-b-2 flex-shrink-0 rounded-lg ${
                  isActive ? colors.active : colors.inactive
                }`}
              >
                 <Icon className="w-6 h-6" />
                 <span>{tab.label}</span>
                 {tab.badge > 0 && (
                   <span className={`px-2 py-0.5 text-white text-xs font-black rounded-full ${
                     tab.color === 'cyan' ? 'bg-cyan-500' :
                     tab.color === 'orange' ? 'bg-orange-500' :
                     tab.color === 'green' ? 'bg-green-500' :
                     tab.color === 'red' ? 'bg-red-500' :
                     'bg-amber-500'
                   }`}>
                     {tab.badge}
                   </span>
                 )}
               </button>
             );
           })}
         </div>
       </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* GIGS TAB */}
            {activeTab === 'gigs' && (
              <motion.div
                key="gigs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-6 space-y-8"
                >
                {/* UPLOAD NEW OFFER */}
                <div>
                  <div className="space-y-2 mb-4">
                    <h2 className="text-white font-black text-lg">Add Gig Offer</h2>
                    <p className="text-gray-500 text-sm">Paste email, upload screenshot, or drag file</p>
                  </div>
                  <CB51GigUploadParser artistId={artistId} onSuccess={() => queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] })} />
                </div>

                {/* PENDING OFFERS FOR REVIEW - INLINE DROPDOWN */}
                {pendingGigs.length > 0 && (
                  <div className="border-t border-cyan-500/10 pt-8">
                    <div className="space-y-2 mb-6">
                      <h2 className="text-cyan-400 font-black text-xl">Awaiting Your Approval</h2>
                      <p className="text-gray-500 text-sm">Review and confirm to notify artist</p>
                    </div>
                    <div className="space-y-2">
                      {pendingGigs.slice(0, 5).map(gig => (
                        <motion.div key={gig.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                          <button
                            onClick={() => toggleReviewGig(gig)}
                            className="w-full text-left bg-gray-900 border border-cyan-500/20 hover:border-cyan-500/40 rounded-lg p-4 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-bold">{gig.venue}</p>
                                <p className="text-gray-400 text-sm">{gig.date_start}</p>
                                <p className="text-cyan-400 font-bold text-sm mt-1">£{gig.fee?.toLocaleString()}</p>
                              </div>
                              <motion.div
                                animate={{ rotate: reviewingGig?.id === gig.id ? 180 : 0 }}
                                className="text-cyan-400 flex-shrink-0"
                              >
                                ▼
                              </motion.div>
                            </div>
                          </button>

                          {/* INLINE REVIEW DROPDOWN */}
                          <AnimatePresence>
                            {reviewingGig?.id === gig.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-gray-800/50 border border-t-0 border-cyan-500/20 rounded-b-lg p-4 space-y-3">
                                  {gig.location && (
                                    <div>
                                      <p className="text-gray-500 text-xs mb-1">LOCATION</p>
                                      <p className="text-gray-300 text-sm">{gig.location}</p>
                                    </div>
                                  )}
                                  {gig.promoter_name && (
                                    <div>
                                      <p className="text-gray-500 text-xs mb-1">PROMOTER</p>
                                      <p className="text-gray-300 font-bold text-sm">{gig.promoter_name}</p>
                                      {gig.promoter_contact && (
                                        <p className="text-gray-400 text-xs mt-1">{gig.promoter_contact}</p>
                                      )}
                                    </div>
                                  )}
                                  <div className="flex gap-2 pt-2 border-t border-gray-700">
                                    <button
                                      onClick={() => setReviewingGig(null)}
                                      disabled={confirmingGig}
                                      className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-bold text-sm transition-colors disabled:opacity-50"
                                    >
                                      Reject
                                    </button>
                                    <button
                                      onClick={() => handleConfirmGig(gig)}
                                      disabled={confirmingGig}
                                      className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-bold text-sm transition-colors disabled:opacity-50"
                                    >
                                      {confirmingGig ? 'Confirming...' : 'Confirm'}
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DECISION ENGINE */}
                <div className="border-t border-cyan-500/10 pt-8">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-cyan-400 font-black text-xl">Pending Offers</h2>
                    <p className="text-gray-500 text-sm">YES/NO to decide · AI reads offers instantly</p>
                  </div>
                  <CB51GigDecisionEngine artistId={artistId} />
                </div>

                {/* CONFIRMED GIGS - Ready to send to promoter */}
                <div className="border-t border-cyan-500/10 pt-8">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-cyan-400 font-black text-xl">Confirmed Gigs</h2>
                    <p className="text-gray-500 text-sm">Draft email ready · tap to send to promoter</p>
                  </div>
                  <CB51ConfirmedGigDraftEmail artistId={artistId} />
                </div>
              </motion.div>
            )}

            {/* INBOX TAB */}
            {activeTab === 'inbox' && (
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
            )}

            {/* TASKS TAB */}
            {activeTab === 'tasks' && (
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
                     {tasks.filter(t => t.status !== 'done').length} active, {tasks.filter(t => t.status === 'done').length} done
                   </p>
                 </div>

                 {tasks.length === 0 ? (
                   <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-6 text-center">
                     <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                     <p className="text-green-400 font-bold">No tasks</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tasks.filter(t => t.status !== 'done').map(task => (
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
            )}

            {/* FINANCE TAB */}
            {activeTab === 'finance' && (
              <motion.div
                key="finance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-6 space-y-6"
                >
                <div className="space-y-2 mb-6">
                  <h2 className="text-red-400 font-black text-xl">Finance</h2>
                  <p className="text-gray-500 text-sm">Gig earnings summary</p>
                </div>

                {confirmedGigs.length === 0 ? (
                  <div className="bg-gray-900 border border-white/10 rounded-xl p-6 text-center">
                    <DollarSign className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400 font-bold">No confirmed gigs yet</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
                       <p className="text-gray-400 text-xs mb-1">Total Earned (Confirmed)</p>
                       <p className="text-red-400 font-black text-3xl">
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
                            <p className="text-red-400 font-black">£{gig.fee}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* CALENDAR TAB */}
            {activeTab === 'calendar' && (
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
                         onClick={() => window.location.href = `/ScottLive?gig=${gig.id}`}
                         className="w-full text-left bg-gray-900 border border-amber-500/20 rounded-lg p-4 hover:border-amber-500/60 hover:bg-gray-800/80 transition-all active:scale-95"
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
            )}
          </AnimatePresence>
        </div>

        {/* PADDING FOR SCROLL */}
        <div className="h-6" />
      </div>



      {/* SCROLL TO TOP BUTTON */}
      {scrollY > 100 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg transition-colors"
          style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
      </div>
      );
      }