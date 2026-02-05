import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Sparkles, Mic2, Music, ClipboardList, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51TestRoleSwitcher from '@/components/scott/CB51TestRoleSwitcher';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import CB51NotificationInbox from '@/components/cb51/CB51NotificationInbox';
import CB51GigUploadParser from '@/components/cb51/CB51GigUploadParser';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testRole, setTestRole] = useState('manager');
  const [showAllArtists, setShowAllArtists] = useState(false);

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

  const firstArtistId = artists.length > 0 ? artists[0].id : null;

  return (
                <CB51PINGuard>
                  <CB51ErrorBoundary>
                  <div className="min-h-screen bg-black text-white pb-20">

              {/* ARTIST CIRCLES - Horizontal scroll */}
              {artists.length > 0 && (
                <div className="px-4 py-4 border-b border-cyan-500/20">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {artists.map((artist) => (
                      <motion.button
                        key={artist.id}
                        onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 relative ${
                          artist.id === firstArtistId 
                            ? 'ring-2 ring-cyan-400' 
                            : 'hover:ring-1 hover:ring-cyan-400/50'
                        } transition-all`}
                      >
                        {artist.profile_pic_url ? (
                          <img 
                            src={artist.profile_pic_url} 
                            alt={artist.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/40 hover:border-cyan-500"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-black text-lg flex items-center justify-center border-2 border-cyan-500/40">
                            {artist.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-[9px] font-bold text-cyan-400 absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">{artist.name}</span>
                      </motion.button>
                    ))}
                    {artists.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(createPageUrl('ScottAddArtist'))}
                        className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-dashed border-cyan-500/40 hover:border-cyan-500 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                  <div className="h-6" />
                </div>
              )}

              {/* MAIN CONTENT */}
              <div className="px-4 space-y-4 pt-4">

                {/* GIG UPLOAD */}
                {firstArtistId && (
                  <CB51GigUploadParser 
                    artistId={firstArtistId}
                    onGigCreated={() => {}}
                  />
                )}

                {/* QUICK ACTIONS GRID */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => navigate(createPageUrl(firstArtistId ? `ScottCalendarView?id=${firstArtistId}` : 'ScottCalendarView'))}
                    className="bg-gradient-to-br from-cyan-900/40 to-black border-2 border-cyan-500/40 hover:border-cyan-500 rounded-lg p-3 text-center transition-all group"
                  >
                    <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <p className="text-cyan-400 font-black text-[9px] font-mono">CALENDAR</p>
                  </button>

                  <button
                    onClick={() => navigate(createPageUrl(firstArtistId ? `ScottToDo?id=${firstArtistId}` : 'ScottToDo'))}
                    className="bg-gradient-to-br from-cyan-900/40 to-black border-2 border-cyan-500/40 hover:border-cyan-500 rounded-lg p-3 text-center transition-all group"
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <p className="text-cyan-400 font-black text-[9px] font-mono">TASKS</p>
                  </button>

                  <button
                    onClick={() => navigate(createPageUrl(firstArtistId ? `ScottFinanceAdmin?id=${firstArtistId}` : 'ScottFinanceAdmin'))}
                    className="bg-gradient-to-br from-green-900/40 to-black border-2 border-green-500/40 hover:border-green-500 rounded-lg p-3 text-center transition-all group"
                  >
                    <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <p className="text-green-400 font-black text-[9px] font-mono">FINANCE</p>
                  </button>
                </div>

                {/* PENDING GIGS */}
                {firstArtistId && <CB51NotificationInbox artistId={firstArtistId} />}
              </div>
            </div>

            </CB51ErrorBoundary>
            </CB51PINGuard>
            );
  }