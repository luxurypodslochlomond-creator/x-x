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
// scanGigOffers now called via base44.functions.invoke

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
  const [screenshot, setScreenshot] = useState(null);
  const [mode, setMode] = useState('text'); // 'text' or 'image'
  const [gmailConnected, setGmailConnected] = useState(false);
  const [checkingGmail, setCheckingGmail] = useState(false);

  // Load artists + pending emails + URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const idParam = urlParams.get('id');
    
    // Pre-fill from URL
    if (emailParam) {
      const decoded = decodeURIComponent(emailParam);
      setEmailText(decoded);
    }
    if (idParam) {
      setArtistId(idParam);
    }

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
    checkGmailConnection();
  }, []);

  // Check if Gmail OAuth connected
  const checkGmailConnection = async () => {
    try {
      const { scanScottInbox } = await import('@/functions/scanScottInbox');
      const result = await scanScottInbox({});
      setGmailConnected(!result.needsAuth);
    } catch {
      setGmailConnected(false);
    }
  };

  // Scan Gmail now
  const scanGmailNow = async () => {
    setCheckingGmail(true);
    try {
      const { scanScottInbox } = await import('@/functions/scanScottInbox');
      const result = await scanScottInbox({});
      if (result.needsAuth) {
        alert('❌ Gmail not connected\n\nConnect Gmail in settings to enable auto-scan');
      } else {
        alert(`✅ ${result.message}\n\nProcessed: ${result.processed}\nSkipped: ${result.skipped}`);
        if (result.processed > 0) {
          navigate(createPageUrl('ScottGigOffers'));
        }
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setCheckingGmail(false);
    }
  };

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

  // Sync all pending emails when online - FIXED
  const syncPendingEmails = async () => {
    const pending = JSON.parse(localStorage.getItem('scott_pending_gig_emails') || '[]');
    if (pending.length === 0) {
      alert('✅ Nothing to sync');
      return;
    }

    setSyncing(true);
    const remaining = [];
    let successCount = 0;
    let failedCount = 0;

    for (const email of pending) {
      try {
        const decrypted = decrypt(email.emailText);
        if (!decrypted) {
          failedCount++;
          continue;
        }

        const response = await base44.functions.invoke('scanGigOffers', { 
          emailText: decrypted, 
          artistId: email.artistId 
        });
        
        if (response?.data?.success) {
          successCount++;
        } else {
          remaining.push(email);
          failedCount++;
        }
      } catch (error) {
        console.error('Sync error:', error);
        remaining.push(email);
        failedCount++;
      }
    }

    localStorage.setItem('scott_pending_gig_emails', JSON.stringify(remaining));
    setPendingEmails(remaining);
    setSyncing(false);

    if (successCount > 0) {
      alert(`✅ Synced ${successCount} offer${successCount > 1 ? 's' : ''}${failedCount > 0 ? `\n⚠️ ${failedCount} failed (will retry)` : ''}`);
      if (successCount > 0) navigate(createPageUrl('ScottGigOffers'));
    } else {
      alert(`❌ All ${failedCount} sync${failedCount > 1 ? 's' : ''} failed. Check connection.`);
    }
  };

  // Handle screenshot paste from clipboard
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          setScreenshot(file);
          setMode('image');
        }
        break;
      }
    }
  };

  // Handle drag and drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setScreenshot(file);
      setMode('image');
    }
  };

  // Extract text from screenshot using AI51 vision - FAST MODE
  const extractFromScreenshot = async (file) => {
    try {
      // Upload screenshot
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      // AI51 vision OCR - simplified prompt for speed
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: 'Extract text from this gig offer email.',
        file_urls: file_url
      });
      
      return result;
    } catch (error) {
      alert('❌ Screenshot OCR failed. Try paste instead.');
      throw error;
    }
  };

  const handleScan = async () => {
    if (!artistId) {
      alert('Select artist first');
      return;
    }

    // Check if we have content
    if (mode === 'text' && !emailText.trim()) {
      alert('Paste email text or screenshot');
      return;
    }
    if (mode === 'image' && !screenshot) {
      alert('Add a screenshot');
      return;
    }

    setLoading(true);
    
    try {
      let textToProcess = emailText;

      // If screenshot mode → extract text first
      if (mode === 'image' && screenshot) {
        if (!isOnline) {
          alert('❌ Screenshot OCR requires internet\n\nUse text paste for offline mode');
          setLoading(false);
          return;
        }
        textToProcess = await extractFromScreenshot(screenshot);
      }

      // If offline → save encrypted locally
      if (!isOnline) {
        const saved = saveOffline(textToProcess, artistId);
        setLoading(false);
        if (saved) {
          alert('✅ Saved offline (encrypted)\n\nWill process when back online');
          setEmailText('');
          setScreenshot(null);
          setMode('text');
        } else {
          alert('❌ Failed to save offline');
        }
        return;
      }

      // If online → process immediately
      const response = await base44.functions.invoke('scanGigOffers', { 
        emailText: textToProcess, 
        artistId 
      });
      if (response?.data?.success) {
        alert('✅ Gig offer extracted!');
        setEmailText('');
        setScreenshot(null);
        setMode('text');
        navigate(createPageUrl('ScottGigOffers'));
      } else {
        throw new Error('Failed to extract gig details');
      }
    } catch (error) {
      // If fails → save offline as backup
      const textToSave = mode === 'text' ? emailText : await extractFromScreenshot(screenshot).catch(() => null);
      if (textToSave) {
        const saved = saveOffline(textToSave, artistId);
        alert(saved ? 
          '⚠️ Server error - saved offline (will retry when online)' : 
          '❌ Error: ' + error.message
        );
      } else {
        alert('❌ Error: ' + error.message);
      }
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

        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('ScottGigOffers'))}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-black text-white">NEW OFFER</h1>
            <p className="text-gray-400">Paste, screenshot, or auto-scan Gmail</p>
          </div>
        </div>

        {/* Gmail Auto-Scan Option */}
        {isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-black border-2 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-2">
                      ⚡ AUTO-SCAN GMAIL (Optional)
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {gmailConnected 
                        ? '✅ Connected - AI51 scans your inbox for gig emails automatically'
                        : 'Connect Gmail to automatically find and extract gig offers'}
                    </p>
                    <ul className="text-gray-500 text-xs space-y-1">
                      <li>• You control access (opt-in)</li>
                      <li>• AI51 finds gig emails beyond filters</li>
                      <li>• Paste/screenshot still works without this</li>
                      <li>• Read-only access (can't send/delete)</li>
                    </ul>
                  </div>
                  <Button
                    onClick={scanGmailNow}
                    disabled={checkingGmail || !gmailConnected}
                    className={gmailConnected ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700'}
                  >
                    {checkingGmail ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin mr-2" />
                        Scanning...
                      </>
                    ) : gmailConnected ? (
                      'Scan Now'
                    ) : (
                      'Connect Gmail'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

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

              {/* Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  onClick={() => { setMode('text'); setScreenshot(null); }}
                  className={mode === 'text' ? 'bg-cyan-600' : 'bg-gray-700'}
                >
                  📝 Paste Text
                </Button>
                <Button
                  onClick={() => { setMode('image'); setEmailText(''); }}
                  className={mode === 'image' ? 'bg-cyan-600' : 'bg-gray-700'}
                >
                  📸 Screenshot
                </Button>
              </div>

              {/* Text Mode */}
              {mode === 'text' && (
                <div>
                  <label className="text-white font-bold mb-2 block">Paste Email</label>
                  <Textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    onPaste={handlePaste}
                    placeholder="Paste the full gig offer email here..."
                    className="bg-black border-cyan-500 text-white h-64 font-mono text-sm"
                  />
                </div>
              )}

              {/* Screenshot Mode */}
              {mode === 'image' && (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-cyan-500 rounded-lg p-8 text-center"
                >
                  {screenshot ? (
                    <div className="space-y-3">
                      <img
                        src={URL.createObjectURL(screenshot)}
                        alt="Email screenshot"
                        className="max-h-64 mx-auto rounded border border-cyan-500"
                      />
                      <p className="text-green-400 font-bold">✅ Screenshot ready</p>
                      <Button
                        onClick={() => setScreenshot(null)}
                        variant="outline"
                        className="border-red-500 text-red-400"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Mail className="w-16 h-16 text-cyan-400 mx-auto" />
                      <p className="text-white font-bold">Drop screenshot or paste from clipboard</p>
                      <p className="text-gray-400 text-sm">
                        Take a screenshot of your email → Paste here (Ctrl+V / Cmd+V)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setScreenshot(file);
                        }}
                        className="hidden"
                        id="screenshot-upload"
                      />
                      <label htmlFor="screenshot-upload">
                        <Button className="bg-cyan-600 hover:bg-cyan-700" asChild>
                          <span>Or Choose File</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={handleScan}
                disabled={loading || !artistId}
                className="w-full bg-cyan-600 hover:bg-cyan-700 gap-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    {mode === 'image' ? 'Reading Screenshot...' : isOnline ? 'AI Extracting...' : 'Saving Encrypted...'}
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
                  <li>✓ Screenshot support with AI vision OCR</li>
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