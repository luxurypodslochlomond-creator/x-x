import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle, DollarSign, Plus, Sparkles, Mic2, Music, ClipboardList, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CB51NotificationCenter from '@/components/scott/CB51NotificationCenter';
import CB51TestRoleSwitcher from '@/components/scott/CB51TestRoleSwitcher';
import CB51ErrorBoundary from '@/components/scott/CB51ErrorBoundary';
import PushNotificationManager from '@/components/scott/PushNotificationManager';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testRole, setTestRole] = useState('manager');
  const [showGigInput, setShowGigInput] = useState(false);
  const [gigOfferText, setGigOfferText] = useState('');
  const [processingGig, setProcessingGig] = useState(false);

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

  const handlePasteGigOffer = async () => {
    if (!gigOfferText.trim()) return;
    if (!firstArtistId) {
      alert('Add an artist first');
      return;
    }
    
    setProcessingGig(true);
    try {
      // Simple parse - AI will improve this later
      const lines = gigOfferText.split('\n');
      const venue = lines[0] || 'Venue TBC';
      
      await base44.entities.ScottGigOffer.create({
        artist_id: firstArtistId,
        venue: venue,
        raw_email: gigOfferText,
        status: 'pending_manager_review',
        urgency: 'normal'
      });
      
      setGigOfferText('');
      setShowGigInput(false);
      alert('Gig offer added! Check notifications above.');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setProcessingGig(false);
    }
  };

  return (
    <CB51ErrorBoundary>
      <div className="min-h-screen bg-black text-white p-3 pb-20">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-cyan-400 font-mono">DASHBOARD</h1>
            <p className="text-gray-600 text-xs font-mono">Manager Overview</p>
          </div>
        </div>

        {/* PUSH NOTIFICATIONS */}
        <div className="mb-6">
          <PushNotificationManager />
        </div>

        {/* NOTIFICATIONS - TOP PRIORITY */}
        <CB51NotificationCenter key={testRole} userEmail={user?.email} userRole={testRole} />

        {/* GIG OFFER INPUT */}
        <div className="mb-6">
          {!showGigInput ? (
            <button
              onClick={() => setShowGigInput(true)}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-black py-4 rounded-lg text-base border-2 border-pink-500"
            >
              + PASTE GIG OFFER
            </button>
          ) : (
            <div className="bg-black border-2 border-pink-500 rounded-lg p-4">
              <h3 className="text-pink-400 font-black text-sm mb-3">PASTE GIG OFFER</h3>
              <textarea
                value={gigOfferText}
                onChange={(e) => setGigOfferText(e.target.value)}
                placeholder="Paste email or type gig details&#10;Venue name&#10;Date&#10;Fee&#10;City&#10;etc..."
                className="w-full bg-black border border-pink-500/50 text-white p-3 rounded text-sm font-mono mb-3 min-h-[120px]"
              />
              <div className="flex gap-2">
                <button
                  onClick={handlePasteGigOffer}
                  disabled={processingGig || !gigOfferText.trim()}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold py-2 rounded text-sm"
                >
                  {processingGig ? 'PROCESSING...' : 'SUBMIT'}
                </button>
                <button
                  onClick={() => {
                    setShowGigInput(false);
                    setGigOfferText('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded text-sm"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ARTISTS SECTION */}
        {artists.length > 0 ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-black text-sm font-mono">YOUR ARTISTS</h2>
              <button
                onClick={() => navigate(createPageUrl('ScottAddArtist'))}
                className="text-green-400 text-xs font-bold font-mono hover:text-green-300"
              >
                + ADD
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {artists.slice(0, 2).map((artist) => (
                <motion.button
                  key={artist.id}
                  onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
                  whileTap={{ scale: 0.96 }}
                  className="bg-black border-2 border-white/10 hover:border-cyan-500/50 rounded-lg p-3 text-center"
                >
                  {artist.profile_pic_url ? (
                    <img src={artist.profile_pic_url} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 mx-auto mb-2" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-cyan-500 text-black font-black text-xl flex items-center justify-center mx-auto mb-2">
                      {artist.name.charAt(0)}
                    </div>
                  )}
                  <p className="text-white font-bold text-xs truncate">{artist.name}</p>
                  <p className="text-gray-600 text-[9px] font-mono">Manage</p>
                </motion.button>
              ))}
            </div>
            {artists.length > 2 && (
              <p className="text-gray-600 text-xs text-center mt-2">
                +{artists.length - 2} more
              </p>
            )}
          </div>
        ) : (
          <div className="bg-black border-2 border-green-500 rounded-lg p-6 text-center mb-6">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-green-400 font-black text-base mb-2">NO ARTISTS YET</h3>
            <p className="text-gray-500 text-xs mb-4">Add your first artist to get started</p>
            <button
              onClick={() => navigate(createPageUrl('ScottAddArtist'))}
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-2 rounded text-sm"
            >
              + ADD ARTIST
            </button>
          </div>
        )}

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
      
      {user && <CB51TestRoleSwitcher currentRole={testRole} onRoleChange={setTestRole} />}
    </CB51ErrorBoundary>
  );
}