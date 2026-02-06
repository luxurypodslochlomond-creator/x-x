import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CB51AddBandMemberSheet({ artistId, isOpen, onClose, onMemberAdded }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('band_member');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setRole('band_member');
      setError('');
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
        role: role,
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
      queryClient.invalidateQueries({ queryKey: ['bandMembers', artistId] });
      setName('');
      setEmail('');
      setRole('band_member');
      setError('');
      onMemberAdded?.();
      onClose();
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-cyan-500 w-full max-w-sm p-6 rounded-lg space-y-4 z-50">
        <h2 className="text-white font-bold text-lg">Add Band Member</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full bg-white text-black px-4 py-3 rounded text-base font-bold placeholder-gray-600"
          autoFocus
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="band@email.com"
          className="w-full bg-white text-black px-4 py-3 rounded text-base font-bold placeholder-gray-600"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-white text-black px-4 py-3 rounded text-base font-bold"
        >
          <option value="band_member">Band Member</option>
          <option value="crew">Crew</option>
          <option value="roadie">Roadie</option>
        </select>

        {error && <p className="text-red-300 text-sm bg-red-900/40 p-3 rounded border border-red-500/50">{error}</p>}

        <div className="flex gap-2 pt-4">
          <button onClick={onClose} className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded font-bold text-sm transition">
            Cancel
          </button>
          <button
            onClick={() => addMemberMutation.mutate()}
            disabled={addMemberMutation.isPending || !name.trim() || !email.trim()}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/50 text-white px-4 py-3 rounded font-bold text-sm transition"
          >
            {addMemberMutation.isPending ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  );
}