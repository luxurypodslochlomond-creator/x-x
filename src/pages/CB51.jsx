import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Plus, Trash2, AlertCircle, Calendar, MessageSquare, Users, Zap, Mail, CheckCircle, Heart, DollarSign, Shield, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import TechStatusBar from '@/components/scott/TechStatusBar';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import CB51NotificationInbox from '@/components/scott/CB51NotificationInbox';
import CB51BandNotifications from '@/components/scott/CB51BandNotifications';
import CB51SecurityNotice from '@/components/scott/CB51SecurityNotice';
import CB51BandVoteAlert from '@/components/scott/CB51BandVoteAlert';
import CB51VoteBreakdown from '@/components/scott/CB51VoteBreakdown';
import LiveClock from '@/components/shared/LiveClock';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import CB51NavBio from '@/components/scott/CB51NavBio';
import CB51EmailSettings from '@/components/scott/CB51EmailSettings';

/**
 * CB51 HOME PAGE - CLEAN URL FOR WHITE LABEL
 * Artist management hub
 */

export default function CB51() {
                const navigate = useNavigate();
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);
          const [editArtistsOpen, setEditArtistsOpen] = useState(false);
          const [moreToolsOpen, setMoreToolsOpen] = useState(false);
          const [archivedOpen, setArchivedOpen] = useState(false);
          const [settingsOpen, setSettingsOpen] = useState(false);
          const [pasteModalOpen, setPasteModalOpen] = useState(false);
          const [pastedText, setPastedText] = useState('');
                const [scanning, setScanning] = useState(false);
                      const [expandedTool, setExpandedTool] = useState(null);
                      const [expandedSection, setExpandedSection] = useState({});
                      const [editingOffer, setEditingOffer] = useState(null);
                const [editForm, setEditForm] = useState({});
                const [scannedOffer, setScannedOffer] = useState(null);
                const [editingScanned, setEditingScanned] = useState(false);
                const [scannedEditForm, setScannedEditForm] = useState({});
                const [processingYes, setProcessingYes] = useState(false);
                const [scanningStep, setScanningStep] = useState(0);
                const queryClient = useQueryClient();

          useEffect(() => {
              // Set page title and meta tags for CB51 branding
              document.title = 'CB51 • Artist Management';

              // Update meta tags for sharing/bookmarking
              let metaTheme = document.querySelector('meta[name="theme-color"]');
              if (!metaTheme) {
                  metaTheme = document.createElement('meta');
                  metaTheme.name = 'theme-color';
                  document.head.appendChild(metaTheme);
              }
              metaTheme.content = '#06b6d4';

              let metaAppName = document.querySelector('meta[name="apple-mobile-web-app-title"]');
              if (!metaAppName) {
                  metaAppName = document.createElement('meta');
                  metaAppName.name = 'apple-mobile-web-app-title';
                  document.head.appendChild(metaAppName);
              }
              metaAppName.content = 'CB51';

              base44.auth.me().then(async (currentUser) => {
                  setUser(currentUser);
                  setLoading(false);
              }).catch(() => {
                  // Not logged in - redirect to CB51 login page
                  navigate(createPageUrl('CB51Login'));
              });
          }, [navigate]);

    // Load artists IMMEDIATELY (most important)
    const { data: allArtists = [], isLoading: artistsLoading } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({}),
        enabled: !!user,
        staleTime: 30000 // Cache for 30s
    });

    // Memoize filtered artists to avoid recalculating
    const artists = useMemo(() => allArtists.filter(a => !a.archived), [allArtists]);
    const archivedArtists = useMemo(() => allArtists.filter(a => a.archived), [allArtists]);

    // Load stats data lazily - only when artists are loaded
    const { data: allOffers = [] } = useQuery({
        queryKey: ['scottAllGigOffers'],
        queryFn: () => base44.entities.ScottGigOffer.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 60000
    });

    const { data: invoices = [] } = useQuery({
        queryKey: ['scottInvoices'],
        queryFn: () => base44.entities.ScottInvoice.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 120000
    });

    const { data: messages = [] } = useQuery({
        queryKey: ['scottMessages'],
        queryFn: () => base44.entities.ScottMessage.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 120000
    });

    const { data: events = [] } = useQuery({
        queryKey: ['scottEvents'],
        queryFn: () => base44.entities.ScottEvent.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 120000
    });

    const { data: tasks = [] } = useQuery({
        queryKey: ['scottTasks'],
        queryFn: () => base44.entities.ScottTask.filter({}),
        enabled: !!user && artists.length > 0,
        staleTime: 120000
    });

    // Memoize stats - but don't display them yet
    const stats = useMemo(() => ({
        pendingOffers: allOffers.filter(o => o.status === 'pending_manager_review').length,
        awaitingBand: allOffers.filter(o => o.status === 'sent_to_band').length,
        overdueInvoices: invoices.filter(i => i.status === 'overdue').length,
        urgentMessages: messages.filter(m => m.status === 'pending' && m.urgency === 'urgent').length,
        hoursPerWeek: allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').length * 2,
        upcomingGigs: allOffers.filter(o => o.status === 'confirmed' && o.date && new Date(o.date) > new Date()).length,
        pipelineValue: allOffers.filter(o => o.status === 'pending_manager_review' || o.status === 'sent_to_band').reduce((sum, o) => sum + (o.fee || 0), 0)
    }), [allOffers, invoices, messages]);

    // Quick link to pending offers if any
    const hasPendingOffers = stats.pendingOffers > 0;

    const archiveArtistMutation = useMutation({
        mutationFn: ({ artistId, archived }) => 
            base44.entities.ScottArtist.update(artistId, { archived: archived }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottArtists'] });
        }
    });

    const handleArchiveArtist = (artist) => {
        if (confirm(`Archive ${artist.name}? You can restore them later.`)) {
            archiveArtistMutation.mutate({ artistId: artist.id, archived: true });
        }
    };

    const handleRestoreArtist = (artist) => {
        archiveArtistMutation.mutate({ artistId: artist.id, archived: false });
    };

    const updateOfferMutation = useMutation({
        mutationFn: ({ offerId, data }) => base44.entities.ScottGigOffer.update(offerId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
            setEditingOffer(null);
            setEditForm({});
        }
    });

    const handleEditOffer = (offer) => {
        setEditingOffer(offer.id);
        setEditForm({
            venue: offer.venue || '',
            date: offer.date || '',
            fee: offer.fee || '',
            city: offer.city || '',
            promoter: offer.promoter || '',
            notes: offer.notes || ''
        });
    };

    const handleSaveEdit = () => {
        updateOfferMutation.mutate({ offerId: editingOffer, data: editForm });
    };

    const handlePaste = async () => {
        if (!pastedText.trim()) return;

        setScanning(true);
        try {
            await base44.functions.invoke('scanGigOffers', { 
                emailText: pastedText, 
                artistId: artists[0]?.id 
            });

            queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
            queryClient.invalidateQueries({ queryKey: ['scottInvoices'] });

            setPastedText('');
            setPasteModalOpen(false);
            alert('✅ Scanned!');
        } catch (e) {
            alert('Error: ' + e.message);
        } finally {
            setScanning(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Radio className="w-16 h-16 mx-auto mb-4 animate-pulse text-cyan-400" />
                    <p className="text-cyan-400 font-black font-mono text-xl">CB51</p>
                </div>
            </div>
        );
    }

    return (
                <div className="min-h-screen bg-black text-white p-4 pb-20">

                    {/* NOTIFICATION MANAGER & BADGE */}
                                          <div className="mb-6 flex justify-end items-center gap-3">
                                              <button
                                                  onClick={() => navigate(createPageUrl('CB51NotificationInbox'))}
                                                  className="relative p-2 hover:bg-cyan-500/10 rounded-lg transition-all"
                                              >
                                                  <Bell className="w-5 h-5 text-cyan-400" />
                                                  {stats.pendingOffers > 0 && (
                                                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                                                          {stats.pendingOffers}
                                                      </span>
                                                  )}
                                              </button>
                                              <PushNotificationManager />
                                          </div>

                                    {/* AI51 SMART SCAN */}
                                                    {user?.role === 'admin' && (
                                                        <div className="mb-6">
                                                            <button
                                                                onClick={() => setPasteModalOpen(!pasteModalOpen)}
                                                                className="w-full bg-black hover:bg-gray-900 text-cyan-400 font-bold font-mono text-sm py-3 rounded-lg border border-cyan-500/50 hover:border-cyan-500 flex items-center justify-center gap-2 transition-all"
                                                            >
                                                                <AI51AtomIcon size={20} animate={true} />
                                                                <span>AI51 SCAN</span>
                                                            </button>

                                                            {pasteModalOpen && (
                                                                <div className="mt-3 bg-black border border-cyan-500/50 rounded-lg p-4">
                                                                    <div className="flex items-start gap-2 mb-3">
                                                                        <AI51AtomIcon size={24} animate={true} />
                                                                        <div>
                                                                            <p className="text-cyan-400 font-bold text-sm">Paste message or upload</p>
                                                                            <p className="text-gray-500 text-xs">AI51 extracts gigs, tasks, invoices, contracts</p>
                                                                        </div>
                                                                    </div>
                                                                    <Textarea
                                                                        value={pastedText}
                                                                        onChange={(e) => setPastedText(e.target.value)}
                                                                        placeholder="Paste WhatsApp, email, or contract text..."
                                                                        className="bg-black/50 border-cyan-500/30 text-white text-sm min-h-[180px] mb-3 focus:border-cyan-500"
                                                                    />
                                                                    <label className="block mb-3 cursor-pointer">
                                                                        <div className="bg-black/50 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 rounded-lg p-4 text-center transition-all">
                                                                            {scanning ? (
                                                                                <div className="space-y-2">
                                                                                    <div className="flex items-center justify-center gap-2">
                                                                                        <AI51AtomIcon size={16} animate={true} />
                                                                                        <p className="text-cyan-400 text-xs font-mono font-black">
                                                                                                            {scanningStep === 1 && 'Reading file'}
                                                                                                            {scanningStep === 2 && 'Finding venue'}
                                                                                                            {scanningStep === 3 && 'Extracting dates'}
                                                                                                            {scanningStep === 4 && 'Reading fee'}
                                                                                                            {scanningStep === 5 && 'Building offer'}
                                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="flex gap-1 justify-center">
                                                                                        {[1,2,3,4,5].map(step => (
                                                                                            <motion.div
                                                                                                key={step}
                                                                                                className={`w-1.5 h-1.5 rounded-full ${scanningStep >= step ? 'bg-cyan-400' : 'bg-gray-700'}`}
                                                                                                animate={scanningStep === step ? { scale: [1, 1.3, 1] } : {}}
                                                                                                transition={{ duration: 0.6, repeat: Infinity }}
                                                                                            />
                                                                                        ))}
                                                                                    </div>
                                                                                    <p className="text-gray-600 text-[9px] font-mono">AI51 extraction ⚡</p>
                                                                                </div>
                                                                            ) : (
                                                                                <>
                                                                                    <div className="flex items-center justify-center gap-2">
                                                                                        <p className="text-cyan-400 text-xs font-mono font-black">Upload PDF or Screenshot</p>
                                                                                    </div>
                                                                                    <p className="text-gray-600 text-[9px] font-mono mt-1">AI extraction</p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                        <input 
                                                                            type="file" 
                                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                                            disabled={scanning}
                                                                            onChange={async (e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if (!file) return;

                                                                                setScanning(true);
                                                                                setScanningStep(0);

                                                                                try {
                                                                                    setScanningStep(1);
                                                                                    const { file_url } = await base44.integrations.Core.UploadFile({ file });

                                                                                    setScanningStep(2);
                                                                                    const result = await base44.functions.invoke('scanGigOffers', { 
                                                                                        file_url,
                                                                                        artistId: artists[0]?.id 
                                                                                    });

                                                                                    setScanningStep(5);

                                                                                    // Refresh data FIRST
                                                                                    await queryClient.refetchQueries({ queryKey: ['scottAllGigOffers'] });

                                                                                    const offer = result.data?.offer;

                                                                                    // Close modal
                                                                                    setPastedText('');
                                                                                    setPasteModalOpen(false);
                                                                                    setScanning(false);

                                                                                    // Show CB51-style success modal with instant YES/NO
                                                                                    setScannedOffer(offer);
                                                                                } catch (e) {
                                                                                        console.error('Scan error:', e);
                                                                                        setScanning(false);
                                                                                        setPasteModalOpen(false);

                                                                                        // Parse error response
                                                                                        let errorMsg = e.message;
                                                                                        let isDuplicate = false;
                                                                                        let existingId = null;

                                                                                        try {
                                                                                            const errorData = typeof e.response?.data === 'string' ? 
                                                                                                JSON.parse(e.response.data) : e.response?.data;
                                                                                            errorMsg = errorData?.error || errorMsg;
                                                                                            isDuplicate = errorData?.isDuplicate;
                                                                                            existingId = errorData?.existingOfferId;
                                                                                        } catch {}

                                                                                        setScannedOffer({ 
                                                                                            error: errorMsg,
                                                                                            isDuplicate,
                                                                                            existingId
                                                                                        });
                                                                                    }
                                                                            }}
                                                                            className="hidden" 
                                                                        />
                                                                    </label>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => { setPasteModalOpen(false); setPastedText(''); }}
                                                                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-400 font-bold py-2.5 rounded-lg text-sm border border-gray-700"
                                                                        >
                                                                            CANCEL
                                                                        </button>
                                                                        <button
                                                                            onClick={handlePaste}
                                                                            disabled={scanning || !pastedText.trim()}
                                                                            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2.5 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                                                        >
                                                                            {scanning ? (
                                                                                <>
                                                                                    <AI51AtomIcon size={16} animate={true} />
                                                                                    <span>SCANNING...</span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <AI51AtomIcon size={16} animate={true} />
                                                                                    <span>SCAN</span>
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                    {/* REAL-TIME NOTIFICATIONS BANNER */}
                                    <div className="mb-6 space-y-2">
                                        {stats.awaitingBand > 0 && (
                                            <div className="bg-black border-2 border-green-500/50 hover:border-green-500 rounded-lg p-4 flex items-center justify-between transition-all cursor-pointer" onClick={() => setExpandedSection({...expandedSection, awaitingBand: !expandedSection.awaitingBand})}>
                                                <div>
                                                    <p className="text-green-400 font-black font-mono text-sm">AWAITING BAND VOTES</p>
                                                    <p className="text-gray-400 text-xs font-mono">{stats.awaitingBand} offer{stats.awaitingBand !== 1 ? 's' : ''} sent to band</p>
                                                </div>
                                                <button className="bg-green-600 hover:bg-green-700 text-black font-black px-3 py-1.5 rounded text-xs transition-all">
                                                    {expandedSection.awaitingBand ? 'HIDE' : 'VIEW'}
                                                </button>
                                            </div>
                                        )}

                                    </div>

                                    {/* REAL-TIME BAND VOTE ALERTS */}
                                    {user && (
                                        <CB51BandVoteAlert userEmail={user.email} />
                                    )}

                    {/* CB51-STYLE SCANNED OFFER - EXPANDABLE INLINE */}
                    {scannedOffer && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6"
                        >
                            <div className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border-2 border-cyan-500 rounded-lg p-4">
                                {scannedOffer.error ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${scannedOffer.isDuplicate ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
                                                <span className="text-xl">{scannedOffer.isDuplicate ? '⚠️' : '❌'}</span>
                                            </div>
                                            <div>
                                                <h3 className={`font-black font-mono text-sm ${scannedOffer.isDuplicate ? 'text-amber-400' : 'text-red-400'}`}>
                                                    {scannedOffer.isDuplicate ? 'ALREADY IN SYSTEM' : 'SCAN FAILED'}
                                                </h3>
                                                <p className={`text-xs font-mono ${scannedOffer.isDuplicate ? 'text-amber-400/60' : 'text-red-400/60'}`}>
                                                    {scannedOffer.isDuplicate ? 'This gig is already logged' : 'Try again bro'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-xs font-mono mb-4">{scannedOffer.error}</p>
                                        {scannedOffer.isDuplicate && scannedOffer.existingId && (
                                            <button
                                                onClick={() => {
                                                    navigate(createPageUrl('ScottGigOffers') + `?id=${scannedOffer.existingId}`);
                                                    setScannedOffer(null);
                                                }}
                                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-2 rounded-lg font-mono text-sm mb-2"
                                            >
                                                VIEW EXISTING
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setScannedOffer(null)}
                                            className={`w-full font-black py-2 rounded-lg font-mono text-sm ${scannedOffer.isDuplicate ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                                        >
                                            CLOSE
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <AI51AtomIcon size={28} animate={true} />
                                            </div>
                                            <div>
                                                <h3 className="text-cyan-400 font-black font-mono text-sm">GIG SCANNED ✓</h3>
                                                <p className="text-cyan-400/60 text-xs font-mono">Instant decision needed</p>
                                            </div>
                                        </div>

                                        {editingScanned ? (
                                            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 mb-4 space-y-2">
                                                <Input 
                                                    placeholder="Venue" 
                                                    value={scannedEditForm.venue || ''} 
                                                    onChange={(e) => setScannedEditForm({...scannedEditForm, venue: e.target.value})}
                                                    className="bg-black border-cyan-500/30 text-white text-xs"
                                                />
                                                <div className="flex gap-2">
                                                    <Input 
                                                        type="date" 
                                                        value={scannedEditForm.date || ''} 
                                                        onChange={(e) => setScannedEditForm({...scannedEditForm, date: e.target.value})}
                                                        className="bg-black border-cyan-500/30 text-white text-xs"
                                                    />
                                                    <Input 
                                                        type="number" 
                                                        placeholder="Fee" 
                                                        value={scannedEditForm.fee || ''} 
                                                        onChange={(e) => setScannedEditForm({...scannedEditForm, fee: e.target.value})}
                                                        className="bg-black border-cyan-500/30 text-white text-xs"
                                                    />
                                                </div>
                                                <Input 
                                                    placeholder="City" 
                                                    value={scannedEditForm.city || ''} 
                                                    onChange={(e) => setScannedEditForm({...scannedEditForm, city: e.target.value})}
                                                    className="bg-black border-cyan-500/30 text-white text-xs"
                                                />
                                                <Input 
                                                    placeholder="Promoter" 
                                                    value={scannedEditForm.promoter || ''} 
                                                    onChange={(e) => setScannedEditForm({...scannedEditForm, promoter: e.target.value})}
                                                    className="bg-black border-cyan-500/30 text-white text-xs"
                                                />
                                                <button
                                                    onClick={() => {
                                                        setScannedOffer({...scannedOffer, ...scannedEditForm});
                                                        setEditingScanned(false);
                                                    }}
                                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-1.5 rounded text-xs"
                                                >
                                                    SAVE CHANGES
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 mb-4 space-y-2">
                                                <div className="flex items-start justify-between">
                                                    <p className="text-white font-black text-base flex-1">{scannedOffer.venue || 'Venue TBC'}</p>
                                                    <button
                                                        onClick={() => {
                                                            setScannedEditForm({
                                                                venue: scannedOffer.venue || '',
                                                                date: scannedOffer.date || '',
                                                                fee: scannedOffer.fee || '',
                                                                city: scannedOffer.city || '',
                                                                promoter: scannedOffer.promoter || ''
                                                            });
                                                            setEditingScanned(true);
                                                        }}
                                                        className="text-cyan-400 hover:text-cyan-300 text-xs font-mono font-bold ml-2"
                                                    >
                                                        ✎ FIX
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-cyan-400 font-mono text-xs">{scannedOffer.date || 'Date TBC'}</span>
                                                    <span className="text-gray-500">•</span>
                                                    <span className="text-green-400 font-black font-mono text-xs">{scannedOffer.currency || 'GBP'}{scannedOffer.fee || '?'}</span>
                                                </div>
                                                {scannedOffer.city && (
                                                    <p className="text-gray-400 text-xs font-mono">📍 {scannedOffer.city}</p>
                                                )}
                                                {scannedOffer.promoter && (
                                                    <p className="text-gray-400 text-xs font-mono">👤 {scannedOffer.promoter}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={async () => {
                                                    if (!scannedOffer?.id) return;
                                                    await base44.entities.ScottGigOffer.update(scannedOffer.id, { status: 'rejected' });
                                                    queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
                                                    setScannedOffer(null);
                                                }}
                                                className="flex-1 bg-black border-2 border-red-500/50 hover:border-red-500 text-red-400 font-black py-3 rounded-lg font-mono text-sm transition-all"
                                            >
                                                NO
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (!scannedOffer?.id) return;

                                                    const offerData = {...scannedOffer};
                                                    setScannedOffer(null);

                                                    const toast = document.createElement('div');
                                                    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-cyan-500 text-black font-black font-mono text-xs px-4 py-2 rounded-lg z-[200]';
                                                    toast.textContent = `${offerData.venue} syncing`;
                                                    document.body.appendChild(toast);

                                                    (async () => {
                                                        try {
                                                            // FOUNDATION FIRST: sync to calendar
                                                            toast.textContent = `${offerData.venue} creating calendar event...`;
                                                            await base44.entities.ScottGigOffer.update(offerData.id, { status: 'sent_to_band' });

                                                            await base44.entities.ScottEvent.create({
                                                                artist_id: artists[0]?.id,
                                                                title: offerData.venue || 'Gig',
                                                                date: offerData.date,
                                                                time: offerData.time || '20:00',
                                                                venue: offerData.venue,
                                                                city: offerData.city,
                                                                country: offerData.country,
                                                                fee: offerData.fee,
                                                                currency: offerData.currency || 'GBP',
                                                                promoter: offerData.promoter,
                                                                capacity: offerData.capacity,
                                                                event_type: 'live_show',
                                                                notes: `Approved by manager`
                                                            });

                                                            // Then notify band
                                                            toast.textContent = `${offerData.venue} notifying band...`;
                                                            const allTeamMembers = await base44.entities.ScottTeamMember.list();
                                                            const teamMembers = allTeamMembers.filter(m => 
                                                                m.artist_access?.includes(artists[0]?.id)
                                                            );

                                                            const notificationCount = await Promise.all(teamMembers.map(member => 
                                                                base44.entities.ScottNotification.create({
                                                                    artist_id: artists[0]?.id,
                                                                    recipient_email: member.email,
                                                                    notification_type: 'band_gig_offer',
                                                                    title: `New gig: ${offerData.venue}`,
                                                                    message: `Manager approved. Vote YES or NO.`,
                                                                    gig_offer_id: offerData.id,
                                                                    status: 'pending'
                                                                })
                                                            ));
                                                            queryClient.invalidateQueries({ queryKey: ['scottAllGigOffers'] });
                                                            queryClient.invalidateQueries({ queryKey: ['scottEvents'] });
                                                            queryClient.invalidateQueries({ queryKey: ['scottTasks'] });

                                                            toast.textContent = `✓ ${offerData.venue} sent to ${notificationCount.length} band member${notificationCount.length !== 1 ? 's' : ''}`;
                                                            toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-black font-black font-mono text-xs px-4 py-2 rounded-lg z-[200]';
                                                            setTimeout(() => toast.remove(), 2500);
                                                        } catch (e) {
                                                            console.error('Sync error:', e);
                                                            toast.textContent = `✕ Sync failed: ${e.message?.substring(0, 30)}`;
                                                            toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-red-500 text-white font-black font-mono text-xs px-4 py-2 rounded-lg z-[200]';
                                                            setTimeout(() => toast.remove(), 3000);
                                                        }
                                                    })();
                                                }}
                                                className="flex-1 bg-black border-2 border-green-500/50 hover:border-green-500 text-green-400 font-black py-3 rounded-lg font-mono text-sm transition-all"
                                            >
                                                YES
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* PENDING APPROVALS - COLLAPSIBLE */}
                    {stats.pendingOffers > 0 && (
                                  <div id="pending-approvals" className="mb-6 bg-black border-2 border-cyan-500 rounded-lg p-4">
                                      <h2 
                                          onClick={() => setExpandedSection({...expandedSection, pendingApprovals: !expandedSection.pendingApprovals})}
                                          className="text-cyan-400 font-black font-mono text-sm mb-3 flex items-center gap-2 cursor-pointer hover:text-cyan-300 transition-colors"
                                      >
                                          <AlertCircle className="w-4 h-4" />
                                          PENDING APPROVALS ({stats.pendingOffers})
                                          <span className="ml-auto text-xs">{expandedSection.pendingApprovals ? '▼' : '▶'}</span>
                                      </h2>
                                      {expandedSection.pendingApprovals && (
                                         <div className="space-y-3">
                                                {allOffers
                                                    .filter(o => o.status === 'pending_manager_review')
                                                    .slice(0, 3)
                                                    .map(offer => (
                                                        <div key={offer.id} className="bg-black/60 border border-cyan-500/30 rounded p-3 space-y-2">
                                                            {editingOffer === offer.id ? (
                                                                <div className="space-y-2">
                                                                    <Input 
                                                                        placeholder="Venue" 
                                                                        value={editForm.venue} 
                                                                        onChange={(e) => setEditForm({...editForm, venue: e.target.value})}
                                                                        className="bg-black border-cyan-500/30 text-white text-xs"
                                                                    />
                                                                    <div className="flex gap-2">
                                                                        <Input 
                                                                            type="date" 
                                                                            value={editForm.date} 
                                                                            onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                                                                            className="bg-black border-cyan-500/30 text-white text-xs"
                                                                        />
                                                                        <Input 
                                                                            type="number" 
                                                                            placeholder="Fee" 
                                                                            value={editForm.fee} 
                                                                            onChange={(e) => setEditForm({...editForm, fee: e.target.value})}
                                                                            className="bg-black border-cyan-500/30 text-white text-xs"
                                                                        />
                                                                    </div>
                                                                    <Input 
                                                                        placeholder="City" 
                                                                        value={editForm.city} 
                                                                        onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                                                                        className="bg-black border-cyan-500/30 text-white text-xs"
                                                                    />
                                                                    <Input 
                                                                        placeholder="Promoter" 
                                                                        value={editForm.promoter} 
                                                                        onChange={(e) => setEditForm({...editForm, promoter: e.target.value})}
                                                                        className="bg-black border-cyan-500/30 text-white text-xs"
                                                                    />
                                                                    <div className="flex gap-1">
                                                                        <button 
                                                                            onClick={() => { setEditingOffer(null); setEditForm({}); }}
                                                                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1.5 rounded text-[10px] font-bold"
                                                                        >
                                                                            CANCEL
                                                                        </button>
                                                                        <button 
                                                                            onClick={handleSaveEdit}
                                                                            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black px-2 py-1.5 rounded text-[10px] font-bold"
                                                                        >
                                                                            SAVE
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                               <>
                                                                   <div className="space-y-2">
                                                                       <div className="flex items-start justify-between">
                                                                           <div className="flex-1">
                                                                               <p className="text-white font-bold text-sm">{offer.venue || 'Gig Offer'}</p>
                                                                               <p className="text-cyan-400 text-[10px] font-mono">{offer.date || 'TBD'} • {offer.currency || 'GBP'}{offer.fee || '?'}</p>
                                                                               {offer.city && <p className="text-gray-400 text-[9px] font-mono">📍 {offer.city}{offer.country ? `, ${offer.country}` : ''}</p>}
                                                                               {offer.promoter && <p className="text-gray-500 text-[9px] font-mono">👤 {offer.promoter}</p>}
                                                                               {offer.capacity && <p className="text-gray-500 text-[9px] font-mono">👥 {offer.capacity} cap</p>}
                                                                               {offer.time && <p className="text-gray-500 text-[9px] font-mono">🕐 {offer.time}</p>}
                                                                           </div>
                                                                           <div className="flex gap-1">
                                                                               <button 
                                                                                   onClick={() => handleEditOffer(offer)}
                                                                                   className="bg-cyan-600/40 hover:bg-cyan-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                               >
                                                                                   ✎
                                                                               </button>
                                                                               <button 
                                                                                   onClick={async () => {
                                                                                       await base44.functions.invoke('approveGigAndNotifyBand', {
                                                                                           offerId: offer.id,
                                                                                           artistId: offer.artist_id
                                                                                       });
                                                                                       queryClient.invalidateQueries({queryKey: ['scottAllGigOffers']});
                                                                                       queryClient.invalidateQueries({queryKey: ['scottEvents']});
                                                                                   }}
                                                                                   className="bg-green-600/40 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                               >
                                                                                   ✓
                                                                               </button>
                                                                               <button 
                                                                                   onClick={() => {
                                                                                       if(confirm('Reject this gig?')) {
                                                                                           queryClient.setQueryData(['scottAllGigOffers'], allOffers.map(o => o.id === offer.id ? {...o, status: 'rejected'} : o));
                                                                                           base44.entities.ScottGigOffer.update(offer.id, {status: 'rejected'}).then(() => queryClient.invalidateQueries({queryKey: ['scottAllGigOffers']}));
                                                                                       }
                                                                                   }}
                                                                                   className="bg-red-600/40 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                               >
                                                                                   ✕
                                                                               </button>
                                                                           </div>
                                                                       </div>
                                                                       {offer.notes && (
                                                                           <p className="text-gray-400 text-[9px] italic bg-black/40 p-2 rounded">{offer.notes}</p>
                                                                       )}
                                                                       {events.filter(e => e.date === offer.date).length > 0 && (
                                                                           <div className="bg-amber-500/20 border border-amber-500/50 rounded p-2 flex items-center gap-1">
                                                                               <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                                                                               <p className="text-amber-400 text-[9px] font-bold">⚠️ CALENDAR CLASH: {events.filter(e => e.date === offer.date)[0]?.title}</p>
                                                                           </div>
                                                                       )}
                                                                   </div>
                                                                   <CB51VoteBreakdown gigOfferId={offer.id} />
                                                               </>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {stats.pendingOffers > 3 && (
                                                    <Link to={createPageUrl('ScottGigOffers')} className="text-cyan-400 hover:text-cyan-300 text-[10px] font-mono font-bold mt-2 block">
                                                    See all ({stats.pendingOffers}) →
                                                    </Link>
                                                    )}
                                                    </div>
                                                    )}

                                                    {/* BAND MEMBER NOTIFICATIONS */}
                                    {user && user.role !== 'admin' && (
                                        <div className="mb-6">
                                            <CB51BandNotifications userEmail={user.email} />
                                        </div>
                                    )}

                    {/* ADD ARTIST - ALWAYS VISIBLE */}
                    <div className="mb-4 flex justify-center">
                        <Link to={createPageUrl('ScottAddArtist')} className="bg-cyan-600 hover:bg-cyan-700 text-black font-black px-4 py-2 rounded-lg text-xs font-mono transition-all">
                            + ADD ARTIST
                        </Link>
                    </div>

                    {/* ARTIST CIRCLES - BIG AND CENTERED */}
                     {artists.length > 0 && (
                         <div className="mb-6 mt-6">
                             <div className="flex justify-center items-center gap-8 flex-wrap">
                                 {artists.slice(0, 3).map((artist) => (
                                     <div key={artist.id} className="relative">
                                         <Link to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                                             <motion.div
                                                 whileTap={{ scale: 0.95 }}
                                                 className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center font-black text-3xl text-black cursor-pointer hover:opacity-90 transition-opacity"
                                             >
                                                 {artist.profile_pic_url ? (
                                                     <img 
                                                         src={artist.profile_pic_url} 
                                                         alt={artist.name}
                                                         className="w-full h-full object-cover rounded-full"
                                                     />
                                                 ) : (
                                                     artist.name.charAt(0).toUpperCase()
                                                 )}
                                             </motion.div>
                                         </Link>
                                         <button
                                             onClick={() => navigate(createPageUrl(`ScottAddArtist?edit=${artist.id}`))}
                                             className="absolute -top-1 -right-1 w-6 h-6 bg-black border-2 border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-400/20 transition-all"
                                         >
                                             <span className="text-cyan-400 text-xs font-black">✎</span>
                                         </button>
                                     </div>
                                 ))}
                             </div>

                             {artists.length > 3 && (
                                 <div className="text-center mt-3">
                                     <button
                                         onClick={() => setEditArtistsOpen(!editArtistsOpen)}
                                         className="text-cyan-400 text-xs font-mono font-bold"
                                     >
                                         {editArtistsOpen ? '− Hide More Artists' : '+ Show More Artists'}
                                     </button>
                                     {editArtistsOpen && (
                                         <div className="mt-3 space-y-2">
                                             {artists.slice(3).map((artist) => (
                                                 <div key={artist.id} className="flex items-center justify-between bg-black border border-cyan-500/30 rounded p-2">
                                                     <Link to={createPageUrl(`ScottArtistHome?id=${artist.id}`)} className="flex-1 text-left">
                                                         <span className="text-cyan-400 font-mono text-xs font-bold">{artist.name}</span>
                                                     </Link>
                                                     <button
                                                         onClick={() => navigate(createPageUrl(`ScottAddArtist?edit=${artist.id}`))}
                                                         className="text-cyan-400 hover:text-cyan-300 text-xs mr-2"
                                                     >
                                                         ✎
                                                     </button>
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             )}
                         </div>
                     )}



                    {/* SETTINGS & TOOLS - ALWAYS VISIBLE ON MOBILE */}
                    <div className="space-y-2">


                        {/* QUICK TOOLS - GRID LAYOUT */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:hidden">
                            {/* EMAIL */}
                            <CB51NavBio
                              icon={Mail}
                              title="EMAIL"
                              shortBio="Messages & inbox management"
                              fullBio="Track all incoming WhatsApp, SMS, and email from promoters, band, and team. Reply, forward, and organize all communications in one place. Integrated with your CB51 workflow."
                              badge={messages.filter(m => m.status === 'pending').length || undefined}
                              onClick={() => setExpandedTool(expandedTool === 'email' ? null : 'email')}
                            />
                            {expandedTool === 'email' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 border-l border-cyan-500/30 pl-3 space-y-2"
                                >
                                    <CB51EmailSettings onClose={() => setExpandedTool(null)} />
                                    <div className="space-y-2">
                                        {messages.filter(m => m.status === 'pending').slice(0, 3).map(msg => (
                                            <div key={msg.id} className="bg-black/60 border border-cyan-500/20 rounded p-2">
                                                <p className="text-white text-xs font-bold">{msg.subject || 'Message'}</p>
                                                <p className="text-gray-500 text-[9px] font-mono">{msg.from || 'Unknown'}</p>
                                            </div>
                                        ))}
                                        <Link to={createPageUrl('ScottMessageInbox')} className="text-cyan-400 hover:text-cyan-300 text-[9px] font-mono font-bold block text-center pt-1">
                                            See all →
                                        </Link>
                                    </div>
                                </motion.div>
                            )}

                            {/* CALENDAR */}
                            <CB51NavBio
                              icon={Calendar}
                              title="CALENDAR"
                              shortBio="All events & gigs at a glance"
                              fullBio="Full event calendar with gigs, rehearsals, studio time, and band meetings. Syncs with Google Calendar. Drag to reschedule. Auto-populated from approved gig offers."
                              onClick={() => setExpandedTool(expandedTool === 'calendar' ? null : 'calendar')}
                            />
                            {expandedTool === 'calendar' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 border-l border-cyan-500/30 pl-3 space-y-2"
                                >
                                    {events.slice(0, 3).map(event => (
                                        <button
                                            key={event.id}
                                            onClick={() => navigate(createPageUrl('ScottCalendarView') + (artists[0]?.id ? `?id=${artists[0].id}` : ''))}
                                            className="w-full bg-black/60 border border-cyan-500/20 rounded p-2 hover:border-cyan-500/50 hover:bg-black/40 transition-all text-left"
                                        >
                                            <p className="text-white text-xs font-bold">{event.title}</p>
                                            <p className="text-gray-500 text-[9px] font-mono">{event.date || 'TBD'}</p>
                                        </button>
                                    ))}
                                    <Link to={createPageUrl('ScottCalendarView')} className="text-cyan-400 hover:text-cyan-300 text-[9px] font-mono font-bold block text-center pt-1">
                                        See all →
                                    </Link>
                                </motion.div>
                            )}

                            {/* TASKS */}
                            <CB51NavBio
                              icon={CheckCircle}
                              title="TASKS"
                              shortBio="To-do list & action items"
                              fullBio="Organize tour logistics, studio prep, promoter follow-ups, and band coordination. Assign tasks to team, set deadlines, and track progress. Auto-populated from gigs (travel, invoicing, etc)."
                              badge={tasks.filter(t => t.status !== 'done').length || undefined}
                              onClick={() => setExpandedTool(expandedTool === 'tasks' ? null : 'tasks')}
                            />
                            {expandedTool === 'tasks' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 border-l border-cyan-500/30 pl-3 space-y-2"
                                >
                                    {tasks.filter(t => t.status !== 'done').slice(0, 3).map(task => (
                                        <button
                                            key={task.id}
                                            onClick={() => navigate(createPageUrl('ScottToDo') + (artists[0]?.id ? `?id=${artists[0].id}` : ''))}
                                            className="w-full bg-black/60 border border-cyan-500/20 rounded p-2 hover:border-cyan-500/50 hover:bg-black/40 transition-all text-left"
                                        >
                                            <p className="text-white text-xs font-bold">{task.title}</p>
                                            <p className="text-gray-500 text-[9px] font-mono">{task.responsible_name || 'Unassigned'}</p>
                                        </button>
                                    ))}
                                    <Link to={createPageUrl('ScottToDo')} className="text-cyan-400 hover:text-cyan-300 text-[9px] font-mono font-bold block text-center pt-1">
                                        See all →
                                    </Link>
                                </motion.div>
                            )}

                            {/* FINANCE */}
                            <CB51NavBio
                              icon={DollarSign}
                              title="FINANCE"
                              shortBio="Invoices, payments & money tracking"
                              fullBio="All gig fees, invoices to promoters, and payment tracking in one place. See what's owed, when it's due, and history of paid gigs. Export for tax."
                              onClick={() => setExpandedTool(expandedTool === 'finance' ? null : 'finance')}
                            />
                            {expandedTool === 'finance' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 border-l border-cyan-500/30 pl-3 space-y-2"
                                >
                                    {invoices.slice(0, 3).map(invoice => (
                                        <div key={invoice.id} className="bg-black/60 border border-cyan-500/20 rounded p-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-white text-xs font-bold">{invoice.description || 'Invoice'}</p>
                                                <p className="text-gray-500 text-[9px] font-mono">{invoice.status}</p>
                                            </div>
                                            <p className="text-cyan-400 text-xs font-bold">£{invoice.amount}</p>
                                        </div>
                                    ))}
                                    <Link to={createPageUrl('ScottFinanceAdmin')} className="text-cyan-400 hover:text-cyan-300 text-[9px] font-mono font-bold block text-center pt-1">
                                        See all →
                                    </Link>
                                </motion.div>
                            )}
                            </div>

                        {/* ARCHIVED - COLLAPSIBLE */}
                        {archivedArtists.length > 0 && (
                            <div className="lg:hidden">
                                <button 
                                    onClick={() => setArchivedOpen(!archivedOpen)}
                                    className="w-full font-mono text-xs font-bold text-gray-600 text-left py-2 flex items-center gap-2"
                                >
                                    <span>{archivedOpen ? '▼' : '▶'}</span>
                                    Archived ({archivedArtists.length})
                                </button>
                                {archivedOpen && (
                                    <div className="space-y-1">
                                        {archivedArtists.map((artist) => (
                                            <div key={artist.id} className="flex items-center justify-between bg-black border border-gray-700 rounded p-2 text-xs">
                                                <p className="font-mono text-gray-600">{artist.name}</p>
                                                <button
                                                    onClick={() => handleRestoreArtist(artist)}
                                                    className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors font-bold"
                                                >
                                                    RESTORE
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    </div>
                    );
                    }