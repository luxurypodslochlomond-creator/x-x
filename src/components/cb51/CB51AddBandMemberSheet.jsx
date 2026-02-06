import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, User } from 'lucide-react';

export default function CB51AddBandMemberSheet({ artistId, isOpen, onClose, onMemberAdded }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setSuccess(false);
    }
  }, [isOpen]);

  const addMemberMutation = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error('Name required');
      if (!email.trim()) throw new Error('Email required');
      if (!artistId) throw new Error('Artist not selected');

      const member = await base44.entities.TeamMember.create({
        artist_id: artistId,
        name: name.trim(),
        email: email.trim(),
        role: 'band_member',
        status: 'invited'
      });

      const artists = await base44.entities.Artist.filter({ id: artistId });
      
      if (artists?.length > 0) {
        await base44.functions.invoke('sendBandMemberInvite', {
          memberId: member.id,
          email: email.trim(),
          memberName: name.trim(),
          artistName: artists[0].name,
          artistId: artistId
        });
      }

      return member;
    },
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['bandMembers', artistId] });
      setTimeout(() => {
        setName('');
        setEmail('');
        setSuccess(false);
        onMemberAdded?.();
        onClose();
      }, 1200);
    }
  });

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black border-2 border-cyan-500 w-full max-w-xs rounded-xl p-6 z-50"
      >
        {success ? (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-center space-y-3 py-4"
          >
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
            <p className="text-white font-bold">{name} added ✓</p>
            <p className="text-gray-400 text-xs">Invite sent to {email}</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-white font-black text-lg font-mono">ADD MEMBER</h2>

            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full bg-white text-black pl-10 pr-4 py-3 rounded font-bold text-base placeholder-gray-600"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && email.trim() && addMemberMutation.mutate()}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-cyan-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-white text-black pl-10 pr-4 py-3 rounded font-bold text-base placeholder-gray-600"
                onKeyDown={(e) => e.key === 'Enter' && name.trim() && addMemberMutation.mutate()}
              />
            </div>

            {addMemberMutation.isError && (
              <p className="text-red-300 text-xs bg-red-900/40 p-2 rounded">{addMemberMutation.error?.message}</p>
            )}

            <div className="flex gap-2 pt-2">
              <button onClick={onClose} className="flex-1 bg-white/10 text-white px-4 py-2 rounded font-bold text-sm hover:bg-white/20 transition">
                Cancel
              </button>
              <button
                onClick={() => addMemberMutation.mutate()}
                disabled={addMemberMutation.isPending || !name.trim() || !email.trim()}
                className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-cyan-700 disabled:opacity-50 transition"
              >
                {addMemberMutation.isPending ? '...' : 'Add'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}