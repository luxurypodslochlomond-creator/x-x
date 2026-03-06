import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Mail, Users, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import CB51PINGuard from '@/components/cb51/CB51PINGuard';
import CB51ActionDashboard from '@/components/cb51/CB51ActionDashboard';
import CB51NotificationFeed from '@/components/cb51/CB51NotificationFeed';
import CB51GigUploadParser from '@/components/cb51/CB51GigUploadParser';
import CB51PushSubscriptionManager from '@/components/cb51/CB51PushSubscriptionManager';
import CB51TestNotification from '@/components/cb51/CB51TestNotification';
import CB51BandNotificationInbox from '@/components/cb51/CB51BandNotificationInbox';
import CB51BadgeManager from '@/components/cb51/CB51BadgeManager';
import CB51BackgroundSync from '@/components/cb51/CB51BackgroundSync';
import CB51GigDecisionEngine from '@/components/cb51/CB51GigDecisionEngine';
import CB51ConfirmedGigDraftEmail from '@/components/cb51/CB51ConfirmedGigDraftEmail';
import CB51IOSInstallPrompt from '@/components/cb51/CB51IOSInstallPrompt';
import { useCB51NavBadges, CB51NavBadge } from '@/components/cb51/CB51NavBadge';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeArtistId, setActiveArtistId] = useState(null);
  const [showArtistMenu, setShowArtistMenu] = useState(false);
  const [showAddMemberSheet, setShowAddMemberSheet] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [addingMember, setAddingMember] = useState(false);
  const [showMissionBriefing, setShowMissionBriefing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        // PIN users aren't base44 authed - that's fine, show band member view
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Check PIN auth too - PIN users don't have base44 auth but should see artists
  const pinVerified = typeof window !== 'undefined' && (
    localStorage.getItem('cb51_pin_verified') === 'true' ||
    document.cookie.split(';').some(c => c.trim().startsWith('cb51_pin_verified=true'))
  );

  const { data: artists = [] } = useQuery({
    queryKey: ['cb51Artists'],
    queryFn: () => base44.entities.Artist.filter({ archived: false }),
    enabled: !!user || pinVerified,
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

  const currentArtistId = activeArtistId || (artists.length > 0 ? artists[0].id : null);

  const handleAddMember = async () => {
    if (!newMemberName.trim() || !newMemberEmail.trim() || !currentArtistId) return;
    
    setAddingMember(true);
    try {
      const member = await base44.entities.TeamMember.create({
        artist_id: currentArtistId,
        name: newMemberName.trim(),
        email: newMemberEmail.trim(),
        role: 'band_member',
        status: 'invited'
      });

      const artistsList = await base44.entities.Artist.filter({ id: currentArtistId });
      
      if (artistsList?.length > 0) {
        await base44.functions.invoke('sendBandMemberInvite', {
          memberId: member.id,
          email: newMemberEmail.trim(),
          memberName: newMemberName.trim(),
          artistName: artistsList[0].name,
          artistId: currentArtistId
        }).catch(e => console.log('Email send failed:', e));
      }

      queryClient.invalidateQueries({ queryKey: ['bandMembers', currentArtistId] });
      setNewMemberName('');
      setNewMemberEmail('');
      setShowAddMemberSheet(false);
    } catch (error) {
      console.error('Failed to add member:', error);
    } finally {
      setAddingMember(false);
    }
  };

  return (
    <CB51PINGuard>
      <CB51ErrorBoundary>
        <div className="min-h-screen bg-black text-white pb-20">
          {/* iOS INSTALL PROMPT */}
          <CB51IOSInstallPrompt />

          {/* PUSH NOTIFICATIONS - Setup */}
          {user && <CB51PushSubscriptionManager userEmail={user.email} />}

          {/* BADGE MANAGER - Show unread count on app icon */}
          {currentArtistId && <CB51BadgeManager artistId={currentArtistId} />}
          
          {/* BACKGROUND SYNC - Queue actions when offline */}
          <CB51BackgroundSync />

          {/* HEADER */}
          <div className="px-6 pt-8 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3 mb-1">
              <Radio className="w-7 h-7 text-cyan-400" />
              <span className="text-2xl font-black text-cyan-400 tracking-widest font-mono">CB51</span>
            </div>
            <p className="text-gray-500 text-xs font-mono">Your AI co-manager</p>
          </div>

          {/* ARTIST GRID - 3 COLUMNS */}
          {artists.length > 0 && (
            <div className="px-6 pt-5 pb-4">
              <h3 className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-3">Artists</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                          {artists.map((artist) => (
                            <div key={artist.id} className="relative">
                              <button
                                onClick={() => navigate(createPageUrl(`ScottArtistHome?id=${artist.id}`))}
                                className="flex flex-col items-center gap-2 p-3 transition-all w-full hover:bg-cyan-500/10 rounded-lg cursor-pointer"
                              >
                                {artist.profile_pic_url ? (
                                  <img 
                                    src={artist.profile_pic_url} 
                                    alt={artist.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-full bg-cyan-500 text-black font-black text-lg flex items-center justify-center">
                                    {artist.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <p className="text-white font-mono text-xs text-center truncate w-full">{artist.name}</p>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => navigate(createPageUrl('CB51AddArtist'))}
                            className="flex flex-col items-center justify-center gap-2 p-3 cursor-pointer"
                          >
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                              <Plus className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="text-gray-500 font-mono text-xs">Add</p>
                          </button>
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
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed bottom-0 left-0 right-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-auto bg-black border-t-2 lg:border-2 border-cyan-500/40 lg:rounded-lg p-4 w-full lg:w-80 max-h-[80vh] overflow-y-auto z-50"
                >
                  <h2 className="text-cyan-400 font-bold text-sm mb-3">Select Artist</h2>
                  <div className="space-y-2">
                    {artists.map((artist) => (
                      <div key={artist.id} className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowArtistMenu(false);
                            setActiveArtistId(artist.id);
                          }}
                          className={`flex-1 flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                            artist.id === currentArtistId
                              ? 'bg-cyan-500/20 border border-cyan-400'
                              : 'bg-black border border-cyan-500/20 hover:border-cyan-400'
                          }`}
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

          {/* MAIN CONTENT - Clean, focused, calm */}
          <div className="px-6 pb-32 space-y-6">

            {/* BAND MEMBER VOTES - Always visible at top for anyone with pending votes */}
            <CB51BandNotificationInbox alwaysShow={true} />

            {!currentArtistId && !loading && (
            <div className="px-6 py-8 text-center space-y-4">
              <Radio className="w-12 h-12 text-cyan-400 mx-auto" />
              <h2 className="text-white font-black font-mono text-xl">Welcome to CB51</h2>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                To get started, you need a CB51 account so your artists are saved to you.
              </p>
              <button
                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg text-lg font-mono"
              >
                CREATE FREE ACCOUNT / LOGIN
              </button>
              <p className="text-gray-600 font-mono text-xs">
                Takes 30 seconds. Your artists, gigs and finances will be saved permanently.
              </p>
            </div>
          )}

          {currentArtistId ? (
              <>
                {/* THE DECISION ENGINE - Zero effort YES/NO */}
                <CB51GigDecisionEngine artistId={currentArtistId} />

                {/* CONFIRMED GIGS - Draft email ready to send to promoter */}
                <CB51ConfirmedGigDraftEmail artistId={currentArtistId} />

                {/* SCAN GIG OFFER */}
                <div className="border border-cyan-500/20 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <Radio className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-cyan-400 font-mono font-bold text-sm uppercase tracking-wider">New Gig Offer</h2>
                    <span className="text-gray-600 text-xs font-mono">paste · upload · scan</span>
                  </div>
                  <CB51GigUploadParser 
                    artistId={currentArtistId}
                    onGigCreated={() => {}}
                  />
                </div>

                {/* BAND MEMBERS */}
                <div className="border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <div>
                        <h2 className="text-cyan-400 font-mono font-bold text-sm uppercase tracking-wider">Team</h2>
                        <p className="text-gray-500 text-[10px] font-mono mt-0.5">
                          {artists.find(a => a.id === currentArtistId)?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(createPageUrl(`CB51TeamManagement?id=${currentArtistId}`))}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showAddMemberSheet && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-3">
                          <input
                            type="text"
                            placeholder="Name"
                            value={newMemberName}
                            onChange={(e) => setNewMemberName(e.target.value)}
                            className="w-full bg-black border border-gray-700 text-white px-3 py-2 font-mono text-sm"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            className="w-full bg-black border border-gray-700 text-white px-3 py-2 font-mono text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setShowAddMemberSheet(false);
                                setNewMemberName('');
                                setNewMemberEmail('');
                              }}
                              className="flex-1 border border-gray-700 hover:border-gray-500 px-3 py-2 text-gray-400 font-mono text-xs uppercase transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddMember}
                              disabled={!newMemberName.trim() || !newMemberEmail.trim() || addingMember}
                              className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 px-3 py-2 text-white font-mono text-xs uppercase transition-colors"
                            >
                              {addingMember ? '...' : 'Add'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* QUICK NAV */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar, label: 'Calendar', color: 'text-amber-400', to: `ScottCalendarView?id=${currentArtistId}` },
                    { icon: DollarSign, label: 'Finance', color: 'text-cyan-400', to: `ScottFinanceAdmin?id=${currentArtistId}` },
                    { icon: CheckCircle, label: 'Tasks', color: 'text-red-400', to: `ScottToDo?id=${currentArtistId}` },
                    { icon: Mail, label: 'Messages', color: 'text-green-400', to: 'ScottMessageInbox' },
                  ].map(({ icon: Icon, label, color, to }) => (
                    <button
                      key={label}
                      onClick={() => navigate(createPageUrl(to))}
                      className="border border-gray-800 hover:border-cyan-500/50 bg-gray-900/40 hover:bg-cyan-500/5 rounded-xl px-4 py-4 text-left transition-all"
                    >
                      <Icon className={`w-5 h-5 ${color} mb-2`} />
                      <div className="text-white font-mono text-xs uppercase tracking-wider">{label}</div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
        </CB51ErrorBoundary>
        </CB51PINGuard>
        );
        }