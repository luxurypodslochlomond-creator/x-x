import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Plus, User } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SCOTT MANAGER HOME
 * Grid of artist cards - click to manage that artist
 */

export default function ScottManagerHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser.role !== 'admin') {
          navigate(createPageUrl('ScottLogin'));
        }
        setUser(currentUser);
      } catch {
        navigate(createPageUrl('ScottLogin'));
      }
    };
    checkAuth();
  }, []);

  const { data: artists = [] } = useQuery({
    queryKey: ['scottArtists'],
    queryFn: () => base44.entities.ScottArtist.list(),
  });

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">ARTISTS</h1>
            <p className="text-gray-400">Manager Dashboard</p>
          </div>
          <Button
            onClick={() => navigate(createPageUrl('ScottAddArtist'))}
            className="bg-cyan-600 hover:bg-cyan-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Artist
          </Button>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="bg-black border-2 border-cyan-500 hover:border-pink-500 transition-all cursor-pointer group"
                onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artist.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-pink-500/20 transition-all">
                      <User className="w-8 h-8 text-cyan-400 group-hover:text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-white mb-1">{artist.name}</h3>
                      <p className="text-gray-400 text-sm">{artist.genre || 'Artist'}</p>
                      {artist.next_gig_date && (
                        <p className="text-cyan-400 text-xs mt-2">
                          Next: {new Date(artist.next_gig_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Empty state */}
          {artists.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No artists yet - add your first one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}