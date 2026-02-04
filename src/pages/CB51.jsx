import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, AlertCircle, Calendar, Mail, CheckCircle, DollarSign, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import PushNotificationManager from '@/components/scott/PushNotificationManager';
import CB51NotificationInbox from '@/components/scott/CB51NotificationInbox';
import CB51BandNotifications from '@/components/scott/CB51BandNotifications';
import CB51BandVoteAlert from '@/components/scott/CB51BandVoteAlert';
import CB51VoteBreakdown from '@/components/scott/CB51VoteBreakdown';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import CB51NavBio from '@/components/scott/CB51NavBio';
import CB51EmailSettings from '@/components/scott/CB51EmailSettings';

export default function CB51() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanningStep, setScanningStep] = useState(0);
  const [scannedOffer, setScannedOffer] = useState(null);
  const [editingScanned, setEditingScanned] = useState(false);
  const [scannedEditForm, setScannedEditForm] = useState({});
  const [expandedSection, setExpandedSection] = useState({});
  const [expandedTool, setExpandedTool] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = 'CB51 • Artist Management';
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = '#06b6d4';

    base44.auth.me().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }).catch(() => {
      navigate(createPageUrl('CB51Login'));
    });
  }, [navigate]);

  const { data: allArtists = [] } = useQuery({
    queryKey: ['scottArtists'],
    queryFn: () => base44.entities.ScottArtist.filter({}),
    enabled: !!user,
    staleTime: 30000
  });

  const { data: allOffers = [] } = useQuery({
    queryKey: ['scottAllGigOffers'],
    queryFn: () => base44.entities.ScottGigOffer.filter({}),
    enabled: !!user && allArtists.length > 0,
    staleTime: 60000
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['scottMessages'],
    queryFn: () => base44.entities.ScottMessage.filter({}),
    enabled: !!user && allArtists.length > 0,
    staleTime: 120000
  });

  const stats = useMemo(() => ({
    pendingOffers: allOffers.filter(o => o.status === 'pending_manager_review').length,
    awaitingBand: allOffers.filter(o => o.status === 'sent_to_band').length,
  }), [allOffers]);

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
              <Textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste WhatsApp, email, or contract text..."
                className="bg-black/50 border-cyan-500/30 text-white text-sm min-h-[180px] mb-3 focus:border-cyan-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setPasteModalOpen(false); setPastedText(''); }}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-400 font-bold py-2.5 rounded-lg text-sm border border-gray-700"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {stats.awaitingBand > 0 && (
        <div className="mb-6 bg-black border-2 border-green-500/50 rounded-lg p-4">
          <p className="text-green-400 font-black font-mono text-sm">AWAITING BAND VOTES: {stats.awaitingBand}</p>
        </div>
      )}

      {user && (
        <CB51BandVoteAlert userEmail={user.email} />
      )}

      {user && user.role !== 'admin' && (
        <div className="mb-6">
          <CB51BandNotifications userEmail={user.email} />
        </div>
      )}

      <div className="text-center text-gray-400 py-8">
        <p className="font-mono text-sm">CB51 • AI Co-Manager for Artists ♾️</p>
      </div>
    </div>
  );
}