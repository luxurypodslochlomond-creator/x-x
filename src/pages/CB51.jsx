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
              <div className="px-4 space-y-8 pt-8 pb-32">

                {/* HERO - AI51 SCAN with premium feel */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                  className="w-full group relative"
                >
                  {/* GLOW BG */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* CARD */}
                  <div className="relative bg-gradient-to-br from-cyan-950 via-black to-black rounded-3xl p-8 border border-cyan-500/50 group-hover:border-cyan-400/80 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                    {/* ANIMATED BG ACCENT */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mb-4"
                      >
                        <Sparkles className="w-8 h-8 text-cyan-400" />
                      </motion.div>
                      <h2 className="text-white font-black text-2xl mb-2 group-hover:text-cyan-300 transition-colors">
                        AI51 SCAN
                      </h2>
                      <p className="text-gray-400 text-sm">Upload contracts • Parse instantly • Auto-create gigs</p>
                    </div>
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

                {/* APPROVALS SECTION - More inviting */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="mb-4">
                    <h3 className="text-cyan-400 text-xs font-mono uppercase tracking-wider font-black">⚡ Approvals</h3>
                    <p className="text-gray-500 text-[10px] mt-1">Pending decisions</p>
                  </div>
                  {currentArtistId && <CB51NotificationFeed artistId={currentArtistId} />}
                </motion.div>

                {/* QUICK ACCESS - Premium layout */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-cyan-400 text-xs font-mono uppercase tracking-wider font-black mb-4">📋 Quick Access</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: 'EMAIL', color: 'cyan', route: 'ScottMessageInbox', desc: 'Messages' },
                      { icon: Calendar, label: 'CALENDAR', color: 'cyan', route: 'ScottCalendarView', desc: 'Shows' },
                      { icon: CheckCircle, label: 'TASKS', color: 'cyan', route: 'ScottToDo', badge: '5', desc: 'To-do' },
                      { icon: DollarSign, label: 'FINANCE', color: 'green', route: 'ScottFinanceAdmin', desc: 'Money' },
                    ].map(({ icon: Icon, label, color, route, badge, desc }) => (
                      <motion.button
                        key={label}
                        whileHover={{ x: 6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(createPageUrl(currentArtistId ? `${route}?id=${currentArtistId}` : route))}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 group ${
                          color === 'green'
                            ? 'bg-gradient-to-r from-green-950/30 to-black border-green-500/40 hover:border-green-400 hover:bg-gradient-to-r hover:from-green-950/50 hover:to-black'
                            : 'bg-gradient-to-r from-cyan-950/30 to-black border-cyan-500/40 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-950/50 hover:to-black'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            color === 'green'
                              ? 'bg-green-500/20'
                              : 'bg-cyan-500/20'
                          }`}>
                            <Icon className={`w-5 h-5 ${color === 'green' ? 'text-green-400' : 'text-cyan-400'}`} />
                          </div>
                          <div className="text-left">
                            <span className={`font-black text-sm font-mono ${color === 'green' ? 'text-green-300' : 'text-cyan-300'}`}>
                              {label}
                            </span>
                            <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
                          </div>
                        </div>
                        {badge ? (
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`text-xs font-black px-3 py-1.5 rounded-lg font-mono ${
                              color === 'green'
                                ? 'bg-green-500/30 text-green-300'
                                : 'bg-cyan-500/30 text-cyan-300'
                            }`}>
                            {badge}
                          </motion.span>
                        ) : (
                          <span className={`text-gray-600 group-hover:${color === 'green' ? 'text-green-400' : 'text-cyan-400'} transition-colors text-lg`}>→</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            </CB51ErrorBoundary>
            </CB51PINGuard>
            );
  }