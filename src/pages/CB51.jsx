import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Sparkles, Mic2, Music, ClipboardList, Users, ChevronDown, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51TestRoleSwitcher from '@/components/scott/CB51TestRoleSwitcher';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import CB51NotificationFeed from '@/components/cb51/CB51NotificationFeed';
import CB51GigUploadParser from '@/components/cb51/CB51GigUploadParser';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testRole, setTestRole] = useState('manager');
  const [activeArtistId, setActiveArtistId] = useState(null);
  const [showArtistMenu, setShowArtistMenu] = useState(false);

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
    queryFn: () => base44.entities.ScottArtist.filter({}),
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
  const currentArtist = artists.find(a => a.id === currentArtistId);

  return (
                <CB51PINGuard>
                  <CB51ErrorBoundary>
                  <div className="min-h-screen bg-black text-white pb-20">

              {/* ARTIST SELECTOR - Clean & minimal */}
              {artists.length > 0 && currentArtist && (
                <div className="px-4 py-3 border-b border-cyan-500/20">
                  <div className="relative inline-block w-full">
                    <motion.button
                      onClick={() => setShowArtistMenu(!showArtistMenu)}
                      className="w-full flex items-center gap-3 p-3 bg-black border-2 border-cyan-500/40 hover:border-cyan-500 rounded-lg transition-all group"
                    >
                      {currentArtist.profile_pic_url ? (
                        <img 
                          src={currentArtist.profile_pic_url} 
                          alt={currentArtist.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/40 group-hover:border-cyan-500"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-black text-sm flex items-center justify-center border-2 border-cyan-500/40">
                          {currentArtist.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 text-left">
                        <p className="text-cyan-400 font-black text-sm">{currentArtist.name}</p>
                        <p className="text-gray-500 text-xs">Select artist</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${showArtistMenu ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* DROPDOWN MENU */}
                    <AnimatePresence>
                      {showArtistMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-black border-2 border-cyan-500/40 rounded-lg overflow-y-auto z-10 max-h-48"
                        >
                          {artists.map((artist) => (
                            <motion.button
                              key={artist.id}
                              onClick={() => {
                                setActiveArtistId(artist.id);
                                setShowArtistMenu(false);
                              }}
                              className={`w-full flex items-center gap-2 px-3 py-2 border-b border-cyan-500/20 last:border-b-0 hover:bg-cyan-500/10 transition-colors ${
                                artist.id === currentArtistId ? 'bg-cyan-500/20' : ''
                              }`}
                            >
                              {artist.profile_pic_url ? (
                                <img 
                                  src={artist.profile_pic_url} 
                                  alt={artist.name}
                                  className="w-6 h-6 rounded-full object-cover border border-cyan-500/40 flex-shrink-0"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-black text-[10px] flex items-center justify-center border border-cyan-500/40 flex-shrink-0">
                                  {artist.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="text-cyan-400 font-bold text-xs truncate">{artist.name}</span>
                            </motion.button>
                          ))}
                          <motion.button
                            onClick={() => {
                              setShowArtistMenu(false);
                              navigate(createPageUrl('ScottAddArtist'));
                            }}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 border-t border-cyan-500/20 hover:bg-green-500/10 text-green-400 font-bold text-xs transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            Add
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* MAIN CONTENT */}
              <div className="px-4 space-y-6 pt-6 pb-20">

                {/* AI51 SCAN - Hero action */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                  className="w-full relative overflow-hidden rounded-2xl group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-cyan-950/40 to-black border border-cyan-500/30 hover:border-cyan-500/60 backdrop-blur-sm p-6 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <h2 className="text-white font-black text-lg">AI51 SCAN</h2>
                    </div>
                    <p className="text-gray-400 text-xs">Upload PDF contracts or gig offers</p>
                  </div>
                </motion.button>

                {/* GIG UPLOAD - Hidden file input */}
                {currentArtistId && (
                  <div className="hidden">
                    <CB51GigUploadParser 
                      artistId={currentArtistId}
                      onGigCreated={() => {}}
                    />
                  </div>
                )}

                {/* NOTIFICATIONS FEED */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-3">Approvals</h3>
                  {currentArtistId && <CB51NotificationFeed artistId={currentArtistId} />}
                </motion.div>

                {/* ACTION SHORTCUTS */}
                <div className="pt-4">
                  <h3 className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-3">Quick Access</h3>
                  <div className="space-y-2">
                    {[
                      { icon: Mail, label: 'EMAIL', color: 'cyan', route: 'ScottMessageInbox' },
                      { icon: Calendar, label: 'CALENDAR', color: 'cyan', route: 'ScottCalendarView' },
                      { icon: CheckCircle, label: 'TASKS', color: 'cyan', route: 'ScottToDo', badge: '5' },
                      { icon: DollarSign, label: 'FINANCE', color: 'green', route: 'ScottFinanceAdmin' },
                    ].map(({ icon: Icon, label, color, route, badge }) => (
                      <motion.button
                        key={label}
                        whileHover={{ x: 4 }}
                        onClick={() => navigate(createPageUrl(currentArtistId ? `${route}?id=${currentArtistId}` : route))}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 group ${
                          color === 'green'
                            ? 'bg-green-950/10 border-green-500/20 hover:border-green-500/40 hover:bg-green-950/20'
                            : 'bg-cyan-950/10 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-950/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${color === 'green' ? 'text-green-400' : 'text-cyan-400'}`} />
                          <span className={`font-bold text-sm font-mono ${color === 'green' ? 'text-green-400' : 'text-cyan-400'}`}>
                            {label}
                          </span>
                        </div>
                        {badge ? (
                          <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                            color === 'green'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-cyan-500/20 text-cyan-300'
                          }`}>
                            {badge}
                          </span>
                        ) : (
                          <span className={`text-gray-600 group-hover:${color === 'green' ? 'text-green-400' : 'text-cyan-400'} transition-colors text-sm`}>→</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            </CB51ErrorBoundary>
            </CB51PINGuard>
            );
  }