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
            <div className="min-h-screen bg-black text-white p-3 pb-20">
        
        {/* HEADER + ARTIST QUICK PICK */}
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-black text-cyan-400 font-mono">CB51</h1>
                  {artists.length > 0 && (
                    <select
                      onChange={(e) => {
                        const artist = artists.find(a => a.id === e.target.value);
                        if (artist && e.target.value !== firstArtistId) {
                          navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`);
                        }
                      }}
                      value={firstArtistId || ''}
                      className="bg-black border-2 border-cyan-500/50 text-cyan-400 text-xs font-bold rounded px-3 py-1"
                    >
                      {artists.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  )}
                </div>

        {/* UPLOAD & PARSE GIG */}
        {firstArtistId && (
          <div className="mb-6">
            <CB51GigUploadParser 
              artistId={firstArtistId}
              onGigCreated={() => {
                // Notification inbox will auto-refresh
              }}
            />
          </div>
        )}

        {/* NOTIFICATION INBOX - MANAGER APPROVAL */}
        {firstArtistId && <CB51NotificationInbox artistId={firstArtistId} />}

        {/* UPCOMING GIGS */}
        <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-cyan-400 font-black text-sm font-mono">UPCOMING GIGS</h2>
          </div>
          <p className="text-gray-600 text-xs text-center py-2">No upcoming gigs</p>
          <button
            onClick={() => navigate(createPageUrl(firstArtistId ? `ScottCalendarView?id=${firstArtistId}` : 'ScottCalendarView'))}
            className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs font-bold font-mono py-2 rounded border border-cyan-500/50"
          >
            VIEW CALENDAR
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-black border-2 border-white/10 rounded-lg p-3">
          <h2 className="text-white font-black text-sm font-mono mb-3">QUICK ACTIONS</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate(createPageUrl(firstArtistId ? `ScottToDo?id=${firstArtistId}` : 'ScottToDo'))}
              className="bg-cyan-900/20 border border-cyan-500/30 rounded p-2 text-left"
            >
              <CheckCircle className="w-4 h-4 text-cyan-400 mb-1" />
              <p className="text-cyan-400 text-[9px] font-bold font-mono">TASKS</p>
            </button>
            <button
              onClick={() => navigate(createPageUrl(firstArtistId ? `ScottFinanceAdmin?id=${firstArtistId}` : 'ScottFinanceAdmin'))}
              className="bg-green-900/20 border border-green-500/30 rounded p-2 text-left"
            >
              <DollarSign className="w-4 h-4 text-green-400 mb-1" />
              <p className="text-green-400 text-[9px] font-bold font-mono">FINANCE</p>
            </button>
          </div>
        </div>
      </div>

      </CB51ErrorBoundary>
      </CB51PINGuard>
      );
      }