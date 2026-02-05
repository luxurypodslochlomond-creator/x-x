import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51NotificationCenter from '@/components/scott/CB51NotificationCenter';
import CB51TestRoleSwitcher from '@/components/scott/CB51TestRoleSwitcher';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testRole, setTestRole] = useState('manager');

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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="px-4 pt-4 pb-28">
          
          {/* NOTIFICATIONS - GLASS CARD */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />
          </motion.div>

          {/* ADD ARTIST - HERO CTA */}
          <motion.button
            onClick={() => navigate(createPageUrl('ScottAddArtist'))}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative w-full h-16 rounded-3xl overflow-hidden mb-6 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-green-500 to-cyan-500 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
            <div className="absolute inset-[2px] bg-gradient-to-r from-cyan-500/90 to-green-500/90 rounded-3xl flex items-center justify-center gap-2">
              <Plus className="w-6 h-6 text-white" strokeWidth={3} />
              <span className="text-white font-black text-lg tracking-wide">ADD ARTIST</span>
              <Sparkles className="w-5 h-5 text-white/80" />
            </div>
          </motion.button>

          {/* ARTISTS GRID */}
          {artists.length > 0 && (
            <div className="space-y-3 mb-6">
              <AnimatePresence mode="popLayout">
                {artists.map((artist, i) => (
                  <motion.button
                    key={artist.id}
                    layoutId={`artist-${artist.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                    className="relative w-full p-4 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="flex items-center gap-4">
                      {artist.profile_pic_url ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-green-500 rounded-2xl blur opacity-60" />
                          <img src={artist.profile_pic_url} alt="" className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-green-400 to-cyan-500 flex items-center justify-center text-black font-black text-2xl shadow-xl">
                          {artist.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 text-left">
                        <p className="text-white font-black text-lg tracking-tight">{artist.name}</p>
                        <p className="text-cyan-400 text-sm font-semibold">Tap to manage</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="text-cyan-400 text-2xl"
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* QUICK ACTIONS - GLASS CARDS */}
          <div className="space-y-3">
            {[
              { icon: Calendar, label: 'Calendar', page: 'ScottCalendarView', color: 'from-amber-500 to-orange-500' },
              { icon: CheckCircle, label: 'Tasks', page: 'ScottToDo', color: 'from-green-500 to-emerald-500' },
              { icon: DollarSign, label: 'Finance', page: 'ScottFinanceAdmin', color: 'from-cyan-500 to-blue-500' },
            ].map(({ icon: Icon, label, page, color }, i) => (
              <motion.button
                key={page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => navigate(createPageUrl(page))}
                whileTap={{ scale: 0.96 }}
                className="relative w-full h-16 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-4 px-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="flex-1 text-left text-white font-bold text-base tracking-tight">{label}</span>
                  <motion.div
                    className="text-white/40 text-xl"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      
      {user && <CB51TestRoleSwitcher currentRole={testRole} onRoleChange={setTestRole} />}
    </>
  );
}