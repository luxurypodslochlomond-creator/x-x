import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Mail, Users, Radio, Brain } from 'lucide-react';
import CB51BrainTab from '@/components/cb51/CB51BrainTab';
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
import CB51UnifiedDashboard from '@/components/cb51/CB51UnifiedDashboard';
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
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'brain'
  const queryClient = useQueryClient();

  // Set OG tags for social sharing
  useEffect(() => {
    document.title = 'CB51 • AI Co-Manager for Artists • Avoid the Noise';
    
    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setMetaName = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('og:title', 'CB51 • AI Co-Manager for Artists');
    setMeta('og:description', 'Smart gig booking, band voting, finance tracking, calendar sync & contracts. Professional artist management tools. CitizenBand51: Avoid the Noise.');
    setMeta('og:image', window.location.origin + '/api/functions/serveCB51OGImage');
    setMeta('og:url', window.location.href);
    setMeta('og:type', 'website');
    
    setMetaName('description', 'CB51 - AI co-manager for artists. Gig booking, band voting, finance, calendar & contracts.');
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', 'CB51 • AI Co-Manager for Artists');
    setMetaName('twitter:description', 'Smart gig booking, band voting, finance tracking & calendar sync.');
    setMetaName('twitter:image', window.location.origin + '/api/functions/serveCB51OGImage');
  }, []);

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

  // Always call hook at same position - BEFORE any conditionals
  const currentArtistId = activeArtistId || (artists.length > 0 ? artists[0].id : null);
  const badges = useCB51NavBadges(currentArtistId);

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

  const handleAddMember = async () => {
    if (!newMemberName.trim() || !newMemberEmail.trim() || !currentArtistId) return;
    
    setAddingMember(true);
    try {
      const member = await base44.entities.TeamMember.create({
        artist_id: currentArtistId,
        name: newMemberName.trim(),
        email: newMemberEmail.trim(),
        role: 'band_member',
        status: 'invited',
        owner_email: user.email
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
          {/* TEST NOTIFICATION - End to end check */}
          {user && (
            <div className="mx-6 mt-2">
              <CB51TestNotification />
            </div>
          )}

          {/* BADGE MANAGER - Show unread count on app icon */}
          {currentArtistId && <CB51BadgeManager artistId={currentArtistId} />}
          
          {/* BACKGROUND SYNC - Queue actions when offline */}
          <CB51BackgroundSync />

          {/* HEADER */}
          <div className="px-6 pt-8 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <Radio className="w-7 h-7 text-cyan-400" />
                <span className="text-2xl font-black text-cyan-400 tracking-widest font-mono">CB51</span>
              </div>
              {/* TAB SWITCHER */}
              <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${activeTab === 'home' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('brain')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${activeTab === 'brain' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Brain className="w-3 h-3" />
                  Brain
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-xs font-mono">
              {activeTab === 'brain' ? 'Intelligence layer · reads your world' : 'Your AI co-manager'}
            </p>
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

          {/* BRAIN TAB */}
          {activeTab === 'brain' && currentArtistId && (
            <div className="px-6 pt-5 pb-32">
              <CB51BrainTab artistId={currentArtistId} />
            </div>
          )}

          {/* MAIN CONTENT - Unified dashboard */}
          {activeTab === 'home' && (
            currentArtistId ? (
              <CB51UnifiedDashboard artistId={currentArtistId} />
            ) : (
              <div className="flex items-center justify-center min-h-[600px] px-6">
                <div className="text-center space-y-4">
                  <Radio className="w-12 h-12 text-cyan-400 mx-auto" />
                  <h2 className="text-white font-black font-mono text-xl">Welcome to CB51</h2>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">
                    To get started, you need a CB51 account so your artists are saved to you.
                  </p>
                  <button
                    onClick={() => base44.auth.redirectToLogin(window.location.origin + '/CB51')}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg text-lg font-mono"
                  >
                    CREATE FREE ACCOUNT / LOGIN
                  </button>
                  <p className="text-gray-600 font-mono text-xs">
                    Takes 30 seconds. Your artists, gigs and finances will be saved permanently.
                  </p>
                </div>
              </div>
            )
          )}
          </div>
          </CB51ErrorBoundary>
          </CB51PINGuard>
          );
          }