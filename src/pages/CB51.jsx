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
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-4 pt-4 pb-20">
        
        {/* NOTIFICATIONS - TOP PRIORITY */}
        <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />

        {/* ARTISTS - MAX 2 VISIBLE */}
        {artists.length > 0 && (
          <div className="space-y-3 mb-6">
            {artists.slice(0, 2).map((artist, i) => (
              <motion.button
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                className="w-full p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 active:bg-white/10 flex items-center gap-3"
              >
                {artist.profile_pic_url ? (
                  <img src={artist.profile_pic_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center text-black font-black text-lg">
                    {artist.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className="text-white font-bold">{artist.name}</p>
                </div>
                <div className="text-white/40 text-xl">→</div>
              </motion.button>
            ))}
            {artists.length > 2 && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(createPageUrl('ScottAddArtist'))}
                className="w-full h-12 rounded-2xl border-2 border-dashed border-white/20 text-white/60 text-sm font-semibold"
              >
                + {artists.length - 2} more
              </motion.button>
            )}
          </div>
        )}

        {/* ADD ARTIST */}
        <motion.button
          onClick={() => navigate(createPageUrl('ScottAddArtist'))}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-green-500 text-white font-black text-base mb-6"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          ADD ARTIST
        </motion.button>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Calendar, label: 'Calendar', page: 'ScottCalendarView' },
            { icon: CheckCircle, label: 'Tasks', page: 'ScottToDo' },
            { icon: DollarSign, label: 'Finance', page: 'ScottFinanceAdmin' },
          ].map(({ icon: Icon, label, page }) => (
            <motion.button
              key={page}
              onClick={() => navigate(createPageUrl(page))}
              whileTap={{ scale: 0.95 }}
              className="h-20 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2"
            >
              <Icon className="w-6 h-6 text-cyan-400" />
              <span className="text-white text-xs font-semibold">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {user && <CB51TestRoleSwitcher currentRole={testRole} onRoleChange={setTestRole} />}
    </>
  );
}