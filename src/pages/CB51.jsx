import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Sparkles, Mic2, Music, ClipboardList, Users } from 'lucide-react';
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
      <div className="min-h-screen bg-black text-white p-3 pb-20">
        
        {/* NOTIFICATIONS - TOP PRIORITY */}
        <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />

        {/* ARTISTS - COMPACT */}
        {artists.length > 0 && (
          <div className="mb-6">
            {artists.slice(0, 1).map((artist) => (
              <motion.button
                key={artist.id}
                onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 mb-3"
              >
                {artist.profile_pic_url ? (
                  <img src={artist.profile_pic_url} alt="" className="w-12 h-12 rounded object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded bg-cyan-500 text-black font-black text-lg flex items-center justify-center">
                    {artist.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className="text-white font-black text-lg">{artist.name}</p>
                  <p className="text-gray-600 text-xs font-mono">Operations</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* 2x2 GRID - LIKE ARTIST PAGE */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            { icon: Mic2, label: 'LIVE', page: 'ScottLive', color: 'cyan' },
            { icon: Music, label: 'SESSIONS', page: 'ScottSessions', color: 'orange' },
            { icon: ClipboardList, label: 'TO-DO', page: 'ScottToDo', color: 'cyan' },
            { icon: DollarSign, label: 'FINANCE', page: 'ScottFinanceAdmin', color: 'orange' },
          ].map(({ icon: Icon, label, page, color }) => {
            const colorMap = {
              cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500' },
              orange: { border: 'border-orange-500', bg: 'bg-orange-500' }
            };
            const c = colorMap[color];
            
            return (
              <motion.button
                key={page}
                onClick={() => navigate(createPageUrl(page))}
                whileTap={{ scale: 0.96 }}
                className={`bg-black border-2 ${c.border} rounded-lg p-2 text-center`}
              >
                <div className={`w-12 h-12 rounded ${c.bg} text-black font-black flex items-center justify-center mx-auto mb-1`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-white font-black text-[10px] font-mono">{label}</p>
              </motion.button>
            );
          })}
        </div>

        {/* UPCOMING GIGS SECTION */}
        <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-cyan-400 font-black text-sm font-mono">UPCOMING GIGS</h2>
          </div>
          <p className="text-gray-600 text-xs text-center py-2">No upcoming gigs</p>
          <button
            onClick={() => navigate(createPageUrl('ScottCalendarView'))}
            className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs font-bold font-mono py-2 rounded border border-cyan-500/50"
          >
            VIEW CALENDAR
          </button>
        </div>

        {/* ADD ARTIST SECTION */}
        <div className="bg-black border-2 border-green-500 rounded-lg p-3">
          <button
            onClick={() => navigate(createPageUrl('ScottAddArtist'))}
            className="w-full flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-green-400" />
            <h2 className="text-green-400 font-black text-xs font-mono flex-1 text-left">
              ARTISTS ({artists.length})
            </h2>
            <div className="text-green-400 text-xl">+</div>
          </button>
        </div>
      </div>
      
      {user && <CB51TestRoleSwitcher currentRole={testRole} onRoleChange={setTestRole} />}
    </>
  );
}