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

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* LEFT: UPLOAD & PENDING */}
          <div className="space-y-3">
            {firstArtistId && (
              <>
                <CB51GigUploadParser 
                  artistId={firstArtistId}
                  onGigCreated={() => {}}
                />
                {firstArtistId && <CB51NotificationInbox artistId={firstArtistId} />}
              </>
            )}
          </div>

          {/* RIGHT: QUICK ACTIONS */}
          <div className="space-y-3">
            <button
              onClick={() => navigate(createPageUrl(firstArtistId ? `ScottCalendarView?id=${firstArtistId}` : 'ScottCalendarView'))}
              className="w-full bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 text-left transition-all"
            >
              <Calendar className="w-5 h-5 text-cyan-400 mb-2" />
              <p className="text-cyan-400 font-black text-xs font-mono">CALENDAR</p>
              <p className="text-gray-600 text-[9px] mt-1">View all shows</p>
            </button>

            <button
              onClick={() => navigate(createPageUrl(firstArtistId ? `ScottToDo?id=${firstArtistId}` : 'ScottToDo'))}
              className="w-full bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 text-left transition-all"
            >
              <CheckCircle className="w-5 h-5 text-cyan-400 mb-2" />
              <p className="text-cyan-400 font-black text-xs font-mono">TASKS</p>
              <p className="text-gray-600 text-[9px] mt-1">To-do list</p>
            </button>

            <button
              onClick={() => navigate(createPageUrl(firstArtistId ? `ScottFinanceAdmin?id=${firstArtistId}` : 'ScottFinanceAdmin'))}
              className="w-full bg-gradient-to-br from-green-900/40 to-green-900/20 border-2 border-green-500/50 hover:border-green-500 rounded-lg p-4 text-left transition-all"
            >
              <DollarSign className="w-5 h-5 text-green-400 mb-2" />
              <p className="text-green-400 font-black text-xs font-mono">FINANCE</p>
              <p className="text-gray-600 text-[9px] mt-1">Money tracker</p>
            </button>
          </div>
        </div>
      </div>

      </CB51ErrorBoundary>
      </CB51PINGuard>
      );
      }