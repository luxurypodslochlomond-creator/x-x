import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Music, Calendar, DollarSign, CheckSquare, 
  Radio, ArrowLeft, User 
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SCOTT ARTIST HOME
 * Main hub for each artist - 5 tiles
 */

export default function ScottArtistHome() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistId = searchParams.get('id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch {
        navigate(createPageUrl('ScottLogin'));
      }
    };
    checkAuth();
  }, []);

  const { data: artist } = useQuery({
    queryKey: ['scottArtist', artistId],
    queryFn: () => base44.entities.ScottArtist.filter({ id: artistId }),
    enabled: !!artistId,
    select: (data) => data[0],
  });

  if (!artist) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const tiles = [
    {
      title: 'LIVE',
      icon: Radio,
      color: 'pink',
      url: createPageUrl('ScottLive') + `?artist=${artistId}`,
    },
    {
      title: 'SESSIONS',
      icon: Music,
      color: 'cyan',
      url: createPageUrl('ScottSessions') + `?artist=${artistId}`,
    },
    {
      title: 'FINANCE / ADMIN',
      icon: DollarSign,
      color: 'green',
      url: createPageUrl('ScottFinanceAdmin') + `?artist=${artistId}`,
    },
    {
      title: 'TO-DO LIST',
      icon: CheckSquare,
      color: 'amber',
      url: createPageUrl('ScottToDo') + `?artist=${artistId}`,
    },
    {
      title: 'CALENDAR',
      icon: Calendar,
      color: 'purple',
      url: createPageUrl('ScottCalendarView') + `?artist=${artistId}`,
    },
  ];

  const colorMap = {
    pink: 'border-pink-500 hover:bg-pink-500/10 text-pink-400',
    cyan: 'border-cyan-500 hover:bg-cyan-500/10 text-cyan-400',
    green: 'border-green-500 hover:bg-green-500/10 text-green-400',
    amber: 'border-amber-500 hover:bg-amber-500/10 text-amber-400',
    purple: 'border-purple-500 hover:bg-purple-500/10 text-purple-400',
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {user?.role === 'admin' && (
            <Button
              variant="ghost"
              onClick={() => navigate(createPageUrl('ScottManagerHome'))}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">{artist.name}</h1>
              <p className="text-gray-400">{artist.genre || 'Artist'}</p>
            </div>
          </div>
        </div>

        {/* 5 Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`bg-black border-2 ${colorMap[tile.color]} transition-all cursor-pointer h-full`}
                  onClick={() => navigate(tile.url)}
                >
                  <CardContent className="p-8">
                    <Icon className={`w-12 h-12 mb-4 ${colorMap[tile.color].split(' ')[2]}`} />
                    <h3 className="text-2xl font-black text-white">{tile.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}