import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, ArrowLeft, Sparkles, WifiOff, CheckCircle, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scanGigOffers } from '@/functions/scanGigOffers';

/**
 * PASTE GIG OFFER EMAIL - OFFLINE FIRST
 * Works 100% offline → encrypted local storage → auto-syncs when online
 * Privacy-first: you control what gets sent, zero inbox access needed
 */

// Simple encryption (XOR with key)
const encrypt = (text, key = 'UF51_SCOTT_ENCRYPTED') => {
  return btoa(text.split('').map((char, i) => 
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join(''));
};

const decrypt = (encrypted, key = 'UF51_SCOTT_ENCRYPTED') => {
  try {
    const decoded = atob(encrypted);
    return decoded.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
  } catch {
    return null;
  }
};

export default function ScottPasteGigOffer() {
  const navigate = useNavigate();
  const [emailText, setEmailText] = useState('');
  const [artistId, setArtistId] = useState('');
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingEmails, setPendingEmails] = useState([]);
  const [syncing, setSyncing] = useState(false);

  // Load artists + pending emails on mount
  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await base44.entities.ScottArtist.list();
        setArtists(data);
        localStorage.setItem('scott_artists', JSON.stringify(data));
      } catch {
        // Load from cache if offline
        const cached = localStorage.getItem('scott_artists');
        if (cached) setArtists(JSON.parse(cached));
      }
    };
    loadArtists();
    loadPendingEmails();
  }, []);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingEmails();
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load pending emails from localStorage
  const loadPendingEmails = () => {
    try {
      const stored = localStorage.getItem('scott_pending_gig_emails');
      if (stored) {
        const pending = JSON.parse(stored);
        setPendingEmails(pending);
      }
    } catch (error) {
      console.error('Failed to load pending emails:', error);
    }
  };

  // Save email offline (encrypted)
  const saveOffline = (email, artistId) => {
    try {
      const pending = JSON.parse(localStorage.getItem('scott_pending_gig_emails') || '[]');
      const newEmail = {
        id: `offline_${Date.now()}`,
        emailText: encrypt(email), // Encrypted
        artistId,
        timestamp: Date.now(),
        synced: false
      };
      pending.push(newEmail);
      localStorage.setItem('scott_pending_gig_emails', JSON.stringify(pending));
      setPendingEmails(pending);
      return true;
    } catch (error) {
      console.error('Failed to save offline:', error);
      return false;
    }
  };

  // Sync all pending emails when online
  const syncPendingEmails = async () => {
    const pending = JSON.parse(localStorage.getItem('scott_pending_gig_emails') || '[]');
    if (pending.length === 0) return;

    setSyncing(true);
    const remaining = [];

    for (const email of pending) {
      try {
        const decrypted = decrypt(email.emailText);
        if (decrypted) {
          await scanGigOffers({ emailText: decrypted, artistId: email.artistId });
          // Successfully synced - don't add to remaining
        } else {
          remaining.push(email);
        }
      } catch (error) {
        console.error('Sync failed for email:', error);
        remaining.push(email); // Keep for retry
      }
    }

    localStorage.setItem('scott_pending_gig_emails', JSON.stringify(remaining));
    setPendingEmails(remaining);
    setSyncing(false);
  };

  const handleScan = async () => {
    if (!emailText.trim() || !artistId) {
      alert('Select artist and paste email');
      return;
    }

    setLoading(true);
    
    // If offline → save encrypted locally
    if (!isOnline) {
      const saved = saveOffline(emailText, artistId);
      setLoading(false);
      if (saved) {
        alert('✅ Saved offline (encrypted)\n\nWill process when back online');
        setEmailText('');
      } else {
        alert('❌ Failed to save offline');
      }
      return;
    }

    // If online → process immediately
    try {
      await scanGigOffers({ emailText, artistId });
      alert('✅ Gig offer extracted!');
      setEmailText('');
      navigate(createPageUrl('ScottGigOffers'));
    } catch (error) {
      // If fails → save offline as backup
      const saved = saveOffline(emailText, artistId);
      alert(saved ? 
        '⚠️ Server error - saved offline (will retry when online)' : 
        '❌ Error: ' + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Status Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold text-sm">ONLINE</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-cyan-400">
                  <WifiOff className="w-5 h-5" />
                  <span className="font-bold text-sm">OFFLINE MODE</span>
                </div>
              )}
              
              {syncing && (
                <div className="flex items-center gap-2 text-purple-400">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-bold">Syncing...</span>
                </div>
              )}
            </div>

            {pendingEmails.length > 0 && (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500 rounded px-3 py-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-bold text-sm">
                  {pendingEmails.length} pending
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('ScottGigOffers'))}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-black text-white">PASTE GIG OFFER</h1>
            <p className="text-gray-400">Works offline • Privacy-first • Auto-syncs</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-black border-2 border-cyan-500">
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-white font-bold mb-2 block">Artist/Band</label>
                <Select value={artistId} onValueChange={setArtistId}>
                  <SelectTrigger className="bg-black border-cyan-500 text-white">
                    <SelectValue placeholder="Select artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white font-bold mb-2 block">Paste Email</label>
                <Textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Paste the full gig offer email here..."
                  className="bg-black border-cyan-500 text-white h-64 font-mono text-sm"
                />
              </div>

              <Button
                onClick={handleScan}
                disabled={loading || !emailText.trim() || !artistId}
                className="w-full bg-cyan-600 hover:bg-cyan-700 gap-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    {isOnline ? 'AI Extracting...' : 'Saving Encrypted...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {isOnline ? 'Extract Gig Details' : 'Save Offline (Encrypted)'}
                  </>
                )}
              </Button>

              {/* Privacy & Security Info */}
              <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 text-sm font-bold">Privacy First</p>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✓ Works 100% offline - paste anytime</li>
                  <li>✓ Stored encrypted on YOUR device</li>
                  <li>✓ Zero inbox access needed</li>
                  <li>✓ You control what gets sent</li>
                  <li>✓ Auto-syncs when back online</li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
                <p className="text-cyan-400 text-sm font-bold mb-2">AI will extract:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Venue, location (city/county/country), capacity</li>
                  <li>• Date, time, fee, currency</li>
                  <li>• Promoter name and contact</li>
                  <li>• Deposit info, tour logistics, special requirements</li>
                  <li>• Distance to next show (if tour)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Emails List */}
        <AnimatePresence>
          {pendingEmails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <Card className="bg-black border-2 border-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-white">PENDING SYNC</h3>
                      <p className="text-gray-400 text-sm">
                        {pendingEmails.length} email{pendingEmails.length > 1 ? 's' : ''} waiting to sync
                      </p>
                    </div>
                    {isOnline && !syncing && (
                      <Button
                        onClick={syncPendingEmails}
                        className="bg-cyan-600 hover:bg-cyan-700 gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Sync Now
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {pendingEmails.map((email) => {
                      const artist = artists.find(a => a.id === email.artistId);
                      return (
                        <div
                          key={email.id}
                          className="bg-gray-900 border border-gray-700 rounded p-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-white font-bold">{artist?.name || 'Unknown Artist'}</p>
                            <p className="text-gray-400 text-sm">
                              {new Date(email.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-amber-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-bold">Pending</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!isOnline && (
                    <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded p-3">
                      <p className="text-cyan-400 text-sm">
                        📡 Will auto-sync when you're back online
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}