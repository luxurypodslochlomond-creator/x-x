import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Music, Heart, Play, Pause, Disc3, Waves, Zap, Globe, Search, Filter, Share2, ListMusic, User, Users, Guitar, Sparkles
} from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKWaves, COOLASFUCKP2P } from '@/components/shared/COOLASFUCKIcon';
import { motion } from 'framer-motion';
import { useAudio } from '@/components/shared/AudioProvider';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import BiometricHealing from '@/components/radio/BiometricHealing';


export default function RadioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('all');


  const { currentTrack, isPlaying, play, pause, next, previous, currentTime } = useAudio();
  const navigate = useNavigate();



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

Listen free at UF51.LOVE

♾️❤️♾️`;

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
    <div className="min-h-screen bg-black text-white p-4 md:p-6 pt-32 lg:pt-6">
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

          <h1 className="text-4xl md:text-6xl font-black font-mono text-cyan-400">
            RADIO51
          </h1>

          <p className="text-sm md:text-base font-mono text-gray-400 max-w-2xl mx-auto px-4">
            FLAC/WAV lossless. Zero compression. Zero ads.
          </p>

          {/* MUSICIAN TOOLS - 8-BIT SIMPLIFIED */}
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap px-2">
            <motion.button
              onClick={() => navigate(createPageUrl('Tuner'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border-4 border-cyan-500 hover:border-cyan-400 flex items-center justify-center transition-all">
                <Guitar className="w-7 h-7 md:w-8 md:h-8 text-cyan-400" />
              </div>
              <span className="text-xs font-black font-mono text-cyan-400">TUNE</span>
            </motion.button>

            <motion.button
              onClick={() => navigate(createPageUrl('TunerTogether'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border-4 border-green-500 hover:border-green-400 flex items-center justify-center transition-all"
                   style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}>
                <Users className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
              </div>
              <span className="text-xs font-black font-mono text-green-400">SYNC</span>
            </motion.button>

            <motion.button
              onClick={() => navigate(createPageUrl('FrequencyChamber'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border-4 border-cyan-500 hover:border-cyan-400 flex items-center justify-center transition-all">
                <COOLASFUCKWaves size={32} animate={false} />
              </div>
              <span className="text-xs font-black font-mono text-cyan-400">HEAL</span>
            </motion.button>
          </div>

          {/* WHY RADIO51 - 8-BIT */}
          <Card className="bg-black border-4 border-cyan-500">
            <CardContent className="p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-black font-mono text-cyan-400 mb-4 md:mb-6 text-center">
                WHY RADIO51
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center space-y-2 md:space-y-3 bg-black border-2 border-cyan-500/30 p-4">
                  <Disc3 className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mx-auto" />
                  <h3 className="text-base md:text-lg font-black font-mono text-cyan-400">LOSSLESS</h3>
                  <p className="text-gray-300 font-mono text-xs md:text-sm">FLAC/WAV only</p>
                </div>

                <div className="text-center space-y-2 md:space-y-3 bg-black border-2 border-pink-500/30 p-4">
                  <COOLASFUCKHeart size={32} animate={false} />
                  <h3 className="text-base md:text-lg font-black font-mono text-pink-400">90% ARTIST</h3>
                  <p className="text-gray-300 font-mono text-xs md:text-sm">Real payment</p>
                </div>

                <div className="text-center space-y-2 md:space-y-3 bg-black border-2 border-green-500/30 p-4">
                  <Globe className="w-8 h-8 md:w-10 md:h-10 text-green-400 mx-auto" />
                  <h3 className="text-base md:text-lg font-black font-mono text-green-400">10% EARTH</h3>
                  <p className="text-gray-300 font-mono text-xs md:text-sm">Heals planet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* SEARCH & FILTER - 8-BIT */}
        <Card className="bg-black border-4 border-gray-700">
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 bg-black border-2 border-gray-600 text-white h-12 font-mono"
                />
              </div>
              <Button variant="outline" className="gap-2 border-2 border-gray-600 font-mono font-black">
                <Filter className="w-5 h-5" />
                FILTER
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {frequencyTypes.map(freq => {
                const Icon = freq.icon;
                const isActive = selectedFrequency === freq.value;
                const colorMap = {
                  cyan: { active: 'bg-cyan-600 border-cyan-400 text-white', inactive: 'border-cyan-500/50 text-cyan-400 hover:border-cyan-400' },
                  pink: { active: 'bg-pink-600 border-pink-400 text-white', inactive: 'border-pink-500/50 text-pink-400 hover:border-pink-400' },
                  yellow: { active: 'bg-yellow-600 border-yellow-400 text-black', inactive: 'border-yellow-500/50 text-yellow-400 hover:border-yellow-400' },
                  blue: { active: 'bg-blue-600 border-blue-400 text-white', inactive: 'border-blue-500/50 text-blue-400 hover:border-blue-400' },
                  red: { active: 'bg-red-600 border-red-400 text-white', inactive: 'border-red-500/50 text-red-400 hover:border-red-400' },
                  teal: { active: 'bg-teal-600 border-teal-400 text-white', inactive: 'border-teal-500/50 text-teal-400 hover:border-teal-400' },
                  orange: { active: 'bg-orange-600 border-orange-400 text-white', inactive: 'border-orange-500/50 text-orange-400 hover:border-orange-400' },
                };
                const colors = colorMap[freq.color] || colorMap.cyan;
                
                return (
                  <button
                    key={freq.value}
                    onClick={() => setSelectedFrequency(freq.value)}
                    className={`flex items-center gap-2 px-3 py-2 border-2 font-mono font-black text-xs transition-all ${
                      isActive ? colors.active : `bg-black ${colors.inactive}`
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
            <Card className="bg-black border-4 border-cyan-500/50 hover:border-cyan-500 transition-all cursor-pointer" onClick={() => navigate(createPageUrl('ForMusicians'))}>
              <CardContent className="p-8 md:p-12 text-center space-y-4">
                <COOLASFUCKMusicNote size={64} animate={true} />
                <p className="text-cyan-400 text-xl font-black font-mono">GOT MUSIC?</p>
                <p className="text-gray-400 text-sm font-mono">Tap to share your frequencies</p>
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
                  <Card className="bg-black border-4 border-gray-700 hover:border-cyan-500 transition-all">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-3 md:gap-4">
                        {/* Album Art or Icon */}
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-black border-2 border-purple-500 flex items-center justify-center flex-shrink-0">
                          {track.cover_art_url ? (
                            <img src={track.cover_art_url} alt={track.title} className="w-full h-full object-cover" />
                          ) : (
                            <Music className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
                          )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base md:text-lg font-black font-mono text-white truncate">{track.title}</h4>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-2 font-mono">
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                            <p className="truncate">{track.artist}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-black border-2 border-cyan-500 text-xs font-mono font-black text-cyan-400">
                              {track.frequency_type}
                            </span>
                            {track.bpm && (
                              <span className="px-2 py-1 bg-black border-2 border-pink-500 text-xs font-mono font-black text-pink-400">
                                {track.bpm}BPM
                              </span>
                            )}
                          </div>
                        </div>

                        {/* PLAY + SHARE BUTTONS - 8-BIT */}
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => currentTrack?.id === track.id ? (isPlaying ? pause() : play(track)) : play(track)}
                            className="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-400"
                          >
                            {currentTrack?.id === track.id && isPlaying ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white ml-1" />
                            )}
                          </Button>

                          <motion.button
                            onClick={() => handleShare(track)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-green-600 hover:bg-green-700 border-2 border-green-400 flex items-center justify-center"
                            title="Share"
                          >
                            <Share2 className="w-5 h-5 text-white" />
                          </motion.button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* BIOMETRIC HEALING */}
        <BiometricHealing />

        {/* P2P MESH - 8-BIT */}
        <Card className="bg-black border-4 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <COOLASFUCKP2P size={40} animate={true} />
              <div>
                <h3 className="text-xl font-black font-mono text-green-400 mb-2">P2P SHARE</h3>
                <p className="text-gray-300 font-mono text-sm mb-3">
                  Share button → WhatsApp/Bluetooth. Artist gets paid when they connect.
                </p>
                <p className="text-green-400 text-xs font-mono">
                  🍄 Mesh network. Unstoppable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NO ADS - 8-BIT */}
        <Card className="bg-black border-4 border-red-500">
          <CardContent className="p-4 md:p-8">
            <div className="grid grid-cols-3 gap-2 md:gap-6 text-center">
              <div className="space-y-1 bg-black border-2 border-red-500/30 p-2 md:p-4">
                <span className="text-xl md:text-3xl text-red-400 line-through font-black font-mono">ADS</span>
                <p className="text-[10px] md:text-xs font-mono text-gray-400">No adverts</p>
              </div>
              <div className="space-y-1 bg-black border-2 border-red-500/30 p-2 md:p-4">
                <span className="text-xl md:text-3xl text-red-400 line-through font-black font-mono">ALGO</span>
                <p className="text-[10px] md:text-xs font-mono text-gray-400">No algorithms</p>
              </div>
              <div className="space-y-1 bg-black border-2 border-red-500/30 p-2 md:p-4">
                <span className="text-xl md:text-3xl text-red-400 line-through font-black font-mono">BS</span>
                <p className="text-[10px] md:text-xs font-mono text-gray-400">No bullshit</p>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-4 text-xs md:text-sm font-mono">JUST HEALING</p>
          </CardContent>
        </Card>

      </div>



    </div>
  );
}