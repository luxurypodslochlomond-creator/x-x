import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Plus, Loader, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51AddBandMemberSheet({ artistId, isOpen, onClose, onMemberAdded }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: '', email: '', role: 'band_member' });
  const [error, setError] = useState('');

  const addMemberMutation = useMutation({
    mutationFn: async () => {
      if (!formData.name.trim()) throw new Error('Name required');
      if (!formData.email.trim()) throw new Error('Email required');

      const member = await base44.entities.TeamMember.create({
        artist_id: artistId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: 'invited'
      });

      return member;
    },
    onSuccess: (member) => {
      queryClient.invalidateQueries({ queryKey: ['bandMembers', artistId] });
      setFormData({ name: '', email: '', role: 'band_member' });
      setError('');
      onMemberAdded?.(member);
      onClose();
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-x-0 bottom-0 z-50 bg-black border-t border-cyan-500/40 rounded-t-2xl pt-6 pb-8"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-cyan-500/20">
          <h2 className="text-white font-black text-lg">ADD BAND MEMBER</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* FORM */}
        <div className="px-6 pt-6 space-y-4">
          {/* NAME */}
          <div>
            <label className="text-gray-500 text-xs font-mono uppercase block mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full name"
              className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-gray-500 text-xs font-mono uppercase block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="band@email.com"
              className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-gray-500 text-xs font-mono uppercase block mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="band_member">Band Member</option>
              <option value="crew">Crew</option>
              <option value="roadie">Roadie</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={() => addMemberMutation.mutate()}
              disabled={addMemberMutation.isPending}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {addMemberMutation.isPending ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  ADDING...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  ADD
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}