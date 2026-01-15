import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Mail, Trash2, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * TEAM ACCESS MANAGEMENT
 * Add assistants/managers with selective artist permissions
 * Like Google Drive sharing
 */

export default function ScottTeamAccess() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [selectedArtists, setSelectedArtists] = useState([]);

    const { data: team = [] } = useQuery({
        queryKey: ['scottTeam'],
        queryFn: () => base44.entities.ScottTeamMember.filter({})
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const addMemberMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottTeamMember.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottTeam'] });
            setEmail('');
            setName('');
            setSelectedArtists([]);
        }
    });

    const removeMemberMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottTeamMember.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottTeam'] });
        }
    });

    const handleAddMember = () => {
        if (!email || !name || selectedArtists.length === 0) {
            alert('⚠️ Fill all fields and select at least one artist');
            return;
        }

        addMemberMutation.mutate({
            email,
            name,
            artist_access: selectedArtists,
            role: 'assistant'
        });
    };

    const toggleArtist = (artistId) => {
        setSelectedArtists(prev => 
            prev.includes(artistId) 
                ? prev.filter(id => id !== artistId)
                : [...prev, artistId]
        );
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6">
                <h1 className="text-3xl font-black text-cyan-400 font-mono mb-2">TEAM ACCESS</h1>
                <p className="text-gray-600 text-sm font-mono">Add assistants & managers</p>
            </div>

            {/* ADD MEMBER FORM */}
            <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 mb-6">
                <h2 className="text-cyan-400 font-black font-mono text-lg mb-4">+ ADD TEAM MEMBER</h2>
                
                <div className="space-y-3 mb-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-black border-2 border-gray-900 text-white font-mono"
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black border-2 border-gray-900 text-white font-mono"
                    />
                </div>

                {/* SELECT ARTISTS */}
                <div className="mb-4">
                    <p className="text-gray-600 text-xs font-mono mb-2">GRANT ACCESS TO:</p>
                    <div className="space-y-2">
                        {artists.map(artist => (
                            <button
                                key={artist.id}
                                onClick={() => toggleArtist(artist.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded transition-all ${
                                    selectedArtists.includes(artist.id)
                                        ? 'bg-cyan-500/20 border-2 border-cyan-500'
                                        : 'bg-black border-2 border-gray-900'
                                }`}
                            >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                    selectedArtists.includes(artist.id)
                                        ? 'bg-cyan-500 border-cyan-500'
                                        : 'border-gray-700'
                                }`}>
                                    {selectedArtists.includes(artist.id) && (
                                        <CheckCircle className="w-4 h-4 text-black" />
                                    )}
                                </div>
                                <span className="text-white font-mono text-sm">{artist.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleAddMember}
                    disabled={addMemberMutation.isPending}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 font-mono"
                >
                    {addMemberMutation.isPending ? 'ADDING...' : 'ADD MEMBER'}
                </Button>
            </div>

            {/* EXISTING TEAM */}
            <div className="space-y-3">
                <h2 className="text-white font-black font-mono text-lg mb-3">TEAM MEMBERS ({team.length})</h2>
                
                {team.length === 0 ? (
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-8 text-center">
                        <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-600 font-mono text-sm">No team members yet</p>
                    </div>
                ) : (
                    team.map(member => (
                        <div key={member.id} className="bg-black border-2 border-gray-900 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <p className="text-white font-bold font-mono">{member.name}</p>
                                    <p className="text-gray-600 text-xs font-mono">{member.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm(`Remove ${member.name}?`)) {
                                            removeMemberMutation.mutate(member.id);
                                        }
                                    }}
                                    className="p-2 hover:bg-red-500/20 rounded transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {member.artist_access?.map(artistId => {
                                    const artist = artists.find(a => a.id === artistId);
                                    return artist ? (
                                        <span
                                            key={artistId}
                                            className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-2 py-1 rounded"
                                        >
                                            {artist.name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Team Access</p>
            </div>
        </div>
    );
}