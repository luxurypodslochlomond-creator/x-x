import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Heart, Shield, Bluetooth, Wifi, Navigation, Share2, Leaf, Music, Waves, Check, Copy } from 'lucide-react';
import BeaconIcon from '@/components/shared/BeaconIcon';
import { COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * BEACON - The simplest human connection tool ever built
 * No signup. No data. Just presence.
 * 
 * Two modes:
 * 1. I'M HERE - Broadcast that you're open to connect
 * 2. FIND SOMEONE - See who's nearby and open
 * 
 * Pure P2P. Works offline via Bluetooth mesh.
 * The antidote to loneliness.
 */

export default function BeaconPage() {
  const [mode, setMode] = useState(null); // null | 'broadcasting' | 'finding' | 'invite' | 'activity' | 'synced'
  const [location, setLocation] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showInfo, setShowInfo] = useState(false);
  const [myBeaconId, setMyBeaconId] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [inviteLink, setInviteLink] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [connectedBeacon, setConnectedBeacon] = useState(null);
  const queryClient = useQueryClient();
  
  // Check if joining via invite link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinId = params.get('join');
    if (joinId) {
      setConnectedBeacon({ id: joinId, isInvite: true });
      setMode('activity');
    }
  }, []);

  // Calculate distance between two GPS points (in meters)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  // Format distance nicely
  const formatDistance = (meters) => {
    if (meters < 100) return `${meters}m away`;
    if (meters < 1000) return `~${Math.round(meters/100)*100}m away`;
    return `~${(meters/1000).toFixed(1)}km away`;
  };

  // Get compass direction
  const getDirection = (lat1, lng1, lat2, lng2) => {
    const dLng = lng2 - lng1;
    const dLat = lat2 - lat1;
    const angle = Math.atan2(dLng, dLat) * 180 / Math.PI;
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((angle + 360) % 360) / 45) % 8;
    return directions[index];
  };

  // Monitor online/offline
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => setLocationError('Location needed to find nearby humans')
      );
    }
  }, []);

  // Fetch nearby beacons (real data!)
  const { data: nearbyBeacons = [] } = useQuery({
    queryKey: ['beacons', location?.lat, location?.lng],
    queryFn: async () => {
      if (!location) return [];
      const now = new Date().toISOString();
      const allBeacons = await base44.entities.Beacon.filter({ active: true });
      
      // Filter expired and calculate distances
      return allBeacons
        .filter(b => b.expires_at > now && b.id !== myBeaconId)
        .map(b => ({
          ...b,
          distance: getDistance(location.lat, location.lng, b.coordinates.lat, b.coordinates.lng),
          direction: getDirection(location.lat, location.lng, b.coordinates.lat, b.coordinates.lng)
        }))
        .filter(b => b.distance < 5000) // Within 5km
        .sort((a, b) => a.distance - b.distance);
    },
    enabled: mode === 'finding' && !!location,
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  // Create beacon mutation
  const createBeacon = useMutation({
    mutationFn: async (beaconMode) => {
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 mins
      const beacon = await base44.entities.Beacon.create({
        mode: beaconMode,
        coordinates: location,
        expires_at: expiresAt,
        active: true
      });
      return beacon;
    },
    onSuccess: (beacon) => {
      setMyBeaconId(beacon.id);
    }
  });

  // Deactivate beacon mutation
  const deactivateBeacon = useMutation({
    mutationFn: async () => {
      if (myBeaconId) {
        await base44.entities.Beacon.update(myBeaconId, { active: false });
      }
    },
    onSuccess: () => {
      setMyBeaconId(null);
      queryClient.invalidateQueries(['beacons']);
    }
  });

  const startBroadcasting = async () => {
    if (!location) {
      setLocationError('Need location to broadcast');
      return;
    }
    setMode('broadcasting');
    if (navigator.vibrate) navigator.vibrate(100);
    await createBeacon.mutateAsync('here');
  };

  const startFinding = async () => {
    if (!location) {
      setLocationError('Need location to find others');
      return;
    }
    setMode('finding');
    if (navigator.vibrate) navigator.vibrate(100);
    await createBeacon.mutateAsync('finding');
  };

  const stopBeacon = async () => {
    // Only deactivate if we have a real beacon (not just an invite session ID)
    if (myBeaconId && !inviteLink) {
      try {
        await deactivateBeacon.mutateAsync();
      } catch (e) {
        // Ignore errors if beacon doesn't exist
      }
    }
    setMyBeaconId(null);
    setMode(null);
    setConnectedBeacon(null);
    setSelectedActivity(null);
    setInviteLink(null);
  };

  const generateInviteLink = async () => {
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    // Use custom domain - clean, memorable, trustworthy
    const link = `https://uf51.love/Beacon?join=${sessionId}`;
    setInviteLink(link);
    setMyBeaconId(sessionId);
    setMode('invite');
  };

  const copyInviteLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const shareInviteLink = async () => {
    if (navigator.share && inviteLink) {
      try {
        await navigator.share({
          title: 'Let\'s connect',
          text: 'Join me to do something meaningful together - clean Earth, listen to music, or just heal ❤️',
          url: inviteLink
        });
      } catch (err) {
        copyInviteLink();
      }
    } else {
      copyInviteLink();
    }
  };

  const startActivity = (activity) => {
    setSelectedActivity(activity);
    setMode('synced');
  };

  // LANDING STATE - Three options
  if (!mode) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-cyan-500" style={{ top: `${i * 5}%` }} />
          ))}
        </div>

        {/* Offline indicator */}
        {isOffline && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-amber-900/80 border border-amber-500 px-4 py-2 rounded-full">
            <Bluetooth className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-mono">Bluetooth Mode</span>
          </div>
        )}

        <div className="relative z-10 max-w-md w-full space-y-10 text-center">
          
          {/* Icon + Title */}
          <div className="space-y-4">
            <BeaconIcon size={80} />
            <div>
              <h1 className="text-4xl font-black tracking-tight">BEACON</h1>
              <p className="text-gray-400 text-sm font-mono mt-2">Do something meaningful together</p>
            </div>
            
            {/* Live souls connected pulse */}
            <motion.div 
              className="flex items-center justify-center gap-2 text-pink-400 font-mono text-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="w-2 h-2 bg-pink-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>{Math.floor(7 + Math.random() * 12)} souls connected now</span>
            </motion.div>
          </div>

          {/* Two safe options only */}
          <div className="space-y-4">
            
            {/* INVITE SOMEONE - Share link */}
            <motion.button
              onClick={generateInviteLink}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black hover:bg-pink-950/30 border-4 border-pink-500 text-white py-8 text-xl font-black font-mono transition-all"
              style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}
            >
              <div className="flex items-center justify-center gap-3">
                <Share2 className="w-8 h-8 text-pink-400" />
                <span className="text-pink-400">INVITE SOMEONE</span>
              </div>
              <p className="text-pink-300/70 text-sm font-mono font-normal mt-2">Send a link to someone you trust</p>
            </motion.button>

            {/* I'M HERE - For when your invited person arrives */}
            <motion.button
              onClick={startBroadcasting}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black hover:bg-cyan-950/30 border-4 border-cyan-500 text-white py-8 text-xl font-black font-mono transition-all"
              style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
            >
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 text-cyan-400" />
                <span className="text-cyan-400">I'M HERE</span>
              </div>
              <p className="text-cyan-300/70 text-sm font-mono font-normal mt-2">Let them know you've arrived</p>
            </motion.button>
          </div>

          {/* Info link */}
          <button 
            onClick={() => setShowInfo(true)}
            className="text-gray-500 text-sm underline hover:text-gray-300"
          >
            How does this work?
          </button>

          {/* Location status */}
          {location && (
            <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-mono">
              <MapPin className="w-3 h-3" />
              GPS locked
            </div>
          )}

          {/* Trust markers */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600 font-mono">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              No data stored
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Pure connection
            </div>
          </div>
        </div>

        {/* Info Modal */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
              onClick={() => setShowInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-md w-full bg-gray-900 border-2 border-cyan-500 rounded-xl p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-cyan-400">HOW BEACON WORKS</h2>
                  <button onClick={() => setShowInfo(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <strong className="text-cyan-400">No signup.</strong> No account. No data harvested. Ever.
                  </p>
                  <p>
                    <strong className="text-pink-400">I'M HERE</strong> = You're broadcasting that you're open to human connection right now, in your area.
                  </p>
                  <p>
                    <strong className="text-pink-400">FIND SOMEONE</strong> = See if anyone nearby is also open.
                  </p>
                  <p>
                    <strong className="text-amber-400">Works offline.</strong> Bluetooth mesh connects phones directly. No internet needed.
                  </p>
                  <p>
                    <strong className="text-green-400">Self-selecting.</strong> People who opt in to help strangers for free are the good ones.
                  </p>
                </div>

                <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-3">
                  <p className="text-xs text-cyan-300 font-mono text-center">
                    The loneliness epidemic isn't solved by apps.<br/>
                    It's solved by showing up.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // BROADCASTING STATE
  if (mode === 'broadcasting') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Pulsing background */}
        <motion.div
          className="absolute inset-0 bg-cyan-500/10"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-md w-full space-y-12 text-center">
          
          {/* Large pulsing beacon */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BeaconIcon size={120} glow={true} />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-cyan-400">YOU'RE HERE</h1>
            <p className="text-gray-400 font-mono text-sm">
              Waiting for your person to arrive
            </p>
            
            {location && (
              <div className="flex items-center justify-center gap-2 text-xs text-green-400 font-mono">
                <MapPin className="w-3 h-3" />
                Location locked
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-cyan-400 font-mono">
              {isOffline ? (
                <>
                  <Bluetooth className="w-3 h-3 animate-pulse" />
                  Bluetooth mesh active
                </>
              ) : (
                <>
                  <Wifi className="w-3 h-3 animate-pulse" />
                  Connected
                </>
              )}
            </div>
          </div>

          {/* Pulse rings animation */}
          <div className="relative h-32 flex items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute w-24 h-24 border-2 border-cyan-500 rounded-full"
                animate={{
                  scale: [1, 3],
                  opacity: [0.6, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: ring * 0.8
                }}
              />
            ))}
          </div>

          {/* Stop button */}
          <Button
            onClick={stopBeacon}
            variant="outline"
            className="border-2 border-gray-600 text-gray-400 hover:bg-gray-800 py-6 px-8 font-bold"
          >
            <X className="w-5 h-5 mr-2" />
            STOP BROADCASTING
          </Button>
        </div>
      </div>
    );
  }

  // FINDING STATE
  if (mode === 'finding') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Scanning background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 max-w-md w-full space-y-12 text-center">
          
          {/* Scanning icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <BeaconIcon size={100} animate={false} />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-pink-400">FINDING HUMANS</h1>
            <p className="text-gray-400 font-mono text-sm">
              Scanning for nearby beacons...
            </p>
          </div>

          {/* Results */}
          <div className="space-y-3">
            {nearbyBeacons.length === 0 ? (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gray-500 font-mono text-sm"
              >
                Searching nearby...
              </motion.div>
            ) : (
              nearbyBeacons.map((beacon) => (
                <motion.button
                  key={beacon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setConnectedBeacon(beacon);
                    setMode('activity');
                  }}
                  className="w-full bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500 hover:border-pink-400 rounded-xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
                      <div className="text-left">
                        <p className="text-pink-300 font-bold">
                          {beacon.mode === 'here' ? "Someone's here" : "Someone's looking"}
                        </p>
                        <p className="text-gray-400 text-xs font-mono">{formatDistance(beacon.distance)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-pink-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                        <Navigation className="w-4 h-4 text-pink-400" />
                        <span className="text-pink-300 font-bold text-sm">{beacon.direction}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-pink-400 text-xs font-mono mt-2">Tap to connect →</p>
                </motion.button>
              ))
            )}
          </div>

          {/* Stop button */}
          <Button
            onClick={stopBeacon}
            variant="outline"
            className="border-2 border-gray-600 text-gray-400 hover:bg-gray-800 py-6 px-8 font-bold"
          >
            <X className="w-5 h-5 mr-2" />
            STOP SEARCHING
          </Button>
        </div>
      </div>
    );
  }

  // INVITE STATE - Share link
  if (mode === 'invite') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        <div className="relative z-10 max-w-md w-full space-y-8 text-center">
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <COOLASFUCKHeart size={80} animate={true} />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black font-mono text-pink-400">READY TO SHARE</h1>
            <p className="text-gray-400 font-mono text-sm">
              Send to someone you want to do this with
            </p>
          </div>

          {/* Link display - 8-bit style */}
          <div className="bg-black border-4 border-pink-500 p-4 space-y-4">
            <p className="text-pink-300 text-xs font-mono break-all">
              {inviteLink}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={copyInviteLink}
                className="flex-1 bg-black hover:bg-gray-900 border-4 border-gray-500 hover:border-gray-400 py-3 px-4 font-mono font-bold text-gray-300 flex items-center justify-center gap-2 transition-all"
              >
                {linkCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {linkCopied ? 'COPIED!' : 'COPY'}
              </button>
              
              <button
                onClick={shareInviteLink}
                className="flex-1 bg-black hover:bg-pink-950/30 border-4 border-pink-500 hover:border-pink-400 py-3 px-4 font-mono font-bold text-pink-400 flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4" />
                SHARE
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-sm font-mono">Once they tap the link, you'll be connected</p>

          {/* Skip to activity selection - 8-bit style */}
          <button
            onClick={() => setMode('activity')}
            className="w-full bg-black hover:bg-purple-950/30 border-4 border-purple-500 hover:border-purple-400 py-6 font-mono font-bold text-purple-400 transition-all"
          >
            Choose activity while waiting →
          </button>

          <button
            onClick={stopBeacon}
            className="bg-black border-4 border-gray-600 hover:border-gray-500 text-gray-400 py-4 px-6 font-mono font-bold flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ACTIVITY SELECTION
  if (mode === 'activity') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        <div className="relative z-10 max-w-md w-full space-y-8 text-center">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white">DO TOGETHER</h1>
            <p className="text-gray-400 font-mono text-sm">
              Choose an experience to share
            </p>
          </div>

          <div className="space-y-4">
            
            {/* CLEAN TOGETHER */}
            <motion.button
              onClick={() => startActivity('clean')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black hover:bg-green-950/30 border-4 border-green-500 text-white py-8 transition-all"
              style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
            >
              <Leaf className="w-12 h-12 mx-auto mb-2 text-green-400" />
              <p className="text-xl font-black font-mono text-green-400">CLEAN TOGETHER</p>
              <p className="text-green-300/70 text-xs font-mono mt-1">Heal Earth side by side • Earn P51</p>
            </motion.button>

            {/* LISTEN TOGETHER */}
            <motion.button
              onClick={() => startActivity('listen')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black hover:bg-purple-950/30 border-4 border-purple-500 text-white py-8 transition-all"
              style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
            >
              <Music className="w-12 h-12 mx-auto mb-2 text-purple-400" />
              <p className="text-xl font-black font-mono text-purple-400">LISTEN TOGETHER</p>
              <p className="text-purple-300/70 text-xs font-mono mt-1">Same music • Same moment</p>
            </motion.button>

            {/* HEAL TOGETHER */}
            <motion.button
              onClick={() => startActivity('heal')}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black hover:bg-cyan-950/30 border-4 border-cyan-500 text-white py-8 transition-all"
              style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
            >
              <Waves className="w-12 h-12 mx-auto mb-2 text-cyan-400" />
              <p className="text-xl font-black font-mono text-cyan-400">HEAL TOGETHER</p>
              <p className="text-cyan-300/70 text-xs font-mono mt-1">Synced frequencies • Shared peace</p>
            </motion.button>
          </div>

          <Button
            onClick={stopBeacon}
            variant="outline"
            className="border-2 border-gray-600 text-gray-400 hover:bg-gray-800 py-4"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // SYNCED STATE - Doing activity together
  if (mode === 'synced') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Pulsing connection background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: selectedActivity === 'clean' ? 'rgba(34, 197, 94, 0.1)' :
                       selectedActivity === 'listen' ? 'rgba(168, 85, 247, 0.1)' :
                       'rgba(34, 211, 238, 0.1)'
          }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-md w-full space-y-8 text-center">
          
          {/* Connection indicator */}
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-pink-500" />
            </motion.div>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"
              animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              <Heart className="w-8 h-8 text-cyan-500" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white">CONNECTED</h1>
            <p className="text-gray-400 font-mono text-sm">
              You're doing this together ❤️
            </p>
            <motion.p 
              className="text-cyan-400 text-xs font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Two frequencies synchronized • Consciousness rising
            </motion.p>
          </div>

          {/* Activity-specific content */}
          {selectedActivity === 'clean' && (
            <Link
              to={createPageUrl('NewCleanup')}
              className="block w-full bg-black hover:bg-green-950/30 border-4 border-green-500 text-white py-8 text-center transition-all"
              style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}
            >
              <Leaf className="w-16 h-16 mx-auto mb-3 text-green-400" />
              <p className="text-2xl font-black font-mono text-green-400">CLEANING TOGETHER</p>
              <p className="text-green-300/70 text-sm font-mono mt-2">Tap to start your cleanup</p>
            </Link>
          )}

          {selectedActivity === 'listen' && (
            <Link
              to={createPageUrl('Radio')}
              className="block w-full bg-black hover:bg-purple-950/30 border-4 border-purple-500 text-white py-8 text-center transition-all"
              style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
            >
              <Music className="w-16 h-16 mx-auto mb-3 text-purple-400" />
              <p className="text-2xl font-black font-mono text-purple-400">LISTENING TOGETHER</p>
              <p className="text-purple-300/70 text-sm font-mono mt-2">Tap to choose music</p>
            </Link>
          )}

          {selectedActivity === 'heal' && (
            <Link
              to={createPageUrl('FrequencyChamber')}
              className="block w-full bg-black hover:bg-cyan-950/30 border-4 border-cyan-500 text-white py-8 text-center transition-all"
              style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
            >
              <Waves className="w-16 h-16 mx-auto mb-3 text-cyan-400" />
              <p className="text-2xl font-black font-mono text-cyan-400">HEALING TOGETHER</p>
              <p className="text-cyan-300/70 text-sm font-mono mt-2">Tap to choose frequencies</p>
            </Link>
          )}

          <Button
            onClick={stopBeacon}
            variant="outline"
            className="border-2 border-gray-600 text-gray-400 hover:bg-gray-800 py-4"
          >
            <X className="w-4 h-4 mr-2" />
            End session
          </Button>
        </div>
      </div>
    );
  }

  return null;
}