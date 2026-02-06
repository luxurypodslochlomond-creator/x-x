import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Mail, Users, ChevronDown, ChevronRight, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import CB51NotificationFeed from '@/components/cb51/CB51NotificationFeed';
import CB51GigUploadParser from '@/components/cb51/CB51GigUploadParser';
import CB51AddBandMemberSheet from '@/components/cb51/CB51AddBandMemberSheet';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeArtistId, setActiveArtistId] = useState(null);
  const [showArtistMenu, setShowArtistMenu] = useState(false);
  const [showAddMemberSheet, setShowAddMemberSheet] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        navigate(createPageUrl('CB51Login'));
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: artists = [] } = useQuery({
    queryKey: ['cb51Artists'],
    queryFn: () => base44.entities.Artist.filter({}),
    enabled: !!user,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500"
        />
      </div>
    );
  }

  const currentArtistId = activeArtistId || (artists.length > 0 ? artists[0].id : null);

  return (
    <CB51PINGuard>
      <CB51ErrorBoundary>
        <div className="min-h-screen bg-black text-white pb-20">
          {/* ARTIST GRID - Show 3 */}
          {artists.length > 0 && (
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">Artists</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                          {artists.slice(0, 2).map((artist) => (
                            <div key={artist.id} className="relative">
                              <Link
                                to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}
                                onClick={() => setActiveArtistId(artist.id)}
                                className="flex flex-col items-center gap-2 p-2 rounded-lg transition-all w-full block bg-black border border-cyan-500/30 hover:border-cyan-400"
                              >
                                {artist.profile_pic_url ? (
                                  <img 
                                    src={artist.profile_pic_url} 
                                    alt={artist.name}
                                    className="w-10 h-10 rounded-full object-cover border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-black text-xs flex items-center justify-center hover:brightness-110 transition-all cursor-pointer">
                                    {artist.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <p className="text-cyan-300 font-bold text-[10px] text-center truncate w-full px-1">{artist.name}</p>
                              </Link>
                              <button
                                onClick={() => navigate(createPageUrl(`CB51AddArtist?edit=${artist.id}`))}
                                className="absolute top-1 right-1 bg-black/80 border border-cyan-500/40 hover:border-cyan-400 rounded p-1 transition-all"
                              >
                                <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => navigate(createPageUrl('CB51AddArtist'))}
                            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-black border border-green-500/40 hover:border-green-400 transition-all"
                          >
                            <Plus className="w-6 h-6 text-green-400" />
                            <p className="text-green-300 font-bold text-[10px]">Add</p>
                          </button>
                          {artists.length > 2 && (
                            <button
                              onClick={() => setShowArtistMenu(true)}
                              className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-black border border-cyan-500/30 hover:border-cyan-400 transition-all"
                            >
                              <Plus className="w-4 h-4 text-cyan-400" />
                              <p className="text-cyan-300 font-bold text-[10px]">More</p>
                            </button>
                          )}
              </div>
            </div>
          )}

          {/* ARTIST MENU - Hidden dropdown */}
          <AnimatePresence>
            {showArtistMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowArtistMenu(false)}
                className="fixed inset-0 z-40 bg-black/80"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-cyan-500/40 rounded-lg p-4 w-80 max-h-96 overflow-y-auto z-50"
                >
                  <h2 className="text-cyan-400 font-bold text-sm mb-3">Select Artist</h2>
                  <div className="space-y-2">
                    {artists.map((artist) => (
                      <div key={artist.id} className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowArtistMenu(false);
                            setActiveArtistId(artist.id);
                          }}
                          className={`flex-1 flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                            artist.id === currentArtistId
                              ? 'bg-cyan-500/20 border border-cyan-400'
                              : 'bg-black border border-cyan-500/20 hover:border-cyan-400'
                          }`}
                        >
                          {artist.profile_pic_url ? (
                            <img 
                              src={artist.profile_pic_url} 
                              alt={artist.name}
                              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-cyan-500 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0">
                              {artist.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-cyan-300 font-bold text-xs flex-1 text-left truncate">{artist.name}</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowArtistMenu(false);
                            navigate(createPageUrl(`CB51AddArtist?edit=${artist.id}`));
                          }}
                          className="bg-black border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 rounded px-2 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setShowArtistMenu(false);
                        navigate(createPageUrl('CB51AddArtist'));
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-green-500/30 hover:border-green-400 text-green-400 font-bold text-xs rounded transition-colors mt-2"
                    >
                      <Plus className="w-3 h-3" />
                      Add New
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAIN CONTENT - Quantum perfect minimalist grid like artist page */}
          <div className="px-4 pt-4 pb-32">

            {currentArtistId ? (
              <div className="space-y-4">
                {/* QUICK ACTIONS GRID - 2x2 like artist page */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(createPageUrl(`ScottLive?id=${currentArtistId}`))}
                    className="aspect-square bg-black border-2 border-cyan-500/40 hover:border-cyan-500 rounded-lg flex flex-col items-center justify-center gap-2 transition-all group"
                  >
                    <div className="w-12 h-12 bg-cyan-500 rounded flex items-center justify-center group-hover:brightness-110 transition-all">
                      <span className="text-black font-black text-xl">🎵</span>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold text-xs tracking-widest">LIVE</span>
                  </button>

                  <button
                    onClick={() => navigate(createPageUrl(`ScottSessions?id=${currentArtistId}`))}
                    className="aspect-square bg-black border-2 border-amber-500/40 hover:border-amber-500 rounded-lg flex flex-col items-center justify-center gap-2 transition-all group"
                  >
                    <div className="w-12 h-12 bg-amber-500 rounded flex items-center justify-center group-hover:brightness-110 transition-all">
                      <span className="text-black font-black text-xl">⚡</span>
                    </div>
                    <span className="text-amber-400 font-mono font-bold text-xs tracking-widest">SESSIONS</span>
                  </button>

                  <button
                    onClick={() => navigate(createPageUrl('ScottToDo'))}
                    className="aspect-square bg-black border-2 border-cyan-500/40 hover:border-cyan-500 rounded-lg flex flex-col items-center justify-center gap-2 transition-all group"
                  >
                    <div className="w-12 h-12 bg-cyan-500 rounded flex items-center justify-center group-hover:brightness-110 transition-all">
                      <span className="text-black font-black text-xl">✓</span>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold text-xs tracking-widest">TO-DO</span>
                  </button>

                  <button
                    onClick={() => navigate(createPageUrl('ScottFinanceAdmin'))}
                    className="aspect-square bg-black border-2 border-green-500/40 hover:border-green-500 rounded-lg flex flex-col items-center justify-center gap-2 transition-all group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center group-hover:brightness-110 transition-all">
                      <span className="text-black font-black text-xl">💰</span>
                    </div>
                    <span className="text-green-400 font-mono font-bold text-xs tracking-widest">FINANCE</span>
                  </button>
                </div>

                {/* GIGS SECTION - Full width expandable */}
                <div>
                  <button 
                    onClick={() => setExpandedSections({...expandedSections, gigs: !expandedSections.gigs})}
                    className="w-full"
                  >
                    <div className="bg-black border-2 border-cyan-500/40 hover:border-cyan-500 px-4 py-3 flex items-center justify-between transition-all">
                      <div className="text-cyan-400 font-mono font-black text-sm tracking-wider flex items-center gap-2">
                        📅 UPCOMING GIGS
                      </div>
                      {expandedSections.gigs ? <Minus className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>
                  {expandedSections.gigs && (
                    <div className="border-2 border-cyan-500/40 border-t-0 p-4 bg-black">
                      <p className="text-gray-400 text-xs text-center mb-3 font-mono">No upcoming gigs</p>
                      <button
                        onClick={() => navigate(createPageUrl(`ScottCalendarView?id=${currentArtistId}`))}
                        className="w-full border-2 border-cyan-500/40 hover:border-cyan-500 px-4 py-3 text-cyan-400 font-mono font-bold text-xs tracking-widest transition-all"
                      >
                        VIEW CALENDAR
                      </button>
                    </div>
                  )}
                </div>

                {/* BAND MEMBERS SECTION - Full width expandable */}
                <div>
                  <button 
                    onClick={() => setExpandedSections({...expandedSections, tools: !expandedSections.tools})}
                    className="w-full"
                  >
                    <div className="bg-black border-2 border-green-500/40 hover:border-green-500 px-4 py-3 flex items-center justify-between transition-all">
                      <div className="text-green-400 font-mono font-black text-sm tracking-wider flex items-center gap-2">
                        👥 BAND MEMBERS
                      </div>
                      {expandedSections.tools ? <Minus className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>
                  {expandedSections.tools && (
                    <div className="border-2 border-green-500/40 border-t-0 p-4 bg-black space-y-2">
                      <p className="text-gray-400 text-xs text-center font-mono mb-3">Add band members to vote on gigs</p>
                      <button
                        onClick={() => setShowAddMemberSheet(true)}
                        className="w-full border-2 border-green-500/40 hover:border-green-500 px-4 py-2 text-green-400 font-mono font-bold text-xs tracking-widest transition-all"
                      >
                        + ADD MEMBER
                      </button>
                    </div>
                  )}
                </div>

                {/* NEW GIG SECTION - Full width expandable */}
                <div>
                  <button 
                    onClick={() => setExpandedSections({...expandedSections, notifications: !expandedSections.notifications})}
                    className="w-full"
                  >
                    <div className="bg-black border-2 border-cyan-500/40 hover:border-cyan-500 px-4 py-3 flex items-center justify-between transition-all">
                      <div className="text-cyan-400 font-mono font-black text-sm tracking-wider flex items-center gap-2">
                        📥 NEW GIG
                      </div>
                      {expandedSections.notifications ? <Minus className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>
                  {expandedSections.notifications && (
                    <div className="border-2 border-cyan-500/40 border-t-0 p-4 bg-black">
                      <CB51GigUploadParser 
                        artistId={currentArtistId}
                        onGigCreated={() => {}}
                      />
                    </div>
                  )}
                </div>

                {/* NOTIFICATIONS SECTION */}
                <div>
                  <div className="bg-black border-2 border-red-500/40 px-4 py-3">
                    <div className="text-red-400 font-mono font-black text-sm tracking-wider flex items-center gap-2 mb-3">
                      ⚠️ ACTION REQUIRED
                    </div>
                    <CB51NotificationFeed artistId={currentArtistId} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-mono">Select an artist to get started</p>
              </div>
            )}
          </div>
        </div>
      <CB51AddBandMemberSheet
        artistId={currentArtistId}
        isOpen={showAddMemberSheet}
        onClose={() => setShowAddMemberSheet(false)}
        onMemberAdded={() => {}}
      />
      </CB51ErrorBoundary>
      </CB51PINGuard>
      );
      }