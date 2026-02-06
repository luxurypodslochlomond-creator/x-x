import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CB51AddBandMemberSheet({ artistId, isOpen, onClose, onMemberAdded }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: '', email: '', role: 'band_member' });
  const [error, setError] = useState('');

  const addMemberMutation = useMutation({
    mutationFn: async () => {
      if (!formData.name.trim()) throw new Error('Name required');
      if (!formData.email.trim()) throw new Error('Email required');

      return await base44.entities.TeamMember.create({
        artist_id: artistId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: 'invited'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bandMembers', artistId] });
      setFormData({ name: '', email: '', role: 'band_member' });
      setError('');
      onMemberAdded?.();
      onClose();
    },
    onError: (err) => setError(err.message)
  });

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40">
      <div onClick={(e) => e.stopPropagation()} className="bg-black border-2 border-cyan-500 p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90%] rounded-lg space-y-4 z-50">
        <h2 className="text-white font-bold text-lg">Add Band Member</h2>

        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="w-full bg-cyan-900/20 border border-cyan-500 text-white px-3 py-2 rounded text-sm"
        />

        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full bg-cyan-900/20 border border-cyan-500 text-white px-3 py-2 rounded text-sm"
        />

        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full bg-cyan-900/20 border border-cyan-500 text-white px-3 py-2 rounded text-sm"
        >
          <option value="band_member">Band Member</option>
          <option value="crew">Crew</option>
          <option value="roadie">Roadie</option>
        </select>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 bg-white/20 text-white px-4 py-2 rounded text-sm font-bold">
            Cancel
          </button>
          <button
            onClick={() => addMemberMutation.mutate()}
            disabled={addMemberMutation.isPending}
            className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded text-sm font-bold disabled:opacity-50"
          >
            {addMemberMutation.isPending ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}