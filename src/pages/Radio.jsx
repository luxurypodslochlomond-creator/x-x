import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Music, Radio as RadioIcon, Heart, Play, Pause, SkipForward, SkipBack,
  Volume2, Disc3, Headphones, Waves, Zap, Globe, Search, Filter,
  Download, Share2, ListMusic, User, Users, Guitar, Piano, Sparkles
} from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKWaves, COOLASFUCKP2P, COOLASFUCKBrain } from '@/components/shared/COOLASFUCKIcon';
import { motion, AnimatePresence } from 'framer-motion';
import GenerativeMusic from '@/components/radio/GenerativeMusic';
import { useAudio } from '@/components/shared/AudioProvider';
import P51Symbol from '@/components/shared/P51Symbol';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ConsciousnessBridge from '@/components/consciousness/ConsciousnessBridge';
import HealingFrequencyFeedback from '@/components/consciousness/HealingFrequencyFeedback';
import FrequencyShareButton from '@/components/shared/FrequencyShareButton';
import WiFiDirectMesh from '@/components/shared/WiFiDirectMesh';



export default function RadioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('all');
  const [consciousMode, setConsciousMode] = useState(false);
  const [consciousnessState, setConsciousnessState] = useState(null);

  const { currentTrack, isPlaying, play, pause, next, previous, currentTime } = useAudio();
  const navigate = useNavigate();
  
  // SEO
  useEffect(() => {
      document.title = 'Radio51 | Lossless Music - Artists Earn 90%';
      const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = 'Stream lossless quality music for free. Artists keep 90% of revenue. Zero ads. FLAC, WAV, MP3-320. Fair music streaming.';
      if (!metaDesc.parentNode) document.head.appendChild(metaDesc);
      
      const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = 'Radio51 - Lossless Music, Artists Earn 90%';
      if (!ogTitle.parentNode) document.head.appendChild(ogTitle);
      
      const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      ogDesc.content = 'Free lossless music streaming. Artists keep 90%. Zero extraction. Zero ads. Just music.';
      if (!ogDesc.parentNode) document.head.appendChild(ogDesc);
  }, []);



  // WEB SHARE API - COOLASFUCK MESSAGE
  const handleShare = async (track) => {
    if (!navigator.share) {
      alert('Sharing not supported on this device. Try Android/Chrome.');
      return;
    }

    try {
      const shareText = `🎵 ${track.title} - ${track.artist}

💚 Zero-loss FLAC/WAV transmission
💰 Artists keep 90%
🌍 10% heals Earth

Listen free at UF51.LOVE`;

      await navigator.share({
        title: `${track.title} - ${track.artist}`,
        text: shareText,
        url: `https://uf51.love${createPageUrl('Radio')}?track=${track.id}`
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ['radioTracks'],
    queryFn: async () => {
      const allTracks = await base44.entities.Soundtrack.list();
      // FILTER: Only show active tracks (removes withdrawn/private tracks)
      return allTracks.filter(track => track.is_active !== false);
    },
  });

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = !searchQuery ||
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFrequency = selectedFrequency === 'all' || track.frequency_type === selectedFrequency;
    return matchesSearch && matchesFrequency;
  });

  const frequencyTypes = [
    { value: 'all', label: 'All Frequencies', icon: Waves, color: 'cyan' },
    { value: 'Healing', label: 'Healing', icon: Heart, color: 'pink', description: 'Restoration & repair' },
    { value: 'Creation', label: 'Creation', icon: Zap, color: 'yellow', description: 'Flow state & making' },
    { value: 'Focus', label: 'Focus', icon: Disc3, color: 'blue', description: 'Deep work energy' },
    { value: 'Love', label: 'Love', icon: Heart, color: 'red', description: 'Heart opening' },
    { value: 'Calm_Presence', label: 'Calm Presence', icon: Waves, color: 'teal', description: 'Gentle, considered energy' },
    { value: 'Joyful_Energy', label: 'Joyful Energy', icon: Sparkles, color: 'orange', description: 'Uplifting vibration' },
    { value: 'Revolution', label: 'Revolution', icon: Zap, color: 'red', description: 'Change & transformation' }
  ];

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] p-4 md:p-6 pt-32 lg:pt-6 twcc-scanlines relative">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

        {/* HERO - 8-BIT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 md:space-y-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <COOLASFUCKWaves size={64} animate={true} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-mono text-[#b3261e]">
            RADIO51
          </h1>

          <p className="text-sm md:text-base font-mono text-[#6b6258] max-w-2xl mx-auto px-4">
            FLAC/WAV lossless. Zero compression. Zero ads.
          </p>

          {/* MUSICIAN TOOLS - 8-BIT SIMPLIFIED */}
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap px-2">
            <motion.button
              onClick={() => setConsciousMode(!consciousMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-[#efe7d6] border-4 flex items-center justify-center transition-all ${
                consciousMode
                  ? 'border-[#b3261e] hover:border-[#b3261e]'
                  : 'border-[#1a1612] hover:border-[#b3261e]'
              }`}>
                <COOLASFUCKBrain size={32} animate={consciousMode} />
              </div>
              <span className={`text-xs font-black font-mono ${consciousMode ? 'text-[#b3261e]' : 'text-[#1a1612]'}`}>
                {consciousMode ? 'CONSCIOUS' : 'CONSCIOUS'}
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigate(createPageUrl('Tuner'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#efe7d6] border-4 border-[#1a1612] hover:border-[#b3261e] flex items-center justify-center transition-all">
                <Guitar className="w-7 h-7 md:w-8 md:h-8 text-[#1a1612]" />
              </div>
              <span className="text-xs font-black font-mono text-[#1a1612]">TUNE</span>
            </motion.button>

            <motion.button
              onClick={() => navigate(createPageUrl('TunerTogether'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#efe7d6] border-4 border-[#1e3a2b] hover:border-[#1e3a2b] flex items-center justify-center transition-all">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-[#1e3a2b]" />
              </div>
              <span className="text-xs font-black font-mono text-[#1e3a2b]">SYNC</span>
            </motion.button>

            <motion.button
              onClick={() => navigate(createPageUrl('FrequencyChamber'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#efe7d6] border-4 border-[#b3261e] hover:border-[#b3261e] flex items-center justify-center transition-all">
                <COOLASFUCKWaves size={32} animate={false} />
              </div>
              <span className="text-xs font-black font-mono text-[#b3261e]">HEAL</span>
            </motion.button>
          </div>

          {/* WHY RADIO51 - 8-BIT */}
          <Card className="bg-[#efe7d6] border-2 border-[#1a1612]/15">
            <CardContent className="p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-black font-mono text-[#b3261e] mb-4 md:mb-6 text-center">
                WHY RADIO51
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center space-y-2 md:space-y-3 bg-[#f4efe4] border-2 border-[#1a1612]/15 p-4">
                  <Disc3 className="w-8 h-8 md:w-10 md:h-10 text-[#1a1612] mx-auto" />
                  <h3 className="text-base md:text-lg font-black font-mono text-[#1a1612]">LOSSLESS</h3>
                  <p className="text-[#6b6258] font-mono text-xs md:text-sm">FLAC/WAV only</p>
                </div>

                <div className="text-center space-y-2 md:space-y-3 bg-[#f4efe4] border-2 border-[#b3261e]/30 p-4">
                  <COOLASFUCKHeart size={32} animate={false} />
                  <h3 className="text-base md:text-lg font-black font-mono text-[#b3261e]">90% ARTIST</h3>
                  <p className="text-[#6b6258] font-mono text-xs md:text-sm">Real payment</p>
                </div>

                <div className="text-center space-y-2 md:space-y-3 bg-[#f4efe4] border-2 border-[#1e3a2b]/30 p-4">
                  <Globe className="w-8 h-8 md:w-10 md:h-10 text-[#1e3a2b] mx-auto" />
                  <h3 className="text-base md:text-lg font-black font-mono text-[#1e3a2b]">10% EARTH</h3>
                  <p className="text-[#6b6258] font-mono text-xs md:text-sm">Heals planet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* AI MUSIC GENERATOR */}
        <GenerativeMusic />

        {/* SEARCH & FILTER - 8-BIT */}
        <Card className="bg-[#efe7d6] border-2 border-[#1a1612]/15">
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b6258]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 bg-[#f4efe4] border-2 border-[#1a1612]/20 text-[#1a1612] h-12 font-mono"
                />
              </div>
              <Button variant="outline" className="gap-2 border-2 border-[#1a1612]/20 font-mono font-black text-[#1a1612]">
                <Filter className="w-5 h-5" />
                FILTER
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {frequencyTypes.map(freq => {
                const Icon = freq.icon;
                const isActive = selectedFrequency === freq.value;
                return (
                  <button
                    key={freq.value}
                    onClick={() => setSelectedFrequency(freq.value)}
                    className={`flex items-center gap-2 px-3 py-2 border-2 font-mono font-black text-xs transition-all ${
                      isActive ? 'bg-[#1a1612] border-[#1a1612] text-[#f4efe4]' : 'bg-[#f4efe4] border-[#1a1612]/15 text-[#1a1612] hover:border-[#1a1612]/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {freq.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* TRANSMISSION CATALOG - 8-BIT */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-black font-mono text-white flex items-center gap-3">
              <ListMusic className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
              CATALOG
              <span className="text-gray-500 text-sm md:text-base font-mono">({filteredTracks.length})</span>
            </h3>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Disc3 className="w-12 h-12 text-cyan-400 mx-auto animate-spin" />
            </div>
          ) : filteredTracks.length === 0 ? (
            <Card className="bg-[#efe7d6] border-2 border-[#1a1612]/15 hover:border-[#b3261e] transition-all cursor-pointer" onClick={() => navigate(createPageUrl('ForMusicians'))}>
              <CardContent className="p-8 md:p-12 text-center space-y-4">
                <COOLASFUCKMusicNote size={64} animate={true} />
                <p className="text-[#b3261e] text-xl font-black font-mono">GOT MUSIC?</p>
                <p className="text-[#6b6258] text-sm font-mono">Tap to share your frequencies</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-[#efe7d6] border-2 border-[#1a1612]/15 hover:border-[#b3261e]/40 transition-all">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-3 md:gap-4">
                        {/* Album Art or Icon */}
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f4efe4] border-2 border-[#1a1612]/15 flex items-center justify-center flex-shrink-0">
                          {track.cover_art_url ? (
                            <img src={track.cover_art_url} alt={track.title} className="w-full h-full object-cover" />
                          ) : (
                            <Music className="w-8 h-8 md:w-10 md:h-10 text-[#6b6258]" />
                          )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base md:text-lg font-black font-mono text-[#1a1612] truncate">{track.title}</h4>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-[#6b6258] mb-2 font-mono">
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                            <p className="truncate">{track.artist}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-[#f4efe4] border-2 border-[#1a1612] text-xs font-mono font-black text-[#1a1612]">
                              {track.frequency_type}
                            </span>
                            {track.bpm && (
                              <span className="px-2 py-1 bg-[#f4efe4] border-2 border-[#b3261e] text-xs font-mono font-black text-[#b3261e]">
                                {track.bpm}BPM
                              </span>
                            )}
                          </div>
                        </div>

                        {/* PLAY + SHARE BUTTONS - 8-BIT */}
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => currentTrack?.id === track.id ? (isPlaying ? pause() : play(track)) : play(track)}
                            className="w-12 h-12 bg-[#b3261e] hover:bg-[#1a1612] border-2 border-[#b3261e]"
                          >
                            {currentTrack?.id === track.id && isPlaying ? (
                              <Pause className="w-6 h-6 text-[#f4efe4]" />
                            ) : (
                              <Play className="w-6 h-6 text-[#f4efe4] ml-1" />
                            )}
                          </Button>

                          <FrequencyShareButton 
                            frequency={track}
                            onShared={() => {
                              // Also do web share
                              handleShare(track);
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>



        {/* P2P MESH - BLUETOOTH + WiFi DIRECT */}
        <div className="space-y-4">
          <Card className="bg-[#efe7d6] border-2 border-[#1e3a2b]/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <COOLASFUCKP2P size={40} animate={true} />
                <div>
                  <h3 className="text-xl font-black font-mono text-[#1e3a2b] mb-2">P2P MESH</h3>
                  <p className="text-[#6b6258] font-mono text-sm mb-3">
                    Bluetooth + WiFi Direct. AI51 picks best route. Zero ego. Wired. ♾️❤️
                  </p>
                  <p className="text-[#1e3a2b] text-xs font-mono">
                    🍄 Mesh network. Unstoppable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <WiFiDirectMesh />
        </div>

        {/* NO ADS - 8-BIT */}
        <Card className="bg-[#efe7d6] border-2 border-[#b3261e]/30">
          <CardContent className="p-4 md:p-8">
            <div className="grid grid-cols-3 gap-2 md:gap-6 text-center">
              <div className="space-y-1 bg-[#f4efe4] border-2 border-[#b3261e]/20 p-2 md:p-4">
                <span className="text-xl md:text-3xl text-[#b3261e] line-through font-black font-mono">ADS</span>
                <p className="text-[10px] md:text-xs font-mono text-[#6b6258]">No adverts</p>
              </div>
              <div className="space-y-1 bg-[#f4efe4] border-2 border-[#b3261e]/20 p-2 md:p-4">
                <span className="text-xl md:text-3xl text-[#b3261e] line-through font-black font-mono">ALGO</span>
                <p className="text-[10px] md:text-xs font-mono text-[#6b6258]">No algorithms</p>
              </div>
              <div className="space-y-1 bg-[#f4efe4] border-2 border-[#b3261e]/20 p-2 md:p-4">
                <span className="text-xl md:text-3xl text-[#b3261e] line-through font-black font-mono">BS</span>
                <p className="text-[10px] md:text-xs font-mono text-[#6b6258]">No bullshit</p>
              </div>
            </div>
            <p className="text-center text-[#6b6258] mt-4 text-xs md:text-sm font-mono">JUST HEALING</p>
          </CardContent>
        </Card>

      </div>

      {/* CONSCIOUSNESS BRIDGE - MUSIC RESPONDS TO YOUR STATE */}
      {consciousMode && (
        <div className="fixed top-20 right-4 z-50 w-80">
          <ConsciousnessBridge 
            activated={consciousMode}
            onStateChange={(state) => {
              setConsciousnessState(state);
              
              // Auto-select frequency based on consciousness state
              if (state.stress > 70) {
                setSelectedFrequency('Healing');
              } else if (state.emotion === 'flow') {
                setSelectedFrequency('Creation');
              } else if (state.attention > 80) {
                setSelectedFrequency('Focus');
              } else if (state.stress < 30) {
                setSelectedFrequency('Calm_Presence');
              }
            }}
            enableHealing={true}
            enableP2PSync={false}
          />
          <HealingFrequencyFeedback 
            consciousnessState={consciousnessState}
            enabled={consciousMode}
          />
        </div>
      )}

    </div>
  );
}