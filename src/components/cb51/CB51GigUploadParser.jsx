import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Upload, CheckCircle, AlertCircle, Loader, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51GigUploadParser({ artistId, onGigCreated }) {
  const queryClient = useQueryClient();
  const [selectedArtistId, setSelectedArtistId] = useState(artistId || null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setCurrentUser).catch(() => {});
  }, []);

  // When artistId prop changes (passed from parent), keep in sync
  useEffect(() => {
    if (artistId && !selectedArtistId) {
      setSelectedArtistId(artistId);
    }
  }, [artistId]);
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [savedGig, setSavedGig] = useState(null);
  const [debugLog, setDebugLog] = useState([]);

  const { data: artists = [] } = useQuery({
    queryKey: ['cb51Artists'],
    queryFn: () => base44.entities.Artist.filter({ archived: false }),
  });

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setSaveError(null);
    setParsing(true);
    setDebugLog(['🚀 Starting...']);

    // Keep screen awake during upload
    let wakeLock = null;
    if ('wakeLock' in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Screen wake lock active');
      } catch (err) {
        console.log('Wake lock request failed:', err);
      }
    }

    // 15 second timeout
    const timeoutId = setTimeout(() => {
      setParsing(false);
      setFile(null);
      setError('⏱️ Timeout - Try a smaller file or enter manually');
    }, 15000);

    try {
      console.log('🚀 Starting upload...', selectedFile.name);
      setDebugLog(prev => [...prev, `📤 Uploading ${selectedFile.name}...`]);

      // Step 1: Upload file
      const uploadRes = await base44.integrations.Core.UploadFile({
        file: selectedFile
      });

      console.log('✅ Upload complete:', uploadRes.file_url);
      setDebugLog(prev => [...prev, '✅ Upload complete', '🤖 Calling AI...']);
      console.log('🤖 Calling AI vision...');

      // Step 2: ONE AI call - Vision LLM reads PDF/image directly
      const parseRes = await base44.integrations.Core.InvokeLLM({
        prompt: `Extract ALL gig offer details from this document:

    - venue_name: Venue/festival name
    - date_start: Date in YYYY-MM-DD format
    - time_start: Time in HH:MM format  
    - location: Full address/city/country
    - promoter_name: Contact person or company
    - promoter_email: Email address
    - promoter_phone: Phone with country code
    - fee: Just the number (no currency symbols)
    - offer_details: Everything - technical specs, accommodation, travel, load-in times, etc
    - artist_name: Who is performing
    - title: Event name if different from venue

    Return ONLY the JSON, nothing else.`,
        file_urls: [uploadRes.file_url],
        response_json_schema: {
          type: "object",
          properties: {
            venue_name: { type: "string" },
            date_start: { type: "string" },
            time_start: { type: "string" },
            location: { type: "string" },
            promoter_name: { type: "string" },
            promoter_email: { type: "string" },
            promoter_phone: { type: "string" },
            fee: { type: ["string", "number", "null"] },
            offer_details: { type: "string" },
            artist_name: { type: "string" },
            title: { type: "string" }
          }
        }
      });

      clearTimeout(timeoutId);
      console.log('✅ AI response:', JSON.stringify(parseRes, null, 2));
      setDebugLog(prev => [...prev, '✅ AI responded!', `Venue: ${parseRes?.venue_name || 'MISSING'}`, `Date: ${parseRes?.date_start || 'MISSING'}`, `Promoter: ${parseRes?.promoter_name || 'MISSING'}`]);

      const extracted = parseRes;

      // ALWAYS show what we got - even if empty
      console.log('📋 Extracted venue:', extracted?.venue_name);
      console.log('📋 Extracted promoter:', extracted?.promoter_name);
      console.log('📋 Extracted artist:', extracted?.artist_name);
      console.log('📋 Extracted date:', extracted?.date_start);

      // Clean fee
      if (extracted.fee) {
        const feeCleaned = String(extracted.fee).replace(/[^0-9.]/g, '');
        extracted.fee = feeCleaned ? parseFloat(feeCleaned) : null;
      }

      // Show SOMETHING even if partial
      if (extracted) {
        setExtracted(extracted);
        setEditing({ ...extracted });

      // ONLY auto-detect artist if user hasn't already selected one
      const currentArtistId = artistId || selectedArtistId;
      if (!currentArtistId) {
        if (artists.length === 1) {
          // Only one artist in system - always auto-select
          setSelectedArtistId(artists[0].id);
          setError(null);
        } else if (extracted.artist_name && artists.length > 0) {
          // Fuzzy match: strip spaces/punctuation/case for comparison
          const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
          const normalizedExtracted = normalize(extracted.artist_name);
          
          const possibleMatches = artists.filter(a => {
            const normalizedArtist = normalize(a.name);
            return normalizedArtist.includes(normalizedExtracted) ||
              normalizedExtracted.includes(normalizedArtist) ||
              // word overlap check
              extracted.artist_name.toLowerCase().split(/\s+/).some(word => 
                word.length > 2 && normalizedArtist.includes(normalize(word))
              );
          });

          if (possibleMatches.length >= 1) {
            setSelectedArtistId(possibleMatches[0].id);
            setError(null);
          } else {
            setError('Pick your artist below:');
          }
        } else if (artists.length > 1) {
          setError('Pick your artist below:');
        }
      } else if (!selectedArtistId) {
        setSelectedArtistId(currentArtistId);
      }
        
        // Check for missing critical fields
        const missingCritical = [];
        if (!extracted.venue_name?.trim()) missingCritical.push('Venue');
        if (!extracted.date_start?.trim()) missingCritical.push('Date');
        if (!extracted.promoter_name?.trim()) missingCritical.push('Promoter');

        console.log('⚠️ Missing fields:', missingCritical);

        if (missingCritical.length > 0) {
        setError(`⚠️ Missing: ${missingCritical.join(', ')} - Fill them in below`);
        }
        } else {
          clearTimeout(timeoutId);
          console.error('❌ NO DATA AT ALL from AI');
          setDebugLog(prev => [...prev, '❌ AI returned nothing']);
          setError('❌ Could not read PDF - Try photo or manual entry');
          setFile(null);
        }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('❌ FULL ERROR:', err);
      console.error('❌ Error message:', err.message);
      console.error('❌ Error stack:', err.stack);
      
      setDebugLog(prev => [...prev, `❌ ERROR: ${err.message}`]);
      
      // Show user-friendly error
      const errorMsg = err.message || 'Failed to parse file';
      setError(`❌ ${errorMsg.substring(0, 100)}`);
      setFile(null);
    } finally {
      setParsing(false);
      console.log('✅ Parsing complete');
      setDebugLog(prev => [...prev, '✅ Done']);
      
      // Release wake lock
      if (wakeLock) {
        await wakeLock.release();
        console.log('Screen wake lock released');
      }
      
      // Vibrate on completion
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedArtistId) {
        setSaveError('Select artist first');
        throw new Error('No artist selected');
      }
      
      if (!editing.venue_name) {
        setSaveError('Need: Venue name');
        throw new Error('Missing required fields');
      }

      const managerId = currentUser?.id || '';
      
      // Use date_start or fallback to today
      const gigDate = editing.date_start?.trim() || new Date().toISOString().split('T')[0];

      const gig = await base44.entities.GigOffer.create({
            manager_id: managerId,
            artist_id: selectedArtistId,
            venue: editing.venue_name || 'Untitled Gig',
            city: editing.location || '',
            country: '',
            date: gigDate,
            time: editing.time_start || '',
            fee: editing.fee ? Number(editing.fee) : null,
            currency: 'EUR',
            promoter: editing.promoter_name || '',
            promoter_contact: [editing.promoter_email, editing.promoter_phone].filter(Boolean).join(' | '),
            notes: editing.offer_details || '',
            status: 'pending',
            urgency: 'urgent',
          });

          // Fire notification after gig created
          try {
            await base44.functions.invoke('notifyManagerPendingGig', {
              gigId: gig.id,
              artistId: selectedArtistId,
              venueName: editing.venue_name,
              promoterName: editing.promoter_name
            });
          } catch (notifyErr) {
            console.log('Notification send failed (non-critical):', notifyErr.message);
          }

          return gig;
    },
    onSuccess: (gig) => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs'] });
      queryClient.invalidateQueries({ queryKey: ['gigOffers'] });
      setSavedGig(gig);
      setExtracted(null);
      setEditing(null);
      setFile(null);
      setSaveError(null);
    },
    onError: (err) => {
      setSaveError(err.message);
    }
  });

  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-cyan-400" />
        <h2 className="text-cyan-400 font-black text-sm font-mono">GIG UPLOAD</h2>
      </div>

      {/* ARTIST SELECTOR - SMART AUTO-DETECT OR QUICK CHIPS */}
      {!extracted && !selectedArtistId && artists.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 text-xs font-mono px-3 py-2 bg-cyan-900/20 border border-cyan-500/30 rounded text-center"
        >
          Upload PDF → AI will auto-detect artist
        </motion.div>
      )}

      {/* UPLOAD AREA - Always show, AI detects artist */}
      {!extracted && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block cursor-pointer"
        >
          <input
            type="file"
            onChange={handleFileSelect}
            disabled={parsing}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
          <div className={`border-2 border-dashed border-cyan-500/40 rounded-lg p-6 text-center transition-all ${
            parsing ? 'bg-cyan-900/20 border-cyan-500/60' : 'hover:border-cyan-500/70 hover:bg-cyan-900/10'
          }`}>
            {parsing ? (
              <>
                <Loader className="w-8 h-8 text-cyan-400 mx-auto animate-spin mb-2" />
                <p className="text-cyan-400 font-bold text-sm">PARSING PDF...</p>
                {debugLog.length > 0 && (
                  <div className="mt-3 bg-black/50 rounded p-2 text-left max-h-24 overflow-y-auto">
                    {debugLog.map((log, i) => (
                      <p key={i} className="text-cyan-300 text-[10px] font-mono">{log}</p>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-bold text-sm">Drop PDF or click</p>
                <p className="text-gray-500 text-xs mt-1">Contracts, offers, details</p>
              </>
            )}
          </div>
        </motion.label>
      )}

      {/* SAVED CONFIRMATION - Simple */}
      <AnimatePresence>
        {savedGig && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <p className="text-green-300 text-xs font-bold">{savedGig.title} saved ✓</p>
            </div>
            <button
              onClick={() => {
                setSavedGig(null);
                setExtracted(null);
                setEditing(null);
                setFile(null);
                onGigCreated?.(savedGig);
              }}
              className="text-green-400 hover:text-green-300 text-xs font-bold"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXTRACTED PREVIEW */}
      <AnimatePresence mode="wait">
        {extracted && editing && !savedGig && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {/* Artist selector - show if needed */}
            {!selectedArtistId && artists.length > 0 && (
              <div className="bg-cyan-900/30 border border-cyan-500/40 rounded-lg p-3">
                <p className="text-cyan-300 text-xs mb-2 font-bold">Select Artist:</p>
                <div className="flex gap-2 flex-wrap">
                  {artists.map(artist => (
                    <button
                      key={artist.id}
                      onClick={() => {
                        setSelectedArtistId(artist.id);
                        setError(null);
                      }}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                    >
                      {artist.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-yellow-300 text-xs">{error}</p>
                  
                  {/* Show quick artist chips if multiple matches found */}
                  {error.includes('possible artists') && extracted.artist_name && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {artists
                        .filter(a => 
                          a.name.toLowerCase().includes(extracted.artist_name.toLowerCase()) ||
                          extracted.artist_name.toLowerCase().includes(a.name.toLowerCase())
                        )
                        .map(artist => (
                          <button
                            key={artist.id}
                            onClick={() => {
                              setSelectedArtistId(artist.id);
                              setError(null);
                            }}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-[10px] font-bold transition-colors"
                          >
                            {artist.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GRID CARDS */}
            <div className="grid grid-cols-2 gap-2">
              {/* VENUE */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">VENUE</label>
                <input
                  type="text"
                  value={editing.venue_name || ''}
                  onChange={(e) => setEditing({ ...editing, venue_name: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="Required"
                />
              </div>

              {/* DATE */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">DATE</label>
                <input
                  type="text"
                  value={editing.date_start || ''}
                  onChange={(e) => setEditing({ ...editing, date_start: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="YYYY-MM-DD"
                />
              </div>

              {/* FEE */}
              <div className="bg-black border-2 border-green-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">FEE</label>
                <input
                  type="text"
                  value={editing.fee || ''}
                  onChange={(e) => setEditing({ ...editing, fee: e.target.value })}
                  className="w-full bg-green-900/20 border border-green-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="£"
                />
              </div>

              {/* PROMOTER */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">PROMOTER</label>
                <input
                  type="text"
                  value={editing.promoter_name || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_name: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="Required"
                />
              </div>
            </div>

            {/* CONTACT DETAILS - Full width */}
            <div className="space-y-2">
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">EMAIL</label>
                <input
                  type="email"
                  value={editing.promoter_email || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_email: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs placeholder-gray-600"
                  placeholder="promoter@venue.com"
                />
              </div>

              {/* LOCATION */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">LOCATION</label>
                <input
                  type="text"
                  value={editing.location || ''}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs placeholder-gray-600"
                  placeholder="Address / City"
                />
              </div>

              {/* PHONE */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">PHONE</label>
                <input
                  type="tel"
                  value={editing.promoter_phone || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_phone: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs placeholder-gray-600"
                  placeholder="+44..."
                />
              </div>

              {editing.offer_details && (
                <div className="bg-black border-2 border-cyan-500/20 rounded-lg p-3 col-span-2">
                  <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">OFFER DETAILS</label>
                  <div className="bg-cyan-900/10 p-2 rounded text-white text-[11px] max-h-24 overflow-y-auto border border-cyan-500/20">
                    {editing.offer_details}
                  </div>
                </div>
              )}
            </div>

            {saveError && (
              <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-2 text-red-300 text-xs">
                {saveError}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setExtracted(null);
                  setEditing(null);
                  setFile(null);
                  setSaveError(null);
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded text-xs transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-3 h-3" />
                {saveMutation.isPending ? 'SAVING...' : 'SAVE GIG'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}