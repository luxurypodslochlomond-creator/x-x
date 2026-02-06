import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Sparkles, Mic2, Music, ClipboardList, Users, ChevronDown, Mail, Zap } from 'lucide-react';
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
                              <button
                                onClick={() => navigate(createPageUrl(`ScottArtistHome?id=${artist.id}`))}
                                className="flex flex-col items-center gap-2 p-2 rounded-lg transition-all w-full bg-black border border-cyan-500/30 hover:border-cyan-400"
                              >
                                {artist.profile_pic_url ? (
                                  <img 
                                    src={artist.profile_pic_url} 
                                    alt={artist.name}
                                    className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-black text-xs flex items-center justify-center">
                                    {artist.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <p className="text-cyan-300 font-bold text-[10px] text-center truncate w-full px-1">{artist.name}</p>
                              </button>
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
                            navigate(createPageUrl(`ScottArtistHome?id=${artist.id}`));
                          }}
                          className="flex-1 flex items-center gap-2 px-3 py-2 rounded transition-colors bg-black border border-cyan-500/20 hover:border-cyan-400"
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

          {/* MAIN CONTENT - Manager-focused flow */}
          <div className="px-4 pt-4 pb-32 space-y-4">

            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">Select an artist to get started</p>
            </div>
          </div>
        </div>
      </CB51ErrorBoundary>
    </CB51PINGuard>
  );
}