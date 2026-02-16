import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, Mail, Trash2, Archive, UserCheck, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CB51 TEAM MANAGEMENT
 * Manager can add/archive/delete team members
 * Resend invites, see who has access
 */

export default function CB51TeamManagement() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('id');
  const queryClient = useQueryClient();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('band_member');

  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['teamMembers', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      return await base44.entities.TeamMember.filter({
        artist_id: artistId
      });
    },
    enabled: !!artistId
  });

  const { data: artist } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: async () => {
      if (!artistId) return null;
      const artists = await base44.entities.Artist.filter({ id: artistId });
      return artists[0] || null;
    },
    enabled: !!artistId
  });

  const addMemberMutation = useMutation({
    mutationFn: async () => {
      const member = await base44.entities.TeamMember.create({
        artist_id: artistId,
        name: newMemberName.trim(),
        email: newMemberEmail.trim(),
        role: newMemberRole,
        status: 'invited'
      });

      // Send invite email
      if (artist) {
        try {
          await base44.functions.invoke('sendBandMemberInvite', {
            memberId: member.id,
            email: newMemberEmail.trim(),
            memberName: newMemberName.trim(),
            artistName: artist.name,
            artistId: artistId
          });
        } catch (e) {
          console.log('Email send failed (non-critical):', e);
        }
      }

      return member;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers', artistId] });
      setNewMemberName('');
      setNewMemberEmail('');
      setNewMemberRole('band_member');
      setShowAddForm(false);
    }
  });

  const archiveMemberMutation = useMutation({
    mutationFn: async (memberId) => {
      await base44.entities.TeamMember.update(memberId, {
        status: 'inactive'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers', artistId] });
    }
  });

  const deleteMemberMutation = useMutation({
    mutationFn: async (memberId) => {
      await base44.entities.TeamMember.delete(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers', artistId] });
    }
  });

  const resendInviteMutation = useMutation({
    mutationFn: async (member) => {
      if (!artist) return;
      await base44.functions.invoke('sendBandMemberInvite', {
        memberId: member.id,
        email: member.email,
        memberName: member.name,
        artistName: artist.name,
        artistId: artistId
      });
    }
  });

  const roleLabels = {
    band_member: 'Band Member',
    manager_assistant: 'Manager Assistant',
    booking_agent: 'Booking Agent',
    crew: 'Crew',
    roadie: 'Roadie',
    other: 'Other'
  };

  const activeMembers = teamMembers.filter(m => m.status === 'active' || m.status === 'invited');
  const archivedMembers = teamMembers.filter(m => m.status === 'inactive');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-cyan-400">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black">Team Management</h1>
        </div>
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <div>
              <h1 className="text-3xl font-black">Team</h1>
              {artist && <p className="text-gray-400 text-sm font-mono mt-1">{artist.name}</p>}
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        {/* ADD FORM */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mb-6 overflow-hidden"
            >
              <h3 className="text-cyan-400 font-bold text-sm mb-4">Add Team Member</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full bg-black border border-cyan-500/30 text-white px-3 py-2 rounded text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full bg-black border border-cyan-500/30 text-white px-3 py-2 rounded text-sm"
                />
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full bg-black border border-cyan-500/30 text-white px-3 py-2 rounded text-sm"
                >
                  <option value="band_member">Band Member (votes on gigs)</option>
                  <option value="manager_assistant">Manager Assistant (helps with admin)</option>
                  <option value="booking_agent">Booking Agent (read-only access)</option>
                  <option value="crew">Crew</option>
                  <option value="roadie">Roadie</option>
                  <option value="other">Other</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewMemberName('');
                      setNewMemberEmail('');
                      setNewMemberRole('band_member');
                    }}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => addMemberMutation.mutate()}
                    disabled={!newMemberName.trim() || !newMemberEmail.trim() || addMemberMutation.isPending}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                  >
                    {addMemberMutation.isPending ? 'Adding...' : 'Add & Send Invite'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIVE MEMBERS */}
        <div className="mb-8">
          <h2 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Active Members ({activeMembers.length})
          </h2>
          {activeMembers.length === 0 ? (
            <p className="text-gray-500 text-sm">No team members yet</p>
          ) : (
            <div className="space-y-2">
              {activeMembers.map(member => (
                <div
                  key={member.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-bold text-sm">{member.name}</p>
                      {member.status === 'invited' && (
                        <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-0.5 rounded font-mono">
                          Invited
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{member.email}</p>
                    <p className="text-cyan-400 text-xs font-mono mt-1">{roleLabels[member.role]}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {member.status === 'invited' && (
                      <button
                        onClick={() => resendInviteMutation.mutate(member)}
                        disabled={resendInviteMutation.isPending}
                        className="p-2 hover:bg-cyan-500/20 rounded transition-colors"
                        title="Resend invite"
                      >
                        <Mail className="w-4 h-4 text-cyan-400" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        if (confirm(`Archive ${member.name}? They'll lose access.`)) {
                          archiveMemberMutation.mutate(member.id);
                        }
                      }}
                      className="p-2 hover:bg-yellow-500/20 rounded transition-colors"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4 text-yellow-400" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${member.name}? This cannot be undone.`)) {
                          deleteMemberMutation.mutate(member.id);
                        }
                      }}
                      className="p-2 hover:bg-red-500/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ARCHIVED MEMBERS */}
        {archivedMembers.length > 0 && (
          <div>
            <h2 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Archived ({archivedMembers.length})
            </h2>
            <div className="space-y-2">
              {archivedMembers.map(member => (
                <div
                  key={member.id}
                  className="bg-gray-900/30 border border-gray-700 rounded-lg p-4 flex items-center justify-between opacity-60"
                >
                  <div className="flex-1">
                    <p className="text-gray-400 font-bold text-sm">{member.name}</p>
                    <p className="text-gray-500 text-xs">{member.email}</p>
                    <p className="text-gray-500 text-xs font-mono mt-1">{roleLabels[member.role]}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Restore ${member.name}?`)) {
                        base44.entities.TeamMember.update(member.id, { status: 'active' })
                          .then(() => queryClient.invalidateQueries({ queryKey: ['teamMembers', artistId] }));
                      }
                    }}
                    className="p-2 hover:bg-green-500/20 rounded transition-colors"
                    title="Restore"
                  >
                    <UserCheck className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}