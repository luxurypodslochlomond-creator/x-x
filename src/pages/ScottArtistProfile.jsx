import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, Users, AlertCircle, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScottArtistProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        navigate(createPageUrl('CB51Login'));
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: artist, isLoading: artistLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => base44.entities.Artist.get(artistId),
    enabled: !!artistId && !!user,
  });

  const { data: bandMembers = [] } = useQuery({
    queryKey: ['bandMembers', artistId],
    queryFn: () => base44.entities.TeamMember.filter({ artist_id: artistId }),
    enabled: !!artistId && !!user,
  });

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer.filter({ artist_id: artistId });
      return gigs.filter(g => g.status !== 'rejected' && g.status !== 'confirmed');
    },
    enabled: !!artistId && !!user,
  });

  if (!user || artistLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500"
        />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-6">
        <button
          onClick={() => navigate(createPageUrl('CB51'))}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="text-center text-red-400">Artist not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-6">
      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() => navigate(createPageUrl('CB51'))}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-black border border-cyan-500/30 rounded-lg p-6">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              {artist.profile_pic_url ? (
                <img 
                  src={artist.profile_pic_url} 
                  alt={artist.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-cyan-500 text-black font-black text-4xl flex items-center justify-center border-2 border-cyan-500">
                  {artist.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-black text-white mb-2">{artist.name}</h1>
              {artist.bio && <p className="text-cyan-300 text-sm mb-4">{artist.bio}</p>}
              
              <div className="flex flex-col gap-2 text-sm">
                {artist.email && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <a href={`mailto:${artist.email}`} className="hover:text-cyan-400">{artist.email}</a>
                  </div>
                )}
                {artist.phone && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <a href={`tel:${artist.phone}`} className="hover:text-cyan-400">{artist.phone}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PENDING GIGS */}
      {pendingGigs.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-amber-400">Pending Decisions ({pendingGigs.length})</h2>
          </div>
          <div className="space-y-2">
            {pendingGigs.map(gig => (
              <div key={gig.id} className="bg-black border border-amber-500/30 rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-white">{gig.venue}</p>
                    <p className="text-sm text-gray-400">{gig.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    gig.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {gig.status}
                  </span>
                </div>
                {gig.notes && <p className="text-xs text-gray-400">{gig.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BAND MEMBERS */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-cyan-400">Band Members ({bandMembers.length})</h2>
        </div>
        {bandMembers.length > 0 ? (
          <div className="space-y-2">
            {bandMembers.map(member => (
              <div key={member.id} className="bg-black border border-cyan-500/20 rounded p-4 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-white">{member.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{member.role || 'band member'}</p>
                  </div>
                  <div className="text-right">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        {member.email}
                      </a>
                    )}
                    <div className={`text-xs mt-1 ${
                      member.status === 'active' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {member.status || 'invited'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-black border border-cyan-500/20 rounded p-4 text-center text-gray-400 text-sm">
            No band members yet
          </div>
        )}
      </div>
    </div>
  );
}