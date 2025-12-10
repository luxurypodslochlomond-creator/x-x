import React, { useState, useEffect } from 'react';
import { Users, Plus, Shield, Eye, Edit } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * TEAM SHARE - INSTANT ACCESS
 * Give team members flags to see/edit artists
 * Full transparency, zero secrets
 * Trust-based collaboration
 */

export default function ScottTeamShare({ artistId = null }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        phone: '',
        email: '',
        role: 'band_member',
        artist_id: artistId,
        can_see_all: false,
    });

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async () => {
        try {
            let members = await base44.entities.ScottTeamMember.list();
            if (artistId) {
                members = members.filter(m => m.artist_id === artistId || m.can_see_all);
            }
            setTeamMembers(members);
        } catch (error) {
            console.error('Load team error:', error);
        }
    };

    const handleAddMember = async () => {
        if (!newMember.name) return;
        try {
            await base44.entities.ScottTeamMember.create(newMember);
            setNewMember({
                name: '',
                phone: '',
                email: '',
                role: 'band_member',
                artist_id: artistId,
                can_see_all: false,
            });
            setShowAddForm(false);
            loadTeam();
        } catch (error) {
            console.error('Add member error:', error);
        }
    };

    const toggleAccess = async (member) => {
        try {
            await base44.entities.ScottTeamMember.update(member.id, {
                can_see_all: !member.can_see_all
            });
            loadTeam();
        } catch (error) {
            console.error('Toggle access error:', error);
        }
    };

    return (
        <div className="bg-black border-2 border-cyan-500/50 p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-cyan-400 font-black font-mono text-sm">TEAM ACCESS</h3>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded transition-colors"
                >
                    <Plus className="w-4 h-4 text-black" />
                </button>
            </div>

            {/* ADD FORM */}
            {showAddForm && (
                <div className="bg-black/60 border border-cyan-500/30 p-3 mb-4 space-y-2">
                    <Input
                        placeholder="Name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                        className="bg-black border-gray-800 text-white font-mono text-sm"
                    />
                    <Input
                        placeholder="Phone (optional)"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                        className="bg-black border-gray-800 text-white font-mono text-sm"
                    />
                    <Input
                        placeholder="Email (optional)"
                        value={newMember.email}
                        onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                        className="bg-black border-gray-800 text-white font-mono text-sm"
                    />
                    <select
                        value={newMember.role}
                        onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                        className="w-full bg-black border border-gray-800 text-white font-mono text-sm p-2"
                    >
                        <option value="band_member">Band Member</option>
                        <option value="assistant">Assistant</option>
                        <option value="crew">Crew</option>
                        <option value="producer">Producer</option>
                        <option value="manager">Manager</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                        <input
                            type="checkbox"
                            checked={newMember.can_see_all}
                            onChange={(e) => setNewMember({...newMember, can_see_all: e.target.checked})}
                        />
                        Can see all artists (like Rosie)
                    </label>
                    <div className="flex gap-2">
                        <Button onClick={handleAddMember} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-mono text-xs">
                            ADD
                        </Button>
                        <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1 font-mono text-xs">
                            CANCEL
                        </Button>
                    </div>
                </div>
            )}

            {/* TEAM LIST */}
            <div className="space-y-2">
                {teamMembers.length === 0 ? (
                    <p className="text-gray-600 text-xs font-mono text-center py-3">No team members yet</p>
                ) : (
                    teamMembers.map(member => (
                        <div key={member.id} className="bg-black/60 border border-gray-800 p-3 flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-white font-mono text-sm font-bold">{member.name}</p>
                                <p className="text-gray-500 text-xs font-mono">{member.role.replace('_', ' ')}</p>
                                {member.phone && (
                                    <p className="text-gray-600 text-xs font-mono mt-1">{member.phone}</p>
                                )}
                            </div>
                            <button
                                onClick={() => toggleAccess(member)}
                                className={`p-2 rounded transition-colors ${
                                    member.can_see_all
                                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                        : 'bg-gray-800 text-gray-600 hover:bg-gray-700'
                                }`}
                            >
                                {member.can_see_all ? <Shield className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-800">
                <p className="text-xs text-gray-600 font-mono">
                    <Shield className="w-3 h-3 inline text-green-400" /> = Full roster access
                    <br/>
                    <Eye className="w-3 h-3 inline text-gray-500" /> = Their artist only
                </p>
            </div>
        </div>
    );
}