import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, ChevronRight, Plus } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black px-5 pt-6 pb-32">
        
        <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />

        <motion.button
          onClick={() => navigate(createPageUrl('ScottAddArtist'))}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl font-black text-white text-base tracking-wide mb-6 active:opacity-90"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          ADD ARTIST
        </motion.button>

        {artists.length > 0 && (
          <div className="space-y-3 mb-6">
            <AnimatePresence>
              {artists.map((artist, i) => (
                <motion.button
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 active:bg-white/10 rounded-2xl border border-white/10"
                >
                  {artist.profile_pic_url ? (
                    <img src={artist.profile_pic_url} alt="" className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-black font-black text-xl">
                      {artist.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <p className="text-white font-bold text-base">{artist.name}</p>
                    <p className="text-cyan-400 text-sm">Manage</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="space-y-3">
          {[
            { icon: Calendar, label: 'Calendar', page: 'ScottCalendarView' },
            { icon: CheckCircle, label: 'Tasks', page: 'ScottToDo' },
            { icon: DollarSign, label: 'Finance', page: 'ScottFinanceAdmin' },
          ].map(({ icon: Icon, label, page }) => (
            <motion.button
              key={page}
              onClick={() => navigate(createPageUrl(page))}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 h-14 bg-white/5 active:bg-white/10 rounded-2xl border border-white/10"
            >
              <Icon className="w-5 h-5 text-cyan-400" />
              <span className="flex-1 text-left text-white font-semibold">{label}</span>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </motion.button>
          ))}
        </div>
      </div>
      
      {user && <CB51TestRoleSwitcher currentRole={testRole} onRoleChange={setTestRole} />}
    </>
  );
}