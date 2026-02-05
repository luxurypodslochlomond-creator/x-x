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
      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6 max-w-2xl mx-auto">
        
        {/* HERO STATS */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-500/40 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-black text-cyan-400 font-mono mb-1">{artists.length}</p>
            <p className="text-cyan-300 text-xs font-bold font-mono">ARTISTS</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/40 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-black text-green-400 font-mono mb-1">{pendingCount}</p>
            <p className="text-green-300 text-xs font-bold font-mono">PENDING</p>
          </motion.div>
        </div>

        {/* LIVE NOTIFICATION CENTER */}
        <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />

        {/* AWAITING BAND VOTES - HIGH PRIORITY */}
        {awaitingCount > 0 && (
          <motion.button
            onClick={() => navigate(createPageUrl('ScottArtistHome'))}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl border-2 border-green-400"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-green-600 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-white font-black text-lg font-mono">BAND VOTING</p>
                  <p className="text-green-100 text-sm font-mono">{awaitingCount} offer{awaitingCount > 1 ? 's' : ''} awaiting response</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          </motion.button>
        )}

        {/* ADD ARTIST - PRIMARY CTA */}
        <Link to={createPageUrl('ScottAddArtist')}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-black text-xl font-mono shadow-xl border-2 border-cyan-300"
          >
            + ADD NEW ARTIST
          </motion.button>
        </Link>

        {/* YOUR ARTISTS */}
        {artists.length > 0 && (
          <div className="bg-black/40 border-2 border-cyan-500/30 rounded-2xl p-6">
            <h2 className="text-cyan-400 font-black text-lg font-mono mb-4">YOUR ARTISTS</h2>
            <div className="space-y-3">
              {displayedArtists.map((artist) => (
                <motion.button
                  key={artist.id}
                  onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 rounded-xl transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-black text-2xl font-mono flex items-center justify-center flex-shrink-0 shadow-lg">
                    {artist.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-black text-lg font-mono">{artist.name}</p>
                    <p className="text-cyan-400 text-sm font-mono">Tap to manage →</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cyan-400" />
                </motion.button>
              ))}
            </div>
            
            {artists.length > 3 && (
              <button
                onClick={() => setShowMoreArtists(!showMoreArtists)}
                className="w-full mt-4 text-center text-cyan-400 hover:text-cyan-300 font-mono text-sm font-bold py-2 border-t border-cyan-500/20 pt-4"
              >
                {showMoreArtists ? '↑ Show Less' : '↓ Show All Artists'}
              </button>
            )}
          </div>
        )}

        {/* QUICK ACCESS */}
        <div className="bg-black/40 border-2 border-cyan-500/30 rounded-2xl p-6">
          <h2 className="text-cyan-400 font-black text-lg font-mono mb-4">QUICK ACCESS</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to={createPageUrl('ScottCalendarView')}>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full aspect-square bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-500/40 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-amber-500 transition-all"
              >
                <Calendar className="w-8 h-8 text-amber-400" />
                <span className="text-amber-400 font-bold text-sm font-mono">CALENDAR</span>
              </motion.button>
            </Link>

            <Link to={createPageUrl('ScottToDo')}>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full aspect-square bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/40 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-green-500 transition-all"
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
                <span className="text-green-400 font-bold text-sm font-mono">TASKS</span>
              </motion.button>
            </Link>

            <Link to={createPageUrl('ScottFinanceAdmin')}>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full aspect-square bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/40 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-emerald-500 transition-all"
              >
                <DollarSign className="w-8 h-8 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-sm font-mono">FINANCE</span>
              </motion.button>
            </Link>

            <Link to={createPageUrl('CB51')}>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full aspect-square bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-2 border-purple-500/40 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500 transition-all"
              >
                <Mail className="w-8 h-8 text-purple-400" />
                <span className="text-purple-400 font-bold text-sm font-mono">INBOX</span>
              </motion.button>
            </Link>
          </div>
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