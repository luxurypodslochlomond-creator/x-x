import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Users, AlertCircle } from 'lucide-react';

export default function ArtistProfileSheet({ artistId, onClose }) {
  const { data: artist, isLoading: artistLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => base44.entities.Artist.get(artistId),
    enabled: !!artistId,
  });

  const { data: bandMembers = [] } = useQuery({
    queryKey: ['bandMembers', artistId],
    queryFn: () => base44.entities.TeamMember.filter({ artist_id: artistId }),
    enabled: !!artistId,
  });

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigs', artistId],
    queryFn: async () => {
      const gigs = await base44.entities.GigOffer.filter({ artist_id: artistId });
      return gigs.filter(g => g.status !== 'rejected' && g.status !== 'confirmed');
    },
    enabled: !!artistId,
  });

  if (artistLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-500"
        />
      </div>
    );
  }

  if (!artist) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-auto z-50 bg-black border-t-2 lg:border-2 border-cyan-500/40 lg:rounded-xl p-6 w-full lg:w-96 max-h-[90vh] overflow-y-auto"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-cyan-400" />
        </button>

        {/* HEADER */}
        <div className="flex gap-4 mb-6 pr-10">
          <div className="flex-shrink-0">
            {artist.profile_pic_url ? (
              <img 
                src={artist.profile_pic_url} 
                alt={artist.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-cyan-500 text-black font-black text-2xl flex items-center justify-center border-2 border-cyan-500 flex-shrink-0">
                {artist.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-white break-words">{artist.name}</h1>
            {artist.bio && <p className="text-cyan-300 text-xs mt-1 line-clamp-2">{artist.bio}</p>}
            
            <div className="flex flex-col gap-1.5 text-xs mt-2">
              {artist.email && (
                <div className="flex items-center gap-2 text-gray-300 min-w-0">
                  <Mail className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <a href={`mailto:${artist.email}`} className="hover:text-cyan-400 truncate">{artist.email}</a>
                </div>
              )}
              {artist.phone && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <a href={`tel:${artist.phone}`} className="hover:text-cyan-400">{artist.phone}</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PENDING GIGS */}
        {pendingGigs.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-amber-400">Pending ({pendingGigs.length})</h2>
            </div>
            <div className="space-y-2">
              {pendingGigs.map(gig => (
                <div key={gig.id} className="bg-black border border-amber-500/30 rounded p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white text-xs break-words">{gig.venue}</p>
                      <p className="text-xs text-gray-400">{gig.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded flex-shrink-0 ${
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
            <Users className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-cyan-400">Band ({bandMembers.length})</h2>
          </div>
          {bandMembers.length > 0 ? (
            <div className="space-y-2">
              {bandMembers.map(member => (
                <div key={member.id} className="bg-black border border-cyan-500/20 rounded p-3 hover:border-cyan-500/50 transition-all">
                  <div className="flex justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-xs break-words">{member.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{member.role || 'member'}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-xs text-cyan-400 hover:text-cyan-300 block truncate"
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
            <div className="bg-black border border-cyan-500/20 rounded p-3 text-center text-gray-400 text-xs">
              No members yet
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}