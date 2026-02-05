import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Radio, ArrowLeft, Menu, Bell, Mail, Calendar, CheckCircle, DollarSign, ChevronRight, Upload, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import LiveClock from '@/components/shared/LiveClock';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import CB51NotificationCenter from '@/components/scott/CB51NotificationCenter';
import CB51TestRoleSwitcher from '@/components/scott/CB51TestRoleSwitcher';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMoreArtists, setShowMoreArtists] = useState(false);
  const [testRole, setTestRole] = useState('manager');

  useEffect(() => {
    document.title = 'CB51 • Artist Management';
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

  const { data: offers = [] } = useQuery({
    queryKey: ['cb51Offers'],
    queryFn: () => base44.entities.ScottGigOffer.filter({}),
    enabled: !!user,
  });

  const pendingCount = offers.filter(o => o.status === 'pending_manager_review').length;
  const awaitingCount = offers.filter(o => o.status === 'sent_to_band').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Radio className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
          <p className="text-cyan-400 font-black text-xl font-mono">CB51</p>
        </div>
      </div>
    );
  }

  const displayedArtists = showMoreArtists ? artists : artists.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-cyan-950/60 backdrop-blur-xl border-b border-cyan-500/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            <span className="text-lg font-black text-cyan-400 font-mono">CB51</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-cyan-500/10 rounded transition-colors">
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <button className="p-2 hover:bg-cyan-500/10 rounded transition-colors">
              <Menu className="w-5 h-5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        
        {/* LIVE NOTIFICATION CENTER */}
        <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />

        {/* ADD ARTIST - BIG BUTTON */}
        <Link to={createPageUrl('ScottAddArtist')}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-5 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-lg font-black text-lg font-mono"
          >
            + ADD ARTIST
          </motion.button>
        </Link>

        {/* YOUR ARTISTS */}
        {artists.length > 0 && (
          <div className="space-y-3">
            <p className="text-cyan-400 font-mono text-xs font-bold uppercase">Your Artists</p>
            {displayedArtists.map((artist) => (
              <motion.button
                key={artist.id}
                onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                whileHover={{ x: 4 }}
                className="w-full flex items-center gap-3 p-4 bg-black border border-cyan-500/30 hover:border-cyan-500 rounded-lg transition-all"
              >
                {artist.profile_pic_url ? (
                  <img src={artist.profile_pic_url} alt={artist.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cyan-500 text-black font-black text-xl font-mono flex items-center justify-center flex-shrink-0">
                    {artist.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className="text-white font-bold font-mono">{artist.name}</p>
                  <p className="text-cyan-400 text-xs font-mono">Tap to manage</p>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </motion.button>
            ))}
            
            {artists.length > 3 && (
              <button
                onClick={() => setShowMoreArtists(!showMoreArtists)}
                className="w-full text-center text-cyan-400 hover:text-cyan-300 font-mono text-sm font-bold py-2"
              >
                {showMoreArtists ? '- Show Less' : '+ Show More'}
              </button>
            )}
          </div>
        )}

        {/* QUICK LINKS */}
        <div className="space-y-2 pt-4 border-t border-cyan-500/20">
          <Link to={createPageUrl('ScottCalendarView')}>
            <motion.button whileHover={{ x: 4 }} className="w-full px-4 py-3 bg-black border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 rounded-lg font-mono text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>CALENDAR</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>

          <Link to={createPageUrl('ScottToDo')}>
            <motion.button whileHover={{ x: 4 }} className="w-full px-4 py-3 bg-black border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 rounded-lg font-mono text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>TASKS</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>

          <Link to={createPageUrl('ScottFinanceAdmin')}>
            <motion.button whileHover={{ x: 4 }} className="w-full px-4 py-3 bg-black border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 rounded-lg font-mono text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>FINANCE</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* FOOTER CLOCK */}
      <div className="border-t border-cyan-500/20 bg-black/60 backdrop-blur-sm p-4 text-center space-y-3">
        <div className="border-2 border-cyan-500 rounded p-3 font-mono font-black text-cyan-400">
          <LiveClock />
        </div>
        <p className="text-gray-600 text-xs font-mono">Built on Base44</p>
      </div>

      {/* TEST ROLE SWITCHER */}
      {user && <CB51TestRoleSwitcher currentRole={testRole} onRoleChange={setTestRole} />}
    </div>
  );
}