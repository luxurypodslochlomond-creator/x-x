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

      const member = await base44.entities.TeamMember.create({
        artist_id: artistId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: 'invited'
      });

      // Get artist name
      const artist = await base44.entities.Artist.filter({ id: artistId });

      // Send invite email
      await base44.functions.invoke('sendBandMemberInvite', {
        memberId: member.id,
        email: formData.email.trim(),
        memberName: formData.name.trim(),
        artistName: artist?.[0]?.name || 'Your Band',
        artistId: artistId
      });

      return member;
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
    <div onClick={onClose} className="fixed inset-0 z-40 bg-black/60 flex items-end md:items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="bg-black border-2 border-cyan-500 w-full md:w-96 md:rounded-lg rounded-t-xl md:max-w-[90%] p-6 space-y-4 z-50 max-h-[90vh] overflow-y-auto">
        <h2 className="text-white font-bold text-lg">Add Band Member</h2>

        <div>
          <label className="text-gray-400 text-xs block mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full name"
            className="w-full bg-cyan-900/30 border border-cyan-500 text-white px-4 py-3 rounded text-base"
          />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="band@email.com"
            className="w-full bg-cyan-900/30 border border-cyan-500 text-white px-4 py-3 rounded text-base"
          />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-cyan-900/30 border border-cyan-500 text-white px-4 py-3 rounded text-base"
          >
            <option value="band_member">Band Member</option>
            <option value="crew">Crew</option>
            <option value="roadie">Roadie</option>
          </select>
        </div>

        {error && <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded">{error}</p>}

        <div className="flex gap-2 pt-4">
          <button onClick={onClose} className="flex-1 bg-white/20 text-white px-4 py-3 rounded font-bold text-sm">
            Cancel
          </button>
          <button
            onClick={() => addMemberMutation.mutate()}
            disabled={addMemberMutation.isPending}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded font-bold text-sm disabled:opacity-50"
          >
            {addMemberMutation.isPending ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}